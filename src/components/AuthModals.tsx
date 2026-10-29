import React, { useState } from 'react';
import { X, Check, Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { EXAM_TRACKS } from '../data/examsData';

interface AuthModalProps {
  mode: 'signin' | 'signup';
  onClose: () => void;
  onSwitchMode: (mode: 'signin' | 'signup') => void;
  onSuccess: (userEmail: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  mode,
  onClose,
  onSwitchMode,
  onSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedExam, setSelectedExam] = useState('NCLEX-RN');
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setSubmitted(true);
    setTimeout(() => {
      onSuccess(email);
      onClose();
    }, 1200);
  };

  const handleDemoFill = () => {
    setEmail('student@eliteproctorprep.com');
    setPassword('NursePass2026!');
    if (mode === 'signup') {
      setName('Future RN Jordan');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-md w-full border border-stone-200 shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Check className="h-8 w-8" />
            </div>
            <h4 className="text-xl font-bold text-stone-900">
              {mode === 'signup' ? 'Welcome to EliteProctorPrep!' : 'Welcome Back!'}
            </h4>
            <p className="text-xs text-stone-600">
              {mode === 'signup'
                ? `Account created for ${selectedExam}. Starting your free session...`
                : 'Logging into your study dashboard...'}
            </p>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center p-2 rounded-xl bg-stone-50 border border-stone-200 shadow-sm mx-auto mb-3">
                <img
                  src="/assets/favicon.png"
                  alt=""
                  className="h-8 w-8 rounded-lg object-contain mr-2"
                />
                <img
                  src="/assets/logo.png"
                  alt="EliteProctorPrep"
                  className="h-7 w-auto object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-stone-900">
                {mode === 'signup' ? 'Create Your Free Account' : 'Sign In to EliteProctorPrep'}
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                {mode === 'signup'
                  ? 'Access free sample practice questions and rationales'
                  : 'Resume your questions, streaks, and exam predictions'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jordan Smith, RN"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c4553a]/30 focus:border-[#c4553a] text-stone-800"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                  <input
                    type="email"
                    required
                    placeholder="student@nursing.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c4553a]/30 focus:border-[#c4553a] text-stone-800"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-stone-700">
                    Password
                  </label>
                  {mode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => alert('Password reset link sent to demo account.')}
                      className="text-[11px] text-[#c4553a] hover:underline"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-9 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c4553a]/30 focus:border-[#c4553a] text-stone-800"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Select Your Exam Track
                  </label>
                  <select
                    value={selectedExam}
                    onChange={(e) => setSelectedExam(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c4553a]/30 text-stone-800"
                  >
                    {EXAM_TRACKS.map((exam) => (
                      <option key={exam.id} value={exam.name}>
                        {exam.name} ({exam.badge})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#c4553a] hover:bg-[#8b3a2f] text-white font-semibold text-xs rounded-xl shadow-md shadow-[#c4553a]/25 transition-all cursor-pointer mt-2"
              >
                {mode === 'signup' ? 'Create Account' : 'Sign In'}
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={handleDemoFill}
                className="text-[11px] text-stone-500 hover:text-stone-800 bg-stone-100 px-2 py-1 rounded"
              >
                Auto-fill Demo
              </button>

              <button
                type="button"
                onClick={() => onSwitchMode(mode === 'signin' ? 'signup' : 'signin')}
                className="text-xs font-semibold text-[#c4553a] hover:underline"
              >
                {mode === 'signin'
                  ? "Don't have an account? Sign up"
                  : 'Already registered? Sign in'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
