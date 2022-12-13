declare module 'timezones-ical-library' {
  export function tzlib_get_ical_block(tzName: string, jsonType?: boolean): string[] | string;
  export function tzlib_get_offset(tzName: string, isoDate: string, isoTime: string): string;
  export function tzlib_get_timezones(jsonType?: boolean): string[] | string;
}
