import test from 'node:test';
import assert from 'node:assert/strict';
import {routeCompanionSkill} from '../public/companion-skill-router.js';

const now=new Date(2026,9,15,7,30);
test('ordinary requests create a reviewed learner-owned study task without pretending to send a notification',()=>{
  const result=routeCompanionSkill('Remind me to revise physics tomorrow',now);
  assert.equal(result?.kind,'create-task');
  assert.equal(result?.payload?.title,'revise physics');
  assert.equal(result?.payload?.due_date,'2026-10-16');
  assert.match(result?.confirmation,/task|study/i);
  assert.match(result?.notice,/not.*notification|no.*notification/i);
});
test('natural-language schedule requests identify a complete draft without choosing another screen',()=>{
  const r=routeCompanionSkill('Schedule 30 minutes of maths at 5:30 pm every weekday',now);
  assert.equal(r?.kind,'create-schedule');
  assert.deepEqual(r?.payload?.days,[1,2,3,4,5]);
  assert.equal(r?.payload?.minutes,30);
  assert.equal(r?.payload?.time,'17:30');
  assert.equal(r?.payload?.kind,'study');
  assert.match(r?.confirmation,/maths/i);
});
test('incomplete routine descriptions ask for the missing details without inventing a time',()=>{
  const r=routeCompanionSkill('Schedule chemistry revision every day',now);
  assert.equal(r?.kind,'schedule-needs-details');
  assert.match(r?.answer,/time/i);
});
test('memory review never silently enables AI recall',()=>{
  const r=routeCompanionSkill('Remember that I learn physics best by drawing diagrams.',now);
  assert.equal(r?.kind,'create-memory');
  assert.equal(r?.payload?.category,'learning');
  assert.equal(r?.payload?.useInChat,false);
  assert.match(r?.confirmation,/remember/i);
});
test('notes are proposed, not silently written',()=>{
  const r=routeCompanionSkill('Save a note: induction means changing magnetic flux.',now);
  assert.equal(r?.kind,'create-note');
  assert.match(r?.payload?.body,/induction/i);
});
test('plain teaching, private data deletion, unsafe requests and keyword mentions are never executed as skills',()=>{
  for(const q of ['Explain magnetic induction','How do I schedule a lesson?','Delete all my notes','Send a message to my teacher','Buy a chemistry textbook','What is a reminder?']){
    assert.equal(routeCompanionSkill(q,now),null,q);
  }
});
test('natural study requests select the right academic specialty without manual mode selection',()=>{
  assert.equal(routeCompanionSkill('Teach me Newton’s laws step by step',now)?.mode,'teacher');
  assert.equal(routeCompanionSkill('How do airplanes generate lift?',now)?.mode,'pilot');
  assert.equal(routeCompanionSkill('Give me ideas for an abstract painting',now)?.mode,'artist');
});
