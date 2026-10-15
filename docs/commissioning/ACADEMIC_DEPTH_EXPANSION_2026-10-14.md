# Saathi academic depth expansion — 14 October 2026
## 5P execution
**Plan:** Reconcile against the project source-of-truth CBSE XII 2026–27 five-subject catalogue and official [CBSE Curriculum 2026–27](https://cbseacademic.nic.in/curriculum_2027.html) and [Class XII sample papers / schemes](https://cbseacademic.nic.in/SQP_CLASSXII_2026-27.html). No unseen student data, school choice or live production controls altered.

**Prepare:** Tests first in `tests/expanded-syllabus-depth.test.mjs` and `tests/extra-coursework.test.mjs`, including full 66-title mapping, substantive original guidance and open-ended exercises, protected answer keys and conserved release HOLD. Their initial CI runs were RED before implementation.

**Proceed:** 379 original authored guided subtopics attached one-to-one to the 66 preexisting chapter/work modules: Physics **80**; Chemistry **61**; Mathematics **77**; Biology **81**; English Elective **80**. Each guided step has an original subject-specific explanation and actionable application prompt. Saathi student lesson view renders them in topic order using escaped output and expandable prompts. Authentication and student subject filtering remain as before.

Also added 15 supplementary programme tracks with 45 subtopics, differentiated rather than incorrectly counted as the 66 main chapters:
- Chemistry formative-only: Surface Chemistry; General Principles and Processes of Isolation of Elements; Polymers; Chemistry in Everyday Life
- Biology formative-only: Environmental Issues
- Physics, Chemistry, Biology: one supervised-practical learning strand each (not a completed experiment)
- Mathematics: one school internal-assessment strand
- English Elective: two optional fiction strands **A Tiger for Malgudi / The Financial Expert**; required school decision remains OPEN
- English Elective: unseen reading, applied grammar, creative writing, and the internal 20-mark seminar

**Perform:** `npm run check` CI on PR #13 checks Node syntax and full test suite. Preserve `qualifiedChapters: 0`, chapter `reviewStatus:'teacher_review_required'`, `examReadiness:'HOLD'`, student-only lessons and `commissioningStatus()` production boundary. Test-first RED and later CI pass are GitHub evidence; post-merge check separately required.

**Persist:** Target only `feat/saathi-academic-mvp`, not `main`. PR #1 remains OPEN/HOLD. No production release, database migration, secrets write, media scraping, user progress mutation or changes to Papa greeting.

## Precise evidence interpretation
- **PASS:** All 66 main unit identifiers have authored guided subtopic content and original application prompts, plus the 15 required supplemental teaching tracks. This is broad **editorial pathway availability**, not a measured mastery score.
- **PASS:** Structural title-to-syllabus correspondence and subtopic minimum-depth checks; base multiple-choice answer keys remain server-side and were separately checked in PR #12.
- **HOLD:** It is **not accurate** to assert an exhaustive teacher-verified NCERT textbook substitute. The current expanded pathways are concise notes, **not all prescribed derivations, every NCERT in-text and exercise question, independently validated unseen paper sets or every laboratory demonstration**. The open-ended new prompts do not yet have teacher-marked answer rubrics, and literary work analysis is not a quotation-by-quotation substitute for the legally obtained book.
- **HOLD:** School-selected R. K. Narayan novel, exact prescribed poems in grouped Milton/Blake anthology headings, student edition/page references, five subject-matter signoffs, supervised practical and viva evidence, school Maths internal assessment, English seminar, accessibility/security/guardian-safeguarding acceptance and independent D1 restore.

## Qualification rule
Source catalogue mapped 66/66 and editorial pathways available 66/66; **subject-certified chapters still 0/66**. Do not call `commissioningStatus().productionEligible` true or label this exhaustive academically qualified teaching until subtopic-to-official-edition traceability, subject-qualified review, factual defect resolution, adequate worked examples for every learning outcome, independent question-bank rubrics, practical/internal checks and safeguarding/recovery evidence close. Do not use learner scores on fixed questions as proof of mastery.

## Source provenance
- https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Physics_SecP2_2026-27.pdf
- https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Chemistry_SecP2_2026-27.pdf
- https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Maths_SecP2_2026-27.pdf
- https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Biology_SecP2_2026-27.pdf
- https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/English_elective_SecP2_2026-27.pdf
