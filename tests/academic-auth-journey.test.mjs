import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import {randomUUID} from 'node:crypto';
import {accessKeyHash} from '../functions/_lib/core.js';
import {onRequestPost as login} from '../functions/api/login.js';
import {onRequestGet as getProfile,onRequestPost as postProfile} from '../functions/api/profile.js';
import {onRequestGet as getLessons} from '../functions/api/lessons.js';
import {onRequestPost as submitPractice,onRequestGet as getPractice} from '../functions/api/practice.js';
import {onRequestGet as coverage} from '../functions/api/syllabus-coverage.js';
import {onRequestGet as parentSummary} from '../functions/api/parent-summary.js';
const BASE='https://saathi-preview.pages.dev',KEY='0123456789abcdef'.repeat(4);
const makeReq=(path,cookie='',body,origin=BASE)=>new Request(BASE+path,{method:body===undefined?'GET':'POST',headers:{Origin:origin,'Content-Type':'application/json',...(cookie?{Cookie:cookie}:{})},body:body===undefined?undefined:JSON.stringify(body)});
async function setup(){
 const db=new DatabaseSync(':memory:');
 db.exec(readFileSync(new URL('../migrations/0001_initial.sql',import.meta.url),'utf8'));
 db.exec(readFileSync(new URL('../migrations/0003_admin.sql',import.meta.url),'utf8'));
 db.exec(readFileSync(new URL('../migrations/0004_study.sql',import.meta.url),'utf8'));
 db.exec(readFileSync(new URL('../migrations/0006_companion_name.sql',import.meta.url),'utf8'));
 db.exec(readFileSync(new URL('../migrations/0007_personal_memory.sql',import.meta.url),'utf8'));
 const prepare=(sql,args=[])=>({bind(...v){return prepare(sql,v)},async first(){return db.prepare(sql).get(...args)||null},async all(){return {results:db.prepare(sql).all(...args)}},async run(){return {meta:{changes:Number(db.prepare(sql).run(...args).changes)}}}});
 const env={DB:{prepare}};
 const salt='0123456789abcdef0123456789abcdef',hash=await accessKeyHash(KEY,salt),learner=randomUUID(),other=randomUUID();
 const ins=db.prepare('INSERT INTO users(id,username,role,password_salt,password_hash,board,linked_student_id) VALUES(?,?,?,?,?,?,?)');
 ins.run(learner,'class12','student',salt,hash,'unconfigured',null);
 ins.run(other,'otherstudent','student',salt,hash,'unconfigured',null);
 ins.run(randomUUID(),'guardian','parent',salt,hash,'unconfigured',learner);
 async function cookie(name){const r=await login({request:makeReq('/api/login','',{username:name,password:KEY}),env});assert.equal(r.status,200);return r.headers.get('set-cookie').split(';')[0]}
 return {env,db,learner,other,cookie};
}
test('syllabus requires authenticated learner and a saved profile; never invents subjects',async()=>{
 const {env,cookie}=await setup();
 assert.equal((await coverage({request:makeReq('/api/syllabus-coverage'),env})).status,403);
 assert.equal((await coverage({request:makeReq('/api/syllabus-coverage',await cookie('guardian')),env})).status,403);
 const c=await cookie('class12');
 assert.equal((await coverage({request:makeReq('/api/syllabus-coverage',c),env})).status,409);
 await postProfile({request:makeReq('/api/profile',c,{board:'CBSE',stream:'Science',subjects:['Physics'],dailyMinutes:30}),env});
 const r=await coverage({request:makeReq('/api/syllabus-coverage',c),env});assert.equal(r.status,200);
 const data=await r.json();assert.deepEqual(data.selectedSubjects,['Physics']);assert.equal(data.subjects.length,1);
 assert.equal(data.commissioning.productionEligible,false);
 assert.equal((await coverage({request:makeReq('/api/syllabus-coverage',await cookie('otherstudent')),env})).status,409);
});
test('non CBSE board does not receive applicable CBSE inventory and record failures fail closed',async()=>{
 const {env,cookie}=await setup(),c=await cookie('class12');
 await postProfile({request:makeReq('/api/profile',c,{board:'ISC',stream:'Science',subjects:['Physics'],dailyMinutes:30}),env});
 const data=await (await coverage({request:makeReq('/api/syllabus-coverage',c),env})).json();
 assert.equal(data.boardConfirmed,false);assert.deepEqual(data.subjects,[]);
 const old=env.DB.prepare;env.DB.prepare=(sql)=>sql.startsWith('SELECT subjects_json')?{bind(){return this},async first(){throw Error('offline')}}:old(sql);
 assert.equal((await coverage({request:makeReq('/api/syllabus-coverage',c),env})).status,503);
});


test('authenticated learner can explicitly select English Elective 001 while keeping school qualification held',async()=>{
 const {env,cookie}=await setup(),learnerCookie=await cookie('class12');
 const save=await postProfile({request:makeReq('/api/profile',learnerCookie,{
  board:'CBSE',stream:'Science',subjects:['Physics','Chemistry','English Elective'],dailyMinutes:30
 }),env});
 assert.equal(save.status,200);
 const saved=await (await getProfile({request:makeReq('/api/profile',learnerCookie),env})).json();
 assert.deepEqual(saved.profile.subjects,['Physics','Chemistry','English Elective']);
 const response=await coverage({request:makeReq('/api/syllabus-coverage',learnerCookie),env});
 assert.equal(response.status,200);
 const data=await response.json();
 assert.deepEqual(data.selectedSubjects,['Physics','Chemistry','English Elective']);
 const english=data.subjects.find(s=>s.subject==='English Elective');
 assert.equal(english.code,'001');assert.equal(english.totalChapters,16);
 assert.equal(english.qualifiedChapters,0);assert.equal(english.fictionChoiceStatus,'school_choice_required');
 assert.equal(data.boardEvidence,'learner_selected_not_school_verified');
 assert.equal(data.commissioning.productionEligible,false);
 const denied=await coverage({request:makeReq('/api/syllabus-coverage',await cookie('guardian')),env});
 assert.equal(denied.status,403);
 const invalid=await postProfile({request:makeReq('/api/profile',learnerCookie,{
  board:'CBSE',stream:'Science',subjects:['English','English Elective'],dailyMinutes:30
 }),env});
 assert.equal(invalid.status,400);
 const after=await (await getProfile({request:makeReq('/api/profile',learnerCookie),env})).json();
 assert.deepEqual(after.profile.subjects,saved.profile.subjects);
});
