import {json,error,auth,ensureRole} from '../_lib/core.js';
export async function onRequestGet({request,env}){
  const user=await auth(request,env);
  if(!ensureRole(user,'admin'))return error('Administrator only',403);
  const row=await env.DB.prepare(`SELECT
   (SELECT COUNT(*) FROM users WHERE role='student') AS students,
   (SELECT COUNT(*) FROM users WHERE role='parent') AS parents,
   (SELECT COUNT(*) FROM admin_users) AS admins,
   (SELECT COUNT(*) FROM tasks) AS totalTasks
  `).first();
  return json({students:row?.students??0,parents:row?.parents??0,admins:row?.admins??0,totalTasks:row?.totalTasks??0,notice:'Only aggregate operational counts. No question histories, task titles, chat transcripts, access keys or student identities are shown.'});
}
