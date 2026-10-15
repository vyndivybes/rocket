# Saathi Proactive Notifications V1 — 5P Acceptance Record
**Date:** 2026-10-13 · **Environment:** Cloudflare Pages staging only

## Plan
Deliver learner-controlled study/activity reminders while Saathi is not open, without requiring a persistent signed-in tab or introducing VAOS data, monitoring, or paid messaging APIs. Browser/device permission and one-time login are unavoidable. Real delivery depends on push service/network/device.

## Prepare
- Register only HTTPS browser push endpoints on a fixed provider allowlist; validate public encryption keys and strict learner ownership.
- Save at most 3 opt-in devices per learner in staging D1 with privacy-preserving timezone and quiet-hour settings (22:00–07:00 default).
- Never write lesson names or personal details into push payloads; use generic lock-screen notification only.
- Generate ECDSA P-256 VAPID signing keys and dispatcher bearer secret on the Cloudflare side. The private key and dispatch secret are stored as secret_text settings in the **preview** environment, never in GitHub.
- Preserve production_deployments_enabled=false and separate production database.

## Proceed
- Schema: `0008_push_devices.sql` tracks opted-in endpoints and idempotent per-day reminder dispatch; `0009_push_health.sql` tracks Cron execution heartbeat.
- Student-only `GET/POST /api/push-device` returns readiness/public VAPID key, registers same-origin approved subscriptions and revokes only the caller's own endpoint.
- `public/saathi-push-sw.js` displays a generic background push and opens the login-protected `/mission.html` when tapped.
- `public/mission.js` adds device enable/disable controls. Permission is requested on click only. Existing calendar export remains a separate reliable phone-native alternative.
- `/api/push-dispatch` is an internal, secret-authenticated, **staging-only** Cloudflare Pages Function. Reads bounded due schedule rows, applies timezone and quiet hours, reserves unique device+schedule+local-day keys before sending and records accepted/failed gateway result and heartbeat. No AI model or extra paid token used.
- Separate Worker `saathi-push-dispatch-preview`, scheduled with `* * * * *`, calls only the staging internal dispatch endpoint using a worker-side secret. It has no DB binding. Cloudflare schedule was applied via the API; repository `wrangler.push.toml` remains fail-closed as a fallback bootstrap template.
- Secret bindings and public VAPID key are preview-only; production configuration explicitly disables push.

## Perform
- Automated tests: timezone including midnight/day-boundary and quiet hours, endpoint/provider allowlist and malicious URL rejection, learner registration, cross-learner isolation, no registration when uncommissioned, Cron bearer protection, staged-only dispatch, idempotent one-per-device/day gateway call, generic payload, retry-safe reservation, and service worker privacy.
- GitHub CI and Cloudflare deployment logs are authoritative for build/automated test results.
- Staging D1 migration confirmed with 0 registered push devices; no private delivery data written before voluntary enrolment.
- Cron trigger, Worker secret bindings, Pages VAPID bindings, and staging environment guard confirmed via Cloudflare API.

## Persist / Remaining commissioning gates
- **Device acceptance required:** learner signs in once on a supported phone, installs Saathi as a Home Screen web app where required, explicitly grants notifications, enables device push, schedules a future short study activity, closes the app and verifies that a generic notification arrives. Tap must open a login-protected screen. Test disabled/quiet hours/revocation.
- **Provider acceptance still requires an actual subscription** and push gateway receipt; a synthetic or zero-device dispatch cannot prove handset delivery. The `push_dispatch_health.last_run_at` record must show an actual Cron invocation independently before calling the scheduled service fully qualified.
- "Push accepted" is not synonymous with notification displayed; OS battery, Focus/Do Not Disturb and network conditions can delay/block it.
- Only opted-in scheduled activity reminders are included. No background AI conversations, arbitrary voice waking, school surveillance, or geolocation.
- Admin emergency stop: set preview `PUSH_DISPATCH_CONFIGURED=false` and disable the Worker Cron trigger. No production deployment.

This project is independent from VYNDI OS/VAOS and shares no user records, authorizations or runtime secrets.
