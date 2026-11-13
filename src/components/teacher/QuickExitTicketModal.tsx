import React, { useState } from 'react';
import { X, Sparkles, Clock, CheckCircle2, Play, Users, BookOpen } from 'lucide-react';
import { Subject } from '../../types';
import { useDashboardTheme } from '../../context/ThemeContext';

interface QuickExitTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedClass: string;
  selectedSubject: Subject;
  onLaunchTicket: (ticketTitle: string, questionsCount: number) => void;
}

export const QuickExitTicketModal: React.FC<QuickExitTicketModalProps> = ({
  isOpen,
  onClose,
  selectedClass,
  selectedSubject,
  onLaunchTicket,
}) => {
  const { style } = useDashboardTheme();
  const isDark = style === 'obsidian-dark' || style === 'command-dark';

  const [topicName, setTopicName] = useState(
    selectedSubject === 'Mathematics'
      ? 'Integers: Negative Operations & Absolute Values'
      : selectedSubject === 'Science'
      ? 'Acids, Bases & Neutralization Reaction'
      : 'Active vs Passive Transformations'
  );
  const [durationMinutes, setDurationMinutes] = useState(3);
  const [isLaunching, setIsLaunching] = useState(false);

  if (!isOpen) return null;

  const sampleQuestions = [
    {
      q: '1. What is (-8) - (-14)?',
      ans: '+6 (Double minus becomes positive)',
    },
    {
      q: '2. Which integer is 5 units to the left of -3 on the number line?',
      ans: '-8',
    },
    {
      q: '3. A submarine is at -45m and dives 15m deeper. Its new position is:',
      ans: '-60m',
    },
  ];

  const handleLaunch = () => {
    setIsLaunching(true);
    setTimeout(() => {
      onLaunchTicket(topicName, 3);
      setIsLaunching(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div
        className={`relative rounded-3xl max-w-lg w-full border shadow-2xl overflow-hidden flex flex-col transition-colors ${
          isDark
            ? 'bg-[#0D0F17] border-white/[0.12] text-white shadow-black/90'
            : style === 'academic-warm'
            ? 'bg-[#FFFDFB] border-[#DDD3C5] text-[#28231D]'
            : style === 'editorial-command'
            ? 'bg-[#FAF7F0] border-[#DDD4C7] text-[#1C232B]'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div
          className={`px-5 py-4 border-b flex items-center justify-between gap-3 ${
            isDark ? 'bg-gradient-to-r from-sky-500/10 via-transparent to-white/[0.02] border-white/10' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                isDark ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' : 'bg-sky-100 text-sky-800'
              }`}
            >
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black tracking-tight">Launch 3-Min Exit Ticket</h3>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-[#8E95A5]' : 'text-slate-500'}`}>
                Instant 3-question diagnostic pulse check for {selectedClass}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/10 text-slate-400">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider block mb-1.5 opacity-80">
              Exit Ticket Focus Topic
            </label>
            <input
              type="text"
              value={topicName}
              onChange={(e) => setTopicName(e.target.value)}
              className={`w-full px-3.5 py-2 rounded-xl text-xs border focus:outline-hidden ${
                isDark ? 'bg-white/[0.04] border-white/15 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="text-xs font-bold uppercase tracking-wider block mb-1.5 opacity-80">
                Duration
              </label>
              <div className="flex items-center gap-2">
                {[3, 5, 8].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setDurationMinutes(mins)}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      durationMinutes === mins
                        ? isDark
                          ? 'bg-sky-400 text-slate-950 border-sky-400'
                          : 'bg-sky-600 text-white border-sky-600'
                        : isDark
                        ? 'bg-white/[0.04] border-white/10 text-slate-300'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    {mins} mins
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1">
              <label className="text-xs font-bold uppercase tracking-wider block mb-1.5 opacity-80">
                Audience
              </label>
              <div className={`py-1.5 px-3 rounded-xl border text-xs font-bold flex items-center gap-1.5 ${
                isDark ? 'bg-white/[0.04] border-white/10 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                <Users className="w-3.5 h-3.5 text-sky-400" />
                <span>All {selectedClass} Devices (42 students)</span>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider block mb-2 opacity-80">
              Rapid Questions Preview
            </label>
            <div className={`p-3 rounded-2xl border space-y-2 text-xs ${
              isDark ? 'bg-white/[0.02] border-white/10' : 'bg-slate-50 border-slate-200'
            }`}>
              {sampleQuestions.map((q, idx) => (
                <div key={idx} className="flex flex-col gap-0.5 pb-1.5 border-b border-inherit last:border-0 last:pb-0">
                  <span className="font-semibold">{q.q}</span>
                  <span className={`text-[11px] ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                    Key: {q.ans}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`p-4 border-t flex items-center justify-between gap-3 ${
          isDark ? 'bg-[#090A10] border-white/10' : 'bg-slate-50 border-slate-200'
        }`}>
          <button onClick={onClose} className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white">
            Cancel
          </button>
          <button
            onClick={handleLaunch}
            disabled={isLaunching}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-md cursor-pointer ${
              isDark ? 'bg-sky-400 text-slate-950 hover:bg-sky-300' : 'bg-sky-600 text-white hover:bg-sky-700'
            }`}
          >
            {isLaunching ? (
              <span>Publishing to Devices...</span>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Publish Live Exit Ticket</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
