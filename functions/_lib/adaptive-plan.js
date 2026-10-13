import {LESSONS} from './study.js';
// Deterministic guidance from graded practice; no AI diagnosis or inferred school certification.
export function buildAdaptivePlan(progress=[],{maxItems=5}={}){
 if(!Array.isArray(progress)||progress.length>100||!Number.isInteger(maxItems)||maxItems<1||maxItems>12)throw Error('ADAPTIVE_INPUT_INVALID');
 const byId=new Map();
 for(const row of progress){
  if(!row||!Number.isSafeInteger(row.attempts)||!Number.isSafeInteger(row.correct)||row.attempts<0||row.correct<0||row.correct>row.attempts||typeof row.lesson_id!=='string')throw Error('ADAPTIVE_PROGRESS_INVALID');
  if(byId.has(row.lesson_id))throw Error('ADAPTIVE_DUPLICATE_INVALID');
  byId.set(row.lesson_id,row);
 }
 const priority=(lesson)=>{
  const row=byId.get(lesson.id),attempts=row?.attempts||0,correct=row?.correct||0,accuracy=attempts?correct/attempts:null;
  const status=attempts===0?'DIAGNOSTIC':attempts<3?'PRACTICE_MORE':accuracy<.65?'REVIEW':accuracy<.85?'REINFORCE':'ON_TRACK';
  const score=status==='REVIEW'?0:status==='PRACTICE_MORE'?1:status==='DIAGNOSTIC'?2:status==='REINFORCE'?3:4;
  return {lessonId:lesson.id,subject:lesson.subject,title:lesson.title,minutes:Math.min(15,Math.max(5,lesson.duration||10)),attempts,correct,accuracy,status,score,reason:status==='REVIEW'?'Accuracy under 65% after at least three attempts':status==='PRACTICE_MORE'?'Too few attempts for a reliable learning assessment':status==='DIAGNOSTIC'?'No recorded attempt yet':status==='REINFORCE'?'Mixed recent aggregate performance':'Aggregate performance meets the practice threshold'};
 };
 const recommendations=LESSONS.map(priority).sort((a,b)=>a.score-b.score||a.attempts-b.attempts||a.subject.localeCompare(b.subject)||a.lessonId.localeCompare(b.lessonId)).slice(0,maxItems).map(({score,...item})=>item);
 return {schemaVersion:'SAATHI_ADAPTIVE_DIAGNOSTIC_V1',certifiedToSchoolBoard:false,assessmentMethod:'Aggregate graded foundation practice, not a medical or educational diagnosis',recommendations,notice:'Only the recorded attempts are assessed. No examination board, teacher assessment or future success is inferred.'};
}