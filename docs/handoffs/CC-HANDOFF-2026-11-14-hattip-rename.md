---
title: CC handoff: ReferralPro is now Hattip, update formaticsystems.com
date: 2026-11-14
from: ReferralPro MAIN build session (Claude Code, desktop app)
to: the formatic-systems-website session
status: ready to build (Johnny asked for it 2026-11-14)
supersedes: nothing
---

# Handoff: rename ReferralPro to Hattip on formaticsystems.com

## What changed
- **The product is named Hattip** (Johnny, 2026-11-13). "ReferralPro" stays only as the repo name and internal codename; the public never sees it. Spoken in videos as "Hat Tip".
- **It has its own domain: https://usehattip.com.** It's live and serves the app (the app was renamed everywhere on 2026-11-14). hattipapp.com, hattipped.com, hattip.me, hattip.pro and www.usehattip.com redirect there.
- The old address `https://referralpro-formatic-labs.vercel.app` still works, but nothing new should link to it.
- **Status is unchanged: private beta.** Same copy rules as before: no promise of public availability or pricing, and never name pilot customers (CRM Services is never named publicly).

## What to change (this repo)
1. **`lib/referralpro.ts`** is the single source:
   - `REFERRALPRO_NAME` → `"Hattip"`.
   - `APP_ORIGIN` → `"https://usehattip.com"`. The waitlist becomes `https://usehattip.com/beta?ref=formaticsystems` and sign-in becomes `https://usehattip.com/sign-in`; both routes exist on the app.
   - Replace the "WORKING NAME" header comment: the name is final.
   - Keep `REFERRALPRO_SUMMARY` as it is unless Johnny asks; it's still accurate.
   - Renaming the exported constants or the file is optional; it isn't visible to anyone.
2. **The page's address.** Recommended:
   - Move the page from `/referralpro` to **`/hattip`**, with a **301 from `/referralpro` to `/hattip`** so existing links keep working.
   - Update `REFERRALPRO_PATH`, `app/sitemap.ts` (list `/hattip`, drop `/referralpro`) and the page's canonical and Open Graph URL.
   - The alternative is to point the card straight at https://usehattip.com and 301 `/referralpro` there. That's simpler, but it skips the Formatic intro page; take it only if Johnny prefers it.
3. **`public/llms.txt`:** the "What We Build" entry and the Pages entry say Hattip, drop "(working name)", and link the new path. Add the product's own site, https://usehattip.com.
4. **Anywhere else the name is spelled out** (comments are fine to leave): run `grep -rni "referral ?pro" --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.claude` and fix what a visitor or crawler would see: the home "What We Build" card (`components/what-we-build.tsx` reads the name from the lib, so check its copy), page title and metadata, and alt text.
5. **Logo:** none yet. A plain-text "Hattip" is right. Logo directions are being explored (https://claude.ai/artifact/LFA6BBw1MgaQUBkLA8YHU2, private); don't add a mark until one is chosen.
6. **Tagline:** none is decided. "Know a guy? Get paid for it." is the only saved candidate; don't add it without Johnny's OK.
7. Repo housekeeping: dated CHANGELOG entry, close the "ReferralPro is a working name" open item in `PROJECT_LOG.md`, run `npm run build` before committing, push to `main` (Vercel deploys it).

## Done when
- formaticsystems.com's home card and product page say **Hattip**, nowhere "ReferralPro".
- The page's buttons go to `https://usehattip.com/beta?ref=formaticsystems` and `https://usehattip.com/sign-in`.
- `/referralpro` redirects (301) to the new page.
- The sitemap and `llms.txt` match.
- The build passes and the change is deployed; check the live page once.
