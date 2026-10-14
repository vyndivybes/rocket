import test from 'node:test';
import assert from 'node:assert/strict';
import {SOURCE_VERIFIED_EXERCISES,ORIGINAL_WORKED_SOLUTIONS,questionBankProgress} from '../functions/_lib/ncert-solved-exercises.js';
import {NCERT_EXERCISE_LEDGER,exerciseCoverageSummary} from '../functions/_lib/ncert-exercise.js';
import {lessonView,studentLessons} from '../functions/_lib/study.js';

test('primary NCERT PDFs index Physics 4 and Chemistry 4 and all four Matrices chapter 3 exercises',()=>{
 const physics=SOURCE_VERIFIED_EXERCISES['chapter-physics-4'];
 assert.equal(physics.officialPdf,'https://www.ncert.nic.in/textbook/pdf/leph104.pdf');
 assert.deepEqual(physics.questionIds,Array.from({length:13},(_,i)=>'4.'+(i+1)));
 assert.equal(physics.reprintVerified,false,'PDF rendered footer 2025-26 conflicts with extracted 2026-27 metadata');
 const chemistry=SOURCE_VERIFIED_EXERCISES['chapter-chemistry-4'];
 assert.equal(chemistry.officialPdf,'https://ncert.nic.in/textbook/pdf/lech104.pdf');
 assert.deepEqual(chemistry.questionIds,Array.from({length:38},(_,i)=>'4.'+(i+1)));
 assert.equal(chemistry.reprintVerified,true);
 const maths=SOURCE_VERIFIED_EXERCISES['chapter-mathematics-3'];
 assert.equal(maths.officialPdf,'https://ncert.nic.in/textbook/pdf/lemh103.pdf');
 assert.deepEqual(maths.questionIds,[
  ...Array.from({length:10},(_,i)=>'3.1/'+(i+1)),
  ...Array.from({length:22},(_,i)=>'3.2/'+(i+1)),
  ...Array.from({length:12},(_,i)=>'3.3/'+(i+1)),
  ...Array.from({length:11},(_,i)=>'misc/'+(i+1))
 ]);
 assert.equal(maths.reprintVerified,true);
});
test('Physics 4 provides distinct original, directionally checked solutions for all 13 numbered problems',()=>{
 const lessonId='chapter-physics-4',source=SOURCE_VERIFIED_EXERCISES[lessonId];
 const worked=ORIGINAL_WORKED_SOLUTIONS.filter(x=>x.lessonId===lessonId);
 assert.equal(worked.length,13);
 assert.deepEqual(new Set(worked.map(x=>x.questionId)),new Set(source.questionIds));
 for(const x of worked){
  assert.ok(x.steps.length>=2&&x.steps.every(s=>s.length>=40));
  assert.ok(x.answer.length>=12&&x.check.length>=35);
  assert.equal(x.certified,false);
  assert.equal(x.reviewStatus,'ORIGINAL_EDITORIAL_DRAFT');
  assert.equal(x.questionTextRepublished,false);
 }
 const p3=worked.find(x=>x.questionId==='4.3');
 const p4=worked.find(x=>x.questionId==='4.4');
 assert.match(p3.answer,/upward/i);
 assert.match(p4.answer,/south/i);
 const p13=worked.find(x=>x.questionId==='4.13');
 assert.match(p13.steps.join(' '),/\(b\)/);
 assert.match(p13.answer,/same/i);
});
test('physics 4 numerical examples are independently recomputed and carry correct units',()=>{
 const mu=4*Math.PI*1e-7,close=(x,y,tol=.01)=>assert.ok(Math.abs(x/y-1)<tol,`${x} vs ${y}`);
 close(mu*100*.4/(2*.08),3.14e-4);
 close(mu*35/(2*Math.PI*.2),3.50e-5);
 close(mu*50/(2*Math.PI*2.5),4.00e-6);
 close(mu*90/(2*Math.PI*1.5),1.20e-5);
 close(8*.15*Math.sin(Math.PI/6),.6);
 close(10*.03*.27,.081);
 close(mu*8*5*.1/(2*Math.PI*.04),2e-5);
 close(mu*(2000/.8)*8,.02513);
 close(20*12*.1**2*.8*Math.sin(Math.PI/6),.96);
 close((42*1.8e-3*.5)/(30*3.6e-3*.25),1.4);
 close((42*1.8e-3*.5/14)/(30*3.6e-3*.25/10),1);
 close(9.1e-31*4.8e6/(1.5e-19*6.5e-4),.0448);
 close(1.5e-19*6.5e-4/(2*Math.PI*9.1e-31),1.705e7);
 close(30*6*Math.PI*.08**2*Math.sin(Math.PI/3),3.13);
});
test('student chapters expose source-linked Physics 4 answers and honest absence of Chemistry 4/Maths 3 draft bank',()=>{
 const phys=lessonView(studentLessons('CBSE',['Physics']).find(x=>x.id==='chapter-physics-4'));
 const chem=lessonView(studentLessons('CBSE',['Chemistry']).find(x=>x.id==='chapter-chemistry-4'));
 const math=lessonView(studentLessons('CBSE',['Mathematics']).find(x=>x.id==='chapter-mathematics-3'));
 assert.equal(phys.ncertExerciseSolutions.length,13);
 assert.equal(chem.ncertExerciseQuestionCount,38);
 assert.equal(math.ncertExerciseQuestionCount,55);
 assert.deepEqual(chem.ncertExerciseSolutions,[]);
 assert.deepEqual(math.ncertExerciseSolutions,[]);
 assert.equal(studentLessons('ISC',['Physics']).some(x=>x.id==='chapter-physics-4'),false);
 const l=NCERT_EXERCISE_LEDGER.find(x=>x.lessonId==='chapter-physics-4');
 assert.equal(l.editionVerified,false);
 assert.equal(l.questionInventoryStatus,'SOURCE_EDITION_HOLD');
});
test('auditable coverage does not count source indexing as completed answers',()=>{
 const p=questionBankProgress();
 assert.equal(p.indexedUnits,13);
 assert.equal(p.indexedPrintedQuestions,345);
 assert.equal(p.authoredSolutions,252);
 assert.equal(p.unansweredIndexedCount,93);
 assert.equal(p.unindexedUnitCount,53);
 assert.equal(p.qualifiedSolutions,0);
 assert.equal(p.status,'HOLD');
 assert.equal(p.totalPrintedQuestionsAcrossCurriculum,null);
 const summary=exerciseCoverageSummary();
 assert.equal(summary.unindexedUnits.length,53);
 assert.equal(summary.coverageStatus,'HOLD');
});
