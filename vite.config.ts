import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { getUpcomingEvents } from './server/calendar-events.ts';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'local-calendar-events',
      configureServer(server) {
        server.middlewares.use('/api/events', async (_request, response) => {
          try {
            const events = await getUpcomingEvents();
            response.setHeader('Content-Type', 'application/json; charset=utf-8');
            response.end(JSON.stringify({ events }));
          } catch (error) {
            console.error('Unable to load public calendar', error);
            response.statusCode = 502;
            response.end(JSON.stringify({ error: 'Unable to load upcoming events.' }));
          }
        });
      },
    },
  ],
});
