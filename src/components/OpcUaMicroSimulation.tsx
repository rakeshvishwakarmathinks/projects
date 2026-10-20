import React, { useState, useEffect, useMemo } from 'react';
import { 
  Server, 
  Wifi, 
  WifiOff, 
  Activity, 
  Flame, 
  RotateCw, 
  Sliders, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Terminal, 
  Code2, 
  ShieldCheck, 
  Layers, 
  Info,
  Clock
} from 'lucide-react';

interface NodeItem {
  id: string;
  name: string;
  dataType: string;
  accessLevel: string;
  unit: string;
  value: number;
  target: number;
  min: number;
  max: number;
  description: string;
  history: number[];
}

export default function OpcUaMicroSimulation() {
  // Connection state (starts connected on boot)
  const [serverConnected, setServerConnected] = useState<boolean>(true);
  const [endpointUrl, setEndpointUrl] = useState<string>('opc.tcp://localhost:4840');
  const [activeNodeKey, setActiveNodeKey] = useState<'conveyor' | 'temp'>('conveyor');
  
  // Exact OPC UA Server State based on hardware simulation logic
  const [serverState, setServerState] = useState<{
    conveyor: NodeItem;
    temp: NodeItem;
  }>({
    conveyor: {
      id: 'ns=2;s=Conveyor_Speed',
      name: 'Conveyor Speed',
      dataType: 'Double (Float64)',
      accessLevel: 'CurrentRead | CurrentWrite',
      unit: 'RPM',
      value: 50,
      target: 50,
      min: 0,
      max: 120,
      description: 'Packaging line conveyor roller drive encoder',
      history: [49, 50, 50, 51, 50, 50, 49, 50]
    },
    temp: {
      id: 'ns=2;s=Furnace_Temperature',
      name: 'Furnace Temperature',
      dataType: 'Double (Float64)',
      accessLevel: 'CurrentRead | CurrentWrite',
      unit: '°C',
      value: 210,
      target: 210,
      min: 20,
      max: 500,
      description: 'Curing furnace internal heating chamber thermocouple',
      history: [209, 210, 210, 211, 210, 210, 209, 210]
    }
  });

  // Safe write input state
  const [writeInputValue, setWriteInputValue] = useState<string>('50');
  const [writeFeedback, setWriteFeedback] = useState<{
    status: 'idle' | 'success' | 'error';
    message: string;
    code?: string;
  }>({ status: 'idle', message: '' });

  // Activity logs state
  const [logs, setLogs] = useState<Array<{
    id: number;
    time: string;
    type: 'INFO' | 'READ' | 'WRITE' | 'WARN' | 'ERROR';
    text: string;
    code: string;
  }>>([
    { id: 1, time: '10:14:02.110', type: 'INFO', text: 'OPC UA session established with opc.tcp://localhost:4840', code: 'Good_Completeness' },
    { id: 2, time: '10:14:02.148', type: 'READ', text: 'Subscribed to ns=2;s=Conveyor_Speed (SamplingInterval: 250ms)', code: 'Good_Completeness' },
    { id: 3, time: '10:14:02.152', type: 'READ', text: 'Subscribed to ns=2;s=Furnace_Temperature (SamplingInterval: 500ms)', code: 'Good_Completeness' }
  ]);

  const [showMatlabCode, setShowMatlabCode] = useState<boolean>(false);
  const activeNode = serverState[activeNodeKey];

  // Helper to add activity log entries
  const addLog = (type: 'INFO' | 'READ' | 'WRITE' | 'WARN' | 'ERROR', text: string, code: string) => {
    const now = new Date();
    const timeStr = `${now.toTimeString().split(' ')[0]}.${String(now.getMilliseconds()).padStart(3, '0')}`;
    setLogs(prev => [
      { id: Date.now() + Math.random(), time: timeStr, type, text, code },
      ...prev.slice(0, 19)
    ]);
  };

  // Sync write input when active node changes
  useEffect(() => {
    if (activeNode) {
      setWriteInputValue(Math.round(activeNode.target).toString());
      setWriteFeedback({ status: 'idle', message: '' });
    }
  }, [activeNodeKey]);

  // Telemetry loop: smoothly moves telemetry values towards targets with realistic minor jitter
  useEffect(() => {
    if (!serverConnected) return;

    const interval = setInterval(() => {
      setServerState(prev => {
        const next = { ...prev };
        
        // 1. Conveyor speed update
        const conv = next.conveyor;
        const convDiff = conv.target - conv.value;
        const convStep = Math.abs(convDiff) > 1 ? convDiff * 0.3 : convDiff;
        const convJitter = conv.target > 0 ? (Math.random() - 0.5) * 0.6 : 0;
        const newConvVal = Math.max(0, Math.round((conv.value + convStep + convJitter) * 10) / 10);
        const newConvHist = [...conv.history.slice(-14), newConvVal];
        next.conveyor = { ...conv, value: newConvVal, history: newConvHist };

        // 2. Furnace temperature update
        const furn = next.temp;
        const furnDiff = furn.target - furn.value;
        const furnStep = Math.abs(furnDiff) > 1 ? furnDiff * 0.2 : furnDiff;
        const furnJitter = (Math.random() - 0.5) * 0.8;
        const newFurnVal = Math.max(20, Math.round((furn.value + furnStep + furnJitter) * 10) / 10);
        const newFurnHist = [...furn.history.slice(-14), newFurnVal];
        next.temp = { ...furn, value: newFurnVal, history: newFurnHist };

        return next;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [serverConnected]);

  // Toggle server connection (toggleConnect)
  const handleToggleConnect = () => {
    if (serverConnected) {
      setServerConnected(false);
      setWriteFeedback({ status: 'idle', message: '' });
      addLog('WARN', `Disconnected from ${endpointUrl}. Session closed cleanly.`, 'Bad_No_Communication');
    } else {
      setServerConnected(true);
      setWriteFeedback({ status: 'idle', message: '' });
      addLog('INFO', `Connected to ${endpointUrl}. Endpoint authenticated.`, 'Good_Completeness');
    }
  };

  // Select node (selectNode)
  const handleSelectNode = (nodeKey: 'conveyor' | 'temp') => {
    if (!serverConnected) return;
    setActiveNodeKey(nodeKey);
    const nodeInfo = serverState[nodeKey];
    setWriteInputValue(Math.round(nodeInfo.target).toString());
    setWriteFeedback({ status: 'idle', message: '' });
  };

  // Safe write setpoint handler (executeWriteValue)
  const handleExecuteWriteValue = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!serverConnected) {
      setWriteFeedback({
        status: 'error',
        message: 'Action Failed: Establish a server network path connection first.',
        code: 'Bad_No_Communication'
      });
      addLog('ERROR', 'Write attempt blocked: client is not connected to server.', 'Bad_No_Communication');
      return;
    }

    const inputVal = parseFloat(writeInputValue);
    const nodeInfo = serverState[activeNodeKey];

    // Bounds checking
    if (isNaN(inputVal) || inputVal < nodeInfo.min || inputVal > nodeInfo.max) {
      setWriteFeedback({
        status: 'error',
        message: `Value validation out of bounds! Input range accepted: ${nodeInfo.min} to ${nodeInfo.max} ${nodeInfo.unit}.`,
        code: 'BadOutOfRange (0x803C0000)'
      });
      addLog('ERROR', `Write rejected: ${inputVal} ${nodeInfo.unit} out of bounds (${nodeInfo.min} - ${nodeInfo.max})`, 'BadOutOfRange');
      return;
    }

    // Write back to server state
    setServerState(prev => ({
      ...prev,
      [activeNodeKey]: {
        ...prev[activeNodeKey],
        target: inputVal
      }
    }));

    // Status message
    if (activeNodeKey === 'temp' && inputVal > 380) {
      setWriteFeedback({
        status: 'success',
        message: `Setpoint written: ${inputVal} ${nodeInfo.unit}. Note: Operating above 380 °C threshold triggers Good_Local_Override_Alarm.`,
        code: 'Good_Local_Override_Alarm'
      });
      addLog('WARN', `Write executed: ${nodeInfo.id} set to ${inputVal} ${nodeInfo.unit} (> 380 °C)`, 'Good_Local_Override_Alarm');
    } else {
      setWriteFeedback({
        status: 'success',
        message: `Setpoint written successfully: ${inputVal} ${nodeInfo.unit}. Server acknowledged write.`,
        code: 'Good_Completeness'
      });
      addLog('WRITE', `WriteRequest ${nodeInfo.id} -> ${inputVal} ${nodeInfo.unit}`, 'Good_Completeness');
    }
  };

  // Quick Preset Scenarios
  const applyPreset = (preset: 'nominal' | 'heavy' | 'stop') => {
    if (!serverConnected) return;
    if (preset === 'nominal') {
      setServerState(prev => ({
        ...prev,
        conveyor: { ...prev.conveyor, target: 50 },
        temp: { ...prev.temp, target: 210 }
      }));
      setWriteInputValue(activeNodeKey === 'conveyor' ? '50' : '210');
      addLog('WRITE', 'Preset loaded: Nominal Production (50 RPM / 210 °C)', 'Good_Completeness');
    } else if (preset === 'heavy') {
      setServerState(prev => ({
        ...prev,
        conveyor: { ...prev.conveyor, target: 95 },
        temp: { ...prev.temp, target: 420 }
      }));
      setWriteInputValue(activeNodeKey === 'conveyor' ? '95' : '420');
      addLog('WARN', 'Preset loaded: High-Heat Stress Run (95 RPM / 420 °C) -> Thermal Alarm Active', 'Good_Local_Override_Alarm');
    } else if (preset === 'stop') {
      setServerState(prev => ({
        ...prev,
        conveyor: { ...prev.conveyor, target: 0 },
        temp: { ...prev.temp, target: 45 }
      }));
      setWriteInputValue(activeNodeKey === 'conveyor' ? '0' : '45');
      addLog('WARN', 'Preset loaded: Line Standby / Idle (0 RPM / 45 °C)', 'Good_Completeness');
    }
  };

  // Dynamic calculations from the code snippet
  const beltSpeed = serverState.conveyor.value;
  const tempVal = serverState.temp.value;

  // 1. Conveyor Belt speed calculation:
  // if (beltSpeed === 0) { beltEl.style.animationPlayState = 'paused'; }
  // else { const duration = Math.max(0.1, 2 - (beltSpeed / 60)); }
  const isConveyorMoving = serverConnected && beltSpeed > 0;
  const conveyorDuration = useMemo(() => {
    if (!isConveyorMoving) return 0;
    return Math.max(0.1, 2 - (beltSpeed / 60));
  }, [isConveyorMoving, beltSpeed]);

  // 2. Furnace Temperature indicator alarm limits state:
  // if (tempVal > 380) { lightEl = red; statusBox = "Good_Local_Override_Alarm"; }
  // else { lightEl = green; statusBox = "Good_Completeness"; }
  const isTempAlarm = serverConnected && tempVal > 380;

  // Status code & badge determination
  const statusBadgeInfo = useMemo(() => {
    if (!serverConnected) {
      return {
        text: 'Bad_No_Communication',
        color: '#ef4444',
        bg: 'rgba(239, 68, 68, 0.2)',
        isError: true
      };
    }
    if (isTempAlarm) {
      return {
        text: 'Good_Local_Override_Alarm',
        color: '#ef4444',
        bg: 'rgba(239, 68, 68, 0.2)',
        isError: true
      };
    }
    return {
      text: 'Good_Completeness',
      color: '#10b981',
      bg: 'rgba(16, 185, 129, 0.2)',
      isError: false
    };
  }, [serverConnected, isTempAlarm]);

  // Step adjustments for write input
  const nudgeDeltas = activeNodeKey === 'conveyor' ? [-20, -5, +5, +20] : [-50, -10, +10, +50];

  return (
    <section id="interactive-simulator" className="py-20 border-b border-border-custom bg-bg relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-sm font-mono text-xs text-accent uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            Interactive Micro-Simulation
          </div>
          <h2 className="font-display text-4xl md:text-6xl tracking-wide text-ink mb-4 uppercase">
            Test the live OPC UA read/write mechanics
          </h2>
          <p className="text-lg font-light text-ink-2 leading-relaxed">
            Industrial protocols are notoriously abstract until you see them move physical machinery. Use this interactive micro-simulator to connect to a virtual industrial server, observe telemetry updates, test safe setpoint writes, and experience how the no-code client simplifies industrial automation.
          </p>
        </div>

        {/* SIMULATOR ENCLOSURE */}
        <div className="bg-[#121824] text-[#f8fafc] rounded-sm border border-[#334155] shadow-2xl overflow-hidden">
          
          {/* Top Industrial Header & Connection Bar */}
          <div className="bg-[#1e293b] border-b border-[#334155] p-4 md:px-6 md:py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-[#0076a8]/20 border border-[#0076a8]/40 flex items-center justify-center text-[#38bdf8] shrink-0">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#94a3b8] font-medium">MATLAB OPC UA Explorer</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#121824] border border-[#334155] text-slate-300">UX Portfolio Prototype</span>
                </div>
                <h3 className="font-display text-xl text-white tracking-wide uppercase">Industrial Read / Write Physical Simulation</h3>
              </div>
            </div>

            {/* Connection Controls (toggleConnect) */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center bg-[#121824] border border-[#334155] rounded px-3 py-1.5 font-mono text-xs text-slate-300">
                <span className="text-[#94a3b8] mr-1.5 hidden sm:inline">Endpoint:</span>
                <input 
                  type="text" 
                  id="endpointUrl"
                  value={endpointUrl}
                  disabled={serverConnected}
                  onChange={(e) => setEndpointUrl(e.target.value)}
                  className="bg-transparent text-slate-200 focus:outline-none w-44 sm:w-56 text-xs font-mono disabled:text-[#94a3b8]"
                  title="OPC UA Server Endpoint URL"
                />
              </div>

              <button
                id="connectBtn"
                onClick={handleToggleConnect}
                className={`inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider px-4 py-2 rounded transition-all font-semibold cursor-pointer ${
                  serverConnected 
                    ? 'bg-[#ef4444] hover:bg-red-700 text-white shadow-lg shadow-red-950/40' 
                    : 'bg-[#0076a8] hover:bg-[#00608a] text-white shadow-lg shadow-blue-950/40'
                }`}
              >
                {serverConnected ? (
                  <>
                    <WifiOff className="w-3.5 h-3.5" />
                    <span>Disconnect Server</span>
                  </>
                ) : (
                  <>
                    <Wifi className="w-3.5 h-3.5" />
                    <span>Connect Server</span>
                  </>
                )}
              </button>

              {/* Code Toggle Button */}
              <button
                onClick={() => setShowMatlabCode(!showMatlabCode)}
                className={`p-2 rounded border font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                  showMatlabCode 
                    ? 'bg-[#334155] border-slate-500 text-white' 
                    : 'bg-[#121824] border-[#334155] text-slate-300 hover:bg-[#334155]'
                }`}
                title="Toggle equivalent MATLAB script"
              >
                <Code2 className="w-4 h-4 text-accent" />
                <span className="hidden sm:inline">MATLAB Script</span>
              </button>
            </div>
          </div>

          {/* Quick Scenario Injection Toolbar */}
          <div className="bg-[#162032] border-b border-[#334155] px-4 md:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center gap-2 text-[#94a3b8]">
              <Sliders className="w-3.5 h-3.5 text-accent" />
              <span className="uppercase tracking-wider">Scenario Injection:</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => applyPreset('nominal')}
                className="px-2.5 py-1 rounded bg-[#1e293b] hover:bg-[#334155] border border-[#334155] text-slate-200 transition-colors cursor-pointer"
              >
                Nominal Run (50 RPM / 210 °C)
              </button>
              <button
                onClick={() => applyPreset('heavy')}
                className="px-2.5 py-1 rounded bg-red-950/50 hover:bg-red-900/60 border border-red-700/60 text-red-300 transition-colors cursor-pointer"
              >
                Thermal Alarm Test (95 RPM / 420 °C)
              </button>
              <button
                onClick={() => applyPreset('stop')}
                className="px-2.5 py-1 rounded bg-amber-950/50 hover:bg-amber-900/60 border border-amber-700/60 text-amber-300 transition-colors cursor-pointer"
              >
                Emergency Stop (0 RPM / 45 °C)
              </button>
            </div>
          </div>

          {/* MATLAB Code Comparison Panel (Expandable) */}
          {showMatlabCode && (
            <div className="bg-[#0c101a] border-b border-[#334155] p-4 md:px-6 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#334155] text-[#94a3b8]">
                <span className="flex items-center gap-2 text-accent font-semibold">
                  <Code2 className="w-4 h-4" />
                  Equivalent MATLAB Code (Hand-Written Script vs Explorer App)
                </span>
                <span className="text-[#94a3b8]">Auto-Generated by R2026a Client</span>
              </div>
              <pre className="text-slate-300 overflow-x-auto leading-relaxed">
                <span className="text-slate-500">% 1. Connect to OPC UA Server Endpoint</span><br />
                ua = opcua(<span className="text-amber-300">'{endpointUrl}'</span>);<br />
                connect(ua);<br /><br />
                <span className="text-slate-500">% 2. Resolve Variable Node Reference</span><br />
                node = findNodeByName(ua.Namespace, <span className="text-amber-300">'{activeNode.id}'</span>);<br /><br />
                <span className="text-slate-500">% 3. Read Current Value and Quality Code</span><br />
                [val, quality, time] = readValue(ua, node);<br /><br />
                <span className="text-slate-500">% 4. Safe Write Setpoint back to PLC</span><br />
                writeValue(ua, node, <span className="text-emerald-400">{activeNode.target}</span>);
              </pre>
            </div>
          )}

          {/* Main 2-Column Industrial Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
            
            {/* LEFT PANEL: OPC UA Structural Setup (Node Hierarchy Browser) */}
            <div className="lg:col-span-4 bg-[#1e293b] border-b lg:border-b-0 lg:border-r border-[#334155] p-4 md:p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#334155]">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-accent" />
                    <span className="font-mono text-xs uppercase tracking-wider text-[#94a3b8] font-semibold">OPC UA Node Hierarchy</span>
                  </div>
                  <span className="font-mono text-[11px] text-[#94a3b8]">Namespace: 2</span>
                </div>

                <p className="text-xs text-[#94a3b8] mb-4 font-light">
                  {serverConnected 
                    ? 'Click any node to inspect telemetry and write new operational values:' 
                    : 'Server is disconnected. Connect server to inspect node tree.'}
                </p>

                {/* Node Tree (node-tree & node-item) */}
                <div className="space-y-2">
                  {/* Node 1: Conveyor */}
                  <div
                    id="node-conveyor"
                    onClick={() => handleSelectNode('conveyor')}
                    className={`p-3 rounded border transition-all cursor-pointer ${
                      activeNodeKey === 'conveyor' 
                        ? 'bg-[#0076a8] border-[#38bdf8] text-white shadow-md' 
                        : 'bg-[#121824] border-[#334155] text-[#f8fafc] hover:border-slate-500 hover:bg-[#1a2333]'
                    } ${!serverConnected ? 'opacity-60 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <RotateCw className={`w-4 h-4 ${isConveyorMoving ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
                        <span className="font-mono text-xs font-semibold">📁 ns=2;s=Conveyor_Speed</span>
                      </div>
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-black/30">
                        {serverConnected ? `${serverState.conveyor.value} RPM` : '---'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 pt-1.5 border-t border-white/10">
                      <span>Double · Range: 0 to 120 RPM</span>
                      <span className="text-emerald-300 font-semibold">Read / Write</span>
                    </div>
                  </div>

                  {/* Node 2: Furnace */}
                  <div
                    id="node-temp"
                    onClick={() => handleSelectNode('temp')}
                    className={`p-3 rounded border transition-all cursor-pointer ${
                      activeNodeKey === 'temp' 
                        ? 'bg-[#0076a8] border-[#38bdf8] text-white shadow-md' 
                        : 'bg-[#121824] border-[#334155] text-[#f8fafc] hover:border-slate-500 hover:bg-[#1a2333]'
                    } ${!serverConnected ? 'opacity-60 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <Flame className={`w-4 h-4 ${isTempAlarm ? 'text-red-400 animate-pulse' : ''}`} />
                        <span className="font-mono text-xs font-semibold">📁 ns=2;s=Furnace_Temperature</span>
                      </div>
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-black/30">
                        {serverConnected ? `${serverState.temp.value} °C` : '---'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 pt-1.5 border-t border-white/10">
                      <span>Double · Range: 20 to 500 °C</span>
                      <span className="text-emerald-300 font-semibold">Read / Write</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Node Inspector Summary */}
              <div className="mt-6 pt-4 border-t border-[#334155] text-xs font-mono">
                <div className="text-[11px] uppercase tracking-wider text-[#94a3b8] font-semibold mb-2 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#38bdf8]" />
                  Active Node Attributes
                </div>
                <div className="bg-[#121824] p-3 rounded border border-[#334155] space-y-1.5 text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-[#94a3b8]">Identifier:</span>
                    <span className="text-slate-200">{activeNode.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#94a3b8]">Access Level:</span>
                    <span className="text-emerald-400">{activeNode.accessLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#94a3b8]">Accepted Range:</span>
                    <span className="text-slate-200">{activeNode.min} to {activeNode.max} {activeNode.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#94a3b8]">Alarm Limit:</span>
                    <span className="text-red-400">{activeNodeKey === 'temp' ? '> 380 °C' : 'N/A (Max 120)'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL: Live Feedback & Write Dashboard (Workspace) */}
            <div className="lg:col-span-8 p-4 md:p-6 flex flex-col justify-between gap-6 bg-[#121824]">
              
              {/* Simulated Physical Output (factory-canvas) */}
              <div className="rounded-lg border border-[#334155] bg-gradient-to-b from-[#1e293b] to-[#0f172a] p-5 relative overflow-hidden shadow-inner">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#94a3b8] font-semibold">Live Factory Output View</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#121824] border border-[#334155] text-slate-400">Physical Actuation</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span 
                      id="statusBadge" 
                      className="px-2.5 py-0.5 rounded-full text-xs font-bold transition-colors"
                      style={{
                        color: statusBadgeInfo.color,
                        backgroundColor: statusBadgeInfo.bg
                      }}
                    >
                      {statusBadgeInfo.text}
                    </span>
                  </div>
                </div>

                {/* Factory Canvas Animation Viewport */}
                <div className="h-44 md:h-48 w-full rounded border border-[#334155] bg-gradient-to-b from-[#1e293b] to-[#0f172a] relative flex items-center justify-around px-6 overflow-hidden">
                  
                  {/* Furnace Machine (machine) */}
                  <div 
                    id="factoryMachine"
                    className="w-28 h-28 bg-[#475569] rounded-lg relative flex flex-col items-center justify-center border-3 border-[#64748b] shadow-xl transition-all duration-300"
                    style={{
                      borderColor: isTempAlarm ? '#ef4444' : '#64748b',
                      backgroundColor: isTempAlarm ? '#451a1a' : '#475569'
                    }}
                  >
                    {/* Indicator Light (indicator-light / machineLight) */}
                    <div 
                      id="machineLight"
                      className="w-5 h-5 rounded-full absolute top-2.5 transition-all duration-300"
                      style={{
                        backgroundColor: !serverConnected 
                          ? '#64748b' 
                          : isTempAlarm 
                            ? '#ef4444' 
                            : '#10b981',
                        boxShadow: !serverConnected 
                          ? 'none' 
                          : isTempAlarm 
                            ? '0 0 15px #ef4444' 
                            : '0 0 15px #10b981'
                      }}
                    />

                    <span className="text-xs font-bold text-white mt-5 tracking-wider">FURNACE</span>
                    <span className="text-[11px] font-mono text-slate-300">
                      {serverConnected ? `${Math.round(serverState.temp.value)} °C` : 'OFF'}
                    </span>
                  </div>

                  {/* Motor Encoder Visualizer */}
                  <div className="hidden sm:flex flex-col items-center justify-center w-28 h-28 bg-[#334155]/60 rounded-lg border border-[#475569] p-2">
                    <RotateCw 
                      className={`w-8 h-8 text-[#38bdf8] transition-all ${isConveyorMoving ? 'animate-spin' : 'opacity-40'}`} 
                      style={{ animationDuration: isConveyorMoving ? `${conveyorDuration}s` : '0s' }}
                    />
                    <span className="text-[11px] font-bold text-white mt-1">DRIVE MOTOR</span>
                    <span className="text-[10px] font-mono text-[#94a3b8]">
                      {serverConnected ? `${Math.round(beltSpeed)} RPM` : 'STOPPED'}
                    </span>
                  </div>

                  {/* Conveyor Belt (conveyor-belt / conveyorBelt) */}
                  <div 
                    id="conveyorBelt"
                    className="absolute bottom-5 left-[5%] w-[90%] h-3 rounded-md border border-[#475569] overflow-hidden"
                    style={{
                      background: 'repeating-linear-gradient(90deg, #334155, #334155 10px, #1e293b 10px, #1e293b 20px)',
                      animation: isConveyorMoving ? `conveyorScroll ${conveyorDuration}s linear infinite` : 'none',
                      animationPlayState: isConveyorMoving ? 'running' : 'paused'
                    }}
                  />

                  {/* CSS Keyframes for conveyor scroll */}
                  <style dangerouslySetInnerHTML={{ __html: `
                    @keyframes conveyorScroll {
                      from { background-position: 0 0; }
                      to { background-position: 40px 0; }
                    }
                  `}} />
                </div>
              </div>

              {/* Data Inspector & Safe Write Controls (inspector-grid) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 1. Monitor Attributes (Telemetry Read) */}
                <div className="bg-[#1e293b] rounded-lg border border-[#334155] p-4 flex flex-col justify-between">
                  <div>
                    <div className="font-mono text-xs font-semibold uppercase tracking-wider text-[#94a3b8] pb-2 mb-3 border-b border-[#334155] flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Activity className="w-4 h-4 text-emerald-400" />
                        Data Monitor (Telemetry Read)
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">Sampling: 250ms</span>
                    </div>

                    <div>
                      <span id="selectedNodeTitle" className="text-xs font-mono text-[#94a3b8] block truncate">
                        {activeNode.id}
                      </span>
                      
                      {/* Live Tag Readout (tag-readout & liveValueDisplay) */}
                      <div 
                        id="liveValueDisplay"
                        className="font-mono text-4xl font-bold my-2 flex items-baseline gap-2"
                        style={{
                          color: !serverConnected ? '#ef4444' : isTempAlarm ? '#ef4444' : '#10b981'
                        }}
                      >
                        {serverConnected ? (
                          <>
                            {activeNode.value} <span className="text-base font-normal text-[#94a3b8]">{activeNode.unit}</span>
                          </>
                        ) : (
                          '---'
                        )}
                      </div>
                    </div>

                    <div className="space-y-1 text-xs font-mono pt-1 text-slate-300">
                      <div className="flex justify-between">
                        <span className="text-[#94a3b8]">OPC UA StatusCode:</span>
                        <span 
                          className="font-semibold"
                          style={{ color: statusBadgeInfo.color }}
                        >
                          {statusBadgeInfo.text}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#94a3b8]">Server Timestamp:</span>
                        <span className="text-slate-300 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#94a3b8]" />
                          {new Date().toTimeString().split(' ')[0]} UTC
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Historical buffer sparkline */}
                  <div className="mt-4 pt-3 border-t border-[#334155]">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#94a3b8] mb-1">
                      <span>Telemetry Trend Buffer</span>
                      <span>Target: {activeNode.target} {activeNode.unit}</span>
                    </div>
                    <div className="h-6 flex items-end gap-1 w-full bg-[#121824] p-1 rounded border border-[#334155]">
                      {activeNode.history.map((val, idx) => {
                        const maxVal = activeNode.max || 1;
                        const barHeight = Math.max(10, Math.min(100, (val / maxVal) * 100));
                        return (
                          <div 
                            key={idx} 
                            className="flex-1 transition-all rounded-xs"
                            style={{ 
                              height: `${barHeight}%`,
                              backgroundColor: !serverConnected ? '#64748b' : isTempAlarm ? '#ef4444' : '#10b981'
                            }}
                            title={`${val} ${activeNode.unit}`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 2. Safe Setpoint Control (Write) */}
                <div className="bg-[#1e293b] rounded-lg border border-[#334155] p-4 flex flex-col justify-between">
                  <div>
                    <div className="font-mono text-xs font-semibold uppercase tracking-wider text-[#94a3b8] pb-2 mb-3 border-b border-[#334155] flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-accent" />
                        Safe Setpoint Control (Write)
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">Node: {activeNodeKey}</span>
                    </div>

                    <form onSubmit={handleExecuteWriteValue} className="space-y-3">
                      <div>
                        <label className="block text-xs font-mono text-[#94a3b8] mb-1">
                          New Target Value ({activeNode.unit}):
                        </label>
                        <div className="flex gap-2">
                          <input 
                            type="number" 
                            id="writeInput"
                            step="any"
                            value={writeInputValue}
                            onChange={(e) => setWriteInputValue(e.target.value)}
                            disabled={!serverConnected}
                            className="flex-1 bg-[#121824] border border-[#334155] rounded px-3 py-2 font-mono text-sm text-[#f8fafc] focus:outline-none focus:border-[#0076a8] disabled:opacity-50"
                            placeholder="Enter value..."
                          />
                          <button
                            type="submit"
                            disabled={!serverConnected}
                            className="bg-[#0076a8] hover:bg-[#00608a] text-white font-mono text-xs uppercase tracking-wider px-4 py-2 rounded font-semibold transition-colors disabled:opacity-50 cursor-pointer shrink-0"
                          >
                            Safe Write
                          </button>
                        </div>
                      </div>

                      {/* Quick Nudge Buttons */}
                      <div className="flex items-center gap-1.5 pt-0.5">
                        <span className="text-[11px] font-mono text-[#94a3b8] mr-1">Nudge:</span>
                        {nudgeDeltas.map((delta) => (
                          <button
                            key={delta}
                            type="button"
                            onClick={() => {
                              const curr = parseFloat(writeInputValue) || 0;
                              setWriteInputValue((curr + delta).toString());
                            }}
                            className="px-2 py-0.5 rounded bg-[#121824] hover:bg-[#334155] border border-[#334155] text-slate-300 font-mono text-[11px] transition-colors cursor-pointer"
                          >
                            {delta > 0 ? `+${delta}` : delta}
                          </button>
                        ))}
                      </div>

                      {/* Operational bounds reference */}
                      <div className="p-2.5 rounded bg-[#121824] border border-[#334155] text-[11px] font-mono text-[#94a3b8] space-y-1">
                        <div className="flex justify-between">
                          <span>Valid Bound Limits:</span>
                          <span className="text-slate-200">{activeNode.min} to {activeNode.max} {activeNode.unit}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Alarm Threshold:</span>
                          <span className="text-red-400">{activeNodeKey === 'temp' ? '> 380 °C' : 'N/A'}</span>
                        </div>
                      </div>
                    </form>
                  </div>

                  {/* Feedback Banner */}
                  <div className="mt-3">
                    {writeFeedback.status === 'error' && (
                      <div className="p-2.5 rounded bg-red-950/40 border border-red-800 text-red-300 text-xs font-mono flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{writeFeedback.code}</div>
                          <div className="font-light">{writeFeedback.message}</div>
                        </div>
                      </div>
                    )}
                    {writeFeedback.status === 'success' && (
                      <div className="p-2.5 rounded bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs font-mono flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{writeFeedback.code}</div>
                          <div className="font-light">{writeFeedback.message}</div>
                        </div>
                      </div>
                    )}
                    {writeFeedback.status === 'idle' && (
                      <div className="text-[11px] font-mono text-[#94a3b8] italic">
                        Values are validated within bounds before dispatching write commands to the mock server.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Real-Time Activity & Audit Log Console */}
              <div className="rounded border border-[#334155] bg-[#0c101a] overflow-hidden">
                <div className="bg-[#1e293b] px-4 py-2 border-b border-[#334155] flex items-center justify-between font-mono text-xs text-[#94a3b8]">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-accent" />
                    <span className="uppercase tracking-wider font-semibold text-slate-300">OPC UA Client Activity &amp; Audit Log</span>
                  </div>
                  <button
                    onClick={() => setLogs([])}
                    className="hover:text-slate-200 transition-colors text-[11px] cursor-pointer"
                  >
                    Clear Console
                  </button>
                </div>
                <div className="p-3 max-h-32 overflow-y-auto font-mono text-[11px] space-y-1 text-slate-300">
                  {logs.length === 0 ? (
                    <div className="text-slate-600 italic">Console cleared. Awaiting new network events...</div>
                  ) : (
                    logs.map((log) => (
                      <div key={log.id} className="flex items-baseline gap-2.5">
                        <span className="text-slate-500 shrink-0">{log.time}</span>
                        <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold shrink-0 ${
                          log.type === 'INFO' ? 'bg-blue-950 text-blue-400 border border-blue-800' :
                          log.type === 'READ' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                          log.type === 'WRITE' ? 'bg-purple-950 text-purple-400 border border-purple-800' :
                          log.type === 'WARN' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                          'bg-red-950 text-red-400 border border-red-800'
                        }`}>
                          {log.type}
                        </span>
                        <span className="text-slate-300 flex-1 truncate">{log.text}</span>
                        <span className="text-slate-500 text-[10px] shrink-0 font-light">{log.code}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Callout Bar */}
          <div className="bg-[#1e293b] border-t border-[#334155] px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-[#94a3b8]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              <span>
                <strong>Design Insight:</strong> Notice how point-and-click node selection and immediate bounds validation prevent costly syntax errors and plant downtime before a packet ever hits the wire.
              </span>
            </div>
            <div className="text-slate-500 shrink-0">
              Interactive Prototype · No Code Required
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
