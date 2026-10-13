// Adapted from the owned VAOS source: apps/web/lib/voice-readback.mjs (vyndivybes/vaos).
// Only local browser speech synthesis; never reads VAOS business data or credentials.
export function splitVoiceText(value,max=180){
 if(typeof value!=='string'||!value.trim()||value.length>5000)return [];
 const parts=[];let rest=value.replace(/\s+/g,' ').trim();
 while(rest.length>max){
  const i=rest.lastIndexOf(' ',max);
  const cut=i<Math.floor(max/2)?max:i;
  parts.push(rest.slice(0,cut).trim());
  rest=rest.slice(cut).trim();
 }
 if(rest)parts.push(rest);
 return parts.slice(0,24);
}
export function createVoiceReadback({synthesis,UtteranceClass,language=()=> 'en-IN',onState=()=>{},onError=()=>{},schedule=(fn,delay)=>setTimeout(fn,delay),clear=id=>clearTimeout(id)}={}){
 let active=null,generation=0;
 const ready=()=>typeof synthesis?.speak==='function'&&typeof synthesis?.cancel==='function'&&typeof UtteranceClass==='function';
 const clearTimer=st=>{if(st?.timer!=null){clear(st.timer);st.timer=null}};
 function cancel(){generation++;const prev=active;active=null;clearTimer(prev);if(prev)try{synthesis?.cancel()}catch{}}
 function finish(st,event,code){if(active!==st)return;active=null;generation++;clearTimer(st);if(event==='ERROR'){try{synthesis?.cancel()}catch{};onError(code||'SPEECH_ERROR')}onState(event)}
 function speak(text){cancel();if(!ready()){onError('SPEECH_UNAVAILABLE');return false}const chunks=splitVoiceText(text);if(!chunks.length){onError('SPEECH_TEXT_INVALID');return false}
 const st={chunks,index:0,started:false,timer:null};active=st;
 function next(){
  if(active!==st)return;
  if(st.index>=st.chunks.length){finish(st,'FINISHED');return}
  let utterance;
  try{
   utterance=new UtteranceClass(st.chunks[st.index]);
   const lang=language();utterance.lang=['en-US','en-IN','ta-IN','ml-IN','hi-IN'].includes(lang)?lang:'en-IN';utterance.rate=1;
   utterance.onstart=()=>{if(active!==st)return;st.started=true;clearTimer(st);onState('SPEAKING')};
   utterance.onend=()=>{if(active!==st)return;clearTimer(st);st.index++;st.started=false;next()};
   utterance.onerror=e=>finish(st,'ERROR','SPEECH_'+String(e?.error||'error').replace(/[^a-z0-9_-]/gi,'').toUpperCase());
   st.timer=schedule(()=>{if(active===st&&!st.started)finish(st,'ERROR','SPEECH_NOT_STARTED')},5000);
   synthesis.speak(utterance);if(active===st)onState('QUEUED');
  }catch{finish(st,'ERROR','SPEECH_UNAVAILABLE')}
 }
 next();return active!==null;
 }
 return Object.freeze({speak,cancel,active:()=>active!==null});
}
