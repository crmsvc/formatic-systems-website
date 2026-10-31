# formatic-systems-website — CLAUDE.md

This repo follows the Second-Brain standard; `PROJECT_LOG.md` is the source of truth. Read it first, update it before you stop.

- Every source commit updates `CHANGELOG.md` (enforced by `.githooks/pre-commit` + `.github/workflows/changelog-check.yml`).
- `main` auto-deploys to formaticsystems.com on Vercel — work on a branch; push to `main` only with Johnny's OK.
- Look: Syne font, amber/stone token system in `app/globals.css` (shared with the Labs page). No new design language.

## SEO tooling — claude-seo is primary (added 2026-10-31)
For any SEO work on this site (audits, technical/local/schema/GEO checks, content briefs, Search Console,
drift between audits), use the **claude-seo** plugin (`claude-seo:*` skills, github.com/AgriciDaniel/claude-seo).
It is enabled in `.claude/settings.json`, so it loads in local **and** cloud sessions. Start with
`claude-seo:seo` (full audit) or a sub-skill (`seo-local`, `seo-schema`, `seo-technical`, `seo-geo`,
`seo-google`, `seo-drift`). Other SEO skill sets are fallbacks only, for gaps claude-seo doesn't cover.
Cloud session: if a claude-seo script fails on a missing Python module, run `pip install -r requirements.txt`
from the plugin's folder under `~/.claude/plugins/`, then retry.
