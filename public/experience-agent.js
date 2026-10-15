import {youtubeIntent} from './youtube-discovery.js';
import {detectBrahmaAction} from './brahma-actions.js';
import {buildLoginBriefing} from './live-briefing.js';
import {parseScheduleIntent,proactiveSearchHint,skillUpgradeIntent} from './saathi-orchestrator.js';
const root=document.querySelector('#saathi-experience'),form=document.querySelector('#saathi-command-form'),field=document.querySelector('#saathi-command'),mic=document.querySelector('#saathi-mic'),send=document.querySelector('#saathi-send'),answer=document.querySelector('#saathi-answer'),media=document.querySelector('#saathi-media'),alert=document.querySelector('#saathi-alert'),phase=document.querySelector('#saathi-phase');
let user=null,recognition=null,speaking=null,busy=false,mode='companion',lastTopic='',active=true;
let sessionTurns=[],pendingAction=null,conversationEnabled=false,sessionVoice=false,stopRequested=false;
const pendingConfirm=document.getElementById('saathi-confirm');
function setPhase(p){phase.textContent='SAATHI '+p;root.querySelector('.conversation').dataset.phase=p;root.dispatchEvent(new CustomEvent('saathi:phase',{detail:p}))}
function report(text){answer.replaceChildren();const p=document.createElement('p');p.textContent=String(text).slice(0,11000);answer.append(p);answer.scrollTop=0}
function clearMedia(){media.replaceChildren()}
async function recordTurn(question,response){
 sessionTurns.push({role:'student',text:question},{role:'saathi',text:response});sessionTurns=sessionTurns.slice(-40);
 try{await api('dialogue',{action:'append',turns:[{role:'student',text:question.slice(0,3000)},{role:'saathi',text:String(response).slice(0,3000)}]});alert.textContent='Conversation saved privately.'}
 catch{alert.textContent='Conversation could not be saved. This turn remains in this tab only.'}
}
async function restoreDialogue(){
 try{const result=await api('dialogue');sessionTurns=(result.turns||[]).filter(t=>['student','saathi'].includes(t.role)).slice(-40);if(sessionTurns.length){alert.textContent='Previous conversation restored. Ask me to continue.'}}
 catch{alert.textContent='Conversation history unavailable until storage is provisioned.'}
}
function actionButton(label,onClick){const b=document.createElement('button');b.type='button';b.textContent=label;b.addEventListener('click',onClick,{once:true});media.append(b)}
function link(text,url){const a=document.createElement('a');a.href=url;a.textContent=text;a.rel='noopener noreferrer';a.target='_blank';media.append(a);return a}
async function api(path,body){const res=await fetch('/api/'+path,{method:body?'POST':'GET',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined});const data=await res.json().catch(()=>({}));if(!res.ok)throw Error(data.error||'Saathi service unavailable');return data}
let welcomeData=null,weatherData=null;
async function welcome(){
 try{
  const [schedule,tasks]=await Promise.allSettled([api('schedule'),api('tasks')]);
  welcomeData={username:user.username,schedule:schedule.status==='fulfilled'?schedule.value.items:[],tasks:tasks.status==='fulfilled'?tasks.value.tasks:[],weather:weatherData};
  const briefing=buildLoginBriefing(welcomeData);
  report(briefing.text);setPhase('READY');
  alert.textContent='Your daily briefing is ready. Select Hear my briefing to enable voice.';
 }catch{report('Welcome back. Your daily schedule is temporarily unavailable. You can still ask me anything.');setPhase('READY')}
}
try{user=await api('me');if(user.role!=='student')throw Error('This immersive learning space is available to learner accounts only.');setPhase('WORKING');await welcome();await restoreDialogue()}catch(err){report(err.message+' Sign in using the study workspace first.');link('Sign in ↗','/?workspace=1');setPhase('LOGIN REQUIRED');field.disabled=true;send.disabled=true;mic.disabled=true}
function say(text){try{if(!window.speechSynthesis||!window.SpeechSynthesisUtterance)return;window.speechSynthesis.cancel();const utter=new SpeechSynthesisUtterance(String(text).slice(0,650));utter.lang='en-IN';utter.rate=.95;utter.onend=()=>{if(conversationEnabled&&active&&!busy)setTimeout(()=>beginListening(),300)};window.speechSynthesis.speak(utter);speaking=utter}catch{}}
document.getElementById('saathi-brief-voice').addEventListener('click',()=>{if(!welcomeData)return;say(buildLoginBriefing({...welcomeData,weather:weatherData}).text);setPhase('SPEAKING');});
document.getElementById('saathi-weather-request').addEventListener('click',()=>{
 if(!navigator.geolocation){alert.textContent='Location is not available in this browser.';return}
 alert.textContent='Requesting location permission for this weather briefing…';
 navigator.geolocation.getCurrentPosition(async p=>{
  try{
   weatherData=await api('live-weather',{latitude:p.coords.latitude,longitude:p.coords.longitude});
   if(welcomeData){welcomeData.weather=weatherData;report(buildLoginBriefing(welcomeData).text);alert.textContent='Weather updated. Select Hear my briefing to listen.'}
  }catch(err){alert.textContent=err.message}
 },()=>{alert.textContent='Location not shared. Saathi will continue without weather.'},{enableHighAccuracy:false,timeout:9500,maximumAge:600000});
});
function addVideos(videos){for(const v of videos){const b=document.createElement('button');b.textContent='▶ '+v.title.slice(0,75);b.type='button';b.addEventListener('click',()=>{media.querySelector('iframe')?.remove();const f=document.createElement('iframe');f.src=v.embedUrl;f.title=v.title;f.loading='lazy';f.allow='encrypted-media;picture-in-picture';f.allowFullscreen=true;media.append(f)});media.append(b)}}
async function command(text){const q=String(text||'').trim();if(q.length<3||busy)return;busy=true;send.disabled=true;field.value='';clearMedia();setPhase('WORKING');report('Working on your request…');
try{
 if(/^(?:stop|stop conversation|end conversation|goodbye|stop listening)$/i.test(q)){
  stopConversation();report('Conversation stopped. Your saved history remains private, and you can restart any time.');setPhase('STOPPED');return;
 }
 if(/^(?:clear|erase|delete) (?:my )?(?:chat history|conversation history)$/i.test(q)){
  pendingAction={kind:'erase-history'};report('Delete your saved conversation history permanently? Please confirm.');actionButton('Yes, erase my history',async()=>{try{await api('dialogue',{action:'clear'});sessionTurns=[];report('Saved conversation history erased.')}catch(e){report(e.message)}});actionButton('Cancel',()=>{pendingAction=null;report('No history was deleted.')});setPhase('READY');return;
 }
 const scheduleIntent=parseScheduleIntent(q);
 if(scheduleIntent){pendingAction={kind:'schedule',payload:scheduleIntent};report('I understood: '+scheduleIntent.title+' at '+scheduleIntent.time+'. Repeat days: '+scheduleIntent.days.join(', ')+'. Shall I save this to your real schedule?');actionButton('Save reminder',async()=>{try{setPhase('WORKING');await api('schedule',scheduleIntent);report('Saved: '+scheduleIntent.title+' at '+scheduleIntent.time+'. This is in your schedule. Delivery outside the app depends on notification permissions.');await recordTurn(q,'Reminder saved to schedule.');setPhase('READY')}catch(e){report('Unable to save: '+e.message);setPhase('ERROR')}finally{pendingAction=null}});actionButton('Cancel',()=>{pendingAction=null;report('Reminder was not saved.')});return}
 const upgrade=skillUpgradeIntent(q);
 if(upgrade){report('I can design a sandboxed learner skill for '+upgrade+'. I will generate and validate a teaching plan; I cannot silently rewrite the core application.');setPhase('WORKING');try{const result=await api('auto-forge',{action:'forge',goal:upgrade});report('Skill generation result: '+(result.notice||result.skill?.name||'Draft created')+'. You can review the new personal skill in All tools.');link('Review your skill ↗','/mission.html');await recordTurn(q,'Personal skill forge requested.')}catch(e){report('Skill creation could not be completed: '+e.message)}setPhase('READY');return}
 const video=youtubeIntent(q);
 if(video){lastTopic=video.topic;const out=await api('youtube-search',{query:video.topic});report(out.videos.length?'Here are video lessons related to '+video.topic+'. Choose one to play. I can explain the topic as well.':'I could not find suitable educational videos. Ask me to explain the topic instead.');addVideos(out.videos)}
 else{
  const action=detectBrahmaAction(q);
  if(action?.url){report(action.notice);link(action.label+' ↗',action.url)}
  else if(action?.kind==='device-handoff'){report(action.notice);link('Device setup and specialist tools ↗','/mission.html')}
  else{
   const response=await api('ask',{question:q,mode});
   report(response.answer||'I could not produce an explanation. Please try asking differently.');
   if(/\b(?:aircraft|aerodynamics|lift|wing|aviation|plane|flight)\b/i.test(q)){link('Explore the aircraft parts above ↗','#saathi-stage')}
   if(/\b(?:schedule|reminder|study plan|planner)\b/i.test(q)){link('Open your saved study planner ↗','/')}
   if(/\b(?:draw|sketch|paint|artwork|art studio)\b/i.test(q)){link('Open creative studio ↗','/mission.html')}
   if(/\b(?:video|animation|visual explanation)\b/i.test(q)){const btn=document.createElement('button');btn.textContent='Find an educational video';btn.type='button';btn.addEventListener('click',()=>command('find video explaining '+q));media.append(btn)}
  }
 }
 const responseText=answer.textContent||'';
 await recordTurn(q,responseText);
 if(!video){const suggestion=proactiveSearchHint(q,responseText);if(suggestion){actionButton('Find YouTube lessons',()=>command('find video explaining '+suggestion.topic));actionButton('Search Google',()=>{clearMedia();link('Open Google search ↗','https://www.google.com/search?q='+encodeURIComponent(suggestion.topic))});alert.textContent=suggestion.label}}
 setPhase('READY');
}catch(err){report(err.message+'. Your existing lessons remain accessible.');setPhase('ERROR')}
finally{busy=false;send.disabled=false;field.focus({preventScroll:true})}
}
form.addEventListener('submit',e=>{e.preventDefault();command(field.value)});
const liveButton=document.getElementById('saathi-live-conversation');
function stopConversation(){
 conversationEnabled=false;liveButton.setAttribute('aria-pressed','false');liveButton.textContent='Start conversation';
 try{recognition?.abort()}catch{}window.speechSynthesis?.cancel();setPhase('STOPPED');
 alert.textContent='Voice conversation stopped. Type or press Start conversation to resume.';
}
function beginListening(){
 if(!conversationEnabled||!active||busy||!Recognition)return;
 if(recognition)return;
 mic.click();
}
liveButton.addEventListener('click',()=>{
 if(conversationEnabled){stopConversation();return}
 if(!Recognition){alert.textContent='Continuous speech recognition is not supported on this browser. Use typing.';return}
 conversationEnabled=true;liveButton.setAttribute('aria-pressed','true');liveButton.textContent='Stop conversation';
 beginListening();
});

const Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;
if(!Recognition){mic.title='Speech recognition is not supported here. Type instead.';mic.disabled=true;}
else mic.addEventListener('click',()=>{
 if(recognition){recognition.stop();return}
 try{
  const r=new Recognition();recognition=r;r.lang='en-IN';r.interimResults=true;r.continuous=false;
  let finalText='';
  r.onstart=()=>{setPhase('LISTENING');mic.setAttribute('aria-pressed','true');alert.textContent='Microphone listening—tap again to stop'};
  r.onresult=e=>{let draft='';for(let i=0;i<e.results.length;i++){draft+=e.results[i][0].transcript+' ';if(e.results[i].isFinal)finalText+=e.results[i][0].transcript+' '}field.value=draft.trim()};
  r.onerror=e=>{alert.textContent='Voice unavailable ('+e.error+'). Type your question.';setPhase('READY')};
  r.onend=()=>{recognition=null;mic.setAttribute('aria-pressed','false');alert.textContent='';if(finalText.trim().length>2){command(finalText.trim()).then(()=>{if(conversationEnabled&&active){say(answer.textContent||'How can I help?')}})}else{setPhase('READY');if(conversationEnabled&&active)setTimeout(beginListening,400)}};
  r.start();
 }catch{recognition=null;alert.textContent='Microphone unavailable. Use typing.'}
});
document.querySelector('#saathi-stop').addEventListener('click',()=>{stopConversation()});
root.addEventListener('saathi:part',e=>{const part=e.detail.part;if(busy||field.disabled)return;field.value='Explain the '+part+' of an aircraft with a real-world physics example';field.focus({preventScroll:true});alert.textContent='Aircraft component selected. Press send or speak to study it.'});
window.addEventListener('pagehide',()=>{active=false;recognition?.abort();window.speechSynthesis?.cancel()},{once:true});
