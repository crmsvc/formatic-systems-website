# formatic-systems-website — Project Log
> SINGLE SOURCE OF TRUTH. Read this first. Update it before you stop.

## Current state (one glance)
- Status: Live marketing site (Next.js + Tailwind v4, Syne font, amber/stone tokens): home page, a static Labs page, a ProjectPix card, and (since 2026-11-08) a ReferralPro card, the temporary `/referralpro` page and `/sitemap.xml`. All on `main` and deployed. Branch `docs/admin-console-spec` merged into `main` 2026-11-08 (docs only).
- Last session: 2026-11-11 on CC (admin-console go-live; that work lives in formatic-console)
- Live URLs / key IDs: https://formaticsystems.com (Vercel, auto-deploys `main`); https://formaticsystems.com/referralpro; Labs page https://formaticsystems.com/lab/culture (`public/lab/culture.html`); GitHub `crmsvc/formatic-systems-website`
- **Branch waiting for review (2026-11-15):** `claude/front-office-pages-7ba3a8`, a pull request against `main`, NOT merged: the first Front Office section (`/front-office`, `/front-office/docs`, `/front-office/developers`). Merging deploys it; that is Johnny's call.
- Next action: Johnny reviews the Front Office pull request (wording, and the judgement calls in the 2026-11-15 session entry); tell the ReferralPro session the formaticsystems.com page is live (avoid a duplicate build); later, swap the ReferralPro name/domain when decided.

## Open items / decisions pending
- [ ] **Front Office pages: Johnny's review and merge** (branch `claude/front-office-pages-7ba3a8`). Decisions for him: (1) whether a platform that asks for a Marketplace listing is listed after his review (built this way, the unconfirmed default) or automatically; (2) the Front Office build spec says its public site never shows the codename, yet this site shows "Front Office" on the card and now on three pages, so either accept that for now or give a public name (one line in `lib/front-office.ts`, plus the Front Office lines in `public/llms.txt`; the route folder `app/front-office/` would need a rename and a redirect); (3) confirm `RESEND_API_KEY` is set for Vercel Preview as well as Production, or the two forms only send on production.
- [ ] Front Office help docs were checked against the Front Office build as of 2026-11-15 (Phases 0 to 5 built, on sample data). When a phase lands there, update the status tags: the features in `app/front-office/page.tsx` and `status` in each file under `content/front-office-docs/`.
- [ ] ReferralPro is a **working name**. To rename, edit `lib/referralpro.ts` (card, page, metadata, sitemap read from it) and the ReferralPro lines in `public/llms.txt`. When it gets its own domain, point the card CTA there and 301 `/referralpro` to it.
- **Formatic Admin Console has moved out of this repo (2026-10-27).** The work lives in `formatic-labs/formatic-console`, locally at `C:\Users\John Torres\Documents\GitHub\formatic-console`; read its PROJECT_LOG. The v1 draft here (`docs/superpowers/specs/2026-10-26-formatic-admin-console-design-v1.md`) is superseded and carries a banner.
- [ ] The ReferralPro session hasn't been told the formaticsystems.com page is live; it may later start its own task to build it. Tell it before that happens.
- [ ] Turn on GitHub branch protection on `main` requiring the `changelog-check` workflow — Johnny — a GitHub setting, not done from CC.
- [ ] Hook note: Claude Code worktrees set a per-worktree `core.hooksPath` to the global `~/.githooks`, which overrides the repo's `.githooks`. Both gates enforce CHANGELOG.md, so commits are still gated. The main checkout uses `.githooks` (repo-local config). — info only.
- [ ] `README.md` is still the create-next-app boilerplate (it even says Geist) — anyone — low priority.

