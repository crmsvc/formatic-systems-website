---
title: "CC-HANDOFF: Formatic Admin Console (one control center for every Formatic SaaS app)"
date: 2026-10-26
from: ProjectPix web session (Claude Code, worktree .claude/worktrees/landing-v1)
for: the Claude Code session that will brainstorm, spec and build the console
status: open — needs brainstorm + approved spec before any code
tier: internal
supersedes: nothing (first doc on this topic)
---

# CC-HANDOFF: Formatic Admin Console

> **Read first:** this is a hand-off, not a spec. The receiving session runs the brainstorming
> skill with Johnny, writes a committed spec, gets it approved, then builds. Nothing below is
> approved except what is marked **Johnny said**. Everything marked *recommendation* is Claude's
> call and is open for Johnny to change.

## 1. The vision (Johnny's words, 2026-10-26)

**Johnny said:**

- "Creating an 'admin/dev' page for the entire project (with login) is ultimately what should be
  created. This allows full functionality for user subscriptions and accounts."
- "We are at this step for this app and will be for the other platforms under development as
  well. Creating the 'foundation' for this and the other SaaS builds is ultimately what we
  should do."
- "Formatic Systems (formaticsystems.com) is ultimately the main parent company. All side
  development apps and platforms will have their own Stripe and subscriptions, but the full idea
  is to be able to have all platforms sync and integrate with each other."
- "If a subscriber of HomeWatch subscribes to ProjectPix, the feature turns from a 'greyed out'
  option to a fully functional feature. We need to be able to either automate this so the
  subscriber gets full access upon paying and/or we need to be able to manually toggle access on
  at the master level as well."

**In one line:** one Formatic-level control center where Johnny (and later staff) sees every
customer across every app, approves beta seats, manages plans and subscriptions, and turns
features on or off — automatically when someone pays, or by hand.

## 2. Why now

- ProjectPix just hit this wall. Its beta waitlist had no approval screen. On 2026-10-26 it got
  an interim `/admin/waitlist` page, gated by an email allowlist, with no 2FA (see §6.1).
- ReferralPro, HomeWatch, Formatic Works and the Formatic dashboard are each about to build
  their own accounts, plans and billing. Without a shared foundation, the same thing gets built
  five times and the apps can never unlock each other.
- The master blueprint already states the rule: **"One identity per tenant: each business has
  one account/number; products are modular skills hanging off it."**
  (`claude-deliverables\MASTER\MASTER_BUSINESS_BLUEPRINT.md` §2)

## 3. Scope

### Goals (what the console must do, end state)

1. **One login for the console**, platform staff only, **2FA required** (Johnny's standing
   policy: "For admin stuff we should use 2FA. For normal users, not required.")
2. **Every customer in one place:** a directory of businesses (accounts), the people in them, and
   which apps each one uses. Click into any app account to see its plan, status, seats and
   history.
3. **Beta / waitlist approvals for every app:** one queue, filterable by app. This also covers
   the sign-up alert email and an Approve button that sends the invite.
4. **Subscriptions:** see and manage plans, trials, coupons and comps per app.
5. **Entitlements (feature access):** one source of truth for "this account may use feature X of
   app Y". It is fed **automatically** by payments and **manually** by an admin toggle with a
   reason and an end date. Apps read it to grey a feature out or turn it on.
6. **Cross-app unlocks:** a HomeWatch account that also pays for ProjectPix sees its ProjectPix
   features turn on inside HomeWatch, and the other way round. Bundles are possible.
7. **Audit log:** every admin action (approve, grant, revoke, plan change, impersonation)
   recorded with who, when, what and why.
8. **Per-app operational screens** live inside the console as app tabs, through a small admin
   API that each app exposes. The console never reaches into an app's database directly
   (*recommendation*).

### Non-goals (for the first version)

- Rewriting each app's internal tenancy or roles. Apps keep their own tenants, teams and RLS.
- Moving app data (photos, jobs, calls) into the console.
- A customer-facing "Formatic account" portal. It may come later; the first version is staff only.
- Payroll, accounting or CRM features.

### Anti-goals (would be a failure even if it "works")

- **An app stops working when the console is down.** Apps must keep serving paying customers from
  a cached entitlement copy.
- **A feature is unlocked or locked silently with no audit trail.**
- **Client sites or tenants ever receive a platform token.** Same rule as the GitHub Packages
  playbook: clients never get tokens.
- **A customer pays and has to wait for Johnny** to turn something on. Automation is the default;
  manual toggles are the override.
