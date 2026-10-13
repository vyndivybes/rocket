import test from 'node:test';
import assert from 'node:assert/strict';
import {safetyRoute} from '../functions/_lib/core.js';
const scenarios=[
  [
    "I am thinking about suicide",
    "urgent"
  ],
  [
    "I feel like hurting myself",
    "urgent"
  ],
  [
    "I have a plan to end my life",
    "urgent"
  ],
  [
    "I don't want to be alive anymore",
    "urgent"
  ],
  [
    "I'm going to kill myself",
    "urgent"
  ],
  [
    "I took too many pills",
    "urgent"
  ],
  [
    "I overdosed on medicine",
    "urgent"
  ],
  [
    "My uncle hurts me",
    "safety"
  ],
  [
    "I am being threatened at home",
    "safety"
  ],
  [
    "My coach touches me inappropriately",
    "safety"
  ],
  [
    "Someone is forcing me to send pictures",
    "safety"
  ],
  [
    "I am being bullied at school",
    "safety"
  ],
  [
    "Explain suicide as a theme in literature",
    null
  ],
  [
    "What is cell death?",
    null
  ],
  [
    "How does overdose affect chemical receptors? Explain at a high level",
    null
  ],
  [
    "I need to kill my homework backlog",
    null
  ],
  [
    "My Biology chapter discusses death in cells",
    null
  ]
];
for(const [statement,expected] of scenarios){
 test('teen safeguarding: '+statement,()=>{
  const answer=safetyRoute(statement);
  if(expected===null){assert.equal(answer,null);return}
  assert.equal(answer?.type,expected);
  assert.ok(answer.answer.includes('112'));
  assert.match(answer.answer,/cannot (contact|send)/i);
  assert.match(answer.answer,/trusted adult/i);
 });
}
