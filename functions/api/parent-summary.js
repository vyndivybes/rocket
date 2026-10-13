import {json,error,auth,ensureRole,scopeStudent} from '../_lib/core.js';
export async function onRequestGet({request,env}){
  const user=await auth(request,env);if(!ensureRole(user,'parent'))return error('Parent only',403);
  const student=scopeStudent(user);if(!student)return error('No linked student',403);
  const totals=await env.DB.prepare('SELECT COUNT(*) total,SUM(CASE WHEN done=1 THEN 1 ELSE 0 END) completed FROM tasks WHERE student_id=?').bind(student).first();
  // Deliberately no transcript, task title, per-question history, or private notes.
  return json({assigned:totals?.total||0,completed:totals?.completed||0,notice:'Aggregate student-approved study commitments only. No conversations or emotional analysis are accessible.'});
}
