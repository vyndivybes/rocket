import test from 'node:test';
import assert from 'node:assert/strict';
import {createVoiceCapture,voiceAcknowledgement} from '../public/voice-interaction.js';

function fakeSpeech() {
 const sessions=[];
 class Recognition {
  constructor(){sessions.push(this);this.started=false;this.stopped=false;this.aborted=false;}
  start(){this.started=true;}
  stop(){this.stopped=true;this.onend?.();}
  abort(){this.aborted=true;this.onend?.();}
 }
 return {Recognition,sessions};
}

test('Saathi microphone only starts on explicit action and publishes interim drafts, never a submission',()=>{
 const {Recognition,sessions}=fakeSpeech(),drafts=[],finals=[],states=[];
 const capture=createVoiceCapture({RecognitionClass:Recognition,onDraft:text=>drafts.push(text),
  onFinal:text=>finals.push(text),onState:state=>states.push(state)});
 assert.equal(sessions.length,0);
 assert.equal(capture.isListening(),false);
 assert.equal(capture.start(),true);
 assert.equal(sessions.length,1);
 assert.equal(sessions[0].lang,'en-IN');
 assert.equal(sessions[0].interimResults,true);
 assert.equal(sessions[0].continuous,false);
 sessions[0].onresult({results:[Object.assign([{transcript:'How do planes'}],{isFinal:false})]});
 assert.deepEqual(drafts,['How do planes']);
 assert.deepEqual(finals,[]);
 assert.equal(states.includes('LISTENING'),true);
 sessions[0].onresult({results:[Object.assign([{transcript:'How do planes fly?'}],{isFinal:true})]});
 assert.deepEqual(finals,['How do planes fly?']);
 assert.equal(capture.isListening(),false);
 assert.equal(sessions[0].stopped,true);
});

test('Saathi discards late speech events after Stop and may start again',()=>{
 const {Recognition,sessions}=fakeSpeech(),finals=[];
 const capture=createVoiceCapture({RecognitionClass:Recognition,onFinal:text=>finals.push(text)});
 assert.equal(capture.start(),true);
 const expired=sessions[0];
 capture.stop();
 expired.onresult({results:[Object.assign([{transcript:'Delete all data'}],{isFinal:true})]});
 assert.deepEqual(finals,[]);
 assert.equal(expired.aborted,true);
 assert.equal(capture.start(),true);
 assert.equal(sessions.length,2);
});

test('Saathi rejects empty recognition and reports permission denial',()=>{
 const {Recognition,sessions}=fakeSpeech(),finals=[],errors=[];
 const capture=createVoiceCapture({RecognitionClass:Recognition,onFinal:text=>finals.push(text),onError:error=>errors.push(error)});
 capture.start();
 sessions[0].onresult({results:[Object.assign([{transcript:'   '}],{isFinal:true})]});
 assert.deepEqual(finals,[]);
 assert.equal(capture.isListening(),true);
 sessions[0].onerror({error:'not-allowed'});
 assert.equal(capture.isListening(),false);
 assert.deepEqual(errors,['MIC_PERMISSION_DENIED']);
});

test('Saathi acknowledgement distinguishes heard, working and actual answer availability',()=>{
 assert.match(voiceAcknowledgement('HEARD'),/heard.*review/i);
 assert.match(voiceAcknowledgement('WORKING'),/checking/i);
 assert.equal(voiceAcknowledgement('ANSWER_READY'), '');
 assert.match(voiceAcknowledgement('ANSWER_READY',{answerReady:true}),/reply/i);
 assert.equal(voiceAcknowledgement('DONE'), '');
});