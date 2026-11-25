import { BookOpen, Medal, Trophy } from 'lucide-react';
import schedule from './tournament-schedule.json';
import umpireAssignments from './tournament-umpires.json';

const [saturdayGames, sundayGames] = schedule.competitive;
const gameUmpires: Record<string, string> = umpireAssignments;

export function TournamentResults() {
  return (
    <section id="results" aria-labelledby="classic-results-title" className="scroll-mt-6 border-t border-white/25 pt-6">
      <h2 id="classic-results-title" className="text-2xl font-extrabold">Tournament Results</h2>
      <p className="mt-2 text-white/90">Congratulations to our 2026 Aloha Kickball Classic champions and runners-up! Mahalo to every team for a weekend of pride, play, and ʻohana.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-amber-200/60 bg-slate-950/90 p-6 shadow-xl">
          <Trophy className="h-9 w-9 text-amber-300" aria-hidden="true" />
          <p className="mt-4 text-sm font-bold uppercase tracking-widest text-amber-300">1st Place · Champions</p>
          <h3 className="mt-2 text-3xl font-extrabold text-white">Salty Gulps</h3>
          <p className="mt-2 text-slate-200">Congratulations on taking home the championship!</p>
        </div>
        <div className="rounded-2xl border border-teal-200/40 bg-slate-950/90 p-6 shadow-xl">
          <Medal className="h-9 w-9 text-teal-200" aria-hidden="true" />
          <p className="mt-4 text-sm font-bold uppercase tracking-widest text-teal-200">2nd Place · Runners-Up</p>
          <h3 className="mt-2 text-3xl font-extrabold text-white">Dirty Bases</h3>
          <p className="mt-2 text-slate-200">Congratulations on an incredible tournament!</p>
        </div>
      </div>
    </section>
  );
}

export default function TournamentSchedule() {
  return (
    <section id="game-schedule" aria-labelledby="game-schedule-title" className="scroll-mt-6">
      <h2 id="game-schedule-title" className="text-3xl font-black tracking-tight text-slate-900">Game &amp; Umpire Schedule</h2>
      <p className="mt-2 text-slate-600">Competitive division · All times Hawaiʻi Standard Time (HST)</p>
      <div className="mt-5 grid items-start gap-5 xl:grid-cols-[1fr_1.15fr]">
        {[
          { id: 'saturday', title: 'Saturday Pool Play', date: 'November 14, 2026', games: saturdayGames },
          { id: 'sunday', title: 'Sunday Championship Games', date: 'November 15, 2026', games: sundayGames },
        ].map(({ id, title, date, games }) => {
          const isSunday = id === 'sunday';
          return (
            <section key={id} aria-labelledby={`${id}-games-title`} className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
              <h3 id={`${id}-games-title`} className="text-xl font-extrabold text-slate-900">{title}</h3>
              <p className="mt-1 text-sm font-semibold text-teal-800">{date}</p>
              <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700" role="region" aria-labelledby={`${id}-games-title`} tabIndex={0}>
                <table className="w-full text-left text-sm leading-snug">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th scope="col" className="px-3 py-3">Time</th>
                      <th scope="col" className="px-3 py-3">Matchup</th>
                      <th scope="col" className="px-3 py-3">Field</th>
                      <th scope="col" className="px-3 py-3">Umpire</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {games.map((game) => {
                      const [time, gameNumber, home, away, field] = isSunday
                        ? game.slice(1)
                        : [game[1], undefined, ...game.slice(2)];
                      const isFinal = gameNumber === 'G5';
                      const gameKey = game.join('|');
                      return (
                        <tr key={gameKey} className={isFinal ? 'bg-amber-50' : undefined}>
                          <td className="whitespace-nowrap px-3 py-3 font-bold text-slate-900">{time}</td>
                          <th scope="row" className="min-w-28 px-3 py-3 font-semibold text-slate-900">
                            {gameNumber && <span className="mb-1 block text-sm font-bold text-teal-800">{gameNumber}{isFinal && ' · Final'}</span>}
                            <span className="block">{home}</span>
                            <span className="block font-normal text-slate-600">vs. {away}</span>
                          </th>
                          <td className="min-w-16 px-3 py-3">{field}</td>
                          <td className="min-w-24 px-3 py-3 text-slate-800">
                            {gameUmpires[gameKey] ?? 'TBD'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <a href="https://teamsideline.com/sites/aikaneohana/schedule/741915/Competitive" target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-xl bg-teal-800 px-5 py-3 font-bold text-white transition hover:bg-teal-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800">
          TeamSideline schedule &amp; bracket
        </a>
        <a href="/documents/2026-aloha-classic-tournament-rulebook.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-teal-800 bg-white px-5 py-3 font-bold text-teal-900 transition hover:bg-teal-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800">
          <BookOpen className="h-5 w-5" aria-hidden="true" /> Tournament Rulebook (PDF)
        </a>
      </div>
    </section>
  );
}
