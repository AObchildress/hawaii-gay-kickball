import React, { useState, useEffect, useRef } from 'react';
import { 
  Trophy, 
  Calendar, 
  Users, 
  ClipboardList, 
  Camera, 
  MessageCircle, 
  Menu, 
  X, 
  Flame, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  ChevronRight,
  ArrowRight,
  Search,
  Check
} from 'lucide-react';

const STANDINGS_DATA = [
  { rank: '01', team: 'Hibiscus Strikers', wins: 42, losses: 14, pins: 28450, highGame: 289, color: '#FF2E93' },
  { rank: '02', team: 'Pineapple Express', wins: 38, losses: 18, pins: 26900, highGame: 274, color: '#FFB81C' },
  { rank: '03', team: 'Ocean Rollers', wins: 31, losses: 25, pins: 25410, highGame: 268, color: '#00B4D8' },
  { rank: '04', team: 'Lava Lane Kings', wins: 28, losses: 28, pins: 24890, highGame: 255, color: '#FF5A5F' },
  { rank: '05', team: 'Rainbow Rollers', wins: 20, losses: 36, pins: 22100, highGame: 242, color: '#9D4EDD' },
];

const SCHEDULE_DATA = [
  { date: 'Jan 15', time: '6:30 PM', matchup: 'Hibiscus Strikers vs Pineapple Express', lanes: 'Lane 11 & 12', theme: 'Retro Hawaiian Night' },
  { date: 'Jan 22', time: '6:30 PM', matchup: 'Ocean Rollers vs Lava Lane Kings', lanes: 'Lane 13 & 14', theme: 'Neon Pride Glow' },
  { date: 'Jan 29', time: '6:30 PM', matchup: 'Rainbow Rollers vs Hibiscus Strikers', lanes: 'Lane 15 & 16', theme: 'Tiki Sparkle Tournament' },
  { date: 'Feb 05', time: '6:30 PM', matchup: 'Pineapple Express vs Ocean Rollers', lanes: 'Lane 11 & 12', theme: 'Aloha Classic Sweep' }
];

const PINSETTERS = [
  { pos: 1, name: '', role: 'Commissioner', emoji: '🌴', color: 'bg-rose-100 border-rose-400 text-rose-600', quote: 'Bringing the island community together through one massive strike at a time.' },
  { pos: 2, name: '', role: 'Design & Web', emoji: '🍍', color: 'bg-amber-100 border-amber-400 text-amber-600', quote: 'Injecting pure visual sunshine and digital retro magic into every lane.' },
  { pos: 3, name: '', role: 'Treasurer', emoji: '🍹', color: 'bg-teal-100 border-teal-400 text-teal-600', quote: 'Keeping our financial lanes clean, balanced, and perfectly coordinated.' }
];

