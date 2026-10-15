import test from 'node:test';import assert from 'node:assert/strict';
import {frameDimensions,captureVisualFrame} from '../public/visual-capture.js';
test('camera and screen image capture produces bounded dimensions',()=>{assert.deepEqual(frameDimensions(1920,1080),{width:960,height:540});assert.deepEqual(frameDimensions(400,300),{width:400,height:300});assert.equal(frameDimensions(0,0),null)});
test('camera/screen snapshots stop media tracks immediately after reading one frame',async()=>{
 let stops=0,source=null,draws=0;const stream={getTracks:()=>[{stop:()=>{stops++}}]};
 const mediaDevices={getDisplayMedia:async opts=>{assert.equal(opts.audio,false);source='screen';return stream},getUserMedia:async()=>{source='camera';return stream}};
 const doc={createElement:tag=>tag==='video'?{videoWidth:1920,videoHeight:1080,async play(){},pause(){},srcObject:null}:{getContext:()=>({drawImage(){draws++}}),toDataURL:()=>'data:image/jpeg;base64,A'}};
 assert.match(await captureVisualFrame('screen',{mediaDevices,document:doc}),/^data:image\/jpeg/);assert.equal(source,'screen');assert.equal(stops,1);assert.equal(draws,1);
 await captureVisualFrame('camera',{mediaDevices,document:doc});assert.equal(source,'camera');assert.equal(stops,2);
});
test('unsupported sources fail without requesting media access',async()=>{await assert.rejects(()=>captureVisualFrame('background',{mediaDevices:{},document:{}}))});
