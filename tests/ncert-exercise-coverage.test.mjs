import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {CHAPTER_MODULES} from '../functions/_lib/chapter-modules.js';
import {LESSONS,lessonView} from '../functions/_lib/study.js';
import {
 NCERT_EXERCISE_LEDGER,
 exerciseCoverageSummary,
 validateExerciseRequest,
 buildExerciseCoachMessages,
 auditedExerciseCoverage
} from '../functions/_lib/ncert-exercise.js';

test('exercise authority maps all 66 NCERT teaching units without inventing printed problem counts',()=>{
 assert.equal(NCERT_EXERCISE_LEDGER.length,66);
 assert.equal(new Set(NCERT_EXERCISE_LEDGER.map(x=>x.lessonId)).size,66);
 assert.deepEqual(
 ['Physics','Chemistry','Mathematics','Biology','English Elective'].map(s=>NCERT_EXERCISE_LEDGER.filter(x=>x.subject===s).length),
 [14,10,13,13,16]
 );
 for(const [i,x] of NCERT_EXERCISE_LEDGER.entries()){
  assert.equal(x.lessonId,CHAPTER_MODULES[i].id);
  assert.equal(x.title,CHAPTER_MODULES[i].title);
  assert.equal(x.verifiedQuestionCount,0);
  if(['chapter-physics-1','chapter-mathematics-1'].includes(x.lessonId)){
   assert.ok(x.editionVerified);
   assert.equal(x.questionCount,x.lessonId==='chapter-physics-1'?23:35);
   assert.equal(x.questionInventoryStatus,'SOURCE_INDEX_RECONCILED');
  }else{
   assert.equal(x.questionCount,null);
   assert.equal(x.questionInventoryStatus,'EDITION_NOT_RECONCILED');
  }
  assert.equal(x.coverageStatus,'HOLD');
  assert.equal(x.answerReviewStatus,'NOT_VERIFIED');
  assert.ok(x.officialCatalogueUrl.includes('ncert.nic.in'));
  assert.ok(typeof x.bookTitle==='string'&&x.bookTitle.length>3);
  assert.equal(x.reproducedQuestionText,false);
 }
 const aggregate=exerciseCoverageSummary();
 assert.equal(aggregate.unitCount,66);
 assert.equal(aggregate.verifiedQuestionCount,0);
 assert.equal(aggregate.questionCount,null);
 assert.equal(aggregate.coverageStatus,'HOLD');
 assert.equal(aggregate.verifiedQuestionPercent,null);
});

test('coverage calculation can only pass on reconciled edition and individually qualified solutions',()=>{
 assert.equal(auditedExerciseCoverage({editionVerified:false,expectedQuestionIds:['1','2'],items:[{id:'1',verified:true},{id:'2',verified:true}]}).status,'HOLD');
 assert.equal(auditedExerciseCoverage({editionVerified:true,expectedQuestionIds:null,items:[]}).status,'HOLD');
 assert.equal(auditedExerciseCoverage({editionVerified:true,expectedQuestionIds:['1','2'],items:[{id:'1',verified:true}]}).status,'HOLD');
 assert.equal(auditedExerciseCoverage({editionVerified:true,expectedQuestionIds:['1','2'],items:[{id:'1',verified:true},{id:'2',verified:false}]}).status,'HOLD');
 const done=auditedExerciseCoverage({editionVerified:true,expectedQuestionIds:['1','2'],items:[{id:'1',verified:true},{id:'2',verified:true}]});
 assert.equal(done.status,'QUALIFIED');
 assert.equal(done.verifiedCount,2);
 assert.equal(done.questionCount,2);
 assert.equal(done.percent,100);
 assert.equal(auditedExerciseCoverage({editionVerified:true,expectedQuestionIds:['1','1'],items:[{id:'1',verified:true}]}).status,'HOLD');
});

test('exercise coaching requires authentic learner-supplied question, exact allowed chapter and sane reference',()=>{
 const id='chapter-physics-1';
 assert.ok(validateExerciseRequest({lessonId:id,exerciseRef:'1.2 Q5',questionText:'Two charges are held 20 cm apart. Calculate their interaction force given charges and units.',level:'steps'}));
 for(const b of [
  {lessonId:id,exerciseRef:'1.2 Q5',questionText:'',level:'steps'},
  {lessonId:id,exerciseRef:'1.2 Q5',questionText:'2+2',level:'steps'},
  {lessonId:'bad-id',exerciseRef:'1.2 Q5',questionText:'Solve the detailed exercise shown in the official textbook please.',level:'steps'},
  {lessonId:id,exerciseRef:'q<bad>',questionText:'Solve the detailed exercise shown in the official textbook please.',level:'steps'},
  {lessonId:id,exerciseRef:'1.2 Q5',questionText:'Solve the detailed exercise shown in the official textbook please.',level:'unsafe'}
 ]) assert.equal(validateExerciseRequest(b),null,JSON.stringify(b));
});

test('exercise prompt supplies original problem as untrusted input and explicitly avoids invented textbook citations',()=>{
 const b={lessonId:'chapter-mathematics-5',exerciseRef:'Exercise 5.2 / Q 4',questionText:'A learner copied an example derivative question from their own school textbook and wants the working shown.',level:'steps'};
 const messages=buildExerciseCoachMessages(b,CHAPTER_MODULES.find(x=>x.id===b.lessonId));
 assert.equal(messages.length,2);
 assert.match(messages[0].content,/not.*verified NCERT/i);
 assert.match(messages[0].content,/do not complete a live exam/i);
 assert.match(messages[0].content,/trusted human/i);
 assert.match(messages[0].content,/No advertising or persuasion/i);
 assert.match(messages[0].content,/Do not invent.*page/i);
 assert.match(messages[0].content,/units|check/i);
 assert.match(messages[1].content,/untrusted exercise text/i);
 assert.match(messages[1].content,/Exercise 5.2/);
 assert.match(messages[1].content,/A learner copied/);
 assert.ok(!messages[0].content.includes(b.questionText),'no untrusted problem in system role');
});

test('exercise view and syllabus use unknown census rather than false completion or leaked grading keys',()=>{
 const x=lessonView(LESSONS.find(l=>l.id==='chapter-physics-1'));
 assert.equal('answerIndex' in x,false);
 const ui=readFileSync(new URL('../public/app.js',import.meta.url),'utf8');
 assert.match(ui,/id="ncert-exercise-form"/);
 assert.match(ui,/post\('ncert-exercise-coach'/);
 assert.match(ui,/Exercise help does not certify/);
 const sy=readFileSync(new URL('../public/syllabus.js',import.meta.url),'utf8');
 assert.match(sy,/question census pending/i);
});
