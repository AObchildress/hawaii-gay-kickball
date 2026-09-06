import { getUpcomingEvents } from '../../server/calendar-events';

export const config = { path: '/api/events' };

export default async () => {
  try {
    const events = await getUpcomingEvents();

    return new Response(JSON.stringify({ events }), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Unable to load public calendar', error);
    return Response.json({ error: 'Unable to load upcoming events.' }, { status: 502 });
  }
};
