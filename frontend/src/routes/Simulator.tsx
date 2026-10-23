import React, { useState } from 'react';
import { simulatorLevels, SimulatorLevel } from '../lib/mocks/simulator';
import { Hotspot, CustodyActionLog } from '../types';
import { SceneCanvas } from '../components/simulator/SceneCanvas';
import { CustodyGauge } from '../components/simulator/CustodyGauge';
import { EvidenceChecklist } from '../components/simulator/EvidenceChecklist';
import { SEO } from '../components/layout/SEO';
import { Crosshair, Award, ShieldAlert, Sparkles, HelpCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Simulator: React.FC = () => {
  const [selectedLevelId, setSelectedLevelId] = useState<string>('level-1');
  const [currentLevel, setCurrentLevel] = useState<SimulatorLevel>(simulatorLevels[0]);

  // State of simulation
  const [collectedIds, setCollectedIds] = useState<string[]>([]);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [custodyScore, setCustodyScore] = useState<number>(100);
  const [logs, setLogs] = useState<CustodyActionLog[]>([]);
  const [showHint, setShowHint] = useState<boolean>(false);

  const handleSelectLevel = (lvlId: string) => {
    const lvl = simulatorLevels.find((l) => l.id === lvlId) || simulatorLevels[0];
    setSelectedLevelId(lvlId);
    setCurrentLevel(lvl);
    handleReset();
  };

  const handleReset = () => {
    setCollectedIds([]);
    setSelectedHotspot(null);
    setCustodyScore(100);
    setLogs([]);
    setShowHint(false);
  };

  const handleCollect = (hotspot: Hotspot, withPackagingMistake: boolean) => {
    if (collectedIds.includes(hotspot.id)) return;

    let scoreDelta = 0;
    let notes = '';

    // Check if collected in recommended order
    const pendingItems = currentLevel.hotspots.filter((h) => !collectedIds.includes(h.id));
    const isFirstInOrder = pendingItems.length > 0 && pendingItems[0].id === hotspot.id;

    if (!isFirstInOrder) {
      scoreDelta -= 10;
      notes += 'Sequence penalty: transient evidence prioritized first. ';
    }

    if (withPackagingMistake) {
      scoreDelta -= 20;
      notes += 'Packaging penalty: unsealed container / missing tamper-evident tape. ';
    } else {
      scoreDelta += 5; // Reward for meticulous packaging
      notes += 'Clean collection: packaged with proper swabs and sealed with brass seal impression. ';
    }

    const newScore = Math.max(0, Math.min(100, custodyScore + scoreDelta));
    setCustodyScore(newScore);

    const now = new Date().toLocaleTimeString();
    const newLog: CustodyActionLog = {
      id: `log-${Date.now()}`,
      timestamp: now,
      action: withPackagingMistake ? 'NON-COMPLIANT SEIZURE' : 'COMPLIANT SEIZURE',
      evidenceLabel: hotspot.label,
      impactScore: scoreDelta,
      notes: notes.trim(),
    };

    setLogs((prev) => [newLog, ...prev]);
    setCollectedIds((prev) => [...prev, hotspot.id]);
    setSelectedHotspot(null);
  };

  const isComplete = collectedIds.length === currentLevel.hotspots.length;

  return (
    <>
      <SEO
        title="Interactive Crime Scene Simulator | Chain-of-Custody Practice"
        description="Hands-on interactive forensic crime scene simulator for law enforcement and law students. Practice evidence preservation and chain of custody."
        canonicalUrl="https://forensicai.in/simulator"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
        {/* Header & Level Selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-forensic-800 pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
              <Crosshair className="w-6 h-6 text-police-crimson" />
              Crime Scene &amp; Custody Simulator
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Test procedural adherence, prevent evidence contamination, and enforce Standing Order 1/89 standards.
            </p>
          </div>

          {/* Level Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">Scenario Level:</span>
            <div className="flex gap-1.5 bg-forensic-900 p-1 rounded-xl border border-forensic-800">
              {simulatorLevels.map((lvl) => (
                <button
                  key={lvl.id}
                  onClick={() => handleSelectLevel(lvl.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedLevelId === lvl.id
                      ? 'bg-evidence-cyan text-forensic-950 font-bold shadow-forensic-glow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lvl.difficulty}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Level Description & Hint Bar */}
        <div className="p-4 rounded-xl bg-forensic-900 border border-forensic-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-bold text-white">{currentLevel.name}</h2>
            <p className="text-xs text-slate-300 mt-0.5">{currentLevel.description}</p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowHint(!showHint)}
            leftIcon={<HelpCircle className="w-4 h-4 text-crime-amber" />}
          >
            {showHint ? 'Hide Forensic Hint' : 'View Protocol Hint'}
          </Button>
        </div>

        {/* Protocol Hint Box */}
        {showHint && (
          <div className="p-4 rounded-xl bg-crime-amber/10 border border-crime-amber/30 text-xs text-crime-amber space-y-1 animate-in fade-in">
            <p className="font-bold">Investigative SOP Priority:</p>
            <p className="text-slate-200 text-[11px]">
              1. Transient biological evidence (liquid blood / DNA swabs) degrades first &mdash; photograph and preserve immediately.
              2. Digital evidence (active phones) must be isolated in Faraday sleeves to block remote wiping.
              3. Toolmarks and latent prints must be preserved before packaging fragile glass.
            </p>
          </div>
        )}

        {/* Interactive Scene Canvas */}
        <SceneCanvas
          hotspots={currentLevel.hotspots}
          selectedHotspot={selectedHotspot}
          onSelectHotspot={(hs) => setSelectedHotspot(hs)}
          collectedIds={collectedIds}
        />

        {/* Lower Row: Evidence Checklist and Custody Gauge */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EvidenceChecklist
            hotspots={currentLevel.hotspots}
            collectedIds={collectedIds}
            selectedHotspot={selectedHotspot}
            onCollect={handleCollect}
            onReset={handleReset}
            isComplete={isComplete}
            score={custodyScore}
          />

          <CustodyGauge score={custodyScore} logs={logs} />
        </div>
      </div>
    </>
  );
};
