# Rocket — Saathi AI

Independent, private Class 12 study assistant prototype. Cloudflare Pages Functions, D1 `saathi-private`, Workers AI. Not affiliated with or connected to VAOS/VYNDI.

## Release control

**HOLD — do not deploy for a student or share a preview URL.** The MVP is a limited, unqualified prototype: curriculum accuracy, real authentication, safety handling, access isolation, backups and live hosting need independent acceptance. No real student personal data or credentials must be committed.

## Development

Code and test suite are transferred to this private repository. Locally: `npm run check` on Node 22 or newer. The student account database is provisioned separately in APAC under Cloudflare D1 `saathi-private`; do not use any VAOS resources.

## 5P

Plan → Prepare → Proceed → Perform → Persist. Protect student privacy; fail closed if authentication or AI bindings are missing; never pretend to alert a guardian or emergency responder.