## Where everything lives (kills the "which file / which surface" problem)
- Roadmap: none yet (no ROADMAP.md)
- Backlog: this file's Open items
- Build spec / CLAUDE.md: `CLAUDE.md` (repo) + global `~/.claude/CLAUDE.md`
- Design docs: `guides/ui-ux-modernization-blueprint.md`, `guides/ui-ux-modernization-playbook.md`; AI subagent playbook `docs/AI-SUBAGENT-PLAYBOOK.md`
- Front Office section: name/paths `lib/front-office.ts`; pages `app/front-office/` (product page, `docs/`, `docs/[slug]/`, `developers/`); help articles `content/front-office-docs/` (one file each, listed in `index.ts`); shared header and status tag `components/front-office/section-shell.tsx`; forms `components/front-office/`; listing-request email route `app/api/front-office/marketplace-apply/route.ts`
- Product cards: `components/what-we-build.tsx`; ReferralPro page `app/referralpro/page.tsx` + name/links `lib/referralpro.ts`; sitemap `app/sitemap.ts`; Labs section: `components/philosophy.tsx`; AI index: `public/llms.txt`
- Handoffs in: `G:\My Drive\muse-deliverables\Formatic\CC-HANDOFF-*.md`

## Session log (newest first — never delete, only prepend)
### 2026-11-15 · CC · Claude (side session started by the Front Office planning session)
- **Done:** built the first Front Office section on branch `claude/front-office-pages-7ba3a8` (worktree `.claude/worktrees/front-office-pages-7ba3a8`), pushed, a pull request opened against `main`, **not merged**.
  - `/front-office`: product page, twelve features tagged "Built, in testing" or "Coming", "Tell me when it's ready" form (posts to the existing `/api/contact`).
  - `/front-office/docs` + five articles: what it is and how it answers; who it talks to and approvals; connecting your tools; setting up agents (coming); after hours (coming).
  - `/front-office/developers`: connecting through a remote MCP server, what makes a tool easy to approve, "Ask to be listed" form → `app/api/front-office/marketplace-apply/route.ts` (Resend).
  - Home card links to `/front-office`; sitemap and `public/llms.txt` updated; name and paths in `lib/front-office.ts`.
