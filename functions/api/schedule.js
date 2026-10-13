import {json,error,auth,ensureRole,safeBody,sameOrigin} from '../_lib/core.js';
import {validSchedule} from '../_lib/mission.js';
export async function onRequestGet({request,env}){
 const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
 const r=await env.DB.prepare('SELECT id,title,kind,time_local,days_json,minutes,enabled FROM schedule_items WHERE student_id=? ORDER BY time_local,id LIMIT 100').bind(user.id).all();
 return json({items:(r.results||[]).map(x=>({id:x.id,title:x.title,kind:x.kind,time:x.time_local,days:JSON.parse(x.days_json),minutes:x.minutes,enabled:!!x.enabled})),notificationNote:'Browser reminders require explicit permission and the page to be open. No background push is installed.'});
}
export async function onRequestPost({request,env}){
 if(!sameOrigin(request))return error('Origin denied',403);
 const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
 let b;try{b=await safeBody(request,1500)}catch{return error('Invalid request')}
 if(b.action==='delete'||b.action==='toggle'){
  if(typeof b.id!=='string'||b.id.length>100)return error('Invalid event');
  const r=b.action==='delete'?
   await env.DB.prepare('DELETE FROM schedule_items WHERE id=? AND student_id=?').bind(b.id,user.id).run():
   await env.DB.prepare('UPDATE schedule_items SET enabled=CASE WHEN enabled=1 THEN 0 ELSE 1 END WHERE id=? AND student_id=?').bind(b.id,user.id).run();
  return r.meta?.changes?json({ok:true}):error('Event not found',404);
 }
 if(b.action!==undefined)return error('Invalid action');
 const invalid=validSchedule(b);if(invalid)return error(invalid);
 const count=await env.DB.prepare('SELECT COUNT(*) total FROM schedule_items WHERE student_id=?').bind(user.id).first();
 if(count.total>=100)return error('Schedule limit reached',429);
 const id=crypto.randomUUID();
 await env.DB.prepare('INSERT INTO schedule_items(id,student_id,title,kind,time_local,days_json,minutes) VALUES(?,?,?,?,?,?,?)').bind(id,user.id,b.title.trim(),b.kind,b.time,JSON.stringify(b.days),b.minutes).run();
 return json({id,ok:true},201);
}
