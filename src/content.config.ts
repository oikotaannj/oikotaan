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
/** Reusable event-page building blocks. Editors add only the sections they
 * need and drag them into order; the presence of a block is what makes it
 * visible, so there is no second layer of "enabled" switches to manage. */
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

const eventSection = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("story"),
    heading: z.string(),
    body: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
  }),
  z.object({
    type: z.literal("highlights"),
    heading: z.string().default("What to expect"),
    intro: z.string().optional(),
    items: z.array(
      z.object({
        kicker: z.string().optional(),
        title: z.string(),
        description: z.string().optional(),
        image: z.string().optional(),
        imageAlt: z.string().optional(),
      }),
    ),
  }),
  z.object({
    type: z.literal("schedule"),
    heading: z.string().default("Schedule"),
    note: z.string().optional(),
    days: z.array(
      z.object({
        label: z.string(),
        note: z.string().optional(),
        items: z.array(scheduleItem),
      }),
    ),
  }),
  z.object({
    type: z.literal("programs"),
    heading: z.string().default("Cultural programs"),
    intro: z.string().optional(),
    groups: z.array(
      z.object({
        label: z.string().optional(),
        note: z.string().optional(),
        items: z.array(programItem),
      }),
    ),
  }),
  z.object({
    type: z.literal("menu"),
    heading: z.string().default("Food"),
    note: z.string().optional(),
    meals: z.array(
      z.object({
        name: z.string(),
        time: z.string().optional(),
        note: z.string().optional(),
        items: z.array(menuItem),
      }),
    ),
  }),
  z.object({
    type: z.literal("registration"),
    heading: z.string().default("Registration"),
    intro: z.string().optional(),
    deadline: z.string().optional(),
    url: z.url().optional(),
    urlLabel: z.string().default("Register"),
    tiers: z.array(
      z.object({
        name: z.string(),
        price: z.string(),
        unit: z.string().optional(),
        description: z.string().optional(),
        includes: z.array(z.string()).default([]),
        highlight: z.boolean().default(false),
      }),
    ),
    note: z.string().optional(),
  }),
  z.object({
    type: z.literal("payment"),
    heading: z.string().default("How to pay"),
    intro: z.string().optional(),
    qrImage: z.string().optional(),
    qrAlt: z.string().optional(),
    qrCaption: z.string().optional(),
    methods: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
        note: z.string().optional(),
      }),
    ),
    note: z.string().optional(),
  }),
  z.object({
    type: z.literal("gallery"),
    heading: z.string().default("Gallery"),
    intro: z.string().optional(),
    photos: z.array(z.object({ image: z.string(), alt: z.string() })),
  }),
  z.object({
    type: z.literal("faq"),
    heading: z.string().default("Good to know"),
    items: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      }),
    ),
  }),
]);

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
    ticketUrl: z.url().optional(),

    // Pins the event to the top of the homepage.
    featured: z.boolean().default(false),

    // Set to true to keep a half-written event out of the build.
    draft: z.boolean().default(false),

    sections: z.array(eventSection).default([]),
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
