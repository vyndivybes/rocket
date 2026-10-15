import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {LESSONS,lessonView,gradePractice} from '../functions/_lib/study.js';
import {academicInventory,ENGLISH_ELECTIVE_SOURCE} from '../functions/_lib/syllabus-catalog.js';

// Acceptance contract: original, bounded Class XII skill/foundation practice, NOT full chapters.
// Each question has a deterministic answer and worked reasoning; keep the answer key server-side.
const IDS=[
 'english-elective-reading-inference',
 'english-elective-grammar-passive',
 'english-elective-discursive-writing',
 'english-elective-poetry-inference',
 'physics-current-electricity',
 'chemistry-solutions-molarity',
 'mathematics-conditional-probability',
 'biology-evolution-selection'
];
test('eight syllabus-aligned foundational micro-lessons have clear worked examples and valid deterministic practice',()=>{
 for(const id of IDS){
  const lesson=LESSONS.find(x=>x.id===id);
  assert.ok(lesson,'Missing '+id);
  assert.ok(lesson.concept.length>=95,id+' concept needs more than a heading');
  assert.ok(lesson.example.length>=90,id+' worked example needs reasoning');
  assert.ok(lesson.question.length>=30,id+' question needs full context');
  assert.ok(lesson.explanation.length>=65,id+' solution needs reasoning');
  assert.equal(lesson.options.length,4);
  assert.equal(new Set(lesson.options).size,4);
  assert.ok(Number.isInteger(lesson.answerIndex)&&lesson.answerIndex>=0&&lesson.answerIndex<4);
  assert.equal(lesson.curriculumStage,'foundational_practice');
  assert.equal(lesson.academicYear,'2026-27');
  const view=lessonView(lesson);
  assert.ok(!Object.hasOwn(view,'answerIndex'),'no answers in student lesson API');
  assert.equal(gradePractice(id,lesson.answerIndex).correct,true,id);
  assert.equal(gradePractice(id,(lesson.answerIndex+1)%4).correct,false,id);
  assert.equal(gradePractice(id,4),null,id);
 }
});
test('English Elective exercise skills stay separate from Kaleidoscope literature and never certify exams',()=>{
 const x=academicInventory(['English Elective'],LESSONS,[
  {lesson_id:'english-elective-reading-inference',attempts:2,correct:1},
  {lesson_id:'english-elective-grammar-passive',attempts:12,correct:12}
 ])[0];
 assert.equal(x.code,'001');
 assert.equal(x.officialSource,ENGLISH_ELECTIVE_SOURCE);
 assert.equal(x.totalChapters,16);
 assert.equal(x.qualifiedChapters,0);
 assert.equal(x.examReadiness,'HOLD');
 assert.ok(x.chapters.every(c=>c.qualified===false));
 assert.equal(x.foundationSkillLessonIds.length,5); // existing generic English writing + 4 new skills
 const r=x.skillPractice.find(p=>p.lessonId==='english-elective-reading-inference');
 assert.deepEqual({attempts:r.attempts,correct:r.correct,revision:r.revision},{attempts:2,correct:1,revision:'review_worked_example'});
 const g=x.skillPractice.find(p=>p.lessonId==='english-elective-grammar-passive');
 assert.equal(g.revision,'try_new_unseen_question'); // repetition of a fixed question does not qualify mastery
 assert.equal(g.accuracy,1);
 assert.ok(x.skillPractice.every(p=>p.certified===false));
});
test('foundational science examples are mapped only to their actual chapter outline, never counted as qualified',()=>{
 const subjects=academicInventory(['Physics','Chemistry','Mathematics','Biology'],LESSONS);
 const expected=[
  ['Physics','Current Electricity','physics-current-electricity'],
  ['Chemistry','Solutions','chemistry-solutions-molarity'],
  ['Mathematics','Probability','mathematics-conditional-probability'],
  ['Biology','Evolution','biology-evolution-selection']
 ];
 for(const [subject,title,id] of expected){
  const x=subjects.find(s=>s.subject===subject);
  const chapter=x.chapters.find(c=>c.title===title);
  assert.ok(chapter,subject+' chapter missing');
  assert.ok(chapter.foundationLessonIds.includes(id),id+' chapter link missing');
  assert.equal(chapter.qualified,false);
  assert.equal(chapter.status,'foundation_only');
  assert.equal(x.qualifiedChapters,0);
 }
});
test('syllabus UI distinguishes skill practice from qualified literature and does not leak keys',()=>{
 const js=readFileSync(new URL('../public/syllabus.js',import.meta.url),'utf8');
 assert.match(js,/skillPractice/);
 assert.match(js,/Foundational skill practice/);
 assert.match(js,/not a literature completion/);
 assert.doesNotMatch(js,/answerIndex/);
});


test('syllabus progress includes new variant attempts without promoting chapters to qualified',()=>{
 const rows=[
  {lesson_id:'chemistry-solutions-molarity::v2',attempts:3,correct:2},
  {lesson_id:'english-elective-reading-inference::v3',attempts:2,correct:1}
 ];
 const chemistry=academicInventory(['Chemistry'],LESSONS,rows)[0];
 const solutions=chemistry.chapters.find(x=>x.title==='Solutions');
 assert.equal(solutions.practice.attempts,3);
 assert.equal(solutions.practice.correct,2);
 assert.equal(solutions.qualified,false);
 assert.equal(chemistry.qualifiedChapters,0);
 const english=academicInventory(['English Elective'],LESSONS,rows)[0];
 const reading=english.skillPractice.find(p=>p.lessonId==='english-elective-reading-inference');
 assert.equal(reading.attempts,2);assert.equal(reading.correct,1);
 assert.equal(reading.certified,false);
 assert.equal(english.examReadiness,'HOLD');
});
