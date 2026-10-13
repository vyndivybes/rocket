import {auth,ensureRole,sameOrigin,safeBody,json,error} from '../_lib/core.js';
import {DEFAULT_COMPANION_NAME,validateCompanionName} from '../_lib/companion-name.js';
export async function onRequestGet({request,env}){
 const user=await auth(request,env);
 if(!ensureRole(user,'student'))return error('Student only',403);
 const saved=await env.DB.prepare('SELECT name FROM companion_preferences WHERE student_id=?').bind(user.id).first();
 return json({name:saved?.name??DEFAULT_COMPANION_NAME,configured:!!saved,notice:'This is an AI assistant, not a human friend. You can change its name whenever you want.'});
}
export async function onRequestPost({request,env}){
 if(!sameOrigin(request))return error('Origin denied',403);
 const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
 let b;try{b=await safeBody(request,400)}catch{return error('Invalid request')}
 const problem=validateCompanionName(b?.name);if(problem)return error(problem);
 const name=b.name.trim().normalize('NFC');
 await env.DB.prepare('INSERT INTO companion_preferences(student_id,name) VALUES(?,?) ON CONFLICT(student_id) DO UPDATE SET name=excluded.name,updated_at=CURRENT_TIMESTAMP').bind(user.id,name).run();
 return json({ok:true,name,configured:true});
}
