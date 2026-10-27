# Changelog

All notable changes to formaticsystems.com are recorded here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Dates are YYYY-MM-DD.
Earlier history (Feb–Oct 2026) lives in `git log`; this file starts at the Second-Brain rollout.

## [Unreleased]

### Added
- 2026-10-26 — **Hand-off: Formatic Admin Console** (`docs/handoffs/CC-HANDOFF-2026-10-26-formatic-admin-console.md`).
  **Why:** Johnny wants one Formatic-level admin/dev console for every SaaS app (accounts,
  subscriptions, beta approvals, feature access unlocked automatically on payment or toggled by
  hand, cross-app unlocks). Docs only; it needs a brainstorm and an approved spec before any code.
- 2026-10-25 — **ProjectPix card** in the home "What We Build" grid (`components/what-we-build.tsx`),
  placed right after Front Office at the same weight, with a "Join the waitlist →" link to
  https://projectpix.io. **Why:** the site featured Front Office but never mentioned ProjectPix
  (live in private beta). Copy claims only shipped features (instant camera, offline, before/after
  alignment, one shareable project link, built-in AI tags/captions) per the 2026-10-25 handoff;
  no integrations, desktop app, developer site, or pricing are claimed. Cards can now carry an
  optional `cta` link and a `wide` flag; "Open Resources" spans the full row so the 2-column grid
  stays even with five cards.
- 2026-10-25 — **ProjectPix entry in `public/llms.txt`** under What We Build, so AI assistants
  see the same product list as the page.
- 2026-10-25 — **Second-Brain instrumentation:** `PROJECT_LOG.md`, this `CHANGELOG.md`, a repo
  `CLAUDE.md` pointer, `ROLLOUT-CHECKLIST.md`, the changelog gate `.githooks/pre-commit`
  (`core.hooksPath=.githooks`), and the CI backstop `.github/workflows/changelog-check.yml`.
  **Why:** the repo had no project log or changelog, so sessions had no source of truth and the
  commit gate had nothing to enforce.
