import {json,error,auth,ensureRole,sameOrigin,safeBody} from '../_lib/core.js';
import {validateTurn} from '../_lib/dialogue.js';
export async function onRequestGet({request,env}){
 const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
 try{
  const result=await env.DB.prepare('SELECT id,role,text,created_at FROM dialogue_turns WHERE student_id=? ORDER BY created_at DESC,id DESC LIMIT 40').bind(user.id).all();
  return json({turns:(result.results||[]).reverse(),private:true,notice:'Only this learner can read or delete their saved dialogue.'});
 }catch{return error('Conversation history storage unavailable',503)}
}
export async function onRequestPost({request,env}){
 if(!sameOrigin(request))return error('Origin denied',403);
 const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
 let input;try{input=await safeBody(request,7000)}catch{return error('Invalid dialogue request')};
 if(input?.action==='clear'){
  await env.DB.prepare('DELETE FROM dialogue_turns WHERE student_id=?').bind(user.id).run();
  return json({ok:true,cleared:true});
 }
 if(input?.action!=='append'||!Array.isArray(input.turns)||input.turns.length!==2)return error('Invalid dialogue operation');
 const turns=input.turns.map(validateTurn);
 if(turns.some(x=>!x)||turns[0].role!=='student'||turns[1].role!=='saathi')return error('Invalid dialogue turns');
 try{
  const now=new Date().toISOString(),first=crypto.randomUUID(),second=crypto.randomUUID();
  await env.DB.batch([
   env.DB.prepare('INSERT INTO dialogue_turns(id,student_id,role,text,created_at) VALUES(?,?,?,?,?)').bind(first,user.id,turns[0].role,turns[0].text,now),
   env.DB.prepare('INSERT INTO dialogue_turns(id,student_id,role,text,created_at) VALUES(?,?,?,?,?)').bind(second,user.id,turns[1].role,turns[1].text,now)
  ]);
  // Bound stored history; user's privacy erase remains available.
  await env.DB.prepare('DELETE FROM dialogue_turns WHERE student_id=? AND id NOT IN (SELECT id FROM dialogue_turns WHERE student_id=? ORDER BY created_at DESC,id DESC LIMIT 200)').bind(user.id,user.id).run();
  return json({ok:true,turnsSaved:2});
 }catch{return error('Could not save conversation',503)}
}
