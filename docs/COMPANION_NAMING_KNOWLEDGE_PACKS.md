# Saathi Personal AI — Choice of Name & Knowledge Packs

**Staging release:** 2026-10-13 · Project: `vyndivybes/rocket` · Saathi Birthday Edition

## Learner chooses the companion name

The site and service can retain the Saathi project brand, but **the student chooses the AI persona name** rather than being forced to call their companion "Saathi".

- The first visit to Mission Control with a learner login opens **Name your AI**.
- The learner may choose a short Unicode name such as Nova, Jarvis, Vimaan, Sky or a name of their own.
- The AI nickname is stored in dedicated `companion_preferences` with student-only reads/writes, linked to the account ID.
- The learner may rename the assistant at any time; exported student data includes the name and student-requested study-data erasure clears it.
- The chosen name appears in Mission Control, chat buttons and the AI system context. The learner can tap **Speak** and say "Hey [name], open my notes" or "Hey [name], what's my plan today?"
- **No always-on microphone/wake word.** Spoken commands work only after the learner actively presses Speak and permits browser microphone access. No arbitrary auto-actions from spoken dialogue.
- The AI remains transparently artificial, cannot secretly observe the student, and cannot replace human companionship or contact others in an emergency.

## Personal assistant and supportive companion — what works

| Activity | Implementation |
|---|---|
| "What is my plan today?" | Reads the learner's own schedule and open study-task counters locally; no model token required |
| "What should I do next?" | Suggests the next local scheduled item or a manageable small step |
| Draft a study idea or explain a concept | Workers AI bounded by study/companion/pilot/art/planner modes; it can be incorrect |
| Organise school, sketching, sport and rest | Editable weekly schedule plus opt-in starter routine |
| Reminders | Open-page browser prompts; optional calendar .ics export must be imported into a phone calendar |
| Notes | Private student-controlled notebook and exports; parent/admin cannot read note bodies |
| Art | On-device sketchpad, retains drawing while navigating in the same page; PNG download |
| Pilot aspiration | Basic science and DGCA pathway references; not live flying instructions |

The app does **not** persist AI conversation transcripts in D1, make claims of proactive awareness, or send unapproved messages. A respectful human-support boundary is explicit.

## Knowledge Packs V1

Eight packs, **24 editorial foundation modules**:

1. **Pilot Exploration** — four forces, Newtonian motion, DGCA pilot study pathways.
2. **Physics Confidence Builder** — mechanics, induction, wave speed.
3. **Mathematics, One Step at a Time** — algebra, derivative power rule, right triangles.
4. **Chemistry Without Guessing** — atoms/ions, moles, electrochemistry.
5. **Biology Through Diagrams** — DNA, transcription, alveoli.
6. **Sketching & Modern Art Studio** — line, shape, observation and expression.
7. **Study Planner & Memory Tools** — active recall, worked problem structure, balancing tasks.
8. **Movement, Rest & Balance** — recreation, short breaks and trusted human relationships.

Each module includes a concept, a simple exercise and a publisher link. Links point to official sources, without reproducing NCERT textbook text or image assets:

- NASA Glenn Beginner’s Guide to Aeronautics: https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/learn-about-aerodynamics/
- DGCA Pariksha flight-crew FAQs: https://pariksha.dgca.gov.in/Form/PLT_FAQs
- NCERT textbook portal: https://ncert.nic.in/textbook.php
- CBSE 2026–27 curriculum (CBSE students only): https://cbseacademic.nic.in/curriculum_2027.html
- National Gallery of Art Elements of Art: https://www.nga.gov/educational-resources/elements-art

### How packs are used

A learner-only `GET /api/knowledge-packs` returns the editorial catalog. The **Knowledge packs** section of Mission Control lets the student browse the pack, select a concept and ask the chosen AI for a focused explanation. When the question matches an existing editorial concept, the tutor receives selected context and the API returns a **related publisher reference**. Such a reference does not establish that the generated explanation has been fact-checked.

Source version: `FOUNDATION_PACKS_2026_10_13_V1`. The modules are not a complete or independently certified school-board curriculum. Actual class, board, school-assigned chapters and examination goals require confirmation before tailoring.

## Acceptance

- CI tests include nickname persistence, separation across student accounts, voice-call stripping, source-domain validation, 24 module structure, student-only API, and grounded model context.
- GitHub Actions **96/96 passed** in run `38399409497` (follow-up source integration test).
- Stage must remain private/supervised; production remains disabled.
- An authenticated real-device walkthrough of student name selection, speech recognition, library links, calendar import and art save still needs human acceptance; do not equate green source tests with real-device commissioning.
