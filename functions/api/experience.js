import {json,error,auth,ensureRole,sameOrigin,safeBody} from '../_lib/core.js';
import {readExperience,validateExperience} from '../_lib/experience.js';
export async function onRequestGet({request,env}){
 const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
 try{
  const row=await env.DB.prepare('SELECT preferences_json FROM learner_experience WHERE student_id=?').bind(user.id).first();
  return json({preferences:readExperience(row),persisted:!!row});
 }catch{return error('Personalisation unavailable until the private database is ready',503)}
}
export async function onRequestPost({request,env}){
 if(!sameOrigin(request))return error('Origin denied',403);
 const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
 let b;try{b=await safeBody(request,1800)}catch{return error('Invalid settings request')}
 const problem=validateExperience(b);if(problem)return error(problem,400);
 try{
  await env.DB.prepare('INSERT INTO learner_experience(student_id,preferences_json) VALUES(?,?) ON CONFLICT(student_id) DO UPDATE SET preferences_json=excluded.preferences_json,updated_at=CURRENT_TIMESTAMP').bind(user.id,JSON.stringify(b)).run();
  return json({ok:true,preferences:b});
 }catch{return error('Preferences could not be saved',503)}
}
