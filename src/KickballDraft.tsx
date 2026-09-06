import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Calendar,
  CalendarDays,
  Camera,
  Clock,
  Heart,
  Mail,
  MapPin,
  Menu,
  Shirt,
  Sparkles,
  Trophy,
  Users,
  X,
} from 'lucide-react';

function FacebookIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M14 8h3V4h-3c-3.3 0-5 2-5 5v2H6v4h3v7h4v-7h3.2l.8-4h-4V9c0-.7.3-1 1-1Z" />
    </svg>
  );
}

function InstagramIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const BOARD_MEMBERS = [
  { name: 'Brandon Childress', role: 'Commissioner', email: 'brandon@hawaiigaykickball.com' },
  { name: 'Kanoa Keawe', role: 'Vice-Commissioner', email: 'kanoa@hawaiigaykickball.com' },
  { name: 'Win Ye', role: 'Secretary', email: 'win@hawaiigaykickball.com' },
  { name: 'Eric Rajasalu', role: 'Treasurer', email: 'eric@hawaiigaykickball.com' },
  { name: 'Josh Ray', role: 'Director at Large', email: 'josh@hawaiigaykickball.com' },
  { name: 'Kiera Williams', role: 'Director at Large', email: 'kiera@hawaiigaykickball.com' },
  { name: 'Koko Angay', role: 'Director at Large', email: 'koko@hawaiigaykickball.com' },
];

const TITLE_SPONSOR = {
  name: 'Highgate Pride',
  image: '/assets/sponsors/highgate-pride.jpg',
  href: 'https://www.highgate.com/',
};

const PRESENTING_SPONSORS = [
  { name: 'Bacchus Waikiki', image: '/assets/sponsors/bacchus-waikiki.png', href: 'https://bacchus2.com/' },
  { name: 'Tapas Waikiki', image: '/assets/sponsors/tapas-waikiki.png', href: 'https://www.hawaiigaybar.com/' },
  { name: "Hula's Bar & Lei Stand", image: '/assets/sponsors/hulas.png', href: 'https://hulas.com/' },
  { name: 'Eric Martin', image: '/assets/sponsors/eric-martin.png', href: 'https://ericzmartin.com/' },
];

type CalendarEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  location?: string;
  url?: string;
};

const HAWAII_TIME_ZONE = 'Pacific/Honolulu';

function eventDateParts(event: CalendarEvent) {
  const date = new Date(event.start);
  const timeZone = event.allDay ? 'UTC' : HAWAII_TIME_ZONE;

  return {
    month: new Intl.DateTimeFormat('en-US', { month: 'short', timeZone }).format(date).toUpperCase(),
    day: new Intl.DateTimeFormat('en-US', { day: 'numeric', timeZone }).format(date),
    weekday: new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone }).format(date),
  };
}

function eventTime(event: CalendarEvent) {
  if (event.allDay) return 'All day';

  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: HAWAII_TIME_ZONE,
  });

  return `${formatter.format(new Date(event.start))}–${formatter.format(new Date(event.end))}`;
}

const OPEN_COMMITTEES = [
  {
    name: 'Social Media & Communications',
    description: 'Create content, share league news, and celebrate our players, teams, sponsors, and community.',
  },
  {
    name: 'Sponsorships',
    description: 'Build relationships with supportive businesses and help deliver meaningful sponsor benefits.',
  },
  {
    name: 'Social Events & Special Events',
    description: 'Plan socials, celebrations, fundraisers, and welcoming events that strengthen our ʻohana.',
  },
  {
    name: 'Community Outreach',
    description: 'Connect HIGKL with local organizations, service opportunities, and community events.',
  },
  {
    name: 'Tournament',
    description: 'Help organize tournament registration, schedules, volunteers, fields, awards, and game-day operations.',
  },
];

