import React, { useState, useMemo } from 'react';
import { StudentAgeTier } from '../../types';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Trophy,
  Sparkles,
  Flame,
  Clock,
  RotateCcw,
  ArrowRight,
  ShieldAlert,
  Swords,
  Target,
  Zap,
  BookOpen,
  Award,
  Bot,
} from 'lucide-react';
import { PRETEST_QUESTIONS_BY_CLASS, PreTestQuestion } from '../../data/pretestQuestions';
import { useDashboardTheme } from '../../context/ThemeContext';

interface StudentQuizzesViewProps {
  tier: StudentAgeTier;
  activeClass: string;
  activeSubject: string;
  onRetakePreTest?: () => void;
  onOpenMobBattle?: () => void;
}

export const StudentQuizzesView: React.FC<StudentQuizzesViewProps> = ({
  tier,
  activeClass,
  activeSubject,
  onRetakePreTest,
  onOpenMobBattle,
}) => {
  const { style } = useDashboardTheme();
  const classQuestions: PreTestQuestion[] =
    PRETEST_QUESTIONS_BY_CLASS[activeClass] || PRETEST_QUESTIONS_BY_CLASS['Class 7'] || [];

  const [activeQuizIndex, setActiveQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [streakCount, setStreakCount] = useState(4);
  const [activeQuizMode, setActiveQuizMode] = useState<'rapid' | 'mob' | 'benchmark'>('rapid');

  const currentQuestion = classQuestions[activeQuizIndex] || classQuestions[0];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
      setStreakCount((prev) => prev + 1);
    } else {
      setStreakCount(0);
    }
  };

  const handleNextQuestion = () => {
    if (activeQuizIndex + 1 < classQuestions.length) {
      setActiveQuizIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setActiveQuizIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  // Exact Theme Grading definitions
  const themeGrading = useMemo(() => {
    switch (style) {
      case 'editorial-command':
        return {
          bannerBg: 'bg-[#FAF7F0] border-[#DDD4C7] text-[#1C232B] shadow-xs',
          badge: 'bg-[#246257] text-white',
          streakBadge: 'bg-[#C85340] text-white shadow-xs',
          subtitleText: 'text-[#5C6670]',
          accentBtn: 'bg-[#246257] hover:bg-[#1C4E45] text-white shadow-xs',
          secondaryBtn: 'bg-white border-[#DDD4C7] text-[#1C232B] hover:bg-[#F4EFEA]',
          cardBase: 'bg-white border-[#DDD4C7] text-[#1C232B] shadow-xs',
          optionDefault: 'bg-[#FAF7F0]/60 border-[#DDD4C7] hover:border-[#246257] text-[#1C232B]',
          optionSelected: 'bg-[#246257]/10 border-[#246257] text-[#1C232B] ring-2 ring-[#246257]/20',
          optionCorrect: 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/20',
          optionIncorrect: 'bg-[#C85340]/10 border-[#C85340] text-[#C85340]',
          explainCorrect: 'bg-emerald-50 border-emerald-300 text-emerald-900',
          explainIncorrect: 'bg-[#C85340]/10 border-[#C85340]/30 text-[#1C232B]',
          progressTrack: 'bg-[#DDD4C7]/60',
          progressFill: 'bg-[#246257]',
          highlightColor: 'text-[#246257]',
          iconAccent: 'text-[#C85340]',
        };
      case 'obsidian-dark':
      case 'command-dark':
        return {
          bannerBg: 'bg-[#0D0F17]/90 border-white/[0.08] text-white shadow-2xl shadow-black/80 backdrop-blur-xl',
          badge: 'bg-white/[0.08] text-white border border-white/15',
          streakBadge: 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-lg shadow-amber-500/20',
          subtitleText: 'text-[#8E95A5]',
          accentBtn: 'bg-white text-slate-950 font-black hover:bg-slate-200 shadow-md shadow-white/10',
          secondaryBtn: 'bg-white/[0.04] border-white/10 text-white hover:bg-white/[0.08]',
          cardBase: 'bg-[#0D0F17]/90 border-white/[0.08] text-white shadow-2xl shadow-black/80 backdrop-blur-xl',
          optionDefault: 'bg-white/[0.04] border-white/10 hover:border-white/25 hover:bg-white/[0.07] text-white',
          optionSelected: 'bg-white/[0.12] border-white/40 text-white ring-2 ring-white/20 shadow-[0_0_15px_rgba(255,255,255,0.06)]',
          optionCorrect: 'bg-emerald-500/15 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500/30',
          optionIncorrect: 'bg-rose-500/15 border-rose-500 text-rose-300 ring-2 ring-rose-500/30',
          explainCorrect: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200',
          explainIncorrect: 'bg-amber-500/10 border-amber-500/30 text-amber-200',
          progressTrack: 'bg-white/[0.08]',
          progressFill: 'bg-gradient-to-r from-amber-500 via-emerald-400 to-cyan-400',
          highlightColor: 'text-amber-400',
          iconAccent: 'text-amber-400',
        };
      case 'academic-warm':
        return {
          bannerBg: 'bg-[#FFFDFB] border-[#E6DFD3] text-[#28231D] shadow-xs',
          badge: 'bg-[#8C4A2F] text-white',
          streakBadge: 'bg-[#B45309] text-white shadow-xs',
          subtitleText: 'text-[#5C5346]',
          accentBtn: 'bg-[#8C4A2F] hover:bg-[#783E26] text-white shadow-xs',
          secondaryBtn: 'bg-[#F5F1E9] border-[#E2DBD0] text-[#28231D] hover:bg-[#EAE4D8]',
          cardBase: 'bg-[#FFFDFB] border-[#E6DFD3] text-[#28231D] shadow-xs',
          optionDefault: 'bg-[#FAF7F2] border-[#E6DFD3] hover:border-[#8C4A2F] text-[#28231D]',
          optionSelected: 'bg-[#8C4A2F]/10 border-[#8C4A2F] text-[#28231D] ring-2 ring-[#8C4A2F]/20',
          optionCorrect: 'bg-emerald-50 border-emerald-600 text-emerald-900 ring-2 ring-emerald-600/20',
          optionIncorrect: 'bg-rose-50 border-rose-500 text-rose-900',
          explainCorrect: 'bg-emerald-50 border-emerald-300 text-emerald-900',
          explainIncorrect: 'bg-amber-50 border-amber-300 text-amber-900',
          progressTrack: 'bg-[#E2DBD0]',
          progressFill: 'bg-[#8C4A2F]',
          highlightColor: 'text-[#8C4A2F]',
          iconAccent: 'text-[#B45309]',
        };
      case 'clean':
      default:
        return {
          bannerBg: 'bg-white border-slate-200 text-slate-900 shadow-xs',
          badge: 'bg-blue-600 text-white',
          streakBadge: 'bg-amber-500 text-white shadow-xs',
          subtitleText: 'text-slate-500',
          accentBtn: 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs',
          secondaryBtn: 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100',
          cardBase: 'bg-white border-slate-200 text-slate-900 shadow-xs',
          optionDefault: 'bg-slate-50/70 border-slate-200 hover:border-blue-500 text-slate-900',
          optionSelected: 'bg-blue-50 border-blue-600 text-slate-900 ring-2 ring-blue-600/20',
          optionCorrect: 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/20',
          optionIncorrect: 'bg-rose-50 border-rose-500 text-rose-900',
          explainCorrect: 'bg-emerald-50 border-emerald-300 text-emerald-900',
          explainIncorrect: 'bg-amber-50 border-amber-300 text-amber-900',
          progressTrack: 'bg-slate-200',
          progressFill: 'bg-blue-600',
          highlightColor: 'text-blue-600',
          iconAccent: 'text-amber-500',
        };
    }
  }, [style]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* 1. Header Banner - Theme Graded */}
      <div className={`p-6 rounded-3xl border transition-all duration-200 ${themeGrading.bannerBg}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black tracking-wide shadow-2xs w-fit">
              <span className={`px-2 py-0.5 rounded-md ${themeGrading.badge}`}>
                {activeClass}
              </span>
              <span className="font-bold opacity-80">Formative Assessment Suite</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">
              Quizzes & Adaptive Challenges
            </h1>
            <p className={`text-xs md:text-sm max-w-2xl ${themeGrading.subtitleText}`}>
              Validate your conceptual understanding, build your answer streaks, and defeat curriculum misconceptions with real-time feedback.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className={`px-4 py-2.5 rounded-2xl flex items-center gap-2.5 ${themeGrading.streakBadge}`}>
              <Flame className="w-5 h-5 fill-current animate-pulse" />
              <div>
                <div className="text-[10px] font-bold uppercase opacity-85 leading-none">Answer Streak</div>
                <div className="text-sm font-black">{streakCount} in a Row!</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Quick Assessment Modes Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div
          onClick={() => {
            setActiveQuizMode('rapid');
            handleRestartQuiz();
          }}
          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
            activeQuizMode === 'rapid'
              ? `${themeGrading.cardBase} ring-2 ring-emerald-500/20 border-emerald-500`
              : themeGrading.cardBase
          }`}
        >
          <div className="space-y-1">
            <div className="text-xs font-black flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <Sparkles className="w-4 h-4" />
              <span>Chapter Rapid Quiz</span>
            </div>
            <p className={`text-xs ${themeGrading.subtitleText}`}>
              {classQuestions.length} Questions for {activeClass}
            </p>
          </div>
          <ArrowRight className="w-4 h-4 opacity-60" />
        </div>

        {onRetakePreTest && (
          <div
            onClick={onRetakePreTest}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${themeGrading.cardBase}`}
          >
            <div className="space-y-1">
              <div className="text-xs font-black flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
                <Target className="w-4 h-4" />
                <span>Diagnostic Pre-Test</span>
              </div>
              <p className={`text-xs ${themeGrading.subtitleText}`}>Retake 5-question baseline benchmark</p>
            </div>
            <ArrowRight className="w-4 h-4 opacity-60" />
          </div>
        )}

        {onOpenMobBattle && (
          <div
            onClick={onOpenMobBattle}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${themeGrading.cardBase}`}
          >
            <div className="space-y-1">
              <div className="text-xs font-black flex items-center gap-1.5 text-rose-600 dark:text-rose-400">
                <Swords className="w-4 h-4" />
                <span>Boss Mob Battle</span>
              </div>
              <p className={`text-xs ${themeGrading.subtitleText}`}>Challenge Enderman & Warden</p>
            </div>
            <ArrowRight className="w-4 h-4 opacity-60" />
          </div>
        )}
      </div>

      {/* 3. Main Interactive Quiz Card */}
      <div className={`p-6 md:p-8 rounded-3xl border transition-all ${themeGrading.cardBase}`}>
        {!quizFinished ? (
          <div className="space-y-6">
            {/* Header / Tracker */}
            <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10">
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-black uppercase px-2.5 py-1 rounded-lg ${themeGrading.badge}`}>
                  {currentQuestion.subject}
                </span>
                <span className={`text-xs font-bold ${themeGrading.subtitleText}`}>
                  Question {activeQuizIndex + 1} of {classQuestions.length}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold">
                <Trophy className={`w-4 h-4 ${themeGrading.iconAccent}`} />
                <span>Score: {score}/{activeQuizIndex + (isAnswerSubmitted ? 1 : 0)}</span>
              </div>
            </div>

            {/* Question Heading */}
            <div className="space-y-2">
              <h2 className="text-lg md:text-xl font-black leading-snug">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Options List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = currentQuestion.correctAnswer === idx;

                let btnStyles = themeGrading.optionDefault;
                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    btnStyles = themeGrading.optionCorrect;
                  } else if (isSelected) {
                    btnStyles = themeGrading.optionIncorrect;
                  }
                } else if (isSelected) {
                  btnStyles = themeGrading.optionSelected;
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswerSubmitted}
                    className={`p-4 rounded-2xl border text-left text-xs md:text-sm font-bold transition flex items-center justify-between gap-3 cursor-pointer ${btnStyles}`}
                  >
                    <span>{option}</span>
                    {isAnswerSubmitted && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box after answer submission */}
            {isAnswerSubmitted && (
              <div
                className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-2 ${
                  selectedOption === currentQuestion.correctAnswer
                    ? themeGrading.explainCorrect
                    : themeGrading.explainIncorrect
                }`}
              >
                <div className="font-black flex items-center justify-between gap-1.5">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>
                      {selectedOption === currentQuestion.correctAnswer
                        ? 'Correct! Outstanding conceptual mastery!'
                        : 'Not quite! Review the pedagogical breakdown:'}
                    </span>
                  </div>
                </div>
                <p>{currentQuestion.explanation}</p>
                <div className="pt-2 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                  <span className="text-[11px] opacity-80">Need deeper clarification on this question?</span>
                  <button
                    onClick={() => {
                      const event = new CustomEvent('pragya_ask_ai_tutor', {
                        detail: {
                          question: `Can you explain why "${currentQuestion.options[currentQuestion.correctAnswer]}" is the correct answer for: "${currentQuestion.question}"?`,
                        },
                      });
                      window.dispatchEvent(event);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>Ask AI Tutor</span>
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex justify-end">
              {!isAnswerSubmitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedOption === null}
                  className={`px-6 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${themeGrading.accentBtn}`}
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className={`px-6 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 cursor-pointer ${themeGrading.accentBtn}`}
                >
                  <span>{activeQuizIndex + 1 < classQuestions.length ? 'Next Question' : 'View Results'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Quiz Results Completion Card */
          <div className="py-8 text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-950 flex items-center justify-center mx-auto text-amber-600 shadow-md">
              <Trophy className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black">Assessment Completed!</h2>
            <p className={`text-xs md:text-sm ${themeGrading.subtitleText}`}>
              You achieved a score of{' '}
              <span className={`font-black text-base ${themeGrading.highlightColor}`}>
                {score} out of {classQuestions.length}
              </span>{' '}
              correct.
            </p>
            <div className={`p-4 rounded-2xl border text-xs font-medium ${themeGrading.bannerBg}`}>
              Consistent daily quiz practice builds high retention and boosts diagnostic confidence!
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={handleRestartQuiz}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer ${themeGrading.accentBtn}`}
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Assessment</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
