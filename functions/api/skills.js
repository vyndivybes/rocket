import {json,error,auth,ensureRole,sameOrigin,safeBody} from '../_lib/core.js';
import {validateSkillInput,publicSkill} from '../_lib/skill-forge.js';
const columns='id,name,purpose,mode,blueprint,status,revision,created_at,updated_at';
export async function onRequestGet({request,env}){
 const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
 try{
  const result=await env.DB.prepare('SELECT '+columns+' FROM learner_skills WHERE student_id=? ORDER BY updated_at DESC,id LIMIT 20').bind(user.id).all();
  return json({skills:(result.results||[]).map(publicSkill),notice:'Only you can edit or activate your own learning skills. Skills do not execute code.'});
 }catch{return error('Skill Forge storage is not yet installed in this environment',503)}
}
export async function onRequestPost({request,env}){
 if(!sameOrigin(request))return error('Origin denied',403);
 const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
 let b;try{b=await safeBody(request,1400)}catch{return error('Invalid skill request')}
 const action=b?.action;
 if(!['create','update','activate','deactivate','delete'].includes(action))return error('Invalid skill operation');
 try{
  if(action==='create'){
   const invalid=validateSkillInput(b);if(invalid)return error(invalid);
   const existing=await env.DB.prepare('SELECT id FROM learner_skills WHERE student_id=? AND name=? COLLATE NOCASE').bind(user.id,b.name.trim()).first();
   if(existing)return error('You already have a skill with that name',409);
   const count=await env.DB.prepare('SELECT COUNT(*) AS total FROM learner_skills WHERE student_id=?').bind(user.id).first();
   if((count?.total||0)>=20)return error('Maximum 20 skills. Retire one before creating another.',429);
   const id=crypto.randomUUID();
   await env.DB.prepare('INSERT INTO learner_skills(id,student_id,name,purpose,mode,blueprint,status) VALUES(?,?,?,?,?,?,?)').bind(id,user.id,b.name.trim(),b.purpose.trim(),b.mode,b.blueprint,'draft').run();
   const row=await env.DB.prepare('SELECT '+columns+' FROM learner_skills WHERE student_id=? AND id=?').bind(user.id,id).first();
   return json({ok:true,skill:publicSkill(row)},201);
  }
  if(typeof b.id!=='string'||b.id.length>100)return error('Invalid skill ID');
  const current=await env.DB.prepare('SELECT '+columns+' FROM learner_skills WHERE student_id=? AND id=?').bind(user.id,b.id).first();
  if(!current)return error('Skill not found',404);
  if(action==='delete'){
   await env.DB.prepare('DELETE FROM learner_skills WHERE student_id=? AND id=?').bind(user.id,b.id).run();
   return json({ok:true});
  }
  if(action==='activate'||action==='deactivate'){
   const status=action==='activate'?'active':'draft';
   await env.DB.prepare('UPDATE learner_skills SET status=?,revision=revision+1,updated_at=CURRENT_TIMESTAMP WHERE student_id=? AND id=?').bind(status,user.id,b.id).run();
  }else{
   const invalid=validateSkillInput(b);if(invalid)return error(invalid);
   if(!Number.isInteger(b.revision)||b.revision!==current.revision)return error('Skill was updated elsewhere. Refresh and try again.',409);
   const existing=await env.DB.prepare('SELECT id FROM learner_skills WHERE student_id=? AND name=? COLLATE NOCASE AND id<>?').bind(user.id,b.name.trim(),b.id).first();
   if(existing)return error('Another skill already uses that name',409);
   const updated=await env.DB.prepare('UPDATE learner_skills SET name=?,purpose=?,mode=?,blueprint=?,status=?,revision=revision+1,updated_at=CURRENT_TIMESTAMP WHERE student_id=? AND id=? AND revision=?').bind(b.name.trim(),b.purpose.trim(),b.mode,b.blueprint,'draft',user.id,b.id,b.revision).run();
   if(!updated.meta?.changes)return error('Skill changed before saving. Refresh and try again.',409);
  }
  const row=await env.DB.prepare('SELECT '+columns+' FROM learner_skills WHERE student_id=? AND id=?').bind(user.id,b.id).first();
  return json({ok:true,skill:publicSkill(row)});
 }catch{return error('Skill Forge storage is unavailable or not migrated',503)}
}
