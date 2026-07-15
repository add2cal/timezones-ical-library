import { defineConfig, svgoOptimizer } from 'astro/config';
import type { Config } from 'svgo';
import sitemap from '@astrojs/sitemap';
import vue from '@astrojs/vue';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';
import astroExpressiveCode from 'astro-expressive-code';

// Shared SVGO config used by the experimental svgOptimizer, astro-icon, and astro-compress.
const svgoConfig: Config = {
  multipass: true,
  floatPrecision: 5,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          cleanupIds: false,
          inlineStyles: false,
          mergeStyles: false,
          removeHiddenElems: false,
          convertShapeToPath: false,
          convertEllipseToCircle: false,
          convertPathData: false,
          convertTransform: {
            degPrecision: 1,
            transformPrecision: 3,
          },
          removeEmptyAttrs: false,
          removeDesc: false,
        },
      },
    },
    'convertStyleToAttrs',
    'removeRasterImages',
    'reusePaths',
    {
      name: 'removeXlink',
      params: { includeLegacy: true },
    },
    {
      name: 'prefixIds',
      params: {
        delim: '_',
        prefix: () => Math.random().toString(36).slice(2, 8),
        prefixIds: true,
        prefixClassNames: false,
      },
    },
  ],
};

// https://astro.build/config
export default defineConfig({
  site: 'https://tz.add-to-calendar-technology.com',
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },

  image: {
    remotePatterns: [{ protocol: 'https' }], // only allows remote images with https, see https://docs.astro.build/en/guides/images/#authorizing-remote-images for more options
    responsiveStyles: true, // set false for less convenience, but more control; https://docs.astro.build/en/reference/configuration-reference/#imageresponsivestyles
    layout: 'constrained',
    // Astro generates variants for each width in this list (plus the image's intrinsic width).
    // Defaults are [640, 750, 828, 1080, 1200, 1920]; This is our recommendation based on Tailwind defaults.
    breakpoints: [414, 576, 768, 976, 1440, 1600],
  },

  experimental: {
    // Always include svg images as components or <img> tags, never via Astro's <Image> component.
    // To auto-optimize SVGs, we use the svgo optimizer. If your svg files look strange, you might want to tweak its configuration or even disable it.
    // See https://docs.astro.build/en/reference/experimental-flags/svg-optimization/
    svgOptimizer: svgoOptimizer(svgoConfig),
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    vue(),
    sitemap(),
    icon({
      svgoOptions: svgoConfig,
    }),
    astroExpressiveCode({
      themes: ['github-dark', 'github-light'],
      useDarkModeMediaQuery: false,
    }),
    astroExpressiveCode(),
    (await import('astro-compress')).default({
      CSS: false, // disabled: astro-compress's CSS minifier (csso) strips Tailwind v4's modern `@media (width >= ...)` range syntax, which removes all responsive breakpoints and makes the site render mobile-only. Vite already minifies CSS safely.
      HTML: {
        'html-minifier-terser': {
          removeAttributeQuotes: false,
        },
      },
      SVG: {
        svgo: svgoConfig,
      },
    }),
  ],
});
