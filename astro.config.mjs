// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// `site` feeds the sitemap and any absolute URLs (Open Graph tags, RSS).
// Already the real, registered and live domain -- matches the primary
// domain set in Netlify and the DNS records in Cloudflare.
export default defineConfig({
  site: "https://www.oikotaannj.org",

  // Astro 7 changed this default from true to "jsx", which drops the
  // whitespace between a text node and an adjacent inline element. That
  // silently renders "© 2026Oikotaan." and "emailoikotaan...@gmail.com"
  // in the footer of every page. Holding the old value keeps the spaces.
  compressHTML: true,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Vite 8's minifier emits modern CSS by default: media query range
      // syntax (width>=40rem) and no -webkit-backdrop-filter. Range syntax
      // needs Safari 16.4, so an older iPad loses every breakpoint and the
      // layout collapses to one column. Naming an older target keeps the
      // min-width queries and the prefix.
      cssTarget: ["chrome100", "safari15", "firefox100", "edge100"],
    },
  },
});
