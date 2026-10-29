import React, { useState } from 'react';
import { X, CheckCircle2, XCircle, Lightbulb, AlertTriangle, ArrowRight, RotateCcw } from 'lucide-react';
import { ExamSubject, ExamTrack, SAMPLE_PRACTICE_QUESTIONS, PracticeQuestion } from '../data/examsData';

interface QuizModalProps {
  subject: ExamSubject | null;
  exam: ExamTrack | null;
  onClose: () => void;
  onOpenSignUp: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  subject,
  exam,
  onClose,
  onOpenSignUp,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  if (!subject || !exam) return null;

  // Find questions for subject or fall back to general sample questions
  const questionsList: PracticeQuestion[] =
    SAMPLE_PRACTICE_QUESTIONS[subject.name] ||
    SAMPLE_PRACTICE_QUESTIONS['Pharmacology'] ||
    [];

  const currentQ = questionsList[questionIndex] || {
    id: 'gen-1',
    subject: subject.name,
    exam: exam.name,
    scenario: `A nursing student is reviewing core clinical concepts for ${subject.name} on the ${exam.name}.`,
    question: `Which clinical nursing assessment is the highest priority for evaluating patient stabilization in ${subject.name}?`,
    options: [
      { id: 'A', text: 'Obtaining a full baseline metabolic profile within 2 hours.' },
      { id: 'B', text: 'Assessing airway patency, breathing quality, and cardiovascular perfusion.' },
      { id: 'C', text: 'Documenting secondary subjective discomfort on a 1-to-10 numerical scale.' },
      { id: 'D', text: 'Scheduling a routine follow-up radiological study after morning rounds.' },
    ],
    correctOptionId: 'B',
    rationale: 'In all clinical nursing scenarios (NCLEX, ATI, HESI), Priority Questioning follows the ABCs (Airway, Breathing, Circulation) or Maslow Hierarchy of Needs before psychological or administrative tasks.',
    whyWrong: 'Options A, C, and D are secondary interventions that must never delay immediate life-sustaining airway and circulatory assessment.',
    clinicalPearl: 'When in doubt: Assess before you act, and always protect ABCs first!',
  };

  const handleSelectOption = (optId: string) => {
    if (submitted) return;
    setSelectedOption(optId);
    setSubmitted(true);
    if (optId === currentQ.correctOptionId) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (questionIndex + 1 < questionsList.length) {
      setQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setSubmitted(false);
    } else {
      // Completed all free questions in this subject
      setSelectedOption(null);
      setSubmitted(false);
      setQuestionIndex(0);
    }
  };

  const isCorrect = selectedOption === currentQ.correctOptionId;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#c4553a] bg-[#c4553a]/10 px-2.5 py-0.5 rounded-full">
                {exam.name}
              </span>
              <span className="text-xs text-stone-500 font-medium">{subject.name}</span>
            </div>
            <h3 className="text-lg font-bold text-stone-900 mt-1">
              Practice Question ({questionIndex + 1} of {Math.max(questionsList.length, 1)})
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Clinical Scenario Box */}
        <div className="mt-5 p-4 rounded-2xl bg-[#faf7f2] border border-stone-200/70 text-stone-800 text-sm leading-relaxed">
          <p className="font-semibold text-stone-900 mb-1 flex items-center gap-1.5 text-xs text-stone-500 uppercase tracking-wider">
            Clinical Vignette
          </p>
          <p>{currentQ.scenario}</p>
        </div>

        {/* Question Stem */}
        <div className="mt-4 text-base font-semibold text-stone-900">
          {currentQ.question}
        </div>

        {/* Options */}
        <div className="mt-5 space-y-2.5">
          {currentQ.options.map((opt) => {
            const isThisSelected = selectedOption === opt.id;
            const isThisCorrect = opt.id === currentQ.correctOptionId;

            let btnStyle = 'border-stone-200 bg-white hover:border-stone-300 text-stone-800';
            if (submitted) {
              if (isThisCorrect) {
                btnStyle = 'border-[#2d5a4a] bg-[#2d5a4a]/10 text-[#1e3d32] font-semibold';
              } else if (isThisSelected && !isCorrect) {
                btnStyle = 'border-[#c4553a] bg-[#c4553a]/10 text-[#8b3a2f]';
              } else {
                btnStyle = 'border-stone-100 bg-stone-50 text-stone-400 opacity-60';
              }
            }

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectOption(opt.id)}
                disabled={submitted}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
              >
                <span
                  className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                    submitted && isThisCorrect
                      ? 'bg-[#2d5a4a] text-white'
                      : submitted && isThisSelected
                      ? 'bg-[#c4553a] text-white'
                      : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  {opt.id}
                </span>
                <span className="flex-1 text-sm leading-normal">{opt.text}</span>
                {submitted && isThisCorrect && (
                  <CheckCircle2 className="h-5 w-5 text-[#2d5a4a] shrink-0" />
                )}
                {submitted && isThisSelected && !isCorrect && (
                  <XCircle className="h-5 w-5 text-[#c4553a] shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Rationale & Feedback Display */}
        {submitted && (
          <div className="mt-6 space-y-4 animate-in fade-in duration-300">
            {/* Status Banner */}
            <div
              className={`p-3.5 rounded-xl flex items-center gap-2 text-sm font-semibold ${
                isCorrect
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                  : 'bg-rose-50 text-rose-900 border border-rose-200'
              }`}
            >
              {isCorrect ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span>Correct! Great clinical reasoning.</span>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-rose-600 shrink-0" />
                  <span>Incorrect. Option {currentQ.correctOptionId} is the correct answer.</span>
                </>
              )}
            </div>

            {/* Expert Rationale Card */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs sm:text-sm text-stone-800 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-amber-900 text-xs uppercase tracking-wider">
                <Lightbulb className="h-4 w-4 text-[#e8a838]" />
                Expert Rationale
              </div>
              <p className="leading-relaxed">{currentQ.rationale}</p>

              {currentQ.whyWrong && (
                <div className="pt-2 border-t border-amber-200/50">
                  <span className="font-semibold text-amber-950">Why others get this wrong: </span>
                  <span>{currentQ.whyWrong}</span>
                </div>
              )}

              {currentQ.clinicalPearl && (
                <div className="pt-2 border-t border-amber-200/50 flex items-start gap-1.5 text-[#2d5a4a] font-medium">
                  <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-[#2d5a4a]" />
                  <span>
                    <strong>Clinical Pearl: </strong>
                    {currentQ.clinicalPearl}
                  </span>
                </div>
              )}
            </div>

            {/* Actions: Next Question or Unlock Full QBank */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedOption(null);
                  setSubmitted(false);
                }}
                className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Try this question again
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {questionIndex + 1 < questionsList.length ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 sm:flex-none px-5 py-2.5 bg-[#2d5a4a] hover:bg-[#1e3d32] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
                  >
                    Next Question <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenSignUp();
                    }}
                    className="flex-1 sm:flex-none px-5 py-2.5 bg-[#c4553a] hover:bg-[#8b3a2f] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-[#c4553a]/25"
                  >
                    Unlock 300,000+ Questions <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
