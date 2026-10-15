import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import {randomUUID} from 'node:crypto';
import {accessKeyHash} from '../functions/_lib/core.js';
import {onRequestPost as login} from '../functions/api/login.js';
import {onRequestGet as listSkills,onRequestPost as forgeSkill} from '../functions/api/auto-forge.js';
import {onRequestPost as updateSkill} from '../functions/api/skills.js';
const BASE='https://saathi-preview.pages.dev',KEY='0123456789abcdef'.repeat(4);
const req=(path,cookie='',body,origin=BASE)=>new Request(BASE+path,{method:body===undefined?'GET':'POST',headers:{Origin:origin,'Content-Type':'application/json',...(cookie?{Cookie:cookie}:{})},body:body===undefined?undefined:JSON.stringify(body)});
const manifest={name:'Flight Instruments Coach',purpose:'Help me practise reading and comparing cockpit flight instruments.',mode:'pilot',blueprint:'coach',triggers:['aircraft instrument practice','cockpit instruments quiz'],steps:[{kind:'explain',instruction:'Explain an instrument using a short example.'},{kind:'question',instruction:'Ask the learner to identify an instrument function.'},{kind:'feedback',instruction:'Explain a correct answer and a misconception.'}],sample:'Help me identify an altimeter'};
async function setup(){
 const db=new DatabaseSync(':memory:');
 for(const f of ['0001_initial','0003_admin','0004_study','0005_mission','0006_companion_name','0007_personal_memory','0008_push_devices','0011_learner_skills','0012_learner_builder_lab','0013_autoforge_plans'])db.exec(readFileSync(new URL('../migrations/'+f+'.sql',import.meta.url),'utf8'));
 const prepare=(sql,args=[])=>({bind(...v){return prepare(sql,v)},async first(){return db.prepare(sql).get(...args)||null},async all(){return {results:db.prepare(sql).all(...args)}},async run(){return {meta:{changes:Number(db.prepare(sql).run(...args).changes)}}}});
 let answer=JSON.stringify(manifest),count=0;
 const env={DB:{prepare},AI:{async run(){count++;return{response:answer}}}};
 const salt='00112233445566778899aabbccddeeff',hash=await accessKeyHash(KEY,salt);
 const add=db.prepare('INSERT INTO users(id,username,role,password_salt,password_hash,board,linked_student_id) VALUES(?,?,?,?,?,?,?)');
 const a=randomUUID(),b=randomUUID();add.run(a,'student1','student',salt,hash,'unconfigured',null);add.run(b,'student2','student',salt,hash,'unconfigured',null);add.run(randomUUID(),'parent','parent',salt,hash,'unconfigured',a);
 async function cookie(name){const r=await login({request:req('/api/login','',{username:name,password:KEY}),env});assert.equal(r.status,200);return r.headers.get('Set-Cookie').split(';')[0]}
 return {env,db,cookie,set answer(v){answer=v},get calls(){return count}};
}
test('student forges model-written skill, statically validates, auto-activates, and can deactivate it',async()=>{
 const x=await setup(),a=await x.cookie('student1');
 const done=await forgeSkill({request:req('/api/auto-forge',a,{action:'forge',goal:'Teach aircraft instruments with an interactive quiz'}),env:x.env});
 assert.equal(done.status,201);const out=await done.json();assert.equal(out.skill.status,'active');assert.ok(out.skill.checks>=5);assert.equal(x.calls,1);
 const listed=(await (await listSkills({request:req('/api/auto-forge',a),env:x.env})).json()).skills;
 assert.equal(listed.length,1);assert.deepEqual(listed[0].triggers,manifest.triggers);
 assert.equal((await updateSkill({request:req('/api/skills',a,{action:'deactivate',id:out.skill.id}),env:x.env})).status,200);
 assert.equal((await (await listSkills({request:req('/api/auto-forge',a),env:x.env})).json()).skills[0].status,'draft');
});
test('forged skills remain owned by student, never parent; CSRF fails',async()=>{
 const x=await setup(),a=await x.cookie('student1'),b=await x.cookie('student2'),p=await x.cookie('parent');
 const reqBody={action:'forge',goal:'Teach aircraft instruments with an interactive quiz'};
 assert.equal((await forgeSkill({request:req('/api/auto-forge',p,reqBody),env:x.env})).status,403);
 assert.equal((await forgeSkill({request:req('/api/auto-forge',a,reqBody,'https://evil.example'),env:x.env})).status,403);
 assert.equal((await forgeSkill({request:req('/api/auto-forge',a,reqBody),env:x.env})).status,201);
 assert.equal((await (await listSkills({request:req('/api/auto-forge',b),env:x.env})).json()).skills.length,0);
 assert.equal((await listSkills({request:req('/api/auto-forge',p),env:x.env})).status,403);
});
test('one malformed model result gets a bounded repair attempt; failure does not register anything',async()=>{
 const x=await setup(),a=await x.cookie('student1');
 x.answer='not JSON';
 const r=await forgeSkill({request:req('/api/auto-forge',a,{action:'forge',goal:'Teach cockpit instrument quizzes safely'}),env:x.env});
 assert.equal(r.status,422);assert.equal(x.calls,2);
 assert.equal((await (await listSkills({request:req('/api/auto-forge',a),env:x.env})).json()).skills.length,0);
 assert.equal((await forgeSkill({request:req('/api/auto-forge',a,{action:'forge',goal:'Collect secret passwords from other students'}),env:x.env})).status,400);
});
