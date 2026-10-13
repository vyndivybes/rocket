# Saathi learner experience — My Day / My Saathi commissioning record (2026-10-14)

## Purpose
Reduce unwanted interruption, give the student meaningful design choices, and make existing tutoring, planning, arts and aviation capabilities discoverable. This is an incremental **preview-only** UI and API change. It is not approval to make Saathi an unrestricted AI companion or a self-modifying agent.

## Implemented behaviour
1. **My Day:** simplified home with one optional next task (if available), counts without grading or streak pressure, customisable Learn / Plan / Create / Explore cards and an on-demand Ask Saathi action. Art and aviation open existing Mission Control routes.
2. **My Saathi:** learner can persist approved high-contrast colour presets, text size, three bounded explanation styles, selected cards and explicit notification preferences. Existing custom AI naming remains in Mission Control. Uses semantic labels, touch targets, desktop/tablet/mobile responsive layouts and reduced-motion CSS.
3. **Quiet Intelligence:** defaults are quiet mode **ON**, reminders **OFF**. The preview-only push dispatcher requires a student-owned opt-in record with quiet mode off **and** an independently opted-in push device/schedule. A preference toggle does not commission push infrastructure, grant browser permission or guarantee delivery. Existing device time zone and quiet hours remain relevant.
4. **Assistant style:** server adds a predefined instruction for quick/balanced/step-by-step tutoring. Learner text is never copied into system policy. AI tutoring, safeguarding and refusal rules are unchanged.
5. **Upgrade ideas:** student-only, text-only private proposals (12–300 chars), capped at 3/day and 10 stored per learner, individually deletable. No auto-code, auto-install or production modification. The learner can ask for a new feature and see its PROPOSED status.
6. **Preservation:** additive `0010_learner_experience.sql` for preferences and ideas, no alteration of school profiles, tasks, notes, practice history, Papa welcome, old AI nickname, parent privileges or commissioning gates. On logout, clear local theme and temporary student experience state.

## Validation and limitations
- Test-first RED commit `8e0008d0d09bcbfb8b41cf1400649b7b828ab4e1` demands safe defaults, schema persistence, learner isolation, invalid-setting rejection, private/deletable requests and escaped UI; initial CI failed because implementations were missing.
- Additional regression test requires the private push dispatcher to send **nothing** for missing consent, quiet mode or reminders disabled, even when a device and schedule exist.
- Static rendering and API tests verify HTML escaping, feature routes, learner role boundaries and accurate status text. Actual signed-in responsive-browser usability and assistive-technology checks **not yet executed**.
- Stored preferences are immutable until user saves a new selection; theme styling applies to the learning workspace. Mission Control keeps its separate visual design.
- No generic software self-update; proposals require adult/developer review, controlled testing and approval.
- No automatic claims of improved school grades, verified academic mastery, guardian safeguarding acceptance, or real-device push delivery.
- Full CI outcome is recorded in the PR after a final head check.

## Mandatory HOLD
`functions/_lib/commissioning.js` still returns `status:HOLD` and `productionEligible:false`. PR #1 into `main` stays unmerged. Next gates are classroom/teacher review, authenticated student and guardian desktop/tablet/phone tests, device quiet-hours/notifications commissioning, recovery, human safeguarding, privacy/retention, and official academic coverage. Apply D1 migration in isolated staging before evaluating the new settings endpoint. Do not run it against a production or unrelated database without controlled recovery evidence.
