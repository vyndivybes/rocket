import test from 'node:test';
import assert from 'node:assert/strict';
import {CHAPTER_MODULES} from '../functions/_lib/chapter-modules.js';
import {SUBJECT_MAP,academicInventory} from '../functions/_lib/syllabus-catalog.js';
import {LESSONS,lessonView} from '../functions/_lib/study.js';

const LIMITS={'Physics':5,'Chemistry':5,'Mathematics':5,'Biology':5,'English Elective':4};

test('the expanded teaching path covers all 66 titles with many distinct, usable subtopics',()=>{
 assert.equal(CHAPTER_MODULES.length,66);
 let total=0;
 for(const [subject,catalog] of Object.entries(SUBJECT_MAP)){
  const chapters=CHAPTER_MODULES.filter(m=>m.subject===subject);
  assert.equal(chapters.length,catalog.titles.length,subject);
  for(const [i,module] of chapters.entries()){
   assert.equal(module.chapterTitle,catalog.titles[i],module.id);
   assert.equal(module.depthStatus,'expanded_editorial_draft',module.id);
   assert.ok(module.guidedSubtopics.length>=LIMITS[subject],module.id+' subtopics');
   const labels=module.guidedSubtopics.map(x=>x.heading.trim().toLowerCase());
   assert.equal(new Set(labels).size,labels.length,module.id+' duplicate topics');
   for(const step of module.guidedSubtopics){
    assert.ok(step.heading.length>=6,module.id+' heading');
    assert.ok(step.explanation.length>=95,module.id+' explanation');
    assert.ok(step.tryIt.length>=35,module.id+' active learning');
    assert.equal(step.reviewStatus,'subject_review_required',module.id);
    assert.equal(step.certified,false,module.id);
    assert.ok(!/\b(TODO|TBD|lorem ipsum|placeholder)\b/i.test(step.heading+' '+step.explanation),module.id);
   }
   total+=module.guidedSubtopics.length;
  }
 }
 assert.ok(total>=314,'minimum 314 authored subtopics, actual '+total);
});

test('student lesson response can show guided teaching without exposing MCQ keys or claiming certification',()=>{
 for(const module of CHAPTER_MODULES){
  const found=LESSONS.find(x=>x.id===module.id);
  assert.ok(found,module.id);
  const view=lessonView(found);
  assert.equal('answerIndex' in view,false,module.id);
  assert.equal('explanation' in view,false,module.id);
  assert.ok(Array.isArray(view.guidedSubtopics),module.id);
  assert.equal(view.certified,false,module.id);
  assert.equal(view.reviewStatus,'teacher_review_required',module.id);
 }
 const courses=academicInventory(Object.keys(SUBJECT_MAP),LESSONS);
 assert.ok(courses.every(x=>x.qualifiedChapters===0&&x.examReadiness==='HOLD'));
});

test('high-risk and easily missed mandated subject topics exist in their guided paths',()=>{
 const need=[
  ['Biology','Sexual Reproduction in Flowering Plants','apomixis'],
  ['Biology','Human Reproduction','lactation'],
  ['Chemistry','Coordination Compounds','isomerism'],
  ['Chemistry','Biomolecules','vitamins'],
  ['Mathematics','Determinants','cofactor'],
  ['Mathematics','Differential Equations','homogeneous'],
  ['Physics','Electric Charges and Fields','gauss'],
  ['Physics','Alternating Current','resonance'],
  ['English Elective','Poems by Milton','prescribed selection'],
  ['English Elective','Poems by Blake','prescribed selection']
 ];
 for(const [subject,chapter,keyword] of need){
  const module=CHAPTER_MODULES.find(m=>m.subject===subject&&m.chapterTitle===chapter);
  assert.ok(module,subject+' '+chapter);
  assert.ok(module.guidedSubtopics.some(s=>(s.heading+' '+s.explanation).toLowerCase().includes(keyword)),module.id+' missing '+keyword);
 }
});
