import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {SOURCE_VERIFIED_EXERCISES,ORIGINAL_WORKED_SOLUTIONS,questionBankProgress} from '../functions/_lib/ncert-solved-exercises.js';
import {NCERT_EXERCISE_LEDGER,exerciseCoverageSummary} from '../functions/_lib/ncert-exercise.js';
import {LESSONS,studentLessons,lessonView} from '../functions/_lib/study.js';

test('NCERT reprint 2026-27 PDF reconciled two chapter exercise headings without invented counts',()=>{
 const physics=SOURCE_VERIFIED_EXERCISES['chapter-physics-1'];
 const maths=SOURCE_VERIFIED_EXERCISES['chapter-mathematics-1'];
 assert.equal(physics.officialPdf,'https://ncert.nic.in/textbook/pdf/leph101.pdf');
 assert.equal(maths.officialPdf,'https://ncert.nic.in/textbook/pdf/lemh101.pdf');
 assert.equal(physics.reprint,'2026-27');
 assert.equal(maths.reprint,'2026-27');
 assert.equal(physics.questionIds.length,23);
 assert.equal(maths.questionIds.length,35);
 assert.deepEqual(physics.questionIds,Array.from({length:23},(_,i)=>'1.'+(i+1)));
 assert.deepEqual(maths.questionIds,[
 ...Array.from({length:16},(_,i)=>'1.1/'+(i+1)),
 ...Array.from({length:12},(_,i)=>'1.2/'+(i+1)),
 ...Array.from({length:7},(_,i)=>'misc/'+(i+1))
 ]);
 assert.equal(Object.keys(SOURCE_VERIFIED_EXERCISES).length,2);
 const ledgerP=NCERT_EXERCISE_LEDGER.find(x=>x.lessonId==='chapter-physics-1');
 const ledgerM=NCERT_EXERCISE_LEDGER.find(x=>x.lessonId==='chapter-mathematics-1');
 assert.equal(ledgerP.questionCount,23);
 assert.equal(ledgerM.questionCount,35);
 assert.equal(ledgerP.questionInventoryStatus,'SOURCE_INDEX_RECONCILED');
 assert.equal(ledgerM.questionInventoryStatus,'SOURCE_INDEX_RECONCILED');
 assert.equal(ledgerP.verifiedQuestionCount,0);
 assert.equal(ledgerM.verifiedQuestionCount,0);
});

test('original worked explanations map only to authentic indexed references and are not reproduced textbook questions',()=>{
 assert.ok(ORIGINAL_WORKED_SOLUTIONS.length>=28);
 assert.equal(new Set(ORIGINAL_WORKED_SOLUTIONS.map(x=>x.lessonId+'::'+x.questionId)).size,ORIGINAL_WORKED_SOLUTIONS.length);
 for(const x of ORIGINAL_WORKED_SOLUTIONS){
  assert.ok(SOURCE_VERIFIED_EXERCISES[x.lessonId]?.questionIds.includes(x.questionId),x.questionId);
  assert.ok(x.problemFocus.length>=20,x.questionId+' focus');
  assert.ok(Array.isArray(x.steps)&&x.steps.length>=2&&x.steps.every(y=>y.length>=40),x.questionId+' steps');
  assert.ok(x.answer.length>=12,x.questionId+' answer');
  assert.ok(x.check.length>=35,x.questionId+' reverse check');
  assert.equal(x.reviewStatus,'ORIGINAL_EDITORIAL_DRAFT',x.questionId);
  assert.equal(x.certified,false,x.questionId);
  assert.equal(x.questionTextRepublished,false,x.questionId);
 }
});

test('source-linked solutions are visible to permitted learners without claiming certification',()=>{
 const phys=studentLessons('CBSE',['Physics']).find(x=>x.id==='chapter-physics-1');
 const v=lessonView(phys);
 assert.equal(v.ncertExerciseQuestionCount,23);
 assert.equal(v.ncertExerciseSolutions.length,23);
 assert.ok(v.ncertExerciseSolutions.every(x=>typeof x.answer==='string'&&x.certified===false));
 assert.equal('answerIndex' in v,false);
 assert.equal(studentLessons('ISC',['Physics']).some(x=>x.id===phys.id),false);
 const math=lessonView(LESSONS.find(x=>x.id==='chapter-mathematics-1'));
 assert.equal(math.ncertExerciseQuestionCount,35);
 assert.ok(math.ncertExerciseSolutions.length>=5);
 const other=lessonView(LESSONS.find(x=>x.id==='chapter-physics-2'));
 assert.equal(other.ncertExerciseQuestionCount,null);
 assert.deepEqual(other.ncertExerciseSolutions,[]);
});

test('whole programme coverage stays held when only a subset of printed questions have authored solutions',()=>{
 const progress=questionBankProgress();
 assert.equal(progress.mappedUnits,66);
 assert.equal(progress.indexedUnits,2);
 assert.equal(progress.indexedPrintedQuestions,58);
 assert.equal(progress.qualifiedSolutions,0);
 assert.equal(progress.status,'HOLD');
 const summary=exerciseCoverageSummary();
 assert.equal(summary.verifiedQuestionCount,0);
 assert.equal(summary.coverageStatus,'HOLD');
 assert.equal(summary.questionCount,null,'overall census cannot be extrapolated from two chapters');
 const ui=readFileSync(new URL('../public/app.js',import.meta.url),'utf8');
 assert.match(ui,/NCERT indexed exercise solutions/);
 assert.match(ui,/escapeHtml\(item\.answer\)/);
 const sy=readFileSync(new URL('../public/syllabus.js',import.meta.url),'utf8');
 assert.match(sy,/Original worked drafts/);
});
