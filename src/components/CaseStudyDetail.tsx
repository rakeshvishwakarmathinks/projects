import { useEffect } from 'react';
import { PageId } from '../types';
import dream11CardImg from '../assets/images/dream11cardimage.webp';
import ioDeviceBuilderImg from '../assets/images/iodevicebuilder.webp';
import { AnimatedCounter } from './AnimatedCounter';
import OpcUaCaseStudy from './OpcUaCaseStudy';
import Dream11CaseStudy from './Dream11CaseStudy';
import MotorParameterSandbox from './MotorParameterSandbox';
import ZoomableImage from './ZoomableImage';
import { preloadImages } from '../utils/imagePreloader';

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
    }
  }, [caseId]);

  // Render correct page content based on caseId
  if (caseId === 'dream11') {
    return <Dream11CaseStudy onPageChange={onPageChange} />;
  }


  if (caseId === 'io-device-builder') {
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
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4 font-semibold">MathWorks · Case Study 3 of 5</p>
              <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.08]">
                Hardware sensor<br />
                integration:<br />
                days → minutes
              </h1>
              <p className="text-base font-light text-zinc-300 leading-relaxed max-w-lg">
                Engineers building autonomous vehicles, robotics, and aerospace hardware
                spent 2–3 days per sensor integration writing C/C++ wrapper code, hunting
                documentation, and navigating a process that assumed expert programming knowledge.
                We built a zero-to-one tool that eliminated all of it.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-8 mt-12 border-t border-white/10 z-10">
              <span className="font-mono text-xs tracking-wide uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">MathWorks</span>
              <span className="font-mono text-xs tracking-wide uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">6 months · 2022</span>
              <span className="font-mono text-xs tracking-wide uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">Simulink Desktop</span>
              <span className="font-mono text-xs tracking-wide uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">Lead Design &amp; Research</span>
              <span className="font-mono text-xs tracking-wide uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">Zero-to-one</span>
            </div>
          </div>

          {/* Right panel */}
          <div className="md:col-span-5 bg-[#0a0a0d] p-8 md:p-14 flex flex-col justify-end gap-8 relative border-t md:border-t-0 md:border-l border-border-custom">
            <div className="absolute bottom-[-20px] right-[-10px] font-display text-[15rem] leading-none opacity-5 text-white select-none pointer-events-none">03</div>
            
            <div className="w-full bg-black rounded-sm aspect-[16/9] overflow-hidden relative border border-border-custom shadow-xl">
              <ZoomableImage 
                src={ioDeviceBuilderImg} 
                alt="MathWorks IO Device Builder sensor block matrix mapping interface" 
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-8 z-10">
              <div className="flex flex-col border-b border-border-custom pb-4">
                <div className="font-display text-4xl text-accent leading-none mb-1"><AnimatedCounter value="Days→Mins" /></div>
                <div className="font-mono text-xs tracking-wide uppercase text-zinc-400">Sensor integration time</div>
              </div>
              <div className="flex flex-col border-b border-border-custom pb-4">
                <div className="font-display text-4xl text-accent leading-none mb-1"><AnimatedCounter value="Zero" /></div>
                <div className="font-mono text-xs tracking-wide uppercase text-zinc-400">C/C++ knowledge required</div>
              </div>
              <div className="flex flex-col border-b border-border-custom pb-4">
                <div className="font-display text-4xl text-accent leading-none mb-1"><AnimatedCounter value="100+" /></div>
                <div className="font-mono text-xs tracking-wide uppercase text-zinc-400">Sensor types supported</div>
              </div>
              <div className="flex flex-col border-b border-border-custom pb-4">
                <div className="font-display text-4xl text-accent leading-none mb-1"><AnimatedCounter value="5M+" /></div>
                <div className="font-mono text-xs tracking-wide uppercase text-zinc-400">Engineers with access</div>
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
                <div className="font-display text-5xl text-[#c5221f] leading-none"><AnimatedCounter value="2–3 days" /></div>
                <p className="font-mono text-xs tracking-wider uppercase text-zinc-600 font-medium">Before: per integration</p>
              </div>
              <div className="p-8 bg-white border border-[#e5e5ea] rounded-xl shadow-sm flex flex-col justify-between gap-3">
                <div className="font-display text-5xl text-[#c5221f] leading-none"><AnimatedCounter value="<30 min" /></div>
                <p className="font-mono text-xs tracking-wider uppercase text-zinc-600 font-medium">After: no code required</p>
              </div>
              <div className="p-8 bg-white border border-[#e5e5ea] rounded-xl shadow-sm flex flex-col justify-between gap-3">
                <div className="font-display text-5xl text-[#c5221f] leading-none"><AnimatedCounter value="Zero" /></div>
                <p className="font-mono text-xs tracking-wider uppercase text-zinc-600 font-medium">C/C++ skills required</p>
              </div>
              <div className="p-8 bg-white border border-[#e5e5ea] rounded-xl shadow-sm flex flex-col justify-between gap-3">
                <div className="font-display text-5xl text-[#c5221f] leading-none"><AnimatedCounter value="100+" /></div>
                <p className="font-mono text-xs tracking-wider uppercase text-zinc-600 font-medium">Board types supported</p>
              </div>
            </div>
            <p className="text-lg md:text-xl font-light text-zinc-700 leading-relaxed max-w-3xl border-t border-[#e5e5ea] pt-8">
              This was my first end-to-end product launch at MathWorks, going from blank canvas
              to shipped, documented, marketed product in six months. The domain was unique:
              RADAR and sensor integration in Simulink, a use case never formally automated before.
              Everything built from first principles, including the research framework
              for a user base we had never previously studied at this level.
            </p>
          </div>
        </section>

        {/* PROBLEM (Dark Section) */}
        <section className="py-20 border-b border-border-custom bg-black text-white" aria-label="The problem">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="mb-12">
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4 font-semibold">01 · The Problem</p>
              <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">
                Days of manual work<br />before any actual<br /><span className="text-accent underline decoration-accent/30 underline-offset-8">engineering could start.</span>
              </h2>
              <p className="text-lg font-light text-zinc-300 leading-relaxed max-w-2xl">
                Simulink is used by 5M+ engineers to model, simulate, and deploy dynamic systems.
                Integrating a physical hardware sensor into a Simulink model required intermediate
                C/C++ programming knowledge, manual file hunting, and trial-and-error that consumed
                entire working days. Simulink was designed for systems modelling, not hardware onboarding.
              </p>
            </div>

            <div className="bg-[#141418] border-l-4 border-accent border border-white/5 p-6 rounded-r-xl my-8">
              <p className="font-mono text-xs tracking-widest text-accent uppercase mb-2 font-semibold">The strategic question</p>
              <p className="text-base text-zinc-300 font-light leading-relaxed">
                Could we make sensor block creation simple enough that a research manager
                with zero C++ experience completes it in under 30 minutes,
                without reducing the power available to expert developers?
              </p>
            </div>

            <div className="flex flex-col mt-12 bg-[#0d0d11] p-6 border border-border-custom rounded-xl">
              {[
                { num: "1", title: "2–3 days per sensor integration", text: "Engineers spent the majority of this time not on simulation itself but on finding driver libraries, understanding undocumented header files, and debugging code." },
                { num: "2", title: "C/C++ as a hard prerequisite", text: "Creating a block mask wrapper for a library required writing C/C++, excluding research managers, control engineers, and academics who were fluent in MATLAB/Simulink but not hardware systems." },
                { num: "3", title: "Documentation hunting", text: "Engineers reported hours searching manufacturer GitHub repositories, IEEE papers, and MathWorks community forums to piece together hardware parameters." },
                { num: "4", title: "No supported path for custom sensors", text: "While MathWorks shipped standard pre-built board blocks, newer or niche sensors lacked official support, forcing engineers to start from scratch." }
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

        {/* 02 WHO WE DESIGNED FOR (Light Section) */}
        <section className="py-20 border-b border-[#e5e5ea] bg-[#f5f5f7] text-[#1d1d1f]" aria-label="Who We Designed For">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="mb-12">
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#c5221f] mb-4 font-semibold">02 · Who We Designed For</p>
              <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 mb-4">
                Three users. <em className="not-italic text-[#c5221f]">One tool.</em> No compromise.
              </h2>
              <p className="text-base font-light text-zinc-700 leading-relaxed max-w-2xl">
                Research surfaced three distinct profile domains with different technical backgrounds
                and failures. The design challenge was to serve all three without sacrificing professional control.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { domain: "User 01", title: "Research Manager", body: "Academic researcher tracking environmental metrics. Fluent in Python/MATLAB, zero systems programming. Needs to bring custom sensor feeds into models quickly." },
                { domain: "User 02", title: "Control Engineer", body: "R&D robotics engineer. Combines hardware sensors for physical prototypes. Understands hardware architecture but does not have time to code custom wrappers." },
                { domain: "User 03", title: "Component Developer", body: "Writes structured firmware block libraries regularly. Seeks consistent layouts, automatic port alignment, faster folder dependency resolution." }
              ].map((item, idx) => (
                <div key={idx} className="p-6 bg-white border border-[#e5e5ea] rounded-xl shadow-sm relative">
                  <div className="font-mono text-xs text-[#c5221f] tracking-widest uppercase mb-4 font-semibold">{item.domain}</div>
                  <h3 className="font-semibold text-[#1d1d1f] text-base mb-2">{item.title}</h3>
                  <p className="text-xs font-light text-zinc-600 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>

            {/* Design steps */}
            <div className="mt-16 border-t border-[#e5e5ea] pt-12">
              <h3 className="font-sans text-xl md:text-2xl font-bold tracking-tight text-zinc-900 mb-6">Key Design Decisions</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { dec: "Decision 01", title: "Simulink Native", body: "Embedded our utility directly into the Simulink Hardware tab. Preceded standard mental models instead of forcing a context switch." },
                  { dec: "Decision 02", title: "Dynamic Wizard", body: "Structured a 9-step responsive wizard, giving novices step-by-step guidance while advanced developers can jump sections dynamically." },
                  { dec: "Decision 03", title: "Port Parsing", body: "Automated parser reading imported C files, auto-detecting ports and types to eliminate manual port parameterizing." },
                  { dec: "Decision 04", title: "Directory Import", body: "Optimized direct zip/directory parsing for hardware vendor folders, resolving driver headers instantly." }
                ].map((item, idx) => (
                  <div key={idx} className="p-6 bg-white border border-[#e5e5ea] rounded-xl shadow-sm relative flex flex-col justify-between h-full">
                    <span className="absolute top-0 left-0 w-8 h-1 bg-[#ff3b30] rounded-tl-xl"></span>
                    <div>
                      <div className="font-mono text-xs text-[#c5221f] tracking-wider uppercase mb-3 font-semibold">{item.dec}</div>
                      <h4 className="font-semibold text-[#1d1d1f] text-sm mb-2">{item.title}</h4>
                      <p className="text-xs font-light text-zinc-600 leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 03 DESIGN OUTPUT (Dark Section) */}
        <section className="py-20 border-b border-border-custom bg-black text-white" aria-label="Design output">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="mb-12">
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4 font-semibold">03 · Design Output</p>
              <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">
                Manual wrapper <span className="text-accent">→ guided wizard</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
              {/* BEFORE */}
              <div className="border border-border-custom bg-[#0d0d11] flex flex-col rounded-xl overflow-hidden">
                <div className="bg-[#141418] text-[#8e8e93] font-mono text-xs py-3.5 px-6 tracking-wider uppercase font-semibold border-b border-[#1c1c22]">Before: Manual Wrapper Process</div>
                <div className="p-6 flex flex-col gap-4">
                  <p className="font-mono text-xs text-[#8e8e93] tracking-widest uppercase mb-2">Creating one block manually:</p>
                  <div className="p-4 bg-[#141418] border border-white/5 rounded-lg text-sm text-zinc-300 flex gap-3">
                    <span className="font-mono text-xs text-[#8e8e93] mt-0.5 font-semibold">①</span>
                    Manually search manufacturer standard registers and C file parameters.
                  </div>
                  <div className="p-4 bg-[#141418] border border-white/5 rounded-lg text-sm text-zinc-300 flex gap-3">
                    <span className="font-mono text-xs text-[#8e8e93] mt-0.5 font-semibold">②</span>
                    Write Custom C/C++ code wrapper scripts from scratch.
                  </div>
                  <div className="p-4 bg-[#141418] border border-white/5 rounded-lg text-sm text-zinc-300 flex gap-3">
                    <span className="font-mono text-xs text-[#8e8e93] mt-0.5 font-semibold">③</span>
                    Manually build mask dialog blocks within the Simulink visual interface.
                  </div>
                  <div className="mt-2 p-3 bg-red-950/40 border-l-2 border-[#ff3b30] font-mono text-xs text-[#ff9999] leading-relaxed rounded-r">
                    Average time: 2–3 working days per block mapping. Coding required.
                  </div>
                </div>
              </div>

              {/* AFTER */}
              <div className="border border-accent/40 bg-[#0d0d11] flex flex-col rounded-xl overflow-hidden shadow-lg">
                <div className="bg-accent text-white font-mono text-xs py-3.5 px-6 tracking-wider uppercase font-bold">After: Redesigned Wizard</div>
                <div className="p-6 flex flex-col gap-4">
                  <p className="font-mono text-xs text-accent tracking-widest uppercase mb-2 font-semibold">Guided wizard flow:</p>
                  
                  {/* UI Mockup: Wizard */}
                  <div className="bg-[#f5f5f7] border border-black/10 rounded-lg p-4 flex flex-col gap-3 shadow-inner text-[#1d1d1f]">
                    <div className="flex items-center justify-between pb-2 border-b border-black/5">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]"></span>
                      </div>
                      <span className="font-mono text-[10px] text-zinc-600 font-medium">IO Device Builder wizard</span>
                    </div>
                    
                    <div className="font-mono text-[9px] text-zinc-600 flex justify-between bg-black/5 px-2.5 py-1 rounded">
                      <span>Source</span><span>Mask Config</span><span className="text-[#c5221f] font-bold">Outputs (Step 4)</span><span>Dependencies</span>
                    </div>
                    
                    <div className="bg-white border border-[#e5e5ea] p-3 rounded shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-mono font-bold text-[#1d1d1f]">Arduino DHT-11 Ports</span>
                        <span className="text-[9px] text-[#16a34a] font-mono font-bold">✓ AUTO DETECTED</span>
                      </div>
                      <table className="w-full text-[9px] font-mono border-collapse">
                        <thead>
                          <tr className="border-b border-[#eee] text-left text-zinc-600">
                            <th className="pb-1">Name</th><th className="pb-1">Data Type</th><th className="pb-1">Size</th>
                          </tr>
                        </thead>
                        <tbody className="text-[#1d1d1f]">
                          <tr><td className="pt-1">Humidity</td><td className="pt-1 text-zinc-600">single</td><td className="pt-1">[1,1]</td></tr>
                          <tr className="text-[#c5221f] font-semibold"><td className="pt-1">Temp</td><td className="pt-1">single</td><td className="pt-1">[1,1]</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="p-3 bg-accent/10 border-l-2 border-accent text-sm text-zinc-300 flex gap-3 rounded-r">
                    <span className="text-accent font-semibold">✓</span>
                    Folder level import parses entire SDKs immediately.
                  </div>
                  <div className="p-3 bg-accent/10 border-l-2 border-accent text-sm text-zinc-300 flex gap-3 rounded-r">
                    <span className="text-accent font-semibold">✓</span>
                    No C++ manual wiring. Output is compiled into standard library blocks.
                  </div>
                  <div className="mt-2 p-3 bg-accent/10 border-l-2 border-accent font-mono text-xs text-zinc-300 leading-relaxed rounded-r">
                    Completion time: under 30 minutes. 0% syntax failures.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 04 RECOGNITION (Dark Section) */}
        <section className="py-20 border-b border-border-custom bg-[#0a0a0d] text-white" aria-label="Reflection">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="mb-12">
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4 font-semibold">04 · Reflection</p>
              <h2 className="font-display text-4xl md:text-5xl tracking-wide text-white mb-10 uppercase">Enterprise scope learnings</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-[#0d0d11] border border-border-custom hover:border-accent transition-all rounded-xl">
                <span className="font-mono text-xs text-accent uppercase block mb-3 font-semibold">User feedback</span>
                <h3 className="font-semibold text-white text-base mb-2">Tested against physical rigs</h3>
                <p className="text-xs font-light text-zinc-300 leading-relaxed">Tested the wizard directly on real Arduino and Raspberry Pi hardware setups. The automatic type checking prevented board compilation failures downstream.</p>
              </div>
              <div className="p-6 bg-[#0d0d11] border border-border-custom hover:border-accent transition-all rounded-xl">
                <span className="font-mono text-xs text-accent uppercase block mb-3 font-semibold">Design systems</span>
                <h3 className="font-semibold text-white text-base mb-2">Reusable wizard standard</h3>
                <p className="text-xs font-light text-zinc-300 leading-relaxed">The step-by-step metadata block setup we built was adopted as the layout model for two subsequent projects: hardware configurations and characteristics analyzers.</p>
              </div>
              <div className="p-6 bg-[#0d0d11] border border-border-custom hover:border-accent transition-all rounded-xl">
                <span className="font-mono text-xs text-accent uppercase block mb-3 font-semibold">Corporate alignment</span>
                <h3 className="font-semibold text-white text-base mb-2">Engineering advocacy</h3>
                <p className="text-xs font-light text-zinc-300 leading-relaxed">Advocated for the non-technical wizard path with engineering heads by demonstrating drop-off research data in existing community libraries.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 05 DEEP REFLECTION (Light Section) */}
        <section className="py-20 bg-[#f5f5f7] text-[#1d1d1f]" aria-label="reflection-list">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="border-t-4 border-[#ff3b30] pt-10">
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#c5221f] mb-4 font-semibold">05 · Deep Reflection</p>
              <h2 className="font-display text-4xl md:text-5xl tracking-wide text-[#1d1d1f] mb-10 uppercase">What I learned and what I'd do differently</h2>
              
              <div className="flex flex-col gap-6">
                {[
                  { num: "01", text: "<strong>Domain fluency is half the battle in specialist research.</strong> Interviewing engineers requires speaking their language; understanding registers, memory allocation, and port mapping makes your user inquiries rich and credible." },
                  { num: "02", text: "<strong>Wizards must allow non-linear escape routes.</strong> While our simplified wizard was highly beneficial for beginners, expert developers occasionally felt limited by rigidity. Merging linear workflows with accessible tree-views satisfies both segmentations." },
                  { num: "03", text: "<strong>Pitch the roadmap beyond V1.</strong> Automated library scraping and prelaunch templates are incredibly handy. Surfacing these early creates alignment for sequential development iterations." }
                ].map((item, idx) => (
                  <div key={idx} className="grid grid-cols-[32px_1fr] gap-4 py-6 border-b border-[#e5e5ea] last:border-none font-light">
                    <span className="font-mono text-xs text-[#c5221f] mt-0.5 font-bold">{item.num}</span>
                    <p className="text-xs text-zinc-700 leading-relaxed font-light" dangerouslySetInnerHTML={{ __html: item.text }}></p>
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
              Hardware Sensor Integration · Simulink Desktop · UX Case Study
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
                onClick={() => onPageChange('motor-parameter')}
                className="font-sans text-2xl md:text-3xl font-bold tracking-tight text-white hover:text-accent flex items-center gap-4 text-left md:text-right group transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg p-1 -mr-1"
                aria-label="Next Case Study: Precision Motor Parameter Estimation"
              >
                <span>Motor Parameter Estimator · MathWorks</span>
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

  if (caseId === 'motor-parameter') {
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
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4 font-semibold">MathWorks · Case Study 4 of 5</p>
              <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.08]">
                Precision motor<br />
                parameter estimation<br />
                for global EV OEMs
              </h1>
              <p className="text-base font-light text-zinc-300 leading-relaxed max-w-lg">
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
                    <p className="text-xs font-light text-zinc-600 leading-relaxed">{item.body}</p>
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
                    <p className="text-xs text-zinc-700 leading-relaxed font-light" dangerouslySetInnerHTML={{ __html: item.text }}></p>
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
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4 font-semibold">MathWorks · Case Study 5 of 5</p>
              <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.08]">
                AI-assisted<br />
                design-to-code:<br />
                70% faster
              </h1>
              <p className="text-base font-light text-zinc-300 leading-relaxed max-w-lg">
                Design handover had a hidden structural problem nobody had named.
                Figma outputs HTML/CSS box model code. MATLAB GUIs are built with
                a completely different grid syntax. Every developer was manually translating
                between two systems on every project, from scratch, invisibly.
                I identified the gap, mapped the equivalence, and turned it into
                an organisation-wide AI workflow.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-8 mt-12 border-t border-white/10 z-10 font-light">
              <span className="font-mono text-xs tracking-wide uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">MathWorks</span>
              <span className="font-mono text-xs tracking-wide uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">2025 – 2026</span>
              <span className="font-mono text-xs tracking-wide uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">Org-wide initiative</span>
              <span className="font-mono text-xs tracking-wide uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">Sole designer</span>
              <span className="font-mono text-xs tracking-wide uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">AI workflow design</span>
            </div>
          </div>

          {/* Right panel */}
          <div className="md:col-span-5 bg-[#0a0a0d] p-8 md:p-14 flex flex-col justify-end gap-8 relative border-t md:border-t-0 md:border-l border-border-custom">
            <div className="absolute bottom-[-20px] right-[-10px] font-display text-[15rem] leading-none opacity-5 text-white select-none pointer-events-none">05</div>
            
            <div className="w-full bg-[#07060f] rounded-sm aspect-[16/10] overflow-hidden flex items-center justify-center p-8 relative border border-border-custom">
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(ellipse at center, #FA0F00 0%, transparent 80%)'
              }}></div>
              
              <div className="text-center z-10 w-full px-4">
                {/* Visual design logic diagram representing Figma to MATLAB layout conversion */}
                <div className="bg-[#0d0c1a] border border-[#1a1830] rounded p-3 text-left shadow-lg scale-90 md:scale-100">
                  <div className="text-[8px] font-mono text-[#ff453a] mb-1 font-bold">Figma CSS Grid</div>
                  <div className="text-[8px] font-mono text-zinc-300 border-b border-white/10 pb-1 mb-1.5">
                    row-gap: 10px; columns: 200px 1fr;
                  </div>
                  <div className="text-[8px] font-mono text-[#22c55e] mb-1 font-bold">MATLAB uigridlayout (AI output)</div>
                  <div className="text-[8px] font-mono text-white">
                    g.RowHeight = {'{'}30, '1x', 'fit'{'}'}; g.RowSpacing = 10;
                  </div>
                </div>
                <p className="font-mono text-[9px] text-[#8e8e93] uppercase tracking-widest mt-2">AI Layout Equivalence Translator</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-8 z-10">
              <div className="flex flex-col border-b border-border-custom pb-4">
                <div className="font-display text-4xl text-accent leading-none mb-1"><AnimatedCounter value="70%" /></div>
                <div className="font-mono text-xs tracking-wide uppercase text-zinc-400">Reduction in UI coding time</div>
              </div>
              <div className="flex flex-col border-b border-border-custom pb-4">
                <div className="font-display text-4xl text-accent leading-none mb-1"><AnimatedCounter value="Org-wide" /></div>
                <div className="font-mono text-xs tracking-wide uppercase text-zinc-400">MathWorks implementation</div>
              </div>
              <div className="flex flex-col border-b border-border-custom pb-4">
                <div className="font-display text-4xl text-accent leading-none mb-1"><AnimatedCounter value="Zero" /></div>
                <div className="font-mono text-xs tracking-wide uppercase text-zinc-400">Prior standard workflow</div>
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
                <div className="font-display text-5xl text-[#c5221f] leading-none"><AnimatedCounter value="70%" /></div>
                <p className="font-mono text-xs tracking-wider uppercase text-zinc-600 font-medium">Reduction in compile latency</p>
              </div>
              <div className="p-8 bg-white border border-[#e5e5ea] rounded-xl shadow-sm flex flex-col justify-between gap-3">
                <div className="font-display text-5xl text-[#c5221f] leading-none"><AnimatedCounter value="Org-wide" /></div>
                <p className="font-mono text-xs tracking-wider uppercase text-zinc-600 font-medium">MathWorks deployment</p>
              </div>
              <div className="p-8 bg-white border border-[#e5e5ea] rounded-xl shadow-sm flex flex-col justify-between gap-3">
                <div className="font-display text-5xl text-[#c5221f] leading-none"><AnimatedCounter value="2" /></div>
                <p className="font-mono text-xs tracking-wider uppercase text-zinc-600 font-medium">Validation project pilots</p>
              </div>
              <div className="p-8 bg-white border border-[#e5e5ea] rounded-xl shadow-sm flex flex-col justify-between gap-3">
                <div className="font-display text-5xl text-[#c5221f] leading-none"><AnimatedCounter value="1" /></div>
                <p className="font-mono text-xs tracking-wider uppercase text-zinc-600 font-medium">Sole author initiative</p>
              </div>
            </div>
            <p className="text-lg md:text-xl font-light text-zinc-700 leading-relaxed max-w-3xl border-t border-[#e5e5ea] pt-8">
              This was not a product redesign; it was a systems-level intervention in how
              design and engineering work. The insight that made it possible:
              MATLAB's uigridlayout and HTML/CSS Grid are conceptually identical.
              Same rows, columns, gaps, sizing metrics. Different syntax.
              Once we mapped that equivalence, AI layout translation became trivial.
            </p>
          </div>
        </section>

        {/* PROBLEM (Dark Section) */}
        <section className="py-20 border-b border-border-custom bg-black text-white" aria-label="The problem">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="mb-12">
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4 font-semibold">01 · The Problem</p>
              <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">
                An invisible tax.<br />Every handover.<br /><span className="text-accent underline decoration-accent/30 underline-offset-8">Nobody had named it.</span>
              </h2>
              <p className="text-lg font-light text-zinc-300 leading-relaxed max-w-2xl">
                Design handover at MathWorks followed standards, including Miro maps and annotated Figma wireframes.
                Figma Dev Mode outputs CSS formatting, but MATLAB requires uigridlayout syntax. Developers
                were performing complex manual calculations inside layout files on every sprint, creating silent
                interface inconsistencies and latency.
              </p>
            </div>

            <div className="bg-[#141418] border-l-4 border-accent border border-white/5 p-6 rounded-r-xl my-8">
              <p className="font-mono text-xs tracking-widest text-accent uppercase mb-2 font-semibold">The core insight</p>
              <p className="text-base text-zinc-300 font-light leading-relaxed">
                MATLAB's uigridlayout and CSS Grid are conceptually identical.
                Same model, different syntax. If that equivalence could be formally mapped,
                AI could perform the translation automatically, every time, without error.
              </p>
            </div>

            <div className="flex flex-col mt-12 bg-[#0d0d11] p-6 border border-border-custom rounded-xl">
              {[
                { num: "1", title: "Two layout paradigms, zero documentation", text: "Figma is box-model based, MATLAB layouts are table-model grids. No documented translations existed, forcing developers to calculate conversions individually." },
                { num: "2", title: "Repeated cognitive translation", text: "MathWorks devs spent hours on layout arithmetic during sprints. This was never modeled as overhead in sprint structures." },
                { num: "3", title: "Design leaks and layout regression", text: "Incorrect padding and off-center margins in standard models required multiple fix revisions in QA environments, stalling team sprint schedules." },
                { num: "4", title: "Lack of AI automation mapping", text: "Prior to our mapping, engineering teams lacked contextual documentation to feed Copilot systems, missing out on generative workflow optimization." }
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

        {/* 02 APPROACH (Light Section) */}
        <section className="py-20 border-b border-[#e5e5ea] bg-[#f5f5f7] text-[#1d1d1f]" aria-label="Strategy">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="mb-12">
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#c5221f] mb-4 font-semibold">02 · The Approach</p>
              <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 mb-4">
                Map it. Document it. <em className="not-italic text-[#c5221f]">Let AI translate it.</em>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
              {[
                { phase: "Phase 01", title: "Develop Layout Equivalence", body: "Mapped CSS properties directly to uigridlayout counterparts. E.g. grid-template-rows: (auto 1fr 30px) maps to RowHeight: ({'fit', '1x', 30})." },
                { phase: "Phase 02", title: "Create Generative Prompting Docs", body: "Wrote exhaustive layout conversion sheets in Confluence. Created structured prompting contexts used across MS Copilot accounts." },
                { phase: "Phase 03", title: "Pilot Sprints", body: "Selected two heavy calculation layout modules as validation pilots. Verified that generated uigridlayouts compiled correctly without manual corrections." },
                { phase: "Phase 04", title: "Org Sprints & Handover Standard", body: "Updated the corporate design handover manual to include standard grid annotations. Rolled out training classes across regional teams." }
              ].map((item, idx) => (
                <div key={idx} className="p-6 bg-white border border-[#e5e5ea] rounded-xl shadow-sm flex flex-col justify-between h-full relative">
                  <span className="absolute top-0 left-0 w-8 h-1 bg-[#ff3b30] rounded-tl-xl"></span>
                  <div className="mb-6 font-light">
                    <div className="font-mono text-xs text-[#c5221f] tracking-widest uppercase mb-4 font-semibold">{item.phase}</div>
                    <h3 className="font-semibold text-[#1d1d1f] text-base mb-2">{item.title}</h3>
                    <p className="text-xs font-light text-zinc-600 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 03 BEFORE / AFTER (Dark Section) */}
        <section className="py-20 border-b border-border-custom bg-black text-white" aria-label="Design output">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="mb-12">
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4 font-semibold">03 · Handover Bridge</p>
              <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">
                Bridging the layout Gap <span className="text-accent">via system alignment</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
              {/* BEFORE */}
              <div className="border border-border-custom bg-[#0d0d11] flex flex-col rounded-xl overflow-hidden">
                <div className="bg-[#141418] text-[#8e8e93] font-mono text-xs py-3.5 px-6 tracking-wider uppercase font-semibold border-b border-[#1c1c22]">Before: Manual Conversion Overhead</div>
                <div className="p-6 flex flex-col gap-4">
                  <div className="p-4 bg-[#141418] border border-white/5 rounded-lg text-sm text-zinc-300 flex gap-3">
                    <span className="font-mono text-xs text-[#8e8e93] mt-0.5 font-semibold">①</span>
                    Dev receives Figma file, reads standard raw CSS grid parameters.
                  </div>
                  <div className="p-4 bg-[#141418] border border-white/5 rounded-lg text-sm text-zinc-300 flex gap-3">
                    <span className="font-mono text-xs text-[#8e8e93] mt-0.5 font-semibold">②</span>
                    Performs layout arithmetic measurements manually (calculating margin spacers, widths).
                  </div>
                  <div className="p-4 bg-[#141418] border border-white/5 rounded-lg text-sm text-zinc-300 flex gap-3">
                    <span className="font-mono text-xs text-[#8e8e93] mt-0.5 font-semibold">③</span>
                    Fixes layout regression during subsequent QA sessions.
                  </div>
                  <div className="mt-2 p-3 bg-red-950/40 border-l-2 border-[#ff3b30] font-mono text-xs text-[#ff9999] leading-relaxed rounded-r">
                    Overhead: 4-6 hours wasted per structural page. Inconsistent look.
                  </div>
                </div>
              </div>

              {/* AFTER */}
              <div className="border border-accent/40 bg-[#0d0d11] flex flex-col rounded-xl overflow-hidden shadow-lg">
                <div className="bg-accent text-white font-mono text-xs py-3.5 px-6 tracking-wider uppercase font-bold">After: AI Translation Core</div>
                <div className="p-6 flex flex-col gap-4">
                  
                  {/* UI Mockup: HTML to MATLAB uigridlayout conversion */}
                  <div className="bg-[#f5f5f7] border border-black/10 rounded-lg p-4 flex flex-col gap-3 shadow-inner text-[#1d1d1f]">
                    <div className="flex items-center justify-between pb-2 border-b border-black/5">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]"></span>
                      </div>
                      <span className="font-mono text-[10px] text-zinc-600 font-medium">Copilot Layout Translator Context</span>
                    </div>
                    
                    <div className="bg-white p-3 rounded border border-[#e5e5ea] shadow-sm">
                      <p className="font-mono text-[8px] text-[#6e6e73] mb-1 uppercase font-semibold">Figma Grid Input:</p>
                      <code className="text-[10px] font-mono text-[#c5221f] font-semibold">grid-template-rows: 30px 1fr auto;</code>
                    </div>
                    
                    <div className="bg-white p-3 rounded border-2 border-[#16a34a]/40 shadow-sm">
                      <p className="font-mono text-[8px] text-[#16a34a] mb-1 uppercase font-semibold">MATLAB AI Output:</p>
                      <code className="text-[10px] font-mono text-[#16a34a] font-semibold">g.RowHeight = {'{'}30, '1x', 'fit'{'}'};</code>
                    </div>
                  </div>

                  <div className="p-3 bg-accent/10 border-l-2 border-accent text-sm text-zinc-300 flex gap-3 rounded-r">
                    <span className="text-accent font-semibold">✓</span>
                    Figma annotations feed standard prompting layouts instantly.
                  </div>
                  <div className="p-3 bg-accent/10 border-l-2 border-accent text-sm text-zinc-300 flex gap-3 rounded-r">
                    <span className="text-accent font-semibold">✓</span>
                    Copilot generates uigridlayout code in seconds rather than hours.
                  </div>
                  <div className="mt-2 p-3 bg-accent/10 border-l-2 border-accent font-mono text-xs text-zinc-300 leading-relaxed rounded-r">
                    Time savings: 70% reduction in UI coordinate coding.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 04 DEEPER REFLECTIONS (Light Section) */}
        <section className="py-20 bg-[#f5f5f7] text-[#1d1d1f]" aria-label="Reflection">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="border-t-4 border-[#ff3b30] pt-10">
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#c5221f] mb-4 font-semibold">04 · Deeper Reflections</p>
              <h2 className="font-display text-4xl md:text-5xl tracking-wide text-[#1d1d1f] mb-10 uppercase">What this taught me about AI in design</h2>
              
              <div className="flex flex-col gap-6">
                {[
                  { num: "01", text: "<strong>Human systems mapping precedes AI capability.</strong> AI performs layout translation flawlessly only after a designer has defined the equivalent structural constraints manually. Prompt engineering is secondary to conceptual mapping." },
                  { num: "02", text: "<strong>Systems UX design is often invisible.</strong> Nobody sees the equivalence formulas in the shipped GUI app. However, developers feel the speed-up and designers witness pixel perfection. System designs scale beyond screens." },
                  { num: "03", text: "<strong>A wider test measurement would have been beneficial.</strong> Our 70% speed-up is derived from our validation pilot tracks. Establishing long-term corporate tracking across all design programs will yield a higher sample statistic." }
                ].map((item, idx) => (
                  <div key={idx} className="grid grid-cols-[32px_1fr] gap-4 py-6 border-b border-[#e5e5ea] last:border-none">
                    <span className="font-mono text-xs text-[#c5221f] mt-0.5 font-bold">{item.num}</span>
                    <p className="text-xs text-zinc-700 leading-relaxed font-light" dangerouslySetInnerHTML={{ __html: item.text }}></p>
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
              AI Design-to-Code Pipeline · MATLAB App Designer &amp; Figma · UX Case Study
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
                onClick={() => onPageChange('opc-ua-explorer')}
                className="font-sans text-2xl md:text-3xl font-bold tracking-tight text-white hover:text-accent flex items-center gap-4 text-left md:text-right group transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg p-1 -mr-1"
                aria-label="Next Case Study: OPC UA Explorer"
              >
                <span>OPC UA Explorer · MathWorks</span>
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

  if (caseId === 'opc-ua-explorer') {
    return <OpcUaCaseStudy onPageChange={onPageChange} />;
  }

  return null;
}
