import {json,error,auth,ensureRole,sameOrigin,safeBody} from '../_lib/core.js';
import {BOARDS,validateProfile} from '../_lib/study.js';
export async function onRequestGet({request,env}){
 const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
 const row=await env.DB.prepare('SELECT stream,subjects_json,daily_minutes FROM study_profiles WHERE student_id=?').bind(user.id).first();
 return json({profile:row?{board:user.board,stream:row.stream,subjects:JSON.parse(row.subjects_json),dailyMinutes:row.daily_minutes}:null,board:user.board,options:{boards:BOARDS}});
}
export async function onRequestPost({request,env}){
 if(!sameOrigin(request))return error('Origin denied',403);
 const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
 let b;try{b=await safeBody(request,3000)}catch{return error('Invalid JSON');}
 const e=validateProfile(b);if(e)return error(e);
 // The student's board and preferences are under their own control. No name, school or DOB.
 await env.DB.prepare('INSERT INTO study_profiles(student_id,stream,subjects_json,daily_minutes) VALUES(?,?,?,?) ON CONFLICT(student_id) DO UPDATE SET stream=excluded.stream,subjects_json=excluded.subjects_json,daily_minutes=excluded.daily_minutes,updated_at=CURRENT_TIMESTAMP').bind(user.id,b.stream,JSON.stringify(b.subjects),b.dailyMinutes).run();
 await env.DB.prepare('UPDATE users SET board=? WHERE id=? AND role=?').bind(b.board,user.id,'student').run();
 return json({ok:true});
}
