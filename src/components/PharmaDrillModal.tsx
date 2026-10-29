import React, { useState } from 'react';
import { X, Pill, AlertOctagon, ShieldAlert, ArrowRight, ArrowLeft, RotateCw } from 'lucide-react';

interface PharmaDrillModalProps {
  onClose: () => void;
  onOpenSignUp: () => void;
}

export const PharmaDrillModal: React.FC<PharmaDrillModalProps> = ({ onClose, onOpenSignUp }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const drugs = [
    {
      generic: 'Digoxin',
      brand: 'Lanoxin',
      class: 'Cardiac Glycoside (Positive inotrope, negative chronotrope)',
      therapeuticRange: '0.8 – 2.0 ng/mL',
      nursingAlert: 'Hold if apical pulse < 60 bpm. Hypokalemia drastically increases toxicity risk (yellow/green halos, nausea, bradycardia).',
      antidote: 'Digoxin Immune Fab (DigiFab / Digibind)',
    },
    {
      generic: 'Heparin (Unfractionated)',
      brand: 'Hep-Lock',
      class: 'Anticoagulant (Indirect Thrombin Inhibitor)',
      therapeuticRange: 'aPTT: 1.5 – 2.5x control (approx. 60–80 seconds)',
      nursingAlert: 'Monitor aPTT and platelets daily. Watch for Heparin-Induced Thrombocytopenia (HIT). Avoid IM injections.',
      antidote: 'Protamine Sulfate',
    },
    {
      generic: 'Warfarin',
      brand: 'Coumadin',
      class: 'Vitamin K Antagonist',
      therapeuticRange: 'INR: 2.0 – 3.0 (2.5 – 3.5 for mechanical prosthetic valves)',
      nursingAlert: 'Consistent green leafy vegetable intake (Vitamin K). Takes 3–5 days to reach therapeutic levels; overlap with heparin.',
      antidote: 'Vitamin K (Phytonadione) / Fresh Frozen Plasma (FFP)',
    },
    {
      generic: 'Vancomycin',
      brand: 'Vancocin',
      class: 'Glycopeptide Antibiotic',
      therapeuticRange: 'Trough level: 10 – 20 mcg/mL (drawn 30 min prior to next dose)',
      nursingAlert: 'Infuse over at least 60 minutes to prevent Red Man Syndrome (histamine release). Nephrotoxic & Ototoxic.',
      antidote: 'Discontinue infusion, administer antihistamines for Red Man Syndrome',
    },
    {
      generic: 'Lithium',
      brand: 'Lithobid',
      class: 'Mood Stabilizer (Bipolar Disorder)',
      therapeuticRange: '0.6 – 1.2 mEq/L (Toxicity > 1.5 mEq/L)',
      nursingAlert: 'Do NOT restrict sodium or fluids. Low sodium causes kidneys to reabsorb lithium, precipitating severe toxicity (tremors, ataxia, seizures).',
      antidote: 'Hydration, Gastric lavage, Hemodialysis in severe overdose',
    },
    {
      generic: 'Morphine Sulfate',
      brand: 'MS Contin',
      class: 'Opioid Analgesic (Mu-receptor agonist)',
      therapeuticRange: 'Titrate to clinical pain score',
      nursingAlert: 'Assess respiratory rate prior to dosing. Hold dose if RR < 12 breaths/min. Constipation is a non-tolerated chronic effect.',
      antidote: 'Naloxone (Narcan) IV/Nasal',
    },
    {
      generic: 'Magnesium Sulfate',
      brand: 'MgSO4',
      class: 'Anticonvulsant / Tocolytic (Preeclampsia / Eclampsia)',
      therapeuticRange: 'Therapeutic: 4 – 7 mg/dL (Loss of DTRs at 8–10 mg/dL)',
      nursingAlert: 'Monitor deep tendon reflexes (DTRs), hourly urine output (>30 mL/hr), and respiratory rate (>12/min).',
      antidote: 'Calcium Gluconate 10% IV',
    },
  ];

  const current = drugs[currentIndex];

  const handleNext = () => {
    setFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % drugs.length);
  };

  const handlePrev = () => {
    setFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + drugs.length) % drugs.length);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-xl w-full border border-stone-200 shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#c4553a]/10 text-[#c4553a] flex items-center justify-center">
              <Pill className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#c4553a]">
                High-Yield Pharmacology
              </span>
              <h3 className="text-lg font-bold text-stone-900 font-serif">
                Must-Know NCLEX Drugs &amp; Antidotes
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Card Progress */}
        <div className="flex items-center justify-between text-xs text-stone-500 mb-3">
          <span>Card {currentIndex + 1} of {drugs.length}</span>
          <span className="text-stone-400">Click card to reveal antidote &amp; clinical alerts</span>
        </div>

        {/* Flashcard */}
        <div
          onClick={() => setFlipped(!flipped)}
          className={`cursor-pointer min-h-[260px] p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col justify-between ${
            flipped
              ? 'bg-[#071838] border-amber-400/40 text-white shadow-xl'
              : 'bg-gradient-to-br from-[#faf7f2] to-[#f3ede4] border-[#c4553a]/30 text-stone-900 shadow-md'
          }`}
        >
          {!flipped ? (
            /* Front of Card */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#c4553a] bg-[#c4553a]/10 px-2.5 py-0.5 rounded-full">
                  Drug Profile
                </span>
                <span className="text-xs text-stone-400 flex items-center gap-1">
                  <RotateCw className="h-3.5 w-3.5" /> Tap to flip
                </span>
              </div>

              <div>
                <h4 className="text-2xl font-bold font-serif text-stone-900">
                  {current.generic}
                </h4>
                <p className="text-xs text-stone-500">Brand: {current.brand}</p>
              </div>

              <div className="pt-2 border-t border-stone-200">
                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  Classification
                </p>
                <p className="text-sm font-medium text-stone-800 mt-0.5">{current.class}</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  Therapeutic Range
                </p>
                <p className="text-sm font-bold text-[#2d5a4a] mt-0.5">{current.therapeuticRange}</p>
              </div>
            </div>
          ) : (
            /* Back of Card: Antidote & Nursing Alerts */
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldAlert className="h-3.5 w-3.5" /> Clinical Antidote
                </span>
                <span className="text-xs text-stone-400 flex items-center gap-1">
                  <RotateCw className="h-3.5 w-3.5" /> Tap to flip back
                </span>
              </div>

              <div>
                <p className="text-xs font-semibold text-amber-200 uppercase tracking-wider">
                  Emergency Antidote / Reversal
                </p>
                <h4 className="text-xl font-bold text-emerald-400 font-serif mt-1">
                  {current.antidote}
                </h4>
              </div>

              <div className="pt-2 border-t border-white/10">
                <p className="text-xs font-semibold text-amber-200 uppercase tracking-wider flex items-center gap-1">
                  <AlertOctagon className="h-3.5 w-3.5 text-rose-400" /> High-Priority NCLEX Alert
                </p>
                <p className="text-xs text-stone-200 leading-relaxed mt-1">
                  {current.nursingAlert}
                </p>
              </div>
            </div>
          )}

          <div className="text-center pt-2 text-[11px] opacity-60">
            {flipped ? 'Showing Back (Antidote)' : 'Showing Front (Drug & Range)'}
          </div>
        </div>

        {/* Navigation & Unlock */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handlePrev}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Prev Drug
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenSignUp();
            }}
            className="text-xs text-[#c4553a] font-semibold hover:underline text-center"
          >
            Unlock 120+ Pharmacology Decks
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="px-4 py-2 bg-[#2d5a4a] hover:bg-[#1e3d32] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            Next Drug <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
