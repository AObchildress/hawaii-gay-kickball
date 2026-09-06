import ical, { type ParameterValue, type VEvent } from 'node-ical';

const CALENDAR_ICS_URL =
  'https://calendar.google.com/calendar/ical/c_0041616d120025f701301551474949caf4c5a2243756e29aa1e88c4f499f7838%40group.calendar.google.com/public/basic.ics';

export type CalendarEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  location?: string;
  url?: string;
};

type EventOptions = {
  from?: Date;
  to?: Date;
  limit?: number;
};

function textValue(value?: ParameterValue) {
  if (!value) return undefined;
  return typeof value === 'string' ? value : value.val;
}

export async function parseCalendarEvents(icsText: string, options: EventOptions = {}) {
  const from = options.from ?? new Date();
  const to = options.to ?? new Date(from.getFullYear() + 1, from.getMonth() + 6, from.getDate());
  const limit = options.limit ?? 40;
  const calendar = await ical.async.parseICS(icsText);
  const events: CalendarEvent[] = [];

  for (const component of Object.values(calendar)) {
    if (!component || component.type !== 'VEVENT' || component.recurrenceid) continue;

    const event = component as VEvent;
    const instances = ical.expandRecurringEvent(event, {
      from,
      to,
      includeOverrides: true,
      excludeExdates: true,
      expandOngoing: true,
    });

    for (const instance of instances) {
      if (instance.event.status === 'CANCELLED') continue;

      const title = textValue(instance.summary)?.trim() || 'League Event';
      const location = textValue(instance.event.location)?.trim();
      const start = new Date(instance.start);
      const end = new Date(instance.end);

      events.push({
        id: `${event.uid}-${start.toISOString()}`,
        title,
        start: start.toISOString(),
        end: end.toISOString(),
        allDay: instance.isFullDay,
        ...(location ? { location } : {}),
        ...(instance.event.url ? { url: instance.event.url } : {}),
      });
    }
  }

  return events
    .sort((left, right) => new Date(left.start).getTime() - new Date(right.start).getTime())
    .slice(0, limit);
}

export async function getUpcomingEvents(options: EventOptions = {}) {
  const response = await fetch(CALENDAR_ICS_URL, {
    headers: { 'User-Agent': 'Hawaii-Gay-Kickball-Website/1.0' },
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Google Calendar returned ${response.status}`);
  }

  return parseCalendarEvents(await response.text(), options);
}
