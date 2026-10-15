import test from 'node:test';import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {clampParallax,attachImmersiveScene} from '../public/immersive-scene.js';
import {validateCoreSkills} from '../public/core-skills.js';
const file=x=>readFileSync(new URL('../'+x,import.meta.url),'utf8');
test('3D interactions normalize pointer and constrain depth to [-1,+1]',()=>{
 assert.deepEqual(clampParallax(50,50,100,100),{x:0,y:0});
 assert.deepEqual(clampParallax(150,-20,100,100),{x:1,y:-1});
 assert.deepEqual(clampParallax(1,1,0,100),{x:0,y:0});
});
test('immersive scene is opt-in, reduced motion friendly and cleans up event listeners',()=>{
 const handlers=new Map(),calls=[];
 const root={addEventListener:(name,fn)=>handlers.set(name,fn),removeEventListener:(name)=>calls.push(name)};
 const win={matchMedia:()=>({matches:true}),requestAnimationFrame:()=>{throw Error('reduced motion requested')},cancelAnimationFrame:()=>{}};
 const stop=attachImmersiveScene({root,win});handlers.get('pointermove')({target:{closest:()=>({})},clientX:20,clientY:30});stop();assert.equal(calls.length,3);
});
test('mission control and main learning space share immersive styles without paid assets',()=>{
 assert.match(file('public/mission.html'),/immersive.css/);
 assert.match(file('public/index.html'),/student-immersive.css/);
 assert.match(file('public/welcome-display.js'),/data-immersive/);
 assert.match(file('public/immersive.css'),/perspective:1300px/);
 assert.match(file('public/immersive.css'),/prefers-reduced-motion/);
 assert.match(file('public/immersive-scene.js'),/requestAnimationFrame/);
});
test('core source catalog is bounded and has valid learner activities',()=>{
 const catalog=JSON.parse(file('public/core-skills/catalog.json'));
 const items=validateCoreSkills(catalog);
 assert.ok(items.length>=2);assert.equal(items.length,catalog.skills.length);
 assert.equal(validateCoreSkills({version:2,skills:items}).length,0);
 assert.ok(items.every(x=>x.prompt.length>10&&x.description.length>10));
});
test('reviewed core pipeline never silently merges or deploys to production',()=>{
 const flow=file('.github/workflows/saathi-core-upgrade.yml');
 assert.match(flow,/workflow_dispatch/);
 assert.match(flow,/gh pr create/);
 assert.match(flow,/npm run check/);
 assert.doesNotMatch(flow,/gh pr merge|wrangler deploy|publish production/);
});
