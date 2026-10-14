import test from 'node:test';
import assert from 'node:assert/strict';
import {CHAPTER_MODULES} from '../functions/_lib/chapter-modules.js';
import {ADDITIONAL_COURSEWORK} from '../functions/_lib/extra-curriculum.js';
import {LESSONS,lessonView} from '../functions/_lib/study.js';
import {readFileSync} from 'node:fs';

test('all 379 authored chapter teaching prompts have bespoke model responses',()=>{
 assert.equal(CHAPTER_MODULES.length,66);
 const all=CHAPTER_MODULES.flatMap(x=>x.guidedSubtopics.map(t=>({chapter:x,t})));
 assert.equal(all.length,379);
 const responses=new Set();
 for(const {chapter,t} of all){
  assert.ok(typeof t.modelAnswer==='string'&&t.modelAnswer.length>=52,chapter.id+' '+t.heading+' missing worked solution');
  assert.ok(!/^(?:please|try to|refer to|write a|your answer|check the)\b/i.test(t.modelAnswer),chapter.id+' '+t.heading+' generic instruction rather than a solution');
  assert.equal(t.reviewStatus,'subject_review_required',chapter.id);
  assert.equal(t.certified,false,chapter.id);
  assert.ok(!/\b(TODO|TBD|lorem ipsum|PLACEHOLDER)\b/i.test(t.modelAnswer),chapter.id);
  assert.equal(responses.has(t.modelAnswer),false,chapter.id+' duplicated model answer');
  responses.add(t.modelAnswer);
 }
});

test('supplementary 45 prompts have sample answers while fiction and practicals remain unqualified',()=>{
 assert.equal(ADDITIONAL_COURSEWORK.length,15);
 const all=ADDITIONAL_COURSEWORK.flatMap(c=>c.subtopics.map(x=>({c,x})));
 assert.equal(all.length,45);
 for(const {c,x} of all){
  assert.ok(typeof x.modelAnswer==='string'&&x.modelAnswer.length>=52,c.id+' '+x.heading);
  assert.equal(c.certified,false,c.id);
  assert.equal(c.reviewStatus,'subject_review_required',c.id);
 }
 const fiction=ADDITIONAL_COURSEWORK.filter(x=>x.kind==='novel_choice');
 assert.deepEqual(fiction.map(x=>x.title),['A Tiger for Malgudi','The Financial Expert']);
});

test('reader can inspect proposed worked answers but not private MCQ answerIndex before submission',()=>{
 for(const l of CHAPTER_MODULES){
  const v=lessonView(LESSONS.find(x=>x.id===l.id));
  assert.equal('answerIndex' in v,false);
  assert.equal('explanation' in v,false);
  assert.ok(v.guidedSubtopics.every(t=>typeof t.modelAnswer==='string'));
  assert.equal(v.certified,false);
 }
});

test('student experience gives an optional self-check example without auto-grading open responses',()=>{
 const ui=readFileSync(new URL('../public/app.js',import.meta.url),'utf8');
 const syllabus=readFileSync(new URL('../public/syllabus.js',import.meta.url),'utf8');
 assert.match(ui,/Review a worked response/);
 assert.match(ui,/escapeHtml\(step\.modelAnswer\)/);
 assert.match(ui,/Self-check only/);
 assert.match(syllabus,/esc\(step\.modelAnswer\)/);
});
