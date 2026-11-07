// Resolve a local wall-clock time using the runtime's historical IANA data.
// UTC arithmetic is intentional: the host's local time zone must never participate.
export function get_offset(timeZone: string, fallbackZone: string, isoDate: string, isoTime: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) {
    console.error('offset calculation failed: date misspelled [-> YYYY-MM-DD]');
    return '';
  }
  const [year, month, day] = isoDate.split('-').map(Number);
  const wallDate = new Date(0);
  wallDate.setUTCFullYear(year, month - 1, day);
  if (year < 1 || wallDate.getUTCFullYear() !== year || wallDate.getUTCMonth() !== month - 1 || wallDate.getUTCDate() !== day) {
    console.error('offset calculation failed: date misspelled [-> YYYY-MM-DD]');
    return '';
  }
  if (!/^\d{2}:\d{2}$/.test(isoTime)) {
    console.error('offset calculation failed: time misspelled [-> hh:mm]');
    return '';
  }
  const [hour, minute] = isoTime.split(':').map(Number);
  if (hour > 23 || minute > 59) {
    console.error('offset calculation failed: time misspelled [-> hh:mm]');
    return '';
  }
  wallDate.setUTCHours(hour, minute, 0, 0);

  try {
    const options: Intl.DateTimeFormatOptions = {
      timeZone,
      calendar: 'iso8601',
      numberingSystem: 'latn',
      era: 'short',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
    };
    let formatter: Intl.DateTimeFormat;
    try {
      // Prefer the requested IANA name: VTIMEZONE aliases may differ historically.
      formatter = new Intl.DateTimeFormat('en-US', options);
    } catch {
      // Includes artificial aliases such as ET and legacy names absent from ICU.
      formatter = new Intl.DateTimeFormat('en-US', { ...options, timeZone: fallbackZone });
    }
    const offsetAt = (instant: number): number => {
      const parts = formatter.formatToParts(new Date(instant));
      const part = (type: string): string => parts.find((entry) => entry.type === type)?.value || '';
      const local = new Date(0);
      const localYear = Number(part('year'));
      local.setUTCFullYear(part('era') === 'BC' ? 1 - localYear : localYear, Number(part('month')) - 1, Number(part('day')));
      local.setUTCHours(Number(part('hour')), Number(part('minute')), Number(part('second')), 0);
      return local.getTime() - instant;
    };
    const wall = wallDate.getTime();
    const dayMs = 86400000;
    // Include both sides of transitions, including half-hour shifts and skipped days.
    const offsets = [...new Set([-2, -1, 0, 1, 2].map((days) => offsetAt(wall + days * dayMs)))];
    const matches = offsets.filter((offset) => offsetAt(wall - offset) === offset);
    // A fold selects the earlier instant (larger offset). A gap uses the offset
    // after the forward jump, preserving the existing New York gap policy.
    const offsetMs = Math.max(...(matches.length ? matches : offsets));
    if (!Number.isFinite(offsetMs)) return '';
    // The public ±HHMM format cannot represent historical sub-minute offsets.
    const totalMinutes = Math.trunc(Math.abs(offsetMs) / 60000);
    return `${offsetMs < 0 ? '-' : '+'}${String(Math.floor(totalMinutes / 60)).padStart(2, '0')}${String(totalMinutes % 60).padStart(2, '0')}`;
  } catch {
    // Never silently substitute today's bundled rules for missing runtime data.
    return '';
  }
}
