import React, { useState, useMemo } from 'react';
import {
  X,
  Send,
  Users,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Smartphone,
  Bell,
  Bot,
  Search,
  Check,
} from 'lucide-react';
import { StudentGapRecord, Subject } from '../../types';
import { useDashboardTheme } from '../../context/ThemeContext';

interface MessageAtRiskModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: StudentGapRecord[];
  selectedClass: string;
  selectedSubject: Subject;
  onSendMessage: (selectedStudentIds: string[], message: string, channels: string[]) => void;
}

const MESSAGE_TEMPLATES = [
  {
    id: 'practice-invite',
    title: '💡 Practice & Micro-Drill Invite',
    tag: 'Encouraging',
    text: 'Hi {StudentName}! I noticed you have been working through {Topic}. A 5-minute interactive practice booster has been placed on your Pragya portal today to help you master this concept!',
  },
  {
    id: 'retest-notice',
    title: '🎯 Diagnostic Re-Test Notice',
    tag: 'Academic',
    text: 'Hello {StudentName}, your recent quiz showed a minor roadblock in {Topic}. Please review the step-by-step summary flashcards and take the 3-question mastery re-check on your dashboard.',
  },
  {
    id: 'consultation-invite',
    title: '🤝 1-on-1 Consultation Check-in',
    tag: 'Supportive',
    text: 'Hi {StudentName}, please drop by during tomorrow morning tutorial / consultation hour so we can work through a couple of sample {Topic} problems together. You are very close to clearing it!',
  },
  {
    id: 'custom',
    title: '✍️ Custom Note',
    tag: 'Custom',
    text: '',
  },
];

