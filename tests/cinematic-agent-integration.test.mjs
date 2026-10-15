import test from 'node:test';import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('cinematic redesign applies to login, learner, companion, syllabus and privacy',()=>{
 for(const name of ['index','mission','privacy','syllabus'])assert.match(read('public/'+name+'.html'),/cinematic-realism\.css/,name);
 const css=read('public/cinematic-realism.css');
 for(const mark of ['.saathi-feature-stage','.welcome-stage','.saathi-login-layout','.saathi-studio-slide','.card','.side','.rail','.saathi-agent-timeline','@media(max-width:767px)','prefers-reduced-motion'])assert.ok(css.includes(mark),mark);
});
test('Brahma action gateway is reachable through assistant conversation, including voice transcripts',()=>{
 const s=read('public/mission.js');assert.match(s,/detectBrahmaAction\(question\)/);
 assert.match(s,/buildAgentReceipt/);assert.match(s,/brahmaActionPanel\(\)/);
 assert.match(s,/target="_blank" rel="noopener noreferrer"/);
 assert.match(s,/companionReply\(question,state\.agentAction\.notice/);
});
test('No vendor trackers, remote photo dependencies or proprietary commercial scripting injected',()=>{
 const css=read('public/cinematic-realism.css');
 assert.doesNotMatch(css,/@import|url\(https?:\/\//i);
 assert.doesNotMatch(css,/gsap|ScrollTrigger|Webflow|three\.js|henrietta/i);
});
