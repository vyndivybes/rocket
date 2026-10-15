import {json,error,auth,ensureRole,sameOrigin,safeBody} from '../_lib/core.js';
import {gradePractice,LESSONS,lessonAllowedForLearner} from '../_lib/study.js';
import {revisionForLesson} from '../_lib/question-bank.js';
export async function onRequestGet({request,env}){
 const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
 const rows=await env.DB.prepare('SELECT lesson_id,attempts,correct FROM practice_progress WHERE student_id=?').bind(user.id).all();
 const byLesson=rows.results||[];
 return json({progress:{total:byLesson.reduce((s,x)=>s+x.attempts,0),correct:byLesson.reduce((s,x)=>s+x.correct,0),byLesson,lessonRevision:LESSONS.map(l=>revisionForLesson(l.id,byLesson)).filter(Boolean)}});
}
export async function onRequestPost({request,env}){
 if(!sameOrigin(request))return error('Origin denied',403);
 const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
 let b;try{b=await safeBody(request,800)}catch{return error('Invalid JSON');}
 const grade=gradePractice(b.lessonId,b.choice,b.questionId===undefined?'base':b.questionId);
 if(!grade)return error('Invalid practice question or choice');
 // If academic preferences are saved, grade only the learner's selected subjects.
 // A not-yet-configured learner retains the existing general foundation workflow.
 let profile;
 try{profile=await env.DB.prepare('SELECT subjects_json FROM study_profiles WHERE student_id=?').bind(user.id).first();}
 catch{return error('Study preferences temporarily unavailable',503)}
 let subjects=null;
 if(profile){
  try{subjects=JSON.parse(profile.subjects_json);}catch{return error('Invalid study preferences',409)}
  if(!Array.isArray(subjects))return error('Invalid study preferences',409);
 }
 if(!lessonAllowedForLearner(grade.lesson,user.board,subjects))
  return error('This lesson requires an enrolled CBSE board and matching selected subject',403);

 // Only aggregate counts, never raw answers or student prompt text.
 await env.DB.prepare('INSERT INTO practice_progress(student_id,lesson_id,attempts,correct) VALUES(?,?,1,?) ON CONFLICT(student_id,lesson_id) DO UPDATE SET attempts=attempts+1,correct=correct+excluded.correct,updated_at=CURRENT_TIMESTAMP').bind(user.id,grade.progressKey,grade.correct?1:0).run();
 return json({questionId:grade.questionId,correct:grade.correct,explanation:grade.explanation,correctOption:grade.correctOption});
}
