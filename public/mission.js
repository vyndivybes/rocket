import {buildCalendar} from './calendar-export.js';
import {renderStudioScenes} from './studio-scenes.js';
import {attachImmersiveScene} from './immersive-scene.js';
import {validateCoreSkills} from './core-skills.js';
import {matchVoiceCommand} from './voice-commands.js';
import {createSketchState} from './sketch-state.js';
import {buildDailyBrief} from './daily-brief.js';
import {renderWelcomeScene} from './welcome-display.js';
import {composeWelcomeReport,voicePhaseLabel} from './briefing-experience.js';
import {detectForgeIntent,matchForgedSkill,assembleForgedPrompt} from './forged-skill-engine.js';
import {detectStudyLinkQuestion} from './link-intent.js';
import {stripCompanionCall,DEFAULT_COMPANION_NAME} from './companion-name.js';
import {answerPersonalRequest} from './personal-requests.js';
import {routeCompanionSkill} from './companion-skill-router.js';
import {draftSkillFromRequest,routeSavedSkillRequest,buildSkillQuestion} from './skill-forge.js';
import {detectBuildRequest,buildSandboxDocument} from './builder-lab.js';
import {detectSaathiUpgradeIntent} from './saathi-upgrades.js';
import {createVoiceReadback} from './voice-readback.js';
import {createVoiceCapture,voiceAcknowledgement} from './voice-interaction.js';
import {createConversationLoop} from './conversation-loop.js';
import {runProbe} from './skill-crucible.js';
import {VOICE_LANGUAGES,normalizeSpeechLocale} from './voice-languages.js';
import {captureVisualFrame} from './visual-capture.js';
import {teamCommand} from './team-command.js';
import {parseResearchCommand,buildStudyDocument} from './research-workflow.js';
import {makeOfficeFile} from './office-export.js';
import {detectBrahmaAction,buildAgentReceipt} from './brahma-actions.js';
import {youtubeIntent} from './youtube-discovery.js';
import {pairLocalCompanion,callLocalCompanion} from './device-bridge.js';
import {detectMediaFile,frameTimeLabel} from './media-file.js';
const root=document.getElementById('mission-root');
attachImmersiveScene({root:document,win:window});
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const state={user:null,tab:'companion',mode:'companion',notes:[],schedule:[],tasks:[],knowledgePacks:[],packId:null,memories:[],linkSource:null,linkUrl:'',linkText:'',linkQuestion:'',linkAnswer:'',linkEvidence:[],answer:'',answerReference:null,mediaFile:null,mediaObjectUrl:null,mediaKind:null,mediaQuestion:'',mediaAnswer:'',mediaTimeLabel:null,visionEnabled:false,adaptivePlan:null,companionName:DEFAULT_COMPANION_NAME,nameConfigured:false,notifications:false,pushStatus:null,welcome:null,seen:new Set(),conversation:[],skills:[],forgeAvailable:false,builds:[],builderAvailable:false,selectedBuild:null,buildVersions:[],forgedSkills:[],voicePhase:'idle',voiceAutoSend:false,voiceLocale:'en-IN',introHidden:false,installedFeatures:[],installedAvailable:false,lastProbe:null,teamReport:null,researchReport:null,coreSkills:[],agentAction:null,youtubeResults:null};
const sketchState=createSketchState();
let micSession=null,voiceReplyRequested=false,spokenReply=null,devicePairToken=null;
const conversationLoop=createConversationLoop({maxTurns:12});
function voiceSpeaker(){
 if(!spokenReply)spokenReply=createVoiceReadback({
  synthesis:window.speechSynthesis,UtteranceClass:window.SpeechSynthesisUtterance,language:()=>normalizeSpeechLocale(state.voiceLocale),
  onError:()=>{conversationLoop.failed();state.voicePhase='error';refreshVoiceDisplay();flash('Browser voice playback is unavailable; the written reply is still visible.')},
  onState:phase=>{if(phase==='FINISHED'&&conversationLoop.speechFinished()){queueMicrotask(()=>{if(conversationLoop.active()&&state.tab==='companion'){startVoiceTurn()}})}state.voicePhase=phase==='SPEAKING'?'speaking':phase==='QUEUED'?'thinking':phase==='ERROR'?'error':'idle';refreshVoiceDisplay()}
 });
 return spokenReply;
}
function announce(text){return voiceSpeaker().speak(text)}
function refreshVoiceDisplay(){
 const orb=document.getElementById('saathi-orb');if(orb){orb.dataset.phase=state.voicePhase;orb.setAttribute('aria-label','Assistant '+voicePhaseLabel(state.voicePhase))}
 const status=document.getElementById('welcome-voice-phase');if(status)status.textContent=voicePhaseLabel(state.voicePhase);
}
function voiceStatus(phase,message){
 state.voicePhase=phase==='working'?'thinking':phase==='answered'?'idle':phase;
 refreshVoiceDisplay();
 const indicator=document.getElementById('saathi-voice-indicator');
 if(indicator){indicator.dataset.phase=phase;const ring=document.createElement('span');ring.className='saathi-voice-ring';ring.setAttribute('aria-hidden','true');indicator.replaceChildren(ring,document.createTextNode(message));}
 const button=document.getElementById('voice');
 if(button)button.textContent=phase==='listening'?'■ Stop listening':'🎙 Speak';
 flash(message);
}

const tabs=[['home','Mission home'],['adaptive','Study priorities'],['companion','Talk to your AI'],['schedule','Scheduler'],['notes','Notes'],['art','Art studio'],['pilot','Pilot academy'],['knowledge','Knowledge packs'],['links','Study links'],['media','My uploads'],['memory','AI memory'],['privacy','My data'],['identity','Name your AI']];
const dayNames=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
async function api(name,data){
 const options={credentials:'same-origin',headers:{'Content-Type':'application/json'}};
 if(data!==undefined){options.method='POST';options.body=JSON.stringify(data)}
 const response=await fetch('/api/'+name,options);let result;try{result=await response.json()}catch{throw Error('Unexpected service response')}
 if(!response.ok)throw Error(result.error||'Request failed');
 return result;
}
function flash(message){const element=document.getElementById('status');if(element)element.textContent=message}
function button(tab,label){return '<button type="button" class="btn secondary" data-tab="'+tab+'">'+label+'</button>'}
function adaptive(){
 const p=state.adaptivePlan;
 if(!p)return '<section class="card"><h2>Study priorities</h2><p>Practice evidence not available. Continue checked foundation lessons.</p></section>';
 return '<section class="card"><h2>Next learning steps</h2><p class="muted">From graded foundation practice only—not an educational diagnosis, predicted marks or school-certified curriculum.</p>'+p.recommendations.map(x=>'<div class="listitem"><div><span class="tag">'+esc(x.status)+'</span><h3>'+esc(x.title)+'</h3><p class="small">'+esc(x.subject)+' · '+Number(x.minutes)+' minutes · '+Number(x.attempts)+' attempts, '+Number(x.correct)+' correct</p><p class="muted">'+esc(x.reason)+'</p></div><div class="actions"><button type="button" class="btn secondary" data-plan-lesson="'+esc(x.lessonId)+'">Review suggested revision schedule</button></div></div>').join('')+'<p class="small">'+esc(p.notice)+'</p><a class="btn secondary" href="/">Open Lessons &amp; practice</a></section>';
}
function developmentHub(){
 return '<details class="card" id="saathi-development-hub"><summary><strong>AI Development Hub</strong> — propose source upgrades & optional device tools</summary><p class="muted">Your personal Skill Forge can build and test features immediately. For changes to the shared Saathi source code, submit an idea for a reviewed GitHub upgrade. You do not need GitHub credentials to propose an idea.</p><form id="core-idea-form"><label class="form-field">What should Saathi learn to do next?<textarea name="idea" required minlength="15" maxlength="600" placeholder="Build a new core cockpit simulator with a simple interactive instrument panel."></textarea></label><button class="btn" type="submit">Save source upgrade proposal</button></form><div class="saathi-devbridge"><h3>Device companion (optional)</h3><p class="small">'+(devicePairToken?'Paired with the local helper on this laptop. Pairing automatically expires after 20 minutes.':'Not paired. Start the local helper on this laptop and enter its displayed code.')+'</p><form id="device-pair-form"><label class="form-field">Local helper pairing code<input type="text" name="code" minlength="6" maxlength="6" inputmode="numeric" pattern="[0-9]{6}" autocomplete="off" required placeholder="Six digits"></label><button class="btn secondary" type="submit">Connect this laptop</button></form><div class="actions"><button type="button" class="btn secondary" id="device-health">Read device status</button><button type="button" class="btn ghost" id="device-disconnect">Disconnect local helper</button></div><p class="small">Install and run the free Node.js local companion on your own Windows computer to open educational websites, search topics, save local notes and view device status. It never starts by itself.</p><a class="btn secondary" href="http://127.0.0.1:31984/" target="_blank" rel="noopener noreferrer">Open my local companion ↗</a><p class="small">If nothing opens, start the helper from your local Saathi repository. Your hosted AI does not have native device-control permission. An optional click-to-run Chrome/Edge extension can also read the current educational tab, highlight phrases or open a selected link. <a href="https://github.com/vyndivybes/rocket/blob/feat/saathi-academic-mvp/local-companion/extension/README.md" target="_blank" rel="noopener noreferrer">How to install browser helper</a>.</p></div></details>';
}

function coreUpgradeCards(){
 const items=state.coreSkills.slice(0,10);
 if(!items.length)return '';
 return '<section class="card core-capability-panel"><div class="row"><div><p class="kicker">BUILT INTO SAATHI</p><h2>Explore your evolving AI</h2></div><span class="tag">'+items.length+' curated abilities</span></div><p class="muted">These are reviewed capabilities added through source-controlled upgrades. Your private Skill Forge creations remain your own.</p><div class="core-capability-grid">'+items.map(item=>'<article class="core-capability-card"><span class="core-capability-symbol" aria-hidden="true">'+(item.category==='aviation'?'✈':item.category==='art'?'✦':item.category==='coding'?'⌘':'◆')+'</span><h3>'+esc(item.title)+'</h3><p>'+esc(item.description)+'</p><button class="btn secondary" type="button" data-core-skill="'+esc(item.id)+'">Try ability →</button></article>').join('')+'</div></section>';
}

function home(){
 const briefing=buildDailyBrief({schedule:state.schedule,tasks:state.tasks});
 const agenda=briefing.todayEvents.slice(0,6).map(x=>'<div class="listitem"><strong>'+esc(x.time)+'</strong><span>'+esc(x.title)+'</span><span class="small">'+Number(x.minutes)+' min</span></div>').join('');
 const overview='<section class="card" style="margin-top:20px"><span class="chip">Today · '+esc(briefing.dateLabel)+'</span><h2 style="margin-top:15px">Your daily briefing</h2><p class="muted">'+esc(briefing.nextStep)+'</p><div class="row"><span class="tag">'+briefing.openTasks+' unfinished study tasks</span><span class="tag">'+briefing.dueToday+' due today</span>'+(briefing.overdue?'<span class="tag">'+briefing.overdue+' past due — adjust if needed</span>':'')+'</div><h3 style="margin-top:21px">Your activity plan</h3>'+(agenda||'<p class="small">Nothing scheduled today. Try a short lesson, art or time outside.</p>')+'<div class="actions"><button class="btn secondary" data-tab="schedule">Edit my schedule</button><a class="btn ghost" href="/">My study tasks</a></div></section>';
 return '<section class="hero saathi-feature-stage" data-immersive><div class="saathi-feature-copy"><span class="tag">YOUR UNIVERSE · YOUR RULES</span><h2 style="font-size:clamp(27px,3vw,43px);line-height:1.15;letter-spacing:-.04em;margin:22px 0">MAKE.<br><span>LEARN.</span><br>TAKE FLIGHT.</h2><p class="sub">One question, one drawing, one game, one great day. Your AI companion is here to help you explore—not tell you who to be.</p><div class="actions">'+button('companion','Talk with '+esc(state.companionName))+button('pilot','Explore aviation')+'</div></div><div class="orb saathi-feature-scene"><div class="orbit">S</div></div><div class="saathi-sticker" aria-hidden="true">IDEAS<br>TAKE<br>FLIGHT</div></section>'+renderStudioScenes('mission')+coreUpgradeCards()+'<div class="tiles"><section class="card"><h2>Flight deck</h2><p class="muted">Discover aircraft, physics, maths and aviation.</p>'+button('pilot','Start flying lessons')+'</section><section class="card"><h2>Creative studio</h2><p class="muted">Sketch, experiment with colour and express your modern-art ideas.</p>'+button('art','Open sketchbook')+'</section><section class="card"><h2>Balanced daily life</h2><p class="muted">'+state.schedule.length+' scheduled activities, including exercise, sport and rest.</p>'+button('schedule','My scheduler')+'</section><section class="card"><h2>Private notebook</h2><p class="muted">'+state.notes.length+' notes. Keep sketches, questions and ideas in writing.</p>'+button('notes','Open notes')+'</section><section class="card wide"><h2>Learn from any study material you can share</h2><p class="muted">Post a supported educational webpage or YouTube link. Saathi can read selected public text pages, or discuss captions you paste from a video. It will show the evidence available instead of inventing video content.</p>'+button('links','Open Study links')+'</section></div>'+overview+installedFeaturesPanel();
}
function brahmaActionPanel(){
 const a=state.agentAction;
 if(!a)return '<section class="saathi-agent-timeline" aria-label="Connected AI capabilities"><span class="saathi-cinema-eyebrow">AGENT SYSTEMS READY</span><p>Saathi can teach, generate and test private learning skills, consult specialist mentors, analyse approved visual inputs, prepare study reports and open selected educational sources.</p><div class="saathi-agent-pills"><span>Skill Forge</span><span>Mentor team</span><span>Vision</span><span>Browser actions</span><span>Voice</span></div></section>';
 return '<section class="saathi-agent-timeline" role="status" aria-live="polite"><span class="saathi-cinema-eyebrow">ACTION RECEIPT · '+esc(a.status)+'</span><h3>'+esc(a.label)+'</h3><p>'+esc(a.notice)+'</p>'+(a.url?'<a class="btn secondary" id="saathi-open-agent-action" href="'+esc(a.url)+'" target="_blank" rel="noopener noreferrer">Open in browser ↗</a>':'<p class="small">The local helper must run separately on the device where you need computer assistance.</p>')+'<p class="small">No account change or external command was executed by Saathi.</p></section>';
}

