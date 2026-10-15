# Saathi Link-to-Lesson Intelligence — 5P Acceptance (2026-10-13)

## Goal

An adolescent can ask their named AI companion to study a link they choose, including YouTube and educational webpages, and request simple explanations, relevant source excerpts, a quick check question, a private note or a revision task. **Truthful source access takes priority over an answer.**

## 5P — implementation

### Plan
- Use the existing learner account, daily AI allowance, safety and privacy boundaries.
- Do not write URLs, fetched pages, videos or transcripts to Cloudflare D1 automatically.
- Do not claim automatic transcription, video frame analysis, full PDF extraction or textbook certification.

### Prepare
- Secure, no-extra-paid-API solution on existing Cloudflare Pages Functions and Workers AI.
- Automatic server fetch restricted to HTTPS on an explicit public education host allowlist (NASA Glenn, NCERT, CBSE Academic, National Gallery of Art, Khan Academy, OpenStax, Britannica). No arbitrary remote fetch.
- Canonical YouTube watch/short/youtu.be URLs recognised, with an optional video title from YouTube's public oEmbed metadata. **No attempt to scrape hidden video transcripts or bypass consent.**
- [YouTube's official caption download endpoint](https://developers.google.com/youtube/v3/docs/captions/download) requires the requesting user to have permission to edit the video; arbitrary public captions cannot be downloaded through this route without authorization.

### Proceed
1. **Mission Control → Study links**: paste an HTTPS study URL and select Open study source.
2. Trusted readable public HTML/plaintext pages: fetch once with redirects disabled, content type checked and a strict 256 KB response cap; return up to 12,000 characters of editable source text. Scripts, navigation and footer are omitted where possible. If blocked, redirected, PDF/binary or unreadable, show a human-readable failure and allow manual excerpt paste.
3. YouTube: identify video metadata, but show **transcript required**, with instructions to use YouTube's **Show transcript** feature where available and paste captions. Users may include VTT/SRT-style timestamps such as `00:04:27 --> 00:04:34`, or time-labelled lines.
4. Ask a specific question. Server selects a few actually present snippets (time-nearest for e.g. `at 4:30`), labels input as untrusted data, and sends only bounded excerpt text to Workers AI. The AI is told to decline unavailable information rather than invent video visuals, exact quotes, captions or timestamps.
5. The response displays deterministic supporting excerpts and actual timestamps; time links open the original YouTube video at that point. The excerpts are sourced from supplied text and may themselves be inaccurate; they are **not** verified video frames.
6. Posting a YouTube or HTTPS study URL into ordinary AI chat diverts to Study links before calling the model, avoiding invented analyses.
7. **Save explanation as private note** and **Make revision task** are opt-in actions only, using the existing learner-isolated APIs. No automatic notes, task creation or personal-memory changes.
8. If the host is not eligible for automatic fetch, manual text is accepted and labelled `learner-pasted passage; origin unverified`; no unsafe URL is fetched.

### Perform
- Source URL/SSRF tests (internal IPs, credentials, ports, non-HTTPS, deceptive subdomains, redirects), bounded responses, rejected binary content, HTML sanitization, YouTube metadata failure, per-role auth and CSRF.
- Timestamp evidence tests and no invented timestamp when source lacks one.
- Learner-only question gating, original first-response safety, quote-as-data prompt boundaries, AI quota rules and no transcript persistence.
- Tests of pasted-link detection, conversation-to-source handoff, opt-in note/task UI and long source excerpts.
- CI and Cloudflare deployment logs are authoritative; don't mark acceptance from committed source alone.

### Persist and limitations
- No new secrets, payment provider, paid transcript API, database migration, external account or background worker required.
- Existing study schedules, memory consent and parent aggregate progress isolation preserved.
- Webpage extraction reads static HTML/plaintext; JS-rendered pages and pages that restrict retrieval can fail.
- No automatic analysis of video audio, visual diagrams, closed captions without user-supplied text, PDF or scans.
- A real learner-device walkthrough and deeper independent child-safety / curriculum review still remain before production commissioning.
- Production remains disabled.
