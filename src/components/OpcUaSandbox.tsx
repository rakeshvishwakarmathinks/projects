/**
 * ============================================================================
 * LOCKED COMPONENT: OPC UA Factory Automation Sandbox Prototype
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
import { ChevronDown } from 'lucide-react';

type TagKey = 'robot' | 'speed' | 'temp';

interface TagConfig {
  id: TagKey;
  nodeId: string;
  live: number;
  target: number;
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
}

export default function OpcUaSandbox() {
  const [isSystemRunning, setIsSystemRunning] = useState(true);
  const [isConnectedOnline, setIsConnectedOnline] = useState(true);
  const [activeTag, setActiveTag] = useState<TagKey>('robot');
  const [totalOutput, setTotalOutput] = useState(1305);

  // Responsive canvas scale tracking
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const [canvasScale, setCanvasScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (canvasWrapperRef.current) {
        const containerWidth = canvasWrapperRef.current.clientWidth;
        if (containerWidth < 820 && containerWidth > 0) {
          setCanvasScale(containerWidth / 820);
        } else {
          setCanvasScale(1);
        }
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [machineRegistry, setMachineRegistry] = useState<Record<TagKey, TagConfig>>({
    robot: {
      id: 'robot',
      nodeId: 'ns=2;s=Line1.Robot.PPM',
      live: 17,
      target: 38,
      label: 'Modify Node Value (ppm)',
      unit: 'ppm',
      min: 0,
      max: 100,
      step: 1,
    },
    speed: {
      id: 'speed',
      nodeId: 'ns=2;s=Line1.Conveyor.Velocity',
      live: 28.0,
      target: 32.0,
      label: 'Modify Conveyor Velocity (m/min)',
      unit: 'm/min',
      min: 0,
      max: 60,
      step: 0.5,
    },
    temp: {
      id: 'temp',
      nodeId: 'ns=2;s=Line1.Furnace.Temperature',
      live: 169.0,
      target: 185.0,
      label: 'Modify Chamber Heat (°C)',
      unit: '°C',
      min: 20,
      max: 300,
      step: 1,
    },
  });

  // Increment output units over time while running and online
  useEffect(() => {
    if (!isSystemRunning || !isConnectedOnline) return;
    const interval = setInterval(() => {
      setTotalOutput((prev) => prev + 1);
    }, 4500);
    return () => clearInterval(interval);
  }, [isSystemRunning, isConnectedOnline]);

  const currentObj = machineRegistry[activeTag];

  // Dynamic calculations for visuals & metrics
  const currentSpeed = machineRegistry.speed.live;
  const currentPpm = machineRegistry.robot.live;
  const currentTemp = machineRegistry.temp.live;

  // Belt texture animation duration
  const beltDuration = Math.max(0.2, 2.0 - currentSpeed / 35);

  // Moving cargo boxes flow duration across conveyor belt (6s at 28 m/min)
  const cargoDuration = Math.max(1.8, (28.0 / Math.max(5, currentSpeed)) * 6.0);

  // Robot arm scanning cycle duration (parts per minute: 60 / ppm)
  const robotScanDuration = Math.max(0.6, 60.0 / Math.max(5, currentPpm));

  // Determine whether robot can successfully scan passing items
  const isRobotOperational = isConnectedOnline && isSystemRunning && currentPpm > 0;

  // Angles for elevated robot arm with safe clearance
  const baseUpper = 12 + Math.min(20, currentPpm * 0.25);
  const baseFore = -32 - Math.min(18, currentPpm * 0.25);
  const upperMin = Math.round(baseUpper - 6);
  const upperMax = Math.round(baseUpper + 8);
  const foreMin = Math.round(baseFore - 8);
  const foreMax = Math.round(baseFore + 6);

  const simulatedQuality = (98.5 - currentPpm * 0.15 - currentSpeed * 0.1).toFixed(1);
  const simulatedDelta = Math.floor(-80 + currentTemp * 0.2);

  const handleSliderMovement = (val: number) => {
    setMachineRegistry((prev) => ({
      ...prev,
      [activeTag]: {
        ...prev[activeTag],
        target: val,
      },
    }));
  };

  const dispatchReadCommand = () => {
    if (!isConnectedOnline) return;
    setMachineRegistry((prev) => ({
      ...prev,
      [activeTag]: {
        ...prev[activeTag],
        target: prev[activeTag].live,
      },
    }));
  };

  const dispatchWriteCommand = () => {
    if (!isConnectedOnline) return;
    setMachineRegistry((prev) => ({
      ...prev,
      [activeTag]: {
        ...prev[activeTag],
        live: prev[activeTag].target,
      },
    }));
  };

  const sliderPercent =
    ((currentObj.target - currentObj.min) / (currentObj.max - currentObj.min)) * 100;

  // Evaluation of scan success per cargo box
  const isSufficientPpm = currentPpm >= currentSpeed * 0.6;
  const box1Scanned = isRobotOperational;
  const box2Scanned = isRobotOperational && isSufficientPpm;
  const box3Scanned = isRobotOperational;
  const box4Scanned = isRobotOperational && isSufficientPpm;

  return (
    <section id="sandbox" className="py-12 sm:py-16 md:py-20 border-b border-[#e5e5ea] bg-[#f8fafc]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10 max-w-3xl">
          <p className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-[#ff3b30] font-semibold mb-2 sm:mb-3">
            Interactive Sandbox · Industrial Simulation
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-wide text-[#1d1d1f] mb-2 sm:mb-3 uppercase">
            Live Factory Telemetry &amp; Control Sandbox
          </h2>
          <p className="text-sm sm:text-base md:text-lg font-normal text-[#48484a] leading-relaxed">
            Explore how live OPC UA telemetry directly orchestrates factory automation by modifying machine tags, reading setpoints, and executing validated write operations in real time.
          </p>
        </div>

        {/* The Exact Pixel-Matched Card Container */}
        <div className="w-full max-w-[820px] bg-white rounded-2xl sm:rounded-[28px] shadow-[0_10px_35px_-5px_rgba(0,0,0,0.07),0_2px_10px_rgba(0,0,0,0.04)] border border-[#e2e8f0] overflow-hidden select-none">
          
          {/* ================= RESPONSIVE SCALED FACTORY CANVAS ================= */}
          <div
            ref={canvasWrapperRef}
            className="relative w-full overflow-hidden bg-[#0b111e]"
            style={{ height: `${400 * canvasScale}px` }}
          >
            <div
              className="relative bg-[#0b111e] h-[400px] w-[820px] p-6 origin-top-left"
              style={{
                transform: `scale(${canvasScale})`,
                transformOrigin: 'top left',
              }}
            >
              {/* Background vertical dashed measurement station guidelines */}
              <div className="absolute inset-0 flex justify-between px-16 pointer-events-none opacity-25">
                <div className="border-r border-dashed border-[#475569] h-full"></div>
                <div className="border-r border-dashed border-[#475569] h-full"></div>
                <div className="border-r border-dashed border-[#475569] h-full"></div>
                <div className="border-r border-dashed border-[#475569] h-full"></div>
                <div className="border-r border-dashed border-[#475569] h-full"></div>
                <div className="border-r border-dashed border-[#475569] h-full"></div>
              </div>

              {/* Canvas Header: Connection Pill & Pause Button */}
              <div className="relative z-30 flex justify-between items-center">
                {/* Connection Pill */}
                <div
                  onClick={() => setIsConnectedOnline(!isConnectedOnline)}
                  className="bg-[#101726]/80 hover:bg-[#152033] border border-white/15 px-3.5 py-1.5 rounded-full text-[#94a3b8] text-[11px] font-mono font-semibold tracking-wider flex items-center gap-2 cursor-pointer transition-colors shadow-sm"
                  title="Click to toggle network state"
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      isConnectedOnline
                        ? 'bg-[#10b981] shadow-[0_0_8px_#10b981]'
                        : 'bg-[#ef4444] shadow-[0_0_6px_#ef4444]'
                    }`}
                  />
                  <span>{isConnectedOnline ? 'OPC.TCP://CONNECTED' : 'OPC.TCP://OFFLINE'}</span>
                </div>

                {/* Pause/Play Button */}
                <button
                  type="button"
                  onClick={() => setIsSystemRunning(!isSystemRunning)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white cursor-pointer shadow-md transition-all active:scale-95"
                  title={isSystemRunning ? 'Pause simulation' : 'Resume simulation'}
                >
                  {isSystemRunning ? (
                    <div className="flex gap-1 items-center justify-center">
                      <span className="w-1 h-3.5 bg-white rounded-xs"></span>
                      <span className="w-1 h-3.5 bg-white rounded-xs"></span>
                    </div>
                  ) : (
                    <span className="text-white text-xs font-bold pl-0.5">▶</span>
                  )}
                </button>
              </div>

              {/* ================= FLOATING TELEMETRY TAGS ================= */}

              {/* 169.0°C Tag resting directly on top of the furnace roof */}
              <div
                onClick={() => setActiveTag('temp')}
                className={`absolute top-[118px] left-[235px] z-30 cursor-pointer transition-all duration-200 px-3.5 py-1 rounded-full text-xs font-bold text-white shadow-lg border ${
                  activeTag === 'temp'
                    ? 'bg-[#2563eb] border-[#38bdf8] ring-2 ring-[#38bdf8]/50'
                    : 'bg-[#0f172a]/95 border-white/20 hover:border-white/40'
                }`}
              >
                <span>{machineRegistry.temp.live.toFixed(1)}°C</span>
              </div>

              {/* 17 PPM Tag resting directly on top of the robot hub / scaffolding */}
              <div
                onClick={() => setActiveTag('robot')}
                className={`absolute top-[138px] left-[506px] z-30 cursor-pointer transition-all duration-200 px-3.5 py-1 rounded-full text-xs font-bold text-white shadow-lg border ${
                  activeTag === 'robot'
                    ? 'bg-[#2563eb] border-[#38bdf8] ring-2 ring-[#38bdf8]/50 shadow-[0_0_14px_rgba(37,99,235,0.7)]'
                    : 'bg-[#0f172a]/95 border-white/20 hover:border-white/40'
                }`}
              >
                <span>{machineRegistry.robot.live} PPM</span>
              </div>

              {/* 28.0 m/min Tag hovering below the conveyor belt on left */}
              <div
                onClick={() => setActiveTag('speed')}
                className={`absolute bottom-11 left-16 z-30 cursor-pointer transition-all duration-200 px-3.5 py-1 rounded-full text-xs font-bold text-white shadow-lg border ${
                  activeTag === 'speed'
                    ? 'bg-[#2563eb] border-[#38bdf8] ring-2 ring-[#38bdf8]/50'
                    : 'bg-[#0f172a]/90 border-white/20 hover:border-white/40'
                }`}
              >
                <span>{machineRegistry.speed.live.toFixed(1)} m/min</span>
              </div>

              {/* ================= CONTINUOUS CARGO FLOW ON CONVEYOR ================= */}
              <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
                {/* Cargo Box 1 */}
                <div
                  className="cargo-box absolute bottom-[92px] w-[28px] h-[24px] rounded flex items-center justify-center will-change-transform"
                  style={{
                    animation: `${box1Scanned ? 'flowCargoScanned' : 'flowCargoUnscanned'} ${cargoDuration}s linear infinite`,
                    animationDelay: '0s',
                    animationPlayState: isSystemRunning ? 'running' : 'paused',
                  }}
                >
                  <div className="w-1.5 h-1.5 bg-white/90 rounded-xs shadow-xs"></div>
                </div>

                {/* Cargo Box 2 */}
                <div
                  className="cargo-box absolute bottom-[92px] w-[28px] h-[24px] rounded flex items-center justify-center will-change-transform"
                  style={{
                    animation: `${box2Scanned ? 'flowCargoScanned' : 'flowCargoUnscanned'} ${cargoDuration}s linear infinite`,
                    animationDelay: `${cargoDuration * 0.28}s`,
                    animationPlayState: isSystemRunning ? 'running' : 'paused',
                  }}
                >
                  <div className="w-1.5 h-1.5 bg-white/90 rounded-xs shadow-xs"></div>
                </div>

                {/* Cargo Box 3 */}
                <div
                  className="cargo-box absolute bottom-[92px] w-[28px] h-[24px] rounded flex items-center justify-center will-change-transform"
                  style={{
                    animation: `${box3Scanned ? 'flowCargoScanned' : 'flowCargoUnscanned'} ${cargoDuration}s linear infinite`,
                    animationDelay: `${cargoDuration * 0.55}s`,
                    animationPlayState: isSystemRunning ? 'running' : 'paused',
                  }}
                >
                  <div className="w-1.5 h-1.5 bg-white/90 rounded-xs shadow-xs"></div>
                </div>

                {/* Cargo Box 4 */}
                <div
                  className="cargo-box absolute bottom-[92px] w-[28px] h-[24px] rounded flex items-center justify-center will-change-transform"
                  style={{
                    animation: `${box4Scanned ? 'flowCargoScanned' : 'flowCargoUnscanned'} ${cargoDuration}s linear infinite`,
                    animationDelay: `${cargoDuration * 0.82}s`,
                    animationPlayState: isSystemRunning ? 'running' : 'paused',
                  }}
                >
                  <div className="w-1.5 h-1.5 bg-white/90 rounded-xs shadow-xs"></div>
                </div>
              </div>

              {/* ================= FACTORY MACHINERY ================= */}

              {/* The Heated Furnace Module */}
              <div className="absolute bottom-[92px] left-[190px] w-[172px] h-[178px] bg-[#1a2333] border-[3px] border-[#2e3e56] rounded-t-2xl flex flex-col items-center justify-start pt-5 shadow-2xl z-20 pointer-events-none">
                {/* Inner Heated Chamber */}
                <div
                  className="w-[140px] h-[122px] rounded-lg border border-[#3e231e] flex flex-col justify-around py-3 px-4 relative overflow-hidden transition-all duration-500"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(62, 22, 14, 0.95) 0%, rgba(32, 14, 10, 0.98) 60%, rgba(18, 10, 8, 1) 100%)',
                    boxShadow: `inset 0 0 24px rgba(234, 88, 12, ${Math.min(0.85, 0.35 + currentTemp / 400)})`,
                  }}
                >
                  {/* 4 Horizontal Glowing Heated Element Stripes */}
                  <div
                    className="h-1.5 w-full bg-[#f97316] rounded-sm transition-all duration-500"
                    style={{
                      boxShadow: '0 0 8px #ea580c, 0 0 16px rgba(234, 88, 12, 0.5)',
                      opacity: Math.min(1, 0.5 + currentTemp / 300),
                    }}
                  />
                  <div
                    className="h-1.5 w-full bg-[#f97316] rounded-sm transition-all duration-500"
                    style={{
                      boxShadow: '0 0 8px #ea580c, 0 0 16px rgba(234, 88, 12, 0.5)',
                      opacity: Math.min(1, 0.6 + currentTemp / 300),
                    }}
                  />
                  <div
                    className="h-1.5 w-full bg-[#f97316] rounded-sm transition-all duration-500"
                    style={{
                      boxShadow: '0 0 8px #ea580c, 0 0 16px rgba(234, 88, 12, 0.5)',
                      opacity: Math.min(1, 0.6 + currentTemp / 300),
                    }}
                  />
                  <div
                    className="h-1.5 w-full bg-[#f97316] rounded-sm transition-all duration-500"
                    style={{
                      boxShadow: '0 0 8px #ea580c, 0 0 16px rgba(234, 88, 12, 0.5)',
                      opacity: Math.min(1, 0.5 + currentTemp / 300),
                    }}
                  />
                </div>

                {/* Furnace Conveyor Tunnel Opening Archway */}
                <div className="absolute -bottom-1 left-2 right-2 h-7 bg-[#101726]/85 border-t border-[#38475e] rounded-t flex items-center justify-center">
                  <div className="w-20 h-1 bg-[#ea580c]/60 rounded-full shadow-[0_0_6px_#ea580c]"></div>
                </div>
              </div>

              {/* Elevated Robotic Workstation */}
              <div className="absolute bottom-[108px] left-[512px] w-[90px] h-[135px] z-20 pointer-events-none">
                {/* Taller Scaffolding Frame */}
                <div className="absolute top-4 left-1 w-1.5 h-[98px] bg-[#334155] rounded-t"></div>
                <div className="absolute top-4 right-3 w-1.5 h-[98px] bg-[#334155] rounded-t"></div>
                <div className="absolute top-4 left-1 right-3 h-1 bg-[#334155]"></div>

                {/* Elevated Fixed Top Pivot Hub */}
                <div className="absolute top-2 left-7 w-6 h-6 rounded-full bg-[#475569] border-2 border-slate-700 flex items-center justify-center shadow-lg">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#94a3b8] border border-slate-600"></div>
                </div>

                {/* Elevated Upper Robotic Arm Segment */}
                <div
                  className="robot-upper-arm absolute top-5 left-[38px] w-2 h-[42px] bg-slate-200 origin-top rounded-sm shadow-md will-change-transform"
                  style={{
                    animation: isRobotOperational
                      ? `robotScanUpper ${robotScanDuration}s ease-in-out infinite alternate`
                      : 'none',
                    transform: `rotate(${baseUpper}deg)`,
                    animationPlayState: isSystemRunning ? 'running' : 'paused',
                  }}
                >
                  {/* Elbow Joint with bright cyan/blue ring */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#38bdf8] border-2 border-white shadow-sm flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0284c7]"></div>
                  </div>

                  {/* Elevated Forearm Segment (maintains safe clearance above cargo boxes) */}
                  <div
                    className="robot-forearm absolute top-9 left-0 w-2 h-[34px] bg-slate-300 origin-top rounded-sm shadow-md will-change-transform"
                    style={{
                      animation: isRobotOperational
                        ? `robotScanFore ${robotScanDuration}s ease-in-out infinite alternate`
                        : 'none',
                      transform: `rotate(${baseFore}deg)`,
                      animationPlayState: isSystemRunning ? 'running' : 'paused',
                    }}
                  >
                    {/* End Effector Nozzle */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-2.5 bg-[#0f172a] border border-slate-600 rounded-xs"></div>

                    {/* Optical Scanning Cone Light Beam projecting safely down onto boxes */}
                    {isRobotOperational && (
                      <div
                        className="absolute top-8 -left-5 w-14 h-18 pointer-events-none"
                        style={{
                          background:
                            'linear-gradient(180deg, rgba(56, 189, 248, 0.65) 0%, rgba(16, 185, 129, 0.3) 75%, transparent 100%)',
                          clipPath: 'polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)',
                          animation: `scanBeamPulse ${robotScanDuration}s ease-in-out infinite alternate`,
                          animationPlayState: isSystemRunning ? 'running' : 'paused',
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* The Conveyor Assembly */}
              <div className="absolute bottom-[72px] left-8 right-8 z-10">
                {/* Belt */}
                <div
                  className="w-full h-5 border-t border-b border-slate-600 shadow-md relative"
                  style={{
                    background:
                      'repeating-linear-gradient(115deg, #1e293b 0px, #1e293b 16px, #2a3b53 16px, #2a3b53 26px)',
                    backgroundSize: '26px 100%',
                    animation: `conveyorScroll ${beltDuration}s linear infinite`,
                    animationPlayState: isSystemRunning ? 'running' : 'paused',
                  }}
                />

                {/* Left End Roller Wheel */}
                <div
                  className="absolute -left-3.5 -top-1 w-7 h-7 rounded-full bg-gradient-to-r from-[#475569] to-[#1e293b] border-2 border-slate-600 flex items-center justify-center shadow-lg"
                  style={{
                    animation: `spinRoller ${beltDuration}s linear infinite`,
                    animationPlayState: isSystemRunning ? 'running' : 'paused',
                  }}
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-[#1e293b] border border-slate-500"></div>
                </div>

                {/* Right End Roller Wheel */}
                <div
                  className="absolute -right-3.5 -top-1 w-7 h-7 rounded-full bg-gradient-to-r from-[#475569] to-[#1e293b] border-2 border-slate-600 flex items-center justify-center shadow-lg"
                  style={{
                    animation: `spinRoller ${beltDuration}s linear infinite`,
                    animationPlayState: isSystemRunning ? 'running' : 'paused',
                  }}
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-[#1e293b] border border-slate-500"></div>
                </div>

                {/* 4 Shaded Vertical Support Legs */}
                <div className="absolute top-5 left-0 right-0 flex justify-between px-16 pointer-events-none">
                  <div
                    className="w-3 h-[70px]"
                    style={{
                      background: 'linear-gradient(90deg, #1e293b 0%, #475569 50%, #0f172a 100%)',
                    }}
                  />
                  <div
                    className="w-3 h-[70px]"
                    style={{
                      background: 'linear-gradient(90deg, #1e293b 0%, #475569 50%, #0f172a 100%)',
                    }}
                  />
                  <div
                    className="w-3 h-[70px]"
                    style={{
                      background: 'linear-gradient(90deg, #1e293b 0%, #475569 50%, #0f172a 100%)',
                    }}
                  />
                  <div
                    className="w-3 h-[70px]"
                    style={{
                      background: 'linear-gradient(90deg, #1e293b 0%, #475569 50%, #0f172a 100%)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ================= TELEMETRY STATS DECK ================= */}
          <div className="grid grid-cols-3 py-4 sm:py-6 px-3 sm:px-6 md:px-12 bg-white border-b border-[#f1f5f9] text-center">
            <div className="px-1">
              <p className="text-[10px] sm:text-xs md:text-sm font-medium text-[#475569] mb-1">
                Batch Quality
              </p>
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#1e293b] tracking-tight">
                {simulatedQuality}%
              </h3>
            </div>
            <div className="px-1 border-x border-[#f1f5f9]">
              <p className="text-[10px] sm:text-xs md:text-sm font-medium text-[#475569] mb-1">
                Total Output
              </p>
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#1e293b] tracking-tight">
                {totalOutput.toLocaleString()} <span className="hidden sm:inline">units</span>
              </h3>
            </div>
            <div className="px-1">
              <p className="text-[10px] sm:text-xs md:text-sm font-medium text-[#475569] mb-1">
                Thermal Delta
              </p>
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#1e293b] tracking-tight">
                {simulatedDelta > 0 ? `+${simulatedDelta}` : simulatedDelta}.0°C
              </h3>
            </div>
          </div>

          {/* ================= CONTROL SYSTEM INTERFACE ================= */}
          <div className="p-4 sm:p-6 md:p-8 bg-white space-y-4 sm:space-y-6">
            
            {/* Row 1: OPC UA Server Connection & Tag Variable Select */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-start">
              {/* Connection Pill Toggle */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#1e293b] mb-1.5 sm:mb-2">
                  OPC UA Server Connection
                </label>
                <div className="bg-[#f1f5f9] p-1 rounded-full flex items-center h-11 sm:h-12 w-full max-w-full sm:max-w-[340px]">
                  <button
                    type="button"
                    onClick={() => setIsConnectedOnline(true)}
                    className={`flex-1 h-9 sm:h-10 rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer flex items-center justify-center ${
                      isConnectedOnline
                        ? 'bg-[#2563eb] text-white shadow-sm'
                        : 'text-[#475569] hover:text-[#1e293b]'
                    }`}
                  >
                    Online
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsConnectedOnline(false)}
                    className={`flex-1 h-9 sm:h-10 rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer flex items-center justify-center ${
                      !isConnectedOnline
                        ? 'bg-[#2563eb] text-white shadow-sm'
                        : 'text-[#475569] hover:text-[#1e293b]'
                    }`}
                  >
                    Offline
                  </button>
                </div>
              </div>

              {/* Tag Selector */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#1e293b] mb-1.5 sm:mb-2">
                  OPC UA Tag Variable
                </label>
                <div className="relative">
                  <select
                    value={activeTag}
                    onChange={(e) => setActiveTag(e.target.value as TagKey)}
                    className="w-full h-11 sm:h-12 bg-[#f1f5f9] hover:bg-[#e9eff6] rounded-xl px-3.5 sm:px-4 pr-10 text-xs sm:text-sm font-mono font-semibold text-[#1e293b] cursor-pointer border border-transparent focus:border-[#2563eb] focus:outline-none transition-all appearance-none"
                  >
                    <option value="robot">ns=2;s=Line1.Robot.PPM</option>
                    <option value="speed">ns=2;s=Line1.Conveyor.Velocity</option>
                    <option value="temp">ns=2;s=Line1.Furnace.Temperature</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#64748b] absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Row 2: Modify Node Value Header */}
            <div className="pt-1 sm:pt-2 space-y-2 sm:space-y-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 text-xs sm:text-sm font-semibold">
                <span className="text-[#1e293b]">
                  {currentObj.label}
                </span>
                <span className="text-xs text-[#475569] font-normal">
                  Current Live:{' '}
                  <strong className="text-[#1e293b] font-bold">
                    {currentObj.live} {currentObj.unit}
                  </strong>
                </span>
              </div>

              {/* Row 3: Range Slider + Readout + Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                {/* Slider with blue progress fill */}
                <div className="relative flex-1 flex items-center w-full">
                  <input
                    type="range"
                    min={currentObj.min}
                    max={currentObj.max}
                    step={currentObj.step}
                    value={currentObj.target}
                    onChange={(e) => handleSliderMovement(parseFloat(e.target.value))}
                    className="w-full h-2 rounded-full cursor-pointer appearance-none bg-transparent"
                    style={{
                      background: `linear-gradient(to right, #2563eb 0%, #2563eb ${sliderPercent}%, #e2e8f0 ${sliderPercent}%, #e2e8f0 100%)`,
                    }}
                  />
                </div>

                {/* Staged Value & Read / Write Buttons */}
                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="text-xs sm:text-sm font-bold text-[#1e293b] min-w-[55px] sm:min-w-[65px] text-left sm:text-right">
                    {currentObj.target} {currentObj.unit}
                  </span>

                  <button
                    type="button"
                    onClick={dispatchReadCommand}
                    className="flex-1 sm:flex-initial bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#1e293b] text-xs sm:text-sm font-semibold py-2 sm:py-2 px-3 sm:px-4 rounded-xl transition-colors cursor-pointer text-center"
                  >
                    Read
                  </button>

                  <button
                    type="button"
                    onClick={dispatchWriteCommand}
                    className="flex-1 sm:flex-initial bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs sm:text-sm font-semibold py-2 sm:py-2 px-4 sm:px-5 rounded-xl shadow-sm transition-colors cursor-pointer text-center"
                  >
                    Write
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Scoped Keyframe Animations and Slider Styles */}
      <style>{`
        /* Continuous conveyor belt scroll */
        @keyframes conveyorScroll {
          from { background-position: 0 0; }
          to { background-position: 26px 0; }
        }

        /* End roller wheel spinning */
        @keyframes spinRoller {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* 
          Furnace is shifted to left: 190px - 362px (~25% to 45% of belt)
          1. Enters Grey
          2. Turns Heated Orange as it passes through furnace (~38%)
          3. Travels through clear space between furnace and robot as Orange
          4. Turns Verified Emerald Green under Robot Scanner at ~68%
        */
        @keyframes flowCargoScanned {
          0% {
            left: -40px;
            background-color: #64748b;
            border: 1px solid #94a3b8;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          }
          24% {
            left: 175px;
            background-color: #64748b;
            border: 1px solid #94a3b8;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          }
          38% {
            background-color: #ea580c;
            border: 1px solid #f97316;
            box-shadow: 0 0 12px rgba(234, 88, 12, 0.85);
          }
          62% {
            left: 508px;
            background-color: #ea580c;
            border: 1px solid #f97316;
            box-shadow: 0 0 12px rgba(234, 88, 12, 0.85);
          }
          70% {
            background-color: #10b981;
            border: 1px solid #34d399;
            box-shadow: 0 0 14px rgba(16, 185, 129, 0.85);
          }
          100% {
            left: calc(100% + 20px);
            background-color: #10b981;
            border: 1px solid #34d399;
            box-shadow: 0 0 14px rgba(16, 185, 129, 0.85);
          }
        }

        /* 
          If Robot is unable to scan (0 PPM, offline, or missed inspection):
          Enters Grey -> Turns Heated Orange in Furnace -> Remains Orange until exit
        */
        @keyframes flowCargoUnscanned {
          0% {
            left: -40px;
            background-color: #64748b;
            border: 1px solid #94a3b8;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          }
          24% {
            left: 175px;
            background-color: #64748b;
            border: 1px solid #94a3b8;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          }
          38% {
            background-color: #ea580c;
            border: 1px solid #f97316;
            box-shadow: 0 0 12px rgba(234, 88, 12, 0.85);
          }
          100% {
            left: calc(100% + 20px);
            background-color: #ea580c;
            border: 1px solid #f97316;
            box-shadow: 0 0 12px rgba(234, 88, 12, 0.85);
          }
        }

        /* Robot Arm Upper Joint Articulation */
        @keyframes robotScanUpper {
          0% {
            transform: rotate(${upperMin}deg);
          }
          50% {
            transform: rotate(${upperMax}deg);
          }
          100% {
            transform: rotate(${upperMin}deg);
          }
        }

        /* Robot Forearm Articulation (Zero Box Collision) */
        @keyframes robotScanFore {
          0% {
            transform: rotate(${foreMin}deg);
          }
          50% {
            transform: rotate(${foreMax}deg);
          }
          100% {
            transform: rotate(${foreMin}deg);
          }
        }

        /* Optical Inspection Scanning Beam */
        @keyframes scanBeamPulse {
          0% {
            opacity: 0.4;
            transform: scaleY(0.92) scaleX(0.95);
          }
          50% {
            opacity: 0.95;
            transform: scaleY(1.08) scaleX(1.05);
          }
          100% {
            opacity: 0.4;
            transform: scaleY(0.92) scaleX(0.95);
          }
        }

        /* WebKit Slider Thumb */
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
          transition: transform 0.1s ease;
        }

        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }

        /* Firefox Slider Thumb */
        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </section>
  );
}
