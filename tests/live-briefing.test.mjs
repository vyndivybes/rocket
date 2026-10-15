import test from 'node:test';import assert from 'node:assert/strict';
import {buildLoginBriefing,describeWeather} from '../public/live-briefing.js';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('login briefing uses only actual learner schedule and pending tasks',()=>{
 const date=new Date(2026,9,15,9,0);
 const schedule=[{title:'Physics revision',time:'09:30',days:[4],enabled:true},{title:'Gym',time:'18:00',days:[4],enabled:true},{title:'Old',time:'08:00',days:[4],enabled:false}];
 const tasks=[{title:'Finish physics notes',done:0,due_date:'2026-10-15'},{title:'Completed',done:1,due_date:'2026-10-15'}];
 const a=buildLoginBriefing({username:'learner_demo',schedule,tasks,weather:null},date);
 assert.match(a.text,/Physics revision/);assert.match(a.text,/Finish physics notes/);assert.match(a.text,/weather information is not available/i);
 assert.doesNotMatch(a.text,/Old|Completed/);
});
test('weather description distinguishes available data and missing permission',()=>{
 assert.match(describeWeather({temperature:29,code:0}),/29°C/);
 assert.match(describeWeather(null),/not available/);
});
test('new page automatically reads the saved schedule and permission-based local weather',()=>{
 const s=read('public/experience-agent.js');
 for(const token of ['buildLoginBriefing','api(\'schedule\')','api(\'tasks\')','geolocation','saathi-brief-voice','saathi-weather-request','autoWelcomePending=true','refreshWeatherAndBriefing({read:true})','say(briefing.text)'])assert.ok(s.includes(token),token);
 const h=read('public/experience.html');assert.match(h,/saathi-brief-voice/);assert.match(h,/saathi-weather-request/);
});
