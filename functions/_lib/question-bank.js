// Original Saathi Class XII skill-practice alternatives (2026–27).
// These are deterministic, independently written questions, not NCERT excerpts
// and not a teacher-reviewed chapter or school examination. Never send answerIndex.
export const QUESTION_BANKS=Object.freeze({
 'english-elective-reading-inference':[
  {id:'v2',prompt:'After reviewing the forecast, Tara carried an umbrella even though the morning sky was clear. What is a supported inference?',
   options:['It was already raining heavily','Tara was preparing for a possibility of rain','Tara had forgotten her weather report','The umbrella was necessarily broken'],answerIndex:1,
   explanation:'Checking the forecast and carrying an umbrella supports preparing for possible rain. The passage does not say that it was already raining or that the umbrella had any defect.'},
  {id:'v3',prompt:'Rohan saved two drafts of his essay before turning off the computer. Which inference is best supported?',
   options:['He wanted a backup of his work','He had finished every future assignment','He disliked writing','He deleted both drafts'],answerIndex:0,
   explanation:'Saving two copies is consistent with wanting to keep a backup. The sentence gives no evidence about future assignments, feelings about writing, or deletion.'},
  {id:'v4',prompt:'The workshop was about to begin. Anika put her phone away and opened her notebook. What is most reasonably inferred?',
   options:['She was leaving the workshop','She intended to pay attention and take notes','She had lost her notebook','She was the only person attending'],answerIndex:1,
   explanation:'Putting away a distraction and opening a notebook just before the workshop suggest readiness to listen and make notes. No claim about attendance or loss follows from the text.'}
 ],
 'english-elective-grammar-passive':[
  {id:'v2',prompt:'Choose the passive form that preserves the tense: “The engineers are testing the model now.”',
   options:['The model was tested by the engineers now','The model is being tested by the engineers now','The model has test by the engineers now','The model will being tested now'],answerIndex:1,
   explanation:'Present continuous passive uses am/is/are + being + past participle. Singular “model” needs “is being tested”; “now” remains appropriate.'},
  {id:'v3',prompt:'Choose the passive form of “The college will publish the results tomorrow.”',
   options:['The results are published by the college tomorrow','The results were published tomorrow','The results will be published by the college tomorrow','The results will publishing tomorrow'],answerIndex:2,
   explanation:'Future simple passive uses will be + past participle. “Will be published” preserves the future timing and the object “results” becomes the subject.'},
  {id:'v4',prompt:'Which passive sentence preserves the past perfect of “The team had completed the design before noon”?',
   options:['The design had been completed by the team before noon','The design is completed before noon','The design has completed by the team before noon','The design was completing before noon'],answerIndex:0,
   explanation:'Past perfect passive requires had been + past participle. “Had been completed” maintains that completion occurred before the stated past reference time.'}
 ],
 'english-elective-discursive-writing':[
  {id:'v2',prompt:'A student is writing about optional school art workshops. Which is the most defensible thesis?',
   options:['Art is always the only important subject','Optional art workshops can give interested students more creative practice while respecting other commitments','Every student must paint the same picture','The classroom has several windows'],answerIndex:1,
   explanation:'A focused thesis gives a clear, arguable position with reasonable limits. The second option supports opportunity while recognising other commitments rather than making absolute claims.'},
  {id:'v3',prompt:'Which evidence best supports a claim that a supervised library study hour would be useful?',
   options:['A verified student survey reports limited access to quiet study spaces','A made-up percentage with no source','A personal insult about those who disagree','A description of a different city’s weather'],answerIndex:0,
   explanation:'A verifiable survey about the specific study-space problem is relevant evidence. Invented statistics, insults and unrelated facts do not support the policy claim.'},
  {id:'v4',prompt:'Which sentence acknowledges a fair counterargument to extending school library hours?',
   options:['Only careless people worry about cost','There cannot be any disadvantage','Extra hours could help some learners, although staffing and transport arrangements would need attention','Every book is the same'],answerIndex:2,
   explanation:'A balanced argument recognises realistic constraints such as supervision and transport while maintaining a reasoned position. Dismissing objections is not meaningful rebuttal.'}
 ],
 'english-elective-poetry-inference':[
  {id:'v2',prompt:'In the original line “The clouds drifted like slow ships,” which figure of speech is clearest?',
   options:['Simile','Onomatopoeia','Literal identity of clouds as ships','An equation'],answerIndex:0,
   explanation:'The word “like” explicitly compares drifting clouds to slow ships, making this a simile. It describes appearance or movement rather than a literal transformation.'},
  {id:'v3',prompt:'In the original line “Her words were lanterns in the dark,” which interpretation best identifies the main device?',
   options:['A literal claim of electric lighting','A metaphor suggesting her words brought guidance or hope','A chemical formula','Proof that darkness cannot exist'],answerIndex:1,
   explanation:'The sentence directly describes words as lanterns without “like” or “as.” This metaphor suggests illumination or reassurance in a difficult situation, not literal lamps.'},
  {id:'v4',prompt:'Which sound pattern appears in the original phrase “silent silver streams”?',
   options:['Alliteration using repeated initial s sounds','An exact rhyme between all words','No repeated sound','A comparison using “like”'],answerIndex:0,
   explanation:'The initial s sound is repeated in “silent,” “silver,” and “streams,” which is alliteration. The phrase neither contains a simile nor requires end-word rhyme.'}
 ],
 'physics-current-electricity':[
  {id:'v2',prompt:'An ideal ohmic resistor has 15 V across it and resistance 5 Ω. What current does Ohm’s law predict?',
   options:['75 A','3 A','10 A','0.33 A'],answerIndex:1,
   explanation:'For a resistor whose resistance is fixed, I = V/R. Divide 15 V by 5 Ω to obtain 3 A. This is a calculation, not a wiring or laboratory instruction.'},
  {id:'v3',prompt:'For an ohmic resistor of 6 Ω with current 2 A, what potential difference is required?',
   options:['3 V','8 V','12 V','0.33 V'],answerIndex:2,
   explanation:'Rearrange Ohm’s law to V = IR. Multiplying 2 A by 6 Ω gives 12 V. Current times resistance has units of volts.'},
  {id:'v4',prompt:'A hypothetical ohmic component has 18 V across it while carrying 3 A. What is its resistance?',
   options:['54 Ω','21 Ω','6 Ω','0.17 Ω'],answerIndex:2,
   explanation:'R = V/I = 18 V divided by 3 A = 6 Ω. This uses the ideal steady-state relation and does not imply that a real device is always ohmic.'}
 ],
 'chemistry-solutions-molarity':[
  {id:'v2',prompt:'A hypothetical solution contains 0.40 mol of solute in 200 mL of final solution. Find molarity.',
   options:['0.20 M','2.0 M','80 M','0.002 M'],answerIndex:1,
   explanation:'Convert 200 mL to 0.200 L first. Molarity is 0.40 mol divided by 0.200 L, giving 2.0 M. Use the final volume of solution.'},
  {id:'v3',prompt:'A hypothetical solution contains 0.15 mol of solute in 750 mL of final solution. What is M?',
   options:['0.20 M','0.90 M','5.0 M','0.002 M'],answerIndex:0,
   explanation:'750 mL is 0.750 L, so M = 0.15 mol / 0.750 L = 0.20 mol per litre. Do not divide by the volume expressed in millilitres.'},
  {id:'v4',prompt:'A hypothetical final solution contains 1.5 mol of solute in 3.0 L. Calculate the molarity.',
   options:['4.5 M','2.0 M','0.50 M','0.05 M'],answerIndex:2,
   explanation:'Molarity equals amount of solute divided by final solution volume. 1.5 mol / 3.0 L = 0.50 M. This is numerical theory, not a preparation procedure.'}
 ],
 'mathematics-conditional-probability':[
  {id:'v2',prompt:'Among 12 students who sing in a choir, 6 also play chess. Given that a student is in the choir, what is the probability they play chess?',
   options:['0.25','0.50','2.0','0.06'],answerIndex:1,
   explanation:'The condition reduces the sample space to the 12 choir members. Six of them play chess, so P(chess | choir) = 6/12 = 0.50.'},
  {id:'v3',prompt:'Of 30 students who attend a drawing club, 9 also study music. Given attendance at drawing club, what is the probability of studying music?',
   options:['0.90','0.03','0.30','3.33'],answerIndex:2,
   explanation:'Only the 30 drawing-club members belong in the denominator after conditioning. The count of members studying music is 9, so 9/30 = 0.30.'},
  {id:'v4',prompt:'For events A and B, P(A ∩ B)=0.20 and P(B)=0.50. What is P(A | B)?',
   options:['0.10','0.20','0.40','2.50'],answerIndex:2,
   explanation:'Since P(B)>0, P(A | B) = P(A ∩ B)/P(B) = 0.20/0.50 = 0.40. The conditional denominator is P(B), not P(A).'}
 ],
 'biology-evolution-selection':[
  {id:'v2',prompt:'Some bacteria in a population already carry an inherited resistance trait. What may happen after repeated antibiotic exposure?',
   options:['Every bacterium chooses to become resistant instantly','The resistant variants may become more common if they survive and reproduce','All genetic variation necessarily disappears immediately','Resistance is never heritable'],answerIndex:1,
   explanation:'Antibiotic exposure can select for pre-existing heritable resistance when resistant bacteria survive and reproduce better than susceptible ones. It does not mean an individual deliberately chooses a genetic change.'},
  {id:'v3',prompt:'In a changing habitat, a previously useful inherited colour becomes easy for predators to spot. Which conclusion is sound?',
   options:['A trait’s advantage can depend on the environment','All inherited traits are always beneficial','Individual animals choose new genes when noticed','Predators change all offspring at once'],answerIndex:0,
   explanation:'The selective advantage of an inherited characteristic depends on environmental conditions. A colour that was once protective can become disadvantageous if the habitat changes.'},
  {id:'v4',prompt:'Which change is most likely to be passed to offspring through biological inheritance?',
   options:['A scar acquired during a fall','A learned shortcut home','An inherited allele affecting pigment','An individual deciding it needs longer legs'],answerIndex:2,
   explanation:'Alleles inherited through reproduction can influence offspring traits. An acquired scar or a learned route does not normally alter the germline genetic information passed to descendants.'}
 ]
});

