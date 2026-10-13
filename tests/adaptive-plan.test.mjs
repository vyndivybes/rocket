import test from 'node:test';
import assert from 'node:assert/strict';
import {buildAdaptivePlan} from '../functions/_lib/adaptive-plan.js';
test('adaptive plans sort weak concepts ahead of mastered ones without invented syllabus',()=>{
 const p=buildAdaptivePlan([{lesson_id:'physics-newton',attempts:5,correct:1},{lesson_id:'biology-transcription',attempts:5,correct:5}],{maxItems:4});
 assert.equal(p.recommendations[0].lessonId,'physics-newton');
 assert.equal(p.recommendations[0].status,'REVIEW');
 assert.ok(p.recommendations.every(x=>x.minutes>=5&&x.minutes<=15));
 assert.equal(p.certifiedToSchoolBoard,false);
});
test('new learners get diagnostic lessons and unknown lessons are ignored',()=>{
 const p=buildAdaptivePlan([{lesson_id:'fake-lesson',attempts:900,correct:1}]);
 assert.ok(p.recommendations.length>=4);
 assert.ok(p.recommendations.every(x=>x.status==='DIAGNOSTIC'));
});
test('reject inconsistent or fabricated counts',()=>{
 assert.throws(()=>buildAdaptivePlan([{lesson_id:'physics-newton',attempts:2,correct:3}]),/INVALID/);
 assert.throws(()=>buildAdaptivePlan([{lesson_id:'physics-newton',attempts:-1,correct:0}]),/INVALID/);
});
test('do not call a single low attempt result a confirmed weakness',()=>{
 const p=buildAdaptivePlan([{lesson_id:'physics-newton',attempts:1,correct:0}]);
 assert.equal(p.recommendations.find(x=>x.lessonId==='physics-newton').status,'PRACTICE_MORE');
});