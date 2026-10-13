# Saathi CBSE 2026–27 foundational question-bank increment — 14 October 2026

## Purpose and scope
This **restricted-preview** change adds independent practice items and a deterministic revision recommendation to the eight pre-existing CBSE-aligned foundation lessons:
- English Elective (001): reading inference, applied grammar, discursive writing, poetry interpretation
- Physics (042): Current Electricity — Ohm's law
- Chemistry (043): Solutions — molarity
- Mathematics (041): Probability — conditional probability
- Biology (044): Evolution — natural selection

Each lesson now has one existing and three additional originally authored multiple-choice questions, for **32 total questions across eight lesson topics** (24 newly authored). The bank is authored for teaching support, not extracted from CBSE/NCERT copyrighted books, not a complete chapter syllabus and not independently teacher-reviewed.

## Architecture and data handling
- Grading stays on the server and accepts only enumerated stable question IDs: `base`, `v2`, `v3`, `v4`.
- Student-facing lesson API sends prompts, IDs and options; no answer keys or advance explanations.
- Existing `practice_progress` table keeps **only counts**, using `lessonId` for original question and `lessonId::variant` for alternatives. No new migration, personal transcripts or stored response text.
- A signed-in student is isolated from other learners; when a learner has a saved subject profile, grading disallows lessons outside the chosen subjects. Unconfigured learners retain existing general practice access.
- The student workspace permits explicit question selection and displays a deterministic next-question suggestion. The syllabus dashboard includes validated per-variant aggregates.
- A perfect score on repeatedly answered questions does **not** certify chapter mastery. Even after all four items are attempted, another independent assessment remains necessary.

## TDD / 5P evidence
- RED: test-first commit `f0203004b40a50b46d239cc23c3aeea533f054da`, [CI #259](https://github.com/vyndivybes/rocket/actions/runs/38462137410) intentionally failed before implementation.
- Debug: [CI #265](https://github.com/vyndivybes/rocket/actions/runs/38462636460) failed one test comparing a Node SQLite null-prototype row to a plain object; the test now normalizes that row before comparison.
- GREEN: [CI #269](https://github.com/vyndivybes/rocket/actions/runs/38462875717) reported `npm run check` **180 passed, 0 failed, 0 skipped**, including new source syntax checks and the full suite.
- Security and UI acceptance verified in synthetic tests, not independently on a signed-in live deployment.
- All existing Papa greeting content, authentication boundaries, release middleware and production restrictions remain unchanged.

## Unresolved qualifications and release gate
- **Academic HOLD:** these exercises cover small skills/topics only; complete chapter-wise teaching, official 2026–27 scope review, new mixed-format questions, teacher answer-key review and real exam/practical records are still outstanding.
- **School HOLD:** school-confirmed board/subjects and English Elective fiction selection not established.
- **Safeguarding HOLD:** human minor-user consent/privacy/retention, abuse escalation and teacher/guardian signoff not established.
- **Operational HOLD:** live authenticated desktop/tablet/mobile, notification operations and isolated live D1 restore remain unverified.
- Do not merge PR #1 to `main` or enable production deployments until mandatory commissioning gates independently pass. No synthetic testing grants release approval.
