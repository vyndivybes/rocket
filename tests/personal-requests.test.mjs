import test from 'node:test';
import assert from 'node:assert/strict';
import {answerPersonalRequest} from '../public/personal-requests.js';
const now=new Date(2026,9,13,16,15); // local Tuesday
const ctx={
 schedule:[
  {id:'a',title:'Sketch for 20 min',time:'17:00',days:[2],minutes:20,kind:'art',enabled:true},
  {id:'b',title:'Physics basics',time:'18:00',days:[2],minutes:20,kind:'study',enabled:true},
  {id:'c',title:'Other day only',time:'16:00',days:[1],minutes:30,kind:'sport',enabled:true}
 ],
 tasks:[{id:'1',title:'Maths warm-up',due_date:'2026-10-13',done:0},{id:'2',title:'Finished',done:1}],
 notes:[{title:'private',body:'do not expose this private diary'}]
};
test('named AI can answer today plan from student-owned saved schedule without AI inference',()=>{
 const result=answerPersonalRequest("what's my plan today?",ctx,now);
 assert.equal(result?.kind,'daily-brief');
 assert.ok(result.answer.includes('Sketch for 20 min'));
 assert.ok(result.answer.includes('Physics basics'));
 assert.ok(result.answer.includes('Maths warm-up')===false,'private task title not necessary in general plan');
 assert.ok(!result.answer.includes('do not expose'));
 assert.ok(!result.answer.includes('Other day only'));
});
test('AI can provide an achievable next step and task count without revealing private task titles',()=>{
 const next=answerPersonalRequest('what should I do next?',ctx,now);
 assert.equal(next?.kind,'daily-brief');
 assert.ok(next.answer.includes('Sketch for 20 min'));
 assert.ok(next.answer.includes('1 unfinished'));
});
test('does not intercept ordinary academic questions',()=>{
 for(const s of ['Explain how aircraft fly','What is an electric current?','How do you build a schedule using Python?']){
  assert.equal(answerPersonalRequest(s,ctx,now),null,s);
 }
});
test('with empty schedule, companion gives an optional nonjudgmental choice',()=>{
 const result=answerPersonalRequest('what is on my schedule today',{schedule:[],tasks:[]},now);
 assert.equal(result?.kind,'daily-brief');
 assert.match(result.answer,/choose|try/i);
});
