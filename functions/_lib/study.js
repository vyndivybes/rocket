import {publicQuestions,questionForGrade} from './question-bank.js';
import {CHAPTER_MODULES} from './chapter-modules.js';
import {chapterSourceIndex,workedSolutionsForChapter} from './ncert-solved-exercises.js';
// Short, editorially drafted FOUNDATION lessons, not a board-certified syllabus.
// Only the server receives answerIndex. Clients receive lessonView() without the key.
export const SUBJECTS=['Physics','Chemistry','Mathematics','Biology','Accountancy','Economics','History','English','English Elective'];
export const BOARDS=['unconfigured','CBSE','ISC','State','Other'];
export const STREAMS=['Science','Commerce','Humanities','Mixed'];
export const DAILY_MINUTES=[20,30,45,60];
export const LESSONS=[
 {id:'physics-faraday',subject:'Physics',title:'Faraday’s law of induction',duration:10,
  concept:'An emf is induced when the magnetic flux linked with a coil changes. The negative sign indicates opposition to the change (Lenz’s law).',
  example:'For a 10-turn coil, flux changes uniformly from 0.02 Wb to 0.06 Wb in 0.2 s. Magnitude of induced emf = N × ΔΦ/Δt = 10 × 0.04/0.2 = 2 V.',
  question:'What is the magnitude of emf when 5 turns see a flux change of 0.10 Wb in 0.5 s?',
  options:['0.1 V','1 V','5 V','10 V'],answerIndex:1,
  explanation:'Magnitude = N ΔΦ/Δt = 5 × 0.10/0.5 = 1 V.',
  source:'Standard electromagnetic induction principle; verify against your board textbook.'},
 {id:'chemistry-electrochem',subject:'Chemistry',title:'Cell potential basics',duration:10,
  concept:'In a galvanic cell, oxidation occurs at the anode and reduction at the cathode. Using reduction potentials: E°cell = E°cathode − E°anode.',
  example:'If E°cathode = +0.80 V and E°anode = −0.76 V, E°cell = 0.80 − (−0.76) = 1.56 V.',
  question:'With E°cathode +0.50 V and E°anode −0.30 V, what is E°cell?',
  options:['−0.80 V','0.20 V','0.80 V','1.50 V'],answerIndex:2,
  explanation:'E°cell = +0.50 − (−0.30) = +0.80 V.',
  source:'Standard electrochemistry definitions; consult your school textbook.'},
 {id:'mathematics-derivative',subject:'Mathematics',title:'Differentiating a polynomial',duration:10,
  concept:'For integer n, the power rule gives d(xⁿ)/dx = n xⁿ⁻¹. Differentiate each term separately.',
  example:'If f(x) = 3x² + 2x − 7, then f′(x) = 6x + 2.',
  question:'What is the derivative of 5x³ − 2x?',
  options:['15x² − 2','5x² − 2','15x³ − 2','10x² − 2'],answerIndex:0,
  explanation:'The derivative of 5x³ is 15x², and of −2x is −2.',
  source:'Elementary calculus rule; consult your prescribed text.'},
 {id:'biology-transcription',subject:'Biology',title:'DNA and transcription',duration:10,
  concept:'During transcription, RNA polymerase uses a DNA template strand to synthesize RNA. In RNA, uracil (U) is used instead of thymine (T).',
  example:'When the template DNA sequence is 3′-TAC-5′, the complementary RNA sequence is 5′-AUG-3′.',
  question:'Which nitrogenous base is used in RNA in place of thymine?',
  options:['Guanine','Uracil','Cytosine','Adenine'],answerIndex:1,
  explanation:'RNA uses uracil (U), which pairs with adenine in an RNA–DNA duplex.',
  source:'Molecular biology fundamentals; verify with your biology text.'},
 {id:'accountancy-equation',subject:'Accountancy',title:'Accounting equation',duration:10,
  concept:'The accounting equation is Assets = Liabilities + Owner’s Equity. Every transaction preserves this equality.',
  example:'If assets are ₹80,000 and liabilities ₹30,000, owner’s equity is ₹50,000.',
  question:'Assets are ₹1,20,000 and liabilities ₹45,000. What is owner’s equity?',
  options:['₹1,65,000','₹75,000','₹45,000','₹1,20,000'],answerIndex:1,
  explanation:'Owner’s equity = Assets − Liabilities = ₹1,20,000 − ₹45,000 = ₹75,000.',
  source:'Accounting fundamentals; verify the notation in your textbook.'},
 {id:'economics-demand',subject:'Economics',title:'Law of demand',duration:10,
  concept:'Holding other influences constant, a higher price of a normal good generally reduces the quantity demanded. A change in price is a movement along a demand curve.',
  example:'If the price of notebooks increases while income and tastes stay unchanged, students may purchase fewer notebooks.',
  question:'With other factors constant, what does a rise in a good’s own price generally cause?',
  options:['An increase in quantity demanded','A decrease in quantity demanded','No price response ever','Demand always doubles'],answerIndex:1,
  explanation:'A higher own price generally reduces quantity demanded when other factors are held constant.',
  source:'Introductory microeconomics; verify exact board terminology.'},
 {id:'history-sources',subject:'History',title:'Corroborating historical evidence',duration:10,
  concept:'Historians compare sources, dates, context and perspectives. A primary source is direct evidence from the period; it may still be biased or incomplete.',
  example:'A letter from a historical participant is primary evidence, but its author might exaggerate. Compare it with contemporary records.',
  question:'Which approach best checks a historical claim?',
  options:['Trust one anonymous assertion','Compare independent contemporary sources','Ignore the source date','Treat every source as unbiased'],answerIndex:1,
  explanation:'Corroboration checks independent evidence, origin, timing and potential bias.',
  source:'Historical-method fundamentals; not a specific exam chapter.'},
 {id:'english-argument',subject:'English',title:'Write a clear argument',duration:10,
  concept:'A persuasive paragraph makes a claim, supports it with evidence and explains how the evidence supports the claim.',
  example:'Claim: Reading can broaden vocabulary. Evidence: Frequent exposure to varied texts introduces unfamiliar words. Explanation: Repeated context helps readers infer meanings.',
  question:'Which combination makes an argument more convincing?',
  options:['Claim, evidence and explanation','Only an opinion repeated','Only unrelated facts','A longer title without support'],answerIndex:0,
  explanation:'A supported claim explains why particular evidence is relevant.',
  source:'General writing fundamentals; requirements differ across school boards.'}
,
 {id:'physics-newton',subject:'Physics',title:'Forces and acceleration',duration:10,
  concept:'Newton’s second law connects net force, mass and acceleration: F = ma. Units matter: newton = kilogram × metre per second squared.',
  example:'An object with mass 2 kg has acceleration 3 m/s². Net force = 2 × 3 = 6 N.',
  question:'A 4 kg cart accelerates at 2 m/s². What is the net force?',
  options:['2 N','8 N','6 N','12 N'],answerIndex:1,
  explanation:'F=ma=4×2=8 newtons. This is a toy physics example, not a real aircraft calculation.',
  source:'Newtonian mechanics foundation; check the school textbook.'},
 {id:'physics-speed',subject:'Physics',title:'Distance, time and speed',duration:8,
  concept:'Average speed equals total distance divided by total elapsed time. Always write units.',
  example:'A toy vehicle travels 90 km in 1.5 hours. Average speed = 90 ÷ 1.5 = 60 km/h.',
  question:'A model vehicle covers 120 km in 2 hours. What is its average speed?',
  options:['240 km/h','60 km/h','30 km/h','100 km/h'],answerIndex:1,
  explanation:'Average speed = 120 km ÷ 2 h = 60 km/h.',
  source:'Elementary kinematics; not an operational aviation example.'},
 {id:'maths-pythagoras',subject:'Mathematics',title:'Right triangles and the Pythagorean rule',duration:10,
  concept:'For a right triangle with legs a and b and hypotenuse c, a²+b²=c².',
  example:'For perpendicular sides 3 and 4 units, c=√(9+16)=5 units.',
  question:'A right triangle has legs of 6 cm and 8 cm. How long is its hypotenuse?',
  options:['10 cm','14 cm','7 cm','100 cm'],answerIndex:0,
  explanation:'c=√(6²+8²)=√(36+64)=√100=10 cm.',
  source:'Geometry foundation; consult your Mathematics textbook.'},
 {id:'maths-percent',subject:'Mathematics',title:'Percentages without panic',duration:8,
  concept:'Percentage means per hundred. To find p% of a number, multiply by p/100.',
  example:'20% of 150 = (20/100)×150 = 30.',
  question:'What is 15% of 200?',
  options:['15','20','30','40'],answerIndex:2,
  explanation:'Convert 15% to the fraction 15/100, then multiply by 200: (15/100) × 200 = 30.',
  source:'Numeracy foundation; useful for checking calculations.'},
 {id:'chemistry-mole',subject:'Chemistry',title:'Moles and molar mass',duration:10,
  concept:'Amount of substance in moles equals mass in grams divided by molar mass in g/mol.',
  example:'One mole of water (H₂O) has an approximate molar mass of 18 g/mol; 18 g is therefore about 1 mol.',
  question:'Approximately how many moles are in 36 g of water (molar mass 18 g/mol)?',
  options:['0.5 mol','2 mol','18 mol','36 mol'],answerIndex:1,
  explanation:'Divide the given water mass (36 g) by molar mass (18 g/mol). The result is 2 moles of water.',
  source:'Introductory chemistry; check standard atomic masses and textbook conventions.'},
 {id:'chemistry-atom',subject:'Chemistry',title:'Atoms and ions',duration:8,
  concept:'A neutral atom has equal numbers of protons and electrons. Cations are positively charged ions formed when electrons are lost.',
  example:'A neutral sodium atom with 11 protons has 11 electrons. Na⁺ has 10 electrons.',
  question:'A neutral atom has 8 protons. How many electrons does it have?',
  options:['4','8','16','0'],answerIndex:1,
  explanation:'Neutral means total positive and negative charge balance: 8 protons and 8 electrons.',
  source:'Atomic structure foundation; refer to textbook for exceptions and advanced models.'},
 {id:'biology-alveoli',subject:'Biology',title:'Where gas exchange happens',duration:10,
  concept:'Alveoli are tiny air sacs in the lungs with thin surfaces close to blood capillaries, allowing oxygen and carbon dioxide to diffuse.',
  example:'Air reaches the alveoli; oxygen moves into surrounding blood while carbon dioxide moves from blood into the alveoli.',
  question:'Where does most oxygen/carbon dioxide exchange occur in the lungs?',
  options:['Trachea','Alveoli','Nose','Diaphragm'],answerIndex:1,
  explanation:'Alveoli provide a large, thin surface for diffusion of gases.',
  source:'Human physiology foundation; not individual medical advice.'},
 {id:'biology-genetics',subject:'Biology',title:'Simple DNA pairing',duration:8,
  concept:'In typical double-stranded DNA, adenine (A) pairs with thymine (T), and guanine (G) pairs with cytosine (C).',
  example:'DNA sequence A–G–T has a complementary DNA sequence T–C–A.',
  question:'In double-stranded DNA, which base pairs with guanine?',
  options:['Adenine','Cytosine','Thymine','Uracil'],answerIndex:1,
  explanation:'Guanine pairs with cytosine in canonical DNA base pairing.',
  source:'Molecular genetics foundation; verify with Biology textbook.'},

 {id:'english-elective-reading-inference',subject:'English Elective',title:'Reading: inference from evidence',duration:12,academicYear:'2026-27',curriculumStage:'foundational_practice',
  concept:'An inference is a reasonable conclusion supported by clues in a passage, not a fact stated word for word. Read the detail, ask what it implies, and reject answers that add information the author never supplied. This is a general reading skill, not a Kaleidoscope text.',
  example:'Original passage: “Before leaving, Dev placed his sketchbook in a waterproof folder and closed the studio windows. Dark clouds gathered above the school.” The two actions and the clouds support an inference that Dev expected rain. They do not prove when rain began.',
  question:'Original passage: “Dark clouds gathered. Mira moved her drawings away from the open window and shut it.” Which conclusion is best supported?',
  options:['Mira had already lost every drawing','Mira wanted to protect the drawings from possible rain','Mira was preparing an art exhibition in another city','Mira disliked every window'],answerIndex:1,
  explanation:'The dark clouds and Mira’s decision to close the window together support the possibility that she was protecting paper from rain. The passage says nothing about losses, travel or personal dislike.',
  source:'Original Saathi practice, aligned to CBSE 2026–27 English Elective 001 Reading Comprehension skills; not an official NCERT excerpt.'},
 {id:'english-elective-grammar-passive',subject:'English Elective',title:'Applied grammar: preserving tense in the passive',duration:12,academicYear:'2026-27',curriculumStage:'foundational_practice',
  concept:'To change an active sentence to passive voice, make the original object the subject, choose the matching tense of “be”, and use the past participle. Keep time expressions, meaning and subject–verb agreement. Use “by” when the agent matters.',
  example:'“The curator displays the sketches every Friday” becomes “The sketches are displayed by the curator every Friday”: plural sketches needs are, displays is present simple, and displayed is the past participle. “The school announced the results” becomes “The results were announced by the school.”',
  question:'Which is the correct passive of “The artists restored the mural last week” while preserving the original tense and time?',
  options:['The mural is restored by the artists last week','The mural was restored by the artists last week','The mural will restore the artists last week','The mural has restore by the artists last week'],answerIndex:1,
  explanation:'“Restored” is simple past, so the passive uses “was” for the singular mural plus the past participle “restored”; the time phrase “last week” remains unchanged. Other choices shift tense or break the verb construction.',
  source:'Original Saathi practice aligned to CBSE 2026–27 English Elective 001 Applied Grammar; not an official exam question.'},
 {id:'english-elective-discursive-writing',subject:'English Elective',title:'Creative writing: a reasoned argument',duration:15,academicYear:'2026-27',curriculumStage:'foundational_practice',
  concept:'An argumentative paragraph needs a clear position, a relevant reason, evidence or a concrete example, and an explanation connecting that evidence to the claim. A balanced response also acknowledges a reasonable counterargument instead of dismissing it.',
  example:'Prompt: “Should a school provide a quiet study space after class?” Claim: “An optional supervised space could help learners who need one.” Example: “Some learners share busy homes and may find concentration difficult.” Reasoning: “The extra option gives them a quiet place without requiring everyone to stay.” Counterpoint: “Staffing and access costs need planning.”',
  question:'Which sentence is the strongest starting claim for a balanced paragraph on extending school library hours?',
  options:['Libraries are libraries, and that is all','Everyone who disagrees is wrong','An optional extra hour could improve access to quiet study, provided staffing and safety needs are addressed','There are many buildings in the world'],answerIndex:2,
  explanation:'The third option states a debatable position, a relevant reason and a genuine constraint. A useful next step is to support the claim with specific, verifiable evidence rather than invented statistics.',
  source:'Original Saathi practice aligned to CBSE 2026–27 English Elective 001 Creative Writing; sample argument is illustrative, not an official model answer.'},
 {id:'english-elective-poetry-inference',subject:'English Elective',title:'Poetry: imagery and personification',duration:12,academicYear:'2026-27',curriculumStage:'foundational_practice',
  concept:'Poets use sensory images to help readers picture a scene and figures of speech to suggest meaning. Personification gives a non-human thing a human-like action. Identify the actual words first; then explain how the device affects the tone. Do not assume every image has one fixed meaning.',
  example:'Original line: “The old window swallowed the final light of evening.” A window does not literally swallow anything; the verb “swallowed” gives it a human-like action and suggests the room becoming dark. “Final light” also evokes a visual image.',
  question:'In the original sentence “The tired city stretched awake at dawn,” which device is most evident?',
  options:['Personification','A mathematical proof','A literal report that buildings have muscles','A bibliography'],answerIndex:0,
  explanation:'A city cannot literally stretch awake, so the author assigns a human action to the city. The figure of speech suggests movement and activity beginning in the morning; this is interpretation of an original practice line.',
  source:'Original Saathi practice aligned to CBSE 2026–27 English Elective 001 reading and poetry appreciation skills; not a Kaleidoscope quotation.'},
 {id:'physics-current-electricity',subject:'Physics',title:'Current Electricity: Ohm’s law',duration:12,academicYear:'2026-27',curriculumStage:'foundational_practice',
  concept:'For an ohmic conductor at constant physical conditions, potential difference V is proportional to current I, and R = V/I. Rearranging gives I = V/R. Express voltage in volts, current in amperes and resistance in ohms. Not every device obeys a constant resistance.',
  example:'In a simple hypothetical ohmic-resistor calculation, the voltage is 12 V and resistance is 4 Ω. First write I = V/R. Then substitute 12 ÷ 4 = 3. The current is 3 A. This is pencil-and-paper practice, not a wiring instruction.',
  question:'In a hypothetical ohmic-resistor calculation, 9 V is across a fixed resistance of 3 Ω. What is the current?',
  options:['27 A','0.33 A','3 A','12 A'],answerIndex:2,
  explanation:'Apply Ohm’s law I = V/R using the stated constant resistance: 9 volts divided by 3 ohms is 3 amperes. The unit is A, not V or Ω. No physical circuit experiment is needed.',
  source:'Original Saathi practice linked to CBSE 2026–27 Physics 042, Current Electricity; foundational calculation, not a complete chapter.'},
 {id:'chemistry-solutions-molarity',subject:'Chemistry',title:'Solutions: calculating molarity',duration:12,academicYear:'2026-27',curriculumStage:'foundational_practice',
  concept:'Molarity M is the amount of dissolved solute in moles divided by the total volume of solution in litres. Convert millilitres to litres before dividing. Molarity uses solution volume, not solvent volume; temperature changes may affect that volume.',
  example:'A hypothetical solution contains 0.25 mol of solute in a final solution volume of 500 mL. Convert 500 mL to 0.500 L, then divide: 0.25 mol ÷ 0.500 L = 0.50 mol/L, written as 0.50 M. This is calculation only, not chemical preparation.',
  question:'A hypothetical solution contains 0.30 mol of solute in 600 mL of final solution. What is its molarity?',
  options:['0.05 M','0.50 M','1.8 M','2.0 M'],answerIndex:1,
  explanation:'Convert 600 mL into 0.600 L. The molarity equals 0.30 mol divided by 0.600 L, giving 0.50 mol/L, or 0.50 M. The denominator is the final solution volume.',
  source:'Original Saathi practice linked to CBSE 2026–27 Chemistry 043, Solutions; numerical foundation, no unsupervised lab work.'},
 {id:'mathematics-conditional-probability',subject:'Mathematics',title:'Probability: condition on the known group',duration:12,academicYear:'2026-27',curriculumStage:'foundational_practice',
  concept:'Conditional probability P(A|B) is the chance of event A when event B is already known to have occurred. For P(B)>0, P(A|B) = P(A∩B)/P(B). With counts, restrict the denominator to cases satisfying B, not every case in the larger population.',
  example:'In a hypothetical class, 20 pupils play a sport and 8 of those also play an instrument. Among pupils known to play a sport, the chance of also playing an instrument is 8/20 = 0.4. Dividing by the full class size would answer a different question.',
  question:'Of 25 students who cycle to school, 10 also sketch. A randomly chosen cyclist is known to cycle. What is the probability this student also sketches?',
  options:['0.10','0.25','0.40','2.50'],answerIndex:2,
  explanation:'The conditioning group is the 25 cyclists, and 10 of them sketch. Therefore P(sketch|cycle) = 10/25 = 0.40. The total school population is irrelevant once cycling is given.',
  source:'Original Saathi practice linked to CBSE 2026–27 Mathematics 041, Probability; one foundation example only.'},
 {id:'biology-evolution-selection',subject:'Biology',title:'Evolution: natural selection across generations',duration:12,academicYear:'2026-27',curriculumStage:'foundational_practice',
  concept:'Natural selection can change the frequency of heritable traits in a population over generations when traits influence survival and reproduction in a particular environment. Selection acts on existing variation; an individual does not acquire an inherited trait simply because it needs one.',
  example:'In a hypothetical insect population, some insects already have a heritable colour that makes them harder for predators to spot. If they survive and reproduce more often in that environment, the colour may become more common in later generations. No insect chooses its genes in response to danger.',
  question:'Which statement best explains natural selection in a population with inherited differences?',
  options:['Each organism intentionally edits its genes when threatened','Helpful inherited variants can become more common over successive generations','All organisms acquire the same trait immediately','Inherited differences never affect reproduction'],answerIndex:1,
  explanation:'If a heritable variant contributes to greater reproductive success in a given environment, descendants carrying it may become a larger share of the population over generations. Change in a population is not deliberate change by one individual.',
  source:'Original Saathi practice linked to CBSE 2026–27 Biology 044, Evolution; conceptual foundation rather than a complete chapter.'},

 ...CHAPTER_MODULES
];
// Course authority boundary: a CBSE 2026-27 draft, syllabus-linked foundation,
// or English Elective (001) is only available to an explicitly enrolled CBSE
// learner. General foundational literacy/numeracy remains useful before setup.
function validSubjects(selected){
 if(selected===null)return true;
 return Array.isArray(selected)&&selected.length>=1&&selected.length<=8&&
  new Set(selected).size===selected.length&&
  selected.every(subject=>typeof subject==='string'&&SUBJECTS.includes(subject))&&
  !(selected.includes('English')&&selected.includes('English Elective'));
}
export function lessonAllowedForLearner(lesson,board,selectedSubjects=null){
 if(!lesson||typeof lesson.subject!=='string'||!validSubjects(selectedSubjects))return false;
 const restricted=lesson.curriculumStage==='chapter_draft'||
  lesson.academicYear==='2026-27'||lesson.subject==='English Elective';
 if(restricted&&(board!=='CBSE'||selectedSubjects===null))return false;
 if(selectedSubjects===null)return true;
 return selectedSubjects.includes(lesson.subject)||
  (lesson.subject==='English'&&selectedSubjects.includes('English Elective'));
}
export function studentLessons(board,selectedSubjects=null){
 if(!validSubjects(selectedSubjects))return [];
 return LESSONS.filter(lesson=>lessonAllowedForLearner(lesson,board,selectedSubjects));
}

