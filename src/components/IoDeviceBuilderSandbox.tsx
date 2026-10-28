import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RefreshCw, CheckCircle2, ChevronRight, Copy, Check, Sliders, Cpu, Activity, Layers, Terminal } from 'lucide-react';

type SensorKey = 'dht22' | 'adxl345' | 'radar';

interface SensorConfig {
  id: SensorKey;
  name: string;
  tagline: string;
  hardware: string;
  protocol: string;
  driverFiles: string[];
  blockName: string;
  blockDescription: string;
  inputs: { name: string; type: string; dim: string }[];
  outputs: { name: string; type: string; dim: string; unit: string }[];
  defaultParams: { name: string; value: string; type: string }[];
}

const SENSORS: Record<SensorKey, SensorConfig> = {
  dht22: {
    id: 'dht22',
    name: 'DHT-22 / AM2302 Sensor',
    tagline: 'Digital Humidity & High-Precision Temperature Module',
    hardware: 'Arduino Uno / Mega (ATmega328P)',
    protocol: '1-Wire Digital GPIO',
    driverFiles: ['DHT.cpp', 'DHT.h', 'Adafruit_Sensor.h'],
    blockName: 'DHT22_Environmental',
    blockDescription: 'Reads calibrated relative humidity and temperature from DHT22 module',
    inputs: [
      { name: 'Trigger', type: 'boolean', dim: '[1,1]' },
    ],
    outputs: [
      { name: 'Humidity', type: 'single', dim: '[1,1]', unit: '%RH' },
      { name: 'Temperature', type: 'single', dim: '[1,1]', unit: '°C' },
    ],
    defaultParams: [
      { name: 'PinNumber', value: '2', type: 'uint8' },
      { name: 'SensorType', value: 'DHT22', type: 'String' },
      { name: 'SampleTime', value: '0.5', type: 'double' },
    ]
  },
  adxl345: {
    id: 'adxl345',
    name: 'ADXL345 3-Axis Accelerometer',
    tagline: 'Tri-Axial MEMS Digital Acceleration for Robotics & Drivetrains',
    hardware: 'Raspberry Pi 4 / Compute Module',
    protocol: 'I2C / SPI (400 kHz Fast-Mode)',
    driverFiles: ['ADXL345.cpp', 'ADXL345.h', 'Wire.h'],
    blockName: 'ADXL345_Inertial',
    blockDescription: 'Captures dynamic tri-axial acceleration and shock events in Gs',
    inputs: [
      { name: 'ResetFIFO', type: 'boolean', dim: '[1,1]' },
    ],
    outputs: [
      { name: 'Accel_X', type: 'single', dim: '[1,1]', unit: 'm/s²' },
      { name: 'Accel_Y', type: 'single', dim: '[1,1]', unit: 'm/s²' },
      { name: 'Accel_Z', type: 'single', dim: '[1,1]', unit: 'm/s²' },
    ],
    defaultParams: [
      { name: 'I2C_Address', value: '0x53', type: 'uint8' },
      { name: 'Range', value: '±8g', type: 'String' },
      { name: 'DataRate', value: '100Hz', type: 'String' },
    ]
  },
  radar: {
    id: 'radar',
    name: 'FMCW 77 GHz RADAR Transceiver',
    tagline: 'Automotive & Aerospace Target Detection & Doppler Velocity',
    hardware: 'Custom DSP Board (TI IWR6843)',
    protocol: 'High-Speed SPI / UART (3 Mbps)',
    driverFiles: ['radar_driver.cpp', 'radar_parser.h', 'fft_window.h'],
    blockName: 'FMCW_DopplerRadar',
    blockDescription: 'Outputs detected target distance, radial Doppler velocity, and SNR',
    inputs: [
      { name: 'Threshold_dB', type: 'single', dim: '[1,1]' },
    ],
    outputs: [
      { name: 'Distance', type: 'single', dim: '[1,1]', unit: 'm' },
      { name: 'RadialVelocity', type: 'single', dim: '[1,1]', unit: 'm/s' },
      { name: 'AzimuthAngle', type: 'single', dim: '[1,1]', unit: 'deg' },
    ],
    defaultParams: [
      { name: 'CenterFreq', value: '77e9', type: 'double' },
      { name: 'ChirpSlope', value: '29.98e12', type: 'double' },
      { name: 'NumChirps', value: '128', type: 'uint16' },
    ]
  }
};

