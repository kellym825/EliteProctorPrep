import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ShieldCheck, Sparkles } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does EliteProctorPrep mirror the 2026 Next Generation NCLEX (NGN)?',
      a: 'Our test bank is built specifically around the NCSBN Clinical Judgment Measurement Model (NCJMM). You will encounter all new NGN item types including unfolding 6-part clinical case studies, extended multiple-response, drag-and-drop cloze tables, matrix grids, and highlight-in-text questions with authentic EHR tabs (Vitals, Lab Results, and Nurse Notes).',
    },
    {
      q: 'What is your 100% Pass Guarantee and how does it work?',
      a: 'If you complete at least 80% of your targeted exam test bank with an average practice score of 65% or higher and do not pass your official NCLEX, ATI, or HESI exam on your first attempt, we will refund 100% of your subscription fee or grant you free extended access until you pass. No hassle, no fine print.',
    },
    {
      q: 'Are the rationales written by real nursing professors and educators?',
      a: 'Yes. Every question is crafted and peer-reviewed by practicing Registered Nurses, Master’s-prepared nurse educators, and clinical specialists. Rationales don’t just state the correct answer—they break down the pathophysiology, explain why every distractor is incorrect, and provide high-yield "Clinical Pearls" for bedside practice.',
    },
    {
      q: 'Can I study on my phone, iPad, or laptop simultaneously?',
      a: 'Absolutely. EliteProctorPrep is fully cloud-synced and responsive across smartphones, tablets, and desktop computers. Your question history, notes, test streaks, and predicted readiness score update instantly across all your devices.',
    },
    {
      q: 'Can I switch my exam track if I transition from school exit exams to NCLEX?',
      a: 'Yes! Nursing students often take TEAS to enter school, HESI/ATI during their semesters, and NCLEX upon graduation. You can easily switch your active exam track or upgrade to a comprehensive bundle directly in your student settings without losing your previous study history.',
    },
    {
      q: 'How does the Predicted Pass Score determine when I am exam-ready?',
      a: 'Our adaptive readiness algorithm compares your accuracy, response latency, and subject-specific mastery against our dataset of over 50,000 nursing students who passed their official board exams. When your predicted pass likelihood reaches 92%+, you have a statistically validated probability of passing on test day.',
    },
    {
      q: 'What is included in the Free Trial?',
      a: 'The Free Trial gives you immediate access to sample practice questions across every core nursing subject (Pharmacology, Med-Surg, Fundamentals, Maternal Newborn, Anatomy, etc.), complete with full rationales and distractor breakdowns. No credit card is required to begin.',
    },
  ];

  return (
    <section id="faq" className="py-20 bg-[#f3ede4]/70 border-t border-stone-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="np-pill np-pill-sage inline-flex items-center gap-1.5 mb-2">
            <HelpCircle className="h-3.5 w-3.5" /> Frequently Asked Questions
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight font-serif mt-2">
            Got Questions? We Have Answers.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-xl mx-auto">
            Everything you need to know about preparing with EliteProctorPrep and passing your nursing board exams.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-50/70 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-stone-900 text-sm sm:text-base">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-[#c4553a] text-white rotate-180'
                        : 'bg-stone-100 text-stone-500'
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 bg-[#fffdf9]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="mt-10 p-5 rounded-2xl bg-white border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#c4553a] flex items-center justify-center shrink-0">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-sm text-stone-900">Still have questions?</p>
              <p className="text-xs text-stone-500">
                Our team of Registered Nurse advisors is available 24/7 to assist with your study plan.
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/447843982513?text=Hi%20EliteProctorPrep%2C%20I%20have%20a%20question%20about%20the%20prep%20program"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#2d5a4a] hover:bg-[#1e3d32] text-white text-xs font-semibold rounded-xl shrink-0 transition-colors shadow-sm"
          >
            Chat with an Advisor
          </a>
        </div>
      </div>
    </section>
  );
};
