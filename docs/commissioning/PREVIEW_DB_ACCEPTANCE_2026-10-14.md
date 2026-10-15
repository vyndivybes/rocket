# Saathi preview commissioning — verified findings, 14 October 2026

**Scope:** development preview for `vyndivybes/rocket` at merge `3d8fed1ea6a46720923df4be2964d6622e43363a`; **not production release approval**. Production remains HOLD as defined by `functions/_lib/commissioning.js`.

## 5P actions performed

### Plan — identify environment and authority
- Cross-checked repository `wrangler.toml`, actual Cloudflare Pages project `saathi-student-ai`, live `deployment_configs`, database list and latest successful deployment.
- The Pages project's production branch is `main`. Latest successful **preview** was branch `feat/saathi-academic-mvp` at merge `3d8fed1e...` (deployment `55d12be7-0210-4491-b609-d766adebd2f6`).
- Preview `DB` binding: **saathi-staging**, database `eacc17bb-a4da-46ad-8aca-c488540911d4`. Production `DB` binding: distinct **saathi-private**, database `339a3e76-27df-451a-93b5-8fdb99038754`. No production database modifications were authorised or performed.

### Prepare — preserve rollback and baseline
- Captured the staging D1 time-travel bookmark before making changes and requested a staged SQL export. Do not equate an export request with a downloaded, independently restorable backup.
- Before migration: staging had **2 users and 1 academic study profile**, and neither `learner_experience` nor `learner_upgrade_requests` existed.
- Confirmed `PR #8` tests passed `186/186` (GitHub Actions run `38466239947`), including initial DB isolation, input validation, quiet push and basic responsive static rendering checks. These are synthetic tests, not signed-in browser acceptance.

### Proceed — isolated additive staging migration
- Applied repository migration `migrations/0010_learner_experience.sql` **only to staging**, via D1's SQL API: `CREATE TABLE IF NOT EXISTS learner_experience`, `CREATE TABLE IF NOT EXISTS learner_upgrade_requests`, `CREATE INDEX IF NOT EXISTS upgrade_requests_by_learner`.
- Independently confirmed the exact table DDL, index presence and `PRAGMA foreign_keys = 1`. No changes to existing tables.

### Perform — synthetic staging database smoke tests and public route check
- Temporarily created two uniquely named synthetic staging accounts with unusable dummy password hashes.
- Wrote one private preference record and one `PROPOSED` improvement record for learner A. Verified learner A has one of each while learner B has none. This verifies **database key isolation**, not authenticated API authorization.
- Removed the synthetic users and confirmed cascading deletion of their preference and proposal records. Post-cleanup baseline returned to **2 users, 1 study profile, zero learner-preference records, zero improvement proposals**.
- Read-only external preview inspection confirmed the login page renders `Meet Saathi.` and the existing Mission Control route presents `Sign in as a student` when unauthenticated. Both routes exposed expected page titles and viewport metadata.
- The preview URL is for authorised testing only. Do not circulate it to the child before safeguarding approval.

### Persist — evidence and outstanding gates
- No real student or guardian credentials were used. No device push messages were sent, scheduled, or tested. No browser-recorded signed-in learner journey, tablet/mobile viewport screenshots, accessibility-tree audit, or full data restoration was performed.
- Production database was neither migrated nor queried for personal records (only structural table names were checked).
- Keep production release PR #1 open and unmerged into `main`; the safety gate must continue to report `HOLD`.

## Operational acceptance matrix

| Gate | Evidence | Status |
|---|---|---|
| Development CI and source integrity | GitHub Actions run `38466239947`, 186 tests passed | PASS (automated) |
| Preview deployment exact commit | Cloudflare successful preview `55d12be7...` at `3d8fed1e...` | PASS |
| Production/preview D1 isolation | Actual Pages binding IDs and D1 inventory | PASS (configuration) |
| Staging migration / schema | Both tables, index, foreign keys verified | PASS |
| Staging synthetic persistence / cleanup | A/B records segregated; original row counts restored | PASS (database only) |
| Unauthenticated login/mission routing | Read-only live fetch | PASS (public routes only) |
| Actual student/guardian sign-in and API role isolation | No signed-in browser access established | HOLD |
| 320/375/768/1024/1440px responsive layouts, keyboard, screen reader | No authenticated viewport captures | HOLD |
| Quiet-mode push real-device opt-in, delivery and suppression | Code checks only; device not independently qualified | HOLD |
| Papa welcome / AI naming on real account | Existing tests/source only; not seen in signed-in UI | HOLD |
| D1 independent restoration / recovery | Pre-write bookmark; no isolation restore drill completed | HOLD |
| Teacher academic review and guardian safeguarding consent | No authorised evidence | HOLD |
| Production release | Mandatory `commissioningStatus().productionEligible === false` | HOLD |

## Authenticated acceptance script (when access is legitimately available)

1. Open the authorised **staging preview only**, with a test learner whose credentials are not committed to GitHub. Record deployment commit and viewport dimensions without exposing cookies, keys or pupil records.
2. At widths **320, 375, 768, 1024 and 1440px**, verify navigation and My Day card visibility, touch targets, keyboard focus, accessible labels, no sideways scrolling, reduced-motion preference and large-text layout. Verify that optional Study, Art and Aviation routes work; capture screenshots privately.
3. Sign in as a learner: My Saathi must load calm defaults (quiet ON, reminders OFF); change theme, style, size and cards, save, reload and verify persistence in staging. Verify that a malformed request is rejected with no state change. Create a harmless improvement proposal, verify private PROPOSED status, delete and confirm absence. Verify the selected AI style affects conversational responses **without** bypassing safeguarding.
4. Sign out and sign in as a separate authorised learner: ensure settings and proposals are not visible. Sign in as a guardian: learner preference and proposal APIs must respond **403**, and private notes/messages must remain unavailable.
5. Confirm Papa welcome and companion naming according to their existing one-time/repeat policy; do not reset real pupil welcome state to fabricate first-login acceptance.
6. Only with explicit opt-in and a commissioned staging device: inspect quiet hours, suppression when quiet ON/reminders OFF and delivery when allowed. Never disclose private schedule content in a notification.
7. Verify D1 recovery by restoring a **disposable copy** of staging, not by reverting or overwriting the active learner database. Reconcile the original record counts and logs.
8. Human safeguarding, consent, retention and official CBSE teacher review must be signed off separately before unblocking production.

**Disposition:** `PREVIEW_DB_MIGRATION_PASS / SIGNED_IN_UI_HOLD / SAFEGUARDING_HOLD / ACADEMIC_HOLD / PRODUCTION_HOLD`.
