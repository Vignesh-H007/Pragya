import React, { useState } from 'react';
import {
  X,
  Send,
  Sparkles,
  Bot,
  AlertCircle,
  Clock,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  ShieldAlert,
  Flame,
  GraduationCap,
} from 'lucide-react';
import { EscalationPriority, EscalationTicket, StudentAgeTier } from '../../types';
import { getTeacherForSubject, saveEscalationTicket } from '../../utils/escalationStore';

interface EscalateToTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  tier: StudentAgeTier;
  activeClass: string;
  activeSubject: string;
  chatSnippet?: Array<{ sender: 'tutor' | 'student'; text: string }>;
  suggestedTopic?: string;
  onSuccess: (ticket: EscalationTicket) => void;
}

export const EscalateToTeacherModal: React.FC<EscalateToTeacherModalProps> = ({
  isOpen,
  onClose,
  tier,
  activeClass,
  activeSubject,
  chatSnippet = [],
  suggestedTopic = '',
  onSuccess,
}) => {
  const teacher = getTeacherForSubject(activeSubject);

  const [topic, setTopic] = useState(
    suggestedTopic || `${activeSubject} - Concept Doubt`
  );
  const [studentDoubt, setStudentDoubt] = useState('');
  const [priority, setPriority] = useState<EscalationPriority>('Normal');
  const [includeChatContext, setIncludeChatContext] = useState(true);
  const [showChatPreview, setShowChatPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<EscalationTicket | null>(null);

  if (!isOpen) return null;

  const quickPillOptions = [
    "I can't understand the formula/definition",
    'Need a simpler real-life example',
    'Step-by-step derivation is confusing',
    'I tried solving but got stuck on step 2',
    'The AI explanation feels too complicated',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentDoubt.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const ticket = saveEscalationTicket({
        studentName: 'Aarav Sharma',
        studentClass: activeClass,
        subject: activeSubject,
        topic: topic.trim() || `${activeSubject} Concept`,
        studentDoubt: studentDoubt.trim(),
        teacherName: teacher.name,
        teacherRole: teacher.role,
        priority,
        aiChatSnippet: includeChatContext ? chatSnippet.slice(-4) : [],
      });

      setIsSubmitting(false);
      setSubmittedTicket(ticket);

      setTimeout(() => {
        onSuccess(ticket);
        onClose();
        setSubmittedTicket(null);
      }, 1400);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full border-2 border-slate-100 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 my-6">
        {/* Top Gradient Header Ribbon */}
        <div className="h-2 bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-600" />

        {/* Success Confirmation State */}
        {submittedTicket ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl shadow-md">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 animate-in zoom-in duration-300" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Ticket #{submittedTicket.ticketNumber} Dispatched
              </span>
              <h3 className="text-xl font-black text-slate-900">
                Escalated to {teacher.name}!
              </h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Your doubt and recent AI conversation have been forwarded. Your teacher will review it and reply soon.
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500">
              Estimated reply: <strong className="text-slate-800">{teacher.responseTime}</strong>
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white flex items-center justify-center text-lg shadow-md shadow-rose-500/20">
                  🙋‍♂️
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-slate-900">
                      Escalate Doubt to Teacher
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                      Live Support
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Couldn&apos;t understand the AI tutor? Your teacher will guide you personally.
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Assigned Subject Teacher Card */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50/70 via-teal-50/50 to-slate-50 border border-emerald-200/80 flex items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white border border-emerald-300 flex items-center justify-center text-emerald-700 shadow-xs">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="leading-tight">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-slate-900">
                      {teacher.name}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 px-1.5 py-0.2 rounded bg-emerald-100">
                      {activeSubject}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    {teacher.role}
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] text-emerald-800 font-bold flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-600" />
                  <span>{teacher.responseTime}</span>
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {activeClass}
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Topic */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Topic / Concept
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Fraction Division, Photosynthesis Equation, Newton's 3rd Law"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-400 font-medium"
                  required
                />
              </div>

              {/* What part is confusing? */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">
                    What part didn&apos;t make sense from the AI explanation?
                  </label>
                  <span className="text-[10px] text-slate-400">Be as specific as you want</span>
                </div>

                {/* Quick select pills */}
                <div className="flex flex-wrap gap-1.5">
                  {quickPillOptions.map((pill, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() =>
                        setStudentDoubt((prev) =>
                          prev ? `${prev}. ${pill}` : pill
                        )
                      }
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-600 border border-slate-200 transition-colors cursor-pointer"
                    >
                      + {pill}
                    </button>
                  ))}
                </div>

                <textarea
                  value={studentDoubt}
                  onChange={(e) => setStudentDoubt(e.target.value)}
                  placeholder="Explain what is still confusing you, or write what you tried and where you got stuck..."
                  rows={3}
                  className="w-full p-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-400 placeholder-slate-400"
                  required
                />
              </div>

              {/* Include AI Chat Context toggle */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={includeChatContext}
                      onChange={(e) => setIncludeChatContext(e.target.checked)}
                      className="rounded border-slate-300 text-rose-500 focus:ring-rose-400 w-4 h-4 cursor-pointer"
                    />
                    <span>Attach recent AI Tutor conversation</span>
                  </label>

                  {chatSnippet.length > 0 && includeChatContext && (
                    <button
                      type="button"
                      onClick={() => setShowChatPreview(!showChatPreview)}
                      className="text-[10px] font-bold text-rose-600 hover:text-rose-700 flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>{showChatPreview ? 'Hide Preview' : 'Preview Chat (3 msgs)'}</span>
                      {showChatPreview ? (
                        <ChevronUp className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      )}
                    </button>
                  )}
                </div>

                <p className="text-[11px] text-slate-500 leading-tight">
                  Giving your teacher the chat transcript allows them to see the exact AI explanation you received and pinpoint your confusion.
                </p>

                {showChatPreview && chatSnippet.length > 0 && (
                  <div className="max-h-28 overflow-y-auto space-y-1.5 p-2 bg-white rounded-xl border border-slate-200 text-[11px]">
                    {chatSnippet.slice(-3).map((item, i) => (
                      <div key={i} className="flex gap-1.5">
                        <span className="font-bold text-slate-500 shrink-0">
                          {item.sender === 'student' ? 'You:' : 'AI Tutor:'}
                        </span>
                        <span className="text-slate-700 line-clamp-2">{item.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Priority Selector */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Priority
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'Normal', label: 'Normal', desc: 'Next class discussion' },
                    { id: 'High', label: 'High', desc: 'Need for homework' },
                    { id: 'Urgent', label: 'Urgent', desc: 'Test tomorrow' },
                  ].map((p) => {
                    const isSelected = priority === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPriority(p.id as EscalationPriority)}
                        className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? p.id === 'Urgent'
                              ? 'bg-rose-50 border-rose-500 text-rose-950 font-bold'
                              : p.id === 'High'
                              ? 'bg-amber-50 border-amber-500 text-amber-950 font-bold'
                              : 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span>{p.label}</span>
                          {p.id === 'Urgent' && <Flame className="w-3 h-3 text-rose-500" />}
                        </div>
                        <span className="text-[9px] text-slate-400 block mt-0.5">
                          {p.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !studentDoubt.trim()}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white text-xs font-black shadow-md shadow-rose-500/20 hover:shadow-rose-500/30 transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Sending to Teacher...' : 'Send Escalation to Teacher'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
