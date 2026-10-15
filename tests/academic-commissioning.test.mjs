import test from 'node:test';import assert from 'node:assert/strict';
import {academicInventory} from '../functions/_lib/syllabus-catalog.js';
import {commissioningStatus} from '../functions/_lib/commissioning.js';
import {LESSONS} from '../functions/_lib/study.js';
test('selected subjects map to official XII outlines and ambiguous English remains held',()=>{
 const x=academicInventory(['Physics','Chemistry','Mathematics','Biology','English'],LESSONS);
 assert.deepEqual(x.map(s=>s.totalChapters),[14,10,13,13,null]);
 assert.equal(x[4].mappingStatus,'subject_code_required');
 assert.equal(x[1].chapters[1].title,'Electrochemistry');
 assert.equal(x[3].chapters[4].title,'Molecular Basis of Inheritance');
 assert.ok(x.every(s=>s.qualifiedChapters===0));
 assert.equal(x[1].formativeTopics.length,4);
});
test('perfect repeated foundation answers never qualify a chapter or exam readiness',()=>{
 const s=academicInventory(['Physics'],LESSONS,[{lesson_id:'physics-faraday',attempts:100,correct:100}])[0];
 assert.equal(s.chapters[5].practice.accuracy,1);assert.equal(s.chapters[5].qualified,false);
 assert.equal(s.examReadiness,'HOLD');assert.equal(s.qualifiedChapters,0);
 assert.equal(s.chapters[0].practice.accuracy,null);
});
test('no learner subjects are invented, deduplicated inputs cannot inflate coverage',()=>{
 assert.deepEqual(academicInventory(null),[]);assert.deepEqual(academicInventory([]),[]);
 assert.equal(academicInventory(['Physics','Physics']).length,1);
});
test('commissioning gates stay held unless exact owner pilot override is set',()=>{
 const held=commissioningStatus();assert.equal(held.productionEligible,false);assert.equal(held.status,'HOLD');
 assert.ok(held.gates.every(g=>g.status==='HOLD'));
 const overridden=commissioningStatus({SAATHI_PRODUCTION_RELEASE_OVERRIDE:'owner-authorized-restricted-pilot-2026-10-15'});
 assert.equal(overridden.productionEligible,true);assert.equal(overridden.status,'OVERRIDDEN');
 assert.match(overridden.releaseBasis,/gates remain HOLD/);
 assert.ok(overridden.gates.every(g=>g.status==='HOLD'));
});
