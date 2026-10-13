import {json,error,auth,ensureRole,sameOrigin,safeBody} from '../_lib/core.js';
import {validDevice} from '../_lib/push-policy.js';
export async function onRequestGet({request,env}){
 const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
 const configured=typeof env.VAPID_PUBLIC_KEY==='string'&&env.VAPID_PUBLIC_KEY.length>70&&env.PUSH_DISPATCH_CONFIGURED==='true';
 const row=await env.DB.prepare('SELECT COUNT(*) AS n FROM push_devices WHERE student_id=? AND enabled=1').bind(user.id).first();
 return json({ready:configured,publicKey:configured?env.VAPID_PUBLIC_KEY:null,devices:row?.n||0,notice:configured?'You may opt in to background notifications on this device.':'Background push delivery is not yet commissioned. Export the schedule to your phone calendar for reliable independent reminders.'});
}
export async function onRequestPost({request,env}){
 if(!sameOrigin(request))return error('Origin denied',403);
 const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
 let b;try{b=await safeBody(request,2700)}catch{return error('Invalid device registration')}
 if(b.action==='remove'){
  if(typeof b.endpoint!=='string'||b.endpoint.length>800)return error('Invalid subscription');
  await env.DB.prepare('DELETE FROM push_devices WHERE student_id=? AND endpoint=?').bind(user.id,b.endpoint).run();
  return json({ok:true});
 }
 if(b.action!=='register')return error('Invalid action');
 if(env.PUSH_DISPATCH_CONFIGURED!=='true'||!env.VAPID_PUBLIC_KEY)return error('Push delivery not commissioned; device subscription was not stored.',503);
 const invalid=validDevice(b);if(invalid)return error(invalid,422);
 const n=await env.DB.prepare('SELECT COUNT(*) AS n FROM push_devices WHERE student_id=?').bind(user.id).first();
 const known=await env.DB.prepare('SELECT id FROM push_devices WHERE student_id=? AND endpoint=?').bind(user.id,b.endpoint).first();
 if(!known&&n.n>=3)return error('Maximum three registered devices',429);
 const id=known?.id||crypto.randomUUID();
 await env.DB.prepare('INSERT INTO push_devices(id,student_id,endpoint,p256dh,auth,timezone,quiet_from,quiet_to) VALUES(?,?,?,?,?,?,?,?) ON CONFLICT(student_id,endpoint) DO UPDATE SET p256dh=excluded.p256dh,auth=excluded.auth,timezone=excluded.timezone,quiet_from=excluded.quiet_from,quiet_to=excluded.quiet_to,enabled=1').bind(id,user.id,b.endpoint,b.p256dh,b.auth,b.timezone,b.quietFrom,b.quietTo).run();
 return json({ok:true});
}
