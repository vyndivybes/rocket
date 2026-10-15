import test from 'node:test';import assert from 'node:assert/strict';import {VOICE_PRESETS,chooseVoice,voiceSettings} from '../public/voice-profiles.js';import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('default Jarvis-inspired style prioritizes an available deep English voice and provides fallback',()=>{
 assert.equal(VOICE_PRESETS[0].id,'cinematic');
 const voices=[{name:'Alice',lang:'en-US'},{name:'Google UK English Male',lang:'en-GB'},{name:'French',lang:'fr-FR'}];
 assert.equal(chooseVoice(voices,{preset:'cinematic'}).name,'Google UK English Male');
 assert.equal(chooseVoice([{name:'English',lang:'en-US'}],{preset:'cinematic'}).name,'English');
 assert.equal(chooseVoice([],{preset:'cinematic'}),null);
});
test('voice choice respects explicit named voice and bounded rate and pitch',()=>{
 const voices=[{name:'Siri Voice A',lang:'en-US'},{name:'Siri Voice B',lang:'en-GB'}];
 assert.equal(chooseVoice(voices,{voiceName:'Siri Voice B'}).name,'Siri Voice B');
 assert.equal(voiceSettings({preset:'cinematic'}).pitch<1,true);
 assert.equal(voiceSettings({rate:500}).rate<=1.3,true);
});
test('3D page offers accessible cross-device voice selector without new chat input',()=>{
 assert.match(read('public/experience.html'),/id="saathi-voice-select"/);
 assert.match(read('public/experience.html'),/id="saathi-voice-preview"/);
 const agent=read('public/experience-agent.js');
 assert.match(agent,/chooseVoice/);assert.match(agent,/voiceschanged/);
});
