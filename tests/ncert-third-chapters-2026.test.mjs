import test from 'node:test';
import assert from 'node:assert/strict';
import {SOURCE_VERIFIED_EXERCISES,ORIGINAL_WORKED_SOLUTIONS,questionBankProgress} from '../functions/_lib/ncert-solved-exercises.js';
import {lessonView,studentLessons} from '../functions/_lib/study.js';
import {exerciseCoverageSummary} from '../functions/_lib/ncert-exercise.js';
const sources={
 'chapter-physics-3':{url:'https://ncert.nic.in/textbook/pdf/leph103.pdf',count:9,prefix:'3.'},
 'chapter-chemistry-3':{url:'https://ncert.nic.in/textbook/pdf/lech103.pdf',count:30,prefix:'3.'},
 'chapter-biology-3':{url:'https://ncert.nic.in/textbook/pdf/lebo103.pdf',count:12,prefix:''}
};
test('official NCERT 2026-27 third-chapter printed end exercise question inventory',()=>{
 for(const [lessonId,cfg] of Object.entries(sources)){
  const source=SOURCE_VERIFIED_EXERCISES[lessonId];
  assert.ok(source,lessonId);
  assert.equal(source.officialPdf,cfg.url);
  assert.equal(source.reprint,'2026-27');
  assert.deepEqual(source.questionIds,Array.from({length:cfg.count},(_,i)=>cfg.prefix+(i+1)));
  assert.equal(source.questionIds.length,cfg.count);
  const view=lessonView(studentLessons('CBSE',[lessonId.includes('physics')?'Physics':lessonId.includes('chemistry')?'Chemistry':'Biology']).find(x=>x.id===lessonId));
  assert.equal(view.ncertExerciseQuestionCount,cfg.count);
  assert.equal(view.ncertOfficialSourceUrl,cfg.url);
 }
});
test('all third chapter parent questions have unique original explanatory answers and no false certification',()=>{
 for(const [lessonId,{count}] of Object.entries(sources)){
  const sol=ORIGINAL_WORKED_SOLUTIONS.filter(x=>x.lessonId===lessonId);
  assert.equal(sol.length,count,lessonId);
  assert.deepEqual(new Set(sol.map(x=>x.questionId)),new Set(SOURCE_VERIFIED_EXERCISES[lessonId].questionIds));
  for(const a of sol){
   assert.ok(a.steps.length>=2&&a.steps.every(x=>x.length>=38),lessonId+' '+a.questionId+' steps');
   assert.ok(a.answer.length>=12&&a.check.length>=35,lessonId+' '+a.questionId+' check');
   assert.equal(a.reviewStatus,'ORIGINAL_EDITORIAL_DRAFT');
   assert.equal(a.certified,false);
   assert.equal(a.questionTextRepublished,false);
   assert.equal(a.selfCheckRubric.length,3);
  }
 }
});
test('official biology 3 multi-part questions preserve all eight separate true/false and correction statements',()=>{
 const all=ORIGINAL_WORKED_SOLUTIONS.filter(x=>x.lessonId==='chapter-biology-3');
 const q11=all.find(x=>x.questionId==='11'),q12=all.find(x=>x.questionId==='12');
 assert.ok(q11.steps.join(' ').includes('(a)'));
 assert.ok(q11.steps.join(' ').includes('(d)'));
 assert.ok(q12.steps.join(' ').includes('(a)'));
 assert.ok(q12.steps.join(' ').includes('(d)'));
 assert.match(q11.answer,/true.*false.*true.*true/i);
 assert.match(q12.answer,/contracept|gamete/i);
});
test('Chemistry 3.17 correctly uses microgram not milligram from rendered official 2026-27 problem',()=>{
 const x=ORIGINAL_WORKED_SOLUTIONS.find(x=>x.lessonId==='chapter-chemistry-3'&&x.questionId==='3.17');
 assert.ok(x);
 assert.match(x.steps.join(' '),/1\s*μg|one microgram|1 microgram/i);
 assert.doesNotMatch(x.steps.join(' '),/1\s*mg|one milligram/i);
 assert.match(x.answer,/μg|microgram/i);
});
test('Physics 3 includes actual source-checked bridge image dependency, no invented diagram authority',()=>{
 const x=ORIGINAL_WORKED_SOLUTIONS.find(x=>x.lessonId==='chapter-physics-3'&&x.questionId==='3.7');
 assert.ok(x);
 assert.match(x.check,/figure|diagram/i);
 assert.equal(x.diagramVerified,false);
 assert.ok(x.diagram&&x.diagram.length>20);
});
test('newly checked sources expand authored count without inventing whole-66-unit total',()=>{
 const p=questionBankProgress();
 assert.equal(p.indexedUnits,10);
 assert.equal(p.indexedPrintedQuestions,231);
 assert.equal(p.authoredSolutions,220);
 assert.equal(p.unansweredIndexedCount,11);
 assert.equal(p.unindexedUnitCount,56);
 assert.equal(p.qualifiedSolutions,0);
 assert.equal(p.totalPrintedQuestionsAcrossCurriculum,null);
 assert.equal(p.status,'HOLD');
 const summary=exerciseCoverageSummary();
 assert.equal(summary.unindexedUnits.length,56);
 assert.equal(summary.sourceReconciliationHolds[0].lessonId,'chapter-chemistry-1');
 assert.equal(summary.coverageStatus,'HOLD');
});
