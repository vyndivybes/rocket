# Saathi CBSE Class XII five-subject reconciliation — 14 October 2026

**Authority:** CBSE academic session 2026–27, official curricula under [Curriculum 2027](https://cbseacademic.nic.in/curriculum_2027.html) and [Class XII official Sample Question Papers and Marking Schemes](https://cbseacademic.nic.in/SQP_CLASSXII_2026-27.html).

**Scope:** Physics (042), Chemistry (043), Mathematics (041), Biology (044), **English Elective (001)**. English Core (301), Applied Mathematics (840) and Biology's separate Biotechnology subject (045) are **not** substituted into this learner's scope.

## Executive determination

- All five subjects have correct CBSE 2026–27 subject codes and the **66 main chapter/literary-work titles** in their primary `SUBJECT_MAP`.
- **Zero** of the 66 has fully teacher-reviewed teaching, validated chapter assessments or exam-readiness evidence. The repository correctly labels each as not qualified.
- Only **eight distinct chapters** have some linked *foundation-only* exercise: Physics 2, Chemistry 2, Mathematics 2, Biology 2, English Elective literature 0. **58** main units/texts have no linked chapter-specific exercise. A Biology chapter has two separate exercises; it is one chapter, not two.
- English Elective includes five general skill-practice lesson identifiers (reading, grammar, writing, poetry and general argument), but **none** completes a prescribed Kaleidoscope text. The school's R. K. Narayan novel choice remains to be confirmed: *A Tiger for Malgudi* **or** *The Financial Expert*.
- Existing `syllabusInventory()` was a stale parallel report that mapped only Physics and incorrectly marked mapped Chemistry/Biology as unmapped. Reconcile its results to the same `academicInventory()` used by authenticated student reporting.
- Record correct marks by assessment category: Physics/Chemistry/Biology 70 theory + 30 practical; Mathematics 80 theory + 20 internal assessment (not laboratory practical); English Elective 80 written + 20 seminar.
- Chemistry has four **formative-only** topics, and Biology has **Environmental Issues** as formative-only; these do not count among the 70-mark summative theory chapters. Retain them as explicitly labelled formative curriculum, not deleted lessons or board-exam chapters.
- A published unit/title inventory and passing short quizzes **must not** be interpreted as qualified teacher content, completed NCERT textbook, a completed lab practical or an exam-readiness certification.

## Subject-by-subject audit matrix

| Subject | CBSE code | Official main units/texts | With foundation link | Without | Qualified | Current syllabus/source status |
|---|---:|---:|---:|---:|---:|---|
| Physics | 042 | 14 chapters | 2 (Current Electricity, Electromagnetic Induction) | 12 | 0 | Main chapter titles mapped; practicals/experiments and release-teaching absent |
| Chemistry | 043 | 10 units | 2 (Solutions, Electrochemistry) | 8 | 0 | Unit titles mapped; four formative-only supplemental topics; laboratory practical evaluation absent |
| Mathematics | 041 | 13 chapters | 2 (Continuity & Differentiability, Probability) | 11 | 0 | Unit titles mapped; 20-mark school internal assessment not independently qualified |
| Biology | 044 | 13 chapters | 2 (Molecular Basis of Inheritance, Evolution) | 11 | 0 | Main chapters mapped; Environmental Issues formative-only; required practicals/record/spotting absent |
| English Elective | 001 | 16 *Kaleidoscope* works | 0 | 16 | 0 | Literature title list mapped, five skills exercises available; selected fiction, 20-mark seminar and text-specific teaching absent |
| **Total** | | **66** | **8** | **58** | **0** | **NOT RELEASE QUALIFIED** |

### Subject-specific mandatory remainder

**Physics (042)** — Full chapter-by-chapter exposition with units and conventions, numerical worked examples, misconceptions, unseen assessments and revisions; current and magnetic/electromagnetic fields, optics, modern physics, semiconductor scope, laboratory experiment/activity records, investigatory project and viva, all reviewed by physics SME. Official: https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Physics_SecP2_2026-27.pdf

**Chemistry (043)** — Cover all ten examinable units including organic/inorganic topics, practice calculations and mechanism/nomenclature, plus the four distinct formative-only topics (*Surface Chemistry*, *General Principles and Processes of Isolation of Elements*, *Polymers*, *Chemistry in Everyday Life*) without treating them as 70-mark theory units. Qualify school-supervised practical guidance, salt analysis, volumetric analysis, content experiments, project, record and viva. No unsupervised hazardous procedures. Official: https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Chemistry_SecP2_2026-27.pdf

**Mathematics (041)** — All 13 chapters including integrals, differential equations, matrices, 3D geometry and linear programming, with complete algebraic workings, independently graded unseen sets, conceptual verification, practical application and **20-mark internal mathematics assessment**, not science-style laboratory practical. Official: https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Maths_SecP2_2026-27.pdf

**Biology (044)** — All 13 chapters in Reproduction, Genetics and Evolution, Human Welfare, Biotechnology and Ecology; verified biological diagrams, terminology and application questions; supplementary formative-only *Environmental Issues*. Qualify spotting, slide preparation, experiments, investigatory project, record and viva under school supervision. Official: https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Biology_SecP2_2026-27.pdf

**English Elective (001)** — Cover each prescribed work with original editorial notes, close reading, character/theme/poetic-device analysis and text-specific questions. Separately qualify unseen reading, applied grammar, creative writing, fiction (school must select R. K. Narayan novel), and the internal seminar with rubric and teacher review. **Do not substitute English Core (301) textbooks or marking scheme.** Official: https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/English_elective_SecP2_2026-27.pdf

## Implementation and regression controls

- `functions/_lib/syllabus-catalog.js`: one authoritative source for `syllabusInventory` and `academicInventory`. Expose truthful `foundationChapterCount`, `unmappedChapterCount`, `assessmentStructure`, `assessmentStatus`. Preserve `qualifiedChapters:0` and `examReadiness:'HOLD'`.
- `public/syllabus.js`: clearly display subject-specific 70/30 or 80/20 marks, distinguish school Maths internal assessment from science laboratory practical, label Chemistry/Biology formative-only topics as non-summative.
- `tests/academic-five-subject-reconciliation.test.mjs`: verify all five codes, 66 titles, eight foundation-linked units, 58 absent links, official marks structure and unchanged HOLDs.
- `tests/syllabus-coverage.test.mjs`: update obsolete assertion that mapped Chemistry/Biology chapters remain unmapped.
- No credentials, personal student data, student progress, live D1 schema, student account or release permission modified.

## Academic commissioning exit criteria (still OPEN)

1. **Authoritative school scope:** verify CBSE subject enrolment and prescribed 2026–27 editions; confirm English Elective fiction choice. Record source revision/access dates.
2. **Teaching qualification:** all 66 main units/texts, plus required formative subject matter and English skill components, have accessible content, worked examples, source tracing, misconception handling, unseen tests and revision with no unresolved critical factual errors.
3. **Practical/internal/summative qualification:** lab activities only as guided by a teacher, physics/chemistry/biology practical review, maths internal assessment, English oral seminar and fiction, approved rubrics and exam-pattern sample tests.
4. **Independent signoff:** subject-matter reviewers for each of the five subjects approve representative question accuracy and every released unit; retain review timestamps, defects and closed CAPAs.
5. **Learner outcomes separate from software outcomes:** no automatic certification from short quizzes or question attempts. Learner readiness needs independently designed unseen tests and reasonable review.
6. **Safeguarding/recovery/privacy remain separate release gates.** Complete these after academic reconciliation; never force `commissioningStatus().productionEligible` to true.

**Disposition:** `OUTLINE_RECONCILED`, `FOUNDATION_LINKS_8_OF_66`, `QUALIFIED_CHAPTERS_0_OF_66`, `ACADEMIC_HOLD`, `PRODUCTION_HOLD`. Only source mappings and reporting are corrected; substantive chapter teaching requires authoring and qualified human review.
