import test from 'node:test';import assert from 'node:assert/strict';
import {makeProbeScript,parseProbeMessage} from '../public/skill-crucible.js';
test('probe is scoped by random token, source identity and expected schema',()=>{
 const p=makeProbeScript('a1b2-c3');
 assert.match(p,/addEventListener/);assert.match(p,/postMessage/);assert.match(p,/a1b2-c3/);
 const source={};const event={source,data:{type:'SAATHI_CRUCIBLE_V1',token:'a1b2-c3',ok:true,errorCount:0,nodeCount:2}};
 assert.equal(parseProbeMessage(event,{token:'a1b2-c3',source})?.ok,true);
 assert.equal(parseProbeMessage({...event,source:{}},{token:'a1b2-c3',source}),null);
 assert.equal(parseProbeMessage(event,{token:'wrong',source}),null);
 assert.equal(parseProbeMessage({...event,data:{...event.data,errorCount:123}},{token:'a1b2-c3',source}),null);
});
