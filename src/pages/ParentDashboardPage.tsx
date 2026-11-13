import React, { useState } from 'react';
import {
  Calendar,
  Sparkles,
  Bell,
  Home,
  TrendingUp,
  BookOpen,
  Sliders,
  Clock,
  Check,
  Award,
  ChevronDown,
  ChevronUp,
  Download,
  GraduationCap,
  MessageSquare,
  Send,
  CheckCircle2,
  Volume2,
  Play,
  Pause,
  LogOut,
  Lightbulb,
  Heart,
  Share2,
  X,
  Compass,
  ArrowRight,
  ChevronRight,
  Trophy,
  Flame,
  User,
  Star,
  Rocket,
  Smile,
  ThumbsUp,
  BellRing,
} from 'lucide-react';

interface ParentDashboardPageProps {
  onSwitchRole: () => void;
}

export const ParentDashboardPage: React.FC<ParentDashboardPageProps> = ({
  onSwitchRole,
}) => {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<'overview' | 'reports' | 'syllabus' | 'settings'>('overview');

  // Interactive state
  const [cheerModalOpen, setCheerModalOpen] = useState(false);
  const [cheerSentToast, setCheerSentToast] = useState<string | null>(null);
  const [messageTeacherOpen, setMessageTeacherOpen] = useState(false);
  const [teacherMessage, setTeacherMessage] = useState('');
  const [teacherMsgSent, setTeacherMsgSent] = useState(false);
  const [playingAudio, setPlayingAudio] = useState(false);
  const [dinnertimeAcknowledged, setDinnertimeAcknowledged] = useState(false);
  const [pdfSummaryModalOpen, setPdfSummaryModalOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState<'aarav' | 'ananya'>('aarav');
  const [childDropdownOpen, setChildDropdownOpen] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Available Cheer stickers
  const cheerStickers = [
    { id: 'c1', label: 'Proud of you, superstar!', icon: Star },
    { id: 'c2', label: 'Awesome job on Fractions!', icon: Sparkles },
    { id: 'c3', label: 'Keep up the curious spirit!', icon: Rocket },
    { id: 'c4', label: 'Take a joyful break & stretch!', icon: Smile },
    { id: 'c5', label: 'Sending hugs & high fives!', icon: ThumbsUp },
  ];

  const handleSendCheer = (cheerText: string) => {
    setCheerModalOpen(false);
    setCheerSentToast(`Cheer sent to Aarav: "${cheerText}"`);
    setTimeout(() => setCheerSentToast(null), 4000);
  };

  const handleSendMessageToTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherMessage.trim()) return;
    setTeacherMsgSent(true);
    setTimeout(() => {
      setMessageTeacherOpen(false);
      setTeacherMsgSent(false);
      setTeacherMessage('');
      setCheerSentToast('Message sent to Ms. Shalini Roy! She usually responds within 2 hours.');
      setTimeout(() => setCheerSentToast(null), 4000);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex bg-[#FAFBFD] font-sans text-slate-800">
      {/* Toast Notification */}
      {cheerSentToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2.5 animate-in slide-in-from-bottom-5 duration-200">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{cheerSentToast}</span>
        </div>
      )}

      {/* ================= 1. LEFT SIDEBAR ================= */}
      <aside className="w-64 shrink-0 border-r border-slate-200/80 bg-white flex flex-col justify-between p-4 min-h-screen sticky top-0 hidden lg:flex">
        <div className="space-y-6">
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5 px-2 pt-1">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1 leading-none">
                <span className="text-base font-black text-[#A1510C] tracking-tight">
                  Pragya
                </span>
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600 block mt-0.5">
                PARENT PORTAL
              </span>
            </div>
          </div>

          {/* Child Profile Switcher Card */}
          <div className="relative">
            <div
              onClick={() => setChildDropdownOpen(!childDropdownOpen)}
              className="p-2.5 rounded-2xl bg-[#F4F6F9] hover:bg-[#EEF1F6] border border-slate-200/80 transition-all cursor-pointer flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                  {selectedChild === 'aarav' ? 'A' : 'A'}
                </div>
                <div className="leading-tight">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-slate-800">
                      {selectedChild === 'aarav' ? 'Aarav' : 'Ananya'}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500">
                      {selectedChild === 'aarav' ? 'Class 7' : 'Class 4'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-0.5">
                    <GraduationCap className="w-2.5 h-2.5 text-slate-400" />
                    <span className="truncate max-w-[110px]">Oakridge Int&apos;l School</span>
                  </div>
                </div>
              </div>
              {childDropdownOpen ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </div>

            {/* Child switcher dropdown */}
            {childDropdownOpen && (
              <div className="absolute top-full mt-1.5 left-0 right-0 bg-white border border-slate-200 rounded-2xl shadow-xl p-1.5 z-40 space-y-1">
                <button
                  onClick={() => {
                    setSelectedChild('aarav');
                    setChildDropdownOpen(false);
                  }}
                  className={`w-full text-left p-2 rounded-xl text-xs font-bold flex items-center justify-between ${
                    selectedChild === 'aarav' ? 'bg-amber-50 text-amber-900' : 'hover:bg-slate-50'
                  }`}
                >
                  <span>Aarav (Class 7)</span>
                  {selectedChild === 'aarav' && <Check className="w-3.5 h-3.5 text-amber-600" />}
                </button>
                <button
                  onClick={() => {
                    setSelectedChild('ananya');
                    setChildDropdownOpen(false);
                  }}
                  className={`w-full text-left p-2 rounded-xl text-xs font-bold flex items-center justify-between ${
                    selectedChild === 'ananya' ? 'bg-amber-50 text-amber-900' : 'hover:bg-slate-50'
                  }`}
                >
                  <span>Ananya (Class 4)</span>
                  {selectedChild === 'ananya' && <Check className="w-3.5 h-3.5 text-amber-600" />}
                </button>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#A1510C] text-white shadow-md shadow-[#A1510C]/20'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Home className="w-4 h-4 shrink-0" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'reports'
                  ? 'bg-[#A1510C] text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <TrendingUp className="w-4 h-4 shrink-0" />
              <span>Report Card &amp; Insights</span>
            </button>

            <button
              onClick={() => setActiveTab('syllabus')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'syllabus'
                  ? 'bg-[#A1510C] text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>Class Work &amp; Syllabus</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-[#A1510C] text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Sliders className="w-4 h-4 shrink-0" />
              <span>Settings &amp; Alerts</span>
            </button>
          </nav>
        </div>

        {/* Bottom Sidebar Cards */}
        <div className="space-y-3 pt-4 border-t border-slate-200/80">
          {/* Parent Support Card */}
          <div
            onClick={() => setSupportModalOpen(true)}
            className="p-3 rounded-2xl bg-[#CCFBF1]/80 hover:bg-[#CCFBF1] border border-emerald-300/80 transition-all cursor-pointer flex items-center justify-between gap-2 shadow-2xs"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <MessageSquare className="w-3.5 h-3.5" />
              </div>
              <div className="leading-tight">
                <span className="text-xs font-bold text-emerald-950 block">
                  Parent Support
                </span>
                <span className="text-[10px] text-emerald-800">
                  Quick Question &amp; Chat
                </span>
              </div>
            </div>
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
          </div>

          {/* User Profile & Role Switch */}
          <div className="p-2.5 rounded-2xl bg-[#F8FAFC] border border-slate-200/70 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-rose-100 border border-rose-200 flex items-center justify-center font-bold text-xs text-rose-800 shrink-0">
                <User className="w-4 h-4 text-rose-700" />
              </div>
              <div className="leading-tight min-w-0">
                <span className="text-xs font-bold text-slate-800 truncate block">
                  Priya Sharma
                </span>
                <span className="text-[10px] text-slate-400 block truncate">
                  Signed in as Parent
                </span>
              </div>
            </div>

            <button
              onClick={onSwitchRole}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition cursor-pointer"
              title="Switch Role"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ================= 2. MAIN WORKSPACE ================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto pb-12">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4">
          {/* Left date, app brand and activity tag */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Upper Left Menu Navigation Button for Mobile */}
            <button
              onClick={() => setMobileSidebarOpen((prev) => !prev)}
              id="parent-upper-menu-toggle-btn"
              className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/90 shadow-xs flex flex-col items-center justify-center gap-1 transition-all duration-200 cursor-pointer active:scale-95 group focus:outline-none shrink-0"
              title="Navigation Menu"
              aria-label="Navigation Menu"
            >
              <span className="w-4 sm:w-5 h-[2.5px] bg-slate-600 rounded-full transition-colors" />
              <span className="w-4 sm:w-5 h-[2.5px] bg-slate-600 rounded-full transition-colors" />
              <span className="w-4 sm:w-5 h-[2.5px] bg-slate-600 rounded-full transition-colors" />
            </button>

            {/* App Brand & Logo in Mobile Navigation Bar */}
            <div className="flex items-center gap-2 sm:gap-2.5 lg:hidden min-w-0">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-xs shrink-0">
                <GraduationCap className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="text-base sm:text-lg font-black text-[#A1510C] tracking-tight leading-none">
                    Pragya
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/90 px-1.5 py-0.5 rounded border border-emerald-200 leading-none">
                    Parent
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-700">
              <Calendar className="w-4 h-4 text-slate-500" />
              <span>Thursday, October 24</span>
            </div>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#D1FAE5] text-emerald-800 border border-emerald-200/80">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Active in Science today</span>
            </span>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            {/* Mobile role switch */}
            <button
              onClick={onSwitchRole}
              className="lg:hidden text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full"
            >
              Switch Role
            </button>

            {/* Notification Bell */}
            <button
              onClick={() => {
                setCheerSentToast('Notifications: Aarav just completed 15 mins of Math practice!');
                setTimeout(() => setCheerSentToast(null), 3000);
              }}
              className="relative p-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition cursor-pointer shadow-2xs"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            </button>

            {/* Priya's Profile Avatar */}
            <div className="w-8 h-8 rounded-full bg-rose-100 border-2 border-rose-300 flex items-center justify-center text-sm shadow-xs">
              <User className="w-4 h-4 text-rose-700" />
            </div>
          </div>
        </header>

        {/* Content Container */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-[1400px] w-full mx-auto space-y-6">
          
          {/* ================= SECTION 1: HERO GROWTH BANNER ================= */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#EFF6FF] via-[#ECFDF5] to-[#FEF3C7] border border-emerald-200/60 p-6 md:p-8 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="max-w-xl space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-black tracking-wider uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                  <span>WEEKLY GROWTH SNAPSHOT • CLASS 7</span>
                </div>

                <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                  Welcome back, Priya! Here&apos;s how Aarav is doing this week.
                </h1>

                <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
                  Aarav is building steady learning habits and showing great curiosity in Science &amp; Math.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
                {/* Send Cheer to Aarav */}
                <button
                  onClick={() => setCheerModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#9A3412] hover:bg-[#832B0E] text-white text-xs font-black shadow-lg shadow-[#9A3412]/20 hover:shadow-[#9A3412]/30 transition-all cursor-pointer hover:scale-105"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Send Cheer to Aarav</span>
                </button>

                {/* Weekly Summary PDF */}
                <button
                  onClick={() => setPdfSummaryModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4 text-slate-500" />
                  <span>Weekly Summary PDF</span>
                </button>
              </div>
            </div>
          </div>

          {/* ================= SECTION 2: THREE METRIC CARDS (STACKED) ================= */}
          <div className="flex flex-col gap-4.5">
            {/* Card 1: Consistency - Daily Learning Streak */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    CONSISTENCY
                  </span>
                  <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                    <Flame className="w-4 h-4 text-orange-600" />
                  </div>
                </div>
                <h3 className="text-base font-black text-slate-900">
                  Daily Learning Streak
                </h3>

                <div className="flex items-baseline gap-2.5 pt-1">
                  <span className="text-3xl font-black text-slate-900">
                    6 <span className="text-sm font-bold text-slate-600">Days Active</span>
                  </span>
                  <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    +2 vs last week
                  </span>
                </div>
              </div>

              {/* Week Days Checklist (M T W T F S S) */}
              <div className="space-y-2 bg-slate-50/80 p-3 sm:px-4 sm:py-2.5 rounded-2xl border border-slate-100">
                <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-3">
                  {[
                    { day: 'M', checked: true },
                    { day: 'T', checked: true },
                    { day: 'W', checked: true },
                    { day: 'T', checked: true },
                    { day: 'F', checked: true },
                    { day: 'S', checked: true },
                    { day: 'S', checked: false, isWaiting: true },
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col items-center gap-1.5">
                      <span className="text-[10px] font-bold text-slate-400">{item.day}</span>
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-transform ${
                          item.checked
                            ? 'bg-[#A1510C] text-white shadow-xs'
                            : 'bg-slate-100 text-slate-400 border border-slate-200'
                        }`}
                      >
                        {item.checked ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : '⌛'}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-[11px] text-slate-500 font-medium text-center sm:text-right pt-0.5">
                  Sunday unlocks the &quot;Weekly Champion&quot; shield!
                </p>
              </div>
            </div>

            {/* Card 2: Study Focus - Time Spent Today */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    STUDY FOCUS
                  </span>
                  <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-base font-black text-slate-900">
                  Time Spent Today
                </h3>

                <div className="flex items-baseline gap-3 pt-1">
                  <div className="text-3xl font-black text-slate-900">
                    35 <span className="text-sm font-bold text-slate-600">mins</span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-500">
                    Weekly: 3 hrs 15 mins
                  </span>
                </div>
              </div>

              {/* Right Side: Radial Ring Badge & Badges */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 bg-slate-50/80 p-3 sm:px-4 sm:py-2.5 rounded-2xl border border-slate-100">
                {/* Radial Ring Badge */}
                <div className="relative w-12 h-12 rounded-full border-4 border-teal-500 flex items-center justify-center bg-teal-50 shadow-xs shrink-0">
                  <span className="text-[11px] font-black text-teal-800">116%</span>
                </div>

                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>Daily Target Met (30m)</span>
                  </div>
                  <span className="text-[11px] font-medium text-slate-500 block">
                    Recommended pace for Class 7
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Curriculum Quest - 4-Biome Syllabus Roadmap */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-1 flex-1 max-w-lg">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    CURRICULUM QUEST
                  </span>
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Compass className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-base font-black text-slate-900">
                  4-Biome Syllabus Roadmap
                </h3>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                    <span>Plains (Done) → Ocean (Active) → Nether → The End</span>
                  </span>
                  <span className="text-xs font-black text-amber-700">
                    5/12 Units Mastered
                  </span>
                </div>

                {/* 4 Segmented Biome Progress Bars */}
                <div className="grid grid-cols-4 gap-2 pt-1.5">
                  <div className="space-y-0.5">
                    <div className="h-2.5 rounded-full bg-emerald-600" />
                    <span className="text-[9px] font-bold text-emerald-800 block text-center">Plains (3/3)</span>
                  </div>
                  <div className="space-y-0.5">
                    <div className="h-2.5 rounded-full bg-sky-500" />
                    <span className="text-[9px] font-bold text-sky-800 block text-center">Ocean (2/3)</span>
                  </div>
                  <div className="space-y-0.5">
                    <div className="h-2.5 rounded-full bg-slate-200" />
                    <span className="text-[9px] font-bold text-slate-400 block text-center">Nether (0/3)</span>
                  </div>
                  <div className="space-y-0.5">
                    <div className="h-2.5 rounded-full bg-slate-200" />
                    <span className="text-[9px] font-bold text-slate-400 block text-center">The End (0/3)</span>
                  </div>
                </div>
              </div>

              {/* Next Reward Box */}
              <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center gap-3 shrink-0">
                <Trophy className="w-7 h-7 text-amber-500 shrink-0" />
                <div className="leading-tight text-xs">
                  <span className="font-bold text-amber-950 block">
                    Next Gateway: &quot;Nether Portal Key&quot;
                  </span>
                  <span className="text-[10px] text-amber-800">
                    1 more lesson in Ocean Chapter
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= SECTION 3: MILESTONES & TEACHER CONTACT ================= */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Left 8 Cols: Today's Learning Milestones */}
            <div className="xl:col-span-8 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">
                      Today&apos;s Learning Milestones
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Updated real-time as Aarav solves problems
                    </p>
                  </div>
                </div>

                <span className="text-xs font-black px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                  2 of 3 Completed
                </span>
              </div>

              {/* Milestone List */}
              <div className="space-y-4">
                {/* Milestone 1 */}
                <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/70 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <h4 className="text-xs font-black text-slate-900">
                        Finished Math Quiz: Intro to Fractions
                      </h4>
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium shrink-0">
                      15m ago
                    </span>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2 pl-8">
                    <span className="text-[10px] font-black px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                      Scored 9/10 (90%)
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>14 mins focused</span>
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 pl-8 leading-relaxed">
                    Aarav solved 4 word problems without hints! Mastered improper fractions.
                  </p>
                </div>

                {/* Milestone 2 */}
                <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/70 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <h4 className="text-xs font-black text-slate-900">
                        Read Chapter 3 of Science: Plant Nutrition
                      </h4>
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium shrink-0">
                      1h ago
                    </span>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2 pl-8">
                    <span className="text-[10px] font-black px-2.5 py-0.5 rounded-md bg-orange-100 text-orange-900">
                      2 Voice Notes Recorded
                    </span>
                    <span className="text-[10px] font-bold text-slate-500">
                      Aarav&apos;s summary available
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 pl-8 leading-relaxed">
                    Recorded a 35s explanation of chlorophyll in his own joyful words.
                  </p>

                  {/* Voice player simulator */}
                  <div className="pl-8 pt-1">
                    <button
                      onClick={() => setPlayingAudio(!playingAudio)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-2xs transition cursor-pointer"
                    >
                      {playingAudio ? (
                        <Pause className="w-3.5 h-3.5 text-amber-600" />
                      ) : (
                        <Play className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                      )}
                      <span>{playingAudio ? 'Playing Aarav\'s Voice Note (0:18)' : 'Listen to Aarav\'s Explanation (0:35)'}</span>
                      <Volume2 className="w-3.5 h-3.5 text-slate-400 ml-1" />
                    </button>
                  </div>
                </div>

                {/* Milestone 3: In Progress */}
                <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/70 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 border border-amber-300">
                        <span className="text-xs font-bold">⏳</span>
                      </div>
                      <h4 className="text-xs font-black text-slate-900">
                        English Vocabulary: Describing Nature
                      </h4>
                    </div>
                    <span className="text-[11px] font-black text-amber-700 px-2 py-0.5 rounded-full bg-amber-100 shrink-0">
                      In Progress
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="pl-8 space-y-1.5">
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden max-w-xs">
                      <div className="w-1/2 bg-amber-500 h-full rounded-full" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 block">
                      5 of 10 words remaining
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Scheduled for completion right before bedtime reading.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom footer note & schedule link */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
                <span className="text-slate-500 font-medium">
                  Aarav typically wraps up homework by 6:30 PM.
                </span>
                <button
                  onClick={() => setActiveTab('syllabus')}
                  className="inline-flex items-center gap-1 font-bold text-[#A1510C] hover:text-[#832B0E] transition cursor-pointer"
                >
                  <span>View Syllabus Schedule</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right 4 Cols: Teacher Contact Card & Quick Info */}
            <div className="xl:col-span-4 space-y-5">
              {/* Teacher Contact Card */}
              <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-teal-800 text-white font-black text-sm flex items-center justify-center shadow-sm">
                    MS
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900">
                      Ms. Shalini Roy
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Class Teacher &amp; Math Mentor
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setMessageTeacherOpen(true)}
                  className="px-3 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-900 text-xs font-black border border-teal-200 transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Message</span>
                </button>
              </div>

              {/* Weekly Subject Mastery Mini Radar */}
              <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  SUBJECT CONFIDENCE SNAPSHOT
                </span>
                <div className="space-y-2.5">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>Mathematics</span>
                      <span className="text-emerald-700">92% Mastery</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full rounded-full bg-emerald-500" style={{ width: '92%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>Science &amp; EVS</span>
                      <span className="text-teal-700">88% Mastery</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full rounded-full bg-teal-500" style={{ width: '88%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>English Reading</span>
                      <span className="text-indigo-700">85% Mastery</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full rounded-full bg-indigo-500" style={{ width: '85%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= SECTION 4: DINNERTIME CONVERSATION STARTER ================= */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-50/90 via-orange-50/80 to-rose-50/70 border border-amber-200/80 p-6 md:p-7 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 relative z-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-amber-200/70 text-amber-800 flex items-center justify-center shrink-0 text-lg shadow-xs">
                  <Lightbulb className="w-5 h-5 text-amber-800" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-900">
                      DINNERTIME CONVERSATION STARTER
                    </span>
                    <span className="text-[10px] text-amber-700 font-bold">• Zero Stress</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                    &quot;Aarav practiced fractions today—ask him about dividing a pizza tonight at dinner!&quot;
                  </h3>
                  <p className="text-xs text-slate-600">
                    Reinforce his learning organically without making it feel like an oral exam.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setDinnertimeAcknowledged(!dinnertimeAcknowledged);
                  setCheerSentToast(
                    dinnertimeAcknowledged
                      ? 'Dinner prompt reset!'
                      : 'Noted for dinner tonight!'
                  );
                  setTimeout(() => setCheerSentToast(null), 3000);
                }}
                className={`shrink-0 px-4 py-2.5 rounded-xl border text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
                  dinnertimeAcknowledged
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white hover:bg-amber-100/50 text-slate-800 border-amber-300 shadow-2xs'
                }`}
              >
                {dinnertimeAcknowledged ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Saved for Dinner</span>
                  </>
                ) : (
                  <>
                    <BellRing className="w-3.5 h-3.5" />
                    <span>Got it!</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* ================= MODALS & POPUPS ================= */}

      {/* 1. SEND CHEER MODAL */}
      {cheerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border-2 border-slate-100 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-black text-slate-900">
                  Send a Cheer to Aarav
                </h3>
              </div>
              <button
                onClick={() => setCheerModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Aarav will see your note as a celebratory badge when he opens his student portal!
            </p>

            <div className="space-y-2">
              {cheerStickers.map((sticker) => {
                const Icon = sticker.icon;
                return (
                  <button
                    key={sticker.id}
                    onClick={() => handleSendCheer(sticker.label)}
                    className="w-full p-3 rounded-2xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/60 text-left text-xs font-bold flex items-center gap-3 transition cursor-pointer"
                  >
                    <Icon className="w-4.5 h-4.5 text-amber-500 shrink-0" />
                    <span>{sticker.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 2. MESSAGE TEACHER MODAL */}
      {messageTeacherOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full border-2 border-slate-100 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-800 text-white font-black text-sm flex items-center justify-center">
                  MS
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">
                    Message Ms. Shalini Roy
                  </h3>
                  <span className="text-[10px] text-slate-500">
                    Class Teacher &amp; Math Mentor
                  </span>
                </div>
              </div>
              <button
                onClick={() => setMessageTeacherOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendMessageToTeacher} className="space-y-3">
              <textarea
                value={teacherMessage}
                onChange={(e) => setTeacherMessage(e.target.value)}
                placeholder="Type your message or inquiry about Aarav's progress..."
                rows={4}
                className="w-full p-3 rounded-2xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setMessageTeacherOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={teacherMsgSent}
                  className="px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-black shadow-md flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{teacherMsgSent ? 'Sending...' : 'Send Note'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. WEEKLY SUMMARY PDF MODAL */}
      {pdfSummaryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 max-w-xl w-full border-2 border-slate-100 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-sm font-black text-slate-900">
                  Weekly Academic Report (PDF Preview)
                </h3>
                <p className="text-[11px] text-slate-400">
                  Student: Aarav Sharma • Class 7 • Oakridge Int&apos;l School
                </p>
              </div>
              <button
                onClick={() => setPdfSummaryModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-3">
              <div className="flex justify-between font-bold text-slate-800">
                <span>Total Study Time:</span>
                <span className="text-emerald-700 font-black">3h 15m (116% of goal)</span>
              </div>
              <div className="flex justify-between font-bold text-slate-800">
                <span>Quizzes Completed:</span>
                <span>4 quizzes (Avg score: 91%)</span>
              </div>
              <div className="flex justify-between font-bold text-slate-800">
                <span>Key Mastery Areas:</span>
                <span className="text-amber-800">Improper Fractions, Chlorophyll</span>
              </div>
              <div className="flex justify-between font-bold text-slate-800">
                <span>Teacher Observation:</span>
                <span className="text-slate-600 font-normal">&quot;Aarav was very enthusiastic in science discussions.&quot;</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setPdfSummaryModalOpen(false);
                  setCheerSentToast('Weekly Summary PDF downloaded successfully!');
                  setTimeout(() => setCheerSentToast(null), 3500);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#A1510C] hover:bg-[#832B0E] text-white text-xs font-black shadow-md flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. PARENT SUPPORT CHAT MODAL */}
      {supportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border-2 border-slate-100 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">
                    Parent Support Desk
                  </h3>
                  <span className="text-[10px] text-emerald-600 font-bold">
                    ● Support Counselor Online
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSupportModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Have questions about Aarav&apos;s curriculum or subscription? Ask our support specialists anytime.
            </p>

            <div className="space-y-2">
              <button
                onClick={() => {
                  setSupportModalOpen(false);
                  setCheerSentToast('Support Counselor will connect with you via SMS / WhatsApp.');
                  setTimeout(() => setCheerSentToast(null), 3500);
                }}
                className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left text-xs font-bold text-slate-800 border border-slate-200 flex items-center justify-between"
              >
                <span>How are learning streaks calculated?</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                onClick={() => {
                  setSupportModalOpen(false);
                  setCheerSentToast('Syllabus guideline sent to your registered email!');
                  setTimeout(() => setCheerSentToast(null), 3500);
                }}
                className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left text-xs font-bold text-slate-800 border border-slate-200 flex items-center justify-between"
              >
                <span>Request custom syllabus guide for Class 7</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sidebar Navigation Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          />
          <div className="relative w-72 max-w-[80vw] bg-white h-full shadow-2xl z-10 flex flex-col p-4 border-r border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-xs">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 leading-none">
                    <h3 className="text-sm font-black text-slate-900 leading-none">Pragya</h3>
                    <span className="text-[9px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/90 px-1.5 py-0.5 rounded border border-emerald-200 leading-none">
                      Parent
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Parent Portal</p>
                </div>
              </div>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 py-4 space-y-1">
              {[
                { id: 'overview', label: 'Child Overview', icon: Home },
                { id: 'reports', label: 'Progress Reports', icon: TrendingUp },
                { id: 'syllabus', label: 'Class Syllabus', icon: BookOpen },
                { id: 'settings', label: 'Screen Controls', icon: Sliders },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as typeof activeTab);
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <button
                onClick={() => {
                  setMobileSidebarOpen(false);
                  onSwitchRole();
                }}
                className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center justify-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Switch Role</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
