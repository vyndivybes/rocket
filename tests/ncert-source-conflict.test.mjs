import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {SOURCE_VERIFIED_EXERCISES,ORIGINAL_WORKED_SOLUTIONS,questionBankProgress} from '../functions/_lib/ncert-solved-exercises.js';
import {exerciseCoverageSummary,NCERT_EXERCISE_LEDGER} from '../functions/_lib/ncert-exercise.js';
import {lessonView,studentLessons} from '../functions/_lib/study.js';

test('Official NCERT Solutions 2026-27 verifies 41 not 33 parent exercise numbers',()=>{
 const source=SOURCE_VERIFIED_EXERCISES['chapter-chemistry-1'];
 assert.equal(source.officialPdf,'https://www.ncert.nic.in/textbook/pdf/lech101.pdf');
 assert.equal(source.reprint,'2026-27');
 assert.deepEqual(source.questionIds,Array.from({length:41},(_,i)=>'1.'+(i+1)));
 const ledger=NCERT_EXERCISE_LEDGER.find(x=>x.lessonId==='chapter-chemistry-1');
 assert.equal(ledger.editionVerified,true);
 assert.equal(ledger.questionInventoryStatus,'SOURCE_INDEX_RECONCILED');
 assert.equal(ledger.questionCount,41);
 const census=exerciseCoverageSummary();
 assert.deepEqual(census.sourceReconciliationHolds,[]);
 assert.equal(census.sourceReconciliationResolutions.length,1);
 assert.equal(census.sourceReconciliationResolutions[0].authoritativeParentCount,41);
 assert.equal(census.sourceReconciliationResolutions[0].status,'SOURCE_RECONCILED');
 assert.equal(census.coverageStatus,'HOLD','overall 66-unit textbook census still incomplete');
 assert.equal(census.questionCount,null);
});

test('All 41 Solutions parent questions have unique original steps and remain uncertified',()=>{
 const items=ORIGINAL_WORKED_SOLUTIONS.filter(x=>x.lessonId==='chapter-chemistry-1');
 const source=SOURCE_VERIFIED_EXERCISES['chapter-chemistry-1'];
 assert.equal(items.length,41);
 assert.deepEqual(new Set(items.map(x=>x.questionId)),new Set(source.questionIds));
 for(const item of items){
  assert.ok(item.steps.length>=2&&item.steps.every(x=>x.length>=40),item.questionId);
  assert.ok(item.answer.length>=12&&item.check.length>=35,item.questionId);
  assert.equal(item.certified,false);
  assert.equal(item.questionTextRepublished,false);
  assert.equal(item.selfCheckRubric.length,3);
 }
 const view=lessonView(studentLessons('CBSE',['Chemistry']).find(x=>x.id==='chapter-chemistry-1'));
 assert.equal(view.ncertExerciseQuestionCount,41);
 assert.equal(view.ncertExerciseSolutions.length,41);
 assert.equal(view.ncertOfficialSourceUrl,source.officialPdf);
 assert.equal(studentLessons('ISC',['Chemistry']).some(x=>x.id==='chapter-chemistry-1'),false);
 assert.equal('answerIndex' in view,false);
});

test('independent numeric checks of eight new physical chemistry exercises',()=>{
 const close=(x,y,tol=.015)=>assert.ok(Math.abs(x/y-1)<=tol,'actual '+x+' expected '+y);
 close(17.535*25/(25+25/180),17.438);
 close(760/427000,0.00178);
 const na=100/140,nb=1000/180,xa=na/(na+nb),xb=nb/(na+nb),pA=475-xb*500;
 close(pA/xa,280.56);
 const nBz=80/78.11,nTo=100/92.14,xBz=nBz/(nBz+nTo);
 close((xBz*50.71)/(xBz*50.71+(1-xBz)*32.06),.599);
 close(1520/3.30e7,4.61e-5);
 close(6004/6.51e7,9.22e-5);
 close((.75*2.5)/(2.47*.082057*300)*110.98,3.42);
 close(3*(.025/174.26/2)*.082057*298,.005262);
 const p=questionBankProgress();
 assert.equal(p.indexedUnits,10);
 assert.equal(p.indexedPrintedQuestions,239);
 assert.equal(p.authoredSolutions,239);
 assert.equal(p.unansweredIndexedCount,0);
 assert.equal(p.unindexedUnitCount,56);
 assert.equal(p.qualifiedSolutions,0);
 assert.equal(p.totalPrintedQuestionsAcrossCurriculum,null);
});
test('student syllabus contains no obsolete 33 versus 41 warning after reconciliation',()=>{
 const ui=readFileSync(new URL('../public/syllabus.js',import.meta.url),'utf8');
 assert.doesNotMatch(ui,/33 versus 41/);
});
