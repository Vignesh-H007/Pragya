import React, { useState, useMemo } from 'react';
import {
  AlertTriangle,
  Clock,
  Phone,
  MessageCircle,
  Bell,
  ShieldAlert,
  CheckCircle2,
  Send,
  UserCheck,
  AlertOctagon,
  Search,
  ArrowUpDown,
  Filter,
  Check,
  ExternalLink,
  ChevronRight,
  Activity,
  Calendar,
} from 'lucide-react';
import { useDashboardTheme } from '../../context/ThemeContext';
import {
  MOCK_INACTIVE_AT_RISK_STUDENTS,
  InactiveAtRiskStudent,
} from '../../data/teacherDashboardData';

interface InactiveStudentsAtRiskAlertProps {
  selectedClass: string;
}

export const InactiveStudentsAtRiskAlert: React.FC<InactiveStudentsAtRiskAlertProps> = ({
  selectedClass,
}) => {
  const { style } = useDashboardTheme();
  const isDark = style === 'obsidian-dark' || style === 'command-dark';

  const [students, setStudents] = useState<InactiveAtRiskStudent[]>(
    MOCK_INACTIVE_AT_RISK_STUDENTS
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<'all' | 'critical' | 'high'>('all');
  const [nudgedStatus, setNudgedStatus] = useState<Record<string, boolean>>({});
  const [batchNudgeSuccess, setBatchNudgeSuccess] = useState(false);
  const [parentContactStatus, setParentContactStatus] = useState<Record<string, string>>({});
  const [counselorFlags, setCounselorFlags] = useState<Record<string, boolean>>({});

  // Theme-aware color grading and styling engine
  const themeGrading = useMemo(() => {
    switch (style) {
      case 'editorial-command':
        return {
          themeName: 'Editorial Command',
          paletteLabel: 'Sandstone, Spruce & Terracotta Grading',
          containerBg: 'bg-[#FAF7F0] border-[#DDD4C7] text-[#1C232B]',
          cardBg: 'bg-white/90 border-[#DDD4C7] hover:border-[#C85340]/60 shadow-xs',
          cardHeaderBg: 'bg-[#F4EFEA] border-[#DDD4C7]',
          subPanelBg: 'bg-[#F7F3EC] border-[#DDD4C7]',
          accentText: 'text-[#246257]',
          filterActive: 'bg-[#246257] text-white shadow-xs',
          filterInactive: 'text-[#5C6670] hover:text-[#1C232B]',
          primaryBtn: 'bg-[#C85340] hover:bg-[#A83D2D] text-white shadow-xs',
          secondaryBtn: 'border-[#DDD4C7] bg-[#F4EFEA] text-[#1C232B] hover:bg-[#EDE5D8]',
          inputBg: 'bg-white border-[#DDD4C7] text-[#1C232B] placeholder-[#8A8276]',
          urgentPill: 'bg-[#C85340] text-white',
          milestoneBox: 'bg-[#C85340]/10 border-[#C85340]/25 text-[#28231D]',
          contextBox: 'bg-[#F4EFEA] border-[#DDD4C7] text-[#5C6670]',
          parentBox: 'bg-[#246257]/8 border-[#246257]/20 text-[#1C232B]',
          getRiskBadge: (level: 'critical' | 'high' | 'moderate') => {
            if (level === 'critical') {
              return {
                badge: 'bg-[#C85340]/15 text-[#9E3625] border-[#C85340]/35',
                dot: 'bg-[#C85340]',
                bar: '#C85340',
                label: 'Critical Risk',
              };
            }
            if (level === 'high') {
              return {
                badge: 'bg-[#D97706]/15 text-[#B45309] border-[#D97706]/35',
                dot: 'bg-[#D97706]',
                bar: '#D97706',
                label: 'High Risk',
              };
            }
            return {
              badge: 'bg-[#246257]/15 text-[#246257] border-[#246257]/35',
              dot: 'bg-[#246257]',
              bar: '#246257',
              label: 'Moderate Risk',
            };
          },
        };

      case 'obsidian-dark':
      case 'command-dark':
        return {
          themeName: 'Obsidian Dark',
          paletteLabel: 'Obsidian Matte & Radiant Ruby-Emerald Grading',
          containerBg: 'bg-[#121218] border-[#262633] text-slate-100 shadow-xl',
          cardBg: 'bg-[#161622] border-[#262633] hover:border-rose-500/50 shadow-md',
          cardHeaderBg: 'bg-[#0E0E14] border-[#23232C]',
          subPanelBg: 'bg-[#0F0F16] border-[#20202C]',
          accentText: 'text-rose-400',
          filterActive: 'bg-rose-600 text-white shadow-xs',
          filterInactive: 'text-slate-400 hover:text-slate-200',
          primaryBtn: 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30 shadow-xs',
          secondaryBtn: 'border-[#262633] bg-[#1A1A26] text-slate-200 hover:bg-[#202030]',
          inputBg: 'bg-[#0E0E14] border-[#2A2A38] text-slate-100 placeholder-slate-500',
          urgentPill: 'bg-rose-600 text-white shadow-rose-600/40 shadow-xs',
          milestoneBox: 'bg-rose-950/40 border-rose-800/50 text-rose-200',
          contextBox: 'bg-[#1A1A26] border-[#2A2A38] text-slate-300',
          parentBox: 'bg-indigo-950/40 border-indigo-800/40 text-slate-200',
          getRiskBadge: (level: 'critical' | 'high' | 'moderate') => {
            if (level === 'critical') {
              return {
                badge: 'bg-rose-950/80 text-rose-300 border-rose-700/60 shadow-xs',
                dot: 'bg-rose-500 shadow-rose-500/50 shadow-xs',
                bar: '#F43F5E',
                label: 'Critical Risk',
              };
            }
            if (level === 'high') {
              return {
                badge: 'bg-amber-950/80 text-amber-300 border-amber-700/60',
                dot: 'bg-amber-500',
                bar: '#F59E0B',
                label: 'High Risk',
              };
            }
            return {
              badge: 'bg-blue-950/80 text-blue-300 border-blue-700/60',
              dot: 'bg-blue-500',
              bar: '#3B82F6',
              label: 'Moderate Risk',
            };
          },
        };

      case 'academic-warm':
        return {
          themeName: 'Academic Warm',
          paletteLabel: 'Parchment, Terracotta & Sage Grading',
          containerBg: 'bg-[#FFFDFB] border-[#E6DFD3] text-[#28231D]',
          cardBg: 'bg-[#FAF7F2] border-[#E6DFD3] hover:border-[#9A3412] shadow-xs',
          cardHeaderBg: 'bg-[#F5EFE6] border-[#E6DFD3]',
          subPanelBg: 'bg-[#F9F5EE] border-[#E6DFD3]',
          accentText: 'text-[#9A3412]',
          filterActive: 'bg-[#8C4A2F] text-white shadow-xs',
          filterInactive: 'text-[#5C5346] hover:text-[#28231D]',
          primaryBtn: 'bg-[#8C4A2F] hover:bg-[#783E26] text-white shadow-xs',
          secondaryBtn: 'border-[#E6DFD3] bg-[#FAF7F2] text-[#28231D] hover:bg-[#EFE8DC]',
          inputBg: 'bg-white border-[#E6DFD3] text-[#28231D] placeholder-[#8A7F70]',
          urgentPill: 'bg-[#9A3412] text-white',
          milestoneBox: 'bg-[#9A3412]/10 border-[#9A3412]/25 text-[#28231D]',
          contextBox: 'bg-[#F5EFE6] border-[#E6DFD3] text-[#5C5346]',
          parentBox: 'bg-[#15803D]/8 border-[#15803D]/20 text-[#28231D]',
          getRiskBadge: (level: 'critical' | 'high' | 'moderate') => {
            if (level === 'critical') {
              return {
                badge: 'bg-[#9A3412]/15 text-[#9A3412] border-[#9A3412]/30',
                dot: 'bg-[#9A3412]',
                bar: '#9A3412',
                label: 'Critical Risk',
              };
            }
            if (level === 'high') {
              return {
                badge: 'bg-[#B45309]/15 text-[#B45309] border-[#B45309]/30',
                dot: 'bg-[#B45309]',
                bar: '#B45309',
                label: 'High Risk',
              };
            }
            return {
              badge: 'bg-[#15803D]/15 text-[#15803D] border-[#15803D]/30',
              dot: 'bg-[#15803D]',
              bar: '#15803D',
              label: 'Moderate Risk',
            };
          },
        };

      case 'clean':
      default:
        return {
          themeName: 'Modern Pedagogic',
          paletteLabel: 'Daylight Blue, Rose & Emerald Grading',
          containerBg: 'bg-white border-slate-200 text-slate-900 shadow-xs',
          cardBg: 'bg-white border-slate-200 hover:border-rose-400 shadow-xs',
          cardHeaderBg: 'bg-slate-50 border-slate-200',
          subPanelBg: 'bg-slate-50 border-slate-200/80',
          accentText: 'text-rose-600',
          filterActive: 'bg-rose-600 text-white shadow-xs',
          filterInactive: 'text-slate-600 hover:text-slate-900',
          primaryBtn: 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs',
          secondaryBtn: 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100',
          inputBg: 'bg-white border-slate-200 text-slate-900 placeholder-slate-400',
          urgentPill: 'bg-rose-600 text-white',
          milestoneBox: 'bg-rose-50 border-rose-200 text-rose-950',
          contextBox: 'bg-slate-50 border-slate-200 text-slate-700',
          parentBox: 'bg-indigo-50 border-indigo-200 text-indigo-950',
          getRiskBadge: (level: 'critical' | 'high' | 'moderate') => {
            if (level === 'critical') {
              return {
                badge: 'bg-rose-100 text-rose-800 border-rose-200',
                dot: 'bg-rose-500',
                bar: '#E11D48',
                label: 'Critical Risk',
              };
            }
            if (level === 'high') {
              return {
                badge: 'bg-amber-100 text-amber-800 border-amber-200',
                dot: 'bg-amber-500',
                bar: '#F59E0B',
                label: 'High Risk',
              };
            }
            return {
              badge: 'bg-blue-100 text-blue-800 border-blue-200',
              dot: 'bg-blue-500',
              bar: '#3B82F6',
              label: 'Moderate Risk',
            };
          },
        };
    }
  }, [style]);

  const handlePushNudge = (id: string) => {
    setNudgedStatus((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setNudgedStatus((prev) => ({ ...prev, [id]: false }));
    }, 4000);
  };

  const handleBatchNudge = () => {
    students.forEach((s) => {
      setNudgedStatus((prev) => ({ ...prev, [s.id]: true }));
    });
    setBatchNudgeSuccess(true);
    setTimeout(() => {
      setBatchNudgeSuccess(false);
      students.forEach((s) => {
        setNudgedStatus((prev) => ({ ...prev, [s.id]: false }));
      });
    }, 4000);
  };

  const handleParentAlert = (id: string, channel: 'sms' | 'whatsapp' | 'call') => {
    const statusText =
      channel === 'whatsapp'
        ? 'WhatsApp Alert Sent'
        : channel === 'sms'
        ? 'SMS Notice Dispatched'
        : 'Call Logged';
    setParentContactStatus((prev) => ({ ...prev, [id]: statusText }));
  };

  const toggleCounselor = (id: string) => {
    setCounselorFlags((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const criticalCount = students.filter((s) => s.riskLevel === 'critical').length;
  const highCount = students.filter((s) => s.riskLevel === 'high').length;

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchesRisk = riskFilter === 'all' || s.riskLevel === riskFilter;
      const matchesSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.academicLagReason.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRisk && matchesSearch;
    });
  }, [students, riskFilter, searchQuery]);

  return (
    <section
      id="inactive-students-at-risk-alert"
      aria-label="Students Who Haven't Logged In (At-Risk Alert)"
      className={`rounded-2xl p-5 sm:p-6 border transition-all duration-200 ${themeGrading.containerBg}`}
    >
      {/* 1. Header & Priority Warning Ribbon */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5 pb-5 border-b border-inherit">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
            <span className={`p-2 rounded-xl border ${themeGrading.cardHeaderBg} ${themeGrading.accentText}`}>
              <ShieldAlert className="w-4 h-4 stroke-[2.4]" />
            </span>
            <h2 className="text-lg sm:text-xl font-black tracking-tight">
              Students Who Haven&apos;t Logged In (At-Risk Alert)
            </h2>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider ${themeGrading.urgentPill}`}
            >
              {criticalCount} Critical Inactive (&gt;5 Days)
            </span>
            <span className="text-[11px] font-mono font-medium opacity-70 px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
              {themeGrading.paletteLabel}
            </span>
          </div>
          <p className="text-xs sm:text-sm opacity-80 max-w-3xl leading-relaxed">
            Real-time dropout and conceptual regression sentinel. Flags learners with zero Pragya diagnostic logins, missed milestones, and family/device connectivity roadblocks.
          </p>
        </div>

        {/* Action Counters & Nudge All Button */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 flex-wrap">
          <div className={`px-3 py-2 rounded-xl border text-center ${themeGrading.cardHeaderBg}`}>
            <div className="text-[10px] font-bold uppercase tracking-wider opacity-70">
              Total Inactive
            </div>
            <div className="text-base sm:text-lg font-black leading-tight">
              {students.length} Learners
            </div>
          </div>

          <div className={`px-3 py-2 rounded-xl border text-center ${themeGrading.cardHeaderBg}`}>
            <div className={`text-[10px] font-bold uppercase tracking-wider ${themeGrading.accentText}`}>
              Critical Escalations
            </div>
            <div className={`text-base sm:text-lg font-black leading-tight ${themeGrading.accentText}`}>
              {criticalCount} Flagged
            </div>
          </div>

          <button
            onClick={handleBatchNudge}
            disabled={batchNudgeSuccess}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs ${
              batchNudgeSuccess
                ? 'bg-emerald-600 text-white'
                : themeGrading.primaryBtn
            }`}
            title="Dispatch push notifications and SMS alert to all inactive student devices"
          >
            {batchNudgeSuccess ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Nudges Dispatched to All!</span>
              </>
            ) : (
              <>
                <Bell className="w-3.5 h-3.5" />
                <span>Nudge All Inactive Students</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Controls & Search Bar */}
      <div className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs border-b border-inherit">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 opacity-40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search student by name, roll number, or root cause..."
            className={`w-full pl-8 pr-3 py-1.5 rounded-xl border focus:outline-none focus:ring-1 focus:ring-rose-500 text-xs transition ${themeGrading.inputBg}`}
          />
        </div>

        {/* Risk Filter Tabs */}
        <div className="flex items-center rounded-xl p-0.5 border border-inherit bg-black/5 dark:bg-white/5">
          {(
            [
              { id: 'all', label: `All (${students.length})` },
              { id: 'critical', label: `Critical Risk (${criticalCount})` },
              { id: 'high', label: `High Risk (${highCount})` },
            ] as const
          ).map((filter) => (
            <button
              key={filter.id}
              onClick={() => setRiskFilter(filter.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                riskFilter === filter.id
                  ? themeGrading.filterActive
                  : themeGrading.filterInactive
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Inactive Student Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-4">
        {filteredStudents.length === 0 ? (
          <div className="col-span-full py-12 text-center opacity-60 font-semibold border rounded-2xl border-dashed border-inherit">
            No at-risk students match the current search or risk filter.
          </div>
        ) : (
          filteredStudents.map((student) => {
            const riskStyle = themeGrading.getRiskBadge(student.riskLevel);
            const isFlagged = counselorFlags[student.id] ?? student.counselorFlagged;
            const currentParentStatus =
              parentContactStatus[student.id] || student.parentAlertStatus;
            const isNudged = nudgedStatus[student.id];

            return (
              <div
                key={student.id}
                className={`rounded-2xl p-4 sm:p-5 border transition-all duration-200 flex flex-col justify-between ${themeGrading.cardBg}`}
              >
                <div>
                  {/* Top Student Identity & Risk Badge */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-inherit shrink-0 shadow-2xs"
                        />
                        <span
                          className={`w-3.5 h-3.5 rounded-full absolute -bottom-0.5 -right-0.5 border-2 ${
                            isDark ? 'border-[#161622]' : 'border-white'
                          } ${student.riskLevel === 'critical' ? 'bg-rose-500 animate-ping' : 'bg-amber-500'}`}
                        />
                        <span
                          className={`w-3.5 h-3.5 rounded-full absolute -bottom-0.5 -right-0.5 border-2 ${
                            isDark ? 'border-[#161622]' : 'border-white'
                          } ${student.riskLevel === 'critical' ? 'bg-rose-500' : 'bg-amber-500'}`}
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-black text-sm sm:text-base leading-tight">
                            {student.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5 text-xs opacity-75">
                          <span className="font-bold opacity-90">{student.rollNumber}</span>
                          <span>•</span>
                          <span>{student.classGrade}</span>
                          <span>•</span>
                          <span>{student.section}</span>
                        </div>
                      </div>
                    </div>

                    {/* Risk Badge with Days Inactive */}
                    <div className="text-right shrink-0">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${riskStyle.badge}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${riskStyle.dot}`} />
                        <span>{student.daysInactive} Days Inactive</span>
                      </span>
                      <div className="text-[10px] opacity-60 mt-1 flex items-center justify-end gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Last login: {student.lastLogin}</span>
                      </div>
                    </div>
                  </div>

                  {/* Attendance & Engagement Meter */}
                  <div className={`p-2.5 rounded-xl border mb-3 text-xs ${themeGrading.subPanelBg}`}>
                    <div className="flex items-center justify-between font-bold mb-1">
                      <span className="opacity-80">Practice Attendance Metric</span>
                      <span
                        className={`font-black ${
                          student.attendanceRate < 50
                            ? 'text-rose-600 dark:text-rose-400'
                            : 'text-amber-600 dark:text-amber-400'
                        }`}
                      >
                        {student.attendanceRate}% Participation
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${student.attendanceRate}%`,
                          backgroundColor: riskStyle.bar,
                        }}
                      />
                    </div>
                  </div>

                  {/* Critical Missed Milestones Box */}
                  <div className={`p-3 rounded-xl border mb-2.5 text-xs ${themeGrading.milestoneBox}`}>
                    <div className="font-bold flex items-center gap-1 mb-1.5 text-xs">
                      <AlertOctagon className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span>Critical Missed Milestones:</span>
                    </div>
                    <ul className="list-disc list-inside space-y-0.5 text-[11px] opacity-90 pl-1">
                      {student.missedMilestones.map((m, idx) => (
                        <li key={idx}>{m}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Root Cause Context Box */}
                  <div className={`p-2.5 rounded-xl border text-[11px] leading-relaxed mb-3 ${themeGrading.contextBox}`}>
                    <span className="font-bold opacity-90">Diagnosed Root Cause: </span>
                    <span className="opacity-80">{student.academicLagReason}</span>
                  </div>

                  {/* Parent Contact Info Ribbon */}
                  <div className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs mb-3 ${themeGrading.parentBox}`}>
                    <div>
                      <div className="font-bold">
                        Guardian: {student.parentName}
                      </div>
                      <div className="text-[11px] opacity-75 font-mono">
                        Phone: {student.parentPhone}
                      </div>
                      <div className="text-[10px] font-bold text-amber-600 dark:text-amber-400 mt-0.5">
                        Status: {currentParentStatus}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleParentAlert(student.id, 'whatsapp')}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1 transition cursor-pointer shadow-2xs"
                        title="Send WhatsApp attendance reminder to parent"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>WhatsApp</span>
                      </button>
                      <button
                        onClick={() => handleParentAlert(student.id, 'sms')}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1 transition cursor-pointer shadow-2xs"
                        title="Send SMS notification to parent"
                      >
                        <Send className="w-3 h-3" />
                        <span>SMS</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-3 border-t border-inherit flex items-center justify-between gap-2 text-xs">
                  <button
                    onClick={() => handlePushNudge(student.id)}
                    className={`flex-1 py-1.5 px-3 rounded-xl font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                      isNudged
                        ? 'bg-emerald-600 text-white'
                        : themeGrading.primaryBtn
                    }`}
                  >
                    {isNudged ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Nudge Dispatched!</span>
                      </>
                    ) : (
                      <>
                        <Bell className="w-3.5 h-3.5" />
                        <span>Send App Nudge</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => toggleCounselor(student.id)}
                    className={`py-1.5 px-3 rounded-xl font-bold border transition flex items-center gap-1 cursor-pointer ${
                      isFlagged
                        ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/40'
                        : themeGrading.secondaryBtn
                    }`}
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>{isFlagged ? 'Counselor Flagged' : 'Flag for Counselor'}</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
