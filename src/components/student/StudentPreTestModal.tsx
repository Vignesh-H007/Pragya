import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Award,
  Zap,
  Target,
  ChevronRight,
} from 'lucide-react';
import { PRETEST_QUESTIONS_BY_CLASS, PreTestQuestion } from '../../data/pretestQuestions';

interface StudentPreTestModalProps {
  initialClass?: string;
  onComplete: (results: {
    selectedClass: string;
    score: number;
    total: number;
    subjectBreakdown: Record<string, boolean>;
  }) => void;
  onSkip?: () => void;
}

export const StudentPreTestModal: React.FC<StudentPreTestModalProps> = ({
  initialClass = 'Class 7',
  onComplete,
  onSkip,
}) => {
  const [selectedClass, setSelectedClass] = useState<string>(initialClass);
  const [step, setStep] = useState<'class_select' | 'quiz' | 'result'>('class_select');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);

  const questions: PreTestQuestion[] = PRETEST_QUESTIONS_BY_CLASS[selectedClass] || PRETEST_QUESTIONS_BY_CLASS['Class 7'];
  const currentQuestion = questions[currentIndex];

  const handleSelectClass = (cls: string) => {
    setSelectedClass(cls);
  };

  const handleStartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setUserAnswers([]);
    setScore(0);
    setStep('quiz');
  };

  const handleChooseOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setUserAnswers((prev) => [...prev, index]);
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Finished all 5 questions
      setStep('result');
    }
  };

  const handleFinishAndEnter = () => {
    const breakdown: Record<string, boolean> = {};
    questions.forEach((q, idx) => {
      breakdown[q.subject] = userAnswers[idx] === q.correctAnswer;
    });

    onComplete({
      selectedClass,
      score,
      total: questions.length,
      subjectBreakdown: breakdown,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-2 border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Decorative Gradient Ribbon */}
        <div className="h-2 bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-500" />

        {/* ================= STEP 1: CLASS SELECTION ================= */}
        {step === 'class_select' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Diagnostic Pre-Test Assessment</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Welcome to Pragya! 🎒
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Before we open your learning quest, take a quick 5-question adaptive pre-test to calibrate your starting level!
              </p>
            </div>

            {/* Class picker grid */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-slate-700 block">
                Select your current class:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  'Class 1',
                  'Class 2',
                  'Class 3',
                  'Class 4',
                  'Class 5',
                  'Class 6',
                  'Class 7',
                  'Class 8',
                  'Class 9',
                  'Class 10',
                ].map((cls) => {
                  const isSelected = selectedClass === cls;
                  return (
                    <button
                      key={cls}
                      onClick={() => handleSelectClass(cls)}
                      className={`p-2.5 rounded-2xl border-2 text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500 border-amber-600 text-white shadow-md scale-105'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {cls}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Assessment Scope Notice */}
            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
              <Zap className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900 leading-relaxed">
                <span className="font-bold">5 Questions Across 5 Core Subjects:</span>
                <span className="block text-amber-800 text-[11px] mt-0.5">
                  Mathematics • Science / EVS • English • Social Science • Logic &amp; Reasoning. Tailored to {selectedClass} level.
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-between pt-2">
              {onSkip ? (
                <button
                  onClick={onSkip}
                  className="text-xs font-bold text-slate-400 hover:text-slate-600 px-3 py-2 cursor-pointer"
                >
                  Skip Pre-Test for now
                </button>
              ) : <div />}

              <button
                onClick={handleStartQuiz}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-black shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all cursor-pointer hover:scale-105"
              >
                <span>Start 5-Question Pre-Test</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 2: ACTIVE QUIZ QUESTIONS ================= */}
        {step === 'quiz' && currentQuestion && (
          <div className="p-6 sm:p-8 space-y-6">
            {/* Top Status Bar */}
            <div className="flex items-center justify-between gap-3 border-b pb-4">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${currentQuestion.subjectColor}`}>
                  {currentQuestion.subject}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  {selectedClass}
                </span>
              </div>

              <div className="text-xs font-bold text-slate-600">
                Question <span className="text-amber-600 font-black">{currentIndex + 1}</span> of 5
              </div>
            </div>

            {/* Animated Progress Bar */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / 5) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Skill Diagnostic
              </span>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                {currentQuestion.question}
              </h3>
            </div>

            {/* Option Choices */}
            <div className="space-y-2.5">
              {currentQuestion.options.map((opt, idx) => {
                const isChosen = selectedOption === idx;
                const isCorrect = idx === currentQuestion.correctAnswer;

                let cardStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';
                if (isAnswered) {
                  if (isCorrect) {
                    cardStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-xs';
                  } else if (isChosen && !isCorrect) {
                    cardStyle = 'bg-rose-50 border-rose-400 text-rose-950';
                  } else {
                    cardStyle = 'bg-slate-50 border-slate-200 opacity-60 text-slate-600';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleChooseOption(idx)}
                    className={`w-full text-left p-3.5 rounded-2xl border-2 text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-3 cursor-pointer ${cardStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-700 shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </div>

                    {isAnswered && (
                      <div className="shrink-0">
                        {isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 animate-in zoom-in" />
                        )}
                        {isChosen && !isCorrect && (
                          <XCircle className="w-5 h-5 text-rose-500 animate-in zoom-in" />
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Instant Feedback & Explanation */}
            {isAnswered && (
              <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-950 space-y-1 animate-in fade-in duration-200">
                <span className="font-bold block">
                  {selectedOption === currentQuestion.correctAnswer
                    ? '✨ Brilliant! That is correct.'
                    : '💡 Helpful Insight:'}
                </span>
                <p className="text-amber-900 leading-relaxed text-[11px]">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            {/* Next / Finish Button */}
            {isAnswered && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNextQuestion}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-black shadow-md hover:shadow-lg transition-all cursor-pointer hover:scale-105"
                >
                  <span>
                    {currentIndex < 4 ? 'Next Question' : 'View Diagnostic Results'}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ================= STEP 3: RESULTS SCREEN ================= */}
        {step === 'result' && (
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center text-3xl shadow-xl shadow-orange-500/20">
              {score >= 4 ? '🏆' : score >= 3 ? '⭐' : '🌱'}
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wide">
                Diagnostic Complete • {selectedClass}
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {score === 5
                  ? 'Outstanding Mastery!'
                  : score >= 4
                  ? 'Great Foundation!'
                  : score >= 3
                  ? 'Good Effort! Ready to Grow.'
                  : 'Welcome! Adventure Awaits.'}
              </h2>
              <p className="text-xs text-slate-600">
                You answered <span className="font-bold text-slate-900">{score} out of 5</span> questions correctly.
              </p>
            </div>

            {/* Score & Rewards Card */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200">
                <span className="text-[10px] font-bold text-amber-700 block">Pre-Test Score</span>
                <span className="text-lg font-black text-amber-900">{score * 20}%</span>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
                <span className="text-[10px] font-bold text-emerald-700 block">XP Bonus</span>
                <span className="text-lg font-black text-emerald-900">+{score * 50 + 100} XP</span>
              </div>
              <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-200">
                <span className="text-[10px] font-bold text-indigo-700 block">Starting Stage</span>
                <span className="text-lg font-black text-indigo-900">Level 4</span>
              </div>
            </div>

            {/* Subject Mastery Checklist */}
            <div className="text-left space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Subject Performance Breakdown:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {questions.map((q, idx) => {
                  const wasCorrect = userAnswers[idx] === q.correctAnswer;
                  return (
                    <div
                      key={q.id}
                      className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200/60 text-xs"
                    >
                      <span className="font-medium text-slate-700 truncate">{q.subject}</span>
                      {wasCorrect ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Passed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600">
                          <Target className="w-3.5 h-3.5" /> Focus Topic
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                onClick={handleStartQuiz}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Pre-Test</span>
              </button>

              <button
                onClick={handleFinishAndEnter}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-black shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all cursor-pointer hover:scale-105"
              >
                <span>Enter Student Dashboard &amp; Quest Map</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
