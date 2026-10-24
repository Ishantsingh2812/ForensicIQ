import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Upload,
  Plus,
  Trash2,
  Sparkles,
  Shield,
  FileCheck,
  Tag,
  Crosshair,
  Info,
  Maximize2,
  AlertCircle
} from 'lucide-react';
import { EvidenceAnnotation, EvidenceHypothesis, ForensicCategory } from '../../types';
import { Button } from '../ui/Button';

const SAMPLE_CRIME_SCENE_URL =
  'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=1200&q=80';

export const ANNOTATIONS_STORAGE_KEY = 'forensicai_annotations_scene_1';

const DEFAULT_ANNOTATIONS: EvidenceAnnotation[] = [
  {
    id: 'ann-1',
    markerLabel: 'E1',
    title: 'Discharged 9mm Shell Casing',
    category: 'physical',
    coordinateX: 0.355,
    coordinateY: 0.620,
    notes: 'Breech face marks visible; fired from semi-automatic pistol',
    statutoryRelevance: 'BNS Section 311 / IPC Section 397 (Deadly Weapon) & Arms Act',
    visualHypothesis: 'Spent cartridge casing consistent with pistol discharge at ~3m range; preserve for firing pin striations.'
  },
  {
    id: 'ann-2',
    markerLabel: 'E2',
    title: 'Radial Glass Fractures on Window',
    category: 'physical',
    coordinateX: 0.72,
    coordinateY: 0.38,
    notes: 'Impact point from external side indicating forced nocturnal entry',
    statutoryRelevance: 'BNS Section 331 (House-breaking by night) & BNS Section 324 (Mischief)',
    visualHypothesis: 'Point of origin of mechanical fracture confirms forced commercial break-in.'
  },
  {
    id: 'ann-3',
    markerLabel: 'E3',
    title: 'Blood Droplets on Broken Latch',
    category: 'biological',
    coordinateX: 0.68,
    coordinateY: 0.45,
    notes: 'Perpetrator hand cut on glass edge; collect sterile swab for DNA profile',
    statutoryRelevance: 'Section 39 BSA (Forensic Scientific Evidence)',
    visualHypothesis: 'Direct biological deposition capable of generating single-source suspect STR profile.'
  }
];

