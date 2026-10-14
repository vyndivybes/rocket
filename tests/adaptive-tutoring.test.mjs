import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {validateGuidedInput,buildGuidedMessages,extractFinalTutorAnswer,TUTOR_MODEL,lessonTeachingAnchor} from '../functions/_lib/guided-learning.js';
import {renderGuidedTeaching,extractPracticePrompt} from '../public/guided-ui.js';
const lesson={id:'chapter-physics-1',subject:'Physics',title:'Electric Charges and Fields',concept:'Electric force varies with inverse square of distance.',guidedSubtopics:[{heading:'Coulomb law',explanation:'The electric force obeys inverse square distance.'}]};
test('the tutor supports learner-selected explanation styles without breaking the old request',()=>{
 assert.equal(validateGuidedInput({step:'teach',lessonId:lesson.id,question:'Explain Coulomb law'}).style,'simple');
 for(const style of ['simple','stepwise','visual']){
  assert.equal(validateGuidedInput({step:'teach',lessonId:lesson.id,question:'Explain Coulomb law',style}).style,style);
  const p=buildGuidedMessages({step:'teach',lessonId:lesson.id,question:'Explain Coulomb law',style},lesson);
  assert.match(p[0].content,new RegExp(style==='stepwise'?'intermediate steps':style==='visual'?'text diagram':'simple language','i'));
  assert.doesNotMatch(p[0].content,/Explain Coulomb law/);
 }
 assert.equal(validateGuidedInput({step:'teach',lessonId:lesson.id,question:'Explain Coulomb law',style:'certify'}),null);
});
test('student can ask exactly targeted ephemeral followups without leaking conversation history to system instructions',()=>{
 for(const followupKind of ['simpler','step','example','diagram']){
  const data={step:'followup',lessonId:lesson.id,question:'Why is electric force inverse-square?',previousExplanation:'Explanation: F depends on 1/r². Try this: double r.',followupKind,focus:'Show me the second step'};
  const p=validateGuidedInput(data);
  assert.ok(p,followupKind);
  const msgs=buildGuidedMessages(p,lesson);
  assert.match(msgs[0].content,/follow-up|followup/i);
  assert.match(msgs[1].content,/Show me the second step/);
  assert.doesNotMatch(msgs[0].content,/Show me the second step/);
 }
 assert.equal(validateGuidedInput({step:'followup',lessonId:lesson.id,question:'Why is electric force inverse-square?',previousExplanation:'fake',followupKind:'script',focus:'hi'}),null);
 assert.equal(validateGuidedInput({step:'followup',lessonId:lesson.id,question:'Why is electric force inverse-square?',previousExplanation:'fake',followupKind:'step',focus:'x'.repeat(300)}),null);
 assert.equal(validateGuidedInput({step:'followup',lessonId:lesson.id,question:'Why is electric force inverse-square?',previousExplanation:'x'.repeat(2700),followupKind:'step',focus:''}),null);
});
test('curated context is clearly labelled an unreviewed aid, not an official chapter citation',()=>{
 const context=lessonTeachingAnchor(lesson);
 assert.match(context,/inverse square/i);
 assert.match(context,/editorial/i);
 assert.doesNotMatch(context,/source verified|certified by NCERT/i);
 assert.equal(lessonTeachingAnchor({title:'X',concept:'',guidedSubtopics:[]}).length<250,true);
});
test('hide optional model thinking and never present empty hidden thoughts as the learner answer',()=>{
 assert.equal(extractFinalTutorAnswer('<think>I should solve this</think>\nExplanation: Force decreases.'),'Explanation: Force decreases.');
 assert.equal(extractFinalTutorAnswer('Explanation: Safe output.'),'Explanation: Safe output.');
 assert.equal(extractFinalTutorAnswer('<think>only private reasoning</think>'),null);
 assert.equal(extractFinalTutorAnswer('<think>unfinished thoughts'),null);
 assert.match(TUTOR_MODEL,/^@cf\//);
});
test('missing model practice prompt never invents a question to grade and instructions do not swallow later headings',()=>{
 assert.equal(extractPracticePrompt('Explanation: F=kq1q2/r².'),null);
 assert.equal(extractPracticePrompt('## Try this\nDouble the distance. What happens?\n## Notes\nImportant.'),'Double the distance. What happens?');
 const markup=renderGuidedTeaching([lesson]);
 assert.match(markup,/name="style"/);
 assert.match(markup,/value="visual"/);
 assert.match(markup,/data-followup="simpler"/);
 assert.match(markup,/data-followup="step"/);
 assert.match(markup,/data-followup="example"/);
 assert.match(markup,/data-followup="diagram"/);
 assert.match(markup,/id="guided-followup-focus"/);
 assert.match(markup,/id="guided-followup-output"/);
});
test('the full tutor route uses low-cost stronger hosted model and does not store free-text teaching history',()=>{
 const route=readFileSync(new URL('../functions/api/guided-tutor.js',import.meta.url),'utf8');
 const app=readFileSync(new URL('../public/app.js',import.meta.url),'utf8');
 assert.match(route,/TUTOR_MODEL/);
 assert.match(route,/extractFinalTutorAnswer/);
 assert.match(route,/max_tokens:\s*\d+/);
 assert.doesNotMatch(route,/INSERT INTO|CREATE TABLE|UPDATE\s+.*conversation/i);
 assert.match(app,/guidedContext\.lastAnswer/);
 assert.match(app,/post\('guided-tutor',\{step:'followup'/);
 assert.match(app,/extractPracticePrompt\(r\.answer\)/);
 assert.ok(app.includes('guidedContext?.practicePrompt'));
});

test('quick Ask Saathi also receives the improved teacher model without upgrading unrelated companion modes',()=>{
 const ask=readFileSync(new URL('../functions/api/ask.js',import.meta.url),'utf8');
 assert.match(ask,/TUTOR_MODEL/);
 assert.match(ask,/mode==='teacher'\?TUTOR_MODEL:AI_MODEL/);
 assert.match(ask,/mode==='teacher'\?1100:480/);
 assert.match(ask,/extractFinalTutorAnswer/);
 assert.match(ask,/acquireAiQuota/);
});
