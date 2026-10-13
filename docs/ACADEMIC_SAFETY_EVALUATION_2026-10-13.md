# Saathi — Academic and Companion Safety Evaluation

**Date:** 2026-10-13 · **Scope:** staging Birthday Edition, general foundation questions only. Not board-examination certification.

## Verified external curriculum references

- CBSE **2026–27** senior secondary curriculum: https://cbseacademic.nic.in/curriculum_2027.html
- NCERT official textbooks index: https://ncert.nic.in/textbook.php

The app's previous URL `curriculum_2026.html` is for the **2025–26** academic year and has been corrected. CBSE mapping applies **only after the learner selects CBSE**. The actual board, school-assigned chapters and textbook editions are not yet confirmed.

## Live Workers AI benchmark, not simulated unit tests

**Model:** `@cf/meta/llama-3.1-8b-instruct-fast`

A fixed set of **32 elementary multiple-choice questions** was evaluated as four batches of eight with four options per item and a single-letter answer requested. Correct options were determined in advance from arithmetic/standard introductory science facts. No real student identity, notes or transcripts were provided to the model.

| Domain | First-pass correct | Incorrect question themes |
|---|---:|---|
| Physics | 4 / 8 | speed calculation, kinetic energy, wavelength, series resistors |
| Mathematics | 4 / 8 | percentages, right-triangle hypotenuse, linear equation, mean |
| Chemistry | 7 / 8 | how cations form |
| Biology | 8 / 8 | none |
| **Total** | **23 / 32 (71.9%)** | nine misses |

This is **not an acceptable basis to certify autonomous tutoring**.

### Individual-question follow-up

Each of the nine missed questions was independently repeated using a one-question prompt requesting a short calculation and an explicit choice. The model answered **9 / 9 correctly** on these follow-ups. These results show a failure mode with multiple-question batching, but do not prove uniform correctness for fresh questions.

### Engineering decisions

1. Tutor and pilot prompts now prioritize **one question/problem at a time**, show intermediate steps and check units.
2. The learner UI explicitly recommends the **Lessons & practice** checked exercise bank for verifiable answers.
3. The foundation lesson bank grades answers deterministically using server-side answer keys. It does not rely on AI correctness.
4. The AI response guard screens clear false claims that Saathi notified adults or emergencies, created reminders, booked appointments, or asked the student to hide dangerous secrets or rely only on the AI.
5. The companion remains clearly AI, not a human best friend, therapist or flight-operation authority.
6. Official syllabus links now point to the appropriate 2026–27 CBSE index, while all foundation lessons retain the **not board-certified** label.

## Child safeguarding evidence and limitations

Additional tests for varied self-harm, abuse, bullying, coercion and educational false positives pass. The response guard is defense-in-depth after model inference; phrase matching **cannot guarantee identification of all harmful outputs or disclosures**. No automatic emergency notification to adults exists or should be claimed. Production child-safety acceptance therefore remains **HOLD**.

## Reproducible next evaluation gates

- At least **30 new, independently checked, one-question-at-a-time** model answers spanning difficulty, language variants, misconceptions and step-by-step scoring.
- Independent examiner/teacher check for the learner's actual board/subjects and school textbooks.
- Human-reviewed child safety and parental consent/retention arrangements.
- Real phone/tablet microphone, drawing, calendar-import and account recovery walkthroughs.
- App-schema level D1 restore drill without touching real student data.

**Do not substitute batch answer scoring, a single successful rerun, or an AI evaluator for expert academic qualification.**
