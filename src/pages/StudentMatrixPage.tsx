import React, { useState } from 'react';
import {
  Table2,
  Plus,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Search,
  Sparkles,
  Download,
} from 'lucide-react';
import { StudentGapsTable } from '../components/StudentGapsTable';
import { ClassSubjectSelector } from '../components/ClassSubjectSelector';
import { useDashboardTheme } from '../context/ThemeContext';
import {
  Subject,
  StudentGapRecord,
  RemediationStatus,
  PageId,
} from '../types';

interface StudentMatrixPageProps {
  selectedClass: string;
  setSelectedClass: (cls: string) => void;
  selectedSubject: Subject;
  setSelectedSubject: (subj: Subject) => void;
  students: StudentGapRecord[];
  onSelectStudent: (student: StudentGapRecord) => void;
  onToggleStatus: (studentId: string, nextStatus: RemediationStatus) => void;
  onOpenAddModal: () => void;
  onNavigate: (page: PageId) => void;
}

export const StudentMatrixPage: React.FC<StudentMatrixPageProps> = ({
  selectedClass,
  setSelectedClass,
  selectedSubject,
  setSelectedSubject,
  students,
  onSelectStudent,
  onToggleStatus,
  onOpenAddModal,
  onNavigate,
}) => {
  const { style } = useDashboardTheme();
  const [filterTopic, setFilterTopic] = useState<string | null>(null);

  // Quick count calculations
  const total = students.length;
  const notFixedCount = students.filter((s) => s.fixedStatus === 'Not Fixed').length;
  const inProgressCount = students.filter((s) => s.fixedStatus === 'In Progress').length;
  const fixedCount = students.filter((s) => s.fixedStatus === 'Fixed').length;
  const passRate = total > 0 ? Math.round((fixedCount / total) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div
        className={`rounded-3xl p-6 border transition-all ${
          style === 'obsidian-dark' || style === 'command-dark'
            ? 'bg-gradient-to-r from-blue-950/40 via-[#121218] to-[#121218] border-blue-900/40 text-slate-100'
            : style === 'academic-warm'
            ? 'bg-gradient-to-r from-[#F0ECE1] via-[#FFFDFB] to-[#FFFDFB] border-[#DFD3C2] text-[#28231D]'
            : 'bg-gradient-to-r from-blue-50/90 via-white to-white border-blue-200/80 text-slate-900'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-blue-600 text-white shadow-xs">
              <Table2 className="w-3.5 h-3.5" />
              <span>Diagnostic Roster & Remediation Action</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight">
              Student Mastery Matrix
            </h1>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Track real-time remediation status across all students in {selectedClass}. Update status
              from <strong className="text-rose-600 dark:text-rose-400">Needs Help</strong> to{' '}
              <strong className="text-amber-600 dark:text-amber-400">Reviewing</strong> and{' '}
              <strong className="text-emerald-600 dark:text-emerald-400">Fixed</strong> as students clear diagnostic re-assessments.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={onOpenAddModal}
              id="add-gap-btn-page"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Log Student Gap</span>
            </button>
          </div>
        </div>

        {/* Quick Summary Pill Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-inherit">
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              Total Roster Flagged
            </div>
            <div className="text-lg font-black text-slate-900 dark:text-slate-100">{total} Students</div>
          </div>

          <div className="p-2.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/40">
            <div className="text-[11px] font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              <span>Needs Help</span>
            </div>
            <div className="text-lg font-black text-rose-600 dark:text-rose-400">{notFixedCount}</div>
          </div>

          <div className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40">
            <div className="text-[11px] font-semibold text-amber-800 dark:text-amber-300 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>In Remediation</span>
            </div>
            <div className="text-lg font-black text-amber-600 dark:text-amber-400">{inProgressCount}</div>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40">
            <div className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Fixed / Cleared</span>
            </div>
            <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">
              {fixedCount} ({passRate}%)
            </div>
          </div>
        </div>
      </div>

      {/* Select Class & Choose Subject */}
      <ClassSubjectSelector
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
      />

      {/* Main Student Gaps Table */}
      <StudentGapsTable
        students={students}
        selectedSubject={selectedSubject}
        filterTopic={filterTopic}
        onSelectStudent={onSelectStudent}
        onToggleStatus={onToggleStatus}
        onOpenAddModal={onOpenAddModal}
      />
    </div>
  );
};
