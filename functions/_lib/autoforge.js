import {validateSkillInput} from './skill-forge.js';
const safeText=s=>typeof s==='string'&&!/[\u0000-\u001f\u007f<>]/.test(s)&&!/(?:ignore|bypass|override|reveal).*?(?:safety|system|instruction|prompt)|(?:password|api\s*key|secret|phone\s*number|home\s*address|phish|steal|spy|malware|ransomware|powershell|eval\s*\(|exec\s*\(|sudo|fetch\s*\(|https?:\/\/|javascript:|rm\s+-rf|send\s+(?:a\s+)?message)/i.test(s);
export function validateForgeGoal(goal){
 if(typeof goal!=='string'||goal.trim().length<12||goal.length>300)return 'Describe one learning or creative capability in 12–300 characters.';
 if(!safeText(goal)||/(?:install (?:an? )?(?:app|package)|write to (?:github|repository)|remove files|system command|external api|message strangers|track someone)/i.test(goal))return 'This skill requests unsupported access or unsafe instructions.';
 return null;
}
export function parseForgeManifest(text){
 if(typeof text!=='string'||text.length>9000)return null;
 let m;try{const raw=text.trim();const f=raw.match(/^\x60{3}(?:json)?\s*([\s\S]*?)\s*\x60{3}$/i);m=JSON.parse(f?f[1]:raw)}catch{return null}
 if(!m||typeof m!=='object'||Array.isArray(m)||Object.keys(m).sort().join(',')!=='blueprint,mode,name,purpose,sample,steps,triggers')return null;
 if(validateSkillInput(m)||!safeText(m.name)||!safeText(m.purpose))return null;
 if(typeof m.sample!=='string'||m.sample.length<12||m.sample.length>150||!safeText(m.sample))return null;
 if(!Array.isArray(m.triggers)||m.triggers.length<2||m.triggers.length>4||new Set(m.triggers.map(x=>x.toLowerCase())).size!==m.triggers.length)return null;
 if(!m.triggers.every(t=>typeof t==='string'&&t.length>=10&&t.length<=75&&t.trim().split(/\s+/).length>=2&&safeText(t)))return null;
 if(!Array.isArray(m.steps)||m.steps.length<2||m.steps.length>5)return null;
 const types=['explain','example','question','feedback','challenge'];
 if(!m.steps.every(s=>s&&typeof s==='object'&&!Array.isArray(s)&&Object.keys(s).sort().join(',')==='instruction,kind'&&types.includes(s.kind)&&typeof s.instruction==='string'&&s.instruction.length>=12&&s.instruction.length<=170&&safeText(s.instruction)))return null;
 if(!m.steps.some(s=>['question','challenge','example'].includes(s.kind)))return null;
 return m;
}
export function dryRunForge(manifest){
 if(!manifest||!parseForgeManifest(JSON.stringify(manifest)))return {pass:false,checks:0,reason:'Manifest does not pass static preflight'};
 const checks=manifest.steps.length+manifest.triggers.length+3;
 return {pass:true,checks,reason:'Schema, step patterns and trigger preflight passed (not live model execution)'};
}
