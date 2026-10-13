import {auth,ensureRole,error,json,safeBody,sameOrigin} from '../_lib/core.js';
import {STARTER_ROUTINE} from '../_lib/starter.js';
export async function onRequestGet({request,env}){
 const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
 return json({template:STARTER_ROUTINE,notice:'Optional, short weekly activities. Review with family and adjust around school, rest and sport. No reminders are installed automatically.'});
}
export async function onRequestPost({request,env}){
 if(!sameOrigin(request))return error('Origin denied',403);
 const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
 let b;try{b=await safeBody(request,700)}catch{return error('Invalid JSON')}
 if(b.action!=='install'||b.confirm!=='ADD STARTER ROUTINE')return error('Confirmation required');
 const limit=await env.DB.prepare('SELECT COUNT(*) total FROM schedule_items WHERE student_id=?').bind(user.id).first();
 if((limit?.total??0)+STARTER_ROUTINE.length>100)return error('Schedule limit reached. Remove some items first.',409);
 let added=0;
 for(const item of STARTER_ROUTINE){
  const id='starter:'+item.key+':'+user.id;
  const r=await env.DB.prepare('INSERT OR IGNORE INTO schedule_items(id,student_id,title,kind,time_local,days_json,minutes) VALUES(?,?,?,?,?,?,?)').bind(id,user.id,item.title,item.kind,item.time,JSON.stringify(item.days),item.minutes).run();
  added+=(r.meta?.changes??0);
 }
 return json({ok:true,added,total:STARTER_ROUTINE.length,notice:'Review and customize each activity. Browser alerts only work while the page is open; calendar export provides phone-managed alerts.'});
}
