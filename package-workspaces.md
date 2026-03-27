# CrateStats (revamp in-progress)

This repo is transitioning to a monorepo.

Planned layout:
- `apps/web` — Next.js (TypeScript) frontend + API routes (for MVP)
- `packages/parser` — Shared parser/report generation library (TypeScript)

Current legacy apps:
- `client` — CRA frontend (legacy)
- `server.js` — Express backend (legacy)

Next steps: convert root `package.json` to workspaces and move legacy into `apps/legacy-*` when ready.
