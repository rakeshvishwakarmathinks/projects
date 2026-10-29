import { useEffect } from 'react';
import { PageId } from '../types';
import dream11MockupImg from '../assets/images/dream11cardimage.webp';
import ioDeviceBuilderImg from '../assets/images/iodevicebuilder.webp';
import { AnimatedCounter } from './AnimatedCounter';
import { prefetchCaseStudy } from '../utils/imagePreloader';
import { getAssetUrl } from '../utils/assets';

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
          <div className="flex items-center gap-3 font-mono text-xs font-semibold tracking-[0.18em] uppercase text-accent mb-6 animate-gentle-blink select-none">
            <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_12px_rgba(255,91,79,0.8)] shrink-0" aria-hidden="true" />
            Solving wicked problems
          </div>

          <h1 className="hero-display-title text-white mb-6 md:mb-8 max-w-4xl">
            Turning complex problems into clear design intent and{' '}
            <span className="text-accent">business outcomes</span>.
          </h1>

          <p className="text-base sm:text-lg md:text-xl font-light text-zinc-200 leading-[1.7] max-w-2xl mb-8 md:mb-10">
            6+ years of experience driving enterprise product direction and AI transformation initiatives. Shaping long-term vision and development through strategic lens across US, European, and Asian markets.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a 
              href="#work" 
              className="font-mono text-xs font-semibold tracking-wider text-white bg-accent hover:bg-accent-hover hover:shadow-[0_12px_40px_rgba(255,91,79,0.45)] py-4 px-8 uppercase transition-all duration-300 rounded-full active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              View case studies
            </a>
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
              <p className="font-mono text-xs tracking-[0.18em] uppercase text-accent mb-2 font-semibold">Portfolio Index</p>
              <h2 id="work-heading" className="section-display-title text-white">Shipped Work</h2>
            </div>
            <p className="font-mono text-xs tracking-[0.06em] text-zinc-300 max-w-[340px] leading-relaxed md:text-right font-light">
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
                  src={getAssetUrl('/opcuacasestudy/assets/product/workspace-overview.webp')} 
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
                  <span className="text-accent uppercase font-medium tracking-[0.12em]">MathWorks</span>
                  <span className="w-1 h-1 bg-zinc-600 rounded-full" aria-hidden="true" />
                  <span className="text-zinc-400 font-light">2024 – 2026</span>
                </div>
                <h3 className="card-display-title text-white mb-3 group-hover:text-accent transition-colors">
                  OPC UA Explorer for Industrial Automation
                </h3>
                <p className="text-sm sm:text-base text-zinc-300 leading-[1.7] mb-6 max-w-3xl font-light">
                  The OPC UA Explorer in MATLAB acts as a universal remote for industrial systems: connect to any compatible machine or server, inspect telemetry data, and control operations via an intuitive point-and-click GUI.
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-zinc-800 text-sm">
                  <div className="flex flex-wrap gap-2" role="list" aria-label="Tags">
                    <span role="listitem" className="font-mono text-xs tracking-[0.06em] text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-md py-1 px-2.5">Enterprise UX</span>
                    <span role="listitem" className="font-mono text-xs tracking-[0.06em] text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-md py-1 px-2.5">Data Visualisation</span>
                    <span role="listitem" className="font-mono text-xs tracking-[0.06em] text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-md py-1 px-2.5">No-Code</span>
                    <span role="listitem" className="font-mono text-xs tracking-[0.06em] text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-md py-1 px-2.5">AI-Enabled</span>
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
                  <span className="text-accent uppercase font-medium tracking-[0.12em]">Dream11</span>
                  <span className="w-1 h-1 bg-zinc-600 rounded-full" aria-hidden="true" />
                  <span className="text-zinc-400 font-light">2021 – 2022</span>
                </div>
                <h3 className="card-display-title text-white mb-3 group-hover:text-accent transition-colors">
                  One-Click Player Removal for 140M+ Users During Live Matches
                </h3>
                <p className="text-sm sm:text-base text-zinc-300 leading-[1.7] mb-6 max-w-3xl font-light">
                  When official team lineups drop 30 minutes before match start, millions of fantasy users scramble to fix their squads. We redesigned the critical editing flow, achieving 100% adoption and saving ~50% in edit time.
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                  <div className="flex flex-wrap gap-2" role="list" aria-label="Tags">
                    <span role="listitem" className="font-mono text-xs tracking-[0.06em] text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-md py-1 px-2.5">Product Strategy</span>
                    <span role="listitem" className="font-mono text-xs tracking-[0.06em] text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-md py-1 px-2.5">Mobile UX</span>
                    <span role="listitem" className="font-mono text-xs tracking-[0.06em] text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-md py-1 px-2.5">Fantasy Gaming</span>
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
              
              <div className="w-full aspect-[16/8] min-h-[180px] overflow-hidden relative border-b border-[#2e313c] bg-black">
                <img 
                  src={getAssetUrl('/assets/ai_code_graphic.webp')} 
                  alt="AI Assisted Design to Code Conversion with Copilot and MATLAB App Designer 3D Graphic" 
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
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
                  <span className="text-accent uppercase font-medium tracking-[0.12em]">MathWorks</span>
                  <span className="w-1 h-1 bg-zinc-600 rounded-full" aria-hidden="true" />
                  <span className="text-zinc-400 font-light">2025 – 2026</span>
                </div>
                <h3 className="card-display-title text-white mb-3 group-hover:text-accent transition-colors">
                  AI Design-to-Code Pipeline Cutting Delivery by 70%
                </h3>
                <p className="text-sm sm:text-base text-zinc-300 leading-[1.7] mb-6 font-light">
                  Identified the architectural mismatch between MATLAB's grid layout model and CSS box model, then built an automated AI workflow that bridges the two.
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                  <div className="flex flex-wrap gap-2" role="list" aria-label="Tags">
                    <span role="listitem" className="font-mono text-xs tracking-[0.06em] text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-md py-1 px-2.5">AI Integration</span>
                    <span role="listitem" className="font-mono text-xs tracking-[0.06em] text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-md py-1 px-2.5">Systems Thinking</span>
                    <span role="listitem" className="font-mono text-xs tracking-[0.06em] text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-md py-1 px-2.5">Org Impact</span>
                  </div>
                  <span className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-300 group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-all duration-300 shrink-0" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5" focusable="false">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
              
              <div className="w-full bg-[#00070d] aspect-[16/8] min-h-[180px] overflow-hidden relative border-b border-[#2e313c]">
                <img 
                  src={getAssetUrl('/assets/motor_parameter_hero.webp')} 
                  alt="Electric motor parameter estimation workflow showing tablet dashboard with 3D parameter surface plot and motor schematics" 
                  loading="lazy"
                  decoding="async"
                  width="1200"
                  height="600"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
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
                  <span className="text-accent uppercase font-medium tracking-[0.12em]">MathWorks</span>
                  <span className="w-1 h-1 bg-zinc-600 rounded-full" aria-hidden="true" />
                  <span className="text-zinc-400 font-light">2022 – 2024</span>
                </div>
                <h3 className="card-display-title text-white mb-3 group-hover:text-accent transition-colors">
                  Precision Motor Parameter Estimation for Global EV<span className="font-sans font-bold lowercase text-[0.72em] inline-block align-baseline">s</span>
                </h3>
                <p className="text-sm sm:text-base text-zinc-300 leading-[1.7] mb-6 font-light">
                  Redesigned a complex engineering workflow for engineers. The vertical became MathWorks' fastest growing in 2024 with 80%+ YoY growth.
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                  <div className="flex flex-wrap gap-2" role="list" aria-label="Tags">
                    <span role="listitem" className="font-mono text-xs tracking-[0.06em] text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-md py-1 px-2.5">Enterprise UX</span>
                    <span role="listitem" className="font-mono text-xs tracking-[0.06em] text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-md py-1 px-2.5">Engineering Tools</span>
                    <span role="listitem" className="font-mono text-xs tracking-[0.06em] text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-md py-1 px-2.5">Research</span>
                  </div>
                  <span className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-300 group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-all duration-300 shrink-0" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5" focusable="false">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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

              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-3 font-mono text-xs">
                  <span className="text-accent uppercase font-medium tracking-[0.12em]">MathWorks</span>
                  <span className="w-1 h-1 bg-zinc-600 rounded-full" aria-hidden="true" />
                  <span className="text-zinc-400 font-light">2022</span>
                </div>
                <h3 className="card-display-title text-white mb-3 group-hover:text-accent transition-colors">
                  Revolutionising Hardware Sensor Integration: IO Device Builder
                </h3>
                <p className="text-sm sm:text-base text-zinc-300 leading-[1.7] mb-6 font-light">
                  Engineers spent 2 to 3 days per sensor integration. We built a zero-to-one tool that reduced it to hours, intended to reduce C/C++ knowledge dependency.
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                  <div className="flex flex-wrap gap-2" role="list" aria-label="Tags">
                    <span role="listitem" className="font-mono text-xs tracking-[0.06em] text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-md py-1 px-2.5">Zero-to-One</span>
                    <span role="listitem" className="font-mono text-xs tracking-[0.06em] text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-md py-1 px-2.5">Enterprise</span>
                    <span role="listitem" className="font-mono text-xs tracking-[0.06em] text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-md py-1 px-2.5">Hardware UX</span>
                  </div>
                  <span className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-300 group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-all duration-300 shrink-0" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5" focusable="false">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
              <h2 id="about-heading" className="section-display-title text-zinc-900 mb-6 leading-[0.92]">
                ABOUT ME
              </h2>

              <h3 className="text-2xl sm:text-3xl font-display font-medium text-zinc-950 mb-6 leading-[1.2] max-w-xl">
                I turn complex problems into <span className="text-[#c5221f]">clear products</span> and design intent into <span className="text-[#c5221f]">business outcomes</span>.
              </h3>

              <p className="text-zinc-800 font-normal text-base md:text-lg leading-[1.7] mb-4 max-w-xl">
                Currently building at the intersection of design, technology, and business impact. From launching flagship products at MathWorks to shaping experiences for Dream11's 220M+ users. I enjoy turning complexity into clarity and bold ideas into intuitive, human-centered solutions.
              </p>

              <p className="text-zinc-700 font-light text-base md:text-lg leading-[1.7] mb-8 max-w-xl">
                I'm equally passionate about building inclusive design cultures, mentoring teams, and ensuring design drives lasting value at scale.
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8" role="list" aria-label="Core competencies">
                {[
                  "Strategic growth",
                  "Enterprise UX",
                  "Cross-functional leadership",
                  "AI-driven design",
                  "Accessibility",
                ].map((skill, idx) => (
                  <span 
                    key={idx} 
                    role="listitem"
                    className="font-mono text-xs tracking-[0.06em] text-zinc-800 bg-zinc-100 border border-zinc-300 rounded-full py-1.5 px-3.5 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 max-w-xs mb-8">
                <div className="p-4 rounded-xl border border-zinc-300 bg-zinc-50/70 min-w-[140px]">
                  <span className="block font-display text-3xl text-zinc-950 font-bold leading-none mb-1.5">225M+</span>
                  <span className="text-xs font-mono text-zinc-600 uppercase tracking-wider">User reach</span>
                </div>
              </div>

              <div className="max-w-xl pt-5 border-t border-zinc-200">
                <span className="block font-display text-sm uppercase tracking-wider text-zinc-950 font-bold mb-1.5">
                  Tech-stack:
                </span>
                <p className="text-xs sm:text-sm font-mono text-zinc-600 leading-relaxed">
                  Figma, Figma-make, Miro, Confluence, VS Code, MS Copilot, MATLAB Copilot, Google Gemini, Perplexity, Claude Code, Codex
                </p>
              </div>
            </div>

            {/* Awards side track */}
            <div className="lg:col-span-5 flex flex-col gap-3.5" role="region" aria-label="Awards and Recognition">
              <div className="p-6 bg-[#f5f5f7] border border-[#e5e5ea] rounded-2xl flex items-start gap-4 hover:border-[#d2d2d7] transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <span className="text-2xl pt-0.5" aria-hidden="true">🏆</span>
                <div>
                  <h3 className="font-display text-xl text-zinc-900 tracking-[0.02em] uppercase leading-tight mb-0.5">Clippy Award: Best AI Innovation</h3>
                  <p className="text-xs text-zinc-600 font-mono tracking-[0.04em] leading-relaxed">MathWorks 2024 – 2025 · MATLAB App Designer Copilot</p>
                </div>
              </div>

              <div className="p-6 bg-[#f5f5f7] border border-[#e5e5ea] rounded-2xl flex items-start gap-4 hover:border-[#d2d2d7] transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <span className="text-2xl pt-0.5" aria-hidden="true">🏆</span>
                <div>
                  <h3 className="font-display text-xl text-zinc-900 tracking-[0.02em] uppercase leading-tight mb-0.5">Ignite Award</h3>
                  <p className="text-xs text-zinc-600 font-mono tracking-[0.04em] leading-relaxed">MathWorks 2023 – 2024 · Recognized for design leadership and impact</p>
                </div>
              </div>

              <div className="p-6 bg-[#f5f5f7] border border-[#e5e5ea] rounded-2xl flex items-start gap-4 hover:border-[#d2d2d7] transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <span className="text-2xl pt-0.5" aria-hidden="true">📄</span>
                <div>
                  <h3 className="font-display text-xl text-zinc-900 tracking-[0.02em] uppercase leading-tight mb-0.5">Springer Publication: Accessibility</h3>
                  <p className="text-xs text-zinc-600 font-mono tracking-[0.04em] leading-relaxed">2024 · Peer-reviewed research on accessible UX design</p>
                </div>
              </div>

              <div className="p-6 bg-[#f5f5f7] border border-[#e5e5ea] rounded-2xl flex items-start gap-4 hover:border-[#d2d2d7] transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <span className="text-2xl pt-0.5" aria-hidden="true">🌍</span>
                <div>
                  <h3 className="font-display text-xl text-zinc-900 tracking-[0.02em] uppercase leading-tight mb-0.5">Mentored Across 3 Continents</h3>
                  <p className="text-xs text-zinc-600 font-mono tracking-[0.04em] leading-relaxed">Designers and researchers across India, US, and Europe</p>
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
            <h2 id="contact-heading" className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-[0.02em] leading-[0.88] text-white max-w-lg">
              Let's talk about<br />
              <span className="text-accent">what we can build</span><br />
              together.
            </h2>
            
            <div className="flex flex-col gap-4 shrink-0">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a 
                  href="mailto:v.raksh777@gmail.com?subject=Product%20Design%20Inquiry%20%E2%80%94%20Rakesh%20Vishwakarma" 
                  target="_top"
                  rel="noopener noreferrer"
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
