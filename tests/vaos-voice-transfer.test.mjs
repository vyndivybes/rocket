import test from 'node:test';
import assert from 'node:assert/strict';
import {createVoiceReadback,splitVoiceText} from '../public/voice-readback.js';

test('VAOS-style voice reader plays chunked text sequentially and finishes',()=>{
 const spoken=[],states=[],errors=[];const fake={speak(u){spoken.push(u);u.onstart?.()},cancel(){}};
 class Utterance{constructor(text){this.text=text}}
 const reader=createVoiceReadback({synthesis:fake,UtteranceClass:Utterance,onState:s=>states.push(s),onError:e=>errors.push(e),schedule:()=>1,clear:()=>{}});
 const text='A short classroom lesson that explains the first force and then checks units. '.repeat(7);
 const chunks=splitVoiceText(text);
 assert.ok(chunks.length>2);assert.equal(reader.speak(text),true);
 for(let i=0;i<chunks.length;i++){assert.equal(spoken[i].text,chunks[i]);spoken[i].onend()}
 assert.equal(reader.active(),false);assert.ok(states.includes('FINISHED'));assert.deepEqual(errors,[]);
});
test('VAOS-style reader reports unavailable synthesis rather than claiming to have spoken',()=>{
 const errors=[];const reader=createVoiceReadback({onError:e=>errors.push(e)});
 assert.equal(reader.speak('Physics explanation'),false);
 assert.deepEqual(errors,['SPEECH_UNAVAILABLE']);
});
test('VAOS-style reader cancels prior speech and cannot continue stale reply',()=>{
 const utterances=[],engine={cancelCount:0,speak(u){utterances.push(u)},cancel(){this.cancelCount++}};
 class Utterance{constructor(text){this.text=text}}
 const reader=createVoiceReadback({synthesis:engine,UtteranceClass:Utterance,schedule:()=>1,clear:()=>{}});
 reader.speak('This is the first answer about electricity.');
 const original=utterances[0];reader.speak('A different answer about art.');
 assert.equal(reader.active(),true);
 original.onend();assert.equal(utterances.length,2);
 assert.ok(engine.cancelCount>=1);
 reader.cancel();assert.equal(reader.active(),false);
});
