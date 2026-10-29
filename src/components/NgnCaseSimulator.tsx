import React, { useState } from 'react';
import {
  X,
  FileText,
  Activity,
  FlaskConical,
  ClipboardList,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  AlertCircle,
  Lightbulb,
} from 'lucide-react';

interface NgnCaseSimulatorProps {
  onClose: () => void;
  onOpenSignUp: () => void;
}

export const NgnCaseSimulator: React.FC<NgnCaseSimulatorProps> = ({ onClose, onOpenSignUp }) => {
  const [activeTab, setActiveTab] = useState<'hnp' | 'vitals' | 'labs' | 'notes'>('hnp');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedChoices, setSelectedChoices] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [caseScore, setCaseScore] = useState<number>(0);

  // Unfolding Case: 68-year-old admitted for Post-op Hip Arthroplasty developing Sepsis
  const steps = [
    {
      stepNum: 1,
      title: 'Step 1: Recognize Cues',
      prompt: 'Based on the client’s electronic health record, which of the following findings require IMMEDIATE nursing follow-up? (Select all that apply)',
      options: [
        { id: '1', text: 'Core body temperature 39.1°C (102.4°F)' },
        { id: '2', text: 'Blood Pressure 88/54 mmHg with MAP 65 mmHg' },
        { id: '3', text: 'Right hip surgical incision dry and intact' },
        { id: '4', text: 'Serum Lactate 3.8 mmol/L (Normal: 0.5–2.2 mmol/L)' },
        { id: '5', text: 'Urine output 15 mL/hr over past 2 consecutive hours' },
        { id: '6', text: 'Mild drowsiness with orientation to person, place, and time' },
      ],
      correctIds: ['1', '2', '4', '5'],
      rationale:
        'Fever (39.1°C), severe hypotension (88/54 mmHg), elevated lactate (3.8 mmol/L), and oliguria (<0.5 mL/kg/hr) are hallmark cues of systemic inflammatory response syndrome (SIRS) progressing toward septic shock secondary to hospital-acquired infection.',
    },
    {
      stepNum: 2,
      title: 'Step 2: Analyze Cues & Prioritize Hypothesis',
      prompt: 'The nurse analyzes the clinical data and determines the client is at highest risk for developing which life-threatening condition?',
      options: [
        { id: 'A', text: 'Hypovolemic shock secondary to surgical hemorrhage' },
        { id: 'B', text: 'Septic shock secondary to severe systemic bloodstream infection' },
        { id: 'C', text: 'Anaphylactic reaction to prophylactic cefazolin' },
        { id: 'D', text: 'Acute pulmonary embolism with right ventricular strain' },
      ],
      correctIds: ['B'],
      rationale:
        'The combination of high fever, extreme tachycardia, profound vasodilation, elevated lactate indicating tissue hypoperfusion, and inadequate renal perfusion directly points to Septic Shock.',
    },
    {
      stepNum: 3,
      title: 'Step 3: Generate Solutions & Take Action',
      prompt: 'Which physician order should the nurse implement FIRST according to the 1-Hour Sepsis Bundle protocol?',
      options: [
        { id: 'A', text: 'Administer 30 mL/kg IV Crystalloid fluid bolus for hypotension/lactate ≥4' },
        { id: 'B', text: 'Obtain blood cultures prior to administering broad-spectrum IV antibiotics' },
        { id: 'C', text: 'Initiate norepinephrine infusion via peripheral access' },
        { id: 'D', text: 'Administer oral acetaminophen 650 mg for temperature reduction' },
      ],
      correctIds: ['B'],
      rationale:
        'Blood cultures (at least two sets from separate sites) MUST be drawn prior to starting broad-spectrum antibiotics to avoid rendering cultures negative, followed immediately by rapid broad-spectrum antibiotics and crystalloid resuscitation.',
    },
  ];

  const currentQuestion = steps[currentStep - 1];

  const handleToggleOption = (id: string) => {
    if (isSubmitted) return;
    if (currentQuestion.correctIds.length > 1) {
      // Multi-select
      setSelectedChoices((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      // Single select
      setSelectedChoices([id]);
    }
  };

  const handleSubmit = () => {
    if (selectedChoices.length === 0) return;
    setIsSubmitted(true);
    // Strict NCSBN NGN scoring logic: all correct choices must be selected, no incorrect choices
    const correctCount = selectedChoices.filter((id) =>
      currentQuestion.correctIds.includes(id)
    ).length;
    const isExactMatch =
      correctCount === currentQuestion.correctIds.length &&
      selectedChoices.length === currentQuestion.correctIds.length;

    if (isExactMatch) {
      setCaseScore((prev) => prev + 1);
    }
  };

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
      setSelectedChoices([]);
      setIsSubmitted(false);
    } else {
      // Completed case
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setSelectedChoices([]);
    setIsSubmitted(false);
    setCaseScore(0);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col border border-stone-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Simulator Top Header */}
        <div className="bg-[#071838] text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-amber-400/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#c4553a] flex items-center justify-center text-white font-bold text-xs shadow-md">
              NGN
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#e8a838] uppercase tracking-wider">
                  Next Generation NCLEX (NGN)
                </span>
                <span className="text-[11px] bg-white/10 px-2 py-0.5 rounded text-white/80">
                  Unfolding Case Study
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Client: Evelyn Garcia, 68 yo Female &bull; Room 412 &bull; Post-Op Day 2
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex text-xs bg-amber-400/20 text-[#e8a838] border border-amber-400/30 px-3 py-1 rounded-full font-bold">
              Score: {caseScore} / {steps.length}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* 2-Column Split: EHR on Left, Question on Right */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-stone-200">
          {/* LEFT: EHR Simulator */}
          <div className="lg:col-span-5 bg-[#faf7f2] flex flex-col p-4 sm:p-5">
            {/* EHR Tabs */}
            <div className="flex items-center gap-1 p-1 bg-stone-200/70 rounded-xl mb-4 text-xs font-medium">
              <button
                type="button"
                onClick={() => setActiveTab('hnp')}
                className={`flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  activeTab === 'hnp'
                    ? 'bg-white text-stone-900 shadow-sm font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <FileText className="h-3.5 w-3.5 text-[#c4553a]" /> H&amp;P
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('vitals')}
                className={`flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  activeTab === 'vitals'
                    ? 'bg-white text-stone-900 shadow-sm font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Activity className="h-3.5 w-3.5 text-[#2d5a4a]" /> Vitals
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('labs')}
                className={`flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  activeTab === 'labs'
                    ? 'bg-white text-stone-900 shadow-sm font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <FlaskConical className="h-3.5 w-3.5 text-[#e8a838]" /> Labs
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('notes')}
                className={`flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  activeTab === 'notes'
                    ? 'bg-white text-stone-900 shadow-sm font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <ClipboardList className="h-3.5 w-3.5 text-stone-700" /> Notes
              </button>
            </div>

            {/* EHR Content Area */}
            <div className="bg-white rounded-2xl border border-stone-200/80 p-4 text-xs flex-1 shadow-sm overflow-y-auto">
              {activeTab === 'hnp' && (
                <div className="space-y-3 text-stone-700 leading-relaxed">
                  <p className="font-bold text-stone-900 text-sm border-b pb-1.5">
                    History &amp; Physical
                  </p>
                  <p>
                    <strong>Age/Sex:</strong> 68-year-old female
                  </p>
                  <p>
                    <strong>Chief Complaint:</strong> Postoperative evaluation following right total hip arthroplasty (THA) 48 hours ago.
                  </p>
                  <p>
                    <strong>Medical History:</strong> Type 2 Diabetes Mellitus, Hypertension, Osteoarthritis.
                  </p>
                  <p>
                    <strong>Allergies:</strong> Penicillin (rash and facial edema).
                  </p>
                  <p>
                    <strong>Current Surgical Status:</strong> Foley catheter removed 6 hours ago; voided 80 mL once. Right hip incision dressed with dry gauze.
                  </p>
                </div>
              )}

              {activeTab === 'vitals' && (
                <div className="space-y-3">
                  <p className="font-bold text-stone-900 text-sm border-b pb-1.5">
                    Flowsheet: Vital Signs
                  </p>
                  <table className="w-full text-[11px] text-left border-collapse">
                    <thead>
                      <tr className="border-b text-stone-500">
                        <th className="py-1">Parameter</th>
                        <th className="py-1">08:00</th>
                        <th className="py-1">12:00</th>
                        <th className="py-1">14:30 (Current)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      <tr>
                        <td className="py-1.5 font-medium">Temp</td>
                        <td>37.1°C</td>
                        <td>38.2°C</td>
                        <td className="text-rose-600 font-bold">39.1°C (102.4°F)</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-medium">BP</td>
                        <td>128/78</td>
                        <td>106/64</td>
                        <td className="text-rose-600 font-bold">88/54 mmHg</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-medium">HR</td>
                        <td>78 bpm</td>
                        <td>94 bpm</td>
                        <td className="text-rose-600 font-bold">124 bpm (Tachy)</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-medium">RR</td>
                        <td>16 /min</td>
                        <td>20 /min</td>
                        <td className="text-rose-600 font-bold">26 /min</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-medium">SpO2</td>
                        <td>98% RA</td>
                        <td>96% RA</td>
                        <td>93% on Room Air</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'labs' && (
                <div className="space-y-3">
                  <p className="font-bold text-stone-900 text-sm border-b pb-1.5">
                    STAT Laboratory Profile
                  </p>
                  <table className="w-full text-[11px] text-left border-collapse">
                    <thead>
                      <tr className="border-b text-stone-500">
                        <th className="py-1">Test</th>
                        <th className="py-1">Result</th>
                        <th className="py-1">Reference Range</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      <tr>
                        <td className="py-1.5 font-medium">WBC</td>
                        <td className="text-rose-600 font-bold">18,400 /mm³</td>
                        <td>4,500–11,000</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-medium">Serum Lactate</td>
                        <td className="text-rose-600 font-bold">3.8 mmol/L</td>
                        <td>0.5–2.2</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-medium">Serum Creatinine</td>
                        <td className="text-rose-600 font-bold">1.8 mg/dL</td>
                        <td>0.6–1.2</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-medium">Blood Glucose</td>
                        <td className="text-amber-600 font-bold">198 mg/dL</td>
                        <td>70–110</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-medium">Platelets</td>
                        <td>140,000 /mm³</td>
                        <td>150,000–450,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="space-y-3 text-stone-700 leading-relaxed">
                  <p className="font-bold text-stone-900 text-sm border-b pb-1.5">
                    Nursing Shift Narrative (14:30)
                  </p>
                  <p>
                    <strong>14:30:</strong> Nurse called to bedside by nursing assistant. Client reported feeling suddenly very cold with severe rigors and shaking chills. Skin is flushed, warm, and diaphoretic to touch. Capillary refill is delayed at 4 seconds. Client responds to questions but speaks slowly and appears lethargic. Urine bag reveals 30 mL dark amber urine collected over the past 2 hours. Provider paged STAT.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-stone-500">
              <span className="flex items-center gap-1 text-emerald-700 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5" /> Electronic Record Synced
              </span>
              <span>Case Phase: {currentStep} of {steps.length}</span>
            </div>
          </div>

          {/* RIGHT: Clinical Decision Question */}
          <div className="lg:col-span-7 p-5 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#c4553a] bg-[#c4553a]/10 px-3 py-1 rounded-full">
                  {currentQuestion.title}
                </span>
                <span className="text-xs font-semibold text-stone-500">
                  Case Score: {caseScore}/{steps.length}
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-bold text-stone-900 mb-4 leading-snug">
                {currentQuestion.prompt}
              </h4>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQuestion.options.map((opt) => {
                  const isSelected = selectedChoices.includes(opt.id);
                  const isCorrect = currentQuestion.correctIds.includes(opt.id);

                  let style = 'border-stone-200 bg-white hover:border-stone-300 text-stone-800';
                  if (isSubmitted) {
                    if (isCorrect) {
                      style = 'border-emerald-500 bg-emerald-50/80 text-emerald-950 font-semibold';
                    } else if (isSelected && !isCorrect) {
                      style = 'border-rose-400 bg-rose-50/80 text-rose-950';
                    } else {
                      style = 'border-stone-100 bg-stone-50 text-stone-400 opacity-60';
                    }
                  } else if (isSelected) {
                    style = 'border-[#c4553a] bg-[#c4553a]/10 text-stone-900 shadow-sm';
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleToggleOption(opt.id)}
                      disabled={isSubmitted}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${style}`}
                    >
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border ${
                          currentQuestion.correctIds.length > 1 ? 'rounded-md' : 'rounded-full'
                        } ${
                          isSelected
                            ? 'bg-[#c4553a] text-white border-[#c4553a]'
                            : 'border-stone-300 bg-white text-transparent'
                        }`}
                      >
                        ✓
                      </div>
                      <span className="flex-1 text-xs sm:text-sm leading-normal">{opt.text}</span>
                      {isSubmitted && isCorrect && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      )}
                      {isSubmitted && isSelected && !isCorrect && (
                        <XCircle className="h-4 w-4 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Rationale once submitted */}
              {isSubmitted && (
                <div className="mt-5 space-y-3 animate-in fade-in duration-200">
                  <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs sm:text-sm text-stone-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-bold text-amber-950 text-xs uppercase tracking-wider">
                        <Lightbulb className="h-4 w-4 text-[#e8a838]" />
                        NGN Clinical Decision Rationale
                      </div>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-200/60 text-amber-900">
                        Phase {currentStep} of {steps.length}
                      </span>
                    </div>
                    <p className="leading-relaxed">{currentQuestion.rationale}</p>
                  </div>

                  {currentStep === steps.length && (
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-[#071838] to-[#132c57] text-white border border-amber-400/30 flex items-center justify-between">
                      <div>
                        <div className="text-xs text-amber-300 font-bold uppercase tracking-wider">
                          Simulation Outcome
                        </div>
                        <div className="text-sm sm:text-base font-bold mt-0.5">
                          Final Score: {caseScore} of {steps.length} Clinical Decisions Mastered
                        </div>
                        <div className="text-xs text-stone-300 mt-0.5">
                          {caseScore === steps.length
                            ? 'Outstanding! Your clinical judgment matches the 98% pass readiness benchmark.'
                            : 'Good effort! Review sepsis protocol cues and retry for 100% mastery.'}
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center font-bold text-amber-300 text-lg shrink-0 ml-3">
                        {Math.round((caseScore / steps.length) * 100)}%
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Restart Case
              </button>

              <div>
                {!isSubmitted ? (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={selectedChoices.length === 0}
                    className={`px-6 py-2.5 rounded-xl text-xs font-semibold text-white transition-all shadow-md cursor-pointer ${
                      selectedChoices.length > 0
                        ? 'bg-[#c4553a] hover:bg-[#8b3a2f]'
                        : 'bg-stone-300 cursor-not-allowed'
                    }`}
                  >
                    Submit Clinical Decision
                  </button>
                ) : currentStep < steps.length ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#2d5a4a] hover:bg-[#1e3d32] transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    Next Case Phase <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenSignUp();
                    }}
                    className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#c4553a] hover:bg-[#8b3a2f] transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    Unlock 150+ NGN Clinical Cases <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
