import { useEffect } from 'react';
import { PageId } from '../types';
import { AnimatedCounter } from './AnimatedCounter';
import ZoomableImage from './ZoomableImage';
import { preloadImages, AI_CODE_IMAGES } from '../utils/imagePreloader';
import { getAssetUrl } from '../utils/assets';
import { 
  Cpu, 
  Layers, 
  Workflow, 
  Award, 
  Code2, 
  Boxes, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Zap,
  LayoutGrid,
  FileCode2
} from 'lucide-react';

interface AiCodeGenerationCaseStudyProps {
  onPageChange: (page: PageId) => void;
}

export default function AiCodeGenerationCaseStudy({ onPageChange }: AiCodeGenerationCaseStudyProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
    preloadImages(AI_CODE_IMAGES, 'high');
  }, []);

  return (
    <main 
      id="main-content" 
      tabIndex={-1} 
      className="pt-24 min-h-screen bg-bg focus:outline-none"
      aria-label="Case Study: AI-Assisted Design-to-Code 70% Faster at MathWorks"
    >
      {/* ── HERO SECTION ── */}
      <header className="grid grid-cols-1 lg:grid-cols-12 min-h-[74vh] border-b border-border-custom bg-black" aria-label="Project Overview">
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

            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs tracking-[0.18em] uppercase text-accent font-semibold">
                MathWorks · Case Study 5 of 5
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent/15 border border-accent/40 text-[11px] font-mono font-semibold text-accent uppercase">
                <Award className="w-3 h-3" aria-hidden="true" />
                Clippy Award Winner
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl uppercase tracking-[0.02em] leading-[0.9] text-white mb-6">
              AI-Assisted<br />
              Design-to-Code:<br />
              <span className="text-accent">70% Faster</span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 leading-[1.7] font-light max-w-xl">
              Design handover had a hidden structural problem nobody had named. Figma outputs HTML/CSS box model code, but MATLAB GUIs are built with native <code className="text-accent font-mono text-sm bg-accent/10 px-1 py-0.5 rounded">uigridlayout</code> syntax. Developers were manually calculating coordinate translations on every sprint from scratch. I mapped the structural equivalence, created the enterprise skill documentation, and built an automated AI workflow with Microsoft Copilot.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 pt-6 mt-10 border-t border-zinc-800 z-10" role="list" aria-label="Project metadata">
            <span role="listitem" className="font-mono text-xs tracking-wider uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">MathWorks</span>
            <span role="listitem" className="font-mono text-xs tracking-wider uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">2024 – 2025</span>
            <span role="listitem" className="font-mono text-xs tracking-wider uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">Sole Designer &amp; Architect</span>
            <span role="listitem" className="font-mono text-xs tracking-wider uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">Org-wide AI Initiative</span>
            <span role="listitem" className="font-mono text-xs tracking-wider uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">MATLAB App Designer</span>
          </div>
        </div>

        {/* Right panel */}
        <div className="lg:col-span-5 bg-[#0a0a0d] p-8 md:p-12 lg:p-14 flex flex-col justify-between gap-8 relative border-t lg:border-t-0 lg:border-l border-border-custom">
          {/* 3D Graphic Mockup */}
          <div className="w-full bg-[#07060f] rounded-lg aspect-[16/10] overflow-hidden relative border border-border-custom shadow-2xl">
            <ZoomableImage 
              src="/assets/ai_code_graphic.webp" 
              alt="AI-assisted design to code conversion: 3D render showing Figma and MATLAB on dual laptops connected through Microsoft Copilot" 
              className="w-full h-full object-cover object-center"
              priority={true}
            />
          </div>

          {/* Key project metrics */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 z-10" role="region" aria-label="Key project metrics">
            <div className="flex flex-col border-b border-zinc-800 pb-4" aria-label="Metric: 70 percent reduction in UI coding time">
              <div className="font-display text-4xl text-accent font-bold leading-none mb-1.5" aria-hidden="true">
                <AnimatedCounter value="70%" />
              </div>
              <div className="font-mono text-xs tracking-wider uppercase text-zinc-400">Coding time reduction</div>
              <span className="sr-only">70% reduction in coding time</span>
            </div>

            <div className="flex flex-col border-b border-zinc-800 pb-4" aria-label="Metric: Org-wide MathWorks implementation">
              <div className="font-display text-4xl text-accent font-bold leading-none mb-1.5" aria-hidden="true">
                <AnimatedCounter value="Org-wide" />
              </div>
              <div className="font-mono text-xs tracking-wider uppercase text-zinc-400">MathWorks deployment</div>
              <span className="sr-only">Org-wide MathWorks deployment</span>
            </div>

            <div className="flex flex-col border-b border-zinc-800 pb-4" aria-label="Metric: Zero prior standard translation workflow">
              <div className="font-display text-4xl text-accent font-bold leading-none mb-1.5" aria-hidden="true">
                <AnimatedCounter value="Zero" />
              </div>
              <div className="font-mono text-xs tracking-wider uppercase text-zinc-400">Prior automated workflow</div>
              <span className="sr-only">Zero prior automated workflow</span>
            </div>

            <div className="flex flex-col border-b border-zinc-800 pb-4" aria-label="Metric: Minutes from design to compilation">
              <div className="font-display text-4xl text-accent font-bold leading-none mb-1.5" aria-hidden="true">
                <AnimatedCounter value="~10m" />
              </div>
              <div className="font-mono text-xs tracking-wider uppercase text-zinc-400">Figma to MATLAB code</div>
              <span className="sr-only">~10 minutes from Figma to MATLAB code</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── IMPACT BAND (Light Section) ── */}
      <section className="py-20 border-b border-[#e5e5ea] bg-[#f5f5f7] text-[#1d1d1f]" aria-label="Project impact and executive summary">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff3b30]" aria-hidden="true" />
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#c5221f] font-semibold">Executive Summary &amp; Proven Impact</p>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.02em] text-[#1d1d1f] mb-8">
            A Systems Intervention That Scaled <span className="text-[#c5221f]">Across MathWorks</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-8 bg-white border border-[#e5e5ea] rounded-xl shadow-sm flex flex-col justify-between gap-3 hover:border-[#ff3b30]/30 transition-colors">
              <div className="font-display text-5xl text-[#c5221f] leading-none">
                <AnimatedCounter value="70%" />
              </div>
              <div>
                <p className="font-mono text-xs tracking-wider uppercase text-zinc-800 font-semibold mb-1">Coding Time Saved</p>
                <p className="text-xs text-zinc-500 leading-normal">From 4–6 hours of manual coordinate math down to minutes per structural layout.</p>
              </div>
            </div>

            <div className="p-8 bg-white border border-[#e5e5ea] rounded-xl shadow-sm flex flex-col justify-between gap-3 hover:border-[#ff3b30]/30 transition-colors">
              <div className="font-display text-5xl text-[#c5221f] leading-none">
                <AnimatedCounter value="Org-wide" />
              </div>
              <div>
                <p className="font-mono text-xs tracking-wider uppercase text-zinc-800 font-semibold mb-1">Engineering Adoption</p>
                <p className="text-xs text-zinc-500 leading-normal">Adopted as the standard handover framework across all MATLAB application teams.</p>
              </div>
            </div>

            <div className="p-8 bg-white border border-[#e5e5ea] rounded-xl shadow-sm flex flex-col justify-between gap-3 hover:border-[#ff3b30]/30 transition-colors">
              <div className="font-display text-5xl text-[#c5221f] leading-none">
                <AnimatedCounter value="2" />
              </div>
              <div>
                <p className="font-mono text-xs tracking-wider uppercase text-zinc-800 font-semibold mb-1">Heavy Pilot Validations</p>
                <p className="text-xs text-zinc-500 leading-normal">Tested and proven on enterprise dialogs with multi-tier nested grids.</p>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 bg-white border border-[#e5e5ea] rounded-xl shadow-sm">
            <p className="text-base sm:text-lg md:text-xl font-light text-zinc-700 leading-relaxed max-w-4xl">
              This was not an incremental tool tweak; it was a fundamental systems-level intervention in how design and software engineering work together. The discovery: <strong className="text-zinc-900 font-medium">MATLAB's <code className="text-[#c5221f] font-mono text-sm bg-zinc-100 px-1 py-0.5 rounded">uigridlayout</code> and web CSS Grid are mathematically and structurally equivalent</strong>. Both control size and positioning through rows, columns, gaps, and flexible tracks. Once I formalized that mapping into a skill document, automated AI layout translation with Microsoft Copilot went from impossible to instantaneous.
            </p>
          </div>
        </div>
      </section>

      {/* ── 01 CONTEXT: THE LEGACY HANDOVER STACK (Dark Section) ── */}
      <section className="py-20 border-b border-border-custom bg-black text-white" aria-label="The legacy design handover context">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="mb-10">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4 font-semibold">01 · The Context</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.02em] text-white mb-6">
              Before 2026: The Fragmented <span className="text-accent">Handover Stack</span>
            </h2>
            <p className="text-base sm:text-lg text-zinc-300 font-light max-w-3xl leading-relaxed">
              Design handoff at MathWorks was heavily documented but deeply fragmented across four disconnected tools. Despite teams having access to Confluence, Miro, presentations, and Figma Dev Mode, a critical technical gap remained completely unaddressed: Figma speaks CSS, while MATLAB requires native <code className="text-accent font-mono">uigridlayout</code>.
            </p>
          </div>

          {/* Context / 2025 Design Handover Stack */}
          <div className="rounded-xl overflow-hidden border border-border-custom shadow-2xl bg-[#0a0a0f]">
            <ZoomableImage 
              src="/assets/ai_code_page_02.webp" 
              alt="Context diagram showing the 2025 Design Handover stack before 2026: Confluence documents, Miro boards, presentation decks, and Figma Dev Mode" 
              className="w-full h-auto"
            />
            <div className="p-4 bg-[#12131b] border-t border-border-custom flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-300">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
                Legacy Handover Ecosystem (Confluence, Miro, Presentations, Figma Dev Mode)
              </span>
              <span className="text-zinc-400 font-semibold">High Cognitive Load · Fragmented Truth</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 THE TRIPLE CONSTRAINT (Light Section) ── */}
      <section className="py-20 border-b border-[#e5e5ea] bg-[#f5f5f7] text-[#1d1d1f]" aria-label="The technical constraints and paradigm mismatch">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="mb-10">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#c5221f] mb-4 font-semibold">02 · The Technical Dilemma</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.02em] text-zinc-900 mb-6">
              Three Systems, <span className="text-[#c5221f]">Zero Shared Language</span>
            </h2>
            <p className="text-base sm:text-lg text-zinc-700 font-light max-w-3xl leading-relaxed">
              Why couldn't developers simply copy code from Figma into MATLAB? Because three core platforms were operating under fundamentally incompatible layout paradigms.
            </p>
          </div>

          {/* Vertically Stacked Constraints 1, 2, 3 */}
          <div className="space-y-8">
            {/* 1. MATLAB uigridlayout */}
            <div className="bg-white rounded-2xl border border-[#e5e5ea] overflow-hidden shadow-sm p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <div className="rounded-xl overflow-hidden border border-[#e5e5ea] shadow-md bg-zinc-950">
                    <ZoomableImage 
                      src="/assets/ai_code_page_03.webp" 
                      alt="Constraint - MATLAB GUI is built in MATLAB language, based on uigridlayout format with App Designer code" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                <div className="lg:col-span-5">
                  <span className="inline-block font-mono text-xs text-[#c5221f] font-semibold tracking-widest uppercase mb-2">
                    01 · Native MATLAB Engine
                  </span>
                  <h3 className="font-display text-2xl uppercase tracking-wide text-zinc-900 mb-3">
                    MATLAB GUI is Built in MATLAB Language
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed mb-4">
                    Unlike modern web SaaS, the MATLAB graphical interface is rendered using the proprietary <code className="bg-zinc-100 text-[#c5221f] font-mono px-1 py-0.5 rounded text-xs">uigridlayout</code> engine. App Designer layouts must specify:
                  </p>
                  <ul className="space-y-2 text-xs font-mono text-zinc-700 mb-6">
                    <li className="flex items-start gap-2">
                      <span className="text-[#c5221f] font-bold">•</span>
                      <span><strong>RowHeight:</strong> {'{\'1x\', \'fit\', 30}'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c5221f] font-bold">•</span>
                      <span><strong>ColumnWidth:</strong> {'{200, \'1x\'}'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c5221f] font-bold">•</span>
                      <span><strong>Explicit indexing:</strong> c.Layout.Row = 2; c.Layout.Column = 1;</span>
                    </li>
                  </ul>
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800">
                    Developers had to manually code every array coordinate, padding vectors, and row/column spans.
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Web SaaS Box Model */}
            <div className="bg-white rounded-2xl border border-[#e5e5ea] overflow-hidden shadow-sm p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <div className="rounded-xl overflow-hidden border border-[#e5e5ea] shadow-md bg-zinc-950">
                    <ZoomableImage 
                      src="/assets/ai_code_page_04.webp" 
                      alt="Constraint - Web SaaS is HTML, CSS box model based, showing Chrome DevTools inspecting CAN FD Explorer" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                <div className="lg:col-span-5">
                  <span className="inline-block font-mono text-xs text-[#c5221f] font-semibold tracking-widest uppercase mb-2">
                    02 · Web SaaS Platform
                  </span>
                  <h3 className="font-display text-2xl uppercase tracking-wide text-zinc-900 mb-3">
                    Web SaaS is HTML &amp; CSS Box Model Based
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed mb-4">
                    In cloud-hosted web versions (such as the CAN FD Explorer), interfaces are rendered via the DOM with standard CSS box model properties (margin, border, padding, and fluid sizing like <code className="bg-zinc-100 text-zinc-800 font-mono px-1 py-0.5 rounded text-xs">505.500 x 343.914px</code>).
                  </p>
                  <p className="text-sm text-zinc-600 leading-relaxed mb-4">
                    Web developers naturally inspect layout wrappers and DOJO container attachments, creating an ideological gap between web engineers and MATLAB desktop runtime engineers.
                  </p>
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900">
                    Web DevTools inspect box models, but cannot generate MATLAB component layout objects.
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Figma Dev Mode CSS */}
            <div className="bg-white rounded-2xl border border-[#e5e5ea] overflow-hidden shadow-sm p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <div className="rounded-xl overflow-hidden border border-[#e5e5ea] shadow-md bg-zinc-950">
                    <ZoomableImage 
                      src="/assets/ai_code_page_05.webp" 
                      alt="Constraint - Figma dev mode also is HTML, CSS box model with flexbox code" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                <div className="lg:col-span-5">
                  <span className="inline-block font-mono text-xs text-[#c5221f] font-semibold tracking-widest uppercase mb-2">
                    03 · The Tooling Gap
                  </span>
                  <h3 className="font-display text-2xl uppercase tracking-wide text-zinc-900 mb-3">
                    Figma Dev Mode Only Outputs CSS Box Model
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed mb-4">
                    When designers hand over pixel-perfect layouts, Figma Dev Mode only provides CSS Flexbox properties:
                  </p>
                  <div className="p-3 bg-zinc-900 text-emerald-400 font-mono text-xs rounded-lg mb-4 space-y-1">
                    <div>display: flex;</div>
                    <div>padding: 10px;</div>
                    <div>flex-direction: column;</div>
                    <div>gap: 10px;</div>
                  </div>
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800">
                    MATLAB compilers throw fatal syntax errors on CSS strings. Developers spent 4–6 hours manually converting flex coordinates into uigridlayout objects.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03 THE BREAKTHROUGH: THE ROSETTA STONE (Dark Section) ── */}
      <section className="py-20 border-b border-border-custom bg-black text-white" aria-label="The breakthrough layout equivalence mapping">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="mb-10">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4 font-semibold">03 · The Breakthrough</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.02em] text-white mb-6">
              Drawing <span className="text-accent">Parallels</span>
            </h2>
            <p className="text-base sm:text-lg text-zinc-300 font-light max-w-3xl leading-relaxed">
              Instead of accepting manual conversion as an inevitable cost, I investigated the mathematical primitives of both systems. The conclusion was undeniable: <strong className="text-white font-medium">MATLAB's <code className="text-accent font-mono">uigridlayout</code> and CSS Grid share the exact same mental model</strong>.
            </p>
          </div>

          {/* Approach / Layout Equivalence Standards Table */}
          <div className="rounded-xl overflow-hidden border border-border-custom shadow-2xl bg-[#0a0a0f] mb-12">
            <ZoomableImage 
              src="/assets/ai_code_page_06.webp" 
              alt="Approach - Drawing parallels and creating standards around MATLAB uigridlayout vs Web Layout (HTML / CSS): Rows & Columns = Tracks, Placing Elements, Nested Layouts"
              className="w-full h-auto"
            />
            <div className="p-4 bg-[#12131b] border-t border-border-custom flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-300">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true" />
                Formal Equivalence Standard — Core Concept: Grid Controls Size &amp; Positioning
              </span>
              <span className="text-emerald-400 font-semibold">1:1 Mathematical Syntax Mapping</span>
            </div>
          </div>

          {/* 3 Core Syntactic Mappings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#101018] border border-[#262734] p-6 rounded-xl flex flex-col justify-between">
              <div>
                <span className="px-2.5 py-1 rounded bg-accent/20 text-accent font-mono text-xs font-semibold uppercase mb-4 inline-block">
                  Tracks &amp; Sizing
                </span>
                <h3 className="font-sans text-base font-semibold text-white mb-2">Rows &amp; Columns = Tracks</h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  Fractional units, automatic content fit, and fixed pixels map symmetrically across syntax:
                </p>
                <div className="bg-black/60 p-3 rounded border border-white/10 font-mono text-xs space-y-2">
                  <div className="text-emerald-400">{'\'1x\' = 1fr (Fractional)'}</div>
                  <div className="text-emerald-400">{'\'fit\' = auto (Content)'}</div>
                  <div className="text-emerald-400">{'200 = 200px (Fixed)'}</div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 text-xs font-mono text-zinc-500">
                g.RowHeight ↔ grid-template-rows
              </div>
            </div>

            <div className="bg-[#101018] border border-[#262734] p-6 rounded-xl flex flex-col justify-between">
              <div>
                <span className="px-2.5 py-1 rounded bg-blue-500/20 text-blue-400 font-mono text-xs font-semibold uppercase mb-4 inline-block">
                  Element Placement
                </span>
                <h3 className="font-sans text-base font-semibold text-white mb-2">Row &amp; Column Indices</h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  Component positions correspond directly to grid track coordinates without guesswork:
                </p>
                <div className="bg-black/60 p-3 rounded border border-white/10 font-mono text-xs space-y-2">
                  <div className="text-blue-300">c.Layout.Row = 2;</div>
                  <div className="text-blue-300">c.Layout.Column = 1;</div>
                  <div className="text-zinc-500">↓ maps to ↓</div>
                  <div className="text-emerald-400">grid-row: 2; grid-column: 1;</div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 text-xs font-mono text-zinc-500">
                c.Layout ↔ CSS Grid Items
              </div>
            </div>

            <div className="bg-[#101018] border border-[#262734] p-6 rounded-xl flex flex-col justify-between">
              <div>
                <span className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-400 font-mono text-xs font-semibold uppercase mb-4 inline-block">
                  Sub-Grids
                </span>
                <h3 className="font-sans text-base font-semibold text-white mb-2">Nested Grid Architecture</h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  Multi-pane dialogs nest sub-grids inside parent grid cells cleanly:
                </p>
                <div className="bg-black/60 p-3 rounded border border-white/10 font-mono text-xs space-y-2">
                  <div className="text-purple-300">outer = uigridlayout(fig, [1 2]);</div>
                  <div className="text-purple-300">inner = uigridlayout(outer, [2 1]);</div>
                  <div className="text-zinc-500">↓ maps to ↓</div>
                  <div className="text-emerald-400">&lt;div class="outer grid"&gt;...&lt;/div&gt;</div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 text-xs font-mono text-zinc-500">
                Hierarchical parent-child layout
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 04 THE SOLUTION: FIGMA UI TO MATLAB CODE IN MINUTES (Light Section) ── */}
      <section className="py-20 border-b border-[#e5e5ea] bg-[#f5f5f7] text-[#1d1d1f]" aria-label="The AI-assisted solution workflow">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="mb-10">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#c5221f] mb-4 font-semibold">04 · The Solution</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.02em] text-zinc-900 mb-6">
              Figma UI to MATLAB Code <span className="text-[#c5221f]">in Minutes</span>
            </h2>
            <p className="text-base sm:text-lg text-zinc-700 font-light max-w-3xl leading-relaxed">
              We packaged the equivalence documentation as an enterprise skill document and connected it with Microsoft Copilot. Instead of developers calculating margins, Copilot consumes the Figma design structure and synthesizes syntactically perfect MATLAB <code className="bg-zinc-200 text-[#c5221f] font-mono px-1 py-0.5 rounded text-xs">uigridlayout</code> code.
            </p>
          </div>

          {/* Solution & Outcome UI Blueprint */}
          <div className="rounded-xl overflow-hidden border border-[#e5e5ea] shadow-xl bg-white mb-12">
            <ZoomableImage 
              src="/assets/ai_code_page_07.webp" 
              alt="Solution - Figma UI to MATLAB code in minutes showing AI-assisted UI grid blueprint with hierarchical column and row vectors, pad 10, gap 10, and 70% reduction in coding time" 
              className="w-full h-auto"
            />
            <div className="p-4 bg-zinc-900 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-300">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
                Live Structural Blueprint — Main Grid [2, 1] with Sub-Grid Hierarchies (PAD: 10, GAP: 10)
              </span>
              <span className="text-accent font-semibold">70% Reduction in UI Coding Time</span>
            </div>
          </div>

          {/* 3 Steps of the AI-Assisted Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-[#e5e5ea] p-6 rounded-xl shadow-sm">
              <div className="w-8 h-8 rounded-full bg-red-500/10 text-[#c5221f] flex items-center justify-center font-mono font-bold text-sm mb-4">
                1
              </div>
              <h3 className="font-sans text-base font-semibold text-zinc-900 mb-2">Internal Coding Guide as Skill Document</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Authored a comprehensive Confluence skill document specifying all translation rules, constraints, edge cases, and MATLAB <code className="font-mono text-xs">uigridlayout</code> syntax patterns.
              </p>
            </div>

            <div className="bg-white border border-[#e5e5ea] p-6 rounded-xl shadow-sm">
              <div className="w-8 h-8 rounded-full bg-red-500/10 text-[#c5221f] flex items-center justify-center font-mono font-bold text-sm mb-4">
                2
              </div>
              <h3 className="font-sans text-base font-semibold text-zinc-900 mb-2">Microsoft Copilot Generative Pipeline</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Engineers prompt Copilot with Figma Dev Mode layer attributes. Armed with the skill document, Copilot generates production-ready MATLAB layout files directly.
              </p>
            </div>

            <div className="bg-white border border-[#e5e5ea] p-6 rounded-xl shadow-sm">
              <div className="w-8 h-8 rounded-full bg-red-500/10 text-[#c5221f] flex items-center justify-center font-mono font-bold text-sm mb-4">
                3
              </div>
              <h3 className="font-sans text-base font-semibold text-zinc-900 mb-2">Automated App Designer Compilation</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                The generated grid scripts paste into MATLAB App Designer and compile immediately without regression, missing padding, or misaligned controls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 05 BEFORE VS AFTER TIMELINE (Dark Section) ── */}
      <section className="py-20 border-b border-border-custom bg-black text-white" aria-label="Before versus after sprint comparison">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="mb-10">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4 font-semibold">05 · Sprint Transformation</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.02em] text-white mb-6">
              From Manual Arithmetic <span className="text-accent">to Automated Execution</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Before */}
            <div className="bg-[#0e0e14] border border-[#222230] rounded-xl overflow-hidden flex flex-col justify-between">
              <div>
                <div className="p-4 bg-red-950/40 border-b border-red-900/30 flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-red-400 font-semibold">Legacy Workflow</span>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-3 text-xs text-zinc-300">
                    <span className="font-mono text-zinc-500 font-bold shrink-0">1.</span>
                    <span>Developer manually inspects Figma Dev Mode, copying web flexbox CSS values.</span>
                  </div>
                  <div className="flex items-start gap-3 text-xs text-zinc-300">
                    <span className="font-mono text-zinc-500 font-bold shrink-0">2.</span>
                    <span>Calculates arithmetic vectors for RowHeights and ColumnWidths on paper or scratchpad.</span>
                  </div>
                  <div className="flex items-start gap-3 text-xs text-zinc-300">
                    <span className="font-mono text-zinc-500 font-bold shrink-0">3.</span>
                    <span>Manually types MATLAB coordinate loops and child layout placements.</span>
                  </div>
                  <div className="flex items-start gap-3 text-xs text-zinc-300">
                    <span className="font-mono text-zinc-500 font-bold shrink-0">4.</span>
                    <span>Spends QA sprint fixing off-by-one pixel margins and alignment regressions.</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-red-900/10 border-t border-red-900/20 text-xs font-mono text-red-400">
                ⚠️ High developer fatigue &amp; recurring UI bugs
              </div>
            </div>

            {/* After */}
            <div className="bg-[#0e0e14] border border-accent/40 rounded-xl overflow-hidden flex flex-col justify-between shadow-xl">
              <div>
                <div className="p-4 bg-emerald-950/40 border-b border-emerald-900/30 flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold">AI-Assisted Workflow</span>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-3 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Developer feeds Figma grid structure to Copilot loaded with the Skill Document.</span>
                  </div>
                  <div className="flex items-start gap-3 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Copilot compiles full hierarchical <code className="text-emerald-400 font-mono">uigridlayout</code> definition in seconds.</span>
                  </div>
                  <div className="flex items-start gap-3 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Code is dropped straight into MATLAB App Designer with 100% syntactic correctness.</span>
                  </div>
                  <div className="flex items-start gap-3 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Zero layout regressions; designers and engineers focus on core business logic.</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-emerald-900/10 border-t border-emerald-900/20 text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                70% reduction in coding time across all pilot teams
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 06 DEEPER REFLECTIONS (Light Section) ── */}
      <section className="py-20 bg-[#f5f5f7] text-[#1d1d1f]" aria-label="Lessons learned and systems reflections">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="border-t-4 border-[#ff3b30] pt-10">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#c5221f] mb-4 font-semibold">06 · Deeper Reflections</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.02em] text-[#1d1d1f] mb-8">
              What This Taught Me About <span className="text-[#c5221f]">AI in Design Systems</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-8 bg-white border border-[#e5e5ea] rounded-xl shadow-sm flex flex-col justify-between">
                <div>
                  <div className="font-mono text-xs text-[#c5221f] font-bold tracking-widest uppercase mb-3">Lesson 01</div>
                  <h3 className="font-sans text-base font-bold text-zinc-900 mb-3">Human Systems Mapping Precedes AI Capability</h3>
                  <p className="text-sm text-zinc-600 leading-relaxed font-normal">
                    AI cannot translate what has not been conceptually aligned. Microsoft Copilot only generated flawless MATLAB code because I first established the mathematical equivalents between CSS Grid tracks and <code className="text-zinc-800 font-mono text-xs">uigridlayout</code>. Prompt engineering without architectural mapping is noise.
                  </p>
                </div>
              </div>

              <div className="p-8 bg-white border border-[#e5e5ea] rounded-xl shadow-sm flex flex-col justify-between">
                <div>
                  <div className="font-mono text-xs text-[#c5221f] font-bold tracking-widest uppercase mb-3">Lesson 02</div>
                  <h3 className="font-sans text-base font-bold text-zinc-900 mb-3">Systems UX Design is Mostly Invisible</h3>
                  <p className="text-sm text-zinc-600 leading-relaxed font-normal">
                    No end-user will ever directly see the equivalence formulas in the shipped engineering apps. However, developers feel the 70% speedup, designers witness pixel fidelity, and sprint velocity surges across product releases. The highest-leverage design work often lives between tools.
                  </p>
                </div>
              </div>

              <div className="p-8 bg-white border border-[#e5e5ea] rounded-xl shadow-sm flex flex-col justify-between">
                <div>
                  <div className="font-mono text-xs text-[#c5221f] font-bold tracking-widest uppercase mb-3">Lesson 03</div>
                  <h3 className="font-sans text-base font-bold text-zinc-900 mb-3">Scaling Beyond Screens to Org Standards</h3>
                  <p className="text-sm text-zinc-600 leading-relaxed font-normal">
                    Starting with two high-friction pilot dialogs gave us empirical validation before expanding. Packaging the solution as a reusable skill document allowed teams across MathWorks in the US, Europe, and Asia to self-serve without needing a designer in the loop for every layout sprint.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CASE STUDY METADATA STRIP ── */}
      <div className="py-12 border-t border-border-custom bg-black text-center" aria-label="Case Study Metadata">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <p className="font-mono text-xs tracking-wider uppercase text-zinc-400">
            AI Design-to-Code Pipeline · MATLAB App Designer &amp; Figma · MathWorks
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
