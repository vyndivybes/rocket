import {json,error,auth,TOPICS,SOURCES} from '../_lib/core.js';
export async function onRequestGet({request,env}){
  const user=await auth(request,env);if(!user)return error('Sign in required',401);
  return json({topics:TOPICS,sources:SOURCES,notice:'Starter topics are general examples, not an audited board syllabus. Verify against your current official syllabus.'});
}
