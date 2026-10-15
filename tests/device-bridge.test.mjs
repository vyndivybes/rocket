import test from 'node:test';import assert from 'node:assert/strict';
import {createLocalCompanion,trustedBridgeOrigin} from '../local-companion/saathi-local.mjs';
import {pairLocalCompanion,callLocalCompanion} from '../public/device-bridge.js';
const allowed='https://b3b01bfc.saathi-student-ai.pages.dev';
test('bridge accepts actual Saathi preview origins, never unrelated sites',()=>{
 assert.equal(trustedBridgeOrigin(allowed),true);
 assert.equal(trustedBridgeOrigin('https://saathi-student-ai.pages.dev'),true);
 for(const x of ['https://evil.pages.dev','https://saathi-student-ai.pages.dev.evil.com','http://b3b01bfc.saathi-student-ai.pages.dev','null','https://bad-subdomain.saathi-student-ai.pages.dev'])assert.equal(trustedBridgeOrigin(x),false,x);
});
test('localhost pairing requires displayed code, origin and token; no privileged OS operation',async()=>{
 const app=await createLocalCompanion({port:0});
 try{
  const base='http://127.0.0.1:'+app.port;
  const page=await fetch(base+'/');const html=await page.text();
  const code=html.match(/data-pair-code="(\d{6})"/)?.[1];assert.ok(code);
  const pair=async(pin,origin=allowed)=>fetch(base+'/bridge/pair',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify({code:pin})});
  assert.equal((await pair(code,'https://evil.test')).status,403);
  assert.equal((await pair('000000')).status,403);
  const p=await pair(code);assert.equal(p.status,200);const credentials=await p.json();assert.match(credentials.token,/^[0-9a-f]{64}$/);
  const before=await fetch(base+'/bridge/action',{method:'POST',headers:{Origin:allowed,'Content-Type':'application/json'},body:JSON.stringify({action:'system-status'})});assert.equal(before.status,403);
  const q=await fetch(base+'/bridge/action',{method:'POST',headers:{Origin:allowed,'Content-Type':'application/json','X-Saathi-Bridge-Token':credentials.token},body:JSON.stringify({action:'system-status'})});
  assert.equal(q.status,200);const status=await q.json();assert.equal(status.ok,true);assert.equal(status.scope,'Local read only');
  const invalid=await fetch(base+'/bridge/action',{method:'POST',headers:{Origin:allowed,'Content-Type':'application/json','X-Saathi-Bridge-Token':credentials.token},body:JSON.stringify({action:'run-command',command:'whoami'})});
  assert.equal(invalid.status,400);
 }finally{await new Promise(resolve=>app.server.close(resolve))}
});
test('hosted Saathi bridge functions avoid cookies and require explicit pairing',async()=>{
 const calls=[];const fetcher=async (url,init)=>{calls.push({url,init});return {ok:true,json:async()=>url.endsWith('/pair')?{token:'b'.repeat(64)}:{ok:true,scope:'Local read only'}}};
 const token=await pairLocalCompanion('123456',{fetcher,base:'http://127.0.0.1:31984'});
 assert.equal(token,'b'.repeat(64));assert.equal(calls[0].init.credentials,'omit');
 const status=await callLocalCompanion(token,{action:'system-status'},{fetcher,base:'http://127.0.0.1:31984'});
 assert.equal(status.ok,true);assert.equal(calls[1].init.headers['X-Saathi-Bridge-Token'],token);
 await assert.rejects(()=>callLocalCompanion('bad',{action:'system-status'},{fetcher}));
});