function youtubeRecommendations(){
 const r=state.youtubeResults;if(!r)return '';
 if(r.error)return '<section class="card" aria-live="polite"><h2>Educational videos</h2><p class="muted">'+esc(r.error)+'</p></section>';
 return '<section class="card saathi-video-reel" aria-label="Recommended educational videos"><div class="row between"><div><span class="chip">YOUTUBE · OPTIONAL</span><h2>Watch and understand</h2><p class="muted">'+esc(r.notice)+'</p></div><button type="button" class="btn secondary" id="youtube-refresh">Find another explanation</button></div><div class="saathi-video-grid">'+r.videos.map(v=>'<article class="saathi-video-card"><img loading="lazy" decoding="async" src="'+esc(v.thumbnail)+'" alt="Video thumbnail for '+esc(v.title)+'"><h3>'+esc(v.title)+'</h3><p class="small">'+esc(v.channel)+'</p><button type="button" class="btn secondary" data-youtube-play="'+esc(v.id)+'">Play in Saathi</button><a href="'+esc(v.url)+'" target="_blank" rel="noopener noreferrer">Open on YouTube ↗</a></article>').join('')+'</div><div id="saathi-video-player" aria-label="Selected YouTube video player"></div><p class="small">Saathi can recommend videos from metadata but cannot verify the spoken teaching without an accessible transcript. Playback may involve YouTube cookies and network traffic.</p></section>';
}
async function findYoutube(topic){
 try{const result=await api('youtube-search',{query:topic});state.youtubeResults=result}
 catch(err){state.youtubeResults={error:err.message,topic};}
}
function companion(){
 const history=state.conversation.slice(0,-1).slice(-12).map(entry=>'<div class="listitem"><div><strong>'+esc(entry.role==='student'?'You':state.companionName)+'</strong><p style="white-space:pre-wrap;overflow-wrap:anywhere">'+esc(entry.text)+'</p></div></div>').join('');
 const modes=[['companion','Companion'],['teacher','Patient teacher'],['planner','Organiser'],['pilot','Pilot mentor'],['artist','Art mentor']];
 return (!state.introHidden?renderWelcomeScene({schedule:state.schedule,tasks:state.tasks,assistant:state.companionName,phase:state.voicePhase,voiceAutoSend:state.voiceAutoSend}):'<button type="button" class="btn ghost" id="show-intro">▶ Open today’s briefing</button>')+installedFeaturesPanel()+coreUpgradeCards()+developmentHub()+brahmaActionPanel()+'<section class="card"><h2>What is on your mind?</h2><div class="modebuttons">'+modes.map(x=>'<button type="button" data-mode="'+x[0]+'" class="'+(state.mode===x[0]?'active':'')+'">'+x[1]+'</button>').join('')+'</div><p class="muted">'+esc(state.companionName)+' is your AI assistant, not a human friend or professional adviser. It can teach and help you save a task, routine, private note or memory after you confirm. Background notifications depend on device readiness. For Maths, Physics, Chemistry or Biology, ask one question at a time and request worked steps. For checked answers, use <a href="/">Lessons &amp; practice</a> in your learning workspace.</p><div class="saathi-voice-indicator" id="saathi-voice-indicator" data-phase="ready" role="status" aria-live="polite"><span aria-hidden="true" class="saathi-voice-ring"></span>Tap Speak to start listening</div><label class="form-field">Voice language<select id="voice-locale" aria-label="Speech recognition and spoken reply language">'+VOICE_LANGUAGES.map(([v,label])=>'<option value="'+v+'" '+(v===state.voiceLocale?'selected':'')+'>'+label+'</option>').join('')+'</select></label><div role="log" aria-label="Recent conversation">'+history+'</div><form id="talk-form"><label class="form-field">Your question or idea<textarea id="question" required minlength="4" maxlength="1600" placeholder="Help me understand Newton’s laws using an aircraft"></textarea></label><label class="form-field">Attach a study image, PDF, Word, PowerPoint or text file<input id="companion-file" type="file" accept=".png,.jpg,.jpeg,.webp,.pdf,.docx,.pptx,.txt,text/plain,image/png,image/jpeg,image/webp,application/pdf"></label><div class="actions"><button class="btn" type="submit" id="ask-button">Ask '+esc(state.companionName)+'</button><button class="btn secondary" id="voice" type="button">🎙 Speak</button><button class="btn secondary" id="conversation-start" type="button">Start voice conversation</button><button class="btn ghost" id="conversation-stop" type="button">Stop conversation</button><button class="btn ghost" type="button" id="speak-answer" '+(state.answer?'':'disabled')+'>Read reply aloud</button><button class="btn secondary" type="button" id="explain-screen">Explain screen</button><button class="btn secondary" type="button" id="explain-camera">Explain camera frame</button></div></form><div class="actions"><button type="button" class="btn secondary" data-memory-draft="1">Save a memory from my question (review first)</button></div><p class="small">Microphone activates only when you press Speak. Partial transcripts are drafts and nothing is submitted until you select Ask; spoken questions can receive a spoken reply. Browser speech recognition may use a vendor service. AI messages are not saved in the app’s database but are sent to Cloudflare Workers AI for processing.</p>'+(state.answer?'<div class="ai-answer" id="answer">'+esc(state.answer)+'</div>'+(state.answerReference?'<p class="small">Related reference: <a href="'+esc(state.answerReference.url)+'" target="_blank" rel="noopener noreferrer">'+esc(state.answerReference.publisher)+' · '+esc(state.answerReference.title)+' ↗</a>. This does not certify the AI answer.</p>':''):'<p class="notice">Try: “What’s my plan today?”, “What should I do next?”, “Why do planes fly?” or “Create a skill called Flight Deck Trainer that quizzes me on cockpit instruments”.</p>')+'</section>'+youtubeRecommendations()+specialistResults()+(state.researchReport?'<section class="card"><h2>Research brief</h2><p>'+esc(state.researchReport.title)+'</p><a href="'+esc(state.researchReport.sourceUrl)+'" target="_blank" rel="noopener noreferrer">Open original educational source</a><div class="actions"><button class="btn secondary" id="export-research-brief" type="button">Export HTML document</button>'+['docx','xlsx','pptx','pdf'].map(ext=>'<button class="btn secondary" type="button" data-export-office="'+ext+'" data-export-scope="research">'+ext.toUpperCase()+'</button>').join('')+'</div></section>':'')+forgePanel()+builderLabPanel();
}

function specialistResults(){
 const r=state.teamReport;if(!r?.specialists?.length)return '';
 return '<section class="card" id="saathi-team-results"><h2>Specialist team · '+esc(r.status)+'</h2><p class="small">'+esc(r.notice)+'</p>'+r.specialists.map(x=>'<details class="listitem" open><summary><strong>'+esc(x.name)+'</strong></summary><p style="white-space:pre-wrap">'+esc(x.answer)+'</p></details>').join('')+'<div class="actions"><button type="button" class="btn secondary" id="export-team-brief">Save team report as HTML</button>'+['docx','xlsx','pptx','pdf'].map(ext=>'<button type="button" class="btn secondary" data-export-office="'+ext+'" data-export-scope="team">'+ext.toUpperCase()+'</button>').join('')+'</div></section>';
}

function forgePanel(){
 const opts=(choices,selected)=>choices.map(x=>'<option value="'+esc(x)+'" '+(selected===x?'selected':'')+'>'+esc(x)+'</option>').join('');
 const cards=state.skills.map(s=>'<div class="listitem"><div><span class="tag">'+esc(s.status)+'</span><h3>'+esc(s.name)+'</h3><p class="small">'+esc(s.purpose)+'</p><p class="small">'+esc(s.blueprint)+' · '+esc(s.mode)+' · revision '+Number(s.revision)+'</p></div><div class="actions"><button class="btn secondary" type="button" data-forge-try="'+esc(s.id)+'">Try</button><button class="btn secondary" type="button" data-forge-edit="'+esc(s.id)+'">Edit</button><button class="btn secondary" type="button" data-forge-status="'+esc(s.id)+'">'+(s.status==='active'?'Pause':'Activate')+'</button><button class="btn warn" type="button" data-forge-delete="'+esc(s.id)+'">Delete</button></div></div>').join('');
 return '<details class="card" id="skill-forge" style="margin-top:16px"><summary><strong>Skill Forge</strong> — create, test and improve your own AI tools ('+state.skills.length+')</summary><p class="muted">Tell your AI to invent its own reusable learning skills: <strong>“Forge a skill for cockpit instrument quizzes”</strong>. Saathi writes a structured teaching plan, checks the manifest and registers it automatically. You can pause or edit skills any time. Skill plans cannot run code, install apps or change your accounts. You can also create a simple manual skill below.</p>'+
 (state.forgeAvailable?'<form id="forge-form"><input name="id" type="hidden"><input name="revision" type="hidden"><label class="form-field">Skill name<input name="name" minlength="3" maxlength="48" required placeholder="Flight Deck Trainer"></label><label class="form-field">What should it help you do?<textarea name="purpose" minlength="12" maxlength="260" required placeholder="Quiz me on cockpit instruments with examples."></textarea></label><div class="row"><label class="form-field">Focus<select name="mode">'+opts(['teacher','pilot','artist','planner','companion'],'teacher')+'</select></label><label class="form-field">Activity<select name="blueprint">'+opts(['quiz','coach','creative','project','explain'],'quiz')+'</select></label></div><div class="actions"><button type="submit" class="btn">Save draft skill</button><button type="reset" class="btn ghost">Clear</button></div></form><h3>Your creations</h3>'+(cards||'<p class="notice">You have not created a skill yet. Start with a quiz, creative project, art coach or aviation learning guide.</p>'):'<p class="notice">Skill Forge storage is not yet available in this preview. The app still supports regular learning.</p>')+'</details>';
}

function installedFeaturesPanel(){
 if(!state.installedAvailable)return '';
 const installed=state.installedFeatures;
 const content=installed.length?installed.map(item=>
  '<article class="saathi-upgrade-module"><div class="saathi-upgrade-heading"><div><h3>'+esc(item.title)+'</h3><p class="small">Your installed extension · revision '+Number(item.revision)+'</p></div><div class="actions"><button type="button" class="btn secondary" data-upgrade-improve="'+esc(item.id)+'">Improve</button><button type="button" class="btn ghost" data-upgrade-remove="'+esc(item.id)+'">Uninstall</button></div></div><iframe sandbox="allow-scripts" loading="lazy" title="'+esc(item.title)+' — learner-created isolated upgrade" src="/api/builder-preview?id='+encodeURIComponent(item.id)+'" class="saathi-upgrade-frame"></iframe></article>'
 ).join(''):'<p class="notice">Your AI is ready to grow. Say: “Saathi, upgrade yourself with an interactive cockpit quiz.” Your first feature can then appear right here.</p>';
 return '<section class="card saathi-installed" id="installed-upgrades"><div class="saathi-upgrades-head"><h2>My Saathi upgrades</h2><span class="tag">'+installed.length+' / 3 installed</span></div><p class="muted">These are real, reusable additions to your Saathi screen. You can build, change and uninstall them. They run in an isolated browser sandbox and never receive private account data or rewrite the main AI model.</p>'+content+'</section>';
}