function BowlingLanesWidget() {
  const [ballPosition, setBallPosition] = useState(0); // 0 is start, 100 is hit
  const [isRolling, setIsRolling] = useState(false);
  const [pinsHit, setPinsHit] = useState([]);
  const [scoreMessage, setScoreMessage] = useState("Roll to begin!");
  const [soundOn, setSoundOn] = useState(false);
  const audioContextRef = useRef(null);

  // Play synthetic retro bowling sounds using Web Audio API (highly safe and reliable!)
  const playBeep = (freq, duration, type = 'sine') => {
    if (!soundOn) return;
    try {
      if (!audioContextRef.current) {
        const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioContextRef.current = new AudioContextClass();
      }
      const ctx = audioContextRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio Context blocked or unsupported:", e);
    }
  };

  const rollBall = () => {
    if (isRolling) return;
    setIsRolling(true);
    setBallPosition(0);
    setPinsHit([]);
    setScoreMessage("Rolling... 🎳");
    
    // Ball rolling audio ramp
    let rollTimer = setInterval(() => {
      playBeep(120 + Math.random() * 30, 0.05, 'triangle');
    }, 100);

    // Ball traveling down the lane animation
    setTimeout(() => {
      clearInterval(rollTimer);
      setBallPosition(100);
      
      // Determine pins hit randomly (but make strikes highly likely!)
      const rolls = Math.random();
      let hitCount = 10;
      if (rolls > 0.8) hitCount = 8;
      else if (rolls > 0.6) hitCount = 9;

      const newPins = [];
      for (let i = 1; i <= 10; i++) {
        if (newPins.length < hitCount) {
          newPins.push(i);
        }
      }
      setPinsHit(newPins);
      
      if (hitCount === 10) {
        setScoreMessage("STRIKE! 🌈🤙");
        // Strike sound fanfare
        playBeep(523.25, 0.1); // C5
        setTimeout(() => playBeep(659.25, 0.1), 100); // E5
        setTimeout(() => playBeep(783.99, 0.3), 200); // G5
      } else {
        setScoreMessage(`Nice roll! ${hitCount} pins! 🍍`);
        playBeep(330, 0.2, 'sawtooth');
      }
      
      setIsRolling(false);
    }, 1500);
  };

  return (
    <div className="bg-white border-4 border-[#1E1E2F] rounded-[2.5rem] p-6 shadow-[8px_8px_0px_#1E1E2F] relative overflow-hidden flex flex-col items-center">
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <button 
          onClick={() => setSoundOn(!soundOn)} 
          className="p-2 rounded-full border-2 border-[#1E1E2F] hover:bg-[#FFF5E6] transition-colors"
          title="Toggle Sound FX"
        >
          {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
      </div>

      <h3 className="font-black text-lg text-[#1E1E2F] uppercase tracking-wider mb-2 flex items-center gap-2">
        <Sparkles size={16} className="text-[#FFB81C] animate-spin" /> ALOHA LANE WIDGET
      </h3>
      <p className="text-xs text-slate-500 font-bold mb-4 uppercase tracking-widest">{scoreMessage}</p>

      {/* SVG Bowling Lane Simulation */}
      <div className="w-full h-64 bg-gradient-to-b from-[#FFFDF6] via-[#FFF5E6] to-[#FFE5EC] border-2 border-[#1E1E2F] rounded-2xl relative overflow-hidden shadow-inner">
        
        {/* Colorful Lane Markings */}
        <div className="absolute left-1/2 -translate-x-1/2 w-8 h-full bg-gradient-to-r from-orange-400/20 via-yellow-400/20 to-teal-400/20 flex justify-between px-1">
          <div className="w-0.5 h-full bg-[#1E1E2F]/10" />
          <div className="w-0.5 h-full bg-[#1E1E2F]/10" />
        </div>

        {/* The Pins Layout */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1">
          {/* Row 4 (4 pins) */}
          <div className="flex space-x-2">
            {[7, 8, 9, 10].map(pin => (
              <span 
                key={pin} 
                className={`text-lg transition-transform duration-300 ${pinsHit.includes(pin) ? 'rotate-[75deg] translate-y-3 opacity-30 scale-75' : 'scale-100'}`}
              >
                📍
              </span>
            ))}
          </div>
          {/* Row 3 (3 pins) */}
          <div className="flex space-x-3">
            {[4, 5, 6].map(pin => (
              <span 
                key={pin} 
                className={`text-lg transition-transform duration-300 ${pinsHit.includes(pin) ? 'rotate-[-80deg] translate-y-3 opacity-30 scale-75' : 'scale-100'}`}
              >
                📍
              </span>
            ))}
          </div>
          {/* Row 2 (2 pins) */}
          <div className="flex space-x-4">
            {[2, 3].map(pin => (
              <span 
                key={pin} 
                className={`text-lg transition-transform duration-300 ${pinsHit.includes(pin) ? 'rotate-[90deg] translate-y-2 opacity-30 scale-75' : 'scale-100'}`}
              >
                📍
              </span>
            ))}
          </div>
          {/* Row 1 (1 pin) */}
          <div className="flex">
            <span 
              className={`text-lg transition-transform duration-300 ${pinsHit.includes(1) ? 'rotate-[45deg] translate-y-2 opacity-30 scale-75' : 'scale-100'}`}
            >
              📍
            </span>
          </div>
        </div>

        {/* The Animated Rainbow Ball */}
        <div 
          className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full shadow-lg transition-all duration-1000 ease-in flex items-center justify-center border-2 border-[#1E1E2F]"
          style={{
            bottom: isRolling ? '140px' : '10px',
            transform: `translateX(-50%) scale(${isRolling ? 0.6 : 1.0})`,
            background: 'linear-gradient(45deg, #FF2E93, #FFB81C, #00B4D8)',
            boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
          }}
        >
          <div className="w-2 h-2 rounded-full bg-white opacity-80 absolute top-1 left-1" />
        </div>
      </div>

      <button 
        onClick={rollBall}
        disabled={isRolling}
        className="mt-6 w-full py-3 bg-[#FF2E93] text-white font-black uppercase tracking-widest text-xs rounded-xl border-2 border-[#1E1E2F] shadow-[4px_4px_0px_#1E1E2F] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all disabled:opacity-50"
      >
        {isRolling ? "Rolling!" : "Roll a Strike! 🌈"}
      </button>
    </div>
  );
}

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const filteredStandings = STANDINGS_DATA.filter(team => {
    const matchesSearch = team.team.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FFFDF6] text-[#1E1E2F] font-sans selection:bg-[#FF2E93] selection:text-white overflow-x-hidden scroll-smooth">
      
      {/* VIBRANT TOP CONCOURSE BAR */}
      <div className="w-full bg-gradient-to-r from-[#FF2E93] via-[#FFB81C] to-[#00B4D8] py-3 px-4 flex justify-between items-center text-white border-b-4 border-[#1E1E2F] relative z-50 shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
        <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.25em] flex items-center gap-2 mx-auto">
          <span>🌺</span> ALOHA &amp; PRIDE ON THE LANES • INTEGRATED WITH TEAMSIDELINE STANDINGS
        </span>
      </div>

      {/* HEADER NAVIGATION */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b-4 border-[#1E1E2F] py-4 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-xl bg-[#00B4D8] border-2 border-[#1E1E2F] flex items-center justify-center shadow-[4px_4px_0px_#1E1E2F] group-hover:rotate-12 transition-all duration-300">
              <span className="text-xl">🎳</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter leading-none text-[#1E1E2F] italic">RBH</span>
              <span className="text-[9px] font-black uppercase tracking-[0.15em] text-[#FF2E93]">Rainbow Bowling Hawaii</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 font-black uppercase tracking-widest text-[11px]">
            <button onClick={() => scrollToSection('about')} className="hover:text-[#FF2E93] transition-colors">Our Ethos</button>
            <button onClick={() => scrollToSection('standings')} className="hover:text-[#FF2E93] transition-colors">Scoreboard</button>
            <button onClick={() => scrollToSection('schedule')} className="hover:text-[#FF2E93] transition-colors">Lanes Schedule</button>
            <button onClick={() => scrollToSection('crew')} className="hover:text-[#FF2E93] transition-colors">Our Crew</button>
            <a 
              href="https://teamsideline.com/sites/aikaneohana/schedule/655613/0/1/Open" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#FFB81C] text-[#1E1E2F] border-2 border-[#1E1E2F] px-6 py-2 rounded-xl shadow-[4px_4px_0px_#1E1E2F] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              TeamSideline 🤙
            </a>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-[#FFFDF6] via-[#FFF5E6] to-[#FFE5EC] px-6 py-20 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FFB81C]/20 blur-[130px] rounded-full animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FF2E93]/15 blur-[130px] rounded-full animate-pulse delay-500 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-16 items-center relative z-10">
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-white border-2 border-[#1E1E2F] px-4 py-2 rounded-full mb-8 shadow-[4px_4px_0px_#1E1E2F]">
              <span className="text-base animate-bounce">🌈</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FF2E93]">Warm Sunshine &amp; Pride</span>
            </div>
            
            <h1 className="text-6xl md:text-[100px] font-black leading-[0.85] mb-8 text-[#1E1E2F] tracking-tighter italic uppercase">
              The Friendliest <br />
              <span className="bg-gradient-to-r from-[#FF2E93] via-[#FFB81C] to-[#00B4D8] bg-clip-text text-transparent">Lanes on O‘ahu</span>
            </h1>
            
            <p className="text-xl md:text-2xl font-medium text-slate-700 mb-10 max-w-xl leading-relaxed mx-auto lg:mx-0">
              Welcome to Rainbow Bowling Hawai'i! A fully inclusive community organization serving O'ahu's LGBTQIA+ members and allies. No pressure, just pins and pure 'Ohana.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => scrollToSection('standings')}
                className="px-10 py-5 bg-[#FF2E93] text-white font-black uppercase tracking-widest text-xs rounded-2xl border-2 border-[#1E1E2F] shadow-[6px_6px_0px_#1E1E2F] hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 transition-all"
              >
                View Scoreboard
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="px-10 py-5 bg-white text-[#1E1E2F] font-black uppercase tracking-widest text-xs rounded-2xl border-2 border-[#1E1E2F] shadow-[6px_6px_0px_#1E1E2F] hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 transition-all flex items-center gap-2"
              >
                Our Ethos <ArrowRight size={14} />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <BowlingLanesWidget />
          </div>
        </div>
      </section>

      {/* SECTION 2: THE ETHOS */}
      <section id="about" className="py-28 px-6 bg-white border-t-4 border-b-4 border-[#1E1E2F] relative overflow-hidden">
        <div className="absolute top-12 left-12 text-6xl opacity-10 select-none">🌴</div>
        <div className="absolute bottom-12 right-12 text-6xl opacity-10 select-none">🍍</div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-[#00B4D8] mb-4 block">WHY WE ROLL</span>
          <h2 className="text-5xl md:text-7xl font-black text-[#1E1E2F] uppercase tracking-tighter mb-8 italic">
            Inclusive Lanes, <br />
            <span className="bg-gradient-to-r from-[#FF2E93] to-[#FFB81C] bg-clip-text text-transparent">Endless Smiles</span>
          </h2>
          <div className="w-48 h-1.5 bg-gradient-to-r from-[#FF2E93] via-[#FFB81C] to-[#00B4D8] mx-auto rounded-full mb-16" />

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { icon: '🌺', title: 'Pure Aloha', desc: 'We play to come together, enjoy the warm local vibes, and form lasting memories on and off the court.' },
              { icon: '🌈', title: 'Pride Focused', desc: 'RBH is a designated safe and encouraging space created specifically for LGBTQIA+ members and our allies.' },
              { icon: '🎳', title: 'Every Skill Level', desc: 'From first-time rollers to competitive bowlers. Our custom handicap systems ensure a fun matchup for everyone.' }
            ].map((card, i) => (
              <div key={i} className="bg-[#FFFDF6] border-2 border-[#1E1E2F] p-8 rounded-[2rem] shadow-[6px_6px_0px_#1E1E2F] hover:scale-105 transition-all">
                <span className="text-4xl mb-6 block">{card.icon}</span>
                <h3 className="font-black text-xl text-[#1E1E2F] uppercase mb-3">{card.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: SCORES & LEADERBOARD */}
      <section id="standings" className="py-28 px-6 bg-[#FFFDF6] relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                <Trophy className="text-[#FFB81C]" size={36} />
                <h2 className="text-5xl font-black uppercase tracking-tighter text-[#1E1E2F] italic">RBH Scoreboard</h2>
              </div>
              <p className="text-slate-600 font-medium">Auto-synced leaderboard from the TeamSideline portal.</p>
            </div>

            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Find Your Team..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border-2 border-[#1E1E2F] pl-12 pr-4 py-3 rounded-xl font-medium outline-none focus:bg-white text-sm"
              />
            </div>
          </div>

          <div className="bg-[#1E1E2F] rounded-[3rem] p-4 md:p-8 shadow-[12px_12px_0px_rgba(0,0,0,0.15)] relative border-4 border-[#1E1E2F]">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-[2.8rem]" />
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Position</th>
                    <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Team Frame</th>
                    <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400 text-center">W - L Record</th>
                    <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400 text-right">Total Pins</th>
                    <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400 text-right">High Game</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredStandings.map((team) => (
                    <tr key={team.rank} className="hover:bg-white/5 transition-colors group">
                      <td className="p-6 font-black text-2xl text-slate-500 group-hover:text-white italic">{team.rank}</td>
                      <td className="p-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: team.color }} />
                          <span className="font-black text-lg text-white group-hover:translate-x-2 transition-transform">{team.team}</span>
                        </div>
                      </td>
                      <td className="p-6 text-center font-mono font-bold text-[#00F5D4] text-lg">{team.wins} - {team.losses}</td>
                      <td className="p-6 text-right text-slate-200 font-bold text-lg">{team.pins.toLocaleString()}</td>
                      <td className="p-6 text-right">
                        <span className="font-black text-xl text-[#FFB81C] bg-gradient-to-r from-[#FFB81C] to-[#FF2E93] bg-clip-text text-transparent">
                          {team.highGame}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: LANES CALENDAR / TIMELINE */}
      <section id="schedule" className="py-28 px-6 bg-white border-t-4 border-b-4 border-[#1E1E2F] relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#FF2E93] block mb-2">SHIFTS &amp; MATCHES</span>
            <h2 className="text-5xl font-black text-[#1E1E2F] uppercase tracking-tighter italic">Lanes Timeline</h2>
            <div className="w-24 h-1 bg-[#1E1E2F] mx-auto mt-4" />
          </div>

          <div className="space-y-6">
            {SCHEDULE_DATA.map((match, i) => (
              <div key={i} className="group relative bg-[#FFFDF6] border-2 border-[#1E1E2F] p-8 rounded-2xl shadow-[4px_4px_0px_#1E1E2F] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex flex-col md:flex-row justify-between items-center">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#FF2E93] via-[#FFB81C] to-[#00B4D8] rounded-l-md" />

                <div className="flex items-center space-x-6 mb-4 md:mb-0">
                  <div className="bg-white border-2 border-[#1E1E2F] p-4 rounded-xl text-center min-w-[80px]">
                    <span className="block text-[10px] font-black uppercase tracking-widest text-[#FF2E93]">{match.date.split(' ')[0]}</span>
                    <span className="block font-black text-2xl text-[#1E1E2F]">{match.date.split(' ')[1]}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">{match.time}</span>
                    <span className="font-black text-xl text-[#1E1E2F]">{match.matchup}</span>
                  </div>
                </div>

                <div className="flex flex-col md:items-end">
                  <span className="text-xs font-black uppercase tracking-widest text-slate-700 bg-white border-2 border-[#1E1E2F] px-4 py-1.5 rounded-full mb-2">
                    {match.lanes}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#00B4D8]">
                    🌴 {match.theme}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: THE PINSETTERS (CREW) */}
      <section id="crew" className="py-28 px-6 bg-[#FFFDF6] relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#00B4D8] mb-2 block">BEHIND THE SCENES</span>
            <h2 className="text-5xl font-black text-[#1E1E2F] uppercase tracking-tighter italic">The Pinsetters Crew</h2>
            <p className="text-slate-600 font-medium mt-2">The dedicated coordinators keeping the lanes active and inclusive.</p>
            <div className="w-24 h-1 bg-[#1E1E2F] mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PINSETTERS.map((crew) => (
              <div 
                key={crew.pos} 
                className="bg-white border-4 border-[#1E1E2F] p-8 rounded-[2.5rem] shadow-[8px_8px_0px_#1E1E2F] hover:translate-y-[-8px] transition-transform relative group"
              >
                <span className="absolute top-4 right-4 bg-[#1E1E2F] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                  Pin {crew.pos}
                </span>

                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-8 border-2 border-[#1E1E2F] shadow-[4px_4px_0px_#1E1E2F] ${crew.color}`}>
                  {crew.emoji}
                </div>

                {/* Displaying a blank line for name as requested */}
                <h3 className="text-2xl font-black text-[#1E1E2F] uppercase mb-1 italic min-h-[36px] border-b-2 border-dashed border-slate-200 w-3/4">
                  {crew.name}
                </h3>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#FF2E93] mb-6 block">{crew.role}</span>
                
                <p className="text-slate-600 font-medium text-sm border-t-2 border-[#1E1E2F] border-dashed pt-6 leading-relaxed">
                  "{crew.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1E1E2F] text-slate-300 pt-24 pb-12 px-6 relative border-t-4 border-[#1E1E2F]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 mb-16">
          
          <div>
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-11 h-11 rounded-xl bg-[#00B4D8] border-2 border-[#1E1E2F] flex items-center justify-center shadow-[4px_4px_0px_rgba(255,255,255,0.15)]">
                <span className="text-xl">🎳</span>
              </div>
              <span className="text-4xl font-black italic tracking-tighter text-white">RBH</span>
            </div>
            <p className="text-xl max-w-md leading-relaxed text-slate-400 font-medium mb-8">
              Creating clean, vibrant, and incredibly inclusive athletic environments for everyone on O'ahu.
            </p>
            <div className="flex space-x-6 text-3xl text-white">
              <Camera className="hover:text-[#FF2E93] transition-colors cursor-pointer" />
              <MessageCircle className="hover:text-[#00B4D8] transition-colors cursor-pointer" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div>
              <h5 className="font-black uppercase tracking-[0.2em] text-xs text-[#FF2E93] mb-6">Directory</h5>
              <ul className="space-y-4 font-bold text-slate-200">
                <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors animate-pulse">Our Ethos</button></li>
                <li><button onClick={() => scrollToSection('standings')} className="hover:text-white transition-colors animate-pulse">Scoreboard</button></li>
                <li><button onClick={() => scrollToSection('schedule')} className="hover:text-white transition-colors animate-pulse">Schedule</button></li>
              </ul>
            </div>
            <div>
              <h5 className="font-black uppercase tracking-[0.2em] text-xs text-[#FFB81C] mb-6">Support</h5>
              <ul className="space-y-4 font-bold text-slate-200">
                <li><a href="mailto:bod@hawaiiqueerbowling.com" className="hover:text-white transition-colors">Contact Crew</a></li>
                <li><a href="https://aikaneohana.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Aikane Ohana</a></li>
              </ul>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-[0.35em] text-slate-500 gap-6">
          <p>© 2026 Rainbow Bowling Hawai'i • Kapi'olani Lanes to Kapolei</p>
          <p>A Program of Aikane Ohana • 501(c)(3) Nonprofit Organization</p>
        </div>
      </footer>

    </div>
  );
}
