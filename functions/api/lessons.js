import {json,error,auth,ensureRole} from '../_lib/core.js';
import {studentLessons,lessonView} from '../_lib/study.js';
export async function onRequestGet({request,env}){
 const user=await auth(request,env);
 if(!ensureRole(user,'student'))return error('Student only',403);
 let row;
 try{row=await env.DB.prepare('SELECT subjects_json FROM study_profiles WHERE student_id=?').bind(user.id).first();}
 catch{return error('Study preferences temporarily unavailable',503);}
 let subjects=null;
 if(row){
  try{subjects=JSON.parse(row.subjects_json);}
  catch{return error('Invalid study preferences; please confirm your subjects',409);}
  if(!Array.isArray(subjects))return error('Invalid study preferences; please confirm your subjects',409);
 }
 // The profile gate is shared with the grading endpoint. Without confirmed
 // CBSE enrolment and a selected subject, the CBSE course drafts stay hidden.
 const lessons=studentLessons(user.board,subjects).map(lessonView);
 return json({lessons,note:'Includes general foundation topics and, for confirmed CBSE subject choices, chapter teaching drafts. Drafts do not replace official textbooks or supervised practicals, and do not certify examination readiness.'});
}
