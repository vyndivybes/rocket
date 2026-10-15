import test from 'node:test';
import assert from 'node:assert/strict';
import {detectSaathiUpgradeIntent} from '../public/saathi-upgrades.js';
test('Saathi upgrade request is distinguished from a prompt template or educational question',()=>{
 assert.equal(detectSaathiUpgradeIntent('Saathi, upgrade yourself with an interactive cockpit quiz'),'Build an interactive cockpit quiz');
 assert.equal(detectSaathiUpgradeIntent('Upgrade Saathi with a simple drawing app'),'Build a simple drawing app');
 for(const q of ['How do I upgrade Saathi?','Forge a skill for cockpit quiz questions','Delete everything in Saathi','Buy a paid plugin','Build an interactive art game'])
  assert.equal(detectSaathiUpgradeIntent(q),null,q);
});
test('dangerous, unrelated, and impossible backend mutations are excluded from automatic upgrades',()=>{
 for(const q of ['Upgrade Saathi with a tool that steals passwords','Upgrade yourself with a bot that sends email','Upgrade yourself with access to every student account','Upgrade yourself with unlimited file system access','Upgrade Saathi with payment integration'])
  assert.equal(detectSaathiUpgradeIntent(q),null,q);
});
