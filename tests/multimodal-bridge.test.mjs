import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {splitVoiceText} from '../public/voice-readback.js';
import {validateImageData, classifyLocalStudyFile} from '../functions/_lib/media-intake.js';
import {onRequestPost as analyze} from '../functions/api/analyze-image.js';
import {onRequestPost as login} from '../functions/api/login.js';
import {DatabaseSync} from 'node:sqlite';
import {randomUUID} from 'node:crypto';
import {accessKeyHash} from '../functions/_lib/core.js';
const ORIGIN='https://saathi-preview.pages.dev',KEY='0123456789abcdef'.repeat(4);
const png='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScL/nwAAAABJRU5ErkJggg==';
const request=(url,cookie='',body,origin=ORIGIN)=>new Request(ORIGIN+url,{method:body?'POST':'GET',headers:{Origin:origin,'Content-Type':'application/json',...(cookie?{Cookie:cookie}:{})},body:body?JSON.stringify(body):undefined});
async function setup(){
 const db=new DatabaseSync(':memory:');for(const m of ['0001_initial','0003_admin','0004_study','0005_mission','0006_companion_name','0007_personal_memory'])db.exec(readFileSync(new URL('../migrations/'+m+'.sql',import.meta.url),'utf8'));
 const prepare=(sql,args=[])=>({bind(...x){return prepare(sql,x)},async first(){return db.prepare(sql).get(...args)||null},async all(){return{results:db.prepare(sql).all(...args)}},async run(){return{meta:{changes:Number(db.prepare(sql).run(...args).changes)}}}});
 const salt='0123456789abcdef0123456789abcdef',hash=await accessKeyHash(KEY,salt),sid=randomUUID();const ins=db.prepare('INSERT INTO users(id,username,role,password_salt,password_hash,board,linked_student_id) VALUES(?,?,?,?,?,?,?)');ins.run(sid,'learner','student',salt,hash,'unconfigured',null);ins.run(randomUUID(),'parent','parent',salt,hash,'unconfigured',sid);
 let calls=[];
 const env={DB:{prepare},AI:{async run(model,payload){calls.push({model,payload});return {response:'I can see an image, but exact handwriting may require confirmation.'}}}};
 const cookie=async username=>{const r=await login({request:request('/api/login','',{username,password:KEY}),env});assert.equal(r.status,200);return r.headers.get('Set-Cookie').split(';')[0]};
 return{env,db,cookie,get calls(){return calls}};
}
test('VAOS bounded voice segmentation fits Saathi student replies',()=>{
 const parts=splitVoiceText('This is a spoken study explanation about a formula and how it works. '.repeat(14),170);
 assert.ok(parts.length>1);assert.ok(parts.every(s=>s.length<=170));assert.ok(parts.join(' ').includes('formula'));
 assert.deepEqual(splitVoiceText(''),[]);
});
test('allowlist and size validation reject forged, spoofed or oversized uploads',()=>{
 assert.equal(classifyLocalStudyFile('lesson.txt','text/plain',1800).kind,'text');
 assert.equal(classifyLocalStudyFile('notes.md','text/markdown',2000).kind,'text');
 assert.equal(classifyLocalStudyFile('homework.docx','application/vnd.openxmlformats-officedocument.wordprocessingml.document',2000).kind,'unsupported');
 assert.equal(classifyLocalStudyFile('chapter.pdf','application/pdf',2000).kind,'unsupported');
 assert.equal(classifyLocalStudyFile('lesson.mp4','video/mp4',2000000).kind,'video-frame-only');
 assert.equal(classifyLocalStudyFile('test.exe','image/png',400),null);
 assert.equal(classifyLocalStudyFile('big.txt','text/plain',5_000_000),null);
 assert.equal(validateImageData(png),null);
 assert.ok(validateImageData('data:image/png;base64,aGVsbG8='));
 assert.ok(validateImageData('data:image/svg+xml;base64,PHN2Zz48L3N2Zz4='));
 assert.ok(validateImageData('data:image/jpeg;base64,'+'a'.repeat(800000)));
});
test('learner opt-in vision analyzes image without storing input or model output',async()=>{
 const x=await setup(),learner=await x.cookie('learner');
 const r=await analyze({request:request('/api/analyze-image',learner,{image:png,question:'Help me understand this science diagram.',confirm:'ANALYZE IMAGE'}),env:x.env});
 assert.equal(r.status,200);const d=await r.json();
 assert.match(d.answer,/image/);assert.equal(x.calls.length,1);assert.match(x.calls[0].model,/vision/);
 assert.equal(x.db.prepare('SELECT COUNT(*) AS n FROM notes').get().n,0);
 assert.equal(x.db.prepare('SELECT COUNT(*) AS n FROM personal_memories').get().n,0);
 assert.ok(!JSON.stringify(d).includes('data:image'));
});
test('untrusted images cannot be analyzed by a parent, anonymous user or hostile origin',async()=>{
 const x=await setup(),p=await x.cookie('parent'),learner=await x.cookie('learner');
 const body={image:png,question:'Explain the diagram',confirm:'ANALYZE IMAGE'};
 assert.equal((await analyze({request:request('/api/analyze-image','',body),env:x.env})).status,403);
 assert.equal((await analyze({request:request('/api/analyze-image',p,body),env:x.env})).status,403);
 assert.equal((await analyze({request:request('/api/analyze-image',learner,body,'https://evil.test'),env:x.env})).status,403);
 assert.equal((await analyze({request:request('/api/analyze-image',learner,{...body,confirm:'NO'}),env:x.env})).status,400);
 assert.equal(x.calls.length,0);
});
test('missing vision provider is an honest hold, not a fabricated image explanation',async()=>{
 const x=await setup(),cookie=await x.cookie('learner');
 const r=await analyze({request:request('/api/analyze-image',cookie,{image:png,question:'What is shown?',confirm:'ANALYZE IMAGE'}),env:{...x.env,AI:null}});
 assert.equal(r.status,503);
 const data=await r.json();assert.match(data.error,/vision|unavailable/i);
});
