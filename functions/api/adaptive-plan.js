import {json,error,auth,ensureRole} from '../_lib/core.js';
import {buildAdaptivePlan} from '../_lib/adaptive-plan.js';
export async function onRequestGet({request,env}){
 const student=await auth(request,env);if(!ensureRole(student,'student'))return error('Student only',403);
 const r=await env.DB.prepare('SELECT lesson_id,attempts,correct FROM practice_progress WHERE student_id=?').bind(student.id).all();
 return json(buildAdaptivePlan(r.results||[]));
}