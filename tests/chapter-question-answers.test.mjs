import test from 'node:test';
import assert from 'node:assert/strict';
import {CHAPTER_MODULES} from '../functions/_lib/chapter-modules.js';

// Separately authored expected-response ledger for checking deterministic
// multiple-choice answer keys in all 66 short draft questions. This only
// establishes consistency with reviewed answer choices, not specialist
// sign-off or unseen exam validity.
const EXPECTED_CHOICES={
  "Physics": [
    "It becomes one quarter",
    "It quadruples",
    "2 Ω",
    "Zero",
    "Diamagnetic",
    "1.0 V",
    "200/√2 V",
    "Ultraviolet light",
    "Light travels from higher to lower refractive index",
    "It halves",
    "Light frequency",
    "A photon is emitted",
    "1/8",
    "Electrons"
  ],
  "Chemistry": [
    "0.50 M",
    "+0.60 V",
    "3.0 min",
    "Poor shielding by 4f electrons",
    "+3",
    "It occurs in one concerted displacement step",
    "R–O–R'",
    "CH₃CHO",
    "Secondary amine",
    "4"
  ],
  "Mathematics": [
    "f(x)=2x+1",
    "π/4",
    "2×4",
    "1",
    "7",
    "x=2",
    "1",
    "9",
    "y=x³+2",
    "Zero",
    "(1,−1,5)",
    "6",
    "0.50"
  ],
  "Biology": [
    "Triploid 3n",
    "Uterine endometrium",
    "A condom",
    "1/4",
    "Uracil",
    "0.48",
    "Antibiotics mainly target bacterial processes absent in viruses",
    "Saccharomyces cerevisiae (yeast)",
    "DNA ligase",
    "Human insulin gene information is expressed in suitable engineered cells",
    "Carrying capacity",
    "120",
    "A seed bank storing viable plant seeds"
  ],
  "English Elective": [
    "Separate reported events from characters' interpretations and cite details",
    "Commitment to home and family versus a hoped-for new life",
    "Flashback and association",
    "An extended metaphor for aspects of love",
    "Which exact poems and lines the prescribed anthology includes",
    "Use the surrounding words and speaker to justify an interpretation",
    "Imagination and poetic creation",
    "Analyse the actual image, context and speaker's tone",
    "Repeated natural beauty and human ageing",
    "Track how repetition alters sound, pattern and meaning",
    "Identify claims, evidence and qualifications",
    "Stream of consciousness",
    "Camera framing and shot duration",
    "The novel as a way of depicting complex human life",
    "Examine historical examples, diverse voices and counterarguments",
    "Caste prejudice and recognition of human dignity"
  ]
};

test('all 66 short chapter questions point to the intended correct choice',()=>{
 let checked=0;
 for(const [subject,answers] of Object.entries(EXPECTED_CHOICES)){
  const lessons=CHAPTER_MODULES.filter(x=>x.subject===subject);
  assert.equal(lessons.length,answers.length,subject+' count');
  answers.forEach((answer,index)=>{
   const unit=lessons[index];
   assert.equal(unit.options[unit.answerIndex],answer,unit.id+' answer mismatch');
   assert.ok(unit.explanation.length>35,unit.id+' explanation missing');
   checked++;
  });
 }
 assert.equal(checked,66);
});

test('independent arithmetic spot-checks match physical units and mathematical reasoning',()=>{
 const expected=[
  ['Physics',1,'It becomes one quarter'],
  ['Physics',3,'2 Ω'],
  ['Physics',6,'1.0 V'],
  ['Chemistry',1,'0.50 M'],
  ['Chemistry',2,'+0.60 V'],
  ['Chemistry',3,'3.0 min'],
  ['Mathematics',4,'1'],
  ['Mathematics',7,'1'],
  ['Mathematics',8,'9'],
  ['Mathematics',9,'y=x³+2'],
  ['Mathematics',12,'6'],
  ['Mathematics',13,'0.50'],
  ['Biology',1,'Triploid 3n'],
  ['Biology',4,'1/4'],
  ['Biology',6,'0.48'],
  ['Biology',12,'120']
 ];
 for(const [subject,n,correct] of expected){
  const m=CHAPTER_MODULES.find(x=>x.subject===subject&&x.chapterNumber===n);
  assert.equal(m.options[m.answerIndex],correct,subject+' chapter '+n);
 }
});
