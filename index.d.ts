/**
 * JSON-serialized payload returned when `jsonType` is set to `true`.
 *
 * This is a plain string created via `JSON.stringify(...)` and can be parsed
 * with `JSON.parse(...)` to obtain the structured result.
 */
export type JsonString<T = unknown> = string;

/**
 * ISO-8601 date in `YYYY-MM-DD` format (e.g. `2026-01-19`).
 */
export type IsoDate = string;

/**
 * ISO-8601 time in `hh:mm` (24-hour) format (e.g. `09:30`).
 */
export type IsoTime = string;

/**
 * Returns the VTIMEZONE block for a given time zone.
 *
 * @param tzName - IANA time zone name (e.g. `Europe/Berlin`).
 * @param jsonType - When `true`, returns a JSON string instead of an array.
 * @returns
 * - When `jsonType` is `false` or omitted: a tuple-like array
 *   `[vtimezoneBlock, tzidLine]`.
 * - When `jsonType` is `true`: a JSON stringified array.
 */
export function tzlib_get_ical_block(tzName: string): string[] | string;
export function tzlib_get_ical_block(tzName: string, jsonType: false): string[] | string;
export function tzlib_get_ical_block(tzName: string, jsonType: true): JsonString<[string, string]>;

/**
 * Returns the timezone offset for a local wall-clock date and time using source-certified
 * bundled rules, then historical runtime Intl outside that coverage, then best-effort
 * bundled extrapolation if runtime support is unavailable.
 * Repeated times select the earlier instant; nonexistent times use the post-jump offset.
 * Historical seconds are truncated toward zero to minutes. The fallback may be historically
 * inaccurate; runtime tzdata is required for reliable history outside certified coverage.
 * This does not change the historical limitations of exported VTIMEZONE blocks.
 *
 * @param tzName - IANA time zone name (e.g. `America/New_York`).
 * @param isoDate - Date in `YYYY-MM-DD` format.
 * @param isoTime - Time in `hh:mm` (24-hour) format.
 * @returns
 * - Offset in `+HHMM` or `-HHMM` format (e.g. `+0100`, `-0500`),
 *   or an empty string for invalid input or if neither offset mechanism can resolve it.
 */
export function tzlib_get_offset(tzName: string, isoDate: IsoDate, isoTime: IsoTime): string;

/**
 * Returns the full list of supported IANA time zone names.
 *
 * @param jsonType - When `true`, returns a JSON string instead of an array.
 * @returns
 * - When `jsonType` is `false` or omitted: a string array of time zone names.
 * - When `jsonType` is `true`: a JSON stringified array.
 */
export function tzlib_get_timezones(): string[] | string;
export function tzlib_get_timezones(jsonType: false): string[] | string;
export function tzlib_get_timezones(jsonType: true): JsonString<string[]>;
