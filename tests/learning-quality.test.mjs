import test from 'node:test';
import assert from 'node:assert/strict';
import {LESSONS,gradePractice,lessonView} from '../functions/_lib/study.js';
import {AI_MODES,COACH_PROMPTS,PILOT_LINKS,IDEA_CARDS,validSchedule} from '../functions/_lib/mission.js';

test('physics maths chemistry biology each have three or more foundational lessons',()=>{
 for(const subject of ['Physics','Mathematics','Chemistry','Biology'])assert.ok(LESSONS.filter(x=>x.subject===subject).length>=3,subject);
});
test('all multiple-choice foundations are structurally sound and do not leak answer keys',()=>{
 assert.equal(new Set(LESSONS.map(x=>x.id)).size,LESSONS.length);
 for(const x of LESSONS){assert.equal(x.options.length,4,x.id);assert.ok(Number.isInteger(x.answerIndex)&&x.answerIndex>=0&&x.answerIndex<4,x.id);
  assert.ok(x.explanation.length>25,x.id);assert.ok(x.concept.length>30,x.id);
  const view=lessonView(x);assert.equal(Object.hasOwn(view,'answerIndex'),false);
  assert.equal(gradePractice(x.id,x.answerIndex).correct,true);
 }
});
test('pilot mentor, art mentor and student companion have bounded role definitions',()=>{
 assert.deepEqual(AI_MODES,['teacher','companion','planner','pilot','artist']);
 assert.match(COACH_PROMPTS.pilot,/NEVER flight-operational/);
 assert.match(COACH_PROMPTS.companion,/not a human/);
 assert.match(COACH_PROMPTS.planner,/never claim/);
 assert.ok(PILOT_LINKS.some(x=>x.url.startsWith('https://pariksha.dgca.gov.in/')));
 assert.ok(IDEA_CARDS.some(x=>x.kind==='art'));
});
test('exercise scheduling rejects negative, enormous or malformed durations',()=>{
 const base={title:'Evening sport',kind:'sport',time:'17:30',days:[2],minutes:20};
 for(const bad of [-1,0,180,1.5])assert.ok(validSchedule({...base,minutes:bad}));
 assert.equal(validSchedule(base),null);
});
