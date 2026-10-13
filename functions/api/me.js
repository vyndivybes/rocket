import {json,error,auth} from '../_lib/core.js';
export async function onRequestGet({request,env}){
  const user=await auth(request,env);if(!user)return error('Sign in required',401);
  return json({username:user.username,role:user.role,board:user.board});
}
