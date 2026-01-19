# Testing Strategy & Guidelines

## Overview
This repository requires a multi-layered testing strategy due to its hybrid nature (C generation tools vs. JavaScript runtime).

## 1. Core Library Tests (JavaScript)
**Context:** These tests verify the `npm` package functionality (the code in `src/`). They ensure the library correctly loads and serves the JSON data.

* **Command:** `npm test`
* **Framework:** Custom Node test runner.
* **Location:** `test/` directory.
* **Key Scenarios:**
    * **API Integrity:** Ensure `tzlib_get_ical_block` and `tzlib_get_offset` return valid responses for different time zone cases.
    * **Data Integrity:** Ensures for the same time zone cases that there are properly ics files generated for API use.

**LLM Instruction:**
> When writing JS tests, do not mock the filesystem unless necessary. Prefer integration tests that load the actual generated JSON files to verify data integrity.

## 2. Generator Tests (C Code)
**Context:** These tests verify the `vzic` toolchain that parses IANA data.

* **Command:** `sudo make test-vzic -B -s` (or `gcc -o test-vzic test-vzic.c && ./test-vzic`).
* **Location:** `src/vzic/` directory (`test-vzic.c`).
* **Key Scenarios:**
    * **Parsing Logic:** Ensure `vzic-parse.c` correctly interprets IANA rule definitions.
    * **Memory Safety:** The C tool handles large buffers; ensure no segfaults on large datasets.
* **Disclaimer:** The test-vzic requires an ical.h file, which can be hard to find outside a Linux environment. For regular use, since vzic gets included as dependency, it is not necessary to test it.

## 3. Data Integrity Validation
**Context:** Since we generate thousands of JSON files, we must ensure the generation process didn't produce corrupt JSON.

* **Trigger:** Runs automatically during `update-tzdata.sh`.
* **Process:**
    1.  C tools generate `.json` files.
    2.  `generator.js` (or similar) validates the JSON structure.
    3.  JS Unit tests (`npm test`) run immediately after generation.

## 4. Demo Application Tests (Astro)
**Context:** Verifies the web demo in `./demo`.

* **Command:** `cd demo && npm run build`
* **Type:** Build verification.
* **Strategy:** Since this is a static site, a successful build is the primary test.
* **Interactive Testing:** No automated UI tests currently.