import test from 'node:test';
import assert from 'node:assert/strict';
import {validateForgeGoal,parseForgeManifest,dryRunForge} from '../functions/_lib/autoforge.js';
import {detectForgeIntent,matchForgedSkill,assembleForgedPrompt} from '../public/forged-skill-engine.js';
const manifest={name:'Flight Instruments Coach',purpose:'Help me practise reading and comparing cockpit flight instruments.',mode:'pilot',blueprint:'coach',triggers:['aircraft instrument practice','cockpit instruments quiz'],steps:[{kind:'explain',instruction:'Explain an instrument using a short example.'},{kind:'question',instruction:'Ask the learner to identify an instrument function.'},{kind:'feedback',instruction:'Explain a correct answer and a misconception.'}],sample:'Help me identify an altimeter'};
test('learner can ask to forge a new capability without manual mode selection',()=>{
 assert.equal(detectForgeIntent('Saathi, learn a new skill to teach cockpit instrument quizzes'),'teach cockpit instrument quizzes');
 assert.equal(detectForgeIntent('Forge a skill for artistic composition exercises'),'artistic composition exercises');
 assert.equal(detectForgeIntent('How do you learn skills?'),null);
 assert.equal(detectForgeIntent('Delete my account'),null);
});
test('AI-authored manifest is safely validated and can be dry-run before registration',()=>{
 assert.equal(validateForgeGoal('Teach cockpit instrument quizzes'),null);
 assert.deepEqual(parseForgeManifest(JSON.stringify(manifest)),manifest);
 assert.deepEqual(parseForgeManifest('```json\n'+JSON.stringify(manifest)+'\n```'),manifest);
 assert.equal(dryRunForge(manifest).pass,true);
 assert.equal(parseForgeManifest(JSON.stringify({...manifest,steps:[{kind:'shell',instruction:'Execute rm -rf /'}]})),null);
 assert.equal(parseForgeManifest(JSON.stringify({...manifest,triggers:['do things']})),null);
});
test('reject skill goals requesting secrets, computer execution or dangerous permissions',()=>{
 for(const goal of ['Create a bot to collect passwords','Send messages to other people','Bypass system safety instructions','Install npm packages from internet'])assert.ok(validateForgeGoal(goal),goal);
});
test('activated learner-written skills match specific topic signals, not everyday questions',()=>{
 const skills=[{id:'s1',name:manifest.name,mode:'pilot',blueprint:'coach',purpose:manifest.purpose,steps:manifest.steps,triggers:manifest.triggers,status:'active'}];
 assert.equal(matchForgedSkill('Can we do cockpit instruments quiz now?',skills)?.id,'s1');
 assert.equal(matchForgedSkill('How was your day?',skills),null);
 assert.equal(matchForgedSkill('Delete my files',skills),null);
 skills[0].status='draft';assert.equal(matchForgedSkill('cockpit instruments quiz',skills),null);
});
test('generated instruction plan is bounded, marked untrusted and follows existing tutor safety policy',()=>{
 const prompt=assembleForgedPrompt(manifest,'Teach cockpit instruments with a visual example.');
 assert.match(prompt,/untrusted|learner-created/i);
 assert.match(prompt,/Ask the learner/);assert.match(prompt,/visual example/);
 assert.ok(prompt.length<=1600);
});