export const MessageAtRiskModal: React.FC<MessageAtRiskModalProps> = ({
  isOpen,
  onClose,
  students,
  selectedClass,
  selectedSubject,
  onSendMessage,
}) => {
  const { style } = useDashboardTheme();
  const isDark = style === 'obsidian-dark' || style === 'command-dark';

  // Filter at-risk students for current class & subject
  const atRiskStudents = useMemo(() => {
    return students.filter(
      (s) =>
        s.classGrade === selectedClass &&
        (selectedSubject === 'All' || s.subject === selectedSubject) &&
        s.fixedStatus !== 'Fixed'
    );
  }, [students, selectedClass, selectedSubject]);

  const [filterType, setFilterType] = useState<'all' | 'critical' | 'inprogress'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>(() =>
    atRiskStudents.map((s) => s.id)
  );

  const [selectedTemplate, setSelectedTemplate] = useState(MESSAGE_TEMPLATES[0].id);
  const [customText, setCustomText] = useState(MESSAGE_TEMPLATES[0].text);

  // Channels state
  const [channels, setChannels] = useState<{ studentPortal: boolean; aiTutor: boolean; parentSMS: boolean }>({
    studentPortal: true,
    aiTutor: true,
    parentSMS: false,
  });

  const [isSending, setIsSending] = useState(false);

  if (!isOpen) return null;

  const filteredStudents = atRiskStudents.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.failedBasicTopic.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filterType === 'critical') return s.diagnosticScore < 35;
    if (filterType === 'inprogress') return s.fixedStatus === 'In Progress';
    return true;
  });

  const handleToggleStudent = (id: string) => {
    setSelectedStudentIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedStudentIds.length === filteredStudents.length) {
      setSelectedStudentIds([]);
    } else {
      setSelectedStudentIds(filteredStudents.map((s) => s.id));
    }
  };

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    const tmpl = MESSAGE_TEMPLATES.find((t) => t.id === templateId);
    if (tmpl) {
      setCustomText(tmpl.text);
    }
  };

  const handleSend = () => {
    if (selectedStudentIds.length === 0 || !customText.trim()) return;

    setIsSending(true);
    const activeChannels: string[] = [];
    if (channels.studentPortal) activeChannels.push('Student Portal Notification');
    if (channels.aiTutor) activeChannels.push('Pragya AI Tutor Quest Priority');
    if (channels.parentSMS) activeChannels.push('Parent SMS / WhatsApp Notice');

    setTimeout(() => {
      onSendMessage(selectedStudentIds, customText, activeChannels);
      setIsSending(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div
        className={`relative rounded-3xl max-w-2xl w-full border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-colors ${
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
              ? 'bg-gradient-to-r from-amber-500/10 via-transparent to-white/[0.02] border-white/10'
              : 'bg-slate-50/80 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                isDark
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              <Send className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black tracking-tight">Message At-Risk Students</h3>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                    isDark
                      ? 'bg-white/[0.08] text-amber-300 border border-white/10'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {selectedClass} • {selectedSubject}
                </span>
              </div>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-[#8E95A5]' : 'text-slate-500'}`}>
                Dispatch targeted encouragement, remedial practice invites, or consultation alerts
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

        {/* Modal Body: Scrollable */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Step 1: Student Selection */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <label className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 opacity-80">
                <Users className="w-3.5 h-3.5" />
                <span>Select Target Students ({selectedStudentIds.length}/{filteredStudents.length} Selected)</span>
              </label>
              <button
                type="button"
                onClick={handleSelectAll}
                className={`text-[11px] font-bold hover:underline cursor-pointer ${
                  isDark ? 'text-amber-400' : 'text-blue-600'
                }`}
              >
                {selectedStudentIds.length === filteredStudents.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>

            {/* Filter chips & Search */}
            <div className="flex items-center gap-2 mb-3">
              <div className="relative flex-1">
                <Search className={`w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                <input
                  type="text"
                  placeholder="Search student or topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-8 pr-3 py-1.5 rounded-xl text-xs border focus:outline-hidden ${
                    isDark
                      ? 'bg-white/[0.04] border-white/10 text-white placeholder-slate-500 focus:border-amber-400'
                      : 'bg-white border-slate-200 text-slate-900 focus:border-blue-500'
                  }`}
                />
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setFilterType('all')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                    filterType === 'all'
                      ? isDark
                        ? 'bg-white text-slate-950'
                        : 'bg-slate-900 text-white'
                      : isDark
                      ? 'bg-white/[0.04] text-slate-400 hover:text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  All ({atRiskStudents.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterType('critical')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                    filterType === 'critical'
                      ? 'bg-rose-500 text-white'
                      : isDark
                      ? 'bg-white/[0.04] text-rose-400 hover:text-white'
                      : 'bg-rose-50 text-rose-700'
                  }`}
                >
                  Critical
                </button>
                <button
                  type="button"
                  onClick={() => setFilterType('inprogress')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                    filterType === 'inprogress'
                      ? 'bg-amber-500 text-white'
                      : isDark
                      ? 'bg-white/[0.04] text-amber-400 hover:text-white'
                      : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  In Progress
                </button>
              </div>
            </div>

            {/* Students List Box */}
            <div
              className={`max-h-44 overflow-y-auto rounded-2xl border divide-y p-1 space-y-1 ${
                isDark
                  ? 'bg-white/[0.02] border-white/10 divide-white/[0.05]'
                  : 'bg-slate-50/50 border-slate-200 divide-slate-100'
              }`}
            >
              {filteredStudents.length === 0 ? (
                <div className="py-6 text-center text-xs opacity-60">
                  No at-risk students found matching the selected filter.
                </div>
              ) : (
                filteredStudents.map((student) => {
                  const isSelected = selectedStudentIds.includes(student.id);
                  return (
                    <div
                      key={student.id}
                      onClick={() => handleToggleStudent(student.id)}
                      className={`flex items-center justify-between gap-3 p-2 rounded-xl transition cursor-pointer ${
                        isSelected
                          ? isDark
                            ? 'bg-white/[0.08]'
                            : 'bg-white shadow-xs'
                          : isDark
                          ? 'hover:bg-white/[0.03]'
                          : 'hover:bg-white/50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border transition shrink-0 ${
                            isSelected
                              ? isDark
                                ? 'bg-amber-400 border-amber-400 text-slate-950'
                                : 'bg-blue-600 border-blue-600 text-white'
                              : isDark
                              ? 'border-white/20'
                              : 'border-slate-300'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>

                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-7 h-7 rounded-full object-cover shrink-0 ring-1 ring-white/10"
                        />

                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold truncate">{student.name}</span>
                            <span className="text-[10px] opacity-60 font-mono">{student.rollNumber}</span>
                          </div>
                          <p className={`text-[10px] truncate ${isDark ? 'text-[#8E95A5]' : 'text-slate-500'}`}>
                            {student.failedBasicTopic}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                            student.diagnosticScore < 35
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {student.diagnosticScore}%
                        </span>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                            student.fixedStatus === 'In Progress'
                              ? 'bg-sky-500/20 text-sky-300'
                              : 'bg-rose-500/20 text-rose-300'
                          }`}
                        >
                          {student.fixedStatus}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Step 2: Choose Template */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider block mb-2 opacity-80">
              Message Template
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {MESSAGE_TEMPLATES.map((tmpl) => {
                const isActive = selectedTemplate === tmpl.id;
                return (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => handleSelectTemplate(tmpl.id)}
                    className={`text-left p-2.5 rounded-xl border text-xs transition cursor-pointer flex flex-col justify-between ${
                      isActive
                        ? isDark
                          ? 'bg-amber-500/15 border-amber-500/40 text-amber-200'
                          : 'bg-blue-50 border-blue-400 text-blue-900 font-semibold'
                        : isDark
                        ? 'bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/[0.06]'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold flex items-center justify-between">
                      <span>{tmpl.title}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/20 opacity-80">
                        {tmpl.tag}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Message Textarea */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider opacity-80">
                Message Content (Tokens: {'{StudentName}'}, {'{Topic}'})
              </label>
              <span className="text-[10px] opacity-60 font-mono">{customText.length} characters</span>
            </div>
            <textarea
              rows={3}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Write an encouraging personalized note..."
              className={`w-full p-3 rounded-2xl text-xs border focus:outline-hidden transition leading-relaxed ${
                isDark
                  ? 'bg-white/[0.04] border-white/10 text-white placeholder-slate-500 focus:border-amber-400'
                  : 'bg-white border-slate-200 text-slate-900 focus:border-blue-500'
              }`}
            />
          </div>

          {/* Step 4: Dispatch Channels */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider block mb-2 opacity-80">
              Notification Channels
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <label
                className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                  channels.studentPortal
                    ? isDark
                      ? 'bg-white/[0.08] border-white/20 text-white'
                      : 'bg-slate-100 border-slate-300 font-bold'
                    : 'opacity-60'
                }`}
              >
                <input
                  type="checkbox"
                  checked={channels.studentPortal}
                  onChange={(e) =>
                    setChannels((prev) => ({ ...prev, studentPortal: e.target.checked }))
                  }
                  className="rounded text-amber-500"
                />
                <Bell className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">Student App Alert</span>
              </label>

              <label
                className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                  channels.aiTutor
                    ? isDark
                      ? 'bg-white/[0.08] border-white/20 text-white'
                      : 'bg-slate-100 border-slate-300 font-bold'
                    : 'opacity-60'
                }`}
              >
                <input
                  type="checkbox"
                  checked={channels.aiTutor}
                  onChange={(e) =>
                    setChannels((prev) => ({ ...prev, aiTutor: e.target.checked }))
                  }
                  className="rounded text-amber-500"
                />
                <Bot className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">Pragya AI Tutor Quest</span>
              </label>

              <label
                className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                  channels.parentSMS
                    ? isDark
                      ? 'bg-white/[0.08] border-white/20 text-white'
                      : 'bg-slate-100 border-slate-300 font-bold'
                    : 'opacity-60'
                }`}
              >
                <input
                  type="checkbox"
                  checked={channels.parentSMS}
                  onChange={(e) =>
                    setChannels((prev) => ({ ...prev, parentSMS: e.target.checked }))
                  }
                  className="rounded text-amber-500"
                />
                <Smartphone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="truncate">Parent WhatsApp/SMS</span>
              </label>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div
          className={`p-4 border-t flex items-center justify-between gap-3 ${
            isDark ? 'bg-[#090A10] border-white/10' : 'bg-slate-50 border-slate-200'
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
            type="button"
            disabled={selectedStudentIds.length === 0 || !customText.trim() || isSending}
            onClick={handleSend}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-md cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
              isDark
                ? 'bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-amber-400/20'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/20'
            }`}
          >
            {isSending ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Dispatching Alerts...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Send to {selectedStudentIds.length} At-Risk Students</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
