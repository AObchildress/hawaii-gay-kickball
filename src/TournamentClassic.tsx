import TournamentSchedule, { TournamentResults } from './TournamentSchedule';

const weekendSchedule = [
  { day: 'Friday, Nov. 13', events: [
    { time: '5–7 PM', name: 'Captains Meeting & Registration', detail: 'Puna Chocolate Company' },
    { time: '8–11 PM', name: 'Tournament Kickoff', detail: 'MyBar · Theme: HIGKL Airlines' },
  ] },
  { day: 'Saturday, Nov. 14', events: [
    { time: '8:30 AM', name: 'Opening Ceremony' },
    { time: '9 AM–3 PM', name: 'Round Robin Games' },
    { time: '12 PM', name: 'Lunch on the Fields' },
    { time: '4–8 PM', name: 'Splash Landing Pool Party', detail: 'Pacific 19' },
  ] },
  { day: 'Sunday, Nov. 15', events: [
    { time: 'From 10 AM', name: 'Elimination Games' },
    { time: '12 PM', name: 'Lunch on the Fields' },
    { time: 'After the games', name: 'Closing Ceremony & Awards' },
    { time: '6–9 PM', name: 'Final Boarding Call Closing Party', detail: 'MyBar' },
  ] },
];

export default function TournamentClassic() {
  return (
    <div className="island-site min-h-screen font-sans text-slate-800 antialiased">
      <div className="h-2 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500" />
      <nav aria-label="League navigation" className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
          <a href="/" aria-label="Hawaiʻi Gay Kickball League home">
            <img src="/assets/hawaii-gay-kickball-league-logo.png" alt="Hawaiʻi Gay Kickball League" className="h-16 w-auto object-contain sm:h-20" />
          </a>
          <a href="/" className="rounded-lg border border-teal-800 px-4 py-2 text-sm font-bold text-teal-900 transition hover:bg-teal-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800">League Home</a>
        </div>
      </nav>

      <main>
        <header className="bg-gradient-to-br from-rose-800 via-orange-800 to-amber-800 px-4 py-10 text-white sm:px-6 sm:py-14 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h1 className="max-w-4xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">2026 Aloha Kickball Classic</h1>
            <p className="mt-3 text-lg font-semibold text-amber-100">November 13–15, 2026 · Kona, Hawaiʻi Island</p>
            <p className="mt-3 max-w-3xl text-white/90">Mahalo for a wonderful weekend of kickball, community, and aloha! Host hotel: Pacific 19.</p>
            <ul aria-label="On this page" className="mb-7 mt-5 flex flex-wrap gap-x-5 gap-y-3 font-semibold">
              <li><a href="#results" className="underline underline-offset-4 hover:text-amber-200">Results</a></li>
              <li><a href="#game-schedule" className="underline underline-offset-4 hover:text-amber-200">Game &amp; umpire schedule</a></li>
              <li><a href="#weekend-schedule" className="underline underline-offset-4 hover:text-amber-200">Weekend schedule</a></li>
            </ul>
            <TournamentResults />
          </div>
        </header>

        <div className="mx-auto max-w-7xl space-y-12 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <TournamentSchedule />

          <section id="weekend-schedule" aria-labelledby="weekend-schedule-title" className="scroll-mt-6">
            <h2 id="weekend-schedule-title" className="text-3xl font-black tracking-tight text-slate-900">Weekend Schedule</h2>
            <p className="mt-2 text-slate-600">November 13–15, 2026 · All times HST</p>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {weekendSchedule.map(({ day, events }) => (
                <section key={day} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <h3 className="text-lg font-extrabold text-slate-900">{day}</h3>
                  <ul className="mt-4 divide-y divide-slate-200 border-t border-slate-200">
                    {events.map(({ time, name, detail }) => (
                      <li key={name} className="py-3 last:pb-0">
                        <span className="block text-sm font-bold text-teal-800">{time}</span>
                        <span className="mt-0.5 block font-semibold text-slate-900">{name}</span>
                        {detail && <span className="block text-sm text-slate-600">{detail}</span>}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="px-4 py-6 text-center text-sm font-semibold text-white">
        <a href="/" className="underline underline-offset-4 hover:text-teal-200">Hawaiʻi Gay Kickball League</a>
      </footer>
    </div>
  );
}
