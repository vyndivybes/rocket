# Saathi — source-verified NCERT 2026–27 exercise audit, initial solved bank
Date: 2026-10-14 · Code authority: `feat/saathi-academic-mvp`
Release: **development only; overall NCERT exercise coverage HOLD**

## Source reconciliation, not an invented 100%

The 2026–27 CBSE learner catalogue maps **50 Physics/Chemistry/Mathematics/Biology chapters** and **16 English Elective Kaleidoscope literary units**. A chapter count is not the count of exercise items.

| Subject / unit | Official 2026–27 evidence | Printed parent exercise identifiers verified | Original worked solution drafts | Teacher/independent qualified answers |
|---|---|---:|---:|---:|
| Physics Ch 1 Electric Charges and Fields | https://ncert.nic.in/textbook/pdf/leph101.pdf, reprint 2026–27, printed pages 42–44 | 23, 1.1–1.23 | 23 | 0 |
| Mathematics Ch 1 Relations and Functions | https://ncert.nic.in/textbook/pdf/lemh101.pdf, reprint 2026–27, printed pages 5–16 | 35: Ex 1.1 (16), Ex 1.2 (12), Misc. Ex (7) | 7 | 0 |
| 48 other science and Mathematics chapters | Curriculum-level titles verified, but exercise-by-exercise census not completed | Unknown | 0 | 0 |
| 16 English Elective literary units | Kaleidoscope reading and examination outcomes; not equivalent to one NCERT numbered exercise per text | Separate assessment and passage corpus | Prior 16 editorial unit drafts; **no individually certified textbook answers** | 0 |

**Scope of numbering:** Mathematics counts are *parent questions*; subparts (i), (ii) etc. require individual answers and may increase the actual solution-task count. The two indexed chapters contain **58 parent question entries**, of which 30 now have original worked drafts and **28 Math Chapter 1 parent entries still lack a worked draft**. 30 out of 58 does **not** describe completion of the full multi-subject syllabus. 64 of 66 syllabus units have no verified question-number census (48 science/maths chapter units plus 16 English literary units with a different examination structure).

`functions/_lib/ncert-solved-exercises.js` lists sources, exact printed identifiers, worked steps, answers, reverse checks and original formative marking guidance; **no NCERT question text** is republished. `lessonView()` supplies only student-authorised subject content, and the learner UI renders solutions in expandable panels. Before reviewing a keyed solution, the student must open their own original textbook to read the exercise. `NCERT_EXERCISE_LEDGER` exposes `workedDraftCount` separately from `verifiedQuestionCount`, which remains zero.

## Correctness checks and defect correction

- Automated integrity: 30 unique source-indexed answer drafts, each with at least two explanatory steps, a result, a consistency check and three-part formative self-check rubric.
- Independent arithmetic-recomputation tests with fixed physical constants cover electrostatic forces, separation, field, torque, Gauss flux and enclosed charges. These tests demonstrate selected numerical consistency, **not** review of every solution.
- **Physics 1.13 corrected during test-first audit**: diagram tracks 1 and 2 bend toward positive plate and are negative; 3 bends toward negative plate and is positive; greatest comparison is track 3 under exercise assumptions. The previous answer incorrectly called 2 neutral and 1 greatest; new regression prevents that error from returning.
- Physics 1.13's charge-to-mass magnitude comparison depends on the usual assumption of comparable incident velocities; the source diagram alone is insufficient if speeds differ.
- Source pages, signs and units must be checked for each item at academic review; the original drafts currently say `certified:false`.

## English Elective (001) — 2026–27 assessment reconciliation

The CBSE subject specification at https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/English_elective_SecP2_2026-27.pdf assigns **80 marks theory + 20 seminar**:
- Reading 20: literary/discursive comprehension 12; unseen poem 4; short case-based factual passage 4
- Applied grammar 8: sentence transformations, eight out of ten choices
- Creative writing 20: three 5-mark tasks plus one 5-mark argumentative/discursive composition
- Prescribed Kaleidoscope textbook 22: literature comprehension, appreciation, inference and interpretation
- Fiction 10: prescribed **one** R. K. Narayan novel, either *A Tiger for Malgudi* **or** *The Financial Expert*
- Seminar 20: live presentation, questions and answers, diction and oral expression; **school assessment**, not automatic app certification

Existing Saathi `SYLLABUS` and supplementary unit drafts cover these *types* of assessed activity. The exact chosen fiction title and school-selected edition remain unconfirmed, and independently scored reading passages, model writing samples and oral seminar evidence are not complete. An exam section is not interchangeable with an NCERT numbered exercise.

## Unresolved work necessary for 'Full NCERT exercise coverage — PASS'

1. Reconcile the official **2026–27 printed editions** and exercise numbers for each of the remaining 48 subject chapters, recording all main, in-text, subsection and miscellaneous question parts. Keep precise page/diagram references in internal source metadata; do not mirror copyrighted question text.
2. Complete original worked answers for the 28 as-yet-unsolved Math Chapter 1 parent questions, including all subparts, then all other verified printed items; use independently checked derivations, reactions, biological explanations and diagrams as applicable.
3. Validate **every** completed item and counterexample against the actual print question, plus mark-scheme alignment, then record qualified answers and provenance individually. Do not set verified=true merely from a passing syntactic test or a model-generated answer.
4. Prepare unseen English Elective reading/grammar/writing assessments and teacher-checkable rubrics, the assigned novel's passage-based responses and seminar assessment. Confirm the selected school novel and exact prescribed grouped Milton/Blake poem selections.
5. Finish safeguarding, authenticated browser/mobile acceptance, consent/retention and live D1 backup/restore. Keep `commissioningStatus().productionEligible === false` and production PR #1 unmerged.

### Copyright and release boundary
NCERT's textbook website permits personal/educational textbook use for reference but restricts republishing textbook copies in third-party software; source citations and **original explanations** are used, not a duplicated NCERT exercise bank. Source-index records include edition IDs and small identifiers, not original questions. No child learner progress, secrets, D1 tables or production deploy changed.

**Final academic grade: SOURCE_INDEX_PARTIAL / WORKED_DRAFT_PARTIAL / QUESTION_QUALIFICATION_HOLD / COMMISSIONING_HOLD.** Do not report 100% coverage or release on this code alone.
