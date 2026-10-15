import test from 'node:test';
import assert from 'node:assert/strict';
import {shouldRepairPrototype,buildRepairInstruction} from '../functions/_lib/repair-plan.js';
test('repair loop only attempts a single bounded correction on malformed candidate',()=>{
 assert.equal(shouldRepairPrototype(null,0),true);
 assert.equal(shouldRepairPrototype(null,1),false);
 assert.equal(shouldRepairPrototype({title:'ok'},0),false);
});
test('repair prompt names constraints without echoing untrusted generated code',()=>{
 const prompt=buildRepairInstruction('Build an interactive cockpit quiz');
 assert.match(prompt,/valid JSON/i);
 assert.match(prompt,/no network/i);
 assert.match(prompt,/cockpit quiz/i);
 assert.ok(prompt.length<1050);
});
