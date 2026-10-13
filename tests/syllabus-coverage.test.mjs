import test from 'node:test';import assert from 'node:assert/strict';
import {PHYSICS_CHAPTERS,syllabusInventory,SYLLABUS_SOURCE,SAMPLE_PAPERS} from '../functions/_lib/syllabus-catalog.js';
test('CBSE 2026–27 Physics inventory explicitly leaves all chapters unqualified',()=>{
 const x=syllabusInventory(['Physics'],[{id:'physics-faraday'}])[0];
 assert.equal(PHYSICS_CHAPTERS.length,14);assert.equal(x.totalChapters,14);
 assert.equal(x.qualifiedChapters,0);assert.equal(x.coverageStatus,'INCOMPLETE');
 assert.equal(x.chapters[5].title,'Electromagnetic Induction');
 assert.equal(x.chapters[5].status,'foundation_only');
 assert.ok(x.chapters.every(c=>c.status!=='qualified'));
});
test('Other electives are not fabricated as complete and only official 2026–27 sources are linked',()=>{
 const r=syllabusInventory(['Chemistry','Biology','English','Computer Science']);
 assert.equal(r.length,4);assert.ok(r.every(s=>s.mappingStatus==='not_yet_verified'&&s.totalChapters===null&&s.coverageStatus==='INCOMPLETE'));
 assert.match(SYLLABUS_SOURCE,/curriculum_2027/);assert.match(SAMPLE_PAPERS,/2026-27/);
});
