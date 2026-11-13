import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  MessageSquare,
  Sparkles,
  Bot,
  UserCheck,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Plus,
  Send,
  HelpCircle,
} from 'lucide-react';
import { EscalationStatus, EscalationTicket, StudentAgeTier } from '../../types';
import {
  getEscalationTickets,
  respondToTicket,
  resolveTicket,
} from '../../utils/escalationStore';
import { EscalateToTeacherModal } from './EscalateToTeacherModal';

interface StudentEscalationsViewProps {
  tier: StudentAgeTier;
  activeClass: string;
  activeSubject: string;
  onBackToDashboard: () => void;
}

export const StudentEscalationsView: React.FC<StudentEscalationsViewProps> = ({
  tier,
  activeClass,
  activeSubject,
  onBackToDashboard,
}) => {
  const [tickets, setTickets] = useState<EscalationTicket[]>(() => getEscalationTickets());
  const [selectedFilter, setSelectedFilter] = useState<'All' | EscalationStatus>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setTickets(getEscalationTickets());
    };
    window.addEventListener('pragya_escalation_updated', handleUpdate);
    return () => window.removeEventListener('pragya_escalation_updated', handleUpdate);
  }, []);

  const refreshTickets = () => {
    setTickets(getEscalationTickets());
  };

  const filteredTickets = tickets.filter((t) => {
    if (selectedFilter === 'All') return true;
    return t.status === selectedFilter;
  });

  const pendingCount = tickets.filter((t) => t.status === 'Pending Review').length;
  const repliedCount = tickets.filter((t) => t.status === 'Teacher Responded').length;
  const resolvedCount = tickets.filter((t) => t.status === 'Resolved').length;

  const handleSimulateResponse = (ticket: EscalationTicket) => {
    const sampleReplies: Record<string, string> = {
      Mathematics:
        'Hi Aarav! In fractions, division means "how many times does this quantity fit?". When you divide by 1/4, you fit 4 times as many items! That is why we multiply by the reciprocal (4/1). Let us practice two more examples together in class tomorrow!',
      Science:
        'Great question Aarav! Chlorophyll molecules absorb blue and red light frequencies from the sun, but reflect back green light, which is why plant leaves look green. Look at figure 4.3 in your textbook tonight.',
      default:
        'Hello Aarav! I reviewed your doubt and the AI tutor transcript. Don’t worry, this topic has a few subtle steps. I will spend 5 minutes reviewing this concept with you before our quiz!',
    };

    const reply = sampleReplies[ticket.subject] || sampleReplies.default;
    respondToTicket(ticket.id, reply);
    refreshTickets();
  };

  const handleResolve = (ticketId: string) => {
    resolveTicket(ticketId);
    refreshTickets();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Breadcrumb & Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToDashboard}
            className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-slate-900">
                Teacher Escalations &amp; Doubts
              </h1>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800">
                Live Support
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Whenever the AI Tutor explanation doesn&apos;t make sense, your questions are routed directly to your faculty.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white text-xs font-black shadow-md shadow-rose-500/20 transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Escalate New Doubt</span>
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
            Total Escalated
          </span>
          <p className="text-2xl font-black text-slate-900 mt-1">{tickets.length}</p>
          <span className="text-[10px] text-slate-400">All subjects combined</span>
        </div>

        <div className="p-4 rounded-3xl bg-amber-50/70 border border-amber-200 shadow-2xs">
          <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wide">
            Pending Review
          </span>
          <p className="text-2xl font-black text-amber-900 mt-1">{pendingCount}</p>
          <span className="text-[10px] text-amber-700">Teacher notified</span>
        </div>

        <div className="p-4 rounded-3xl bg-emerald-50/70 border border-emerald-200 shadow-2xs">
          <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide">
            Teacher Replied
          </span>
          <p className="text-2xl font-black text-emerald-900 mt-1">{repliedCount}</p>
          <span className="text-[10px] text-emerald-700">Ready to review</span>
        </div>

        <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
            Resolved
          </span>
          <p className="text-2xl font-black text-slate-700 mt-1">{resolvedCount}</p>
          <span className="text-[10px] text-slate-400">Concept understood</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {(['All', 'Pending Review', 'Teacher Responded', 'Resolved'] as const).map(
          (filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedFilter === filter
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {filter}
            </button>
          )
        )}
      </div>

      {/* Tickets Feed */}
      <div className="space-y-4">
        {filteredTickets.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-2xl">
              📬
            </div>
            <h3 className="text-sm font-bold text-slate-700">No tickets found in this tab</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              If the AI tutor explanation is ever unclear, you can send an escalation to your teacher right away!
            </p>
          </div>
        ) : (
          filteredTickets.map((ticket) => {
            const isExpanded = expandedId === ticket.id;
            const isPending = ticket.status === 'Pending Review';
            const isResponded = ticket.status === 'Teacher Responded';

            return (
              <div
                key={ticket.id}
                className="p-5 rounded-3xl bg-white border-2 border-slate-100 hover:border-slate-200 shadow-sm transition-all space-y-4"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-xs font-black uppercase px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700">
                      #{ticket.ticketNumber}
                    </span>
                    <h3 className="text-base font-black text-slate-900">
                      {ticket.topic}
                    </h3>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {ticket.subject}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      • {ticket.studentClass}
                    </span>
                  </div>

                  {/* Status badge */}
                  <div>
                    {isPending && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200">
                        <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                        <span>Under Review by Teacher</span>
                      </span>
                    )}
                    {isResponded && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-900 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Teacher Replied</span>
                      </span>
                    )}
                    {ticket.status === 'Resolved' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
                        <span>Resolved</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Assigned Teacher bar */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">👩‍🏫</span>
                    <div>
                      <span className="font-bold text-slate-800">{ticket.teacherName}</span>
                      <span className="text-slate-400 text-[11px] block">
                        {ticket.teacherRole}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400">{ticket.createdAt}</span>
                </div>

                {/* Student's Confusion */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block">
                    What Aarav couldn&apos;t understand from AI tutor:
                  </span>
                  <div className="p-3.5 rounded-2xl bg-rose-50/50 border border-rose-100 text-xs text-slate-800 leading-relaxed font-medium">
                    &ldquo;{ticket.studentDoubt}&rdquo;
                  </div>
                </div>

                {/* Teacher's Response (if provided) */}
                {ticket.teacherResponse && (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-emerald-200 text-emerald-900 flex items-center justify-center text-xs font-bold">
                          👩‍🏫
                        </span>
                        <span className="text-xs font-black text-emerald-950">
                          {ticket.teacherName}&apos;s Clarification
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700">
                        {ticket.respondedAt}
                      </span>
                    </div>

                    <p className="text-xs text-emerald-950 leading-relaxed whitespace-pre-line pl-8">
                      {ticket.teacherResponse}
                    </p>

                    {ticket.status !== 'Resolved' && (
                      <div className="flex justify-end pt-2">
                        <button
                          onClick={() => handleResolve(ticket.id)}
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>I Understand Now! Mark as Resolved</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Transcript Collapse and Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  {ticket.aiChatSnippet && ticket.aiChatSnippet.length > 0 ? (
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : ticket.id)}
                      className="text-slate-500 hover:text-slate-800 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <span>{isExpanded ? 'Hide AI Transcript' : 'View AI Transcript Forwarded'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  ) : (
                    <span />
                  )}

                  {isPending && (
                    <button
                      onClick={() => handleSimulateResponse(ticket)}
                      className="px-3 py-1.5 rounded-xl text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 font-black text-xs transition cursor-pointer flex items-center gap-1"
                      title="Simulate teacher replying to this doubt"
                    >
                      <span>⚡ Demo: Simulate Teacher Reply</span>
                    </button>
                  )}
                </div>

                {/* AI Chat Snippet */}
                {isExpanded && ticket.aiChatSnippet && (
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">
                      Conversation history sent to teacher:
                    </span>
                    {ticket.aiChatSnippet.map((msg, i) => (
                      <div key={i} className="flex gap-2">
                        <span className="font-bold text-slate-600 shrink-0">
                          {msg.sender === 'student' ? 'Aarav:' : 'AI Tutor:'}
                        </span>
                        <span className="text-slate-700">{msg.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Escalate New Doubt Modal */}
      <EscalateToTeacherModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tier={tier}
        activeClass={activeClass}
        activeSubject={activeSubject}
        onSuccess={() => refreshTickets()}
      />
    </div>
  );
};
