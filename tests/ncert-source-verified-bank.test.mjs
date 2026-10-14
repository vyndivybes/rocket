import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {SOURCE_VERIFIED_EXERCISES,ORIGINAL_WORKED_SOLUTIONS,questionBankProgress} from '../functions/_lib/ncert-solved-exercises.js';
import {NCERT_EXERCISE_LEDGER,exerciseCoverageSummary} from '../functions/_lib/ncert-exercise.js';
import {LESSONS,studentLessons,lessonView} from '../functions/_lib/study.js';

test('NCERT 2026-27 PDFs retain exact Physics and Mathematics chapter one exercise identifiers',()=>{
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
 assert.equal(Object.keys(SOURCE_VERIFIED_EXERCISES).length,13);
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
  assert.equal(x.selfCheckRubric.length,3,x.questionId+' marking checklist');
  assert.ok(x.selfCheckRubric.every(rule=>rule.length>=55),x.questionId+' rubric clarity');
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
 const other=lessonView(LESSONS.find(x=>x.id==='chapter-physics-5'));
 assert.equal(other.ncertExerciseQuestionCount,null);
 assert.deepEqual(other.ncertExerciseSolutions,[]);
});

test('whole programme coverage stays held when only a subset of printed questions have authored solutions',()=>{
 const progress=questionBankProgress();
 assert.equal(progress.mappedUnits,66);
 assert.equal(progress.indexedUnits,13);
 assert.equal(progress.indexedPrintedQuestions,345);
 assert.equal(progress.qualifiedSolutions,0);
 assert.equal(progress.status,'HOLD');
 const summary=exerciseCoverageSummary();
 assert.equal(summary.verifiedQuestionCount,0);
 assert.equal(summary.coverageStatus,'HOLD');
 assert.equal(summary.questionCount,null,'overall census cannot be extrapolated from four chapters');
 const ui=readFileSync(new URL('../public/app.js',import.meta.url),'utf8');
 assert.match(ui,/NCERT indexed exercise solutions/);
 assert.match(ui,/escapeHtml\(item\.answer\)/);
 const sy=readFileSync(new URL('../public/syllabus.js',import.meta.url),'utf8');
 assert.match(sy,/Original worked drafts/);
});

test('Physics 1.13 matches the 2026-27 diagram: two negative tracks and greatest q/m of track 3',()=>{
 const item=ORIGINAL_WORKED_SOLUTIONS.find(x=>x.lessonId==='chapter-physics-1'&&x.questionId==='1.13');
 assert.ok(item);
 assert.match(item.answer,/1 and 2.*negative/i);
 assert.match(item.answer,/3.*positive/i);
 assert.match(item.answer,/3.*greatest/i);
 assert.doesNotMatch(item.answer,/2.*neutral/i);
});

test('source-based electrostatic calculations independently meet units and decimal tolerances',()=>{
 const k=8.9875517923e9,eps=8.8541878128e-12;
 const close=(actual,expected,tol=0.01)=>assert.ok(Math.abs(actual-expected)<=Math.abs(expected)*tol);
 close(k*2e-7*3e-7/0.3**2,5.99e-3);
 close(Math.sqrt(k*.4e-6*.8e-6/.2),.120);
 close(2*k*3e-6/.1**2,5.39e6);
 close(4e-9*5e4*Math.sin(Math.PI/6),1e-4);
 close(8e3*eps,7.08e-8);
 close(10e-6/(6*eps),1.88e5);
 close(2e-6/eps,2.26e5);
 close(-1e3*eps,-8.85e-9);
 close(-1500*.2**2/k,-6.68e-9);
 close(80e-6*4*Math.PI*1.2**2,1.45e-3);
 close(9e4*2*Math.PI*eps*.02,1.00e-7);
 close(17e-22/eps,1.92e-10);
 const patterns={
  '1.1':/5\.99×10⁻³/,'1.2':/0\.120/,'1.8':/5\.39×10⁶/,
  '1.10':/1\.0×10⁻⁴/,'1.11':/1\.87×10¹²/,'1.12':/0\.243/,
  '1.16':/7\.08×10⁻⁸/,'1.17':/1\.88×10⁵/,'1.18':/2\.26×10⁵/,
  '1.19':/−8\.85×10⁻⁹/,'1.20':/−6\.68×10⁻⁹/,
  '1.21':/1\.45×10⁻³/,'1.22':/1\.00×10⁻⁷/,'1.23':/1\.92×10⁻¹⁰/
 };
 for(const [id,pattern] of Object.entries(patterns)){
  const a=ORIGINAL_WORKED_SOLUTIONS.find(x=>x.lessonId==='chapter-physics-1'&&x.questionId===id);
  assert.ok(a);
  assert.match(a.answer,pattern,id+' computation mismatch');
 }
});
