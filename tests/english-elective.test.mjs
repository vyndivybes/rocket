import test from 'node:test';
import assert from 'node:assert/strict';
import {academicInventory, ENGLISH_ELECTIVE_SOURCE} from '../functions/_lib/syllabus-catalog.js';
import {validateProfile,LESSONS} from '../functions/_lib/study.js';

test('Class XII English Elective 001 is a selectable, explicitly coded subject', () => {
  assert.equal(validateProfile({board:'CBSE',stream:'Science',subjects:['Physics','English Elective'],dailyMinutes:30}),null);
  assert.equal(validateProfile({board:'CBSE',stream:'Science',subjects:['English','English Elective'],dailyMinutes:30}), 'Choose one English course');
});
test('legacy unspecified English is not silently recoded as Elective', () => {
  const [legacy, elective] = academicInventory(['English', 'English Elective']);
  assert.equal(legacy.mappingStatus, 'subject_code_required');
  assert.equal(legacy.totalChapters, null);
  assert.equal(elective.code,'001');
  assert.equal(elective.mappingStatus,'official_outline_verified');
  assert.equal(elective.officialSource,ENGLISH_ELECTIVE_SOURCE);
});
test('Kaleidoscope Class XII literature inventory reflects current CBSE outline without pretending lessons are certified', () => {
  const [s]=academicInventory(['English Elective']);
  assert.equal(s.totalChapters,16);
  assert.equal(s.qualifiedChapters,0);
  assert.equal(s.curriculumUnitType,'literary_texts');
  assert.deepEqual(s.chapters.reduce((acc,c)=>(acc[c.strand]=(acc[c.strand]||0)+1,acc),{}),{
    'Short Stories':3,Poetry:7,'Non fiction':5,Drama:1
  });
  assert.equal(s.chapters[0].title,'I Sell my Dreams');
  assert.ok(s.chapters.some(x=>x.title==='The Argumentative Indian'));
  assert.ok(s.chapters.some(x=>x.title==='Chandalika'));
  assert.ok(s.chapters.every(x=>x.qualified===false&&x.practice?.accuracy===null));
  assert.equal(s.examReadiness,'HOLD');
});
test('English Elective holds the school novel choice and records verified assessment weightage', () => {
  const [s]=academicInventory(['English Elective'],LESSONS);
  assert.deepEqual(s.fictionChoices,['A Tiger for Malgudi','The Financial Expert']);
  assert.equal(s.fictionChoiceStatus,'school_choice_required');
  assert.equal(s.assessmentSections.reduce((sum,section)=>sum+section.marks,0),100);
  assert.deepEqual(s.assessmentSections.map(s=>s.marks),[20,8,20,22,10,20]);
  assert.equal(s.practicalStatus,'not_applicable_seminar_review_required');
  assert.ok(s.foundationSkillLessonIds.includes('english-argument'));
  assert.equal(s.foundationSkillLessonIds.length,5);
  assert.ok(s.skillPractice.every(p=>p.certified===false));
  assert.equal(s.qualifiedChapters,0);
});
