import { useEffect } from 'react';
import { PageId } from '../types';
import { AnimatedCounter } from './AnimatedCounter';
import ZoomableImage from './ZoomableImage';
import IoDeviceBuilderSandbox from './IoDeviceBuilderSandbox';
import { preloadImages, IO_DEVICE_IMAGES } from '../utils/imagePreloader';
import { getAssetUrl } from '../utils/assets';
import { 
  Cpu, 
  Layers, 
  Workflow, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  AlertTriangle, 
  ArrowRight, 
  ArrowLeft,
  ChevronRight,
  Sliders,
  Settings2,
  Users,
  Terminal,
  ExternalLink,
  Code2,
  Sparkles,
  GitBranch,
  Boxes,
  HelpCircle
} from 'lucide-react';

interface IoDeviceBuilderCaseStudyProps {
  onPageChange: (page: PageId) => void;
}

export default function IoDeviceBuilderCaseStudy({ onPageChange }: IoDeviceBuilderCaseStudyProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
    preloadImages(IO_DEVICE_IMAGES, 'high');
  }, []);

  return (
    <main 
      id="main-content" 
      tabIndex={-1} 
      className="pt-24 min-h-screen bg-bg focus:outline-none"
      aria-label="Case Study: Revolutionising Hardware Sensor Integration: IO Device Builder"
    >
      {/* ── HERO SECTION ── */}
      <header className="grid grid-cols-1 lg:grid-cols-12 min-h-[74vh] border-b border-border-custom bg-black" aria-label="Project Overview">
        {/* Left panel */}
        <div className="lg:col-span-7 bg-black text-[#f5f5f7] p-8 md:p-14 lg:p-16 flex flex-col justify-between relative overflow-hidden">
          {/* Accent red top strip */}
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

            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs tracking-[0.18em] uppercase text-accent font-semibold">
                MathWorks · Case Study 3 of 5
              </span>
              <span className="text-zinc-600 font-mono text-xs">/</span>
              <span className="text-zinc-400 font-mono text-xs tracking-wider uppercase">
                Zero-to-One Product Launch
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl uppercase tracking-[0.02em] leading-[0.9] text-white mb-6">
              Revolutionising Hardware<br />
              Sensor Integration<br />
              <span className="text-accent">IO Device Builder</span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 leading-[1.7] font-light max-w-xl">
              Engineers developing autonomous vehicles, robotics, and aerospace systems spent 2–3 days per sensor writing brittle C/C++ wrapper code, hunting undocumented headers, and debugging compiler errors. I led the zero-to-one design and research for a cross-functional team of 7 disciplines, transforming a painful command-line chore into an automated, point-and-click Simulink application that creates functional sensor blocks in minutes.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 pt-6 mt-10 border-t border-zinc-800 z-10" role="list" aria-label="Project metadata">
            <span role="listitem" className="font-mono text-xs tracking-wider uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">MathWorks</span>
            <span role="listitem" className="font-mono text-xs tracking-wider uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">6-Month Launch</span>
            <span role="listitem" className="font-mono text-xs tracking-wider uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">Lead Design &amp; Research</span>
            <span role="listitem" className="font-mono text-xs tracking-wider uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">7 Disciplines</span>
            <span role="listitem" className="font-mono text-xs tracking-wider uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">Simulink Desktop</span>
          </div>
        </div>

        {/* Right panel */}
        <div className="lg:col-span-5 bg-[#0a0a0d] p-8 md:p-12 lg:p-14 flex flex-col justify-between gap-8 relative border-t lg:border-t-0 lg:border-l border-border-custom">
          {/* Main Product Screenshot with Source Citation */}
          <div>
            <div className="w-full bg-[#08080c] rounded-lg aspect-[16/10] overflow-hidden relative border border-border-custom shadow-2xl">
              <ZoomableImage 
                src="/assets/iodevice/hero_io_builder_window.webp" 
                alt="MathWorks IO Device Builder interface running natively inside Simulink" 
                className="w-full h-full object-cover object-center"
                priority={true}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mt-2.5 px-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span>Simulink IO Device Builder</span>
              </span>
              <a 
                href="https://in.mathworks.com/help/simulink/supportpkg/arduino_ug/io-device-builder.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-accent flex items-center gap-1 transition-colors underline decoration-zinc-700"
              >
                <span>Source: MathWorks Docs</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Key project metrics */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 z-10" role="region" aria-label="Key project metrics">
            <div className="flex flex-col border-b border-zinc-800 pb-4" aria-label="Metric: Days to minutes integration reduction">
              <div className="font-display text-4xl text-accent font-bold leading-none mb-1.5" aria-hidden="true">
                <AnimatedCounter value="Days→Mins" />
              </div>
              <div className="font-mono text-xs tracking-wider uppercase text-zinc-400">Sensor Integration Time</div>
              <span className="sr-only">Sensor integration time reduced from 2-3 days to under 30 minutes</span>
            </div>

            <div className="flex flex-col border-b border-zinc-800 pb-4" aria-label="Metric: Zero C and C++ required">
              <div className="font-display text-4xl text-accent font-bold leading-none mb-1.5" aria-hidden="true">
                <AnimatedCounter value="Zero" />
              </div>
              <div className="font-mono text-xs tracking-wider uppercase text-zinc-400">C/C++ Knowledge Required</div>
              <span className="sr-only">Zero C and C++ programming skills required</span>
            </div>

            <div className="flex flex-col border-b border-zinc-800 pb-4" aria-label="Metric: Over 100 sensors supported">
              <div className="font-display text-4xl text-accent font-bold leading-none mb-1.5" aria-hidden="true">
                <AnimatedCounter value="100+" />
              </div>
              <div className="font-mono text-xs tracking-wider uppercase text-zinc-400">Sensors &amp; Packages</div>
              <span className="sr-only">Over 100 sensors and hardware packages supported</span>
            </div>

            <div className="flex flex-col border-b border-zinc-800 pb-4" aria-label="Metric: 5 million plus engineers with access">
              <div className="font-display text-4xl text-accent font-bold leading-none mb-1.5" aria-hidden="true">
                <AnimatedCounter value="5M+" />
              </div>
              <div className="font-mono text-xs tracking-wider uppercase text-zinc-400">Engineers with Access</div>
              <span className="sr-only">5 million plus combined user base for MATLAB and Simulink</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── SECTION 01: CONTEXT & SCALE (Light Section) ── */}
      <section className="py-20 border-b border-[#e5e5ea] bg-[#f5f5f7] text-[#1d1d1f]" aria-label="Ecosystem Context and Team">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff3b30]" aria-hidden="true" />
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#c5221f] font-semibold">01 · Ecosystem Context &amp; Team</p>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.02em] text-[#1d1d1f] mb-8">
            The World's Standard for <span className="text-[#c5221f]">Dynamic Simulation</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <div className="p-8 bg-white border border-[#e5e5ea] rounded-xl shadow-sm flex flex-col justify-between gap-3 hover:border-[#ff3b30]/30 transition-colors">
              <div className="font-display text-5xl text-[#c5221f] font-bold leading-none">
                <AnimatedCounter value="5M+" />
              </div>
              <p className="font-mono text-xs tracking-wider uppercase text-zinc-600 font-semibold">
                Combined MATLAB &amp; Simulink user base worldwide
              </p>
            </div>

            <div className="p-8 bg-white border border-[#e5e5ea] rounded-xl shadow-sm flex flex-col justify-between gap-3 hover:border-[#ff3b30]/30 transition-colors">
              <div className="font-display text-5xl text-[#c5221f] font-bold leading-none">
                <AnimatedCounter value="6,500+" />
              </div>
              <p className="font-mono text-xs tracking-wider uppercase text-zinc-600 font-semibold">
                Companies globally (US, Germany, India)
              </p>
            </div>

            <div className="p-8 bg-white border border-[#e5e5ea] rounded-xl shadow-sm flex flex-col justify-between gap-3 hover:border-[#ff3b30]/30 transition-colors">
              <div className="font-display text-5xl text-[#c5221f] font-bold leading-none">
                <AnimatedCounter value="$1.5B" />
              </div>
              <p className="font-mono text-xs tracking-wider uppercase text-zinc-600 font-semibold">
                Combined annual revenue in 2024
              </p>
            </div>

            <div className="p-8 bg-white border border-[#e5e5ea] rounded-xl shadow-sm flex flex-col justify-between gap-3 hover:border-[#ff3b30]/30 transition-colors">
              <div className="font-display text-5xl text-[#c5221f] font-bold leading-none">
                <AnimatedCounter value="50,000+" />
              </div>
              <p className="font-mono text-xs tracking-wider uppercase text-zinc-600 font-semibold">
                Pre-built simulation blocks in Simulink
              </p>
            </div>
          </div>

          {/* Team Structure & My Role */}
          <div className="bg-white border border-[#e5e5ea] rounded-xl p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-5">
                <span className="font-mono text-xs uppercase tracking-wider text-[#c5221f] font-semibold block mb-2">
                  My Role &amp; Timeline
                </span>
                <h3 className="font-display text-2xl uppercase tracking-wide text-zinc-900 mb-4">
                  Lead Design &amp; Research Guide
                </h3>
                <p className="text-zinc-600 text-sm leading-relaxed mb-4 font-normal">
                  This was my first end-to-end product initiative at MathWorks. Spanning a 6-month intensive design-to-release lifecycle, I guided user research, established user personas, resolved structural engineering debates, and delivered the complete interaction architecture for the IO Device Builder.
                </p>
                <div className="p-4 bg-zinc-50 border border-zinc-200 rounded font-mono text-xs text-zinc-700">
                  <strong>Special Focus:</strong> RADAR &amp; high-frequency sensor integration in Simulink—a domain that had never previously been automated with a visual workflow.
                </div>
              </div>

              <div className="md:col-span-7">
                <span className="font-mono text-xs uppercase tracking-wider text-zinc-500 font-semibold block mb-3">
                  Cross-Functional Team Collaboration (7 Disciplines)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                  {[
                    { num: '01', name: 'Application Engineers', role: 'Hardware & embedded validation' },
                    { num: '02', name: 'Software Developers', role: 'C++, Java & Simulink Toolstrip devs' },
                    { num: '03', name: 'Product Management', role: 'UX, Technical PM & product strategy' },
                    { num: '04', name: 'UX Department', role: 'Design Ops, Contextual Inquiry, UI' },
                    { num: '05', name: 'Documentation', role: 'Developer manuals & technical tutorials' },
                    { num: '06', name: 'Marketing', role: 'Launch campaigns & community outreach' },
                    { num: '07', name: 'Legal & Compliance', role: 'Third-party open-source driver licensing' },
                  ].map((item) => (
                    <div key={item.num} className="p-3 bg-zinc-50 border border-zinc-200/80 rounded-lg flex items-start gap-2.5">
                      <span className="text-[#c5221f] font-bold text-xs">{item.num}</span>
                      <div>
                        <strong className="text-zinc-900 block font-semibold">{item.name}</strong>
                        <span className="text-zinc-500 text-[11px] font-normal">{item.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 02: THE CHALLENGE (Dark Section) ── */}
      <section className="py-20 border-b border-border-custom bg-black text-white" aria-label="The Challenge">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="mb-12">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4 font-semibold">02 · The Challenge</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.02em] text-white mb-6">
              Efficient Sensor Integration is <span className="text-accent">Paramount</span>
            </h2>
            <p className="text-lg font-light text-zinc-300 leading-relaxed max-w-2xl">
              Integrating physical sensors into dynamic Simulink models is the foundation for modern autonomous vehicles, robotics, and medical devices. Yet the legacy onboarding process was fraught with friction, assuming deep C/C++ compiler knowledge.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
            {/* The 4 Pain Points */}
            <div className="lg:col-span-7 space-y-4">
              {[
                {
                  code: '</>',
                  title: 'Custom Code Bottlenecks',
                  desc: 'Writing C/C++ S-functions and MATLAB wrapper objects from scratch caused immense friction, delaying delivery timelines and ballooning R&D engineering budgets.'
                },
                {
                  code: '⏳',
                  title: 'Time-Consuming Trial & Error',
                  desc: 'Engineers typically spent 2–3 full working days per sensor integration, repeating multiple manual iterations when compilation syntax failed.'
                },
                {
                  code: '🔍',
                  title: 'Documentation & Library Hunting',
                  desc: 'Engineers spent hours searching across disparate GitHub repositories, manufacturer PDF datasheets, and forum threads just to locate pinouts and registers.'
                },
                {
                  code: '🔌',
                  title: '100+ Sensor Vendor Matrix',
                  desc: 'Over 100 sensors from diverse manufacturers (Adafruit, SparkFun, Bosch, ST) lacked standard Simulink block support, forcing engineers to start from zero.'
                }
              ].map((pt, idx) => (
                <div key={idx} className="p-5 bg-[#0e0e13] border border-zinc-800 rounded-xl flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono text-sm text-accent font-bold shrink-0">
                    {pt.code}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-base mb-1">{pt.title}</h3>
                    <p className="text-sm text-zinc-400 font-light leading-relaxed">{pt.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Illustration Crop */}
            <div className="lg:col-span-5 border border-zinc-800 rounded-xl overflow-hidden bg-[#0d0d12]">
              <ZoomableImage 
                src="/assets/iodevice/challenge_wire_tangle.webp" 
                alt="Frustrated engineers surrounded by tangled wires, datasheets, and code screens" 
                className="w-full h-auto object-cover"
              />
              <div className="p-3.5 bg-[#121218] border-t border-zinc-800 text-[11px] font-mono text-zinc-400">
                The Reality: Tangled vendor drivers, missing block masks, and hours of C/C++ troubleshooting
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE DIGITAL TWIN SANDBOX ── */}
      <IoDeviceBuilderSandbox />

      {/* ── SECTION 03: DISCOVERY & PERSONAS (Light Section) ── */}
      <section className="py-20 border-b border-[#e5e5ea] bg-[#f5f5f7] text-[#1d1d1f]" aria-label="User Research and Personas">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="mb-12">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#c5221f] mb-4 font-semibold">03 · Discovery &amp; Personas</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.02em] text-[#1d1d1f] mb-6">
              Three Users. <span className="text-[#c5221f]">Zero Compromise.</span>
            </h2>
            <p className="text-lg font-light text-zinc-700 leading-relaxed max-w-2xl">
              Through contextual interviews across commercial R&D, robotics, and academic labs, we mapped three primary personas with wildly divergent programming backgrounds. Our core UX mandate was to make sensor onboarding intuitive for non-programmers without capping expressiveness for firmware developers.
            </p>
          </div>

          {/* 3 Personas Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            
            {/* Persona 1: Aneesh */}
            <div className="bg-white border border-[#e5e5ea] rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className="aspect-[4/3] overflow-hidden bg-zinc-100 relative">
                  <ZoomableImage 
                    src="/assets/iodevice/persona_aneesh.webp" 
                    alt="Research Project Manager Aneesh working with environmental sensors and laptop" 
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-3 right-3 font-mono text-[10px] uppercase tracking-wider bg-black/75 backdrop-blur-sm text-white px-2 py-0.5 rounded">
                    Academic / ML
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#c5221f] font-semibold">Research Manager</span>
                    <span className="text-xs font-mono text-zinc-500">Aneesh</span>
                  </div>
                  <h3 className="font-semibold text-zinc-900 text-lg mb-2">Academic Environmental Researcher</h3>
                  <p className="text-sm text-zinc-600 leading-relaxed font-normal mb-4">
                    Monitoring environmental climate factors. Needs to interface physical sensors into Python-based machine learning workflows, but lacks technical C/C++ embedded programming expertise.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-zinc-50 border-t border-zinc-200 font-mono text-xs text-zinc-700">
                <strong>Core Need:</strong> Zero-code sensor block creation with auto-detected outputs so he can focus on ML modeling.
              </div>
            </div>

            {/* Persona 2: Sam */}
            <div className="bg-white border border-[#e5e5ea] rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className="aspect-[4/3] overflow-hidden bg-zinc-100 relative">
                  <ZoomableImage 
                    src="/assets/iodevice/persona_sam.webp" 
                    alt="Control Engineer Sam with autonomous toy vehicle prototype" 
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-3 right-3 font-mono text-[10px] uppercase tracking-wider bg-black/75 backdrop-blur-sm text-white px-2 py-0.5 rounded">
                    Robotics R&amp;D
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#c5221f] font-semibold">Control Engineer</span>
                    <span className="text-xs font-mono text-zinc-500">Sam</span>
                  </div>
                  <h3 className="font-semibold text-zinc-900 text-lg mb-2">Autonomous Vehicle Specialist</h3>
                  <p className="text-sm text-zinc-600 leading-relaxed font-normal mb-4">
                    Seasoned engineer at a robotics enterprise developing autonomous vehicles. Constantly incorporates advanced IMU, ultrasonic, and lidar sensors, but faces roadblocks when official shipped blocks are missing.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-zinc-50 border-t border-zinc-200 font-mono text-xs text-zinc-700">
                <strong>Core Need:</strong> Fast hardware validation on testbench rigs without spending entire days writing S-functions.
              </div>
            </div>

            {/* Persona 3: Meghna */}
            <div className="bg-white border border-[#e5e5ea] rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className="aspect-[4/3] overflow-hidden bg-zinc-100 relative">
                  <ZoomableImage 
                    src="/assets/iodevice/persona_meghna.webp" 
                    alt="Developer Meghna writing MATLAB, C, and C++ code" 
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-3 right-3 font-mono text-[10px] uppercase tracking-wider bg-black/75 backdrop-blur-sm text-white px-2 py-0.5 rounded">
                    Firmware / Dev
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#c5221f] font-semibold">Systems Developer</span>
                    <span className="text-xs font-mono text-zinc-500">Meghna</span>
                  </div>
                  <h3 className="font-semibold text-zinc-900 text-lg mb-2">Hardware Support Package Engineer</h3>
                  <p className="text-sm text-zinc-600 leading-relaxed font-normal mb-4">
                    Highly skilled developer proficient in MATLAB, C, and C++. Regularly builds custom block libraries for enterprise teams, but struggles with non-standardized vendor datasheets and repetitive port mapping.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-zinc-50 border-t border-zinc-200 font-mono text-xs text-zinc-700">
                <strong>Core Need:</strong> Automated parsing of multiple `.cpp` and `.h` files at once with custom parameter masking.
              </div>
            </div>

          </div>

          {/* User's Past Workflow Breakdown */}
          <div className="bg-white border border-[#e5e5ea] rounded-xl p-6 sm:p-8 shadow-sm">
            <span className="font-mono text-xs uppercase tracking-wider text-[#c5221f] font-semibold block mb-2">
              Legacy Process Analysis
            </span>
            <h3 className="font-display text-2xl uppercase tracking-wide text-zinc-900 mb-6">
              The 6 Inefficiencies in the User's Past Workflow
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-zinc-700">
              {[
                { title: 'Multiple Failed Attempts', desc: 'Required trial-and-error iterations with compiler flags, causing high developer fatigue.' },
                { title: 'Documentation Hunting', desc: 'Hours wasted parsing unofficial forum threads and obsolete vendor PDFs.' },
                { title: '2–3 Days Lost per Sensor', desc: 'Engineering time completely consumed before any actual simulation or modeling could start.' },
                { title: 'Locating & Verifying Libraries', desc: 'Difficulty finding compatible C/C++ driver libraries matching specific target board microcontrollers.' },
                { title: 'Manual Wrapper Writing', desc: 'Writing hand-coded S-functions and MEX wrapper files required for C/C++ compatibility.' },
                { title: 'Simulink Library Search', desc: 'Manual searches through 50,000+ blocks in Simulink Library Browser with zero custom block creator.' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 bg-zinc-50 border border-zinc-200/80 rounded-lg">
                  <div className="font-mono text-xs text-[#c5221f] font-bold mb-1">Friction 0{idx + 1}</div>
                  <strong className="text-zinc-900 block mb-1">{item.title}</strong>
                  <p className="text-zinc-600 text-xs font-normal leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 04: STRATEGIC PUSHBACK & ALIGNMENT (Dark Section) ── */}
      <section className="py-20 border-b border-border-custom bg-black text-white" aria-label="Decision Point and Pushback">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="mb-12">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4 font-semibold">04 · Decision Point</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.02em] text-white mb-6">
              The Pushback: <span className="text-accent">Dilemma &amp; Architecture Debate</span>
            </h2>
            <p className="text-lg font-light text-zinc-300 leading-relaxed max-w-2xl">
              Building zero-to-one inside MathWorks requires navigating substantial organizational momentum. We received major pushback regarding the infrastructure to use, sparking intensive cross-functional debates between dev, product, and UX.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 bg-[#0e0e13] border border-zinc-800 rounded-xl">
                <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider block mb-2 font-semibold">The Engineering Perspective</span>
                <h3 className="font-semibold text-white text-lg mb-2">The Legacy Wizard Infrastructure</h3>
                <p className="text-sm text-zinc-400 font-light leading-relaxed">
                  The software development team proposed leveraging an existing wizard infrastructure. Their argument was consistency with older MathWorks setup dialogs and faster implementation using legacy C++ frameworks.
                </p>
              </div>

              <div className="p-6 bg-[#0e0e13] border border-accent/40 rounded-xl shadow-lg shadow-accent/5">
                <span className="font-mono text-xs text-accent uppercase tracking-wider block mb-2 font-bold">The UX &amp; Product Counterproposal</span>
                <h3 className="font-semibold text-white text-lg mb-2">An Integrated, Extensible Builder Studio</h3>
                <p className="text-sm text-zinc-300 font-light leading-relaxed">
                  The UX and Product team pushed back. Rigid linear wizards trap power users, prevent non-linear validation, and cannot scale to multi-protocol sensors. We proposed pivoting to an integrated builder directly inside the Simulink Hardware Toolstrip with automatic AST port inference.
                </p>
              </div>

              <div className="p-4 bg-emerald-950/30 border border-emerald-500/40 rounded-lg text-xs font-mono text-emerald-300">
                <strong>Resolution:</strong> We backed our proposal with usability testing data from 15 customer sessions, demonstrating that a modern builder reduced task drop-off by 84% compared to rigid step-by-step wizards.
              </div>
            </div>

            <div className="lg:col-span-5 border border-zinc-800 rounded-xl overflow-hidden bg-[#0d0d12]">
              <ZoomableImage 
                src="/assets/iodevice/team_collaboration.webp" 
                alt="Cross-functional engineering and design team discussing technical trade-offs" 
                className="w-full h-auto object-cover"
              />
              <div className="p-3.5 bg-[#121218] border-t border-zinc-800 text-[11px] font-mono text-zinc-400">
                Cross-functional alignment: Resolving architectural dilemmas through customer evidence
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 05: THE SOLUTION & WALKTHROUGH (Light Section) ── */}
      <section className="py-20 border-b border-[#e5e5ea] bg-[#f5f5f7] text-[#1d1d1f]" aria-label="Product Capabilities">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="mb-12">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#c5221f] mb-4 font-semibold">05 · Product Architecture</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.02em] text-[#1d1d1f] mb-6">
              Powerful Capabilities to <span className="text-[#c5221f]">Transform Sensor Integration</span>
            </h2>
            <p className="text-lg font-light text-zinc-700 leading-relaxed max-w-2xl">
              We decoupled sensor integration from low-level compiler tools, structuring an automated 4-stage pipeline that preserves existing Simulink mental models while eliminating manual boilerplate.
            </p>
          </div>

          <div className="space-y-12">
            
            {/* Feature 1: Seamless Toolstrip Integration */}
            <div className="bg-white border border-[#e5e5ea] rounded-xl p-6 sm:p-8 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#c5221f] font-semibold block mb-2">
                    01 · Seamless Toolstrip Integration
                  </span>
                  <h3 className="font-display text-2xl uppercase tracking-wide text-zinc-900 mb-4">
                    Preserving Familiar Mental Models
                  </h3>
                  <p className="text-zinc-600 text-sm leading-relaxed mb-4 font-normal">
                    Rather than creating a detached secondary utility, the IO Device Builder lives directly in the native Simulink Toolstrip under <strong>Hardware &gt; Design</strong>. This preserves the engineer's workspace context, ensuring near-zero learning curve and immediate discoverability.
                  </p>
                  <ul className="space-y-2 text-xs font-mono text-zinc-700 mb-6">
                    <li className="flex items-center gap-2">
                      <span className="text-[#c5221f] font-bold">✓</span>
                      <span>Minimal learning curve with standard MathWorks design system</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#c5221f] font-bold">✓</span>
                      <span>Easy onboarding for non-programmers and students</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#c5221f] font-bold">✓</span>
                      <span>One-click launch directly from existing model canvases</span>
                    </li>
                  </ul>
                </div>

                <div className="lg:col-span-6 border border-[#e5e5ea] rounded-lg overflow-hidden bg-white shadow-sm">
                  <ZoomableImage 
                    src="/assets/iodevice/toolstrip_integration.webp" 
                    alt="Simulink Toolstrip showing Hardware tab and IO Device Builder icon in Design group" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="p-2.5 bg-zinc-50 border-t border-[#e5e5ea] flex justify-between items-center text-[10px] font-mono text-zinc-500">
                    <span>Simulink Hardware Toolstrip</span>
                    <a 
                      href="https://in.mathworks.com/help/simulink/supportpkg/arduino_ug/io-device-builder.html" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-[#c5221f] flex items-center gap-1"
                    >
                      <span>Source: mathworks.com</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2: Third-Party Driver Library Compatibility */}
            <div className="bg-white border border-[#e5e5ea] rounded-xl p-6 sm:p-8 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 lg:order-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#c5221f] font-semibold block mb-2">
                    02 · Third-Party Library Compatibility
                  </span>
                  <h3 className="font-display text-2xl uppercase tracking-wide text-zinc-900 mb-4">
                    Folder-Level Multi-File Ingestion
                  </h3>
                  <p className="text-zinc-600 text-sm leading-relaxed mb-4 font-normal">
                    Users simply point to their downloaded third-party driver folders (e.g., Adafruit, SparkFun, or custom OEM drivers). The builder scans the folder, parses all `.cpp` and `.h` files, and resolves internal dependencies automatically without manual Makefile editing.
                  </p>
                  <ul className="space-y-2 text-xs font-mono text-zinc-700 mb-6">
                    <li className="flex items-center gap-2">
                      <span className="text-[#c5221f] font-bold">✓</span>
                      <span>Leverage multiple C/C++ code files and header dependencies at once</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#c5221f] font-bold">✓</span>
                      <span>Smart file selection with search and checkbox filtering</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#c5221f] font-bold">✓</span>
                      <span>Eliminates tedious manual C++ header linking and GCC flags</span>
                    </li>
                  </ul>
                </div>

                <div className="lg:col-span-6 lg:order-1 space-y-3">
                  <div className="border border-[#e5e5ea] rounded-lg overflow-hidden bg-white shadow-sm">
                    <ZoomableImage 
                      src="/assets/iodevice/source_folder_selection.webp" 
                      alt="Selecting working directory and third-party driver source folders" 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="border border-[#e5e5ea] rounded-lg overflow-hidden bg-white shadow-sm">
                    <ZoomableImage 
                      src="/assets/iodevice/cpp_source_selection.webp" 
                      alt="Multi-file C/C++ checkbox selection dialog (DHT.cpp, Adafruit_Sensor.cpp)" 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="p-2 bg-zinc-50 border border-[#e5e5ea] rounded flex justify-between items-center text-[10px] font-mono text-zinc-500">
                    <span>Source Files &amp; C/C++ Multi-File Ingestion Dialogs</span>
                    <a 
                      href="https://in.mathworks.com/help/simulink/supportpkg/arduino_ug/io-device-builder.html" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-[#c5221f] flex items-center gap-1"
                    >
                      <span>Source: mathworks.com</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3: Hassle-Free Block Mask Customization */}
            <div className="bg-white border border-[#e5e5ea] rounded-xl p-6 sm:p-8 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#c5221f] font-semibold block mb-2">
                    03 · Hassle-Free Block Mask Customization
                  </span>
                  <h3 className="font-display text-2xl uppercase tracking-wide text-zinc-900 mb-4">
                    Granular Parameter Definitions
                  </h3>
                  <p className="text-zinc-600 text-sm leading-relaxed mb-4 font-normal">
                    Creating Simulink mask dialogs historically required complex MATLAB command scripts. We designed a clear tabular UI where users specify block names, descriptions, data types, initial values, and whether parameters are tunable during simulation runs.
                  </p>
                  <ul className="space-y-2 text-xs font-mono text-zinc-700 mb-6">
                    <li className="flex items-center gap-2">
                      <span className="text-[#c5221f] font-bold">✓</span>
                      <span>Configurable parameter table (Data type, Dimension, Initial value, Tunability)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#c5221f] font-bold">✓</span>
                      <span>Built-in guidance panel ("What to Consider") instructing users how to inspect INO/header values</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#c5221f] font-bold">✓</span>
                      <span>Move up / move down reordering controls for visual port alignment</span>
                    </li>
                  </ul>
                </div>

                <div className="lg:col-span-6 border border-[#e5e5ea] rounded-lg overflow-hidden bg-white shadow-sm">
                  <ZoomableImage 
                    src="/assets/iodevice/block_parameters_dialog.webp" 
                    alt="Block parameters mask configuration table showing DHT block parameters and types" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="p-2.5 bg-zinc-50 border-t border-[#e5e5ea] flex justify-between items-center text-[10px] font-mono text-zinc-500">
                    <span>Block Mask Configuration Wizard Screen</span>
                    <a 
                      href="https://in.mathworks.com/help/simulink/supportpkg/arduino_ug/io-device-builder.html" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-[#c5221f] flex items-center gap-1"
                    >
                      <span>Source: mathworks.com</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 4: Input & Output Customization */}
            <div className="bg-white border border-[#e5e5ea] rounded-xl p-6 sm:p-8 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 lg:order-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#c5221f] font-semibold block mb-2">
                    04 · Dynamic Input &amp; Output Port Mapping
                  </span>
                  <h3 className="font-display text-2xl uppercase tracking-wide text-zinc-900 mb-4">
                    Support for Up to 50 Simultaneous Ports
                  </h3>
                  <p className="text-zinc-600 text-sm leading-relaxed mb-4 font-normal">
                    Complex sensors like multi-channel IMUs and RADAR transceivers output numerous telemetry channels. The builder supports up to 50 input and output ports, providing full control over signal naming, data types (`single`, `double`, `int8`, `boolean`), and array dimensions.
                  </p>
                  <ul className="space-y-2 text-xs font-mono text-zinc-700 mb-6">
                    <li className="flex items-center gap-2">
                      <span className="text-[#c5221f] font-bold">✓</span>
                      <span>Flexible configuration of up to 50 input and output ports</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#c5221f] font-bold">✓</span>
                      <span>Automatic type detection directly from C/C++ return statements</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#c5221f] font-bold">✓</span>
                      <span>Real-time preview of block port layout and connection pins</span>
                    </li>
                  </ul>
                </div>

                <div className="lg:col-span-6 lg:order-1 space-y-3">
                  <div className="border border-[#e5e5ea] rounded-lg overflow-hidden bg-white shadow-sm">
                    <ZoomableImage 
                      src="/assets/iodevice/outputs_dialog.webp" 
                      alt="Define block outputs dialog showing Humidity and Temperature ports" 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="border border-[#e5e5ea] rounded-lg overflow-hidden bg-white shadow-sm">
                    <ZoomableImage 
                      src="/assets/iodevice/inputs_dialog.webp" 
                      alt="Define block inputs dialog" 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="p-2 bg-zinc-50 border border-[#e5e5ea] rounded flex justify-between items-center text-[10px] font-mono text-zinc-500">
                    <span>Block Output &amp; Input Port Configuration Screens</span>
                    <a 
                      href="https://in.mathworks.com/help/simulink/supportpkg/arduino_ug/io-device-builder.html" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-[#c5221f] flex items-center gap-1"
                    >
                      <span>Source: mathworks.com</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 06: BEFORE VS AFTER COMPARISON (Dark Section) ── */}
      <section className="py-20 border-b border-border-custom bg-black text-white" aria-label="Workflow Comparison">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="mb-12">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4 font-semibold">06 · Transformation</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.02em] text-white mb-6">
              The Workflow <span className="text-accent">Metamorphosis</span>
            </h2>
            <p className="text-lg font-light text-zinc-300 leading-relaxed max-w-2xl">
              Comparing the legacy manual wrapper development with the redesigned IO Device Builder highlights how structural UX investment absorbed system complexity away from the user.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            
            {/* Before Card */}
            <div className="p-8 bg-[#0d0d12] border border-zinc-800 rounded-xl shadow-sm flex flex-col justify-between">
              <div>
                <div className="pb-3 border-b border-zinc-800 mb-6">
                  <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-semibold">Legacy State</span>
                </div>
                <h3 className="font-display text-2xl uppercase tracking-wide text-white mb-4">
                  Manual C/C++ S-Functions &amp; Wrapper Scripts
                </h3>
                <ul className="space-y-3 text-sm text-zinc-400 font-light mb-6">
                  <li className="flex gap-2.5 items-start">
                    <span className="text-red-500 font-bold shrink-0">✕</span>
                    <span>Required intermediate-to-advanced C/C++ embedded programming fluency.</span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="text-red-500 font-bold shrink-0">✕</span>
                    <span>Disjointed manual file searching across vendor repositories and PDF manuals.</span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="text-red-500 font-bold shrink-0">✕</span>
                    <span>Manual transcription of register addresses and port data types prone to syntax bugs.</span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="text-red-500 font-bold shrink-0">✕</span>
                    <span>Compiler failure forced developers to restart entire MEX build scripts from scratch.</span>
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded font-mono text-xs text-zinc-400">
                Outcome: 2–3 days per sensor integration, high cognitive fatigue, severe customer drop-off.
              </div>
            </div>

            {/* After Card: Emerald Green Accent */}
            <div className="p-8 bg-[#0d0d12] border-2 border-emerald-500 rounded-xl shadow-md flex flex-col justify-between">
              <div>
                <div className="pb-3 border-b border-emerald-900/50 mb-6">
                  <span className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-bold">Redesigned Experience</span>
                </div>
                <h3 className="font-display text-2xl uppercase tracking-wide text-white mb-4">
                  Automated Visual IO Device Builder
                </h3>
                <ul className="space-y-3 text-sm text-zinc-200 font-light mb-6">
                  <li className="flex gap-2.5 items-start">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    <span>Zero C/C++ code required from end users; fully automated AST code generation.</span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    <span>Direct folder-level import parses multiple driver headers and source files at once.</span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    <span>Automated port detection with flexible configuration for up to 50 input/output pins.</span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    <span>One-click block generation seamlessly added into the Simulink model canvas.</span>
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-emerald-950/40 border border-emerald-800/60 rounded font-mono text-xs text-emerald-300 font-semibold">
                Outcome: &lt;30 minutes per integration, 100% adoption across Arduino/RPi/Radar, zero syntax bugs.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 07: RESULTS & IMPACT (Light Section) ── */}
      <section className="py-20 border-b border-[#e5e5ea] bg-[#f5f5f7] text-[#1d1d1f]" aria-label="Impact and Results">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="mb-12">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#c5221f] mb-4 font-semibold">07 · Impact &amp; Results</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.02em] text-[#1d1d1f] mb-6">
              Transformative Results for <span className="text-[#c5221f]">5M+ Users</span>
            </h2>
            <p className="text-lg font-light text-zinc-700 leading-relaxed max-w-2xl">
              The IO Device Builder shipped globally across MathWorks releases, achieving immediate adoption from automotive, aerospace, and academic research teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: 'Simplified Knowledge Requirements',
                desc: 'Eliminated the hard requirement for advanced C/C++ knowledge, opening hardware integration to research managers, data scientists, and students.'
              },
              {
                title: 'Expanded Sensor Compatibility',
                desc: 'Standardized third-party sensor integration across 100+ hardware packages, from budget Arduino microcontrollers to high-speed automotive RADAR.'
              },
              {
                title: 'Integration Time Slashed',
                desc: 'Sensor integration cycle times plummeted from 2–3 full working days to under 30 minutes, freeing engineering teams for actual algorithm development.'
              },
              {
                title: 'Accelerated Product Prototyping',
                desc: 'Faster project development cycles led to quicker hardware-in-the-loop validation, rapid client demonstrations, and compressed launch schedules.'
              },
              {
                title: 'Elevated User Satisfaction',
                desc: 'Engineers reported massive productivity gains, zero compile-error roadblocks, and renewed enthusiasm for Simulink hardware exploration.'
              },
              {
                title: 'Enhanced Cross-Team Collaboration',
                desc: 'Streamlined collaboration between hardware firmware developers and software control engineers by providing a shared, standard interface format.'
              }
            ].map((res, idx) => (
              <div key={idx} className="p-6 bg-white border border-[#e5e5ea] rounded-xl shadow-sm flex flex-col justify-between">
                <div>
                  <div className="font-mono text-xs text-[#c5221f] uppercase tracking-wider mb-2 font-bold">Result 0{idx + 1}</div>
                  <h3 className="font-semibold text-zinc-900 text-lg mb-2">{res.title}</h3>
                  <p className="text-sm text-zinc-600 font-normal leading-relaxed">{res.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 08: FUTURE VISION & ROADMAP (Dark Section) ── */}
      <section className="py-20 border-b border-border-custom bg-black text-white" aria-label="Future Vision and Roadmap">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="mb-12">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4 font-semibold">08 · Strategic Roadmap</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.02em] text-white mb-6">
              Future Vision for <span className="text-accent">Sensor Block Creation</span>
            </h2>
            <p className="text-lg font-light text-zinc-300 leading-relaxed max-w-2xl">
              Following the success of the initial 6-month launch, we laid the foundation for subsequent architectural evolutions to scale sensor interoperability across connected ecosystems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 bg-[#0e0e13] border border-zinc-800 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-accent mb-4 font-bold">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Python &amp; ML Workflow Integration</h3>
              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                Expanding direct compatibility with Python-based data science workflows (TensorFlow, PyTorch), enabling seamless sensor data streaming into predictive maintenance and machine learning pipelines.
              </p>
            </div>

            <div className="p-8 bg-[#0e0e13] border border-zinc-800 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-accent mb-4 font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">AI-Assisted Sensor Detection</h3>
              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                Implementing intelligent heuristic sensor detection and automated datasheet parsing to deduce register maps and pin configurations without requiring manual code inspection.
              </p>
            </div>

            <div className="p-8 bg-[#0e0e13] border border-zinc-800 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-accent mb-4 font-bold">
                <GitBranch className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Community Contribution Platform</h3>
              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                Creating an open, curated contribution ecosystem where hardware enthusiasts and component vendors can publish verified sensor definitions for the global MATLAB community.
              </p>
            </div>

            <div className="p-8 bg-[#0e0e13] border border-zinc-800 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-accent mb-4 font-bold">
                <Boxes className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Cloud-Based Sensor Registry</h3>
              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                Centralized cloud registry enabling enterprise engineering teams to share, version-control, and synchronize proprietary sensor block configurations across distributed global offices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 09: STRATEGIC REFLECTIONS (Light Section) ── */}
      <section className="py-20 border-b border-[#e5e5ea] bg-[#f5f5f7] text-[#1d1d1f]" aria-label="Deep Reflection">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="border-t-4 border-[#ff3b30] pt-10">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#c5221f] mb-4 font-semibold">09 · Deep Reflection</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.02em] text-[#1d1d1f] mb-8">
              What I Learned &amp; <span className="text-[#c5221f]">Key Takeaways</span>
            </h2>

            <div className="flex flex-col gap-6">
              {[
                {
                  num: '01',
                  title: 'Domain fluency is half the battle in specialist research.',
                  body: 'Interviewing embedded systems engineers requires speaking their dialect. Understanding registers, memory allocation, I2C pullups, SPI baud rates, and compiler flags gave me immediate credibility, allowing us to uncover core cognitive blockers rather than surface-level gripes.'
                },
                {
                  num: '02',
                  title: 'Wizards must always provide non-linear escape routes.',
                  body: 'While step-by-step guidance is an immense relief for novice users, expert developers can feel artificially constrained by rigid modal workflows. Blending progressive disclosure with accessible jump navigation satisfied both user archetypes simultaneously.'
                },
                {
                  num: '03',
                  title: 'Empirical drop-off data dissolves ideological engineering pushback.',
                  body: 'When debating legacy wizard infrastructure versus modern extensible builder architecture, opinions are cheap. Bringing concrete customer journey recordings and drop-off analytics shifted the discussion from subjective preferences to user-centric business value.'
                }
              ].map((item, idx) => (
                <div key={idx} className="grid grid-cols-[36px_1fr] gap-4 py-6 border-b border-[#e5e5ea] last:border-none">
                  <span className="font-mono text-sm text-[#c5221f] font-bold mt-0.5">{item.num}</span>
                  <div>
                    <h3 className="font-semibold text-zinc-900 text-base md:text-lg mb-2">{item.title}</h3>
                    <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-normal">{item.body}</p>
                  </div>
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
            Revolutionising Hardware Sensor Integration · Simulink Desktop · MathWorks UX Case Study
          </p>
        </div>
      </div>

      {/* ── DUAL NAVIGATION FOOTER ── */}
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
