// Trusted smoke probe runs inside the same opaque-origin frame as the learner's app.
// It communicates only a bounded diagnostic to the parent; it cannot expose cookies.
export function makeProbeScript(token){
 if(typeof token!=='string'||!/^[a-zA-Z0-9-]{6,65}$/.test(token))throw Error('Invalid probe identity');
 const payload=JSON.stringify(token);
 return '<script>(function(){const token='+payload+';let errors=[];window.addEventListener("error",e=>{errors.push(String(e.message||"runtime error").slice(0,180))});window.addEventListener("unhandledrejection",()=>{errors.push("unhandled rejection")});window.addEventListener("load",()=>{setTimeout(()=>{const nodes=document.body.querySelectorAll("*").length;parent.postMessage({type:"SAATHI_CRUCIBLE_V1",token,ok:errors.length===0&&nodes>0,errorCount:Math.min(errors.length,10),nodeCount:Math.min(nodes,500),detail:errors[0]||""},"*")},120)});})();</script>';
}
export function parseProbeMessage(event,{token,source}){
 const d=event?.data;
 if(event?.source!==source||!d||d.type!=='SAATHI_CRUCIBLE_V1'||d.token!==token||typeof d.ok!=='boolean'||!Number.isInteger(d.errorCount)||d.errorCount<0||d.errorCount>10||!Number.isInteger(d.nodeCount)||d.nodeCount<0||d.nodeCount>500)return null;
 return {ok:d.ok,errorCount:d.errorCount,nodeCount:d.nodeCount,detail:typeof d.detail==='string'?d.detail.slice(0,180):''};
}
export function runProbe(id,{document=globalThis.document,window=globalThis.window,timeoutMs=5000}={}){
 if(typeof id!=='string'||id.length>100)throw Error('Invalid project');
 const token=globalThis.crypto.randomUUID();const frame=document.createElement('iframe');
 frame.setAttribute('sandbox','allow-scripts');frame.style.cssText='position:absolute;width:1px;height:1px;opacity:0;pointer-events:none';frame.title='Isolated project smoke test';frame.src='/api/builder-preview?id='+encodeURIComponent(id)+'&probe='+encodeURIComponent(token);
 return new Promise(resolve=>{
  let finished=false;
  const finish=result=>{if(finished)return;finished=true;window.removeEventListener('message',onMessage);clearTimeout(timer);frame.remove();resolve(result)};
  const onMessage=event=>{const r=parseProbeMessage(event,{token,source:frame.contentWindow});if(r)finish(r)};
  window.addEventListener('message',onMessage);
  const timer=setTimeout(()=>finish({ok:false,errorCount:1,nodeCount:0,detail:'Preview did not report a successful load'}),timeoutMs);
  frame.onerror=()=>finish({ok:false,errorCount:1,nodeCount:0,detail:'Preview could not load'});
  document.body.appendChild(frame);
 });
}
