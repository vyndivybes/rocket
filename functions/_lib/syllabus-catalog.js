import {revisionForLesson} from './question-bank.js';
// CBSE 2026–27 Class XII subject coverage inventory. Do not equate topic existence with validated teaching content.
export const SYLLABUS_SOURCE='https://cbseacademic.nic.in/curriculum_2027.html';
export const SAMPLE_PAPERS='https://cbseacademic.nic.in/SQP_CLASSXII_2026-27.html';
export const PHYSICS_SOURCE='https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Physics_SecP2_2026-27.pdf';
export const PHYSICS_CHAPTERS=[
 'Electric Charges and Fields','Electrostatic Potential and Capacitance','Current Electricity',
 'Moving Charges and Magnetism','Magnetism and Matter','Electromagnetic Induction',
 'Alternating Current','Electromagnetic Waves','Ray Optics and Optical Instruments',
 'Wave Optics','Dual Nature of Radiation and Matter','Atoms','Nuclei',
 'Semiconductor Electronics: Materials, Devices and Simple Circuits'
];
const available=['Physics','Chemistry','Mathematics','Biology','English Elective'];
// Compatibility entrypoint: return the same authoritative syllabus evidence as the student API.
// Never let the legacy function tell learners that a mapped CBSE course is unmapped.
export function syllabusInventory(selected=available,lessonList=[]){
 return academicInventory(selected,lessonList);
}

// English Elective (001), Class XII 2026–27. CBSE's official syllabus lists
// individual Kaleidoscope works, rather than a set of numbered NCERT chapters.
// Reading/writing/grammar and the chosen novel are separate requirements.
export const ENGLISH_ELECTIVE_SOURCE='https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/English_elective_SecP2_2026-27.pdf';
export const ENGLISH_ELECTIVE_TEXTS=[
  {strand:'Short Stories',title:'I Sell my Dreams'},
  {strand:'Short Stories',title:'Eveline'},
  {strand:'Short Stories',title:'A Wedding in Brownsville'},
  {strand:'Poetry',title:'A Lecture Upon the Shadow'},
  {strand:'Poetry',title:'Poems by Milton'},
  {strand:'Poetry',title:'Poems by Blake'},
  {strand:'Poetry',title:'Kubla Khan'},
  {strand:'Poetry',title:'Trees'},
  {strand:'Poetry',title:'The Wild Swans of Coole'},
  {strand:'Poetry',title:'Time and Time Again'},
  {strand:'Non fiction',title:'Freedom'},
  {strand:'Non fiction',title:'The Mark on the Wall'},
  {strand:'Non fiction',title:'Film-making'},
  {strand:'Non fiction',title:'Why the Novel Matters'},
  {strand:'Non fiction',title:'The Argumentative Indian'},
  {strand:'Drama',title:'Chandalika'}
];
export const ENGLISH_ELECTIVE_ASSESSMENT=[
 {name:'Reading Comprehension',marks:20},
 {name:'Applied Grammar',marks:8},
 {name:'Creative Writing',marks:20},
 {name:'Textbook',marks:22},
 {name:'Fiction',marks:10},
 {name:'Seminar (internal)',marks:20}
];
export const ENGLISH_ELECTIVE_FICTION=['A Tiger for Malgudi','The Financial Expert'];

