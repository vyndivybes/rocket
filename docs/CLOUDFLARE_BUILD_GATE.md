# Saathi — Cloudflare Free-Tier Staging Gate

The Cloudflare Pages project `saathi-student-ai` is linked to GitHub `vyndivybes/rocket`.

- Build command: `npm run check`. This runs JavaScript syntax verification and unit/API tests. Any nonzero exit stops deployment.
- Output directory: `public`; Pages Functions live under `functions/`.
- Preview automation: **only** the development branch `feat/saathi-academic-mvp`.
- Preview database: `saathi-staging`; no personal student data or active student accounts.
- Production database: `saathi-private`; entirely separate from staging and VAOS.
- Production deployment: **disabled** until a separate safety, privacy and curriculum acceptance decision.
- AI binding: required for tutoring; **must be independently confirmed before claiming AI is live**.
- All Pages preview URLs are potentially publicly reachable even when the source repository was private. Never seed real student accounts or store secret credentials in the repository or a test.
- GitHub Actions (public repository) most recent prior runner retry passed `npm run check`; verify Cloudflare build independently.

This change is intended to trigger a single staging branch build; it does not authorize production publication or student enrolment.
