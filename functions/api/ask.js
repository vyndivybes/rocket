import {json,error,auth,ensureRole,sameOrigin,safeBody,validateQuestion,safetyRoute,acquireAiQuota,AI_MODEL,llmMessages} from '../_lib/core.js';
import {AI_MODES,COACH_PROMPTS} from '../_lib/mission.js';
import {relevantFoundation} from '../_lib/study.js';
import {qualifyAiAnswer} from '../_lib/response-guard.js';
export async function onRequestPost({request,env}){
  if(!sameOrigin(request))return error('Origin denied',403);
  const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
  let b;try{b=await safeBody(request)}catch{return error('Invalid request')}
  const problem=validateQuestion(b.question);if(problem)return error(problem);
  const mode=b.mode===undefined?'teacher':b.mode;
  if(!AI_MODES.includes(mode))return error('Invalid Saathi mode');
  const direct=safetyRoute(b.question);if(direct)return json({answer:direct.answer,kind:direct.type,source:null,notice:'No alert has been sent.'});
  if(!env.AI)return error('AI not available',503);
  if(!await acquireAiQuota(env,user.id))return error('Daily study AI limit reached. Try tomorrow or use your textbooks.',429);
  try{
    const messages=llmMessages(b.question,user.board);
    messages[0].content+=' MODE: '+mode+'. '+COACH_PROMPTS[mode]+' Student is aspiring to be a pilot and enjoys sketching and painting. These are inspiration topics, not assumptions about competence. Do not imply you can independently schedule, notify or run tools.';
    const foundation=(mode==='teacher'||mode==='pilot')?relevantFoundation(b.question):null;
    if(foundation)messages[0].content+=' CURATED FOUNDATION (general education, not board-certified): '+foundation.title+'. '+foundation.concept+' Example: '+foundation.example+' Explain with correct units and verify independently; do not invent citations.';
    const result=await env.AI.run(AI_MODEL,{messages,max_tokens:480});
    const rawAnswer=typeof result?.response==='string'?result.response.trim():'';
    if(!rawAnswer)return error('AI returned no answer',502);
    const checked=qualifyAiAnswer(rawAnswer);
    return json({answer:checked.answer,kind:mode,source:foundation?'Saathi curated foundation (not board-certified)':null,reviewFlagged:checked.replaced,notice:checked.replaced?'Potentially misleading AI answer replaced with a safer response; no alerts or external actions occurred.':'AI-generated explanation, not a verified textbook citation. Verify important facts with official sources.'});
  }catch{return error('AI temporarily unavailable. Your question was not saved.',503)}
}
