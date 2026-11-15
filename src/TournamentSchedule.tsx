import schedule from './tournament-schedule.json';
import umpireAssignments from './tournament-umpires.json';
import { BookOpen, ArrowUpRight } from 'lucide-react';

const divisions = [
  { name: 'Competitive', games: schedule.competitive, href: 'https://teamsideline.com/sites/aikaneohana/schedule/741915/Competitive' },
];

const gameUmpires: Record<string, string> = umpireAssignments;

const sundayFirstBaseTeams: Record<string, string> = {
  G1: 'Dirty Bases',
  G2: 'I Love DP',
  G3: 'G2 Loser',
  G4: 'Spread Eagles',
  G5: 'G3 Loser',
};

export default function TournamentSchedule() {
  return (
    <div className="relative mx-auto mt-8 max-w-7xl border-t border-white/30 pt-6">
      <h3 className="text-3xl font-extrabold">Game Schedule</h3>
      <p className="mt-2 text-sm text-white/90">All times Hawaiʻi Standard Time (HST). Schedules are subject to change; check TeamSideline for the latest updates.</p>
      <a
        href="/documents/2026-aloha-classic-tournament-rulebook.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex max-w-xl items-center gap-4 rounded-2xl border border-white/30 bg-slate-950/85 p-4 text-white shadow-md transition hover:bg-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        <span className="rounded-xl bg-amber-300/15 p-3 text-amber-300"><BookOpen className="h-6 w-6" aria-hidden="true" /></span>
        <span className="flex-1">
          <span className="block text-lg font-bold">Tournament Rulebook</span>
          <span className="mt-1 block text-sm text-slate-300">2026 Aloha Classic · View PDF in a new tab</span>
        </span>
        <ArrowUpRight className="h-5 w-5 shrink-0 text-amber-300" aria-hidden="true" />
      </a>
      <div className="mt-4 grid items-start gap-4 lg:grid-cols-2">
        {[
          { title: 'Saturday Pool Play', date: 'November 14, 2026', index: 0 },
          { title: 'Sunday Championship Games', date: 'November 15, 2026', index: 1 },
        ].map((day) => (
          <div key={day.index} className="min-w-0 rounded-2xl bg-slate-950/90 p-4 shadow-xl md:p-5">
            <h4 className="text-xl font-extrabold">{day.title}</h4>
            <p className="mt-1 text-sm text-amber-300">{day.date}</p>
            {day.index === 1 && <p className="mt-2 text-sm text-slate-300">Sunday includes playoff rounds and the Competitive championship final. Seeds are determined by pool play; game numbers refer to the bracket.</p>}
            {divisions.map((division) => (
              <div key={division.name} className="mt-4">
                <h5 className="mb-2 text-base font-bold text-teal-300">{division.name}</h5>
                <div className="overflow-x-auto rounded-xl border border-white/15" role="region" aria-label={`${day.title} — ${division.name}`} tabIndex={0}>
                  <table className="w-full text-left text-sm leading-snug">
                    <caption className="sr-only">{division.name} — {day.title}, {day.date}, HST</caption>
                    <thead className="bg-white/10 text-slate-200">
                      <tr>
                        <th scope="col" className="px-2 py-2">Time</th>
                        {day.index === 1 && <th scope="col" className="px-2 py-2">Game</th>}
                        <th scope="col" className="px-2 py-2">Home / Away</th>
                        <th scope="col" className="px-2 py-2">Field</th>
                        <th scope="col" className="px-2 py-2">{day.index === 1 ? 'Umpires' : 'Umpire'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {division.games[day.index].map((game, index) => {
                        const offset = day.index === 1 ? 1 : 0;
                        const isFinal = day.index === 1 && index === division.games[1].length - 1;
                        const umpire = gameUmpires[game.join('|')] ?? 'TBD';
                        return (
                          <tr key={index} className={isFinal ? 'bg-amber-300/10' : ''}>
                            <td className="whitespace-nowrap px-2 py-2 font-bold">{game[1]}</td>
                            {day.index === 1 && <td className="px-2 py-2">{game[2]}{isFinal && <span className="mt-1 block text-xs font-bold text-amber-300">Final</span>}</td>}
                            <td className={`${day.index === 1 ? 'min-w-24' : 'min-w-32'} px-2 py-2`}><span className="block">{game[2 + offset]}</span><span className="text-slate-300">vs. {game[3 + offset]}</span></td>
                            <td className="px-2 py-2">{game[4 + offset]}</td>
                            <td className={`min-w-24 px-2 py-2 ${umpire === 'TBD' ? 'font-bold text-amber-300' : 'text-teal-200'}`}>
                              <span className="block">{day.index === 1 && <span className="block text-xs text-slate-400">Main umpire</span>}{umpire}</span>
                              {day.index === 1 && <span className="mt-2 block"><span className="block text-xs text-slate-400">1st base team</span>{sundayFirstBaseTeams[game[2]] ?? 'TBD'}</span>}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                {day.index === 1 && <p className="mt-3 text-xs leading-relaxed text-slate-300">*Final: Nathan Schapiro if Slutty Innings are eliminated; otherwise Mari Castro. Neither umpire will officiate their own team.</p>}
                {day.index === 1 && <p className="mt-2 text-xs leading-relaxed text-slate-300">Each assigned team supplies one first-base umpire. “Loser” means the team eliminated from that bracket game.</p>}
                <a href={division.href} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-bold text-teal-300 underline underline-offset-4 hover:text-white">{division.name} schedule &amp; bracket ↗</a>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
