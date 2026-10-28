/**
 * ============================================================================
 * LOCKED COMPONENT: Motor Parameter Estimator Digital Twin Sandbox Prototype
 * ============================================================================
 * IMPORTANT: This component and its visual styling, layout, procedural shapes,
 * animations, and telemetry interactions are LOCKED.
 *
 * DO NOT modify, restyle, re-theme, or adapt this component or its internal
 * CSS/Tailwind classes during global website style guide updates.
 * Only modify this file if the user explicitly requests changes to this specific
 * sandbox/game prototype.
 * ============================================================================
 */

import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Play, Pause } from 'lucide-react';

type TargetMotorId = 'evtol' | 'bly341d' | 'bly172s';

interface MotorProfile {
  id: TargetMotorId;
  name: string;
  speedKmh: number;
  rpm: number;
  voltage: string;
  tagText: string;
  fluxDensity: number;
  residualError: number;
  Rs: number;
  Ld: number;
  Lq: number;
  Ke: number;
  J: number;
  B: number;
}

const MOTOR_PROFILES: Record<TargetMotorId, MotorProfile> = {
  evtol: {
    id: 'evtol',
    name: 'AeroDrive eVTOL-200 (120V)',
    speedKmh: 74,
    rpm: 2424,
    voltage: '120V',
    tagText: 'EV-TAXI CRUISE • 74 km/h',
    fluxDensity: 1.99,
    residualError: 1.52,
    Rs: 0.14,
    Ld: 0.35,
    Lq: 0.42,
    Ke: 14.2,
    J: 1150,
    B: 78,
  },
  bly341d: {
    id: 'bly341d',
    name: 'Anaheim BLY341D (48V)',
    speedKmh: 48,
    rpm: 1576,
    voltage: '48V',
    tagText: 'BLY341D E-BIKE • 48 km/h',
    fluxDensity: 1.32,
    residualError: 1.00,
    Rs: 0.32,
    Ld: 0.85,
    Lq: 0.92,
    Ke: 9.4,
    J: 680,
    B: 54,
  },
  bly172s: {
    id: 'bly172s',
    name: 'Anaheim BLY172S (24V)',
    speedKmh: 40,
    rpm: 1315,
    voltage: '24V',
    tagText: 'BLY172S SCOOTER • 40 km/h',
    fluxDensity: 0.81,
    residualError: 1.00,
    Rs: 0.85,
    Ld: 1.2,
    Lq: 1.3,
    Ke: 5.8,
    J: 240,
    B: 32,
  },
};

interface ParamItem {
  key: 'Rs' | 'Ld' | 'Lq' | 'Ke' | 'J' | 'B';
  symbol: string;
  name: string;
  unit: string;
  enabled: boolean;
  value: number;
}