- **Admin access without 2FA** once the console replaces the interim gates.

## 4. What already exists across the portfolio (build on it, don't redo it)

Source: a read-only sweep on 2026-10-26. Paths are relative to `C:\Users\John Torres\Documents\GitHub\`.

| App | Identity today | Billing / entitlements today | Admin concept | Reuse for the console |
|---|---|---|---|---|
| **ReferralPro** (Supabase `szzmmcziuyhlpumvblmz`) | Supabase Auth | **Most mature.** Tables `plans`, `plan_entitlements`, `tenant_entitlement_overrides`, `tenants.plan_key / stripe_customer_id / stripe_subscription_id` (`supabase\migrations\20261005000400_billing.sql`); code `lib\entitlements\` (`getEntitlements(tenantId)`), `lib\billing\`, `app\api\webhooks\stripe\route.ts`. Rule: "Plans and limits are data." | none | **Seed for the entitlements data model and the "ask getEntitlements" pattern.** Also has a `beta_allowlist` with `app` column. |
| **HomeWatch** (Supabase `lltkoxkaiokvpdovzrkt`) | Supabase Auth | Spec: Stripe Connect for tenant revenue + a **separate platform Stripe for tenant subscriptions** (`tenants.platform_tier` starter / growth / pro / enterprise). `docs\BUILD-SPEC-v2.0-phase2-2026-10-09.md` row 19, `docs\adr\ADR-009-subscription-contract-default.md`. | **Best design:** `platform_memberships(user_id, role: platform_admin / platform_support / platform_viewer)`, `is_platform_admin(uid)` in every RLS policy, **MFA required** for platform roles. `docs\BUILD-SPEC-v1.0-external-agent-2026-10-07.md`. Real code is on branches `codex/external-build-20261007`, `codex/phase2-portal-mvp-20261009` (main has only migration 001). | **Seed for platform roles + MFA matrix.** |
| **ProjectPix** (Supabase `qfjnahzaurlevxxabsqn`) | Supabase Auth | none (billing "None in MVP"); Stripe coupon idea in `docs\companycam-switch-offer-spec-v1-2026-10-18.md`. Backlog #25: sister-app connections "greyed out until the paid subscription is verified … Applies to every Formatic app." | **Interim** `src\lib\admin\platformAdmin.ts` (email allowlist) + `/admin/waitlist` + alert/invite emails (live 2026-10-26). | **First consumer.** Waitlist shape (`beta_allowlist`, `app` column, `UNIQUE(app,email)`, `approved_at`) is the pattern for a central queue. |
| **Front Office** | not built | Spec: Stripe metered billing on call minutes; premium $99–149/mo (`Formatic_AI_Front_Office_Build_Spec_v1.2.md` §10–11) | none | **Metered usage must fit the model** (not just on/off features). Note: STOP/suppression is global across products (blueprint). |
| **formatic-works-platform** | not built (`0002_portal_tenancy.sql` written, not applied) | ADR 0006: "this repo owns the site + tools + **billing**." Agency/client orgs, one level of `parent_org_id`. | agency_admin etc. (tenant-level) | **Ownership conflict, see §7 D1.** Agency → client hierarchy must be representable. |
| **formatic-systems-dashboard** (Supabase `lzswgzbvwsixvjwbield`) | Supabase Auth, orgs → users → sites | Stripe "Phase 3, not started" | none | Another consumer; may fold into Formatic Works (FW decision #9). |
| **formatic-media-engine** | none (Python) | `docs\PHASE-8-BUILD-SPEC-V1.md`: its own orgs/memberships + Stripe tiers. Marked OPEN CONFLICT. | none | Should consume the console, not build its own (reconcile with FW decision #6). |
| **formatic-systems-website** (this repo) | none | none (Resend contact form only) | none | Marketing site; auto-deploys `main`. |

**Facts worth knowing:**

- Every app has its **own Supabase project and its own login**. No SSO exists anywhere.
- `ProjectPix docs\HANDOFF-HomeWatch-Integration-Feature-Additions-2026-10-12.md` says *"No single
  sign-on: each platform keeps its own login."* **This contradicts Johnny's 2026-10-26
  direction.** Settle it in the spec and log the supersession in both repos.
- `@formatic-labs/*` GitHub Packages: only `local-business-mcp-server` v0.1.0 is published. **No
  auth, billing or entitlements package exists.**

## 5. Recommended architecture (*recommendation*: verify in research, decide in the spec)

```
                      ┌──────────────────────────────────────┐
  Stripe (one Formatic│  Formatic Core  (new Supabase project)│
  account, product    │  • accounts (businesses)              │
  per app) ─webhooks─▶│  • people + platform roles (MFA)      │
                      │  • app_links (account ↔ app tenant)   │
                      │  • features catalog, plans, bundles   │
                      │  • grants (stripe | manual | beta |   │
                      │    comp | trial) → effective access   │
                      │  • waitlist (all apps), audit log     │
                      └───────┬──────────────────▲────────────┘
            signed push +     │                  │ admin API (per app)
            pull with cache   ▼                  │
   ProjectPix · HomeWatch · ReferralPro · Front Office · Formatic Works · Dashboard
   (each keeps its own DB, tenants, roles; asks Core "may account A use feature F?")

   Admin Console (admin.formaticsystems.com) = UI over Core + the per-app admin APIs
```

1. **Formatic Core (control plane):** a new, small Supabase project that holds only
   cross-app facts: accounts, people, platform roles, app links, the feature catalog, plans,
   grants, the central waitlist and the audit log. No app data.
2. **Entitlements = grants, not flags:**
   - Each grant has a source (`stripe`, `manual`, `beta`, `comp`, `trial`), a start and end, a
     reason, and who granted it.
   - Effective access = the union of active grants.
   - Covers on/off features, numeric limits (seats, storage, call minutes) and metered usage.
   - Start from ReferralPro's `plans / plan_entitlements / tenant_entitlement_overrides` model
     and lift it to cross-app.
3. **Payments are automatic:**
   - Stripe webhooks write `stripe` grants.
   - Research **Stripe Entitlements** (features attached to products, with entitlement-summary
     webhooks) before hand-rolling the mapping.
   - Manual toggles in the console write `manual` grants that can override or extend.
4. **Apps consume through one package:** `@formatic-labs/entitlements`.
   - `can(accountId, feature)`, `limit(…)`, a local cache, and a webhook receiver for pushes.
   - Apps fail **open to the last known state** for paying customers when Core is unreachable.
     The exact rule is decided in the spec.
   - Add it to `Formatic-Package-Menu.md` as **Proposed** (done 2026-10-26).
5. **Admin console:**
   - A Next.js app on Vercel at e.g. `admin.formaticsystems.com`.
   - Platform roles follow HomeWatch's design: `platform_admin`, `platform_support`,
     `platform_viewer`.
   - **Supabase MFA (aal2) required** to enter.
   - Every write goes through Core and is audited.
   - App tabs call each app's admin API (start with ProjectPix: list waitlist, approve).
6. **Identity across apps:** decide in the spec; this is the hardest call. Options:
   - **(A) Link accounts:** keep separate logins and link them by verified email in Core. This
     is the smallest change.
   - **(B) Shared identity provider:** Core as the IdP, or a third party such as Clerk or WorkOS,
     with every app trusting its tokens. Verify the current Supabase third-party-auth support.
   - **(C) Hybrid:** start with (A), migrate to (B).
   - *Recommendation:* (C). Entitlements only need a stable account ID per business, not one
     login, so cross-app unlocks can ship before SSO.

## 6. Context the receiving session needs

### 6.1 The interim ProjectPix pieces the console replaces

- `ProjectPix src/lib/admin/platformAdmin.ts`:
  - The gate is a confirmed sign-in whose email is on `PLATFORM_ADMIN_EMAILS` (default
    john@crmsvc.com).
  - It carries a TODO to require MFA.
- `ProjectPix src/app/admin/waitlist/` (page) and `src/app/api/v1/admin/waitlist/[id]/approve/`
  (sets `approved_at`, emails the invite).
- `ProjectPix src/lib/beta/emails.ts`: sign-up alert (to Johnny) and approval invite emails, sent
  through Resend (`src/lib/email/resend.ts`, from `hello@projectpix.io`).
- When the console's waitlist ships, ProjectPix keeps its own `beta_allowlist` as the source its
  signup gate reads. The console either reads and writes it through the admin API, or Core
  becomes the source and pushes approvals. Decide in the spec.

### 6.2 Standing rules that apply

- Second-Brain standard: PROJECT_LOG, CHANGELOG and the commit gate in whichever repo hosts the
  build.
- Never push to `main` without Johnny's OK. Conventional commits. Stage specific files.
- Secrets go in `.env.local` and Vercel only, never in chat or the repo. Platform tokens are never
  given to clients.
- Knowledge tiers: the console's data is **internal**. Customer data is client-tier.
- Never show a raw ID where a person or company name belongs (ProjectPix rule; adopt it
  everywhere).
- Customer feedback drives feature calls. There is **no customer evidence yet** for console
  features; it is an internal tool. Competitor and pattern research should cover how
  multi-product SaaS companies (for example Atlassian, Zoho One, HubSpot, Adobe) run accounts,
  bundles and admin.

## 7. Decisions only Johnny can make (bring these to the brainstorm, most important first)

| # | Decision | Options | Claude's recommendation |
|---|---|---|---|
| **D1** | **Who owns accounts and billing for the portfolio?** FW ADR 0006 says formatic-works-platform owns "billing"; FW decision #6 is still open; the media-engine Phase 8 spec plans its own. | (a) Formatic Core owns portfolio-wide identity, plans and entitlements, and FW consumes it like every other app. (b) FW's platform is the core. | **(a).** FW is one product; Core sits above all products. Update FW ADR 0006 and close decision #6 / retire Phase 8 billing in the same change set. |
| **D2** | **One Stripe account or one per app?** Johnny said each app has its own Stripe. | (a) One Formatic Stripe account, a product per app: bundles, cross-app unlocks, one customer record and one portal; each app can still have its own statement descriptor. (b) Separate accounts per app: cleaner if an app is ever sold off, but cross-app unlocks need a sync layer across accounts and customers get several invoices. | **(a)**, unless Johnny expects to sell an app separately soon. Then (b), with Core mapping customers across accounts. Pros and cons need his call. |
| **D3** | **Where does the console live?** | (a) New repo `formatic-console` (or `formatic-core`), deployed at `admin.formaticsystems.com`. (b) Inside this marketing-site repo. (c) Inside formatic-systems-dashboard. | **(a).** This repo is a public marketing site that auto-deploys `main` and has no auth; mixing in a staff console raises the stakes of every content edit. |
| **D4** | **Shared login across apps:** now, later, or never? | (A) link accounts, (B) shared IdP, (C) A then B (see §5.6) | **(C)** |
| **D5** | **Where does this sit in the priority order?** The blueprint ranks HomeWatch, Formatic Works and Front Office above ProjectPix. | Build the Core + console foundation first, or after the next app milestone. | Foundation phases 1–2 (§8) before **any** app builds its own billing. ReferralPro and HomeWatch are closest to doing so. |
| **D6** | Domain / brand for the console | `admin.formaticsystems.com`, `console.formatic.systems`, … | `admin.formaticsystems.com` |

## 8. Suggested phases (the spec decides the final cut)

| Phase | Ships | Done when |
|---|---|---|
| **0. Research + spec** | Pattern research (§6.2), Stripe Entitlements + Supabase MFA + third-party-auth check, data model, admin API contract, D1–D6 decided | Spec committed and approved by Johnny |
| **1. Console shell + central waitlist** | Core project, platform roles, MFA-required login, audit log, waitlist queue for all apps (ProjectPix first via its admin API), sign-up alerts | Johnny approves a ProjectPix request from the console with 2FA on; the interim ProjectPix page can retire |
| **2. Accounts + manual entitlements** | Accounts directory, app links, features catalog, manual grants with reason and end date, `@formatic-labs/entitlements` v0.1 used by ProjectPix | Johnny toggles a ProjectPix feature for a test account and the app reflects it within the agreed delay; console outage test passes |
| **3. Stripe automation** | Products and prices per app, Checkout / Portal, webhooks → `stripe` grants, trials and coupons (covers the CompanyCam switch offer) | A test-mode payment turns features on with no human step; cancellation turns them off at period end |
| **4. Cross-app unlocks + bundles** | HomeWatch ↔ ProjectPix linked accounts, greyed-out sister-app features light up on payment | Johnny's exact scenario: HomeWatch subscriber buys ProjectPix and the HomeWatch screen un-greys |
| **5. Shared login (if D4 = B/C)** | One sign-in across apps | Decided in the spec |

## 9. Hand-back

- The receiving session writes its spec under its host repo's `docs/superpowers/specs/` and logs
  the decisions in that repo's PROJECT_LOG.
- It updates `claude-deliverables\MASTER\MASTER_BUSINESS_BLUEPRINT.md` with the new integration
  point. While there, fix the stale entry: the Front Office repo is `Front-Office`, not
  `Voice-AI`.
- Record the supersession of the "No single sign-on" line in the ProjectPix HomeWatch-integration
  handoff, and reconcile FW ADR 0006 / decision #6 and the media-engine Phase 8 spec.
