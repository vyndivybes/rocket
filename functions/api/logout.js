import {json,error,sameOrigin,auth,parseCookie,sha256,clearCookie} from '../_lib/core.js';
export async function onRequestPost({request,env}){
  if(!sameOrigin(request))return error('Origin denied',403);
  const user=await auth(request,env);
  const token=parseCookie(request);
  if(user&&token)await env.DB.prepare('DELETE FROM sessions WHERE token_hash=?').bind(await sha256(token)).run();
  const response=json({ok:true});response.headers.set('Set-Cookie',clearCookie());return response;
}
