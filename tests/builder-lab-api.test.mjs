import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import {randomUUID} from 'node:crypto';
import {accessKeyHash} from '../functions/_lib/core.js';
import {onRequestPost as login} from '../functions/api/login.js';
import {onRequestGet as getLab,onRequestPost as postLab} from '../functions/api/builder-lab.js';
import {onRequestGet as preview} from '../functions/api/builder-preview.js';
import {onRequestGet as exportData,onRequestPost as eraseData} from '../functions/api/my-data.js';
const BASE='https://saathi-preview.pages.dev',KEY='0123456789abcdef'.repeat(4);
const req=(path,cookie='',data,origin=BASE)=>new Request(BASE+path,{method:data===undefined?'GET':'POST',headers:{Origin:origin,'Content-Type':'application/json',...(cookie?{Cookie:cookie}:{})},body:data===undefined?undefined:JSON.stringify(data)});
const template={title:'Flight Quiz',html:'<section><h1>What does an altimeter measure?</h1><button id="next">Next</button></section>',css:'body{font:16px sans-serif}',js:'document.getElementById("next").onclick=()=>{document.querySelector("h1").textContent="Altitude";}'};
async function setup(){
 const db=new DatabaseSync(':memory:');
 for(const file of ['0001_initial','0003_admin','0004_study','0005_mission','0006_companion_name','0007_personal_memory','0008_push_devices','0011_learner_skills','0012_learner_builder_lab'])
  db.exec(readFileSync(new URL('../migrations/'+file+'.sql',import.meta.url),'utf8'));
 const prepare=(sql,args=[])=>({bind(...v){return prepare(sql,v)},async first(){return db.prepare(sql).get(...args)||null},async all(){return {results:db.prepare(sql).all(...args)}},async run(){return {meta:{changes:Number(db.prepare(sql).run(...args).changes)}}}});
 let code=JSON.stringify(template),calls=0;
 const env={DB:{prepare},AI:{async run(){calls++;return {response:code}}}};
 const salt='00112233445566778899aabbccddeeff',hash=await accessKeyHash(KEY,salt);
 const add=db.prepare('INSERT INTO users(id,username,role,password_salt,password_hash,board,linked_student_id) VALUES(?,?,?,?,?,?,?)');
 const student=randomUUID(),other=randomUUID();add.run(student,'student1','student',salt,hash,'unconfigured',null);add.run(other,'student2','student',salt,hash,'unconfigured',null);add.run(randomUUID(),'parent','parent',salt,hash,'unconfigured',student);
 async function cookie(name){const r=await login({request:req('/api/login','',{username:name,password:KEY}),env});assert.equal(r.status,200);return r.headers.get('Set-Cookie').split(';')[0]}
 return {env,db,cookie,set code(value){code=value},get calls(){return calls}};
}
test('student can generate, preview, revise and restore a versioned isolated prototype',async()=>{
 const x=await setup(),a=await x.cookie('student1');
 const made=await postLab({request:req('/api/builder-lab',a,{action:'generate',prompt:'Build an interactive aviation quiz'}),env:x.env});
 assert.equal(made.status,201);const initial=await made.json();assert.equal(initial.revision,1);
 const own=await getLab({request:req('/api/builder-lab?id='+initial.id,a),env:x.env});assert.equal(own.status,200);
 assert.equal((await own.json()).project.title,'Flight Quiz');
 const frame=await preview({request:req('/api/builder-preview?id='+initial.id,a),env:x.env});
 assert.equal(frame.status,200);assert.match(frame.headers.get('Content-Security-Policy'),/sandbox allow-scripts/);
 assert.match(frame.headers.get('Content-Security-Policy'),/connect-src 'none'/);
 assert.ok((await frame.text()).includes('altimeter'));
 x.code=JSON.stringify({...template,title:'Flight Quiz v2',html:'<h1>New instrument quiz</h1>'});
 const changed=await postLab({request:req('/api/builder-lab',a,{action:'revise',id:initial.id,revision:1,prompt:'Add new aircraft instrument questions'}),env:x.env});
 assert.equal(changed.status,200);assert.equal((await changed.json()).revision,2);
 const stale=await postLab({request:req('/api/builder-lab',a,{action:'revise',id:initial.id,revision:1,prompt:'Add another question to quiz'}),env:x.env});
 assert.equal(stale.status,409);
 const rollback=await postLab({request:req('/api/builder-lab',a,{action:'restore',id:initial.id,revision:1,currentRevision:2}),env:x.env});
 assert.equal(rollback.status,200);
 const restored=await (await getLab({request:req('/api/builder-lab?id='+initial.id,a),env:x.env})).json();
 assert.equal(restored.project.revision,3);assert.equal(restored.project.title,'Flight Quiz');
});
test('student isolation, CSRF and guardian access restrictions hold for prototypes',async()=>{
 const x=await setup(),a=await x.cookie('student1'),b=await x.cookie('student2'),p=await x.cookie('parent');
 const made=await (await postLab({request:req('/api/builder-lab',a,{action:'generate',prompt:'Build a creative painting game'}),env:x.env})).json();
 assert.equal((await (await getLab({request:req('/api/builder-lab',b),env:x.env})).json()).projects.length,0);
 assert.equal((await getLab({request:req('/api/builder-lab?id='+made.id,b),env:x.env})).status,404);
 assert.equal((await preview({request:req('/api/builder-preview?id='+made.id,b),env:x.env})).status,404);
 assert.equal((await getLab({request:req('/api/builder-lab',p),env:x.env})).status,403);
 assert.equal((await postLab({request:req('/api/builder-lab',p,{action:'generate',prompt:'Build a creative painting game'}),env:x.env})).status,403);
 assert.equal((await postLab({request:req('/api/builder-lab',a,{action:'generate',prompt:'Build a creative painting game'},'https://evil.example'),env:x.env})).status,403);
});
test('malformed or unsafe model output does not overwrite saved project',async()=>{
 const x=await setup(),a=await x.cookie('student1');
 const made=(await (await postLab({request:req('/api/builder-lab',a,{action:'generate',prompt:'Build a creative painting app'}),env:x.env})).json());
 x.code=JSON.stringify({...template,js:'fetch("https://evil.example")'});
 const response=await postLab({request:req('/api/builder-lab',a,{action:'revise',id:made.id,revision:1,prompt:'Add new painting brushes to the app'}),env:x.env});
 assert.equal(response.status,422);
 const again=(await (await getLab({request:req('/api/builder-lab?id='+made.id,a),env:x.env})).json()).project;
 assert.equal(again.revision,1);assert.equal(again.title,'Flight Quiz');
});
test('learner can export and erase projects but deletion must be explicit',async()=>{
 const x=await setup(),a=await x.cookie('student1');
 const made=(await (await postLab({request:req('/api/builder-lab',a,{action:'generate',prompt:'Build an interactive aviation quiz'}),env:x.env})).json());
 assert.equal((await postLab({request:req('/api/builder-lab',a,{action:'delete',id:made.id}),env:x.env})).status,400);
 const data=(await (await exportData({request:req('/api/my-data',a),env:x.env})).json()).data;
 assert.equal(data.learnerBuilds.length,1);
 assert.equal((await eraseData({request:req('/api/my-data',a,{action:'erase-learning-data',confirm:'ERASE MY STUDY DATA'}),env:x.env})).status,200);
 assert.equal((await (await getLab({request:req('/api/builder-lab',a),env:x.env})).json()).projects.length,0);
});
