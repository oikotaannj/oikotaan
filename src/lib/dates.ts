/**
 * A frontmatter date like `2026-10-17` is parsed by JavaScript as midnight UTC,
 * which is 8:00 PM on 16 October in New Jersey. Formatting it in the local zone
 * therefore prints the day before, and every event on the site is silently off
 * by one. Formatting in UTC prints the date exactly as it was typed, which is
 * what the committee meant when they wrote it.
 */
const DISPLAY_ZONE = "UTC";

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: DISPLAY_ZONE,
  }).format(date);
}

export function formatDateShort(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: DISPLAY_ZONE,
  }).format(date);
}

/** Renders "October 17 - 20, 2026" when an event spans days, one date when it does not. */
export function formatDateRange(start: Date, end?: Date): string {
  if (!end) return formatDate(start);
  const sameMonth =
    start.getUTCMonth() === end.getUTCMonth() && start.getUTCFullYear() === end.getUTCFullYear();
  if (!sameMonth) return `${formatDateShort(start)} - ${formatDateShort(end)}`;
  const month = new Intl.DateTimeFormat("en-US", {
    month: "long",
    timeZone: DISPLAY_ZONE,
  }).format(start);
  return `${month} ${start.getUTCDate()} - ${end.getUTCDate()}, ${start.getUTCFullYear()}`;
}

/**
 * An event counts as upcoming for the whole of its final day. Comparing against
 * the current instant instead would drop a Saturday event off the homepage on
 * Saturday morning, while people were still looking up the address.
 */
export function isUpcoming(start: Date, end?: Date): boolean {
  const last = end ?? start;
  const endOfDay = last.getTime() + 24 * 60 * 60 * 1000;
  return endOfDay >= Date.now();
}

/** `datetime` attribute for <time>, so screen readers and search engines agree with us. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
