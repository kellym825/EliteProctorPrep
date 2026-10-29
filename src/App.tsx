import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ExamLibrary } from './components/ExamLibrary';
import { InteractiveToolsBanner } from './components/InteractiveToolsBanner';
import { HowItWorks } from './components/HowItWorks';
import { FeaturesBento } from './components/FeaturesBento';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { QuizModal } from './components/QuizModal';
import { PlansModal } from './components/PlansModal';
import { AuthModal } from './components/AuthModals';
import { InfoModals } from './components/InfoModals';
import { NgnCaseSimulator } from './components/NgnCaseSimulator';
import { ReadinessCalculator } from './components/ReadinessCalculator';
import { PharmaDrillModal } from './components/PharmaDrillModal';
import { LegalModals } from './components/LegalModals';
import { ExamSubject, ExamTrack } from './data/examsData';

export default function App() {
  // Modal States
  const [authModal, setAuthModal] = useState<'signin' | 'signup' | null>(null);
  const [plansModalOpen, setPlansModalOpen] = useState(false);
  const [infoModalType, setInfoModalType] = useState<'mcqs' | 'blogs' | 'about' | 'contact' | null>(null);

  // Advanced Tools Modals
  const [isNgnOpen, setIsNgnOpen] = useState(false);
  const [isReadinessOpen, setIsReadinessOpen] = useState(false);
  const [isPharmaDrillOpen, setIsPharmaDrillOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'terms' | 'privacy' | 'guarantee' | null>(null);

  // Active Subject for Quiz Simulator
  const [activeSubject, setActiveSubject] = useState<ExamSubject | null>(null);
  const [activeExam, setActiveExam] = useState<ExamTrack | null>(null);

  // User State
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  const handleSelectSubject = (subject: ExamSubject, exam: ExamTrack) => {
    setActiveSubject(subject);
    setActiveExam(exam);
  };

  const handleStartNow = () => {
    setAuthModal('signup');
  };

  const handleExploreExams = () => {
    document.getElementById('exams')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf7f2] text-[#1c1917] selection:bg-[#c4553a]/20 selection:text-[#8b3a2f]">
      {/* Top Banner if logged in */}
      {loggedInUser && (
        <div className="bg-[#2d5a4a] text-white text-xs py-1.5 px-4 text-center z-50">
          <span>
            Logged in as <strong>{loggedInUser}</strong>. Free trial active (5 practice questions per subject).
          </span>
        </div>
      )}

      {/* Header */}
      <Header
        onOpenSignIn={() => setAuthModal('signin')}
        onOpenSignUp={() => setAuthModal('signup')}
        onOpenPlans={() => setPlansModalOpen(true)}
        onOpenAbout={() => setInfoModalType('about')}
        onOpenContact={() => setInfoModalType('contact')}
        onOpenMcqs={() => setInfoModalType('mcqs')}
        onOpenBlog={() => setInfoModalType('blogs')}
        onOpenNgnSimulator={() => setIsNgnOpen(true)}
        onOpenReadinessCalculator={() => setIsReadinessOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* Section 0: Hero with Video & Readiness Card */}
        <Hero
          onStartNow={handleStartNow}
          onExploreExams={handleExploreExams}
        />

        {/* Section 1: Explore Exam Library */}
        <ExamLibrary onSelectSubject={handleSelectSubject} />

        {/* Section 1.5: High-Yield Interactive Clinical Tools Banner */}
        <InteractiveToolsBanner
          onOpenNgnSimulator={() => setIsNgnOpen(true)}
          onOpenReadinessCalculator={() => setIsReadinessOpen(true)}
          onOpenPharmaDrill={() => setIsPharmaDrillOpen(true)}
          onOpenGuarantee={() => setLegalModalType('guarantee')}
        />

        {/* Section 2: How It Works */}
        <HowItWorks />

        {/* Section 3: Built for Nursing Success Bento Grid */}
        <FeaturesBento />

        {/* Section 4: Testimonials Carousel */}
        <Testimonials />

        {/* Section 4.5: Frequently Asked Questions (FAQ) Section */}
        <FaqSection />

        {/* Section 5: CTA License Awaits */}
        <CtaSection onGetStarted={handleStartNow} />
      </main>

      {/* Upgraded 5-Column High-Trust Footer */}
      <Footer
        onOpenPlans={() => setPlansModalOpen(true)}
        onOpenAbout={() => setInfoModalType('about')}
        onOpenContact={() => setInfoModalType('contact')}
        onOpenSignIn={() => setAuthModal('signin')}
        onOpenSignUp={() => setAuthModal('signup')}
        onOpenMcqs={() => setInfoModalType('mcqs')}
        onOpenBlog={() => setInfoModalType('blogs')}
        onOpenNgnSimulator={() => setIsNgnOpen(true)}
        onOpenReadinessCalculator={() => setIsReadinessOpen(true)}
        onOpenPharmaDrill={() => setIsPharmaDrillOpen(true)}
        onOpenLegal={(type) => setLegalModalType(type)}
      />

      {/* Floating WhatsApp Widget */}
      <WhatsAppWidget />

      {/* Interactive Quiz / Practice Question Simulator Modal */}
      {activeSubject && activeExam && (
        <QuizModal
          subject={activeSubject}
          exam={activeExam}
          onClose={() => {
            setActiveSubject(null);
            setActiveExam(null);
          }}
          onOpenSignUp={() => setAuthModal('signup')}
        />
      )}

      {/* Next Gen NCLEX (NGN) Clinical Case Study Simulator Modal */}
      {isNgnOpen && (
        <NgnCaseSimulator
          onClose={() => setIsNgnOpen(false)}
          onOpenSignUp={() => setAuthModal('signup')}
        />
      )}

      {/* AI Pass Readiness & Daily Target Calculator Modal */}
      {isReadinessOpen && (
        <ReadinessCalculator
          onClose={() => setIsReadinessOpen(false)}
          onOpenSignUp={() => setAuthModal('signup')}
        />
      )}

      {/* Pharmacology & Antidotes Flashcard Drill Modal */}
      {isPharmaDrillOpen && (
        <PharmaDrillModal
          onClose={() => setIsPharmaDrillOpen(false)}
          onOpenSignUp={() => setAuthModal('signup')}
        />
      )}

      {/* Legal & Policy Modals (Terms, Privacy, Pass Guarantee) */}
      {legalModalType && (
        <LegalModals
          type={legalModalType}
          onClose={() => setLegalModalType(null)}
        />
      )}

      {/* Plans & Pricing Modal */}
      {plansModalOpen && (
        <PlansModal
          onClose={() => setPlansModalOpen(false)}
          onOpenSignUp={() => setAuthModal('signup')}
        />
      )}

      {/* Auth Modal (Sign In / Sign Up) */}
      {authModal && (
        <AuthModal
          mode={authModal}
          onClose={() => setAuthModal(null)}
          onSwitchMode={(mode) => setAuthModal(mode)}
          onSuccess={(email) => setLoggedInUser(email)}
        />
      )}

      {/* Info Modals (MCQs PDFs, Blogs, About Us, Contact) */}
      {infoModalType && (
        <InfoModals
          type={infoModalType}
          onClose={() => setInfoModalType(null)}
          onOpenPlans={() => setPlansModalOpen(true)}
        />
      )}
    </div>
  );
}
