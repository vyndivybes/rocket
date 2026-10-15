import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import {randomUUID} from 'node:crypto';
import {accessKeyHash,auth} from '../functions/_lib/core.js';
import {onRequestPost as login} from '../functions/api/login.js';
import {onRequestPost as logout} from '../functions/api/logout.js';
import {onRequestGet as adminSummary} from '../functions/api/admin-summary.js';
import {onRequestGet as parentSummary} from '../functions/api/parent-summary.js';
import {onRequestGet as tasksGet} from '../functions/api/tasks.js';
import {onRequestPost as ask} from '../functions/api/ask.js';

const BASE='https://saathi-preview.pages.dev';
const KEY='abcdeffedcba0123'.repeat(4);
function req(path,{cookie='',body,origin=BASE,method='GET'}={}) {
 const headers={Origin:origin};
 if(cookie)headers.Cookie=cookie;
 if(body!==undefined)headers['Content-Type']='application/json';
 return new Request(BASE+path,{method,headers,body:body===undefined?undefined:JSON.stringify(body)});
}
function dbAdapter() {
 const db=new DatabaseSync(':memory:');
 db.exec(readFileSync(new URL('../migrations/0001_initial.sql',import.meta.url),'utf8'));
 db.exec(readFileSync(new URL('../migrations/0003_admin.sql',import.meta.url),'utf8'));
 db.exec(readFileSync(new URL('../migrations/0004_study.sql',import.meta.url),'utf8'));
 db.exec(readFileSync(new URL('../migrations/0006_companion_name.sql',import.meta.url),'utf8'));
 db.exec(readFileSync(new URL('../migrations/0007_personal_memory.sql',import.meta.url),'utf8'));
 const prepare=(sql,args=[])=>({bind(...v){return prepare(sql,v)},async first(){return db.prepare(sql).get(...args)||null},async all(){return {results:db.prepare(sql).all(...args)}},async run(){return {meta:{changes:Number(db.prepare(sql).run(...args).changes)}}}});
 return {db,DB:{prepare}};
}
async function setUp() {
 const {db,DB}=dbAdapter();
 const salt='00112233445566778899aabbccddeeff';
 const hash=await accessKeyHash(KEY,salt);
 const learner=randomUUID(),other=randomUUID(),parent=randomUUID(),admin=randomUUID();
 const add=db.prepare('INSERT INTO users (id,username,role,password_salt,password_hash,board,linked_student_id) VALUES(?,?,?,?,?,?,?)');
 add.run(learner,'learner_demo','student',salt,hash,'unconfigured',null);
 add.run(other,'other_student','student',salt,hash,'unconfigured',null);
 add.run(parent,'parent_demo','parent',salt,hash,'unconfigured',learner);
 db.prepare('INSERT INTO admin_users(id,username,password_salt,password_hash) VALUES(?,?,?,?)').run(admin,'saathi_admin_demo',salt,hash);
 db.prepare('INSERT INTO tasks(id,student_id,title,done) VALUES(?,?,?,?)').run('learner-task',learner,'Student private notes',1);
 db.prepare('INSERT INTO tasks(id,student_id,title,done) VALUES(?,?,?,?)').run('other-task',other,'Other student secret',0);
 const env={DB,AI:{async run(){return {response:'test'}}}};
 const signin=async username=>{
  const response=await login({request:req('/api/login',{method:'POST',body:{username,password:KEY}}),env});
  assert.equal(response.status,200);
  const cookie=response.headers.get('Set-Cookie');
  assert.ok(cookie.includes('HttpOnly') && cookie.includes('SameSite=Strict'));
  return cookie.split(';')[0];
 };
 return {env,db,signin};
}
test('admin login issues separate session and identifies role correctly',async()=>{
 const {env,signin}=await setUp();
 const cookie=await signin('saathi_admin_demo');
 const user=await auth(req('/api/me',{cookie}),env);
 assert.equal(user.role,'admin');
 assert.equal(user.username,'saathi_admin_demo');
});
test('admin dashboard provides aggregate counts without revealing private notes or access keys',async()=>{
 const {env,signin}=await setUp();
 const cookie=await signin('saathi_admin_demo');
 const response=await adminSummary({request:req('/api/admin-summary',{cookie}),env});
 assert.equal(response.status,200);
 const text=await response.text();
 const data=JSON.parse(text);
 assert.equal(data.students,2);
 assert.equal(data.parents,1);
 assert.equal(data.totalTasks,2);
 assert.ok(!text.includes('Student private notes'));
 assert.ok(!text.includes('Other student secret'));
 assert.ok(!text.includes(KEY));
});
test('admin cannot read student tasks, ask AI or access parent role; parent linked only to own learner',async()=>{
 const {env,signin}=await setUp();
 const adminCookie=await signin('saathi_admin_demo');
 assert.equal((await tasksGet({request:req('/api/tasks',{cookie:adminCookie}),env})).status,403);
 assert.equal((await ask({request:req('/api/ask',{method:'POST',cookie:adminCookie,body:{question:'Explain integrals'}}),env})).status,403);
 assert.equal((await parentSummary({request:req('/api/parent-summary',{cookie:adminCookie}),env})).status,403);
 const parentCookie=await signin('parent_demo');
 assert.equal((await adminSummary({request:req('/api/admin-summary',{cookie:parentCookie}),env})).status,403);
 const s=await parentSummary({request:req('/api/parent-summary',{cookie:parentCookie}),env});
 assert.equal(s.status,200);
 const data=await s.json();
 assert.equal(data.assigned,1); assert.equal(data.completed,1);
});
test('admin logout revokes admin session',async()=>{
 const {env,signin}=await setUp();
 const cookie=await signin('saathi_admin_demo');
 assert.equal((await logout({request:req('/api/logout',{method:'POST',cookie,body:{}}),env})).status,200);
 assert.equal(await auth(req('/api/me',{cookie}),env),null);
});
test('unauthenticated callers cannot access admin summary',async()=>{
 const {env}=await setUp();
 assert.equal((await adminSummary({request:req('/api/admin-summary'),env})).status,403);
});
