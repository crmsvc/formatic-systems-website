# formatic-systems-website — Project Log
> SINGLE SOURCE OF TRUTH. Read this first. Update it before you stop.

## Current state (one glance)
- Status: Live marketing site (Next.js + Tailwind v4, Syne font, amber/stone tokens): home page, a static Labs page, and a temporary `/referralpro` product page plus a ReferralPro card (merged to `main` 2026-11-08). ProjectPix card is already live on `main`.
- Last session: 2026-11-08 on CC
- Live URLs / key IDs: https://formaticsystems.com (Vercel, auto-deploys `main`); Labs page https://formaticsystems.com/lab/culture (`public/lab/culture.html`); ReferralPro page https://formaticsystems.com/referralpro; GitHub `crmsvc/formatic-systems-website`
- Next action: none queued for this site. Swap the ReferralPro name/domain when decided (see Open items).

## Open items / decisions pending
- [ ] ReferralPro is a **working name**. To rename, edit `lib/referralpro.ts` (card, page, metadata, sitemap read from it) and the ReferralPro lines in `public/llms.txt`. When it gets its own domain, point the card CTA there and 301 `/referralpro` to it.
- **Formatic Admin Console moved out of this repo (2026-10-27)** to `formatic-labs/formatic-console`; the spec v1 + supersession banner sit on branch `docs/admin-console-spec` here (not merged). Nothing to build here.
- [ ] Turn on GitHub branch protection on `main` requiring the `changelog-check` workflow — Johnny — a GitHub setting, not done from CC.
- [ ] Hook note: Claude Code worktrees set a per-worktree `core.hooksPath` to the global `~/.githooks`, which overrides the repo's `.githooks`. Both gates enforce CHANGELOG.md, so commits are still gated. The main checkout uses `.githooks` (repo-local config). — info only.
- [ ] `README.md` is still the create-next-app boilerplate (it even says Geist) — anyone — low priority.

## Where everything lives (kills the "which file / which surface" problem)
- Roadmap: none yet (no ROADMAP.md)
- Backlog: this file's Open items
- Build spec / CLAUDE.md: `CLAUDE.md` (repo) + global `~/.claude/CLAUDE.md`
- Design docs: `guides/ui-ux-modernization-blueprint.md`, `guides/ui-ux-modernization-playbook.md`; AI subagent playbook `docs/AI-SUBAGENT-PLAYBOOK.md`
- Product cards: `components/what-we-build.tsx`; ReferralPro page `app/referralpro/page.tsx` + name/links `lib/referralpro.ts`; sitemap `app/sitemap.ts`; Labs section: `components/philosophy.tsx`; AI index: `public/llms.txt`
- Handoffs in: `G:\My Drive\muse-deliverables\Formatic\CC-HANDOFF-*.md`

## Session log (newest first — never delete, only prepend)

### 2026-11-08 · CC · Claude (from the ReferralPro session's handoff)
- **Done:** built the temporary ReferralPro presence from `claude-deliverables\Formatic\ReferralPro\CC-HANDOFF-2026-11-08-formatic-site-referralpro-landing-page.md`: a ReferralPro card (lucide `Gift`, after ProjectPix, "Join the waitlist →" to `/referralpro`); new page `app/referralpro/page.tsx` (hero with Private beta tag, What it does ×4, Who it's for, In a private test, closing CTA; primary button to `https://referralpro-formatic-labs.vercel.app/beta?ref=formaticsystems`, small "Already invited? Sign in" link); `lib/referralpro.ts` holds the name and URLs.
- **Judgement calls:** six cards now, so "Open Resources" lost `wide`. Card CTAs that are on-site use `next/link` (same tab); external ones still open a new tab. The nav brand now links to `/` so sub-pages have a way home. Added `app/sitemap.ts` (site had none: `/`, `/referralpro`, `/lab/culture`) and ReferralPro entries in `public/llms.txt`. No nav or footer link for ReferralPro — the card is the entry point, same as ProjectPix.
- **Rules kept:** no pricing, no public-availability promise, no customer names, industry-neutral copy.
- **Verified:** `npm run build` passes (new routes `/referralpro`, `/sitemap.xml`); checked both pages in the browser at desktop and 375px (no horizontal scroll). The only ESLint error is pre-existing in `components/theme-toggle.tsx`.
- **Docs:** none created/moved besides code; branch `feat/referralpro-page-2026-11-08` (worktree `.claude/worktrees/referralpro`).
- **Merged:** Johnny approved ("Yes, merge and push"); fast-forwarded to `main`, which deploys.
- **Next:** nothing queued here.

### 2026-10-31 · Claude Code (local, from the GitHub-root session) · Claude + Johnny — claude-seo enabled
- `.claude/settings.json` enables the **claude-seo** plugin (AgriciDaniel/claude-seo) so it loads in local and cloud sessions; CLAUDE.md → "SEO tooling" makes it the primary SEO tool. Rule (Johnny, 2026-10-31): one best SEO tool by default. No site code changed.
### 2026-10-25 · CC · Claude (from the ProjectPix web session's handoff)
- Done: ran the Second-Brain rollout (PROJECT_LOG.md, CHANGELOG.md, CLAUDE.md pointer, ROLLOUT-CHECKLIST.md, `.githooks/pre-commit`, `.github/workflows/changelog-check.yml`, `core.hooksPath=.githooks`). Added a ProjectPix card (after Front Office, waitlist CTA → projectpix.io) and a ProjectPix entry in `llms.txt`.
- Decisions: Front Office appears only in the home "What We Build" grid and `llms.txt` (no product page, not on the Labs page), so ProjectPix was added to those two places only. Copy limited to shipped features; no CRM Services mention; no integrations/desktop/dev-site/pricing claims (handoff rules).
- Docs created/moved: `PROJECT_LOG.md`, `CHANGELOG.md`, `CLAUDE.md`, `ROLLOUT-CHECKLIST.md` (copied from `master-brain/standards/`) → repo root.
- Next: Johnny's OK to merge to `main`.