export const SUBJECT_MAP={
 'English Elective':{code:'001',source:ENGLISH_ELECTIVE_SOURCE,pages:'Class XII section',titles:ENGLISH_ELECTIVE_TEXTS.map(x=>x.title),literatureTexts:ENGLISH_ELECTIVE_TEXTS,foundation:{},skills:['english-argument','english-elective-reading-inference','english-elective-grammar-passive','english-elective-discursive-writing','english-elective-poetry-inference']},
 Physics:{code:'042',source:PHYSICS_SOURCE,pages:'12–16',titles:PHYSICS_CHAPTERS,foundation:{3:['physics-current-electricity'],6:['physics-faraday']}},
 Chemistry:{code:'043',source:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Chemistry_SecP2_2026-27.pdf',pages:'8–9',titles:['Solutions','Electrochemistry','Chemical Kinetics','d- and f-Block Elements','Coordination Compounds','Haloalkanes and Haloarenes','Alcohols, Phenols and Ethers','Aldehydes, Ketones and Carboxylic Acids','Amines','Biomolecules'],foundation:{1:['chemistry-solutions-molarity'],2:['chemistry-electrochem']},formative:['Surface Chemistry','General Principles and Processes of Isolation of Elements','Polymers','Chemistry in Everyday Life']},
 Mathematics:{code:'041',source:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Maths_SecP2_2026-27.pdf',pages:'7–9',titles:['Relations and Functions','Inverse Trigonometric Functions','Matrices','Determinants','Continuity and Differentiability','Applications of Derivatives','Integrals','Application of the Integrals','Differential Equations','Vectors','Three-dimensional Geometry','Linear Programming','Probability'],foundation:{5:['mathematics-derivative'],13:['mathematics-conditional-probability']}},
 Biology:{code:'044',source:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Biology_SecP2_2026-27.pdf',pages:'9–11',titles:['Sexual Reproduction in Flowering Plants','Human Reproduction','Reproductive Health','Principles of Inheritance and Variation','Molecular Basis of Inheritance','Evolution','Human Health and Diseases','Microbes in Human Welfare','Biotechnology - Principles and Processes','Biotechnology and its Applications','Organisms and Populations','Ecosystem','Biodiversity and its Conservation'],foundation:{5:['biology-transcription','biology-genetics'],6:['biology-evolution-selection']},formative:['Environmental Issues']}
};
// Official CBSE 2026–27 Class XII assessment structures (maximum marks, not earned scores).
// Science practicals require physical school/teacher sign-off; Mathematics uses internal
// assessment, while English Elective uses a seminar. None are app-certified.
export const SUBJECT_ASSESSMENT=Object.freeze({
 Physics:Object.freeze({theory:70,practical:30,internal:0,seminar:0}),
 Chemistry:Object.freeze({theory:70,practical:30,internal:0,seminar:0}),
 Mathematics:Object.freeze({theory:80,practical:0,internal:20,seminar:0}),
 Biology:Object.freeze({theory:70,practical:30,internal:0,seminar:0}),
 'English Elective':Object.freeze({theory:80,practical:0,internal:0,seminar:20})
});
function aggregateLessonAttempts(lessonId,progress){
 const revision=revisionForLesson(lessonId,progress);
 if(revision)return {attempts:revision.attempts,correct:revision.correct};
 const row=Array.isArray(progress)?progress.find(p=>p?.lesson_id===lessonId):null;
 const attempts=Number.isSafeInteger(row?.attempts)&&row.attempts>=0?row.attempts:0;
 const correct=Number.isSafeInteger(row?.correct)&&row.correct>=0&&row.correct<=attempts?row.correct:0;
 return {attempts,correct};
}
export function academicInventory(selected,lessonList=[],progress=[]){
 if(!Array.isArray(selected))return [];
 return [...new Set(selected)].map(subject=>{
  const m=SUBJECT_MAP[subject];
  if(!m)return {subject,mappingStatus:subject==='English'?'subject_code_required':'not_yet_verified',chapters:[],qualifiedChapters:0,totalChapters:null,coverageStatus:'INCOMPLETE',officialSource:SYLLABUS_SOURCE};
  const chapters=m.titles.map((title,i)=>{
   const draftId='chapter-'+subject.toLowerCase().replaceAll(' ','-')+'-'+(i+1);
   const draft=lessonList.find(l=>l.id===draftId&&l.chapterTitle===title&&l.reviewStatus==='teacher_review_required');
   const lessons=(m.foundation[i+1]||[]).map(id=>lessonList.find(l=>l.id===id)).filter(Boolean);
   const records=lessons.map(l=>aggregateLessonAttempts(l.id,progress));
   const attempts=records.reduce((s,p)=>s+p.attempts,0),correct=records.reduce((s,p)=>s+p.correct,0);
   return {id:subject.toLowerCase().replaceAll(' ','-')+'-'+(i+1),number:i+1,title,moduleId:draft?draft.id:null,moduleStatus:draft?'teacher_review_required':'not_available',...(m.literatureTexts?{strand:m.literatureTexts[i].strand}:{}),status:lessons.length?'foundation_only':'no_qualified_lesson',foundationLessonIds:lessons.map(l=>l.id),practice:{attempts,correct,accuracy:attempts?correct/attempts:null},revision:attempts?(correct<attempts?'review_misconceptions':'try_fresh_questions'):'not_assessed',qualified:false};
  });
  const skillPractice=(m.skills||[]).map(id=>{
   const lesson=lessonList.find(l=>l.id===id);
   if(!lesson)return null;
   const {attempts,correct}=aggregateLessonAttempts(id,progress);
   return {lessonId:id,title:lesson.title,attempts,correct,accuracy:attempts?correct/attempts:null,
     revision:attempts===0?'not_assessed':correct<attempts?'review_worked_example':'try_new_unseen_question',
     certified:false};
  }).filter(Boolean);
  return {subject,code:m.code,board:'CBSE',academicYear:'2026-27',mappingStatus:'official_outline_verified',chapters,qualifiedChapters:0,totalChapters:chapters.length,foundationChapterCount:chapters.filter(ch=>ch.status==='foundation_only').length,chapterModuleCount:chapters.filter(ch=>ch.moduleStatus==='teacher_review_required').length,unmappedChapterCount:chapters.filter(ch=>ch.status!=='foundation_only').length,coverageStatus:'INCOMPLETE',assessmentStructure:{...SUBJECT_ASSESSMENT[subject]},assessmentStatus:'teacher_review_required',officialSource:m.source,sourcePages:m.pages,formativeTopics:m.formative||[],examReadiness:'HOLD',curriculumUnitType:m.literatureTexts?'literary_texts':'chapters',...(m.literatureTexts?{fictionChoices:[...ENGLISH_ELECTIVE_FICTION],fictionChoiceStatus:'school_choice_required',assessmentSections:ENGLISH_ELECTIVE_ASSESSMENT.map(section=>({...section})),foundationSkillLessonIds:skillPractice.map(p=>p.lessonId),skillPractice,practicalStatus:'not_applicable_seminar_review_required'}:{practicalStatus:subject==='Mathematics'?'not_applicable_internal_assessment_required':'teacher_assessment_required'})};
 });
}
