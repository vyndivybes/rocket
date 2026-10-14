import {SUBJECT_MAP} from './syllabus-catalog.js';
import {PHYSICS_DRAFTS} from './chapters-physics.js';
import {CHEMISTRY_DRAFTS} from './chapters-chemistry.js';
import {MATHEMATICS_DRAFTS} from './chapters-mathematics.js';
import {BIOLOGY_DRAFTS} from './chapters-biology.js';
import {ENGLISH_ELECTIVE_DRAFTS} from './chapters-english-elective.js';

// 66 distinct CBSE Class XII 2026–27 curriculum units, including the prescribed
// 16 English Elective Kaleidoscope works. These are original chapter-level
// teaching drafts, not complete textbook replacements, validated practicals,
// unseen exam papers, teacher certification or a production release.
const SOURCES=[
 ['Physics',PHYSICS_DRAFTS],
 ['Chemistry',CHEMISTRY_DRAFTS],
 ['Mathematics',MATHEMATICS_DRAFTS],
 ['Biology',BIOLOGY_DRAFTS],
 ['English Elective',ENGLISH_ELECTIVE_DRAFTS]
];
export const CHAPTER_MODULES=Object.freeze(SOURCES.flatMap(([subject,drafts])=>{
 const metadata=SUBJECT_MAP[subject];
 if(!metadata||drafts.length!==metadata.titles.length)throw Error('Chapter draft inventory mismatch: '+subject);
 return drafts.map((draft,i)=>Object.freeze({
  ...draft,
  id:'chapter-'+subject.toLowerCase().replaceAll(' ','-')+'-'+(i+1),
  subject,
  chapterNumber:i+1,
  chapterTitle:metadata.titles[i],
  title:metadata.titles[i],
  duration:20,
  academicYear:'2026-27',
  curriculumStage:'chapter_draft',
  reviewStatus:'teacher_review_required',
  certified:false,
  source:metadata.source
 }));
}));
