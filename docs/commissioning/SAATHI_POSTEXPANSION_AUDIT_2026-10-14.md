# Saathi / rocket — Post-expansion academic and release audit
Date: 2026-10-14 (Asia/Kolkata)
Authority: development `feat/saathi-academic-mvp`; production `main` explicitly held.

## Audit result (5P)
Plan: Validate connected GitHub PR states, current development head and passing source CI. Compare the syllabus authority used in PRs #11–#13 with the official CBSE 2026–27 curriculum index.
Prepare: New regression `tests/academic-profile-boundary.test.mjs` failed against the unguarded student lesson access policy (CI #327). Reproduce the issue in both lesson listing and forged direct grading.
Proceed: One shared `lessonAllowedForLearner` policy and `studentLessons` filter now require **CBSE board + explicitly selected matching subject** for all CBSE-2026-27 module and tagged practice content. Unconfigured learners retain general foundation content; ISC/State/Other profiles never receive CBSE-labelled material. Corrupt profile JSON fails closed. The practice endpoint rejects direct calls outside scope. Amend one obsolete legacy integration test to use an actual enrolled CBSE Physics learner; add a direct API regression.
Perform: Source CI #331 ran `npm run check`: **207 passed, 0 failed, 0 skipped**. The RED run had proven the previously unconstrained policy before the fix.
Persist: Merge only to `feat/saathi-academic-mvp` after final head CI; do not merge draft release PR #1 to `main` or deploy to production without documented acceptance.

## Content audit
- `66/66` Class XII mapped main chapter/literary-unit titles, across Physics 14, Chemistry 10, Mathematics 13, Biology 13, English Elective 16.
- `379` authored guided subtopics and `45` supplemental guidance items = **424** original instructional steps. They are editorial teaching and prompted practice, not full published NCERT textbook replacement.
- Existing deterministic checks assert the 66 basic chapter multiple-choice answer keys have internally expected responses. These checks do not amount to independent review of every fact or an unseen board-exam question bank.
- **No validated marking schemes for each of 424 open-ended application prompts**; no school-granted teacher sign-off or measured mastery evidence. These remain explicit qualification gaps.
- Supplementary teaching tracks exist for 4 chemistry formative units, Biology Environmental Issues formative unit, supervised science practical concepts, Maths internal assessment, and English 001 unseen reading, grammar, creative writing, fiction choice and seminar. They do not replace school-supervised work.
- The English Elective R. K. Narayan novel selection is **unconfirmed**; the two novel entries are alternatives, not both compulsory. Verify exact grouped Milton/Blake selections with the school-approved NCERT edition. No new student profile selection is inferred.
- The official 2026–27 curriculum index at https://cbseacademic.nic.in/curriculum_2027.html was available during this audit. An attempted direct official English Elective PDF fetch returned an external 502; do not claim every course PDF and text passage has been newly verified during this audit.

## Gates
| Gate | Evidence | Result |
| --- | --- | --- |
| Software source test on fix | GitHub Actions #331: 207/207 pass | PASS |
| Authenticated course policy unit + route regression | Onboarding, board-specific listing and submit tests | PASS (source CI) |
| Academic unit structure and draft inventory | PRs #11–#13, 66 modules and 424 guided steps | PASS for draft availability |
| Complete NCERT outcomes, derivations and textbook exercises | Not independently proven | HOLD |
| Objective and open-ended question correctness | 66 keyed draft MCQ checks; 424 open-ended rubrics unqualified | HOLD |
| School scope, selected novel, prescribed editions and anthology | Guardian scope only; school choice unrecorded | HOLD |
| Subject-teacher review and practical/internal/seminar exams | No independent signed school evidence | HOLD |
| Authenticated live browser/device, safeguarding and consent/retention | Previously user-attested but not freshly qualified in this source audit | HOLD |
| Live D1 backup/restore, production disaster recovery | First independently verified recovery drill not present | HOLD |
| Source repository privacy | GitHub API reports repo visibility **public**, despite intended private development | ACTION REQUIRED |
| Production | PR #1 remains open draft, not merged | HOLD |

## Release and safeguards
- Maintain fail-closed `commissioningStatus()`, `qualifiedChapters:0`, `examReadiness:'HOLD'`.
- The correction does not touch credentials, D1 data, prior learner progress, Papa welcome, voice or notifications.
- **Repo visibility:** The GitHub-connected API in this session does not expose a repository visibility mutation. An authorised repository administrator must change Settings → General → Danger Zone → Change repository visibility → Private if privately developed child-focused source is intended. Then audit history for accidentally committed secrets and rotate any found credentials; a public repo is not itself evidence of a student-data breach.
- **Next qualifications:** match every official learning outcome to specific licensed textbook section and activity, add independently marked/unseen problems and worked reasoning, resolve teacher review findings, confirm school novel and anthology, validate supervised assessments, independently observe authenticated live journeys and do an isolated D1 restore.
