import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import {randomUUID} from 'node:crypto';
import {accessKeyHash} from '../functions/_lib/core.js';
import {onRequestPost as login} from '../functions/api/login.js';
import {onRequestPost as team} from '../functions/api/team-study.js';
const base='https://saathi-preview.pages.dev',key='0123456789abcdef'.repeat(4);
const req=(path,cookie='',body,origin=base)=>new Request(base+path,{method:body===undefined?'GET':'POST',headers:{Origin:origin,'Content-Type':'application/json',...(cookie?{Cookie:cookie}:{})},body:body===undefined?undefined:JSON.stringify(body)});
async function setup(){
 const db=new DatabaseSync(':memory:');
 for(const f of ['0001_initial','0003_admin','0004_study'])db.exec(readFileSync(new URL('../migrations/'+f+'.sql',import.meta.url),'utf8'));
 const prepare=(sql,args=[])=>({bind(...v){return prepare(sql,v)},async first(){return db.prepare(sql).get(...args)||null},async all(){return {results:db.prepare(sql).all(...args)}},async run(){return {meta:{changes:Number(db.prepare(sql).run(...args).changes)}}}});
 let calls=0;const env={DB:{prepare},AI:{async run(model,args){calls++;return {response:'Specialist answer '+calls+' using '+args.messages[0].content.slice(-45)}}}};
 const salt='00112233445566778899aabbccddeeff',hash=await accessKeyHash(key,salt);
 const add=db.prepare('INSERT INTO users(id,username,role,password_salt,password_hash,board,linked_student_id) VALUES(?,?,?,?,?,?,?)');
 const a=randomUUID(),b=randomUUID();add.run(a,'student_a','student',salt,hash,'unconfigured',null);add.run(b,'student_b','student',salt,hash,'unconfigured',null);add.run(randomUUID(),'parent','parent',salt,hash,'unconfigured',a);
 async function cookie(name){const r=await login({request:req('/api/login','',{username:name,password:key}),env});assert.equal(r.status,200);return r.headers.get('Set-Cookie').split(';')[0]}
 return {env,cookie,get calls(){return calls}};
}
test('team agent combines actual available specialists without claiming external effects',async()=>{
 const x=await setup(),a=await x.cookie('student_a');
 const r=await team({request:req('/api/team-study',a,{question:'Plan a physics aircraft wing art project'}),env:x.env});assert.equal(r.status,200);const j=await r.json();
 assert.equal(j.status,'COMPLETE');assert.equal(j.specialists.length,3);assert.equal(x.calls,3);assert.equal(j.stored,false);
});
test('specialist team denies guardian, cross-origin and invalid requests before invoking AI',async()=>{
 const x=await setup(),a=await x.cookie('student_a'),p=await x.cookie('parent');
 const value={question:'Help me draw aircraft wings with physics'};
 assert.equal((await team({request:req('/api/team-study',p,value),env:x.env})).status,403);
 assert.equal((await team({request:req('/api/team-study',a,value,'https://other.test'),env:x.env})).status,403);
 assert.equal((await team({request:req('/api/team-study',a,{question:'hi'}),env:x.env})).status,400);
 assert.equal(x.calls,0);
});
