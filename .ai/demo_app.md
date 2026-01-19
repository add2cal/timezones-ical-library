# Demo Application (Astro)

## Overview
The directory `./demo` contains an Astro-based web application that demonstrates the `timezones-ical-library` in a real-world browser environment.

## Architecture
* **Framework:** Astro (Static Site Generation with Islands).
* **Role:** Consumer. It imports the library from the parent directory to test real-world usage.
* **Deployment:** Static HTML/JS via GitHub Pages (script in `./.github/workflows/gh-pages.yml`).

## Key Files
* `demo/src/pages/index.astro`: The main entry point.
* `demo/src/components/`: UI components (Vue if used, or pure Astro).
* `demo/astro.config.mjs`: Configuration.

## Development Commands
(Run these inside the `./demo` directory)
* `npm install`: Install demo-specific dependencies.
* `npm run dev`: Start the local Astro dev server (usually port 4321).
* `npm run check`: Tests the code for issues.
* `npm run format`: Formats the code based on eslint:fix and prettier:fix
* `npm run build`: Build the static site to `demo/dist/`.

## Coding Patterns (Astro)
1.  **Frontmatter:** Use the `---` fence at the top of `.astro` files for server-side JS (imports, data fetching).
2.  **Client Directives:** If using a UI framework component that needs interactivity (e.g., a timezone dropdown), use a Vue component and load it via `<Component client:only="vue" />`.
3.  **Imports:** The demo imports the library via a linked workspace package. Do not install it via remote npm!