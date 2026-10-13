# Saathi — First family learning session (supervised staging trial)

## Intended use
This is a **small Class 12 foundation pilot** for one family, not an audited board curriculum or production child-safety service. The repository is public but contains no learner access key or personal identifier. Accounts and progress live only in Cloudflare D1 staging.

## Student's first session
1. Visit https://feat-saathi-academic-mvp.saathi-student-ai.pages.dev and sign in with the existing `learner_demo` test account and private access key. Use an ordinary password manager to avoid copying the 64-character key in public places.
2. Open **My subjects**. Choose actual board (or 'Choose later' if uncertain), study stream, relevant subjects, and a manageable 20/30/45/60-minute daily target. No school name or date of birth is collected.
3. Open **Lessons & practice**. Choose a foundational lesson. Read the explanation and worked example; answer the single checked question; review the explanation. Repeat in a second subject.
4. In **Study planner**, add up to two personal study commitments and mark one complete when genuinely finished.
5. **Ask Saathi** only for ordinary academic clarification. Free-tier requests are limited; AI outputs may be wrong. Never input addresses, contact information, passwords or very sensitive details.
6. Parent may sign in separately as `parent_rocket` to view only aggregate study commitments and answer counts. Administrator remains operational only.
7. Consult **Privacy & safety** in the site footer.

## Limits / hold gates
- Eight introductory curated lessons, not a complete board syllabus; school board, subjects and exam targets need validation.
- Live account login has been confirmed previously by user for the earlier build, but updated student onboarding and practice flow need a first-session human browser acceptance.
- Automated tests and Cloudflare build verify role boundaries and functionality with synthetic data.
- A few deterministic safeguarding patterns plus LLM policy are **not** a complete safety system; any immediate danger requires real human help.
- App-owned database does not persist AI transcripts or choice-level practice answers; prompts are sent to Cloudflare Workers AI and subject to that provider's handling.
- No offline-first PWA, persistent notifications, verified textbooks, voice assistant, independent restore drill, or self-service deletion yet.
- **Production remains disabled.** Child-specific production commissioning is NOT approved.

## 5P
Plan: family-first study MVP. Prepare: separate Cloudflare stages. Proceed: student onboarding, lessons, quizzes, planner and private parent aggregates. Perform: automated tests and build + staged manual acceptance. Persist: CI and follow-up accuracy/safeguarding audit before production.
