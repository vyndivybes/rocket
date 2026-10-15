import {json,error,auth,ensureRole,sameOrigin,safeBody} from '../_lib/core.js';
export async function onRequestGet({request,env}){
 const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
 try{const result=await env.DB.prepare('SELECT id,title,date_local,time_local,done FROM one_time_reminders WHERE student_id=? ORDER BY date_local,time_local LIMIT 50').bind(user.id).all();return json({reminders:result.results||[],delivery:'Saved in Saathi. Outside-app notifications require device permission and a separate notification service.'})}
 catch{return error('One-time reminders unavailable',503)}
}
export async function onRequestPost({request,env}){
 if(!sameOrigin(request))return error('Origin denied',403);
 const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
 let x;try{x=await safeBody(request,650)}catch{return error('Invalid reminder')};
 if(typeof x?.title!=='string'||x.title.trim().length<2||x.title.length>90||typeof x.date!=='string'||!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(x.date)||!/^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(x.time||''))return error('Invalid reminder details');
 const d=new Date(x.date+'T12:00:00Z');if(!Number.isFinite(d.getTime())||d.toISOString().slice(0,10)!==x.date)return error('Invalid date');
 const now=new Date();if(d.getTime()<Date.UTC(now.getUTCFullYear(),now.getUTCMonth(),now.getUTCDate()-1)||d.getTime()>Date.now()+366*86400000)return error('Reminder date is outside supported range');
 try{const count=await env.DB.prepare('SELECT COUNT(*) AS n FROM one_time_reminders WHERE student_id=? AND done=0').bind(user.id).first();if((count?.n||0)>=100)return error('Reminder limit reached',429);
 const id=crypto.randomUUID();await env.DB.prepare('INSERT INTO one_time_reminders(id,student_id,title,date_local,time_local,done) VALUES(?,?,?,?,?,0)').bind(id,user.id,x.title.trim(),x.date,x.time).run();
 return json({ok:true,id,title:x.title.trim(),date:x.date,time:x.time,notice:'Reminder saved to your account. Browser or push delivery outside an active session is not guaranteed.'},201)}
 catch{return error('Could not save reminder',503)}
}
