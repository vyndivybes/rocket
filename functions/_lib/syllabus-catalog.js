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
const available=['Physics','Chemistry','Mathematics','Biology','English','Accountancy','Economics','History','Computer Science'];
export function syllabusInventory(selected=available,lessonList=[]){
 const subjects=selected.filter(s=>available.includes(s));
 return subjects.map(subject=>{
   const chapters=subject==='Physics'?PHYSICS_CHAPTERS.map((name,i)=>({
     id:'physics-'+(i+1),number:i+1,title:name,
     foundationLessonIds:i===5?lessonList.filter(l=>l.id==='physics-faraday').map(l=>l.id):[],
     status:i===5&&lessonList.some(l=>l.id==='physics-faraday')?'foundation_only':'no_qualified_lesson'
   })):[];
   return {subject,board:'CBSE',academicYear:'2026-27',mappingStatus:subject==='Physics'?'official_chapter_titles_verified':'not_yet_verified',
     chapters,qualifiedChapters:0,totalChapters:subject==='Physics'?14:null,
     coverageStatus:'INCOMPLETE',officialSource:subject==='Physics'?PHYSICS_SOURCE:SYLLABUS_SOURCE};
 });
}
