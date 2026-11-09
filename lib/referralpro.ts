// ReferralPro — single source for the product's name and links on this site.
//
// "ReferralPro" is a WORKING NAME (Johnny, 2026-11-08: fine for the test run,
// may be swapped later). To rename, change REFERRALPRO_NAME here; the card,
// the /referralpro page and its metadata all read from this file. Also update
// public/llms.txt and app/sitemap.ts if the route itself changes.
//
// Status: private beta. Copy anywhere on the site must not promise public
// availability or pricing, and must not name pilot customers.

export const REFERRALPRO_NAME = "ReferralPro";

/** Route of the temporary product page on formaticsystems.com. */
export const REFERRALPRO_PATH = "/referralpro";

const APP_ORIGIN = "https://referralpro-formatic-labs.vercel.app";

/** Waitlist. `ref` tags the sign-up as coming from formaticsystems.com. */
export const REFERRALPRO_WAITLIST_URL = `${APP_ORIGIN}/beta?ref=formaticsystems`;

/** Sign-in for businesses already approved for the beta. */
export const REFERRALPRO_SIGN_IN_URL = `${APP_ORIGIN}/sign-in`;

/** One-line description, shared by the home card and page metadata. */
export const REFERRALPRO_SUMMARY =
  "Referral programs for service businesses. Your happy customers share a link, you see every referral from first click to finished job, and rewards go out on the rules you set.";