- **Facts came from** the Front Office repo at `origin/main` (build spec v2.0, addendum 02, owner-app design, PROJECT_LOG Streams table). No text was copied and nothing in that repo was touched. Built there as of today: Phases 0 to 5 (calls, texts, web chat, dashboard, connectors, add-your-own MCP server), all on sample data. Not built: agents area, outbound, call rules and after-hours, owner phone app, Jobber and Housecall Pro.
- **Judgement calls (Claude's, for Johnny to confirm):**
  1. A listing request goes to a person for review; nothing is automatic. This is the recommended default, not a decision Johnny has made.
  2. Help articles are typed data files (`content/front-office-docs/*.ts`), not Markdown: the repo had no content pattern and no Markdown package, and this adds no dependency.
  3. The route is `/front-office` (the codename), following `/referralpro`. The build spec says the product's own public site never shows the codename; this site already did on the home card.
  4. "Built, in testing" is used for what exists on sample data; the pages say plainly that no business uses it.
  5. The "tell me when it's ready" form reuses `/api/contact` rather than a new route.
  6. The developer page says a tool whose description changes is switched off until the owner reviews it again. A platform sees this and must plan for it, so it was treated as public; remove it if Johnny counts it as security design.
  7. The receptionist's default name and the details of the customer check (what is asked, codes, lockout length) are left out as internal.
  8. Jobber and Housecall Pro appear only as "planned". A short line says naming a product does not mean endorsement.
  9. No nav or footer link was added; the card is the entry point, as with ReferralPro. Each Front Office page has its own three-link section menu.
  10. The listing form has a hidden trap field for scripts and checks formats only; there is no rate limit (the site has no store for one).
- **Verified:** `npm run build` passes (routes `/front-office`, `/front-office/docs`, five article pages, `/front-office/developers`, `/api/front-office/marketplace-apply`); ESLint clean on the new files; pages return 200 and an unknown article 404; no sideways scroll at 375px on the three page types; the listing route returns 400 on bad input and 503 with no key.
- **Not verified:** a real email send (no `RESEND_API_KEY` on this machine); whether the key is set for Vercel Preview; the light theme (only dark was looked at; the pages use the shared tokens). The Hattip rename handoff was left alone as instructed.
- **Docs created/moved:** none besides code. No supersessions.
- **Next:** Johnny reviews the pull request and decides the three items at the top of Open items.
### 2026-11-11 · CC · Claude (admin-console session)
- Done: no site changes in this repo. This session started here, but the console work lives in `C:\Users\John Torres\Documents\GitHub\formatic-console`:
  - Phase 1 was built and reviewed.
  - The Supabase project `formatic-core` was created ($10/mo, approved).
  - Johnny saved the production keys in `formatic-console\.env.production.local`. Both are verified working.
- Decision: Upstash rate limiting is skipped for now (only app servers holding a secret key reach Core's intake).
- Docs created/moved: none here. The console log is `formatic-console\PROJECT_LOG.md`.
- Next (in formatic-console): Johnny sets the Supabase Auth settings and OKs merging `feat/phase-1` → `main`. Then Claude creates the Vercel project for `admin.formaticsystems.com`.
### 2026-11-08 (session close) · CC · Claude
- Done (whole session): built + shipped the temporary ReferralPro page and card (`main` fa64a64); checked no conflict with the ReferralPro session; merged `docs/admin-console-spec` into `main` (1dc60c0); main checkout now on `main`. Live: https://formaticsystems.com/referralpro.
- Decisions: Johnny approved both pushes to `main`. "ReferralPro" stays as the working name for now.
- Docs created/moved: none this close. Leftovers: worktree `.claude/worktrees/referralpro` (branch `feat/referralpro-page-2026-11-08`, fully merged) can be removed; `AGENTS.md` and `.claude/` are untracked in the main checkout (pre-existing, not touched).
- Next: tell the ReferralPro session the formaticsystems.com page is live so it doesn't build a duplicate.
### 2026-11-08 (merge) · CC · Claude
- Done: merged branch `docs/admin-console-spec` into `main` (Johnny: "merge it"). Brings in the admin-console spec v1 (`docs/superpowers/specs/2026-10-26-formatic-admin-console-design-v1.md`, superseded banner) and the 2026-10-26/27 log and changelog entries. Resolved PROJECT_LOG/CHANGELOG conflicts by keeping both sides; no site code changed.
- Decisions: none new.
- Docs created/moved: none.
- Next: nothing queued here.
### 2026-11-08 (later) · CC · Claude
- Done: checked for conflict with the ReferralPro session (`ReferralPro - MAIN`). None: it works only in the ReferralPro repo; its "trademark: use ReferralPro on a public page?" question was already answered by Johnny ("fine for the test run", ReferralPro commit dd61dfb) and this site follows it. Confirmed live: formaticsystems.com/referralpro 200, home card present, main at fa64a64.
- Decisions: none new. Account/dashboard pages live in the ReferralPro app, not on this site; only the landing page belongs here.
- Docs created/moved: none.
- Open: the ReferralPro session may later spin up its own "build the formaticsystems.com page" task; it has not been told the page is live (offered to Johnny, not sent). Its app has a `/pricing` page that may conflict with "no pricing until launch" (unchecked; ReferralPro session's call).
- Next: decide the fate of branch `docs/admin-console-spec`.
### 2026-11-08 · CC · Claude (from the ReferralPro session's handoff)
- **Done:** built the temporary ReferralPro presence from `claude-deliverables\Formatic\ReferralPro\CC-HANDOFF-2026-11-08-formatic-site-referralpro-landing-page.md`: a ReferralPro card (lucide `Gift`, after ProjectPix, "Join the waitlist →" to `/referralpro`); new page `app/referralpro/page.tsx` (hero with Private beta tag, What it does ×4, Who it's for, In a private test, closing CTA; primary button to `https://referralpro-formatic-labs.vercel.app/beta?ref=formaticsystems`, small "Already invited? Sign in" link); `lib/referralpro.ts` holds the name and URLs.
- **Judgement calls:** six cards now, so "Open Resources" lost `wide`. Card CTAs that are on-site use `next/link` (same tab); external ones still open a new tab. The nav brand now links to `/` so sub-pages have a way home. Added `app/sitemap.ts` (site had none: `/`, `/referralpro`, `/lab/culture`) and ReferralPro entries in `public/llms.txt`. No nav or footer link for ReferralPro — the card is the entry point, same as ProjectPix.
- **Rules kept:** no pricing, no public-availability promise, no customer names, industry-neutral copy.
- **Verified:** `npm run build` passes (new routes `/referralpro`, `/sitemap.xml`); checked both pages in the browser at desktop and 375px (no horizontal scroll). The only ESLint error is pre-existing in `components/theme-toggle.tsx`.
- **Docs:** none created/moved besides code; branch `feat/referralpro-page-2026-11-08` (worktree `.claude/worktrees/referralpro`).
- **Merged:** Johnny approved ("Yes, merge and push"); fast-forwarded to `main`, which deploys.
- **Next:** nothing queued here.

### 2026-11-08 · CC · Claude
- Done: built and shipped the temporary ReferralPro page + card from the ReferralPro handoff (`app/referralpro/page.tsx`, `lib/referralpro.ts`, card in `components/what-we-build.tsx`, `app/sitemap.ts`, `public/llms.txt`, nav brand links home). Build passed; verified live at formaticsystems.com/referralpro and /sitemap.xml.
- Decisions: Johnny approved the merge ("Yes, merge and push"); fast-forwarded `feat/referralpro-page-2026-11-08` to `main` (fa64a64). No nav/footer link for ReferralPro; the card is the entry point.
- Docs created/moved: none beyond code; CHANGELOG.md + PROJECT_LOG.md updated on `main`. Handoff read from `G:\.shortcut-targets-by-id\1nfbqpU3qns0K45KAMBSfDdT0RxLYRsuA\claude-deliverables\Formatic\ReferralPro\CC-HANDOFF-2026-11-08-formatic-site-referralpro-landing-page.md`. Worktree `.claude/worktrees/referralpro` still exists (can be removed).
- Next: decide the fate of branch `docs/admin-console-spec`.
### 2026-10-31 · Claude Code (local, from the GitHub-root session) · Claude + Johnny — claude-seo enabled
- `.claude/settings.json` enables the **claude-seo** plugin (AgriciDaniel/claude-seo) so it loads in local and cloud sessions; CLAUDE.md → "SEO tooling" makes it the primary SEO tool. Rule (Johnny, 2026-10-31): one best SEO tool by default. No site code changed.
### 2026-10-27 · CC · Claude
- **Done:** Johnny approved the admin-console spec. He said there is no chance of selling an app separately (so one Stripe account), the 72-hour fallback is fine, and support may grant access. Created the `formatic-console` repo with spec v2 and the Phase 1 plan, and put a superseded banner on v1 here.
- **Supersession:** `docs/superpowers/specs/2026-10-26-formatic-admin-console-design-v1.md` is replaced by `formatic-console/docs/superpowers/specs/2026-10-27-formatic-admin-console-design-v2.md`.
- **Next:** in this repo, nothing for the console. The ProjectPix card merge is still pending.
### 2026-10-26 · CC · Claude
- Done: read the admin-console hand-off; Johnny skipped the brainstorm questions; wrote spec draft v1 (two pieces: Formatic Core + Admin Console, plus the `@formatic-labs/entitlements` package; data model, access resolution, Stripe flow, app API, 2FA console, 5 phases).
- Decisions: none by Johnny yet. Claude's calls on D1–D6 recorded in spec §4, marked as such.
- Docs created: `docs/superpowers/specs/2026-10-26-formatic-admin-console-design-v1.md`; copy at `G:\.shortcut-targets-by-id\1nfbqpU3qns0K45KAMBSfDdT0RxLYRsuA\claude-deliverables\Formatic\2026-10-26-formatic-admin-console-design-v1.md`.
- Next: Johnny's edits/approval on the spec.
### 2026-10-25 · CC · Claude (from the ProjectPix web session's handoff)
- Done: ran the Second-Brain rollout (PROJECT_LOG.md, CHANGELOG.md, CLAUDE.md pointer, ROLLOUT-CHECKLIST.md, `.githooks/pre-commit`, `.github/workflows/changelog-check.yml`, `core.hooksPath=.githooks`). Added a ProjectPix card (after Front Office, waitlist CTA → projectpix.io) and a ProjectPix entry in `llms.txt`.
- Decisions: Front Office appears only in the home "What We Build" grid and `llms.txt` (no product page, not on the Labs page), so ProjectPix was added to those two places only. Copy limited to shipped features; no CRM Services mention; no integrations/desktop/dev-site/pricing claims (handoff rules).
- Docs created/moved: `PROJECT_LOG.md`, `CHANGELOG.md`, `CLAUDE.md`, `ROLLOUT-CHECKLIST.md` (copied from `master-brain/standards/`) → repo root.
- Next: Johnny's OK to merge to `main`.