export default function IoDeviceBuilderSandbox() {
  const [selectedSensor, setSelectedSensor] = useState<SensorKey>('dht22');
  const [currentStep, setCurrentStep] = useState<number>(3); // 0=Source, 1=Parse, 2=Mask, 3=Generated Block Scope
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'block' | 'code' | 'logs'>('block');

  // Interactive physical stimulus sliders
  const [stimulusTemp, setStimulusTemp] = useState<number>(24.5);
  const [stimulusHumidity, setStimulusHumidity] = useState<number>(55.0);
  const [stimulusVibe, setStimulusVibe] = useState<number>(1.2);
  const [stimulusDistance, setStimulusDistance] = useState<number>(18.4);

  // Live telemetry state
  const [tick, setTick] = useState<number>(0);
  const animRef = useRef<number | null>(null);

  const sensor = SENSORS[selectedSensor];

  useEffect(() => {
    let lastTime = performance.now();
    const loop = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;
      if (isRunning) {
        setTick((prev) => prev + dt);
      }
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isRunning]);

  // Compute live readings with realistic noise and wave harmonics
  const getLiveReadings = () => {
    const t = tick * 2;
    if (selectedSensor === 'dht22') {
      const liveTemp = stimulusTemp + Math.sin(t * 0.8) * 0.4 + (Math.sin(t * 3.1) * 0.1);
      const liveHumidity = stimulusHumidity + Math.cos(t * 0.5) * 0.8 + (Math.sin(t * 2.3) * 0.15);
      return {
        Temperature: Number(liveTemp.toFixed(2)),
        Humidity: Number(liveHumidity.toFixed(2)),
      };
    } else if (selectedSensor === 'adxl345') {
      const liveX = Math.sin(t * 2.5) * stimulusVibe + (Math.sin(t * 11) * 0.1);
      const liveY = Math.cos(t * 2.5) * stimulusVibe + (Math.cos(t * 9) * 0.1);
      const liveZ = 9.81 + Math.sin(t * 1.2) * (stimulusVibe * 0.2);
      return {
        Accel_X: Number(liveX.toFixed(2)),
        Accel_Y: Number(liveY.toFixed(2)),
        Accel_Z: Number(liveZ.toFixed(2)),
      };
    } else {
      const liveDist = Math.max(1.0, stimulusDistance + Math.sin(t * 0.6) * 1.5);
      const liveVel = Math.cos(t * 0.6) * 4.2;
      const liveAzimuth = Math.sin(t * 0.4) * 12.0;
      return {
        Distance: Number(liveDist.toFixed(2)),
        RadialVelocity: Number(liveVel.toFixed(2)),
        AzimuthAngle: Number(liveAzimuth.toFixed(1)),
      };
    }
  };

  const liveData = getLiveReadings();

  const handleCopyCode = () => {
    const code = `% MATLAB System Object generated by Simulink IO Device Builder
classdef ${sensor.blockName} < matlab.System ...
        & coder.ExternalDependency ...
        & matlab.system.mixin.Propagates
    % ${sensor.blockDescription}

    properties (Nontunable)
        ${sensor.defaultParams.map(p => `${p.name} = ${p.value};`).join('\n        ')}
    end

    methods (Access = protected)
        function setupImpl(obj)
            % Initialize physical connection on ${sensor.hardware}
            coder.cinclude('${sensor.driverFiles[0].replace('.cpp', '.h')}');
            coder.ceval('${sensor.id}_begin', obj.${sensor.defaultParams[0].name});
        end

        function [${sensor.outputs.map(o => o.name).join(', ')}] = stepImpl(obj)
            % Read continuous telemetry streams
            ${sensor.outputs.map(o => `${o.name} = single(0);`).join('\n            ')}
            ${sensor.outputs.map(o => `coder.ceval('${sensor.id}_read_${o.name.toLowerCase()}', coder.wref(${o.name}));`).join('\n            ')}
        end

        function releaseImpl(obj)
            coder.ceval('${sensor.id}_close');
        end
    end
end`;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section 
      id="io-builder-sandbox" 
      className="py-16 md:py-24 border-b border-border-custom bg-[#07070a] text-white select-none relative overflow-hidden"
      aria-label="Interactive IO Device Builder Sandbox"
    >
      {/* Background aesthetic grid glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(232,68,9,0.12),transparent)] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-3 font-mono text-xs tracking-[0.2em] uppercase text-accent font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>Interactive Workflow Sandbox · Zero-to-One Prototype</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-[0.02em] text-white mb-4">
            Live IO Device Builder <span className="text-accent">&amp; Simulink Block Studio</span>
          </h2>
          <p className="text-base sm:text-lg font-light text-zinc-300 leading-relaxed">
            Experience how our redesigned wizard inspects third-party C/C++ driver libraries, auto-detects input/output ports, generates custom block masks, and compiles native Simulink blocks with live signal telemetry.
          </p>
        </div>

        {/* ================= MAIN INTERACTIVE WORKSPACE ================= */}
        <div className="bg-[#0f0f15] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          
          {/* Top Control Bar: Sensor Selector & Target Board */}
          <div className="bg-[#14141c] border-b border-zinc-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-semibold">Target Sensor:</span>
              <div className="flex flex-wrap gap-1.5" role="tablist">
                {(Object.keys(SENSORS) as SensorKey[]).map((key) => {
                  const s = SENSORS[key];
                  const isActive = selectedSensor === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedSensor(key)}
                      className={`px-3 py-1.5 rounded-lg font-mono text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-accent text-white shadow-md shadow-accent/25'
                          : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-750 hover:text-white'
                      }`}
                      role="tab"
                      aria-selected={isActive}
                    >
                      {s.name.split(' ')[0]} ({s.name.split(' ')[1] || ''})
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="font-mono text-xs px-2.5 py-1 bg-zinc-900 border border-zinc-700/80 rounded text-zinc-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-zinc-400 font-normal">Board:</span>
                <span className="text-white font-medium">{sensor.hardware.split('(')[0]}</span>
              </div>
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-xs font-mono flex items-center gap-1.5 transition-colors"
                title={isRunning ? 'Pause telemetry stream' : 'Resume telemetry stream'}
              >
                {isRunning ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                <span>{isRunning ? 'Pause Stream' : 'Run Stream'}</span>
              </button>
            </div>
          </div>

          {/* Wizard Breadcrumb Progression */}
          <div className="bg-[#0b0b10] border-b border-zinc-800/80 px-6 py-2.5 flex items-center gap-2 overflow-x-auto text-xs font-mono">
            {[
              { step: 0, label: '1. Source Files' },
              { step: 1, label: '2. Auto-Detect Ports' },
              { step: 2, label: '3. Mask Parameters' },
              { step: 3, label: '4. Generated Simulink Block' },
            ].map((st, i) => (
              <div key={st.step} className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setCurrentStep(st.step)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
                    currentStep === st.step
                      ? 'bg-accent/15 text-accent font-semibold border border-accent/40'
                      : currentStep > st.step
                      ? 'text-emerald-400 hover:text-emerald-300'
                      : 'text-zinc-500 hover:text-zinc-400'
                  }`}
                >
                  {currentStep > st.step ? <CheckCircle2 className="w-3.5 h-3.5" /> : null}
                  <span>{st.label}</span>
                </button>
                {i < 3 && <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />}
              </div>
            ))}
          </div>

          {/* Step Detail Content */}
          <div className="p-6 md:p-8">
            
            {/* STEP 0: SOURCE FILES SELECTION */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Step 1: Select Driver Source Files</h3>
                  <p className="text-sm text-zinc-400">
                    The IO Device Builder directly reads third-party sensor driver folders without requiring you to compile external C/C++ build chains.
                  </p>
                </div>

                <div className="bg-[#14141c] border border-zinc-800 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pb-3 border-b border-zinc-800">
                    <span>Working Directory: <strong className="text-zinc-200">/simulink/hardware_drivers/{sensor.id}/</strong></span>
                    <span className="text-emerald-400 font-semibold">✓ Directory Verified</span>
                  </div>

                  <div className="space-y-2">
                    <span className="font-mono text-xs uppercase text-zinc-400 tracking-wider font-semibold block">
                      Parsed C/C++ Files in Package:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                      {sensor.driverFiles.map((file, idx) => (
                        <div key={idx} className="p-3 bg-[#0d0d12] border border-zinc-700/80 rounded-lg flex items-center justify-between">
                          <span className="text-zinc-200 font-medium">{file}</span>
                          <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 font-bold">
                            Linked
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-5 py-2.5 bg-accent hover:bg-accent-hover text-white rounded-lg font-mono text-xs font-semibold flex items-center gap-2 transition-all shadow-lg shadow-accent/20"
                  >
                    <span>Run Parser &amp; Detect Ports</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 1: AUTO-DETECT PORTS */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Step 2: Automated Port Identification</h3>
                  <p className="text-sm text-zinc-400">
                    The AST parser extracts functions and registers, auto-generating strongly-typed Simulink input and output ports.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Inputs */}
                  <div className="bg-[#14141c] border border-zinc-800 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-zinc-800">
                      <span className="font-mono text-xs uppercase tracking-wider text-accent font-bold">Block Inputs</span>
                      <span className="font-mono text-[10px] text-zinc-400">{sensor.inputs.length} Port(s)</span>
                    </div>
                    <div className="space-y-2 font-mono text-xs">
                      {sensor.inputs.map((inp, idx) => (
                        <div key={idx} className="p-2.5 bg-[#0a0a0f] border border-zinc-700/70 rounded flex items-center justify-between">
                          <span className="text-white font-medium">{inp.name}</span>
                          <div className="flex gap-2 text-[10px] text-zinc-400">
                            <span className="bg-zinc-800 px-1.5 py-0.5 rounded">{inp.type}</span>
                            <span className="bg-zinc-800 px-1.5 py-0.5 rounded">{inp.dim}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Outputs */}
                  <div className="bg-[#14141c] border border-zinc-800 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-zinc-800">
                      <span className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-bold">Block Outputs (Detected)</span>
                      <span className="font-mono text-[10px] text-emerald-400 font-bold">✓ AUTO MAPPED</span>
                    </div>
                    <div className="space-y-2 font-mono text-xs">
                      {sensor.outputs.map((out, idx) => (
                        <div key={idx} className="p-2.5 bg-[#0a0a0f] border border-zinc-700/70 rounded flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span className="text-white font-medium">{out.name}</span>
                          </div>
                          <div className="flex gap-2 text-[10px] text-zinc-400">
                            <span className="bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 px-1.5 py-0.5 rounded font-mono">{out.unit}</span>
                            <span className="bg-zinc-800 px-1.5 py-0.5 rounded">{out.type}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setCurrentStep(0)}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg font-mono text-xs"
                  >
                    Back to Sources
                  </button>
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-5 py-2.5 bg-accent hover:bg-accent-hover text-white rounded-lg font-mono text-xs font-semibold flex items-center gap-2 transition-all shadow-lg shadow-accent/20"
                  >
                    <span>Configure Mask Parameters</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: MASK PARAMETERS */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Step 3: Define Block Mask &amp; Settings</h3>
                  <p className="text-sm text-zinc-400">
                    Engineers configure default block dialog parameters without writing custom Java or C++ S-functions.
                  </p>
                </div>

                <div className="bg-[#14141c] border border-zinc-800 rounded-xl p-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-xs text-zinc-400 uppercase tracking-wider block mb-1">Block Name:</label>
                      <input 
                        type="text" 
                        readOnly 
                        value={sensor.blockName} 
                        className="w-full bg-[#0d0d12] border border-zinc-700 rounded px-3 py-2 text-white font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-xs text-zinc-400 uppercase tracking-wider block mb-1">Protocol / Bus:</label>
                      <input 
                        type="text" 
                        readOnly 
                        value={sensor.protocol} 
                        className="w-full bg-[#0d0d12] border border-zinc-700 rounded px-3 py-2 text-white font-mono text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-xs text-zinc-400 uppercase tracking-wider block mb-2">Mask Tunable Parameters:</label>
                    <table className="w-full font-mono text-xs border border-zinc-800 rounded overflow-hidden">
                      <thead className="bg-[#0b0b10] text-zinc-400 text-left">
                        <tr>
                          <th className="p-2.5">Parameter Name</th>
                          <th className="p-2.5">Default Value</th>
                          <th className="p-2.5">Data Type</th>
                          <th className="p-2.5">Attribute</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800 bg-[#0d0d12]">
                        {sensor.defaultParams.map((p, idx) => (
                          <tr key={idx} className="hover:bg-zinc-800/40">
                            <td className="p-2.5 text-white font-medium">{p.name}</td>
                            <td className="p-2.5 text-accent font-semibold">{p.value}</td>
                            <td className="p-2.5 text-zinc-400">{p.type}</td>
                            <td className="p-2.5 text-emerald-400 text-[10px]">Non-Tunable</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg font-mono text-xs"
                  >
                    Back to Ports
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-mono text-xs font-semibold flex items-center gap-2 transition-all shadow-lg shadow-emerald-600/25"
                  >
                    <span>Generate Simulink Block</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: LIVE SIMULINK BLOCK & SCOPE */}
            {currentStep === 3 && (
              <div className="space-y-6">
                
                {/* Secondary navigation tabs */}
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveTab('block')}
                      className={`px-3 py-1.5 rounded-md font-mono text-xs font-medium flex items-center gap-1.5 ${
                        activeTab === 'block' ? 'bg-zinc-800 text-white border border-zinc-700' : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5 text-accent" />
                      <span>Simulink Block Canvas</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('code')}
                      className={`px-3 py-1.5 rounded-md font-mono text-xs font-medium flex items-center gap-1.5 ${
                        activeTab === 'code' ? 'bg-zinc-800 text-white border border-zinc-700' : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Generated System Object (.m)</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      Block Compiled &amp; Ready
                    </span>
                  </div>
                </div>

                {activeTab === 'block' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                    
                    {/* Visual Simulink Canvas & Block */}
                    <div className="lg:col-span-7 bg-[#0a0a0f] border border-zinc-800 rounded-xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[380px]">
                      {/* Simulink Canvas Background Grid */}
                      <div 
                        className="absolute inset-0 opacity-[0.07] pointer-events-none"
                        style={{
                          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                          backgroundSize: '16px 16px'
                        }}
                      />

                      <div className="flex items-center justify-between text-xs font-mono text-zinc-400 relative z-10 mb-4 pb-2 border-b border-zinc-800/80">
                        <span>Model: <strong className="text-white">autonomous_system.slx</strong></span>
                        <span className="text-accent font-semibold">Simulink Hardware Support</span>
                      </div>

                      {/* The Custom Block Render */}
                      <div className="relative z-10 my-auto flex items-center justify-center">
                        <div className="w-full max-w-md bg-white text-zinc-900 border-2 border-zinc-800 rounded shadow-2xl relative p-5 select-none transition-all">
                          {/* Block Header */}
                          <div className="text-center pb-2 border-b border-zinc-200 mb-4">
                            <span className="font-mono text-[10px] uppercase tracking-wider text-accent font-bold block">
                              Simulink IO Device
                            </span>
                            <h4 className="font-display text-lg uppercase tracking-wide text-zinc-900">
                              {sensor.blockName}
                            </h4>
                            <span className="text-[10px] text-zinc-500 font-mono block">
                              Target: {sensor.hardware.split(' ')[0]}
                            </span>
                          </div>

                          {/* Block Body: Ports Wire Layout */}
                          <div className="flex items-stretch justify-between gap-6 py-2">
                            {/* Input Ports */}
                            <div className="flex flex-col gap-3 justify-center">
                              {sensor.inputs.map((inp, idx) => (
                                <div key={idx} className="flex items-center gap-2 relative -left-7">
                                  <div className="w-3.5 h-3.5 bg-accent rounded-sm shadow flex items-center justify-center text-white text-[8px] font-bold">
                                    ▶
                                  </div>
                                  <span className="font-mono text-xs font-semibold text-zinc-700">{inp.name}</span>
                                </div>
                              ))}
                            </div>

                            {/* Center Sensor Icon / Graphic */}
                            <div className="flex flex-col items-center justify-center px-4 py-2 bg-zinc-50 border border-zinc-200 rounded">
                              <Activity className="w-8 h-8 text-accent animate-pulse" />
                              <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 mt-1">
                                {sensor.protocol.split(' ')[0]} Bus
                              </span>
                            </div>

                            {/* Output Ports with Live Telemetry */}
                            <div className="flex flex-col gap-3 justify-center">
                              {sensor.outputs.map((out, idx) => {
                                const val = (liveData as any)[out.name];
                                return (
                                  <div key={idx} className="flex items-center gap-2 relative -right-7 justify-end">
                                    <span className="font-mono text-xs font-semibold text-zinc-700">{out.name}</span>
                                    <div className="w-3.5 h-3.5 bg-emerald-500 rounded-sm shadow flex items-center justify-center text-white text-[8px] font-bold">
                                      ▶
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Live Telemetry Value Readout Badges */}
                          <div className="mt-4 pt-3 border-t border-zinc-200 grid grid-cols-2 gap-2 text-center font-mono text-xs">
                            {sensor.outputs.map((out, idx) => {
                              const val = (liveData as any)[out.name];
                              return (
                                <div key={idx} className="bg-zinc-100 rounded px-2 py-1">
                                  <span className="text-[10px] text-zinc-500 uppercase block">{out.name}</span>
                                  <strong className="text-zinc-900 font-bold">{val} {out.unit}</strong>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="text-[11px] font-mono text-zinc-500 relative z-10 text-center mt-3">
                        Drag-and-drop into any Simulink subsystem · Zero compilation scripts required
                      </div>
                    </div>

                    {/* Hardware Stimulus Controls & Scope */}
                    <div className="lg:col-span-5 bg-[#14141c] border border-zinc-800 rounded-xl p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
                          <span className="font-mono text-xs uppercase tracking-wider text-zinc-300 font-bold flex items-center gap-2">
                            <Sliders className="w-3.5 h-3.5 text-accent" />
                            Physical Stimulus Generator
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400 font-semibold">Active Feed</span>
                        </div>

                        {selectedSensor === 'dht22' && (
                          <div className="space-y-4 font-mono text-xs">
                            <div>
                              <div className="flex justify-between text-zinc-400 mb-1">
                                <span>Ambient Temperature:</span>
                                <strong className="text-white">{stimulusTemp.toFixed(1)} °C</strong>
                              </div>
                              <input 
                                type="range" 
                                min="0" 
                                max="60" 
                                step="0.5" 
                                value={stimulusTemp} 
                                onChange={(e) => setStimulusTemp(parseFloat(e.target.value))}
                                className="w-full accent-accent cursor-pointer"
                              />
                            </div>

                            <div>
                              <div className="flex justify-between text-zinc-400 mb-1">
                                <span>Relative Humidity:</span>
                                <strong className="text-white">{stimulusHumidity.toFixed(1)} %RH</strong>
                              </div>
                              <input 
                                type="range" 
                                min="10" 
                                max="95" 
                                step="1" 
                                value={stimulusHumidity} 
                                onChange={(e) => setStimulusHumidity(parseFloat(e.target.value))}
                                className="w-full accent-accent cursor-pointer"
                              />
                            </div>
                          </div>
                        )}

                        {selectedSensor === 'adxl345' && (
                          <div className="space-y-4 font-mono text-xs">
                            <div>
                              <div className="flex justify-between text-zinc-400 mb-1">
                                <span>Vibration Amplitude (G):</span>
                                <strong className="text-white">{stimulusVibe.toFixed(2)} G</strong>
                              </div>
                              <input 
                                type="range" 
                                min="0.1" 
                                max="8.0" 
                                step="0.1" 
                                value={stimulusVibe} 
                                onChange={(e) => setStimulusVibe(parseFloat(e.target.value))}
                                className="w-full accent-accent cursor-pointer"
                              />
                            </div>
                            <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                              Simulates mechanical chassis vibration across automotive motor mounts.
                            </p>
                          </div>
                        )}

                        {selectedSensor === 'radar' && (
                          <div className="space-y-4 font-mono text-xs">
                            <div>
                              <div className="flex justify-between text-zinc-400 mb-1">
                                <span>Target Distance:</span>
                                <strong className="text-white">{stimulusDistance.toFixed(1)} meters</strong>
                              </div>
                              <input 
                                type="range" 
                                min="2.0" 
                                max="80.0" 
                                step="0.5" 
                                value={stimulusDistance} 
                                onChange={(e) => setStimulusDistance(parseFloat(e.target.value))}
                                className="w-full accent-accent cursor-pointer"
                              />
                            </div>
                            <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                              Simulates FMCW chirp sweep tracking obstacles ahead in autonomous vehicles.
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Real-time Oscilloscope Mini-Plot */}
                      <div className="mt-6 pt-4 border-t border-zinc-800">
                        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-2">
                          <span>Simulink Scope Telemetry</span>
                          <span className="text-accent font-mono">{sensor.protocol.split(' ')[0]} 500 Hz</span>
                        </div>
                        <div className="h-20 bg-[#09090d] border border-zinc-800 rounded p-2 flex items-end gap-1 overflow-hidden relative">
                          {/* Animated bars simulating realtime scope buffer */}
                          {Array.from({ length: 28 }).map((_, i) => {
                            const offset = (i - 14) * 0.25;
                            const hVal = Math.min(100, Math.max(15, 50 + Math.sin(tick * 3 + offset) * 35));
                            return (
                              <div 
                                key={i} 
                                className="flex-1 bg-accent/80 rounded-t-sm transition-all duration-75"
                                style={{ height: `${hVal}%` }}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'code' && (
                  <div className="bg-[#0c0c12] border border-zinc-800 rounded-xl p-5 relative font-mono text-xs">
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
                      <span className="text-zinc-300">Generated MATLAB System Object: <strong className="text-accent">{sensor.blockName}.m</strong></span>
                      <button
                        onClick={handleCopyCode}
                        className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded flex items-center gap-1.5 transition-colors"
                      >
                        {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                      </button>
                    </div>

                    <pre className="text-zinc-300 overflow-x-auto text-xs leading-relaxed max-h-[360px]">
{`% MATLAB System Object generated by Simulink IO Device Builder
classdef ${sensor.blockName} < matlab.System ...
        & coder.ExternalDependency ...
        & matlab.system.mixin.Propagates
    % ${sensor.blockDescription}

    properties (Nontunable)
        ${sensor.defaultParams.map(p => `${p.name} = ${p.value};`).join('\n        ')}
    end

    methods (Access = protected)
        function setupImpl(obj)
            % Initialize physical connection on ${sensor.hardware}
            coder.cinclude('${sensor.driverFiles[0].replace('.cpp', '.h')}');
            coder.ceval('${sensor.id}_begin', obj.${sensor.defaultParams[0].name});
        end

        function [${sensor.outputs.map(o => o.name).join(', ')}] = stepImpl(obj)
            % Read continuous telemetry streams
            ${sensor.outputs.map(o => `${o.name} = single(0);`).join('\n            ')}
            ${sensor.outputs.map(o => `coder.ceval('${sensor.id}_read_${o.name.toLowerCase()}', coder.wref(${o.name}));`).join('\n            ')}
        end

        function releaseImpl(obj)
            coder.ceval('${sensor.id}_close');
        end
    end
end`}
                    </pre>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Bottom Card Footer */}
          <div className="bg-[#0b0b10] border-t border-zinc-800/80 px-6 py-4 flex flex-wrap items-center justify-between text-xs font-mono text-zinc-400">
            <div>
              Status: <span className="text-emerald-400 font-semibold">Ready for deployment to Simulink model</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Time saved: <strong className="text-white">~2.5 days per block</strong></span>
              <span>C++ requirement: <strong className="text-accent">0 lines</strong></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
