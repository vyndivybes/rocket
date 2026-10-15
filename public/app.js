import {renderAdminOverview} from './admin-overview.js';
import {renderMyDay,renderMySpace} from './experience-ui.js';
import {renderGuidedTeaching,extractPracticePrompt} from './guided-ui.js';
const root=document.querySelector('#app');
let currentUser=null, tasks=[], topics=[], references=[], profile=null, lessons=[], practice={total:0,correct:0,byLesson:[]},activeLessonId=null,activeQuestionId='base',tab='overview',experience=null,ideas=[],experienceReady=false,guidedContext=null;
const escapeHtml=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const $=(id)=>document.getElementById(id);
async function api(path,options={}){
  const opts={credentials:'same-origin',...options,headers:{'Content-Type':'application/json',...(options.headers||{})}};
  let response;try{response=await fetch('/api/'+path,opts)}catch{throw Error('Network unavailable. Try again later.')}let data;
  try{data=await response.json()}catch{throw Error('Service returned an unexpected response')}
  if(!response.ok)throw Error(data.error||'Request failed');return data;
}
const post=(path,body)=>api(path,{method:'POST',body:JSON.stringify(body)});
function showMessage(text,good=false){const e=$('message');if(!e)return;e.textContent=text;e.className=good?'ok':'danger';e.hidden=!text;}
async function init(){try{currentUser=await api('me');await loadView();}catch{renderLogin()}}
function renderLogin(){root.innerHTML=`<div class="login-wrap"><main class="login-card"><div class="logo-mark" aria-hidden="true">S</div><div class="eyebrow" style="margin-top:18px">Student-first AI</div><h1>Meet Saathi.</h1><p class="muted">A calmer way to learn, plan and make progress in Class 12.</p><form id="login-form"><label class="field">Username<input name="username" autocomplete="username" required minlength="3" maxlength="40"></label><label class="field">Private access key<input name="password" type="password" autocomplete="current-password" required minlength="64" maxlength="64" pattern="[a-f0-9]{64}"></label><button type="submit" class="btn">Sign in securely</button></form><p id="message" hidden role="alert"></p><div class="divider"></div><p class="notice">Private access only. A parent or operator must provision student and guardian accounts. Conversations are not stored. Saathi is an AI, not a person or crisis service.</p></main></div>`;
  $('login-form').onsubmit=async(e)=>{e.preventDefault();const b=Object.fromEntries(new FormData(e.currentTarget));try{await post('login',b);currentUser=await api('me');await loadView()}catch(err){showMessage(err.message)}};
}
async function loadView(){
 if(currentUser?.role==='student'){
  const [a,b,p,l,v]=await Promise.all([api('tasks'),api('topics'),api('profile'),api('lessons'),api('practice')]);
  tasks=a.tasks;topics=b.topics;references=b.sources;profile=p.profile;lessons=l.lessons;practice=v.progress;
  const [setting,proposals]=await Promise.allSettled([api('experience'),api('upgrade-requests')]);
  experienceReady=setting.status==='fulfilled'&&proposals.status==='fulfilled';
  experience=setting.status==='fulfilled'?setting.value.preferences:null;
  ideas=proposals.status==='fulfilled'?proposals.value.ideas:[];
  if(!profile)tab='setup';
  else {
   const requested=new URLSearchParams(location.search).get('lesson');
   if(requested&&lessons.some(x=>x.id===requested)){activeLessonId=requested;activeQuestionId='base';tab='lesson';}
  }
 }
 renderApp();
}
function sidebar(){return `<aside class="rail"><div><div class="brand">saathi<span style="color:#d1ba7e">.</span></div><div class="subtitle">study and grow</div></div><nav aria-label="Main navigation">${(currentUser.role==='admin'?[['overview','Administration']]:currentUser.role==='parent'?[['overview','Parent overview']]:[['overview','My day'],['myspace','My Saathi'],['setup','My subjects'],['library','Lessons & practice'],['teacher','Ask Saathi'],['planner','Study planner']]).map(([id,label])=>`<button type="button" data-tab="${id}" class="nav-item ${tab===id?'selected':''}">${label}</button>`).join('')}</nav>${currentUser.role==='student'?'<a class="nav-item" href="/syllabus.html" style="display:block;text-decoration:none">2026–27 Syllabus</a><a class="nav-item" href="/mission.html" style="display:block;text-decoration:none;font-weight:700;background:#244e5d;color:#e6fff7">✦ Mission Control</a>':''}<div class="foot">Your ideas belong to you.<br>AI cannot replace people, teachers or emergency care.</div><button id="logout" class="btn outline" style="color:white">Sign out</button></aside>`}
function renderApp(){
 if(currentUser?.role==='student'){
  document.documentElement.dataset.saathiTheme=experience?.theme||'sky';
  document.documentElement.dataset.saathiTextSize=experience?.textSize||'normal';
 }else{
  delete document.documentElement.dataset.saathiTheme;
  delete document.documentElement.dataset.saathiTextSize;
 }
 root.innerHTML=`<div class="layout">${sidebar()}<main class="main"><div class="top"><div><div class="eyebrow">${currentUser.role==='admin'?'Administration':currentUser.role==='parent'?'Guardian view':'Class 12 workspace'}</div><h1>${currentUser.role==='admin'?'Administration':({overview:'My day',myspace:'My Saathi',setup:'Set up your studies',lesson:'Guided chapter lesson',teacher:'Ask Saathi',planner:'Study planner',library:'Lessons & practice'})[tab]}</h1><p class="muted">${currentUser.role==='admin'?'Manage the application, not private student conversations.':currentUser.role==='parent'?'Only aggregate commitments — never private conversations.':'Small steps. Real progress. You decide the pace.'}</p></div><span class="chip">${escapeHtml(currentUser.board||'Not configured')}</span></div><div id="message" role="status" hidden></div><div id="content">${content()}</div><footer>Saathi v0.1 · Study helper, not a substitute for your teacher or trusted adults. Academic outputs need verification. · <a href="/privacy.html">Privacy & safety</a></footer></main></div>`;
  document.querySelectorAll('[data-tab]').forEach(btn=>btn.addEventListener('click',()=>{if(currentUser?.role==='student'&&btn.dataset.tab==='teacher'){window.location.assign('/mission.html');return;}tab=btn.dataset.tab;renderApp()}));
  $('logout').onclick=async()=>{await post('logout',{}).catch(()=>{});currentUser=null;experience=null;ideas=[];experienceReady=false;guidedContext=null;delete document.documentElement.dataset.saathiTheme;delete document.documentElement.dataset.saathiTextSize;tab='overview';renderLogin()};
  wire();
  if(currentUser.role==='admin')void refreshAdminSummary();
}
async function refreshAdminSummary(){
  const container=$('admin-stats');
  if(!container)return;
  container.setAttribute('aria-busy','true');
  try{
    const data=await api('admin-summary');
    if($('admin-stats'))$('admin-stats').innerHTML=renderAdminOverview(data);
  }catch(err){
    if($('admin-stats'))$('admin-stats').textContent='Unable to load operational overview.';
    showMessage(err.message);
  }finally{if($('admin-stats'))$('admin-stats').removeAttribute('aria-busy');}
}
function setupView(){
 const current=profile||{board:'unconfigured',stream:'Science',subjects:['Physics','Chemistry','Mathematics','Biology'],dailyMinutes:30};
 const subjects=['Physics','Chemistry','Mathematics','Biology','Accountancy','Economics','History','English','English Elective'];
 const boards=['unconfigured','CBSE','ISC','State','Other'],streams=['Science','Commerce','Humanities','Mixed'];
 const opts=(values,chosen)=>values.map(v=>`<option value="${escapeHtml(v)}" ${v===chosen?'selected':''}>${escapeHtml(v==='unconfigured'?'Choose later':v)}</option>`).join('');
 return `<div class="grid"><section class="card wide"><span class="chip">Your choice, your pace</span><h2 style="margin-top:13px">Make Saathi useful for your subjects</h2><p class="muted">Select what you actually study. You can update this any time. No school name, location or date of birth is needed.</p><form id="profile-form"><div class="grid"><div><label class="field">Board<select name="board">${opts(boards,current.board)}</select></label><label class="field">Study stream<select name="stream">${opts(streams,current.stream)}</select></label></div><div><label class="field">Daily target<select name="dailyMinutes">${opts([20,30,45,60].map(String),String(current.dailyMinutes))}</select></label><p class="notice">A daily target is a guide, not a grade. Remember breaks and other activities.</p></div></div><fieldset class="subject-fieldset"><legend>Choose subjects</legend><div class="subject-choices">${subjects.map(s=>`<label class="subject-choice"><input type="checkbox" name="subjects" value="${escapeHtml(s)}" ${current.subjects.includes(s)?'checked':''}> ${escapeHtml(s==='English'?'English (course unspecified)':s==='English Elective'?'English Elective (001) – NCERT Kaleidoscope':s)}</label>`).join('')}</div></fieldset><p class="notice">For English Elective (001), select “English Elective” and deselect “English (course unspecified)”. This records a learner choice; school verification remains pending.</p><div class="row" style="margin-top:18px"><button class="btn" type="submit">Save my subjects</button><span class="notice">Foundation lessons only; verify your exact school syllabus.</span></div></form></section></div>`;
}
function libraryView(){
 if(!lessons.length)return `<div class="card"><h2>No lessons selected</h2><p>Choose subjects under My subjects, then open your first lesson.</p><button class="btn" data-go="setup">Choose subjects</button></div>`;
 return `<div class="grid"><section class="card wide"><h2>Start with one concept</h2><p class="muted">Read a worked example, answer a short practice question, and see why it is correct. No AI requests are needed for these lessons.</p><div class="row"><span class="chip">${practice.total} attempts</span><span class="chip">${practice.correct} correct</span></div><p class="notice">Original foundation exercises and draft chapter lessons are available. Chapter drafts remain unreviewed and do not replace prescribed Class 12 textbooks.</p></section>${lessons.map(x=>`<section class="card"><span class="chip">${escapeHtml(x.subject)} · ~${Number(x.duration)||10} minutes</span><h2 style="margin-top:13px">${escapeHtml(x.title)}</h2><p class="muted">${escapeHtml(x.concept)}</p><button type="button" class="btn secondary" data-lesson="${escapeHtml(x.id)}">Open lesson</button></section>`).join('')}</div>`;
}
function lessonView(){
 const x=lessons.find(l=>l.id===activeLessonId);
 if(!x)return `<div class="card"><p>Lesson not found.</p><button class="btn secondary" data-go="library">Back to lessons</button></div>`;
 const available=x.questions?.length?x.questions:[{id:'base',prompt:x.question,options:x.options}];
 const q=available.find(item=>item.id===activeQuestionId)||available[0];
 const rev=practice.lessonRevision?.find(item=>item.lessonId===x.id);
 const label=rev?`${rev.distinctQuestionsAttempted} of ${rev.questionCount} distinct questions tried · ${rev.attempts} total attempts. ${rev.revision==='review_and_practise'?'Review explanations and try another question.':rev.revision==='independent_review_required'?'All bank questions attempted; ask a teacher for independently assessed questions.':'Try a different question.'} These exercises do not certify mastery.`:'Each exercise is a short foundation check, not chapter certification.';
 const objectives=x.learningObjectives?.length?'<h3>Learning goals</h3><ul>'+x.learningObjectives.map(y=>'<li>'+escapeHtml(y)+'</li>').join('')+'</ul>':'';
 const misconception=x.misconception?'<h3>Common misconception</h3><p class="notice">'+escapeHtml(x.misconception)+'</p>':'';
 const guided=x.guidedSubtopics?.length?'<h3>Guided chapter learning path ('+x.guidedSubtopics.length+' topics)</h3><p class="notice">Read each explanation and try the application question independently. This is an expanded editorial draft; text-specific or laboratory requirements still need qualified review.</p><ol>'+x.guidedSubtopics.map((step,i)=>'<li style="padding:10px 0"><h4>'+escapeHtml((i+1)+'. '+step.heading)+'</h4><p>'+escapeHtml(step.explanation)+'</p><details><summary>Try a guided application</summary><p>'+escapeHtml(step.tryIt)+'</p></details></li>').join('')+'</ol>':'';
 const draftNote=x.reviewStatus==='teacher_review_required'?'<p class="notice"><strong>Draft chapter lesson — teacher/content verification pending. Not full NCERT coverage or exam certification.</strong></p>':'';
 const verifiedIndex=x.ncertExerciseQuestionCount!==null?
  '<section class="card wide"><h2>NCERT indexed exercise solutions</h2>'+
  '<p class="notice">'+(x.ncertSourceEditionVerified===false?'SOURCE EDITION HOLD: current PDF page footer differs from extracted reprint metadata. Exercise numbers are provisional for the 2026–27 edition. ':'Printed exercise numbering follows the cited NCERT source. ')+'Original worked drafts: '+(x.ncertExerciseSolutions?.length||0)+' of '+x.ncertExerciseQuestionCount+'. These are not independently certified and do not replace the actual textbook questions.</p>'+
  '<p><a target="_blank" rel="noopener noreferrer" href="'+escapeHtml(x.ncertOfficialSourceUrl)+'">Open the official NCERT '+escapeHtml(x.ncertSourceReprint)+' chapter PDF and locate its question number</a></p>'+

  (x.ncertExerciseSolutions||[]).map(item=>'<details style="margin:9px 0"><summary><strong>'+escapeHtml(item.questionId)+'</strong> · '+escapeHtml(item.problemFocus)+' · draft answer</summary>'+
    '<ol>'+item.steps.map(step=>'<li>'+escapeHtml(step)+'</li>').join('')+'</ol>'+
    '<p><strong>Result:</strong> '+escapeHtml(item.answer)+'</p><p><strong>Check:</strong> '+escapeHtml(item.check)+'</p>'+
    '<p><strong>Formative marking checklist (not an official marking scheme):</strong></p><ul>'+item.selfCheckRubric.map(rule=>'<li>'+escapeHtml(rule)+'</li>').join('')+'</ul>'+
    (item.diagram?'<p><strong>Original schematic:</strong></p><pre style="white-space:pre-wrap">'+escapeHtml(item.diagram)+'</pre>':'')+'</details>').join('')+
   '</section>':'';
 const exerciseCoach=x.curriculumStage==='chapter_draft'?`
 <section class="card wide"><h2>NCERT exercise help</h2>
 <p class="notice">Exercise help does not certify full NCERT textbook coverage. Open your own NCERT textbook and enter the printed reference and question. Saathi does not fetch or store the textbook text.</p>
 <form id="ncert-exercise-form">
 <label class="field">Printed exercise and question number<input name="exerciseRef" placeholder="Exercise 1.1 Q3" maxlength="60" required></label>
 <label class="field">Question text from your textbook<textarea name="questionText" rows="5" minlength="40" maxlength="1800" required placeholder="Type the question, including relevant values and units."></textarea></label>
 <label class="field">Help level<select name="level"><option value="hint">Hint and first step</option><option value="steps">Step-by-step solution</option></select></label>
 <button type="submit" class="btn secondary">Explain this exercise</button></form>
 <p id="ncert-exercise-feedback" role="status" aria-live="polite" style="white-space:pre-wrap"></p>
 <p class="notice">AI answers can be wrong. Check the textbook or teacher. The question is not stored.</p>
 </section>`:'';
 return `<div class="grid">
 <section class="card wide"><button class="btn small secondary" data-go="library">← All lessons</button>
 <div style="margin-top:15px"><span class="chip">${escapeHtml(x.subject)}</span>
 <h2 style="margin-top:12px">${escapeHtml(x.title)}</h2>${draftNote}${objectives}<p>${escapeHtml(x.concept)}</p>${guided}${misconception}
 <h2>Worked example</h2><p class="worked-example">${escapeHtml(x.example)}</p>
 <p class="notice">${escapeHtml(x.source)}</p></div></section>
 <section class="card wide"><h2>Practice questions</h2>
 <label class="field">Choose a question<select id="question-select" aria-label="Practice question">
 ${available.map((item,i)=>`<option value="${escapeHtml(item.id)}" ${q.id===item.id?'selected':''}>Question ${i+1} of ${available.length}</option>`).join('')}
 </select></label><p class="notice" id="lesson-revision">${escapeHtml(label)}</p>
 ${rev?.nextQuestionId?`<button class="btn small secondary" type="button" id="next-question">Open recommended question</button>`:''}
 <p>${escapeHtml(q.prompt)}</p>
 <form id="practice-form">${q.options.map((option,i)=>`<label class="practice-option"><input type="radio" name="choice" value="${i}" required> ${escapeHtml(option)}</label>`).join('')}
 <button class="btn" type="submit">Check my answer</button></form>
 <div id="practice-feedback" role="status" aria-live="polite" style="margin-top:15px"></div>
 <p class="notice">Feedback is provided after submitting. Answers remain on the server.</p></section>${verifiedIndex}${exerciseCoach}</div>`;
}
function homeView(){
 return renderMyDay({tasks,practice,lessons,prefs:experience});
}
function content(){if(currentUser.role==='admin')return `<div><div class="row between" style="margin:24px 0 10px"><h2>System overview</h2><button id="admin-summary" type="button" class="btn secondary">Refresh overview</button></div><div id="admin-stats" aria-live="polite" class="muted">Loading operational information…</div></div>`;if(currentUser.role==='parent')return `<div class="grid"><section class="card wide"><h2>Shared study progress</h2><p class="muted">Student-approved task counts, without notes, chat history or emotional monitoring.</p><button class="btn secondary" id="summary">Refresh summary</button><div id="aggregate" class="metric" style="margin-top:16px">—</div><p class="notice">There are no automatic safety alerts in this prototype. If a child may be unsafe, contact appropriate trusted people directly.</p></section></div>`;
  if(tab==='myspace')return renderMySpace(experience,ideas,experienceReady?'ready':'unavailable');
  if(tab==='setup')return setupView();
  if(tab==='library')return libraryView();
  if(tab==='lesson')return lessonView();
  if(tab==='overview')return homeView();
  if(tab==='teacher')return `<div class="grid">${renderGuidedTeaching(lessons)}<section class="card wide"><span class="chip">Ask, understand, practise</span><h2 style="margin-top:15px">What are you working on?</h2><form id="ask-form"><label class="field">Your question<textarea id="question" maxlength="1600" required placeholder="Why does changing magnetic flux induce an emf?"></textarea></label><div class="row"><button class="btn" type="submit">Explain it</button><span class="notice">12 requests per day · No chat transcript stored</span></div></form><div id="answer-wrap" hidden><h2 style="margin-top:25px">Saathi's response</h2><div class="answer" id="answer"></div><p class="notice" id="answer-note"></p></div></section></div>`;
  if(tab==='planner')return `<div class="grid"><section class="card"><h2>Add a study commitment</h2><form id="task-form"><label class="field">Task<input name="title" maxlength="180" minlength="2" required placeholder="Revise electromagnetic induction"></label><label class="field">Subject<input name="subject" maxlength="50" placeholder="Physics"></label><label class="field">Due date<input type="date" name="due_date"></label><button type="submit" class="btn">Add task</button></form></section><section class="card"><h2>My study commitments</h2><div id="task-list">${taskList()}</div></section></div>`;
  if(tab==='library')return `<div class="grid"><section class="card wide"><h2>Start with a concept</h2><p class="muted">Illustrative Class 12 topics, not a certified curriculum. Ask your school for your board's current syllabus.</p><div class="topic-list">${topics.map(t=>`<button data-topic="${escapeHtml(t.topic)}" class="topic">${escapeHtml(t.subject)} · ${escapeHtml(t.topic)}</button>`).join('')}</div><h2 style="margin-top:28px">Authoritative starting points</h2><ul class="note-list">${references.map(s=>`<li><a href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(s.label)}</a> — ${escapeHtml(s.type)}</li>`).join('')}</ul></section></div>`;
  return `<div class="grid"><section class="card"><span class="chip">Today's focus</span><h2 style="margin-top:13px">Learning, one concept at a time.</h2><p class="muted">Explore a question, test your understanding, and build confidence with practice.</p><button class="btn" data-go="teacher">Ask a study question</button></section><section class="card"><span class="chip">Study momentum</span><h2 style="margin-top:13px">Your commitments</h2><div class="metric">${tasks.filter(x=>x.done).length} <span style="font-size:17px;color:#78909b">/ ${tasks.length} complete</span></div><p class="muted">Your plan can change when life changes.</p><button class="btn secondary" data-go="planner">Open study planner</button></section><section class="card wide"><h2>Remember</h2><p>You are learning, not competing with a machine. Saathi is an AI helper. Take breaks, ask real teachers and talk with people you trust.</p><div class="topic-list">${topics.slice(0,4).map(t=>`<button class="topic" data-topic="${escapeHtml(t.topic)}">${escapeHtml(t.topic)}</button>`).join('')}</div></section></div>`;
}
function taskList(){return tasks.length?tasks.map(t=>`<div class="task"><div><strong class="${t.done?'done':''}">${escapeHtml(t.title)}</strong><span class="notice">${escapeHtml(t.subject)} ${t.due_date?'· Due '+escapeHtml(t.due_date):''}</span></div><button class="btn small secondary" data-task="${escapeHtml(t.id)}" data-done="${t.done?0:1}">${t.done?'Undo':'Complete'}</button></div>`).join(''):'<p class="muted">No commitments yet. Add one small task to begin.</p>'}
function wire(){
 if($('experience-form'))$('experience-form').onsubmit=async e=>{
  e.preventDefault();
  const form=e.currentTarget,fd=new FormData(form);
  const next={theme:fd.get('theme'),assistStyle:fd.get('assistStyle'),textSize:fd.get('textSize'),
    visibleCards:fd.getAll('visibleCards'),quietMode:fd.has('quietMode'),remindersEnabled:fd.has('remindersEnabled')};
  const button=form.querySelector('[type="submit"]');button.disabled=true;
  try{const saved=await post('experience',next);experience=saved.preferences;renderApp();showMessage('Your space is saved.',true)}
  catch(err){showMessage(err.message)}finally{if(button.isConnected)button.disabled=false}
 };
 if($('reset-experience'))$('reset-experience').onclick=async()=>{
  const calm={theme:'sky',assistStyle:'balanced',textSize:'normal',visibleCards:['learn','plan','create','explore'],quietMode:true,remindersEnabled:false};
  try{const saved=await post('experience',calm);experience=saved.preferences;renderApp();showMessage('Calm defaults restored.',true)}
  catch(err){showMessage(err.message)}
 };
 if($('upgrade-form'))$('upgrade-form').onsubmit=async e=>{
  e.preventDefault();const form=e.currentTarget,button=form.querySelector('[type="submit"]');
  button.disabled=true;
  try{await post('upgrade-requests',{action:'add',idea:new FormData(form).get('idea')});
   ideas=(await api('upgrade-requests')).ideas;renderApp();showMessage('Idea saved for review. No software was changed.',true)}
  catch(err){showMessage(err.message)}finally{if(button.isConnected)button.disabled=false}
 };
 document.querySelectorAll('[data-delete-idea]').forEach(btn=>btn.onclick=async()=>{
  try{await post('upgrade-requests',{action:'delete',id:btn.dataset.deleteIdea});
   ideas=(await api('upgrade-requests')).ideas;renderApp();showMessage('Idea deleted.',true)}
  catch(err){showMessage(err.message)}
 });

  document.querySelectorAll('[data-lesson]').forEach(el=>el.onclick=()=>{activeLessonId=el.dataset.lesson;activeQuestionId='base';tab='lesson';renderApp()});
  if($('profile-form'))$('profile-form').onsubmit=async e=>{e.preventDefault();const form=e.currentTarget;const fd=new FormData(form);const payload={board:fd.get('board'),stream:fd.get('stream'),subjects:fd.getAll('subjects'),dailyMinutes:Number(fd.get('dailyMinutes'))};try{await post('profile',payload);currentUser=await api('me');tab='overview';await loadView();showMessage('Study preferences saved.',true)}catch(err){showMessage(err.message)}};
  if($('question-select'))$('question-select').onchange=e=>{activeQuestionId=e.target.value;renderApp()};
  if($('next-question'))$('next-question').onclick=()=>{
   const recommendation=practice.lessonRevision?.find(x=>x.lessonId===activeLessonId);
   if(recommendation?.nextQuestionId){activeQuestionId=recommendation.nextQuestionId;renderApp()}
  };
  if($('ncert-exercise-form'))$('ncert-exercise-form').onsubmit=async e=>{
   e.preventDefault();const form=e.currentTarget,fd=new FormData(form),btn=form.querySelector('[type="submit"]');
   btn.disabled=true;
   const feedback=$('ncert-exercise-feedback');feedback.textContent='Checking this question…';
   try{
    const r=await post('ncert-exercise-coach',{lessonId:activeLessonId,exerciseRef:fd.get('exerciseRef'),questionText:fd.get('questionText'),level:fd.get('level')});
    if(feedback.isConnected)feedback.textContent=r.answer+'\\n\\n'+(r.notice||'Unverified exercise guidance.');
   }catch(err){if(feedback.isConnected)feedback.textContent=err.message}
   finally{if(btn.isConnected)btn.disabled=false}
  };
  if($('practice-form'))$('practice-form').onsubmit=async e=>{e.preventDefault();const choice=new FormData(e.currentTarget).get('choice');if(choice===null)return;const button=e.currentTarget.querySelector('button');button.disabled=true;try{const r=await post('practice',{lessonId:activeLessonId,questionId:activeQuestionId,choice:Number(choice)});const panel=$('practice-feedback');panel.className=r.correct?'ok':'danger';panel.textContent=(r.correct?'Correct. ':'Not quite. ')+r.explanation+' Correct answer: '+r.correctOption+'.';practice=(await api('practice')).progress;}catch(err){showMessage(err.message)}finally{button.disabled=false}};
  document.querySelectorAll('[data-go]').forEach(e=>e.onclick=()=>{tab=e.dataset.go;renderApp()});document.querySelectorAll('[data-topic]').forEach(e=>e.onclick=()=>{tab='teacher';renderApp();$('question').value=`Help me understand ${e.dataset.topic}. Ask me a quick question and then explain.`;$('question').focus()});
  if($('guided-teach-form'))$('guided-teach-form').onsubmit=async e=>{
    e.preventDefault();
    const form=e.currentTarget,submit=form.querySelector('[type="submit"]'),data=new FormData(form);
    const lessonId=String(data.get('lessonId')||''),question=String(data.get('question')||'').trim();
    const style=String(data.get('style')||'simple');
    guidedContext=null;submit.disabled=true;
    const stage=$('guided-stage');if(stage)stage.hidden=true;
    try{
      const r=await post('guided-tutor',{step:'teach',lessonId,question,style});
      if(!form.isConnected)return;
      if($('guided-teaching-answer'))$('guided-teaching-answer').textContent=r.answer;
      if(r.kind){showMessage(r.notice||'Safety guidance shown.');return}
      const practicePrompt=extractPracticePrompt(r.answer);
      guidedContext={lessonId,question,practicePrompt,lastAnswer:r.answer.slice(0,2500)};
      if($('guided-feedback-text'))$('guided-feedback-text').textContent='';
      if($('guided-followup-output'))$('guided-followup-output').textContent='';
      if($('guided-feedback-form'))$('guided-feedback-form').hidden=!practicePrompt;
      if($('guided-no-practice'))$('guided-no-practice').hidden=!!practicePrompt;
      if(stage)stage.hidden=false;
      showMessage(practicePrompt?'Explanation ready. Try its practice question, or ask about the step you find difficult.':'Explanation ready. No clear practice question was generated; ask for another example or use checked chapter practice.',true);
    }catch(err){showMessage(err.message)}finally{if(submit.isConnected)submit.disabled=false}
  };
  document.querySelectorAll('[data-followup]').forEach(button=>button.onclick=async()=>{
    if(!guidedContext){showMessage('Start a lesson explanation first.');return}
    const context=guidedContext;
    const followupKind=button.dataset.followup;
    const focus=$('guided-followup-focus')?.value?.trim()||'';
    const panel=$('guided-followup-output');
    const buttons=[...document.querySelectorAll('[data-followup]')];
    buttons.forEach(b=>b.disabled=true);
    if(panel)panel.textContent='Saathi is preparing a focused explanation…';
    try{
      const r=await post('guided-tutor',{step:'followup',lessonId:context.lessonId,question:context.question,
        previousExplanation:context.lastAnswer,followupKind,focus});
      if(!panel?.isConnected||guidedContext!==context)return;
      panel.textContent=r.answer;
      if(r.kind){showMessage(r.notice||'Safety guidance shown.');return}
      guidedContext.lastAnswer=r.answer.slice(0,2500);
      showMessage(r.notice||'You can ask again about anything unclear.',true);
    }catch(err){if(panel?.isConnected)panel.textContent=err.message}
    finally{buttons.forEach(b=>{if(b.isConnected)b.disabled=false})}
  });
  if($('guided-feedback-form'))$('guided-feedback-form').onsubmit=async e=>{
    e.preventDefault();
    if(!guidedContext?.practicePrompt){showMessage('No practice question was generated. Use checked chapter practice instead.');return}
    const context=guidedContext;
    const form=e.currentTarget,submit=form.querySelector('[type="submit"]'),answer=new FormData(form).get('studentAnswer');
    submit.disabled=true;
    try{
      const r=await post('guided-tutor',{step:'feedback',lessonId:context.lessonId,
        question:context.question,practicePrompt:context.practicePrompt,studentAnswer:String(answer||'')});
      if($('guided-feedback-text')?.isConnected&&context===guidedContext)$('guided-feedback-text').textContent=r.answer+'\\n\\n'+r.notice;
    }catch(err){showMessage(err.message)}finally{if(submit.isConnected)submit.disabled=false}
  };
  if($('guided-practice'))$('guided-practice').onclick=()=>{
    if(!guidedContext)return;
    activeLessonId=guidedContext.lessonId;activeQuestionId='base';tab='lesson';
    guidedContext=null;renderApp();
  };
  if($('ask-form'))$('ask-form').onsubmit=async e=>{e.preventDefault();const button=e.currentTarget.querySelector('button');button.disabled=true;const q=$('question').value;try{const r=await post('ask',{question:q});$('answer-wrap').hidden=false;$('answer').textContent=r.answer;$('answer-note').textContent=r.notice||'';}catch(err){showMessage(err.message)}finally{button.disabled=false}};
  if($('task-form'))$('task-form').onsubmit=async e=>{e.preventDefault();const data=Object.fromEntries(new FormData(e.currentTarget));try{await post('tasks',{title:data.title,subject:data.subject||'General',due_date:data.due_date||null});const r=await api('tasks');tasks=r.tasks;renderApp();showMessage('Task added',true)}catch(err){showMessage(err.message)}};
  document.querySelectorAll('[data-task]').forEach(btn=>btn.onclick=async()=>{try{await post('tasks',{action:'complete',id:btn.dataset.task,done:btn.dataset.done==='1'});tasks=(await api('tasks')).tasks;renderApp()}catch(err){showMessage(err.message)}});
  if($('summary'))$('summary').onclick=async()=>{try{const r=await api('parent-summary');$('aggregate').textContent=`${r.completed} / ${r.assigned} tasks complete · ${r.practiceCorrect} / ${r.practiceAttempts} practice correct`;}catch(err){showMessage(err.message)}};
  if($('admin-summary'))$('admin-summary').onclick=()=>refreshAdminSummary();
}
init();
