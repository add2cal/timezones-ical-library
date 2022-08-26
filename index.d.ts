declare module 'timzones-ical-library' {
  export function tzlib_get_ical_block(
    timeZone: string
  ): void;
  export function tzlib_get_timezones(
    jsonType?: boolean
  ): void;
}
