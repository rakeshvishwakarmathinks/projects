import { useEffect } from 'react';
import { PageId } from '../types';
import { AnimatedCounter } from './AnimatedCounter';
import ZoomableImage from './ZoomableImage';
import OpcUaSandbox from './OpcUaSandbox';
import { Play, ExternalLink, RefreshCw, Users, FileSearch, Layers, Compass, CheckCircle2, ArrowRight, Terminal } from 'lucide-react';
import { preloadImages, OPC_UA_IMAGES } from '../utils/imagePreloader';

interface OpcUaCaseStudyProps {
  onPageChange: (page: PageId) => void;
}

export default function OpcUaCaseStudy({ onPageChange }: OpcUaCaseStudyProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
    // Preload all project imagery concurrently immediately upon landing
    preloadImages(OPC_UA_IMAGES, 'high');
  }, []);

  return (
    <main id="main-content" tabIndex={-1} className="pt-24 min-h-screen bg-bg focus:outline-none" aria-label="MathWorks OPC UA Explorer Case Study">
      {/* HERO SECTION */}
      <header className="grid grid-cols-1 md:grid-cols-12 min-h-[72vh] border-b border-border-custom bg-bg">
        {/* Left panel */}
        <div className="md:col-span-7 bg-black text-ink p-8 md:p-16 flex flex-col justify-between relative overflow-hidden">
          {/* Accent strip */}
          <div className="absolute inset-x-0 top-0 h-1 bg-accent"></div>
          
          <div className="z-10 mt-6">
            <button 
              onClick={() => onPageChange('home')}
              className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-wider uppercase text-zinc-300 hover:text-accent mb-6 group transition-colors cursor-pointer py-1.5 px-2 -ml-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            >
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="w-4 h-4 transition-transform group-hover:-translate-x-1">
                <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              All work
            </button>
            <p className="font-mono text-xs tracking-wider uppercase text-accent mb-4 font-semibold">MathWorks · Case Study 1 of 5</p>
            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.08]">
              OPC UA Explorer:<br />
              no-code industrial<br />
              data client
            </h1>
            <p className="text-lg font-light text-ink-2 leading-relaxed max-w-lg">
              From scripting to a no-code industrial data client: turning MATLAB OPC workflows into a point-and-click app that lets engineers browse, read, write, monitor, and visualize live factory data without writing code.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 pt-8 mt-12 border-t border-border-custom z-10">
            <span className="font-mono text-xs tracking-wider uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">MathWorks</span>
            <span className="font-mono text-xs tracking-wider uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">R2024b - R2026a</span>
            <span className="font-mono text-xs tracking-wider uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">Web App</span>
            <span className="font-mono text-xs tracking-wider uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">Role: UX Lead</span>
            <span className="font-mono text-xs tracking-wider uppercase text-zinc-300 py-1.5 px-3 bg-zinc-900 border border-zinc-800 rounded-md">Team: UX · Application Engineers · Product · QE</span>
          </div>
        </div>

        {/* Right panel */}
        <div className="md:col-span-5 bg-bg p-8 md:p-14 flex flex-col justify-end gap-8 relative border-t md:border-t-0 md:border-l border-border-custom">
          <div className="absolute bottom-[-20px] right-[-10px] font-display text-[15rem] leading-none opacity-5 text-ink select-none pointer-events-none">01</div>
          
          {/* Visual Screenshot of the Actual Tool with Video Link */}
          <a 
            href="https://www.mathworks.com/videos/access-opc-ua-process-data-with-opc-ua-explorer-1774852964575.html"
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-full bg-surface rounded-sm aspect-[16/10] overflow-hidden relative border border-border-custom shadow-xl cursor-pointer"
            aria-label="Watch OPC UA Explorer product video on MathWorks (opens in a new tab)"
          >
            <img 
              src="/opcuacasestudy/assets/product/workspace-overview.webp" 
              alt="OPC UA Explorer Live Workspace Screenshot, Watch Video" 
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
            {/* Center Play Button + External Link Symbol */}
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-accent-hover transition-all duration-300 pl-1">
                  <Play className="w-7 h-7 fill-white" />
                </div>
                {/* Hyperlink to another page symbol */}
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-surface text-ink shadow-md flex items-center justify-center border border-border-custom">
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Bottom floating badge */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 bg-black/75 backdrop-blur-sm rounded text-white font-mono text-xs">
              <span className="flex items-center gap-1.5 truncate">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                <span>Watch Product Walkthrough</span>
              </span>
              <span className="flex items-center gap-1 text-white/80 shrink-0">
                <span>Video source - mathworks.com</span>
                <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          </a>

          <div className="grid grid-cols-2 gap-x-6 gap-y-8 z-10">
            <div className="flex flex-col border-b border-border-custom pb-4">
              <div className="font-display text-4xl text-accent leading-none mb-1"><AnimatedCounter value="100%" /></div>
              <div className="font-mono text-xs tracking-wider uppercase text-zinc-400">NO-CODE Workflows</div>
            </div>
            <div className="flex flex-col border-b border-border-custom pb-4">
              <div className="font-display text-4xl text-accent leading-none mb-1"><AnimatedCounter value="AI-Enabled" /></div>
              <div className="font-mono text-xs tracking-wider uppercase text-zinc-400">Allows Agentic Workflows</div>
            </div>
            <div className="flex flex-col border-b border-border-custom pb-4">
              <div className="font-display text-4xl text-accent leading-none mb-1"><AnimatedCounter value="Instant" /></div>
              <div className="font-mono text-xs tracking-wider uppercase text-zinc-400">Live Plotting</div>
            </div>
            <div className="flex flex-col border-b border-border-custom pb-4">
              <div className="font-display text-4xl text-accent leading-none mb-1"><AnimatedCounter value="R2026a" /></div>
              <div className="font-mono text-xs tracking-wider uppercase text-zinc-400">Official Shipped Release</div>
            </div>
          </div>
        </div>
      </header>

      {/* INTUITIVE PULL-QUOTE HOOK BAND */}
      <section className="bg-bg-alt text-ink py-20 border-b border-border-custom" aria-label="Quote Overview">
        <div className="max-w-[1200px] mx-auto px-8 flex gap-6 items-start">
          <span className="font-display text-7xl md:text-8xl text-accent leading-none -mt-4 select-none">&ldquo;</span>
          <div className="space-y-6">
            <p className="font-sans text-xl md:text-3xl font-light text-ink/90 leading-relaxed italic">
              Every OPC UA operation used to require a hand-written MATLAB script. Customers were building throwaway apps just to press &ldquo;read.&rdquo; The shipped app collapses that entire workflow into a point-and-click client: <strong className="text-accent font-normal not-italic">&ldquo;we want something like plug and play.&rdquo;</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ============ OVERVIEW ============ */}
      <section id="overview" className="py-20 border-b border-border-custom bg-bg">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="mb-12 max-w-3xl">
            <p className="font-mono text-xs tracking-wider uppercase text-accent mb-4 font-semibold">Overview</p>
            <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">A no-code client for a code-only workflow</h2>
            
            <div className="my-8">
              <ZoomableImage 
                src="/opcuacasestudy/assets/product/opcua-concept.webp" 
                alt="OPC UA Communication Model" 
                className="w-full h-auto" 
                priority={true}
              />
              <div className="mt-2.5">
                <span className="inline-block font-mono text-xs text-ink-3 bg-bg-alt border border-border-custom rounded-sm py-0.5 px-2.5">
                  Source: OPC Foundation
                </span>
              </div>
            </div>

            <div className="space-y-6 text-lg font-light text-ink-2 leading-relaxed">
              <p>OPC UA is the standard backbone for exchanging data in industrial automation, serving as the protocol that lets a MATLAB session talk to a robotic arm, an excavator, or a placement machine on the factory floor. MathWorks customers could already do all of this from MATLAB. The challenge was heavy scripting required to retrieve data from the hardware.</p>
              <p>The capability existed; the interface didn't. The goal was to make a protocol-heavy, security-sensitive workflow feel like &ldquo;plug and play&rdquo; without dumbing it down for the power users who live in scripts. It <b>shipped in R2026a</b>.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ INTERACTIVE FACTORY SANDBOX (LOCKED COMPONENT: DO NOT ALTER ON GLOBAL STYLE UPDATES) ============ */}
      <OpcUaSandbox />

      {/* ============ CHALLENGE (Apple-style High-Contrast Light Section) ============ */}
      <section id="challenge" className="py-20 border-b border-[#e5e5ea] bg-[#f5f5f7] text-[#1d1d1f]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="mb-12 max-w-3xl">
            <p className="font-mono text-base tracking-[0.2em] uppercase text-[#ff3b30] mb-4 font-semibold">01 · Challenge</p>
            <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 mb-6">Everything was a script</h2>
            <p className="text-lg font-light text-[#48484a] leading-relaxed">
              Every single operation (connect, browse the address space, read a value, write a setpoint, invoke a method) was a separate line of MATLAB you had to write, remember, and debug:
            </p>
          </div>

          {/* Code panel (Apple-style light IDE card) */}
          <div className="bg-white text-[#1d1d1f] rounded-xl border border-[#e5e5ea] overflow-hidden shadow-sm my-8 max-w-3xl">
            <div className="bg-[#fafafc] px-6 py-3.5 border-b border-[#e5e5ea] flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-[#6e6e73] font-semibold">MATLAB Console Commands</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ff3b30]"></span>
                <span className="font-mono text-[11px] text-[#6e6e73] font-medium">Legacy CLI</span>
              </div>
            </div>
            <pre className="p-6 overflow-auto font-mono text-sm leading-relaxed text-[#1d1d1f] bg-white">
              <span className="text-[#86868b] font-semibold">&gt;&gt;</span> uainfo = opcuaserverinfo(<span className="text-[#ff3b30] font-semibold">'Hostname'</span>);<br />
              <span className="text-[#86868b] font-semibold">&gt;&gt;</span> ua     = opcua(uainfo);<br />
              <span className="text-[#86868b] font-semibold">&gt;&gt;</span> ua.connect(<span className="text-[#ff3b30] font-semibold">'username'</span>,<span className="text-[#ff3b30] font-semibold">'12345'</span>)<br />
              <span className="text-[#86868b] font-semibold">&gt;&gt;</span> node   = browseNamespace(ua);<br />
              <span className="text-[#86868b] font-semibold">&gt;&gt;</span> val    = readValue(ua, varNode);<br />
              <span className="text-[#86868b] font-semibold">&gt;&gt;</span>          writeValue(ua, varNode, value);<br />
              <span className="text-[#86868b] font-semibold">&gt;&gt;</span> output = invoke(ua, methodNode, inputArgs);
            </pre>
          </div>

          {/* SVG Diagram Card */}
          <figure className="my-12 bg-white border border-[#e5e5ea] rounded-xl overflow-hidden p-6 md:p-8 shadow-sm">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-[#ff3b30] bg-red-50 border border-red-200 px-2 py-0.5 rounded-xs uppercase tracking-wider">Historical Flow</span>
              </div>
              <h4 className="font-sans text-xl md:text-2xl font-bold tracking-tight text-zinc-900 mb-2">
                The &ldquo;before&rdquo; workflow
              </h4>
              <p className="text-base font-light text-[#48484a]">
                Every OPC UA operation was a separate line of MATLAB, typed, remembered, and debugged by hand in the command window.
              </p>
            </div>

            <div className="w-full overflow-x-auto">
              {/* Inline clean SVG styled for high-contrast light presentation */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 150 2440 470" className="w-full min-w-[1000px] h-auto" fontFamily="'DM Sans', sans-serif" role="img" aria-label="Five-step before workflow">
                <style dangerouslySetInnerHTML={{ __html: `
                  .c-card{fill:#ffffff;stroke:#e5e5ea;stroke-width:1.5}
                  .c-badge{fill:#ff3b30}.c-btxt{fill:#ffffff;font-size:34px;font-weight:700}
                  .c-title{fill:#1d1d1f;font-size:30px;font-weight:700}
                  .c-box{fill:#fafafc;stroke:#e5e5ea;stroke-width:1}
                  .c-code{font-family:'DM Mono',monospace;font-size:23px;fill:#ff3b30;font-weight:600}
                  .c-pr{fill:#86868b;font-weight:500}.c-h1{fill:#1d1d1f;font-size:44px;font-weight:800}
                  .c-sub{fill:#515154;font-size:26px}.c-foot{fill:#515154;font-size:24px;font-style:italic}
                `}} />
                <defs><marker id="ah2-light" markerWidth="12" markerHeight="12" refX="2" refY="6" orient="auto"><path d="M0,0 L12,6 L0,12 Z" fill="#ff3b30"/></marker></defs>
                <rect width="2440" height="640" fill="#f5f5f7" stroke="#e5e5ea" strokeWidth="1" rx="12"/>
                
                {/* Card 1 */}
                <rect className="c-card" x="60" y="170" width="428" height="340" rx="14"/>
                <circle className="c-badge" cx="112" cy="222" r="30"/><text className="c-btxt" x="112" y="234" textAnchor="middle">1</text>
                <text className="c-title" x="158" y="234">Create a client</text>
                <rect className="c-box" x="88" y="278" width="372" height="196" rx="8"/>
                <text className="c-code" x="110" y="322"><tspan className="c-pr">&gt;&gt; </tspan>uainfo =</text>
                <text className="c-code" x="110" y="356">   opcuaserverinfo(</text>
                <text className="c-code" x="110" y="390">   &#39;Hostname&#39;);</text>
                <text className="c-code" x="110" y="440"><tspan className="c-pr">&gt;&gt; </tspan>ua = opcua(uainfo);</text>
                
                {/* Card 2 */}
                <rect className="c-card" x="536" y="170" width="428" height="340" rx="14"/>
                <circle className="c-badge" cx="588" cy="222" r="30"/><text className="c-btxt" x="588" y="234" textAnchor="middle">2</text>
                <text className="c-title" x="634" y="234">Connect</text>
                <rect className="c-box" x="564" y="278" width="372" height="196" rx="8"/>
                <text className="c-code" x="586" y="336"><tspan className="c-pr">&gt;&gt; </tspan>ua.connect(</text>
                <text className="c-code" x="586" y="370">   &#39;username&#39;,</text>
                <text className="c-code" x="586" y="404">   &#39;12345&#39;)</text>
                
                {/* Card 3 */}
                <rect className="c-card" x="1012" y="170" width="428" height="340" rx="14"/>
                <circle className="c-badge" cx="1064" cy="222" r="30"/><text className="c-btxt" x="1064" y="234" textAnchor="middle">3</text>
                <text className="c-title" x="1110" y="234">Browse nodes</text>
                <rect className="c-box" x="1040" y="278" width="372" height="196" rx="8"/>
                <text className="c-code" x="1062" y="352"><tspan className="c-pr">&gt;&gt; </tspan>node =</text>
                <text className="c-code" x="1062" y="386">   browseNamespace(ua);</text>
                
                {/* Card 4 */}
                <rect className="c-card" x="1488" y="170" width="428" height="340" rx="14"/>
                <circle className="c-badge" cx="1540" cy="222" r="30"/><text className="c-btxt" x="1540" y="234" textAnchor="middle">4</text>
                <text className="c-title" x="1586" y="234">Read / Write / Invoke</text>
                <rect className="c-box" x="1516" y="278" width="372" height="196" rx="8"/>
                <text className="c-code" x="1538" y="316"><tspan className="c-pr">&gt;&gt; </tspan>readValue(ua,n);</text>
                <text className="c-code" x="1538" y="350"><tspan className="c-pr">&gt;&gt; </tspan>writeValue(ua,n,v);</text>
                <text className="c-code" x="1538" y="384"><tspan className="c-pr">&gt;&gt; </tspan>invoke(ua,m,args);</text>
                <text className="c-code" x="1538" y="440"><tspan className="c-pr">&gt;&gt; </tspan>subscribe(...)</text>
                
                {/* Card 5 */}
                <rect className="c-card" x="1964" y="170" width="428" height="340" rx="14"/>
                <circle className="c-badge" cx="2016" cy="222" r="30"/><text className="c-btxt" x="2016" y="234" textAnchor="middle">5</text>
                <text className="c-title" x="2062" y="234">Business logic</text>
                <rect className="c-box" x="1992" y="278" width="372" height="196" rx="8"/>
                <text className="c-code" x="2014" y="336">   % your analysis</text>
                <text className="c-code" x="2014" y="370">   % on the node</text>
                <text className="c-code" x="2014" y="404">   % data ...</text>
                
                {/* arrows */}
                <line x1="492" y1="340" x2="530" y2="340" stroke="#ff3b30" strokeWidth="3" markerEnd="url(#ah2-light)"/>
                <line x1="968" y1="340" x2="1006" y2="340" stroke="#ff3b30" strokeWidth="3" markerEnd="url(#ah2-light)"/>
                <line x1="1444" y1="340" x2="1482" y2="340" stroke="#ff3b30" strokeWidth="3" markerEnd="url(#ah2-light)"/>
                <line x1="1920" y1="340" x2="1958" y2="340" stroke="#ff3b30" strokeWidth="3" markerEnd="url(#ah2-light)"/>
                <text x="60" y="588" className="c-foot">No GUI, no visualization: the toolbox had the capability, but no interface. &ldquo;For everything, we need to write commands in MATLAB.&rdquo;</text>
              </svg>
            </div>
          </figure>

          {/* Who we designed for */}
          <div className="mt-16 mb-4">
            <p className="font-mono text-xs tracking-widest uppercase text-[#ff3b30] font-semibold mb-2">Target Personas</p>
            <h3 className="font-sans text-xl md:text-2xl font-bold tracking-tight text-zinc-900 mb-4">Who we designed for</h3>
            <p className="text-base font-light text-[#48484a] leading-relaxed max-w-3xl mb-10">
              We grounded the requirements in four customer personas (David, Elena, Priya, and Liam) spanning the range from &ldquo;already scripts fluently and wants speed&rdquo; to &ldquo;shouldn't have to script at all,&rdquo; plus a process-engineer scenario (&ldquo;John&rdquo;) who needs to diagnose a problem from live and historical data. That spread mattered: we had to serve non-programmers <em>and</em> preserve an escape hatch for the scripting-heavy users who drove the original request.
            </p>
          </div>

          {/* Customer Quotes Unified Panel */}
          <div className="my-8 bg-white border border-[#e5e5ea] rounded-xl overflow-hidden shadow-sm">
            <div className="bg-[#fafafc] px-6 py-4 border-b border-[#e5e5ea] flex items-center justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-[#ff3b30] font-semibold mb-0.5">Voice of the Customer</p>
                <h4 className="font-sans text-base sm:text-lg font-bold tracking-tight text-zinc-900">Unfiltered User Feedback</h4>
              </div>
              <span className="font-mono text-xs text-[#515154] bg-[#f0f0f4] px-3 py-1 border border-[#e5e5ea] rounded-sm font-medium">4 Field Inquiries</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#e5e5ea]">
              <div className="p-6 md:p-8 flex flex-col justify-between md:border-b border-[#e5e5ea] hover:bg-[#fafafc] transition-colors">
                <p className="font-sans text-base font-light italic text-[#333336] leading-relaxed mb-6">
                  &ldquo;For everything, we need to write commands in MATLAB. We want something like plug and play because we are already doing a lot of scripting with the prediction algorithms.&rdquo;
                </p>
                <cite className="font-mono text-xs text-[#ff3b30] uppercase tracking-wider not-italic font-semibold">Customer 1 · Prediction Team</cite>
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-between md:border-b border-[#e5e5ea] hover:bg-[#fafafc] transition-colors">
                <p className="font-sans text-base font-light italic text-[#333336] leading-relaxed mb-6">
                  &ldquo;There are no ready-made OPC UA blocks in App Designer. Functionalities such as OPC UA Read and Write should be ready to use so that we can focus on the task of working with data coming from those blocks.&rdquo;
                </p>
                <cite className="font-mono text-xs text-[#ff3b30] uppercase tracking-wider not-italic font-semibold">Customer 2 · Test Infrastructure</cite>
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-between hover:bg-[#fafafc] transition-colors">
                <p className="font-sans text-base font-light italic text-[#333336] leading-relaxed mb-6">
                  &ldquo;I can deal with our OPC UA server using the command window… Unfortunately, the OPC Data Access Explorer doesn't work because 'The RPC server is not available' always appears. It would be nice to extend the Explorer to allow connections to OPC UA.&rdquo;
                </p>
                <cite className="font-mono text-xs text-[#ff3b30] uppercase tracking-wider not-italic font-semibold">Customer 3 · Plant Operations</cite>
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-between hover:bg-[#fafafc] transition-colors">
                <p className="font-sans text-base font-light italic text-[#333336] leading-relaxed mb-6">
                  &ldquo;I was supporting an Industrial Automation customer and one of their priorities was to visualize the collected data.&rdquo;
                </p>
                <cite className="font-mono text-xs text-[#ff3b30] uppercase tracking-wider not-italic font-semibold">Application Engineer · MathWorks Field Support</cite>
              </div>
            </div>
          </div>

          {/* Key Customer Pain Points Unified Panel */}
          <div className="my-10 bg-white border border-[#e5e5ea] rounded-xl overflow-hidden shadow-sm">
            <div className="bg-[#fafafc] px-6 py-4 border-b border-[#e5e5ea] flex items-center justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-[#ff3b30] font-semibold mb-0.5">Synthesis</p>
                <h4 className="font-sans text-base sm:text-lg font-bold tracking-tight text-zinc-900">Key Customer Pain Points</h4>
              </div>
              <span className="font-mono text-xs text-[#515154] bg-[#f0f0f4] px-3 py-1 border border-[#e5e5ea] rounded-sm font-medium">Prioritized Matrix</span>
            </div>
            <div className="divide-y divide-[#e5e5ea]">
              {[
                { id: "01", title: "Pain Point #1", desc: "Extensive scripting required for every read/write/browse operation." },
                { id: "02", title: "Pain Point #2", desc: "Users building custom App Designer apps just to connect and read/write." },
                { id: "03", title: "Pain Point #3", desc: "Users forced onto the legacy OPC DA Explorer for OPC UA, which fails (cryptic RPC errors)." },
                { id: "04", title: "Pain Point #4", desc: "No built-in way to visualize data while reading it." }
              ].map((item) => (
                <div key={item.id} className="p-5 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center hover:bg-[#fafafc] transition-colors">
                  <div className="md:col-span-1 font-display text-3xl text-[#ff3b30] leading-none font-bold">{item.id}</div>
                  <div className="md:col-span-11">
                    <strong className="text-[#1d1d1f] font-semibold block mb-0.5 text-base">{item.title}</strong>
                    <span className="text-[#515154] font-normal text-base">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROCESS (Apple-style High-Contrast Light Section) ============ */}
      <section id="process" className="py-20 border-b border-[#e5e5ea] bg-[#f5f5f7] text-[#1d1d1f]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="mb-12 max-w-3xl">
            <p className="font-mono text-base tracking-[0.2em] uppercase text-[#ff3b30] mb-4 font-semibold">02 · Process &amp; Research</p>
            <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 mb-6">MathWorks Agile RFAIN Framework &amp; Research</h2>
            <p className="text-lg font-light text-[#48484a] leading-relaxed">
              Designing the OPC UA Explorer followed MathWorks product development methodology: the <strong>RFAIN</strong> framework (Requirements Analysis, Functional Design, Architectural Design, Implementation, and Integration), executed across cross-functional two-week agile sprint cycles with continuous usability feedback.
            </p>
          </div>

          {/* AGILE RFAIN FLOWCHART */}
          <div className="my-16 border border-[#e5e5ea] rounded-xl bg-white overflow-hidden shadow-sm">
            {/* Header bar */}
            <div className="bg-[#fafafc] px-6 py-4 border-b border-[#e5e5ea] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-[#ff3b30] font-semibold mb-0.5">MathWorks Product Development</p>
                <h3 className="font-sans text-lg sm:text-xl font-bold tracking-tight text-zinc-900">Agile RFAIN Framework</h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#515154] bg-[#f0f0f4] px-3 py-1.5 border border-[#e5e5ea] rounded-sm self-start sm:self-auto font-medium">
                <RefreshCw className="w-3.5 h-3.5 text-[#ff3b30] animate-spin" style={{ animationDuration: "8s" }} />
                <span>2-Week Sprints · Continuous Loops</span>
              </div>
            </div>

            {/* 5-Phase Sequential Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-[#e5e5ea]">
              {/* R: Requirements */}
              <div className="p-5 md:p-6 flex flex-col justify-between hover:bg-[#fafafc] transition-colors">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-bold text-[#ff3b30] bg-red-50 border border-red-200 px-2 py-0.5 rounded-xs">Phase R</span>
                    <FileSearch className="w-4 h-4 text-[#ff3b30] shrink-0" />
                  </div>
                  <h4 className="font-sans text-base sm:text-lg font-semibold tracking-tight text-zinc-900 mb-2">Requirements</h4>
                  <p className="text-xs text-[#515154] font-normal leading-relaxed">
                    Customer interviews, technical support ticket mining, persona definition, and user story mapping.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#e5e5ea]">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#6e6e73] block mb-0.5 font-semibold">Deliverable</span>
                  <p className="font-mono text-xs text-[#1d1d1f] font-semibold">PRD &amp; Pain Matrix</p>
                </div>
              </div>

              {/* F: Functional Design */}
              <div className="p-5 md:p-6 flex flex-col justify-between hover:bg-[#fafafc] transition-colors">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-bold text-[#ff3b30] bg-red-50 border border-red-200 px-2 py-0.5 rounded-xs">Phase F</span>
                    <Compass className="w-4 h-4 text-[#ff3b30] shrink-0" />
                  </div>
                  <h4 className="font-sans text-base sm:text-lg font-semibold tracking-tight text-zinc-900 mb-2">Functional</h4>
                  <p className="text-xs text-[#515154] font-normal leading-relaxed">
                    Task flow architecture, low-fidelity wireframes, progressive disclosure rules, and mental models.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#e5e5ea]">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#6e6e73] block mb-0.5 font-semibold">Deliverable</span>
                  <p className="font-mono text-xs text-[#1d1d1f] font-semibold">Wireframes &amp; Flows</p>
                </div>
              </div>

              {/* A: Architectural Design */}
              <div className="p-5 md:p-6 flex flex-col justify-between hover:bg-[#fafafc] transition-colors">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-bold text-[#ff3b30] bg-red-50 border border-red-200 px-2 py-0.5 rounded-xs">Phase A</span>
                    <Layers className="w-4 h-4 text-[#ff3b30] shrink-0" />
                  </div>
                  <h4 className="font-sans text-base sm:text-lg font-semibold tracking-tight text-zinc-900 mb-2">Architecture</h4>
                  <p className="text-xs text-[#515154] font-normal leading-relaxed">
                    MATLAB Toolstrip guidelines, 3-pane dockable layout, plotting buffer, and component hierarchy.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#e5e5ea]">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#6e6e73] block mb-0.5 font-semibold">Deliverable</span>
                  <p className="font-mono text-xs text-[#1d1d1f] font-semibold">UI Architecture Spec</p>
                </div>
              </div>

              {/* I: Implementation */}
              <div className="p-5 md:p-6 flex flex-col justify-between hover:bg-[#fafafc] transition-colors">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-bold text-[#ff3b30] bg-red-50 border border-red-200 px-2 py-0.5 rounded-xs">Phase I</span>
                    <Terminal className="w-4 h-4 text-[#ff3b30] shrink-0" />
                  </div>
                  <h4 className="font-sans text-base sm:text-lg font-semibold tracking-tight text-zinc-900 mb-2">Implementation</h4>
                  <p className="text-xs text-[#515154] font-normal leading-relaxed">
                    Clickable prototypes, sprint engineering pairing, and live protocol backend binding.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#e5e5ea]">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#6e6e73] block mb-0.5 font-semibold">Deliverable</span>
                  <p className="font-mono text-xs text-[#1d1d1f] font-semibold">Functional App Sprints</p>
                </div>
              </div>

              {/* N: Integration */}
              <div className="p-5 md:p-6 flex flex-col justify-between hover:bg-[#fafafc] transition-colors">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-bold text-[#ff3b30] bg-red-50 border border-red-200 px-2 py-0.5 rounded-xs">Phase N</span>
                    <CheckCircle2 className="w-4 h-4 text-[#ff3b30] shrink-0" />
                  </div>
                  <h4 className="font-sans text-base sm:text-lg font-semibold tracking-tight text-zinc-900 mb-2">Integration</h4>
                  <p className="text-xs text-[#515154] font-normal leading-relaxed">
                    Hardware server stress testing, doc alignment, usability validation, and R2026a ship.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#e5e5ea]">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#6e6e73] block mb-0.5 font-semibold">Deliverable</span>
                  <p className="font-mono text-xs text-[#1d1d1f] font-semibold">Production R2026a</p>
                </div>
              </div>
            </div>

            {/* Seamless Feedback Loops Strip */}
            <div className="bg-[#fafafc] border-t border-[#e5e5ea] p-5 md:p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#ff3b30]"></span>
                <span className="font-mono text-xs uppercase tracking-wider text-[#1d1d1f] font-semibold">Iterative Sprint Feedback Loops</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div>
                  <p className="font-mono text-xs text-[#ff3b30] font-semibold mb-1">Loop 1 · Requirements ⇄ Functional</p>
                  <p className="text-xs text-[#515154] font-normal leading-relaxed">
                    Customer interviews repeatedly refined task structures and flows before engineering commits.
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs text-[#ff3b30] font-semibold mb-1">Loop 2 · Functional ⇄ Implementation</p>
                  <p className="text-xs text-[#515154] font-normal leading-relaxed">
                    Usability lab testing with engineers reshaped modal dialogs into persistent, dockable sidebars.
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs text-[#ff3b30] font-semibold mb-1">Loop 3 · Implementation ⇄ Integration</p>
                  <p className="text-xs text-[#515154] font-normal leading-relaxed">
                    Simulated Siemens PLC tests optimized live plotting buffer limits and real-time UI responsiveness.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* PRIMARY RESEARCH & INTERVIEWS */}
          <div className="my-16 border-t border-[#e5e5ea] pt-12">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-7 h-7 text-[#ff3b30]" />
              <h3 className="font-sans text-xl md:text-2xl font-bold tracking-tight text-zinc-900">Primary User Research &amp; Field Inquiries</h3>
            </div>
            <p className="text-base font-light text-[#48484a] leading-relaxed max-w-3xl mb-8">
              We conducted in-depth qualitative user research alongside quantitative support analysis. We interviewed practicing engineers who connect MATLAB to industrial plant systems:
            </p>

            {/* Unified 4-Persona Archetypes Panel */}
            <div className="my-10 bg-white border border-[#e5e5ea] rounded-xl overflow-hidden shadow-sm">
              <div className="bg-[#fafafc] px-6 py-3.5 border-b border-[#e5e5ea] flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-xs uppercase tracking-wider text-[#1d1d1f] font-semibold">Target User Archetypes</span>
                <span className="font-mono text-[11px] text-[#6e6e73] font-medium">Grounded User Personas</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#e5e5ea]">
                {/* Persona 1: David */}
                <div className="p-5 md:p-6 flex flex-col justify-between hover:bg-[#fafafc] transition-colors">
                  <div>
                    <span className="font-mono text-[11px] text-[#ff3b30] uppercase tracking-widest font-bold block mb-1.5">Persona 1 · David</span>
                    <h4 className="font-sans text-base font-semibold text-zinc-900 mb-2">Senior Control Engineer</h4>
                    <p className="text-xs text-[#515154] font-normal leading-relaxed">
                      Fluently scripts in MATLAB but wasted hours debugging connection certificates and endpoint ports. Desired instantaneous status validation.
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-[#e5e5ea]">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#6e6e73] block mb-0.5 font-semibold">Primary Focus</span>
                    <p className="font-mono text-xs text-[#1d1d1f] font-semibold">Zero-friction Connection</p>
                  </div>
                </div>

                {/* Persona 2: Elena */}
                <div className="p-5 md:p-6 flex flex-col justify-between hover:bg-[#fafafc] transition-colors">
                  <div>
                    <span className="font-mono text-[11px] text-[#ff3b30] uppercase tracking-widest font-bold block mb-1.5">Persona 2 · Elena</span>
                    <h4 className="font-sans text-base font-semibold text-zinc-900 mb-2">Automation Specialist</h4>
                    <p className="text-xs text-[#515154] font-normal leading-relaxed">
                      Manages multi-vendor production lines with thousands of tags across Siemens and Rockwell PLCs. Needed quick search and tag grouping.
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-[#e5e5ea]">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#6e6e73] block mb-0.5 font-semibold">Primary Focus</span>
                    <p className="font-mono text-xs text-[#1d1d1f] font-semibold">Scalable Address Space</p>
                  </div>
                </div>

                {/* Persona 3: Priya */}
                <div className="p-5 md:p-6 flex flex-col justify-between hover:bg-[#fafafc] transition-colors">
                  <div>
                    <span className="font-mono text-[11px] text-[#ff3b30] uppercase tracking-widest font-bold block mb-1.5">Persona 3 · Priya</span>
                    <h4 className="font-sans text-base font-semibold text-zinc-900 mb-2">Process Scientist</h4>
                    <p className="text-xs text-[#515154] font-normal leading-relaxed">
                      Domain expert in thermodynamics with no programming background. Needed to visually inspect historical sensor drifts without writing code.
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-[#e5e5ea]">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#6e6e73] block mb-0.5 font-semibold">Primary Focus</span>
                    <p className="font-mono text-xs text-[#1d1d1f] font-semibold">Graphical Historical Trends</p>
                  </div>
                </div>

                {/* Persona 4: Liam */}
                <div className="p-5 md:p-6 flex flex-col justify-between hover:bg-[#fafafc] transition-colors">
                  <div>
                    <span className="font-mono text-[11px] text-[#ff3b30] uppercase tracking-widest font-bold block mb-1.5">Persona 4 · Liam</span>
                    <h4 className="font-sans text-base font-semibold text-zinc-900 mb-2">Test Bench Developer</h4>
                    <p className="text-xs text-[#515154] font-normal leading-relaxed">
                      Builds automated regression benches. Refused any tool that did not export clean, reproducible, version-controllable MATLAB scripts.
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-[#e5e5ea]">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#6e6e73] block mb-0.5 font-semibold">Primary Focus</span>
                    <p className="font-mono text-xs text-[#1d1d1f] font-semibold">Automated Code Generation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Critical Pain Points Unified Panel */}
            <div className="my-12">
              <h4 className="font-sans text-xl font-bold tracking-tight text-zinc-900 mb-6">4 Critical Pain Points Uncovered</h4>
              <div className="bg-white border border-[#e5e5ea] rounded-xl overflow-hidden shadow-sm">
                <div className="bg-[#fafafc] px-6 py-3.5 border-b border-[#e5e5ea] flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#1d1d1f] font-semibold">Field Research Discoveries</span>
                  <span className="font-mono text-[11px] text-[#6e6e73] font-medium">4 Critical Bottlenecks</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 divide-[#e5e5ea]">
                  {/* Pain 1 */}
                  <div className="p-6 md:p-8 md:border-r md:border-b border-[#e5e5ea] flex flex-col justify-between hover:bg-[#fafafc] transition-colors">
                    <div>
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <span className="w-6 h-6 rounded-full bg-red-100 text-[#ff3b30] font-mono font-bold flex items-center justify-center text-xs">1</span>
                        <h5 className="font-sans text-base font-semibold text-zinc-900">Terminal Blindness at Connection</h5>
                      </div>
                      <p className="text-sm font-normal text-[#515154] leading-relaxed mb-4">
                        Engineers were forced to guess server endpoint formats, port numbers, and supported security policies (e.g. <code className="bg-[#f0f0f2] text-[#ff3b30] px-1 py-0.5 rounded font-mono text-xs">Basic256Sha256</code>) in command-line scripts without discovery tools, leading to cryptic protocol handshake failures.
                      </p>
                    </div>
                    <blockquote className="text-xs font-normal text-[#2d2d30] border-l-2 border-[#ff3b30] pl-3 italic bg-[#f5f5f7] py-2 rounded-r">
                      &ldquo;I spend two hours trying to connect to a new PLC just because I cannot see which security mode it accepts.&rdquo;
                    </blockquote>
                  </div>

                  {/* Pain 2 */}
                  <div className="p-6 md:p-8 md:border-b border-[#e5e5ea] flex flex-col justify-between hover:bg-[#fafafc] transition-colors">
                    <div>
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <span className="w-6 h-6 rounded-full bg-red-100 text-[#ff3b30] font-mono font-bold flex items-center justify-center text-xs">2</span>
                        <h5 className="font-sans text-base font-semibold text-zinc-900">Address Space Navigational Paralysis</h5>
                      </div>
                      <p className="text-sm font-normal text-[#515154] leading-relaxed mb-4">
                        Modern factory OPC UA servers publish tens of thousands of nodes. Exploring this via MATLAB CLI arrays (<code className="bg-[#f0f0f2] text-[#ff3b30] px-1 py-0.5 rounded font-mono text-xs">findnode</code>, <code className="bg-[#f0f0f2] text-[#ff3b30] px-1 py-0.5 rounded font-mono text-xs">getchild</code>) was an exhausting trial-and-error process with zero visual context.
                      </p>
                    </div>
                    <blockquote className="text-xs font-normal text-[#2d2d30] border-l-2 border-[#ff3b30] pl-3 italic bg-[#f5f5f7] py-2 rounded-r">
                      &ldquo;I have to print out hundreds of node IDs to the command window to find the one pressure valve I need.&rdquo;
                    </blockquote>
                  </div>

                  {/* Pain 3 */}
                  <div className="p-6 md:p-8 md:border-r border-[#e5e5ea] flex flex-col justify-between hover:bg-[#fafafc] transition-colors">
                    <div>
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <span className="w-6 h-6 rounded-full bg-red-100 text-[#ff3b30] font-mono font-bold flex items-center justify-center text-xs">3</span>
                        <h5 className="font-sans text-base font-semibold text-zinc-900">Absence of Live Signal Verification</h5>
                      </div>
                      <p className="text-sm font-normal text-[#515154] leading-relaxed mb-4">
                        Engineers needed to verify that a signal was active, properly scaled, and transmitting valid data before writing logging routines. Writing custom listener scripts just to preview values was an unnecessary cognitive burden.
                      </p>
                    </div>
                    <blockquote className="text-xs font-normal text-[#2d2d30] border-l-2 border-[#ff3b30] pl-3 italic bg-[#f5f5f7] py-2 rounded-r">
                      &ldquo;I just want to see the temperature line move before I write a 50-line data acquisition script.&rdquo;
                    </blockquote>
                  </div>

                  {/* Pain 4 */}
                  <div className="p-6 md:p-8 flex flex-col justify-between hover:bg-[#fafafc] transition-colors">
                    <div>
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <span className="w-6 h-6 rounded-full bg-red-100 text-[#ff3b30] font-mono font-bold flex items-center justify-center text-xs">4</span>
                        <h5 className="font-sans text-base font-semibold text-zinc-900">The Code Transition Cliff</h5>
                      </div>
                      <p className="text-sm font-normal text-[#515154] leading-relaxed mb-4">
                        Engineers appreciated graphical setup tools but routinely abandoned standalone tools if the configured session could not be converted back into production MATLAB scripts for automated batches.
                      </p>
                    </div>
                    <blockquote className="text-xs font-normal text-[#2d2d30] border-l-2 border-[#ff3b30] pl-3 italic bg-[#f5f5f7] py-2 rounded-r">
                      &ldquo;If a GUI does not give me the code at the end, it is a dead end for our automated test benches.&rdquo;
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FUNCTIONAL & ARCHITECTURAL DECISIONS */}
          <div className="my-16 border-t border-[#e5e5ea] pt-12">
            <h3 className="font-sans text-xl md:text-2xl font-bold tracking-tight text-zinc-900 mb-6">Architectural Decisions &amp; Alternatives Considered</h3>
            <p className="text-base font-light text-[#48484a] leading-relaxed max-w-3xl mb-8">
              Every design choice had to balance technical depth against cognitive simplicity. During sprint reviews, we evaluated and tested several competing layout approaches:
            </p>
            
            {/* Unified Architectural Decisions Panel */}
            <div className="my-10 bg-white border border-[#e5e5ea] rounded-xl overflow-hidden shadow-sm">
              <div className="bg-[#fafafc] px-6 py-3.5 border-b border-[#e5e5ea] flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-[#1d1d1f] font-semibold">Layout Architecture &amp; Sprint Trade-Offs</span>
                <span className="font-mono text-[11px] text-[#6e6e73] font-medium">Design Evaluation</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#e5e5ea]">
                {/* Adopted */}
                <div className="p-6 md:p-8 flex flex-col justify-between hover:bg-[#fafafc] transition-colors">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-display text-xl text-[#1d1d1f] uppercase tracking-wide font-bold">Persistent Node Function Panel</h4>
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-300 font-mono text-[10px] font-bold px-2 py-0.5 rounded uppercase">Adopted · Shipped</span>
                    </div>
                    <p className="text-sm font-normal text-[#2d2d30] leading-relaxed mb-3">
                      <strong>Instead of:</strong> launching modal popup dialogs for each read, historical query, or variable write operation.
                    </p>
                    <p className="text-sm font-normal text-[#515154] leading-relaxed">
                      <strong>Decision rationale:</strong> Modal windows hid the address space context and disrupted workflow continuity. A persistent right-hand sidebar reshapes itself contextually to the selected node, supporting progressive disclosure with zero modal friction.
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-[#e5e5ea] text-xs font-mono text-emerald-800 font-bold">
                    Outcome: Shipped as the unified Node Function &amp; Information panel.
                  </div>
                </div>

                {/* Rejected */}
                <div className="p-6 md:p-8 flex flex-col justify-between hover:bg-[#fafafc] transition-colors">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-display text-xl text-[#1d1d1f] uppercase tracking-wide font-bold">In-Table Inline Editing Columns</h4>
                      <span className="bg-rose-50 text-rose-800 border border-rose-200 font-mono text-[10px] font-bold px-2 py-0.5 rounded uppercase">Rejected Alternative</span>
                    </div>
                    <p className="text-sm font-normal text-[#2d2d30] leading-relaxed mb-3">
                      <strong>Evaluated:</strong> placing editable input fields and write triggers directly inside each row of the monitoring table.
                    </p>
                    <p className="text-sm font-normal text-[#515154] leading-relaxed">
                      <strong>Decision rationale:</strong> Testing proved inline inputs created massive visual clutter and led to accidental write triggers during telemetry scanning. Separating monitoring from write commands preserved clean cognitive hierarchy and plant safety.
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-[#e5e5ea] text-xs font-mono text-rose-800 font-bold">
                    Outcome: Scrapped in favor of dedicated inspection and write controls.
                  </div>
                </div>
              </div>
            </div>

            {/* Progressive Disclosure Callout */}
            <div className="mt-10 bg-white border border-[#e5e5ea] p-6 md:p-8 rounded-xl shadow-sm">
              <h4 className="font-display text-xl text-[#1d1d1f] uppercase tracking-wide mb-3 font-bold">Progressive Disclosure in Protocol Security</h4>
              <p className="text-base font-normal text-[#48484a] leading-relaxed">
                OPC UA security encompasses complex combinations of endpoints, message security modes (<code className="bg-[#f0f0f2] text-[#ff3b30] px-1.5 py-0.5 rounded font-mono text-xs">Sign</code>, <code className="bg-[#f0f0f2] text-[#ff3b30] px-1.5 py-0.5 rounded font-mono text-xs">SignAndEncrypt</code>), and security policies. We designed a dual-tier connection model: a <strong>Configure</strong> step that automatically negotiates and pre-selects the highest encryption standard supported by the server, followed by an intuitive <strong>Connect</strong> dialog presenting a clean single-choice identity selector (Anonymous, Username, Certificate). Novices connect in one click, while enterprise engineers maintain complete control over cryptographic certificates.
              </p>
            </div>
          </div>

          {/* USABILITY TESTING & ITERATIONS */}
          <div className="my-16 border-t border-[#e5e5ea] pt-12">
            <h3 className="font-sans text-xl md:text-2xl font-bold tracking-tight text-zinc-900 mb-6">Usability Lab Validation &amp; Sprint Iterations</h3>
            <p className="text-base font-light text-[#48484a] leading-relaxed max-w-3xl mb-8">
              We conducted task-based usability sessions with 8 industrial engineers using live simulated servers (Siemens S7-1500 and Beckhoff TwinCAT PLC environments). Two key behavioral insights directly reshaped the final product:
            </p>

            {/* Unified Usability Lab Insights Panel */}
            <div className="my-10 bg-white border border-[#e5e5ea] rounded-xl overflow-hidden shadow-sm">
              <div className="bg-[#fafafc] px-6 py-3.5 border-b border-[#e5e5ea] flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-[#1d1d1f] font-semibold">Usability Lab Validation · 8 Industrial Engineers Tested</span>
                <span className="font-mono text-[11px] text-[#6e6e73] font-medium">Siemens &amp; Beckhoff PLCs</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#e5e5ea]">
                {/* Insight 1 */}
                <div className="p-6 md:p-8 flex flex-col justify-between hover:bg-[#fafafc] transition-colors">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-mono text-xs font-bold text-[#ff3b30] px-2 py-0.5 bg-red-50 border border-red-200 rounded-xs uppercase">Insight 1</span>
                      <h4 className="font-sans text-base font-semibold text-zinc-900">Read vs. Subscribe Mental Model</h4>
                    </div>
                    <p className="text-sm font-normal text-[#515154] leading-relaxed mb-3">
                      In early prototypes, engineers confused a one-time synchronous <em>Read</em> with an ongoing live <em>Subscription</em>.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#e5e5ea]">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#ff3b30] font-bold block mb-1">Sprint Iteration</span>
                    <p className="text-xs font-normal text-[#2d2d30] leading-relaxed">
                      Separated them in the hierarchy: <em>Read</em> was kept inside the Node Function sidebar for instant value checks, while <em>Subscribe</em> was tied to the central Node Monitoring Table and Plot pane.
                    </p>
                  </div>
                </div>

                {/* Insight 2 */}
                <div className="p-6 md:p-8 flex flex-col justify-between hover:bg-[#fafafc] transition-colors">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-mono text-xs font-bold text-[#ff3b30] px-2 py-0.5 bg-red-50 border border-red-200 rounded-xs uppercase">Insight 2</span>
                      <h4 className="font-sans text-base font-semibold text-zinc-900">Live Editor Script Bridging</h4>
                    </div>
                    <p className="text-sm font-normal text-[#515154] leading-relaxed mb-3">
                      Engineers loved the generated code but requested that it include the live event callback functions used during subscription monitoring.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#e5e5ea]">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#ff3b30] font-bold block mb-1">Sprint Iteration</span>
                    <p className="text-xs font-normal text-[#2d2d30] leading-relaxed">
                      Enriched the <em>Generate Script</em> engine to output formatted MATLAB Live Editor code with pre-built callback functions, sample timers, and cleanup routines for immediate automation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SOLUTION (Apple-style High-Contrast Light Section) ============ */}
      <section id="solution" className="py-20 border-b border-[#e5e5ea] bg-[#f5f5f7] text-[#1d1d1f]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="mb-12 max-w-3xl">
            <p className="font-mono text-base tracking-[0.2em] uppercase text-[#ff3b30] mb-4 font-semibold">03 · Solution</p>
            <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 mb-6">The Shipped OPC UA Explorer (R2026a)</h2>
            <p className="text-lg font-light text-[#48484a] leading-relaxed">
              Shipped in <strong className="text-[#1d1d1f]">MATLAB R2026a</strong> as part of the Industrial Communication Toolbox, the <strong className="text-[#1d1d1f]">OPC UA Explorer</strong> is a dedicated desktop application accessible from the MATLAB Apps gallery (under <strong className="text-[#1d1d1f]">Test &amp; Measurement</strong>) or via the command line (<code className="bg-[#e5e5ea] px-1.5 py-0.5 rounded font-mono text-base text-[#ff3b30] font-semibold">&gt;&gt; opcuaExplorer</code>). It turns error-prone scripting into an intuitive, guided, no-code workflow.
            </p>
          </div>

          {/* ENTRY POINT */}
          <figure className="bg-white border border-[#e5e5ea] rounded-xl overflow-hidden p-5 shadow-sm max-w-3xl my-8">
            <ZoomableImage src="/opcuacasestudy/assets/product/entry-apps-gallery.webp" alt="OPC UA Explorer in the MATLAB Apps gallery" className="w-full h-auto" />
            <figcaption className="mt-4 text-base font-normal text-[#515154]">
              <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-[9px] font-bold px-2 py-0.5 rounded uppercase mr-2">Production · R2026a</span>
              <strong className="text-[#1d1d1f]">Entry point.</strong> Launches from the MATLAB Apps gallery under <b>Test &amp; Measurement</b> alongside other instrument-control tools, or directly from the MATLAB command prompt.
            </figcaption>
          </figure>

          {/* WORKSPACE & EMPTY STATE */}
          <div className="my-16 border-t border-[#e5e5ea] pt-12">
            <h3 className="font-sans text-lg sm:text-xl font-bold tracking-tight text-zinc-900 mb-4">The Unified 3-Pane Workspace</h3>
            <p className="text-base font-light text-[#48484a] leading-relaxed max-w-3xl mb-8">
              The application layout organizes the entire operational lifecycle without modal disruptions:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base font-normal text-[#515154] max-w-3xl mb-8">
              <li><strong className="text-[#1d1d1f]">Left Pane:</strong> Device List and searchable Address Space tree hierarchy.</li>
              <li><strong className="text-[#1d1d1f]">Center Canvas:</strong> Node Monitoring Table with integrated real-time Plot and Activity Log.</li>
              <li><strong className="text-[#1d1d1f]">Right Pane:</strong> Contextual Node Function panel (Read and Write operations) stacked above the Node Information inspector.</li>
              <li><strong className="text-[#1d1d1f]">Top Toolstrip:</strong> Ergonomic functional sections covering Session, Connection, Node Monitor, and Code Generation.</li>
            </ul>

            <figure className="bg-white border border-[#e5e5ea] rounded-xl overflow-hidden p-5 shadow-sm max-w-3xl my-8">
              <ZoomableImage src="/opcuacasestudy/assets/product/empty-workspace.webp" alt="Empty-state workspace" className="w-full h-auto" />
              <figcaption className="mt-4 text-base font-normal text-[#515154]">
                <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-[9px] font-bold px-2 py-0.5 rounded uppercase mr-2">Production · R2026a</span>
                <strong className="text-[#1d1d1f]">Guided empty state.</strong> Before connection, clear visual cues instruct the user to configure server endpoints, preventing blank-canvas disorientation.
              </figcaption>
            </figure>
          </div>

          {/* CAPABILITY 1: DISCOVER & CONNECT */}
          <div className="my-16 border-t border-[#e5e5ea] pt-12">
            <div className="flex gap-4 items-center mb-6">
              <span className="w-10 h-10 rounded-full bg-[#ff3b30] flex items-center justify-center text-white font-mono font-bold shadow-sm">1</span>
              <h3 className="font-sans text-lg sm:text-xl font-bold tracking-tight text-zinc-900">Connect &amp; Configure: Zero-Friction Security</h3>
            </div>
            <p className="text-base font-light text-[#48484a] leading-relaxed max-w-3xl mb-8">
              The app splits server discovery from identity authentication. Users discover endpoints via a <strong className="text-[#1d1d1f]">Scan</strong> tool, configure security encryption policies with auto-negotiated safe defaults (<code className="bg-[#e5e5ea] px-1.5 py-0.5 rounded font-mono text-xs text-[#ff3b30] font-semibold">SignAndEncrypt : Aes256_Sha256_RsaPss</code>), and authenticate using one unified dialog supporting Anonymous, Username, and Certificate tokens.
            </p>

            {/* Unified 3-Step Connect & Configure Panel */}
            <div className="my-8 bg-white border border-[#e5e5ea] rounded-xl overflow-hidden shadow-sm">
              <div className="bg-[#fafafc] px-6 py-3.5 border-b border-[#e5e5ea] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-[9px] font-bold px-2 py-0.5 rounded uppercase">Production · R2026a</span>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#1d1d1f] font-semibold">Connect &amp; Configure Workflow</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-[#6e6e73] font-medium">
                  <span>1. Discover</span>
                  <span className="text-[#c7c7cc]">→</span>
                  <span>2. Configure</span>
                  <span className="text-[#c7c7cc]">→</span>
                  <span>3. Authenticate</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#e5e5ea]">
                {/* Step 1 */}
                <div className="p-5 flex flex-col justify-between hover:bg-[#fafafc] transition-colors">
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#ff3b30] text-white font-mono text-[11px] font-bold flex items-center justify-center shrink-0">1</span>
                      <h4 className="font-sans text-base font-semibold text-zinc-900">Add Server</h4>
                    </div>
                    <div className="bg-[#f5f5f7] rounded border border-[#e5e5ea] overflow-hidden">
                      <ZoomableImage src="/opcuacasestudy/assets/product/add-server.webp" alt="Add Server dialog in the app" className="w-full h-auto object-contain" />
                    </div>
                  </div>
                  <p className="mt-3 text-xs font-normal text-[#515154] leading-relaxed">
                    Enter host endpoint and port to query available server instances automatically.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="p-5 flex flex-col justify-between hover:bg-[#fafafc] transition-colors">
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#ff3b30] text-white font-mono text-[11px] font-bold flex items-center justify-center shrink-0">2</span>
                      <h4 className="font-sans text-base font-semibold text-zinc-900">Configure</h4>
                    </div>
                    <div className="bg-[#f5f5f7] rounded border border-[#e5e5ea] overflow-hidden">
                      <ZoomableImage src="/opcuacasestudy/assets/product/configure.webp" alt="Configure toolstrip in the shipped app" className="w-full h-auto object-contain" />
                    </div>
                  </div>
                  <p className="mt-3 text-xs font-normal text-[#515154] leading-relaxed">
                    Auto-discovers security policies, defaulting to the strongest encryption standard.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="p-5 flex flex-col justify-between hover:bg-[#fafafc] transition-colors">
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#ff3b30] text-white font-mono text-[11px] font-bold flex items-center justify-center shrink-0">3</span>
                      <h4 className="font-sans text-base font-semibold text-zinc-900">Connect</h4>
                    </div>
                    <div className="bg-[#f5f5f7] rounded border border-[#e5e5ea] overflow-hidden">
                      <ZoomableImage src="/opcuacasestudy/assets/product/connect-dialog.webp" alt="Connect OPC UA Client dialog" className="w-full h-auto object-contain" />
                    </div>
                  </div>
                  <p className="mt-3 text-xs font-normal text-[#515154] leading-relaxed">
                    Single dialog supporting Anonymous, Username, and Certificate tokens without visual clutter.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CAPABILITY 2: ADDRESS SPACE BROWSER */}
          <div className="my-16 border-t border-[#e5e5ea] pt-12">
            <div className="flex gap-4 items-center mb-6">
              <span className="w-10 h-10 rounded-full bg-[#ff3b30] flex items-center justify-center text-white font-mono font-bold shadow-sm">2</span>
              <h3 className="font-sans text-lg sm:text-xl font-bold tracking-tight text-zinc-900">Address Space: Instant Hierarchical Exploration</h3>
            </div>
            <p className="text-base font-light text-[#48484a] leading-relaxed max-w-3xl mb-8">
              Upon connection, the entire server hierarchy populates in the left pane as an interactive, checkable tree. Engineers search tags instantaneously and click <strong className="text-[#1d1d1f]">Add to Table</strong> in the toolstrip to stage specific nodes for monitoring, bypassing cumbersome array indexing.
            </p>

            {/* Unified 2-Step Address Space Panel */}
            <div className="my-8 bg-white border border-[#e5e5ea] rounded-xl overflow-hidden shadow-sm">
              <div className="bg-[#fafafc] px-6 py-3.5 border-b border-[#e5e5ea] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-[9px] font-bold px-2 py-0.5 rounded uppercase">Production · R2026a</span>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#1d1d1f] font-semibold">Address Space Workflow</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-[#6e6e73] font-medium">
                  <span>1. Browse Tree</span>
                  <span className="text-[#c7c7cc]">→</span>
                  <span>2. Stage to Monitoring Table</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#e5e5ea]">
                {/* Step 1 */}
                <div className="p-5 flex flex-col justify-between hover:bg-[#fafafc] transition-colors">
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#ff3b30] text-white font-mono text-[11px] font-bold flex items-center justify-center shrink-0">1</span>
                      <h4 className="font-sans text-base font-semibold text-zinc-900">Populated Tree</h4>
                    </div>
                    <div className="bg-[#f5f5f7] rounded border border-[#e5e5ea] overflow-hidden">
                      <ZoomableImage src="/opcuacasestudy/assets/product/connected-tree.webp" alt="Connected address space tree" className="w-full h-auto object-contain" />
                    </div>
                  </div>
                  <p className="mt-3 text-xs font-normal text-[#515154] leading-relaxed">
                    Hierarchical plant namespaces load immediately with instant search filtering.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="p-5 flex flex-col justify-between hover:bg-[#fafafc] transition-colors">
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#ff3b30] text-white font-mono text-[11px] font-bold flex items-center justify-center shrink-0">2</span>
                      <h4 className="font-sans text-base font-semibold text-zinc-900">Add to Table</h4>
                    </div>
                    <div className="bg-[#f5f5f7] rounded border border-[#e5e5ea] overflow-hidden">
                      <ZoomableImage src="/opcuacasestudy/assets/product/add-to-table.webp" alt="Add selected nodes to the monitoring table" className="w-full h-auto object-contain" />
                    </div>
                  </div>
                  <p className="mt-3 text-xs font-normal text-[#515154] leading-relaxed">
                    Check relevant plant tags and add them directly to the active monitoring canvas.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CAPABILITY 3: READ AND WRITE OPERATIONS */}
          <div className="my-16 border-t border-[#e5e5ea] pt-12">
            <div className="flex gap-4 items-center mb-6">
              <span className="w-10 h-10 rounded-full bg-[#ff3b30] flex items-center justify-center text-white font-mono font-bold shadow-sm">3</span>
              <h3 className="font-sans text-lg sm:text-xl font-bold tracking-tight text-zinc-900">Contextual Node Operations: Read &amp; Write</h3>
            </div>
            <p className="text-base font-light text-[#48484a] leading-relaxed max-w-3xl mb-8">
              Selecting any node opens the persistent <strong className="text-[#1d1d1f]">Node Function</strong> panel on the right. Operators execute synchronous <strong className="text-[#1d1d1f]">Current Value</strong> reads or deep <strong className="text-[#1d1d1f]">Historical Value</strong> extractions with server-side aggregate functions (such as time averages and min/max). The <strong className="text-[#1d1d1f]">Write</strong> tab allows safe setpoint modifications with immediate log verification.
            </p>

            {/* Unified 4-Part Operations Panel */}
            <div className="my-8 bg-white border border-[#e5e5ea] rounded-xl overflow-hidden shadow-sm">
              <div className="bg-[#fafafc] px-6 py-3.5 border-b border-[#e5e5ea] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-[9px] font-bold px-2 py-0.5 rounded uppercase">Production · R2026a</span>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#1d1d1f] font-semibold">Node Operations (Read, History &amp; Write)</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-[#6e6e73] font-medium">
                  <span>1. Current</span>
                  <span className="text-[#c7c7cc]">·</span>
                  <span>2. Historical</span>
                  <span className="text-[#c7c7cc]">·</span>
                  <span>3. Results</span>
                  <span className="text-[#c7c7cc]">·</span>
                  <span>4. Write</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#e5e5ea]">
                {/* Row 1: Left */}
                <div className="p-5 md:border-r md:border-b border-[#e5e5ea] flex flex-col justify-between hover:bg-[#fafafc] transition-colors">
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#ff3b30] text-white font-mono text-[11px] font-bold flex items-center justify-center shrink-0">1</span>
                      <h4 className="font-sans text-base font-semibold text-zinc-900">Read · Current Value</h4>
                    </div>
                    <div className="bg-[#f5f5f7] rounded border border-[#e5e5ea] overflow-hidden">
                      <ZoomableImage src="/opcuacasestudy/assets/product/read-current.webp" alt="Read current value" className="w-full h-auto object-contain" />
                    </div>
                  </div>
                  <p className="mt-3 text-xs font-normal text-[#515154] leading-relaxed">
                    Single-click query returns live value, quality indicator (<code className="bg-[#e5e5ea] px-1 py-0.5 rounded font-mono text-[11px] text-[#ff3b30] font-semibold">Good</code>), and timestamp with Export to Workspace.
                  </p>
                </div>

                {/* Row 1: Right */}
                <div className="p-5 md:border-b border-[#e5e5ea] flex flex-col justify-between hover:bg-[#fafafc] transition-colors">
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#ff3b30] text-white font-mono text-[11px] font-bold flex items-center justify-center shrink-0">2</span>
                      <h4 className="font-sans text-base font-semibold text-zinc-900">Read · Historical</h4>
                    </div>
                    <div className="bg-[#f5f5f7] rounded border border-[#e5e5ea] overflow-hidden">
                      <ZoomableImage src="/opcuacasestudy/assets/product/read-historical.webp" alt="Read historical value" className="w-full h-auto object-contain" />
                    </div>
                  </div>
                  <p className="mt-3 text-xs font-normal text-[#515154] leading-relaxed">
                    Custom date-time range selection with server-side aggregate functions across multiple tags.
                  </p>
                </div>

                {/* Row 2: Left */}
                <div className="p-5 md:border-r border-[#e5e5ea] flex flex-col justify-between hover:bg-[#fafafc] transition-colors">
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#ff3b30] text-white font-mono text-[11px] font-bold flex items-center justify-center shrink-0">3</span>
                      <h4 className="font-sans text-base font-semibold text-zinc-900">Historical Results</h4>
                    </div>
                    <div className="bg-[#f5f5f7] rounded border border-[#e5e5ea] overflow-hidden">
                      <ZoomableImage src="/opcuacasestudy/assets/product/read-historical-result.webp" alt="Historical read result" className="w-full h-auto object-contain" />
                    </div>
                  </div>
                  <p className="mt-3 text-xs font-normal text-[#515154] leading-relaxed">
                    Timestamped series indicating sample quality (<code className="bg-[#e5e5ea] px-1 py-0.5 rounded font-mono text-[11px] text-[#ff3b30] font-semibold">Good (Raw)</code> and <code className="bg-[#e5e5ea] px-1 py-0.5 rounded font-mono text-[11px] text-[#ff3b30] font-semibold">Good (Interpolated)</code>).
                  </p>
                </div>

                {/* Row 2: Right */}
                <div className="p-5 flex flex-col justify-between hover:bg-[#fafafc] transition-colors">
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#ff3b30] text-white font-mono text-[11px] font-bold flex items-center justify-center shrink-0">4</span>
                      <h4 className="font-sans text-base font-semibold text-zinc-900">Write Setpoints</h4>
                    </div>
                    <div className="bg-[#f5f5f7] rounded border border-[#e5e5ea] overflow-hidden">
                      <ZoomableImage src="/opcuacasestudy/assets/product/write.webp" alt="Write to a node" className="w-full h-auto object-contain" />
                    </div>
                  </div>
                  <p className="mt-3 text-xs font-normal text-[#515154] leading-relaxed">
                    Type-validated input fields push new setpoints directly to server registers with instant audit confirmation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CAPABILITY 4: REAL-TIME MONITORING & PLOTTING */}
          <div className="my-16 border-t border-[#e5e5ea] pt-12">
            <div className="flex gap-4 items-center mb-6">
              <span className="w-10 h-10 rounded-full bg-[#ff3b30] flex items-center justify-center text-white font-mono font-bold shadow-sm">4</span>
              <h3 className="font-sans text-lg sm:text-xl font-bold tracking-tight text-zinc-900">Live Telemetry Subscriptions &amp; Real-Time Plotting</h3>
            </div>
            <p className="text-base font-light text-[#48484a] leading-relaxed max-w-3xl mb-8">
              The application establishes event-driven OPC UA subscriptions for all active tags in the table. Incoming data updates values in real time and streams directly into the multi-signal <strong className="text-[#1d1d1f]">Plot</strong> pane, giving engineers instantaneous visual verification of sensor behaviors without requiring custom scripts.
            </p>

            {/* Unified Plotting Panel */}
            <div className="my-8 bg-white border border-[#e5e5ea] rounded-xl overflow-hidden shadow-sm max-w-4xl">
              <div className="bg-[#fafafc] px-6 py-3.5 border-b border-[#e5e5ea] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-[9px] font-bold px-2 py-0.5 rounded uppercase">Production · R2026a</span>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#1d1d1f] font-semibold">Real-Time Signal Streaming</span>
                </div>
              </div>
              <div className="p-5">
                <div className="bg-[#f5f5f7] rounded border border-[#e5e5ea] overflow-hidden">
                  <ZoomableImage src="/opcuacasestudy/assets/product/live-plot.webp" alt="Live plot of monitored node" className="w-full h-auto object-contain" />
                </div>
                <p className="mt-3 text-xs font-normal text-[#515154] leading-relaxed">
                  Signals stream into the monitoring canvas on change events, giving immediate insight into plant dynamics.
                </p>
              </div>
            </div>
          </div>

          {/* CAPABILITY 5: CODE GENERATION */}
          <div className="my-16 border-t border-[#e5e5ea] pt-12">
            <div className="flex gap-4 items-center mb-6">
              <span className="w-10 h-10 rounded-full bg-[#ff3b30] flex items-center justify-center text-white font-mono font-bold shadow-sm">5</span>
              <h3 className="font-sans text-lg sm:text-xl font-bold tracking-tight text-zinc-900">1-Click MATLAB Script Generation</h3>
            </div>
            <p className="text-base font-light text-[#48484a] leading-relaxed max-w-3xl mb-8">
              To ensure power users are never locked into a graphical interface, clicking <strong className="text-[#1d1d1f]">Generate Script</strong> in the toolstrip translates the active session into clean, formatted MATLAB code in the Live Editor, complete with client instantiation, subscription event handlers, and data parsing routines.
            </p>

            {/* Unified Code Generation Panel */}
            <div className="my-8 bg-white border border-[#e5e5ea] rounded-xl overflow-hidden shadow-sm max-w-4xl">
              <div className="bg-[#fafafc] px-6 py-3.5 border-b border-[#e5e5ea] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-[9px] font-bold px-2 py-0.5 rounded uppercase">Production · R2026a</span>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#1d1d1f] font-semibold">MATLAB Script Generation &amp; Export</span>
                </div>
              </div>
              <div className="p-5">
                <div className="bg-[#f5f5f7] rounded border border-[#e5e5ea] overflow-hidden">
                  <ZoomableImage src="/opcuacasestudy/assets/product/generated-script.webp" alt="Generated MATLAB script in the Live Editor" className="w-full h-auto object-contain" />
                </div>
                <p className="mt-3 text-xs font-normal text-[#515154] leading-relaxed">
                  The session graduates into a modular, version-controllable MATLAB script ready for batch automation.
                </p>
              </div>
            </div>
          </div>

          {/* CAPABILITY 6: OBSERVABILITY & LOGGING */}
          <div className="my-16 border-t border-[#e5e5ea] pt-12">
            <div className="flex gap-4 items-center mb-6">
              <span className="w-10 h-10 rounded-full bg-[#ff3b30] flex items-center justify-center text-white font-mono font-bold shadow-sm">6</span>
              <h3 className="font-sans text-lg sm:text-xl font-bold tracking-tight text-zinc-900">Human-Readable Activity Log &amp; Metadata Inspection</h3>
            </div>
            <p className="text-base font-light text-[#48484a] leading-relaxed max-w-3xl mb-8">
              Every operation produces timestamped entries in the <strong className="text-[#1d1d1f]">Activity Log</strong>, converting obscure network socket codes into actionable diagnostic messages. Below it, the <strong className="text-[#1d1d1f]">Node Information</strong> inspector exposes critical server metadata including NodeClass, DataType, and Historizing capabilities.
            </p>

            {/* Unified 2-Step Observability Panel */}
            <div className="my-8 bg-white border border-[#e5e5ea] rounded-xl overflow-hidden shadow-sm">
              <div className="bg-[#fafafc] px-6 py-3.5 border-b border-[#e5e5ea] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-[9px] font-bold px-2 py-0.5 rounded uppercase">Production · R2026a</span>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#1d1d1f] font-semibold">Diagnostics &amp; Metadata Inspection</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-[#6e6e73] font-medium">
                  <span>1. Activity Log</span>
                  <span className="text-[#c7c7cc]">→</span>
                  <span>2. Node Information Inspector</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#e5e5ea]">
                {/* Step 1 */}
                <div className="p-5 flex flex-col justify-between hover:bg-[#fafafc] transition-colors">
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#ff3b30] text-white font-mono text-[11px] font-bold flex items-center justify-center shrink-0">1</span>
                      <h4 className="font-sans text-base font-semibold text-zinc-900">Activity Log</h4>
                    </div>
                    <div className="bg-[#f5f5f7] rounded border border-[#e5e5ea] overflow-hidden">
                      <ZoomableImage src="/opcuacasestudy/assets/product/activity-log.webp" alt="Activity log tab" className="w-full h-auto object-contain" />
                    </div>
                  </div>
                  <p className="mt-3 text-xs font-normal text-[#515154] leading-relaxed">
                    A timestamped audit log detailing connections, reads, writes, and subscription status updates.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="p-5 flex flex-col justify-between hover:bg-[#fafafc] transition-colors">
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#ff3b30] text-white font-mono text-[11px] font-bold flex items-center justify-center shrink-0">2</span>
                      <h4 className="font-sans text-base font-semibold text-zinc-900">Node Information</h4>
                    </div>
                    <div className="bg-[#f5f5f7] rounded border border-[#e5e5ea] overflow-hidden">
                      <ZoomableImage src="/opcuacasestudy/assets/product/node-info.webp" alt="Node Information inspector attributes list" className="w-full h-auto object-contain" />
                    </div>
                  </div>
                  <p className="mt-3 text-xs font-normal text-[#515154] leading-relaxed">
                    Live inspector detailing BrowsePath, Identifier, AccessLevel, and ServerDataType.
                  </p>
                </div>
              </div>
            </div>

            {/* Unified Full Workspace Overview Panel */}
            <div className="my-8 bg-white border border-[#e5e5ea] rounded-xl overflow-hidden shadow-sm max-w-4xl">
              <div className="bg-[#fafafc] px-6 py-3.5 border-b border-[#e5e5ea] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-[9px] font-bold px-2 py-0.5 rounded uppercase">Production · R2026a</span>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#1d1d1f] font-semibold">The Full Workspace in Action</span>
                </div>
              </div>
              <div className="p-5">
                <div className="bg-[#f5f5f7] rounded border border-[#e5e5ea] overflow-hidden">
                  <ZoomableImage src="/opcuacasestudy/assets/product/workspace-overview.webp" alt="Full workspace with live monitoring" className="w-full h-auto object-contain" />
                </div>
                <p className="mt-3 text-xs font-normal text-[#515154] leading-relaxed">
                  Seamless integration across tree browsing, real-time plotting, node configuration, and session logging.
                </p>
              </div>
            </div>
          </div>

          {/* FEATURE COVERAGE TABLE */}
          <div className="my-16 border-t border-[#e5e5ea] pt-12">
            <h3 className="font-sans text-lg sm:text-xl font-bold tracking-tight text-zinc-900 mb-4">Production Feature Coverage (R2026a)</h3>
            <div className="my-8 overflow-x-auto border border-[#e5e5ea] rounded-xl bg-white shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#e5e5ea] bg-[#fafafc] font-mono text-xs uppercase text-[#6e6e73] font-semibold">
                    <th className="p-4">Req</th>
                    <th className="p-4">Shipped Capability</th>
                    <th className="p-4">Customer Pain Addressed</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5e5ea] text-sm font-normal text-[#515154]">
                  {[
                    { r: "R1", cap: "Configure & connect to a server (Anonymous, Username, Certificate)", pain: "Pain 1: Terminal Blindness & Protocol Friction", status: "Shipped R2026a" },
                    { r: "R2", cap: "Browse & search hierarchical address space with instant filtering", pain: "Pain 2: Address Space Navigational Paralysis", status: "Shipped R2026a" },
                    { r: "R3", cap: "Synchronous Read (current & historical aggregates) and safe Write", pain: "Pain 1 & Pain 3: Data Inspection Friction", status: "Shipped R2026a" },
                    { r: "R4", cap: "Event-driven subscriptions with real-time multi-signal plotting", pain: "Pain 3: Absence of Live Signal Verification", status: "Shipped R2026a" },
                    { r: "R5", cap: "1-click export to runnable MATLAB script in Live Editor", pain: "Pain 4: The Code Transition Cliff", status: "Shipped R2026a" },
                    { r: "R6", cap: "Plain-language Activity Log audit trail and node metadata inspection", pain: "Pain 1 & Pain 2: Debugging Diagnostics", status: "Shipped R2026a" }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#fafafc] transition-colors">
                      <td className="p-4 font-mono font-bold text-[#ff3b30]">{row.r}</td>
                      <td className="p-4 font-semibold text-[#1d1d1f]">{row.cap}</td>
                      <td className="p-4 text-[#515154]">{row.pain}</td>
                      <td className="p-4">
                        <span className="inline-block font-mono text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-semibold">{row.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm font-mono text-[#6e6e73] mt-2">
              Note: Remote method node execution (Invoke) and session file persistence are roadmap features currently supported via the MATLAB command line.
            </p>
          </div>
        </div>
      </section>

      {/* ============ IMPACT (Apple-style High-Contrast Light Section) ============ */}
      <section id="impact" className="py-20 border-b border-[#e5e5ea] bg-[#f5f5f7] text-[#1d1d1f]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="mb-12 max-w-3xl">
            <p className="font-mono text-base tracking-[0.2em] uppercase text-[#ff3b30] mb-4 font-semibold">04 · Impact</p>
            <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 mb-6">Shipped and demonstrated in the wild</h2>
            <p className="text-lg font-light text-[#48484a] leading-relaxed">
              The design shipped in <b>R2026a</b> as a released feature of the Industrial Communication Toolbox. This was the strongest possible outcome for work that started as an internal proposal: it cleared design review, got built, and is now documented and demonstrated as a supported product.
            </p>
          </div>

          <div className="bg-white text-[#1d1d1f] p-8 md:p-12 rounded-xl border border-[#e5e5ea] shadow-sm my-12">
            <p className="font-mono text-base tracking-widest text-[#ff3b30] uppercase mb-2 font-semibold">Walkthrough Scenario</p>
            <h3 className="text-[#1d1d1f] text-2xl md:text-3xl mb-6 font-display tracking-wider uppercase font-bold">A real-world monitoring scenario</h3>
            <p className="text-base font-normal text-[#333336] leading-relaxed mb-6">
              The <a href="https://www.mathworks.com/videos/access-opc-ua-process-data-with-opc-ua-explorer-1774852964575.html" target="_blank" rel="noopener noreferrer" className="text-[#ff3b30] underline hover:text-[#ff5247] font-semibold">product video</a> makes the payoff concrete. It walks through a <b>simulated milk-production facility</b> whose OPC UA server exposes a full plant hierarchy: <code className="bg-[#f0f0f2] text-[#ff3b30] px-1.5 py-0.5 rounded font-mono text-base">Dairy Plant → Storage → Tank2 → Temperature_C</code>, a <code className="bg-[#f0f0f2] text-[#ff3b30] px-1.5 py-0.5 rounded font-mono text-base">CoolingSystem</code> with <code className="bg-[#f0f0f2] text-[#ff3b30] px-1.5 py-0.5 rounded font-mono text-base">ChillerActive</code>, and more.
            </p>
            <p className="text-base font-normal text-[#333336] leading-relaxed">
              An engineer connects, drills into the temperature node, reads it live, pulls a <b>historical range</b> (with per-sample <code className="bg-[#f0f0f2] text-[#ff3b30] px-1.5 py-0.5 rounded font-mono text-base">Good (Raw)</code>/<code className="bg-[#f0f0f2] text-[#ff3b30] px-1.5 py-0.5 rounded font-mono text-base">Good (Interpolated)</code> quality), exports the series to MATLAB, and generates the equivalent script from that same session.
            </p>
          </div>

          <p className="text-base font-normal text-[#48484a] leading-relaxed max-w-3xl my-6">
            That end-to-end story is the case study's thesis made real: the same person who used to hand-write every line now connects, browses, reads, plots, and exports with no code, and <em>still</em> walks away with a reusable script. The four original pains map cleanly onto what the released app does:
          </p>

          <div className="my-8 overflow-x-auto border border-[#e5e5ea] rounded-xl bg-white shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#e5e5ea] bg-[#fafafc] font-mono text-base uppercase text-[#515154]">
                  <th className="p-4">Original pain</th>
                  <th className="p-4">How the shipped app answers it</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e5ea] text-base font-normal text-[#2d2d30]">
                {[
                  { pain: "#1 Extensive scripting for every operation", ans: "Point-and-click connect / browse / read / write / monitor" },
                  { pain: "#2 Throwaway custom App Designer apps", ans: "Read, write, and visualization are built in; no app to build" },
                  { pain: "#3 Forced onto the failing OPC DA Explorer", ans: "A supported, native OPC UA path with a readable activity log" },
                  { pain: "#4 No way to see data as it arrives", ans: "Subscribe-and-plot live monitoring, plus historical & aggregated reads" }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#fafafc]">
                    <td className="p-4 font-mono text-base font-bold text-[#ff3b30]">{row.pain}</td>
                    <td className="p-4 text-[#1d1d1f] font-medium">{row.ans}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="font-display text-2xl md:text-3xl text-[#1d1d1f] uppercase tracking-wide mt-12 mb-4 font-bold">What I'll keep watching, post-launch</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
            <div className="p-6 bg-white border border-[#e5e5ea] hover:border-[#ff3b30] transition-all rounded-xl shadow-sm">
              <span className="font-mono text-base text-[#ff3b30] uppercase block mb-3 font-semibold">Adoption</span>
              <h4 className="font-bold text-[#1d1d1f] text-base mb-2">Adoption vs. the old script workflow</h4>
              <p className="text-base font-normal text-[#515154] leading-relaxed">do teams that were scripting actually switch, and for which tasks?</p>
            </div>
            <div className="p-6 bg-white border border-[#e5e5ea] hover:border-[#ff3b30] transition-all rounded-xl shadow-sm">
              <span className="font-mono text-base text-[#ff3b30] uppercase block mb-3 font-semibold">Efficiency</span>
              <h4 className="font-bold text-[#1d1d1f] text-base mb-2">Task-completion &amp; time-on-task</h4>
              <p className="text-base font-normal text-[#515154] leading-relaxed">for the core loop (connect → browse → read/monitor → export), no-code vs. hand-written.</p>
            </div>
            <div className="p-6 bg-white border border-[#e5e5ea] hover:border-[#ff3b30] transition-all rounded-xl shadow-sm">
              <span className="font-mono text-base text-[#ff3b30] uppercase block mb-3 font-semibold">Bets</span>
              <h4 className="font-bold text-[#1d1d1f] text-base mb-2">The two riskiest design bets</h4>
              <p className="text-base font-normal text-[#515154] leading-relaxed">(below), examining whether real users read them the way the design intended.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ REFLECTION (Apple-style High-Contrast Section) ============ */}
      <section id="reflection" className="py-20 bg-white text-[#1d1d1f] border-b border-[#e5e5ea]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="border-t-4 border-[#ff3b30] pt-10">
            <p className="font-mono text-base tracking-[0.2em] uppercase text-[#ff3b30] mb-4 font-semibold">05 · Reflection</p>
            <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 mb-6">What I'd carry forward</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-8 text-base font-normal text-[#333336] leading-relaxed space-y-6">
                <p>
                  The strongest design lever here wasn't a screen; it was a <b>framing decision</b>: build the GUI for <em>workflows</em>, not for the API. Customers didn't want a button for every function; they wanted the <em>job</em> (get data, see it, take it back to code) to be effortless, with an escape hatch to code for when they outgrow the GUI. Holding that line is what set the priorities: a persistent operations panel over modal churn, a live subscription over a rigid record-and-stop flow, and history-with-aggregation kept inside the GUI so no one drops back to scripting to answer &ldquo;what happened over the last few days?&rdquo;
                </p>
                <p>
                  I'll also own where my first instinct was wrong: I initially argued <em>against</em> a persistent node-functions panel, worried it would break progressive disclosure. Design review found the better answer (an empty &ldquo;select a node&rdquo; state), and that's what shipped. Good process beat my first draft.
                </p>
                <p>
                  <b>What I'll keep watching now that it's live:</b> whether the Current/Historical split (with the Aggregate option tucked inside history) reads cleanly or hides too much, and whether the Configure→Connect handoff feels like two clean steps or one confusing one. Those are the two places the &ldquo;plug and play&rdquo; promise is most at risk, and the first things I'd instrument in real usage.
                </p>
              </div>

              <div className="md:col-span-4 space-y-4">
                <div className="bg-[#f5f5f7] border border-[#e5e5ea] p-6 rounded-xl shadow-sm">
                  <div className="font-mono text-base text-[#ff3b30] tracking-widest uppercase mb-3 font-semibold">Workflow Focus</div>
                  <h4 className="text-[#1d1d1f] text-base font-bold mb-2">No-Code Jobs first</h4>
                  <p className="text-base font-normal text-[#515154] leading-relaxed">Prioritizing real industrial operator goals rather than simply converting code APIs to UI controls.</p>
                </div>
                <div className="bg-[#f5f5f7] border border-[#e5e5ea] p-6 rounded-xl shadow-sm">
                  <div className="font-mono text-base text-[#ff3b30] tracking-widest uppercase mb-3 font-semibold">Peer Reviews</div>
                  <h4 className="text-[#1d1d1f] text-base font-bold mb-2">Collaborative Design</h4>
                  <p className="text-base font-normal text-[#515154] leading-relaxed">Relying on collaborative review patterns to refine progressive disclosure and avoid modular visual clutter.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MATHWORKS OFFICIAL DOCUMENTATION & RESOURCES */}
      <section className="py-20 border-t border-border-custom bg-bg" aria-label="MathWorks Documentation">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="bg-bg-alt border border-border-custom p-8 md:p-12 rounded-sm relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-3 max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent font-medium">Official Documentation</p>
              <h3 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white">
                MathWorks Documentation
              </h3>
              <p className="text-base text-ink-2 font-light leading-relaxed">
                Read the official MathWorks documentation for <strong>OPC UA Explorer</strong> in the Industrial Communication Toolbox to explore supported server configurations, node management, and step-by-step workflow tutorials.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full sm:w-auto">
              <a
                href="https://www.mathworks.com/help/icomm/ug/opcuaexplorer-app.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white px-6 py-3.5 rounded-sm font-mono text-base uppercase tracking-wider transition-colors font-medium group"
              >
                <span>MathWorks Documentation</span>
                <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="https://www.mathworks.com/videos/access-opc-ua-process-data-with-opc-ua-explorer-1774852964575.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-surface hover:bg-surface-2 text-ink px-6 py-3.5 rounded-sm font-mono text-base uppercase tracking-wider transition-colors border border-border-custom group"
              >
                <Play className="w-4 h-4 fill-current text-accent" />
                <span>Product Video</span>
                <ExternalLink className="w-3.5 h-3.5 text-ink-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CASE STUDY METADATA STRIP ── */}
      <div className="py-12 border-t border-border-custom bg-black text-center">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <p className="font-mono text-xs tracking-wider uppercase text-zinc-400">
            OPC UA Explorer · MATLAB Industrial Communication Toolbox · UX Case Study
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
              onClick={() => onPageChange('dream11')}
              className="font-sans text-2xl md:text-3xl font-bold tracking-tight text-white hover:text-accent flex items-center gap-4 text-left md:text-right group transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg p-1 -mr-1"
              aria-label="Next Case Study: Dream11 One-Click Player Removal"
            >
              <span>One-Click Player Removal · Dream11</span>
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
