import React, { useState, useMemo } from 'react';
import {
  X,
  BookOpenCheck,
  Sparkles,
  Gamepad2,
  ListOrdered,
  Layers,
  Video,
  Clock,
  Award,
  Users,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { StudentGapRecord, TopicFailureStat, Subject } from '../../types';
import { useDashboardTheme } from '../../context/ThemeContext';

interface AssignRemedialModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: StudentGapRecord[];
  topics: TopicFailureStat[];
  selectedClass: string;
  selectedSubject: Subject;
  onAssignHomework: (assignmentData: {
    topic: string;
    format: string;
    targetType: string;
    studentCount: number;
    dueDate: string;
    xpBounty: number;
    instructions: string;
  }) => void;
}

const HOMEWORK_FORMATS = [
  {
    id: 'simulator',
    title: 'Visual Manipulative Simulator',
    desc: 'Interactive step-by-step visual sandbox (Number line / Visual Fractions / Balance scale)',
    icon: Gamepad2,
    duration: '10 mins',
    difficulty: 'Scaffolded',
    color: 'from-amber-500 to-amber-600',
  },
  {
    id: 'diagnostic-drill',
    title: 'Adaptive Diagnostic Drill',
    desc: '5 progressive question problems with on-demand AI hint explanations and scratchpad',
    icon: ListOrdered,
    duration: '12 mins',
    difficulty: 'Adaptive',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'flashcard-deck',
    title: 'Flashcard Mastery Deck',
    desc: 'Interactive 3D flipcards covering core definitions, formula derivation, and pitfalls',
    icon: Layers,
    duration: '8 mins',
    difficulty: 'Foundational',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'video-exit',
    title: 'Video Lesson + 3 Exit Questions',
    desc: 'Curated 5-minute concept review video followed by 3 instant check questions',
    icon: Video,
    duration: '15 mins',
    difficulty: 'Core',
    color: 'from-purple-500 to-pink-600',
  },
];

