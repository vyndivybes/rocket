import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import {randomUUID} from 'node:crypto';
import {accessKeyHash} from '../functions/_lib/core.js';
import {onRequestPost as login} from '../functions/api/login.js';
import {onRequestPost as exerciseCoach} from '../functions/api/ncert-exercise-coach.js';

const BASE='https://saathi-preview.pages.dev',KEY='0123456789abcdef'.repeat(4);
const PROBLEM='Two stationary point charges are separated by 0.20 metre. Explain which physical quantities determine the magnitude and sign of their electric force.';
const request=(cookie='',body,origin=BASE)=>new Request(BASE+'/api/ncert-exercise-coach',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json',...(cookie?{Cookie:cookie}:{})},body:JSON.stringify(body)});
async function setup(){
 const db=new DatabaseSync(':memory:');
 db.exec(readFileSync(new URL('../migrations/0001_initial.sql',import.meta.url),'utf8'));
 db.exec(readFileSync(new URL('../migrations/0004_study.sql',import.meta.url),'utf8'));
 const salt='0123456789abcdef0123456789abcdef',hash=await accessKeyHash(KEY,salt),student=randomUUID(),second=randomUUID();
 const insert=db.prepare('INSERT INTO users(id,username,role,password_salt,password_hash,board,linked_student_id) VALUES(?,?,?,?,?,?,?)');
 insert.run(student,'learner','student',salt,hash,'unconfigured',null);
 insert.run(second,'guardian','parent',salt,hash,'unconfigured',student);
 const prepare=(sql,args=[])=>({bind(...v){return prepare(sql,v)},async first(){return db.prepare(sql).get(...args)||null},async all(){return {results:db.prepare(sql).all(...args)}},async run(){return {meta:{changes:Number(db.prepare(sql).run(...args).changes)}}}});
 let calls=0;
 const env={DB:{prepare},AI:{async run(_model,payload){calls++;assert.equal(payload.messages.length,2);return {response:'Use Coulomb law F = k times absolute charge product divided by distance squared. Compare force directions and confirm the units are newtons.'}}}};
 const c=async user=>{
  const r=await login({request:new Request(BASE+'/api/login',{method:'POST',headers:{Origin:BASE,'Content-Type':'application/json'},body:JSON.stringify({username:user,password:KEY})}),env});
  assert.equal(r.status,200);return r.headers.get('set-cookie').split(';')[0];
 };
 const valid={lessonId:'chapter-physics-1',exerciseRef:'Exercise 1.2 Q5',questionText:PROBLEM,level:'steps'};
 return {db,env,student,valid,c,get calls(){return calls}};
}
test('NCERT exercise tutor refuses anonymous/guardian callers and wrong origin',async()=>{
 const x=await setup();
 assert.equal((await exerciseCoach({request:request('',x.valid),env:x.env})).status,403);
 const guardian=await x.c('guardian');
 assert.equal((await exerciseCoach({request:request(guardian,x.valid),env:x.env})).status,403);
 const learner=await x.c('learner');
 assert.equal((await exerciseCoach({request:request(learner,x.valid,'https://attacker.invalid'),env:x.env})).status,403);
 assert.equal(x.calls,0);
});
test('NCERT exercise tutor requires chosen CBSE board and selected matching subject',async()=>{
 const x=await setup(),learner=await x.c('learner');
 assert.equal((await exerciseCoach({request:request(learner,x.valid),env:x.env})).status,403);
 x.db.prepare('UPDATE users SET board=? WHERE id=?').run('ISC',x.student);
 x.db.prepare('INSERT INTO study_profiles(student_id,stream,subjects_json,daily_minutes) VALUES(?,?,?,?)').run(x.student,'Science',JSON.stringify(['Physics']),30);
 assert.equal((await exerciseCoach({request:request(learner,x.valid),env:x.env})).status,403);
 x.db.prepare('UPDATE users SET board=? WHERE id=?').run('CBSE',x.student);
 x.db.prepare('UPDATE study_profiles SET subjects_json=? WHERE student_id=?').run(JSON.stringify(['Biology']),x.student);
 assert.equal((await exerciseCoach({request:request(learner,x.valid),env:x.env})).status,403);
 assert.equal(x.calls,0);
});
test('NCERT exercise tutor validates user-supplied reference and question, never scrapes unseen textbook content',async()=>{
 const x=await setup(),learner=await x.c('learner');
 x.db.prepare('UPDATE users SET board=? WHERE id=?').run('CBSE',x.student);
 x.db.prepare('INSERT INTO study_profiles(student_id,stream,subjects_json,daily_minutes) VALUES(?,?,?,?)').run(x.student,'Science',JSON.stringify(['Physics']),30);
 for(const bad of [{...x.valid,questionText:'see textbook'},{...x.valid,exerciseRef:'<script>'},{...x.valid,lessonId:'chapter-chemistry-1'},{...x.valid,level:'automatic-certified'}]){
  const res=await exerciseCoach({request:request(learner,bad),env:x.env});
  assert.ok(res.status===400||res.status===403,JSON.stringify(bad)+' '+res.status);
 }
 assert.equal(x.calls,0);
});
test('NCERT exercise tutor gives sourced-by-learner explanation without persisting question text or certifying coverage',async()=>{
 const x=await setup(),learner=await x.c('learner');
 x.db.prepare('UPDATE users SET board=? WHERE id=?').run('CBSE',x.student);
 x.db.prepare('INSERT INTO study_profiles(student_id,stream,subjects_json,daily_minutes) VALUES(?,?,?,?)').run(x.student,'Science',JSON.stringify(['Physics']),30);
 const res=await exerciseCoach({request:request(learner,x.valid),env:x.env});
 assert.equal(res.status,200);const body=await res.json();
 assert.equal(body.certified,false);
 assert.equal(body.sourceTextStored,false);
 assert.equal(body.exerciseRef,x.valid.exerciseRef);
 assert.equal(body.level,'steps');
 assert.equal(x.calls,1);
 assert.equal(x.db.prepare('SELECT COUNT(*) AS n FROM ai_usage').get().n,1);
 assert.equal(x.db.prepare('SELECT COUNT(*) AS n FROM practice_progress').get().n,0);
 assert.equal(JSON.stringify(x.db.prepare('SELECT * FROM ai_usage').all()).includes(PROBLEM),false);
});
