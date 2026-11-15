# Changelog

All notable changes to formaticsystems.com are recorded here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Dates are YYYY-MM-DD.
Earlier history (Feb–Oct 2026) lives in `git log`; this file starts at the Second-Brain rollout.

## [Unreleased]

### Released
- 2026-11-15 — **Front Office site merged to `main` and live** at https://formaticsystems.com/front-office
  (pull request 2, merge commit `50d0703`; Johnny: "merge it"). The entries below dated 2026-11-15 that say
  "not on `main`" describe the work before this merge. **Why:** Johnny approved the merge.

### Decided
- 2026-11-15 — **Marketplace listing requests are review-first** (Johnny: "Yes, review first"). A request
  from another platform is read by a person at Formatic before anything is listed; nothing is automatic.
  The Front Office docs page "Marketplace listing" and its request form were already built this way, so
  no page or code changed. **Why:** recorded so the default that was built is no longer an open question.

### Changed
- 2026-11-15 — **Front Office help docs made ready to be the one source of truth** (same branch and pull
  request; still not on `main`). The markdown files in `content/front-office-docs/` will later be loaded
  into Front Office's public knowledge store; that import is not built here.
  - Every file now has `tier: public` and one or two `answer_cards` (a `question` a customer would ask and
    an `answer` of 40 to 120 words written to be spoken aloud) at the top, with a one-sentence `description`.
  - Every article opens with a short direct answer before its first heading; sections were reworded so
    each stands on its own (no "see above").
  - `lib/front-office-docs.ts` fails the build when a file is not `tier: public`, has no answer card, has an
    answer outside 40 to 120 words or with a link or list in it, does not open with a direct answer, has a
    section over 300 words (about 400 tokens), or says "see above/below" or uses a picture.
  - The plain-markdown address of each page (`/front-office/docs/<file name>.md`) now starts with those
    fields as YAML (`title`, `description`, `tier`, `updated`, `section`, `status`, `url`, `answer_cards`).
    Each page shows its cards as "Quick answers"; `llms-full.txt` and "Copy as markdown" include them as text.
  - Product page: new feature "One set of answers, everywhere" (answers come from one set of approved
    information the business controls). No hosted help-site product is announced.
  **Why:** Johnny, 2026-11-15: "yes, one source. the objective is speed and access to information to keep
  the latency down."

### Changed
- 2026-11-15 — **Front Office section rebuilt as the product's own site, with GitBook-style help docs**
  (same branch and pull request; still not on `main`). Replaces the first version from earlier the same day.
  - **Own site under one path.** `app/front-office/layout.tsx` gives everything under `/front-office` its own
    navigation and footer (`components/front-office/section-shell.tsx`) instead of the Formatic Systems ones.
    Every link inside the section is written with `fo("/…")` from `lib/front-office.ts`; moving to its own
    domain is two constants (`FRONT_OFFICE_ORIGIN`, `FRONT_OFFICE_BASE`) plus copying the folders listed there.
    The listing-request route moved inside the section: `app/front-office/api/marketplace-apply/route.ts`.
  - **Help docs are markdown files.** One `.md` file per page in `content/front-office-docs/`, with a few
    lines at the top (title, description, section, order, status, date). Adding a page is adding a file;
    `lib/front-office-docs.ts` reads them. The typed article files from the first version were removed.
  - **Docs behaviour:** left sidebar of sections and pages, an "On this page" contents list, previous/next
    links, and search across every page (runs in the browser; nothing is sent anywhere).
  - **AI-ready:** every page is also plain markdown at its address plus `.md`
    (`app/front-office/docs-md/[file]/route.ts` behind a rewrite in `next.config.ts`), each page has
    "Copy as markdown" and "View as markdown", and the docs have `/front-office/llms.txt` and
    `/front-office/llms-full.txt`, generated from the same files. Pages carry a `text/markdown` alternate link.
  - **Developer pages are a docs section** ("For developers": Connect your platform, Tools that are easy to
    approve, Marketplace listing). The listing request form sits at the bottom of "Marketplace listing".
    `/front-office/developers` redirects to the section; the standalone developer page was removed.
  - New dependency: `marked` (markdown to HTML at build time). Article styles: `.fo-prose` in
    `app/globals.css`, using the existing colour tokens.
  **Why:** Johnny, 2026-11-15: treat the section as the product's main site until it moves to its own
  domain, and make the help docs work the way GitBook's do, "AI ready".

### Added
- 2026-11-15 — **Front Office section (first version, on a branch for review; not on `main`).** Three areas,
  linked from the Front Office card on the home page ("See what it does"):
  - **Product page** `/front-office` (`app/front-office/page.tsx`): what it does for a small service business,
    twelve features each tagged "Built, in testing" or "Coming", who it's for, what it isn't, and a
    "Tell me when it's ready" form (`components/front-office/notify-form.tsx`) that posts to the existing
    `/api/contact`. No prices, dates, customer counts or sign-up.
  - **Help docs** `/front-office/docs` and `/front-office/docs/[slug]`: five articles for business owners.
    Each article is one file in `content/front-office-docs/`; to add one, add a file and one line in
    `content/front-office-docs/index.ts` (the index page, article page, metadata and sitemap read that list).
  - **Developer page** `/front-office/developers`: how a platform is connected through a remote MCP server
    (five steps), what makes a tool easy to approve, and an "Ask to be listed" form
    (`components/front-office/marketplace-apply-form.tsx` → `app/api/front-office/marketplace-apply/route.ts`)
    that emails a request for review through Resend. Uses the same env values as the contact form
    (`RESEND_API_KEY`, optional `CONTACT_EMAIL`); without the key it returns 503, sends nothing, and the form
    tells the visitor to email instead. No endpoint addresses are published.
  - `lib/front-office.ts` holds the name (a codename), paths, summary and status labels, so a rename is one line.
  - Sitemap rows for the new pages; Front Office entries in `public/llms.txt`.
  **Why:** Johnny, 2026-11-14: host the Front Office pages on formaticsystems.com for now, starting with
  features, help docs and a developer page where other platforms can ask to be listed. Public-tier content
  only; anything not built is marked "Coming".

### Changed
- 2026-11-15 — The Front Office card on the home page reads its title from `lib/front-office.ts` and now has
  a link to `/front-office`. **Why:** the card had no destination, and the name is a codename.

### Changed
- 2026-10-27 — **Admin console spec v1 marked superseded.** Johnny approved it. The approved v2
  and the Phase 1 plan now live in the new `formatic-console` repo
  (`C:\Users\John Torres\Documents\GitHub\formatic-console`). **Why:** spec decision D3 says
  the console does not live in this public marketing repo.

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
- 2026-10-26 — **Spec draft: Formatic Admin Console + Formatic Core**
  (`docs/superpowers/specs/2026-10-26-formatic-admin-console-design-v1.md`).
  **Why:** Johnny skipped the brainstorm questions and asked for a spec to react to. It takes
  Claude's calls on D1–D6 (Core owns billing; one Stripe account, a product per app; new
  `formatic-console` repo; link accounts now, shared login later; Phases 1–2 first;
  `admin.formaticsystems.com`). Draft only, awaiting approval; nothing built.
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
