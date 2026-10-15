// Run locally, never in deployed code. Require 64-character random hex access key.
import {randomBytes,createHash,randomUUID} from 'node:crypto';
const username=process.env.SAATHI_USERNAME?.trim().toLowerCase();
const role=process.env.SAATHI_ROLE;
const pass=process.env.SAATHI_ACCESS_KEY;
const board=process.env.SAATHI_BOARD||'unconfigured';
const linked=process.env.SAATHI_LINKED_STUDENT_ID||null;
if(!/^[a-z0-9._-]{3,40}$/.test(username||'')||!['student','parent'].includes(role)||!/^[a-f0-9]{64}$/.test(pass||'')||(!['CBSE','ISC','TN-HSE','Other','unconfigured'].includes(board))) {console.error('Require valid SAATHI_USERNAME, SAATHI_ROLE, SAATHI_ACCESS_KEY (64 lowercase hex characters of CSPRNG output), SAATHI_BOARD');process.exit(1)}
if(role==='parent'&&!linked){console.error('Parent requires SAATHI_LINKED_STUDENT_ID');process.exit(1)}
const salt=randomBytes(16).toString('hex');const hash=createHash('sha256').update(`${salt}:${pass}`).digest('hex');
const id=randomUUID();const quote=s=>s===null?'NULL':`'${String(s).replaceAll("'","''")}'`;
console.log(`-- SAATHI_STUDENT_ID=${role==='student'?id:'n/a'}\nINSERT INTO users(id,username,role,password_salt,password_hash,board,linked_student_id) VALUES(${[id,username,role,salt,hash,board,linked].map(quote).join(',')});`);
