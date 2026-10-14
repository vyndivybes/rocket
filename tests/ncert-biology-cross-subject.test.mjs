import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {SOURCE_VERIFIED_EXERCISES,ORIGINAL_WORKED_SOLUTIONS,questionBankProgress} from '../functions/_lib/ncert-solved-exercises.js';
import {exerciseCoverageSummary} from '../functions/_lib/ncert-exercise.js';
import {studentLessons,lessonView} from '../functions/_lib/study.js';

test('2026-27 NCERT Biology Chapter 7 has 17 source-indexed exercise answer drafts',()=>{
 const x=SOURCE_VERIFIED_EXERCISES['chapter-biology-7'];
 assert.equal(x.officialPdf,'https://ncert.nic.in/textbook/pdf/lebo107.pdf');
 assert.equal(x.reprint,'2026-27');
 assert.deepEqual(x.questionIds,Array.from({length:17},(_,i)=>String(i+1)));
 const worked=ORIGINAL_WORKED_SOLUTIONS.filter(s=>s.lessonId==='chapter-biology-7');
 assert.equal(worked.length,17);
 for(const entry of worked){
  assert.ok(x.questionIds.includes(entry.questionId));
  assert.ok(entry.steps.length>=2&&entry.steps.every(v=>v.length>=40));
  assert.ok(entry.answer.length>=12&&entry.check.length>=35);
  assert.equal(entry.selfCheckRubric.length,3);
  assert.equal(entry.certified,false);
  assert.equal(entry.questionTextRepublished,false);
 }
});

test('antibody solution is instructional, schematic, not silently a fabricated textbook figure',()=>{
 const v=ORIGINAL_WORKED_SOLUTIONS.find(x=>x.lessonId==='chapter-biology-7'&&x.questionId==='9');
 assert.ok(v);
 assert.match(v.answer,/two heavy and two light/i);
 assert.match(v.diagram,/antigen.binding/i);
 assert.match(v.diagram,/Fc stem/i);
 assert.match(v.diagram,/S—S bonds/i);
 const ui=readFileSync(new URL('../public/app.js',import.meta.url),'utf8');
 assert.match(ui,/escapeHtml\(item\.diagram\)/);
});

test('Biology solutions require CBSE plus subject selection and stay unpublished for wrong board',()=>{
 assert.equal(studentLessons('CBSE',['Biology']).some(x=>x.id==='chapter-biology-7'),true);
 assert.equal(studentLessons('ISC',['Biology']).some(x=>x.id==='chapter-biology-7'),false);
 assert.equal(studentLessons('CBSE',['Physics']).some(x=>x.id==='chapter-biology-7'),false);
 const v=lessonView(studentLessons('CBSE',['Biology']).find(x=>x.id==='chapter-biology-7'));
 assert.equal(v.ncertExerciseQuestionCount,17);
 assert.equal(v.ncertExerciseSolutions.length,17);
 assert.ok(v.ncertExerciseSolutions.every(x=>x.certified===false));
 assert.equal('answerIndex' in v,false);
});

test('programme audit exposes all unresolved printed ids without claiming that 180 is total syllabus',()=>{
 const p=questionBankProgress();
 assert.equal(p.indexedUnits,10);
 assert.equal(p.indexedPrintedQuestions,239);
 assert.equal(p.unindexedUnitCount,56);
 assert.equal(p.authoredSolutions,239);
 assert.equal(p.unansweredIndexedCount,0);
 assert.equal(p.qualifiedSolutions,0);
 assert.equal(p.totalPrintedQuestionsAcrossCurriculum,null);
 assert.equal(p.status,'HOLD');
 assert.equal(p.missingByIndexedChapter.length,10);
});

test('auditable course gap register lists every unresolved chapter and its subject with no invented denominator',()=>{
 const s=exerciseCoverageSummary();
 assert.equal(s.unindexedUnits.length,56);
 assert.equal(s.unindexedUnits.filter(x=>['Physics','Chemistry','Mathematics','Biology'].includes(x.subject)).length,40);
 assert.equal(s.unindexedUnits.filter(x=>x.subject==='English Elective').length,16);
 assert.ok(s.unindexedUnits.every(x=>x.status==='EDITION_NOT_RECONCILED'&&x.lessonId.startsWith('chapter-')&&x.title.length>3));
 assert.match(s.explanation,/Ten chapter indexes/);
 assert.equal(s.questionCount,null);
 assert.equal(s.verifiedQuestionPercent,null);
 assert.equal(s.coverageStatus,'HOLD');
});
