import { defineCollection } from "astro:content";
// Astro 6 bundled Zod 4 and deprecated re-exporting z from astro:content.
import { z } from "astro/zod";
import { glob } from "astro/loaders";

/**
 * The events collection is the site's content database. Each Markdown file in
 * src/content/events/ is one event, and the schema below is checked at build
 * time: a missing date or a typo in a field name fails `npm run build` with a
 * readable message instead of shipping a broken page.
 *
 * This is also what the CMS at /admin reads to draw its form, so adding a field
 * here means adding it to public/admin/config.yml as well.
 */
/**
 * The spotlight sections.
 *
 * These describe a single event in the detail a landing page needs: what
 * happens when, what is being served, who is performing, what it costs and how
 * to pay. They drive the spotlight homepage (src/components/home/EventSpotlight)
 * and nothing else reads them.
 *
 * Every section carries its own `enabled`, so the committee turns a section on
 * only once it has something true to put in it. A section that is enabled but
 * empty renders nothing rather than an empty heading: half-finished is the
 * normal state of an event page six weeks out, and it should not look broken.
 *
 * None of this is required. An event with no spotlight block renders the way
 * events always have.
 */
const scheduleItem = z.object({
  time: z.string(),
  title: z.string(),
  description: z.string().optional(),
});

const menuItem = z.object({
  name: z.string(),
  note: z.string().optional(),
  // Shown as a marker next to the item. Bengali menus are mostly vegetarian
  // with a few exceptions, so flagging the exceptions is the useful direction.
  nonVeg: z.boolean().default(false),
});

const programItem = z.object({
  time: z.string().optional(),
  title: z.string(),
  performer: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
});

const spotlight = z
  .object({
    schedule: z
      .object({
        enabled: z.boolean().default(false),
        heading: z.string().default("Schedule"),
        note: z.string().optional(),
        // A list of days, so a one-day puja and a four-day one use the same
        // shape and nothing needs rewriting when the event grows.
        days: z
          .array(
            z.object({
              label: z.string(),
              note: z.string().optional(),
              items: z.array(scheduleItem).default([]),
            }),
          )
          .default([]),
      })
      .optional(),

    food: z
      .object({
        enabled: z.boolean().default(false),
        heading: z.string().default("Food"),
        note: z.string().optional(),
        // Named rather than fixed to lunch/snacks/dinner, because a day event
        // serves breakfast and prasad and a four-day one serves bhog.
        meals: z
          .array(
            z.object({
              name: z.string(),
              time: z.string().optional(),
              note: z.string().optional(),
              items: z.array(menuItem).default([]),
            }),
          )
          .default([]),
      })
      .optional(),

    programs: z
      .object({
        enabled: z.boolean().default(false),
        heading: z.string().default("Cultural programs"),
        intro: z.string().optional(),
        // Groups are deliberately unlabelled by meaning: an evening, a day, a
        // category. The committee decides what a group is.
        groups: z
          .array(
            z.object({
              label: z.string().optional(),
              note: z.string().optional(),
              items: z.array(programItem).default([]),
            }),
          )
          .default([]),
      })
      .optional(),

    registration: z
      .object({
        enabled: z.boolean().default(false),
        heading: z.string().default("Registration"),
        intro: z.string().optional(),
        deadline: z.string().optional(),
        url: z.string().url().optional(),
        urlLabel: z.string().default("Register"),
        tiers: z
          .array(
            z.object({
              name: z.string(),
              price: z.string(),
              unit: z.string().optional(),
              description: z.string().optional(),
              includes: z.array(z.string()).default([]),
              highlight: z.boolean().default(false),
            }),
          )
          .default([]),
        note: z.string().optional(),
      })
      .optional(),

    payment: z
      .object({
        enabled: z.boolean().default(false),
        heading: z.string().default("How to pay"),
        intro: z.string().optional(),
        // An image the committee uploads. Nothing here generates a payment
        // code; whatever the payment app produced is what gets shown.
        qrImage: z.string().optional(),
        qrAlt: z.string().optional(),
        qrCaption: z.string().optional(),
        methods: z
          .array(
            z.object({
              label: z.string(),
              value: z.string(),
              note: z.string().optional(),
            }),
          )
          .default([]),
        note: z.string().optional(),
      })
      .optional(),

    highlights: z
      .object({
        enabled: z.boolean().default(false),
        heading: z.string().default("What to expect"),
        intro: z.string().optional(),
        items: z
          .array(
            z.object({
              kicker: z.string().optional(),
              title: z.string(),
              description: z.string().optional(),
              image: z.string().optional(),
              imageAlt: z.string().optional(),
            }),
          )
          .default([]),
      })
      .optional(),
  })
  .optional();

