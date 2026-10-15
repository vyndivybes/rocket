import test from 'node:test';
import assert from 'node:assert/strict';
import {COACH_PROMPTS} from '../functions/_lib/mission.js';
import {readFileSync} from 'node:fs';
const mission=readFileSync(new URL('../public/mission.js',import.meta.url),'utf8');
test('AI teacher and pilot modes explicitly prioritize one worked problem at a time',()=>{
 assert.match(COACH_PROMPTS.teacher,/one (?:problem|question) at a time/i);
 assert.match(COACH_PROMPTS.teacher,/units/i);
 assert.match(COACH_PROMPTS.pilot,/one (?:problem|question) at a time/i);
});
test('child-facing Saathi interface explains one question at a time and offers checked practice',()=>{
 assert.match(mission,/one question at a time/i);
 assert.match(mission,/Lessons &amp; practice/);
});
