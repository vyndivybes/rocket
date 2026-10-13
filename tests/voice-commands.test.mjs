import test from 'node:test';
import assert from 'node:assert/strict';
import {matchVoiceCommand} from '../public/voice-commands.js';
test('clear spoken navigation works without giving AI authority to modify student data',()=>{
 assert.equal(matchVoiceCommand('open my notes'),'notes');
 assert.equal(matchVoiceCommand('show my schedule'),'schedule');
 assert.equal(matchVoiceCommand('open art studio'),'art');
 assert.equal(matchVoiceCommand('take me to pilot academy'),'pilot');
 assert.equal(matchVoiceCommand('talk to Saathi'),'companion');
});
test('spoken requests about notes or reminders are not executed as destructive commands',()=>{
 assert.equal(matchVoiceCommand('delete my notes'),null);
 assert.equal(matchVoiceCommand('send a message to my teacher'),null);
 assert.equal(matchVoiceCommand('remind me to exercise every day'),null);
});
