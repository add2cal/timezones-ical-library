declare module 'timzones-ical-library' {
  export function tzlib_get_ical_block(
    tzName: string
  ): void;
  export function tzlib_get_offset(
    tzName: string,
    isoDate: string,
    isoTime: string
  ): void;
  export function tzlib_get_timezones(
    jsonType?: boolean
  ): void;
}
