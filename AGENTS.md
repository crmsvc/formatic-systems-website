# formatic-systems-website — AGENTS.md

This repo follows the Second-Brain standard; `PROJECT_LOG.md` is the source of truth. Read it first, update it before you stop.

- Every source commit updates `CHANGELOG.md` (enforced by `.githooks/pre-commit` + `.github/workflows/changelog-check.yml`).
- `main` auto-deploys to formaticsystems.com on Vercel — work on a branch; push to `main` only with Johnny's OK.
- Look: Syne font, amber/stone token system in `app/globals.css` (shared with the Labs page). No new design language.

## SEO tooling: claude-seo is primary (added 2026-10-31)
SEO work on this site (audits, technical/local/schema/GEO checks, content briefs, Search Console,
drift between audits) is done with the **claude-seo** plugin (`claude-seo:*` skills,
github.com/AgriciDaniel/claude-seo). It is a Claude Code plugin, enabled in `.claude/settings.json`, so it
loads in Claude Code sessions (local and cloud). There is no "Codex-seo" plugin and no `.Codex/` folder in
this repo; do not look for them.

If you are an agent that cannot load Claude Code plugins (Codex, for example): do not run a different SEO
tool set in its place. Leave SEO audits to a Claude Code session and say so in your hand-off. Ordinary
edits that touch SEO files (`app/sitemap.ts`, `public/llms.txt`, page metadata) are fine; keep them
consistent with what is already there.
