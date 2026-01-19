# System Architecture

## Overview
The project operates in two distinct phases: **Generation** and **Consumption**.

## 1. Data Generation (The C Pipeline)
This phase converts raw IANA timezone data into usable JSON/VTIMEZONE formats.
* **Source:** IANA Timezone Database (downloaded via `update-tzdata.sh`).
* **Processor:** Custom C tools (`vzic-dump.c`, `vzic-parse.c`).
* **Output:** JSON files containing VTIMEZONE definitions + ics files containing those blocks to be consumed in an API style way.

**Flow:**
`IANA Data` -> `vzic (C)` -> `VTIMEZONE format` -> `Optimized JSON` -> `src/db/` + API data in `demo/public/api`

See `scripts/update-tzdata.sh` for the code and details via the included comments.

## 2. Consumption (The JS/TS Library)
The JavaScript library serves the pre-generated data to the user.
* **Runtime:** Node.js / Browser compatible.
* **Module System:** Dual support for CommonJS (`require`) and ESM (`import`).
* **Entry Point:** `index.js` (exports `tzlib_get_ical_block`, `tzlib_get_offset`, `tzlib_get_timezones`).

## Key Dependencies
* `libical`: Required for compiling the C tools.
* `Node.js`: Required for the library runtime and build scripts.