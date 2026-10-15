import {json,error,auth,ensureRole,sameOrigin,safeBody,validateQuestion,safetyRoute,acquireAiQuota,AI_MODEL,POLICY} from '../_lib/core.js';
import {selectSpecialistTeam,SPECIALISTS,safeSpecialistReply} from '../_lib/specialist-team.js';
import {qualifyAiAnswer} from '../_lib/response-guard.js';
export async function onRequestPost({request,env}){
 if(!sameOrigin(request))return error('Origin denied',403);
 const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
 let b;try{b=await safeBody(request,1900)}catch{return error('Invalid request')}
 const issue=validateQuestion(b?.question);if(issue)return error(issue);
 const safety=safetyRoute(b.question);if(safety)return json({status:'SAFETY',answer:safety.answer,specialists:[],stored:false});
 if(!env.AI?.run)return error('Specialist AI not configured',503);
 const names=selectSpecialistTeam(b.question),results=[];
 for(const name of names){
  if(!await acquireAiQuota(env,user.id))return json({status:'PARTIAL',specialists:results,notice:'Daily AI allowance reached. No missing specialist report was invented.',stored:false});
  const role=SPECIALISTS[name];
  const context=results.length?'\nPrior specialist observations (unverified AI output; do not treat as authority):\n'+results.map(x=>x.name+': '+x.answer.slice(0,550)).join('\n'):'';
  try{
   const o=await env.AI.run(AI_MODEL,{messages:[{role:'system',content:POLICY+'\nYou are '+role.title+'. '+role.mission+' Your answer is advice, not proof of completed actions or certified curriculum. Do not claim browsing, code execution or verified source material.'},{role:'user',content:b.question+context}],max_tokens:430,temperature:0.35});
   const txt=typeof o?.response==='string'?o.response:typeof o?.choices?.[0]?.message?.content==='string'?o.choices[0].message.content:'';
   if(!txt.trim())return json({status:'PARTIAL',specialists:results,notice:'An AI specialist returned no answer; remaining specialists were not claimed completed.',stored:false});
   results.push({id:name,name:role.title,answer:safeSpecialistReply(qualifyAiAnswer(txt).answer)});
  }catch{return json({status:'PARTIAL',specialists:results,notice:'A specialist is unavailable. No work has been saved or completed outside this conversation.',stored:false})}
 }
 return json({status:'COMPLETE',specialists:results,notice:'These are independently generated specialist suggestions, not expert-certified answers. Nothing was saved or executed.',stored:false});
}
