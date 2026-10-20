import { useEffect } from 'react';
import { PageId } from '../types';
import { downloadResume } from '../utils/resumeDownloader';
import dream11MockupImg from '../assets/images/dream11cardimage.webp';
import ioDeviceBuilderImg from '../assets/images/iodevicebuilder.webp';
import { AnimatedCounter } from './AnimatedCounter';
import { prefetchCaseStudy } from '../utils/imagePreloader';

interface HomePageProps {
  onPageChange: (page: PageId) => void;
  onCaseSelect: (caseId: string) => void;
}

export default function HomePage({ onPageChange, onCaseSelect }: HomePageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);

    // After initial page load settles, prefetch project assets during idle time
    if (typeof window !== 'undefined') {
      const idleCallback = window.requestIdleCallback || ((cb: () => void) => setTimeout(cb, 2500));
      const handle = idleCallback(() => {
        prefetchCaseStudy('opc-ua-explorer', 'low');
      });
      return () => {
        if ('cancelIdleCallback' in window && typeof handle === 'number') {
          window.cancelIdleCallback(handle);
        }
      };
    }
  }, []);

  return (
    <main id="main-content" tabIndex={-1} className="focus:outline-none" aria-label="Portfolio Home">
      {/* ── HERO ── */}
      <section className="min-h-[78vh] md:min-h-[85vh] flex flex-col justify-center pt-24 md:pt-28 pb-16 md:pb-20 border-b border-[#2a2a31] relative overflow-hidden grain" aria-label="Introduction">
        <div className="max-w-[1200px] w-full mx-auto px-6 md:px-8 relative z-10">
          <div className="flex items-center gap-3 font-mono text-xs font-semibold tracking-widest uppercase text-accent mb-6">
            <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_12px_rgba(255,91,79,0.8)]" aria-hidden="true" />
            Solving wicked problems
          </div>

          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 md:mb-8 leading-[1.08] max-w-4xl">
            Turning complex problems into clear design intent and{' '}
            <span className="gradient-text font-bold">business outcomes</span>.
          </h1>

          <p className="text-base sm:text-lg md:text-xl font-normal text-zinc-300 leading-relaxed max-w-2xl mb-8 md:mb-10">
            6+ years of experience driving enterprise product direction and AI transformation initiatives. Shaping long-term vision and development through strategic lens across US, European, and Asian markets.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a 
              href="#work" 
              className="font-mono text-xs font-semibold tracking-wider text-white bg-accent hover:bg-accent-hover hover:shadow-[0_12px_40px_rgba(255,91,79,0.45)] py-4 px-8 uppercase transition-all duration-300 rounded-full active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              View case studies
            </a>
            <button 
              onClick={downloadResume}
              className="font-mono text-xs font-semibold tracking-wider text-white hover:text-white border border-[#2a2a31] bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/30 py-4 px-8 uppercase transition-all duration-300 rounded-full active:scale-[0.99] flex items-center gap-2 cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              title="Download Rakesh's Full PDF Resume"
              aria-label="Download Rakesh Vishwakarma Resume (PDF)"
            >
              Download Resume
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" aria-hidden="true" focusable="false">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-8 right-8 hidden md:flex items-center gap-3 font-mono text-xs text-zinc-400 tracking-wider uppercase" aria-hidden="true">
          <span className="w-10 h-[1px] bg-white/20 origin-left animate-scale-line" />
          Scroll
        </div>
      </section>

      {/* ── IMPACT NUMBERS STRIP (Apple-style High-Contrast Light Section) ── */}
      <section className="py-20 bg-[#f5f5f7] border-b border-[#e5e5ea] text-zinc-900" aria-label="Impact at a glance">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <p className="font-mono text-xs tracking-wider uppercase text-zinc-600 mb-8 font-semibold">Impact at a glance</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white border border-[#e5e5ea] rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all">
              <div className="font-display text-5xl md:text-6xl text-zinc-900 font-bold leading-none mb-3">
                <AnimatedCounter value="225M+" />
              </div>
              <p className="text-sm text-zinc-700 leading-relaxed font-medium">Users reached across the globe</p>
            </div>

            <div className="bg-white border border-[#e5e5ea] rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all">
              <div className="font-display text-5xl md:text-6xl text-[#c5221f] font-bold leading-none mb-3">
                <AnimatedCounter value="500%+" />
              </div>
              <p className="text-sm text-zinc-700 leading-relaxed font-medium">Revenue growth in Motor Control vertical</p>
            </div>

            <div className="bg-white border border-[#e5e5ea] rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all">
              <div className="font-display text-5xl md:text-6xl text-zinc-900 font-bold leading-none mb-3">
                <AnimatedCounter value="70%" />
              </div>
              <p className="text-sm text-zinc-700 leading-relaxed font-medium">Reduction in design-to-code time via AI workflows</p>
            </div>

            <div className="bg-white border border-[#e5e5ea] rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all">
              <div className="font-display text-5xl md:text-6xl text-zinc-900 font-bold leading-none mb-3">
                <AnimatedCounter value="6yrs+" />
              </div>
              <p className="text-sm text-zinc-700 leading-relaxed font-medium">Enterprise UX leadership across 3 continents</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES SECTION ── */}
      <section className="py-24" id="work" aria-labelledby="work-heading">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="font-mono text-xs tracking-wider uppercase text-accent mb-2 font-semibold">Portfolio Index</p>
              <h2 id="work-heading" className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">Shipped Work</h2>
            </div>
            <p className="font-mono text-xs tracking-wider text-zinc-300 max-w-[340px] leading-relaxed md:text-right">
              Password protected. Request access at{' '}
              <a href="mailto:v.raksh777@gmail.com" className="text-accent underline decoration-accent/40 underline-offset-4 font-semibold hover:opacity-85 transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm">
                v.raksh777@gmail.com
              </a>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" role="list">
            
            {/* CASE STUDY 1: OPC UA Explorer (Featured, full width span) */}
            <div 
              onClick={() => onCaseSelect('opc-ua-explorer')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onCaseSelect('opc-ua-explorer');
                }
              }}
              onPointerEnter={() => prefetchCaseStudy('opc-ua-explorer', 'auto')}
              onFocus={() => prefetchCaseStudy('opc-ua-explorer', 'auto')}
              tabIndex={0}
              className="md:col-span-2 bento-card overflow-hidden relative group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              role="listitem"
              aria-label="Open case study: OPC UA Explorer for industrial automation"
            >
              <div className="absolute left-0 top-0 bottom-0 w-[4px] h-0 bg-accent group-hover:h-full transition-all duration-300 z-10 rounded-l-[21px]" />
              
              <div className="w-full aspect-[16/9] min-h-[220px] overflow-hidden relative border-b border-[#2e313c] bg-[#101014] flex items-center justify-center p-6 md:p-8">
                <img 
                  src="/opcuacasestudy/assets/product/workspace-overview.webp" 
                  alt="OPC UA Explorer Live Workspace Screenshot showing live plotting and address space" 
                  loading="eager"
                  decoding="async"
                  className="max-h-full max-w-full object-contain rounded-md shadow-lg group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                />

                <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/80" title="Password protected" aria-label="Password protected">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false" className="w-3.5 h-3.5">
                    <rect x="2" y="5" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M4 5V3.5a2 2 0 014 0V5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-3 font-mono text-xs">
                  <span className="text-accent uppercase font-semibold tracking-wider">MathWorks</span>
                  <span className="w-1 h-1 bg-zinc-600 rounded-full" aria-hidden="true" />
                  <span className="text-zinc-400">2024 – 2026</span>
                </div>
                <h3 className="font-sans text-xl md:text-2xl font-bold tracking-tight text-white mb-3 group-hover:text-accent transition-colors">
                  OPC UA Explorer for Industrial Automation
                </h3>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6 max-w-3xl font-normal">
                  The OPC UA Explorer in MATLAB acts as a universal remote for industrial systems: connect to any compatible machine or server, inspect telemetry data, and control operations via an intuitive point-and-click GUI.
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-zinc-800 text-sm">
                  <div className="flex flex-wrap gap-2" role="list" aria-label="Tags">
                    <span role="listitem" className="font-mono text-xs text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-md py-1 px-2.5">Enterprise UX</span>
                    <span role="listitem" className="font-mono text-xs text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-md py-1 px-2.5">Data Visualisation</span>
                    <span role="listitem" className="font-mono text-xs text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-md py-1 px-2.5">No-Code</span>
                    <span role="listitem" className="font-mono text-xs text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-md py-1 px-2.5">AI-Enabled</span>
                  </div>
                  <span className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-300 group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-all duration-300 shrink-0" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5" focusable="false">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            {/* CASE STUDY 2: Dream11 (Featured, full width span) */}
            <div 
              onClick={() => onCaseSelect('dream11')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onCaseSelect('dream11');
                }
              }}
              tabIndex={0}
              className="md:col-span-2 bento-card overflow-hidden relative group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              role="listitem"
              aria-label="Open case study: Dream11 One-Click Player Removal"
            >
              <div className="absolute left-0 top-0 bottom-0 w-[4px] h-0 bg-accent group-hover:h-full transition-all duration-300 z-10 rounded-l-[21px]" />
              
              <div className="w-full aspect-[16/9] min-h-[220px] overflow-hidden relative border-b border-[#2e313c] bg-black">
                <img 
                  src={dream11MockupImg} 
                  alt="Dream11 player replacement and live matches mobile presentation" 
                  className="w-full h-full object-cover object-center group-hover:scale-[1.01] transition-transform duration-500 ease-out"
                />

                <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/80" title="Password protected" aria-label="Password protected">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false" className="w-3.5 h-3.5">
                    <rect x="2" y="5" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M4 5V3.5a2 2 0 014 0V5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-3 font-mono text-xs">
                  <span className="text-accent uppercase font-semibold tracking-wider">Dream11</span>
                  <span className="w-1 h-1 bg-zinc-600 rounded-full" aria-hidden="true" />
                  <span className="text-zinc-400">2021 – 2022</span>
                </div>
                <h3 className="font-sans text-xl md:text-2xl font-bold tracking-tight text-white mb-3 group-hover:text-accent transition-colors">
                  One-Click Player Removal for 140M+ Users During Live Matches
                </h3>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6 max-w-3xl font-normal">
                  When official team lineups drop 30 minutes before match start, millions of fantasy users scramble to fix their squads. We redesigned the critical editing flow, achieving 100% adoption and saving ~50% in edit time.
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                  <div className="flex flex-wrap gap-2" role="list" aria-label="Tags">
                    <span role="listitem" className="font-mono text-xs text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-md py-1 px-2.5">Product Strategy</span>
                    <span role="listitem" className="font-mono text-xs text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-md py-1 px-2.5">Mobile UX</span>
                    <span role="listitem" className="font-mono text-xs text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-md py-1 px-2.5">Fantasy Gaming</span>
                  </div>
                  <span className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-300 group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-all duration-300 shrink-0" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5" focusable="false">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            {/* CASE STUDY 3: AI Design to Code */}
            <div 
              onClick={() => onCaseSelect('ai-design-to-code')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onCaseSelect('ai-design-to-code');
                }
              }}
              tabIndex={0}
              className="bento-card overflow-hidden relative group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              role="listitem"
              aria-label="Open case study: AI Design to Code Pipeline"
            >
              <div className="absolute left-0 top-0 bottom-0 w-[4px] h-0 bg-accent group-hover:h-full transition-all duration-300 z-10 rounded-l-[21px]" />
              
              <div className="w-full bg-[#07060f] aspect-[16/8] min-h-[180px] flex items-center justify-center overflow-hidden relative border-b border-[#2e313c]">
                <div className="text-center z-10 w-full px-6">
                  <div className="w-[160px] h-[75px] bg-[#0d0c1a] border border-[#1a1830] rounded-lg p-2.5 mx-auto flex flex-col justify-between shadow-xl text-left font-mono">
                    <span className="text-xs text-accent font-semibold block border-b border-[#1a1830] pb-1 uppercase">★ CSS Grid Map</span>
                    <span className="text-xs text-emerald-400">uigridlayout column fit;</span>
                  </div>
                  <p className="font-mono text-xs text-zinc-400 uppercase tracking-wider mt-3 font-medium">MathWorks AI Handover Converter</p>
                </div>

                <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/80" title="Password protected" aria-label="Password protected">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false" className="w-3.5 h-3.5">
                    <rect x="2" y="5" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M4 5V3.5a2 2 0 014 0V5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-3 font-mono text-xs">
                  <span className="text-accent uppercase font-semibold tracking-wider">MathWorks</span>
                  <span className="w-1 h-1 bg-zinc-600 rounded-full" aria-hidden="true" />
                  <span className="text-zinc-400">2025 – 2026</span>
                </div>
                <h3 className="font-sans text-lg md:text-xl font-bold tracking-tight text-white mb-2 group-hover:text-accent transition-colors">
                  AI Design-to-Code Pipeline Cutting Delivery by 70%
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed mb-4 font-normal">
                  Identified the architectural mismatch between MATLAB's grid layout model and CSS box model, then built an automated AI workflow that bridges the two.
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
                  <div className="flex flex-wrap gap-1.5" role="list" aria-label="Tags">
                    <span role="listitem" className="font-mono text-xs text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-md py-0.5 px-2">AI Integration</span>
                    <span role="listitem" className="font-mono text-xs text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-md py-0.5 px-2">Systems Thinking</span>
                    <span role="listitem" className="font-mono text-xs text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-md py-0.5 px-2">Org Impact</span>
                  </div>
                  <span className="w-7 h-7 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-300 group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-all duration-300 shrink-0" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="w-3 h-3" focusable="false">
                      <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            {/* CASE STUDY 4: Motor Parameter Estimator */}
            <div 
              onClick={() => onCaseSelect('motor-parameter')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onCaseSelect('motor-parameter');
                }
              }}
              tabIndex={0}
              className="bento-card overflow-hidden relative group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              role="listitem"
              aria-label="Open case study: MathWorks Motor Parameter Estimator"
            >
              <div className="absolute left-0 top-0 bottom-0 w-[4px] h-0 bg-accent group-hover:h-full transition-all duration-300 z-10 rounded-l-[21px]" />
              
              <div className="w-full bg-[#00070d] aspect-[16/8] min-h-[180px] flex items-center justify-center overflow-hidden relative border-b border-[#2e313c]">
                <div className="text-center z-10 w-full px-6">
                  <div className="w-[160px] h-[75px] bg-[#0a0f14] border border-[#1a1f26] rounded-lg p-2.5 mx-auto flex flex-col justify-between shadow-xl text-left font-mono">
                    <span className="text-xs text-emerald-400 font-semibold block border-b border-[#1a1f26] pb-1 uppercase">★ Rs test complete</span>
                    <div className="flex gap-2 items-center mt-1">
                      <div className="w-3.5 h-3.5 rounded-full border border-accent border-r-transparent animate-spin" aria-hidden="true" />
                      <span className="text-xs text-zinc-400">Ld test queued...</span>
                    </div>
                  </div>
                  <p className="font-mono text-xs text-zinc-400 uppercase tracking-wider mt-3 font-medium">EV Motor Control Blockset Estimator</p>
                </div>

                <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/80" title="Password protected" aria-label="Password protected">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false" className="w-3.5 h-3.5">
                    <rect x="2" y="5" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M4 5V3.5a2 2 0 014 0V5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-3 font-mono text-xs">
                  <span className="text-accent uppercase font-semibold tracking-wider">MathWorks</span>
                  <span className="w-1 h-1 bg-zinc-600 rounded-full" aria-hidden="true" />
                  <span className="text-zinc-400">2022 – 2024</span>
                </div>
                <h3 className="font-sans text-lg md:text-xl font-bold tracking-tight text-white mb-2 group-hover:text-accent transition-colors">
                  Precision Motor Parameter Estimation for EV OEMs
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed mb-4 font-normal">
                  Redesigned a complex engineering workflow for engineers at Boeing, Tesla, and Ford. The vertical became MathWorks' fastest growing in 2024 with 80%+ YoY growth.
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
                  <div className="flex flex-wrap gap-1.5" role="list" aria-label="Tags">
                    <span role="listitem" className="font-mono text-xs text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-md py-0.5 px-2">Enterprise UX</span>
                    <span role="listitem" className="font-mono text-xs text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-md py-0.5 px-2">Engineering Tools</span>
                    <span role="listitem" className="font-mono text-xs text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-md py-0.5 px-2">Research</span>
                  </div>
                  <span className="w-7 h-7 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-300 group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-all duration-300 shrink-0" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="w-3 h-3" focusable="false">
                      <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            {/* CASE STUDY 5: IO Device Builder */}
            <div 
              onClick={() => onCaseSelect('io-device-builder')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onCaseSelect('io-device-builder');
                }
              }}
              tabIndex={0}
              className="bento-card overflow-hidden relative group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              role="listitem"
              aria-label="Open case study: MathWorks IO Device Builder"
            >
              <div className="absolute left-0 top-0 bottom-0 w-[4px] h-0 bg-accent group-hover:h-full transition-all duration-300 z-10 rounded-l-[21px]" />
              
              <div className="w-full bg-[#030d08] aspect-[16/9] min-h-[180px] overflow-hidden relative border-b border-[#2e313c]">
                <img 
                  src={ioDeviceBuilderImg} 
                  alt="MathWorks IO Device Builder block sensor configuration portal" 
                  className="w-full h-full object-cover object-center group-hover:scale-[1.01] transition-transform duration-500 ease-out"
                />

                <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/80" title="Password protected" aria-label="Password protected">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false" className="w-3.5 h-3.5">
                    <rect x="2" y="5" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M4 5V3.5a2 2 0 014 0V5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-3 font-mono text-xs">
                  <span className="text-accent uppercase font-semibold tracking-wider">MathWorks</span>
                  <span className="w-1 h-1 bg-zinc-600 rounded-full" aria-hidden="true" />
                  <span className="text-zinc-400">2022</span>
                </div>
                <h3 className="font-sans text-lg md:text-xl font-bold tracking-tight text-white mb-2 group-hover:text-accent transition-colors">
                  Revolutionising Hardware Sensor Integration for 5M+ Engineers
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed mb-4 font-normal">
                  Engineers spent 2 to 3 days per sensor integration. We built a zero-to-one tool that reduced it to minutes, eliminating C/C++ knowledge as a prerequisite.
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
                  <div className="flex flex-wrap gap-1.5" role="list" aria-label="Tags">
                    <span role="listitem" className="font-mono text-xs text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-md py-0.5 px-2">Zero-to-One</span>
                    <span role="listitem" className="font-mono text-xs text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-md py-0.5 px-2">Enterprise</span>
                    <span role="listitem" className="font-mono text-xs text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-md py-0.5 px-2">Hardware UX</span>
                  </div>
                  <span className="w-7 h-7 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-300 group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-all duration-300 shrink-0" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="w-3 h-3" focusable="false">
                      <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── ABOUT STRIP (Apple-style High-Contrast Light Section) ── */}
      <section className="py-24 bg-white border-t border-[#e5e5ea] text-zinc-900 relative" aria-labelledby="about-heading">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            <div className="lg:col-span-7">
              <p className="font-mono text-xs tracking-wider uppercase text-[#c5221f] mb-3 font-semibold">About</p>
              <h2 id="about-heading" className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-6 leading-tight">
                Engineer by Training.<br />
                <span className="text-[#c5221f] font-bold">Designer by Conviction</span>.
              </h2>
              <p className="text-zinc-700 font-normal text-base md:text-lg leading-relaxed mb-8 max-w-xl">
                I started with an engineering background before discovering that the hardest problems
                were not technical; they were human. Six years of enterprise UX leadership later, I sit at the
                intersection of deep domain complexity and human-centered ergonomics.
                I have led design for products used by millions of engineers globally, building AI-native
                workflows with measurable business impact.
              </p>
              
              <div className="flex flex-wrap gap-2" role="list" aria-label="Core competencies">
                {[
                  "Strategic UX",
                  "Enterprise Products",
                  "AI-driven Design",
                  "Cross-functional Leadership",
                  "User Research",
                  "Accessibility (WCAG)",
                  "Design Systems",
                  "Figma",
                  "Miro"
                ].map((skill, idx) => (
                  <span 
                    key={idx} 
                    role="listitem"
                    className="font-mono text-xs tracking-wider text-zinc-800 bg-zinc-100 border border-zinc-300 rounded-md py-1.5 px-3 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Awards side track */}
            <div className="lg:col-span-5 flex flex-col gap-3.5" role="region" aria-label="Awards and Recognition">
              <div className="p-6 bg-[#f5f5f7] border border-[#e5e5ea] rounded-2xl flex items-start gap-4 hover:border-[#d2d2d7] transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <span className="text-2xl pt-0.5" aria-hidden="true">🏆</span>
                <div>
                  <h3 className="font-sans text-base font-bold text-zinc-900 mb-1">Clippy Award: Best AI Innovation</h3>
                  <p className="text-sm text-zinc-600 font-mono tracking-wide leading-relaxed font-normal">MathWorks 2024 – 2025 · Conceived the MATLAB App Designer Copilot</p>
                </div>
              </div>

              <div className="p-6 bg-[#f5f5f7] border border-[#e5e5ea] rounded-2xl flex items-start gap-4 hover:border-[#d2d2d7] transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <span className="text-2xl pt-0.5" aria-hidden="true">🏆</span>
                <div>
                  <h3 className="font-sans text-base font-bold text-zinc-900 mb-1">Ignite Award</h3>
                  <p className="text-sm text-zinc-600 font-mono tracking-wide leading-relaxed font-normal">MathWorks 2023 – 2024 · Recognized for design leadership and impact</p>
                </div>
              </div>

              <div className="p-6 bg-[#f5f5f7] border border-[#e5e5ea] rounded-2xl flex items-start gap-4 hover:border-[#d2d2d7] transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <span className="text-2xl pt-0.5" aria-hidden="true">📄</span>
                <div>
                  <h3 className="font-sans text-base font-bold text-zinc-900 mb-1">Springer Publication: Accessibility</h3>
                  <p className="text-sm text-zinc-600 font-mono tracking-wide leading-relaxed font-normal">2024 · Peer-reviewed research on accessible UX design</p>
                </div>
              </div>

              <div className="p-6 bg-[#f5f5f7] border border-[#e5e5ea] rounded-2xl flex items-start gap-4 hover:border-[#d2d2d7] transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <span className="text-2xl pt-0.5" aria-hidden="true">🌍</span>
                <div>
                  <h3 className="font-sans text-base font-bold text-zinc-900 mb-1">Mentored Across 3 Continents</h3>
                  <p className="text-sm text-zinc-600 font-mono tracking-wide leading-relaxed font-normal">Designers and researchers across India, US, and Europe</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CONTACT STRIP ── */}
      <section className="py-24 border-t border-[#2a2a31]" aria-labelledby="contact-heading">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
            <h2 id="contact-heading" className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight max-w-lg">
              Let's talk about{' '}
              <span className="gradient-text font-bold">what we can build</span>{' '}
              together.
            </h2>
            
            <div className="flex flex-col gap-4 shrink-0">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a 
                  href="mailto:v.raksh777@gmail.com" 
                  className="font-mono text-xs font-semibold tracking-wider text-white bg-accent hover:bg-accent-hover hover:shadow-[0_12px_40px_rgba(255,91,79,0.45)] py-4 px-8 uppercase transition-all duration-300 rounded-full w-full sm:w-[240px] text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  v.raksh777@gmail.com
                </a>
                <a 
                  href="https://www.linkedin.com/in/rakeshvishwakarma95/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-mono text-xs font-semibold tracking-wider text-white hover:text-white border border-[#2a2a31] bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/30 py-4 px-8 uppercase transition-all duration-300 rounded-full w-full sm:w-[240px] text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  LinkedIn
                </a>
              </div>
              <span className="text-xs text-zinc-400 font-mono tracking-wider mt-2 block leading-relaxed">
                Bangalore, India · Open to global remote roles
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
