import test from 'node:test';
import assert from 'node:assert/strict';
import {ADDITIONAL_COURSEWORK} from '../functions/_lib/extra-curriculum.js';
import {academicInventory} from '../functions/_lib/syllabus-catalog.js';
import {LESSONS} from '../functions/_lib/study.js';

test('required supplementary curriculum includes formative topics and all distinct internal assessment modes',()=>{
 assert.deepEqual(
 ADDITIONAL_COURSEWORK.filter(x=>x.subject==='Chemistry'&&x.kind==='formative').map(x=>x.title),
 ['Surface Chemistry','General Principles and Processes of Isolation of Elements','Polymers','Chemistry in Everyday Life']);
 assert.deepEqual(
 ADDITIONAL_COURSEWORK.filter(x=>x.subject==='Biology'&&x.kind==='formative').map(x=>x.title),
 ['Environmental Issues']);
 for(const subject of ['Physics','Chemistry','Biology'])
  assert.equal(ADDITIONAL_COURSEWORK.filter(x=>x.subject===subject&&x.kind==='supervised_practical').length,1,subject);
 assert.equal(ADDITIONAL_COURSEWORK.filter(x=>x.subject==='Mathematics'&&x.kind==='school_internal').length,1);
 assert.deepEqual(
 ADDITIONAL_COURSEWORK.filter(x=>x.subject==='English Elective'&&x.kind==='novel_choice').map(x=>x.title),
 ['A Tiger for Malgudi','The Financial Expert']);
 for(const area of ['unseen_reading','applied_grammar','creative_writing','seminar'])
  assert.equal(ADDITIONAL_COURSEWORK.filter(x=>x.kind===area).length,1,area);
});

test('supplementary teaching contains usable original explanation and practice while preserving release holds',()=>{
 for(const item of ADDITIONAL_COURSEWORK){
  assert.equal(item.reviewStatus,'subject_review_required');
  assert.equal(item.certified,false);
  assert.ok(item.subtopics.length>=3,item.id);
  for(const step of item.subtopics){
   assert.ok(step.heading.length>=5,item.id);
   assert.ok(step.explanation.length>=90,item.id);
   assert.ok(step.tryIt.length>=25,item.id);
  }
 }
 const result=academicInventory(['Physics','Chemistry','Mathematics','Biology','English Elective'],LESSONS);
 assert.ok(result.every(x=>x.examReadiness==='HOLD'&&x.qualifiedChapters===0));
 assert.equal(result.find(x=>x.subject==='English Elective').fictionChoiceStatus,'school_choice_required');
 assert.ok(result.every(x=>x.supplementaryCoursework.length>0));
});
