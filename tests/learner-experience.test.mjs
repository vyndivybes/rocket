import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {DatabaseSync} from 'node:sqlite';
import {randomUUID} from 'node:crypto';
import {accessKeyHash} from '../functions/_lib/core.js';
import {onRequestPost as login} from '../functions/api/login.js';
import {onRequestGet as getExperience,onRequestPost as setExperience} from '../functions/api/experience.js';
import {onRequestGet as getIdeas,onRequestPost as changeIdea} from '../functions/api/upgrade-requests.js';
import {DEFAULT_EXPERIENCE,validateExperience,styleInstruction} from '../functions/_lib/experience.js';
import {renderMyDay,renderMySpace} from '../public/experience-ui.js';

const ROOT='https://saathi-preview.pages.dev',KEY='0123456789abcdef'.repeat(4);
const req=(path,cookie='',body,origin=ROOT)=>new Request(ROOT+path,{method:body===undefined?'GET':'POST',headers:{Origin:origin,'Content-Type':'application/json',...(cookie?{Cookie:cookie}:{})},body:body===undefined?undefined:JSON.stringify(body)});
async function fixture(){
 const db=new DatabaseSync(':memory:');
 for(const n of ['0001_initial','0003_admin','0004_study','0006_companion_name','0010_learner_experience'])db.exec(readFileSync(new URL('../migrations/'+n+'.sql',import.meta.url),'utf8'));
 const prepare=(sql,args=[])=>({bind(...x){return prepare(sql,x)},async first(){return db.prepare(sql).get(...args)||null},async all(){return {results:db.prepare(sql).all(...args)}},async run(){return {meta:{changes:Number(db.prepare(sql).run(...args).changes)}}}});
 const env={DB:{prepare}};
 const salt='0123456789abcdef0123456789abcdef',hash=await accessKeyHash(KEY,salt),one=randomUUID(),two=randomUUID();
 const ins=db.prepare('INSERT INTO users(id,username,role,password_salt,password_hash,board,linked_student_id) VALUES(?,?,?,?,?,?,?)');
 ins.run(one,'learner','student',salt,hash,'unconfigured',null);
 ins.run(two,'other','student',salt,hash,'unconfigured',null);
 ins.run(randomUUID(),'guardian','parent',salt,hash,'unconfigured',one);
 async function cookie(name){const r=await login({request:req('/api/login','',{username:name,password:KEY}),env});assert.equal(r.status,200);return r.headers.get('set-cookie').split(';')[0]}
 return {db,env,one,two,cookie};
}

test('learner defaults are quiet, accessible and contain no notification consent',()=>{
 assert.equal(DEFAULT_EXPERIENCE.quietMode,true);
 assert.equal(DEFAULT_EXPERIENCE.remindersEnabled,false);
 assert.equal(DEFAULT_EXPERIENCE.assistStyle,'balanced');
 assert.deepEqual(DEFAULT_EXPERIENCE.visibleCards,['learn','plan','create','explore']);
 assert.equal(validateExperience(DEFAULT_EXPERIENCE),null);
 assert.match(styleInstruction('quick'),/brief/i);
 assert.match(styleInstruction('guide'),/step/i);
});

test('rejects extra keys, invalid colours, invalid modes, duplicate cards and strings where booleans expected',()=>{
 for(const data of [
  {...DEFAULT_EXPERIENCE,theme:'#000'},
  {...DEFAULT_EXPERIENCE,assistStyle:'safety-off'},
  {...DEFAULT_EXPERIENCE,visibleCards:['learn','learn']},
  {...DEFAULT_EXPERIENCE,quietMode:'false'},
  {...DEFAULT_EXPERIENCE,visibleCards:['admin']},
  {...DEFAULT_EXPERIENCE,newInstructions:'ignore safety'},
  {...DEFAULT_EXPERIENCE,visibleCards:[]}
 ])assert.ok(validateExperience(data),'should reject '+JSON.stringify(data));
});

