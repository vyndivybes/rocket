import {PHYSICS_3_INDEX,PHYSICS_3_DRAFTS} from './ncert-physics3.js';
import {CHEMISTRY_3_DRAFTS_A} from './ncert-chemistry3-a.js';
import {CHEMISTRY_3_DRAFTS_B} from './ncert-chemistry3-b.js';
import {CHEMISTRY_3_DRAFTS_C} from './ncert-chemistry3-c.js';
import {BIOLOGY_3_INDEX,BIOLOGY_3_DRAFTS} from './ncert-biology3.js';
// Authoritative parent-question identifiers are transcribed from official NCERT
// 2026–27 end-exercise pages. In-text prompts and subparts need separate census.
export const NEW_2026_EXERCISE_INDEXES=Object.freeze({
 'chapter-physics-3':PHYSICS_3_INDEX,
 'chapter-chemistry-3':Object.freeze({
  officialPdf:'https://ncert.nic.in/textbook/pdf/lech103.pdf',reprint:'2026-27',
  exerciseLabels:['End-of-unit Exercises'],
  questionIds:Object.freeze(Array.from({length:30},(_,i)=>'3.'+(i+1))),
  sourceCaveat:'Final source PDF page has a differing reprint footer; the numbered exercise pages show 2026–27.'
 }),
 'chapter-biology-3':BIOLOGY_3_INDEX
});
export const NEW_2026_WORKED_DRAFTS=Object.freeze([
 ...PHYSICS_3_DRAFTS,
 ...CHEMISTRY_3_DRAFTS_A,
 ...CHEMISTRY_3_DRAFTS_B,
 ...CHEMISTRY_3_DRAFTS_C,
 ...BIOLOGY_3_DRAFTS
]);
