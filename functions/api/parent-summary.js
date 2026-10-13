import {json,error,auth,ensureRole,scopeStudent} from '../_lib/core.js';
export async function onRequestGet({request,env}){
  const user=await auth(request,env);if(!ensureRole(user,'parent'))return error('Parent only',403);
  const student=scopeStudent(user);if(!student)return error('No linked student',403);
  const totals=await env.DB.prepare('SELECT COUNT(*) total,SUM(CASE WHEN done=1 THEN 1 ELSE 0 END) completed FROM tasks WHERE student_id=?').bind(student).first();
  // Deliberately no transcript, task title, per-question history, or private notes.
  const practice=await env.DB.prepare('SELECT COALESCE(SUM(attempts),0) attempts,COALESCE(SUM(correct),0) correct FROM practice_progress WHERE student_id=?').bind(student).first();
  return json({assigned:totals?.total||0,completed:totals?.completed||0,practiceAttempts:practice?.attempts||0,practiceCorrect:practice?.correct||0,notice:'Aggregate learner study commitments and foundation-practice counts only. No private questions, transcripts or notes are accessible.'});
}
