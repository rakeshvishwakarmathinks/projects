import { useEffect } from 'react';
import { PageId } from '../types';
import { AnimatedCounter } from './AnimatedCounter';
import ZoomableImage from './ZoomableImage';
import MotorParameterSandbox from './MotorParameterSandbox';
import { preloadImages, MOTOR_IMAGES } from '../utils/imagePreloader';
import { 
  Cpu, 
  Layers, 
  Workflow, 
  ShieldCheck, 
  CheckCircle2, 
  Gauge, 
  Zap, 
  AlertTriangle, 
  ArrowRight, 
  ArrowLeft,
  ChevronRight,
  TrendingUp,
  Sliders,
  Settings2,
  Users
} from 'lucide-react';

interface MotorParameterCaseStudyProps {
  onPageChange: (page: PageId) => void;
}

export default function MotorParameterCaseStudy({ onPageChange }: MotorParameterCaseStudyProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
    preloadImages(MOTOR_IMAGES, 'high');
  }, []);

  return (
    <main 
      id="main-content" 
      tabIndex={-1} 
      className="pt-24 min-h-screen bg-bg focus:outline-none"
      aria-label="Case Study: Precision Motor Parameter Estimation for Global EVs"
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
                MathWorks · Case Study 4 of 5
              </span>
              <span className="text-zinc-600 font-mono text-xs">/</span>
              <span className="text-zinc-400 font-mono text-xs tracking-wider uppercase">
                Fastest Growing Vertical
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl uppercase tracking-[0.02em] leading-[0.9] text-white mb-6">
              Precision Motor<br />
              Parameter Estimation<br />
              <span className="text-accent">For Global EV<span className="font-sans font-bold lowercase text-[0.72em] inline-block align-baseline">s</span></span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 leading-[1.7] font-light max-w-xl">
              With over 40 million electric vehicles in production and the global market predicted to reach $1.5 trillion by 2030, asynchronous and PMSM motors are the heart of sustainable transport. Yet calibration engineers at Boeing, Tesla, Ford, and Nissan spent days running disconnected scripts, manually copying parameters, and restarting tests after single failures. I led the end-to-end UX redesign for a 21-person cross-functional team, transforming a brittle command-line chore into an automated, safety-first desktop application.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 pt-6 mt-10 border-t border-zinc-800 z-10" role="list" aria-label="Project metadata">
            <span role="listitem" className="font-mono text-xs tracking-wider uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">MathWorks</span>
            <span role="listitem" className="font-mono text-xs tracking-wider uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">Aug 2022 – Feb 2024</span>
            <span role="listitem" className="font-mono text-xs tracking-wider uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">UX Lead</span>
            <span role="listitem" className="font-mono text-xs tracking-wider uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">21-Person Team</span>
            <span role="listitem" className="font-mono text-xs tracking-wider uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">MATLAB &amp; Simulink</span>
          </div>
        </div>

        {/* Right panel */}
        <div className="lg:col-span-5 bg-[#0a0a0d] p-8 md:p-12 lg:p-14 flex flex-col justify-between gap-8 relative border-t lg:border-t-0 lg:border-l border-border-custom">
          {/* Main Application Preview */}
          <div className="w-full bg-[#08080c] rounded-lg aspect-[16/10] overflow-hidden relative border border-border-custom shadow-2xl">
            <ZoomableImage 
              src="/assets/motor_parameter_hero.webp" 
              alt="Electric motor parameter estimation workspace illustration showing tablet with 3D parameter surface plot, torque metrics, and motor schematics" 
              className="w-full h-full object-cover object-center"
              priority={true}
            />
          </div>

          {/* Key project metrics */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 z-10" role="region" aria-label="Key project metrics">
            <div className="flex flex-col border-b border-zinc-800 pb-4" aria-label="Metric: 80 percent plus YoY vertical growth in 2024">
              <div className="font-display text-4xl text-accent font-bold leading-none mb-1.5" aria-hidden="true">
                <AnimatedCounter value="80%+" />
              </div>
              <div className="font-mono text-xs tracking-wider uppercase text-zinc-400">YoY Vertical Growth (2024)</div>
              <span className="sr-only">80%+ YoY vertical growth in 2024</span>
            </div>

            <div className="flex flex-col border-b border-zinc-800 pb-4" aria-label="Metric: ~500 percent revenue growth over 3 years">
              <div className="font-display text-4xl text-accent font-bold leading-none mb-1.5" aria-hidden="true">
                <AnimatedCounter value="~500%" />
              </div>
              <div className="font-mono text-xs tracking-wider uppercase text-zinc-400">Revenue Growth (3 Yrs)</div>
              <span className="sr-only">~500% revenue growth over 3 years</span>
            </div>

            <div className="flex flex-col border-b border-zinc-800 pb-4" aria-label="Metric: ~30 percent growth in enterprise user accounts">
              <div className="font-display text-4xl text-accent font-bold leading-none mb-1.5" aria-hidden="true">
                <AnimatedCounter value="~30%" />
              </div>
              <div className="font-mono text-xs tracking-wider uppercase text-zinc-400">MCB Enterprise Accounts</div>
              <span className="sr-only">~30% growth in Motor Control Blockset enterprise accounts</span>
            </div>

            <div className="flex flex-col border-b border-zinc-800 pb-4" aria-label="Metric: Calibration time cut from days to hours">
              <div className="font-display text-4xl text-accent font-bold leading-none mb-1.5" aria-hidden="true">
                <AnimatedCounter value="Days→Hrs" />
              </div>
              <div className="font-mono text-xs tracking-wider uppercase text-zinc-400">Estimation Time Reduction</div>
              <span className="sr-only">Calibration time cut from days to hours</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── IMPACT & ENTERPRISE ADOPTION (Light Section) ── */}
      <section className="py-20 border-b border-[#e5e5ea] bg-[#f5f5f7] text-[#1d1d1f]" aria-label="Executive summary and proven impact">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff3b30]" aria-hidden="true" />
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#c5221f] font-semibold">Executive Summary &amp; Proven Impact</p>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.02em] text-[#1d1d1f] mb-8">
            Accelerating Clean Mobility <span className="text-[#c5221f]">At Global Scale</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <div className="p-8 bg-white border border-[#e5e5ea] rounded-xl shadow-sm flex flex-col justify-between gap-3 hover:border-[#ff3b30]/30 transition-colors">
              <div className="font-display text-5xl text-[#c5221f] font-bold leading-none">
                <AnimatedCounter value="80%+" />
              </div>
              <p className="font-mono text-xs tracking-wider uppercase text-zinc-600 font-semibold">
                Fastest-growing vertical of 2024 at MathWorks
              </p>
            </div>

            <div className="p-8 bg-white border border-[#e5e5ea] rounded-xl shadow-sm flex flex-col justify-between gap-3 hover:border-[#ff3b30]/30 transition-colors">
              <div className="font-display text-5xl text-[#c5221f] font-bold leading-none">
                <AnimatedCounter value="~500%" />
              </div>
              <p className="font-mono text-xs tracking-wider uppercase text-zinc-600 font-semibold">
                Revenue expansion over 3 years
              </p>
            </div>

            <div className="p-8 bg-white border border-[#e5e5ea] rounded-xl shadow-sm flex flex-col justify-between gap-3 hover:border-[#ff3b30]/30 transition-colors">
              <div className="font-display text-5xl text-[#c5221f] font-bold leading-none">
                <AnimatedCounter value="~30%" />
              </div>
              <p className="font-mono text-xs tracking-wider uppercase text-zinc-600 font-semibold">
                Increase in MCB enterprise customer seats
              </p>
            </div>

            <div className="p-8 bg-white border border-[#e5e5ea] rounded-xl shadow-sm flex flex-col justify-between gap-3 hover:border-[#ff3b30]/30 transition-colors">
              <div className="font-display text-5xl text-[#c5221f] font-bold leading-none">
                <AnimatedCounter value="Zero" />
              </div>
              <p className="font-mono text-xs tracking-wider uppercase text-zinc-600 font-semibold">
                Custom C++ scripts needed for calibration
              </p>
            </div>
          </div>

          {/* Visual Showcase: Customer Adoption & High-Tech Motor */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch pt-6">
            <div className="md:col-span-7 bg-white border border-[#e5e5ea] rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#c5221f] font-semibold block mb-2">
                  Customer Reach
                </span>
                <h3 className="font-display text-2xl uppercase tracking-wide text-zinc-900 mb-4">
                  Trusted by Aerospace Leaders &amp; EV Giants
                </h3>
                <p className="text-zinc-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  The Motor Parameter Estimator is deployed on active development benches at world-leading aerospace and automotive manufacturers—including <strong>Boeing, Tesla, Ford, Nissan, Triumph, Gulfstream, and EPAM</strong>. By automating calibration routines and validating parameters against hardware-in-the-loop (HIL) testbeds, engineering teams slash development cycles, boost energy efficiency, and compress vehicle homologation schedules.
                </p>
              </div>

              <div className="border border-[#e5e5ea] rounded-lg overflow-hidden bg-zinc-50">
                <ZoomableImage 
                  src="/assets/motor_page_07.webp" 
                  alt="Enterprise customer logos: Boeing, Tesla, Ford, Nissan, Triumph, Gulfstream, and EPAM" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            <div className="md:col-span-5 bg-white border border-[#e5e5ea] rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#c5221f] font-semibold block mb-2">
                  Macro Opportunity
                </span>
                <h3 className="font-display text-2xl uppercase tracking-wide text-zinc-900 mb-4">
                  At the Heart of Electrification
                </h3>
                <p className="text-zinc-600 text-sm leading-relaxed mb-6 font-normal">
                  Permanent Magnet Synchronous Motors (PMSM) and asynchronous induction motors form the electro-mechanical core of modern electric drivetrains. Accurate extraction of stator resistance (Rs), d-axis and q-axis inductances (Ld, Lq), Back-EMF constant (Ke), and inertia (J) determines motor drive efficiency, torque smoothness, and thermal lifespan.
                </p>
              </div>

              <div className="border border-[#e5e5ea] rounded-lg overflow-hidden bg-black">
                <ZoomableImage 
                  src="/assets/motor_stator_precision.webp" 
                  alt="High-precision electric motor stator and rotor assembly with copper windings and precision machined casing" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STRATEGIC IMPACT STORY & OKRs (Dark Section) ── */}
      <section className="py-20 border-b border-border-custom bg-black text-white" aria-label="Strategic Impact Story">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="mb-12">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4 font-semibold">01 · Strategic Framework</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.02em] text-white mb-6">
              The Enterprise Bottleneck <span className="text-accent">Solved</span>
            </h2>
            <p className="text-lg font-light text-zinc-300 leading-relaxed max-w-2xl">
              We framed our design objectives around the high-stakes reality of tier-1 aerospace and EV leaders who cannot afford motor calibration errors or unverified black-box algorithms.
            </p>
          </div>


          {/* Zoomable Image of Strategy Framework */}
          <div className="border border-zinc-800 rounded-xl overflow-hidden bg-[#0d0d12]">
            <ZoomableImage 
              src="/assets/motor_page_08.webp" 
              alt="Impact Story problem statement and OKR alignment matrix" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE DIGITAL TWIN SANDBOX ── */}
      <MotorParameterSandbox />

      {/* ── PHASE 1: KNOWING THE USER (Light Section) ── */}
      <section className="py-20 border-b border-[#e5e5ea] bg-[#f5f5f7] text-[#1d1d1f]" aria-label="User Research and Personas">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="mb-12">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#c5221f] mb-4 font-semibold">02 · Discovery &amp; User Research</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.02em] text-[#1d1d1f] mb-6">
              Three Users. <span className="text-[#c5221f]">Zero Compromise.</span>
            </h2>
            <p className="text-lg font-light text-zinc-700 leading-relaxed max-w-2xl">
              Through deep contextual inquiry and analysis of customer request patterns across Salesforce and Gecko error logs, we synthesized three primary user profiles across commercial, research, and education sectors.
            </p>
          </div>

          {/* User Persona Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-white border border-[#e5e5ea] rounded-xl shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#c5221f] font-semibold">Priority: High</span>
                  <span className="text-xs font-mono text-zinc-500">Commercial EV</span>
                </div>
                <h3 className="font-semibold text-zinc-900 text-lg mb-2">Software Design Engineer</h3>
                <p className="text-sm text-zinc-600 leading-relaxed font-normal mb-4">
                  Developing embedded motor control firmware for electric two-wheelers and automotive drivetrains. Needs precision parameter sets quickly to tune field-oriented control (FOC) loops.
                </p>
              </div>
              <div className="p-3 bg-zinc-50 border border-zinc-200/80 rounded font-mono text-xs text-zinc-700">
                <strong>Goal:</strong> Automate testbench calibration to replace brittle handwritten scripts.
              </div>
            </div>

            <div className="p-6 bg-white border border-[#e5e5ea] rounded-xl shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#c5221f] font-semibold">Priority: High</span>
                  <span className="text-xs font-mono text-zinc-500">MathWorks Dev</span>
                </div>
                <h3 className="font-semibold text-zinc-900 text-lg mb-2">Internal Algorithm Developer</h3>
                <p className="text-sm text-zinc-600 leading-relaxed font-normal mb-4">
                  Building foundational Motor Control Blockset algorithms and documentation examples. Needs a standardized test harness to ship robust hardware support across TI, ST, and NXP boards.
                </p>
              </div>
              <div className="p-3 bg-zinc-50 border border-zinc-200/80 rounded font-mono text-xs text-zinc-700">
                <strong>Goal:</strong> Create reusable tutorials and ensure out-of-the-box hardware compatibility.
              </div>
            </div>

            <div className="p-6 bg-white border border-[#e5e5ea] rounded-xl shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-zinc-700 font-semibold">Priority: Medium</span>
                  <span className="text-xs font-mono text-zinc-500">Academia &amp; Lab</span>
                </div>
                <h3 className="font-semibold text-zinc-900 text-lg mb-2">Student &amp; Lab Researcher</h3>
                <p className="text-sm text-zinc-600 leading-relaxed font-normal mb-4">
                  Learning electric machine principles or characterizing experimental prototypes. Needs clear guided guardrails so motor spin-up errors or miswiring don't damage expensive test rigs.
                </p>
              </div>
              <div className="p-3 bg-zinc-50 border border-zinc-200/80 rounded font-mono text-xs text-zinc-700">
                <strong>Goal:</strong> Safely extract motor parameters without requiring deep MATLAB scripting knowledge.
              </div>
            </div>
          </div>

          {/* Research Breakdown: Four Critical Friction Points */}
          <div className="bg-white border border-[#e5e5ea] rounded-xl p-6 sm:p-8 shadow-sm">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#c5221f] font-semibold block mb-2">
                User Pains Uncovered
              </span>
              <h3 className="font-display text-2xl uppercase tracking-wide text-zinc-900 mb-6">
                The Four Critical Friction Points
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-zinc-700 font-normal">
                <div className="flex gap-3 items-start p-3 rounded-lg bg-zinc-50 border border-zinc-100">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-[#c5221f] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <span><strong>Scattered workflows:</strong> Estimation steps were split across disjointed scripts, requiring users to memorize sequence order and parameter names.</span>
                </div>
                <div className="flex gap-3 items-start p-3 rounded-lg bg-zinc-50 border border-zinc-100">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-[#c5221f] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <span><strong>No individual test control:</strong> If a high-speed Ke test failed, the engineer was forced to re-run the entire hours-long sequence from scratch.</span>
                </div>
                <div className="flex gap-3 items-start p-3 rounded-lg bg-zinc-50 border border-zinc-100">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-[#c5221f] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <span><strong>Zero source visibility:</strong> Black-box execution prevented verification of safety-critical algorithms for aerospace compliance.</span>
                </div>
                <div className="flex gap-3 items-start p-3 rounded-lg bg-zinc-50 border border-zinc-100">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-[#c5221f] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">4</span>
                  <span><strong>Custom hardware friction:</strong> Adapting to non-default power inverters required deep C++ knowledge rather than domain expertise.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PHASE 2: DESIGN & WORKSHOP (Dark Section) ── */}
      <section className="py-20 border-b border-border-custom bg-black text-white" aria-label="Collaborative Design and Workshops">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="mb-12">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4 font-semibold">03 · Systems Architecture</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.02em] text-white mb-6">
              Engineering Meets Empathy: <span className="text-accent">Toolstrip Framework</span>
            </h2>
            <p className="text-lg font-light text-zinc-300 leading-relaxed max-w-2xl">
              Working within strict corporate constraints—C++ and Java legacy infrastructure, a complex codebase, and limited standard GUI components—I organized high-velocity design workshops to align 20+ engineering and product stakeholders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-[#0e0e13] border border-zinc-800 rounded-xl">
              <div className="font-mono text-xs text-accent uppercase tracking-wider mb-2 font-semibold">Alignment Sprint</div>
              <h3 className="font-semibold text-white text-lg mb-2">Two 3-Hour Workshops</h3>
              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                Brought together 20+ cross-functional participants including directors, dev managers, developers, QE, and UX researchers to brainstorm over 100 concepts.
              </p>
            </div>

            <div className="p-6 bg-[#0e0e13] border border-zinc-800 rounded-xl">
              <div className="font-mono text-xs text-accent uppercase tracking-wider mb-2 font-semibold">Concept Convergence</div>
              <h3 className="font-semibold text-white text-lg mb-2">3 Competing Directions</h3>
              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                Evaluated Simulink canvas block models, command-line API scripts, and a standalone MATLAB Toolstrip Desktop application. The Toolstrip paradigm won on workflow speed and safety.
              </p>
            </div>

            <div className="p-6 bg-[#0e0e13] border border-zinc-800 rounded-xl">
              <div className="font-mono text-xs text-accent uppercase tracking-wider mb-2 font-semibold">3-Stage Lifecycle</div>
              <h3 className="font-semibold text-white text-lg mb-2">Prepare · Build · Business Use</h3>
              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                Structured the entire application flow chronologically: Hardware &amp; Board Configuration, Selective Test Run &amp; Validation, and Direct Simulink Export.
              </p>
            </div>
          </div>

          {/* Annotated Design Architecture Visual */}
          <div className="bg-[#0b0b0e] border border-zinc-800 rounded-xl p-6 md:p-8">
            <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold block mb-2">
              Application Architecture Deep Dive
            </span>
            <h3 className="font-display text-2xl uppercase tracking-wide text-white mb-6">
              Deconstructing the Motor Parameter Estimator UI
            </h3>
            
            <div className="border border-zinc-800 rounded-lg overflow-hidden mb-6">
              <ZoomableImage 
                src="/assets/motor_page_18.webp" 
                alt="Detailed annotation of Motor Parameter Estimator: Toolstrip, Primary Navigation, Required Inputs, System Messages, Runtime Dial, and Results Table" 
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-4 bg-zinc-900/60 rounded border border-zinc-800">
                <span className="text-accent font-bold block mb-1">01. TOP TOOLSTRIP</span>
                <p className="text-zinc-400 font-sans text-xs font-light">File operations, hardware board selection (TI, ST, NXP), and selective test activation check controls.</p>
              </div>
              <div className="p-4 bg-zinc-900/60 rounded border border-zinc-800">
                <span className="text-accent font-bold block mb-1">02. PARAMETER INPUTS</span>
                <p className="text-zinc-400 font-sans text-xs font-light">Input validation for Back-EMF estimation times, speed limits, reference current (Iq), and controller gains.</p>
              </div>
              <div className="p-4 bg-zinc-900/60 rounded border border-zinc-800">
                <span className="text-accent font-bold block mb-1">03. REAL-TIME TELEMETRY</span>
                <p className="text-zinc-400 font-sans text-xs font-light">Live RPM gauge with safety interlock, fault indicators (over-current, under-voltage), and timestamped log stream.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BEFORE VS AFTER TRANSFORMATION (Light Section) ── */}
      <section className="py-20 border-b border-[#e5e5ea] bg-[#f5f5f7] text-[#1d1d1f]" aria-label="Before versus after workflow transformation">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="mb-12">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#c5221f] mb-4 font-semibold">04 · Workflow Transformation</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.02em] text-[#1d1d1f] mb-6">
              From Manual Scripts to <span className="text-[#c5221f]">Autonomous Estimation</span>
            </h2>
            <p className="text-lg font-light text-zinc-700 leading-relaxed max-w-2xl">
              Comparing the legacy Simulink model workflow with the redesigned desktop application demonstrates why calibration velocity improved by an order of magnitude.
            </p>
          </div>

          {/* Before vs After Side-by-Side Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Before Card */}
            <div className="p-8 bg-white border border-[#e5e5ea] rounded-xl shadow-sm flex flex-col justify-between">
              <div>
                <div className="pb-3 border-b border-zinc-200 mb-6">
                  <span className="font-mono text-xs uppercase tracking-wider text-zinc-600 font-semibold">Legacy State</span>
                </div>
                <h3 className="font-display text-2xl uppercase tracking-wide text-zinc-900 mb-4">
                  Fragmented Simulink Model &amp; Command Scripts
                </h3>
                <ul className="space-y-3 text-sm text-zinc-600 font-normal mb-6">
                  <li className="flex gap-2.5 items-start">
                    <span className="text-red-500 font-bold shrink-0">✕</span>
                    <span>Scattered manual dialog blocks requiring users to configure registers across multiple sub-windows.</span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="text-red-500 font-bold shrink-0">✕</span>
                    <span>No selective sub-test execution; failure at the final inertia test forced restarting from step zero.</span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="text-red-500 font-bold shrink-0">✕</span>
                    <span>Zero visual motor RPM feedback during rotation, leading to safety hazards on high-torque testbenches.</span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="text-red-500 font-bold shrink-0">✕</span>
                    <span>Manual transcription of estimated parameters into simulation models prone to syntax typos.</span>
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-zinc-50 border border-zinc-200 rounded font-mono text-xs text-zinc-700">
                Outcome: High cognitive fatigue, severe drop-off, and heavy customer support ticket load.
              </div>
            </div>

            {/* After Card */}
            <div className="p-8 bg-white border-2 border-emerald-500 rounded-xl shadow-md flex flex-col justify-between">
              <div>
                <div className="pb-3 border-b border-emerald-100 mb-6">
                  <span className="font-mono text-xs uppercase tracking-wider text-emerald-700 font-bold">Redesigned Experience</span>
                </div>
                <h3 className="font-display text-2xl uppercase tracking-wide text-zinc-900 mb-4">
                  Autonomous Guided Motor Parameter Estimator
                </h3>
                <ul className="space-y-3 text-sm text-zinc-700 font-normal mb-6">
                  <li className="flex gap-2.5 items-start">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span>One-click automated sequence with granular checkboxes to test Rs, Ld, Lq, or Ke independently.</span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span>Safety-first design with software interlocks, emergency stop, and real-time RPM speedometer.</span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span>Continuous system log streaming providing transparent visibility into algorithmic calculations.</span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span>Direct one-click export into Simulink motor models and auto-generated HTML/PDF calibration reports.</span>
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded font-mono text-xs text-emerald-800 font-semibold">
                Outcome: 80%+ YoY vertical growth, ~500% 3-year revenue lift, and enterprise standard adoption.
              </div>
            </div>
          </div>

          {/* Visual Showcase: Before vs After Image */}
          <div className="border border-[#e5e5ea] rounded-xl overflow-hidden bg-white shadow-sm">
            <ZoomableImage 
              src="/assets/motor_page_17.webp" 
              alt="Side-by-side comparison of Before (Simulink model with blocks) and After (Clean MATLAB web/desktop application)" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── ECOSYSTEM & FUTURE SCOPE (Dark Section) ── */}
      <section className="py-20 border-b border-border-custom bg-black text-white" aria-label="Ecosystem and Future Scope">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="mb-12">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4 font-semibold">05 · Ecosystem Vision</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.02em] text-white mb-6">
              From Single App to <span className="text-accent">Integrated Motor Control Suite</span>
            </h2>
            <p className="text-lg font-light text-zinc-300 leading-relaxed max-w-2xl">
              The success of the Motor Parameter Estimator established a reusable design system and workflow standard that catalyzed two additional flagship applications, creating a unified end-to-end motor control ecosystem.
            </p>
          </div>

          {/* The 3 Suite Apps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-[#0f0f14] border border-zinc-800 rounded-xl flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold block mb-2">01 · Shipped</span>
                <h3 className="font-semibold text-white text-lg mb-2">Motor Parameter Estimator</h3>
                <p className="text-sm text-zinc-400 font-light leading-relaxed">
                  Automated parameter extraction for permanent magnet and asynchronous induction motors directly from physical test hardware without manual coding.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-800/80 font-mono text-xs text-zinc-500">
                Core: Calibration &amp; Extraction
              </div>
            </div>

            <div className="p-6 bg-[#0f0f14] border border-zinc-800 rounded-xl flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold block mb-2">02 · Scaled</span>
                <h3 className="font-semibold text-white text-lg mb-2">Motor Hardware Configurator</h3>
                <p className="text-sm text-zinc-400 font-light leading-relaxed">
                  Rapid configuration tool for setting up inverter boards, gate drivers, ADC sampling rates, and current sensors required for motor estimation workflows.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-800/80 font-mono text-xs text-zinc-500">
                Core: Hardware &amp; Inverter Setup
              </div>
            </div>

            <div className="p-6 bg-[#0f0f14] border border-zinc-800 rounded-xl flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold block mb-2">03 · Evolving</span>
                <h3 className="font-semibold text-white text-lg mb-2">Motor Characteristic Analyzer</h3>
                <p className="text-sm text-zinc-400 font-light leading-relaxed">
                  Non-programmatic plotting solution to generate torque-speed operating curves, efficiency maps, and thermal saturation envelopes from calibrated parameters.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-800/80 font-mono text-xs text-zinc-500">
                Core: Performance &amp; Analysis
              </div>
            </div>
          </div>

          {/* Visual of the 3-app suite */}
          <div className="border border-zinc-800 rounded-xl overflow-hidden bg-[#0d0d12]">
            <ZoomableImage 
              src="/assets/motor_page_22.webp" 
              alt="Future Scope suite: Motor Parameter Estimator, Motor Hardware Configurator, and Motor Characteristic Analyzer" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── DEEP REFLECTION & LEADERSHIP LEARNINGS (Light Section) ── */}
      <section className="py-20 border-b border-[#e5e5ea] bg-[#f5f5f7] text-[#1d1d1f]" aria-label="Key learnings and reflections">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="mb-12">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#c5221f] mb-4 font-semibold">06 · Leadership Reflections</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.02em] text-[#1d1d1f] mb-6">
              What I Learned Leading <span className="text-[#c5221f]">Mission-Critical UX</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white border border-[#e5e5ea] rounded-xl shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#c5221f] font-semibold block mb-2">01 · Domain Fluency</span>
                <h3 className="font-semibold text-zinc-900 text-lg mb-2">Speak the Language of Engineering</h3>
                <p className="text-sm text-zinc-600 font-normal leading-relaxed">
                  In technical enterprise domains like electric machines and control theory, UX credibility is won by understanding the underlying physics—stator flux linkage, Clarke/Park transforms, and inverter switching latency. Speaking this language bridged the gap between design vision and dev execution.
                </p>
              </div>
            </div>

            <div className="p-6 bg-white border border-[#e5e5ea] rounded-xl shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#c5221f] font-semibold block mb-2">02 · Safety as First-Class UX</span>
                <h3 className="font-semibold text-zinc-900 text-lg mb-2">Designing for Physical Consequences</h3>
                <p className="text-sm text-zinc-600 font-normal leading-relaxed">
                  Unlike pure web software, mistakes in motor estimation testbenches can cause physical motor runaway or electrical burnout. We designed software interlocks, physical emergency stop prompts, and continuous sensor validation into every micro-interaction.
                </p>
              </div>
            </div>

            <div className="p-6 bg-white border border-[#e5e5ea] rounded-xl shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#c5221f] font-semibold block mb-2">03 · Absorbing Complexity</span>
                <h3 className="font-semibold text-zinc-900 text-lg mb-2">Do Not Shift Burden to the User</h3>
                <p className="text-sm text-zinc-600 font-normal leading-relaxed">
                  Engineering complexity cannot be eliminated, but it can be absorbed by the design. By automating data logging, unit transformations, and algorithm selection behind intuitive toolstrips, we gave power engineers supreme control without forcing manual bookkeeping.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── METADATA STRIP ── */}
      <div className="py-12 border-t border-border-custom bg-black text-center">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <p className="font-mono text-xs tracking-wider uppercase text-zinc-400">
            Precision Motor Parameter Estimation · MathWorks Motor Control Blockset · UX Case Study
          </p>
        </div>
      </div>

      {/* ── DUAL NAVIGATION FOOTER ── */}
      <footer className="py-16 border-t border-border-custom bg-[#0a0a0d]" aria-label="Case Study Navigation">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <p className="font-mono text-xs tracking-wider uppercase text-zinc-400 mb-2">Portfolio Index</p>
            <button 
              onClick={() => onPageChange('home')}
              className="font-sans text-xl md:text-2xl font-bold tracking-tight text-white hover:text-accent flex items-center gap-3 text-left group transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg p-1 -ml-1"
              aria-label="Back to all case studies"
            >
              <span className="w-10 h-10 rounded-full border border-zinc-700 group-hover:border-accent shrink-0 flex items-center justify-center transition-colors" aria-hidden="true">
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-zinc-300 group-hover:text-accent" />
              </span>
              Back to all work
            </button>
          </div>

          <div>
            <p className="font-mono text-xs tracking-wider uppercase text-zinc-400 mb-2 text-left md:text-right">Next case study</p>
            <button 
              onClick={() => onPageChange('ai-design-to-code')}
              className="font-sans text-2xl md:text-3xl font-bold tracking-tight text-white hover:text-accent flex items-center gap-4 text-left md:text-right group transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg p-1 -mr-1"
              aria-label="Next Case Study: AI Design to Code Pipeline"
            >
              <span>AI Design-to-Code · MathWorks</span>
              <span className="w-12 h-12 rounded-full border border-zinc-700 group-hover:border-accent shrink-0 flex items-center justify-center transition-colors" aria-hidden="true">
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-zinc-300 group-hover:text-accent" />
              </span>
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}
