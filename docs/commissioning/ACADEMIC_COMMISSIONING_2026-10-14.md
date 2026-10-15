# Saathi academic commissioning — 14 October 2026 IST

Overall **HOLD**. This increment is a restricted-preview assurance change, not completed academic commissioning.

Baseline: PR #3, `2e9142eaa211e7c4f50773441fb467f3c1468e46`, merged into `feat/saathi-academic-mvp`. Main contains only the initial release-hold README. No promotion to main or production is authorized while mandatory gates remain held.

## Evidence and acceptance

| Gate | Result | Fresh evidence / blocker |
|---|---|---|
| Baseline provenance | PASS | Git history and GitHub PR #3 agree |
| Saved learner choices | PASS, selection only | Read-only preview D1 query observed CBSE / Science / five selected subjects; no school verification inferred |
| Actual school board and subject codes | HOLD | School confirmation absent; English does not distinguish Core 301 and Elective 001 |
| Official outline mapping | PASS, limited | Physics 14, Chemistry 10, Mathematics 13, Biology 13 outlines checked against official linked PDFs; this is not teaching coverage |
| Complete chapter teaching and worked examples | HOLD | Existing bank contains foundation exercises only; complete chapter content and difficulty coverage remain absent |
| Deterministic practice and revision analytics | PASS, local | Existing answer-key grading; new chapter aggregate view and revision needs; 100 repeated correct responses do not qualify a chapter |
| Practical assessment and exam readiness | HOLD | No teacher-reviewed practical records, fresh mixed-format assessment or rubric acceptance |
| Safeguarding / consent / retention | HOLD | Human review and consent arrangements not established; regex tests cannot establish child safety |
| Production restriction | PASS, local and platform configuration | Production API fails closed; Pages production deployments observed disabled; production D1 had no learners |
| Authenticated journeys / isolation | PASS, local; HOLD live | Real login handler with synthetic SQLite fixture exercises learner, guardian, second learner and failed records. Browser preview opens sign-in; no authenticated live session available |
| Responsive UI | HOLD | Changed syllabus UI not accepted on authenticated desktop/tablet/phone |
| Recovery | HOLD live | Existing synthetic SQLite restore test passes; live isolated D1 restore acceptance outstanding |
| Data / Papa welcome | PASS, source preservation | No migrations or record writes in this increment; Papa welcome files unchanged and welcome regression tests pass |
| Security | PASS focused; HOLD full commissioning | No origin/authentication relaxation; role isolation and fail-closed environment tests pass; full live audit remains outstanding |

## Official sources inspected

https://cbseacademic.nic.in/curriculum_2027.html

- Physics 042: `web_material/CurriculumMain27/SecPart2/Physics_SecP2_2026-27.pdf`, XII section pages 12–16.
- Chemistry 043: `web_material/CurriculumMain27/SecPart2/Chemistry_SecP2_2026-27.pdf`, XII section pages 8–9; formative additions retained separately.
- Mathematics 041: `web_material/CurriculumMain27/SecPart2/Maths_SecP2_2026-27.pdf`, XII section pages 7–9. No chapter-wise marks are inferred.
- Biology 044: `web_material/CurriculumMain27/SecPart2/Biology_SecP2_2026-27.pdf`, XII section pages 9–11; Environmental Issues formative addition retained separately.
- English Core reference inspected, but not assigned to learner: `web_material/CurriculumMain27/SecPart2/English_core_SecP2_2026-27.pdf`.

Some PDF headers retain 2025–26 wording even though linked from the current 2026–27 index and containing current XII sections. Resolve edition ambiguities with the school before academic acceptance. Sample-paper link publication and question-paper content were not verified in this increment.

## Changes and validation

- Removed fallback subject invention and database-read error suppression.
- Non-CBSE profiles receive no applicable CBSE chapter inventory.
- English ambiguity is explicit rather than silently selecting English Core.
- Learner-only chapter analytics use existing aggregate practice records. Empty attempts show no accuracy; repeated questions cannot become mastery evidence.
- Added immutable mandatory HOLD inventory and production API block. Client claims and environment variables cannot bypass it. Future release requires a reviewed code change backed by real evidence.
- Existing records and Papa welcome preserved. No live learner credentials were read, created or changed.
- `npm run check`: baseline 156/156; final 163/163, zero failed/skipped. Syntax checks and `git diff --check` pass.

## Required closure work

1. Obtain school-confirmed board, subject codes, prescribed texts and current academic year. Confirm English Core/Elective; do not infer from Science stream.
2. Complete topic-level teaching, independent worked examples and fresh deterministic assessments for every applicable chapter, plus formative topics. Teacher/examiner review each answer key, scope and rubric.
3. Implement supervised practical preparation and records with teacher acceptance; never substitute virtual practice for real lab completion.
4. Complete human safeguarding review, consent/retention policy, abuse escalation and limitation acceptance.
5. Validate authenticated learner/guardian/admin journeys on desktop/tablet/phone without changing real data; run isolated live D1 restore and operational review.
6. Keep production disabled until all mandatory gates pass. Do not fabricate guardian alerts, school verification, assessment scores or reviewer signatures.
