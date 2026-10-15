# Saathi Birthday Edition — First Family Session

## Purpose and boundary

This is a **supervised family staging trial**, not a production-certified educational or mental-health service. Saathi is an AI study teacher, personal organiser, creative assistant and supportive companion. It is not human, a replacement for real relationships, or able to contact emergency services.

**Staging:** https://feat-saathi-academic-mvp.saathi-student-ai.pages.dev

## A calm, 20–30 minute introduction

1. Open the staging page. Sign in as `learner_demo` with the **private test access key** supplied outside GitHub. Do not publish or screenshot the key.
2. Select **My subjects** to set the real board and subjects. Physics, Mathematics, Chemistry and Biology are suggested as editable defaults, but they are not assumed to be the student's official exam combination.
3. Open **Mission Control** from the learner dashboard. The **daily briefing** should show the current device-local day, available activities and unfinished study tasks without exposing notes.
4. Select **Scheduler → Preview balanced starter week**. Discuss what feels realistic for school, arts, sport and rest. Choose **Add these activities** only with the learner's agreement. Edit the times or delete unwanted items.
5. Optionally **Export reminders to my phone calendar**. Import the downloaded `.ics` into the student's preferred phone calendar and verify notifications there. Saathi itself cannot send guaranteed reminders after closing.
6. Open **Notes**, save a simple non-sensitive sketch idea, then reopen it. Private note contents must not appear in parent/admin views.
7. Open **Art studio**, draw a small sketch, switch to **Pilot academy** and return to Art studio. The sketch should remain within the same page session; use **Save PNG** to preserve it across reloads.
8. In **Talk to Saathi**, try **Patient teacher** (e.g. why an airplane needs lift and what force equals mass × acceleration), **Pilot mentor** and **Art mentor**. Check factual answers. Click **Speak** to try optional browser voice input; it is not always-listening.
9. Try **Lessons & practice** in two subjects. The learner should be able to attempt questions and review graded explanations. The parent can later view aggregate progress through `parent_rocket`, not private notes or messages.
10. Open **Privacy & safety**. The learner should understand what is stored, what is transmitted to Workers AI, and where to get real human help if needed.

## What we must not claim

- Not a complete or certified Class 12 textbook syllabus. Confirm prescribed board and chapters with school materials.
- Not a qualified safety-monitoring service. The protective rules cover common explicit risk language but cannot guarantee detection; no alerts are dispatched to parents, teachers or emergency responders.
- AI outputs can be wrong. A small eight-item general-science spot check passed, but broad academic/hallucination evaluation remains open.
- Notes, schedules, preferences and tasks are persisted in Saathi D1. Tutoring chat transcripts and selected quiz answers are not saved in the application database. Provider handling for AI input is separate.
- Browser notifications check only while the Mission Control page is open. Phone calendar reminders must be imported and controlled by the learner's device.
- The exported PNG remains on-device. Unsaved art is retained in page memory only.
- The repository is public, but credentials and student personal information must stay out of it.
- Production deployments are **disabled** until separate child privacy, school curriculum, device login and real application recovery gates pass.

## Independent evidence

- GitHub Actions: 71/71 tests PASS at `bc0db7ea698a37d4da5a871f92d0fb5af5f1b892`; tests include safeguarding, parent scope and daily briefing.
- Cloudflare Pages staging of this build: SUCCESS.
- Disposable Cloudflare D1 Time Travel synthetic recovery drill: restored from a bookmark and verified, then the disposable database was deleted.
- Human sign-in acceptance on the older learner/parent/admin pages is recorded. **The expanded Mission Control flow still needs its first authenticated real-device walkthrough.**

No family private access keys or personal student details should be added to this repository.