function builderLabPanel(){
 const items=state.builds.map(p=>'<div class="listitem"><div><h3>'+esc(p.title)+'</h3><p class="small">'+esc(p.description)+'</p><p class="small">Version '+Number(p.revision)+' · Private experiment</p></div><div class="actions"><button class="btn secondary" data-build-view="'+esc(p.id)+'" type="button">Preview & improve</button><button class="btn warn" data-build-delete="'+esc(p.id)+'" type="button">Delete</button></div></div>').join('');
 const current=state.selectedBuild;
 const versions=state.buildVersions.filter(v=>Number(v.revision)<Number(current?.revision)).map(v=>'<button class="btn secondary" type="button" data-build-restore="'+Number(v.revision)+'">Restore version '+Number(v.revision)+'</button>').join('');
 const view=current?'<h3>Your prototype: '+esc(current.title)+'</h3>'+(state.lastProbe?.id===current.id?'<p class="notice">Smoke test: '+(state.lastProbe.ok?'PASS':'FAIL')+' — '+esc(state.lastProbe.detail||'Loaded without reported JavaScript errors')+'</p>':'')+'<p class="small">This is untrusted generated code, isolated from Saathi. Version '+Number(current.revision)+'. It cannot use your accounts, internet or Saathi data.</p><iframe sandbox="allow-scripts" loading="lazy" title="Isolated learner project" style="display:block;width:100%;min-height:310px;border:1px solid #8a9bab;border-radius:12px;background:white" src="/api/builder-preview?id='+encodeURIComponent(current.id)+'"></iframe><form id="builder-revise-form"><label class="form-field">Improve this prototype<textarea name="prompt" required minlength="12" maxlength="600" placeholder="Add a score counter and clearer feedback."></textarea></label><div class="actions"><button type="submit" class="btn secondary">Build improved version</button><button type="button" class="btn secondary" data-build-test="'+esc(current.id)+'">Test this version</button><button type="button" class="btn ghost" data-build-export="'+esc(current.id)+'">Export source JSON</button><button type="button" class="btn secondary" data-upgrade-install="'+esc(current.id)+'">'+(state.installedFeatures.some(x=>x.id===current.id)?'Already in Saathi':'Install in Saathi')+'</button></div></form><details><summary>Inspect generated code</summary><pre style="white-space:pre-wrap;overflow-wrap:anywhere;max-height:340px;overflow:auto">'+esc(JSON.stringify({html:current.html,css:current.css,js:current.js},null,2))+'</pre></details>'+(versions?'<p class="small">Previous saved versions</p><div class="actions">'+versions+'</div>':''):'<p class="notice">Create an interactive experiment or select a saved project to preview it.</p>';
 return '<section class="card" id="builder-lab" style="margin-top:16px"><h2>Build & Upgrade Lab</h2><p class="muted">Use your AI to make interactive quizzes, creative tools, games and simulations. Preview them safely, then choose <strong>Install in Saathi</strong> to add them to your assistant screen. You can revise or remove them any time. Generated code never accesses your private accounts or changes the underlying application source.</p>'+
 (state.builderAvailable?'<form id="builder-new-form"><label class="form-field">What do you want to invent?<textarea name="prompt" required minlength="12" maxlength="600" placeholder="Build an interactive aircraft cockpit instrument quiz."></textarea></label><button class="btn" type="submit">Generate prototype</button></form><h3>My projects ('+state.builds.length+'/8)</h3>'+(items||'<p class="small">No creations yet. Your first project starts with an idea.</p>')+view:'<p class="notice">Builder storage is not yet available in this preview. Existing Skill Forge remains usable.</p>')+'</section>';
}

function schedule(){
 const list=state.schedule.map(s=>'<div class="listitem"><div><h3>'+esc(s.title)+(s.enabled?'':' (paused)')+'</h3><div class="small">'+esc(s.kind)+' · '+esc(s.time)+' · '+Number(s.minutes)+' minutes · '+s.days.map(d=>dayNames[d]).join(', ')+'</div></div><div class="row"><button class="btn secondary" data-toggle="'+esc(s.id)+'">'+(s.enabled?'Pause':'Resume')+'</button><button class="btn secondary" data-edit-event="'+esc(s.id)+'">Edit</button><button class="btn warn" data-remove="'+esc(s.id)+'">Delete</button></div></div>').join('');
 return '<div class="tiles"><section class="card"><h2>Plan your week</h2><form id="schedule-form"><input name="id" type="hidden"><label class="form-field">Activity<input name="title" maxlength="100" minlength="2" required placeholder="Football, sketching or science revision"></label><label class="form-field">Type<select name="kind">'+['study','aviation','art','movement','sport','rest','other'].map(x=>'<option>'+x+'</option>').join('')+'</select></label><div class="row"><label class="form-field">Local time<input name="time" type="time" value="17:30" required></label><label class="form-field">Duration<select name="minutes">'+[10,15,20,30,45,60].map(n=>'<option value="'+n+'">'+n+' minutes</option>').join('')+'</select></label></div><fieldset class="subject-fieldset"><legend>Days to repeat</legend><div class="days">'+dayNames.map((n,i)=>'<label><input type="checkbox" name="days" value="'+i+'" '+(i>0&&i<6?'checked':'')+'> '+n+'</label>').join('')+'</div></fieldset><button type="submit" class="btn">Save activity</button> <button type="reset" class="btn ghost">New activity</button></form><h3 style="margin-top:24px">Quick inspiration</h3><div class="actions"><button class="btn secondary" data-preset="movement">Walk & stretch</button><button class="btn secondary" data-preset="sport">Play outside</button><button class="btn secondary" data-preset="art">Sketch break</button><button class="btn secondary" data-preset="study">Science warm-up</button></div></section><section class="card"><h2>Your first-week mission</h2><p class="muted">Optional short activities for Physics, Maths, Chemistry, Biology, aviation, sketching, movement and rest. Adjust the times to suit school and family life.</p><button id="preview-starter" class="btn secondary" type="button">Preview balanced starter week</button><div id="starter-preview" class="notice hidden"></div><div class="actions"><button id="install-starter" type="button" class="btn hidden">Add these activities</button></div></section><section class="card"><h2>My routine ('+state.schedule.length+')</h2><p class="muted">A balanced routine includes recreation and rest. Don’t over-schedule.</p><button class="btn secondary" id="enable-notifications">Enable optional reminders</button><p id="push-status" class="small">'+esc(state.pushStatus?.notice||'Checking background push readiness…')+'</p><button class="btn secondary" id="disable-push">Disable background notifications on this device</button><div class="actions"><button class="btn secondary" id="calendar-export">Export reminders to my phone calendar</button></div><p class="small">Reminders are checked only while this page is open. Closing the page stops them. Browser notifications require permission; there is no background push or SMS.</p>'+(list||'<p class="notice">No activities yet. Add a short walk or creative break to begin.</p>')+'</section></div>';
}
function notes(){
 const list=state.notes.map(n=>'<div class="listitem"><div><h3>'+esc(n.title)+'</h3><p class="small">'+esc(n.body.slice(0,120))+'</p></div><div class="row"><button class="btn secondary" data-edit="'+esc(n.id)+'">Edit</button><button class="btn warn" data-delete-note="'+esc(n.id)+'">Delete</button></div></div>').join('');
 return '<div class="tiles"><section class="card"><h2>My private thoughts and ideas</h2><form id="note-form"><input name="id" type="hidden"><label class="form-field">Title<input name="title" maxlength="120" required placeholder="A painting idea or a question"></label><label class="form-field">Note<textarea name="body" maxlength="3000" placeholder="Your ideas, in your words…"></textarea></label><div class="actions"><button class="btn" type="submit">Save note</button><button class="btn ghost" type="reset">Clear form</button></div></form><p class="small">Private to your learner login. Parent and admin pages cannot read note content.</p></section><section class="card"><h2>Your notebook ('+state.notes.length+')</h2>'+(list||'<p class="notice">Write the first note to begin.</p>')+'</section></div>';
}
function art(){
 return '<section class="card"><h2>Your modern-art sketchpad</h2><p class="muted">Use a mouse, stylus or finger. Your drawing stays in this page until you save the PNG on your device. There is no upload or server gallery.</p><div class="row"><label class="form-field">Paint colour<input id="color" type="color" value="#24498c"></label><label class="form-field">Brush width<input id="width" type="range" min="2" max="25" value="5"></label></div><div class="canvas-frame"><canvas id="sketch" width="1000" height="650" aria-label="Draw on this sketchpad using pointer or touch"></canvas></div><div class="actions"><button id="save-png" class="btn">Save my artwork (.png)</button><button id="clear-png" class="btn secondary">Clear drawing</button></div></section><section class="card" style="margin-top:18px"><h2>Creative prompts</h2><p class="muted">Explore three bold shapes with two contrasting colours, sketch the sky in abstract lines, or create an imaginary aircraft livery.</p>'+button('companion','Ask the art mentor')+'</section>';
}
function pilot(){
 return '<section class="hero saathi-feature-stage" data-immersive><div class="saathi-feature-copy"><span class="tag">Mission · Future pilot</span><h2 style="font-size:35px">THE SKY IS <span>YOUR LAB.</span></h2><p class="sub">Start with curiosity, then develop Maths and Physics through real concepts. For learning only—not actual flight instructions.</p><div class="actions">'+button('companion','Ask your aviation mentor')+'</div></div><div class="orb saathi-feature-scene"><div class="orbit">✈</div></div><div class="saathi-sticker" aria-hidden="true">SKY<br>IS NO<br>LIMIT</div></section><div class="tiles"><section class="card"><h2>Forces of flight</h2><p class="muted">Lift, weight, thrust and drag. Draw an airplane and four arrows, then talk through what each force does.</p><button class="btn secondary" data-ask-pilot="Explain lift, weight, thrust and drag to a beginner using simple physics">Explore four forces</button></section><section class="card"><h2>Pilot maths</h2><p class="muted">Angles, time, distance and rate; build confidence with worked steps instead of memorising answers.</p><button class="btn secondary" data-ask-pilot="Give me one beginner maths question linked to aviation, then help me solve it step by step">Practise Maths</button></section><section class="card"><h2>Why weather matters</h2><p class="muted">Clouds, air pressure and wind as science topics. This section does not provide real flight decisions or weather briefings.</p><button class="btn secondary" data-ask-pilot="Teach me how air pressure relates to weather, with a simple experiment at home">Study weather</button></section><section class="card"><h2>Official India pathway</h2><p class="muted">DGCA states Physics and Mathematics at 10+2 for flight-crew examination registration other than the PPL category. Confirm current licensing through DGCA rather than relying on AI.</p><a href="https://pariksha.dgca.gov.in/Form/PLT_FAQs" target="_blank" rel="noopener noreferrer">Official DGCA FAQ ↗</a></section></div><section class="card" style="margin-top:18px"><h2>Art and flight belong together</h2><p class="muted">Sketch an imaginary aircraft using geometric shapes, then name your design. Your creativity is part of the journey.</p>'+button('art','Draw aircraft art')+'</section>';
}

function media(){
 const kind=state.mediaKind;
 return '<section class="card"><h2>Study your own files</h2><p class="muted">This is a private, learner-initiated preview. Text files are read locally and passed to Study links. Image analysis requires a separately licensed vision provider and your explicit approval. Video stays on this device: select a moment and analyse ONLY that single frame, not its audio or full timeline.</p><label class="form-field">Select a study file<input id="media-file-input" type="file" accept=".txt,.md,.csv,.json,.srt,.vtt,.jpg,.jpeg,.png,.webp,.mp4,.webm,.pdf,.docx,.pptx"></label><p class="small">Currently: text (TXT/MD/CSV/SRT/VTT/JSON), still images (PNG/JPG/WebP), a selected video frame (MP4/WebM). PDF, DOCX and PPTX are converted to an editable text excerpt with consent (1 MB limit); embedded images, tables, formulas and scanned pages may be incomplete. Other Office formats are not supported.</p><p class="notice">'+(state.visionEnabled?'Vision available for one still image after approval.':'Image/video-frame AI vision is currently on hold awaiting model licence approval. Text files remain usable.')+'</p></section>'+
 (kind?'<section class="card" style="margin-top:16px"><h2>'+esc(state.mediaFile?.name||'Selected media')+'</h2><p class="small">'+(kind==='video-frame-only'?'This is one selected frame. It does not include speech, motion or the rest of the video.':'One still image can be analysed, but handwriting and detailed diagrams may be misread.')+'</p>'+(kind==='video-frame-only'?'<div class="canvas-frame"><video id="media-video" controls muted playsinline style="width:100%;max-height:330px"></video></div><p class="small">Pause on the exact frame you want to discuss before analysing.</p>':'')+'<form id="media-study-form"><label class="form-field">What should '+esc(state.companionName)+' explain?<textarea name="question" required minlength="4" maxlength="1500" placeholder="Explain the diagram one step at a time or suggest improvements to my sketch.">'+esc(state.mediaQuestion)+'</textarea></label><button type="submit" id="analyze-media" class="btn" '+(state.visionEnabled?'':'disabled')+'>Analyse with my approval</button></form>'+(state.mediaAnswer?'<div class="ai-answer">'+esc(state.mediaAnswer)+'</div><p class="small">AI vision may be inaccurate. No source file or answer is saved by Saathi. Verify classroom concepts with a teacher and textbook.</p>':'')+'</section>':'');
}

