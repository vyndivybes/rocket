import test from 'node:test';
import assert from 'node:assert/strict';
import {SOURCE_VERIFIED_EXERCISES,ORIGINAL_WORKED_SOLUTIONS,questionBankProgress} from '../functions/_lib/ncert-solved-exercises.js';
import {studentLessons,lessonView} from '../functions/_lib/study.js';
const entry=(lessonId,questionId)=>ORIGINAL_WORKED_SOLUTIONS.find(x=>x.lessonId===lessonId&&x.questionId===questionId);

test('all 35 NCERT Mathematics Chapter 1 2026-27 parent references have distinct original worked drafts',()=>{
 const lesson='chapter-mathematics-1',source=SOURCE_VERIFIED_EXERCISES[lesson];
 assert.equal(source.questionIds.length,35);
 const actual=ORIGINAL_WORKED_SOLUTIONS.filter(x=>x.lessonId===lesson);
 assert.equal(actual.length,35);
 assert.deepEqual(new Set(actual.map(x=>x.questionId)),new Set(source.questionIds));
 for(const item of actual){
  assert.ok(item.steps.length>=2&&item.steps.every(x=>x.length>=40),item.questionId+' explanatory steps');
  assert.ok(item.check.length>=35&&item.answer.length>=12,item.questionId+' answer check');
  assert.equal(item.reviewStatus,'ORIGINAL_EDITORIAL_DRAFT');
  assert.equal(item.certified,false);
 }
});

test('NCERT Maths Exercise 1.1 contains exact source-question semantics and answer checks',()=>{
 const relation=entry('chapter-mathematics-1','1.1/1');
 assert.match(relation.steps.join(' '),/Subpart \(i\)/);
 assert.match(relation.steps.join(' '),/Subpart \(v\)/);
 assert.match(entry('chapter-mathematics-1','1.1/5').steps.join(' '),/10≤3³/);
 const multipleChoice=entry('chapter-mathematics-1','1.1/16');
 assert.match(multipleChoice.answer,/option C.*\(6,8\)/i);
 assert.match(multipleChoice.check,/membership/i);
 const mathsFunction=entry('chapter-mathematics-1','1.2/9');
 assert.match(mathsFunction.answer,/Surjective, not one-one/i);
 assert.match(mathsFunction.check,/1 and 2/i);
 const count=entry('chapter-mathematics-1','misc/6');
 assert.match(count.answer,/option A.*1 relation/i);
 assert.match(entry('chapter-mathematics-1','misc/7').answer,/option B.*2 equivalence/i);
});

test('all 18 NCERT Chemistry Electrochemistry 2026-27 parent references have different worked draft entries',()=>{
 const lesson='chapter-chemistry-2',source=SOURCE_VERIFIED_EXERCISES[lesson];
 assert.equal(source.questionIds.length,18);
 const items=ORIGINAL_WORKED_SOLUTIONS.filter(x=>x.lessonId===lesson);
 assert.equal(items.length,18);
 assert.deepEqual(new Set(items.map(x=>x.questionId)),new Set(source.questionIds));
 for(const x of items){
  assert.equal(x.certified,false);
  assert.equal(x.selfCheckRubric.length,3);
 }
});

test('Electrochemistry Nernst result and graph-derived conductivity are re-evaluated numerically',()=>{
 const close=(a,b,tol=0.02)=>assert.ok(Math.abs(a-b)<=tol*Math.abs(b),'actual='+a+' expected='+b);
 const F=96485,coef=.05916;
 close(-0.40-(-0.74),0.34);
 close(-6*F*0.34/1000,-196.83);
 close(10**(6*.34/coef),3.04e34,0.04);
 close(2.71-coef/2*Math.log10(10),2.6804);
 close(.44-coef/2*Math.log10(.001),.5287);
 close(.14-coef/2*Math.log10(.05/(.02*.02)),.0780);
 close(-1.09-coef/2*Math.log10(1/(.01**2*.03**2)),-1.2984);
 const c=[.001,.010,.020,.050,.100],kTable=[1.237,11.85,23.15,55.53,106.74];
 const obtained=kTable.map((value,i)=>(value/100)/(c[i]*1000)*10000);
 const expected=[123.7,118.5,115.75,111.06,106.74];
 obtained.forEach((v,i)=>close(v,expected[i],.000001));
 const answer=entry('chapter-chemistry-2','2.10');
 assert.match(answer.answer,/123\.70/);
 assert.match(answer.answer,/106\.74/);
 assert.match(answer.answer,/125/);
 assert.match(entry('chapter-chemistry-2','2.17').answer,/\(i\) Yes.*\(v\) Yes/);
});

test('new chapter links show the 169 original drafts without leaking server MCQ answer key',()=>{
 const m=lessonView(studentLessons('CBSE',['Mathematics']).find(x=>x.id==='chapter-mathematics-1'));
 const c=lessonView(studentLessons('CBSE',['Chemistry']).find(x=>x.id==='chapter-chemistry-2'));
 assert.equal(m.ncertExerciseSolutions.length,35);
 assert.equal(c.ncertExerciseSolutions.length,18);
 assert.equal('answerIndex' in m,false);
 assert.equal('answerIndex' in c,false);
 assert.ok(m.ncertExerciseSolutions.every(x=>x.certified===false));
 const p=questionBankProgress();
 assert.equal(p.indexedPrintedQuestions,345);
 assert.equal(p.authoredSolutions,272);
 assert.equal(p.unansweredIndexedCount,73);
 assert.equal(p.qualifiedSolutions,0);
 assert.equal(p.status,'HOLD');
 const c1=p.missingByIndexedChapter.find(x=>x.lessonId==='chapter-chemistry-1');
 const m2=p.missingByIndexedChapter.find(x=>x.lessonId==='chapter-mathematics-2');
 assert.equal(c1.missingQuestionIds.length,0);
 assert.equal(m2.missingQuestionIds.length,0);
});
