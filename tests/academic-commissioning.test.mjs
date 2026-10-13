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
test('all mandatory commissioning gates are held; runtime cannot override',()=>{
 const s=commissioningStatus();assert.equal(s.productionEligible,false);assert.equal(s.status,'HOLD');
 assert.ok(s.gates.every(g=>g.status==='HOLD'));
});
