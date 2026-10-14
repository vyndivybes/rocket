// All guided tutor UI context remains in the browser tab; no chat persistence.
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function extractPracticePrompt(answer){
 if(typeof answer!=='string')return 'Explain the central idea with correct units, then solve one similar example.';
 const x=answer.match(/(?:^|\n)\s*(?:#{1,3}\s*)?(?:\*\*)?Try this(?:\*\*)?\s*:?\s*\n?([\s\S]+)/i);
 const clean=(x?.[1]||'').trim().replace(/\s+/g,' ').slice(0,900);
 return clean.length>=12?clean:'Explain the central idea with correct units, then solve one similar example.';
}
export function renderGuidedTeaching(lessons=[]){
 const options=(Array.isArray(lessons)?lessons:[]).filter(x=>x?.id&&x?.title&&x?.subject)
  .sort((a,b)=>a.subject.localeCompare(b.subject)||a.title.localeCompare(b.title))
  .map(x=>'<option value="'+esc(x.id)+'">'+esc(x.subject)+' — '+esc(x.title)+'</option>').join('');
 return '<section class="card wide" aria-labelledby="guided-title">'+
  '<span class="chip">Learn · Try · Review</span><h2 id="guided-title">Guided study session</h2>'+
  '<p class="muted">Choose an enrolled subject and enter a question from your own textbook. Saathi will explain one example, offer practice and discuss your attempt.</p>'+
  '<form id="guided-teach-form">'+
  '<label class="field">Chapter or lesson<select name="lessonId" required>'+options+'</select></label>'+
  '<label class="field">What is confusing?<textarea name="question" minlength="12" maxlength="1600" rows="3" required placeholder="Explain Kirchhoff’s junction law with a worked example and a question for me to try."></textarea></label>'+
  '<div class="row"><button class="btn" type="submit" '+(!options?'disabled':'')+'>Explain and give me practice</button><span class="notice">Uses the shared daily AI limit</span></div></form>'+
  '<div id="guided-stage" hidden><h3>Explanation and practice</h3><div id="guided-teaching-answer" class="answer" aria-live="polite"></div>'+
  '<form id="guided-feedback-form"><label class="field">My answer to the practice question<textarea name="studentAnswer" minlength="2" maxlength="1200" rows="3" required placeholder="Show your steps, units and what you think the answer should be."></textarea></label>'+
  '<button class="btn secondary" type="submit">Check my reasoning</button></form>'+
  '<div id="guided-feedback-text" class="answer" role="status" aria-live="polite"></div>'+
  '<button id="guided-practice" class="btn outline" type="button">Open checked chapter practice</button></div>'+
  '<p class="notice">AI guidance can be wrong and is not an exam grade. This conversation is not saved. Checked chapter quizzes save only aggregate performance for revision and the parent summary.</p></section>';
}
