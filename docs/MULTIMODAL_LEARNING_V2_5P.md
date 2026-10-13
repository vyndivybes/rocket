# Saathi Multimodal Learning V2 — Document and Image Preview

**13 October 2026 · Staging ONLY**: `vyndivybes/rocket` → `feat/saathi-academic-mvp`.

## Features
1. **My uploads** selects a limited local text, image, document or video file. Text, subtitles and transcripts remain editable before querying the tutor.
2. **PDF / DOCX / PPTX:** Up to 1 MB each. Explicit learner confirmation precedes transmission to Cloudflare Workers AI `toMarkdown` service. PDF/ZIP signatures are checked; file and output are not stored by Saathi. A bounded plain-English/Markdown excerpt is returned to the learner's **Study links** grounding flow, where one-question-at-a-time teaching is already supported.
3. **Vision:** Uses `@cf/google/gemma-4-26b-a4b-it` for one image per request, with the documented user message image-content format (`image_url` data URL). Browser locally scales to fit and asks consent. Only staging sets `SAATHI_VISION_ENABLED=true`; production sets false. Existing learner AI quota applies; no new separate payment or API token is configured.
4. **Video:** A locally selected frame is treated as one photograph, **not** a transcription or full analysis of the video. Transcript text can separately be pasted into Study links.
5. **Governance:** Student-only authenticated API, same-origin protection, capped size, signature validation, consent before provider processing, no automatic long-term memory/notes, error and uncertainty displayed. No parent/admin content access through student endpoints.

## Independent provider evidence
- Cloudflare's `/ai/tomarkdown/supported` API confirmed `.pdf`, `.docx`, `.pptx` as supported in the connected account.
- Cloudflare accepted a synthetic image request to Google Gemma 4 using `content:[{type:'text'},{type:'image_url'}]`. It recognized the red square but **misidentified** the blue circular shape in a test image; **do not certify accuracy**.
- The earlier Meta Llama 3.2 vision probe required licence acceptance (Cloudflare 5016). No Meta licence was accepted. The solution uses an alternative provider model available through Workers AI.
- Precise diagram transcription, handwritten maths accuracy, image/chart extraction from PDFs, human-delivered academic explanations, provider data retention and device compatibility are *not* independently qualified.
- `toMarkdown` errors are surfaced as conversion failures instead of fabricating extracted content.

## Release gates
- GitHub CI `npm run check`, Cloudflare Pages preview build logs and env binding checks must pass.
- Preserve `saathi-staging` preview DB and production DB `saathi-private` as different bindings; never copy user files across applications.
- **Production disabled**, no production launch or unrestricted child access claim.
- Manual family trial on student device and human safeguarding/academic review remain HOLD.

Source references:
- <https://developers.cloudflare.com/workers-ai/features/markdown-conversion/usage/binding/>
- <https://developers.cloudflare.com/workers-ai/models/gemma-4-26b-a4b-it/>
