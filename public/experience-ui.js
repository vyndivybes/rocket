import {selectRevisionFocus} from './revision-focus.js';
import {renderStudioScenes} from './studio-scenes.js';
// Pure, testable HTML views. Only preapproved IDs are used in navigation.
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const controls=[
 {id:'learn',title:'Learn something',tag:'Learn',intro:'Short lessons, worked examples and practice with explanations.',button:'Continue learning',target:'library'},
 {id:'plan',title:'Make a plan',tag:'Organise',intro:'One practical step. You can adjust the plan at any time.',button:'Open planner',target:'planner'},
 {id:'create',title:'Create something',tag:'Art studio',intro:'Sketch, paint, save ideas and explore your own visual style.',button:'Open creative studio',href:'/mission.html'},
 {id:'explore',title:'Explore aviation',tag:'Curiosity lab',intro:'Ask questions about flight, aircraft and the science behind them.',button:'Explore Mission Control',href:'/mission.html'}
];
const opt=(value,label,current)=>`<option value="${value}" ${current===value?'selected':''}>${esc(label)}</option>`;
const check=(name,label,checked)=>`<label class="choice-toggle"><input type="checkbox" name="${name}" ${checked?'checked':''}> <span>${esc(label)}</span></label>`;
export function renderMyDay({tasks=[],practice={},lessons=[],prefs}={}) {
 const chosen=Array.isArray(prefs?.visibleCards)?prefs.visibleCards:controls.map(x=>x.id);
 const pending=tasks.filter(t=>!t.done),done=tasks.filter(t=>t.done).length;
 const revision=selectRevisionFocus(practice,lessons),name=(prefs?.studentNickname||'').trim();
 const cards=chosen.map(id=>{
  const c=controls.find(item=>item.id===id);if(!c)return '';
  const href=c.target?'#'+c.target:c.href,data=c.target?' data-go="'+c.target+'"':'';
  return '<a class="feature-card" href="'+esc(href)+'"'+data+'><span class="eyebrow">'+esc(c.tag)+'</span><strong>'+esc(c.title)+'</strong><span>'+esc(c.intro)+'</span><b>'+esc(c.button)+' →</b></a>';
 }).join('');
 const next=pending[0];
 return `<div class="learner-home">
  <section class="home-welcome"><div><span class="eyebrow">YOUR SAATHI SPACE</span><h2>${name?'Welcome, '+esc(name):'Welcome back'}</h2><p>Choose one thing to learn, plan, create or explore. Everything else is tucked into Features and Settings.</p></div><button class="btn" data-go="teacher">Ask Saathi</button></section>
  <section class="home-summary" aria-label="Today at a glance"><article><span>To do</span><strong>${pending.length}</strong><small>planned tasks</small></article><article><span>Done</span><strong>${done}</strong><small>of ${tasks.length} tasks</small></article><article><span>Practice</span><strong>${Number(practice.correct)||0}</strong><small>correct answers</small></article></section>
  <section class="home-section"><div class="section-heading"><div><span class="eyebrow">QUICK START</span><h2>What would you like to do?</h2></div><button class="btn outline small" data-go="features">All features</button></div><div class="feature-grid">${cards}</div></section>
  <details class="card home-agenda"><summary><span><strong>Today’s plan</strong><small>${next?esc(next.title):'No tasks waiting'}</small></span><span class="agenda-count">${pending.length} open</span></summary><div class="agenda-body">${next?'<p>Your next planned task: <strong>'+esc(next.title)+'</strong></p>':'<p>Add a study, exercise or rest reminder when you need one.</p>'}<button class="btn secondary" data-go="planner">Open planner</button>${revision?'<p class="notice">Suggested revision: '+esc(revision.title)+'.</p><button class="btn outline small" data-lesson="'+esc(revision.lessonId)+'">Review lesson</button>':''}</div></details>
  <p class="notice home-note">Progress counts are for your own reference, not grades or streaks. Saathi stays quiet unless you enable reminders.</p>
 </div>`;
}
export function renderMySpace(prefs,ideas=[],status='ready'){
 const p=prefs||{theme:'sky',assistStyle:'balanced',textSize:'normal',studentNickname:'',quietMode:true,remindersEnabled:false,visibleCards:['learn','plan','create','explore']};
 const unavailable=status!=='ready';
 const ideaRows=ideas.map(i=>'<li class="idea"><div><strong>'+esc(i.idea)+'</strong><p class="notice">'+esc(i.status)+' — not yet built</p></div><button class="btn small outline" type="button" data-delete-idea="'+esc(i.id)+'">Delete</button></li>').join('');
 return `<div class="settings-page">
  <section class="settings-intro"><span class="eyebrow">YOUR SPACE</span><h2>Settings &amp; options</h2><p>Personalise Saathi once. Your choices stay private to your account.</p></section>
  ${unavailable?'<p class="danger">Private settings storage is not ready. Changes cannot be saved yet.</p>':''}
  <form id="experience-form" class="settings-form">
   <details class="settings-group" open><summary>Profile</summary><div class="settings-group-body"><label class="field">What should Saathi call you?<input name="studentNickname" value="${esc(p.studentNickname||'')}" maxlength="24" autocomplete="nickname" placeholder="Choose a nickname"></label><p class="notice">Optional. This is your display name, not your sign-in username. Leave it blank for a neutral greeting.</p></div></details>
   <details class="settings-group"><summary>Appearance</summary><div class="settings-group-body settings-grid"><label class="field">Colour theme<select name="theme">${opt('sky','Clear sky',p.theme)}${opt('forest','Forest',p.theme)}${opt('violet','Creative violet',p.theme)}</select></label><label class="field">Reading size<select name="textSize">${opt('normal','Comfortable',p.textSize)}${opt('large','Large',p.textSize)}</select></label></div></details>
   <details class="settings-group"><summary>Learning options</summary><div class="settings-group-body"><label class="field">How should Saathi explain?<select name="assistStyle">${opt('quick','Quick answers',p.assistStyle)}${opt('balanced','Balanced explanations',p.assistStyle)}${opt('guide','Step by step',p.assistStyle)}</select></label><fieldset class="subject-fieldset"><legend>Home screen shortcuts</legend><div class="subject-choices">${check('visibleCards','Learn',p.visibleCards.includes('learn'))}${check('visibleCards','Plan',p.visibleCards.includes('plan'))}${check('visibleCards','Create — art studio',p.visibleCards.includes('create'))}${check('visibleCards','Explore — aviation',p.visibleCards.includes('explore'))}</div><p class="notice">Choose which shortcuts appear on Home. All features stay available in Features.</p></fieldset></div></details>
   <details class="settings-group"><summary>Notifications and quiet time</summary><div class="settings-group-body">${check('quietMode','Quiet mode — no background reminders',p.quietMode)}${check('remindersEnabled','Allow reminders after I subscribe on my device',p.remindersEnabled)}<p class="notice">Reminders are off by default. Device permission and quiet hours still apply; saving this preference does not activate delivery.</p></div></details>
   <div class="row settings-actions"><button class="btn" type="submit" ${unavailable?'disabled':''}>Save settings</button><button type="button" class="btn outline" id="reset-experience" ${unavailable?'disabled':''}>Reset options</button></div>
  </form>
  <details class="settings-group settings-ideas"><summary>Suggest a feature</summary><div class="settings-group-body"><p class="muted">Suggestions are saved for review; they do not change Saathi automatically.</p><form id="upgrade-form"><label class="field">Feature idea<textarea name="idea" minlength="12" maxlength="300" required placeholder="For example: show a monthly gallery of my sketches"></textarea></label><button class="btn secondary" type="submit" ${unavailable?'disabled':''}>Save idea</button></form><h3>My ideas</h3>${ideas.length?'<ul class="idea-list">'+ideaRows+'</ul>':'<p class="muted">No ideas saved.</p>'}</div></details>
 </div>`;
}