function knowledge(){
 const packs=state.knowledgePacks;
 if(!packs.length)return '<section class="card"><h2>Knowledge library</h2><p class="muted">Learning packs are temporarily unavailable. You can still use the foundation practice lessons.</p><a class="btn secondary" href="/">Open Lessons &amp; practice</a></section>';
 const selected=packs.find(p=>p.id===state.packId);
 if(!selected)return '<section class="card wide"><h2>Explore a knowledge pack</h2><p class="muted">Learn with short, source-linked foundation modules. These are curated introductory notes, not certified school-board chapters, live flight instructions, or medical advice.</p></section><div class="tiles">'+packs.map(p=>'<section class="card"><span class="tag">'+p.modules.length+' modules</span><h2 style="margin-top:14px">'+esc(p.title)+'</h2><p class="muted">'+esc(p.summary)+'</p><button type="button" class="btn secondary" data-pack="'+esc(p.id)+'">Open knowledge pack</button></section>').join('')+'</div>';
 return '<section class="card"><button type="button" class="btn ghost" data-pack="all">← All knowledge packs</button><span class="tag" style="margin-left:12px">'+selected.modules.length+' source-linked modules</span><h2 style="margin-top:18px">'+esc(selected.title)+'</h2><p class="muted">'+esc(selected.summary)+'</p><p class="small">Independent source links are supplied. Confirm school-board alignment before relying on any exam-related content.</p></section><div class="tiles">'+selected.modules.map(m=>'<section class="card"><span class="tag">'+esc(m.difficulty)+'</span><h2 style="margin-top:14px">'+esc(m.title)+'</h2><p class="muted">'+esc(m.explanation)+'</p><h3>Try this</h3><p>'+esc(m.activity)+'</p><p class="small">Reference: <a href="'+esc(m.source.url)+'" target="_blank" rel="noopener noreferrer">'+esc(m.source.publisher)+' · '+esc(m.source.title)+' ↗</a></p><button type="button" class="btn secondary" data-knowledge-question="'+esc(m.id)+'">Ask '+esc(state.companionName)+' to explain</button></section>').join('')+'</div>';
}

async function importStudyLink(url){
 state.linkUrl=url;state.linkText='';state.linkAnswer='';state.linkEvidence=[];
 try{const imported=await api('source-import',{url});state.linkSource=imported;state.linkText=imported.text||'';return imported.status==='ready'?'Readable study text extracted. Review it and ask your question.':'YouTube link identified. Paste the transcript to discuss the video content.';}
 catch(err){state.linkSource={kind:'manual',url:'',title:'Learner-pasted study passage',status:'manual'};return err.message+' You can paste an excerpt you are allowed to study below.';}
}

function studyLinks(){
 const src=state.linkSource,linked=Boolean(src);
 const notes=linked?(src.status==='transcript_required'?'YouTube audio, captions and visuals were NOT retrieved. Paste the video transcript yourself; include timestamps if you have them.':'Review what the page contained. If the webpage could not be retrieved, paste a short study passage manually.'):'Saathi can read selected public educational text pages. Other sites and YouTube videos need text or a transcript supplied by you. No hidden video watching.';
 const evidence=(state.linkEvidence||[]).map((x,i)=>{
  const time=x.displayTimestamp?'['+esc(x.displayTimestamp)+'] ':'';
  const link=src?.kind==='youtube'&&x.timestampSeconds!==null?'<a href="'+esc(src.url+'&t='+x.timestampSeconds+'s')+'" target="_blank" rel="noopener noreferrer">Open '+esc(x.displayTimestamp)+' in YouTube ↗</a>':'';
  return '<div class="listitem"><div><p class="small">'+time+esc(x.text)+'</p>'+link+'</div></div>';
 }).join('');
 return '<div class="tiles"><section class="card wide"><h2>Learn from a link</h2><p class="muted">Paste an educational webpage or YouTube video URL. Saathi never invents missing subtitles, visuals or page content. External material is treated as untrusted text, not instructions.</p><form id="source-link-form"><label class="form-field">Study URL<input name="url" type="url" required maxlength="1800" placeholder="https://www.youtube.com/watch?v=… or https://ncert.nic.in/…" value="'+esc(state.linkUrl)+'"></label><button type="submit" class="btn">Open study source</button></form><p class="notice">'+esc(notes)+'</p>'+(linked?'<p class="small">Source: '+esc(src.title)+' · '+(src.kind==='youtube'?'YouTube transcript not automatically available':src.kind==='manual'?'Pasted passage, unverified origin':'Public webpage text excerpt')+'</p>':'')+'</section>'+
 '<section class="card wide"><h2>Passage or transcript</h2><p class="muted">Use a source you are allowed to study. For YouTube, select Show transcript and copy caption text. Timestamps like 00:04:27 --> 00:04:34 help Saathi show evidence for questions such as "Explain 4:30".</p><form id="study-question-form"><label class="form-field">Study text (not stored by Saathi)<textarea name="text" minlength="40" maxlength="12000" required placeholder="Paste captions or the excerpt from your study material here.">'+esc(state.linkText)+'</textarea></label><label class="form-field">What would you like to learn?<textarea name="question" required minlength="4" maxlength="1600" placeholder="Explain the idea at 4:30 with a simple example and quiz me once.">'+esc(state.linkQuestion)+'</textarea></label><button type="submit" class="btn">Ask '+esc(state.companionName)+' about this lesson</button></form></section>'+
 (state.linkAnswer?'<section class="card wide"><h2>Your lesson explanation</h2><p class="small">AI explanation from supplied, potentially incomplete text. Verify against the actual source and textbook.</p><div class="ai-answer">'+esc(state.linkAnswer)+'</div>'+(evidence?'<h3 style="margin-top:20px">Evidence found in the supplied text</h3>'+evidence:'<p class="small">No timestamp evidence was available.</p>')+'<div class="actions"><button type="button" class="btn secondary" id="save-link-note">Save explanation as private note</button><button type="button" class="btn ghost" id="make-link-task">Make a revision task</button></div></section>':'')+'</div>';
}

