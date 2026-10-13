import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import {randomUUID} from 'node:crypto';
import {accessKeyHash} from '../functions/_lib/core.js';
import {onRequestPost as login} from '../functions/api/login.js';
import {onRequestGet as preview,onRequestPost as install} from '../functions/api/starter-routine.js';
import {onRequestGet as getSchedule,onRequestPost as editSchedule} from '../functions/api/schedule.js';
import {STARTER_ROUTINE} from '../functions/_lib/starter.js';
const ORIGIN='https://saathi-preview.pages.dev',KEY='0123456789abcdef'.repeat(4);
function req(path,cookie='',body,origin=ORIGIN){return new Request(ORIGIN+path,{method:body===undefined?'GET':'POST',headers:{Origin:origin,'Content-Type':'application/json',...(cookie?{Cookie:cookie}:{})},body:body===undefined?undefined:JSON.stringify(body)})}
async function setup(){
 const db=new DatabaseSync(':memory:');
 for(const m of ['0001_initial','0003_admin','0004_study','0005_mission'])db.exec(readFileSync(new URL('../migrations/'+m+'.sql',import.meta.url),'utf8'));
 const prepare=(sql,params=[])=>({bind(...x){return prepare(sql,x)},async first(){return db.prepare(sql).get(...params)||null},async all(){return {results:db.prepare(sql).all(...params)}},async run(){return {meta:{changes:Number(db.prepare(sql).run(...params).changes)}}}});
 const env={DB:{prepare}},salt='0123456789abcdef0123456789abcdef',hash=await accessKeyHash(KEY,salt),student=randomUUID(),other=randomUUID();
 const stmt=db.prepare('INSERT INTO users(id,username,role,password_salt,password_hash,board,linked_student_id) VALUES(?,?,?,?,?,?,?)');
 stmt.run(student,'student1','student',salt,hash,'unconfigured',null);stmt.run(other,'student2','student',salt,hash,'unconfigured',null);
 stmt.run(randomUUID(),'parent','parent',salt,hash,'unconfigured',student);
 async function cookie(username){const res=await login({request:req('/api/login','',{username,password:KEY}),env});assert.equal(res.status,200);return res.headers.get('set-cookie').split(';')[0]}
 return {env,db,cookie};
}
test('a balanced starter routine includes all four difficult subjects, aviation, creative work and movement with reasonable durations',()=>{
 const titles=STARTER_ROUTINE.map(x=>x.title+' '+x.kind).join(' ').toLowerCase();
 for(const word of ['physics','mathematics','chemistry','biology','aviation','sketch','sport','movement'])assert.ok(titles.includes(word),word);
 assert.equal(new Set(STARTER_ROUTINE.map(x=>x.key)).size,STARTER_ROUTINE.length);
 assert.ok(STARTER_ROUTINE.every(x=>x.minutes<=30), 'short gentle study and activity blocks');
});
test('routine preview is student-private and requires deliberate approval to install',async()=>{
 const {env,cookie}=await setup(),student=await cookie('student1'),parent=await cookie('parent');
 const p=await preview({request:req('/api/starter-routine',student),env});
 assert.equal(p.status,200);const data=await p.json();assert.equal(data.template.length,STARTER_ROUTINE.length);
 assert.equal((await preview({request:req('/api/starter-routine',parent),env})).status,403);
 assert.equal((await install({request:req('/api/starter-routine',student,{action:'install',confirm:'wrong'}),env})).status,400);
 assert.equal((await install({request:req('/api/starter-routine',student,{action:'install',confirm:'ADD STARTER ROUTINE'},'https://evil.test'),env})).status,403);
});
test('install is idempotent and scoped to student, no duplicate schedule records',async()=>{
 const {env,cookie}=await setup(),student=await cookie('student1'),other=await cookie('student2');
 const body={action:'install',confirm:'ADD STARTER ROUTINE'};
 const first=await install({request:req('/api/starter-routine',student,body),env});
 assert.equal(first.status,200);assert.equal((await first.json()).added,STARTER_ROUTINE.length);
 const again=await install({request:req('/api/starter-routine',student,body),env});
 assert.equal(again.status,200);assert.equal((await again.json()).added,0);
 const s=(await (await getSchedule({request:req('/api/schedule',student),env})).json()).items;
 const otherRows=(await (await getSchedule({request:req('/api/schedule',other),env})).json()).items;
 assert.equal(s.length,STARTER_ROUTINE.length);assert.equal(otherRows.length,0);
});
test('learner can adjust a starter activity, but other learner cannot edit it',async()=>{
 const {env,cookie}=await setup(),student=await cookie('student1'),other=await cookie('student2');
 await install({request:req('/api/starter-routine',student,{action:'install',confirm:'ADD STARTER ROUTINE'}),env});
 const items=(await (await getSchedule({request:req('/api/schedule',student),env})).json()).items;
 const selected=items[0],change={action:'update',id:selected.id,title:'Personal time',kind:'art',time:'16:35',days:[1,5],minutes:20};
 assert.equal((await editSchedule({request:req('/api/schedule',other,change),env})).status,404);
 assert.equal((await editSchedule({request:req('/api/schedule',student,change),env})).status,200);
 const changed=(await (await getSchedule({request:req('/api/schedule',student),env})).json()).items.find(x=>x.id===selected.id);
 assert.equal(changed.time,'16:35');assert.equal(changed.title,'Personal time');
});
