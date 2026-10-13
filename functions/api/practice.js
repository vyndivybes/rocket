import {json,error,auth,ensureRole,sameOrigin,safeBody} from '../_lib/core.js';
import {gradePractice} from '../_lib/study.js';
export async function onRequestGet({request,env}){
 const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
 const rows=await env.DB.prepare('SELECT lesson_id,attempts,correct FROM practice_progress WHERE student_id=?').bind(user.id).all();
 const byLesson=rows.results||[];
 return json({progress:{total:byLesson.reduce((s,x)=>s+x.attempts,0),correct:byLesson.reduce((s,x)=>s+x.correct,0),byLesson}});
}
export async function onRequestPost({request,env}){
 if(!sameOrigin(request))return error('Origin denied',403);
 const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
 let b;try{b=await safeBody(request,800)}catch{return error('Invalid JSON');}
 const grade=gradePractice(b.lessonId,b.choice);
 if(!grade)return error('Invalid practice question or choice');
 // Only aggregate counts, never raw answers or student prompt text.
 await env.DB.prepare('INSERT INTO practice_progress(student_id,lesson_id,attempts,correct) VALUES(?,?,1,?) ON CONFLICT(student_id,lesson_id) DO UPDATE SET attempts=attempts+1,correct=correct+excluded.correct,updated_at=CURRENT_TIMESTAMP').bind(user.id,grade.lesson.id,grade.correct?1:0).run();
 return json({correct:grade.correct,explanation:grade.explanation,correctOption:grade.correctOption});
}
