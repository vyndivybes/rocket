import {json,error,auth,ensureRole,sameOrigin,safeBody,validTask} from '../_lib/core.js';
export async function onRequestGet({request,env}){
  const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
  const rows=await env.DB.prepare('SELECT id,title,subject,due_date,done,created_at FROM tasks WHERE student_id=? ORDER BY done ASC,due_date ASC,created_at DESC LIMIT 100').bind(user.id).all();
  return json({tasks:rows.results||[]});
}
export async function onRequestPost({request,env}){
  if(!sameOrigin(request))return error('Origin denied',403);
  const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
  let b;try{b=await safeBody(request)}catch{return error('Invalid request')}
  if(b.action==='complete'){
    if(typeof b.id!=='string'||b.id.length>100)return error('Invalid task');
    const done=b.done===true?1:0;
    const result=await env.DB.prepare('UPDATE tasks SET done=? WHERE id=? AND student_id=?').bind(done,b.id,user.id).run();
    return (result.meta?.changes||0)>0?json({ok:true}):error('Task not found',404);
  }
  const title=b.title,subject=b.subject??'General',dueDate=b.due_date??null;
  const validation=validTask(title,subject,dueDate);if(validation)return error(validation);
  const id=crypto.randomUUID();
  await env.DB.prepare('INSERT INTO tasks(id,student_id,title,subject,due_date) VALUES(?,?,?,?,?)').bind(id,user.id,title.trim(),subject.trim()||'General',dueDate).run();
  return json({ok:true,id},201);
}
