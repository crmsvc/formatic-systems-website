# Formatic Systems — AI Subagent Playbook

**Purpose:** Which `agency-agents` subagents to use for **building the Formatic SaaS products** (HomeWatch/FormaticHS, ReferralPro, Fridge to Plate, Voice-AI, RAG Digestor) and for running the **Formatic Works / Formatic Labs marketing + content engine** across all properties.

- **Catalog source:** `C:\Users\JohnTorres\agency-agents-app` (17 divisions / 251 agents)
- **Install path (manual):** copy the persona `.md` into the target agents dir, rewriting frontmatter to `name:` (slug) + `description:`. Restart the tool to pick up new agents.
- **Scope rule — important:**
  - **Build teams → project-scoped:** install into `<repo>/.claude/agents/` (e.g. `homewatch-platform/.claude/agents/`) so each app gets exactly its bench and nothing leaks between projects.
  - **Marketing/content/GTM → global** (`~/.claude/agents/`): reused across every property + CRM.
- **Companion doc:** CRM growth agents → `crmservices_website/web/docs/AI-SUBAGENT-PLAYBOOK.md`.
- **Overlap check:** the `marketing-skills` plugin already covers `social`, `content-strategy`, `copywriting`, `emails`, `seo-audit`, `ai-seo`, `launch`, etc. Only install a marketing persona when you want its *specific voice/depth*, not to duplicate a skill.

---

## 1) App build teams (project-scoped per repo)

### Design (installed globally today — move/copy into each app repo as needed)
| Agent | Role on a build |
|---|---|
| `ux-architect` ⭐ | Spec → CSS systems, layout frameworks, implementation guidance. |
| `ui-designer` ⭐ | Visual design system, component library, pixel-perfect UI. |
| `brand-guardian` ⭐ | Consistency across Formatic / FormaticHS / whitelabel tenants. |
| `persona-walkthrough` | CRO — "becomes the user," scroll-by-scroll conversion report (signup/landing). |
| `ux-researcher` | Usability testing + validation once you have users. |
| `whimsy-injector` | Delight/micro-interactions — late-stage polish. |

### Engineering
| Agent | Role |
|---|---|
| `software-architect` ⭐ | System design, DDD, architectural decisions (multi-tenant HomeWatch). |
| `backend-architect` ⭐ | Scalable APIs, DB architecture, cloud infra. |
| `frontend-developer` ⭐ | React/Vue/Next UI implementation. |
| `mobile-app-builder` ⭐ | **ReferralPro native field-tech app** (iOS/Android/cross-platform). |
| `rapid-prototyper` | Fast MVP/proof-of-concept spikes — fits your 8-week MVP cycle. |
| `database-optimizer` | Postgres/Supabase schema + query tuning. |
| `devops-automator` | CI/CD, infra automation (Vercel/Supabase). |
| `ai-engineer` | ML features (photo-organizer Haiku pipeline, HomeWatch smart features). |
| `voice-ai-integration-engineer` | **Voice-AI project** — Whisper/ASR speech pipelines. |
| `prompt-engineer` | Production-grade prompt hardening for any AI feature. |
| `senior-developer` | Premium implementation muscle. |
| `minimal-change-engineer` | Surgical diffs, no scope creep (your standing rule). |
| `code-reviewer` | Correctness/security/maintainability review. |
| `git-workflow-master` | Conventional commits, worktrees, branch strategy. |
| `technical-writer` | API docs, READMEs, tenant onboarding guides. |
| `cms-developer` | If any property uses WordPress/Drupal. |

### Testing / QA (the "critics" — pair with builders)
| Agent | Role |
|---|---|
| `reality-checker` ⭐ | Defaults to "NEEDS WORK," demands proof for production readiness. |
| `evidence-collector` ⭐ | Screenshot-obsessed QA — visual proof for everything. |
| `accessibility-auditor` | WCAG compliance on the portal UI. |
| `performance-benchmarker` | Load/perf across the app. |
| `api-tester` | API validation + third-party integration testing (FSM integrations). |
| `test-results-analyzer` | Turns test runs into actionable quality metrics. |

### Security (multi-tenant SaaS = non-negotiable)
| Agent | Role |
|---|---|
| `security-architect` ⭐ | Threat modeling, trust boundaries, secure-by-design (tenant isolation). |
| `application-security-engineer` | Secure SDLC, SAST/DAST, secure code review. |
| `senior-secops-engineer` | Secrets/PII scanning on every submission. |
| `compliance-auditor` | SOC 2 / HIPAA readiness — matters for selling SaaS to businesses. |
| `penetration-tester` | Authorized pen-tests before launch. |