export default function MotorParameterSandbox() {
  const [selectedTarget, setSelectedTarget] = useState<TargetMotorId>('evtol');
  const [isEstimating, setIsEstimating] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [currentResidual, setCurrentResidual] = useState(1.52);
  const [sweepProgress, setSweepProgress] = useState(70);

  // Responsive canvas scale tracking
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const [canvasScale, setCanvasScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (canvasWrapperRef.current) {
        const containerWidth = canvasWrapperRef.current.clientWidth;
        if (containerWidth < 840 && containerWidth > 0) {
          setCanvasScale(containerWidth / 840);
        } else {
          setCanvasScale(1);
        }
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeProfile = MOTOR_PROFILES[selectedTarget];

  // Parameter State Map
  const [paramMap, setParamMap] = useState<Record<string, ParamItem>>({
    Rs: { key: 'Rs', symbol: 'Rs', name: 'Phase resistance', unit: 'Ω', enabled: true, value: 0.14 },
    Ld: { key: 'Ld', symbol: 'Ld', name: 'Direct-axis inductance', unit: 'mH', enabled: true, value: 0.35 },
    Lq: { key: 'Lq', symbol: 'Lq', name: 'Quadrature-axis inductance', unit: 'mH', enabled: true, value: 0.42 },
    Ke: { key: 'Ke', symbol: 'Ke', name: 'Back-EMF constant', unit: 'V/krpm', enabled: true, value: 14.2 },
    J: { key: 'J', symbol: 'J', name: 'Rotor inertia', unit: 'g·cm²', enabled: true, value: 1150 },
    B: { key: 'B', symbol: 'B', name: 'Viscous friction', unit: 'μN·m·s', enabled: true, value: 78 },
  });

  // When dropdown selection changes, sync parameters
  useEffect(() => {
    const p = MOTOR_PROFILES[selectedTarget];
    setParamMap({
      Rs: { key: 'Rs', symbol: 'Rs', name: 'Phase resistance', unit: 'Ω', enabled: true, value: p.Rs },
      Ld: { key: 'Ld', symbol: 'Ld', name: 'Direct-axis inductance', unit: 'mH', enabled: true, value: p.Ld },
      Lq: { key: 'Lq', symbol: 'Lq', name: 'Quadrature-axis inductance', unit: 'mH', enabled: true, value: p.Lq },
      Ke: { key: 'Ke', symbol: 'Ke', name: 'Back-EMF constant', unit: 'V/krpm', enabled: true, value: p.Ke },
      J: { key: 'J', symbol: 'J', name: 'Rotor inertia', unit: 'g·cm²', enabled: true, value: p.J },
      B: { key: 'B', symbol: 'B', name: 'Viscous friction', unit: 'μN·m·s', enabled: true, value: p.B },
    });
    setCurrentResidual(p.residualError);
  }, [selectedTarget]);

  // Live Simulation loop (jitter & scope sweep)
  useEffect(() => {
    if (!isEstimating || isPaused) return;

    const interval = setInterval(() => {
      setSweepProgress((prev) => (prev >= 98 ? 80 : prev + 0.5));
      const enabledCount = (Object.values(paramMap) as ParamItem[]).filter((x) => x.enabled).length;
      const baseVal =
        enabledCount === 6
          ? activeProfile.residualError
          : activeProfile.residualError + (6 - enabledCount) * 0.45;
      const microJitter = (Math.random() - 0.5) * 0.04;
      setCurrentResidual(parseFloat((baseVal + microJitter).toFixed(2)));
    }, 150);

    return () => clearInterval(interval);
  }, [isEstimating, isPaused, paramMap, activeProfile]);

  const toggleParam = (key: string) => {
    setParamMap((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        enabled: !prev[key].enabled,
      },
    }));
  };

  const updateParamValue = (key: string, val: number) => {
    setParamMap((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        value: val,
      },
    }));
  };

  // Rotation duration based on active RPM
  const rotorDuration = Math.max(0.18, (60.0 / activeProfile.rpm) * 14.0);
  // Parallax scenery scroll speed
  const landscapeDuration = Math.max(2.5, (60.0 / activeProfile.speedKmh) * 6.0);

  return (
    <section id="motor-sandbox" className="py-12 sm:py-16 md:py-20 border-b border-[#e5e5ea] bg-[#f8fafc]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10 max-w-3xl">
          <p className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-[#c5221f] mb-2 sm:mb-3 font-semibold">
            Interactive Digital Twin · Hardware-In-The-Loop
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-wide text-zinc-900 mb-2 sm:mb-3 uppercase">
            Live Motor Parameter Estimation &amp; Twin Observer
          </h2>
          <p className="text-sm sm:text-base md:text-lg font-light text-zinc-600 leading-relaxed">
            Experience the electromagnetic digital twin calibration workflow used across next-gen EVs and aerospace drivetrains. Inspect how low-level resistance, inductance, and back-EMF constants directly converge to stabilize real-time vehicle dynamics.
          </p>
        </div>

        {/* The Exact Pixel-Matched Card Container */}
        <div className="w-full max-w-[840px] bg-white rounded-2xl sm:rounded-[28px] shadow-[0_10px_35px_-5px_rgba(0,0,0,0.07),0_2px_10px_rgba(0,0,0,0.04)] border border-[#e2e8f0] overflow-hidden select-none">
          
          {/* ================= TOP STATUS TELEMETRY DECK ================= */}
          <div className="grid grid-cols-3 py-4 sm:py-6 px-3 sm:px-6 md:px-12 bg-white border-b border-[#f1f5f9] text-center">
            <div className="px-1">
              <p className="text-xs sm:text-sm font-medium text-[#64748b] mb-1">
                Residual Error
              </p>
              <h3 className="text-base sm:text-lg font-bold text-[#1e293b] tracking-tight">
                {isEstimating ? `${currentResidual.toFixed(2)}%` : '--'}
              </h3>
            </div>
            <div className="px-1 border-x border-[#f1f5f9]">
              <p className="text-xs sm:text-sm font-medium text-[#64748b] mb-1">
                Shaft Speed
              </p>
              <h3 className="text-base sm:text-lg font-bold text-[#1e293b] tracking-tight">
                {isEstimating && !isPaused ? `${activeProfile.rpm} rpm` : '0 rpm'}
              </h3>
            </div>
            <div className="px-1">
              <p className="text-xs sm:text-sm font-medium text-[#64748b] mb-1">
                Back-EMF Ke
              </p>
              <h3 className="text-base sm:text-lg font-bold text-[#1e293b] tracking-tight">
                {paramMap.Ke.value.toFixed(2)} V/krpm
              </h3>
            </div>
          </div>

          {/* ================= RESPONSIVE SCALED SIMULATION CANVAS ================= */}
          <div
            ref={canvasWrapperRef}
            className="relative w-full overflow-hidden bg-[#0b111e]"
            style={{ height: `${440 * canvasScale}px` }}
          >
            <div
              className="relative bg-[#0b111e] h-[440px] w-[840px] origin-top-left flex flex-col"
              style={{
                transform: `scale(${canvasScale})`,
                transformOrigin: 'top left',
              }}
            >
              {/* ================= ROW 1: SPLIT TWIN & CONVERGENCE SCOPE ================= */}
              <div className="h-[210px] grid grid-cols-12 border-b border-[#1e293b] relative z-10">
                
                {/* Panel 1: Electromagnetic Twin (Left 5 cols) */}
                <div className="col-span-5 bg-[#0a1020] p-4 border-r border-[#1e293b] flex flex-col justify-between relative overflow-hidden">
                  <div>
                    <h4 className="font-mono text-[10px] font-bold tracking-wider text-white/50 uppercase">
                      ELECTROMAGNETIC TWIN
                    </h4>
                    <p className="text-[9px] text-[#94a3b8] mt-1 leading-tight font-sans">
                      Flux Density B: {activeProfile.fluxDensity.toFixed(2)} T
                    </p>
                    <p className="text-[9px] text-[#94a3b8] leading-tight font-sans">
                      Direct Axis Ld: {paramMap.Ld.value.toFixed(2)} mH
                    </p>
                  </div>

                  {/* Motor Housing with 4 Dual-Coil Stations & Center Rotor */}
                  <div className="flex items-center justify-center my-auto relative pt-1">
                    <div className="w-[124px] h-[124px] rounded-full bg-[#1e293b] border-[5px] border-[#334155] relative flex items-center justify-center shadow-2xl">
                      
                      {/* Top Station: 2 Orange Coils Side-by-Side */}
                      <div className="absolute -top-3.5 flex gap-1.5 z-20">
                        <div className="w-3.5 h-6 bg-[#d97706] rounded-[3px] border border-[#f59e0b] shadow-xs flex flex-col justify-between py-0.5">
                          <span className="w-full h-0.5 bg-black/40"></span>
                          <span className="w-full h-0.5 bg-black/40"></span>
                          <span className="w-full h-0.5 bg-black/40"></span>
                        </div>
                        <div className="w-3.5 h-6 bg-[#d97706] rounded-[3px] border border-[#f59e0b] shadow-xs flex flex-col justify-between py-0.5">
                          <span className="w-full h-0.5 bg-black/40"></span>
                          <span className="w-full h-0.5 bg-black/40"></span>
                          <span className="w-full h-0.5 bg-black/40"></span>
                        </div>
                      </div>

                      {/* Bottom Station: 2 Orange Coils Side-by-Side */}
                      <div className="absolute -bottom-3.5 flex gap-1.5 z-20">
                        <div className="w-3.5 h-6 bg-[#d97706] rounded-[3px] border border-[#f59e0b] shadow-xs flex flex-col justify-between py-0.5">
                          <span className="w-full h-0.5 bg-black/40"></span>
                          <span className="w-full h-0.5 bg-black/40"></span>
                          <span className="w-full h-0.5 bg-black/40"></span>
                        </div>
                        <div className="w-3.5 h-6 bg-[#d97706] rounded-[3px] border border-[#f59e0b] shadow-xs flex flex-col justify-between py-0.5">
                          <span className="w-full h-0.5 bg-black/40"></span>
                          <span className="w-full h-0.5 bg-black/40"></span>
                          <span className="w-full h-0.5 bg-black/40"></span>
                        </div>
                      </div>

                      {/* Left Station: 2 Blue Coils Side-by-Side */}
                      <div className="absolute -left-3.5 flex gap-1.5 z-20">
                        <div className="w-3.5 h-6 bg-[#2563eb] rounded-[3px] border border-[#38bdf8] shadow-xs flex flex-col justify-between py-0.5">
                          <span className="w-full h-0.5 bg-black/40"></span>
                          <span className="w-full h-0.5 bg-black/40"></span>
                          <span className="w-full h-0.5 bg-black/40"></span>
                        </div>
                        <div className="w-3.5 h-6 bg-[#2563eb] rounded-[3px] border border-[#38bdf8] shadow-xs flex flex-col justify-between py-0.5">
                          <span className="w-full h-0.5 bg-black/40"></span>
                          <span className="w-full h-0.5 bg-black/40"></span>
                          <span className="w-full h-0.5 bg-black/40"></span>
                        </div>
                      </div>

                      {/* Right Station: 2 Blue Coils Side-by-Side */}
                      <div className="absolute -right-3.5 flex gap-1.5 z-20">
                        <div className="w-3.5 h-6 bg-[#2563eb] rounded-[3px] border border-[#38bdf8] shadow-xs flex flex-col justify-between py-0.5">
                          <span className="w-full h-0.5 bg-black/40"></span>
                          <span className="w-full h-0.5 bg-black/40"></span>
                          <span className="w-full h-0.5 bg-black/40"></span>
                        </div>
                        <div className="w-3.5 h-6 bg-[#2563eb] rounded-[3px] border border-[#38bdf8] shadow-xs flex flex-col justify-between py-0.5">
                          <span className="w-full h-0.5 bg-black/40"></span>
                          <span className="w-full h-0.5 bg-black/40"></span>
                          <span className="w-full h-0.5 bg-black/40"></span>
                        </div>
                      </div>

                      {/* Center Rotating Permanent Magnet Rotor */}
                      <div
                        className="w-[62px] h-[62px] rounded-full border-2 border-slate-400 overflow-hidden relative shadow-lg will-change-transform z-10"
                        style={{
                          animation: isEstimating && !isPaused ? `spinEngine ${rotorDuration}s linear infinite` : 'none',
                        }}
                      >
                        {/* North Pole: Red */}
                        <div className="w-full h-1/2 bg-[#ef4444] flex items-center justify-center">
                          <span className="text-[11px] font-bold text-white font-mono leading-none select-none">N</span>
                        </div>
                        {/* South Pole: Blue */}
                        <div className="w-full h-1/2 bg-[#2563eb] flex items-center justify-center">
                          <span className="text-[11px] font-bold text-white font-mono leading-none select-none">S</span>
                        </div>
                        {/* Curved White Arrow on Rotor */}
                        <svg viewBox="0 0 40 40" className="absolute inset-0 w-full h-full pointer-events-none opacity-85">
                          <path d="M 12 18 A 10 10 0 0 1 28 18" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
                          <polygon points="26,14 30,18 25,20" fill="#ffffff" />
                        </svg>
                        {/* Center Shaft Hub */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#334155] border border-white/70 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Panel 2: Parameter Estimation Convergence Scope (Right 7 cols) */}
                <div className="col-span-7 bg-[#0a1020] p-4 flex flex-col justify-between relative">
                  {/* Top Bar: Title + Realtime Observer + Pause/Play */}
                  <div className="flex justify-between items-center">
                    <h4 className="font-mono text-[10px] font-bold tracking-wider text-white/50 uppercase">
                      PARAMETER ESTIMATION CONVERGENCE
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-[#64748b]">Realtime Observer</span>
                      <button
                        type="button"
                        onClick={() => setIsPaused(!isPaused)}
                        className="w-6 h-6 rounded bg-[#111827] hover:bg-[#1f2937] text-white flex items-center justify-center cursor-pointer transition-colors border border-white/10"
                        title={isPaused ? 'Resume' : 'Pause'}
                      >
                        {isPaused ? <Play className="w-3 h-3 text-white" /> : <Pause className="w-3 h-3 text-white" />}
                      </button>
                    </div>
                  </div>

                  {/* Oscilloscope Grid Plot */}
                  <div className="flex-1 mt-2 border border-white/10 bg-black/30 rounded relative overflow-hidden p-2 flex flex-col justify-between">
                    {/* Subtle grid lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-15 p-2">
                      <div className="border-b border-dashed border-[#475569] w-full"></div>
                      <div className="border-b border-dashed border-[#475569] w-full"></div>
                      <div className="border-b border-dashed border-[#475569] w-full"></div>
                      <div className="border-b border-dashed border-[#475569] w-full"></div>
                    </div>
                    <div className="absolute inset-0 flex justify-between pointer-events-none opacity-15 p-2">
                      <div className="border-r border-dashed border-[#475569] h-full"></div>
                      <div className="border-r border-dashed border-[#475569] h-full"></div>
                      <div className="border-r border-dashed border-[#475569] h-full"></div>
                      <div className="border-r border-dashed border-[#475569] h-full"></div>
                      <div className="border-r border-dashed border-[#475569] h-full"></div>
                    </div>

                    {/* Scope Header Label */}
                    <div className="relative z-10 font-mono text-[8px] text-[#64748b]">
                      <span>Max Residual</span>
                    </div>

                    {/* Live Green Convergence Trace Curve */}
                    <div className="absolute inset-x-2 bottom-4 h-16 pointer-events-none">
                      <svg viewBox="0 0 400 80" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                        <defs>
                          <filter id="greenGlow">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                            <feMerge>
                              <feMergeNode in="coloredBlur"/>
                              <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                          </filter>
                        </defs>

                        {/* Baseline 0% */}
                        <line x1="0" y1="68" x2="400" y2="68" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />

                        {/* Dynamic Green Wave converging to 0% Error */}
                        <path
                          d="M 0,40 Q 30,10 70,62 T 140,67 T 230,68 L 400,68"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="2.2"
                          filter="url(#greenGlow)"
                        />

                        {/* Pulsing sampling point */}
                        <circle
                          cx={Math.min(390, 40 + sweepProgress * 3.5)}
                          cy="68"
                          r="4"
                          fill="#10b981"
                          className="animate-ping"
                        />
                        <circle
                          cx={Math.min(390, 40 + sweepProgress * 3.5)}
                          cy="68"
                          r="2.5"
                          fill="#34d399"
                        />
                      </svg>
                    </div>

                    {/* Bottom Axis Labels */}
                    <div className="relative z-10 flex justify-between items-end font-mono text-[8px] text-[#64748b]">
                      <span className="text-[#10b981]/70 font-bold">0% Error</span>
                      <span>Time</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= ROW 2: PARALLAX NIGHT CITYSCAPE & VEHICLE ================= */}
              <div className="h-[230px] bg-gradient-to-b from-[#0b1329] to-[#1e294b] relative overflow-hidden">
                
                {/* Red Radio Antennas with Glowing Beacons on Rooftops */}
                <div className="absolute top-2 left-64 flex flex-col items-center z-1 pointer-events-none">
                  <div className="w-2 h-2 rounded-full bg-[#ef4444] shadow-[0_0_8px_#ef4444] animate-pulse"></div>
                  <div className="w-0.5 h-6 bg-[#ef4444]"></div>
                </div>
                <div className="absolute top-4 right-52 flex flex-col items-center z-1 pointer-events-none">
                  <div className="w-2 h-2 rounded-full bg-[#ef4444] shadow-[0_0_8px_#ef4444] animate-pulse"></div>
                  <div className="w-0.5 h-6 bg-[#ef4444]"></div>
                </div>

                {/* Night City Skyline Silhouette with Lit Windows */}
                <div
                  className="absolute bottom-10 left-0 w-[200%] h-32 pointer-events-none"
                  style={{
                    background:
                      'repeating-linear-gradient(90deg, transparent 0px, transparent 40px, rgba(27,37,75,0.85) 40px, rgba(27,37,75,0.85) 100px, rgba(20,28,58,0.95) 100px, rgba(20,28,58,0.95) 170px)',
                    animation: isEstimating && !isPaused ? `scrollLandscape ${landscapeDuration * 4}s linear infinite` : 'none',
                  }}
                >
                  {/* Glowing Windows Pattern */}
                  <div className="absolute bottom-10 left-12 w-2 h-3 bg-[#d97706] opacity-60"></div>
                  <div className="absolute bottom-16 left-16 w-2 h-3 bg-[#f59e0b] opacity-80"></div>
                  <div className="absolute bottom-22 left-28 w-2 h-3 bg-[#38bdf8] opacity-75"></div>
                  <div className="absolute bottom-14 left-72 w-2.5 h-3 bg-[#ffffff] opacity-60"></div>
                  <div className="absolute bottom-20 left-80 w-2 h-3 bg-[#f59e0b] opacity-70"></div>
                  <div className="absolute bottom-10 left-[240px] w-2 h-3 bg-[#38bdf8] opacity-70"></div>
                  <div className="absolute bottom-18 left-[380px] w-2 h-3 bg-[#fde047] opacity-65"></div>
                  <div className="absolute bottom-12 left-[490px] w-2 h-3 bg-[#38bdf8] opacity-80"></div>
                  <div className="absolute bottom-20 left-[560px] w-2 h-3 bg-[#f59e0b] opacity-70"></div>
                  <div className="absolute bottom-10 left-[680px] w-2 h-3 bg-[#38bdf8] opacity-65"></div>
                </div>

                {/* Ground Roadbed Strip */}
                <div className="absolute bottom-0 inset-x-0 h-10 bg-[#0f172a] border-t-2 border-[#334155] z-10 overflow-hidden">
                  {/* Road Center Divider Dashes */}
                  <div
                    className="w-[200%] h-1.5 absolute top-3.5 left-0"
                    style={{
                      background: 'repeating-linear-gradient(90deg, #ffffff 0px, #ffffff 28px, transparent 28px, transparent 68px)',
                      animation: isEstimating && !isPaused ? `scrollLandscape ${landscapeDuration * 0.25}s linear infinite` : 'none',
                    }}
                  />
                  {/* Lower Faint Road Track */}
                  <div
                    className="w-[200%] h-0.5 absolute bottom-1.5 left-0 opacity-20"
                    style={{
                      background: 'repeating-linear-gradient(90deg, #ffffff 0px, #ffffff 16px, transparent 16px, transparent 40px)',
                      animation: isEstimating && !isPaused ? `scrollLandscape ${landscapeDuration * 0.25}s linear infinite` : 'none',
                    }}
                  />
                </div>

                {/* Vehicle Entity (Centered horizontally) */}
                <div className="absolute left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none" style={{ bottom: selectedTarget === 'evtol' ? '68px' : '22px' }}>
                  
                  {/* 1. AeroDrive eVTOL-200 (120V) Flying Taxi */}
                  {selectedTarget === 'evtol' && (
                    <div className="relative flex flex-col items-center will-change-transform" style={{ animation: isEstimating && !isPaused ? 'hoverTaxi 2.2s ease-in-out infinite alternate' : 'none' }}>
                      {/* White Fuselage Pod */}
                      <div className="w-[125px] h-[38px] bg-gradient-to-r from-[#ffffff] via-[#f8fafc] to-[#e2e8f0] border-2 border-[#94a3b8] rounded-l-[14px] rounded-r-[32px] relative shadow-[0_8px_20px_rgba(0,0,0,0.5)] flex items-center">
                        
                        {/* Cyan Eye Visor Window with Dark Pupil */}
                        <div className="absolute top-2 right-5 w-12 h-5 bg-gradient-to-r from-[#0284c7] to-[#38bdf8] rounded-full border border-white flex items-center justify-center shadow-inner">
                          <div className="w-3.5 h-2.5 bg-[#0f172a] rounded-full"></div>
                        </div>

                        {/* Top Dual Spinning Cyan Rotor Lines */}
                        <div className="absolute -top-3.5 left-5 w-14 h-1 bg-[#38bdf8] rounded-full shadow-[0_0_8px_#38bdf8] animate-spin" style={{ animationDuration: '0.1s' }}></div>
                        <div className="absolute -top-3.5 right-6 w-14 h-1 bg-[#38bdf8] rounded-full shadow-[0_0_8px_#38bdf8] animate-spin" style={{ animationDuration: '0.1s' }}></div>

                        {/* Left Wing / Tail Fin with Green Beacon Light */}
                        <div className="absolute -left-4 top-1 w-5 h-2.5 bg-[#0284c7] rounded-xs -rotate-12 flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] shadow-[0_0_6px_#10b981] -ml-1"></div>
                        </div>
                      </div>

                      {/* Cyan Trailing Speed Lines */}
                      {isEstimating && !isPaused && (
                        <div className="absolute top-4 -left-10 w-8 h-0.5 bg-[#38bdf8] opacity-75 animate-pulse"></div>
                      )}
                    </div>
                  )}

                  {/* 2. Anaheim BLY341D (48V) E-Bike */}
                  {selectedTarget === 'bly341d' && (
                    <div className="relative mb-2 flex flex-col items-center">
                      <div className="w-[90px] h-[58px] relative">
                        {/* Rider: Red Helmet Head */}
                        <div className="absolute top-1 left-9 w-4 h-4 rounded-full bg-[#ef4444] border border-white/40 shadow-xs z-10"></div>
                        {/* Rider: White Angled Torso & Arms */}
                        <div className="absolute top-4 left-6 w-1.5 h-7 bg-white rounded-xs rotate-35 z-10"></div>
                        <div className="absolute top-5 left-8 w-1 h-6 bg-white rounded-xs -rotate-25 z-10"></div>
                        {/* Rider: White Bent Leg */}
                        <div className="absolute top-8 left-5 w-1 h-5 bg-white rounded-xs rotate-45 z-10"></div>

                        {/* Blue Bike Frame Tubes */}
                        <div className="absolute bottom-4 left-3 w-8 h-1.5 bg-[#2563eb] rounded-xs -rotate-15"></div>
                        <div className="absolute bottom-4 left-7 w-1.5 h-7 bg-[#2563eb] -rotate-20"></div>
                        <div className="absolute bottom-7 left-3 w-8 h-1.5 bg-[#2563eb] rotate-10"></div>
                        <div className="absolute bottom-4 left-11 w-1.5 h-7 bg-[#2563eb] rotate-15"></div>

                        {/* Front & Rear Spoked Wheels */}
                        <div className="absolute bottom-0 left-0 w-7 h-7 rounded-full border-2 border-slate-400 bg-black/40 flex items-center justify-center animate-spin" style={{ animationDuration: '0.25s' }}>
                          <div className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"></div>
                          <div className="w-full h-0.5 bg-[#38bdf8]/60 absolute"></div>
                          <div className="h-full w-0.5 bg-[#38bdf8]/60 absolute"></div>
                        </div>
                        <div className="absolute bottom-0 right-1 w-7 h-7 rounded-full border-2 border-slate-400 bg-black/40 flex items-center justify-center animate-spin" style={{ animationDuration: '0.25s' }}>
                          <div className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"></div>
                          <div className="w-full h-0.5 bg-[#38bdf8]/60 absolute"></div>
                          <div className="h-full w-0.5 bg-[#38bdf8]/60 absolute"></div>
                        </div>
                      </div>

                      {/* Trailing speed streaks */}
                      {isEstimating && !isPaused && (
                        <div className="absolute top-3 -left-8 w-6 h-0.5 bg-[#38bdf8] opacity-60"></div>
                      )}
                    </div>
                  )}

                  {/* 3. Anaheim BLY172S (24V) KickScooter */}
                  {selectedTarget === 'bly172s' && (
                    <div className="relative mb-2 flex flex-col items-center">
                      <div className="w-[75px] h-[54px] relative">
                        {/* Rider: Blue Helmet Head with White Visor */}
                        <div className="absolute top-1 left-6 w-4 h-4 rounded-full bg-[#2563eb] border border-white/60 shadow-xs z-10 flex items-center justify-center">
                          <div className="w-2.5 h-1 bg-white rounded-full"></div>
                        </div>
                        {/* Rider: White Torso & Arm Holding Handlebar */}
                        <div className="absolute top-4 left-5 w-1.5 h-7 bg-white rounded-xs rotate-20 z-10"></div>
                        <div className="absolute top-4 left-6 w-1 h-6 bg-white rounded-xs -rotate-25 z-10"></div>
                        {/* Rider: White Standing Leg on Deck */}
                        <div className="absolute top-8 left-5 w-1 h-5 bg-white rounded-xs rotate-10 z-10"></div>

                        {/* Scooter Steering Stem & Deck */}
                        <div className="absolute bottom-3 left-8 w-1 h-8 bg-[#94a3b8] -rotate-12"></div>
                        <div className="absolute bottom-3 left-1 w-10 h-1.5 bg-[#38bdf8] rounded-xs"></div>

                        {/* Wheels */}
                        <div className="absolute bottom-0 left-0 w-5 h-5 rounded-full border-2 border-slate-400 bg-[#0f172a] animate-spin" style={{ animationDuration: '0.2s' }}></div>
                        <div className="absolute bottom-0 right-3 w-5 h-5 rounded-full border-2 border-slate-400 bg-[#0f172a] animate-spin" style={{ animationDuration: '0.2s' }}></div>
                      </div>

                      {/* Trailing speed streaks */}
                      {isEstimating && !isPaused && (
                        <div className="absolute top-3 -left-8 w-6 h-0.5 bg-[#38bdf8] opacity-60"></div>
                      )}
                    </div>
                  )}

                  {/* Vehicle Tag Badge Directly Underneath */}
                  <div className="mt-1 px-3 py-0.5 rounded-full bg-[#0f172a]/90 border border-white/20 text-[9px] font-bold text-[#94a3b8] tracking-wider shadow-md whitespace-nowrap">
                    <span>{activeProfile.tagText}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= CONTROL CONSOLE PANEL ================= */}
          <div className="p-4 sm:p-6 md:p-8 bg-white space-y-5 sm:space-y-6">
            
            {/* Row 1: Hardware Motor Target Dropdown & Execution Control */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-start">
              {/* Target Selector */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#1e293b] mb-1.5 sm:mb-2">
                  Hardware Motor Target
                </label>
                <div className="relative">
                  <select
                    value={selectedTarget}
                    onChange={(e) => setSelectedTarget(e.target.value as TargetMotorId)}
                    className="w-full h-11 sm:h-12 bg-[#f1f5f9] hover:bg-[#e9eff6] rounded-xl px-4 pr-10 text-xs sm:text-sm font-semibold text-[#1e293b] cursor-pointer border border-transparent focus:border-[#2563eb] focus:outline-none transition-all appearance-none"
                  >
                    <option value="evtol">AeroDrive eVTOL-200 (120V)</option>
                    <option value="bly341d">Anaheim BLY341D (48V)</option>
                    <option value="bly172s">Anaheim BLY172S (24V)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#64748b] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Execution Control Action */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#1e293b] mb-1.5 sm:mb-2">
                  Execution Control
                </label>
                <button
                  type="button"
                  onClick={() => setIsEstimating(!isEstimating)}
                  className="w-full h-11 sm:h-12 rounded-full font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-sm bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)] active:scale-95"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>{isEstimating ? 'Run Estimation' : 'Resume Estimation'}</span>
                </button>
              </div>
            </div>

            {/* Row 2: Estimated Parameters Selection Header */}
            <div className="pt-1 flex justify-between items-center text-xs sm:text-sm font-semibold">
              <span className="text-[#1e293b]">
                Estimated Parameters Selection
              </span>
              <span className="text-xs text-[#64748b] font-normal">
                Click parameters to toggle estimation
              </span>
            </div>

            {/* Row 3: 2-Column Matrix (Rs, Ld, Lq, Ke, J, B) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Card 1: Rs */}
              <div className={`bg-[#f8fafc] border rounded-xl px-4 py-3 flex items-center justify-between transition-colors ${paramMap.Rs.enabled ? 'border-[#cbd5e1]' : 'border-[#e2e8f0] opacity-50'}`}>
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={paramMap.Rs.enabled}
                    onChange={() => toggleParam('Rs')}
                    className="w-4 h-4 rounded text-[#2563eb] accent-[#2563eb] cursor-pointer"
                  />
                  <span className="text-sm font-bold text-[#1e293b]">Rs</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={paramMap.Rs.value}
                    step="0.01"
                    onChange={(e) => updateParamValue('Rs', parseFloat(e.target.value) || 0)}
                    className="w-20 text-right bg-transparent text-sm font-bold text-[#1e293b] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#2563eb] rounded px-1"
                  />
                  <span className="text-xs text-[#64748b] min-w-[45px] text-right">Ω</span>
                </div>
              </div>

              {/* Card 2: Ld */}
              <div className={`bg-[#f8fafc] border rounded-xl px-4 py-3 flex items-center justify-between transition-colors ${paramMap.Ld.enabled ? 'border-[#cbd5e1]' : 'border-[#e2e8f0] opacity-50'}`}>
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={paramMap.Ld.enabled}
                    onChange={() => toggleParam('Ld')}
                    className="w-4 h-4 rounded text-[#2563eb] accent-[#2563eb] cursor-pointer"
                  />
                  <span className="text-sm font-bold text-[#1e293b]">Ld</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={paramMap.Ld.value}
                    step="0.01"
                    onChange={(e) => updateParamValue('Ld', parseFloat(e.target.value) || 0)}
                    className="w-20 text-right bg-transparent text-sm font-bold text-[#1e293b] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#2563eb] rounded px-1"
                  />
                  <span className="text-xs text-[#64748b] min-w-[45px] text-right">mH</span>
                </div>
              </div>

              {/* Card 3: Lq */}
              <div className={`bg-[#f8fafc] border rounded-xl px-4 py-3 flex items-center justify-between transition-colors ${paramMap.Lq.enabled ? 'border-[#cbd5e1]' : 'border-[#e2e8f0] opacity-50'}`}>
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={paramMap.Lq.enabled}
                    onChange={() => toggleParam('Lq')}
                    className="w-4 h-4 rounded text-[#2563eb] accent-[#2563eb] cursor-pointer"
                  />
                  <span className="text-sm font-bold text-[#1e293b]">Lq</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={paramMap.Lq.value}
                    step="0.01"
                    onChange={(e) => updateParamValue('Lq', parseFloat(e.target.value) || 0)}
                    className="w-20 text-right bg-transparent text-sm font-bold text-[#1e293b] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#2563eb] rounded px-1"
                  />
                  <span className="text-xs text-[#64748b] min-w-[45px] text-right">mH</span>
                </div>
              </div>

              {/* Card 4: Ke */}
              <div className={`bg-[#f8fafc] border rounded-xl px-4 py-3 flex items-center justify-between transition-colors ${paramMap.Ke.enabled ? 'border-[#cbd5e1]' : 'border-[#e2e8f0] opacity-50'}`}>
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={paramMap.Ke.enabled}
                    onChange={() => toggleParam('Ke')}
                    className="w-4 h-4 rounded text-[#2563eb] accent-[#2563eb] cursor-pointer"
                  />
                  <span className="text-sm font-bold text-[#1e293b]">Ke</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={paramMap.Ke.value}
                    step="0.1"
                    onChange={(e) => updateParamValue('Ke', parseFloat(e.target.value) || 0)}
                    className="w-20 text-right bg-transparent text-sm font-bold text-[#1e293b] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#2563eb] rounded px-1"
                  />
                  <span className="text-xs text-[#64748b] min-w-[45px] text-right">V/krpm</span>
                </div>
              </div>

              {/* Card 5: J */}
              <div className={`bg-[#f8fafc] border rounded-xl px-4 py-3 flex items-center justify-between transition-colors ${paramMap.J.enabled ? 'border-[#cbd5e1]' : 'border-[#e2e8f0] opacity-50'}`}>
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={paramMap.J.enabled}
                    onChange={() => toggleParam('J')}
                    className="w-4 h-4 rounded text-[#2563eb] accent-[#2563eb] cursor-pointer"
                  />
                  <span className="text-sm font-bold text-[#1e293b]">J</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={paramMap.J.value}
                    step="1"
                    onChange={(e) => updateParamValue('J', parseFloat(e.target.value) || 0)}
                    className="w-20 text-right bg-transparent text-sm font-bold text-[#1e293b] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#2563eb] rounded px-1"
                  />
                  <span className="text-xs text-[#64748b] min-w-[45px] text-right">g·cm²</span>
                </div>
              </div>

              {/* Card 6: B */}
              <div className={`bg-[#f8fafc] border rounded-xl px-4 py-3 flex items-center justify-between transition-colors ${paramMap.B.enabled ? 'border-[#cbd5e1]' : 'border-[#e2e8f0] opacity-50'}`}>
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={paramMap.B.enabled}
                    onChange={() => toggleParam('B')}
                    className="w-4 h-4 rounded text-[#2563eb] accent-[#2563eb] cursor-pointer"
                  />
                  <span className="text-sm font-bold text-[#1e293b]">B</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={paramMap.B.value}
                    step="1"
                    onChange={(e) => updateParamValue('B', parseFloat(e.target.value) || 0)}
                    className="w-20 text-right bg-transparent text-sm font-bold text-[#1e293b] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#2563eb] rounded px-1"
                  />
                  <span className="text-xs text-[#64748b] min-w-[45px] text-right">μN·m·s</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Scoped CSS Keyframe Animations */}
      <style>{`
        /* Continuous Rotor Spin */
        @keyframes spinEngine {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Continuous Skyline and Road Scroller */
        @keyframes scrollLandscape {
          from { background-position: 0 0; }
          to { background-position: -300px 0; }
        }

        /* Hovering Float for Flying Taxi */
        @keyframes hoverTaxi {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-7px); }
        }
      `}</style>
    </section>
  );
}
