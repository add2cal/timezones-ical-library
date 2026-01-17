// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";
import astroExpressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  site: "https://tz.add-to-calendar-technology.com",
  output: "static",
  trailingSlash: "never",
  build: {
    format: "file",
  },

  image: {
    remotePatterns: [{ protocol: "https" }], // only allows remote images with https, see https://docs.astro.build/en/guides/images/#authorizing-remote-images for more options
    responsiveStyles: false,
    layout: "constrained",
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    vue(),
    sitemap(),
    astroExpressiveCode({
      themes: ["github-dark", "github-light"],
      useDarkModeMediaQuery: false,
    }),
    (await import("astro-compress")).default({
      HTML: {
        "html-minifier-terser": {
          removeAttributeQuotes: false,
        },
      },
    }),
  ],
});