export function lessonView(lesson){
 // Never expose the grading key or answer explanation before the attempt.
 const {answerIndex,explanation,...publicFields}=lesson;
 const source=chapterSourceIndex(lesson.id);
 return {...publicFields,questions:publicQuestions(lesson),
  ncertExerciseQuestionCount:source?.questionIds.length??null,
  ncertOfficialSourceUrl:source?.officialPdf??null,
  ncertSourceReprint:source?.reprint??null,
  ncertSourceEditionVerified:source?source.reprintVerified!==false:null,
  ncertExerciseIndexStatus:source?.reprintVerified===false?'SOURCE_EDITION_HOLD':source?'SOURCE_INDEX_RECONCILED':'NOT_INDEXED',
  ncertExerciseSolutions:workedSolutionsForChapter(lesson.id)};
}
export function validateProfile(body){
 if(!body||typeof body!=='object'||Array.isArray(body))return 'Invalid profile';
 if(!BOARDS.includes(body.board))return 'Choose a valid board';
 if(!STREAMS.includes(body.stream))return 'Choose a valid study stream';
 if(!Array.isArray(body.subjects)||body.subjects.length<1||body.subjects.length>8||new Set(body.subjects).size!==body.subjects.length||!body.subjects.every(x=>SUBJECTS.includes(x)))return 'Choose 1–8 valid subjects';
 if(body.subjects.includes('English')&&body.subjects.includes('English Elective'))return 'Choose one English course';
 if(!DAILY_MINUTES.includes(body.dailyMinutes))return 'Choose a supported daily study target';
 return null;
}
export function gradePractice(lessonId,choice,questionId='base'){
 const lesson=LESSONS.find(x=>x.id===lessonId);
 if(!lesson||!Number.isInteger(choice)||choice<0||choice>3)return null;
 const question=questionForGrade(lesson,questionId);
 if(!question)return null;
 const correct=choice===question.answerIndex;
 const progressKey=question.id==='base'?lesson.id:lesson.id+'::'+question.id;
 return {lesson,questionId:question.id,progressKey,correct,
  explanation:question.explanation,correctOption:question.options[question.answerIndex]};
}


