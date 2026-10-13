import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync,mkdtempSync,rmSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';

test('synthetic SQLite export and restore preserves Saathi tables and per-student ownership',()=>{
 const folder=mkdtempSync(join(tmpdir(),'saathi-recovery-')),backup=join(folder,'test-copy.sqlite');
 let source,restored;
 try{
  source=new DatabaseSync(':memory:');
  for(const name of ['0001_initial','0003_admin','0004_study','0005_mission'])
   source.exec(readFileSync(new URL('../migrations/'+name+'.sql',import.meta.url),'utf8'));
  const insert=source.prepare('INSERT INTO users(id,username,role,password_salt,password_hash) VALUES(?,?,?,?,?)');
  insert.run('student-a','synthetic-a','student','0'.repeat(32),'a'.repeat(64));
  insert.run('student-b','synthetic-b','student','1'.repeat(32),'b'.repeat(64));
  source.prepare('INSERT INTO notes(id,student_id,title,body) VALUES(?,?,?,?)').run('one','student-a','Private A','Synthetic drawing idea A');
  source.prepare('INSERT INTO notes(id,student_id,title,body) VALUES(?,?,?,?)').run('two','student-b','Private B','Synthetic drawing idea B');
  source.prepare('INSERT INTO schedule_items(id,student_id,title,kind,time_local,days_json,minutes) VALUES(?,?,?,?,?,?,?)').run('event-a','student-a','Evening movement','movement','17:30','[1,3,5]',15);
  source.exec('VACUUM INTO '+JSON.stringify(backup));
  restored=new DatabaseSync(backup);
  assert.deepEqual(restored.prepare('PRAGMA foreign_key_check').all(),[]);
  assert.equal(restored.prepare('SELECT COUNT(*) AS n FROM users').get().n,2);
  assert.equal(restored.prepare('SELECT COUNT(*) AS n FROM notes WHERE student_id=?').get('student-a').n,1);
  assert.equal(restored.prepare('SELECT COUNT(*) AS n FROM schedule_items WHERE student_id=?').get('student-a').n,1);
  assert.equal(restored.prepare('SELECT title FROM notes WHERE student_id=?').all('student-b')[0].title,'Private B');
  assert.equal(restored.prepare('SELECT COUNT(*) AS n FROM notes WHERE student_id=? AND title=?').get('student-a','Private B').n,0);
 }finally{if(restored)restored.close();if(source)source.close();rmSync(folder,{recursive:true,force:true})}
});
