import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {detectMediaFile,frameTimeLabel} from '../public/media-file.js';
test('browser handles plain study text locally and only selected video frames',()=>{
 assert.equal(detectMediaFile('physics.md',2000),'text');
 assert.equal(detectMediaFile('school.srt',15000),'text');
 assert.equal(detectMediaFile('sketch.jpg',5000000),'image');
 assert.equal(detectMediaFile('lesson.mp4',10000000),'video-frame-only');
 assert.equal(detectMediaFile('paper.pdf',5000),'document');
 assert.equal(detectMediaFile('chapter.docx',20000),'document');
 assert.equal(detectMediaFile('x.exe',500),null);
 assert.equal(detectMediaFile('big.mp4',19000000),null);
});
test('frame timestamp is based on actual selected local playback time',()=>{assert.equal(frameTimeLabel(90.7),'00:01:30');assert.equal(frameTimeLabel(-5),'time unavailable')});
test('student file UI keeps upload consent and displays single-frame limitations',()=>{
 const html=readFileSync(new URL('../public/mission.js',import.meta.url),'utf8');
 for(const needle of ['My uploads','media-file-input','analyze-media','video-frame-only','This is one selected frame','ANALYZE IMAGE','Study links'])assert.ok(html.includes(needle),needle);
});
