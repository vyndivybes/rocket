import test from 'node:test';
import assert from 'node:assert/strict';
import {academicInventory,syllabusInventory,SUBJECT_ASSESSMENT} from '../functions/_lib/syllabus-catalog.js';
import {LESSONS} from '../functions/_lib/study.js';

const SUBJECTS=['Physics','Chemistry','Mathematics','Biology','English Elective'];
const COUNTS=[14,10,13,13,16];
const CODES=['042','043','041','044','001'];
const EXAMS=[
  {theory:70,practical:30,internal:0,seminar:0},
  {theory:70,practical:30,internal:0,seminar:0},
  {theory:80,practical:0,internal:20,seminar:0},
  {theory:70,practical:30,internal:0,seminar:0},
  {theory:80,practical:0,internal:0,seminar:20}
];

test('single authoritative syllabus inventory covers all five CBSE 2026–27 courses',()=>{
  const primary=academicInventory(SUBJECTS,LESSONS);
  const legacy=syllabusInventory(SUBJECTS,LESSONS);
  assert.equal(primary.length,5);
  assert.equal(legacy.length,5);
  assert.deepEqual(primary.map(x=>x.totalChapters),COUNTS);
  assert.deepEqual(legacy.map(x=>x.totalChapters),COUNTS);
  assert.deepEqual(legacy.map(x=>x.code),CODES);
  assert.deepEqual(legacy.map(x=>x.mappingStatus),Array(5).fill('official_outline_verified'));
  for(let i=0;i<5;i++){
    assert.deepEqual(legacy[i].chapters.map(x=>x.title),primary[i].chapters.map(x=>x.title));
    assert.equal(legacy[i].qualifiedChapters,0);
    assert.equal(legacy[i].coverageStatus,'INCOMPLETE');
    assert.equal(legacy[i].examReadiness,'HOLD');
  }
});

test('published examinations and applicable practical/internal assessments are explicit, never claimed qualified',()=>{
  const courses=academicInventory(SUBJECTS,LESSONS);
  assert.deepEqual(SUBJECTS.map(x=>SUBJECT_ASSESSMENT[x]),EXAMS);
  for(let i=0;i<5;i++){
    const a=courses[i].assessmentStructure;
    assert.deepEqual(a,EXAMS[i]);
    assert.equal(a.theory+a.practical+a.internal+a.seminar,100);
    assert.equal(courses[i].assessmentStatus,'teacher_review_required');
    assert.equal(courses[i].qualifiedChapters,0);
  }
  assert.equal(courses[2].practicalStatus,'not_applicable_internal_assessment_required');
  assert.equal(courses[4].practicalStatus,'not_applicable_seminar_review_required');
  assert.deepEqual(courses[4].fictionChoices,['A Tiger for Malgudi','The Financial Expert']);
  assert.equal(courses[4].fictionChoiceStatus,'school_choice_required');
});

test('foundation exercise pointers are real but do not count as qualified teaching',()=>{
  const rows=academicInventory(SUBJECTS,LESSONS);
  assert.deepEqual(rows.map(x=>x.foundationChapterCount),[2,2,2,2,0]);
  assert.deepEqual(rows.map(x=>x.unmappedChapterCount),[12,8,11,11,16]);
  assert.equal(rows.reduce((n,x)=>n+x.totalChapters,0),66);
  assert.equal(rows.reduce((n,x)=>n+x.unmappedChapterCount,0),58);
  assert.ok(rows.every(x=>x.chapters.every(c=>c.qualified===false)));
  assert.ok(rows.every(x=>x.chapters.flatMap(c=>c.foundationLessonIds).every(id=>LESSONS.some(l=>l.id===id))));
  assert.equal(academicInventory(['English'],LESSONS)[0].mappingStatus,'subject_code_required');
});
