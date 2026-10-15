import test from 'node:test';
import assert from 'node:assert/strict';
import {LESSONS,lessonAllowedForLearner,studentLessons,lessonView} from '../functions/_lib/study.js';

const physics=LESSONS.find(x=>x.id==='chapter-physics-1');
const english=LESSONS.find(x=>x.id==='chapter-english-elective-1');
const general=LESSONS.find(x=>x.id==='physics-faraday');
const cbseFoundation=LESSONS.find(x=>x.id==='physics-current-electricity');
const legacyEnglish=LESSONS.find(x=>x.id==='english-argument');
test('academic catalog prerequisites exist for profile gate',()=>{
 assert.ok(physics);assert.ok(english);assert.ok(general);assert.ok(cbseFoundation);
});

test('a student without an enrolled board and subjects never receives CBSE 2026–27 curricula',()=>{
 const available=studentLessons('unconfigured',null);
 assert.ok(available.some(x=>x.id===general.id));
 assert.equal(available.some(x=>x.id===physics.id),false);
 assert.equal(available.some(x=>x.id===cbseFoundation.id),false);
 assert.equal(available.some(x=>x.id===english.id),false);
 assert.equal(lessonAllowedForLearner(physics,'CBSE',null),false);
});

test('a learner registered under ISC or State boards cannot be assigned CBSE-only lessons',()=>{
 for(const board of ['ISC','State','Other','unconfigured']){
  const available=studentLessons(board,['Physics','English Elective']);
  assert.ok(available.some(x=>x.id===general.id),board+' general foundation');
  assert.equal(available.some(x=>x.id===physics.id),false,board+' chapter draft');
  assert.equal(available.some(x=>x.id===english.id),false,board+' elective');
  assert.equal(available.some(x=>x.id===cbseFoundation.id),false,board+' tagged CBSE practice');
 }
});

test('CBSE students receive only explicitly chosen 2026–27 subject chapters',()=>{
 const physicsOnly=studentLessons('CBSE',['Physics']);
 assert.equal(physicsOnly.filter(x=>x.curriculumStage==='chapter_draft').length,14);
 assert.equal(physicsOnly.some(x=>x.id===english.id),false);
 assert.equal(lessonAllowedForLearner(english,'CBSE',['English']),false);
 assert.equal(studentLessons('CBSE',['English']).some(x=>x.id===english.id),false);
 assert.equal(studentLessons('CBSE',['English Elective']).filter(x=>x.curriculumStage==='chapter_draft').length,16);
 assert.ok(studentLessons('CBSE',['Physics']).some(x=>x.id===cbseFoundation.id));
});

test('invalid saved subject scope fails closed and cannot expose another subject',()=>{
 for(const selected of [[],['Physics','Physics'],['Unknown'],['Physics',null],{},'Physics',false]){
  assert.deepEqual(studentLessons('CBSE',selected),[],String(selected));
  assert.equal(lessonAllowedForLearner(physics,'CBSE',selected),false);
 }
});

test('a forged practice lessonId is rejected by same shared access rule as listing',()=>{
 assert.equal(lessonAllowedForLearner(physics,'ISC',['Physics']),false);
 assert.equal(lessonAllowedForLearner(physics,'CBSE',['Biology']),false);
 assert.equal(lessonAllowedForLearner(physics,'CBSE',['Physics']),true);
 assert.equal(lessonAllowedForLearner(general,'unconfigured',null),true);
 assert.equal(lessonAllowedForLearner(cbseFoundation,'unconfigured',null),false);
});

test('student course view never includes a hidden multiple-choice solution key',()=>{
 const m=studentLessons('CBSE',['Physics']).find(x=>x.id===physics.id);
 const visible=lessonView(m);
 assert.equal(Object.hasOwn(visible,'answerIndex'),false);
 assert.equal(Object.hasOwn(visible,'explanation'),false);
 assert.equal(Object.hasOwn(visible.questions[0],'answerIndex'),false);
 assert.equal(Object.hasOwn(visible.questions[0],'explanation'),false);
});
