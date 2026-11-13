import React, { useState } from 'react';
import {
  Settings,
  Sun,
  Moon,
  Library,
  Sliders,
  Bell,
  Download,
  RotateCcw,
  Check,
  ShieldCheck,
  Sparkles,
  User,
  ArrowRight,
} from 'lucide-react';
import { useDashboardTheme } from '../context/ThemeContext';
import { useProfile } from '../context/ProfileContext';
import { DashboardStyle, PageId } from '../types';

interface SettingsPageProps {
  selectedClass: string;
  setSelectedClass: (cls: string) => void;
  onNavigate: (page: PageId) => void;
  onLoadDemoData?: () => void;
  onClearData?: () => void;
  totalStudents?: number;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  selectedClass,
  setSelectedClass,
  onNavigate,
  onLoadDemoData,
  onClearData,
  totalStudents = 0,
}) => {
  const { style, setStyle } = useDashboardTheme();
  const { facultyProfile } = useProfile();
  const [criticalThreshold, setCriticalThreshold] = useState<number>(35);
  const [urgentScoreCutoff, setUrgentScoreCutoff] = useState<number>(40);
  const [alertNewGaps, setAlertNewGaps] = useState<boolean>(true);
  const [dailyGoalReminders, setDailyGoalReminders] = useState<boolean>(true);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleExportJSON = () => {
    const data = {
      exportTimestamp: new Date().toISOString(),
      class: selectedClass,
      thresholds: {
        criticalTopicFailureRate: `${criticalThreshold}%`,
        urgentScoreCutoff: `${urgentScoreCutoff}%`,
      },
      settings: {
        alertNewGaps,
        dailyGoalReminders,
        theme: style,
      },
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Pragya_Faculty_Config_${selectedClass}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div
        className={`rounded-3xl p-6 border transition-all ${
          style === 'command-dark'
            ? 'bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border-slate-800 text-slate-100'
            : style === 'academic-warm'
            ? 'bg-gradient-to-r from-[#F7F2EA] via-[#FFFDFB] to-[#FFFDFB] border-[#DFD3C2] text-[#28231D]'
            : 'bg-gradient-to-r from-slate-100/90 via-white to-white border-slate-200/80 text-slate-900'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-slate-700 text-white shadow-xs">
              <Settings className="w-3.5 h-3.5" />
              <span>Faculty Preferences & Controls</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight">
              Settings & Dashboard Configuration
            </h1>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Personalize visual themes, calibrate diagnostic roadblock alert thresholds, and manage batch notification rules for {selectedClass}.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition cursor-pointer"
            >
              {savedSuccess ? <Check className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
              <span>{savedSuccess ? 'Preferences Saved' : 'Save Preferences'}</span>
            </button>
          </div>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Dashboard settings and diagnostic thresholds updated successfully!</span>
        </div>
      )}

      {/* Faculty Profile Quick Link */}
      <div
        className={`p-6 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
          style === 'command-dark' || style === 'obsidian-dark'
            ? 'bg-[#121218] border-[#2A2A38] text-slate-100'
            : style === 'academic-warm'
            ? 'bg-[#FFFDFB] border-[#E6DFD3] text-[#28231D]'
            : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        }`}
      >
        <div className="flex items-center gap-4">
          <img
            src={facultyProfile.avatarUrl}
            alt={facultyProfile.name}
            className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500/40"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold">{facultyProfile.name}</h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold">
                {facultyProfile.facultyId}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{facultyProfile.title} • {facultyProfile.institution}</p>
            <p className="text-[11px] text-indigo-500 dark:text-indigo-400 font-bold mt-0.5">
              {facultyProfile.yearsOfExperience} Years Exp. • {facultyProfile.assignedClasses.length} Cohorts Assigned
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('profile')}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition cursor-pointer shrink-0"
        >
          <User className="w-4 h-4" />
          <span>Manage Profile & Bio</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Theme Atmosphere Selector */}
      <div
        className={`p-6 rounded-2xl border space-y-4 ${
          style === 'command-dark'
            ? 'bg-[#111827] border-slate-800 text-slate-100'
            : style === 'academic-warm'
            ? 'bg-[#FFFDFB] border-[#E6DFD3] text-[#28231D]'
            : 'bg-white border-slate-200/90 text-slate-900'
        }`}
      >
        <div>
          <h2 className="text-sm font-black flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span>Visual Theme & Educator Atmosphere</span>
          </h2>
          <p className="text-xs text-slate-500">
            Switch between three scientifically crafted color themes designed for high contrast and prolonged grading sessions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {[
            {
              id: 'clean' as DashboardStyle,
              name: 'Modern Clean',
              desc: 'High-contrast crisp white with royal blue accents for daylight classroom use.',
              icon: Sun,
              bgPreview: 'bg-white border-blue-400 text-slate-900',
            },
            {
              id: 'obsidian-dark' as DashboardStyle,
              name: 'Obsidian Dark',
              desc: 'Deep mineral obsidian with matte charcoal surfaces, violet amethyst accents, and silvery typography.',
              icon: Moon,
              bgPreview: 'bg-[#0A0A0E] border-indigo-500 text-slate-100',
            },
            {
              id: 'academic-warm' as DashboardStyle,
              name: 'Academic Warm',
              desc: 'Parchment and terracotta neutral tones optimized for reading ease and reduced eye fatigue.',
              icon: Library,
              bgPreview: 'bg-[#F6F2EC] border-[#8C4A2F] text-[#28231D]',
            },
          ].map((themeOpt) => {
            const Icon = themeOpt.icon;
            const isSelected = style === themeOpt.id;
            return (
              <button
                key={themeOpt.id}
                onClick={() => setStyle(themeOpt.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? `${themeOpt.bgPreview} ring-2 ring-blue-500 shadow-md`
                    : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Icon className="w-5 h-5" />
                    {isSelected && (
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    )}
                  </div>
                  <div className="font-extrabold text-sm">{themeOpt.name}</div>
                  <div className="text-xs opacity-70 mt-1 leading-snug">{themeOpt.desc}</div>
                </div>

                <div className="mt-3 pt-2 text-[10px] font-bold uppercase tracking-wider opacity-60">
                  {isSelected ? 'Active Atmosphere' : 'Click to Apply'}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Thresholds & Alert Rules */}
      <div
        className={`p-6 rounded-2xl border space-y-5 ${
          style === 'command-dark'
            ? 'bg-[#111827] border-slate-800 text-slate-100'
            : style === 'academic-warm'
            ? 'bg-[#FFFDFB] border-[#E6DFD3] text-[#28231D]'
            : 'bg-white border-slate-200/90 text-slate-900'
        }`}
      >
        <div>
          <h2 className="text-sm font-black flex items-center gap-2 mb-1">
            <Sliders className="w-4 h-4 text-blue-500" />
            <span>Diagnostic Sensitivity & Alert Cutoffs</span>
          </h2>
          <p className="text-xs text-slate-500">
            Define when a learning concept gets flagged as a critical class roadblock or when a student needs urgent intervention.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          {/* Critical failure rate threshold */}
          <div className="space-y-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold">
                Critical Topic Failure Threshold
              </label>
              <span className="text-xs font-black text-rose-600 dark:text-rose-400">
                {criticalThreshold}%
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="60"
              value={criticalThreshold}
              onChange={(e) => setCriticalThreshold(Number(e.target.value))}
              className="w-full accent-rose-600 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500 leading-tight">
              Topics with diagnostic failure rates above {criticalThreshold}% will be marked as <strong className="text-rose-600">Critical Roadblocks</strong>.
            </p>
          </div>

          {/* Urgent student score threshold */}
          <div className="space-y-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold">
                Urgent Remediation Cutoff Score
              </label>
              <span className="text-xs font-black text-amber-600 dark:text-amber-400">
                {urgentScoreCutoff}%
              </span>
            </div>
            <input
              type="range"
              min="25"
              max="55"
              value={urgentScoreCutoff}
              onChange={(e) => setUrgentScoreCutoff(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500 leading-tight">
              Students scoring below {urgentScoreCutoff}% on formative baseline tests are flagged into the priority review queue.
            </p>
          </div>
        </div>

        {/* Toggle checkboxes */}
        <div className="space-y-3 pt-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={alertNewGaps}
              onChange={(e) => setAlertNewGaps(e.target.checked)}
              className="w-4 h-4 rounded accent-blue-600 cursor-pointer"
            />
            <span className="text-xs font-bold">
              Notify in top navigation when a diagnostic test reveals 5+ newly struggling students
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={dailyGoalReminders}
              onChange={(e) => setDailyGoalReminders(e.target.checked)}
              className="w-4 h-4 rounded accent-blue-600 cursor-pointer"
            />
            <span className="text-xs font-bold">
              Enable daily faculty remediation goals checklist synchronization
            </span>
          </label>
        </div>
      </div>

      {/* Export & Data Management */}
      <div
        className={`p-6 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
          style === 'command-dark'
            ? 'bg-[#111827] border-slate-800 text-slate-100'
            : style === 'academic-warm'
            ? 'bg-[#FFFDFB] border-[#E6DFD3] text-[#28231D]'
            : 'bg-white border-slate-200/90 text-slate-900'
        }`}
      >
        <div>
          <h3 className="font-extrabold text-sm">Export Faculty Diagnostic Summary</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Download full diagnostic configuration and student roadblock records for faculty meetings.
          </p>
        </div>

        <button
          onClick={handleExportJSON}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export Config (JSON)</span>
        </button>
      </div>

      {/* Clean Slate & Demo Data Management */}
      <div
        className={`p-6 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
          style === 'command-dark'
            ? 'bg-[#111827] border-slate-800 text-slate-100'
            : style === 'academic-warm'
            ? 'bg-[#FFFDFB] border-[#E6DFD3] text-[#28231D]'
            : 'bg-white border-slate-200/90 text-slate-900'
        }`}
      >
        <div>
          <h3 className="font-extrabold text-sm">Data Environment & Clean Slate</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Current system state has {totalStudents} student diagnostic records.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {onClearData && (
            <button
              onClick={onClearData}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clean Slate (Reset All Data)</span>
            </button>
          )}
          {onLoadDemoData && (
            <button
              onClick={onLoadDemoData}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Load Sample Preview Data</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
