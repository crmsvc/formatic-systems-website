# formatic-systems-website — Project Log
> SINGLE SOURCE OF TRUTH. Read this first. Update it before you stop.

## Current state (one glance)
- Status: Live single-page marketing site (Next.js + Tailwind v4, Syne font, amber/stone tokens) plus one static Labs page. Branch `feat/projectpix-on-site-2026-10-25` adds a ProjectPix card + the Second-Brain files; **not merged / not pushed to `main`**.
- Last session: 2026-10-25 on CC
- Live URLs / key IDs: https://formaticsystems.com (Vercel, auto-deploys `main`); Labs page https://formaticsystems.com/lab/culture (`public/lab/culture.html`); GitHub `crmsvc/formatic-systems-website`
- Next action: Johnny reviews the ProjectPix card screenshot → OK to merge the branch into `main` (which deploys).

## Open items / decisions pending
- [ ] Merge the ProjectPix + instrumentation branch to `main` — Johnny — push to `main` deploys to production.
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
### 2026-10-25 · CC · Claude (from the ProjectPix web session's handoff)
- Done: ran the Second-Brain rollout (PROJECT_LOG.md, CHANGELOG.md, CLAUDE.md pointer, ROLLOUT-CHECKLIST.md, `.githooks/pre-commit`, `.github/workflows/changelog-check.yml`, `core.hooksPath=.githooks`). Added a ProjectPix card (after Front Office, waitlist CTA → projectpix.io) and a ProjectPix entry in `llms.txt`.
- Decisions: Front Office appears only in the home "What We Build" grid and `llms.txt` (no product page, not on the Labs page), so ProjectPix was added to those two places only. Copy limited to shipped features; no CRM Services mention; no integrations/desktop/dev-site/pricing claims (handoff rules).
- Docs created/moved: `PROJECT_LOG.md`, `CHANGELOG.md`, `CLAUDE.md`, `ROLLOUT-CHECKLIST.md` (copied from `master-brain/standards/`) → repo root.
- Next: Johnny's OK to merge to `main`.