export const PhotoEvidenceAnalyzer: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>(SAMPLE_CRIME_SCENE_URL);
  const [annotations, setAnnotations] = useState<EvidenceAnnotation[]>(() => {
    try {
      const stored = localStorage.getItem(ANNOTATIONS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback to default annotations
    }
    return DEFAULT_ANNOTATIONS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(ANNOTATIONS_STORAGE_KEY, JSON.stringify(annotations));
    } catch (e) {
      console.warn('Could not persist annotations to localStorage', e);
    }
  }, [annotations]);

  const [selectedAnnotation, setSelectedAnnotation] = useState<EvidenceAnnotation | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [tempCoords, setTempCoords] = useState<{ x: number; y: number } | null>(null);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<ForensicCategory>('physical');
  const [newNotes, setNewNotes] = useState<string>('');
  const [hypotheses, setHypotheses] = useState<EvidenceHypothesis[]>([]);
  const [isGeneratingHypotheses, setIsGeneratingHypotheses] = useState<boolean>(false);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

    setTempCoords({ x, y });
    setIsAdding(true);
    setNewTitle(`Evidence Marker E${annotations.length + 1}`);
  };

  const handleSaveAnnotation = () => {
    if (!tempCoords) return;
    const newAnn: EvidenceAnnotation = {
      id: `ann-${Date.now()}`,
      markerLabel: `E${annotations.length + 1}`,
      title: newTitle || `Marker E${annotations.length + 1}`,
      category: newCategory,
      coordinateX: tempCoords.x,
      coordinateY: tempCoords.y,
      notes: newNotes,
      statutoryRelevance: newCategory === 'physical' ? 'Section 6 BSA / Res Gestae' : 'Section 39 BSA Expert Evidence',
      visualHypothesis: `Trace evidence observed at (${(tempCoords.x * 100).toFixed(0)}%, ${(tempCoords.y * 100).toFixed(0)}%).`
    };
    setAnnotations([...annotations, newAnn]);
    setSelectedAnnotation(newAnn);
    setIsAdding(false);
    setTempCoords(null);
    setNewNotes('');
  };

  const handleDeleteAnnotation = (id: string) => {
    setAnnotations(annotations.filter((a) => a.id !== id));
    if (selectedAnnotation?.id === id) {
      setSelectedAnnotation(null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setAnnotations([]);
      setSelectedAnnotation(null);
      setHypotheses([]);
    }
  };

  const handleGenerateHypotheses = () => {
    setIsGeneratingHypotheses(true);
    setTimeout(() => {
      const generated: EvidenceHypothesis[] = annotations.map((ann) => ({
        marker_id: ann.id,
        marker_label: ann.markerLabel,
        category: ann.category,
        finding: ann.title,
        hypothesis:
          ann.visualHypothesis ||
          `Perpetrator action localized at relative canvas coordinate [${(ann.coordinateX * 100).toFixed(0)}%, ${(ann.coordinateY * 100).toFixed(0)}%].`,
        statutory_relevance:
          ann.statutoryRelevance || 'Section 39 BSA (Expert Scientific Opinion) & Section 105 BNSS (Videography)',
        preservation_protocol:
          ann.category === 'biological'
            ? 'Sterile swab collection, air-dry in darkness, do not use airtight plastic to prevent mold degradation.'
            : ann.category === 'digital'
            ? 'Place in RF-shielded Faraday bag; execute Section 63 BSA Hash Certificate before turning device on.'
            : 'Photograph with forensic scale ruler; package in sturdy card container avoiding friction wear.'
      }));
      setHypotheses(generated);
      setIsGeneratingHypotheses(false);
    }, 600);
  };

  const getCategoryColor = (cat: ForensicCategory) => {
    switch (cat) {
      case 'physical':
        return 'border-cyan-400 bg-cyan-500/20 text-cyan-300';
      case 'biological':
        return 'border-red-400 bg-red-500/20 text-red-300';
      case 'digital':
        return 'border-amber-400 bg-amber-500/20 text-amber-300';
      case 'documentary':
        return 'border-emerald-400 bg-emerald-500/20 text-emerald-300';
      default:
        return 'border-indigo-400 bg-indigo-500/20 text-indigo-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-cyan-500/20 px-2.5 py-0.5 text-xs font-semibold text-cyan-300">
              Forensic Computer Vision Studio
            </span>
            <span className="text-xs text-slate-400">BNSS Sec 105 &amp; BSA Sec 63 Compliant</span>
          </div>
          <h2 className="mt-1 text-xl font-bold text-white">
            Interactive Crime Scene Photo Evidence Viewer &amp; Annotation Studio
          </h2>
          <p className="text-xs text-slate-400">
            Click anywhere on the photo to plot persistent normalized coordinate markers (E1, E2, ...).
            Generate multi-agent visual hypotheses and statutory legal mapping.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
          />
          <Button
            size="sm"
            variant="secondary"
            onClick={() => fileInputRef.current?.click()}
            leftIcon={<Upload className="h-4 w-4" />}
          >
            Upload Photo
          </Button>

          <Button
            size="sm"
            variant="primary"
            onClick={handleGenerateHypotheses}
            isLoading={isGeneratingHypotheses}
            leftIcon={<Sparkles className="h-4 w-4 text-cyan-300" />}
          >
            Generate Hypotheses
          </Button>
        </div>
      </div>

      {/* Main Studio Area: Canvas + Markers Side Panel */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Canvas Area (8 cols) */}
        <div className="lg:col-span-8 flex flex-col space-y-3">
          <div
            ref={imageContainerRef}
            onClick={handleImageClick}
            data-testid="crime-scene-canvas"
            className="relative cursor-crosshair overflow-hidden rounded-2xl border-2 border-slate-700 bg-slate-950 shadow-2xl select-none"
            style={{ minHeight: '440px' }}
          >
            <img
              src={imageUrl}
              alt="Crime Scene Photo"
              className="h-full w-full object-cover"
              crossOrigin="anonymous"
            />

            {/* Existing Markers */}
            {annotations.map((ann) => {
              const isSelected = selectedAnnotation?.id === ann.id;
              return (
                <div
                  key={ann.id}
                  data-testid={`evidence-marker-${ann.markerLabel}`}
                  role="button"
                  aria-label={`Evidence Marker ${ann.markerLabel}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedAnnotation(ann);
                    setIsAdding(false);
                  }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-200"
                  style={{
                    left: `${ann.coordinateX * 100}%`,
                    top: `${ann.coordinateY * 100}%`,
                  }}
                >
                  <div className="relative group">
                    {/* Glowing ring animation */}
                    <div
                      className={`absolute -inset-1 rounded-full animate-ping opacity-60 ${
                        ann.category === 'biological' ? 'bg-red-400' : 'bg-cyan-400'
                      }`}
                    />
                    {/* Marker badge */}
                    <div
                      className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 font-mono text-xs font-bold shadow-lg transition-transform ${
                        isSelected ? 'scale-125 ring-2 ring-white' : 'hover:scale-110'
                      } ${getCategoryColor(ann.category)}`}
                    >
                      {ann.markerLabel}
                    </div>

                    {/* Hover tooltip */}
                    <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900/95 px-2.5 py-1 text-[11px] font-medium text-white shadow-xl border border-slate-700 group-hover:block z-30">
                      {ann.title}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Temporary Pending Marker */}
            {tempCoords && (
              <div
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
                style={{
                  left: `${tempCoords.x * 100}%`,
                  top: `${tempCoords.y * 100}%`,
                }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-amber-400 bg-amber-500/40 font-mono text-xs font-bold text-amber-200 animate-pulse">
                  +
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span className="flex items-center gap-1.5">
              <Crosshair className="h-3.5 w-3.5 text-cyan-400" />
              Click anywhere on image to add a new evidence marker
            </span>
            <span>
              {annotations.length} Marker{annotations.length !== 1 ? 's' : ''} Plotted
            </span>
          </div>
        </div>

        {/* Side Panel: Evidence Management & Detail (4 cols) */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          {/* New Marker Form */}
          {isAdding && tempCoords && (
            <div className="rounded-2xl border border-amber-500/40 bg-amber-950/20 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-amber-300">New Evidence Annotation</h4>
                <span className="text-[11px] font-mono text-slate-400">
                  ({(tempCoords.x * 100).toFixed(0)}%, {(tempCoords.y * 100).toFixed(0)}%)
                </span>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 uppercase">Marker Label</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Spent Cartridge, Bloodstain"
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 uppercase">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as ForensicCategory)}
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                >
                  <option value="physical">Physical (Weapon / Toolmark / Ballistic)</option>
                  <option value="biological">Biological (DNA / Blood / Saliva)</option>
                  <option value="digital">Digital (Mobile / DVR / Drive)</option>
                  <option value="documentary">Documentary (Note / Receipt / Register)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 uppercase">Investigative Notes</label>
                <textarea
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Orientation, condition, preliminary observations..."
                  rows={2}
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <Button size="sm" variant="ghost" onClick={() => setIsAdding(false)}>
                  Cancel
                </Button>
                <Button size="sm" variant="primary" onClick={handleSaveAnnotation}>
                  Save Marker
                </Button>
              </div>
            </div>
          )}

          {/* Marker Detail / Inspector */}
          {selectedAnnotation ? (
            <div data-testid="evidence-inspector" className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-bold font-mono border ${getCategoryColor(
                      selectedAnnotation.category
                    )}`}
                  >
                    {selectedAnnotation.markerLabel}
                  </span>
                  <h4 className="text-sm font-bold text-white">{selectedAnnotation.title}</h4>
                </div>
                <button
                  onClick={() => handleDeleteAnnotation(selectedAnnotation.id)}
                  className="p-1 text-slate-400 hover:text-red-400 transition"
                  title="Delete Marker"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-semibold text-slate-400 uppercase text-[10px]">Category: </span>
                  <span className="capitalize text-slate-200">{selectedAnnotation.category}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-400 uppercase text-[10px]">Canvas Coordinates: </span>
                  <span className="font-mono text-slate-300">
                    X: {(selectedAnnotation.coordinateX * 100).toFixed(1)}%, Y:{' '}
                    {(selectedAnnotation.coordinateY * 100).toFixed(1)}%
                  </span>
                </div>
                {selectedAnnotation.notes && (
                  <div>
                    <span className="font-semibold text-slate-400 uppercase text-[10px]">Field Notes: </span>
                    <p className="mt-0.5 rounded bg-slate-950/60 p-2 text-slate-300 border border-slate-800">
                      {selectedAnnotation.notes}
                    </p>
                  </div>
                )}
                {selectedAnnotation.statutoryRelevance && (
                  <div>
                    <span className="font-semibold text-amber-400 uppercase text-[10px]">
                      Statutory Relevance:{' '}
                    </span>
                    <p className="mt-0.5 text-amber-300 font-medium">
                      {selectedAnnotation.statutoryRelevance}
                    </p>
                  </div>
                )}
                {selectedAnnotation.visualHypothesis && (
                  <div>
                    <span className="font-semibold text-cyan-400 uppercase text-[10px]">
                      Forensic Hypothesis:{' '}
                    </span>
                    <p className="mt-0.5 text-slate-300">
                      {selectedAnnotation.visualHypothesis}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 p-6 text-center text-xs text-slate-400">
              <Info className="mx-auto h-6 w-6 text-slate-500 mb-2" />
              Select any marker on the photo or list below to inspect forensic attributes.
            </div>
          )}

          {/* Markers List */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Annotated Markers ({annotations.length})
            </h4>
            <div className="mt-3 space-y-2 max-h-56 overflow-y-auto pr-1">
              {annotations.map((ann) => (
                <div
                  key={ann.id}
                  onClick={() => setSelectedAnnotation(ann)}
                  className={`flex cursor-pointer items-center justify-between rounded-lg border p-2 text-xs transition ${
                    selectedAnnotation?.id === ann.id
                      ? 'border-cyan-500/60 bg-cyan-950/20 text-white'
                      : 'border-slate-800 bg-slate-900/40 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded px-1.5 py-0.5 text-[11px] font-bold font-mono ${getCategoryColor(
                        ann.category
                      )}`}
                    >
                      {ann.markerLabel}
                    </span>
                    <span className="truncate max-w-[150px]">{ann.title}</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-500">
                    {(ann.coordinateX * 100).toFixed(0)}%, {(ann.coordinateY * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Visual Hypotheses Display */}
      {hypotheses.length > 0 && (
        <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/70 p-5 shadow-xl">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sparkles className="h-5 w-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">
              AI Forensic Hypotheses &amp; Section 63 BSA Custody Protocols
            </h3>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {hypotheses.map((h, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-2.5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-cyan-500/20 px-2 py-0.5 font-mono text-xs font-bold text-cyan-300">
                      {h.marker_label}
                    </span>
                    <span className="text-[11px] capitalize text-slate-400">{h.category}</span>
                  </div>
                  <h4 className="mt-2 text-sm font-bold text-slate-100">{h.finding}</h4>
                  <p className="mt-1 text-xs text-slate-300 leading-relaxed">{h.hypothesis}</p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-800/80 text-[11px]">
                  <div className="text-amber-400">
                    <span className="font-semibold text-slate-400">Statute: </span>
                    {h.statutory_relevance}
                  </div>
                  <div className="text-emerald-400">
                    <span className="font-semibold text-slate-400">Protocol: </span>
                    {h.preservation_protocol}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
