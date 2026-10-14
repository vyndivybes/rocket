import {json,error,auth,ensureRole,sameOrigin,safeBody,safetyRoute,acquireAiQuota,AI_MODEL} from '../_lib/core.js';
import {LESSONS,lessonAllowedForLearner} from '../_lib/study.js';
import {validateExerciseRequest,buildExerciseCoachMessages} from '../_lib/ncert-exercise.js';
import {qualifyAiAnswer} from '../_lib/response-guard.js';

// Student-only, opt-in ephemeral worked guidance for an exercise the student
// has open in a legitimately accessed copy of the prescribed NCERT textbook.
// Does NOT automatically scrape, cache or redistribute NCERT question text.
export async function onRequestPost({request,env}){
 if(!sameOrigin(request))return error('Origin denied',403);
 const user=await auth(request,env);
 if(!ensureRole(user,'student'))return error('Student only',403);
 let raw;try{raw=await safeBody(request,4200)}catch{return error('Invalid exercise request',400)}
 const input=validateExerciseRequest(raw);
 if(!input)return error('Choose a chapter, a short exercise reference and a readable question from your textbook.',400);
 const lesson=LESSONS.find(x=>x.id===input.lessonId);
 if(!lesson)return error('Unknown textbook chapter',400);
 let profile;
 try{profile=await env.DB.prepare('SELECT subjects_json FROM study_profiles WHERE student_id=?').bind(user.id).first();}
 catch{return error('Study preferences currently unavailable',503)}
 let subjects=null;
 if(profile){try{subjects=JSON.parse(profile.subjects_json)}catch{return error('Invalid study preferences',409)}}
 if(!lessonAllowedForLearner(lesson,user.board,subjects)||user.board!=='CBSE')
  return error('This exercise requires your selected CBSE subject and a confirmed learner study profile.',403);
 const crisis=safetyRoute(input.questionText);
 if(crisis)return json({answer:crisis.answer,kind:crisis.type,certified:false,notice:'No alert has been sent.'});
 if(!env.AI)return error('AI tutoring is unavailable; review the textbook and ask your teacher.',503);
 try{
  if(!await acquireAiQuota(env,user.id))return error('Daily study AI limit reached. Use your textbook or ask your teacher.',429);
  const response=await env.AI.run(AI_MODEL,{messages:buildExerciseCoachMessages(input,lesson),max_tokens:640});
  const generated=typeof response?.response==='string'?response.response.trim():'';
  if(!generated)return error('No usable explanation was generated. Try a shorter question or consult your teacher.',502);
  const checked=qualifyAiAnswer(generated);
  return json({answer:checked.answer,kind:'learner_supplied_ncert_exercise_guidance',
   lessonId:lesson.id,exerciseRef:input.exerciseRef,level:input.level,
   certified:false,sourceTextStored:false,reviewFlagged:checked.replaced,
   notice:'This is unverified AI-generated worked guidance for a learner-supplied question. Verify the answer with the textbook or teacher; no full NCERT exercise coverage is claimed. The question was not stored.'});
 }catch{return error('Exercise tutor temporarily unavailable; no exercise text was saved.',503)}
}
