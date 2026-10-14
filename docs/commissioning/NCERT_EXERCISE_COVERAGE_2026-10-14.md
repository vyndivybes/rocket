# Saathi NCERT exercise coverage — source and qualification ledger
Date: 2026-10-14
Target: `feat/saathi-academic-mvp`, **not production main**

## Explicit outcome
**Full NCERT exercise coverage is NOT complete.** The correct status is HOLD, not a guessed percentage.
The original CBSE Class XII 2026–27 chapter/literary-work syllabus maps 66 main units:
Physics 14, Chemistry 10, Mathematics 13, Biology 13, English Elective 16. 
The 50 science/Mathematics chapters and 16 English literary units are not equivalent to 66 enumerated textbook exercise sections; some chapters have multiple exercises, miscellaneous exercises, worked examples, or in-text questions.

The textbook-edition and exercise-number census for these 66 units is **not yet independently established**. Total print questions: unknown; chapter verified question count: 0; full exercise coverage: HOLD. These numbers **do not** measure a learner's knowledge or imply none of the original teaching explanations can help.

## Work completed
- `functions/_lib/ncert-exercise.js`: immutable 66-unit ledger, textbook part associations, official NCERT catalogue reference, null (not invented) question counts, unverified edition flags; deterministic coverage calculation accepts a QUALIFIED result only for a reconciled textbook edition and a 1:1 census of fully reviewed question IDs.
- `functions/api/syllabus-coverage.js`: authenticated student record returns per-chapter exercise status and root census.
- `public/syllabus.js`: displays **question census pending** for each unit instead of fabricated percentage.
- `functions/api/ncert-exercise-coach.js`: authenticated, origin-checked, subject- and CBSE-board-scoped optional hint/step-by-step tutor for a learner-typed problem with a learner-reported exercise number. Does not scrape copyrighted pages or save supplied questions to study-progress tables. Uses a bounded daily AI quota, the existing safeguarding policy and response guard. AI provider processes prompts as needed to answer; do not imply zero external processing or independently correct output.
- `public/app.js`: student chapter view presents opt-in problem and reference entry and an explicitly unverified response rendered as plain text.
- `tests/ncert-exercise-coverage.test.mjs` and `tests/ncert-exercise-api.test.mjs`: question census, no-invention conditions, complete-coverage qualification rules, student-only scope, origin checks, wrong-board/wrong-subject rejection, private question handling and safeguarding inherited from Saathi.

## NCERT provenance and redistribution limits
- Official textbook selector: https://ncert.nic.in/textbook.php
- Official ePathshala: https://epathshala.nic.in
- CBSE 2026–27 syllabus index: https://cbseacademic.nic.in/curriculum_2027.html
- NCERT terms prohibit placing copies of textbooks within third-party content packages/software or redistributing textbooks. Do **not** bundle the textbook PDFs, wholesale question banks or substantial copyrighted question text in the repository. The learner can consult a lawfully accessed textbook and type an individual question; Saathi generates its own original explanation. Verify source terms and permissions before mirroring even chapter links.

## Release gates still HOLD
1. Obtain exact school-prescribed textbook titles, language, print year/edition and the specific pages/appendices for each subject. NCERT editions and exercise numbering may change.
2. Enumerate **every** in-text, end-of-chapter, miscellaneous and additional-questions reference in a source-checked question-index table; record whether rationalised editions alter numbering. Do not guess from old solution websites.
3. Add original independently verified solutions per exact question ID (with symbolic/numeric checks, unit and sign checks, diagram dependencies, chemistry reaction balance, biology factual review, and literary evidence/rubric checks).
4. Verify all answers, alternative methods and marking rubrics; ensure teacher review and independently unseen formative assessment. 
5. Confirm the English Elective novel (one of R. K. Narayan's two options), anthology selection, seminar, the three science practicals and Mathematics internal assessment.
6. Validate authenticated mobile/browser experience, safeguarding/consent and an independent D1 restore drill. Keep `commissioningStatus().productionEligible:false` and PR #1 unmerged.

## Evidence
CI test-first RED on PR #16; the subsequent code and route checks pass 216 Node tests and no skipped tests in run #343. Only the post-merge CI run qualifies the final merged head; do not claim a production deploy based on a PR run. PR #15 (proposed response expansion to editorial 424 guided topics) is separate and not treated as merged.
