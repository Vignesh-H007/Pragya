import React, { useState, useEffect, useMemo } from 'react';
import {
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Send,
  UserCheck,
  Bot,
  Sparkles,
  Flame,
  HelpCircle,
  Check,
  Search,
  Filter,
  ArrowRight,
  Lightbulb,
} from 'lucide-react';
import { EscalationTicket } from '../../types';
import {
  getEscalationTickets,
  respondToTicket,
  resolveTicket,
} from '../../utils/escalationStore';
import { useDashboardTheme } from '../../context/ThemeContext';

interface FacultyEscalationsQueueProps {
  selectedClass?: string;
  selectedSubject?: string;
}

export const FacultyEscalationsQueue: React.FC<FacultyEscalationsQueueProps> = ({
  selectedClass,
  selectedSubject,
}) => {
  const { style } = useDashboardTheme();
  const isDark = style === 'obsidian-dark' || style === 'command-dark';

  const [tickets, setTickets] = useState<EscalationTicket[]>(() => getEscalationTickets());
  const [expandedTranscriptId, setExpandedTranscriptId] = useState<string | null>(null);
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [sentSuccessId, setSentSuccessId] = useState<string | null>(null);
  const [filterTab, setFilterTab] = useState<'all' | 'pending' | 'resolved'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleUpdate = () => {
      setTickets(getEscalationTickets());
    };
    window.addEventListener('pragya_escalation_updated', handleUpdate);
    return () => window.removeEventListener('pragya_escalation_updated', handleUpdate);
  }, []);

  // Theme-aware color grading engine
  const themeGrading = useMemo(() => {
    switch (style) {
      case 'editorial-command':
        return {
          containerBg: 'bg-[#FAF7F0] border-[#DDD4C7] text-[#1C232B]',
          headerBadge: 'bg-[#246257]/10 text-[#246257] border-[#246257]/20',
          pendingCard: 'bg-white border-[#DDD4C7] shadow-xs hover:border-[#C85340]/60',
          resolvedCard: 'bg-[#F4EFEA]/80 border-[#DDD4C7] opacity-90',
          quoteBox: 'bg-[#FAF7F0] border-[#DDD4C7] text-[#1C232B]',
          replyBox: 'bg-[#FDFBF7] border-2 border-[#246257]',
          primaryBtn: 'bg-[#246257] hover:bg-[#1C4E45] text-white shadow-xs',
          urgentPill: 'bg-[#C85340] text-white',
          filterActive: 'bg-[#246257] text-white shadow-xs',
          filterInactive: 'text-[#5C6670] hover:text-[#1C232B]',
          inputBg: 'bg-white border-[#DDD4C7] text-[#1C232B]',
          aiTranscriptBg: 'bg-[#F4EFEA] border-[#DDD4C7]',
          templatePill: 'bg-[#F4EFEA] hover:bg-[#EAE2D5] text-[#1C232B] border border-[#DDD4C7]',
          themeSubtitle: 'Sandstone, Spruce & Terracotta Grading',
        };

      case 'obsidian-dark':
      case 'command-dark':
        return {
          containerBg: 'bg-[#121218] border-[#262633] text-slate-100 shadow-xl',
          headerBadge: 'bg-amber-950/70 text-amber-300 border-amber-800/60',
          pendingCard: 'bg-[#161622] border-[#2A2A3A] hover:border-amber-500/50 shadow-md',
          resolvedCard: 'bg-[#101017] border-[#20202C] opacity-80',
          quoteBox: 'bg-[#0E0E14] border-[#23232F] text-slate-200',
          replyBox: 'bg-[#161624] border-2 border-indigo-500',
          primaryBtn: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs shadow-indigo-600/30',
          urgentPill: 'bg-rose-600 text-white shadow-xs shadow-rose-600/40',
          filterActive: 'bg-indigo-600 text-white shadow-xs',
          filterInactive: 'text-slate-400 hover:text-slate-200',
          inputBg: 'bg-[#0E0E14] border-[#262633] text-slate-100',
          aiTranscriptBg: 'bg-[#0E0E14] border-[#222230]',
          templatePill: 'bg-[#1E1E2C] hover:bg-[#28283C] text-slate-300 border border-[#2E2E40]',
          themeSubtitle: 'Obsidian Matte & Radiant Amber/Indigo Grading',
        };

      case 'academic-warm':
        return {
          containerBg: 'bg-[#FFFDFB] border-[#E6DFD3] text-[#28231D]',
          headerBadge: 'bg-[#8C4A2F]/10 text-[#8C4A2F] border-[#8C4A2F]/20',
          pendingCard: 'bg-[#FAF7F2] border-[#E6DFD3] hover:border-[#8C4A2F]/60 shadow-xs',
          resolvedCard: 'bg-[#F5EFE6] border-[#E6DFD3] opacity-85',
          quoteBox: 'bg-white border-[#E6DFD3] text-[#28231D]',
          replyBox: 'bg-[#FFFDFB] border-2 border-[#8C4A2F]',
          primaryBtn: 'bg-[#8C4A2F] hover:bg-[#783E26] text-white shadow-xs',
          urgentPill: 'bg-[#9A3412] text-white',
          filterActive: 'bg-[#8C4A2F] text-white shadow-xs',
          filterInactive: 'text-[#5C5346] hover:text-[#28231D]',
          inputBg: 'bg-white border-[#E6DFD3] text-[#28231D]',
          aiTranscriptBg: 'bg-[#FAF7F2] border-[#E6DFD3]',
          templatePill: 'bg-[#F4EFEB] hover:bg-[#EBE2D7] text-[#28231D] border border-[#E0D7C9]',
          themeSubtitle: 'Parchment, Terracotta & Sage Grading',
        };

      case 'clean':
      default:
        return {
          containerBg: 'bg-white border-slate-200 text-slate-900 shadow-xs',
          headerBadge: 'bg-amber-100 text-amber-800 border-amber-200',
          pendingCard: 'bg-white border-amber-200 hover:border-amber-400 shadow-xs',
          resolvedCard: 'bg-slate-50 border-slate-200 opacity-90',
          quoteBox: 'bg-slate-50 border-slate-200 text-slate-800',
          replyBox: 'bg-white border-2 border-indigo-400',
          primaryBtn: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs',
          urgentPill: 'bg-rose-600 text-white',
          filterActive: 'bg-indigo-600 text-white shadow-xs',
          filterInactive: 'text-slate-600 hover:text-slate-900',
          inputBg: 'bg-white border-slate-200 text-slate-900',
          aiTranscriptBg: 'bg-slate-50 border-slate-200',
          templatePill: 'bg-slate-100 hover:bg-indigo-50 text-slate-700 border border-slate-200',
          themeSubtitle: 'Modern Pedagogic Daylight Grading',
        };
    }
  }, [style]);

  const pendingTickets = tickets.filter((t) => t.status === 'Pending Review');
  const answeredTickets = tickets.filter(
    (t) => t.status === 'Teacher Responded' || t.status === 'Resolved'
  );

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      if (filterTab === 'pending' && ticket.status !== 'Pending Review') return false;
      if (
        filterTab === 'resolved' &&
        ticket.status !== 'Teacher Responded' &&
        ticket.status !== 'Resolved'
      )
        return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = ticket.studentName.toLowerCase().includes(query);
        const matchesTopic = ticket.topic.toLowerCase().includes(query);
        const matchesDoubt = ticket.studentDoubt.toLowerCase().includes(query);
        return matchesName || matchesTopic || matchesDoubt;
      }
      return true;
    });
  }, [tickets, filterTab, searchQuery]);

  const handleSendReply = (ticketId: string) => {
    if (!replyText.trim()) return;

    respondToTicket(ticketId, replyText.trim());
    setSentSuccessId(ticketId);
    setReplyText('');
    setActiveReplyId(null);

    setTimeout(() => {
      setSentSuccessId(null);
    }, 2500);
  };

  const quickTemplates = [
    'Draw this out on the board in tomorrow\'s 5-minute warm-up session.',
    'Intuitive Analogy: Think of negative signs as directional arrows pointing in reverse.',
    'I inspected your AI transcript: Remember that dividing fractions flips the divisor.',
    'You are very close! Review the step-by-step example in the remedial deck.',
  ];

  return (
    <div
      id="student-doubts-escalated-from-ai-tutor"
      aria-label="Student Doubts Escalated from AI Tutor"
      className={`rounded-3xl p-5 sm:p-6 border transition-all duration-200 space-y-5 ${themeGrading.containerBg}`}
    >
      {/* 1. Header & Priority Warning Ribbon */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-inherit">
        <div className="flex items-start sm:items-center gap-3">
          <div
            className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${themeGrading.headerBadge}`}
          >
            <HelpCircle className="w-5 h-5 stroke-[2.3]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg sm:text-xl font-black tracking-tight">
                Student Doubts Escalated from AI Tutor
              </h2>
              {pendingTickets.length > 0 && (
                <span
                  className={`text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${themeGrading.urgentPill}`}
                >
                  {pendingTickets.length} Action Needed
                </span>
              )}
              <span className="text-[10px] font-mono opacity-70 px-2 py-0.5 rounded border border-inherit">
                {themeGrading.themeSubtitle}
              </span>
            </div>
            <p className="text-xs opacity-75 mt-0.5 max-w-2xl leading-relaxed">
              Real-time student escalations triggered when the Pragya AI Tutor hits cognitive dead-ends. Teachers provide decisive human interventions.
            </p>
          </div>
        </div>

        {/* Status Counters */}
        <div className="flex items-center gap-2 text-xs font-bold shrink-0">
          <div className="px-3 py-1.5 rounded-xl border border-inherit bg-black/5 dark:bg-white/5">
            <span className="opacity-70">Total Doubts: </span>
            <span>{tickets.length}</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl border border-inherit bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
            <span>Clarified: {answeredTickets.length}</span>
          </div>
        </div>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 opacity-40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search doubt by student, topic, or keyword..."
            className={`w-full pl-8 pr-3 py-1.5 rounded-xl border focus:outline-none focus:ring-1 focus:ring-amber-500 text-xs transition ${themeGrading.inputBg}`}
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center rounded-xl p-0.5 border border-inherit bg-black/5 dark:bg-white/5">
          {(
            [
              { id: 'all', label: `All (${tickets.length})` },
              { id: 'pending', label: `Pending Review (${pendingTickets.length})` },
              { id: 'resolved', label: `Clarified (${answeredTickets.length})` },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterTab(tab.id)}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                filterTab === tab.id
                  ? themeGrading.filterActive
                  : themeGrading.filterInactive
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Ticket Cards List */}
      <div className="space-y-3">
        {filteredTickets.length === 0 ? (
          <div className="p-8 text-center rounded-2xl border border-dashed border-inherit opacity-70">
            <p className="text-xs font-bold">
              No student escalations match the current filter or search criteria.
            </p>
          </div>
        ) : (
          filteredTickets.map((ticket) => {
            const isPending = ticket.status === 'Pending Review';
            const isReplying = activeReplyId === ticket.id;
            const isExpanded = expandedTranscriptId === ticket.id;

            return (
              <div
                key={ticket.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all space-y-3 ${
                  isPending ? themeGrading.pendingCard : themeGrading.resolvedCard
                }`}
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded border border-inherit bg-black/5 dark:bg-white/10 opacity-80">
                      #{ticket.ticketNumber}
                    </span>
                    <span className="text-xs sm:text-sm font-black">
                      {ticket.studentName}
                    </span>
                    <span className="text-xs opacity-70">({ticket.studentClass})</span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full border border-inherit bg-black/5 dark:bg-white/5">
                      {ticket.subject} • {ticket.topic}
                    </span>
                    {ticket.priority === 'Urgent' && (
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${themeGrading.urgentPill}`}>
                        Urgent Block
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] opacity-60 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {ticket.createdAt}
                    </span>
                    {isPending ? (
                      <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                        <span>Awaiting Faculty Reply</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        <span>Clarified by {ticket.teacherName}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Student's confusion note */}
                <div className={`p-3.5 rounded-xl border text-xs ${themeGrading.quoteBox}`}>
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-60 block mb-1">
                    Student Inquiry / Cognitive Trap:
                  </span>
                  <p className="font-medium leading-relaxed italic">
                    &ldquo;{ticket.studentDoubt}&rdquo;
                  </p>
                </div>

                {/* Teacher's response if sent */}
                {ticket.teacherResponse && (
                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-emerald-800 dark:text-emerald-300">
                      <span className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5" />
                        <span>Faculty Remedial Response ({ticket.teacherName}):</span>
                      </span>
                      <span className="text-[10px] opacity-75">{ticket.respondedAt}</span>
                    </div>
                    <p className="opacity-90 whitespace-pre-line leading-relaxed">
                      {ticket.teacherResponse}
                    </p>
                  </div>
                )}

                {/* Sent success confirmation */}
                {sentSuccessId === ticket.id && (
                  <div className="p-2.5 bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 border border-emerald-500/30 text-xs font-bold rounded-xl flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Clarification dispatched to {ticket.studentName}!</span>
                  </div>
                )}

                {/* Reply Form */}
                {isReplying && (
                  <div className={`p-4 rounded-xl space-y-3 ${themeGrading.replyBox}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">
                        Write Pedagogical Clarification to {ticket.studentName}:
                      </span>
                      <span className="text-[10px] opacity-60">
                        Pushed instantly to student device
                      </span>
                    </div>

                    {/* Quick suggestion pills */}
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">
                        Quick Pedagogical Suggestions:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {quickTemplates.map((tpl, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setReplyText(tpl)}
                            className={`text-[11px] px-2.5 py-1 rounded-lg transition cursor-pointer text-left ${themeGrading.templatePill}`}
                          >
                            + {tpl}
                          </button>
                        ))}
                      </div>
                    </div>

                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Explain the concept, provide an intuitive analogy, or give reassurance..."
                      rows={3}
                      className={`w-full p-3 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${themeGrading.inputBg}`}
                    />

                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveReplyId(null);
                          setReplyText('');
                        }}
                        className="px-3 py-1.5 text-xs font-bold opacity-60 hover:opacity-100 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSendReply(ticket.id)}
                        disabled={!replyText.trim()}
                        className={`px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-1.5 disabled:opacity-50 cursor-pointer ${themeGrading.primaryBtn}`}
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Clarification</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Footer Controls: AI Transcript + Reply Trigger */}
                <div className="flex items-center justify-between pt-2 border-t border-inherit text-xs">
                  {ticket.aiChatSnippet && ticket.aiChatSnippet.length > 0 ? (
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedTranscriptId(isExpanded ? null : ticket.id)
                      }
                      className="opacity-70 hover:opacity-100 font-bold flex items-center gap-1.5 cursor-pointer transition"
                    >
                      <Bot className="w-4 h-4 text-indigo-500" />
                      <span>{isExpanded ? 'Hide AI Chat Context' : 'Inspect AI Chat Transcript'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  ) : (
                    <span />
                  )}

                  {!isReplying && isPending && (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveReplyId(ticket.id);
                        setReplyText('');
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs ${themeGrading.primaryBtn}`}
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Reply to Student</span>
                    </button>
                  )}
                </div>

                {/* Expanded AI Transcript */}
                {isExpanded && ticket.aiChatSnippet && (
                  <div
                    className={`p-3.5 rounded-xl border space-y-2 text-[11px] max-h-48 overflow-y-auto ${themeGrading.aiTranscriptBg}`}
                  >
                    <span className="font-bold opacity-60 uppercase text-[9px] tracking-wider block">
                      Escalated Pragya AI Tutor Session Log:
                    </span>
                    {ticket.aiChatSnippet.map((chat, idx) => (
                      <div
                        key={idx}
                        className={`p-2 rounded-lg border ${
                          chat.sender === 'student'
                            ? 'bg-amber-500/10 border-amber-500/20'
                            : 'bg-indigo-500/10 border-indigo-500/20'
                        }`}
                      >
                        <span className="font-black opacity-80 uppercase text-[9px] block mb-0.5">
                          {chat.sender === 'student' ? 'Student' : 'AI Tutor'}:
                        </span>
                        <span className="leading-relaxed opacity-95">{chat.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
