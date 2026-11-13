import React, { useState } from 'react';
import {
  X,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Sparkles,
  Bot,
  UserCheck,
  Send,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { EscalationTicket, StudentAgeTier } from '../../types';
import {
  getEscalationTickets,
  respondToTicket,
  resolveTicket,
} from '../../utils/escalationStore';

interface EscalationsListModalProps {
  isOpen: boolean;
  onClose: () => void;
  tier: StudentAgeTier;
  onNewEscalationClick: () => void;
}

export const EscalationsListModal: React.FC<EscalationsListModalProps> = ({
  isOpen,
  onClose,
  tier,
  onNewEscalationClick,
}) => {
  const [tickets, setTickets] = useState<EscalationTicket[]>(() => getEscalationTickets());
  const [expandedTicketId, setExpandedTicketId] = useState<string | null>(null);

  if (!isOpen) return null;

  const refreshTickets = () => {
    setTickets(getEscalationTickets());
  };

  const handleSimulateResponse = (ticket: EscalationTicket) => {
    const sampleReplies: Record<string, string> = {
      Mathematics:
        'Hi Aarav! Excellent question. In fractions, division means "how many pieces fit inside". When you divide by 1/4, you fit four times as many pieces! That is why we multiply by 4/1. Let us solve 2 more together at the start of tomorrow’s math period!',
      Science:
        'Great curiosity, Aarav! Remember that during photosynthesis, sunlight hits chlorophyll like tiny solar panels. Plants absorb blue & red light, and bounce off green light—which is why leaves appear green! Check out page 42 diagram tonight.',
      default:
        'Hello Aarav, I reviewed your query and the AI tutor transcript. Do not worry about this roadblock—it is very common! I have added a 5-minute explanation to tomorrow’s lesson opener.',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full border-2 border-slate-100 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 my-6">
        {/* Top Ribbon */}
        <div className="h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600" />

        <div className="p-6 space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center text-lg shadow-sm">
                📋
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">
                  Teacher Escalations &amp; Doubts
                </h3>
                <p className="text-xs text-slate-500">
                  Track doubts sent from your AI Tutor to your subject teachers
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onClose();
                  onNewEscalationClick();
                }}
                className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-sm transition cursor-pointer"
              >
                + New Escalation
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tickets List */}
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            {tickets.length === 0 ? (
              <div className="text-center py-10 space-y-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center mx-auto text-xl">
                  📬
                </div>
                <p className="text-xs font-bold text-slate-600">No active escalations yet!</p>
                <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                  If you ever get stuck with the AI tutor, click &quot;Escalate to Teacher&quot; to ask your teacher for help.
                </p>
              </div>
            ) : (
              tickets.map((ticket) => {
                const isExpanded = expandedTicketId === ticket.id;
                const isPending = ticket.status === 'Pending Review';
                const isResponded = ticket.status === 'Teacher Responded';

                return (
                  <div
                    key={ticket.id}
                    className="p-4 rounded-2xl border-2 border-slate-100 hover:border-slate-200 bg-white transition-all space-y-3 shadow-2xs"
                  >
                    {/* Top Row */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                            #{ticket.ticketNumber}
                          </span>
                          <span className="text-xs font-black text-slate-900">
                            {ticket.topic}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                            {ticket.subject}
                          </span>
                          {ticket.priority === 'Urgent' && (
                            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                              Urgent
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-600 mt-1.5 line-clamp-2">
                          &ldquo;{ticket.studentDoubt}&rdquo;
                        </p>
                      </div>

                      {/* Status badge */}
                      <div className="shrink-0">
                        {isPending && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                            <Clock className="w-3 h-3 text-amber-600 animate-spin" />
                            <span>Under Review</span>
                          </span>
                        )}
                        {isResponded && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Teacher Replied</span>
                          </span>
                        )}
                        {ticket.status === 'Resolved' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                            <span>Resolved</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Teacher info line */}
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                      <span>
                        Assigned to: <strong className="text-slate-700">{ticket.teacherName}</strong>
                      </span>
                      <span>{ticket.createdAt}</span>
                    </div>

                    {/* Teacher Response Box if answered */}
                    {ticket.teacherResponse && (
                      <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-black text-emerald-950 flex items-center gap-1.5">
                            <span>👩‍🏫</span>
                            <span>{ticket.teacherName}&apos;s Clarification:</span>
                          </span>
                          <span className="text-[10px] text-emerald-700 font-bold">
                            {ticket.respondedAt}
                          </span>
                        </div>
                        <p className="text-emerald-900 leading-relaxed text-[11px]">
                          {ticket.teacherResponse}
                        </p>
                        {ticket.status !== 'Resolved' && (
                          <div className="flex justify-end pt-1">
                            <button
                              onClick={() => handleResolve(ticket.id)}
                              className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition cursor-pointer"
                            >
                              ✓ Mark as Understood &amp; Close
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Collapsible Transcript & Actions */}
                    <div className="flex items-center justify-between pt-1 text-[11px]">
                      {ticket.aiChatSnippet && ticket.aiChatSnippet.length > 0 ? (
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedTicketId(isExpanded ? null : ticket.id)
                          }
                          className="text-slate-500 hover:text-slate-700 font-medium flex items-center gap-1 cursor-pointer"
                        >
                          <span>{isExpanded ? 'Hide AI Transcript' : 'View AI Transcript Sent'}</span>
                          {isExpanded ? (
                            <ChevronUp className="w-3 h-3" />
                          ) : (
                            <ChevronDown className="w-3 h-3" />
                          )}
                        </button>
                      ) : (
                        <span />
                      )}

                      {/* Demo helper to simulate teacher response if still pending */}
                      {isPending && (
                        <button
                          type="button"
                          onClick={() => handleSimulateResponse(ticket)}
                          className="text-[10px] font-bold text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100 px-2.5 py-1 rounded-lg border border-teal-200 transition cursor-pointer"
                          title="Simulate teacher replying to this doubt"
                        >
                          ⚡ Demo: Simulate Teacher Reply
                        </button>
                      )}
                    </div>

                    {/* Expanded AI transcript */}
                    {isExpanded && ticket.aiChatSnippet && (
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] space-y-1.5 max-h-36 overflow-y-auto">
                        <span className="font-bold text-slate-400 uppercase text-[9px] block">
                          AI Chat Transcript Forwarded to Teacher:
                        </span>
                        {ticket.aiChatSnippet.map((s, idx) => (
                          <div key={idx} className="flex gap-2 leading-relaxed">
                            <span className="font-bold text-slate-600 shrink-0">
                              {s.sender === 'student' ? 'Aarav:' : 'AI Tutor:'}
                            </span>
                            <span className="text-slate-700">{s.text}</span>
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
      </div>
    </div>
  );
};
