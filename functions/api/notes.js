import {json,error,auth,ensureRole,safeBody,sameOrigin} from '../_lib/core.js';
import {validNote} from '../_lib/mission.js';
export async function onRequestGet({request,env}){
 const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
 const r=await env.DB.prepare('SELECT id,title,body,created_at,updated_at FROM notes WHERE student_id=? ORDER BY updated_at DESC LIMIT 100').bind(user.id).all();
 return json({notes:r.results||[]});
}
export async function onRequestPost({request,env}){
 if(!sameOrigin(request))return error('Origin denied',403);
 const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
 let b;try{b=await safeBody(request,5000)}catch{return error('Invalid request')}
 if(b.action==='delete'){
  if(typeof b.id!=='string'||b.id.length>100)return error('Invalid note');
  const r=await env.DB.prepare('DELETE FROM notes WHERE id=? AND student_id=?').bind(b.id,user.id).run();
  return r.meta?.changes?json({ok:true}):error('Note not found',404);
 }
 const invalid=validNote(b.title,b.body);if(invalid)return error(invalid);
 if(b.action==='update'){
  if(typeof b.id!=='string'||b.id.length>100)return error('Invalid note');
  const r=await env.DB.prepare('UPDATE notes SET title=?,body=?,updated_at=CURRENT_TIMESTAMP WHERE id=? AND student_id=?').bind(b.title.trim(),b.body,b.id,user.id).run();
  return r.meta?.changes?json({ok:true}):error('Note not found',404);
 }
 if(b.action!==undefined)return error('Invalid action');
 const limit=await env.DB.prepare('SELECT COUNT(*) AS total FROM notes WHERE student_id=?').bind(user.id).first();
 if(limit.total>=100)return error('Note limit reached',429);
 const id=crypto.randomUUID();
 await env.DB.prepare('INSERT INTO notes(id,student_id,title,body) VALUES(?,?,?,?)').bind(id,user.id,b.title.trim(),b.body).run();
 return json({id,ok:true},201);
}
