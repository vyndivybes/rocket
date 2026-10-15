// Saathi Action Gateway V1: real, user-initiated actions in the hosted companion.
// Native web actions work on any learner device. Local OS actions require a separate
// installed per-device helper and must never be marked executed from Cloudflare.
export const toolCatalog=Object.freeze([
 {id:'nasa',name:'NASA flight science',url:'https://www1.grc.nasa.gov/',aliases:['nasa','nasa website','nasa site','nasa flight science']},
 {id:'ncert',name:'NCERT textbooks',url:'https://ncert.nic.in/',aliases:['ncert','my ncert textbooks','ncert textbooks','ncert website','ncert website textbooks']},
 {id:'cbse',name:'CBSE Academic',url:'https://cbseacademic.nic.in/',aliases:['cbse','cbse website','cbse syllabus','cbse academic','cbse academic website']},
 {id:'khan',name:'Khan Academy',url:'https://www.khanacademy.org/',aliases:['khan academy','khan academy website']},
 {id:'wiki',name:'Wikipedia',url:'https://en.wikipedia.org/',aliases:['wikipedia','wikipedia website']}
]);
export function detectBrahmaAction(input){
 if(typeof input!=='string'||input.length>750)return null;
 let q=input.trim().replace(/^(?:(?:hey|hi)[, ]+)?(?:saathi|jarvis)[,!: ]+/i,'').trim();
 if(!q)return null;
 const local=/^(?:(?:please )?(?:control|use|operate) my (?:computer|laptop|windows)|(?:open|start) (?:the |my )?(?:local companion|desktop assistant))(?:[.!?])?$/i;
 if(local.test(q))return {kind:'device-handoff',status:'SETUP_REQUIRED',label:'Connect a local device',url:null,notice:'Device actions require installing the separate Saathi Local Companion on this laptop. This web page cannot control your computer.'};
 const open=q.match(/^(?:(?:please )?(?:open|show|take me to|launch) (?:the )?)(.+?)[.!?]?$/i);
 if(open){
  const key=open[1].trim().replace(/[.!?]$/,'').toLowerCase();
  const match=toolCatalog.find(t=>t.aliases.includes(key));
  if(!match)return null;
  return {kind:'open-url',status:'ACTION_READY',label:'Open '+match.name,url:match.url,notice:'Saathi found a supported educational source. This webpage has not been opened yet; use the Open link to proceed.'};
 }
 const search=q.match(/^(?:(?:please )?(?:search (?:the )?(?:web|internet) for|search for|google|look up online|research online))\s+(.+)$/i);
 if(search){
  const subject=search[1].trim().replace(/[.!?]$/,'');
  if(subject.length<4||subject.length>150||/[\u0000-\u001f<>\\]/.test(subject))return null;
  const url='https://www.google.com/search?q='+encodeURIComponent(subject);
  return {kind:'web-search',status:'ACTION_READY',label:'Search: '+subject.slice(0,90),url,notice:'The search link is ready. Results have not been read or verified by Saathi. Open the link to view them.'};
 }
 return null;
}
export function buildAgentReceipt(result){
 if(!result||!['open-url','web-search','device-handoff'].includes(result.kind))throw Error('Unsupported action');
 return {status:result.status,kind:result.kind,label:result.label,notice:result.notice,url:typeof result.url==='string'&&result.url.startsWith('https://')?result.url:null,executed:false,source:'SAATHI_ACTION_GATEWAY_V1'};
}
