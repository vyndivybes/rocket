import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {LESSONS,lessonView,gradePractice} from '../functions/_lib/study.js';
import {QUESTION_BANKS,publicQuestions,revisionForLesson} from '../functions/_lib/question-bank.js';

const SKILL_IDS=[
 'english-elective-reading-inference','english-elective-grammar-passive',
 'english-elective-discursive-writing','english-elective-poetry-inference',
 'physics-current-electricity','chemistry-solutions-molarity',
 'mathematics-conditional-probability','biology-evolution-selection'
];

test('each of eight CBSE-linked micro-lessons offers three different fresh questions with deterministic explanations',()=>{
 for(const id of SKILL_IDS){
  const bank=QUESTION_BANKS[id];
  assert.equal(bank?.length,3,id+' must have three additional independently authored questions');
  const lesson=LESSONS.find(x=>x.id===id);assert.ok(lesson);
  const all=publicQuestions(lesson);
  assert.equal(all.length,4);assert.deepEqual(all.map(q=>q.id),['base','v2','v3','v4']);
  assert.equal(new Set(all.map(q=>q.prompt)).size,4,'questions must not be repeats');
  for(const q of bank){
   assert.ok(q.prompt.length>=40&&q.explanation.length>=60,id+' explanation');
   assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);
   assert.ok(Number.isInteger(q.answerIndex)&&q.answerIndex>=0&&q.answerIndex<4);
   assert.equal(gradePractice(id,q.answerIndex,q.id).correct,true);
   assert.equal(gradePractice(id,(q.answerIndex+1)%4,q.id).correct,false);
  }
  const client=lessonView(lesson);
  assert.equal(client.questions.length,4);
  assert.ok(!Object.hasOwn(client,'answerIndex'));
  assert.ok(!Object.hasOwn(client,'explanation'));
  assert.ok(client.questions.every(q=>!Object.hasOwn(q,'answerIndex')&&!Object.hasOwn(q,'explanation')&&!Object.hasOwn(q,'correctOption')));
 }
});

test('server rejects malformed question selectors without falling back to easier base question',()=>{
 const id='physics-current-electricity';
 assert.equal(gradePractice(id,2,'invalid'),null);
 assert.equal(gradePractice(id,2,'v2/../../secret'),null);
 assert.equal(gradePractice(id,2,{}),null);
 assert.equal(gradePractice(id,2,'v2 '),null);
 assert.equal(gradePractice(id,-1,'v2'),null);
 assert.equal(gradePractice('missing',1,'v2'),null);
 const base=gradePractice(id,2);
 assert.ok(base);assert.equal(base.questionId,'base');
 assert.equal(base.progressKey,id);
 const variant=QUESTION_BANKS[id][0];
 const marked=gradePractice(id,variant.answerIndex,variant.id);
 assert.equal(marked.questionId,'v2');
 assert.equal(marked.progressKey,id+'::v2');
});

test('revision requires breadth: 100 repeated correct responses to a single question are never mastery',()=>{
 const id='mathematics-conditional-probability';
 const rows=[{lesson_id:id,attempts:100,correct:100}];
 const r=revisionForLesson(id,rows);
 assert.equal(r.attempts,100);assert.equal(r.correct,100);
 assert.equal(r.distinctQuestionsAttempted,1);assert.equal(r.questionCount,4);
 assert.equal(r.nextQuestionId,'v2');assert.equal(r.revision,'try_new_question');
 assert.equal(r.masteryCertified,false);
 const all=revisionForLesson(id,[
  {lesson_id:id,attempts:1,correct:1},
  {lesson_id:id+'::v2',attempts:1,correct:1},
  {lesson_id:id+'::v3',attempts:1,correct:1},
  {lesson_id:id+'::v4',attempts:1,correct:1}
 ]);
 assert.equal(all.distinctQuestionsAttempted,4);
 assert.equal(all.nextQuestionId,null);
 assert.equal(all.revision,'independent_review_required');
 assert.equal(all.masteryCertified,false);
});

test('revision prioritises unattempted or incorrect items and ignores unknown identifiers',()=>{
 const id='chemistry-solutions-molarity';
 let r=revisionForLesson(id,[{lesson_id:id+'::v2',attempts:1,correct:0}]);
 assert.equal(r.nextQuestionId,'base');
 assert.equal(r.revision,'review_and_practise');
 r=revisionForLesson(id,[{lesson_id:id,attempts:2,correct:1},{lesson_id:id+'::bad',attempts:99,correct:99}]);
 assert.equal(r.attempts,2);
 assert.equal(r.distinctQuestionsAttempted,1);
 assert.equal(r.nextQuestionId,'v2');
 assert.equal(revisionForLesson('unknown',[]),null);
});

test('student lesson view and practice UI expose selected question but not answer keys',()=>{
 const js=readFileSync(new URL('../public/app.js',import.meta.url),'utf8');
 assert.match(js,/question-select/);
 assert.match(js,/activeQuestionId/);
 assert.match(js,/questionId:activeQuestionId/);
 assert.match(js,/lessonRevision/);
});
