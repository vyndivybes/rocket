import test from 'node:test';
import assert from 'node:assert/strict';
import {ORIGINAL_WORKED_SOLUTIONS,SOURCE_VERIFIED_EXERCISES,questionBankProgress} from '../functions/_lib/ncert-solved-exercises.js';
import {NCERT_EXERCISE_LEDGER} from '../functions/_lib/ncert-exercise.js';
const solution=(chapter,ref)=>ORIGINAL_WORKED_SOLUTIONS.find(x=>x.lessonId===chapter&&x.questionId===ref);

test('correct unit conversion: Physics 2.2 official 2026-27 source specifies 5 millicoulombs per hexagon vertex',()=>{
 const s=solution('chapter-physics-2','2.2');
 assert.ok(s);
 assert.match(s.steps.join(' '),/5\s*(?:mC|mill[i]?coulomb)/i);
 assert.match(s.answer,/2\.70×10⁹/);
 assert.ok(!/5 microcoulomb|2\.70×10⁶/i.test(s.steps.join(' ')+s.answer));
 const k=8.9875517923e9;
 assert.ok(Math.abs(6*k*5e-3/.1 /2.70e9 -1)<0.01);
});

test('NCERT Chemistry Solutions 2026-27 indexes complete 33 parent numbered exercises',()=>{
 const x=SOURCE_VERIFIED_EXERCISES['chapter-chemistry-1'];
 assert.equal(x.officialPdf,'https://ncert.nic.in/textbook/pdf/lech101.pdf');
 assert.equal(x.reprint,'2026-27');
 assert.equal(x.questionIds.length,33);
 assert.deepEqual(x.questionIds,Array.from({length:33},(_,i)=>'1.'+(i+1)));
});

test('NCERT Chemistry Electrochemistry 2026-27 indexes 18 parent numbered exercises',()=>{
 const x=SOURCE_VERIFIED_EXERCISES['chapter-chemistry-2'];
 assert.equal(x.officialPdf,'https://ncert.nic.in/textbook/pdf/lech102.pdf');
 assert.equal(x.reprint,'2026-27');
 assert.equal(x.questionIds.length,18);
 assert.deepEqual(x.questionIds,Array.from({length:18},(_,i)=>'2.'+(i+1)));
});
test('all new authored Chemistry worked answers match verified parent exercise identifiers, show checks and hold certification',()=>{
 const chem=ORIGINAL_WORKED_SOLUTIONS.filter(x=>x.lessonId.startsWith('chapter-chemistry-'));
 assert.ok(chem.length>=25,'at least 25 new independently authored answer drafts');
 for(const x of chem){
  const source=SOURCE_VERIFIED_EXERCISES[x.lessonId];
  assert.ok(source?.questionIds.includes(x.questionId),x.questionId);
  assert.ok(x.steps.length>=2&&x.steps.every(s=>s.length>=40),x.questionId);
  assert.ok(x.answer.length>=12&&x.check.length>=35,x.questionId);
  assert.equal(x.certified,false);
  assert.equal(x.questionTextRepublished,false);
  assert.equal(x.selfCheckRubric.length,3);
 }
 const p=questionBankProgress();
 assert.equal(p.indexedUnits,10);
 assert.equal(p.indexedPrintedQuestions,231);
 assert.equal(p.qualifiedSolutions,0);
 assert.equal(p.status,'HOLD');
 const records=NCERT_EXERCISE_LEDGER.filter(x=>x.subject==='Chemistry'&&x.editionVerified);
 assert.equal(records.length,3);
 assert.equal(records.reduce((n,x)=>n+x.verifiedQuestionCount,0),0);
});
test('Chemistry unit conversions and stoichiometry are independently recalculated',()=>{
 const close=(a,b,tol=.015)=>assert.ok(Math.abs(a/b-1)<tol,'expected '+b+' but got '+a);
 close(1504*.68/63.01,16.23);
 close((10/180)/.09,.6173);
 close((10/180)/(100/1.2/1000),.6667);
 close(3*(1/(106+84))/.1*1000,157.895);
 close((300*.25+400*.40)/700*100,33.5714);
 close((222.6/62)/.2,17.9516);
 close(1*.05/.00656,7.622);
 close(1.45/107.87*96485/1.5,864.4);
 close(7.896e-5*1000/.00241,32.76);
 close(5*20*60*58.69/(2*96485),1.825);
});
