import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import {randomUUID} from 'node:crypto';
import {accessKeyHash} from '../functions/_lib/core.js';
import {onRequestPost as login} from '../functions/api/login.js';
import {onRequestGet as getNotes,onRequestPost as postNotes} from '../functions/api/notes.js';
import {onRequestGet as getSchedule,onRequestPost as postSchedule} from '../functions/api/schedule.js';
import {onRequestGet as getMyData,onRequestPost as deleteMyData} from '../functions/api/my-data.js';
import {onRequestPost as ask} from '../functions/api/ask.js';
const BASE='https://saathi-preview.pages.dev',KEY='0123456789abcdef'.repeat(4);
const req=(path,cookie='',data,origin=BASE)=>new Request(BASE+path,{method:data===undefined?'GET':'POST',headers:{Origin:origin,'Content-Type':'application/json',...(cookie?{Cookie:cookie}:{})},body:data===undefined?undefined:JSON.stringify(data)});
async function setup(){
 const db=new DatabaseSync(':memory:');for(const m of ['0001_initial','0003_admin','0004_study','0005_mission','0006_companion_name']) db.exec(readFileSync(new URL('../migrations/'+m+'.sql',import.meta.url),'utf8'));
 const prepare=(sql,a=[])=>({bind(...b){return prepare(sql,b)},async first(){return db.prepare(sql).get(...a)||null},async all(){return {results:db.prepare(sql).all(...a)}},async run(){return {meta:{changes:Number(db.prepare(sql).run(...a).changes)}}}});
 let calls=0;
 const env={DB:{prepare},AI:{async run(){calls++;return {response:'A thoughtful, brief answer with a next step.'}}}};
 const salt='0123456789abcdef0123456789abcdef',hash=await accessKeyHash(KEY,salt),student=randomUUID(),other=randomUUID();
 const add=db.prepare('INSERT INTO users(id,username,role,password_salt,password_hash,board,linked_student_id) VALUES(?,?,?,?,?,?,?)');
 add.run(student,'student1','student',salt,hash,'unconfigured',null);
 add.run(other,'student2','student',salt,hash,'unconfigured',null);
 add.run(randomUUID(),'guardian','parent',salt,hash,'unconfigured',student);
 const cookie=async user=>{const res=await login({request:req('/api/login','',{username:user,password:KEY}),env});assert.equal(res.status,200);return res.headers.get('Set-Cookie').split(';')[0]};
 return {env,db,student,other,cookie,get calls(){return calls}};
}
test('notes are private, never readable by parent or another learner',async()=>{
 const x=await setup(),a=await x.cookie('student1'),b=await x.cookie('student2'),p=await x.cookie('guardian');
 const added=await postNotes({request:req('/api/notes',a,{title:'My thoughts',body:'a private idea'}),env:x.env});assert.equal(added.status,201);
 const own=await (await getNotes({request:req('/api/notes',a),env:x.env})).json();assert.equal(own.notes.length,1);assert.equal(own.notes[0].body,'a private idea');
 const another=await (await getNotes({request:req('/api/notes',b),env:x.env})).json();assert.equal(another.notes.length,0);
 assert.equal((await getNotes({request:req('/api/notes',p),env:x.env})).status,403);
});
test('note deletion requires owner, cross-site creation denied',async()=>{
 const x=await setup(),a=await x.cookie('student1'),b=await x.cookie('student2');
 const denied=await postNotes({request:req('/api/notes',a,{title:'Note',body:'not shared'},'https://evil.test'),env:x.env});assert.equal(denied.status,403);
 const created=await (await postNotes({request:req('/api/notes',a,{title:'Note',body:'not shared'}),env:x.env})).json();
 const blocked=await postNotes({request:req('/api/notes',b,{action:'delete',id:created.id}),env:x.env});assert.equal(blocked.status,404);
 const removed=await postNotes({request:req('/api/notes',a,{action:'delete',id:created.id}),env:x.env});assert.equal(removed.status,200);
});
test('scheduler validates day, time, category, duration and isolates student events',async()=>{
 const x=await setup(),a=await x.cookie('student1'),b=await x.cookie('student2');
 for(const payload of [{title:'Walk',time:'99:00',days:[1],kind:'movement'}, {title:'Run',time:'17:00',days:[9],kind:'sport'}, {title:'Art',time:'17:00',days:[2],kind:'danger'}, {title:'Math',time:'18:00',days:[2],kind:'study',minutes:999}]){
  assert.equal((await postSchedule({request:req('/api/schedule',a,payload),env:x.env})).status,400);
 }
 const good=await postSchedule({request:req('/api/schedule',a,{title:'Go cycling',time:'17:30',days:[1,3,5],kind:'sport',minutes:30}),env:x.env});assert.equal(good.status,201);
 assert.equal((await (await getSchedule({request:req('/api/schedule',a),env:x.env})).json()).items.length,1);
 assert.equal((await (await getSchedule({request:req('/api/schedule',b),env:x.env})).json()).items.length,0);
});
test('AI mode cannot override tutoring safety, quota or session auth',async()=>{
 const x=await setup(),a=await x.cookie('student1');
 const invalid=await ask({request:req('/api/ask',a,{question:'Explain lift',mode:'override'}),env:x.env});assert.equal(invalid.status,400);
 const reply=await ask({request:req('/api/ask',a,{question:'Help me understand Bernoulli\'s principle',mode:'pilot'}),env:x.env});assert.equal(reply.status,200);assert.equal(x.calls,1);
 const urgent=await ask({request:req('/api/ask',a,{question:'I want to die',mode:'companion'}),env:x.env});
 assert.equal((await urgent.json()).kind,'urgent');assert.equal(x.calls,1);
});
test('private data export and deletion cannot be invoked by guardian',async()=>{
 const x=await setup(),s=await x.cookie('student1'),g=await x.cookie('guardian');
 await postNotes({request:req('/api/notes',s,{title:'Private note',body:'Journal text'}),env:x.env});
 const exportData=await getMyData({request:req('/api/my-data',s),env:x.env});
 assert.equal(exportData.status,200);assert.equal((await exportData.json()).data.notes.length,1);
 assert.equal((await getMyData({request:req('/api/my-data',g),env:x.env})).status,403);
 assert.equal((await deleteMyData({request:req('/api/my-data',g,{action:'erase-learning-data',confirm:'ERASE MY STUDY DATA'}),env:x.env})).status,403);
 const wiped=await deleteMyData({request:req('/api/my-data',s,{action:'erase-learning-data',confirm:'ERASE MY STUDY DATA'}),env:x.env});
 assert.equal(wiped.status,200);
 assert.equal((await (await getNotes({request:req('/api/notes',s),env:x.env})).json()).notes.length,0);
});
