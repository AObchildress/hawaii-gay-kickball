import schedule from './tournament-schedule.json';

const divisions = [
  { name: 'Competitive', games: schedule.competitive, href: 'https://teamsideline.com/sites/aikaneohana/schedule/741915/Competitive' },
  { name: 'Intermediate', games: schedule.intermediate, href: 'https://teamsideline.com/sites/aikaneohana/schedule/741916/Intermediate' },
];

export default function TournamentSchedule() {
  return (
    <div className="relative mx-auto mt-12 max-w-7xl border-t border-white/30 pt-10">
      <h3 className="text-3xl font-extrabold">Game Schedule</h3>
      <p className="mt-3 text-white/90">All times Hawaiʻi Standard Time (HST). Schedules are subject to change; check TeamSideline for the latest updates.</p>
      <div className="mt-6 grid items-start gap-6 xl:grid-cols-2">
        {[
          { title: 'Saturday Pool Play', date: 'November 14, 2026', index: 0 },
          { title: 'Sunday Championship Games', date: 'November 15, 2026', index: 1 },
        ].map((day) => (
          <div key={day.index} className="min-w-0 rounded-3xl bg-slate-950/90 p-5 shadow-xl md:p-7">
            <h4 className="text-2xl font-extrabold">{day.title}</h4>
            <p className="mt-1 text-amber-300">{day.date}</p>
            {day.index === 1 && <p className="mt-3 text-sm text-slate-300">Sunday includes playoff rounds and both division finals. Seeds are determined by pool play; game numbers refer to that division’s bracket.</p>}
            {divisions.map((division) => (
              <div key={division.name} className="mt-6">
                <h5 className="mb-3 text-lg font-bold text-teal-300">{division.name}</h5>
                <div className="overflow-x-auto rounded-xl border border-white/15" role="region" aria-label={`${day.title} — ${division.name}`} tabIndex={0}>
                  <table className="w-full text-left text-sm">
                    <caption className="sr-only">{division.name} — {day.title}, {day.date}, HST</caption>
                    <thead className="bg-white/10 text-slate-200">
                      <tr>
                        <th scope="col" className="px-3 py-3">Time</th>
                        {day.index === 1 && <th scope="col" className="px-3 py-3">Game</th>}
                        <th scope="col" className="px-3 py-3">Home / Away</th>
                        <th scope="col" className="px-3 py-3">Field</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {division.games[day.index].map((game, index) => {
                        const offset = day.index === 1 ? 1 : 0;
                        const isFinal = day.index === 1 && index === division.games[1].length - 1;
                        return (
                          <tr key={index} className={isFinal ? 'bg-amber-300/10' : ''}>
                            <td className="whitespace-nowrap px-3 py-3 font-bold">{game[1]}</td>
                            {day.index === 1 && <td className="px-3 py-3">{game[2]}{isFinal && <span className="mt-1 block text-xs font-bold text-amber-300">Final</span>}</td>}
                            <td className="min-w-32 px-3 py-3"><span className="block">{game[2 + offset]}</span><span className="text-slate-300">vs. {game[3 + offset]}</span></td>
                            <td className="whitespace-nowrap px-3 py-3">{game[4 + offset]}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <a href={division.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block font-bold text-teal-300 underline underline-offset-4 hover:text-white">{division.name} schedule &amp; bracket ↗</a>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
