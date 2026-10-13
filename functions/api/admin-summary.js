import {json,error,auth,ensureRole,dayUTC} from '../_lib/core.js';
export async function onRequestGet({request,env}){
  const user=await auth(request,env);
  if(!ensureRole(user,'admin'))return error('Administrator only',403);
  const row=await env.DB.prepare(`SELECT
   (SELECT COUNT(*) FROM users WHERE role='student') AS students,
   (SELECT COUNT(*) FROM users WHERE role='parent') AS parents,
   (SELECT COUNT(*) FROM admin_users) AS admins,
   (SELECT COUNT(*) FROM tasks) AS totalTasks,
   (SELECT COUNT(*) FROM tasks WHERE done=1) AS completedTasks,
   (SELECT COUNT(*) FROM users WHERE role='parent' AND linked_student_id IN (SELECT id FROM users WHERE role='student')) AS linkedParents,
   (SELECT COUNT(*) FROM users WHERE role='student' AND board <> 'unconfigured') AS configuredBoards,
   (SELECT COALESCE(SUM(attempts),0) FROM ai_usage WHERE day_utc=?) AS aiAttemptsToday
  `).bind(dayUTC()).first();
  return json({students:row?.students??0,parents:row?.parents??0,admins:row?.admins??0,totalTasks:row?.totalTasks??0,completedTasks:row?.completedTasks??0,linkedParents:row?.linkedParents??0,configuredBoards:row?.configuredBoards??0,aiAttemptsToday:row?.aiAttemptsToday??0,environment:env.SAATHI_STAGE==='preview'?'preview':'restricted',notice:'Aggregate operational counts only. No question histories, task titles, chat transcripts, access keys or student identities are shown.'});
}
