import {auth,ensureRole,sameOrigin,safeBody,error,json} from '../_lib/core.js';
const VERSION='PAPA_WELCOME_V2';
export async function onRequestGet({request,env}){
 const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
 const found=await env.DB.prepare('SELECT 1 AS found FROM student_welcome_ack WHERE student_id=? AND version=?').bind(user.id,VERSION).first();
 return json({show:!found,version:VERSION});
}
export async function onRequestPost({request,env}){
 if(!sameOrigin(request))return error('Origin denied',403);
 const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
 let body;try{body=await safeBody(request,240)}catch{return error('Invalid request')}
 if(body?.action!=='dismiss'||body.version!==VERSION)return error('Invalid welcome acknowledgement',422);
 await env.DB.prepare('INSERT OR IGNORE INTO student_welcome_ack(student_id,version) VALUES(?,?)').bind(user.id,VERSION).run();
 return json({ok:true,show:false});
}
