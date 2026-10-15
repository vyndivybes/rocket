import test from 'node:test';
import assert from 'node:assert/strict';
import {composeWelcomeReport,voicePhaseLabel} from '../public/briefing-experience.js';
const when=new Date(2026,9,15,7,30);
test('enthusiastic welcome mentions only real scheduled events, counts and due work',()=>{
 const report=composeWelcomeReport({schedule:[{id:'a',title:'Physics revision',time:'08:30',kind:'study',minutes:35,enabled:true,days:[4]},{id:'b',title:'Painting practice',time:'17:30',kind:'art',minutes:30,enabled:true,days:[4]},{id:'c',title:'Old event',time:'09:00',kind:'other',minutes:10,enabled:false,days:[4]}],tasks:[{title:'Complete optics exercise',due_date:'2026-10-15',done:false}]},'Nova',when);
 assert.match(report.greeting,/good morning/i);assert.match(report.spoken,/Nova/i);
 assert.match(report.spoken,/Physics revision/);assert.match(report.spoken,/Painting practice/);
 assert.doesNotMatch(report.spoken,/Old event/);assert.equal(report.agenda.length,2);assert.equal(report.dueToday,1);
 assert.equal(report.next?.title,'Physics revision');
});
test('empty agenda does not invent events or shame the learner',()=>{
 const report=composeWelcomeReport({schedule:[],tasks:[]},'Saathi',when);
 assert.equal(report.agenda.length,0);assert.doesNotMatch(report.spoken,/at 8|at 5/);assert.match(report.spoken,/you choose|explore/i);
});
test('voice phases are stable, non-fictional browser observations',()=>{
 assert.equal(voicePhaseLabel('listening'),'Listening');
 assert.equal(voicePhaseLabel('thinking'),'Thinking');
 assert.equal(voicePhaseLabel('speaking'),'Speaking');
 assert.equal(voicePhaseLabel('idle'),'Ready');
});
