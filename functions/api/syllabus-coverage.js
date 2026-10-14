import {auth,ensureRole,error,json} from '../_lib/core.js';
import {LESSONS} from '../_lib/study.js';
import {academicInventory,SYLLABUS_SOURCE,SAMPLE_PAPERS} from '../_lib/syllabus-catalog.js';
import {commissioningStatus} from '../_lib/commissioning.js';
import {NCERT_EXERCISE_LEDGER,exerciseCoverageSummary} from '../_lib/ncert-exercise.js';
export async function onRequestGet({request,env}){
 const user=await auth(request,env);
 if(!ensureRole(user,'student'))return error('Student only',403);
 let profile,progress;
 try{
  profile=await env.DB.prepare('SELECT subjects_json FROM study_profiles WHERE student_id=?').bind(user.id).first();
  progress=await env.DB.prepare('SELECT lesson_id,attempts,correct FROM practice_progress WHERE student_id=?').bind(user.id).all();
 }catch{return error('Academic records unavailable; no coverage inferred',503)}
 let subjects;try{subjects=JSON.parse(profile?.subjects_json||'null')}catch{return error('Invalid academic profile; confirm subjects again',409)}
 if(!Array.isArray(subjects)||!subjects.length)return error('Confirm your board and subjects in My subjects',409);
 const board=user.board||'unconfigured',applicable=board==='CBSE';
 return json({board,academicYear:'2026-27',boardConfirmed:applicable,boardEvidence:'learner_selected_not_school_verified',subjects:applicable?academicInventory(subjects,LESSONS,progress.results||[]).map(subject=>({
 ...subject,
 chapters:subject.chapters.map(ch=>{
  const record=NCERT_EXERCISE_LEDGER.find(x=>x.subject===subject.subject&&x.lessonId===ch.moduleId);
  return {...ch,exerciseQuestionCount:record?.questionCount??null,
   exerciseVerifiedQuestionCount:record?.verifiedQuestionCount??0,
   exerciseCoverageStatus:record?.coverageStatus??'HOLD',
   exerciseInventoryStatus:record?.questionInventoryStatus??'EDITION_NOT_RECONCILED',
   exerciseWorkedDraftCount:record?.workedDraftCount??0};
 })
})):[],exerciseCensus:exerciseCoverageSummary(),selectedSubjects:subjects,commissioning:commissioningStatus(),officialCurriculum:SYLLABUS_SOURCE,officialSamplePapers:SAMPLE_PAPERS,disclaimer:'Official outlines do not certify teaching coverage. Foundation accuracy is not chapter mastery or exam readiness. A legacy unspecified English profile requires Core/Elective choice; English Elective 001 can be selected explicitly. School confirmation remains pending.'});
}
