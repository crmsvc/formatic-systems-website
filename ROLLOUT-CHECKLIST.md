# Second-Brain Rollout Checklist
### Drop this file into every repo. Run it once per venture. If it isn't done, the CLAUDE.md guardrail (§4B of the operating standard) will remind you.

---

## Per-venture setup (do once)

- [ ] **1. Repo exists.** For idea-stage ventures with no code, create a markdown-only repo (or keep the log in the venture's cloud Chat Project until it earns one).
- [ ] **2. Add the two logs** at repo root:
  - `PROJECT_LOG.md` (from the operating-standard §3 template — fill the `<...>` with the project name and current state)
  - `CHANGELOG.md` (Keep-a-Changelog format)
- [ ] **3. Add the CLAUDE.md block** (operating-standard §4B) — includes the **instrumentation guardrail** that reminds you if a repo is ever missing its logs/hook.
- [ ] **4. Install the changelog gate:**
  - `.githooks/pre-commit` (operating-standard §5) → `chmod +x .githooks/pre-commit` → `git config core.hooksPath .githooks`
  - `.github/workflows/changelog-check.yml` → in GitHub, turn on branch protection **requiring** the `changelog-check`.
  - _Fastest: hand CC "install the §5 changelog gate" and it does all of the above._
- [ ] **5. Cloud Chat Project** (if the venture has one): paste the operating-standard **§4A protocol** into the Project's custom-instructions field.
- [ ] **6. CWS cockpit:** once you've chosen your CWS, add this repo to it (e.g. add the folder to your VS Code / Cursor multi-root workspace, or your Obsidian/agentic-OS vault) so it shows in your unified project nav.
- [ ] **7. Copy this `ROLLOUT-CHECKLIST.md`** into the repo so the next repo can't skip it.

## One-time, account-wide (do once, ever)

- [ ] **Save `/session-checkpoint` as an account skill** (Settings → Capabilities/Skills) → covers Chat + Cowork. _(Name it `session-checkpoint`, never `checkpoint` — reserved-name collision, see standard §7.)_
- [ ] **Drop `/session-checkpoint` in `~/.claude/skills/session-checkpoint/`** (global) → covers Claude Code in every repo.

## Priority order
Instrument **CRM Services** and **ProjectPix** first (most moving parts), then the rest.

---
_The guardrail is the safety net: even if you forget this checklist, the first CC session in an un-instrumented repo will stop and offer to run it._
