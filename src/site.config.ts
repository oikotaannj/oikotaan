/**
 * Every piece of organisation-specific text and every external link lives here.
 *
 * This file exists so that renaming the organisation, swapping the Zeffy page or
 * pointing at a different Google Calendar is a single edit instead of a hunt
 * through twenty templates. If you find yourself hardcoding an org name or a URL
 * inside a component, put it here instead.
 */
export const site = {
  name: "Oikotaan",
  shortName: "Oikotaan",
  nameBengali: "ঐকতান",
  tagline: "Celebrating Bengali culture, language and community in New Jersey.",
  description:
    "A volunteer-run 501(c)(3) nonprofit bringing Bengali families across New Jersey together through cultural programs, language classes and community service.",

  email: "hello@oikotaannj.org",
  town: "6 Matthew Road, Hillsborough, NJ 08844",

  /**
   * Legal identity, straight from the Certificate of Formation, the IRS EIN
   * letter (CP 575 E) and the 501(c)(3) determination letter, all dated
   * November 2025. This is what Google/Goodstack and similar nonprofit
   * verifiers check the site against, so it lives here — a code change and a
   * PR review — rather than in the CMS, where a typo would be one save away.
   */
  legalName: "Oikotaan Association of USA",
  ein: "41-2452692",
  incorporated: {
    state: "New Jersey",
    date: "2025-11-06",
  },
  taxExempt: {
    section: "501(c)(3)",
    publicCharityStatus: "509(a)(2)",
    effectiveDate: "2025-11-06",
  },

  social: {
    facebook: "https://www.facebook.com/people/Oikotaan-NJ/61583657484226/",
    instagram: "https://instagram.com/",
    youtube: "",
  },

  /**
   * Zeffy hosted pages. Zeffy passes on no platform or card fees, so a $100
   * donation arrives as $100; it funds itself with an optional contribution the
   * donor can set to zero at checkout. Paste the hosted page URLs from the Zeffy
   * dashboard here once the 501(c)(3) verification clears.
   */
  zeffy: {
    donateUrl: "https://www.zeffy.com/",
    membershipUrl: "https://www.zeffy.com/",
  },

  /**
   * Public Google Calendar ID, from Calendar settings -> Integrate calendar.
   * The calendar must be set to "Make available to public" or the embed renders
   * an empty box with no error.
   */
  googleCalendarId: "en.usa#holiday@group.v.calendar.google.com",
  timeZone: "America/New_York",
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  { label: "Events", href: "/events/" },
  { label: "Impact", href: "/impact/" },
] as const;