const FOUNDATION_KEYWORDS=[
 ['faraday','physics-faraday'],['magnetic flux','physics-faraday'],['induced emf','physics-faraday'],
 ['newton','physics-newton'],['force','physics-newton'],['acceleration','physics-newton'],
 ['average speed','physics-speed'],['velocity','physics-speed'],
 ['derivative','mathematics-derivative'],['differentiate','mathematics-derivative'],
 ['triangle','maths-pythagoras'],['pythagoras','maths-pythagoras'],
 ['percentage','maths-percent'],['percent','maths-percent'],
 ['molar','chemistry-mole'],['mole','chemistry-mole'],['atom','chemistry-atom'],['electrochemistry','chemistry-electrochem'],
 ['alveoli','biology-alveoli'],['lungs','biology-alveoli'],['dna','biology-genetics'],['transcription','biology-transcription'],
 ['accounting','accountancy-equation'],['demand','economics-demand']
];
export function relevantFoundation(question){
 if(typeof question!=='string')return null;
 const q=question.toLowerCase();
 const link=FOUNDATION_KEYWORDS.find(([term])=>q.includes(term));
 if(!link)return null;
 const lesson=LESSONS.find(x=>x.id===link[1]);if(!lesson)return null;
 return {id:lesson.id,title:lesson.title,concept:lesson.concept,example:lesson.example,explanation:lesson.explanation,reference:lesson.source};
}
