import test from 'node:test';import assert from 'node:assert/strict';
import {parseOneTimeReminder,needsReminderDetails} from '../public/saathi-orchestrator.js';
import {onRequestGet,onRequestPost} from '../functions/api/one-time-reminders.js';
test('tomorrow 6 AM creates a one-time local reminder rather than repeating every day',()=>{
 const now=new Date('2026-10-15T12:00:00+05:30');
 const a=parseOneTimeReminder('remind me to wake up tomorrow morning at 6:00 am',now);
 assert.deepEqual(a,{title:'wake up',date:'2026-10-16',time:'06:00'});
 assert.equal(needsReminderDetails('remind me to wake up tomorrow morning at 6:00 am'),false);
 assert.equal(parseOneTimeReminder('remind me tomorrow at 6am',now).time,'06:00');
 assert.equal(parseOneTimeReminder('remind me to study tomorrow',now),null);
 assert.equal(parseOneTimeReminder('remind me to study yesterday at 6am',now),null);
 assert.equal(typeof onRequestGet,'function');assert.equal(typeof onRequestPost,'function');
});
