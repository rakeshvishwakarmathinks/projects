# MATLAB OPC UA Explorer Portfolio Project

This repository contains the interactive sandbox UI prototype for the **MATLAB OPC UA Explorer** application design case study. It presents a streamlined web-based industrial layout visualization matching the expected visual structure.

## 🛠️ Project Source Code

Save the code below into a local text file named `index.html` and open it directly inside any standard web browser application.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OPC UA Factory Automation Sandbox</title>
    <style>
        :root {
            --bg-color: #0b111e;
            --canvas-bg: linear-gradient(180deg, #101726 0%, #0d121f 100%);
            --panel-bg: #ffffff;
            --text-dark: #1e293b;
            --text-muted: #64748b;
            --matlab-blue: #2563eb;
            --matlab-blue-hover: #1d4ed8;
            --border-light: #e2e8f0;
            --pill-online: #10b981;
            --conveyor-orange: #f97316;
            --robot-cyan: #06b6d4;
            --laser-green: #10b981;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        body { background-color: #f8fafc; color: var(--text-dark); padding: 24px; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
        .dashboard-container { width: 100%; max-width: 820px; background-color: var(--panel-bg); border-radius: 16px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05); overflow: hidden; border: 1px solid var(--border-light); }
        .factory-canvas { background: var(--canvas-bg); height: 380px; position: relative; overflow: hidden; padding: 20px; }
        .canvas-header { display: flex; justify-content: space-between; align-items: center; }
        .connection-indicator { background-color: rgba(255, 255, 255, 0.07); border: 1px solid rgba(255, 255, 255, 0.15); padding: 6px 14px; border-radius: 20px; color: #94a3b8; font-size: 11px; display: flex; align-items: center; gap: 6px; }
        .connection-indicator span { width: 6px; height: 6px; border-radius: 50%; background-color: var(--pill-online); }
        .pause-button { width: 32px; height: 32px; border-radius: 50%; background-color: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: white; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .conveyor-assembly { position: absolute; bottom: 75px; left: 0; width: 100%; }
        .conveyor-belt { width: 100%; height: 14px; background: repeating-linear-gradient(90deg, #27354a, #27354a 12px, #172030 12px, #172030 24px); border-top: 2px solid #475569; border-bottom: 2px solid #475569; animation: moveBelt 1s linear infinite; }
        .conveyor-rollers { display: flex; justify-content: space-between; padding: 0 20px; margin-top: -4px; }
        .roller-wheel { width: 16px; height: 16px; background-color: #475569; border-radius: 50%; border: 2px solid #1e293b; animation: spin 1s linear infinite; }
        .furnace-module { position: absolute; bottom: 87px; left: 200px; width: 140px; height: 160px; background-color: #242f41; border: 3px solid #38475e; border-radius: 8px 8px 0 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; }
        .furnace-heating-elements { width: 100px; display: flex; flex-direction: column; gap: 8px; }
        .element-stripe { height: 4px; background-color: #ea580c; box-shadow: 0 0 6px #ea580c; border-radius: 2px; }
        .robotic-workstation { position: absolute; bottom: 87px; left: 500px; width: 80px; height: 90px; }
        .robot-scaffolding { position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 4px; height: 50px; background-color: #475569; }
        .robot-upper-arm { position: absolute; top: 6px; left: 50%; width: 4px; height: 45px; background-color: #38bdf8; transform-origin: top center; transform: translateX(-50%) rotate(35deg); }
        .robot-elbow-joint { position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%); width: 8px; height: 8px; background-color: #ffffff; border-radius: 50%; }
        .robot-forearm { position: absolute; top: 4px; left: 50%; width: 4px; height: 35px; background-color: #38bdf8; transform-origin: top center; transform: translateX(-50%) rotate(-75deg); }
        .robot-end-effector { position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%); width: 16px; height: 8px; background-color: #0c4a6e; border-radius: 2px; }
        .floating-telemetry-tag { position: absolute; background-color: rgba(15, 23, 42, 0.85); border: 1px solid rgba(255, 255, 255, 0.15); padding: 5px 12px; border-radius: 20px; color: white; font-size: 11px; font-weight: 700; white-space: nowrap; }
        .tag-blue-glow { background-color: #2563eb; box-shadow: 0 0 12px rgba(37, 99, 235, 0.6); border: none; }
        .cargo-item { position: absolute; bottom: 87px; width: 26px; height: 26px; border-radius: 4px; animation: flowCargo 6s linear infinite; }
        .telemetry-deck { display: grid; grid-template-columns: repeat(3, 1fr); padding: 20px; border-bottom: 1px solid var(--border-light); text-align: center; background-color: #fafafa; }
        .deck-card p { font-size: 11px; color: var(--text-muted); margin-bottom: 4px; }
        .deck-card h3 { font-size: 16px; font-weight: 700; }
        .console-panel { padding: 24px; display: flex; flex-direction: column; gap: 20px; }
        .console-row-top { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .control-group { display: flex; flex-direction: column; gap: 8px; }
        .control-group label { font-size: 12px; font-weight: 600; color: var(--text-muted); }
        .toggle-switch-container { display: flex; background-color: #f1f5f9; padding: 4px; border-radius: 8px; border: 1px solid #e2e8f0; }
        .toggle-option { flex: 1; text-align: center; padding: 8px 0; font-size: 12px; font-weight: 600; color: var(--text-muted); cursor: pointer; border-radius: 6px; }
        .toggle-option.active { background-color: var(--matlab-blue); color: white; }
        .select-input-menu { padding: 9px 12px; background-color: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 12px; color: var(--text-dark); outline: none; }
        .slider-control-workspace { display: flex; flex-direction: column; gap: 12px; }
        .slider-meta-header { display: flex; justify-content: space-between; font-size: 12px; }
        .slider-bar-wrapper { display: flex; align-items: center; gap: 20px; }
        .realtime-slider { flex: 1; -webkit-appearance: none; height: 6px; border-radius: 3px; background: #e2e8f0; }
        .realtime-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: var(--matlab-blue); cursor: pointer; }
        .interactive-actions { display: flex; gap: 8px; align-items: center; }
        .value-numeric-bubble { font-size: 13px; font-weight: 700; min-width: 60px; text-align: right; }
        .btn-action { padding: 8px 16px; border: 1px solid #cbd5e1; background-color: white; border-radius: 6px; font-size: 12px; cursor: pointer; }
        .btn-action.primary-submit { background-color: var(--matlab-blue); border-color: var(--matlab-blue); color: white; }
        @keyframes moveBelt { from { background-position: 0 0; } to { background-position: 24px 0; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes flowCargo { 0% { left: -40px; } 100% { left: 100%; } }
        .design-insight-banner { background-color: #0f172a; color: #94a3b8; padding: 14px 24px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; }
    </style>
</head>
<body>
    <div class="dashboard-container">
        <!-- Dashboard Elements Render Here -->
    </div>
</body>
</html>
```
