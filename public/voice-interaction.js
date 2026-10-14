// Explicitly initiated, one-shot learner speech capture. No remote calls, wake
// monitoring, persistence, automatic task submission, or background microphone.
export function createVoiceCapture({
 RecognitionClass,language='en-IN',maxLength=1600,
 onDraft=()=>{},onFinal=()=>{},onState=()=>{},onError=()=>{}
}={}) {
 let active=null;
 function clear(current){
  if(active!==current)return false;
  active=null;
  return true;
 }
 function stop(){
  const current=active;
  if(!current)return false;
  clear(current); // disarm BEFORE abort; late browser callbacks are ignored.
  try{current.abort?.()}catch{}
  onState('STOPPED');
  return true;
 }
 function start(){
  if(active||typeof RecognitionClass!=='function')return false;
  let current;
  try{
   current=new RecognitionClass();
   current.lang=language;
   current.continuous=false;
   current.interimResults=true;
   current.maxAlternatives=1;
   current.onresult=event=>{
    if(active!==current)return;
    const results=event?.results;
    if(!results||typeof results.length!=='number')return;
    let final='',interim='';
    for(let i=0;i<results.length;i++){
     const phrase=typeof results[i]?.[0]?.transcript==='string'
      ?results[i][0].transcript.trim():'';
     if(results[i]?.isFinal===true)final+=(final?' ':'')+phrase;
     else interim+=(interim?' ':'')+phrase;
    }
    if(final.trim()){
     const text=final.trim().slice(0,maxLength);
     clear(current);
     try{current.stop?.()}catch{}
     onState('HEARD');
     onFinal(text);
    }else if(interim.trim())onDraft(interim.trim().slice(0,maxLength));
   };
   current.onerror=e=>{
    if(!clear(current))return;
    const denied=['not-allowed','service-not-allowed'].includes(e?.error);
    onError(denied?'MIC_PERMISSION_DENIED':'SPEECH_UNAVAILABLE');
    onState('ERROR');
   };
   current.onend=()=>{if(clear(current))onState('STOPPED')};
   active=current;
   current.start();
   onState('LISTENING');
   return true;
  }catch{
   if(current)clear(current);
   onError('MIC_START_FAILED');
   onState('ERROR');
   return false;
  }
 }
 return Object.freeze({start,stop,isListening:()=>active!==null});
}

// Acknowledgements describe observed state, never imagined execution success.
export function voiceAcknowledgement(stage,{answerReady=false}={}){
 if(stage==='HEARD')return 'I heard you. Please review the question before sending it.';
 if(stage==='WORKING')return 'I am checking your question now.';
 if(stage==='ANSWER_READY'&&answerReady)return 'I have a reply. Please check important facts.';
 return '';
}
