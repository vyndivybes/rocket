# Saathi Birthday Edition — 5P Acceptance Ledger
Updated 2026-10-13 (Asia/Kolkata)

## Release decision
**FAMILY STAGING TRIAL PREPARED — PRODUCTION AND INDEPENDENT MINOR-SAFETY CERTIFICATION HOLD.**

The source repository `vyndivybes/rocket` is **public**, per owner choice; no real student identifying records, plaintext passwords or API tokens belong in GitHub. Development PR #1 on `feat/saathi-academic-mvp` remains a draft. Preview URL: https://feat-saathi-academic-mvp.saathi-student-ai.pages.dev

## Plan
One independent student-oriented assistant with four roles: patient teacher, personal organiser, assistant and bounded companion. Support aspiring-pilot curiosity, drawing/painting/modern art, all four science subjects and healthy physical activity. Avoid AI-human dependency and unverified operational claims.

## Prepare
Cloudflare Pages/Functions, Workers AI, dedicated D1 and GitHub. Preview uses `saathi-staging` D1 (`environment_guard=preview`), production uses `saathi-private` D1 (`environment_guard=production`). API middleware rejects mismatched environments. No VAOS/VYNDI resource reuse. Student, parent and admin identities have separate permissions.

## Proceed — implemented on staging
- Foundation lessons and checked practice in Physics, Maths, Chemistry and Biology; student board/stream/subject setup; study-task planner.
- Mission Control: aviation inspiration, on-device drawing canvas, 5 AI modes, click-to-activate microphone input, speech synthesis and safe limited voice navigation (no always-on listening).
- Student-only notes and week scheduler in D1; optional starter schedule with short schoolwork, aviation, art, sport, walking and rest blocks; editing, opt-in installation, duplicate guard.
- In-page reminder check only while Mission Control is open; optional downloaded repeating `.ics` file for phone-calendar-managed alerts. No backend push/SMS/emergency alerts.
- Student data export and erase-learning-data endpoint; app does not claim to erase provider backups or account credentials.
- Privacy notice describes transmitted AI questions, notes and provider-held data; parent only aggregate progress and admin only operational counts.
- Drawing persists only during the currently open page (in memory across tabs); local PNG download; no artwork uploads.
- A home-screen web-app manifest and icon.

## 13 October continuation — Safety, daily briefing and recovery
- Expanded deterministic teen-safeguarding first-response coverage (self-harm language, bullying, unsafe-home disclosures and coercive image requests). Ordinary educational questions have explicit false-positive tests. This remains **partial safeguarding**, not human-reviewed or a complete classifier.
- Added local-device **Daily Mission Briefing**: today's enabled schedule, next activity, unfinished tasks and deadline counts; no notes, chat transcripts or AI inference used to prepare the briefing.
- Independent live Workers AI spot check: eight general curriculum foundation questions, all answered correctly across **two** model requests. The first multi-question response exhausted its output budget after question 6, so the final two questions were retested separately. This spot check is **not** a 30+ item broad accuracy/child-safety benchmark or a guarantee of personalised tutoring accuracy.
- Verified real Cloudflare D1 Time Travel on a **disposable synthetic** database `saathi-recovery-drill-20261013` (UUID `1d1d6cbb-0aff-427f-ae9f-9d334d5ab5e6`). Inserted `before-change`, captured bookmark, changed record to `after-change`, POST restored to bookmark, queried `before-change` again, then deleted database. Restoring completed with success. No Saathi production/staging D1 data was changed by this drill.
- GitHub Actions run `38392090625`: **71/71 tests passed**. Cloudflare Pages staging deployment `6c84cca6-b171-41d5-83c7-18070cd42bc9` of commit `bc0db7ea698a37d4da5a871f92d0fb5af5f1b892`: SUCCESS. These are development gates, not permission to activate production.
- Existing staging retains one synthetic learner, linked parent and admin; production still has zero accounts and production deployments remain disabled.

## Perform — verified
- GitHub Actions run 38348185847: `npm run check`, **51 tests / 51 passed**, including login/roles, note privacy, student-only deletion, starter-week consent/duplicate prevention, schedule editing, calendar formatting, bounded AI modes and in-memory sketch-state.
- Cloudflare Pages preview deployment `303f002d-9a00-44d4-a746-7b33c566258f`, commit `ac9c45d04e8b6120522d8a6a151329e38216e16d`: **deployment SUCCESS**, independent Cloudflare build logs show `npm run check` with **51/51 passed** and Functions Worker compiled.
- Anonymous live preview opened the Mission Control student-only sign-in boundary; `/api/me` yielded 401 without a session; `/api/health` reported DB and AI bindings present.
- D1 staging contains 1 test student, 1 linked parent and 1 admin; zero real student profiles, notes or scheduled activities at verification. Production contains zero accounts and no study records. Cloudflare production deployments remain **disabled**.
- In earlier human testing, the owner verified all three account sign-ins and prior learner material and parent progress views. **New Mission Control interactive sign-in, drawing, voice, reminder import and full on-device journeys have NOT yet been independently user-verified.**

## Persist — implemented controls
- Draft PR review boundary, source tests on push/PR, Cloudflare preview tests before deploy, deployment branch scope and production-off setting.
- Environment guard and separate staging/production databases. A **synthetic SQLite snapshot/export→restore regression test** passed with student data integrity and row ownership preserved. This is not a live Cloudflare D1 disaster recovery acceptance.
- Privacy-safe student-owned export and erase functionality; no automatically shared notes or conversation histories.

## Remaining non-negotiable commissioning gates
1. Human/device E2E walkthrough of *updated* learner workflows (voice and Notifications API depend on supported browsers).
2. Correct school board/stream/current textbook content mapping and independent review of **30+ real academic answers** (LLM can make mistakes; the curated foundation bank is *not* a certified syllabus).
3. Qualified child-safeguarding and family privacy/consent/retention policy, including emergency escalation alternatives; prompt patterns alone are not sufficient.
4. Secure everyday credential rotation, account deletion/recovery and realistic device management for a minor.
5. **Partially satisfied:** live D1 Time Travel restore on synthetic disposable data PASSED. Actual Saathi-schema backup/restore, backup retention evaluation, and application-level recovery/rollback rehearsals remain open.
6. Actual usage/billing review within Cloudflare/GitHub free-tier allowances; no paid integration authorized.

No change to production or real student accounts is authorized by this staging acceptance.
