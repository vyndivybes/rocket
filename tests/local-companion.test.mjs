import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeBrowserUrl,safeNoteName,validateLocalAction,createLocalCompanion} from '../local-companion/saathi-local.mjs';
test('local browser helper allows ordinary educational HTTPS pages, never shell or private networks',()=>{
 assert.equal(normalizeBrowserUrl('https://www1.grc.nasa.gov/').host,'www1.grc.nasa.gov');
 for(const bad of ['http://localhost:8787','https://127.0.0.1/','file:///C:/Windows','javascript:alert(1)','https://a.com@localhost/','https://192.168.1.1/private','https://evil.com\\n&calc.exe'])assert.throws(()=>normalizeBrowserUrl(bad),bad);
});
test('explicit local note export cannot escape user Documents folder',()=>{
 assert.equal(safeNoteName('Flight forces and wings'),'Flight-forces-and-wings.md');
 assert.equal(safeNoteName('../../secrets'),'secrets.md');
 assert.ok(validateLocalAction({action:'save-note',title:'Pilot training',content:'Explain lift in a few paragraphs.'}).ok);
 assert.ok(!validateLocalAction({action:'run-command',command:'rm -rf /'}).ok);
 assert.ok(!validateLocalAction({action:'save-note',title:'bad',content:'a'.repeat(35000)}).ok);
});
test('loopback bridge rejects cross-site writes and requires same-origin nonce',async()=>{
 const app=await createLocalCompanion({port:0});
 try{
  const {port}=app.server.address(),url='http://127.0.0.1:'+port;
  const home=await fetch(url+'/');assert.equal(home.status,200);assert.match(await home.text(),/Saathi Local Companion/);
  const outsider=await fetch(url+'/action',{method:'POST',headers:{Origin:'https://evil.test','Content-Type':'application/json'},body:JSON.stringify({action:'system-status'})});assert.equal(outsider.status,403);
  const missing=await fetch(url+'/action',{method:'POST',headers:{Origin:url,'Content-Type':'application/json'},body:JSON.stringify({action:'system-status'})});assert.equal(missing.status,403);
 }finally{await new Promise(resolve=>app.server.close(resolve))}
});
