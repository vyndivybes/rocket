import test from 'node:test';
import assert from 'node:assert/strict';
import {SOURCE_VERIFIED_EXERCISES,ORIGINAL_WORKED_SOLUTIONS,questionBankProgress} from '../functions/_lib/ncert-solved-exercises.js';
import {lessonView,studentLessons} from '../functions/_lib/study.js';
const ref=(id)=>ORIGINAL_WORKED_SOLUTIONS.find(x=>x.lessonId==='chapter-mathematics-2'&&x.questionId===id);
const near=(actual,expected,tolerance=1e-9)=>assert.ok(Math.abs(actual-expected)<tolerance,actual+' vs '+expected);
test('NCERT 2026-27 Maths 2 all 43 parent question IDs have original steps, answer, self-check and no teacher certificate',()=>{
 const x=SOURCE_VERIFIED_EXERCISES['chapter-mathematics-2'];
 assert.equal(x.officialPdf,'https://ncert.nic.in/textbook/pdf/lemh102.pdf');
 assert.equal(x.reprint,'2026-27');
 assert.equal(x.questionIds.length,43);
 const items=ORIGINAL_WORKED_SOLUTIONS.filter(z=>z.lessonId==='chapter-mathematics-2');
 assert.equal(items.length,43);
 assert.deepEqual(new Set(items.map(z=>z.questionId)),new Set(x.questionIds));
 for(const item of items){
  assert.ok(item.steps.length>=2&&item.steps.every(v=>v.length>=40),item.questionId);
  assert.ok(item.answer.length>=12&&item.check.length>=35,item.questionId);
  assert.equal(item.selfCheckRubric.length,3,item.questionId);
  assert.equal(item.certified,false);
  assert.equal(item.reviewStatus,'ORIGINAL_EDITORIAL_DRAFT');
  assert.equal(item.questionTextRepublished,false);
 }
 const view=lessonView(studentLessons('CBSE',['Mathematics']).find(x=>x.id==='chapter-mathematics-2'));
 assert.equal(view.ncertExerciseQuestionCount,43);
 assert.equal(view.ncertExerciseSolutions.length,43);
 assert.equal(view.ncertOfficialSourceUrl,x.officialPdf);
 assert.equal('answerIndex' in view,false);
 assert.equal(studentLessons('ISC',['Mathematics']).some(x=>x.id==='chapter-mathematics-2'),false);
});
test('principal arcsine/arccosine triple-angle identities work only on their permitted NCERT domains',()=>{
 for(const x of [-.5,-.3,0,.2,.5])near(Math.asin(3*x-4*x**3),3*Math.asin(x));
 for(const x of [.5,.7,.9,1])near(Math.acos(4*x**3-3*x),3*Math.acos(x));
 for(const x of [-2,-1,-.3,.3,1,2])near(Math.atan((Math.sqrt(1+x*x)-1)/x),Math.atan(x)/2);
 for(const x of [.2,1,2,3])near(Math.atan(Math.sqrt((1-Math.cos(x))/(1+Math.cos(x)))),x/2);
 for(const x of [-.70,0,1,2])near(Math.atan((Math.cos(x)-Math.sin(x))/(Math.cos(x)+Math.sin(x))),Math.PI/4-x);
 for(const x of [-.9,0,.6,.9])near(Math.atan(x/Math.sqrt(1.5**2-x*x)),Math.asin(x/1.5));
 for(const x of [-1,-.5,0,.5,1]){const a=2;near(Math.atan((3*a*a*x-x**3)/(a**3-3*a*x*x)),3*Math.atan(x/a))}
 assert.match(ref('2.2/1').answer,/arcsin\(3x−4x³\)/);
 assert.match(ref('2.2/2').answer,/arccos\(4x³−3x\)/);
});
test('four principal-value-folding and choice regressions prevent automatic trig-inverse cancellation',()=>{
 const values={'2.2/10':'π/3','2.2/11':'−π/4','2.2/13':'5π/6','2.2/15':'−π/2',
  'misc/1':'π/6','misc/2':'π/6','misc/14':'x=0'};
 for(const [qid,expected] of Object.entries(values))assert.ok(ref(qid).answer.includes(expected),qid);
 near(Math.asin(Math.sin(2*Math.PI/3)),Math.PI/3);
 near(Math.atan(Math.tan(3*Math.PI/4)),-Math.PI/4);
 near(Math.acos(Math.cos(7*Math.PI/6)),5*Math.PI/6);
 near(Math.atan(Math.tan(7*Math.PI/6)),Math.PI/6);
 near(Math.asin(1)-2*Math.asin(0),Math.PI/2);
 const branch=ref('2.2/15');
 assert.match(branch.steps.join(' '),/\(0,π\)/);
});
test('nontrivial tangent of half sum and two inverse-trig equations match substitutable math identities',()=>{
 for(const [x,y] of [[.5,1],[.2,2],[-.3,1],[0,.7]]){
  const lhs=Math.tan((Math.asin(2*x/(1+x*x))+Math.acos((1-y*y)/(1+y*y)))/2);
  near(lhs,(x+y)/(1-x*y),1e-8);
 }
 for(const t of [.1,.3,1])near(Math.atan(Math.sqrt(t)),Math.acos((1-t)/(1+t))/2);
 for(const x of [Math.PI/4,5*Math.PI/4,-3*Math.PI/4]){
  const lhs=2*Math.atan(Math.cos(x)),rhs=Math.atan(2/Math.sin(x));
  near(lhs,rhs,1e-9);
 }
 const x=1/Math.sqrt(3);
 near(Math.atan((1-x)/(1+x)),Math.atan(x)/2);
});
test('programme is 169 original drafts over 180 indexed entries with eleven unresolved Chemistry-1 parent questions',()=>{
 const p=questionBankProgress();
 assert.equal(p.indexedUnits,13);
 assert.equal(p.indexedPrintedQuestions,345);
 assert.equal(p.authoredSolutions,272);
 assert.equal(p.unansweredIndexedCount,73);
 assert.equal(p.unindexedUnitCount,53);
 assert.equal(p.qualifiedSolutions,0);
 assert.equal(p.status,'HOLD');
 const chemistry=p.missingByIndexedChapter.find(x=>x.lessonId==='chapter-chemistry-1');
 assert.equal(chemistry.missingQuestionIds.length,0);
 assert.deepEqual(chemistry.missingQuestionIds,[]);
 const math2=p.missingByIndexedChapter.find(x=>x.lessonId==='chapter-mathematics-2');
 assert.deepEqual(math2.missingQuestionIds,[]);
 assert.equal(p.totalPrintedQuestionsAcrossCurriculum,null);
});
