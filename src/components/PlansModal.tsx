import React, { useState } from 'react';
import { X, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { EXAM_TRACKS } from '../data/examsData';

interface PlansModalProps {
  onClose: () => void;
  onOpenSignUp: () => void;
}

export const PlansModal: React.FC<PlansModalProps> = ({ onClose, onOpenSignUp }) => {
  const [selectedExam, setSelectedExam] = useState('NCLEX-RN');
  const [selectedPlan, setSelectedPlan] = useState('90-day');
  const [isSuccess, setIsSuccess] = useState(false);

  const plans = [
    {
      id: 'trial',
      name: 'Free Trial',
      price: '$0',
      period: 'Forever free',
      desc: 'Perfect for testing the interface and question quality.',
      features: [
        '5 sample practice questions per subject',
        'Expert clinical rationales',
        'Basic progress analytics',
        'Mobile & desktop access',
      ],
      popular: false,
      cta: 'Start Free Trial',
    },
    {
      id: '90-day',
      name: '90-Day Pass',
      price: '$49',
      period: '3 months access',
      desc: 'Our most popular plan for passing on the first attempt.',
      features: [
        'Unlimited access to chosen exam track',
        'Over 30,000+ targeted practice questions',
        'Full-length simulated timed exams',
        'AI predicted pass score probability',
        'Why others get this wrong breakdown',
        '24/7 student chat support',
      ],
      popular: true,
      cta: 'Get 90-Day Access',
    },
    {
      id: '180-day',
      name: '180-Day Pass',
      price: '$79',
      period: '6 months access',
      desc: 'Comprehensive prep with full exam pass guarantee.',
      features: [
        'Everything in 90-Day Pass',
        '100% Pass or Money-Back Guarantee',
        'Offline PDF study summaries',
        'Pharmacology flashcard decks',
        'Clinical math cheat sheets',
        'Priority educator ticket reviews',
      ],
      popular: false,
      cta: 'Get 180-Day Pass',
    },
  ];

  const handleSubscribe = (planId: string) => {
    if (planId === 'trial') {
      onClose();
      onOpenSignUp();
    } else {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        onOpenSignUp();
      }, 1500);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-stone-200 shadow-2xl p-6 sm:p-10 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-6 border-b border-stone-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#c4553a] bg-[#c4553a]/10 px-3 py-1 rounded-full">
              Subscription Plans
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-2 font-serif">
              Simple, Transparent Pricing
            </h3>
            <p className="text-sm text-stone-600 mt-1">
              Select your targeted exam and pass with confidence on your first try.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Exam Selection Dropdown */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[#faf7f2] rounded-2xl border border-stone-200">
          <label className="text-xs sm:text-sm font-semibold text-stone-800">
            Choose your target exam:
          </label>
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 bg-white border border-stone-200 rounded-xl text-sm font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#c4553a]/30"
          >
            {EXAM_TRACKS.map((exam) => (
              <option key={exam.id} value={exam.name}>
                {exam.name} ({exam.badge})
              </option>
            ))}
          </select>
        </div>

        {isSuccess ? (
          <div className="py-16 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Check className="h-8 w-8" />
            </div>
            <h4 className="text-2xl font-bold text-stone-900">Plan Selected!</h4>
            <p className="text-sm text-stone-600">
              Redirecting you to create your free student account for {selectedExam}...
            </p>
          </div>
        ) : (
          /* Plans Grid */
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((p) => (
              <div
                key={p.id}
                className={`relative rounded-2xl p-6 border flex flex-col justify-between transition-all ${
                  p.popular
                    ? 'border-[#c4553a] bg-[#fffdf9] shadow-lg shadow-[#c4553a]/10 ring-2 ring-[#c4553a]'
                    : 'border-stone-200 bg-white hover:border-stone-300 shadow-sm'
                }`}
              >
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c4553a] text-white text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> Most Popular
                  </div>
                )}

                <div>
                  <h4 className="font-bold text-lg text-stone-900">{p.name}</h4>
                  <p className="text-xs text-stone-500 mt-1 min-h-[32px]">{p.desc}</p>

                  <div className="my-5">
                    <span className="text-4xl font-extrabold text-stone-900 font-serif">
                      {p.price}
                    </span>
                    <span className="text-xs text-stone-500 ml-1.5">{p.period}</span>
                  </div>

                  <ul className="space-y-2.5 text-xs text-stone-600 mb-6">
                    {p.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-[#2d5a4a] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => handleSubscribe(p.id)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-sm ${
                    p.popular
                      ? 'bg-[#c4553a] hover:bg-[#8b3a2f] text-white shadow-md shadow-[#c4553a]/30'
                      : 'bg-stone-900 hover:bg-stone-800 text-white'
                  }`}
                >
                  {p.cta}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Guarantee Banner */}
        <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-center gap-2 text-xs text-stone-500">
          <ShieldCheck className="h-4 w-4 text-[#2d5a4a]" />
          <span>Secure 256-bit SSL encrypted checkout &bull; Cancel anytime</span>
        </div>
      </div>
    </div>
  );
};
