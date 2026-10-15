import test from 'node:test';
import assert from 'node:assert/strict';
import {SOURCES,TOPICS} from '../functions/_lib/core.js';
test('school curriculum link matches current 2026-27 academic year, not archived 2025-26',()=>{
 const cbse=SOURCES.find(x=>x.label.toLowerCase().includes('cbse'));
 assert.ok(cbse);
 assert.equal(cbse.url,'https://cbseacademic.nic.in/curriculum_2027.html');
 assert.match(cbse.label,/2026.27/);
});
test('general topics are not misrepresented as official CBSE lesson certification',()=>{
 assert.ok(TOPICS.every(x=>x.board==='general'));
 assert.ok(TOPICS.every(x=>x.level==='Class 12 example'));
 const text=JSON.stringify(TOPICS);
 assert.ok(!text.includes('CBSE certified'));
});
