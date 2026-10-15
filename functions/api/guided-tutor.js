import {json,error,auth,ensureRole,sameOrigin,safeBody,safetyRoute,acquireAiQuota,POLICY} from '../_lib/core.js';
import {LESSONS,lessonAllowedForLearner} from '../_lib/study.js';
import {validateGuidedInput,buildGuidedMessages,extractFinalTutorAnswer,TUTOR_MODEL} from '../_lib/guided-learning.js';
import {qualifyAiAnswer} from '../_lib/response-guard.js';

// No raw question, tutor response or learner answer is persisted by this endpoint.
// Authenticated CBSE student can only use subjects in their stored study profile.
export async function onRequestPost({request,env}){
 if(!sameOrigin(request))return error('Origin denied',403);
 const user=await auth(request,env);
 if(!ensureRole(user,'student'))return error('Student only',403);
 let body;try{body=await safeBody(request,5600)}catch{return error('Invalid guided study request',400)}
 const input=validateGuidedInput(body);
 if(!input)return error('Select a course chapter and enter a valid question or practice answer.',400);
 const lesson=LESSONS.find(x=>x.id===input.lessonId);
 if(!lesson)return error('Unknown course chapter',400);
 if(user.board!=='CBSE')return error('Confirm your CBSE board and subjects in your profile first.',403);
 let profile;
 try{profile=await env.DB.prepare('SELECT subjects_json FROM study_profiles WHERE student_id=?').bind(user.id).first()}
 catch{return error('Your study profile is temporarily unavailable',503)}
 if(!profile)return error('Select your subjects in your study profile before continuing.',403);
 let selected;
 try{selected=JSON.parse(profile.subjects_json)}catch{return error('Invalid saved subject selection',409)}
 if(!Array.isArray(selected)||!lessonAllowedForLearner(lesson,user.board,selected))
  return error('This chapter is not part of your selected subjects.',403);
 const crisis=safetyRoute(input.question+' '+(input.studentAnswer||'')+' '+(input.focus||''));
 if(crisis)return json({answer:crisis.answer,kind:crisis.type,certified:false,sourceTextStored:false,
  notice:'Saathi cannot send emergency alerts. Seek a safe trusted adult or urgent local help when needed.'});
 if(!env.AI)return error('AI tutoring is unavailable. You can still practise saved lesson questions.',503);
 try{
  if(!await acquireAiQuota(env,user.id))return error('Daily study AI limit reached. You can still practise your saved lessons.',429);
  const messages=buildGuidedMessages(input,lesson);
  messages[0].content=POLICY+' '+messages[0].content;
  const reply=await env.AI.run(TUTOR_MODEL,{messages,max_tokens:1100,temperature:0.35});
  const result=extractFinalTutorAnswer(reply?.response);
  if(!result)return error('The tutor could not give usable guidance. Try a shorter question or ask your teacher.',502);
  const checked=qualifyAiAnswer(result);
  return json({step:input.step,lessonId:lesson.id,answer:checked.answer,certified:false,
   sourceTextStored:false,reviewFlagged:checked.replaced,
   notice:'AI-generated, unverified '+(input.step==='teach'?'explanation':input.step==='followup'?'focused clarification':'learning feedback')+
    '. Saathi has not saved the question, answer or conversation. Confirm important facts with your textbook or teacher.'});
 }catch{return error('The guided tutor is temporarily unavailable. No study conversation was saved.',503)}
}
