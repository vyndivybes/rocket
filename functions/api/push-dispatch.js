import {json,error} from '../_lib/core.js';
import {reminderDue,validDevice} from '../_lib/push-policy.js';

// Internal-only endpoint for a separately scheduled Worker. Never invoked from the browser.
// Deploy HOLD by default; not usable until all secret bindings and independent testing exist.
export async function onRequestPost({request,env,data}){
 if(env.SAATHI_STAGE!=='preview'||env.PUSH_DISPATCH_CONFIGURED!=='true'||!env.PUSH_DISPATCH_SECRET||!env.VAPID_PRIVATE_KEY||!env.VAPID_PUBLIC_KEY||!env.VAPID_SUBJECT)return error('Push dispatch not commissioned',503);
 const bearer=request.headers.get('Authorization');
 if(bearer!=='Bearer '+env.PUSH_DISPATCH_SECRET)return error('Unauthorized',403);
 const sender=data?.testSender || (await import('@mmmike/web-push/send')).sendPushNotification;
 const now=data?.testNow ?? Date.now();
 const rows=await env.DB.prepare("SELECT d.id device_id,d.student_id,d.endpoint,d.p256dh,d.auth,d.timezone,d.quiet_from,d.quiet_to,s.id schedule_id,s.days_json,s.time_local,s.enabled FROM push_devices d JOIN schedule_items s ON s.student_id=d.student_id JOIN learner_experience p ON p.student_id=d.student_id AND json_extract(p.preferences_json,'$.quietMode')=0 AND json_extract(p.preferences_json,'$.remindersEnabled')=1 WHERE d.enabled=1 AND s.enabled=1 LIMIT 250").all();
 let attempted=0,accepted=0,failed=0;
 for(const r of rows.results||[]){
  let days;try{days=JSON.parse(r.days_json)}catch{continue}
  const device={id:r.device_id,timezone:r.timezone,quiet_from:r.quiet_from,quiet_to:r.quiet_to};
  const due=reminderDue(device,{id:r.schedule_id,days,time:r.time_local,enabled:!!r.enabled},now);
  if(!due)continue;
  if(validDevice({endpoint:r.endpoint,p256dh:r.p256dh,auth:r.auth,timezone:r.timezone,quietFrom:r.quiet_from,quietTo:r.quiet_to}))continue;
  const id=crypto.randomUUID();
  const res=await env.DB.prepare("INSERT OR IGNORE INTO push_deliveries(id,device_id,schedule_id,local_date,state) VALUES(?,?,?,?,'RESERVED')").bind(id,due.deviceId,due.scheduleId,due.date).run();
  if(!res.meta?.changes)continue;
  attempted++;
  try{
   const delivered=await sender({endpoint:r.endpoint,keys:{p256dh:r.p256dh,auth:r.auth}}, {kind:'SAATHI_REMINDER_V1',title:'Saathi reminder',body:'You have an activity in your private study schedule.',data:{url:'/mission.html'}}, {publicKey:env.VAPID_PUBLIC_KEY,privateKey:env.VAPID_PRIVATE_KEY,subject:env.VAPID_SUBJECT});
   if(delivered===false){await env.DB.prepare("DELETE FROM push_devices WHERE id=?").bind(r.device_id).run();failed++;continue;}
   await env.DB.prepare("UPDATE push_deliveries SET state='ACCEPTED' WHERE id=?").bind(id).run();accepted++;
  }catch{
   failed++;
   await env.DB.prepare("UPDATE push_deliveries SET state='FAILED' WHERE id=?").bind(id).run();
  }
 }
 await env.DB.prepare("UPDATE push_dispatch_health SET last_run_at=CURRENT_TIMESTAMP,source_rows=?,attempted=?,accepted=?,failed=? WHERE singleton=1").bind(rows.results?.length||0,attempted,accepted,failed).run();
 return json({status:'ATTEMPTED_NOT_DEVICE_CONFIRMED',attempted,accepted,failed,sourceRows:rows.results?.length||0,notice:'Push acceptance by gateway does not establish handset display.'});
}
