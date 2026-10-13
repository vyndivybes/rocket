// Short, editorially drafted FOUNDATION lessons, not a board-certified syllabus.
// Only the server receives answerIndex. Clients receive lessonView() without the key.
export const SUBJECTS=['Physics','Chemistry','Mathematics','Biology','Accountancy','Economics','History','English'];
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
];
export function lessonView(lesson){
 const {answerIndex,...publicFields}=lesson;
 return publicFields;
}
export function validateProfile(body){
 if(!body||typeof body!=='object'||Array.isArray(body))return 'Invalid profile';
 if(!BOARDS.includes(body.board))return 'Choose a valid board';
 if(!STREAMS.includes(body.stream))return 'Choose a valid study stream';
 if(!Array.isArray(body.subjects)||body.subjects.length<1||body.subjects.length>8||new Set(body.subjects).size!==body.subjects.length||!body.subjects.every(x=>SUBJECTS.includes(x)))return 'Choose 1–8 valid subjects';
 if(!DAILY_MINUTES.includes(body.dailyMinutes))return 'Choose a supported daily study target';
 return null;
}
export function gradePractice(lessonId,choice){
 const lesson=LESSONS.find(x=>x.id===lessonId);
 if(!lesson||!Number.isInteger(choice)||choice<0||choice>3)return null;
 const correct=choice===lesson.answerIndex;
 return {lesson,correct,explanation:lesson.explanation,correctOption:lesson.options[lesson.answerIndex]};
}
