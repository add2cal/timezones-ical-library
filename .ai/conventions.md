# Coding Conventions

## General
* **Language:** JavaScript (ES6+) for library, C for tools.
* **Formatting:** Follow `.prettierrc.json` and `.eslintrc.json`. Use `npm run format` as a shortcut to auto-format the project (can be used on both, the library/root as well as on the demo level)
* **Scripting:** When creating temporary scripts for debugging, create them in a new directory `./tmp_scripts`, which also always needs to be deleted after debugging. For scripts that should become part of the codebase, they go into `./scripts` (for the demo app, into `./demo/scripts`).

## JavaScript / TypeScript
1.  **Dual Modules:** We support both ESM and CJS. When modifying `package.json` exports, ensure both paths remain valid.
2.  **No dependencies:** The runtime library should have zero dependencies (`dependencies: {}` in package.json). Keep it lightweight.
3.  **Backwards Compatibility:** Do not break the API signature `tzlib_get_ical_block(tzName)`.

## C Programming (vzic)
1.  **Memory:** Watch for leaks; this tool runs once per update but processes large datasets.
2.  **Legacy Code:** The `vzic` code is based on `libical/vzic`. Only modify if necessary for data format correctness. Never edit the code directly, but rather add a step to the `update-tzdata.sh` script, which does the editing - so the edit stays functional after a vzic update. Also mind its Readme.md in `src/vzic/`.

## Versioning
* When IANA data updates, `package.json` version should likely be bumped.

## Demo Application (Astro) Rules
If you are asked to edit files in `./demo`:
1.  **Styles:** Use Tailwind classes where possible. Otherwise, define global CSS in the respective files at `./demo/src/assets/css`.
2.  **No Node:** Remember that code inside the component template runs in the browser. Do not use `fs` or `path` modules inside the client-side script tags.
3.  **Library Usage:** When fixing bugs in the demo, check if the bug is actually in the parent library. If so, switch context to `architecture.md`.
4. **Library Dependency:** Mind that the demo includes the root library directly via workspace settings in the package.json. Therefore, the root library projects needs to be built first, so it can be loaded by the demo project.