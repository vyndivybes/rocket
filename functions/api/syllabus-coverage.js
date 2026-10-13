import {auth,ensureRole,error,json} from '../_lib/core.js';
import {LESSONS} from '../_lib/study.js';
import {syllabusInventory,SYLLABUS_SOURCE,SAMPLE_PAPERS} from '../_lib/syllabus-catalog.js';
export async function onRequestGet({request,env}){
 const user=await auth(request,env);
 if(!ensureRole(user,'student'))return error('Student only',403);
 const profile=await env.DB.prepare('SELECT subjects,board FROM study_profiles WHERE student_id=?').bind(user.id).first().catch(()=>null);
 let subjects;try{subjects=JSON.parse(profile?.subjects||'null')}catch{subjects=null}
 if(!Array.isArray(subjects)||!subjects.length)subjects=['Physics','Chemistry','Mathematics','Biology','English'];
 const board=profile?.board||user.board||'unconfigured';
 return json({board,academicYear:'2026-27',boardConfirmed:board==='CBSE',subjects:syllabusInventory(subjects,LESSONS),officialCurriculum:SYLLABUS_SOURCE,officialSamplePapers:SAMPLE_PAPERS,disclaimer:'Chapter names only where independently checked. No complete syllabus teaching or mastery is certified.'});
}
