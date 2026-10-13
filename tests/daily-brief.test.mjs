import test from 'node:test';
import assert from 'node:assert/strict';
import {buildDailyBrief} from '../public/daily-brief.js';
const date=new Date(2026,9,13,16,15);
test('daily briefing lists only enabled events on the device-local date',()=>{
 const schedule=[
  {id:'a',title:'Maths warmup',kind:'study',time:'18:00',days:[2],enabled:true,minutes:20},
  {id:'b',title:'Sketch',kind:'art',time:'17:00',days:[2],enabled:true,minutes:25},
  {id:'c',title:'Friday sport',kind:'sport',time:'16:30',days:[5],enabled:true,minutes:30},
  {id:'d',title:'Paused',kind:'study',time:'19:00',days:[2],enabled:false,minutes:20}
 ];
 const brief=buildDailyBrief({schedule,tasks:[]},date);
 assert.deepEqual(brief.todayEvents.map(x=>x.id),['b','a']);
 assert.equal(brief.nextEvent.title,'Sketch');
 assert.equal(brief.dateLabel.length>0,true);
});
test('daily brief identifies tasks due or overdue without showing note bodies or unrelated data',()=>{
 const tasks=[{id:'1',title:'Physics revision',due_date:'2026-10-13',done:0},{id:'2',title:'Old Maths task',due_date:'2026-10-12',done:0},{id:'3',title:'Finished',due_date:'2026-10-13',done:1}];
 const r=buildDailyBrief({schedule:[],tasks,notes:[{body:'very private'}]},date);
 assert.equal(r.openTasks,2);assert.equal(r.dueToday,1);assert.equal(r.overdue,1);
 assert.equal(r.nextEvent,null);assert.equal(JSON.stringify(r).includes('very private'),false);
});
test('daily briefing yields an achievable, non-judgmental fallback for an empty plan',()=>{
 const r=buildDailyBrief({schedule:[],tasks:[]},date);
 assert.equal(r.openTasks,0);assert.match(r.nextStep,/choose|try/i);assert.match(r.nextStep,/short|small|few/i);
});