export const AssignRemedialModal: React.FC<AssignRemedialModalProps> = ({
  isOpen,
  onClose,
  students,
  topics,
  selectedClass,
  selectedSubject,
  onAssignHomework,
}) => {
  const { style } = useDashboardTheme();
  const isDark = style === 'obsidian-dark' || style === 'command-dark';

  // Filter topics for the current class/subject
  const relevantTopics = useMemo(() => {
    const classTopics = topics.filter(
      (t) => t.classGrade === selectedClass && (selectedSubject === 'All' || t.subject === selectedSubject)
    );
    return classTopics.length > 0 ? classTopics : topics;
  }, [topics, selectedClass, selectedSubject]);

  const [selectedTopic, setSelectedTopic] = useState<string>(
    relevantTopics[0]?.topicName || 'Integers: Negative Numbers Operations'
  );
  const [selectedFormat, setSelectedFormat] = useState<string>(HOMEWORK_FORMATS[0].id);
  const [targetAudience, setTargetAudience] = useState<'at-risk' | 'entire-class' | 'stuck-topic'>('at-risk');
  const [dueDate, setDueDate] = useState<string>('Tomorrow, 5:00 PM');
  const [xpBounty, setXpBounty] = useState<number>(150);
  const [customInstructions, setCustomInstructions] = useState<string>(
    'Please complete this remedial drill before tomorrow session. Focus especially on double-negative subtraction rules!'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Compute recipient counts dynamically
  const atRiskCount = useMemo(() => {
    return students.filter(
      (s) =>
        s.classGrade === selectedClass &&
        (selectedSubject === 'All' || s.subject === selectedSubject) &&
        s.fixedStatus !== 'Fixed'
    ).length;
  }, [students, selectedClass, selectedSubject]);

  const stuckInTopicCount = useMemo(() => {
    return students.filter(
      (s) => s.classGrade === selectedClass && s.failedBasicTopic === selectedTopic
    ).length;
  }, [students, selectedClass, selectedTopic]);

  const targetCount =
    targetAudience === 'at-risk'
      ? atRiskCount || 6
      : targetAudience === 'stuck-topic'
      ? stuckInTopicCount || 4
      : 42; // entire class

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formatObj = HOMEWORK_FORMATS.find((f) => f.id === selectedFormat);

    setTimeout(() => {
      onAssignHomework({
        topic: selectedTopic,
        format: formatObj?.title || selectedFormat,
        targetType: targetAudience,
        studentCount: targetCount,
        dueDate,
        xpBounty,
        instructions: customInstructions,
      });
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div
        className={`relative rounded-3xl max-w-2xl w-full border shadow-2xl overflow-hidden flex flex-col max-h-[92vh] transition-colors ${
          isDark
            ? 'bg-[#0D0F17] border-white/[0.12] text-white shadow-black/90'
            : style === 'academic-warm'
            ? 'bg-[#FFFDFB] border-[#DDD3C5] text-[#28231D]'
            : style === 'editorial-command'
            ? 'bg-[#FAF7F0] border-[#DDD4C7] text-[#1C232B]'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div
          className={`px-5 py-4 border-b flex items-center justify-between gap-3 ${
            isDark
              ? 'bg-gradient-to-r from-emerald-500/10 via-transparent to-white/[0.02] border-white/10'
              : 'bg-slate-50/80 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                isDark
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              <BookOpenCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black tracking-tight">Assign Remedial Homework</h3>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                    isDark
                      ? 'bg-white/[0.08] text-emerald-300 border border-white/10'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {selectedClass} • {selectedSubject}
                </span>
              </div>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-[#8E95A5]' : 'text-slate-500'}`}>
                Deploy scaffolded micro-drills, visual manipulatives, or flashcard modules directly to student dashboards
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition cursor-pointer ${
              isDark ? 'hover:bg-white/10 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body: Scrollable */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Step 1: Select Topic */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider block mb-2 opacity-80">
              Target Roadblock Topic
            </label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs border font-medium focus:outline-hidden transition cursor-pointer ${
                isDark
                  ? 'bg-[#121520] border-white/15 text-white focus:border-emerald-400'
                  : 'bg-white border-slate-200 text-slate-900 focus:border-emerald-600'
              }`}
            >
              {relevantTopics.map((topic) => (
                <option key={topic.id} value={topic.topicName}>
                  {topic.topicName} ({topic.failureRate}% failure rate • {topic.difficultyLevel} priority)
                </option>
              ))}
            </select>
          </div>

          {/* Step 2: Homework Format Cards */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider block mb-2 opacity-80">
              Select Remedial Format
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {HOMEWORK_FORMATS.map((fmt) => {
                const isSelected = selectedFormat === fmt.id;
                const Icon = fmt.icon;
                return (
                  <div
                    key={fmt.id}
                    onClick={() => setSelectedFormat(fmt.id)}
                    className={`p-3 rounded-2xl border transition cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? isDark
                          ? 'bg-emerald-500/15 border-emerald-500/50 shadow-sm shadow-emerald-500/10'
                          : 'bg-emerald-50 border-emerald-500 shadow-sm'
                        : isDark
                        ? 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center text-white bg-gradient-to-tr ${fmt.color}`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-bold leading-tight">{fmt.title}</span>
                        </div>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                      </div>
                      <p className={`text-[11px] leading-snug ${isDark ? 'text-[#8E95A5]' : 'text-slate-500'}`}>
                        {fmt.desc}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-inherit text-[10px] font-mono opacity-70">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {fmt.duration}
                      </span>
                      <span>•</span>
                      <span>{fmt.difficulty}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Target Assignees */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider block mb-2 opacity-80">
              Target Recipients
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setTargetAudience('at-risk')}
                className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                  targetAudience === 'at-risk'
                    ? isDark
                      ? 'bg-white text-slate-950 font-bold border-white'
                      : 'bg-slate-900 text-white font-bold'
                    : isDark
                    ? 'bg-white/[0.03] border-white/10 text-slate-300'
                    : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                <div className="text-xs font-bold">At-Risk Students</div>
                <div className="text-[10px] opacity-75 mt-0.5">
                  Recommended: {atRiskCount} students with active roadblocks
                </div>
              </button>

              <button
                type="button"
                onClick={() => setTargetAudience('stuck-topic')}
                className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                  targetAudience === 'stuck-topic'
                    ? isDark
                      ? 'bg-white text-slate-950 font-bold border-white'
                      : 'bg-slate-900 text-white font-bold'
                    : isDark
                    ? 'bg-white/[0.03] border-white/10 text-slate-300'
                    : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                <div className="text-xs font-bold">Topic-Specific</div>
                <div className="text-[10px] opacity-75 mt-0.5">
                  {stuckInTopicCount || 4} students specifically stuck here
                </div>
              </button>

              <button
                type="button"
                onClick={() => setTargetAudience('entire-class')}
                className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                  targetAudience === 'entire-class'
                    ? isDark
                      ? 'bg-white text-slate-950 font-bold border-white'
                      : 'bg-slate-900 text-white font-bold'
                    : isDark
                    ? 'bg-white/[0.03] border-white/10 text-slate-300'
                    : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                <div className="text-xs font-bold">Entire Class</div>
                <div className="text-[10px] opacity-75 mt-0.5">42 students as reinforcement</div>
              </button>
            </div>
          </div>

          {/* Step 4: Due Date & XP Reward */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider block mb-1.5 opacity-80 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Due Date / Timeline</span>
              </label>
              <select
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl text-xs border focus:outline-hidden transition cursor-pointer ${
                  isDark
                    ? 'bg-[#121520] border-white/15 text-white focus:border-emerald-400'
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                <option value="Tomorrow, 5:00 PM">Tomorrow, 5:00 PM</option>
                <option value="In 48 Hours">In 48 Hours</option>
                <option value="Before Next Class Session">Before Next Class Session</option>
                <option value="Weekend Review (Sunday 8 PM)">Weekend Review (Sunday 8 PM)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider block mb-1.5 opacity-80 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Student XP Bounty</span>
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[100, 150, 250].map((xp) => (
                  <button
                    key={xp}
                    type="button"
                    onClick={() => setXpBounty(xp)}
                    className={`py-2 rounded-xl text-xs font-bold border transition cursor-pointer flex items-center justify-center gap-1 ${
                      xpBounty === xp
                        ? isDark
                          ? 'bg-amber-400 border-amber-400 text-slate-950'
                          : 'bg-amber-500 border-amber-500 text-white'
                        : isDark
                        ? 'bg-white/[0.04] border-white/10 text-slate-300'
                        : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>+{xp} XP</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 5: Custom Teacher Note */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider block mb-1.5 opacity-80">
              Instructions for Student Portal
            </label>
            <textarea
              rows={2}
              value={customInstructions}
              onChange={(e) => setCustomInstructions(e.target.value)}
              className={`w-full p-3 rounded-2xl text-xs border focus:outline-hidden transition leading-relaxed ${
                isDark
                  ? 'bg-white/[0.04] border-white/10 text-white placeholder-slate-500 focus:border-emerald-400'
                  : 'bg-white border-slate-200 text-slate-900 focus:border-emerald-600'
              }`}
            />
          </div>

          {/* Footer Actions */}
          <div
            className={`pt-4 border-t flex items-center justify-between gap-3 ${
              isDark ? 'border-white/10' : 'border-slate-200'
            }`}
          >
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                isDark ? 'hover:bg-white/10 text-slate-300' : 'hover:bg-slate-200 text-slate-600'
              }`}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-md cursor-pointer disabled:opacity-50 ${
                isDark
                  ? 'bg-emerald-400 text-slate-950 hover:bg-emerald-300 shadow-emerald-400/20'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/20'
              }`}
            >
              {isSubmitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Deploying Homework...</span>
                </>
              ) : (
                <>
                  <BookOpenCheck className="w-3.5 h-3.5" />
                  <span>Assign Homework to {targetCount} Students</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
