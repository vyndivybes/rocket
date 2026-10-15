# Saathi — parent-supervised guided learner pilot
Date: 2026-10-14. Target: `feat/saathi-academic-mvp` development branch.
**This is not a Class XII academic commissioning certificate, not an unrestricted child product release, and not a completed NCERT answer bank.**

## Actual student experience
1. Student signs in and confirms CBSE board and selected subjects. **My Day** shows saved D1 tasks, their status, link to existing Mission Control weekly study, sports, art and rest schedule, and a next-revision suggestion when there is graded practice history.
2. Student opens **Ask Saathi → Guided study session**, chooses a course chapter from their selected-subject lesson list, and types a question from their own textbook. Student-only `/api/guided-tutor` produces three sections: **Explanation**, **Worked example**, and **Try this**. The model must not provide the answer to its own new practice question immediately.
3. Student attempts the independent question and chooses **Check my reasoning**. The tutor returns descriptive, uncertain-when-necessary feedback, not a numerical or official exam grade.
4. Student opens **checked chapter practice**. The existing deterministic server-side MCQ grade saves **attempts and number correct only** in scoped D1 `practice_progress`. Model feedback is **not** written to the grade ledger and does not establish academic correctness.
5. My Day uses saved practice counts to choose a subject-scoped revision suggestion. **Parent summary** continues showing aggregates only: assigned/completed tasks and number of checked practice responses, with no chat text, study notes or personal memories.

## Constraints preserved
- Learner and parent roles separated. Guided tutor refuses parent/admin access, missing profiles, wrong board, and lessons outside selected CBSE subjects.
- POST requests require same-origin, bounded typed text, guarded response, crisis routing and per-student daily AI quota. No database schema change, new service, new paid subscription, or production Cloudflare deploy.
- Questions, model explanations and learner free-text answers are kept within the short-lived request and browser page, **not inserted into Saathi D1**; Workers AI receives the submitted text to generate feedback.
- Student privacy and age-appropriate language take priority over a 'friend that replaces humans' experience. System never claims to notify adults.
- Existing Papa message, login roles, data and deployment stay unchanged.
- A direct link to the previously implemented weekly activity schedule is available from My Day. Background reminders and push subscriptions should **not** be presumed commissioned from enabling settings alone.

## Evidence and honest limitations
- Tests cover input validation and abuse cases, prompt/data boundary, HTML escaping, practice prompt extraction, tutor endpoint authorization/privacy controls, deterministic revision recommendation, and existing curriculum/regression tests.
- This is a developer-branch pilot. The connected GitHub CI can establish compilation and covered software behaviour but not live authenticated browser acceptance, external push delivery, a live database migration/recovery drill or third-party school academic correctness.
- The NCERT answer bank remains editorially incomplete and uncertified. Source and examination verification HOLD is independent of whether the new coaching workflow helps a learner practise.

**Release decision:** Keep production PR #1 as DRAFT and unmerged until mandatory live safeguarding and recovery checks are genuinely met. The implementer should not mark the deployment PASS without an observed deployment ID and authenticated pilot session.
