import { ArrowUpRight, Trophy, Medal } from 'lucide-react';

export function TournamentResults() {
  return (
    <section aria-label="2026 Aloha Kickball Classic congratulations" className="bg-gradient-to-br from-rose-600 via-orange-500 to-amber-400 px-4 py-12 text-white">
      <div className="mx-auto max-w-7xl">
      <h3 className="text-3xl font-extrabold">Tournament Results</h3>
      <p className="mt-2 text-white/90">Congratulations to our 2026 Aloha Kickball Classic champions and runners-up! Mahalo to every team for a weekend of pride, play, and ʻohana.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-amber-200/60 bg-slate-950/90 p-6 shadow-xl">
          <Trophy className="h-9 w-9 text-amber-300" aria-hidden="true" />
          <p className="mt-4 text-sm font-bold uppercase tracking-widest text-amber-300">1st Place · Champions</p>
          <h4 className="mt-2 text-3xl font-extrabold text-white">Salty Gulps</h4>
          <p className="mt-2 text-slate-200">Congratulations on taking home the championship!</p>
        </div>
        <div className="rounded-2xl border border-teal-200/40 bg-slate-950/90 p-6 shadow-xl">
          <Medal className="h-9 w-9 text-teal-200" aria-hidden="true" />
          <p className="mt-4 text-sm font-bold uppercase tracking-widest text-teal-200">2nd Place · Runners-Up</p>
          <h4 className="mt-2 text-3xl font-extrabold text-white">Dirty Bases</h4>
          <p className="mt-2 text-slate-200">Congratulations on an incredible tournament!</p>
        </div>
      </div>
      </div>
    </section>
  );
}

export default function TournamentSchedule() {
  return (
    <div className="relative mx-auto mt-8 max-w-7xl border-t border-white/30 pt-6">
      <h3 className="text-3xl font-extrabold">Game Schedule</h3>
      <a
        href="https://teamsideline.com/sites/aikaneohana/schedule/741915/Competitive"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 font-bold text-teal-200 shadow-md transition hover:bg-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        View Both Days’ Game Schedules &amp; Bracket
        <ArrowUpRight className="h-5 w-5 shrink-0" aria-hidden="true" />
      </a>
    </div>
  );
}
