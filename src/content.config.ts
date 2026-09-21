import { defineCollection, z } from "astro:content";
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

    // Path under public/, e.g. /images/uploads/puja-2026.jpg
    // Keep these under 200KB. A 4MB phone photo makes the repo slow to clone
    // for every kid on the team, forever, because git keeps every version.
    image: z.string().optional(),
    imageAlt: z.string().optional(),

    // Zeffy ticket or registration page for this specific event.
    ticketUrl: z.string().url().optional(),

    // Pins the event to the top of the homepage.
    featured: z.boolean().default(false),

    // Set to true to keep a half-written event out of the build.
    draft: z.boolean().default(false),
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

    // Path under public/, e.g. /images/uploads/food-drive-2026.jpg
    // Keep these under 200KB, same rule as event images.
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
