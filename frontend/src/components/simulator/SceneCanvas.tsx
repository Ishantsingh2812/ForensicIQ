import React from 'react';
import { Hotspot } from '../../types';
import { Crosshair, Check, AlertCircle } from 'lucide-react';

interface SceneCanvasProps {
  hotspots: Hotspot[];
  selectedHotspot: Hotspot | null;
  onSelectHotspot: (hotspot: Hotspot) => void;
  collectedIds: string[];
}

export const SceneCanvas: React.FC<SceneCanvasProps> = ({
  hotspots,
  selectedHotspot,
  onSelectHotspot,
  collectedIds,
}) => {
  return (
    <div className="relative w-full aspect-[16/10] bg-forensic-950 border border-forensic-800 rounded-2xl overflow-hidden shadow-2xl select-none group">
      {/* Background Crime Scene SVG Vector Illustration */}
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 625"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Interactive Crime Scene Illustration"
      >
        <defs>
          <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="400" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0f172a" />
            <stop offset="1" stopColor="#090d16" />
          </linearGradient>
          <linearGradient id="floorGrad" x1="0" y1="350" x2="0" y2="625" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1e293b" />
            <stop offset="1" stopColor="#0b0f19" />
          </linearGradient>
          <radialGradient id="lightCone" cx="500" cy="50" r="450" gradientUnits="userSpaceOnUse">
            <stop stopColor="#06b6d4" stopOpacity="0.12" />
            <stop offset="1" stopColor="#06b6d4" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Back Wall */}
        <rect width="1000" height="380" fill="url(#wallGrad)" />
        {/* Floor */}
        <polygon points="0,380 1000,380 1000,625 0,625" fill="url(#floorGrad)" />

        {/* Grid floor tiles perspective */}
        <line x1="200" y1="380" x2="0" y2="625" stroke="#334155" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="400" y1="380" x2="250" y2="625" stroke="#334155" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="600" y1="380" x2="750" y2="625" stroke="#334155" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="800" y1="380" x2="1000" y2="625" stroke="#334155" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="0" y1="450" x2="1000" y2="450" stroke="#334155" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="0" y1="530" x2="1000" y2="530" stroke="#334155" strokeWidth="1" strokeOpacity="0.3" />

        {/* Overhead Spot Light Cone */}
        <polygon points="500,20 100,625 900,625" fill="url(#lightCone)" />

        {/* Executive Mahogany Desk */}
        <polygon points="220,320 540,320 580,480 180,480" fill="#1c1917" stroke="#292524" strokeWidth="2" />
        <polygon points="180,480 580,480 580,510 180,510" fill="#0c0a09" />
        {/* Desk legs */}
        <rect x="200" y="510" width="20" height="90" fill="#1c1917" />
        <rect x="550" y="510" width="20" height="90" fill="#1c1917" />

        {/* Police Evidence Markers (Chalk / Cones) */}
        <polygon points="460,490 475,465 490,490" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
        <text x="471" y="485" fill="#000" fontSize="12" fontWeight="bold">1</text>

        <polygon points="760,540 775,515 790,540" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
        <text x="771" y="535" fill="#000" fontSize="12" fontWeight="bold">2</text>

        {/* Broken Office Window (Upper Left) */}
        <rect x="80" y="100" width="180" height="180" fill="#020617" stroke="#475569" strokeWidth="4" />
        <line x1="80" y1="190" x2="260" y2="190" stroke="#475569" strokeWidth="2" />
        <line x1="170" y1="100" x2="170" y2="280" stroke="#475569" strokeWidth="2" />
        {/* Shatter fracture lines */}
        <path d="M170 190 L120 130 M170 190 L230 140 M170 190 L220 250 M170 190 L110 240" stroke="#94a3b8" strokeWidth="1.5" />

        {/* Chalk body outline representation on floor */}
        <path
          d="M 640 430 Q 660 410 680 430 Q 690 460 670 480 Q 720 510 740 570 M 670 480 Q 640 530 630 580 M 660 440 Q 610 450 590 480 M 670 440 Q 730 450 760 470"
          stroke="#f8fafc"
          strokeWidth="3"
          strokeDasharray="6 4"
          fill="none"
          opacity="0.6"
        />

        {/* Crime Scene Yellow Tape Header Banner */}
        <rect x="0" y="0" width="1000" height="28" fill="#eab308" />
        <text x="500" y="19" fill="#000000" fontSize="13" fontWeight="900" letterSpacing="4" textAnchor="middle">
          POLICE LINE DO NOT CROSS · SCENE OF CRIME · FORENSIC INVESTIGATION ACTIVE
        </text>
      </svg>

      {/* Interactive Hotspot Buttons Overlay */}
      {hotspots.map((hs) => {
        const isCollected = collectedIds.includes(hs.id);
        const isSelected = selectedHotspot?.id === hs.id;

        return (
          <button
            key={hs.id}
            onClick={() => onSelectHotspot(hs)}
            aria-label={`${hs.label} (${isCollected ? 'Collected' : 'Pending seizure'})`}
            style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-evidence-cyan ${
              isCollected
                ? 'bg-legal-emerald/80 text-white border-2 border-legal-emerald'
                : isSelected
                ? 'bg-evidence-cyan text-forensic-950 scale-125 shadow-forensic-glow animate-pulse'
                : 'bg-forensic-900/90 text-evidence-cyan border-2 border-evidence-cyan/60 hover:scale-110 hover:border-evidence-glow'
            }`}
          >
            {isCollected ? (
              <Check className="w-4 h-4" />
            ) : (
              <Crosshair className="w-4 h-4" />
            )}
            {/* Tooltip on hover */}
            <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block md:block opacity-0 hover:opacity-100 transition-opacity bg-forensic-900 text-slate-100 text-[10px] font-semibold px-2 py-1 rounded shadow-lg border border-forensic-750 whitespace-nowrap pointer-events-none z-10">
              {hs.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
