import {json,error,auth,ensureRole,safeBody,sameOrigin} from '../_lib/core.js';
export async function onRequestGet({request,env}){
 const u=await auth(request,env);if(!ensureRole(u,'student'))return error('Student only',403);
 const [tasks,notes,schedule,profile,practice,companion,personalMemories,pushDevices]=await Promise.all([
  env.DB.prepare('SELECT id,title,subject,due_date,done,created_at FROM tasks WHERE student_id=?').bind(u.id).all(),
  env.DB.prepare('SELECT id,title,body,created_at FROM notes WHERE student_id=?').bind(u.id).all(),
  env.DB.prepare('SELECT id,title,kind,time_local,days_json,minutes,enabled FROM schedule_items WHERE student_id=?').bind(u.id).all(),
  env.DB.prepare('SELECT stream,subjects_json,daily_minutes FROM study_profiles WHERE student_id=?').bind(u.id).first(),
  env.DB.prepare('SELECT lesson_id,attempts,correct FROM practice_progress WHERE student_id=?').bind(u.id).all(),
  env.DB.prepare('SELECT name FROM companion_preferences WHERE student_id=?').bind(u.id).first(),
  env.DB.prepare('SELECT id,category,text,use_in_chat,created_at,updated_at FROM personal_memories WHERE student_id=? ORDER BY updated_at DESC').bind(u.id).all(),
  env.DB.prepare('SELECT timezone,quiet_from,quiet_to,enabled,created_at FROM push_devices WHERE student_id=?').bind(u.id).all()
 ]);
 return json({data:{board:u.board,companionName:companion?.name??null,personalMemories:(personalMemories.results||[]).map(x=>({id:x.id,category:x.category,text:x.text,useInChat:!!x.use_in_chat,createdAt:x.created_at,updatedAt:x.updated_at})),profile:profile?{stream:profile.stream,subjects:JSON.parse(profile.subjects_json),dailyMinutes:profile.daily_minutes}:null,tasks:tasks.results||[],notes:notes.results||[],schedule:(schedule.results||[]).map(x=>({...x,days:JSON.parse(x.days_json)})),practice:practice.results||[],notificationDeviceSettings:pushDevices.results||[]},notice:'Student-only export. Do not share or store the export in a public place.'});
}
export async function onRequestPost({request,env}){
 if(!sameOrigin(request))return error('Origin denied',403);
 const u=await auth(request,env);if(!ensureRole(u,'student'))return error('Student only',403);
 let b;try{b=await safeBody(request,500)}catch{return error('Invalid request')}
 if(b.action!=='erase-learning-data'||b.confirm!=='ERASE MY STUDY DATA')return error('Explicit deletion confirmation required');
 for(const table of ['notes','schedule_items','tasks','practice_progress','study_profiles','ai_usage','companion_preferences','personal_memories','push_devices'])await env.DB.prepare(`DELETE FROM ${table} WHERE student_id=?`).bind(u.id).run();
 await env.DB.prepare("UPDATE users SET board='unconfigured' WHERE id=? AND role='student'").bind(u.id).run();
 return json({ok:true,notice:'Learning data erased; student login preserved. Database provider backups may retain data under their retention policy.'});
}
