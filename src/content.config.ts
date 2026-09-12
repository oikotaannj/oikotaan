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

export const collections = { events };
