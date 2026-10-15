import test from 'node:test';
import assert from 'node:assert/strict';
import {parseGeneratedBuild,validateBuildRequest} from '../functions/_lib/builder-lab.js';
import {buildSandboxDocument,detectBuildRequest} from '../public/builder-lab.js';

const payload={title:'Cockpit Quiz',html:'<main><h1>Flight instruments</h1><button id="next">Next</button></main>',css:'body { font: 16px sans-serif; padding: 1rem }',js:'document.getElementById("next").onclick = () => { document.querySelector("h1").textContent = "Altimeter"; };'};
test('AI builder parses bounded self-contained widget JSON and rejects extra unsupported forms',()=>{
 assert.deepEqual(parseGeneratedBuild(JSON.stringify(payload)),payload);
 assert.deepEqual(parseGeneratedBuild('  '+JSON.stringify(payload)+'  '),payload);
 assert.equal(parseGeneratedBuild(JSON.stringify({...payload,html:'<iframe src="https://evil.test"></iframe>'})),null);
 assert.equal(parseGeneratedBuild(JSON.stringify({...payload,js:'fetch("https://evil.test")'})),null);
 assert.equal(parseGeneratedBuild('Here is your code: '+JSON.stringify(payload)),null);
 assert.equal(parseGeneratedBuild(JSON.stringify({...payload,js:'x'.repeat(9000)})),null);
});
test('a build request requires an explicit creative development intent',()=>{
 assert.equal(detectBuildRequest('Build an interactive cockpit quiz'), 'Build an interactive cockpit quiz');
 assert.equal(detectBuildRequest('Create a small drawing app for me'),'Create a small drawing app for me');
 assert.equal(detectBuildRequest('Build a skill called Flight Trainer that quizzes me'),null);
 assert.equal(detectBuildRequest('How to build a game?'),null);
 assert.equal(detectBuildRequest('Delete all notes'),null);
});
test('build input protects quotas and high risk external permissions',()=>{
 assert.equal(validateBuildRequest('Build a calculator'),null);
 assert.ok(validateBuildRequest('Build an app that steals passwords'));
 assert.ok(validateBuildRequest('Make a bot to send messages to my teachers'));
 assert.ok(validateBuildRequest('A'.repeat(900)));
});
test('preview is an opaque-origin sandbox with network and parent access blocked',()=>{
 const doc=buildSandboxDocument(payload);
 assert.match(doc,/default-src 'none'/);
 assert.match(doc,/connect-src 'none'/);
 assert.match(doc,/form-action 'none'/);
 assert.match(doc,/Flight instruments/);
 assert.ok(!doc.includes('allow-same-origin'));
});
