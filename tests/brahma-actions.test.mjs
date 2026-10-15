import test from 'node:test';import assert from 'node:assert/strict';
import {detectBrahmaAction,buildAgentReceipt,toolCatalog} from '../public/brahma-actions.js';
test('open NASA source and academic portals from natural conversational requests',()=>{
 const n=detectBrahmaAction('Hey Saathi, open NASA');
 assert.equal(n.kind,'open-url');assert.equal(n.url,'https://www1.grc.nasa.gov/');
 assert.match(n.label,/NASA/);
 assert.equal(detectBrahmaAction('Open my NCERT textbooks').url,'https://ncert.nic.in/');
 assert.equal(detectBrahmaAction('Open CBSE website').url,'https://cbseacademic.nic.in/');
 assert.equal(toolCatalog.length>=4,true);
});
test('web research routes into a clickable explicit learner action, never pretends automatic browser control',()=>{
 const a=detectBrahmaAction('Saathi, search the web for how airplane wings create lift');
 assert.equal(a.kind,'web-search');
 assert.equal(new URL(a.url).searchParams.get('q'),'how airplane wings create lift');
 assert.equal(a.status,'ACTION_READY');
 assert.match(buildAgentReceipt(a).notice,/not yet opened/i);
});
test('excludes privileged actions, redirects and fake control claims',()=>{
 for(const s of ['open https://localhost:8443/', 'open file:///C:/Windows', 'run powershell shutdown', 'delete my browser history', 'open the bank login'])assert.equal(detectBrahmaAction(s),null,s);
 assert.equal(detectBrahmaAction('Saathi control my computer').kind,'device-handoff');
 assert.equal(detectBrahmaAction('Saathi, open nasa.gov@evil.org'),null);
 assert.equal(detectBrahmaAction('search web for a').kind,undefined);
});
test('receipts never include user-supplied scripts or executable href schemes',()=>{
 const a=detectBrahmaAction('search the web for aircraft pressure & Bernoulli');
 assert.equal(a.url.startsWith('https://'),true);
 assert.equal(buildAgentReceipt(a).url.startsWith('https://'),true);
 assert.equal(detectBrahmaAction('search for ' + 'a'.repeat(2000)),null);
});
