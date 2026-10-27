---
title: "Formatic Admin Console + Formatic Core — Design Spec v1"
date: 2026-10-26
status: draft — awaiting Johnny's approval
author: Claude Code (formatic-systems-website session)
tier: internal
source: docs/handoffs/CC-HANDOFF-2026-10-26-formatic-admin-console.md
supersedes: nothing (first spec on this topic). When approved, it supersedes the
  "No single sign-on" line in ProjectPix docs/HANDOFF-HomeWatch-Integration-Feature-Additions-2026-10-12.md
  and the billing-ownership parts of FW ADR 0006 and the media-engine PHASE-8-BUILD-SPEC-V1.md (see §12).
---

# Formatic Admin Console + Formatic Core — Design Spec v1

> **⚠ SUPERSEDED (2026-10-27).** Johnny approved this draft with answers to §14. The current spec
> is `formatic-labs/formatic-console` → `docs/superpowers/specs/2026-10-27-formatic-admin-console-design-v2.md`.
> Do not build from this copy.

> **How to read this.** Johnny skipped the question round and asked for a spec to react to.
> Everything marked **Johnny said** is his. Everything marked **(Claude's call)** is a default
> chosen from the hand-off's recommendations; change any of them and the spec changes with it.
> Nothing here is approved until Johnny says so. **Approval gate:** no repo, project, Stripe
> object or code gets created before that.

---

## 1. Intent

**Johnny said:** "Creating an 'admin/dev' page for the entire project (with login) is
ultimately what should be created. This allows full functionality for user subscriptions and
accounts." … "If a subscriber of HomeWatch subscribes to ProjectPix, the feature turns from a
'greyed out' option to a fully functional feature. We need to be able to either automate this
… and/or … manually toggle access on at the master level."

**In one line:** build the shared foundation once, so that no Formatic app builds its own
accounts, plans, billing and admin screens. Then one console sees every customer across every
app and controls what each one can use.

**Why now:** ProjectPix needed a waitlist approval screen on 2026-10-26 and got a stopgap
(email allowlist, no 2FA). ReferralPro already has its own billing. HomeWatch, Formatic Works
and the dashboard are next. Each extra copy makes cross-app unlocks harder to retrofit.

## 2. What gets built: two pieces

| Piece | What it is | Who uses it |
|---|---|---|
| **Formatic Core** | A small backend (its own Supabase project + API routes) that holds only cross-app facts: businesses, people, staff roles, which apps each business uses, the feature catalog, plans, grants (who may use what), the central waitlist and the audit log. It holds **no app data** (no photos, jobs, calls). | The apps (through one npm package) and the console |
| **Admin Console** | A staff-only web app over Core plus each app's small admin API. 2FA required. | Johnny now, staff later |
| **`@formatic-labs/entitlements`** | The npm package every app installs to ask Core "may this business use feature X?", with a local cache so the app keeps working if Core is down. | Every app's server code |

Core and the console ship as **one Next.js app in one repo** (Claude's call): the console pages
and the Core API routes share a Supabase project and one deploy. It splits later only if load
or team size demands it.

## 3. Goals, non-goals, anti-goals

### Goals (end state, all phases)
1. One staff login with **2FA required** (Johnny's standing policy: 2FA for admin, not for normal users).
2. A directory of every business, its people, and which apps it uses; click into any app account to see plan, status, seats, history.
3. One beta/waitlist queue for every app, filterable by app, with the sign-up alert email and an Approve button that sends the invite.
4. Plans, trials, coupons and comps per app.
5. One source of truth for feature access, fed **automatically** by payments and **manually** by a staff toggle with a reason and an end date.
6. Cross-app unlocks and bundles (HomeWatch ↔ ProjectPix first).
7. An audit log of every staff action: who, when, what, why.
8. Per-app operational tabs, each driven by that app's admin API.

### Non-goals (v1)
- Rewriting any app's internal tenants, teams, roles or RLS.
- Moving app data into Core.
- A customer-facing "Formatic account" portal. (Stripe's hosted Customer Portal covers self-serve billing.)
- Payroll, accounting, CRM.
- One shared sign-in across apps (deferred to Phase 5, §9).

### Anti-goals (a failure even if it "works")
- An app stops serving paying customers because Core is down.
- A feature is unlocked or locked with no audit row.
- A client site or tenant ever holds a platform token.
- A customer pays and has to wait for Johnny to turn something on.
- Any staff access without 2FA once the console replaces the interim gates.
- The console reaching into an app's database directly.

## 4. Decisions D1–D6 (all Claude's calls — Johnny to confirm or change)

| # | Decision | Call | Why |
|---|---|---|---|
| **D1** | Who owns portfolio accounts and billing? | **Formatic Core.** Formatic Works becomes one more consumer. | FW is one product; Core sits above all of them. Closes FW decision #6 and retires the media-engine Phase 8 billing plan (§12). |
| **D2** | One Stripe account or one per app? | **One Formatic Stripe account, one Stripe Product per app**, each with its own statement descriptor suffix (e.g. `FORMATIC* PROJECTPIX`). | Bundles, cross-app unlocks, one customer record, one invoice, one portal. Johnny said each app has "its own Stripe and subscriptions": this keeps a separate **product, prices and subscription** per app inside one account. If an app is ever sold, Stripe supports moving customers to a new account. **Flag:** if a sale of one app is likely within ~12 months, say so and this flips to one account per app, with Core mapping customers across them. |
| **D3** | Where does the console live? | **New repo `formatic-labs/formatic-console`**, deployed to its own Vercel project. | This repo is a public marketing site with no auth that auto-deploys `main`; a staff console must not share its blast radius. This spec moves into the new repo at Phase 1 start; this copy gets a superseded banner. |
| **D4** | Shared login across apps? | **Link now, shared login later** (option C). | Entitlements only need a stable business ID, not one login. Cross-app unlocks ship in Phase 4 without touching any app's auth. |
| **D5** | Priority? | **Phases 1–2 before any app builds more billing.** Phase 1 is small (waitlist + 2FA shell) and unblocks retiring the ProjectPix stopgap. | ReferralPro and HomeWatch are closest to building their own billing; Core must exist first. ProjectPix is the #1 priority and the first consumer, so this work rides with it. |
| **D6** | Domain | **`admin.formaticsystems.com`** | Subdomain of the parent company; no new domain. Not linked from the marketing site; `noindex`. |

## 5. Data model (Formatic Core)

All tables live in a **new Supabase project** ("formatic-core"). RLS is on every table; the
console reads through server code that checks staff role + `aal2`. Apps never get a Supabase key
to Core; they get an **app API key** (§7).

```
accounts            one row per business (the "tenant identity" from the master blueprint)
  id uuid, name, legal_name?, primary_email, phone?, stripe_customer_id unique?,
  status: active | suspended | closed, created_at, notes

people              a human Core knows about (customer contact or staff)
  id, email unique (lower-cased, verified flag), full_name, auth_user_id? (staff only)

account_people      person ↔ account, role: owner | admin | member | billing

platform_memberships   STAFF ONLY (HomeWatch design)
  person_id, role: platform_admin | platform_support | platform_viewer

apps                catalog: projectpix | homewatch | referralpro | front_office | formatic_works | dashboard | media_engine
  key, display_name, admin_api_base_url, webhook_url, status

app_links           an account's tenant inside an app
  id, account_id, app_key, app_tenant_id (the app's own id), app_tenant_name,
  linked_at, linked_by, link_method: email_match | manual | signup
  unique(app_key, app_tenant_id)

features            catalog of everything that can be granted
  key (e.g. "projectpix.sister_app.homewatch", "referralpro.referrals_per_month"),
  app_key, kind: flag | limit | enum | metered, enum_values?, unit?, description

plans               per app: projectpix.starter, homewatch.growth, bundle.pro_suite …
  key, app_key? (null = bundle), display_name, stripe_product_id?, stripe_price_ids jsonb, active

plan_features       plan → feature → value (ReferralPro's plan_entitlements, lifted)

grants              THE source of truth for access
  id, account_id, feature_key, value jsonb,
  source: stripe | manual | beta | comp | trial,
  source_ref (stripe subscription id, waitlist id …),
  starts_at, ends_at?, reason (required when source ≠ stripe),
  granted_by (person_id or 'stripe'), revoked_at?, revoked_by?, revoke_reason?

waitlist            central queue (ProjectPix beta_allowlist shape)
  id, app_key, email, name?, company?, note?, source_url?, created_at,
  approved_at?, approved_by?, invite_sent_at?, rejected_at?, account_id?
  unique(app_key, email)

audit_log           append-only (no update/delete grant, even for service role code paths)
  id, at, actor_person_id | 'system' | 'stripe', action, target_type, target_id,
  account_id?, app_key?, before jsonb, after jsonb, reason, ip, user_agent

usage_events        metered usage reported by apps (Front Office call minutes)
  account_id, feature_key, quantity, occurred_at, idempotency_key unique

stripe_events       raw webhook log for idempotency + replay (ReferralPro's webhook_events pattern)
```

### How effective access is worked out (Claude's call)
For one account and one feature, take every grant that is not revoked and where
`starts_at ≤ now < ends_at` (or no end), then:

- **flag:** true if any grant is true.
- **limit:** the highest value; `null` (unlimited) beats any number.
- **enum:** the highest-ranked value in the feature's `enum_values` order.
- **metered:** the included quantity is the highest grant; usage is counted from `usage_events`.
- **nothing granted:** the most restrictive default (ReferralPro rule: "a data mistake can never
  grant more than intended").
- **account `suspended`:** everything resolves to defaults regardless of grants (the only "deny").

Plan grants are **expanded into rows**: when a subscription becomes active, Core writes one
`stripe` grant per feature in that plan. This keeps one resolver and makes the audit trail
show exactly what the payment turned on. Taking a feature away means ending or revoking a grant,
never writing a "deny" grant.

## 6. Payments (Phase 3)

- One Stripe account; one Product per app; Prices per plan and interval; bundle Products for bundles.
- **Stripe Entitlements** (Features attached to Products): use them as the payment-side mirror.
  Core subscribes to `entitlements.active_entitlement_summary.updated` plus
  `customer.subscription.*` and `invoice.payment_failed`. Core's own `features`/`grants` stay the
  source of truth, because Stripe Entitlements cannot hold manual, beta or comp grants, end dates
  or reasons. (Verify the current Entitlements API surface at Phase 3 start; if it adds nothing over
  subscription webhooks, skip it and map Price → plan in Core.)
- Webhook → store raw event (idempotent on event id) → write/close `stripe` grants → audit row →
  push to affected apps (§7).
- **Cancellation:** grants end at `current_period_end`. **Failed payment:** grants keep running
  through Stripe's retry window (Smart Retries), then end when the subscription goes
  `unpaid`/`canceled`. No human step either way.
- Checkout and Customer Portal are Stripe-hosted; apps link to a Core endpoint that creates the
  session for the right account.
- Covers the CompanyCam switch offer (`ProjectPix docs/companycam-switch-offer-spec-v1-2026-10-18.md`)
  as a Stripe coupon + `comp` or `trial` grant.
- ReferralPro migrates its `plans / plan_entitlements / overrides` into Core during Phase 3; its
  existing Stripe webhook is retired after a dual-run period (both write; Core is read).

## 7. How apps talk to Core

### The package: `@formatic-labs/entitlements` (server-side only)
```ts
const ent = createEntitlements({ appKey: "projectpix", apiKey: process.env.FORMATIC_CORE_KEY });
await ent.can(accountId, "projectpix.sister_app.homewatch")   // boolean
await ent.limit(accountId, "projectpix.storage_gb")           // number | null (unlimited)
await ent.all(accountId)                                      // the full resolved map for UI greying-out
await ent.report(accountId, "front_office.call_minutes", 3.5, idempotencyKey)
ent.webhookHandler()                                          // route handler that receives pushes
```
- **Keys:** one secret API key per app, scoped to that app's features plus any sister-app feature it
  must read for greying out. Lives in the app's Vercel env as `FORMATIC_CORE_KEY`. **Never** in a
  client bundle, never given to a tenant. Published to GitHub Packages under the standing
  `NPM_RC` token rule.
- **Push:** when a grant changes, Core POSTs a signed (HMAC-SHA256, timestamped) "account X changed"
  message to the app's webhook. The package invalidates its cache for that account.
- **Pull + cache:** the package caches each account's resolved map in the app's own database
  (one small `formatic_entitlements_cache` table the package's migration creates). A cache entry is
  fresh for 5 minutes, then re-pulled on next use.
- **Core down (the anti-goal):** the package serves the **last known map** for up to **72 hours**
  (Claude's call), then falls back to restrictive defaults and logs loudly. A paying customer
  therefore keeps working through any realistic outage. New sign-ups during an outage get defaults
  until Core is back.
- **Agreed delay** for a manual toggle to show in an app: under 1 minute with push, ≤ 5 minutes if
  the push is lost.

### Each app's admin API (what the console calls)
A small set of routes each app exposes under `/api/formatic-admin/v1/`, authenticated with a
Core-signed short-lived token (Core is the caller, so no new secret lives in the console's browser):

| Route | Purpose | First app |
|---|---|---|
| `GET /tenants?email=` | find the app's tenant(s) for a person, for linking | ProjectPix |
| `GET /tenants/:id/summary` | name, seats, usage, created date for the console's app tab | ProjectPix |
| `POST /waitlist/:email/approve` | let the app's sign-up gate admit this email (Phase 1 only; see below) | ProjectPix |
| `POST /tenants/:id/impersonate` | short-lived support login link; audited | later |

### Waitlist source of truth (Claude's call)
**Core owns the queue.** Each app's public sign-up form POSTs to Core's `/v1/waitlist` (or the app
forwards it). On Approve, Core calls the app's admin API so the app's own `beta_allowlist`
(which its sign-up gate already reads) gets `approved_at` set, then sends the invite email.
ProjectPix keeps its gate code unchanged. One-time import of ProjectPix's existing
`beta_allowlist` rows into Core at Phase 1.

## 8. The console

Next.js (App Router) + Tailwind v4 + Supabase Auth, on Vercel, matching the house stack.
Look: Formatic's amber/stone tokens and Syne headings, so it reads as Formatic, but dense
and table-first (it's a work tool, not a marketing page). No raw IDs where a name belongs
(ProjectPix rule): show "CRM Services LLC", not a UUID.

**Sign-in:** email + password or magic link, then **TOTP 2FA (aal2) required on every session**.
Staff who have not enrolled are forced to enroll before anything loads. Every server action
re-checks `platform_memberships` + `aal2`. Sessions expire after 12 hours.

**Roles** (HomeWatch design):
| | viewer | support | admin |
|---|---|---|---|
| See everything | ✓ | ✓ | ✓ |
| Approve/reject waitlist | | ✓ | ✓ |
| Grant/revoke features (manual, comp, trial) | | ✓ (with end date ≤ 90 days) | ✓ |
| Change plans, refund, cancel subscriptions | | | ✓ |
| Manage staff | | | ✓ |
| Impersonate | | ✓ (audited, reason required) | ✓ |

**Screens:**
1. **Home** — counts that need action: waitlist pending per app, failed payments, grants ending in 7 days, recent sign-ups.
2. **Waitlist** — one table, filter by app; Approve / Reject / Approve + note. Approve sends the invite.
3. **Accounts** — searchable directory; an account page shows people, app links, effective access per app (with which grant gave it), subscriptions, invoices (from Stripe), and that account's audit trail.
4. **Grant access** — a drawer on the account page: pick feature(s) or a whole plan, value, end date, reason (required). Shows the result before saving.
5. **Plans & features** — catalog editor (admin only); changing a plan's features re-expands grants for every subscriber, audited.
6. **App tabs** — one per app, filled from that app's admin API.
7. **Audit log** — filter by actor, account, app, action; export CSV.

**Alerts:** a new waitlist sign-up emails Johnny (Resend, from a `formaticsystems.com` sender),
replacing ProjectPix's own alert email once Phase 1 ships.

## 9. Identity across apps

- **Now (Phases 1–4):** each app keeps its own login. Core links an app tenant to an account by
  **verified email match** (the owner's email in the app equals a person on the account), or a
  staff member links them by hand. Linking is audited. An unverified email never auto-links.
- **Phase 5 (decide later):** one sign-in across apps. Supabase supports third-party auth
  providers (Clerk, WorkOS, Auth0, Cognito, Firebase), so either Core becomes the identity
  provider or a provider is added in front of every app. Not specified further here; it gets its
  own spec when Phases 1–4 are live.
- This **supersedes** "No single sign-on: each platform keeps its own login" in the ProjectPix
  HomeWatch-integration hand-off: the separate logins are now a phase, not the final design.

## 10. Phases

| Phase | Ships | Done when |
|---|---|---|
| **0. Spec** (this doc) | D1–D6 confirmed, spec approved | Johnny approves |
| **1. Shell + central waitlist** | New repo + Core Supabase project; staff login with required TOTP; roles; audit log; waitlist for all apps; ProjectPix admin API (approve route) + import of its existing waitlist; sign-up alert email | Johnny approves a real ProjectPix request from the console with 2FA on; ProjectPix's `/admin/waitlist` stopgap is removed |
| **2. Accounts + manual access** | Accounts, people, app links (email match + manual); features catalog; manual/comp/trial/beta grants; `@formatic-labs/entitlements` v0.1 in ProjectPix (push, pull, cache, 72-h fallback) | Johnny toggles a ProjectPix feature for a test account and ProjectPix reflects it within a minute; an outage test (Core blocked) leaves a paying test account working |
| **3. Stripe automation** | One Stripe account, a Product per app, Checkout + Customer Portal, webhooks → grants, trials, coupons (CompanyCam offer); ReferralPro migrated onto Core | A test-mode payment turns features on with no human step; cancellation turns them off at period end |
| **4. Cross-app unlocks + bundles** | HomeWatch ↔ ProjectPix linking; sister-app features in each app read Core; first bundle plan | A HomeWatch test subscriber buys ProjectPix and the greyed-out ProjectPix feature in HomeWatch turns on, unattended |
| **5. Shared login** | Own spec | Own spec |

Sizing (rough, for planning): Phase 1 is the smallest and is a plan of its own; each later phase
gets its own implementation plan after the previous one ships.

## 11. Security and data rules

- Core data is **internal**; customer records in it are **client** tier. No mixed stores with any
  public-tier assistant or knowledge base.
- Secrets only in `.env.local` and Vercel env; app API keys rotate without downtime (two active keys per app).
- Every write path writes its audit row **in the same transaction**; no write path without one.
- Webhooks (Stripe in, Core→app out) are signature-checked, timestamped (5-minute window) and idempotent.
- Impersonation links expire in 15 minutes, are single-use, and show a banner inside the app.
- Supabase advisors clean (no RLS-disabled tables, no exposed functions) before each phase ships.
- `admin.formaticsystems.com` sends `noindex` and is never linked from the marketing site.

## 12. Documents this changes (logged on approval, same change set)

| Doc | Change |
|---|---|
| ProjectPix `docs/HANDOFF-HomeWatch-Integration-Feature-Additions-2026-10-12.md` | "No single sign-on" → superseded by §9; banner + PROJECT_LOG entry |
| formatic-works-platform `docs/adr/0006` + ROADMAP decision #6 | Billing/accounts owned by Formatic Core; FW consumes it. Decision #6 closed. |
| formatic-media-engine `docs/PHASE-8-BUILD-SPEC-V1.md` | Its orgs/memberships/Stripe tiers retired in favour of Core; banner |
| `claude-deliverables\MASTER\MASTER_BUSINESS_BLUEPRINT.md` | New integration point (Core ↔ every app); fix stale `Voice-AI` → `Front-Office` |
| `claude-deliverables\Formatic\Formatic-Package-Menu.md` | `@formatic-labs/entitlements` stays **Proposed** until Phase 2 publishes v0.1 |
| This repo | Spec copy gets a "moved to formatic-console" banner at Phase 1 start |

## 13. Left to the builder

- Exact table column types, indexes and migration order.
- Admin-API token format (signed JWT vs HMAC request signing), as long as it is short-lived and Core-issued.
- UI layout details inside the screens listed in §8.
- Cache table shape inside the package.
- Test strategy (tests are required on the resolver, webhook handlers and every write path's audit row).

## 14. Open for Johnny (only these change what gets built)

1. **D2:** any chance one app gets sold separately in the next ~12 months? (Flips Stripe to one account per app.)
2. **72-hour fallback:** is three days the right amount of time for an app to keep honouring last-known access while Core is down?
3. **Support role limits:** is a 90-day cap on grants made by `platform_support` right, or should support never grant access?
