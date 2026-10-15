import test from 'node:test';import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {addApprovedFeature,approvedSkills} from '../scripts/generate-core-upgrade.mjs';
const manifest=JSON.parse(readFileSync(new URL('../public/core-skills/catalog.json',import.meta.url),'utf8'));
test('core upgrade generator makes inspectable version-controlled repo content only',()=>{
 const result=addApprovedFeature(manifest,'aviation-instruments');
 assert.equal(result.added,true);assert.equal(result.catalog.skills.length,manifest.skills.length+1);
 assert.equal(addApprovedFeature(result.catalog,'aviation-instruments').added,false);
 assert.ok(result.catalog.skills.find(x=>x.id==='aviation-instruments').prompt.includes('cockpit'));
});
test('arbitrary commands and paths cannot enter the source generator',()=>{
 for(const q of ['../../.github/workflows','rm -rf','run-shell','delete-account'])assert.throws(()=>addApprovedFeature(manifest,q));
 assert.equal(Object.keys(approvedSkills).length,5);
});
