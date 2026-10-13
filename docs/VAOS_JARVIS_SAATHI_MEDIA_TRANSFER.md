# VAOS JARVIS → Saathi Multimodal Capability Transfer
**Date:** 13 October 2026 · **5P decision:** Partial transfer to Saathi staging; independent minor-user commissioning remains HOLD.

## Scope and source authority

The founder requested reuse of existing JARVIS engineering where suitable, not an inter-application data connection or a transplant of enterprise privileges.

Source repository: [vyndivybes/vaos](https://github.com/vyndivybes/vaos), audited at main commit `536da32e9ab1635b41d0c14be264982ee7743c1b`.
Student target: [vyndivybes/rocket](https://github.com/vyndivybes/rocket), staging `feat/saathi-academic-mvp`.

### Findings

| VAOS component | Actual state | Saathi decision |
|---|---|---|
| `apps/web/lib/voice-readback.mjs` | Local segmented speech playback with lifecycle/error handling | **Adapted** into `public/voice-readback.js`, replacing simple one-utterance playback |
| `integrations/stirling-pdf/transform-adapter.mjs` and `provider-manifest.json` | Governed document transformation adapter; provider manifest says **enabled: false**, evaluation-only, self-hosted, API credential required, redistribution review required | Reused **design principles only** (operation allowlist, bounded input, no remote arbitrary fetch, explicit status). Did **not** copy the provider or any credential |
| `integrations/paperless-ngx/archive-adapter.mjs` | Governed enterprise document archival using credentials, an artifact broker and provider-specific records | **Not transplanted**: child study documents must not enter VAOS company archives |
| VAOS voice/governance/provider control libraries | Enterprise read-only command routing, safety labels and evidence verification | Used applicable **patterns only**; no founder authority, employee role, audit facts, enterprise datasets or production connections |
| Full automated file/video teaching | **No currently commissioned general image/video/Word/PDF tutoring pipeline confirmed in VAOS** | Created an independent, limited Saathi pilot below; unimplemented formats remain explicitly unavailable |

## Implemented in Saathi

1. **Media intake**, `public/media-file.js` and `functions/_lib/media-intake.js`: limited file formats and sizes; no arbitrary remote URLs or business document IDs.
2. **My uploads**, `public/mission.js`: student selects a local TXT, Markdown, CSV, JSON, SRT or VTT file. The browser reads permitted text locally, then opens the existing Study links grounded tutoring flow. No file is stored by default.
3. **Still image analysis path**, `functions/api/analyze-image.js`: student session required; same-origin request and explicit `ANALYZE IMAGE` consent; JPEG/PNG/WebP signatures checked; browser resizes image locally before transmission. The API applies the existing AI quota and response-guard protections, with no automatic database storage.
4. **Video**: a local MP4/WebM is opened only for review and user-selected paused-frame capture. The frame may use the same vision service **if approved**. This does **not** transcribe video audio or analyse motion and the full timeline.
5. **Vision commissioning gate**, `functions/api/media-status.js` and `SAATHI_VISION_ENABLED`: status is **disabled by default**. No inference or quota claim is made until the vision model is explicitly enabled after the required licence review.
6. **Voice readback**: directly adapted the owned VAOS bounded segmenter and playback state handling. This is a frontend change only; no media file or schoolwork is transmitted to VAOS.
7. Privacy notice updated for local text files, single-frame limits, student consent, and Workers AI image-provider processing. No text, media, audio or images automatically become personal memories.

### External vision provider HOLD (important)

Cloudflare documents model `@cf/meta/llama-3.2-11b-vision-instruct` for image understanding. A synthetic test request returned Cloudflare **code 5016**: a Meta Llama model agreement and Acceptable Use Policy must be accepted first. **No licence was accepted on the user's behalf.** Saathi requires both the agreement and explicit `SAATHI_VISION_ENABLED=true` on staging before this route becomes available. The current UI reports **vision on hold**, disables its analysis button, and keeps text-file handling usable. Accepting a model licence is a separate user decision, not an implied permission to incur paid usage.

Cloudflare documentation: https://developers.cloudflare.com/workers-ai/guides/tutorials/llama-vision-tutorial/

### Remaining scope (not copied or commissioned)

- Reliable automated PDF/DOCX/PPTX parsing, including embedded images, tables and equations.
- Complete multi-frame video + audio transcription, semantic alignment and timestamp evidence.
- A fully licensed and independently accepted live vision model with accuracy benchmark on consented synthetic schoolwork.
- Real-device checks of file selection, local frame capture, browser speech synthesis and student/parent separation.
- Formal child safeguarding/privacy acceptance and school-specific academic review.
- Real data recovery/retention checks for any future user-file storage.

## 5P evidence and release boundary

Tests cover ownership, origin, explicit consent, image signature/size, no data retention, no inference when disabled, fake-provider image responses, bounded voice splitting and canceled/stale speech; browser text and paused-frame limits. Check the latest `npm run check` CI result and Cloudflare staging deployment for final pass counts. Keep `main` and production disabled. Do not assert that audio/video/PDF has been understood unless an actual qualified pipeline proves it.
