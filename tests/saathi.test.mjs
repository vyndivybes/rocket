import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import {randomUUID} from 'node:crypto';
import {validTask,safetyRoute,scopeStudent,validateQuestion,accessKeyHash,dayUTC,TOPICS,AI_MODEL,auth} from '../functions/_lib/core.js';
import {onRequestPost as login} from '../functions/api/login.js';
import {onRequestGet as me} from '../functions/api/me.js';
import {onRequestGet as tasksGet,onRequestPost as tasksPost} from '../functions/api/tasks.js';
import {onRequestGet as parentSummary} from '../functions/api/parent-summary.js';
import {onRequestPost as ask} from '../functions/api/ask.js';
import {onRequestPost as logout} from '../functions/api/logout.js';
const BASE='https://saathi-preview.pages.dev';
const TEST_ACCESS_KEY='0123456789abcdef'.repeat(4);
function dbAdapter(){
 const db=new DatabaseSync(':memory:');db.exec(readFileSync(new URL('../migrations/0001_initial.sql',import.meta.url),'utf8'));db.exec(readFileSync(new URL('../migrations/0003_admin.sql',import.meta.url),'utf8'));
 db.exec(readFileSync(new URL('../migrations/0004_study.sql',import.meta.url),'utf8'));
 db.exec(readFileSync(new URL('../migrations/0006_companion_name.sql',import.meta.url),'utf8'));
 function prepare(sql,args=[]){return {bind(...v){return prepare(sql,v)},async first(){return db.prepare(sql).get(...args)||null},async all(){return {results:db.prepare(sql).all(...args)}},async run(){return {meta:{changes:Number(db.prepare(sql).run(...args).changes)}}}}}
 return {db,api:{prepare}};
}
async function seeded(){
 const {db,api}=dbAdapter(),salt='000102030405060708090a0b0c0d0e0f';
 const hash=await accessKeyHash(TEST_ACCESS_KEY,salt);
 const student=randomUUID(),second=randomUUID(),parent=randomUUID();
 const stmt=db.prepare('INSERT INTO users(id,username,role,password_salt,password_hash,board,linked_student_id) VALUES(?,?,?,?,?,?,?)');
 stmt.run(student,'student1','student',salt,hash,'CBSE',null);
 stmt.run(second,'student2','student',salt,hash,'ISC',null);
 stmt.run(parent,'parent1','parent',salt,hash,'unconfigured',student);
 let inference=0;
 const env={DB:api,AI:{async run(model,input){inference++;assert.equal(model,AI_MODEL);assert.equal(input.messages[0].role,'system');return {response:'Try using Faraday\'s law, then solve a practice example.'}}}};
 return {env,db,ids:{student,second,parent},get inference(){return inference}};
}
function req(path,{body,method='GET',cookie='',origin=BASE}={}){
 const headers={Origin:origin};if(cookie)headers.Cookie=cookie;
 if(body!==undefined)headers['Content-Type']='application/json';
 return new Request(BASE+path,{method,headers,body:body!==undefined?JSON.stringify(body):undefined});
}
async function signIn(env,username='student1'){
 const res=await login({request:req('/api/login',{method:'POST',body:{username,password:TEST_ACCESS_KEY}}),env});
 assert.equal(res.status,200);return res.headers.get('Set-Cookie').split(';')[0];
}
async function body(r){return await r.json()}
test('strict task validation rejects empty and impossible dates',()=>{
 assert.match(validTask('','Physics',null),/title/);
 assert.match(validTask('Revise','Physics','2026-02-31'),/date/);
 assert.equal(validTask('Revise','Physics','2026-02-28'),null);
});
test('safety routing treats clear first person self-harm and unsafe guardian disclosures distinctly',()=>{
 assert.equal(safetyRoute('I want to die').type,'urgent');
 assert.match(safetyRoute('my father hits me').answer,/another trusted adult/);
 assert.equal(safetyRoute('Explain suicide in literature'),null);
 assert.match(safetyRoute('I want to die').answer,/cannot contact anyone/);
});
test('question bounds and identity scoping',()=>{
 assert.match(validateQuestion('x'),/4/);assert.equal(validateQuestion('Explain Faraday law'),null);
 assert.equal(scopeStudent({role:'parent',linked_student_id:'student-a'}),'student-a');
 assert.equal(scopeStudent({role:'student',id:'student-b'}),'student-b');
 assert.ok(TOPICS.every(x=>x.level==='Class 12 example'));
});
test('authentication checks student and rejects missing cookies and wrong access keys',async()=>{
 const {env}=await seeded();
 assert.equal((await me({request:req('/api/me'),env})).status,401);
 const bad=await login({request:req('/api/login',{method:'POST',body:{username:'student1',password:'f'.repeat(64)}}),env});assert.equal(bad.status,401);
 const cookie=await signIn(env);const response=await me({request:req('/api/me',{cookie}),env});
 assert.equal((await body(response)).role,'student');
 assert.equal((await auth(req('/api/me',{cookie}),env)).username,'student1');
});
test('login fails CSRF origin and no account details are disclosed',async()=>{
 const {env}=await seeded();
 const denied=await login({request:req('/api/login',{method:'POST',body:{username:'student1',password:'hello'},origin:'https://evil.test'}),env});
 assert.equal(denied.status,403);
 assert.equal((await body(denied)).error,'Origin denied');
});
test('tasks: only authenticated student creates and reads own tasks, cannot complete another student task',async()=>{
 const {env,db,ids}=await seeded();const cookie=await signIn(env);
 const blocked=await tasksPost({request:req('/api/tasks',{method:'POST',cookie,origin:'https://other.test',body:{title:'Read'}}),env});assert.equal(blocked.status,403);
 const create=await tasksPost({request:req('/api/tasks',{method:'POST',cookie,body:{title:'Finish Physics revision',subject:'Physics',due_date:'2026-10-15'}}),env});
 assert.equal(create.status,201);const id=(await body(create)).id;
 assert.equal((await body(await tasksGet({request:req('/api/tasks',{cookie}),env}))).tasks.length,1);
 db.prepare('INSERT INTO tasks(id,student_id,title) VALUES(?,?,?)').run('other-task',ids.second,'PRIVATE DO NOT EXPOSE');
 const attempts=await tasksPost({request:req('/api/tasks',{method:'POST',cookie,body:{action:'complete',id:'other-task',done:true}}),env});
 assert.equal(attempts.status,404);
 assert.equal(db.prepare('SELECT done FROM tasks WHERE id=?').get('other-task').done,0);
 assert.equal((await tasksPost({request:req('/api/tasks',{method:'POST',cookie,body:{action:'complete',id,done:true}}),env})).status,200);
});
test('parent summary only shares linked student aggregate; no task titles or transcripts',async()=>{
 const {env,db,ids}=await seeded();const studentCookie=await signIn(env);
 db.prepare('INSERT INTO tasks(id,student_id,title,done) VALUES(?,?,?,?)').run('t1',ids.student,'My personal task title',1);
 db.prepare('INSERT INTO tasks(id,student_id,title,done) VALUES(?,?,?,?)').run('t2',ids.second,'Other student secret',1);
 const parentCookie=await signIn(env,'parent1');
 assert.equal((await tasksGet({request:req('/api/tasks',{cookie:parentCookie}),env})).status,403);
 assert.equal((await parentSummary({request:req('/api/parent-summary',{cookie:studentCookie}),env})).status,403);
 const response=await parentSummary({request:req('/api/parent-summary',{cookie:parentCookie}),env});
 const summary=await body(response);assert.equal(summary.assigned,1);assert.equal(summary.completed,1);
 assert.ok(!JSON.stringify(summary).includes('personal task'));
 assert.ok(!JSON.stringify(summary).includes('Other student'));
});
test('AI call invokes allowed model, handles crisis before inference and enforces daily cap',async()=>{
 const x=await seeded();const cookie=await signIn(x.env);
 const urgent=await ask({request:req('/api/ask',{method:'POST',cookie,body:{question:'I want to die'}}),env:x.env});
 assert.equal((await body(urgent)).kind,'urgent');assert.equal(x.inference,0);
 for(let i=0;i<12;i++){
  const resp=await ask({request:req('/api/ask',{method:'POST',cookie,body:{question:'Explain electromagnetic induction'}}),env:x.env});
  assert.equal(resp.status,200);
  assert.equal((await body(resp)).kind,'teacher');
 }
 assert.equal(x.inference,12);
 const extra=await ask({request:req('/api/ask',{method:'POST',cookie,body:{question:'Explain electromagnetic induction'}}),env:x.env});
 assert.equal(extra.status,429);assert.equal(x.inference,12);
});
test('logout invalidates session immediately',async()=>{
 const {env}=await seeded();const cookie=await signIn(env);
 assert.equal((await logout({request:req('/api/logout',{method:'POST',cookie,body:{}}),env})).status,200);
 assert.equal((await me({request:req('/api/me',{cookie}),env})).status,401);
});
test('D1 schema and initial AI quota date are independently scoped',async()=>{
 const {env,db,ids}=await seeded();const cookie=await signIn(env);
 await ask({request:req('/api/ask',{method:'POST',cookie,body:{question:'Explain chemical equilibrium'}}),env});
 assert.equal(db.prepare('SELECT day_utc,attempts FROM ai_usage WHERE student_id=?').get(ids.student).day_utc,dayUTC());
 assert.equal(db.prepare('SELECT COUNT(*) n FROM sqlite_master WHERE name=?').get('chat_transcripts').n,0);
});
