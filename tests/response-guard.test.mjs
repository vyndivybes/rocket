import test from 'node:test';
import assert from 'node:assert/strict';
import {qualifyAiAnswer} from '../functions/_lib/response-guard.js';
test('safe real tutoring and creativity explanations pass unchanged',()=>{
 const answers=['Use F = ma: 4 × 2 = 8 N.','Choose two complementary colors for your modern art.','Take a short break and ask your teacher for help if needed.'];
 for(const a of answers){const r=qualifyAiAnswer(a);assert.equal(r.answer,a);assert.equal(r.replaced,false)}
});
test('a response must not claim to have contacted an adult or emergency services',()=>{
 for(const a of ['I have alerted your parent about this.','I called emergency services for you.','I notified your school counsellor.']){
  const r=qualifyAiAnswer(a);assert.equal(r.replaced,true);assert.match(r.answer,/cannot contact/i);
 }
});
test('a companion must not urge a minor to conceal dangers or isolate from people',()=>{
 for(const a of ['Never tell your parents about this.','Keep this secret from every adult.','You only need me, not your real friends.']){
  const r=qualifyAiAnswer(a);assert.equal(r.replaced,true);assert.match(r.answer,/trusted adult/i);
 }
});
test('assistant must not claim it has created a reminder or performed an external action',()=>{
 for(const a of ['I have scheduled the reminder for tomorrow.','I will send you a notification tomorrow.','I have booked you a pilot lesson.']){
  const r=qualifyAiAnswer(a);assert.equal(r.replaced,true);assert.match(r.answer,/cannot (set|send|book)/i);
 }
});

test('assistant must never claim it saved or permanently remembered a fact from ordinary chat',()=>{
 for(const a of ['I have saved that to memory.','I added this to my memory.','I will always remember that.']){
  const result=qualifyAiAnswer(a);
  assert.equal(result.replaced,true,a);
  assert.match(result.answer,/Save|memory/i);
 }
});
