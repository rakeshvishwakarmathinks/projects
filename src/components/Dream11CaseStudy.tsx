import { useEffect } from 'react';
import { PageId } from '../types';
import { AnimatedCounter } from './AnimatedCounter';
import ZoomableImage from './ZoomableImage';
import dream11CardImg from '../assets/images/dream11cardimage.webp';
import { 
  preloadImages, 
  DREAM11_IMAGES 
} from '../utils/imagePreloader';
import { 
  Users, 
  Zap, 
  AlertTriangle, 
  TrendingUp, 
  Layers, 
  ArrowRight, 
  FileSearch, 
  ShieldCheck,
  Compass,
  HeartHandshake
} from 'lucide-react';

interface Dream11CaseStudyProps {
  onPageChange: (page: PageId) => void;
}

export default function Dream11CaseStudy({ onPageChange }: Dream11CaseStudyProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
    preloadImages(DREAM11_IMAGES, 'high');
  }, []);

  return (
    <main 
      id="main-content" 
      tabIndex={-1} 
      className="pt-24 min-h-screen bg-bg focus:outline-none"
      aria-label="Case Study: One-Click Player Removal at Dream11"
    >
      {/* ── HERO SECTION ── */}
      <header className="grid grid-cols-1 lg:grid-cols-12 min-h-[72vh] border-b border-border-custom bg-black" aria-label="Project Overview">
        {/* Left panel */}
        <div className="lg:col-span-7 bg-black text-[#f5f5f7] p-8 md:p-14 lg:p-16 flex flex-col justify-between relative overflow-hidden">
          {/* Accent red strip */}
          <div className="absolute inset-x-0 top-0 h-1 bg-accent" aria-hidden="true" />
          
          <div className="z-10 mt-4">
            <button 
              onClick={() => onPageChange('home')}
              className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-wider uppercase text-zinc-300 hover:text-accent mb-6 group transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm py-1.5 px-2 -ml-2"
              aria-label="Back to all case studies"
            >
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false" className="w-4 h-4 transition-transform group-hover:-translate-x-1">
                <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              All work
            </button>

            <p className="font-mono text-xs tracking-widest uppercase text-accent mb-4 font-semibold">
              Dream11 · Case Study 2 of 5
            </p>

            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.08]">
              One-Click<br />
              Player Removal<br />
              <span className="text-zinc-400 font-medium">for 140M Users</span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal max-w-xl">
              When official team lineups drop 30 minutes before match start, millions of fantasy cricket users scramble to replace rested or benched players. We redesigned the critical editing flow, achieving 100% platform adoption and saving ~50% in edit time.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 pt-6 mt-10 border-t border-zinc-800 z-10" role="list" aria-label="Project metadata">
            <span role="listitem" className="font-mono text-xs tracking-wider uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">Dream11</span>
            <span role="listitem" className="font-mono text-xs tracking-wider uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">Jul 2021 – Mar 2022</span>
            <span role="listitem" className="font-mono text-xs tracking-wider uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">iOS &amp; Android</span>
            <span role="listitem" className="font-mono text-xs tracking-wider uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">Role: Lead UX Designer</span>
            <span role="listitem" className="font-mono text-xs tracking-wider uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">10 Cross-Functional Stakeholders</span>
          </div>
        </div>

        {/* Right panel */}
        <div className="lg:col-span-5 bg-[#0a0a0d] p-8 md:p-12 lg:p-14 flex flex-col justify-end gap-8 relative border-t lg:border-t-0 lg:border-l border-border-custom">
          <div className="w-full bg-black rounded-lg aspect-[16/10] overflow-hidden relative border border-border-custom shadow-xl">
            <ZoomableImage 
              src={dream11CardImg} 
              alt="Dream11 player replacement and live match presentation on mobile device" 
              className="w-full h-full object-cover object-center"
              priority={true}
            />
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-6 z-10" role="region" aria-label="Key project metrics">
            <div className="flex flex-col border-b border-zinc-800 pb-4" aria-label="Metric: 100 percent platform-wide adoption">
              <div className="font-display text-4xl text-accent font-bold leading-none mb-1.5" aria-hidden="true">
                <AnimatedCounter value="100%" />
              </div>
              <div className="font-mono text-xs tracking-wider uppercase text-zinc-400">Platform adoption</div>
              <span className="sr-only">100% Platform-wide adoption</span>
            </div>

            <div className="flex flex-col border-b border-zinc-800 pb-4" aria-label="Metric: 140 million plus users impacted">
              <div className="font-display text-4xl text-accent font-bold leading-none mb-1.5" aria-hidden="true">
                <AnimatedCounter value="140M+" />
              </div>
              <div className="font-mono text-xs tracking-wider uppercase text-zinc-400">Users impacted (14cr+)</div>
              <span className="sr-only">140M+ Users impacted (14cr+)</span>
            </div>

            <div className="flex flex-col border-b border-zinc-800 pb-4" aria-label="Metric: Approximately 50 percent time saved making edits">
              <div className="font-display text-4xl text-accent font-bold leading-none mb-1.5" aria-hidden="true">
                <AnimatedCounter value="~50%" />
              </div>
              <div className="font-mono text-xs tracking-wider uppercase text-zinc-400">Time saved editing</div>
              <span className="sr-only">~50% Time saved making edits</span>
            </div>

            <div className="flex flex-col border-b border-zinc-800 pb-4" aria-label="Metric: 30 minutes critical editing window">
              <div className="font-display text-4xl text-accent font-bold leading-none mb-1.5" aria-hidden="true">
                <AnimatedCounter value="30min" />
              </div>
              <div className="font-mono text-xs tracking-wider uppercase text-zinc-400">Critical window</div>
              <span className="sr-only">30 minute Critical editing window</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── SECTION 01: THE TEAM & COVID CONSTRAINTS ── */}
      <section id="section-01" className="py-20 border-b border-border-custom bg-black" aria-labelledby="heading-01">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="mb-10 pb-6 border-b border-border-custom">
            <span className="font-mono text-xs text-accent uppercase tracking-widest block mb-2 font-semibold">01. Team &amp; Environment</span>
            <h2 id="heading-01" className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              Collaborating Under High Constraints
            </h2>
          </div>

          <div className="max-w-4xl space-y-8 text-zinc-300">
            <p className="text-base sm:text-lg leading-relaxed text-zinc-200 font-normal">
              This project was executed during unprecedented circumstances. During the COVID-19 surge, team members across product, research, design, and engineering were falling sick while gearing up for the Indian Premier League (IPL) — the highest traffic period of the entire year.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="bg-[#121218] border border-border-custom p-6 rounded-xl">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent font-semibold mb-3">
                  <Users className="w-4 h-4" aria-hidden="true" focusable="false" />
                  <span>My Role &amp; Team</span>
                </div>
                <ul className="text-sm sm:text-base space-y-2 text-zinc-300 leading-relaxed" role="list">
                  <li>• <strong className="text-white font-medium">Role:</strong> Lead UX Designer</li>
                  <li>• <strong className="text-white font-medium">Timeline:</strong> July 2021 – March 2022</li>
                  <li>• <strong className="text-white font-medium">Stakeholders:</strong> AVP, 2 PMs, Design Director, Research Director, 2 UX Researchers, UX Ops, Engineering Leads</li>
                </ul>
              </div>

              <div className="bg-[#121218] border border-border-custom p-6 rounded-xl">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-amber-400 font-semibold mb-3">
                  <HeartHandshake className="w-4 h-4" aria-hidden="true" focusable="false" />
                  <span>Critical Constraints</span>
                </div>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  High team absentee rates due to illness, compressed sprint deadlines before IPL kickoff, and zero margin for error with 140M+ active real-money fantasy sports users.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 02: THE CHALLENGE & 30-MINUTE CRUNCH ── */}
      <section id="section-02" className="py-20 border-b border-border-custom bg-[#09090d]" aria-labelledby="heading-02">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="mb-10 pb-6 border-b border-border-custom">
            <span className="font-mono text-xs text-accent uppercase tracking-widest block mb-2 font-semibold">02. Problem Breakdown</span>
            <h2 id="heading-02" className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              The 30-Minute Panic Window
            </h2>
          </div>

          <div className="max-w-4xl space-y-8 text-zinc-300">
            <blockquote className="border-l-2 border-accent pl-6 py-2 my-2">
              <p className="text-lg sm:text-xl md:text-2xl font-normal text-white leading-relaxed">
                "When the match is live and lineups are announced, the user has <strong className="text-accent font-semibold">only 30 minutes</strong> to make edits before squad lock."
              </p>
            </blockquote>

            <div className="space-y-4 text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
              <p>
                In fantasy cricket, fans create their 11-player fantasy teams hours or days in advance. However, the official Playing XI is only finalized and released by cricket boards <strong className="text-white font-medium">30 minutes before match toss</strong>.
              </p>
              <p>
                Suddenly, users discover that key players they selected are rested, benched, or injured. If an unannounced player stays on their team, that player earns zero points — directly ruining the user's contest chances and forfeiting entry fees.
              </p>
            </div>

            {/* User Struggle & Impact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="bg-[#12121c] border border-red-500/25 p-6 rounded-xl">
                <div className="flex items-center gap-2 font-semibold text-xs uppercase text-red-400 mb-3 font-mono tracking-wider">
                  <AlertTriangle className="w-4 h-4" aria-hidden="true" focusable="false" />
                  <span>User Struggle</span>
                </div>
                <ul className="text-sm sm:text-base space-y-2 text-zinc-300 leading-relaxed" role="list">
                  <li>• Extreme panic and cognitive anxiety under time pressure</li>
                  <li>• Tedious multi-screen manual hunting across tabs</li>
                  <li>• Frequently missed match-lock deadlines entirely</li>
                </ul>
              </div>

              <div className="bg-[#12121c] border border-red-500/25 p-6 rounded-xl">
                <div className="flex items-center gap-2 font-semibold text-xs uppercase text-red-400 mb-3 font-mono tracking-wider">
                  <TrendingUp className="w-4 h-4 rotate-180" aria-hidden="true" focusable="false" />
                  <span>Platform Impact</span>
                </div>
                <ul className="text-sm sm:text-base space-y-2 text-zinc-300 leading-relaxed" role="list">
                  <li>• Forfeited contest entry fees and zero-point squads</li>
                  <li>• Massive spikes in customer support complaints</li>
                  <li>• Reduced confidence in core match participation</li>
                </ul>
              </div>
            </div>

            {/* The Core HMW */}
            <div className="bg-[#181924] border border-accent/40 p-6 rounded-xl shadow-lg">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent block mb-2">
                Core How Might We (HMW)
              </span>
              <p className="text-lg sm:text-xl text-white font-medium leading-snug">
                "How might we help users confidently update their teams within the last 30 minutes before match lock?"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 03: DEEP DIVE INTO PREVIOUS USER WORKFLOW (BEFORE) ── */}
      <section id="section-03" className="py-20 border-b border-border-custom bg-black" aria-labelledby="heading-03">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-border-custom">
            <div>
              <span className="font-mono text-xs text-accent uppercase tracking-widest block mb-2 font-semibold">03. Legacy Friction</span>
              <h2 id="heading-03" className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                Previous User Workflow
              </h2>
            </div>
            <div className="font-mono text-xs text-zinc-400 tracking-wider uppercase mt-4 md:mt-0 font-medium">
              4 Steps · High Cognitive Load
            </div>
          </div>

          <p className="text-base sm:text-lg text-zinc-300 font-normal max-w-3xl mb-8 leading-relaxed">
            Prior to our redesign, users had to navigate a disjointed 4-screen flow to find and fix unannounced players. The visual evidence from our user research demonstrated massive drop-offs right after lineups were posted.
          </p>

          {/* High-Resolution Legacy Workflow Slide */}
          <div className="rounded-xl overflow-hidden border border-border-custom shadow-2xl bg-[#0a0a0f] mb-10">
            <ZoomableImage 
              src="/assets/dream11_page_04.webp" 
              alt="Legacy 4-screen Dream11 workflow: 1. Match Landing, 2. Contest List, 3. Team Creation with hidden red dot for unannounced players, 4. All Teams Built screen without aggregated alerts."
              className="w-full h-auto"
            />
            <div className="p-4 bg-[#12131b] border-t border-border-custom flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-300">
              <span>Previous Workflow: 1. Match Landing → 2. Contest List → 3. Team Creation → 4. All Teams Built</span>
              <span className="text-red-400 font-semibold">Average edit time: 2m 14s</span>
            </div>
          </div>

          {/* 3 Major Friction Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#12121a] border border-[#262734] p-6 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-mono font-bold text-sm mb-4" aria-hidden="true">
                1
              </div>
              <h3 className="font-sans text-base sm:text-lg font-semibold text-white mb-2">No High-Level Visibility</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                The "All Teams Built" page gave no aggregated indication of which specific squads had unannounced players. Users managing 10 to 20 teams had to open every squad one by one.
              </p>
            </div>

            <div className="bg-[#12121a] border border-[#262734] p-6 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-mono font-bold text-sm mb-4" aria-hidden="true">
                2
              </div>
              <h3 className="font-sans text-base sm:text-lg font-semibold text-white mb-2">Buried Within Tabs</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                The "Unannounced" warning was just a minuscule red dot buried inside one of four positional tabs (WK, BAT, AR, BWL). Users had to swipe across all tabs to hunt down benched players.
              </p>
            </div>

            <div className="bg-[#12121a] border border-[#262734] p-6 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-mono font-bold text-sm mb-4" aria-hidden="true">
                3
              </div>
              <h3 className="font-sans text-base sm:text-lg font-semibold text-white mb-2">Manual Budget Re-Math</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Deselecting a player manually required recalculating credit caps on the fly while watching a ticking clock, leading to rushed substitutions and bad picks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 04: THE APPROACH (Apple-Style High-Contrast Light Section) ── */}
      <section id="section-04" className="py-20 bg-[#f5f5f7] border-b border-[#e5e5ea] text-zinc-900" aria-labelledby="heading-04">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#d2d2d7]">
            <div>
              <span className="font-mono text-xs text-[#c5221f] uppercase tracking-widest block mb-2 font-semibold">04. Design Process</span>
              <h2 id="heading-04" className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-900">
                The Approach &amp; Deliverables
              </h2>
            </div>
            <div className="font-mono text-xs text-zinc-600 tracking-wider uppercase mt-4 md:mt-0 font-medium">
              RICE Framework · Rapid Prototyping
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Discovery */}
            <div className="bg-white border border-[#e5e5ea] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#c5221f] mb-3">
                  <FileSearch className="w-4 h-4" aria-hidden="true" focusable="false" />
                  <span>Discovery</span>
                </div>
                <h3 className="font-sans text-lg sm:text-xl font-bold text-zinc-900 mb-3">Data &amp; Research</h3>
                <ul className="space-y-2 text-sm text-zinc-700 leading-relaxed" role="list">
                  <li>• <strong className="text-zinc-900">Looker Analytics:</strong> Analyzing user behavioral drop-offs during the final 30 minutes.</li>
                  <li>• <strong className="text-zinc-900">Market Analysis:</strong> Studying fantasy platforms in UK, US, and Asian leagues.</li>
                  <li>• <strong className="text-zinc-900">Primary Interviews:</strong> Direct user interviews with hardcore and casual fantasy players.</li>
                  <li>• <strong className="text-zinc-900">Thematic Synthesis:</strong> Formulating insights into concrete functional specs.</li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-200 text-xs font-mono text-zinc-600">
                <strong className="text-zinc-900 font-semibold">Deliverables:</strong> Research summary + prioritized requirements (RICE framework).
              </div>
            </div>

            {/* Design */}
            <div className="bg-white border border-[#e5e5ea] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#c5221f] mb-3">
                  <Layers className="w-4 h-4" aria-hidden="true" focusable="false" />
                  <span>Design</span>
                </div>
                <h3 className="font-sans text-lg sm:text-xl font-bold text-zinc-900 mb-3">Workshops &amp; Prototypes</h3>
                <ul className="space-y-2 text-sm text-zinc-700 leading-relaxed" role="list">
                  <li>• <strong className="text-zinc-900">Design Workshops:</strong> Fast-paced alignment on Information Architecture and feature prioritization.</li>
                  <li>• <strong className="text-zinc-900">Coded &amp; High-Fidelity Prototypes:</strong> Building clickable micro-interactions to stress-test thumb ergonomics.</li>
                  <li>• <strong className="text-zinc-900">Internal Design Reviews:</strong> Daily critiques with Design Director and Product Leadership.</li>
                  <li>• <strong className="text-zinc-900">Dev Handover:</strong> Component tokens, micro-copy, and edge-case specs.</li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-200 text-xs font-mono text-zinc-600">
                <strong className="text-zinc-900 font-semibold">Deliverables:</strong> Solution concepts + Information Architecture + prototypes.
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white border border-[#e5e5ea] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#c5221f] mb-3">
                  <ShieldCheck className="w-4 h-4" aria-hidden="true" focusable="false" />
                  <span>Reviews</span>
                </div>
                <h3 className="font-sans text-lg sm:text-xl font-bold text-zinc-900 mb-3">Validation &amp; Alignment</h3>
                <ul className="space-y-2 text-sm text-zinc-700 leading-relaxed" role="list">
                  <li>• <strong className="text-zinc-900">Research Reviews:</strong> Usability validation on prototype flows to measure speed of removal.</li>
                  <li>• <strong className="text-zinc-900">Engineering Scoping:</strong> Aligning on zero-latency bottom sheet animations.</li>
                  <li>• <strong className="text-zinc-900">Safety Guardrails:</strong> Preventing accidental player drops with instant undo states.</li>
                  <li>• <strong className="text-zinc-900">Executive Greenlight:</strong> Full rollout across iOS and Android production apps.</li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-200 text-xs font-mono text-zinc-600">
                <strong className="text-zinc-900 font-semibold">Deliverables:</strong> Feedback + enhancements + scope + executive alignment.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 05: THE SOLUTION — ONE-CLICK PLAYER REMOVAL (AFTER) ── */}
      <section id="section-05" className="py-20 border-b border-border-custom bg-black" aria-labelledby="heading-05">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-border-custom">
            <div>
              <span className="font-mono text-xs text-accent uppercase tracking-widest block mb-2 font-semibold">05. Shipped Architecture</span>
              <h2 id="heading-05" className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                One-Click Unannounced Player Removal
              </h2>
            </div>
            <div className="font-mono text-xs text-zinc-400 tracking-wider uppercase mt-4 md:mt-0 font-medium">
              Shipped on iOS &amp; Android
            </div>
          </div>

          <p className="text-base sm:text-lg text-zinc-300 font-normal max-w-3xl mb-8 leading-relaxed">
            We transformed a stressful 4-step manual search into a streamlined one-click operation. An intelligent bottom sheet isolates the unannounced player, instantly cleanses the roster, refunds credits, and filters eligible replacements.
          </p>

          {/* High-Resolution Solution Slide */}
          <div className="rounded-xl overflow-hidden border border-border-custom shadow-2xl bg-[#0a0a0f] mb-10">
            <ZoomableImage 
              src="/assets/dream11_page_08.webp" 
              alt="Shipped solution diagram showing 4 screens: 1. Match Landing with Lineups Out badge, 2. All Teams Built with 1 Unannounced alert badge, 3. One-Click Removal bottom sheet with Remove CTA, 4. Replacement Picker with refunded credits."
              className="w-full h-auto"
            />
            <div className="p-4 bg-[#12131b] border-t border-border-custom flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-300">
              <span>The Shipped 4-Screen Solution: Landing Page → All Teams Built → One-Click Removal Modal → Replacement Picker</span>
              <span className="text-emerald-400 font-semibold">100% Platform Adoption</span>
            </div>
          </div>

          {/* Deep Dive into the 4 Screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#12121c] border border-[#262734] p-5 rounded-xl">
              <span className="font-mono text-xs text-accent font-semibold uppercase tracking-wider block mb-2">Screen 1</span>
              <h3 className="font-sans text-base font-semibold text-white mb-1.5">Match Landing</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Prominent <strong className="text-white font-medium">"Lineups Out"</strong> badge on match cards alerting users immediately upon opening the app.
              </p>
            </div>

            <div className="bg-[#12121c] border border-[#262734] p-5 rounded-xl">
              <span className="font-mono text-xs text-accent font-semibold uppercase tracking-wider block mb-2">Screen 2</span>
              <h3 className="font-sans text-base font-semibold text-white mb-1.5">All Teams Built</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                High-visibility <strong className="text-amber-400 font-medium">"1 unannounced"</strong> alert pill on affected squads with direct one-click removal entry point.
              </p>
            </div>

            <div className="bg-[#12121c] border border-[#262734] p-5 rounded-xl">
              <span className="font-mono text-xs text-accent font-semibold uppercase tracking-wider block mb-2">Screen 3</span>
              <h3 className="font-sans text-base font-semibold text-white mb-1.5">One-Click Modal</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Action sheet surfaces the unannounced player directly with a single bold CTA: <strong className="text-accent font-medium">"REMOVE 1 UNANNOUNCED PLAYER"</strong>.
              </p>
            </div>

            <div className="bg-[#12121c] border border-[#262734] p-5 rounded-xl">
              <span className="font-mono text-xs text-accent font-semibold uppercase tracking-wider block mb-2">Screen 4</span>
              <h3 className="font-sans text-base font-semibold text-white mb-1.5">Select Replacement</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Green confirmation toast, credits refunded to 20.0, and roster pre-filtered into <strong className="text-emerald-400 font-medium">Announced</strong> players.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 06: VERIFIED BUSINESS & USER IMPACT ── */}
      <section id="section-06" className="py-20 border-b border-border-custom bg-[#09090d]" aria-labelledby="heading-06">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-border-custom">
            <div>
              <span className="font-mono text-xs text-accent uppercase tracking-widest block mb-2 font-semibold">06. Business Outcomes</span>
              <h2 id="heading-06" className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                Superior User Experience &amp; Impact
              </h2>
            </div>
            <div className="font-mono text-xs text-zinc-400 tracking-wider uppercase mt-4 md:mt-0 font-medium">
              Platform-Scale Metrics
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#12121a] border border-[#2a2a35] p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-accent font-semibold uppercase tracking-wider block mb-2">Feature Adoption</span>
                <div className="font-display text-5xl sm:text-6xl text-white font-bold mb-2 leading-none" aria-hidden="true">
                  <AnimatedCounter value="100%" />
                </div>
                <h3 className="font-sans text-base font-semibold text-white mb-2">140M+ Users Impacted</h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Adopted by 100% of users who had unannounced players during the 30-minute pre-match window across India and global markets.
                </p>
              </div>
              <span className="sr-only">100% Feature Adoption across 140 million plus users</span>
            </div>

            <div className="bg-[#12121a] border border-[#2a2a35] p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-emerald-400 font-semibold uppercase tracking-wider block mb-2">Time Optimization</span>
                <div className="font-display text-5xl sm:text-6xl text-emerald-400 font-bold mb-2 leading-none" aria-hidden="true">
                  <AnimatedCounter value="~50%" />
                </div>
                <h3 className="font-sans text-base font-semibold text-white mb-2">Edit Time Slashed</h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Reduced average team modification time from ~2 minutes 14 seconds down to under 15 seconds, virtually eliminating missed match locks.
                </p>
              </div>
              <span className="sr-only">~50% Time Optimization: modification time reduced to under 15 seconds</span>
            </div>

            <div className="bg-[#12121a] border border-[#2a2a35] p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-accent font-semibold uppercase tracking-wider block mb-2">User Trust</span>
                <div className="font-display text-5xl sm:text-6xl text-white font-bold mb-2 leading-none" aria-hidden="true">
                  <AnimatedCounter value="99.8%" />
                </div>
                <h3 className="font-sans text-base font-semibold text-white mb-2">Squad Completion Rate</h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Dramatic decline in customer support tickets regarding zero-point unannounced player penalties, preserving platform goodwill and contest revenue.
                </p>
              </div>
              <span className="sr-only">99.8% Squad Completion Rate with dramatic decline in support tickets</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 07: KEY REFLECTIONS ── */}
      <section id="section-07" className="py-20 border-b border-border-custom bg-black" aria-labelledby="heading-07">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="mb-10 pb-6 border-b border-border-custom">
            <span className="font-mono text-xs text-accent uppercase tracking-widest block mb-2 font-semibold">07. Takeaways</span>
            <h2 id="heading-07" className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              Key Reflections &amp; Product Learnings
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-zinc-300">
            <div className="bg-[#121218] border border-border-custom p-6 sm:p-8 rounded-2xl">
              <h3 className="font-sans text-lg sm:text-xl font-semibold text-white mb-3 flex items-center gap-2.5">
                <Zap className="w-5 h-5 text-accent" aria-hidden="true" focusable="false" />
                <span>Designing for High-Stress Time Windows</span>
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-zinc-300">
                When users have money on the line and less than 30 minutes to make choices, standard navigation hierarchies fail. Condensing multi-screen search patterns into direct, single-click action sheets is the difference between panic and delight.
              </p>
            </div>

            <div className="bg-[#121218] border border-border-custom p-6 sm:p-8 rounded-2xl">
              <h3 className="font-sans text-lg sm:text-xl font-semibold text-white mb-3 flex items-center gap-2.5">
                <Compass className="w-5 h-5 text-accent" aria-hidden="true" focusable="false" />
                <span>Leadership Under Pandemic Constraints</span>
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-zinc-300">
                Maintaining rapid design velocity while team members were battling illness required absolute clarity of scope, modular design systems, and relentless prioritization using the RICE framework.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CASE STUDY METADATA STRIP ── */}
      <div className="py-12 border-t border-border-custom bg-black text-center">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <p className="font-mono text-xs tracking-wider uppercase text-zinc-400">
            One-Click Player Removal · Dream11 Live Fantasy Sports · UX Case Study
          </p>
        </div>
      </div>

      {/* ── DUAL NAVIGATION BAND ── */}
      <footer className="py-16 border-t border-border-custom bg-[#0a0a0d]" aria-label="Case Study Navigation">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <p className="font-mono text-xs tracking-wider uppercase text-zinc-400 mb-2">Back to all</p>
            <button 
              onClick={() => onPageChange('home')}
              className="font-sans text-xl md:text-2xl font-bold tracking-tight text-white hover:text-accent flex items-center gap-3 text-left group transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg p-1 -ml-1"
              aria-label="Back to all case studies"
            >
              <span className="w-10 h-10 rounded-full border border-zinc-700 group-hover:border-accent shrink-0 flex items-center justify-center transition-colors" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-zinc-300 group-hover:text-accent" focusable="false">
                  <path d="M10 13L5 8L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              Back to all work
            </button>
          </div>

          <div>
            <p className="font-mono text-xs tracking-wider uppercase text-zinc-400 mb-2 text-left md:text-right">Next case study</p>
            <button 
              onClick={() => onPageChange('io-device-builder')}
              className="font-sans text-2xl md:text-3xl font-bold tracking-tight text-white hover:text-accent flex items-center gap-4 text-left md:text-right group transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg p-1 -mr-1"
              aria-label="Next Case Study: MathWorks IO Device Builder"
            >
              <span>Hardware Sensor Integration · MathWorks</span>
              <span className="w-12 h-12 rounded-full border border-zinc-700 group-hover:border-accent shrink-0 flex items-center justify-center transition-colors" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="w-4 h-4 transition-transform group-hover:translate-x-1 text-zinc-300 group-hover:text-accent" focusable="false">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}
