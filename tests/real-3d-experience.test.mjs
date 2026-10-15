import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('real 3D experience is the primary student entry and retains legacy workspace access',()=>{
 const html=read('public/experience.html');
 assert.match(html,/id="saathi-stage"/);
 assert.match(html,/id="saathi-command"/);
 assert.match(html,/id="saathi-mic"/);
 assert.match(html,/id="saathi-answer"/);
 const app=read('public/app.js');
 assert.match(app,/experience\.html/);
 assert.match(html,/mission\.html/);
});
test('scene is a Three.js 3D WebGL scene with animated camera and interactive aircraft',()=>{
 const code=read('public/experience-3d.js');
 for(const token of ['WebGLRenderer','PerspectiveCamera','DirectionalLight','MeshStandardMaterial','requestAnimationFrame','Raycaster','pointerdown','prefers-reduced-motion','visibilitychange'])assert.ok(code.includes(token),token);
 assert.match(code,/contextlost/);
});
test('one input automatically selects educational YouTube or tutor with user-operated voice',()=>{
 const source=read('public/experience-agent.js');
 for(const token of ['youtubeIntent','youtube-search',"api('ask'",'SpeechRecognition','SpeechSynthesisUtterance',"api('me'",'submit','textContent'])assert.ok(source.includes(token),token);
 assert.doesNotMatch(source,/innerHTML\s*=\s*(?:data|result|response)\./);
});
test('3D dependency and YouTube player are explicitly allowed, never embed API secrets',()=>{
 const headers=read('public/_headers');
 assert.match(headers,/cdn\.jsdelivr\.net/);
 assert.match(headers,/youtube-nocookie\.com/);
 for(const file of ['public/experience.html','public/experience-3d.js','public/experience-agent.js'])assert.doesNotMatch(read(file),/YOUTUBE_API_KEY|AIza[0-9A-Za-z_-]{30}/);
});