function memory(){
 const items=state.memories.map(m=>'<div class="listitem"><div><span class="tag">'+esc(m.category)+'</span><p style="max-width:560px;overflow-wrap:anywhere">'+esc(m.text)+'</p><div class="small">'+(m.useInChat?'Allowed in AI conversations':'Private only — not used by AI')+'</div></div><div class="row"><button type="button" class="btn secondary" data-edit-memory="'+esc(m.id)+'">Edit</button><button type="button" class="btn secondary" data-toggle-memory="'+esc(m.id)+'">'+(m.useInChat?'Disable recall':'Allow recall')+'</button><button type="button" class="btn warn" data-remove-memory="'+esc(m.id)+'">Delete</button></div></div>').join('');
 return '<div class="tiles"><section class="card"><h2>Teach your AI what to remember</h2><p class="muted">Only you choose what is saved. It will never automatically remember things just because you said them in a conversation. Do not save secrets, contact details, sensitive health details or private safety concerns.</p><form id="memory-form"><input type="hidden" name="id"><label class="form-field">Memory type<select name="category"><option value="goal">A goal</option><option value="learning">How I learn</option><option value="preference">My preference</option><option value="interest">My interest</option></select></label><label class="form-field">What should your AI remember?<textarea name="text" required minlength="10" maxlength="240" placeholder="For example: I understand Physics better with drawings and short examples."></textarea></label><label class="form-field" style="display:flex;align-items:center;gap:9px"><input type="checkbox" name="useInChat" style="width:20px;height:20px"> Let my AI use this memory in future conversations</label><p class="small">If enabled, this memory may be sent to Cloudflare Workers AI when you ask a question. If disabled, it stays only in your private saved-memory list. You can edit or delete it anytime.</p><div class="actions"><button type="submit" class="btn">Save my memory</button><button type="reset" class="btn ghost">Clear form</button></div></form></section><section class="card"><h2>My memories ('+state.memories.length+'/30)</h2><p class="muted">Nothing is saved from ordinary chats without your explicit action.</p>'+(items||'<p class="notice">No memories yet. You can start with a learning preference, a goal or an art interest.</p>')+'</section></div>';
}
function privacy(){
 return '<section class="card"><h2>Control your student information</h2><p class="muted">You can download your notes, routine, tasks and academic preferences; or erase saved learning data while retaining your login. Downloads may contain personal details—store them privately.</p><div class="actions"><button class="btn secondary" id="export">Download my data</button><button class="btn warn" id="erase">Erase saved learning data</button></div><p class="notice">The parent sees aggregate task and practice counts only. Cloudflare provider backups may retain deleted data under their separate policies. Your companion cannot automatically alert another person.</p><a href="/privacy.html">Read privacy and safety notice ↗</a></section>';
}
const headings={adaptive:'Study priorities',home:'Your mission starts here',companion:'Your AI companion',schedule:'Your scheduler',notes:'Private notes',art:'Creative studio',pilot:'Pilot academy',knowledge:'Knowledge packs',links:'Study links',media:'My uploads',memory:'Your AI memory',privacy:'My data',identity:'Give your AI a name'};
const descriptions={adaptive:'A short personalised learning plan based on graded practice evidence.',home:'Your dreams deserve curiosity, balance and room to grow.',companion:'A helper for studying, planning, art and ordinary conversations.',schedule:'Study, draw, play, move and recharge—at your pace.',notes:'Your ideas are for you.',art:'Explore drawing, painting and modern art.',pilot:'Connect your dream of flying with science and creativity.',knowledge:'Source-linked aviation, art and study modules.',links:'Ask your AI about a webpage or a captioned video, with visible evidence.',media:'Photos and selected video frames, explained carefully and privately.',memory:'You decide what your AI remembers and when it can use it.',privacy:'Your choices and records, under your control.',identity:'Make your companion yours: choose a name and change it whenever you like.'};
function identity(){
 return '<section class="card"><span class="tag">Your personal AI · Your choice</span><h2 style="margin-top:15px">What would you like to call your AI?</h2><p class="muted">Choose any short name, such as Nova, Jarvis, Sky, Vimaan or something you invent. You can rename it anytime. The name stays private in your learner account; it does not change that this is an AI, not a human.</p><form id="name-form"><label class="form-field">My AI companion’s name<input name="name" type="text" required minlength="2" maxlength="24" autocomplete="off" placeholder="e.g. Nova" value="'+(state.nameConfigured?esc(state.companionName):'')+'"></label><button type="submit" class="btn">Save my AI’s name</button></form><div class="notice">After naming your AI, tap the microphone and say “Hey '+esc(state.nameConfigured?state.companionName:'Nova')+', open my notes” or ask it a question. Listening starts only when you press Speak; this is not an always-on wake word.</div><p class="small">Your AI can help with a daily briefing, scheduling, private notes, aviation inspiration, sketching and step-by-step study. It cannot secretly monitor you, message people or replace real friendships.</p></section>';
}
const panels={home,adaptive,companion,schedule,notes,art,pilot,knowledge,studyLinks,media,memory,privacy,identity};
panels.links=studyLinks;
function welcomeDialog(){
 if(!state.welcome?.show)return '';
 return '<div class="welcome-backdrop" role="presentation"><section class="welcome-dialog" role="dialog" aria-modal="true" aria-labelledby="welcome-title" aria-describedby="welcome-description"><span class="tag">A gift from Papa</span><h2 id="welcome-title">Welcome to your own Saathi AI!</h2><div id="welcome-description"><p>This is your personal study companion, planner and creative space. It is yours to explore at your own pace.</p><ol><li><strong>Name your AI</strong> — choose a nickname you like.</li><li><strong>Ask and learn</strong> — get step-by-step explanations for Physics, Chemistry, Maths, Biology or aviation.</li><li><strong>Share study links and files</strong> — use readable pages, notes, images or documents. YouTube lessons may need a pasted transcript.</li><li><strong>Plan your day</strong> — organise study, art, sport and rest in the Scheduler.</li><li><strong>Check study priorities</strong> — see suggestions based on practice, and review revision plans before saving.</li><li><strong>Explore Art Studio and Pilot Academy</strong> — create, practise and follow your curiosity.</li><li><strong>Optional reminders</strong> — enable notifications on your device if supported; use your phone calendar as a backup until delivery is verified.</li></ol><p>Try asking: <em>Explain electromagnetic induction from the basics</em>, <em>Teach me how aircraft fly</em>, or <em>Help me plan this week.</em></p><p>Check important information against textbooks and teachers. Saathi is an AI tool, not a replacement for people.</p><p><strong>Love, Papa.</strong></p></div><button type="button" class="btn" data-dismiss-welcome="PAPA_WELCOME_V2">Got it — start exploring</button></section></div>';
}
function render(){
 document.title=(state.nameConfigured?state.companionName:'My AI')+' | Mission Control';
 root.innerHTML='<div class="mc"><aside class="side"><div><div class="wordmark">'+esc(state.companionName)+'<b>.</b></div><div class="under">Mission Control · Birthday Edition</div></div><nav class="tabs" aria-label="AI companion sections">'+tabs.map(([name,title])=>'<button type="button" class="'+(state.tab===name?'active':'')+'" data-tab="'+name+'">'+esc(name==='companion'?'Talk to '+state.companionName:title)+'</button>').join('')+'</nav><div class="sidefoot">AI companion, not a person or emergency service.</div><a class="btn ghost" href="/">← Learning workspace</a></aside><main class="content"><header class="mast"><div><div class="kicker">Your AI · Mission Control</div><h1 class="display">'+(state.tab==='companion'?'Talk to '+esc(state.companionName):headings[state.tab])+'</h1><p class="sub">'+descriptions[state.tab]+'</p></div><span class="tag">Private student space</span></header><div class="status" id="status" role="status"></div>'+panels[state.tab]()+'<footer class="footer">Your chosen companion is an AI tool. Verify important learning facts. Timed reminders only work while this page is open. <a href="/privacy.html">Privacy & safety</a></footer></main></div>'+welcomeDialog();
 if(state.tab==='art')attachDrawing();
 if(state.tab==='media'&&state.mediaKind==='video-frame-only'&&state.mediaObjectUrl){const video=document.getElementById('media-video');if(video)video.src=state.mediaObjectUrl;}
}
function attachDrawing(){
 const canvas=document.getElementById('sketch'),ctx=canvas?.getContext('2d');if(!ctx)return;
 ctx.fillStyle='#fffdf8';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.lineCap='round';ctx.lineJoin='round';let down=false;
 const saved=sketchState.snapshot();if(saved){const image=new Image();image.onload=()=>ctx.drawImage(image,0,0,canvas.width,canvas.height);image.src=saved;}
 const point=e=>{const r=canvas.getBoundingClientRect();return [(e.clientX-r.left)*canvas.width/r.width,(e.clientY-r.top)*canvas.height/r.height]};
 canvas.onpointerdown=e=>{e.preventDefault();down=true;canvas.setPointerCapture(e.pointerId);const [x,y]=point(e);ctx.lineWidth=Number(document.getElementById('width').value)*2;ctx.strokeStyle=document.getElementById('color').value;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+.2,y+.2);ctx.stroke()};
 canvas.onpointermove=e=>{if(!down)return;const [x,y]=point(e);ctx.lineTo(x,y);ctx.stroke()};
 canvas.onpointerup=canvas.onpointercancel=()=>{if(down){down=false;ctx.beginPath();sketchState.remember(canvas.toDataURL('image/png'))}};
}
async function refresh(kind){const data=await api(kind);state[kind]=kind==='schedule'?data.items:data.notes;render()}
function startVoiceTurn(){

  if(micSession?.isListening()){micSession.stop();voiceStatus('ready','Microphone stopped. No question was sent.');return;}
  const Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(typeof Recognition!=='function'){voiceStatus('error','Speech recognition is unavailable here. You can type instead.');return;}
  voiceSpeaker().cancel();
  voiceReplyRequested=false;
  micSession=createVoiceCapture({
   RecognitionClass:Recognition,
   language:normalizeSpeechLocale(state.voiceLocale),
   onDraft:text=>{
    const draft=stripCompanionCall(text,state.nameConfigured?state.companionName:null);
    const field=document.getElementById('question');
    if(field)field.value=draft;
    voiceStatus('listening','Listening: '+draft+' (draft only; not sent)');
   },
   onFinal:raw=>{
    const phrase=stripCompanionCall(raw,state.nameConfigured?state.companionName:null);
    if(conversationLoop.active())conversationLoop.submitted();
    if(!phrase){voiceStatus('heard',"I'm here. What would you like to ask?");announce("I'm here. What would you like to ask?");return;}
    const navigation=matchVoiceCommand(phrase);
    if(navigation){
     state.tab=navigation;render();
     voiceStatus('answered','Opened '+navigation+' as requested.');
     announce('Opened '+navigation+'.');
     return;
    }
    const local=answerPersonalRequest(phrase,{schedule:state.schedule,tasks:state.tasks,memories:state.memories});
    if(local){
     state.answer=local.answer;state.tab='companion';render();
     voiceStatus('answered','Answered from your private daily plan. No AI request sent.');
     announce(local.answer);
     return;
    }
    const field=document.getElementById('question');
    if(field){field.value=phrase;field.focus();}
    if(state.voiceAutoSend||conversationLoop.active()){
     voiceReplyRequested=false;voiceStatus('thinking','I heard you. Preparing your reply.');
     handleCompanionQuestion(phrase,true).catch(err=>{conversationLoop.failed();voiceStatus('error',err.message)});return;
    }
    voiceReplyRequested=true;
    voiceStatus('heard','I heard your question. Review it and select Ask to send it.');
    announce(voiceAcknowledgement('HEARD'));
   },
   onState:phase=>{if(phase==='LISTENING')voiceStatus('listening','Listening after your tap. Audio may be processed by the browser vendor.');if(phase==='STOPPED')voiceStatus('ready','Microphone stopped. Review the draft and select Ask to send it.');},
   onError:code=>{conversationLoop.failed();voiceStatus('error',code==='MIC_PERMISSION_DENIED'
    ?'Microphone permission was denied. Allow the mic in browser settings or type.'
    :'Voice recognition is unavailable. Type your question instead.');}
  });
  micSession.start();return;
}
root.addEventListener('click',async e=>{
 const b=e.target.closest('button');if(!b)return;
 const dataset=b.dataset;
 if(b.id==='play-welcome'){micSession?.stop();const text=composeWelcomeReport({schedule:state.schedule,tasks:state.tasks},state.companionName).spoken;if(!announce(text))voiceStatus('error','Speech not available; the written agenda is still visible.');return}
 if(b.id==='stop-welcome'){conversationLoop.stop();micSession?.stop();voiceSpeaker().cancel();state.voicePhase='idle';refreshVoiceDisplay();flash('Voice stopped.');return}
 if(b.id==='show-intro'){state.introHidden=false;render();return}
 if(dataset.welcomeHide){voiceSpeaker().cancel();state.introHidden=true;render();return}
 if(dataset.dismissWelcome){if(dataset.dismissWelcome!==state.welcome?.version)return;try{await api('welcome-once',{action:'dismiss',version:dataset.dismissWelcome});state.welcome={...state.welcome,show:false};render();flash('Enjoy exploring Saathi!')}catch(err){flash('Could not save your choice: '+err.message)}return}
 if(dataset.tab){conversationLoop.stop();voiceReplyRequested=false;micSession?.stop();state.tab=dataset.tab;render();return}
 if(dataset.mode){state.mode=dataset.mode;render();return}
 if(dataset.planLesson){
 const lesson=state.adaptivePlan?.recommendations?.find(x=>x.lessonId===dataset.planLesson);
 if(!lesson)return;
 state.tab='schedule';render();
 const form=document.getElementById('schedule-form');
 form.elements.title.value=('Revision: '+lesson.title).slice(0,100);
 form.elements.kind.value='study';
 form.elements.minutes.value=String([10,15,20,30,45,60].find(m=>m>=lesson.minutes)||15);
 for(const input of form.querySelectorAll('[name="days"]'))input.checked=input.value==='1'||input.value==='4';
 form.elements.time.value='17:30';
 form.elements.title.focus();
 flash('Recommended lesson added to the draft only. Only save after reviewing the days, time and duration. No reminder has been created yet.');
 return;
 }
 if(dataset.coreSkill){const skill=state.coreSkills.find(x=>x.id===dataset.coreSkill);if(!skill)return;state.mode=skill.category==='aviation'?'pilot':skill.category==='art'?'artist':skill.category==='planning'?'planner':'teacher';state.tab='companion';render();const f=document.getElementById('question');if(f){f.value=skill.prompt;f.focus()}flash('Skill ready. Review and select Ask to begin.');return}
 if(dataset.askPilot){state.mode='pilot';state.tab='companion';render();document.getElementById('question').value=dataset.askPilot;return}
 if(dataset.memoryDraft){const q=document.getElementById('question');const draft=q?.value||'';state.tab='memory';render();const f=document.getElementById('memory-form');f.elements.text.value=draft.slice(0,240);f.elements.text.focus();flash('Review and explicitly save this memory. AI recall is off unless you choose it.');return}
 if(dataset.pack){state.packId=dataset.pack==='all'?null:dataset.pack;state.tab='knowledge';render();return}
 if(dataset.knowledgeQuestion){const pack=state.knowledgePacks.find(p=>p.id===state.packId),module=pack?.modules.find(m=>m.id===dataset.knowledgeQuestion);if(module){state.mode=pack.id==='aviation'?'pilot':pack.id==='art'?'artist':pack.id==='study-skills'?'planner':'teacher';state.tab='companion';render();document.getElementById('question').value='Please explain '+module.title+' step by step using an example and one practice question.';}return}
 try{
 if(dataset.upgradeInstall){
  try{const tested=await runProbe(dataset.upgradeInstall);state.lastProbe={id:dataset.upgradeInstall,...tested};if(!tested.ok)throw Error('Smoke test did not pass: '+tested.detail+'; this project was not installed.');await api('installed-features',{action:'install',id:dataset.upgradeInstall});await reloadInstalledFeatures();render();flash('Feature installed into Saathi. You can improve or uninstall it any time.')}catch(err){flash(err.message)}return;
 }
 if(dataset.upgradeRemove){
  try{await api('installed-features',{action:'remove',id:dataset.upgradeRemove});await reloadInstalledFeatures();render();flash('Feature uninstalled; the saved prototype remains available.')}catch(err){flash(err.message)}return;
 }
 if(dataset.upgradeImprove){
  try{await selectLearnerBuild(dataset.upgradeImprove);state.tab='companion';render();document.getElementById('builder-lab')?.scrollIntoView({block:'start'});flash('Describe what to improve below. Changes to installed features update automatically.')}catch(err){flash(err.message)}return;
 }
 if(dataset.buildTest){try{const tested=await runProbe(dataset.buildTest);state.lastProbe={id:dataset.buildTest,...tested};render();flash(tested.ok?'Sandbox smoke test PASS: the project loaded without reported JavaScript errors.':'Sandbox smoke test FAIL: '+tested.detail)}catch(err){flash('Smoke test unavailable: '+err.message)}return;}
 if(dataset.buildView){
  try{await selectLearnerBuild(dataset.buildView);render();document.getElementById('builder-lab')?.scrollIntoView({block:'start'});}catch(err){flash(err.message)}
  return;
 }
 if(dataset.buildDelete){
  const project=state.builds.find(p=>p.id===dataset.buildDelete);if(!project)return;
  if(!confirm('Delete “'+project.title+'” and its saved versions? This cannot be undone.'))return;
  try{
   await api('builder-lab',{action:'delete',id:project.id,confirm:'DELETE MY PROJECT'});
   if(state.selectedBuild?.id===project.id){state.selectedBuild=null;state.buildVersions=[];}
   await reloadLearnerBuilds();if(state.installedAvailable)await reloadInstalledFeatures();render();flash('Project deleted.');
  }catch(err){flash(err.message)}
  return;
 }
 if(dataset.buildRestore){
  const current=state.selectedBuild;if(!current)return;
  const version=Number(dataset.buildRestore);
  if(!confirm('Restore version '+version+' of your project as a new revision?'))return;
  try{
   await api('builder-lab',{action:'restore',id:current.id,revision:version,currentRevision:current.revision});
   await selectLearnerBuild(current.id);await reloadLearnerBuilds();if(state.installedAvailable)await reloadInstalledFeatures();render();flash('Previous version restored in a new revision.');
  }catch(err){flash(err.message)}return;
 }
 if(dataset.buildExport){
  const project=state.selectedBuild;if(!project||project.id!==dataset.buildExport)return;
  const data={title:project.title,revision:project.revision,html:project.html,css:project.css,js:project.js,notice:'Source export. Preview in Saathi uses an isolated sandbox. This file is not a deployed app.'};
  const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));
  const anchor=document.createElement('a');anchor.href=url;anchor.download='saathi-project-'+project.title.toLowerCase().replace(/[^a-z0-9-]+/g,'-').slice(0,35)+'.json';anchor.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);flash('Source JSON exported. It has not been installed or deployed.');return;
 }
 if(dataset.forgeTry){
  const skill=state.skills.find(x=>x.id===dataset.forgeTry);if(!skill)return;
  try{await handleCompanionQuestion('Try '+skill.name+' skill with a short practice session')}catch(err){flash(err.message)}return;
 }
 if(dataset.forgeEdit){
  const skill=state.skills.find(x=>x.id===dataset.forgeEdit);if(!skill)return;
  const details=document.getElementById('skill-forge');if(details)details.open=true;
  const form=document.getElementById('forge-form');if(!form)return;
  for(const key of ['id','name','purpose','mode','blueprint','revision'])form.elements[key].value=String(skill[key]);
  form.elements.name.focus();flash('Revise the skill and save it as a draft, then try it again.');return;
 }
 if(dataset.forgeStatus){
  const skill=state.skills.find(x=>x.id===dataset.forgeStatus);if(!skill)return;
  try{
   const result=await api('skills',{action:skill.status==='active'?'deactivate':'activate',id:skill.id});
   state.skills=state.skills.map(x=>x.id===result.skill.id?result.skill:x);
   state.forgedSkills=state.forgedSkills.map(x=>x.id===result.skill.id?{...x,status:result.skill.status}:x);
   render();flash(result.skill.name+' is now '+result.skill.status+'.');
  }catch(err){flash(err.message)}return;
 }
 if(dataset.forgeDelete){
  const skill=state.skills.find(x=>x.id===dataset.forgeDelete);if(!skill)return;
  if(!confirm('Delete your skill “'+skill.name+'”? This cannot be undone.'))return;
  try{await api('skills',{action:'delete',id:skill.id});state.skills=state.skills.filter(x=>x.id!==skill.id);state.forgedSkills=state.forgedSkills.filter(x=>x.id!==skill.id);render();flash('Skill removed.')}catch(err){flash(err.message)}return;
 }
 if(dataset.removeMemory){if(!confirm('Delete this saved memory?'))return;await api('personal-memory',{action:'delete',id:dataset.removeMemory});state.memories=(await api('personal-memory')).memories;render();flash('Memory deleted.');return}
 if(dataset.toggleMemory){const m=state.memories.find(x=>x.id===dataset.toggleMemory);if(!m)return;const updated=await api('personal-memory',{action:'update',id:m.id,category:m.category,text:m.text,useInChat:!m.useInChat});state.memories=(await api('personal-memory')).memories;render();flash(updated.memory.useInChat?'AI recall enabled for this memory.':'AI recall disabled for this memory.');return}
 if(dataset.editMemory){const m=state.memories.find(x=>x.id===dataset.editMemory);if(!m)return;const f=document.getElementById('memory-form');f.elements.id.value=m.id;f.elements.category.value=m.category;f.elements.text.value=m.text;f.elements.useInChat.checked=m.useInChat;f.elements.text.focus();flash('Editing a memory. Save to apply changes.');return}
 if(dataset.deleteNote){if(confirm('Delete this private note?'))await api('notes',{action:'delete',id:dataset.deleteNote});await refresh('notes');return}
 if(dataset.edit){const n=state.notes.find(x=>x.id===dataset.edit);if(n){const form=document.getElementById('note-form');form.elements.id.value=n.id;form.elements.title.value=n.title;form.elements.body.value=n.body;form.elements.title.focus()}return}
 if(dataset.remove){if(confirm('Delete this activity?')){await api('schedule',{action:'delete',id:dataset.remove});await refresh('schedule')}return}
 if(dataset.toggle){await api('schedule',{action:'toggle',id:dataset.toggle});await refresh('schedule');return}
 if(dataset.editEvent){const item=state.schedule.find(x=>x.id===dataset.editEvent);if(item){const form=document.getElementById('schedule-form');form.elements.id.value=item.id;form.elements.title.value=item.title;form.elements.kind.value=item.kind;form.elements.time.value=item.time;form.elements.minutes.value=String(item.minutes);form.querySelectorAll('input[name=days]').forEach(x=>{x.checked=item.days.includes(Number(x.value))});form.elements.title.focus();flash('Editing your chosen activity. Press Save activity to keep changes.')}return}
 if(dataset.preset){const samples={movement:['Walk and stretch','movement','17:30',15],sport:['Play your favourite sport','sport','17:30',30],art:['Sketch or paint','art','18:30',20],study:['Small science challenge','study','19:00',20]};const s=samples[dataset.preset],form=document.getElementById('schedule-form');form.elements.title.value=s[0];form.elements.kind.value=s[1];form.elements.time.value=s[2];form.elements.minutes.value=String(s[3]);flash('Suggestion filled in. Change it and press Save.');return}
 if(b.id==='preview-starter'){const data=await api('starter-routine');const preview=document.getElementById('starter-preview');preview.classList.remove('hidden');preview.textContent=data.template.map(x=>x.title+' · '+x.time+' · '+x.minutes+' min').join(' | ');document.getElementById('install-starter').classList.remove('hidden');flash('Review the starter plan, then choose whether to add it.');return}
 if(b.id==='install-starter'){if(!confirm('Add the optional starter routine to your weekly schedule? You can edit or remove every activity.'))return;const result=await api('starter-routine',{action:'install',confirm:'ADD STARTER ROUTINE'});await refresh('schedule');flash(result.added+' starter activities added; '+(result.total-result.added)+' already present. Adjust times to your needs.');return}
 if(b.id==='calendar-export'){const text=buildCalendar(state.schedule.filter(x=>x.enabled));const blob=new Blob([text],{type:'text/calendar;charset=utf-8'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='saathi-my-week.ics';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);flash('Calendar file downloaded. Import it into your phone calendar and enable that calendar’s alerts. This app does not install them for you.');return}
 if(b.id==='enable-notifications'){
  if(!state.pushStatus?.ready){flash('Background push is not commissioned. Export your routine to the phone calendar instead.');return}
  if(!('serviceWorker' in navigator)||!('PushManager' in window)||!('Notification' in window)){flash('This device does not support background web push. Use the phone calendar instead.');return}
  const permission=await Notification.requestPermission();
  if(permission!=='granted'){flash('Notifications declined; no subscription was saved.');return}
  const registration=await navigator.serviceWorker.register('/saathi-push-sw.js',{scope:'/'});
  const decode=s=>{const b=atob(s.replace(/-/g,'+').replace(/_/g,'/')+'='.repeat((4-s.length%4)%4));return Uint8Array.from(b,c=>c.charCodeAt(0))};
  const subscription=await registration.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:decode(state.pushStatus.publicKey)});
  const body=subscription.toJSON();
  await api('push-device',{action:'register',endpoint:body.endpoint,p256dh:body.keys.p256dh,auth:body.keys.auth,timezone:Intl.DateTimeFormat().resolvedOptions().timeZone||'Asia/Kolkata',quietFrom:22,quietTo:7});
  state.notifications=true;state.pushStatus=await api('push-device');render();
  flash('This device registered for background notifications. Delivery must still be independently verified.');
  return
 }
 if(b.id==='disable-push'){
  if('serviceWorker' in navigator){
   const registration=await navigator.serviceWorker.getRegistration('/');
   const sub=await registration?.pushManager?.getSubscription();
   if(sub){await api('push-device',{action:'remove',endpoint:sub.endpoint});await sub.unsubscribe()}
  }
  state.notifications=false;state.pushStatus=await api('push-device').catch(()=>null);render();flash('Background push subscription disabled on this device.');return
 }
 if(dataset.exportOffice){
  const report=dataset.exportScope==='research'?state.researchReport:state.teamReport?{title:'Saathi specialist team report',question:state.teamReport.question,answer:state.teamReport.specialists.map(x=>x.name+'\n'+x.answer).join('\n\n'),sourceUrl:'AI mentor discussion; not independent source evidence'}:null;
  if(!report){flash('No report is ready to export.');return}
  try{const f=makeOfficeFile(dataset.exportOffice,report);const url=URL.createObjectURL(new Blob([f.bytes],{type:f.mime}));const a=document.createElement('a');a.href=url;a.download='saathi-learning-report.'+f.extension;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);flash('Actual '+f.extension.toUpperCase()+' report generated locally and saved to your device.')}catch(err){flash('Could not generate report: '+err.message)}return;
 }
 if(b.id==='export-research-brief'||b.id==='export-team-brief'){
  let doc;
  if(b.id==='export-research-brief'&&state.researchReport)doc=buildStudyDocument(state.researchReport);
  else if(b.id==='export-team-brief'&&state.teamReport)doc=buildStudyDocument({title:'Saathi specialist team learning report',question:state.teamReport.question,answer:state.teamReport.specialists.map(x=>x.name+'\n'+x.answer).join('\n\n'),sourceUrl:'Independent AI suggestions — no external source verified'});
  if(!doc)return;
  const url=URL.createObjectURL(new Blob([doc],{type:'text/html;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='saathi-study-brief.html';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);flash('Printable HTML report exported. Open in a browser or word processor; use Print to save PDF.');return;
 }
 if(b.id==='explain-screen'||b.id==='explain-camera'){
  const kind=b.id==='explain-screen'?'screen':'camera';
  if(!confirm('Share ONE '+kind+' frame with Saathi AI for explanation? Check that it contains no passwords or private information. The recording stops after one frame.'))return;
  try{const image=await captureVisualFrame(kind);const q='Explain the learning or creative content visible in this '+kind+' image. Describe only what is actually shown and say if something is unclear.';const r=await api('analyze-image',{confirm:'ANALYZE IMAGE',image,question:q});companionReply(q,r.answer,{notice:'Only the selected '+kind+' frame was sent; capture ended. Vision is subject to preview model availability.'});}catch(err){flash('Visual explanation unavailable: '+err.message)}return;
 }
 if(b.id==='device-health'){
  try{const result=await callLocalCompanion(devicePairToken,{action:'system-status'});flash('This laptop · '+result.platform+' · '+result.logicalProcessors+' CPU cores · '+result.freeMemoryMiB+' MiB free RAM.')}catch(err){flash(err.message)}return;
 }
 if(b.id==='device-disconnect'){devicePairToken=null;render();flash('Local device session disconnected in this browser tab.');return}
 if(b.id==='youtube-refresh'&&state.youtubeResults?.topic){await findYoutube(state.youtubeResults.topic+' simple animations');render();return}
 if(dataset.youtubePlay){const id=dataset.youtubePlay;const v=state.youtubeResults?.videos?.find(x=>x.id===id);if(!v)return;const frame=document.createElement('iframe');frame.src=v.embedUrl;frame.title=v.title;frame.loading='lazy';frame.referrerPolicy='strict-origin-when-cross-origin';frame.allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share';frame.allowFullscreen=true;frame.style.cssText='width:100%;aspect-ratio:16/9;border:0;border-radius:18px;margin-top:18px';const host=document.getElementById('saathi-video-player');host?.replaceChildren(frame);return}
 if(b.id==='conversation-start'){
  if(!conversationLoop.active()){conversationLoop.start();state.voiceAutoSend=true;startVoiceTurn();flash('Voice conversation started by you. It will pause after each answer and stop automatically after twelve turns. Use Stop conversation anytime.');}return;
 }
 if(b.id==='conversation-stop'){conversationLoop.stop();micSession?.stop();voiceSpeaker().cancel();voiceStatus('ready','Conversation stopped. Microphone and speech paused.');return}
 if(b.id==='voice'){startVoiceTurn();return;}
 if(b.id==='speak-answer'){voiceSpeaker().cancel();if(!announce(state.answer))voiceStatus('error','Spoken reply unavailable. The written answer is still visible.');return}
 if(b.id==='save-png'){const canvas=document.getElementById('sketch'),link=document.createElement('a');link.download='my-artwork.png';link.href=canvas.toDataURL('image/png');link.click();flash('Art saved to your device, not uploaded.');return}
 if(b.id==='clear-png'){if(confirm('Clear the sketch? Unsaved artwork will be lost.')){sketchState.clear();attachDrawing();flash('Canvas cleared.')}return}
 if(b.id==='save-link-note'){if(!state.linkAnswer)return;if(!confirm('Save this AI-generated explanation to your private notes?'))return;const title=('Link lesson: '+(state.linkSource?.title||'Study explanation')).slice(0,120);const reference=state.linkSource?.url?'Source: '+state.linkSource.url+'\n':'Source text pasted by learner (original not verified).\n';const body=(reference+'Question: '+state.linkQuestion+'\n\nAI explanation (check accuracy):\n'+state.linkAnswer).slice(0,3000);await api('notes',{title,body});state.notes=(await api('notes')).notes;flash('Saved as a private note. It was not automatically added to AI memory.');return}
 if(b.id==='make-link-task'){if(!state.linkAnswer)return;if(!confirm('Create a revision task for this lesson?'))return;const title=('Review: '+(state.linkSource?.title||state.linkQuestion||'Study source')).slice(0,150);await api('tasks',{title,subject:'General'});state.tasks=(await api('tasks')).tasks;flash('Revision task created in your planner.');return}
 if(b.id==='export'){const data=(await api('my-data')).data,blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='saathi-my-learning-data.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);flash('Private data file downloaded. Keep it safe.');return}
 if(b.id==='erase'){if(!confirm('Erase your notes, routine, study tasks and study progress? Login will remain.'))return;if(prompt('Type ERASE MY STUDY DATA to confirm')!=='ERASE MY STUDY DATA')return;await api('my-data',{action:'erase-learning-data',confirm:'ERASE MY STUDY DATA'});state.notes=[];state.schedule=[];state.memories=[];state.companionName=DEFAULT_COMPANION_NAME;state.nameConfigured=false;state.tab='identity';render();flash('Study information erased. Provider backups may retain data temporarily.');return}
 }catch(err){flash(err.message)}
});

async function captureMediaImage(){
 let canvas=document.createElement('canvas'),w,h,drawSource,release=()=>{};
 if(state.mediaKind==='image'){
  drawSource=await createImageBitmap(state.mediaFile);release=()=>drawSource.close?.();w=drawSource.width;h=drawSource.height;
 }else if(state.mediaKind==='video-frame-only'){
  drawSource=document.getElementById('media-video');
  if(!drawSource||drawSource.readyState<2)throw Error('Play or pause the video at a visible frame before analysing.');
  w=drawSource.videoWidth;h=drawSource.videoHeight;
  state.mediaTimeLabel=frameTimeLabel(drawSource.currentTime);
 }else throw Error('Only images and selected video frames can be analysed.');
 if(!w||!h||w*h>60_000_000)throw Error('Image dimensions are invalid or too large.');
 const scale=Math.min(1,800/Math.max(w,h));canvas.width=Math.max(1,Math.round(w*scale));canvas.height=Math.max(1,Math.round(h*scale));
 const ctx=canvas.getContext('2d');ctx.fillStyle='white';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(drawSource,0,0,canvas.width,canvas.height);
 release();
 let quality=.78,uri=canvas.toDataURL('image/jpeg',quality);
 while(uri.length>600000&&quality>.35){quality-=.1;uri=canvas.toDataURL('image/jpeg',quality)}
 if(uri.length>600000)throw Error('Image too large after resizing; select a simpler or smaller image.');
 return uri;
}

async function explainCompanionFile(file){
 const kind=detectMediaFile(file.name,file.size);
 if(!kind||kind==='unsupported')throw Error('Unsupported file. Choose a small PNG, JPEG, WebP, PDF, DOCX, PPTX or text file.');
 if(kind==='video-frame-only'){companionReply('Explain attached video','Video files require choosing one visible frame in My uploads; Saathi cannot interpret the entire video automatically.');return}
 const question=document.getElementById('question')?.value?.trim()||'Teach me the main ideas from this study material step by step.';
 if(kind==='image'){
  if(!confirm('Send this image to Cloudflare Workers AI for explanation? Saathi will not save the image.'))return;
  const previousFile=state.mediaFile,previousKind=state.mediaKind;
  state.mediaFile=file;state.mediaKind='image';
  let picture;
  try{picture=await captureMediaImage()}finally{state.mediaFile=previousFile;state.mediaKind=previousKind}
  const result=await api('analyze-image',{image:picture,question,confirm:'ANALYZE IMAGE'});
  companionReply('Explain attached image: '+question,result.answer,{notice:'Single-image analysis only. Verify diagrams and handwriting.'});return;
 }
 let text;
 if(kind==='document'){
  if(!confirm('Convert this document using Cloudflare and explain its extracted text? Diagrams and tables may be incomplete.'))return;
  const bytes=new Uint8Array(await file.arrayBuffer());let raw='';
  for(let i=0;i<bytes.length;i+=8192)raw+=String.fromCharCode(...bytes.subarray(i,i+8192));
  const converted=await api('convert-document',{name:file.name,base64:btoa(raw),confirm:'CONVERT DOCUMENT'});
  text=converted.text;
 }else if(kind==='text'){text=(await file.text()).replace(/\u0000/g,'').slice(0,12000)}
 if(typeof text!=='string'||text.trim().length<40)throw Error('Not enough readable study text was found in the file.');
 const response=await api('ask',{question,mode:'teacher',source:{type:'manual',url:'',title:file.name,text}});
 companionReply('Explain attached '+file.name+': '+question,response.answer,{reference:response.knowledgeReference,notice:'Explanation uses extracted text only. Verify equations, diagrams and source details.'});
}

root.addEventListener('change',async e=>{
 if(e.target?.id==='companion-file'){
   const file=e.target.files?.[0];if(!file)return;
   try{await explainCompanionFile(file)}catch(err){flash(err.message)}finally{e.target.value=''}
   return;
  }
  if(e.target?.id!=='media-file-input')return;
 const file=e.target.files?.[0];if(!file)return;
 if(state.mediaObjectUrl){URL.revokeObjectURL(state.mediaObjectUrl);state.mediaObjectUrl=null}
 const kind=detectMediaFile(file.name,file.size);state.mediaFile=null;state.mediaKind=null;state.mediaAnswer='';
 if(!kind){flash('Unsupported format or oversized file. Use a small text file, image or video.');return}
 if(kind==='unsupported'){flash('Legacy Office document type not supported. Convert it to PDF, DOCX or PPTX, or paste a permitted excerpt into Study links.');return}
 if(kind==='document'){
  if(!confirm('Convert this small PDF/DOCX/PPTX into text using Cloudflare document processing? It will not be saved by Saathi.')){flash('Conversion cancelled.');return}
  let raw='';const arr=new Uint8Array(await file.arrayBuffer());
  for(let start=0;start<arr.length;start+=8192)raw+=String.fromCharCode(...arr.subarray(start,start+8192));
  try{
   const result=await api('convert-document',{name:file.name,base64:btoa(raw),confirm:'CONVERT DOCUMENT'});
   state.linkSource={kind:'manual',url:'',title:result.name,status:'ready'};
   state.linkText=result.text;state.linkQuestion='Explain the main ideas in this document step by step, and help me study one question at a time.';
   state.tab='links';render();flash('Document converted to a limited, editable text excerpt. Check diagrams, equations and tables against the original.');return
  }catch(err){flash(err.message);return}
 }
 if(kind==='text'){
  let passage=await file.text();
  passage=passage.replace(/\u0000/g,'').slice(0,12000);
  if(passage.trim().length<40){flash('This text file does not contain enough readable material.');return}
  state.linkSource={kind:'manual',url:'',title:file.name,status:'ready'};
  state.linkText=passage;state.linkQuestion='Please teach me this material one step at a time.';state.tab='links';render();flash('Text file read on your device. Review the passage and ask your question.');return;
 }
 state.mediaFile=file;state.mediaKind=kind;
 if(kind==='video-frame-only')state.mediaObjectUrl=URL.createObjectURL(file);
 render();flash(kind==='image'?'Image ready. Enter a question and approve analysis.':'Local video ready. Pause at the frame you want to discuss.');
});


function companionReply(question,reply,{spoken=false,reference=null,notice=''}={}){
 state.answer=String(reply||'').slice(0,10000);
 state.answerReference=reference;
 state.conversation.push({role:'student',text:question},{role:'saathi',text:state.answer});
 state.conversation=state.conversation.slice(-24); // In-session only; conversation is not saved
 state.tab='companion';render();
 flash(notice||'Reply ready. Check academic facts against your textbook.');
 if(spoken){voiceStatus('answered','Reply ready. Review the answer.');announce(state.answer);}
}
async function selectLearnerBuild(id){
 const detail=await api('builder-lab?id='+encodeURIComponent(id));
 state.selectedBuild=detail.project;state.buildVersions=detail.versions||[];
 return detail.project;
}
async function reloadLearnerBuilds(){
 const info=await api('builder-lab');
 state.builds=info.projects||[];state.builderAvailable=true;
}
async function reloadInstalledFeatures(){
 const r=await api('installed-features');state.installedFeatures=r.features||[];state.installedAvailable=true;
}
async function runLearnerBuild(prompt,revise=false,spoken=false,install=false){
 const prior=revise?state.selectedBuild:null;
 if(revise&&!prior)throw Error('Choose your project before revising it.');
 flash(revise?'Improving your project safely…':'Generating a private Saathi feature…');
 let result=await api('builder-lab',revise?{action:'revise',id:prior.id,revision:prior.revision,prompt}:{action:'generate',prompt});
 await reloadLearnerBuilds();
 await selectLearnerBuild(result.id);
 let test=await runProbe(result.id),repairIssue='';
 state.lastProbe={id:result.id,...test};
 if(!test.ok){
  flash('Saathi detected a runtime issue and is attempting one automatic repair…');
  try{
   result=await api('builder-lab',{action:'repair',id:result.id,revision:result.revision,diagnostic:test.detail||'The sandbox project did not complete its loading smoke test.'});
   await selectLearnerBuild(result.id);
   test=await runProbe(result.id);
   state.lastProbe={id:result.id,...test};
  }catch(err){repairIssue=err.message}
 }
 if(!test.ok){
  if(revise&&prior&&state.installedFeatures.some(x=>x.id===result.id)){
   await api('builder-lab',{action:'restore',id:result.id,revision:prior.revision,currentRevision:result.revision});
   await selectLearnerBuild(result.id);
  }
  throw Error('Runtime test and repair did not pass. '+(repairIssue||test.detail||'Feature unavailable')+'. No new feature was installed; the last installed version was restored when applicable.');
 }
 if(install)await api('installed-features',{action:'install',id:result.id});
 if(state.installedAvailable||install)await reloadInstalledFeatures();
 const message=install?'I created “'+state.selectedBuild.title+'” and installed it in your Saathi companion. Use My Saathi upgrades above to try it or choose Improve to evolve it.': 'Your '+(revise?'improved':'new')+' prototype “'+state.selectedBuild.title+'” was saved as version '+state.selectedBuild.revision+'. Open Build & Upgrade Lab to try it or install it into Saathi.';
 companionReply(prompt,message,{spoken,notice:'Your upgrade is saved. Generated code runs only inside a sandboxed module, not inside the core assistant.'});
}

async function handleCompanionQuestion(raw,spoken=false){
 const question=stripCompanionCall(String(raw||'').trim(),state.nameConfigured?state.companionName:null);
 if(question.length<4)throw Error('Please ask a longer question.');
 state.agentAction=null;
 const requestedAction=detectBrahmaAction(question);
 if(requestedAction){
  state.agentAction=buildAgentReceipt(requestedAction);
  if(requestedAction.kind==='device-handoff'&&devicePairToken){
   try{const info=await callLocalCompanion(devicePairToken,{action:'system-status'});state.agentAction={...state.agentAction,status:'DEVICE_STATUS_READ',label:'Your laptop is connected',notice:'Read-only status: '+info.platform+', '+info.logicalProcessors+' CPU cores, '+info.freeMemoryMiB+' MiB free memory. No external commands were run.'};}
   catch(err){devicePairToken=null;state.agentAction={...state.agentAction,status:'RECONNECT_REQUIRED',notice:err.message}}
  }
  companionReply(question,state.agentAction.notice,{spoken,notice:'Saathi Action Gateway: '+state.agentAction.status+'. Device changes are never implied.'});return
 }
 const video=youtubeIntent(question);
 if(video){await findYoutube(video.topic);companionReply(question,state.youtubeResults.error?'Video search unavailable: '+state.youtubeResults.error:'I found '+state.youtubeResults.videos.length+' YouTube lessons related to '+video.topic+'. Choose a video to play. I have not watched them or verified their content.',{spoken,notice:'Educational YouTube suggestions ready.'});return}
 const team=teamCommand(question);
 if(team){flash('Consulting relevant specialist mentors…');const result=await api('team-study',{question:team});state.teamReport={...result,question:team};const summary=result.specialists.length?result.specialists.map(x=>x.name+': '+x.answer).join('\n\n'):'Specialist advice unavailable; no report has been invented.';companionReply(question,summary,{spoken,notice:result.notice});return}
 const research=parseResearchCommand(question);
 if(research){flash('Reading the selected public educational source…');const source=await api('source-import',{url:research.url});if(source.status!=='ready'||!source.text)throw Error('This educational link has no readable source text. Paste the transcript or passage in Study links.');const response=await api('ask',{question:research.question,mode:'teacher',source:{type:'webpage',url:source.url,title:source.title,text:source.text}});state.researchReport={title:source.title,sourceUrl:source.url,question:research.question,answer:response.answer};companionReply(question,response.answer,{spoken,notice:'Explained using only the retrieved educational text. Export a study brief below. Verify important facts against the source.'});return}
 const upgrade=detectSaathiUpgradeIntent(question);
 if(upgrade){await runLearnerBuild(upgrade,false,spoken,true);return}
 const build=detectBuildRequest(question);
 if(build){await runLearnerBuild(build,false,spoken);return}
 if(state.selectedBuild&&/^(?:improve|upgrade|refine|change|modify)\s+(?:my|this)\s+(?:prototype|project|app|game|tool)\b/i.test(question)){
  await runLearnerBuild(question,true,spoken);return;
 }

 const forgeGoal=detectForgeIntent(question);
 if(forgeGoal){
  flash('Skill Forge is writing and checking a new learning capability…');
  const result=await api('auto-forge',{action:'forge',goal:forgeGoal});
  state.forgedSkills.unshift(result.skill);
  state.skills.unshift({id:result.skill.id,name:result.skill.name,purpose:result.skill.purpose,mode:result.skill.mode,blueprint:result.skill.blueprint,status:result.skill.status,revision:result.skill.revision});
  companionReply(question,'I designed and registered “'+result.skill.name+'” for you! It is active. I can automatically use it when you ask about '+result.skill.triggers.slice(0,2).join(' or ')+'. You can pause or change it in Skill Forge whenever you like. The skill is an AI-written teaching plan, not executable computer code.',{spoken,notice:'Skill plan passed '+result.skill.checks+' structural checks. Academic quality must still be judged during use.'});return;
 }
 const triggered=matchForgedSkill(question,state.forgedSkills);
 if(triggered){
  const reply=await api('ask',{question:assembleForgedPrompt(triggered,question),mode:triggered.mode});
  companionReply(question,reply.answer,{spoken,reference:reply.knowledgeReference,notice:'Used your active learner-forged '+triggered.name+' plan. Check teaching accuracy.'});return;
 }
 const proposed=draftSkillFromRequest(question);
 if(proposed){
  const result=await api('skills',{action:'create',...proposed});
  state.skills.unshift(result.skill);
  companionReply(question,'Created “'+result.skill.name+'” as a private draft skill. Try it by saying: “Try '+result.skill.name+' skill with a topic”, or use Try in Skill Forge. Activate it whenever it is useful.',{spoken,notice:'Your draft was saved and can be revised or deleted anytime.'});return;
 }
 const savedSkill=routeSavedSkillRequest(question,state.skills);
 if(savedSkill?.kind==='list-skills'){
  companionReply(question,state.skills.length?'Your skills: '+state.skills.map(x=>x.name+' ('+x.status+')').join('; ')+'.':'You have no created skills yet. Say “Create a skill called Flight Deck Trainer that quizzes me on cockpit instruments”.',{spoken});return;
 }
 if(savedSkill?.kind==='skill-not-active'){
  companionReply(question,'“'+savedSkill.skill.name+'” is still a draft. Say “Try '+savedSkill.skill.name+' skill with a topic” or activate it when ready.',{spoken});return;
 }
 if(savedSkill?.kind==='set-skill-status'){
  const action=savedSkill.status==='active'?'activate':'deactivate';
  const updated=await api('skills',{action,id:savedSkill.skill.id});
  state.skills=state.skills.map(x=>x.id===updated.skill.id?updated.skill:x);
  state.forgedSkills=state.forgedSkills.map(x=>x.id===updated.skill.id?{...x,status:updated.skill.status}:x);
  companionReply(question,'“'+updated.skill.name+'” is now '+updated.skill.status+'. You can change this any time.',{spoken});return;
 }
 if(savedSkill?.kind==='run-skill'){
  const custom=state.forgedSkills.find(x=>x.id===savedSkill.skill.id);
  const prompt=custom?assembleForgedPrompt(custom,savedSkill.topic):buildSkillQuestion(savedSkill.skill,savedSkill.topic);
  const reply=await api('ask',{question:prompt,mode:savedSkill.skill.mode});
  companionReply(question,reply.answer,{spoken,reference:reply.knowledgeReference,notice:'Executed learner-created text skill “'+savedSkill.skill.name+'”. AI response, not a validated textbook answer.'});return;
 }

 const link=detectStudyLinkQuestion(question);
 if(link){
  const notice=await importStudyLink(link.url);
  if(state.linkSource?.status!=='ready'||state.linkText.length<40){companionReply(question,notice,{spoken});return}
  const source={type:state.linkSource.kind,url:state.linkSource.url||'',title:state.linkSource.title,text:state.linkText};
  const response=await api('ask',{question:link.question,mode:'teacher',source});
  companionReply(question,response.answer,{spoken,reference:response.knowledgeReference,notice:'Answer based on imported readable text only; verify the source.'});return;
 }
 const local=answerPersonalRequest(question,{schedule:state.schedule,tasks:state.tasks,memories:state.memories});
 if(local){companionReply(question,local.answer,{spoken,notice:'Answered locally using private study data.'});return}
 const skill=routeCompanionSkill(question);
 if(skill?.kind==='read-tasks'){
  const open=state.tasks.filter(t=>!t.done).slice(0,10);
  companionReply(question,open.length?'Your open tasks: '+open.map(x=>x.title+(x.due_date?' (due '+x.due_date+')':'')).join('; ')+'.':'You have no unfinished tasks.',{spoken});return;
 }
 if(skill?.kind==='read-notes'){
  companionReply(question,state.notes.length?'Your private note titles: '+state.notes.slice(0,10).map(n=>n.title).join('; ')+'.':'You have no saved notes.',{spoken});return;
 }
 if(skill?.kind==='read-schedule'){
  const active=state.schedule.filter(x=>x.enabled).slice(0,10);
  companionReply(question,active.length?'Your saved activities: '+active.map(x=>x.title+' at '+x.time).join('; ')+'.':'You have no active scheduled activities.',{spoken});return;
 }
 if(skill?.answer){companionReply(question,skill.answer,{spoken});return}
 if(skill?.kind?.startsWith('create-')){
  if(!confirm(skill.confirmation)){companionReply(question,'Nothing was saved. You can change the request whenever you like.',{spoken});return}
  const path={'create-task':'tasks','create-schedule':'schedule','create-note':'notes','create-memory':'personal-memory'}[skill.kind];
  if(!path)throw Error('The requested skill is not available.');
  await api(path,skill.payload);
  const data=await api(path);
  if(path==='schedule')state.schedule=data.items;
  else if(path==='personal-memory')state.memories=data.memories;
  else state[path]=data[path];
  companionReply(question,'Saved successfully. '+skill.notice,{spoken,notice:'Approved action saved to the learner account.'});return;
 }
 const answer=await api('ask',{question,mode:skill?.mode||state.mode});
 companionReply(question,answer.answer,{spoken,reference:answer.knowledgeReference,notice:'Saathi replied in '+(skill?.mode||state.mode)+' mode. Check important facts.'});
}

root.addEventListener('change',e=>{if(e.target?.id==='voice-locale'){micSession?.stop();voiceSpeaker().cancel();state.voiceLocale=normalizeSpeechLocale(e.target.value);flash('Voice language selected. Availability depends on the browser.')}if(e.target?.id==='voice-auto-send'){state.voiceAutoSend=e.target.checked;flash(state.voiceAutoSend?'After you tap Speak, final spoken questions will be submitted automatically.':'Spoken questions will wait for your review.')}});
root.addEventListener('submit',async e=>{
 e.preventDefault();const form=e.target,fd=new FormData(form);const btn=form.querySelector('[type=submit]');if(btn)btn.disabled=true;
 try{
 if(form.id==='media-study-form'){
   if(!state.mediaFile||!['image','video-frame-only'].includes(state.mediaKind))throw Error('Select a supported image or video frame.');
   state.mediaQuestion=String(fd.get('question')||'').trim();if(state.mediaQuestion.length<4)throw Error('Please enter a question.');
   const imageData=await captureMediaImage();
   if(!confirm('Send this single image/frame to Cloudflare Workers AI for analysis? No media file or answer will be saved to Saathi.')){flash('Analysis cancelled.');return}
   const label=state.mediaKind==='video-frame-only'?'This is one selected frame at '+state.mediaTimeLabel+' from a local video, not a full video. ':'';
   const answer=await api('analyze-image',{image:imageData,question:(label+state.mediaQuestion).slice(0,1600),confirm:'ANALYZE IMAGE'});
   state.mediaAnswer=answer.answer;render();flash('AI analysed one selected image. Verify visual details and any handwriting before use.');
 }
 if(form.id==='source-link-form'){state.linkQuestion='';const notice=await importStudyLink(String(fd.get('url')||'').trim());render();flash(notice);}
 if(form.id==='study-question-form'){state.linkText=String(fd.get('text')||'');state.linkQuestion=String(fd.get('question')||'');if(!state.linkSource)state.linkSource={kind:'manual',url:'',title:'Learner-pasted study passage'};const source={type:state.linkSource.kind==='manual'?'manual':state.linkSource.kind,url:state.linkSource.url||'',title:state.linkSource.title,text:state.linkText};const result=await api('ask',{mode:'teacher',question:state.linkQuestion,source});state.linkAnswer=result.answer;state.linkEvidence=result.sourceEvidence||[];render();flash('Answer based on the supplied source excerpts. Review the evidence and confirm accuracy.')}
 if(form.id==='memory-form'){const entry={action:fd.get('id')?'update':'create',category:fd.get('category'),text:fd.get('text'),useInChat:fd.get('useInChat')!==null};if(fd.get('id'))entry.id=fd.get('id');await api('personal-memory',entry);state.memories=(await api('personal-memory')).memories;render();flash(entry.useInChat?'Memory saved and enabled for AI recall.':'Memory saved privately without AI recall.');}
 if(form.id==='builder-new-form'||form.id==='builder-revise-form'){
  const prompt=String(fd.get('prompt')||'').trim();
  await runLearnerBuild(prompt,form.id==='builder-revise-form');return;
 }
 if(form.id==='device-pair-form'){
  devicePairToken=await pairLocalCompanion(String(fd.get('code')||'').trim());
  render();flash('Local helper paired in this browser tab. Supported actions remain permission-bound.');return;
 }
 if(form.id==='core-idea-form'){
  const idea=String(fd.get('idea')||'').trim();
  const result=await api('upgrade-requests',{action:'add',idea});render();flash('Core development idea saved privately for review. Reference '+result.id+'. No repository changes were made yet.');return;
 }
 if(form.id==='forge-form'){
  const entry={name:String(fd.get('name')||''),purpose:String(fd.get('purpose')||''),mode:String(fd.get('mode')||''),blueprint:String(fd.get('blueprint')||'')};
  const id=String(fd.get('id')||'');
  const payload=id?{...entry,action:'update',id,revision:Number(fd.get('revision'))}:{...entry,action:'create'};
  const result=await api('skills',payload);
  state.skills=(await api('skills')).skills;
  state.forgedSkills=(await api('auto-forge').catch(()=>({skills:[]}))).skills;
  render();flash('“'+result.skill.name+'” saved as a draft. Try it in Skill Forge or chat.');return;
 }
 if(form.id==='name-form'){const saved=await api('companion-preferences',{name:fd.get('name')});state.companionName=saved.name;state.nameConfigured=true;state.tab='home';render();flash('Your AI is now named '+saved.name+'. You can rename it whenever you like.')}
 if(form.id==='talk-form'){micSession?.stop();const requestedByVoice=voiceReplyRequested;voiceReplyRequested=false;if(requestedByVoice){voiceSpeaker().cancel();voiceStatus('working',voiceAcknowledgement('WORKING'));}const question=String(fd.get('question')||document.getElementById('question').value);await handleCompanionQuestion(question,requestedByVoice);}
 if(form.id==='note-form'){const item={title:fd.get('title'),body:fd.get('body')};if(fd.get('id')){item.action='update';item.id=fd.get('id')}await api('notes',item);await refresh('notes');flash('Note saved privately.')}
 if(form.id==='schedule-form'){const item={title:fd.get('title'),kind:fd.get('kind'),time:fd.get('time'),minutes:Number(fd.get('minutes')),days:fd.getAll('days').map(Number)};if(fd.get('id')){item.id=fd.get('id');item.action='update'}await api('schedule',item);await refresh('schedule');flash('Activity saved. Reminders only work when this page is open.') }
 }catch(err){flash(err.message)}finally{const button=form.querySelector('[type=submit]');if(button)button.disabled=false}
});
function checkReminders(){
 if(!state.user)return;const now=new Date(),day=now.getDay(),time=String(now.getHours()).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,'0');
 for(const item of state.schedule){const key=now.toDateString()+'/'+time+'/'+item.id;if(!item.enabled||item.time!==time||!item.days.includes(day)||state.seen.has(key))continue;state.seen.add(key);flash('Friendly reminder: '+item.title+'. Your choice to join in.');if(state.notifications&&!(state.pushStatus?.ready&&state.pushStatus?.devices>0)&&'Notification' in window&&Notification.permission==='granted')new Notification('Saathi activity reminder',{body:item.title+' · '+item.minutes+' minutes'})}
 if(state.seen.size>200)state.seen.clear();
}
async function init(){
 try{state.user=await api('me');if(state.user.role!=='student'){root.innerHTML='<main class="boot"><h1>Student-only space</h1><a href="/">Back to dashboard</a></main>';return}const [notes,schedule,tasks,prefs,packs,memories,mediaStatus,adaptivePlan,pushStatus,welcome,skillData,buildData,forgedData,installedData,coreCatalog]=await Promise.all([api('notes'),api('schedule'),api('tasks'),api('companion-preferences'),api('knowledge-packs').catch(()=>({packs:[]})),api('personal-memory'),api('media-status').catch(()=>({enabled:false})),api('adaptive-plan').catch(()=>null),api('push-device').catch(()=>({ready:false,notice:'Background push status unavailable; export a calendar instead.'})),api('welcome-once').catch(()=>null),api('skills').catch(()=>({skills:[],unavailable:true})),api('builder-lab').catch(()=>({projects:[],unavailable:true})),api('auto-forge').catch(()=>({skills:[]})),api('installed-features').catch(()=>({features:[],unavailable:true})),fetch('/core-skills/catalog.json',{credentials:'omit'}).then(r=>r.ok?r.json():null).catch(()=>null)]);state.coreSkills=validateCoreSkills(coreCatalog);state.installedFeatures=installedData.features||[];state.installedAvailable=installedData.unavailable!==true;state.forgedSkills=forgedData.skills||[];state.builds=buildData.projects||[];state.builderAvailable=buildData.unavailable!==true;state.skills=skillData.skills||[];state.forgeAvailable=skillData.unavailable!==true;state.notes=notes.notes;state.schedule=schedule.items;state.tasks=tasks.tasks;state.knowledgePacks=packs.packs;state.memories=memories.memories;state.visionEnabled=mediaStatus.enabled===true;state.adaptivePlan=adaptivePlan;state.pushStatus=pushStatus;state.welcome=welcome;state.companionName=prefs.name;state.nameConfigured=prefs.configured;if(!prefs.configured)state.tab='identity';render();setInterval(checkReminders,30000)}catch{root.innerHTML='<main class="boot"><h1>Sign in as a student</h1><p>Mission Control requires the learner login.</p><a href="/">Go to learner login</a></main>'}
}
init();
