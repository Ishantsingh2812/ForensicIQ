import React, { useState } from 'react';
import { PhoneCall, ShieldAlert, CheckSquare, MessageSquare, ChevronDown, ChevronUp, AlertCircle, FileCheck } from 'lucide-react';

export const VictimAssistancePanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'helplines' | 'fir' | 'evidence' | 'advocate'>('helplines');

  const emergencyHelplines = [
    {
      number: '112',
      title: 'National Emergency Response System (Pan-India)',
      description: 'Single unified emergency number for Police, Fire, and Ambulance assistance across India.',
      badge: 'Immediate Danger',
      color: 'border-red-500/40 bg-red-950/20 text-red-400'
    },
    {
      number: '1930',
      title: 'National Cyber Crime Helpline (MHA / I4C)',
      description: 'Call immediately within 2 to 4 hours of financial cyber fraud to freeze recipient bank accounts.',
      badge: 'Financial & Cyber Fraud',
      color: 'border-blue-500/40 bg-blue-950/20 text-blue-400'
    },
    {
      number: '1091',
      title: 'Women in Distress Helpline',
      description: '24/7 emergency response, legal counsel, and immediate police assistance for women.',
      badge: 'Women Safety',
      color: 'border-purple-500/40 bg-purple-950/20 text-purple-400'
    },
    {
      number: '1098',
      title: 'Childline India',
      description: '24-hour toll-free emergency phone service for children in need of aid and protection.',
      badge: 'Child Welfare',
      color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-400'
    }
  ];

  const firSteps = [
    {
      title: '1. Zero FIR Right (Section 173(1) BNSS)',
      desc: 'You can register a First Information Report (FIR) at ANY police station irrespective of territorial jurisdiction. The station must record it and transfer it to the concerned police station.'
    },
    {
      title: '2. Electronic FIR (e-FIR)',
      desc: 'Information given electronically must be taken on record upon being signed by the complainant within three days under Section 173(1) BNSS.'
    },
    {
      title: '3. Mandatory Free Copy of FIR',
      desc: 'Under Section 173(2) BNSS, a copy of the recorded FIR must be given to the informant or complainant immediately, free of cost.'
    },
    {
      title: '4. Remedies if Police Refuse FIR',
      desc: 'If the Station House Officer (SHO) refuses to register the FIR, send the substance of information in writing by registered post to the Superintendent of Police (SP) under Section 173(4) BNSS.'
    }
  ];

  const evidenceChecklist = [
    {
      title: 'Preserve Physical Evidence & Clothing',
      desc: 'Do not wash, wipe, or disturb torn garments, bloodstained fabrics, or personal belongings. Place items in clean paper bags, not airtight plastic.'
    },
    {
      title: 'Digital Screenshot & Metadata Integrity',
      desc: 'Capture full-screen captures of threatening chats, call logs, SMS, or banking OTP messages showing device timestamps and sender numbers.'
    },
    {
      title: 'Hospital Medico-Legal Examination (MLC)',
      desc: 'In cases of bodily assault, report immediately to a government hospital for a Medico-Legal Examination. The MLC document is vital proof under Section 115/117 BNS.'
    },
    {
      title: 'CCTV Location Preservation Request',
      desc: 'Commercial CCTV DVR footage overwrites every 7 to 30 days. Immediately submit a written request to nearby shopkeepers or authorities to preserve footage.'
    }
  ];

  const advocateQuestions = [
    'Is the alleged offense classified as Bailable or Non-Bailable under the First Schedule of BNSS?',
    'Does this case warrant an application for Anticipatory Bail (Section 482 BNSS) or Regular Bail (Section 480 BNSS)?',
    'Has the Investigating Officer complied with mandatory videography of search and seizure under Section 105 BNSS?',
    'Is the electronic evidence supported by a valid Certificate under Section 63 BSA (formerly 65B Evidence Act)?',
    'Are there statutory provisions for victim compensation under Section 360 BNSS?'
  ];

  return (
    <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
        <ShieldAlert className="h-5 w-5 text-indigo-400" />
        <div>
          <h3 className="text-base font-semibold text-slate-100">
            Victim Assistance & Practical Next Steps ("What Can I Do Next?")
          </h3>
          <p className="text-xs text-slate-400">
            Actionable educational guidance on legal remedies, emergency response helplines, and evidence preservation.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-4 flex flex-wrap gap-2 border-b border-slate-800/80 pb-3">
        <button
          onClick={() => setActiveTab('helplines')}
          className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
            activeTab === 'helplines'
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <PhoneCall className="h-3.5 w-3.5" />
          <span>Emergency Helplines</span>
        </button>
        <button
          onClick={() => setActiveTab('fir')}
          className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
            activeTab === 'fir'
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileCheck className="h-3.5 w-3.5" />
          <span>FIR Filing Guide (BNSS)</span>
        </button>
        <button
          onClick={() => setActiveTab('evidence')}
          className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
            activeTab === 'evidence'
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <CheckSquare className="h-3.5 w-3.5" />
          <span>Evidence Preservation</span>
        </button>
        <button
          onClick={() => setActiveTab('advocate')}
          className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
            activeTab === 'advocate'
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <MessageSquare className="h-3.5 w-3.5" />
          <span>Questions for Advocates</span>
        </button>
      </div>

      {/* Tab 1: Helplines */}
      {activeTab === 'helplines' && (
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {emergencyHelplines.map((h, idx) => (
            <div key={idx} className={`rounded-xl border p-4 ${h.color}`}>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black">{h.number}</span>
                <span className="rounded-full bg-slate-900/60 px-2.5 py-0.5 text-[11px] font-semibold">
                  {h.badge}
                </span>
              </div>
              <h4 className="mt-2 text-sm font-bold text-slate-100">{h.title}</h4>
              <p className="mt-1 text-xs text-slate-300 leading-relaxed">{h.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: FIR Filing Guide */}
      {activeTab === 'fir' && (
        <div className="mt-4 space-y-3">
          {firSteps.map((step, idx) => (
            <div key={idx} className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <h4 className="text-sm font-bold text-indigo-300">{step.title}</h4>
              <p className="mt-1 text-xs text-slate-300 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Evidence Checklist */}
      {activeTab === 'evidence' && (
        <div className="mt-4 space-y-3">
          {evidenceChecklist.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <div className="rounded-lg bg-emerald-500/20 p-2 text-emerald-400 mt-0.5">
                <CheckSquare className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-100">{item.title}</h4>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Questions for Advocates */}
      {activeTab === 'advocate' && (
        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
            Consultation Checklist: Ask these strategic questions to your defense or victim counsel
          </h4>
          <ul className="mt-3 space-y-2.5 text-xs text-slate-200">
            {advocateQuestions.map((q, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-[11px] font-bold text-indigo-400">
                  {idx + 1}
                </span>
                <span className="mt-0.5 leading-relaxed">{q}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