### Product & delivery
| Agent | Role |
|---|---|
| `product-manager` ⭐ | Full lifecycle: discovery → roadmap → GTM → outcomes. |
| `sprint-prioritizer` ⭐ | Feature prioritization, disciplined scope (anti feature-bloat). |
| `trend-researcher` | Market/competitive intel (ReferralPro/EstimatorHub landscape). |
| `feedback-synthesizer` | Turn user feedback into product insight. |
| `behavioral-nudge-engine` | Engagement/retention nudges in-product. |
| `senior-project-manager` | Spec → tasks, realistic scope, remembers prior projects. |
| `experiment-tracker` | A/B tests + feature experiments. |

---

## 2) Marketing & content engine (global — Formatic Works / Labs)

These are what you pass over from CRM planning — the **content creation + repurposing** machine that markets *all* properties (and CRM as a client).

| Agent | Use case | Note |
|---|---|---|
| `content-creator` | Multi-platform editorial calendars, brand storytelling. | Overlaps `content-strategy` skill — use for persona depth. |
| `social-media-strategist` | Cross-platform (LinkedIn/X) campaigns, repurposing. | Overlaps `social` skill. |
| `linkedin-content-creator` ⭐ | Thought leadership — **selling Formatic SaaS B2B to contractors.** | Additive. |
| `video-optimization-specialist` ⭐ | **Formatic Labs YouTube** — retention, chapters, thumbnails, syndication. | Additive. |
| `reddit-community-builder` | Launch/community (r/SaaS, r/Entrepreneur) — 90/10 rule. | Additive. |
| `twitter-engager` | Build-in-public threads for the SaaS builds. | Additive. |
| `growth-hacker` | Viral loops, funnel optimization, activation. | SaaS growth. |
| `email-marketing-strategist` | Lifecycle/nurture/win-back sequences. | Overlaps `emails` skill — deeper on lifecycle. |
| `app-store-optimizer` ⭐ | ASO for ReferralPro field app + Fridge to Plate PWA. | Additive. |
| `pr-communications-manager` | Product PR + milestone press. | Also in CRM doc. |
| `ai-citation-strategist` / `aeo-foundations-architect` | Get Formatic products cited by AI engines. | Also in CRM doc. |
| `book-co-author` / `global-podcast-strategist` | Long-game thought leadership. | Optional. |

---

## 3) Go-to-market / sales (when Formatic products hit market)

Selling subscription SaaS to home-service contractors:

| Agent | Use case |
|---|---|
| `offer-lead-gen-strategist` ⭐ | Irresistible offers + lead magnets (value-equation). |
| `outbound-strategist` | Signal-based multi-channel prospecting to contractors. |
| `sales-engineer` | Demo engineering, POC scoping, battlecards. |
| `deal-strategist` | MEDDPICC qualification for bigger accounts. |
| `proposal-strategist` | Win narratives for agency/whitelabel deals. |
| `pipeline-analyst` | Pipeline health + forecast once deals flow. |
| `discovery-coach` / `sales-coach` / `account-strategist` | Team enablement + expansion later. |

---

## 4) Strategy & operations
| Agent | Use case |
|---|---|
| `business-strategist` (specialized) | Positioning, market-entry, portfolio calls across Formatic. |
| `specialized-chief-of-staff` | Cross-project orchestration, exec leverage. |
| `pricing-analyst` (specialized) ⭐ | **ReferralPro pricing finalization** (a current Phase-0 blocker). |
| `fp&a-analyst` / `financial-analyst` | SaaS unit economics, MRR modeling. |
| `mcp-builder` (specialized) | If you build MCP servers for the product ecosystem. |
| `specialized-salesforce-architect` / `workflow-architect` | FSM/CRM integration design for ReferralPro. |

---

## 🚫 Skip
`game-development` (21 game agents), `academic` (fiction worldbuilding), `spatial-computing` (XR/VisionOS), all China-platform agents (WeChat/Feishu/Douyin/Baidu/etc.), `solidity`/blockchain — unless a specific product pivots into that space.

---

## How to run a build team
Cast a team, not a soloist, and make the loop exit on **evidence**:

> "Use `ux-architect`, `ui-designer`, and `frontend-developer` as a team to build the HomeWatch tenant dashboard shell. Have `reality-checker` and `accessibility-auditor` verify — browser, functional, and a11y. Don't stop until every gate passes; show me proof for each."
