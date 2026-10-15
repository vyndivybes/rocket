# Saathi — Source Upgrades and Optional Local Companion

## Core-code upgrade path

Learner-created Skill Forge capabilities are private extensions. Actual source-controlled changes require a separate workflow.

1. The learner saves a core improvement idea in the existing private upgrade-requests system.
2. A repository maintainer selects an approved template in the Saathi reviewed core upgrade GitHub Action. The Action uses a protected Environment named saathi-core-upgrade-approval.
3. The generator updates a core skill catalog on a new branch, runs tests, and proposes a PR to feat/saathi-academic-mvp.
4. An authorised maintainer reviews and merges the PR to publish staging. Production and ownership are unchanged.

No GitHub credentials are given to the student app.

BOOTSTRAP REQUIRED: GitHub workflow_dispatch actions must exist on the default branch before they appear in Actions. Default main currently differs from staging. To run this workflow, an owner must explicitly bootstrap the workflow-only file to default, or run the generator locally. A GitHub protected Environment and Actions PR creation permission also require owner configuration. Until then this is an implemented, but not operationally commissioned, workflow.

Manual alternative (Node 22+):

    node scripts/generate-core-upgrade.mjs --feature=aviation-instruments
    npm run check

Create a reviewed pull request to feat/saathi-academic-mvp.

## Optional local Windows companion

Requirements: Windows 11, Node.js 22+, cloned repository; no Docker/WSL or paid services.

    node local-companion/saathi-local.mjs

Open http://127.0.0.1:31984/ on that computer. Explicit learner actions can open approved educational HTTPS pages, start a public search, save a note to Documents/Saathi, or show read-only device memory/processor status.

The server is loopback-only, uses a per-run anti-CSRF nonce and has no permissions to run arbitrary shell commands, access passwords, or silently control other applications. It is not automatically connected to the hosted Saathi website. Closing the terminal stops it.

## Immersive design

Mission Control and academic workspace now share a premium light blue/cream theme. The Mission Control welcome includes a layered 3D-style orb, orbital grids, responsive cards and pointer-driven parallax. Reduced motion disables transformations. No paid libraries or device sensors.
