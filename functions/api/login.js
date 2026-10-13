import {json,error,sameOrigin,safeBody,accessKeyHash,constantEqual,throttle,randomToken,sha256,sessionCookie,SESSION_SECONDS} from '../_lib/core.js';
export async function onRequestPost({request,env}){
  if(!sameOrigin(request))return error('Origin denied',403);
  if(!env.DB)return error('Service not configured',503);
  let input;try{input=await safeBody(request)}catch{return error('Invalid request',400)}
  const username=typeof input.username==='string'?input.username.toLowerCase().trim():'';
  const password=input.password;
  if(!/^[a-z0-9._-]{3,40}$/.test(username)||typeof password!=='string'||!/^[a-f0-9]{64}$/.test(password))return error('Invalid login',401);
  if(!await throttle(env,`login:${username}`))return error('Too many attempts; try again later',429);
  const user=await env.DB.prepare('SELECT * FROM users WHERE username=?').bind(username).first();
  if(!user||!constantEqual(await accessKeyHash(password,user.password_salt),user.password_hash))return error('Invalid login',401);
  const token=randomToken();const expires=Math.floor(Date.now()/1000)+SESSION_SECONDS;
  await env.DB.prepare('INSERT INTO sessions(token_hash,user_id,expires_at) VALUES(?,?,?)').bind(await sha256(token),user.id,expires).run();
  const response=json({user:{username:user.username,role:user.role,board:user.board}});
  response.headers.set('Set-Cookie',sessionCookie(token));return response;
}
