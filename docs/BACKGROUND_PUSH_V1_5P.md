# Saathi Background Push V1 — 5P acceptance report

**14 October 2026 — staging. Production is deliberately disabled.**

## Plan / Prepare
Deliver student opt-in private browser push without an open page or active login, using a dedicated Cloudflare Cron Worker, student-owned schedule rows, VAPID subscriptions and generic lock-screen notifications. Preserve quiet hours and fail closed.

## Proceed
The application already contains:
- `public/mission.js`: student-only opt-in, permission request, PushManager subscription registration/removal, calendar fallback, no automatic enrolment.
- `public/saathi-push-sw.js`: background push handler with generic title/body, opens Mission Control and requires login before private content.
- `functions/api/push-device.js`: same-origin student-only registration/removal, max 3 devices, strict provider allowlist and quiet-hour time zone validation.
- `functions/_lib/push-policy.js`: local civil-time matching, bedtime suppression.
- `functions/api/push-dispatch.js`: internal bearer-secret dispatch, per-device schedule deduplication and state/health ledger, no lesson names in notification.
- `workers/saathi-push-cron.js`: isolated scheduled invocation without D1 access.
- `migrations/0008_push_devices.sql`, `0009_push_health.sql`.
- Staging Cloudflare configuration: VAPID public key, private key and dispatch secret, dedicated Cron Worker `saathi-push-dispatch-preview` with `* * * * *`.

## Perform — defect correction
Detected and fixed a mismatch: the push service worker rejected messages without `kind:'SAATHI_REMINDER_V1'`, but the server-side sender omitted that field. The dispatch payload now includes the exact service-worker discriminator, with a regression assertion in `tests/push-dispatch.test.mjs`.

**GitHub Actions run 38458124458: 168 tests, 168 PASS, 0 failures.**
**Cloudflare Pages staging deployment:** commit `1bb4fd31308b5603534235e95d39791c8482363b`, deployed successfully to `https://feat-saathi-academic-mvp.saathi-student-ai.pages.dev/mission.html`.

Cloudflare configuration inspection confirmed:
- Staging private secrets configured, staging VAPID public key visible, staging D1 attached.
- Dedicated Cron Worker exists and one-minute schedule is registered.
- Production Pages deployments are disabled.
- Staging D1 has **0 registered devices, 0 enabled schedule items, 0 delivery rows and last_run_at=NULL** as observed at audit time.

## Acceptance result
| Gate | Result |
|---|---|
| Source implementation and regression tests | PASS |
| Staging deployment | PASS |
| Browser push registration/security code | PASS at test level, no actual device tested |
| Cron schedule configured | PASS |
| Observed Cron → dispatch-health ledger | HOLD: last_run_at unobserved |
| Push provider acceptance | HOLD: no real device subscription |
| Phone/desktop notification display and tap → login | HOLD: real-device test not yet performed |
| Production release | HOLD by design |

**Note:** A gateway `accepted` receipt would still be insufficient proof of handset notification delivery. A student must sign into staging once, explicitly enable notifications, approve the browser permission, and create an activity in the schedule. Then verify the OS shows a notification after closing the app and that tapping it returns to the private login/mission flow. For iOS, install as Home Screen app before enabling notifications where required. If push is unsupported, export to the phone calendar.

No real notification or student file has been sent in this audit. No synthetic delivery is presented as a production success.
