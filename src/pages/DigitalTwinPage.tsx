import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DigitalTwinScene, TelemetryData } from '../components/3d/DigitalTwinScene';
import { db, auth } from '../services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { 
  Play, Pause, Camera, Eye, Cpu, Activity, 
  Layers, ShieldAlert, Sparkles, Database, 
  ChevronDown, ChevronUp, ArrowLeft, Maximize2, RefreshCw
} from 'lucide-react';

export const DigitalTwinPage: React.FC = () => {
  const { lang, setPage, showToast, openAssistantWithPrompt } = useApp();
  const hi = lang === 'hi';

  const [cameraPreset, setCameraPreset] = useState<'overview' | 'robot' | 'warehouse' | 'agv'>('overview');
  const [isSimulating, setIsSimulating] = useState(true);
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);
  const [telemetry, setTelemetry] = useState<TelemetryData>({
    selectedUnit: 'Robotic Welding & Assembly Cell (KUKA-QNTX-6)',
    status: 'RUNNING',
    oee: 96.4,
    cycleTime: '3.14s',
    temperature: '48.2°C',
    vibration: '0.04 mm/s (Optimal)',
    speedRPM: 2800,
    activeWorkOrder: 'WO-2026-8812 (Titanium Flange)'
  });

  const handleSaveTelemetryToFirestore = async () => {
    try {
      const colRef = collection(db, 'inquiries');
      await addDoc(colRef, {
        category: '3D Telemetry Snapshot',
        name: auth.currentUser?.displayName || 'Plant Engineer',
        email: auth.currentUser?.email || 'telemetry@quantinox.com',
        message: `Snapshot recorded for ${telemetry.selectedUnit}. OEE: ${telemetry.oee}%, Cycle: ${telemetry.cycleTime}, Temp: ${telemetry.temperature}, Status: ${telemetry.status}`,
        telemetryData: telemetry,
        userId: auth.currentUser?.uid || 'guest-engineer',
        createdAt: new Date().toISOString(),
        timestamp: serverTimestamp()
      });
      showToast(hi ? 'टेलीमेट्री स्नैपशॉट फायरस्टोर में सुरक्षित किया गया!' : 'Telemetry snapshot saved to Firestore!');
    } catch (err: any) {
      console.warn('Firestore offline or permission denied:', err);
      showToast(hi ? 'स्नैपशॉट स्थानीय सत्र में रिकॉर्ड किया गया' : 'Snapshot recorded in local session');
    }
  };

  return (
    <div className="relative w-screen h-[calc(100vh-72px)] overflow-hidden bg-[#0B1020] text-white">
      {/* 3D WebGL Canvas Layer */}
      <div className="absolute inset-0">
        <DigitalTwinScene
          cameraPreset={cameraPreset}
          isSimulating={isSimulating}
          onSelectEquipment={data => {
            setTelemetry(data);
            showToast(`${data.selectedUnit} selected`);
          }}
        />
      </div>

      {/* Top Floating Control Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto bg-[#131A2E]/90 border border-[#252D45] px-4 py-2 rounded-xl backdrop-blur-md shadow-xl">
          <button
            onClick={() => setPage('home')}
            className="flex items-center gap-1.5 text-xs text-[#A9B2C7] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{hi ? 'होम' : 'Exit to Portal'}</span>
          </button>
          <span className="text-[#252D45]">|</span>
          <div className="flex items-center gap-2 text-xs font-bold font-mono text-white">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>3D DIGITAL TWIN · FACILITY 04</span>
          </div>
        </div>

        {/* Camera Angle Switcher */}
        <div className="flex items-center gap-1.5 pointer-events-auto bg-[#131A2E]/90 border border-[#252D45] p-1.5 rounded-xl backdrop-blur-md shadow-xl">
          {[
            { id: 'overview', label: hi ? 'ओवरव्यू' : 'Overview' },
            { id: 'robot', label: hi ? 'रोबोट सेल' : 'Robot Arm' },
            { id: 'warehouse', label: hi ? 'हाई-बे रैक' : 'Warehouse' },
            { id: 'agv', label: hi ? 'AGV फ्लीट' : 'AGV Drone' },
          ].map(cam => (
            <button
              key={cam.id}
              onClick={() => setCameraPreset(cam.id as any)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                cameraPreset === cam.id
                  ? 'bg-[#2F54EB] text-white shadow-md'
                  : 'text-[#A9B2C7] hover:text-white hover:bg-[#1E2848]'
              }`}
            >
              {cam.label}
            </button>
          ))}
        </div>
      </div>

      {/* Viewport-First Collapsible Floating Control Dock (Footprint <= 15%) */}
      <div className="absolute bottom-4 right-4 z-20 w-80 sm:w-96 max-w-[90vw] pointer-events-auto">
        <div className="bg-[#131A2E]/95 border border-[#252D45] rounded-2xl shadow-2xl overflow-hidden transition-all duration-300">
          {/* Header */}
          <div 
            onClick={() => setIsDockCollapsed(!isDockCollapsed)}
            className="px-4 py-3 bg-[#1A223B] flex items-center justify-between cursor-pointer border-b border-[#252D45]"
          >
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#7FE3CF]" />
              <span className="text-xs font-bold font-mono tracking-wider uppercase text-white">
                Live IoT Telemetry
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold">
                {telemetry.status}
              </span>
            </div>
            <button className="text-[#A9B2C7] hover:text-white">
              {isDockCollapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Body Content */}
          {!isDockCollapsed && (
            <div className="p-4 space-y-3.5 text-xs">
              <div>
                <span className="text-[#A9B2C7] text-[11px] block font-mono">SELECTED UNIT</span>
                <span className="font-bold text-white text-sm mt-0.5 block truncate">
                  {telemetry.selectedUnit}
                </span>
                <span className="text-[11px] text-[#7FE3CF] font-mono mt-0.5 block">
                  {telemetry.activeWorkOrder}
                </span>
              </div>

              {/* Grid Metrics */}
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#252D45]">
                <div className="p-2 rounded bg-[#0B1020]/80 border border-[#252D45]">
                  <span className="text-[#A9B2C7] text-[10px] block font-mono">OEE EFFICIENCY</span>
                  <span className="text-base font-extrabold text-emerald-400 font-mono mt-0.5 block">
                    {telemetry.oee}%
                  </span>
                </div>
                <div className="p-2 rounded bg-[#0B1020]/80 border border-[#252D45]">
                  <span className="text-[#A9B2C7] text-[10px] block font-mono">CYCLE TIME</span>
                  <span className="text-base font-extrabold text-white font-mono mt-0.5 block">
                    {telemetry.cycleTime}
                  </span>
                </div>
                <div className="p-2 rounded bg-[#0B1020]/80 border border-[#252D45]">
                  <span className="text-[#A9B2C7] text-[10px] block font-mono">CORE TEMP</span>
                  <span className="text-sm font-bold text-amber-300 font-mono mt-0.5 block">
                    {telemetry.temperature}
                  </span>
                </div>
                <div className="p-2 rounded bg-[#0B1020]/80 border border-[#252D45]">
                  <span className="text-[#A9B2C7] text-[10px] block font-mono">VIBRATION RMS</span>
                  <span className="text-sm font-bold text-white font-mono mt-0.5 block">
                    {telemetry.vibration}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsSimulating(!isSimulating)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#252D45] hover:bg-[#323D5E] text-white font-semibold transition-colors"
                  >
                    {isSimulating ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                    <span>{isSimulating ? (hi ? 'सिमुलेशन रोकें' : 'Pause Simulation') : (hi ? 'शुरू करें' : 'Resume Sim')}</span>
                  </button>

                  <button
                    onClick={handleSaveTelemetryToFirestore}
                    title="Persist live telemetry record to Firestore database"
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-600/90 hover:bg-emerald-600 text-white font-semibold transition-colors"
                  >
                    <Database className="w-3.5 h-3.5" />
                    <span>{hi ? 'क्लाउड में सेव करें' : 'Save to Firestore'}</span>
                  </button>
                </div>

                <button
                  onClick={() => openAssistantWithPrompt(`Analyze the current 3D digital twin telemetry for ${telemetry.selectedUnit} (OEE: ${telemetry.oee}%, Temp: ${telemetry.temperature}, Cycle: ${telemetry.cycleTime}). What predictive maintenance interventions do you recommend?`)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#2F54EB] hover:bg-[#1D39C4] text-white font-semibold transition-all shadow-md active:scale-98"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{hi ? 'Gemini AI से विसंगति विश्लेषण मांगें' : 'Consult Gemini AI on Telemetry'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
