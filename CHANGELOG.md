# Changelog

All notable changes to formaticsystems.com are recorded here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Dates are YYYY-MM-DD.
Earlier history (Feb–Oct 2026) lives in `git log`; this file starts at the Second-Brain rollout.

## [Unreleased]

### Added
- 2026-11-08 — **ReferralPro page and card.** New page `app/referralpro/page.tsx` (`/referralpro`) and a
  ReferralPro card in the "What We Build" grid linking to it. The page's one primary button goes to the
  waitlist at `https://referralpro-formatic-labs.vercel.app/beta?ref=formaticsystems` (the `ref` tags the
  source), with a small "Already invited? Sign in" link. Name and URLs live in `lib/referralpro.ts` so the
  working name is a one-line swap. **Why:** ReferralPro has no domain yet, so formaticsystems.com hosts a
  temporary page (handoff 2026-11-08). Private beta: no pricing, no public-availability promise, no
  customer names, industry-neutral copy.
- 2026-11-08 — **`/sitemap.xml`** (`app/sitemap.ts`) listing `/`, `/referralpro`, `/lab/culture`. **Why:** the
  site had no sitemap and now has more than one page.
- 2026-11-08 — ReferralPro entries in `public/llms.txt` (What We Build + Pages).

### Changed
- 2026-11-08 — "Open Resources" card no longer spans the full row (six cards fill the grid evenly). On-site
  card links now navigate in the same tab via `next/link`; external ones still open a new tab. The nav's
  "Formatic Systems" brand now links home. **Why:** fit the sixth card and give `/referralpro` a way back.

### Added
- 2026-10-31 — `.claude/settings.json` enables the **superpowers** plugin (`superpowers@claude-plugins-official`, obra/superpowers) so cloud sessions get the same brainstorming / planning / TDD / debugging / verification skills as local ones. **Why:** Johnny wants superpowers in every session on every project, local or cloud. No site code changed.

### Added
- 2026-10-31 — **claude-seo is the primary SEO tool** (`.claude/settings.json` enables the plugin for local and cloud sessions; CLAUDE.md "SEO tooling" section). **Why:** Johnny wants one best SEO tool by default. No site code changed.

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
