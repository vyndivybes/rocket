import test from 'node:test';
import assert from 'node:assert/strict';
import {SOURCE_VERIFIED_EXERCISES, ORIGINAL_WORKED_SOLUTIONS, questionBankProgress} from '../functions/_lib/ncert-solved-exercises.js';
import {NCERT_EXERCISE_LEDGER, exerciseCoverageSummary} from '../functions/_lib/ncert-exercise.js';
import {LESSONS, lessonView, studentLessons} from '../functions/_lib/study.js';

test('official 2026-27 sources preserve four original indexes and now cover seven chapters',()=>{
 const index=SOURCE_VERIFIED_EXERCISES;
 assert.deepEqual(Object.keys(index).slice(0,4),['chapter-physics-1','chapter-mathematics-1','chapter-physics-2','chapter-mathematics-2']);
 assert.equal(index['chapter-physics-2'].officialPdf,'https://ncert.nic.in/textbook/pdf/leph102.pdf');
 assert.equal(index['chapter-mathematics-2'].officialPdf,'https://ncert.nic.in/textbook/pdf/lemh102.pdf');
 assert.deepEqual(index['chapter-physics-2'].questionIds,Array.from({length:11},(_,i)=>'2.'+(i+1)));
 assert.deepEqual(index['chapter-mathematics-2'].questionIds,[
  ...Array.from({length:14},(_,i)=>'2.1/'+(i+1)),
  ...Array.from({length:15},(_,i)=>'2.2/'+(i+1)),
  ...Array.from({length:14},(_,i)=>'misc/'+(i+1))
 ]);
 assert.equal(index['chapter-physics-2'].reprint,'2026-27');
 assert.equal(index['chapter-mathematics-2'].reprint,'2026-27');
 const p=questionBankProgress();
 assert.equal(p.indexedUnits,13);
 assert.equal(p.indexedPrintedQuestions,345);
 assert.equal(p.authoredSolutions,272);
 assert.equal(p.qualifiedSolutions,0);
 assert.equal(p.status,'HOLD');
 const curriculum=exerciseCoverageSummary();
 assert.equal(curriculum.questionCount,null,'do not extrapolate total question count from four chapters');
 assert.equal(curriculum.coverageStatus,'HOLD');
});

test('all sourced original answers have nonempty reasoning, reverse checks, and marked drafts only',()=>{
 const unique=new Set();
 for(const a of ORIGINAL_WORKED_SOLUTIONS){
  assert.ok(SOURCE_VERIFIED_EXERCISES[a.lessonId]?.questionIds.includes(a.questionId),a.questionId);
  const id=a.lessonId+'::'+a.questionId;assert.equal(unique.has(id),false,id);unique.add(id);
  assert.ok(a.steps.length>=2&&a.steps.every(t=>t.length>=35),id);
  assert.ok(a.answer.length>=12&&a.check.length>=35,id);
  assert.equal(a.certified,false,id);
  assert.equal(a.reviewStatus,'ORIGINAL_EDITORIAL_DRAFT',id);
  assert.equal(a.questionTextRepublished,false,id);
  assert.equal(a.selfCheckRubric.length,3,id);
 }
 const p2=lessonView(LESSONS.find(x=>x.id==='chapter-physics-2'));
 const m2=lessonView(LESSONS.find(x=>x.id==='chapter-mathematics-2'));
 assert.equal(p2.ncertExerciseSolutions.length,11);
 assert.equal(m2.ncertExerciseSolutions.length,43);
 assert.equal(m2.ncertExerciseQuestionCount,43);
 assert.equal(studentLessons('ISC',['Physics']).some(x=>x.id===p2.id),false);
});

test('physics 1.9 uses physical z-axis and dipole negative k not fabricated y-axis',()=>{
 const solution=ORIGINAL_WORKED_SOLUTIONS.find(x=>x.lessonId==='chapter-physics-1'&&x.questionId==='1.9');
 assert.match(solution.answer,/−.*k|negative z/i);
 assert.doesNotMatch(solution.answer,/ĵ|\by-axis\b/i);
 assert.ok(solution.steps.some(x=>/z-axis/i.test(x)));
});

test('Physics chapter 2 constants and capacitor solutions agree numerically',()=>{
 const k=8.9875517923e9,eps=8.8541878128e-12;
 const near=(x,y,rel=0.015)=>assert.ok(Math.abs(x-y)<rel*Math.abs(y),x+' vs '+y);
 near(6*k*5e-3/0.1,2.70e9);
 near(k*1.6e-7/(0.12**2),9.99e4);
 near(k*1.6e-7/(0.18**2),4.44e4);
 near(eps*6e-3/(3e-3),1.77e-11);
 near(.5*12e-12*50**2,1.5e-8);
 near(.25*600e-12*200**2,6e-6);
 const answers=new Map(ORIGINAL_WORKED_SOLUTIONS.filter(x=>x.lessonId==='chapter-physics-2').map(x=>[x.questionId,x.answer]));
 for(const id of ['2.1','2.2','2.4','2.5','2.6','2.7','2.8','2.9','2.10','2.11'])assert.ok(answers.has(id));
 assert.match(answers.get('2.11'),/6\.0×10⁻⁶/);
 assert.match(answers.get('2.5'),/96 pF/);
});

test('maths chapter 2 principal-value responses respect NCERT branches and correct options',()=>{
 const items=ORIGINAL_WORKED_SOLUTIONS.filter(x=>x.lessonId==='chapter-mathematics-2');
 const expected=['−π/6','π/6','π/6','−π/3','2π/3','−π/4','π/6','π/6','3π/4','−π/4','3π/4','2π/3','option B','−π/3'];
 for(let i=0;i<14;i++)assert.ok(items[i]?.answer.includes(expected[i]),'2.1/'+(i+1)+' expected '+expected[i]);
});

test('exact missing-work audit lists unsolved indexed refs, not a fake all-NCERT percentage',()=>{
 const p=questionBankProgress();
 assert.equal(p.unindexedUnitCount,53);
 assert.equal(p.unansweredIndexedCount,73);
 assert.equal(p.indexedQuestionDraftCount,272);
 const m1=p.missingByIndexedChapter.find(x=>x.lessonId==='chapter-mathematics-1');
 const m2=p.missingByIndexedChapter.find(x=>x.lessonId==='chapter-mathematics-2');
 const phy1=p.missingByIndexedChapter.find(x=>x.lessonId==='chapter-physics-1');
 const phy2=p.missingByIndexedChapter.find(x=>x.lessonId==='chapter-physics-2');
 assert.equal(m1.missingQuestionIds.length,0);
 assert.equal(m2.missingQuestionIds.length,0);
 assert.equal(phy1.missingQuestionIds.length,0);
 assert.equal(phy2.missingQuestionIds.length,0);
 assert.equal(p.totalPrintedQuestionsAcrossCurriculum,null);
});
