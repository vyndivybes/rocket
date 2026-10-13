# Saathi Birthday Edition — Personal Memory 5P Acceptance

**Scope:** Consent-based long-term memory for a minor learner. No production cutover authorized.

## Plan
Allow the learner to deliberately save **goals**, **learning preferences**, **interests** and **study preferences** so their chosen AI can help consistently after a logout, browser restart or new device login. Do not silently turn private conversations into long-term records. The AI remains a tool and does not become a human friend or wellbeing monitor.

## Prepare
- Dedicated table `personal_memories` in Saathi's private Cloudflare D1 database, migration `0007_personal_memory.sql`.
- Student-owned records, minimum 10/maximum 240 characters per entry; cap **30** entries.
- Categories: `goal`, `learning`, `preference`, `interest`.
- Each memory has a separate `use_in_chat` consent setting, default **false**.
- No parent/admin memory-read API; no cross-student edits/deletes; origins checked for writes.

## Proceed
- **Mission Control → AI memory:** view, create, edit, explicitly enable/disable AI recall and delete each fact. A conversation question can be **copied into the review form** by pressing **Save a memory from my question**; it is never saved by that button alone. Save requires the learner's separate confirmation.
- The learner can ask **“What do you remember about me?”**; the browser returns only memories explicitly enabled for AI recall without consuming model quota.
- On ordinary AI requests, only **up to eight** recently updated, enabled memories are retrieved from D1 and included as **untrusted factual context** alongside the existing safety instructions. Disabled memories are not sent to Workers AI.
- Secrets, contact details, sensitive harm disclosures, markup and obvious prompt overrides are rejected at save time. This is a protective screen, **not** comprehensive sensitive-data detection.
- Students can include their memories in **My data → Export**, or delete all through **Erase saved learning data**. Individual memory delete is supported.
- The model-response safety guard blocks unsupported claims such as “I saved that to memory” when no write actually occurred.
- Privacy page discloses which facts are stored, which are shared with Cloudflare Workers AI, and the provider-backup deletion limitation.

## Perform
- GitHub CI tests validate authenticated ownership; memory opt-in default false; selective model recall; denied cross-account, parent and CSRF writes; no silent chat-save; input restrictions; export/erase; deterministic local recall; and model-response honesty.
- Passing code test run: **105 / 105** tests; run **38402309024**.
- Staging migration applied with `environment_guard=preview`. Verified table exists and starts with **zero** memory rows.
- **Await independent device acceptance:** learner selects a goal, tests recall after new session, disables it and confirms it disappears; checks student-only access.
- The Cloudflare preview production/deploy state must be checked separately against the latest commit before claiming deployed.

## Persist
- Stage only; production deployments remain disabled.
- No real learner's notes, personal preferences, DOB or contact details copied into repository.
- Do not enable automatic memory extraction or self-running actions without a new separately reviewed consent/safety design.

## Example first session
1. Learner logs in to staging, chooses own AI name if not set.
2. Opens **AI memory**, selects **How I learn**, writes: `I understand Physics better with diagrams and one example at a time.`
3. Ticks **Let my AI use this memory in future conversations** and presses **Save my memory**.
4. Asks: `What do you remember about me?` and later `Explain Newton's second law using a diagram.`
5. Turns recall off. Verifies the fact no longer appears in the assistant's permitted recall.
6. Deletes the entry or exports it from My data.

## Important limitations
- **Not automatic life logging or unlimited conversation history.** Ordinary chat transcripts remain unsaved in Saathi D1.
- **Not guaranteed notifications or task execution.** Calendar imports remain necessary for alerts when the app is closed.
- Provider-managed backups may retain deleted records temporarily, depending on Cloudflare retention.
- The AI can still hallucinate, and its safety filters may miss sensitive content; production suitability for a minor remains **HOLD** until independent safeguarding and family/device acceptance.
