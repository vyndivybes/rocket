// Opt-in research on user-selected source URLs. Server still verifies allowed educational hosts.
export function parseResearchCommand(text){
 if(typeof text!=='string'||text.length>1200)return null;
 const m=text.trim().match(/^(?:research|read and explain|study this page)\s+(https:\/\/[^\s]+)\s+(?:about|for|and explain|question:)\s+(.+)$/i);
 if(!m||m[2].trim().length<6||m[2].length>700)return null;
 try{const u=new URL(m[1]);if(u.protocol!=='https:'||u.username||u.password||u.port)return null;return {url:u.href,question:m[2].trim()}}catch{return null}
}
const escapeText=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function buildStudyDocument({title,question,answer,sourceUrl,asOf=new Date().toISOString().slice(0,10)}){
 const lines=String(answer||'').slice(0,12000).split(/\n+/).filter(Boolean);
 return '<!doctype html><html lang="en"><head><meta charset="utf-8"><title>'+escapeText(title||'Saathi study brief')+'</title><style>body{font:16px/1.6 Arial,sans-serif;max-width:850px;margin:auto;padding:32px;color:#23303b}h1{font-size:28px}p{margin:10px 0}.source{color:#566779;font-size:12px;border-top:1px solid #aaa;padding-top:18px}@media print{body{padding:0}}</style></head><body><h1>'+escapeText(title||'Saathi study brief')+'</h1><p><strong>Question:</strong> '+escapeText(question)+'</p>'+lines.map(x=>'<p>'+escapeText(x)+'</p>').join('')+'<p class="source">Prepared '+escapeText(asOf)+'. Source: '+escapeText(sourceUrl||'Learner-supplied material')+'. AI explanation is not independently certified. Verify source facts.</p></body></html>';
}
