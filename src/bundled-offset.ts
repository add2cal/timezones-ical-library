// Interpret only the compact, annual recurrence subset emitted by this database.
// DTSTART's artificial year is deliberately NOT a claim about historical coverage.
export function bundled_model(content: string) {
  const blocks = [...content.matchAll(/BEGIN:(STANDARD|DAYLIGHT)<br>(.*?)END:\1/g)];
  if (!blocks.length) return undefined;
  const rules: { from: number; to: number; month: number; nth: number; weekday: number; hour: number; minute: number; second: number; recurring: boolean }[] = [];
  const offset = (text: string): number => {
    if (!/^[+-]\d{4}$/.test(text) || Number(text.slice(1, 3)) > 23 || Number(text.slice(3)) > 59) return NaN;
    return (text[0] === '-' ? -1 : 1) * (Number(text.slice(1, 3)) * 60 + Number(text.slice(3))) * 60000;
  };
  for (const block of blocks) {
    const value = (key: string): string =>
      block[2]
        .split('<br>')
        .find((line) => line.startsWith(key + ':'))
        ?.slice(key.length + 1) || '';
    const from = offset(value('TZOFFSETFROM'));
    const to = offset(value('TZOFFSETTO'));
    const start = value('DTSTART').match(/^\d{8}T(\d{2})(\d{2})(\d{2})$/);
    const recurrence = value('RRULE');
    const match = recurrence.match(/^FREQ=YEARLY;BYMONTH=(\d{1,2});BYDAY=(-?[1-5])(SU|MO|TU|WE|TH|FR|SA)$/);
    if (!Number.isFinite(from) || !Number.isFinite(to) || !start || Number(start[1]) > 23 || Number(start[2]) > 59 || Number(start[3]) > 59 || (recurrence && !match)) return undefined;
    if (!recurrence && (blocks.length !== 1 || from !== to)) return undefined;
    if (match && (Number(match[1]) < 1 || Number(match[1]) > 12)) return undefined;
    rules.push({ from, to, month: Number(match?.[1]), nth: Number(match?.[2]), weekday: ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'].indexOf(match?.[3] || ''), hour: Number(start[1]), minute: Number(start[2]), second: Number(start[3]), recurring: !!match });
  }
  // Mixing fixed and recurring components is not an extrapolatable model.
  if (rules.length > 1 && rules.some((rule) => !rule.recurring)) return undefined;
  const offsets = [...new Set(rules.map((rule) => rule.to))];
  const transitions = (firstYear: number, lastYear: number): [number, number][] => {
    const events: [number, number][] = [];
    for (let year = firstYear; year <= lastYear; year++) {
      for (const rule of rules) {
        if (!rule.recurring) continue;
        const date = new Date(0);
        date.setUTCFullYear(year, rule.month - 1, 1);
        if (rule.nth > 0) {
          date.setUTCDate(1 + ((rule.weekday - date.getUTCDay() + 7) % 7) + (rule.nth - 1) * 7);
        } else {
          date.setUTCMonth(rule.month, 0);
          date.setUTCDate(date.getUTCDate() - ((date.getUTCDay() - rule.weekday + 7) % 7) + (rule.nth + 1) * 7);
        }
        // A fifth weekday might not exist in a given month.
        if (date.getUTCMonth() !== rule.month - 1) continue;
        date.setUTCHours(rule.hour, rule.minute, rule.second, 0);
        events.push([date.getTime() - rule.from, rule.to]);
      }
    }
    return events.sort((a, b) => a[0] - b[0]);
  };
  const at = (instant: number): number => {
    if (rules.length === 1 && !rules[0].recurring) return rules[0].to;
    const year = new Date(instant).getUTCFullYear();
    const events = transitions(year - 2, year + 1);
    let result = NaN;
    for (const [when, to] of events) {
      if (when > instant) break;
      result = to;
    }
    return result;
  };
  const wall = (instant: number): number => {
    const matches = offsets.filter((candidate) => at(instant - candidate) === candidate);
    // Fold: earlier instant. Gap: offset after the forward transition.
    if (matches.length) return Math.max(...matches);
    const year = new Date(instant).getUTCFullYear();
    for (const [when, to] of transitions(year - 1, year + 1)) {
      const from = at(when - 1);
      if (to > from && instant >= when + from && instant < when + to) return to;
    }
    return NaN;
  };
  return { at, wall, transitions };
}