const safeQuestion=q=>({id:q.id,prompt:q.prompt,options:[...q.options]});
export function publicQuestions(lesson){
 if(!lesson||typeof lesson.id!=='string')return [];
 const base={id:'base',prompt:lesson.question,options:lesson.options};
 return [safeQuestion(base),...(QUESTION_BANKS[lesson.id]||[]).map(safeQuestion)];
}
export function questionForGrade(lesson,questionId='base'){
 if(!lesson||typeof lesson.id!=='string'||typeof questionId!=='string')return null;
 if(questionId==='base')return {id:'base',prompt:lesson.question,options:lesson.options,answerIndex:lesson.answerIndex,explanation:lesson.explanation};
 return (QUESTION_BANKS[lesson.id]||[]).find(q=>q.id===questionId)||null;
}
export function revisionForLesson(lessonId,progress=[]){
 if(typeof lessonId!=='string'||!Object.hasOwn(QUESTION_BANKS,lessonId)||!Array.isArray(progress))return null;
 const ids=['base',...QUESTION_BANKS[lessonId].map(q=>q.id)];
 const rows=new Map();
 for(const row of progress){
  if(!row||typeof row.lesson_id!=='string')continue;
  const id=row.lesson_id===lessonId?'base':row.lesson_id.startsWith(lessonId+'::')?row.lesson_id.slice(lessonId.length+2):null;
  if(!ids.includes(id))continue;
  if(!Number.isSafeInteger(row.attempts)||!Number.isSafeInteger(row.correct)||row.attempts<0||row.correct<0||row.correct>row.attempts)continue;
  rows.set(id,row);
 }
 const seen=ids.filter(id=>(rows.get(id)?.attempts||0)>0);
 const attempts=seen.reduce((s,id)=>s+rows.get(id).attempts,0);
 const correct=seen.reduce((s,id)=>s+rows.get(id).correct,0);
 const next=ids.find(id=>!seen.includes(id))??ids.find(id=>(rows.get(id)?.correct||0)<(rows.get(id)?.attempts||0))??null;
 const revision=!attempts?'not_started':correct<attempts?'review_and_practise':seen.length<ids.length?'try_new_question':'independent_review_required';
 return {lessonId,attempts,correct,accuracy:attempts?correct/attempts:null,distinctQuestionsAttempted:seen.length,
  questionCount:ids.length,nextQuestionId:next,revision,masteryCertified:false,examReadiness:'HOLD'};
}
