import test from 'node:test';import assert from 'node:assert/strict';import {parseScheduleIntent,proactiveSearchHint,skillUpgradeIntent} from '../public/saathi-orchestrator.js';
test('voice scheduling intent is conservatively parsed and requires user confirmation',()=>{
 const x=parseScheduleIntent('remind me to revise Physics at 6:30 pm every friday');
 assert.deepEqual(x,{title:'revise Physics',kind:'study',time:'18:30',minutes:30,days:[5]});
 assert.equal(parseScheduleIntent('remind me to study at 26 pm'),null);
 assert.equal(parseScheduleIntent('schedule a nuclear launch at 9 am'),null);
});
test('agent can suggest related videos without claiming to watch them',()=>{
 assert.match(proactiveSearchHint('Explain why aircraft wings produce lift','Lift is a force').label,/YouTube or Google/);
 assert.equal(proactiveSearchHint('Hi','Hello'),null);
});
test('skill upgrade routes to sandbox capability, never core deployment',()=>{
 assert.equal(skillUpgradeIntent('upgrade your skills to teach flight navigation'),'teach flight navigation');
 assert.equal(skillUpgradeIntent('Hello'),null);
});
