# formatic-systems-website — Project Log
> SINGLE SOURCE OF TRUTH. Read this first. Update it before you stop.

## Current state (one glance)
- Status: Live marketing site: home page, Labs page, ProjectPix card, and (since 2026-11-08) a ReferralPro card plus the `/referralpro` page and `/sitemap.xml`. All on `main` (fa64a64) and deployed.
- Last session: 2026-11-08 on CC
- Live URLs / key IDs: https://formaticsystems.com (Vercel, auto-deploys `main`); https://formaticsystems.com/referralpro; https://formaticsystems.com/lab/culture; GitHub `crmsvc/formatic-systems-website`
- ⚠ This copy of the log is on branch `docs/admin-console-spec`, which is behind `main`. The `main` copy of PROJECT_LOG.md has the full 2026-11-08 entry; merge `main` into this branch (or this branch into `main`) to reunite them.
- Next action: decide whether `docs/admin-console-spec` (spec v1 + superseded banner, docs only) merges to `main` or is deleted.

## Open items / decisions pending
- **Formatic Admin Console has moved out of this repo (2026-10-27).** Johnny approved the spec. The work now lives in `formatic-labs/formatic-console`, locally at `C:\Users\John Torres\Documents\GitHub\formatic-console`; read its PROJECT_LOG. The v1 draft here is superseded and carries a banner.
- [ ] Merge or delete branch `docs/admin-console-spec` (docs only; the console lives in `formatic-console`) — Johnny.
- [ ] ReferralPro is a working name: rename via `lib/referralpro.ts` + `public/llms.txt`; when it gets its own domain, repoint the card and 301 `/referralpro`.
- [ ] Turn on GitHub branch protection on `main` requiring the `changelog-check` workflow — Johnny — a GitHub setting, not done from CC.
- [ ] Hook note: Claude Code worktrees set a per-worktree `core.hooksPath` to the global `~/.githooks`, which overrides the repo's `.githooks`. Both gates enforce CHANGELOG.md, so commits are still gated. The main checkout uses `.githooks` (repo-local config). — info only.
- [ ] `README.md` is still the create-next-app boilerplate (it even says Geist) — anyone — low priority.

## Where everything lives (kills the "which file / which surface" problem)
- Roadmap: none yet (no ROADMAP.md)
- Backlog: this file's Open items
- Build spec / CLAUDE.md: `CLAUDE.md` (repo) + global `~/.claude/CLAUDE.md`
- Design docs: `guides/ui-ux-modernization-blueprint.md`, `guides/ui-ux-modernization-playbook.md`; AI subagent playbook `docs/AI-SUBAGENT-PLAYBOOK.md`
- Product cards: `components/what-we-build.tsx`; Labs section: `components/philosophy.tsx`; AI index: `public/llms.txt`
- Handoffs in: `G:\My Drive\muse-deliverables\Formatic\CC-HANDOFF-*.md`

## Session log (newest first — never delete, only prepend)
### 2026-11-08 · CC · Claude
- Done: built and shipped the temporary ReferralPro page + card from the ReferralPro handoff (`app/referralpro/page.tsx`, `lib/referralpro.ts`, card in `components/what-we-build.tsx`, `app/sitemap.ts`, `public/llms.txt`, nav brand links home). Build passed; verified live at formaticsystems.com/referralpro and /sitemap.xml.
- Decisions: Johnny approved the merge ("Yes, merge and push"); fast-forwarded `feat/referralpro-page-2026-11-08` to `main` (fa64a64). No nav/footer link for ReferralPro; the card is the entry point.
- Docs created/moved: none beyond code; CHANGELOG.md + PROJECT_LOG.md updated on `main`. Handoff read from `G:\.shortcut-targets-by-id\1nfbqpU3qns0K45KAMBSfDdT0RxLYRsuA\claude-deliverables\Formatic\ReferralPro\CC-HANDOFF-2026-11-08-formatic-site-referralpro-landing-page.md`. Worktree `.claude/worktrees/referralpro` still exists (can be removed).
- Next: decide the fate of branch `docs/admin-console-spec`.
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