const events = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/events" }),
  schema: z.object({
    title: z.string(),
    titleBengali: z.string().optional(),

    // Written as YYYY-MM-DD in the frontmatter. Zod turns it into a real Date,
    // which is what lets the listing page sort and split past from upcoming.
    date: z.coerce.date(),
    endDate: z.coerce.date().optional(),

    // Free text, because "6:00 PM onwards" and "Doors 5:30, program 6:00" are
    // both things the committee actually writes.
    time: z.string().optional(),

    venue: z.string(),
    address: z.string().optional(),

    summary: z.string().max(200),

    // A Cloudinary URL, picked through the CMS's image field rather than a
    // file committed to this repo. See public/admin/config.yml.
    image: z.string().optional(),
    imageAlt: z.string().optional(),

    // Zeffy ticket or registration page for this specific event.
    ticketUrl: z.string().url().optional(),

    // Pins the event to the top of the homepage.
    featured: z.boolean().default(false),

    // Set to true to keep a half-written event out of the build.
    draft: z.boolean().default(false),

    spotlight,
  }),
});

/**
 * The homepage's editable content: everything a committee member should be
 * able to change without a pull request. Structural stuff — nav links, the
 * contact form's fields, org-wide settings like email and social links —
 * stays in src/site.config.ts, since that isn't page content, it's identity.
 *
 * src/content/home.yaml is a singleton: one file, glob-loaded the same way
 * events are, so its id is the filename ("home") and its data is the file's
 * content verbatim. That matters because the CMS (public/admin/config.yml)
 * reads and writes that file as a plain object matching the fields below —
 * an extra wrapping key here would round-trip fine in Astro but show up as
 * an empty form in the CMS, since it writes to the top level directly.
 */
const home = defineCollection({
  loader: glob({ pattern: "home.yaml", base: "./src/content" }),
  schema: z.object({
    /**
     * Which homepage template runs. This sits in content rather than in
     * site.config.ts so the committee can switch the homepage back after an
     * event without waiting for a developer and a pull request.
     *
     * "spotlight" picks the soonest upcoming event unless eventId names one.
     * Either way it falls back to the standard homepage when there is nothing
     * to feature, so the mode cannot leave the site with an empty hero.
     */
    layout: z
      .object({
        mode: z.enum(["standard", "spotlight"]).default("standard"),
        eventId: z.string().default(""),
      })
      .default({ mode: "standard", eventId: "" }),

    hero: z.object({
      kicker: z.string(),
      heading: z.string(),
      description: z.string(),
      image: z.string(),
      imageAlt: z.string(),
    }),

    // One icon per program pillar, picked from a small fixed set drawn in
    // index.astro. Adding a new icon choice means adding it there too.
    programs: z.array(
      z.object({
        icon: z.enum(["flame", "book", "heart"]),
        title: z.string(),
        description: z.string(),
      }),
    ),

    gallery: z.array(
      z.object({
        image: z.string(),
        alt: z.string(),
      }),
    ),

    contact: z.object({
      heading: z.string(),
      body: z.string(),
    }),
  }),
});

/**
 * The About page's editable prose: the mission statement committee members
 * may want to revise over time. Legal facts that must stay in lockstep with
 * the state and IRS filings — legal name, EIN, incorporation date, tax-exempt
 * status — live in src/site.config.ts instead, so they change through a PR
 * rather than a CMS save. See that file for why.
 *
 * Same singleton pattern as `home`: one file, glob-loaded, id is "about".
 */
const about = defineCollection({
  loader: glob({ pattern: "about.yaml", base: "./src/content" }),
  schema: z.object({
    mission: z.object({
      heading: z.string(),
      body: z.string(),
    }),
  }),
});

/**
 * Community Impact: things the organisation did — food drives, mutual aid,
 * volunteering — as distinct from events, which are things people attend.
 * There is no venue and no single date people show up to, so unlike events
 * this has no upcoming/past split: it is a reverse-chronological record of
 * completed activity, useful on its own and as evidence of real activity for
 * things like Google for Nonprofits verification.
 *
 * date/endDate reuse the same range as events (e.g. a half-year food drive
 * runs 2026-01-01 to 2026-06-30) so formatDateRange in lib/dates.ts already
 * handles it without change.
 */
const impact = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/impact" }),
  schema: z.object({
    title: z.string(),
    titleBengali: z.string().optional(),

    date: z.coerce.date(),
    endDate: z.coerce.date().optional(),

    summary: z.string().max(200),

    // Credit a partner organisation, e.g. "Community FoodBank of New Jersey".
    partner: z.string().optional(),

    // A Cloudinary URL, same as event images — see public/admin/config.yml.
    image: z.string().optional(),
    imageAlt: z.string().optional(),

    // Supporting photos shown in a grid below the banner, same shape as
    // home.yaml's gallery. Each keeps its own alt text rather than being
    // flattened into one collage image, which would lose that and need
    // regenerating by hand every time a photo changes.
    gallery: z
      .array(
        z.object({
          image: z.string(),
          alt: z.string(),
        }),
      )
      .optional(),

    // Set to true to keep a half-written entry out of the build.
    draft: z.boolean().default(false),
  }),
});

export const collections = { events, home, about, impact };
