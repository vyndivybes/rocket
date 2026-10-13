import {auth,ensureRole,sameOrigin,safeBody,error,json,acquireAiQuota} from '../_lib/core.js';
import {validateDocumentUpload,convertDocumentToStudyText} from '../_lib/document-conversion.js';
export async function onRequestPost({request,env}){
 if(!sameOrigin(request))return error('Origin denied',403);
 const student=await auth(request,env);if(!ensureRole(student,'student'))return error('Student only',403);
 let b;try{b=await safeBody(request,1360000)}catch{return error('Document request too large or invalid',413)}
 if(b.confirm!=='CONVERT DOCUMENT')return error('Explicit learner conversion approval is required',400);
 const validation=validateDocumentUpload(b);if(validation)return error(validation,415);
 if(typeof env.AI?.toMarkdown!=='function')return error('Document conversion unavailable',503);
 if(!await acquireAiQuota(env,student.id))return error('Study AI daily allowance reached',429);
 try{return json(await convertDocumentToStudyText({ai:env.AI,name:b.name,base64:b.base64}))}
 catch{return error('Document conversion failed or returned no readable text. Try a shorter document or paste a permitted excerpt.',422)}
}
