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
test('student onboarding saves only validated board, stream, subjects and realistic target',async()=>{
 const {env,cookie}=await setup(),c=await cookie('class12');
 const r=await postProfile({request:makeReq('/api/profile',c,{board:'CBSE',stream:'Science',subjects:['Physics','Mathematics'],dailyMinutes:30}),env});
 assert.equal(r.status,200);
 const profile=await (await getProfile({request:makeReq('/api/profile',c),env})).json();
 assert.equal(profile.profile.board,'CBSE');assert.equal(profile.profile.dailyMinutes,30);
 assert.deepEqual(profile.profile.subjects,['Physics','Mathematics']);
});
test('onboarding rejects unknown subjects, injection, and unsupported target',async()=>{
 const {env,cookie}=await setup(),c=await cookie('class12');
 for(const bad of [
  {board:'NotARealBoard',stream:'Science',subjects:['Physics'],dailyMinutes:30},
  {board:'CBSE',stream:'Science',subjects:['<script>alert(1)</script>'],dailyMinutes:30},
  {board:'CBSE',stream:'Science',subjects:['Physics'],dailyMinutes:1000},
  {board:'CBSE',stream:'Science',subjects:[],dailyMinutes:30}
 ]){assert.equal((await postProfile({request:makeReq('/api/profile',c,bad),env})).status,400)}
});
test('parent and anonymous cannot update or inspect student profile',async()=>{
 const {env,cookie}=await setup(),parent=await cookie('guardian');
 assert.equal((await getProfile({request:makeReq('/api/profile',parent),env})).status,403);
 assert.equal((await postProfile({request:makeReq('/api/profile',parent,{board:'CBSE'}),env})).status,403);
 assert.equal((await getProfile({request:makeReq('/api/profile'),env})).status,403);
});
test('offline lessons omit answer keys and remain accessible without AI binding',async()=>{
 const {env,cookie}=await setup(),student=await cookie('class12');
 const r=await getLessons({request:makeReq('/api/lessons',student),env});
 const {lessons}=await r.json();assert.equal(r.status,200);assert.ok(lessons.length>=6);
 assert.ok(lessons.every(x=>typeof x.example==='string'&&typeof x.question==='string'&&x.options?.length===4));
 assert.ok(lessons.every(x=>!Object.hasOwn(x,'answerIndex') && !Object.hasOwn(x,'correct')));
});
test('practice marks correct answers and stores aggregate only, not student answers or transcripts',async()=>{
 const {env,db,cookie}=await setup(),student=await cookie('class12');
 const lessons=(await (await getLessons({request:makeReq('/api/lessons',student),env})).json()).lessons;
 const first=lessons[0]; const expected=(await import('../functions/_lib/study.js')).LESSONS.find(x=>x.id===first.id);
 const mark=await submitPractice({request:makeReq('/api/practice',student,{lessonId:first.id,choice:expected.answerIndex}),env});
 const result=await mark.json();assert.equal(mark.status,200);assert.equal(result.correct,true);
 const progress=(await (await getPractice({request:makeReq('/api/practice',student),env})).json()).progress;
 assert.equal(progress.total,1);assert.equal(progress.correct,1);
 const names=db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all().map(x=>x.name);
 assert.ok(!names.includes('conversation_history') && !names.includes('student_answers'));
 const row=db.prepare('SELECT * FROM practice_progress').get();assert.ok(!Object.hasOwn(row,'answer'));
});
test('practice choices are validated and cannot be submitted by parent',async()=>{
 const {env,cookie}=await setup(),student=await cookie('class12'),parent=await cookie('guardian');
 const invalid=await submitPractice({request:makeReq('/api/practice',student,{lessonId:'missing',choice:0}),env});
 assert.equal(invalid.status,400);
 assert.equal((await submitPractice({request:makeReq('/api/practice',parent,{lessonId:'physics-faraday',choice:1}),env})).status,403);
 assert.equal((await submitPractice({request:makeReq('/api/practice',student,{lessonId:'physics-faraday',choice:-1}),env})).status,400);
});
test('parent gets only linked learner aggregate practice totals',async()=>{
 const {env,cookie}=await setup(),student=await cookie('class12'),parent=await cookie('guardian');
 await submitPractice({request:makeReq('/api/practice',student,{lessonId:'physics-faraday',choice:0}),env});
 const response=await parentSummary({request:makeReq('/api/parent-summary',parent),env});
 const result=await response.json();assert.equal(response.status,200);assert.equal(result.practiceAttempts,1);
 assert.ok(!JSON.stringify(result).includes('Faraday'));
});


test('multiple questions store only student-owned per-item aggregate outcomes, not answer text or keys',async()=>{
 const {env,db,cookie}=await setup(),student=await cookie('class12');
 const {lessons}=await (await getLessons({request:makeReq('/api/lessons',student),env})).json();
 const lesson=lessons.find(l=>l.id==='physics-current-electricity');
 assert.equal(lesson.questions.length,4);
 assert.ok(lesson.questions.every(q=>!Object.hasOwn(q,'answerIndex')&&!Object.hasOwn(q,'explanation')));
 assert.ok(!Object.hasOwn(lesson,'explanation'));
 const {QUESTION_BANKS}=await import('../functions/_lib/question-bank.js');
 const choice=QUESTION_BANKS[lesson.id][0].answerIndex;
 let response=await submitPractice({request:makeReq('/api/practice',student,{lessonId:lesson.id,questionId:'v2',choice}),env});
 assert.equal(response.status,200);
 let grade=await response.json();
 assert.equal(grade.correct,true);assert.equal(grade.questionId,'v2');
 const row=db.prepare('SELECT lesson_id,attempts,correct FROM practice_progress').get();
 assert.deepEqual(row,{lesson_id:lesson.id+'::v2',attempts:1,correct:1});
 const summary=(await (await getPractice({request:makeReq('/api/practice',student),env})).json()).progress;
 assert.equal(summary.total,1);
 const r=summary.lessonRevision.find(x=>x.lessonId===lesson.id);
 assert.equal(r.distinctQuestionsAttempted,1);
 assert.equal(r.nextQuestionId,'base');
 assert.equal(r.masteryCertified,false);
 const other=(await (await getPractice({request:makeReq('/api/practice',await cookie('otherstudent')),env})).json()).progress;
 assert.equal(other.total,0);
 const bad=await submitPractice({request:makeReq('/api/practice',student,{lessonId:lesson.id,questionId:'v2.unknown',choice}),env});
 assert.equal(bad.status,400);
 assert.equal(db.prepare('SELECT count(*) AS n FROM practice_progress').get().n,1);
});
test('student with saved subject choice cannot submit grades for a different subject',async()=>{
 const {env,cookie}=await setup(),student=await cookie('class12');
 await postProfile({request:makeReq('/api/profile',student,{board:'CBSE',stream:'Science',subjects:['Physics'],dailyMinutes:30}),env});
 assert.equal((await submitPractice({request:makeReq('/api/practice',student,{lessonId:'chemistry-solutions-molarity',questionId:'v2',choice:1}),env})).status,403);
 assert.equal((await submitPractice({request:makeReq('/api/practice',student,{lessonId:'physics-current-electricity',questionId:'v2',choice:1}),env})).status,200);
});
