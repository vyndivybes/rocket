import test from 'node:test';
import assert from 'node:assert/strict';
import {KNOWLEDGE_PACKS,selectKnowledgeContext,publicKnowledgePacks} from '../functions/_lib/knowledge-packs.js';
import {onRequestGet as getPacks} from '../functions/api/knowledge-packs.js';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import {randomUUID} from 'node:crypto';
import {accessKeyHash} from '../functions/_lib/core.js';
import {onRequestPost as login} from '../functions/api/login.js';
const ORIGIN='https://saathi-preview.pages.dev',KEY='0123456789abcdef'.repeat(4);
const req=(path,cookie='',body)=>new Request(ORIGIN+path,{method:body?'POST':'GET',headers:{Origin:ORIGIN,'Content-Type':'application/json',...(cookie?{Cookie:cookie}:{})},body:body?JSON.stringify(body):undefined});
async function setup(){
 const db=new DatabaseSync(':memory:');for(const m of ['0001_initial','0003_admin','0004_study','0005_mission','0006_companion_name'])db.exec(readFileSync(new URL('../migrations/'+m+'.sql',import.meta.url),'utf8'));
 const prepare=(sql,p=[])=>({bind(...v){return prepare(sql,v)},async first(){return db.prepare(sql).get(...p)||null},async all(){return {results:db.prepare(sql).all(...p)}},async run(){return {meta:{changes:Number(db.prepare(sql).run(...p).changes)}}}});
 const env={DB:{prepare}},salt='00112233445566778899aabbccddeeff',hash=await accessKeyHash(KEY,salt);const ins=db.prepare('INSERT INTO users(id,username,role,password_salt,password_hash,board,linked_student_id) VALUES(?,?,?,?,?,?,?)');const sid=randomUUID();ins.run(sid,'student','student',salt,hash,'unconfigured',null);ins.run(randomUUID(),'guardian','parent',salt,hash,'unconfigured',sid);
 const cookie=async username=>{const r=await login({request:req('/api/login','',{username,password:KEY}),env});assert.equal(r.status,200);return r.headers.get('set-cookie').split(';')[0]};
 return{env,cookie};
}
test('knowledge collection upgrades aviation, art, four science subjects, personal planning and wellbeing',()=>{
 const packs=KNOWLEDGE_PACKS;
 assert.deepEqual(packs.map(p=>p.id),['aviation','physics','mathematics','chemistry','biology','art','study-skills','wellbeing']);
 assert.ok(packs.every(p=>p.modules.length>=2));
 assert.ok(packs.reduce((n,p)=>n+p.modules.length,0)>=24);
 for(const p of packs){assert.ok(p.summary.length>20);for(const m of p.modules){assert.ok(m.title.length>8);assert.ok(m.explanation.length>45);assert.ok(m.activity.length>20);assert.ok(m.source?.url?.startsWith('https://'));assert.ok(m.source?.publisher);assert.ok(m.difficulty);}}
});
test('source links are trusted official educational and museum sources, not fake citations',()=>{
 const domains=new Set(['www1.grc.nasa.gov','ncert.nic.in','cbseacademic.nic.in','www.nga.gov','pariksha.dgca.gov.in']);
 for(const p of KNOWLEDGE_PACKS)for(const m of p.modules){const u=new URL(m.source.url);assert.ok(domains.has(u.hostname),u.hostname);assert.equal(u.protocol,'https:');}
});
test('public packs provide bounded editorial concepts and do not leak answer keys or personal data',()=>{
 const p=publicKnowledgePacks();assert.equal(p.length,8);
 assert.ok(!JSON.stringify(p).includes('learner_demo'));
 assert.ok(!JSON.stringify(p).includes('password_hash'));
 assert.ok(!JSON.stringify(p).includes('answerIndex'));
});
test('context selection matches aviation, art and foundation questions without inventing real-time authority',()=>{
 const pilot=selectKnowledgeContext('What are lift and drag?', 'pilot');assert.equal(pilot.packId,'aviation');assert.ok(pilot.source.url.includes('nasa.gov'));
 const art=selectKnowledgeContext('How do I create an abstract collage?', 'artist');assert.equal(art.packId,'art');
 const chem=selectKnowledgeContext('Explain moles in chemistry', 'teacher');assert.equal(chem.packId,'chemistry');
 const random=selectKnowledgeContext('Tell me a random joke','companion');assert.equal(random,null);
});
test('learning packs endpoint requires learner login; parent cannot read student learning UI',async()=>{
 const {env,cookie}=await setup();
 assert.equal((await getPacks({request:req('/api/knowledge-packs'),env})).status,403);
 const guardian=await cookie('guardian');assert.equal((await getPacks({request:req('/api/knowledge-packs',guardian),env})).status,403);
 const student=await cookie('student');const r=await getPacks({request:req('/api/knowledge-packs',student),env});assert.equal(r.status,200);
 const data=await r.json();assert.equal(data.packs.length,8);
 assert.match(data.notice,/not a certified/i);
});
