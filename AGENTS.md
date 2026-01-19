# AI & Agent Documentation

This repository contains a hybrid architecture involving C-based data generation and a JavaScript library, which gets published via npm in the end.
The library can be used to access iCal ics VTIMEZONE blocks for a specific time zone as well as retrieve offset information within JavaScript/Typescript projects. Those blocks are also already optimized for ideal compatibility with all kinds of calendars - from Google Calendar to Microsoft Outlook and Apple Calendar.

## For LLMs and Agents
If you are an AI assistant attempting to modify code or understand the build process, you **MUST** read the technical context in the `.ai/` directory first. If you are an AI assistent attempting to use the "Time Zone iCal Library" in another project, jump directly into the **library usage documentation** at [.ai/guides/library_usage.md](.ai/guides/library_usage.md).

| Topic | File | Description |
| :--- | :--- | :--- |
| **Architecture** | [.ai/architecture.md](.ai/architecture.md) | How `vzic` (C) generates the base data. |
| **Demo App (Astro)** | [.ai/demo_app.md](.ai/demo_app.md) | Documentation for the website in `./demo`. |
| **Code Map** | [.ai/code_map.md](.ai/code_map.md) | Directory structure and key files. |
| **Rules** | [.ai/conventions.md](.ai/conventions.md) | Coding standards for C and JS/TS. |
| **Data Updates** | [.ai/guides/data_update.md](.ai/guides/data_update.md) | How to pull new IANA timezone data. |
| **vzic Updates** | [.ai/guides/vzic_update.md](.ai/guides/vzic_update.md) | How to update the `vzic` (C) dependency. |
| **Library Usage** | [.ai/guides/library_usage.md](.ai/guides/library_usage.md) | How to actually use the library inside another JS/TS project. |
| **Testing** | [.ai/testing.md](.ai/guides/testing.md) | Test suites for C, JS, and Astro layers. |

## Supported Models
- **OpenAI GPT Codex:** Automatically loads this file.
- **Claude Code:** Automatically loads `CLAUDE.md`.
- **Cursor/Windsurf:** Please create a `.cursorrules` file referencing `.ai/conventions.md`.
- **Gemini/OpenAI:** Please ingest `.ai/architecture.md` before answering complex questions.