export default function HawaiiGayKickballShell() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsError, setEventsError] = useState(false);
  const [showAllEvents, setShowAllEvents] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/events', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load events');
        return response.json() as Promise<{ events: CalendarEvent[] }>;
      })
      .then((data) => setEvents(data.events))
      .catch((error) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setEventsError(true);
      })
      .finally(() => setEventsLoading(false));

    return () => controller.abort();
  }, []);

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const firstName = String(formData.get('first-name') || '').trim();
    const lastName = String(formData.get('last-name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const fullName = `${firstName} ${lastName}`.trim();
    const subject = `Website inquiry from ${fullName}`;
    const body = `Name: ${fullName}\nEmail: ${email}\n\nMessage:\n${message}`;

    window.location.href = `mailto:bod@hawaiigaykickball.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased scroll-smooth">
      {/* Top Rainbow Accent Bar */}
      <div className="h-2 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500" />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-24 items-center">
            {/* Logo */}
            <a href="#" className="flex items-center" aria-label="Hawaiʻi Gay Kickball League home">
              <img
                src="/assets/hawaii-gay-kickball-league-logo.png"
                alt="Hawaiʻi Gay Kickball League"
                className="h-20 w-auto object-contain py-1"
              />
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center space-x-6 text-sm font-medium text-slate-600">
              <a href="#about" className="hover:text-teal-600 transition">About</a>
              <a href="#board" className="hover:text-teal-600 transition">Board</a>
              <a href="#events" className="hover:text-teal-600 transition">Upcoming Events</a>
              <a href="#classic" className="hover:text-teal-600 transition">2026 Aloha Kickball Classic</a>
              <a href="#sponsors" className="hover:text-teal-600 transition">Sponsors</a>
              <a href="#photos" className="hover:text-teal-600 transition">League Photos</a>
              <a href="#contact" className="hover:text-teal-600 transition">Contact</a>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-slate-700 hover:text-teal-600 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-700 font-medium"
            >
              About
            </a>
            <a
              href="#board"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-700 font-medium"
            >
              Board of Directors
            </a>
            <a
              href="#events"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-700 font-medium"
            >
              Upcoming Events
            </a>
            <a
              href="#classic"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-700 font-medium"
            >
              2026 Aloha Kickball Classic
            </a>
            <a
              href="#sponsors"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-700 font-medium"
            >
              Sponsors
            </a>
            <a
              href="#photos"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-700 font-medium"
            >
              League Photos
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-700 font-medium"
            >
              Contact
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        className="relative text-white py-24 md:py-36 px-4 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.78) 0%, rgba(13, 148, 136, 0.58) 100%), url('/assets/diamond-head-from-kapiolani-park.jpg')`,
          backgroundPosition: 'center 68%',
        }}
      >
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <span className="inline-block bg-white/20 backdrop-blur px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase border border-white/30">
            Aloha & Welcome • LGBTQ+ & Allies
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Pride • Play • ʻOhana
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto font-light">
            Join Hawaiʻi's largest inclusive adult sports league!
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#events"
              className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" /> View Upcoming Events
            </a>
            <a
              href="#about"
              className="bg-white/10 hover:bg-white/20 backdrop-blur border border-white/30 text-white font-bold px-8 py-4 rounded-xl transition flex items-center justify-center gap-2"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-slate-900 text-white py-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4 flex items-center justify-center gap-4">
            <div className="p-3 bg-teal-500/20 text-teal-400 rounded-lg">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h4 className="font-bold">Location</h4>
              <p className="text-sm text-slate-400">Kapiʻolani Park, Waikīkī</p>
            </div>
          </div>
          <div className="p-4 flex items-center justify-center gap-4">
            <div className="p-3 bg-rose-500/20 text-rose-400 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h4 className="font-bold">All Skill Levels</h4>
              <p className="text-sm text-slate-400">Co-ed, inclusive & welcoming</p>
            </div>
          </div>
          <div className="p-4 flex items-center justify-center gap-4">
            <div className="p-3 bg-amber-500/20 text-amber-400 rounded-lg">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h4 className="font-bold">Weekly Themes</h4>
              <p className="text-sm text-slate-400">Spirit themes & social events</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Our Mission</h2>
          <div className="w-20 h-1 bg-teal-500 mx-auto rounded-full" />
          <p className="text-lg text-slate-600 pt-2">
            The Hawaii Gay Kickball league is a co-ed community minded group that strives to provide an inclusive, safe, and enjoyable atmosphere for the lesbian, gay, bisexual, transgender, queer and the LGBTQI-friendly community. Our kickball league fosters sportsmanship, friendly competition and community building through the sport of kickball.
          </p>
        </div>

      </section>

      {/* 2026 Aloha Kickball Classic */}
      <section id="classic" className="relative overflow-hidden bg-gradient-to-br from-rose-600 via-orange-500 to-amber-400 px-4 py-20 text-white scroll-mt-24">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10" />
        <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-fuchsia-700/20" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-sm font-bold uppercase tracking-[0.18em] backdrop-blur">
              <Trophy className="h-4 w-4" /> Annual Tournament
            </span>
            <div>
              <p className="mb-2 text-lg font-bold text-amber-100">Save the date</p>
              <h2 className="text-4xl font-black leading-tight md:text-6xl">2026 Aloha Kickball Classic</h2>
            </div>
            <p className="max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
              Our annual tournament is headed to Kona for a weekend of kickball, community, friendly competition, and island hospitality.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="https://teamsideline.com/sites/aikaneohana/program/118705/2026-Aloha-Kickball-Classic"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-4 font-bold text-white shadow-xl transition hover:-translate-y-1 hover:bg-slate-900"
              >
                Captain Registration <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="https://forms.gle/9sNVfj8uFNE2PTSj9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/50 bg-white px-6 py-4 font-bold text-rose-700 shadow-xl transition hover:-translate-y-1 hover:bg-rose-50"
              >
                Free Agent Registration <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/30 bg-slate-950/85 p-8 shadow-2xl backdrop-blur md:p-10">
            <div className="space-y-7">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-rose-500/20 p-3 text-rose-300">
                  <CalendarDays className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">Tournament Dates</p>
                  <p className="mt-1 text-2xl font-black">November 13–15, 2026</p>
                </div>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-teal-500/20 p-3 text-teal-300">
                  <MapPin className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">Destination</p>
                  <p className="mt-1 text-2xl font-black">Kona, Hawaiʻi Island</p>
                </div>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-amber-500/20 p-3 text-amber-300">
                  <Users className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">Experience</p>
                  <p className="mt-1 text-lg font-bold">Kickball, connection, and aloha</p>
                </div>
              </div>
              <div className="h-px bg-white/10" />
              <div>
                <h3 className="mb-4 flex items-center gap-2 text-lg font-black">
                  <Clock className="h-5 w-5 text-rose-300" /> Weekend Schedule
                </h3>
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="font-bold text-white">Friday, Nov. 13</dt>
                    <dd className="text-slate-300">Opening Party</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-white">Saturday &amp; Sunday, Nov. 14–15</dt>
                    <dd className="text-slate-300">Tournament Games</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-white">Sunday, Nov. 15</dt>
                    <dd className="text-slate-300">Closing Event</dd>
                  </div>
                  <div className="rounded-xl bg-white/10 p-4">
                    <dt className="font-bold uppercase tracking-wider text-amber-300">Host Hotel</dt>
                    <dd className="mt-1 text-base font-bold text-white">Pacific 19</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Committee Volunteers */}
      <section id="committees" className="bg-white px-4 py-20 scroll-mt-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">Get Involved</span>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 md:text-4xl">Join a League Committee</h2>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-rose-500" />
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Share your skills, meet more of our ʻohana, and help shape the next season of Hawaiʻi Gay Kickball. We welcome volunteers with any level of experience.
            </p>
          </div>

          <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-teal-700 to-slate-900 p-8 text-white shadow-xl md:p-10">
            <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <span className="inline-flex rounded-full bg-amber-400 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-slate-950">
                  Highest Priority
                </span>
                <h3 className="mt-4 text-3xl font-black">Fields &amp; Umpires Committee</h3>
                <p className="mt-3 max-w-3xl text-lg leading-relaxed text-slate-200">
                  Help keep league play safe, organized, consistent, and fair by coordinating field needs, monitoring conditions, supporting game-day operations, and recruiting and scheduling umpires.
                </p>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-500 px-7 py-4 font-extrabold text-white shadow-lg transition hover:-translate-y-1 hover:bg-rose-600"
              >
                I Want to Help <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {OPEN_COMMITTEES.map((committee) => (
              <article key={committee.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <h3 className="text-xl font-extrabold text-slate-900">{committee.name}</h3>
                <p className="mt-3 leading-relaxed text-slate-600">{committee.description}</p>
              </article>
            ))}
            <div className="flex flex-col items-start justify-center rounded-2xl border border-dashed border-teal-300 bg-teal-50 p-6">
              <p className="font-bold text-teal-900">Not sure where you fit?</p>
              <p className="mt-2 text-sm leading-relaxed text-teal-800">Tell us what you enjoy doing, and we’ll help you find the right committee.</p>
              <a href="#contact" className="mt-4 inline-flex items-center gap-2 font-extrabold text-teal-700 hover:text-teal-900">
                Contact the Board <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section id="events" className="border-y border-slate-200 bg-slate-100 px-4 py-20 scroll-mt-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">League Calendar</span>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 md:text-4xl">Upcoming Events</h2>
            <p className="mt-3 text-lg text-slate-600">
              Stay up to date with upcoming games, socials, clinics, tournaments, and community events.
            </p>
          </div>

          {eventsLoading ? (
            <div className="grid gap-5 md:grid-cols-2" aria-label="Loading upcoming events">
              {[0, 1, 2, 3].map((item) => (
                <div key={item} className="h-36 animate-pulse rounded-2xl border border-slate-200 bg-white shadow-sm" />
              ))}
            </div>
          ) : eventsError ? (
            <div className="rounded-3xl border border-rose-200 bg-white px-6 py-12 text-center shadow-sm">
              <CalendarDays className="mx-auto h-10 w-10 text-rose-500" />
              <h3 className="mt-4 text-xl font-extrabold text-slate-900">The calendar is taking a timeout.</h3>
              <p className="mt-2 text-slate-600">Please open the public calendar to see the latest league events.</p>
            </div>
          ) : events.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
              <CalendarDays className="mx-auto h-10 w-10 text-teal-600" />
              <h3 className="mt-4 text-xl font-extrabold text-slate-900">More events are coming soon.</h3>
              <p className="mt-2 text-slate-600">No upcoming events are posted yet. Check back soon for league updates.</p>
            </div>
          ) : (
            <>
              <div className="grid gap-5 md:grid-cols-2">
                {events.slice(0, showAllEvents ? events.length : 6).map((event) => {
                  const date = eventDateParts(event);
                  const content = (
                    <>
                      <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-rose-500 text-white shadow-sm">
                        <span className="text-xs font-black tracking-widest">{date.month}</span>
                        <span className="text-3xl font-black leading-none">{date.day}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-teal-700">{date.weekday}</p>
                        <h3 className="mt-1 text-xl font-extrabold text-slate-900">{event.title}</h3>
                        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
                          <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-rose-500" />{eventTime(event)}</span>
                          {event.location && <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-rose-500" />{event.location}</span>}
                        </div>
                      </div>
                    </>
                  );

                  return event.url ? (
                    <a key={event.id} href={event.url} target="_blank" rel="noopener noreferrer" className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg">
                      {content}
                    </a>
                  ) : (
                    <article key={event.id} className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      {content}
                    </article>
                  );
                })}
              </div>

              {events.length > 6 && (
                <div className="mt-8 text-center">
                  <button type="button" onClick={() => setShowAllEvents((value) => !value)} className="rounded-xl bg-teal-600 px-7 py-3 font-extrabold text-white shadow-sm transition hover:bg-teal-700">
                    {showAllEvents ? 'Show Fewer Events' : 'Show More Events'}
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </section>

      {/* Schedule / Weekly Themes Section */}
      <section id="schedule" className="bg-slate-100 py-20 px-4 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Season 11 Updates & Schedule</h2>
            <p className="text-slate-600 mt-2">Check back here for weekly spirit themes, key dates, and game day schedules.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Key Season Dates */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-900">
                <CalendarDays className="text-teal-600" /> Key Season Dates
              </h3>
              <ul className="space-y-3">
                {['Registration', 'Clinic 1', 'Clinic 2', 'Clinic 3', 'Season Dates'].map((item) => (
                  <li
                    key={item}
                    className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-4 py-3"
                  >
                    <span className="font-semibold text-slate-800">{item}</span>
                    <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-black tracking-wider text-teal-800">TBA</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Spirit Themes */}
            <div className="bg-gradient-to-br from-teal-700 to-slate-900 text-white p-6 md:p-8 rounded-2xl shadow-md">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Shirt className="text-rose-400" /> Spirit & Dress Themes
              </h3>
              <p className="text-slate-300 text-sm mb-6">
                Season 11 spirit and dress themes are being planned.
              </p>
              <div className="rounded-xl border border-dashed border-white/30 bg-white/10 p-8 text-center backdrop-blur">
                <p className="text-3xl font-black tracking-[0.18em] text-amber-300">TBA</p>
                <p className="mt-3 text-sm font-medium text-slate-300">Weekly themes will be announced soon.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Field Location */}
      <section id="location" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Game Day Field Location</h2>
            <p className="text-slate-600 leading-relaxed">
              All regular season matches are played at iconic <strong>Kapiʻolani Regional Park</strong> right in Waikīkī, Oʻahu.
            </p>
            <div className="space-y-3 text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-rose-500 shrink-0 mt-1" />
                <div>
                  <strong>Address:</strong>
                  <br />
                  Kapiʻolani Park (Near Monsarrat Ave & Kalākaua Ave)
                  <br />
                  Honolulu, HI 96815
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-teal-500 shrink-0 mt-1" />
                <div>
                  <strong>Schedules:</strong> Saturdays during active seasons (check team bracket for field assignments).
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 h-80">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3717.868770281227!2d-157.81881262396162!3d21.27668607921389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c006d75c5897c9b%3A0xb363405c93d9435b!2sKapi%CA%BBolani%20Regional%20Park!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kapiolani Regional Park Map"
            />
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="bg-slate-900 text-white py-20 px-4 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="mx-auto mb-14 max-w-3xl text-center space-y-4">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">Season 10 Sponsors</span>
            <h2 className="text-3xl md:text-4xl font-extrabold">Mahalo to Our Community Sponsors</h2>
            <p className="text-slate-300 leading-relaxed">
              The Hawaii Gay Kickball League would like to thank our Season 10 sponsors for their generous support. Your contributions allow us to create a safe, inclusive and enjoyable space for the LGBTQ+ community on Oahu. Mahalo nui!
            </p>
          </div>

          <div className="space-y-14">
            <div>
              <h3 className="mb-6 text-center text-sm font-black uppercase tracking-[0.25em] text-amber-300">Title Sponsor</h3>
              <a
                href={TITLE_SPONSOR.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-auto flex h-72 max-w-md items-center justify-center rounded-3xl bg-white p-8 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <img src={TITLE_SPONSOR.image} alt={TITLE_SPONSOR.name} className="h-full w-full object-contain" />
              </a>
            </div>

            <div>
              <h3 className="mb-6 text-center text-sm font-black uppercase tracking-[0.25em] text-teal-300">Presenting Sponsors</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {PRESENTING_SPONSORS.map((sponsor) => (
                  <a
                    key={sponsor.name}
                    href={sponsor.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-56 items-center justify-center rounded-2xl bg-white p-7 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <img src={sponsor.image} alt={sponsor.name} loading="lazy" className="max-h-full max-w-full object-contain" />
                  </a>
                ))}
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-6 text-center text-sm font-black uppercase tracking-[0.25em] text-yellow-400">Gold Level</h3>
                <a
                  href="https://medinainnovations.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-64 items-center justify-center rounded-2xl border-2 border-yellow-400/60 bg-white p-8 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <img
                    src="/assets/sponsors/medina-innovations.png"
                    alt="Medina Innovations"
                    loading="lazy"
                    className="max-h-full max-w-full object-contain"
                  />
                </a>
              </div>

              <div>
                <h3 className="mb-6 text-center text-sm font-black uppercase tracking-[0.25em] text-slate-300">Silver Level</h3>
                <div className="flex h-64 items-center justify-center overflow-hidden rounded-2xl border-2 border-slate-300/60 bg-black p-8 shadow-lg">
                  <img
                    src="/assets/sponsors/team-mimosa.jpg"
                    alt="Team Mimosa"
                    loading="lazy"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* League Photos */}
      <section id="photos" className="bg-gradient-to-br from-violet-50 via-white to-cyan-50 px-4 py-20 scroll-mt-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 overflow-hidden rounded-3xl border border-violet-100 bg-white p-8 shadow-xl md:grid-cols-2 md:p-12">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-bold uppercase tracking-[0.18em] text-violet-700">
              <Camera className="h-4 w-4" /> Official League Photography
            </span>
            <div>
              <h2 className="text-3xl font-black text-slate-900 md:text-5xl">League Photos</h2>
              <p className="mt-3 text-xl font-bold text-violet-700">by Eric Z-Martin Photography</p>
            </div>
            <p className="text-lg leading-relaxed text-slate-600">
              Relive the action, team spirit, and community moments from Hawaii Gay Kickball League events in our official photo galleries.
            </p>
            <a
              href="https://ericzmartin.smugmug.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-violet-700 px-7 py-4 font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-violet-800"
            >
              Browse Photo Galleries <ArrowRight className="h-5 w-5" />
            </a>
          </div>

          <a
            href="https://ericzmartin.smugmug.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Hawaii Gay Kickball League galleries by Eric Z-Martin Photography"
            className="flex min-h-72 items-center justify-center rounded-2xl border border-slate-200 bg-white p-10 shadow-inner transition hover:-translate-y-1 hover:shadow-lg"
          >
            <img
              src="/assets/sponsors/eric-martin.png"
              alt="Eric Z-Martin Photography"
              className="w-full max-w-xl object-contain"
            />
          </a>
        </div>
      </section>

      {/* Board of Directors */}
      <section id="board" className="bg-white py-20 px-4 border-y border-slate-200 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">League Leadership</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Board of Directors</h2>
            <div className="w-20 h-1 bg-rose-500 mx-auto rounded-full" />
            <p className="text-slate-600 pt-2">
              Meet the volunteers who guide the league and help make every season welcoming, organized, and fun.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {BOARD_MEMBERS.map((member) => (
              <article
                key={member.name}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-teal-600">{member.role}</p>
                <h3 className="text-2xl font-extrabold text-slate-900">{member.name}</h3>
                <a
                  href={`mailto:${member.email}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-teal-700"
                >
                  <Mail className="h-4 w-4" />
                  {member.email}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Donate */}
      <section className="border-b border-rose-100 bg-rose-50 px-4 py-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-5 rounded-2xl border border-rose-200 bg-white p-6 text-center shadow-sm sm:flex-row sm:text-left">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Support Our League</h2>
            <p className="mt-1 text-slate-600">Help us keep kickball inclusive, welcoming, and accessible for our community.</p>
          </div>
          <a
            href="https://www.zeffy.com/en-US/donation-form/bc9b737e-c2af-4da4-9c00-a2bd4bb39c0a"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Donate to Hawaiʻi Gay Kickball League"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-rose-600 px-6 py-3 font-extrabold text-white shadow transition hover:bg-rose-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-300"
          >
            <Heart className="h-5 w-5" fill="currentColor" aria-hidden="true" />
            Donate
          </a>
        </div>
      </section>

      {/* Contact Section with Netlify Form */}
      <section id="contact" className="py-20 px-4 max-w-4xl mx-auto">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200">
          <div className="text-center mb-8 space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900">Get In Touch</h2>
            <p className="text-slate-600">Have questions for the Board of Directors or interested in joining?</p>
          </div>

          <form name="contact" onSubmit={handleContactSubmit} className="space-y-6">

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="first-name">
                  First Name
                </label>
                <input
                  type="text"
                  id="first-name"
                  name="first-name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="last-name">
                  Last Name
                </label>
                <input
                  type="text"
                  id="last-name"
                  name="last-name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-xl shadow transition"
            >
              Send Message
            </button>
            <p className="text-center text-xs text-slate-500">
              This will open your email app with a message addressed to bod@hawaiigaykickball.com.
            </p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <img
              src="/assets/hawaii-gay-kickball-league-logo.png"
              alt=""
              className="h-20 w-auto shrink-0 object-contain"
            />
            <div>
            <p className="font-bold text-white text-lg">Hawaiʻi Gay Kickball League</p>
            <p className="text-sm">HIGKL is a program of Aikane Ohana, a 501(c)(3) nonprofit.</p>
            </div>
          </div>

          <div className="flex space-x-6 text-slate-400">
            <a
              href="https://www.facebook.com/groups/hawaiigaykickballleague"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hawaii Gay Kickball League on Facebook"
              className="hover:text-white transition"
            >
              <FacebookIcon className="w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com/hawaiigaykickball/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hawaii Gay Kickball League on Instagram"
              className="hover:text-white transition"
            >
              <InstagramIcon className="w-6 h-6" />
            </a>
          </div>

          <div className="text-center md:text-right">
            <p className="text-xs">&copy; 2017 Hawaiʻi Gay Kickball League. All rights reserved.</p>
            <p className="mt-2 text-[10px] text-slate-500">
              Hero photo: Daniel Ramirez via{' '}
              <a
                href="https://commons.wikimedia.org/wiki/File:Diamond_Head_from_Kapiolani_Park_(4670981021).jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-slate-300"
              >
                Wikimedia Commons
              </a>{' '}
              (CC BY 2.0)
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
