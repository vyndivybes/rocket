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
export function renderMyDay({tasks=[],practice={},lessons=[],prefs}={}){
 const chosen=Array.isArray(prefs?.visibleCards)?prefs.visibleCards:controls.map(x=>x.id);
 const pending=tasks.filter(t=>!t.done),done=tasks.filter(t=>t.done).length;
 const next=pending[0];
 const revision=selectRevisionFocus(practice,lessons);
 const cards=chosen.map(id=>controls.find(c=>c.id===id)).filter(Boolean).map(c=>`
  <section class="card activity-card"><span class="eyebrow">${esc(c.tag)}</span><h2>${esc(c.title)}</h2>
  <p class="muted">${esc(c.intro)}</p>
  ${c.target?`<button type="button" class="btn secondary" data-go="${c.target}">${esc(c.button)}</button>`:
  `<a class="btn secondary activity-link" href="${c.href}">${esc(c.button)}</a>`}
  </section>`).join('');
 return `<div class="learner-home">
 <section class="saathi-feature-stage saathi-learner-feature" aria-label="Your learning universe">
  <div class="saathi-feature-copy"><span class="saathi-scene-label">✳ SAATHI · LET CURIOSITY LEAD</span>
   <h1>THINK BIG.<br><span>MAKE MAGIC.</span></h1>
   <p>Learn a concept. Sketch your dream. Discover the science of flight. There are so many ways to grow.</p>
   <div class="row"><button class="btn" data-go="teacher">Ask Saathi →</button><a href="/mission.html" class="btn secondary">Open my AI universe ↗</a></div>
  </div><div class="saathi-feature-scene" aria-hidden="true"><div class="saathi-stage-planet">S</div></div>
  <div class="saathi-sticker" aria-hidden="true">100%<br>YOUR<br>JOURNEY</div>
 </section>
 <div class="saathi-showcase-strip"><strong class="saathi-showcase-title">TODAY IS FULL OF POSSIBILITIES.</strong><p>Pick a direction and follow your curiosity. Your work is saved only when you choose to save it.</p></div>
 ${renderStudioScenes('student')}
 <section class="card day-intro wide"><div class="row between"><span class="chip">My day</span>
 <button type="button" class="btn outline small" data-go="myspace">Make this space mine</button></div>
 <h2 class="day-title">What would you like to do today?</h2>
 <p>You can learn, create, explore or take a break. ${prefs?.quietMode===false&&prefs?.remindersEnabled===true?'You have opted in to reminders; device permissions and quiet hours still control delivery.':'Saathi stays quiet unless you explicitly enable reminders.'}</p>
 <div class="today-focus"><strong>One possible next step</strong>
 <p>${next?`Your next planned task: ${esc(next.title)}.`:'No tasks are waiting. Choose what interests you.'}</p>
 <button class="btn" data-go="planner">${next?'View my plan':'Plan something'}</button><p class="notice"><a href="/mission.html">Open my weekly study, sport and rest schedule</a></p></div>
 <p class="notice">Plan: ${done} of ${tasks.length} items completed · Learning: ${Number(practice.correct)||0} correct practice responses. These are counts, not grades or pressure to achieve a streak.</p>
 </section><div class="activity-grid">${cards}</div>
 ${revision?'<section class="card wide"><span class="chip">My next revision</span><h2>Review '+esc(revision.title)+'</h2><p class="muted">Suggested based on checked practice, not an exam grade or proof of mastery. Revisit the explanation, try another question and see what changes.</p><button class="btn secondary" data-lesson="'+esc(revision.lessonId)+'">Review '+esc(revision.title)+'</button></section>':''}
 <section class="card wide quick-ask"><h2>Ask Saathi</h2><p class="muted">A quick question, a hint or a new way to understand a topic — only when you ask.</p>
 <button class="btn" data-go="teacher">Ask a question</button>
 <span class="notice">Responses are AI-generated and may need checking with a teacher.</span></section>
 </div>`;
}
export function renderMySpace(prefs,ideas=[],status='ready'){
 const p=prefs||{theme:'sky',assistStyle:'balanced',textSize:'normal',quietMode:true,remindersEnabled:false,visibleCards:['learn','plan','create','explore']};
 const unavailable=status!=='ready';
 return `<div class="grid myspace-grid">
 <section class="card wide"><h2>My Saathi, my pace</h2>
 <p class="muted">Customise your workspace and Saathi's explanations. You can change these choices later. Your preferences are private.</p>
 ${unavailable?'<p class="danger">Private settings storage is not ready. Changes cannot be saved yet.</p>':''}
 <p class="notice"><a href="/mission.html">Open Mission Control to choose your AI companion name</a>, explore the art studio and discover aviation.</p>
 <form id="experience-form">
 <div class="settings-grid">
 <label class="field">Colour theme<select name="theme">
 ${opt('sky','Clear sky',p.theme)}${opt('forest','Forest',p.theme)}${opt('violet','Creative violet',p.theme)}</select></label>
 <label class="field">How should Saathi explain?<select name="assistStyle">
 ${opt('quick','Quick answers',p.assistStyle)}${opt('balanced','Balanced explanations',p.assistStyle)}${opt('guide','Guide me step by step',p.assistStyle)}</select></label>
 <label class="field">Reading size<select name="textSize">
 ${opt('normal','Comfortable',p.textSize)}${opt('large','Large',p.textSize)}</select></label>
 </div>
 <fieldset class="subject-fieldset"><legend>My home cards</legend>
 <div class="subject-choices">
 ${check('visibleCards','Learn',p.visibleCards.includes('learn'))}
 ${check('visibleCards','Plan',p.visibleCards.includes('plan'))}
 ${check('visibleCards','Create — Sketch and paint',p.visibleCards.includes('create'))}
 ${check('visibleCards','Explore — Aviation',p.visibleCards.includes('explore'))}</div>
 <p class="notice">Keep at least one card; Ask Saathi always remains available.</p></fieldset>
 <fieldset class="subject-fieldset"><legend>Quiet Intelligence</legend>
 ${check('quietMode','Quiet mode — no background reminders',p.quietMode)}
 ${check('remindersEnabled','Allow reminders only after I separately subscribe on my device',p.remindersEnabled)}
 <p class="notice">Reminders are off by default. Turning on this preference does not grant device notification permission or activate uncommissioned delivery. Quiet mode always blocks delivery. Existing device quiet hours still apply.</p></fieldset>
 <div class="row"><button class="btn" type="submit" ${unavailable?'disabled':''}>Save my space</button><button type="button" class="btn outline" id="reset-experience" ${unavailable?'disabled':''}>Use calm defaults</button></div>
 </form></section>
 <section class="card wide"><span class="chip">Ideas and improvements</span><h2>Ask Saathi to improve</h2>
 <p class="muted">Suggest a feature such as “compare my sketches each month” or “show an interactive aircraft lift diagram”. Nothing is installed automatically. An adult/developer must review and test software changes.</p>
 <form id="upgrade-form"><label class="field">My idea<textarea name="idea" minlength="12" maxlength="300" required placeholder="I would like a weekly sketch progress gallery..."></textarea></label>
 <button class="btn secondary" type="submit" ${unavailable?'disabled':''}>Propose improvement</button></form>
 <div class="divider"></div><h3>My submitted ideas</h3>
 ${ideas.length?`<ul class="idea-list">${ideas.map(i=>`<li class="idea"><div><strong>${esc(i.idea)}</strong><p class="notice">${esc(i.status)} — not yet built</p></div><button class="btn small outline" type="button" data-delete-idea="${esc(i.id)}" aria-label="Delete improvement idea">Delete</button></li>`).join('')}</ul>`:'<p class="muted">No proposals yet. Your next idea can start here.</p>'}
 <p class="notice">Only your account sees these proposals; no requests grant permission to rewrite software or contact third parties.</p></section></div>`;
}
