# Saathi NCERT 2026–27 exercise coverage — Rev 4
**Date:** 2026-10-14. **Authority:** development `feat/saathi-academic-mvp`; **production:** HOLD.

## Verified execution increment (PR #20)
- Reconciled the individual Mathematics Part I Chapter 1 exercise prompts in official 2026–27 NCERT `lemh101.pdf`: Exercise 1.1 (16 parent questions), Exercise 1.2 (12), and Miscellaneous (7). Added **28 original worked-response drafts** covering every formerly missing parent ID and the distinct subpart logic in Exercises 1.1/1 and 1.2/2.
- Reconciled the five unsolved Electrochemistry 2.4, 2.5, 2.6, 2.10, 2.17 parent questions against 2026–27 NCERT `lech102.pdf`. Added **five original worked-response drafts**, with Nernst quotients, standard Gibbs/equilibrium relations, conductivity series and redox direction checks.
- CI re-evaluated the Nernst and conductivity figures. A regression-test defect using Cu²⁺/Cu (+0.34 V) instead of Cd²⁺/Cd (−0.40 V) for the Cr/Cd cell was identified and corrected.
- Each source-indexed chapter now has an official NCERT PDF link alongside its worked examples in the authenticated chapter view. The learner is directed to read the actual textbook question. The application does not bundle copyrighted original questions.
- All new and existing worked examples remain `ORIGINAL_EDITORIAL_DRAFT` and `certified:false`; no unearned competency or marking-scheme signoff was recorded.

## Checked reference census and outstanding indexed answers

| Subject/chapter | NCERT official source | Indexed parent questions | Original worked drafts | Missing parent drafts |
|---|---|---:|---:|---:|
| Physics 1 — Electric Charges and Fields | https://ncert.nic.in/textbook/pdf/leph101.pdf | 23 | 23 | 0 |
| Physics 2 — Electrostatic Potential and Capacitance | https://ncert.nic.in/textbook/pdf/leph102.pdf | 11 | 11 | 0 |
| Chemistry 1 — Solutions | https://ncert.nic.in/textbook/pdf/lech101.pdf | 33 | 22 | 11 |
| Chemistry 2 — Electrochemistry | https://ncert.nic.in/textbook/pdf/lech102.pdf | 18 | 18 | 0 |
| Mathematics 1 — Relations and Functions | https://ncert.nic.in/textbook/pdf/lemh101.pdf | 35 | 35 | 0 |
| Mathematics 2 — Inverse Trigonometric Functions | https://ncert.nic.in/textbook/pdf/lemh102.pdf | 43 | 14 | 29 |
| Biology 7 — Human Health and Disease | https://ncert.nic.in/textbook/pdf/lebo107.pdf | 17 | 17 | 0 |
| **Total of seven indexed chapters** | | **180** | **140** | **40** |

**Exactly known draft gaps:** Chemistry Chapter 1: 1.15, 1.19, 1.21, 1.23–1.26, 1.29 and 1.31–1.33 (11); Mathematics Chapter 2: all 15 parent questions in Exercise 2.2 and all 14 miscellaneous questions (29). The `questionBankProgress()` function verifies those IDs and returns per-chapter missing records.

**Further unindexed units:** 43 science/mathematics chapters (Physics 12, Chemistry 8, Mathematics 11, Biology 12) and 16 English Elective literary works/assessment modules. The *complete* Class XII question count cannot be calculated until the remaining official edition/exercise and individually lettered subpart census is reconciled.

**Important distinction:** Source-backed printed parent identifiers are not the same as every individual subpart. `35/35` in Mathematics Ch1 means all **parent** question IDs have editorial draft entries; the subparts, variant methods and academic marking must still be inspected question by question. Neither `140/180` nor `7/66` is the complete curriculum coverage percentage. **No overall coverage percentage is claimed; subject-qualified questions remain 0**.

## English Elective 001 — 2026–27 assessment
Official CBSE English Elective curriculum: https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/English_elective_SecP2_2026-27.pdf
Official 2026–27 Class XII sample question papers and marking schemes: https://cbseacademic.nic.in/SQP_CLASSXII_2026-27.html

Theory 80 marks: Reading 20; Applied Grammar 8; Creative Writing 20; prescribed Kaleidoscope Textbook 22; chosen Novel 10. Internally supervised Seminar 20. The school must select **one** R. K. Narayan novel: `A Tiger for Malgudi` **or** `The Financial Expert`. Teacher-marked unseen passages, full model answers, textual evidence checks, exact chosen novel, Blake/Milton selected texts and live seminar still require qualification. They are not counted as NCERT printed science/mathematics exercises.

## Academic and software acceptance
- **Code and structural tests:** PASS in GitHub CI when linked to a successful PR/merge execution (not a substitute for complete academic validation).
- **Official printed question indexing:** PARTIAL (7 of 66 mapped curriculum units; English assessment not analogous to printed numbered exercises).
- **Original worked-response draft authoring:** PARTIAL (140 of 180 known indexed parent IDs; 40 missing in those indexed chapters).
- **Independent academic correctness signoff:** HOLD; zero items marked `certified:true`.
- **Child-safeguarding live acceptance, backup/restore, production release:** HOLD, unaffected.
- **Production PR #1:** remains draft and unmerged.

## Next required source-bound tasks, without inventing readiness
(1) Enumerate *all* remaining official 2026–27 printed exercise and in-text references and each subpart; (2) finish the 40 identified missing parent entries and then every newly reconciled question with original explanation, calculations and diagrams as relevant; (3) check each source question and marking requirement independently, keeping error corrections under test; (4) complete English Elective passage, composition, novel and teacher-marked seminar evidence.

This audit explicitly reports the gap. It does not misrepresent generated prose or unit tests as full textbook content or academic certification.
