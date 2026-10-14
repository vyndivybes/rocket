// All AI-generated tutor text and follow-up context stay in this browser tab;
// no learner free-text answer or model transcript is written to Saathi storage.
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function extractPracticePrompt(answer){
 if(typeof answer!=='string')return null;
 // Never manufacture a practice problem: one must exist in the generated answer.
 const start=answer.match(/(?:^|\n)\s*(?:#{1,3}\s*)?(?:\*\*)?Try this(?:\*\*)?\s*:?\s*(?:\n|$)/i);
 if(!start)return null;
 const tail=answer.slice(start.index+start[0].length);
 const next=tail.search(/\n\s*(?:#{1,3}\s*)?(?:\*\*)?(?:Notes|Explanation|Worked example|Answer|Solution|Check|Next step)(?:\*\*)?\s*:?\s*(?:\n|$)/i);
 const text=(next<0?tail:tail.slice(0,next)).replace(/\*\*/g,'').trim().replace(/\s+/g,' ');
 return text.length>=12?text.slice(0,900):null;
}
export function renderGuidedTeaching(lessons=[]){
 const options=(Array.isArray(lessons)?lessons:[]).filter(x=>x?.id&&x?.title&&x?.subject)
  .sort((a,b)=>a.subject.localeCompare(b.subject)||a.title.localeCompare(b.title))
  .map(x=>'<option value="'+esc(x.id)+'">'+esc(x.subject)+' — '+esc(x.title)+'</option>').join('');
 return '<section class="card wide" aria-labelledby="guided-title">'+
  '<span class="chip">Understand · Ask again · Practise</span><h2 id="guided-title">Study with Saathi</h2>'+
  '<p class="muted">Tell Saathi exactly where you got stuck. Choose how you prefer an explanation and ask again about any step without repeating your whole question.</p>'+
  '<form id="guided-teach-form">'+
  '<label class="field">Your chapter<select name="lessonId" required>'+options+'</select></label>'+
  '<label class="field">What part is confusing?<textarea name="question" minlength="12" maxlength="1600" rows="3" required placeholder="I know the basic definition, but I am stuck on step 2 of Kirchhoff’s law. Explain why currents add at a junction."></textarea></label>'+
  '<label class="field">How should I explain?<select name="style" required>'+
  '<option value="simple">Start simply, with an analogy</option>'+
  '<option value="stepwise">Work through every step</option>'+
  '<option value="visual">Use a labelled text diagram</option>'+
  '</select></label>'+
  '<div class="row"><button class="btn" type="submit" '+(!options?'disabled':'')+'>Help me understand</button><span class="notice">Uses the shared daily AI limit</span></div></form>'+
  '<div id="guided-stage" hidden><h3>Saathi explains</h3><div id="guided-teaching-answer" class="answer" aria-live="polite"></div>'+
  '<div class="card" style="margin:14px 0;padding:14px"><h3>Still confused? Ask about this explanation</h3>'+
  '<label class="field">Which step or part? (optional)<input id="guided-followup-focus" maxlength="240" placeholder="I do not understand why the sign changes"></label>'+
  '<div class="row" style="flex-wrap:wrap;gap:8px">'+
  '<button type="button" class="btn secondary" data-followup="simpler">Explain more simply</button>'+
  '<button type="button" class="btn secondary" data-followup="step">Explain that step</button>'+
  '<button type="button" class="btn secondary" data-followup="example">Another example</button>'+
  '<button type="button" class="btn secondary" data-followup="diagram">Show a text diagram</button>'+
  '</div><div id="guided-followup-output" class="answer" role="status" aria-live="polite"></div></div>'+
  '<div id="guided-no-practice" class="notice" hidden>No clear practice question was provided. You can ask Saathi for a fresh example or open a checked chapter quiz.</div>'+
  '<form id="guided-feedback-form"><label class="field">My answer to Saathi’s “Try this” question<textarea name="studentAnswer" minlength="2" maxlength="1200" rows="3" required placeholder="Show your steps, units and your final answer."></textarea></label>'+
  '<button class="btn secondary" type="submit">Check my reasoning</button></form>'+
  '<div id="guided-feedback-text" class="answer" role="status" aria-live="polite"></div>'+
  '<button id="guided-practice" class="btn outline" type="button">Open checked chapter practice</button></div>'+
  '<p class="notice">Saathi’s explanations are AI-generated, not official NCERT answers or exam marks. No chat transcript is saved. Only checked chapter-quiz totals contribute to your saved revision and your parent’s aggregate summary.</p></section>';
}
