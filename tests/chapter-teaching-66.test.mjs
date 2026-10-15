import test from 'node:test';
import assert from 'node:assert/strict';
import {CHAPTER_MODULES} from '../functions/_lib/chapter-modules.js';
import {SUBJECT_MAP,academicInventory} from '../functions/_lib/syllabus-catalog.js';
import {LESSONS,lessonView,gradePractice} from '../functions/_lib/study.js';

const SUBJECTS=['Physics','Chemistry','Mathematics','Biology','English Elective'];
const expectedCount=[14,10,13,13,16];

test('66 teaching drafts map one-to-one to the reconciled 2026–27 syllabus titles',()=>{
 assert.equal(CHAPTER_MODULES.length,66);
 assert.equal(new Set(CHAPTER_MODULES.map(x=>x.id)).size,66);
 SUBJECTS.forEach((subject,i)=>{
   const rows=CHAPTER_MODULES.filter(x=>x.subject===subject);
   assert.equal(rows.length,expectedCount[i],subject);
   assert.deepEqual(rows.map(x=>x.chapterTitle),SUBJECT_MAP[subject].titles);
   assert.deepEqual(rows.map(x=>x.chapterNumber),Array.from({length:expectedCount[i]},(_,j)=>j+1));
 });
});

test('each draft is substantive, answerable and explicitly pending teaching review',()=>{
 for(const m of CHAPTER_MODULES){
   assert.equal(m.reviewStatus,'teacher_review_required',m.id);
   assert.equal(m.certified,false,m.id);
   assert.equal(m.academicYear,'2026-27',m.id);
   assert.ok(m.id.startsWith('chapter-'),m.id);
   assert.ok(typeof m.concept==='string'&&m.concept.length>=75,m.id+' concept');
   assert.ok(typeof m.example==='string'&&m.example.length>=50,m.id+' example');
   assert.ok(typeof m.explanation==='string'&&m.explanation.length>=35,m.id+' explanation');
   assert.ok(typeof m.misconception==='string'&&m.misconception.length>=25,m.id+' misconception');
   assert.ok(Array.isArray(m.learningObjectives)&&m.learningObjectives.length>=3,m.id+' objectives');
   assert.ok(m.learningObjectives.every(x=>typeof x==='string'&&x.length>8),m.id+' objectives text');
   assert.ok(typeof m.question==='string'&&m.question.length>=30,m.id+' question');
   assert.ok(Array.isArray(m.options)&&m.options.length===4,m.id+' options');
   assert.equal(new Set(m.options).size,4,m.id+' distinct options');
   assert.ok(Number.isInteger(m.answerIndex)&&m.answerIndex>=0&&m.answerIndex<4,m.id+' answer');
   assert.ok(m.source.includes('cbseacademic.nic.in'),m.id+' source');
   assert.ok(LESSONS.find(x=>x.id===m.id),m.id+' discoverable');
   const view=lessonView(m);
   assert.equal('answerIndex' in view,false,m.id+' key must be server-only');
   assert.equal('explanation' in view,false,m.id+' explanation must be server-only');
   const grade=gradePractice(m.id,m.answerIndex);
   assert.equal(grade?.correct,true,m.id+' expected answer');
   assert.equal(grade?.correctOption,m.options[m.answerIndex],m.id);
   assert.equal(gradePractice(m.id,(m.answerIndex+1)%4)?.correct,false,m.id+' wrong answer');
 }
});

test('draft availability does not clear academic qualification or release gating',()=>{
 const records=academicInventory(SUBJECTS,LESSONS);
 assert.equal(records.reduce((n,s)=>n+s.chapterModuleCount,0),66);
 assert.ok(records.every(s=>s.qualifiedChapters===0&&s.examReadiness==='HOLD'));
 assert.ok(records.every(s=>s.chapters.every(c=>c.moduleStatus==='teacher_review_required'&&c.qualified===false)));
});
