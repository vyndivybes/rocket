import {json,error,auth,ensureRole,sameOrigin,safeBody} from '../_lib/core.js';
import {validateUpgradeIdea} from '../_lib/experience.js';
// Student proposals only. No auto-install, code generation, privilege escalation or external sharing.
export async function onRequestGet({request,env}){
 const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
 try{
  const rows=await env.DB.prepare('SELECT id,idea,status,created_at FROM learner_upgrade_requests WHERE student_id=? ORDER BY created_at DESC,id DESC LIMIT 10').bind(user.id).all();
  return json({ideas:rows.results||[],notice:'Ideas are private requests, not automatic software upgrades. Review and approval are required.'});
 }catch{return error('Improvement requests unavailable',503)}
}
export async function onRequestPost({request,env}){
 if(!sameOrigin(request))return error('Origin denied',403);
 const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
 let b;try{b=await safeBody(request,1500)}catch{return error('Invalid improvement request')}
 if(b?.action==='delete'){
  if(typeof b.id!=='string'||!/^[0-9a-f-]{36}$/i.test(b.id))return error('Invalid request ID');
  try{await env.DB.prepare('DELETE FROM learner_upgrade_requests WHERE id=? AND student_id=?').bind(b.id,user.id).run();return json({ok:true})}
  catch{return error('Could not delete request',503)}
 }
 if(b?.action!=='add')return error('Invalid action');
 const problem=validateUpgradeIdea(b.idea);if(problem)return error(problem,400);
 try{
  const limits=await env.DB.prepare("SELECT COUNT(*) AS total, COALESCE(SUM(CASE WHEN substr(created_at,1,10)=date('now') THEN 1 ELSE 0 END),0) AS today FROM learner_upgrade_requests WHERE student_id=?").bind(user.id).first();
  if(Number(limits?.total)>=10||Number(limits?.today)>=3)return error('Idea limit reached. Delete old proposals or try tomorrow.',429);
  const id=crypto.randomUUID();
  await env.DB.prepare("INSERT INTO learner_upgrade_requests(id,student_id,idea,status) VALUES(?,?,?,'PROPOSED')").bind(id,user.id,b.idea.trim()).run();
  return json({ok:true,id,status:'PROPOSED',notice:'Saved privately for review. No software changes have been made.'});
 }catch{return error('Could not save improvement request',503)}
}
