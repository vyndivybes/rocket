import test from 'node:test';import assert from 'node:assert/strict';
import {motionLabels,normalizePointer,progressRatio} from '../public/saathi-motion.js';
test('cinematic pointer transforms are bounded and safe for invalid viewport sizes',()=>{
 assert.deepEqual(normalizePointer(50,50,100,100),{x:0,y:0});
 assert.deepEqual(normalizePointer(-40,250,100,100),{x:-1,y:1});
 assert.deepEqual(normalizePointer(0,0,0,100),{x:0,y:0});
 assert.ok(motionLabels.length>=4);
});
test('scroll progress never escapes 0–1 and stays zero on non-scrollable content',()=>{
 assert.equal(progressRatio(500,1000,500),1);
 assert.equal(progressRatio(250,1000,500),.5);
 assert.equal(progressRatio(-50,1000,500),0);
 assert.equal(progressRatio(300,400,500),0);
});
