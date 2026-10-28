import { useEffect } from 'react';
import { PageId } from '../types';
import dream11CardImg from '../assets/images/dream11cardimage.webp';
import ioDeviceBuilderImg from '../assets/images/iodevicebuilder.webp';
import { AnimatedCounter } from './AnimatedCounter';
import OpcUaCaseStudy from './OpcUaCaseStudy';
import Dream11CaseStudy from './Dream11CaseStudy';
import AiCodeGenerationCaseStudy from './AiCodeGenerationCaseStudy';
import MotorParameterCaseStudy from './MotorParameterCaseStudy';
import MotorParameterSandbox from './MotorParameterSandbox';
import IoDeviceBuilderCaseStudy from './IoDeviceBuilderCaseStudy';
import ZoomableImage from './ZoomableImage';
import { preloadImages, AI_CODE_IMAGES, MOTOR_IMAGES } from '../utils/imagePreloader';

interface CaseStudyDetailProps {
  caseId: string;
  onPageChange: (page: PageId) => void;
}

export default function CaseStudyDetail({ caseId, onPageChange }: CaseStudyDetailProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
    if (caseId === 'dream11') {
      preloadImages([dream11CardImg], 'high');
    } else if (caseId === 'io-device-builder') {
      preloadImages([ioDeviceBuilderImg], 'high');
    } else if (caseId === 'ai-design-to-code') {
      preloadImages(AI_CODE_IMAGES, 'high');
    } else if (caseId === 'motor-parameter') {
      preloadImages(MOTOR_IMAGES, 'high');
    }
  }, [caseId]);

  // Render correct page content based on caseId
  if (caseId === 'dream11') {
    return <Dream11CaseStudy onPageChange={onPageChange} />;
  }


  if (caseId === 'io-device-builder') {
    return <IoDeviceBuilderCaseStudy onPageChange={onPageChange} />;
  }

  if (caseId === 'motor-parameter') {
    return <MotorParameterCaseStudy onPageChange={onPageChange} />;
  }

  if (caseId === 'motor-parameter-legacy') {
    return (
      <main id="main-content" tabIndex={-1} className="pt-24 min-h-screen bg-bg focus:outline-none">
        {/* HERO */}
        <header className="grid grid-cols-1 md:grid-cols-12 min-h-[72vh] border-b border-border-custom bg-black">
          {/* Left panel */}
          <div className="md:col-span-7 bg-black text-white p-8 md:p-16 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-accent"></div>
            
            <div className="z-10 mt-6">
              <button 
                onClick={() => onPageChange('home')}
                className="inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase text-zinc-300 hover:text-accent mb-8 group transition-colors"
              >
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="w-4 h-4 transition-transform group-hover:-translate-x-1">
                  <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                All work
              </button>
              <p className="font-mono text-xs tracking-[0.18em] uppercase text-accent mb-4 font-semibold">MathWorks · Case Study 4 of 5</p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl uppercase tracking-[0.02em] leading-[0.9] text-white mb-6">
                Precision Motor<br />
                Parameter Estimation<br />
                <span className="text-accent">For Global EV<span className="font-sans font-bold lowercase text-[0.72em] inline-block align-baseline">s</span></span>
              </h1>
              <p className="text-base sm:text-lg font-light text-zinc-300 leading-[1.7] max-w-lg">
                Motor control engineers at Boeing, Tesla, Nissan, and Ford were spending
                days calibrating motors through fragmented scripts and trial-and-error.
                We redesigned the entire workflow into a safety-first, guided desktop application,
                and the vertical became MathWorks' fastest growing in 2024.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-8 mt-12 border-t border-white/10 z-10 font-light">
              <span className="font-mono text-xs tracking-wide uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">MathWorks</span>
              <span className="font-mono text-xs tracking-wide uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">Aug 2022 – Feb 2024</span>
              <span className="font-mono text-xs tracking-wide uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">Desktop App</span>
              <span className="font-mono text-xs tracking-wide uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">UX Lead</span>
              <span className="font-mono text-xs tracking-wide uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">21-person team</span>
            </div>
          </div>

          {/* Right panel */}
          <div className="md:col-span-5 bg-[#0a0a0d] p-8 md:p-14 flex flex-col justify-end gap-8 relative border-t md:border-t-0 md:border-l border-border-custom">
            <div className="absolute bottom-[-20px] right-[-10px] font-display text-[15rem] leading-none opacity-5 text-white select-none pointer-events-none">04</div>
            
            <div className="w-full bg-[#00070d] rounded-sm aspect-[16/10] overflow-hidden flex items-center justify-center p-8 relative border border-border-custom">
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(ellipse at center, #E84409 0%, transparent 80%)'
              }}></div>
              
              <div className="text-center z-10 w-full px-4">
                {/* Visual interface for estimation tests */}
                <div className="bg-[#0a0f14] border border-[#1a2030] rounded p-3 text-left shadow-lg">
                  <div className="flex justify-between items-center mb-2 pb-1 border-b border-white/10">
                    <span className="text-[8px] font-mono text-white/90">Rs Estimation Status</span>
                    <span className="bg-[#16a34a]/20 text-[#16a34a] font-mono text-[6px] py-0.5 px-1.5 rounded font-bold uppercase">Rs SUCCESS</span>
                  </div>
                  <div className="flex gap-4 items-center mb-3">
                    {/* Ring dial */}
                    <div className="w-10 h-10 rounded-full border-2 border-accent border-r-transparent flex items-center justify-center">
                      <span className="text-[8px] font-bold text-white">RPM 0</span>
                    </div>
                    <div className="text-[7px] font-mono text-white/45">
                      <p>Ld test: queued</p>
                      <p>Lq test: queued</p>
                    </div>
                  </div>
                  <table className="w-full font-mono text-[7px] text-white/60">
                    <tbody>
                      <tr><td>Phase resistance, Rs</td><td className="text-right text-white font-semibold">0.17960 Ω</td></tr>
                      <tr><td>D-axis inductance, Ld</td><td className="text-right text-white font-semibold">0.00016 H</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="font-mono text-[9px] text-[#8e8e93] uppercase tracking-widest mt-2">Active Estimation GUI Module</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-8 z-10">
              <div className="flex flex-col border-b border-border-custom pb-4">
                <div className="font-display text-4xl text-accent leading-none mb-1"><AnimatedCounter value="80%+" /></div>
                <div className="font-mono text-xs tracking-wide uppercase text-zinc-400">YoY vertical growth in 2024</div>
              </div>
              <div className="flex flex-col border-b border-border-custom pb-4">
                <div className="font-display text-4xl text-accent leading-none mb-1"><AnimatedCounter value="~500%" /></div>
                <div className="font-mono text-xs tracking-wide uppercase text-zinc-400">Revenue growth over 3 years</div>
              </div>
              <div className="flex flex-col border-b border-border-custom pb-4">
                <div className="font-display text-4xl text-accent leading-none mb-1"><AnimatedCounter value="~30%" /></div>
                <div className="font-mono text-xs tracking-wide uppercase text-zinc-400">Growth in enterprise base</div>
              </div>
              <div className="flex flex-col border-b border-border-custom pb-4">
                <div className="font-display text-4xl text-accent leading-none mb-1"><AnimatedCounter value="Days→Hrs" /></div>
                <div className="font-mono text-xs tracking-wide uppercase text-zinc-400">Motor estimation time reduction</div>
              </div>
            </div>
          </div>
        </header>

        {/* IMPACT BAND (Light Section) */}
        <section className="py-20 border-b border-[#e5e5ea] bg-[#f5f5f7] text-[#1d1d1f]" aria-label="Project impact">
          <div className="max-w-[1200px] mx-auto px-8">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#c5221f] mb-8 font-semibold">Outcome first</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
              <div className="p-8 bg-white border border-[#e5e5ea] rounded-xl shadow-sm flex flex-col justify-between gap-3">
                <div className="font-display text-5xl text-[#c5221f] leading-none"><AnimatedCounter value="80%+" /></div>
                <p className="font-mono text-xs tracking-wider uppercase text-zinc-600 font-medium">YoY vertical growth</p>
              </div>
              <div className="p-8 bg-white border border-[#e5e5ea] rounded-xl shadow-sm flex flex-col justify-between gap-3">
                <div className="font-display text-5xl text-[#c5221f] leading-none"><AnimatedCounter value="~500%" /></div>
                <p className="font-mono text-xs tracking-wider uppercase text-zinc-600 font-medium">Revenue growth over 3 yrs</p>
              </div>
              <div className="p-8 bg-white border border-[#e5e5ea] rounded-xl shadow-sm flex flex-col justify-between gap-3">
                <div className="font-display text-5xl text-[#c5221f] leading-none"><AnimatedCounter value="Days→Hrs" /></div>
                <p className="font-mono text-xs tracking-wider uppercase text-zinc-600 font-medium">Motor estimation reduction</p>
              </div>
              <div className="p-8 bg-white border border-[#e5e5ea] rounded-xl shadow-sm flex flex-col justify-between gap-3">
                <div className="font-display text-5xl text-[#c5221f] leading-none"><AnimatedCounter value="3" /></div>
                <p className="font-mono text-xs tracking-wider uppercase text-zinc-600 font-medium">Subsequent apps based on standard</p>
              </div>
            </div>
            <p className="text-lg md:text-xl font-light text-zinc-700 leading-relaxed max-w-3xl border-t border-[#e5e5ea] pt-8">
              The Motor Control Blockset vertical was already growing when I joined.
              The question was whether UX investment could accelerate it. The answer was yes,
              but only because we treated this as a workflows redesign, not a UI refresh.
              Engineering complexity did not decrease; we absorbed it into the interface
              so users never had to see it.
            </p>
          </div>
        </section>

        {/* ============ INTERACTIVE DIGITAL TWIN SANDBOX ============ */}
        <MotorParameterSandbox />

        {/* PROBLEM (Dark Section) */}
        <section className="py-20 border-b border-border-custom bg-black text-white" aria-label="The problem">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="mb-12">
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4 font-semibold">01 · The Problem</p>
              <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">
                EV engineers spending<br />days on a workflow<br /><span className="text-accent underline decoration-accent/30 underline-offset-8">that should take hours.</span>
              </h2>
              <p className="text-lg font-light text-zinc-300 leading-relaxed max-w-2xl">
                Accurately estimating motor parameters (resistance, inductance, inertia) is
                critical for motor control. The existing MATLAB workflow required users to run
                separate scripts, stitch results manually, and re-run entire test sequences
                if a single stage failed. No unified interface, no guided flow, no granular control.
              </p>
            </div>

            <div className="flex flex-col mt-12 bg-[#0d0d11] p-6 border border-border-custom rounded-xl">
              {[
                { num: "1", title: "Scattered workflow, no unified interface", text: "Estimation steps lived in separate scripts and environments. A new user had no clear starting point and no map of the overall process." },
                { num: "2", title: "No control over individual test runs", text: "A failed Rs estimation meant re-running the entire sequence from scratch. Engineers cited this as the single most demanding frustration." },
                { num: "3", title: "No source code visibility", text: "Users could not inspect what the estimation algorithms were doing. For safety-critical aerospace/defense applications, this was a trust blocker." },
                { num: "4", title: "Hardware customisation required C++ expertise", text: "Adapting the workflow for custom power boards required writing system C++ blocks, excluding motor experts who were not engineers." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 py-6 border-b last:border-b-0 border-[#1c1c22] items-start">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-sm font-bold font-mono shrink-0 shadow-sm">
                    {item.num}
                  </div>
                  <div className="text-sm">
                    <strong className="text-white font-semibold block mb-1">{item.title}</strong>
                    <span className="text-zinc-300 font-light leading-relaxed">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STRATEGY & DECISIONS (Light Section) */}
        <section className="py-20 border-b border-[#e5e5ea] bg-[#f5f5f7] text-[#1d1d1f]" aria-label="Research and key decisions">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="mb-12">
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#c5221f] mb-4 font-semibold">02 · Process &amp; Strategy</p>
              <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 mb-4">
                Map first. <em className="not-italic text-[#c5221f]">Then structural pushback.</em>
              </h2>
            </div>

            {/* Steps horizontal */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { step: "Phase 01", title: "Discovery & Salesforce Metrics", body: "Parsed Salesforce customer feedback tickets and Gecko errors. Identified that over 70% of support issues derived from command script parameters mismatch." },
                { step: "Phase 02", title: "Human Design Workshop", body: "Organized design sprints with devs, PMs, and customer success engineers. Validated the unified desktop app direction against legacy command line models." },
                { step: "Phase 03", title: "Usability Lab Testing", body: "Integrated structural focus reviews on high-fidelity visual UI, including granular testing of the emergency stop logic and signal interruption states." },
                { step: "Phase 04", title: "Scaling the Pattern", body: "Championed standardizing the Toolstrip and estimation subpanel widgets across MathWorks, making it the layout model for two subsequent projects." }
              ].map((item, idx) => (
                <div key={idx} className="p-6 bg-white border border-[#e5e5ea] rounded-xl shadow-sm flex flex-col justify-between h-full relative">
                  <span className="absolute top-0 left-0 w-8 h-1 bg-[#ff3b30] rounded-tl-xl"></span>
                  <div className="mb-6 font-light">
                    <div className="font-mono text-xs text-[#c5221f] tracking-widest uppercase mb-4 font-semibold">{item.step}</div>
                    <h3 className="font-semibold text-[#1d1d1f] text-base mb-2">{item.title}</h3>
                    <p className="text-sm font-normal text-zinc-600 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Strategic decision */}
            <div className="mt-16 border-t border-[#e5e5ea] pt-12">
              <h3 className="font-display text-4xl text-[#1d1d1f] mb-6 uppercase font-semibold">Surfacing structural pushback</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 border border-[#e5e5ea] bg-white rounded-xl shadow-sm">
                  <div className="font-mono text-xs text-[#6e6e73] uppercase mb-3 tracking-widest font-semibold">Initial Dev Preference</div>
                  <p className="text-sm text-zinc-700 font-normal leading-relaxed">Embed calculations directly into current model scripts. Reused existing backend APIs quickly without creating new application layers.</p>
                </div>
                <div className="p-6 border-2 border-[#ff3b30] bg-white rounded-xl shadow-sm">
                  <div className="font-mono text-xs text-[#c5221f] uppercase mb-3 tracking-widest font-bold">Our UI Recommendation (Won)</div>
                  <p className="text-sm text-[#1d1d1f] font-normal leading-relaxed">Dedicated GUI Toolstrip app. Built clean steps, visual gauge sliders, safety warnings, and live estimation tables. Lowered beginner cognitive load drastically.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 03 DESIGN OUTPUT (Dark Section) */}
        <section className="py-20 border-b border-border-custom bg-black text-white" aria-label="Before and after">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="mb-12">
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4 font-semibold">03 · Design Output</p>
              <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">
                From fragmented scripts <span className="text-accent">→ consolidated GUI</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
              {/* BEFORE */}
              <div className="border border-border-custom bg-[#0d0d11] flex flex-col rounded-xl overflow-hidden">
                <div className="bg-[#141418] text-[#8e8e93] font-mono text-xs py-3.5 px-6 tracking-wider uppercase font-semibold border-b border-[#1c1c22]">Before: Fragmented Scripts</div>
                <div className="p-6 flex flex-col gap-4">
                  <p className="font-mono text-xs text-[#8e8e93] tracking-widest uppercase mb-2">Old workflow:</p>
                  <div className="p-4 bg-[#141418] border border-white/5 rounded-lg text-sm text-zinc-300 flex gap-3">
                    <span className="font-mono text-xs text-[#8e8e93] mt-0.5 font-semibold">①</span>
                    Search local directory folders for correct calibration m-script.
                  </div>
                  <div className="p-4 bg-[#141418] border border-white/5 rounded-lg text-sm text-zinc-300 flex gap-3">
                    <span className="font-mono text-xs text-[#8e8e93] mt-0.5 font-semibold">②</span>
                    Open script → configure hardware variables manually (no error bounds).
                  </div>
                  <div className="p-4 bg-[#141418] border border-white/5 rounded-lg text-sm text-zinc-300 flex gap-3">
                    <span className="font-mono text-xs text-[#8e8e93] mt-0.5 font-semibold">③</span>
                    Run full script sequences sequentially; failures cancel everything.
                  </div>
                  <div className="mt-2 p-3 bg-red-950/40 border-l-2 border-[#ff3b30] font-mono text-xs text-[#ff9999] leading-relaxed rounded-r">
                    Average time: 2–3 days per setup calibration. Error-prone.
                  </div>
                </div>
              </div>

              {/* AFTER */}
              <div className="border border-accent/40 bg-[#0d0d11] flex flex-col rounded-xl overflow-hidden shadow-lg">
                <div className="bg-accent text-white font-mono text-xs py-3.5 px-6 tracking-wider uppercase font-bold">After: Standardized Desktop App</div>
                <div className="p-6 flex flex-col gap-4">
                  <p className="font-mono text-xs text-accent tracking-widest uppercase mb-2 font-semibold">Consolidated desktop app experience:</p>
                  
                  {/* UI Mockup: App estimator */}
                  <div className="bg-[#f5f5f7] border border-black/10 rounded-lg p-4 flex flex-col gap-3 shadow-inner text-[#1d1d1f]">
                    <div className="flex items-center justify-between pb-2 border-b border-black/5">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]"></span>
                      </div>
                      <span className="font-mono text-[10px] text-zinc-600 font-medium">Motor Parameter Estimator App</span>
                    </div>
                    
                    <div className="bg-white border border-[#e5e5ea] p-3 rounded shadow-sm">
                      <div className="flex justify-between items-center mb-2 pb-1 border-b border-[#eee]">
                        <span className="text-[10px] font-mono font-bold text-[#1d1d1f]">ACTIVE RS SEQUENCE</span>
                        <span className="text-[#c5221f] text-[8px] font-mono font-bold">● RUNNING</span>
                      </div>
                      <div className="flex gap-2 items-center text-[10px] font-mono py-1">
                        <div className="w-5 h-5 rounded-full border-2 border-accent border-r-transparent animate-spin"></div>
                        <span className="text-zinc-700">Measuring Phase Resistance, Rs</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-accent/10 border-l-2 border-accent text-sm text-zinc-300 flex gap-3 rounded-r">
                    <span className="text-accent font-semibold">✓</span>
                    Unified Toolstrip app consolidated multi-day work.
                  </div>
                  <div className="p-3 bg-accent/10 border-l-2 border-accent text-sm text-zinc-300 flex gap-3 rounded-r">
                    <span className="text-accent font-semibold">✓</span>
                    Granular stage selection enables re-running single tests.
                  </div>
                  <div className="mt-2 p-3 bg-accent/10 border-l-2 border-accent font-mono text-xs text-zinc-300 leading-relaxed rounded-r">
                    Time reduced: multi-day setup shrunk to hours. No data leaks.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 04 REFLECTION (Light Section) */}
        <section className="py-20 bg-[#f5f5f7] text-[#1d1d1f]" aria-label="Reflection">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="border-t-4 border-[#ff3b30] pt-10">
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#c5221f] mb-4 font-semibold">04 · Reflection</p>
              <h2 className="font-display text-4xl md:text-5xl tracking-wide text-[#1d1d1f] mb-10 uppercase">What I learned and what I'd do differently</h2>
              
              <div className="flex flex-col gap-6 font-light">
                {[
                  { num: "01", text: "<strong>Incorporate contextual inquiries over simple labs.</strong> Watching motor engineers set up physical setups in their lab rooms (navigating safety constraints, restarts, reboot signals) provides much richer insights." },
                  { num: "02", text: "<strong>Navigate the legacy frameworks early.</strong> Building for standard C++/Java platforms restricts desktop UI layouts significantly. Working with devs on layout bounds early spares design compromise downstream." },
                  { num: "03", text: "<strong>Lock down delivery roadmap parameters.</strong> Incorporating early templates and script saves was high-impact. Surfacing these as hard milestones rather than conceptual features maintains V2 velocity." }
                ].map((item, idx) => (
                  <div key={idx} className="grid grid-cols-[32px_1fr] gap-4 py-6 border-b border-[#e5e5ea] last:border-none">
                    <span className="font-mono text-xs text-[#c5221f] mt-0.5 font-bold">{item.num}</span>
                    <p className="text-sm sm:text-base text-zinc-700 leading-relaxed font-normal" dangerouslySetInnerHTML={{ __html: item.text }}></p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CASE STUDY METADATA STRIP ── */}
        <div className="py-12 border-t border-border-custom bg-black text-center">
          <div className="max-w-[1200px] mx-auto px-6 md:px-8">
            <p className="font-mono text-xs tracking-wider uppercase text-zinc-400">
              Motor Parameter Estimator · EV Motor Control Blockset · UX Case Study
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
                onClick={() => onPageChange('ai-design-to-code')}
                className="font-sans text-2xl md:text-3xl font-bold tracking-tight text-white hover:text-accent flex items-center gap-4 text-left md:text-right group transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg p-1 -mr-1"
                aria-label="Next Case Study: AI Design-to-Code Pipeline"
              >
                <span>AI Design-to-Code Pipeline · MathWorks</span>
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

  if (caseId === 'ai-design-to-code') {
    return <AiCodeGenerationCaseStudy onPageChange={onPageChange} />;
  }

  if (caseId === 'opc-ua-explorer') {
    return <OpcUaCaseStudy onPageChange={onPageChange} />;
  }

  return null;
}
