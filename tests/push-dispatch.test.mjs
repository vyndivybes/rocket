import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {DatabaseSync} from 'node:sqlite';
import {randomUUID} from 'node:crypto';
import {onRequestPost as dispatch} from '../functions/api/push-dispatch.js';
const origin='https://saathi-preview.pages.dev';
function setup(){
 const db=new DatabaseSync(':memory:');
 for(const m of ['0001_initial','0003_admin','0004_study','0005_mission','0006_companion_name','0007_personal_memory','0008_push_devices','0009_push_health','0010_learner_experience'])db.exec(readFileSync(new URL('../migrations/'+m+'.sql',import.meta.url),'utf8'));
 const prepare=(sql,args=[])=>({bind(...x){return prepare(sql,x)},async first(){return db.prepare(sql).get(...args)||null},async all(){return {results:db.prepare(sql).all(...args)}},async run(){return{meta:{changes:Number(db.prepare(sql).run(...args).changes)}}}});
 const student=randomUUID(),sid=randomUUID(),did=randomUUID();
 db.prepare('INSERT INTO users(id,username,role,password_salt,password_hash,board) VALUES(?,?,?,?,?,?)').run(student,'learner','student','0'.repeat(32),'1'.repeat(64),'unconfigured');
 db.prepare('INSERT INTO schedule_items(id,student_id,title,kind,time_local,days_json,minutes,enabled) VALUES(?,?,?,?,?,?,?,1)').run(sid,student,'Private Physics revision','study','17:00','[3]',15);
 db.prepare('INSERT INTO push_devices(id,student_id,endpoint,p256dh,auth,timezone,quiet_from,quiet_to) VALUES(?,?,?,?,?,?,?,?)').run(did,student,'https://fcm.googleapis.com/fcm/send/synthetic','A'.repeat(87),'B'.repeat(22),'Asia/Kolkata',22,7);
 const env={DB:{prepare},SAATHI_STAGE:'preview',PUSH_DISPATCH_CONFIGURED:'true',PUSH_DISPATCH_SECRET:'testing-secret-'.repeat(4),VAPID_PRIVATE_KEY:'X'.repeat(43),VAPID_PUBLIC_KEY:'Y'.repeat(87),VAPID_SUBJECT:'mailto:info@vayushastr.com'};
 db.prepare('INSERT INTO learner_experience(student_id,preferences_json) VALUES(?,?)').run(student,JSON.stringify({theme:'sky',assistStyle:'balanced',textSize:'normal',visibleCards:['learn','plan','create','explore'],quietMode:false,remindersEnabled:true}));
 const request=(secret=env.PUSH_DISPATCH_SECRET)=>new Request(origin+'/api/push-dispatch',{method:'POST',headers:{Authorization:'Bearer '+secret}});
 return {db,env,request};
}
test('a due reminder is sent only once; notification never includes private lesson or account info',async()=>{
 const x=setup(),sent=[];const testSender=async(sub,payload,vapid)=>{sent.push({sub,payload,vapid});return {ok:true}};
 const testNow=Date.parse('2026-10-14T11:30:00Z');
 const first=await dispatch({request:x.request(),env:x.env,data:{testSender,testNow}});
 assert.equal(first.status,200);const a=await first.json();assert.equal(a.attempted,1);assert.equal(a.accepted,1);assert.equal(a.failed,0);
 const second=await dispatch({request:x.request(),env:x.env,data:{testSender,testNow}});
 assert.equal((await second.json()).attempted,0);assert.equal(sent.length,1);
 assert.equal(x.db.prepare('SELECT COUNT(*) AS n FROM push_deliveries').get().n,1);
 assert.equal(x.db.prepare('SELECT attempted FROM push_dispatch_health WHERE singleton=1').get().attempted,0);
 assert.equal(x.db.prepare('SELECT state FROM push_deliveries').get().state,'ACCEPTED');
 assert.equal(JSON.stringify(sent[0].payload).includes('Physics'),false);
 assert.equal(sent[0].payload.kind,'SAATHI_REMINDER_V1');
});
test('quiet preferences and default absent consent block actual push sends',async()=>{
 const x=setup(),sent=[];
 const sender=async()=>{sent.push('delivered');return {ok:true}};
 const t=Date.parse('2026-10-14T11:30:00Z');
 x.db.exec('DELETE FROM learner_experience');
 let r=await dispatch({request:x.request(),env:x.env,data:{testSender:sender,testNow:t}});
 assert.equal(r.status,200);assert.equal((await r.json()).attempted,0);
 const preferences={theme:'sky',assistStyle:'balanced',textSize:'normal',visibleCards:['learn'],quietMode:true,remindersEnabled:true};
 const student=x.db.prepare('SELECT id FROM users WHERE role=?').get('student').id;
 x.db.prepare('INSERT INTO learner_experience(student_id,preferences_json) VALUES(?,?)').run(student,JSON.stringify(preferences));
 r=await dispatch({request:x.request(),env:x.env,data:{testSender:sender,testNow:t}});
 assert.equal((await r.json()).attempted,0);
 x.db.prepare('UPDATE learner_experience SET preferences_json=? WHERE student_id=?').run(JSON.stringify({...preferences,quietMode:false,remindersEnabled:false}),student);
 r=await dispatch({request:x.request(),env:x.env,data:{testSender:sender,testNow:t}});
 assert.equal((await r.json()).attempted,0);
 assert.equal(sent.length,0);
});
test('requires bearer auth and preview env; never sends outside local time or bedtime',async()=>{
 const x=setup();let sent=0;const testSender=async()=>{sent++};
 assert.equal((await dispatch({request:x.request('wrong'),env:x.env,data:{testSender,testNow:Date.parse('2026-10-14T11:30:00Z')}})).status,403);
 assert.equal((await dispatch({request:x.request(),env:{...x.env,SAATHI_STAGE:'production'},data:{testSender}})).status,503);
 assert.equal((await dispatch({request:x.request(),env:x.env,data:{testSender,testNow:Date.parse('2026-10-14T17:30:00Z')}})).status,200);
 assert.equal(sent,0);assert.equal(x.db.prepare('SELECT COUNT(*) AS n FROM push_deliveries').get().n,0);
});
