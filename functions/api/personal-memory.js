import {auth,ensureRole,json,error,sameOrigin,safeBody} from '../_lib/core.js';
import {validateMemory,publicMemory} from '../_lib/personal-memory.js';
export async function onRequestGet({request,env}){
 const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
 const r=await env.DB.prepare('SELECT id,category,text,use_in_chat,created_at,updated_at FROM personal_memories WHERE student_id=? ORDER BY updated_at DESC,id LIMIT 30').bind(user.id).all();
 return json({memories:(r.results||[]).map(publicMemory),notice:'Saved memories are private to your student account. Only those you explicitly enable for AI recall will be sent to the AI provider. No memories are saved from conversations automatically.'});
}
export async function onRequestPost({request,env}){
 if(!sameOrigin(request))return error('Origin denied',403);
 const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
 let b;try{b=await safeBody(request,950)}catch{return error('Invalid JSON')}
 if(b.action==='delete'){
  if(typeof b.id!=='string'||b.id.length>100)return error('Invalid memory ID');
  const r=await env.DB.prepare('DELETE FROM personal_memories WHERE id=? AND student_id=?').bind(b.id,user.id).run();
  return r.meta?.changes?json({ok:true}):error('Memory not found',404);
 }
 if(b.action!=='create'&&b.action!=='update')return error('Choose create, update or delete');
 const problem=validateMemory(b);if(problem)return error(problem);
 if(b.action==='update'){
  if(typeof b.id!=='string'||b.id.length>100)return error('Invalid memory ID');
  const changed=await env.DB.prepare('UPDATE personal_memories SET text=?,category=?,use_in_chat=?,updated_at=CURRENT_TIMESTAMP WHERE id=? AND student_id=?').bind(b.text.trim(),b.category,b.useInChat?1:0,b.id,user.id).run();
  if(!changed.meta?.changes)return error('Memory not found',404);
  const m=await env.DB.prepare('SELECT * FROM personal_memories WHERE id=? AND student_id=?').bind(b.id,user.id).first();
  return json({ok:true,memory:publicMemory(m)});
 }
 const current=await env.DB.prepare('SELECT COUNT(*) AS total FROM personal_memories WHERE student_id=?').bind(user.id).first();
 if((current?.total??0)>=30)return error('Maximum 30 memories; delete one before saving another',429);
 const id=crypto.randomUUID();
 await env.DB.prepare('INSERT INTO personal_memories(id,student_id,category,text,use_in_chat) VALUES(?,?,?,?,?)').bind(id,user.id,b.category,b.text.trim(),b.useInChat?1:0).run();
 const m=await env.DB.prepare('SELECT * FROM personal_memories WHERE id=? AND student_id=?').bind(id,user.id).first();
 return json({ok:true,memory:publicMemory(m)},201);
}
