import React, { useState, useEffect } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  X,
  UserCheck,
} from 'lucide-react';
import { EscalationTicket, StudentAgeTier } from '../../types';
import { getEscalationTickets } from '../../utils/escalationStore';

interface StudentEscalationBannerProps {
  tier: StudentAgeTier;
  onOpenEscalations: () => void;
}

export const StudentEscalationBanner: React.FC<StudentEscalationBannerProps> = ({
  tier,
  onOpenEscalations,
}) => {
  const [tickets, setTickets] = useState<EscalationTicket[]>(() => getEscalationTickets());
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setTickets(getEscalationTickets());
    };
    window.addEventListener('pragya_escalation_updated', handleUpdate);
    return () => window.removeEventListener('pragya_escalation_updated', handleUpdate);
  }, []);

  if (dismissed) return null;

  const repliedTicket = tickets.find((t) => t.status === 'Teacher Responded');
  const pendingTickets = tickets.filter((t) => t.status === 'Pending Review');

  if (!repliedTicket && pendingTickets.length === 0) return null;

  return (
    <div
      onClick={onOpenEscalations}
      className={`p-3.5 sm:p-4 rounded-3xl border transition-all cursor-pointer shadow-xs flex items-center justify-between gap-3 ${
        repliedTicket
          ? 'bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100/70 border-emerald-300 text-emerald-950 hover:shadow-md'
          : 'bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 border-amber-300 text-amber-950 hover:shadow-md'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg shrink-0 shadow-xs ${
            repliedTicket ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-200 text-amber-900'
          }`}
        >
          {repliedTicket ? '🎉' : '🙋‍♂️'}
        </div>

        <div className="leading-tight">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-black">
              {repliedTicket
                ? `${repliedTicket.teacherName} replied to your doubt!`
                : `${pendingTickets.length} Doubt${
                    pendingTickets.length > 1 ? 's' : ''
                  } Escalated to Teacher`}
            </span>
            <span
              className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                repliedTicket
                  ? 'bg-emerald-200 text-emerald-900'
                  : 'bg-amber-200 text-amber-900'
              }`}
            >
              {repliedTicket ? 'Reply Available' : 'Under Review'}
            </span>
          </div>

          <p className="text-[11px] opacity-80 mt-0.5 line-clamp-1">
            {repliedTicket
              ? `Topic: ${repliedTicket.topic} — Click to read teacher's explanation.`
              : `Topic: ${pendingTickets[0].topic} • Forwarded to ${pendingTickets[0].teacherName}.`}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenEscalations();
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-black shadow-xs transition flex items-center gap-1 cursor-pointer ${
            repliedTicket
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : 'bg-amber-500 hover:bg-amber-600 text-white'
          }`}
        >
          <span>{repliedTicket ? 'View Reply' : 'Track Status'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setDismissed(true);
          }}
          className="p-1 rounded-full text-slate-400 hover:text-slate-600 transition cursor-pointer"
          title="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
