import {json,error,auth,ensureRole,sameOrigin,safeBody} from '../_lib/core.js';
import {parseGeneratedBuild} from '../_lib/builder-lab.js';
export async function onRequestGet({request,env}){
 const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
 try{
  const found=await env.DB.prepare('SELECT b.id,b.title,b.description,b.revision,f.installed_at FROM learner_installed_features f JOIN learner_builds b ON b.id=f.build_id AND b.student_id=f.student_id WHERE f.student_id=? ORDER BY f.installed_at DESC,b.id LIMIT 3').bind(user.id).all();
  return json({features:found.results||[],notice:'These are your own additions inside Saathi. Every generated module runs in an isolated preview; it cannot change core code, accounts, or the AI model.'});
 }catch{return error('Installed features storage not configured',503)}
}
export async function onRequestPost({request,env}){
 if(!sameOrigin(request))return error('Origin denied',403);
 const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
 let body;try{body=await safeBody(request,400)}catch{return error('Invalid request')}
 if(!['install','remove'].includes(body?.action)||typeof body.id!=='string'||body.id.length<1||body.id.length>100)return error('Invalid module action');
 try{
  const build=await env.DB.prepare('SELECT title,html,css,js FROM learner_builds WHERE student_id=? AND id=?').bind(user.id,body.id).first();
  if(!build)return error('Your project was not found',404);
  if(body.action==='remove'){
   const changed=await env.DB.prepare('DELETE FROM learner_installed_features WHERE student_id=? AND build_id=?').bind(user.id,body.id).run();
   return changed.meta?.changes?json({ok:true,installed:false}):error('Module was not installed',404);
  }
  if(!parseGeneratedBuild(JSON.stringify(build)))return error('Project code failed safety preflight; cannot install it',422);
  const already=await env.DB.prepare('SELECT build_id FROM learner_installed_features WHERE student_id=? AND build_id=?').bind(user.id,body.id).first();
  if(already)return json({ok:true,installed:true,already:true});
  const count=await env.DB.prepare('SELECT COUNT(*) AS total FROM learner_installed_features WHERE student_id=?').bind(user.id).first();
  if((count?.total||0)>=3)return error('Maximum three installed modules. Remove an older one first.',429);
  await env.DB.prepare('INSERT INTO learner_installed_features(student_id,build_id) VALUES(?,?)').bind(user.id,body.id).run();
  return json({ok:true,installed:true,notice:'Module installed for your Saathi account. It runs in an opaque-origin browser sandbox; your AI model, system files and repository are unchanged.'});
 }catch{return error('Could not update installed Saathi modules',503)}
}
