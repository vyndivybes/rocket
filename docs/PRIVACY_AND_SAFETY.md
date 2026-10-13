# Saathi — Data and Child-Safety Boundaries

Saathi is intended for a minor. Until qualified, only synthetic accounts and questions may be used. Do not treat source code or an LLM prompt as a safety guarantee.

## Data inventory
- `users`: usernames, salted hashes of random 256-bit access keys, user roles, optional parent link, selected board.
- `sessions`: SHA-256 hashes of opaque random tokens with expiration; cookies are HttpOnly, Secure, SameSite=Strict and scoped to /api.
- `tasks`: student-scoped task titles, subjects and deadlines. Academic records can still be sensitive.
- `ai_usage`: per-student daily attempt count, not prompt content.
- `login_attempts`: hashed username-derived key and timestamps, 15-minute throttle.
- **No chat history saved** in app-owned D1 tables; the AI provider may process prompts under its own policies.

## Access controls
- Students may read and modify only their own tasks.
- Parents see only aggregate task counts for explicitly linked students, never task titles or chats.
- Parents cannot ask prompts as a student.
- Student endpoints demand authentication. Static login UI is not private by itself.

## Safety limits
- The direct-text guard detects only a few English patterns; this is **not comprehensive safeguarding**.
- The AI is directed not to invent emergency alerts. This cannot be enforced by prompt text alone.
- If a guardian may be unsafe, advise another safe trusted adult, school counsellor or local emergency/protection service rather than automatically alerting that guardian.
- This prototype cannot send parent, school or emergency notifications.
- No real-world student use until policy, monitoring, moderation limits and human escalation procedures have been assessed.

## Release hold
Live cookie/origin/browser tests; consent and privacy notice; deletion/retention/incident processes; academic source attribution and model assessment; D1 backup/restore; controlled Pages preview; qualified safeguarding review.