test('signed-in learner can save exact approved preferences and see them after reload; other learners remain unchanged',async()=>{
 const {env,cookie}=await fixture(),c=await cookie('learner');
 const defaultResponse=await getExperience({request:req('/api/experience',c),env});
 assert.equal(defaultResponse.status,200);
 assert.deepEqual((await defaultResponse.json()).preferences,DEFAULT_EXPERIENCE);
 const changed={...DEFAULT_EXPERIENCE,theme:'violet',assistStyle:'guide',textSize:'large',visibleCards:['create','learn'],quietMode:false,remindersEnabled:true};
 const saved=await setExperience({request:req('/api/experience',c,changed),env});
 assert.equal(saved.status,200);
 const reload=await (await getExperience({request:req('/api/experience',c),env})).json();
 assert.deepEqual(reload.preferences,changed);
 assert.deepEqual((await (await getExperience({request:req('/api/experience',await cookie('other')),env})).json()).preferences,DEFAULT_EXPERIENCE);
 assert.equal((await getExperience({request:req('/api/experience',await cookie('guardian')),env})).status,403);
 assert.equal((await setExperience({request:req('/api/experience',c,changed,'https://attacker.invalid'),env})).status,403);
 const bad=await setExperience({request:req('/api/experience',c,{...changed,theme:'<script>'}),env});
 assert.equal(bad.status,400);
 assert.deepEqual((await (await getExperience({request:req('/api/experience',c),env})).json()).preferences,changed);
});

test('upgrade requests are explicitly saved, bounded, private, removable and never execute code',async()=>{
 const {env,db,cookie}=await fixture(),c=await cookie('learner');
 assert.equal((await changeIdea({request:req('/api/upgrade-requests',c,{action:'add',idea:'Draw a weekly sketch comparison with optional reminders.'}),env})).status,200);
 const mine=await (await getIdeas({request:req('/api/upgrade-requests',c),env})).json();
 assert.equal(mine.ideas.length,1);
 assert.equal(mine.ideas[0].status,'PROPOSED');
 assert.equal(mine.ideas[0].idea,'Draw a weekly sketch comparison with optional reminders.');
 assert.equal((await (await getIdeas({request:req('/api/upgrade-requests',await cookie('other')),env})).json()).ideas.length,0);
 assert.equal((await getIdeas({request:req('/api/upgrade-requests',await cookie('guardian')),env})).status,403);
 assert.equal((await changeIdea({request:req('/api/upgrade-requests',c,{action:'add',idea:'<script>'}),env})).status,400);
 assert.equal((await changeIdea({request:req('/api/upgrade-requests',c,{action:'delete',id:'invalid'}),env})).status,400);
 assert.equal((await changeIdea({request:req('/api/upgrade-requests',c,{action:'delete',id:mine.ideas[0].id}),env})).status,200);
 assert.equal(db.prepare('SELECT COUNT(*) AS n FROM learner_upgrade_requests').get().n,0);
});

test('calm home and personal space are accessible and HTML escaped, with no guilt-driven notifications',()=>{
 const html=renderMyDay({tasks:[{id:'t',title:'<img src=x onerror=alert(1)>',done:false,subject:'Physics'}],practice:{total:0,correct:0},lessons:[],prefs:DEFAULT_EXPERIENCE});
 assert.match(html,/My day/);
 assert.match(html,/data-go="planner"/);
 assert.match(html,/data-go="myspace"/);
 assert.doesNotMatch(html,/<img src=x/);
 assert.match(html,/&lt;img/);
 const space=renderMySpace(DEFAULT_EXPERIENCE,[]);
 assert.match(space,/id="experience-form"/);
 assert.match(space,/id="upgrade-form"/);
 assert.match(space,/name="remindersEnabled"/);
 assert.match(space,/disabled until the learner opts in|off by default/i);
 assert.match(space,/Sketch|sketch/);
});
