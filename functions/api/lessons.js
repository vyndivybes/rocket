import {json,error,auth,ensureRole} from '../_lib/core.js';
import {LESSONS,lessonView} from '../_lib/study.js';
export async function onRequestGet({request,env}){
 const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
 const row=await env.DB.prepare('SELECT subjects_json FROM study_profiles WHERE student_id=?').bind(user.id).first();
 const subjects=row?JSON.parse(row.subjects_json):null;
 const lessons=LESSONS.filter(x=>!subjects||subjects.includes(x.subject)||(x.subject==='English'&&subjects.includes('English Elective'))).map(lessonView);
 return json({lessons,note:'These are optional foundation lessons, not a board-certified or complete syllabus. Use the prescribed school textbook for examination alignment.'});
}
