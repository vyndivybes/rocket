import test from 'node:test';
import assert from 'node:assert/strict';
import {onRequest} from '../functions/_middleware.js';

function request(){return new Request('https://saathi-student-ai.pages.dev/api/me')}
function envWithMarker(environment,stage){
  return {SAATHI_STAGE:stage,DB:{prepare(){return {async first(){return {environment}}}}}};
}
test('preview deployment cannot use production database, even with an authenticated user',async()=>{
  let passed=false;
  const response=await onRequest({request:request(),env:envWithMarker('production','preview'),next:async()=>{passed=true;return new Response('private')}});
  assert.equal(response.status,503);
  assert.equal(passed,false);
});
test('matching environment marker allows API route to proceed',async()=>{
  let called=false;
  const response=await onRequest({request:request(),env:envWithMarker('preview','preview'),next:async()=>{called=true;return new Response('ok')}});
  assert.equal(response.status,200);
  assert.equal(called,true);
});
test('missing marker or misconfigured environment fails closed',async()=>{
  const response=await onRequest({request:request(),env:{},next:async()=>new Response('must-not-pass')});
  assert.equal(response.status,503);
});

test('legacy release variables cannot bypass the production hold',async()=>{
 let called=false;
 const env={...envWithMarker('production','production'),SAATHI_RELEASE_APPROVED:'true'};
 const r=await onRequest({request:request(),env,next:async()=>{called=true;return new Response('unsafe')}});
 assert.equal(r.status,503);assert.equal(called,false);
});
test('owner-authorized release override opens production only with its matching database marker',async()=>{
 let called=false;
 const env={...envWithMarker('production','production'),SAATHI_PRODUCTION_RELEASE_OVERRIDE:'owner-authorized-restricted-pilot-2026-10-15'};
 const r=await onRequest({request:request(),env,next:async()=>{called=true;return new Response('ok')}});
 assert.equal(r.status,200);assert.equal(called,true);
});
test('owner release override cannot let preview access production records',async()=>{
 let called=false;
 const env={...envWithMarker('production','preview'),SAATHI_PRODUCTION_RELEASE_OVERRIDE:'owner-authorized-restricted-pilot-2026-10-15'};
 const r=await onRequest({request:request(),env,next:async()=>{called=true;return new Response('unsafe')}});
 assert.equal(r.status,503);assert.equal(called,false);
});

test('production Wrangler config carries the operator-side override',async()=>{
 const {readFile}=await import('node:fs/promises');
 const config=await readFile(new URL('../wrangler.toml',import.meta.url),'utf8');
 assert.match(config,/\[env\.production\.vars\][\s\S]*SAATHI_PRODUCTION_RELEASE_OVERRIDE = "owner-authorized-restricted-pilot-2026-10-15"/);
});
