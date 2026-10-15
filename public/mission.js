import {buildCalendar} from './calendar-export.js';
import {matchVoiceCommand} from './voice-commands.js';
import {createSketchState} from './sketch-state.js';
import {buildDailyBrief} from './daily-brief.js';
import {detectStudyLinkQuestion} from './link-intent.js';
import {stripCompanionCall,DEFAULT_COMPANION_NAME} from './companion-name.js';
import {answerPersonalRequest} from './personal-requests.js';
import {routeCompanionSkill} from './companion-skill-router.js';
import {createVoiceReadback} from './voice-readback.js';
import {createVoiceCapture,voiceAcknowledgement} from './voice-interaction.js';
import {detectMediaFile,frameTimeLabel} from './media-file.js';
const root=document.getElementById('mission-root');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const state={user:null,tab:'home',mode:'companion',notes:[],schedule:[],tasks:[],knowledgePacks:[],packId:null,memories:[],linkSource:null,linkUrl:'',linkText:'',linkQuestion:'',linkAnswer:'',linkEvidence:[],answer:'',answerReference:null,mediaFile:null,mediaObjectUrl:null,mediaKind:null,mediaQuestion:'',mediaAnswer:'',mediaTimeLabel:null,visionEnabled:false,adaptivePlan:null,companionName:DEFAULT_COMPANION_NAME,nameConfigured:false,notifications:false,pushStatus:null,welcome:null,seen:new Set(),conversation:[]};
const sketchState=createSketchState();
let micSession=null,voiceReplyRequested=false,spokenReply=null;
function voiceSpeaker(){
 if(!spokenReply)spokenReply=createVoiceReadback({
  synthesis:window.speechSynthesis,UtteranceClass:window.SpeechSynthesisUtterance,
  onError:()=>flash('Browser voice playback is unavailable; the written reply is still visible.')
 });
 return spokenReply;
}
function announce(text){return voiceSpeaker().speak(text)}
function voiceStatus(phase,message){
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
function home(){
 const briefing=buildDailyBrief({schedule:state.schedule,tasks:state.tasks});
 const agenda=briefing.todayEvents.slice(0,6).map(x=>'<div class="listitem"><strong>'+esc(x.time)+'</strong><span>'+esc(x.title)+'</span><span class="small">'+Number(x.minutes)+' min</span></div>').join('');
 const overview='<section class="card" style="margin-top:20px"><span class="chip">Today · '+esc(briefing.dateLabel)+'</span><h2 style="margin-top:15px">Your daily briefing</h2><p class="muted">'+esc(briefing.nextStep)+'</p><div class="row"><span class="tag">'+briefing.openTasks+' unfinished study tasks</span><span class="tag">'+briefing.dueToday+' due today</span>'+(briefing.overdue?'<span class="tag">'+briefing.overdue+' past due — adjust if needed</span>':'')+'</div><h3 style="margin-top:21px">Your activity plan</h3>'+(agenda||'<p class="small">Nothing scheduled today. Try a short lesson, art or time outside.</p>')+'<div class="actions"><button class="btn secondary" data-tab="schedule">Edit my schedule</button><a class="btn ghost" href="/">My study tasks</a></div></section>';
 return '<section class="hero"><div><span class="tag">A birthday gift · Your future starts here</span><h2 style="font-size:clamp(27px,3vw,43px);line-height:1.15;letter-spacing:-.04em;margin:22px 0">Future pilot.<br>Original artist.<br>Your own story.</h2><p class="sub">One question, one drawing, one game, one great day. Your AI companion is here to help you explore—not tell you who to be.</p><div class="actions">'+button('companion','Talk with '+esc(state.companionName))+button('pilot','Explore aviation')+'</div></div><div class="orb"><div class="orbit">S</div></div></section><div class="tiles"><section class="card"><h2>Flight deck</h2><p class="muted">Discover aircraft, physics, maths and aviation.</p>'+button('pilot','Start flying lessons')+'</section><section class="card"><h2>Creative studio</h2><p class="muted">Sketch, experiment with colour and express your modern-art ideas.</p>'+button('art','Open sketchbook')+'</section><section class="card"><h2>Balanced daily life</h2><p class="muted">'+state.schedule.length+' scheduled activities, including exercise, sport and rest.</p>'+button('schedule','My scheduler')+'</section><section class="card"><h2>Private notebook</h2><p class="muted">'+state.notes.length+' notes. Keep sketches, questions and ideas in writing.</p>'+button('notes','Open notes')+'</section><section class="card wide"><h2>Learn from any study material you can share</h2><p class="muted">Post a supported educational webpage or YouTube link. Saathi can read selected public text pages, or discuss captions you paste from a video. It will show the evidence available instead of inventing video content.</p>'+button('links','Open Study links')+'</section></div>'+overview;
}
function companion(){
 const history=state.conversation.slice(0,-1).slice(-12).map(entry=>'<div class="listitem"><div><strong>'+esc(entry.role==='student'?'You':state.companionName)+'</strong><p style="white-space:pre-wrap;overflow-wrap:anywhere">'+esc(entry.text)+'</p></div></div>').join('');
 const modes=[['companion','Companion'],['teacher','Patient teacher'],['planner','Organiser'],['pilot','Pilot mentor'],['artist','Art mentor']];
 return '<section class="card"><h2>What is on your mind?</h2><div class="modebuttons">'+modes.map(x=>'<button type="button" data-mode="'+x[0]+'" class="'+(state.mode===x[0]?'active':'')+'">'+x[1]+'</button>').join('')+'</div><p class="muted">'+esc(state.companionName)+' is your AI assistant, not a human friend or professional adviser. It can teach and help you save a task, routine, private note or memory after you confirm. Background notifications depend on device readiness. For Maths, Physics, Chemistry or Biology, ask one question at a time and request worked steps. For checked answers, use <a href="/">Lessons &amp; practice</a> in your learning workspace.</p><div class="saathi-voice-indicator" id="saathi-voice-indicator" data-phase="ready" role="status" aria-live="polite"><span aria-hidden="true" class="saathi-voice-ring"></span>Tap Speak to start listening</div><div role="log" aria-label="Recent conversation">'+history+'</div><form id="talk-form"><label class="form-field">Your question or idea<textarea id="question" required minlength="4" maxlength="1600" placeholder="Help me understand Newton’s laws using an aircraft"></textarea></label><label class="form-field">Attach a study image, PDF, Word, PowerPoint or text file<input id="companion-file" type="file" accept=".png,.jpg,.jpeg,.webp,.pdf,.docx,.pptx,.txt,text/plain,image/png,image/jpeg,image/webp,application/pdf"></label><div class="actions"><button class="btn" type="submit" id="ask-button">Ask '+esc(state.companionName)+'</button><button class="btn secondary" id="voice" type="button">🎙 Speak</button><button class="btn ghost" type="button" id="speak-answer" '+(state.answer?'':'disabled')+'>Read reply aloud</button></div></form><div class="actions"><button type="button" class="btn secondary" data-memory-draft="1">Save a memory from my question (review first)</button></div><p class="small">Microphone activates only when you press Speak. Partial transcripts are drafts and nothing is submitted until you select Ask; spoken questions can receive a spoken reply. Browser speech recognition may use a vendor service. AI messages are not saved in the app’s database but are sent to Cloudflare Workers AI for processing.</p>'+(state.answer?'<div class="ai-answer" id="answer">'+esc(state.answer)+'</div>'+(state.answerReference?'<p class="small">Related reference: <a href="'+esc(state.answerReference.url)+'" target="_blank" rel="noopener noreferrer">'+esc(state.answerReference.publisher)+' · '+esc(state.answerReference.title)+' ↗</a>. This does not certify the AI answer.</p>':''):'<p class="notice">Try: “What’s my plan today?”, “What should I do next?”, “Why do planes fly?” or “Give me an abstract painting idea”.</p>')+'</section>';
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
 return '<section class="hero"><div><span class="tag">Mission · Future pilot</span><h2 style="font-size:35px">The sky is worth exploring.</h2><p class="sub">Start with curiosity, then develop Maths and Physics through real concepts. For learning only—not actual flight instructions.</p><div class="actions">'+button('companion','Ask your aviation mentor')+'</div></div><div class="orb"><div class="orbit">✈</div></div></section><div class="tiles"><section class="card"><h2>Forces of flight</h2><p class="muted">Lift, weight, thrust and drag. Draw an airplane and four arrows, then talk through what each force does.</p><button class="btn secondary" data-ask-pilot="Explain lift, weight, thrust and drag to a beginner using simple physics">Explore four forces</button></section><section class="card"><h2>Pilot maths</h2><p class="muted">Angles, time, distance and rate; build confidence with worked steps instead of memorising answers.</p><button class="btn secondary" data-ask-pilot="Give me one beginner maths question linked to aviation, then help me solve it step by step">Practise Maths</button></section><section class="card"><h2>Why weather matters</h2><p class="muted">Clouds, air pressure and wind as science topics. This section does not provide real flight decisions or weather briefings.</p><button class="btn secondary" data-ask-pilot="Teach me how air pressure relates to weather, with a simple experiment at home">Study weather</button></section><section class="card"><h2>Official India pathway</h2><p class="muted">DGCA states Physics and Mathematics at 10+2 for flight-crew examination registration other than the PPL category. Confirm current licensing through DGCA rather than relying on AI.</p><a href="https://pariksha.dgca.gov.in/Form/PLT_FAQs" target="_blank" rel="noopener noreferrer">Official DGCA FAQ ↗</a></section></div><section class="card" style="margin-top:18px"><h2>Art and flight belong together</h2><p class="muted">Sketch an imaginary aircraft using geometric shapes, then name your design. Your creativity is part of the journey.</p>'+button('art','Draw aircraft art')+'</section>';
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
root.addEventListener('click',async e=>{
 const b=e.target.closest('button');if(!b)return;
 const dataset=b.dataset;
 if(dataset.dismissWelcome){if(dataset.dismissWelcome!==state.welcome?.version)return;try{await api('welcome-once',{action:'dismiss',version:dataset.dismissWelcome});state.welcome={...state.welcome,show:false};render();flash('Enjoy exploring Saathi!')}catch(err){flash('Could not save your choice: '+err.message)}return}
 if(dataset.tab){voiceReplyRequested=false;micSession?.stop();state.tab=dataset.tab;render();return}
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
 if(dataset.askPilot){state.mode='pilot';state.tab='companion';render();document.getElementById('question').value=dataset.askPilot;return}
 if(dataset.memoryDraft){const q=document.getElementById('question');const draft=q?.value||'';state.tab='memory';render();const f=document.getElementById('memory-form');f.elements.text.value=draft.slice(0,240);f.elements.text.focus();flash('Review and explicitly save this memory. AI recall is off unless you choose it.');return}
 if(dataset.pack){state.packId=dataset.pack==='all'?null:dataset.pack;state.tab='knowledge';render();return}
 if(dataset.knowledgeQuestion){const pack=state.knowledgePacks.find(p=>p.id===state.packId),module=pack?.modules.find(m=>m.id===dataset.knowledgeQuestion);if(module){state.mode=pack.id==='aviation'?'pilot':pack.id==='art'?'artist':pack.id==='study-skills'?'planner':'teacher';state.tab='companion';render();document.getElementById('question').value='Please explain '+module.title+' step by step using an example and one practice question.';}return}
 try{
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
 if(b.id==='voice'){
  if(micSession?.isListening()){micSession.stop();voiceStatus('ready','Microphone stopped. No question was sent.');return;}
  const Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(typeof Recognition!=='function'){voiceStatus('error','Speech recognition is unavailable here. You can type instead.');return;}
  voiceSpeaker().cancel();
  voiceReplyRequested=false;
  micSession=createVoiceCapture({
   RecognitionClass:Recognition,
   onDraft:text=>{
    const draft=stripCompanionCall(text,state.nameConfigured?state.companionName:null);
    const field=document.getElementById('question');
    if(field)field.value=draft;
    voiceStatus('listening','Listening: '+draft+' (draft only; not sent)');
   },
   onFinal:raw=>{
    const phrase=stripCompanionCall(raw,state.nameConfigured?state.companionName:null);
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
    voiceReplyRequested=true;
    voiceStatus('heard','I heard your question. Review it and select Ask to send it.');
    announce(voiceAcknowledgement('HEARD'));
   },
   onState:phase=>{if(phase==='LISTENING')voiceStatus('listening','Listening after your tap. Audio may be processed by the browser vendor.');if(phase==='STOPPED')voiceStatus('ready','Microphone stopped. Review the draft and select Ask to send it.');},
   onError:code=>voiceStatus('error',code==='MIC_PERMISSION_DENIED'
    ?'Microphone permission was denied. Allow the mic in browser settings or type.'
    :'Voice recognition is unavailable. Type your question instead.')
  });
  micSession.start();return;
 }
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
root.addEventListener('change',async e=>{
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
 if(form.id==='name-form'){const saved=await api('companion-preferences',{name:fd.get('name')});state.companionName=saved.name;state.nameConfigured=true;state.tab='home';render();flash('Your AI is now named '+saved.name+'. You can rename it whenever you like.')}
 if(form.id==='talk-form'){micSession?.stop();const requestedByVoice=voiceReplyRequested;voiceReplyRequested=false;if(requestedByVoice){voiceSpeaker().cancel();voiceStatus('working',voiceAcknowledgement('WORKING'));}const question=String(fd.get('question')||document.getElementById('question').value);const link=detectStudyLinkQuestion(question);if(link){state.tab='links';state.linkQuestion=link.question;const notice=await importStudyLink(link.url);render();flash(notice+' Continue with the study text.');}else{const phrase=stripCompanionCall(question,state.nameConfigured?state.companionName:null);const local=answerPersonalRequest(phrase,{schedule:state.schedule,tasks:state.tasks,memories:state.memories});if(local){state.answer=local.answer;render();flash('Daily briefing from your private schedule — no AI quota used.');if(requestedByVoice){voiceStatus('answered','Reply ready. Check the explanation.');announce(state.answer);}}else{const answer=await api('ask',{question,mode:state.mode});state.answer=answer.answer;state.answerReference=answer.knowledgeReference;render();flash(state.companionName+' replied. Check important facts against your school materials.');if(requestedByVoice){voiceStatus('answered','Reply ready. Check the explanation.');announce(state.answer);}}}}
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
 try{state.user=await api('me');if(state.user.role!=='student'){root.innerHTML='<main class="boot"><h1>Student-only space</h1><a href="/">Back to dashboard</a></main>';return}const [notes,schedule,tasks,prefs,packs,memories,mediaStatus,adaptivePlan,pushStatus,welcome]=await Promise.all([api('notes'),api('schedule'),api('tasks'),api('companion-preferences'),api('knowledge-packs').catch(()=>({packs:[]})),api('personal-memory'),api('media-status').catch(()=>({enabled:false})),api('adaptive-plan').catch(()=>null),api('push-device').catch(()=>({ready:false,notice:'Background push status unavailable; export a calendar instead.'})),api('welcome-once').catch(()=>null)]);state.notes=notes.notes;state.schedule=schedule.items;state.tasks=tasks.tasks;state.knowledgePacks=packs.packs;state.memories=memories.memories;state.visionEnabled=mediaStatus.enabled===true;state.adaptivePlan=adaptivePlan;state.pushStatus=pushStatus;state.welcome=welcome;state.companionName=prefs.name;state.nameConfigured=prefs.configured;if(!prefs.configured)state.tab='identity';render();setInterval(checkReminders,30000)}catch{root.innerHTML='<main class="boot"><h1>Sign in as a student</h1><p>Mission Control requires the learner login.</p><a href="/">Go to learner login</a></main>'}
}
init();
