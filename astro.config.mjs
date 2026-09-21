// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// `site` feeds the sitemap and any absolute URLs (Open Graph tags, RSS).
// Already the real, registered and live domain -- matches the primary
// domain set in Netlify and the DNS records in Cloudflare.
export default defineConfig({
  site: "https://www.oikotaannj.org",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
