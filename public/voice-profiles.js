// Cross-platform Web Speech voice profiles. Voices depend on operating system/browser.
// 'Cinematic' is an original voice style, not an impersonation of an actor.
export const VOICE_PRESETS=Object.freeze([
 {id:'cinematic',label:'Cinematic AI · default',rate:0.9,pitch:0.78},
 {id:'natural',label:'Natural · conversational',rate:1,pitch:1},
 {id:'warm',label:'Warm · friendly',rate:0.96,pitch:1.08},
 {id:'clear',label:'Clear · study mode',rate:0.86,pitch:1}
]);
export function voiceSettings(preference={}){
 const p=VOICE_PRESETS.find(x=>x.id===preference.preset)||VOICE_PRESETS[0];
 const bounded=(v,min,max,def)=>Number.isFinite(Number(v))?Math.max(min,Math.min(max,Number(v))):def;
 return {rate:bounded(preference.rate,0.7,1.3,p.rate),pitch:bounded(preference.pitch,0.5,1.4,p.pitch),lang:'en-GB'};
}
export function chooseVoice(voices,preference={}){
 if(!Array.isArray(voices)||!voices.length)return null;
 if(typeof preference.voiceName==='string'){
  const match=voices.find(v=>v.name===preference.voiceName);
  if(match)return match;
 }
 const english=voices.filter(v=>/^en(?:-|$)/i.test(v.lang||''));
 if(!english.length)return voices.find(v=>v.default)||voices[0];
 if(preference.preset==='warm'||preference.preset==='natural')return english.find(v=>v.default)||english[0];
 const scored=english.map((v,i)=>{
  const name=(v.name||'').toLowerCase();let score=0;
  if(/male|daniel|george|ryan|oliver|arthur|brian|david|thomas/i.test(name))score+=12;
  if(/en-gb|en-au/i.test(v.lang||''))score+=4;
  if(/natural|neural|enhanced|premium/i.test(name))score+=2;
  if(v.default)score+=1;
  return {v,score,i};
 }).sort((a,b)=>b.score-a.score||a.i-b.i);
 return scored[0]?.v||english[0];
}
