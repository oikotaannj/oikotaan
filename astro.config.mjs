// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// `site` feeds the sitemap and any absolute URLs (Open Graph tags, RSS).
// Point it at the real domain the day it is registered.
export default defineConfig({
  site: "https://www.example-banj.org",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
