import React, { useState, useRef, useEffect } from 'react';
import {
  Zap,
  Send,
  BookOpenCheck,
  Clock,
  PlusCircle,
  Megaphone,
  FileSpreadsheet,
  ChevronDown,
  Sparkles,
  ArrowRight,
  X,
  Users,
} from 'lucide-react';
import { Subject } from '../../types';
import { useDashboardTheme } from '../../context/ThemeContext';

interface QuickActionsDropdownProps {
  selectedClass: string;
  selectedSubject: Subject;
  atRiskCount: number;
  onOpenMessageAtRisk: () => void;
  onOpenAssignRemedial: () => void;
  onOpenAddGap: () => void;
  onScheduleExitTicket: () => void;
  onBroadcastParent: () => void;
  onExportReport: () => void;
}

export const QuickActionsDropdown: React.FC<QuickActionsDropdownProps> = ({
  selectedClass,
  selectedSubject,
  atRiskCount,
  onOpenMessageAtRisk,
  onOpenAssignRemedial,
  onOpenAddGap,
  onScheduleExitTicket,
  onBroadcastParent,
  onExportReport,
}) => {
  const { style } = useDashboardTheme();
  const isDark = style === 'obsidian-dark' || style === 'command-dark';
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleActionClick = (action: () => void) => {
    setIsOpen(false);
    action();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Quick Actions Header Trigger Button */}
      <button
        id="header-quick-actions-trigger"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`group relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer shadow-xs active:scale-95 ${
          isOpen
            ? isDark
              ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-400/50 shadow-md shadow-amber-400/20'
              : 'bg-amber-500 text-white ring-2 ring-amber-500/50 shadow-md'
            : isDark
            ? 'bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/15 hover:border-amber-400/50 shadow-[0_0_15px_rgba(245,158,11,0.12)]'
            : style === 'academic-warm'
            ? 'bg-[#8C4A2F] hover:bg-[#783E26] text-white shadow-sm'
            : style === 'editorial-command'
            ? 'bg-[#246257] hover:bg-[#1C4E45] text-white shadow-2xs'
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-sm'
        }`}
        title="Quick Actions (Ctrl+K or ⌘K)"
        aria-expanded={isOpen}
      >
        <div className="relative flex items-center">
          <Zap
            className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110 ${
              isOpen
                ? isDark
                  ? 'fill-slate-950 text-slate-950'
                  : 'fill-white text-white'
                : 'fill-amber-400 text-amber-400 animate-pulse'
            }`}
          />
        </div>

        <span className="leading-none whitespace-nowrap">Quick Actions</span>

        {/* At-Risk counter pill */}
        {atRiskCount > 0 && (
          <span
            className={`text-[10px] font-black px-1.5 py-0.2 rounded-full leading-none transition-colors ${
              isOpen
                ? isDark
                  ? 'bg-slate-950 text-amber-300'
                  : 'bg-white text-amber-600'
                : isDark
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'bg-white/20 text-white'
            }`}
          >
            {atRiskCount}
          </span>
        )}

        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 opacity-70 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Floating Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-[320px] sm:w-[360px] rounded-3xl border shadow-2xl z-50 overflow-hidden animate-fadeIn backdrop-blur-2xl transition-all ${
            isDark
              ? 'bg-[#0D0F17]/95 border-white/[0.12] text-white shadow-[0_20px_50px_rgba(0,0,0,0.9)]'
              : style === 'academic-warm'
              ? 'bg-[#FFFDFB] border-[#DDD3C5] text-[#28231D] shadow-2xl'
              : style === 'editorial-command'
              ? 'bg-[#FAF7F0] border-[#DDD4C7] text-[#1C232B] shadow-2xl'
              : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
          }`}
        >
          {/* Dropdown Header */}
          <div
            className={`px-4 py-3 border-b flex items-center justify-between gap-2 ${
              isDark
                ? 'bg-gradient-to-r from-amber-500/15 via-white/[0.02] to-transparent border-white/10'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                  isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700'
                }`}
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
              </div>
              <div>
                <span className="text-xs font-black tracking-tight block leading-none">
                  Teacher Quick Actions
                </span>
                <span
                  className={`text-[10px] font-mono mt-0.5 block leading-none ${
                    isDark ? 'text-[#8E95A5]' : 'text-slate-500'
                  }`}
                >
                  {selectedClass} • {selectedSubject}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span
                className={`text-[9px] font-mono px-1.5 py-0.5 rounded border hidden sm:inline-block ${
                  isDark
                    ? 'bg-white/[0.05] border-white/10 text-slate-400'
                    : 'bg-slate-200 border-slate-300 text-slate-600'
                }`}
              >
                ⌘K
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Action Items List */}
          <div className="p-2 space-y-1 max-h-[70vh] overflow-y-auto">
            {/* Primary Action 1: Message At-Risk Students */}
            <button
              onClick={() => handleActionClick(onOpenMessageAtRisk)}
              className={`w-full text-left p-2.5 rounded-2xl border transition-all duration-150 cursor-pointer flex items-center justify-between gap-3 group ${
                isDark
                  ? 'bg-white/[0.03] hover:bg-white/[0.08] border-white/[0.06] hover:border-amber-400/40 text-white'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200/80 text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                    isDark
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold truncate">Message At-Risk Students</span>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full font-bold shrink-0 ${
                        isDark
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {atRiskCount} at risk
                    </span>
                  </div>
                  <p
                    className={`text-[11px] truncate mt-0.5 ${
                      isDark ? 'text-[#8E95A5]' : 'text-slate-500'
                    }`}
                  >
                    Targeted study invites, booster quizzes & notes
                  </p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
            </button>

            {/* Primary Action 2: Assign Remedial Homework */}
            <button
              onClick={() => handleActionClick(onOpenAssignRemedial)}
              className={`w-full text-left p-2.5 rounded-2xl border transition-all duration-150 cursor-pointer flex items-center justify-between gap-3 group ${
                isDark
                  ? 'bg-white/[0.03] hover:bg-white/[0.08] border-white/[0.06] hover:border-emerald-400/40 text-white'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200/80 text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                    isDark
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  <BookOpenCheck className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold truncate">Assign Remedial Homework</span>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full font-bold shrink-0 ${
                        isDark
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      Adaptive
                    </span>
                  </div>
                  <p
                    className={`text-[11px] truncate mt-0.5 ${
                      isDark ? 'text-[#8E95A5]' : 'text-slate-500'
                    }`}
                  >
                    Push visual simulators, flashcards, or drills
                  </p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
            </button>

            {/* Action 3: Launch 3-Min Exit Ticket */}
            <button
              onClick={() => handleActionClick(onScheduleExitTicket)}
              className={`w-full text-left p-2.5 rounded-2xl border transition-all duration-150 cursor-pointer flex items-center justify-between gap-3 group ${
                isDark
                  ? 'bg-white/[0.03] hover:bg-white/[0.08] border-white/[0.06] hover:border-sky-400/40 text-white'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200/80 text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                    isDark
                      ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                      : 'bg-sky-100 text-sky-700'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold truncate">Launch 3-Min Exit Ticket</span>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full font-bold shrink-0 ${
                        isDark
                          ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                          : 'bg-sky-100 text-sky-700'
                      }`}
                    >
                      Live
                    </span>
                  </div>
                  <p
                    className={`text-[11px] truncate mt-0.5 ${
                      isDark ? 'text-[#8E95A5]' : 'text-slate-500'
                    }`}
                  >
                    Quick 3-question pulse check on today's lesson
                  </p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
            </button>

            {/* Action 4: Log Diagnostic Learning Gap */}
            <button
              onClick={() => handleActionClick(onOpenAddGap)}
              className={`w-full text-left p-2.5 rounded-2xl border transition-all duration-150 cursor-pointer flex items-center justify-between gap-3 group ${
                isDark
                  ? 'bg-white/[0.03] hover:bg-white/[0.08] border-white/[0.06] hover:border-purple-400/40 text-white'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200/80 text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                    isDark
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                      : 'bg-purple-100 text-purple-700'
                  }`}
                >
                  <PlusCircle className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold truncate block">Log Diagnostic Gap</span>
                  <p
                    className={`text-[11px] truncate mt-0.5 ${
                      isDark ? 'text-[#8E95A5]' : 'text-slate-500'
                    }`}
                  >
                    Flag a student misconception or failed score
                  </p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
            </button>

            {/* Action 5: Broadcast Parent Notice */}
            <button
              onClick={() => handleActionClick(onBroadcastParent)}
              className={`w-full text-left p-2.5 rounded-2xl border transition-all duration-150 cursor-pointer flex items-center justify-between gap-3 group ${
                isDark
                  ? 'bg-white/[0.03] hover:bg-white/[0.08] border-white/[0.06] hover:border-pink-400/40 text-white'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200/80 text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                    isDark
                      ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
                      : 'bg-pink-100 text-pink-700'
                  }`}
                >
                  <Megaphone className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold truncate block">Broadcast Parent Notice</span>
                  <p
                    className={`text-[11px] truncate mt-0.5 ${
                      isDark ? 'text-[#8E95A5]' : 'text-slate-500'
                    }`}
                  >
                    Send weekly progress notice to guardians
                  </p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
            </button>

            {/* Action 6: Export Diagnostics CSV */}
            <button
              onClick={() => handleActionClick(onExportReport)}
              className={`w-full text-left p-2.5 rounded-2xl border transition-all duration-150 cursor-pointer flex items-center justify-between gap-3 group ${
                isDark
                  ? 'bg-white/[0.03] hover:bg-white/[0.08] border-white/[0.06] hover:border-cyan-400/40 text-white'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200/80 text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                    isDark
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'bg-cyan-100 text-cyan-700'
                  }`}
                >
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold truncate">Export Diagnostics</span>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full font-bold shrink-0 ${
                        isDark
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          : 'bg-cyan-100 text-cyan-700'
                      }`}
                    >
                      .CSV
                    </span>
                  </div>
                  <p
                    className={`text-[11px] truncate mt-0.5 ${
                      isDark ? 'text-[#8E95A5]' : 'text-slate-500'
                    }`}
                  >
                    Download spreadsheet of student gap records
                  </p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
            </button>
          </div>

          {/* Dropdown Footer Tip */}
          <div
            className={`px-4 py-2.5 border-t text-[10px] flex items-center justify-between gap-2 ${
              isDark
                ? 'bg-[#07080B]/80 border-white/[0.08] text-[#8E95A5]'
                : 'bg-slate-100/80 border-slate-200 text-slate-500'
            }`}
          >
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Tip: Press ⌘K or Ctrl+K anywhere</span>
            </span>
            <span className="font-mono">Pragya v2.4</span>
          </div>
        </div>
      )}
    </div>
  );
};
