import React, { useState } from 'react';
import {
  GraduationCap,
  Home,
  BookOpen,
  HeartHandshake,
  BarChart3,
  Bot,
  FolderLock,
  Search,
  Bell,
  Sparkles,
  ChevronDown,
  Sun,
  Moon,
  Library,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  X,
  LogOut,
  User,
  Settings as SettingsIcon,
  Zap,
} from 'lucide-react';
import { useDashboardTheme } from '../context/ThemeContext';
import { useProfile } from '../context/ProfileContext';
import { DashboardStyle, PageId, Subject } from '../types';
import { QuickActionsDropdown } from './teacher/QuickActionsDropdown';

interface NavbarProps {
  activeTopTab: string;
  setActiveTopTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  notificationCount: number;
  onClearNotifications?: () => void;
  activePage?: PageId;
  onNavigate?: (page: PageId) => void;
  onSwitchRole?: () => void;
  selectedClass?: string;
  selectedSubject?: Subject;
  atRiskCount?: number;
  onOpenMessageAtRisk?: () => void;
  onOpenAssignRemedial?: () => void;
  onOpenAddGap?: () => void;
  onScheduleExitTicket?: () => void;
  onBroadcastParent?: () => void;
  onExportReport?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTopTab,
  setActiveTopTab,
  searchQuery,
  setSearchQuery,
  notificationCount,
  onClearNotifications,
  activePage = 'overview',
  onNavigate,
  onSwitchRole,
  selectedClass = 'Class 7',
  selectedSubject = 'Mathematics',
  atRiskCount = 0,
  onOpenMessageAtRisk,
  onOpenAssignRemedial,
  onOpenAddGap,
  onScheduleExitTicket,
  onBroadcastParent,
  onExportReport,
}) => {
  const { style, setStyle } = useDashboardTheme();
  const { facultyProfile } = useProfile();
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

  const tabs = [
    { id: 'Faculty', label: 'Faculty Analytics', icon: Sparkles, badge: 'Live', page: 'overview' as PageId },
    { id: 'Roadblocks', label: 'Roadblocks', icon: AlertTriangle, page: 'roadblocks' as PageId },
    { id: 'Progress', label: 'Student Matrix', icon: BarChart3, page: 'matrix' as PageId },
    { id: 'Curricula', label: 'Curricula', icon: BookOpen, page: 'curricula' as PageId },
  ];

  const notifications = [
    {
      id: 1,
      title: 'Critical Failure Spike: Integers',
      desc: '46% failure rate in Class 7 Quiz #4. 19 students flagged.',
      page: 'roadblocks' as PageId,
      time: '10m ago',
      urgent: true,
    },
    {
      id: 2,
      title: 'New Student Learning Gap Logged',
      desc: 'Aarav Patel flagged in Negative Number Subtraction.',
      page: 'matrix' as PageId,
      time: '1h ago',
      urgent: false,
    },
    {
      id: 3,
      title: 'Remedial Resource Ready',
      desc: 'Interactive Pizza Slices fraction tool assigned to 15 students.',
      page: 'curricula' as PageId,
      time: '3h ago',
      urgent: false,
    },
  ];

  const isDark = style === 'obsidian-dark' || style === 'command-dark';

  return (
    <>
      <div className={isDark ? 'h-0.5 bg-gradient-to-r from-amber-500 via-indigo-500 to-cyan-400 w-full' : 'h-1 bg-[#0F2E4C] w-full'} />
      <header
        className={`sticky top-0 z-30 px-3 sm:px-6 py-2 sm:py-2.5 transition-colors duration-200 border-b ${
          isDark
            ? 'bg-[#07080B]/90 backdrop-blur-xl border-white/[0.08] text-white shadow-2xl shadow-black/80'
            : style === 'academic-warm'
            ? 'bg-[#F6F2EC]/95 backdrop-blur-md border-[#E3DBD0] text-[#28231D] shadow-[0_1px_3px_rgba(0,0,0,0.03)]'
            : style === 'editorial-command'
            ? 'bg-[#F4EFEA]/95 backdrop-blur-md border-[#DDD4C7] text-[#1C232B] shadow-2xs'
            : 'bg-white/95 backdrop-blur-md border-slate-200/80 text-slate-900 shadow-[0_1px_3px_rgba(0,0,0,0.03)]'
        }`}
      >
        <div className="flex items-center justify-between gap-2 sm:gap-4 max-w-[1600px] mx-auto">
          {/* Left: Upper Menu Navigation Icon & Brand Logo & App Name */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
            <button
              onClick={() => setShowMobileNav((prev) => !prev)}
              id="faculty-upper-menu-toggle-btn"
              className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col items-center justify-center gap-1 transition-all duration-200 cursor-pointer active:scale-95 group focus:outline-none shrink-0"
              title="Navigation Menu"
              aria-label="Navigation Menu"
            >
              <span className="w-4 sm:w-5 h-[2.5px] bg-slate-600 dark:bg-slate-300 rounded-full transition-colors" />
              <span className="w-4 sm:w-5 h-[2.5px] bg-slate-600 dark:bg-slate-300 rounded-full transition-colors" />
              <span className="w-4 sm:w-5 h-[2.5px] bg-slate-600 dark:bg-slate-300 rounded-full transition-colors" />
            </button>

            <div
              onClick={() => onNavigate && onNavigate('overview')}
              className="flex items-center gap-2 sm:gap-3 shrink-0 cursor-pointer min-w-0"
            >
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white shadow-xs transition-colors shrink-0 ${
                  isDark
                    ? 'bg-white/[0.06] border border-white/15 shadow-[0_0_15px_rgba(255,255,255,0.08)] text-white'
                    : style === 'academic-warm'
                    ? 'bg-gradient-to-tr from-[#9A3412] via-[#B45309] to-[#783E26] shadow-amber-900/20'
                    : style === 'editorial-command'
                    ? 'bg-[#246257] shadow-xs'
                    : 'bg-gradient-to-tr from-blue-600 via-sky-500 to-indigo-600 shadow-blue-500/20'
                }`}
              >
                <GraduationCap className="w-4 h-4 sm:w-6 sm:h-6 stroke-[2.2]" />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <div className="flex items-center gap-1.5 leading-none">
                  <span
                    className={`text-base sm:text-xl font-black tracking-tight leading-none ${
                      isDark
                        ? 'text-white'
                        : style === 'academic-warm'
                        ? 'text-[#28231D]'
                        : style === 'editorial-command'
                        ? 'text-[#1C232B] font-serif text-lg sm:text-2xl font-bold'
                        : 'text-slate-900'
                    }`}
                  >
                    Pragya
                  </span>
                  <span
                    className={`text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded leading-none ${
                      isDark
                        ? 'bg-white/[0.10] text-white border border-white/20'
                        : style === 'academic-warm'
                        ? 'bg-[#EADDCF] text-[#783E26] border border-[#DBCAB9]'
                        : style === 'editorial-command'
                        ? 'bg-[#E5F2EE] text-[#246257] border border-[#BFDFD6] font-mono text-[9px]'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {isDark ? 'Quantix' : 'Faculty'}
                  </span>
                </div>
                <p
                  className={`text-[10px] sm:text-[11px] font-medium tracking-tight -mt-0.5 hidden sm:block ${
                    isDark
                      ? 'text-[#8E95A5]'
                      : style === 'academic-warm'
                      ? 'text-[#7D7363]'
                      : style === 'editorial-command'
                      ? 'text-[#6B7580] font-mono text-[10px] tracking-wide'
                      : 'text-slate-400'
                  }`}
                >
                  Diagnostic Analytics & Remediation Engine
                </p>
              </div>
            </div>
          </div>

        {/* Center: Main Navigation Tabs (Desktop) */}
        <nav
          className={`hidden lg:flex items-center gap-1 p-1 rounded-full border transition-colors ${
            isDark
              ? 'bg-[#0D0F17] border-white/[0.08]'
              : style === 'academic-warm'
              ? 'bg-[#ECE5DC]/90 border-[#DED4C7]'
              : style === 'editorial-command'
              ? 'bg-[#EFE8DE] border-[#DDD4C7]'
              : 'bg-slate-100/80 border-slate-200/60'
          }`}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activePage === tab.page;
            return (
              <button
                key={tab.id}
                id={`nav-tab-${tab.id.toLowerCase()}`}
                onClick={() => {
                  setActiveTopTab(tab.id);
                  if (onNavigate) onNavigate(tab.page);
                }}
                className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${
                  isActive
                    ? isDark
                      ? 'bg-gradient-to-b from-white/[0.14] to-white/[0.04] text-white font-bold border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.06)]'
                      : style === 'academic-warm'
                      ? 'bg-[#8C4A2F] text-white shadow-sm'
                      : style === 'editorial-command'
                      ? 'bg-white border border-[#DDD4C7] text-[#246257] font-bold shadow-2xs'
                      : 'bg-blue-600 text-white shadow-sm'
                    : isDark
                    ? 'text-[#8E95A5] hover:text-white hover:bg-white/[0.04]'
                    : style === 'academic-warm'
                    ? 'text-[#645A4C] hover:text-[#28231D] hover:bg-[#FAF7F2]'
                    : style === 'editorial-command'
                    ? 'text-[#5C6670] hover:text-[#1C232B] hover:bg-[#E7DFD4]/70'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/70'
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 ${
                    isActive
                      ? isDark
                        ? 'text-white'
                        : style === 'editorial-command'
                        ? 'text-[#246257] stroke-[2.5]'
                        : 'text-white'
                      : isDark
                      ? 'text-[#636C82]'
                      : style === 'academic-warm'
                      ? 'text-[#7D7363]'
                      : 'text-slate-500'
                  }`}
                />
                <span>{tab.label}</span>
                {tab.badge && !isActive && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                      isDark
                        ? 'bg-white/[0.08] text-white border border-white/10'
                        : style === 'academic-warm'
                        ? 'bg-[#EADDCF] text-[#8C4A2F]'
                        : style === 'editorial-command'
                        ? 'bg-[#E5F2EE] text-[#246257]'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Search, Systems nominal, Style Quick Toggle, Notifications & User Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Frosted Quantix Search Pill */}
          <div className="relative hidden md:block">
            <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-[#636C82]' : 'text-slate-400'}`} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-36 lg:w-48 pl-8 pr-3 py-1.5 rounded-full text-xs transition-all focus:outline-none ${
                isDark
                  ? 'bg-white/[0.05] border border-white/10 text-white placeholder-[#636C82] focus:border-white/25 focus:bg-white/[0.08]'
                  : 'bg-slate-100 border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-400'
              }`}
            />
          </div>

          {/* Systems nominal badge */}
          <div className={`hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium ${
            isDark
              ? 'bg-white/[0.05] border border-white/10 text-slate-200'
              : 'bg-[#E5F2EE] border border-[#BFDFD6] text-[#246257]'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isDark ? 'bg-emerald-400' : 'bg-[#246257]'}`} />
            <span>Systems nominal</span>
          </div>

          {/* Teacher Quick Actions Floating Menu / Dropdown */}
          <QuickActionsDropdown
            selectedClass={selectedClass}
            selectedSubject={selectedSubject}
            atRiskCount={atRiskCount}
            onOpenMessageAtRisk={onOpenMessageAtRisk || (() => {})}
            onOpenAssignRemedial={onOpenAssignRemedial || (() => {})}
            onOpenAddGap={onOpenAddGap || (() => {})}
            onScheduleExitTicket={onScheduleExitTicket || (() => {})}
            onBroadcastParent={onBroadcastParent || (() => {})}
            onExportReport={onExportReport || (() => {})}
          />

          {/* Open daily brief action button */}
          <button
            onClick={() => onNavigate && onNavigate('roadblocks')}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-2xs cursor-pointer ${
              isDark
                ? 'bg-white text-slate-950 font-bold hover:bg-slate-200 shadow-md shadow-white/10'
                : 'bg-[#246257] hover:bg-[#1C4E45] text-white'
            }`}
            title="Open Daily Remediation Brief"
          >
            <span>Daily brief</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Quick Style Switcher in Navbar - visible on tablet & desktop */}
          <div
            className={`hidden md:flex items-center p-0.5 rounded-full border transition-colors ${
              isDark
                ? 'bg-[#0D0F17] border-white/[0.08]'
                : style === 'academic-warm'
                ? 'bg-[#EFE9E0] border-[#DDD3C5]'
                : style === 'editorial-command'
                ? 'bg-[#EFE8DE] border-[#DDD4C7]'
                : 'bg-slate-100 border-slate-200/80'
            }`}
            title="Switch Dashboard Style"
          >
            <button
              id="theme-btn-editorial-nav"
              onClick={() => setStyle('editorial-command')}
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                style === 'editorial-command'
                  ? 'bg-[#246257] text-white shadow-xs'
                  : 'text-slate-500 hover:text-[#1C232B]'
              }`}
              title="Editorial Command Theme (Default)"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>
            <button
              id="theme-btn-clean-nav"
              onClick={() => setStyle('clean')}
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                style === 'clean'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
              title="Modern Clean Theme"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              id="theme-btn-dark-nav"
              onClick={() => setStyle('obsidian-dark')}
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                isDark
                  ? 'bg-white text-slate-950 font-black shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Obsidian Dark Theme"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
            <button
              id="theme-btn-warm-nav"
              onClick={() => setStyle('academic-warm')}
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                style === 'academic-warm'
                  ? 'bg-[#8C4A2F] text-white shadow-xs'
                  : 'text-slate-500 hover:text-[#28231D]'
              }`}
              title="Academic Warm Theme"
            >
              <Library className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick theme cycle button for mobile */}
          <button
            onClick={() => {
              const nextStyle: DashboardStyle =
                style === 'editorial-command'
                  ? 'clean'
                  : style === 'clean'
                  ? 'obsidian-dark'
                  : style === 'obsidian-dark' || style === 'command-dark'
                  ? 'academic-warm'
                  : 'editorial-command';
              setStyle(nextStyle);
            }}
            className="md:hidden p-2 rounded-full border border-slate-200/90 dark:border-slate-800 bg-white/80 dark:bg-slate-900 text-slate-600 dark:text-slate-300 shadow-xs"
            title="Cycle theme"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              id="notifications-button"
              onClick={() => setShowNotificationMenu(!showNotificationMenu)}
              className={`relative p-2 rounded-full transition-colors cursor-pointer ${
                isDark
                  ? 'text-[#8E95A5] hover:text-white hover:bg-white/[0.05]'
                  : style === 'academic-warm'
                  ? 'text-[#645A4C] hover:text-[#28231D] hover:bg-[#EAE2D7]'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
              }`}
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {notificationCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotificationMenu && (
              <div
                className={`absolute right-0 mt-2 w-80 rounded-2xl shadow-2xl border p-3 z-50 animate-fadeIn ${
                  isDark
                    ? 'bg-[#0D0F17] border-white/[0.08] text-white shadow-black/80'
                    : style === 'academic-warm'
                    ? 'bg-[#FFFDFB] border-[#DDD3C5] text-[#28231D]'
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-inherit">
                  <span className="font-extrabold text-xs">Diagnostic Alerts</span>
                  <button
                    onClick={() => setShowNotificationMenu(false)}
                    className="p-1 rounded-full hover:bg-white/[0.05] cursor-pointer text-slate-400"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        if (onNavigate) onNavigate(n.page);
                        setShowNotificationMenu(false);
                      }}
                      className={`p-2.5 rounded-xl transition cursor-pointer border ${
                        isDark
                          ? 'bg-[#08090E] hover:bg-white/[0.04] border-white/[0.06]'
                          : 'bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-100 dark:border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[11px] font-bold ${
                            n.urgent ? 'text-rose-400' : isDark ? 'text-white' : 'text-blue-600'
                          }`}
                        >
                          {n.title}
                        </span>
                        <span className="text-[9px] text-[#636C82]">{n.time}</span>
                      </div>
                      <p className={`text-[11px] mt-0.5 leading-snug ${isDark ? 'text-[#8E95A5]' : 'text-slate-600 dark:text-slate-300'}`}>
                        {n.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill */}
          <div className="relative">
            <div
              id="user-profile-badge"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className={`flex items-center gap-2 pl-2 pr-3 py-1 rounded-full border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-[#0D0F17] border-white/[0.08] hover:border-white/20 text-white'
                  : style === 'academic-warm'
                  ? 'bg-[#EFEAE2] border-[#DCD1C2] hover:bg-[#E8E1D6] text-[#28231D]'
                  : style === 'editorial-command'
                  ? 'bg-white border-[#DDD4C7] hover:bg-[#FAF7F0] text-[#1C232B] shadow-2xs'
                  : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100/80 text-slate-900'
              }`}
            >
              <img
                src={facultyProfile.avatarUrl}
                alt={facultyProfile.name}
                className={`w-7 h-7 rounded-full object-cover ring-2 ${
                  style === 'command-dark' || style === 'obsidian-dark'
                    ? 'ring-indigo-500/40'
                    : style === 'academic-warm'
                    ? 'ring-[#8C4A2F]/40'
                    : style === 'editorial-command'
                    ? 'ring-[#246257]/40'
                    : 'ring-blue-500/30'
                }`}
              />
              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold leading-tight flex items-center gap-1">
                  {facultyProfile.name.split(' ')[0]} {facultyProfile.name.split(' ')[1] || ''}
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </div>
                <div
                  className={`text-[9px] font-medium leading-none ${
                    style === 'command-dark' || style === 'obsidian-dark'
                      ? 'text-slate-400'
                      : style === 'academic-warm'
                      ? 'text-[#7D7363]'
                      : style === 'editorial-command'
                      ? 'text-[#5C6670] font-mono text-[9px]'
                      : 'text-slate-500'
                  }`}
                >
                  {facultyProfile.title}
                </div>
              </div>
            </div>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div
                className={`absolute right-0 mt-2 w-60 rounded-2xl border shadow-xl z-50 py-1.5 transition-all duration-200 ${
                  style === 'command-dark' || style === 'obsidian-dark'
                    ? 'bg-[#121218] border-[#2A2A38] text-slate-200'
                    : style === 'academic-warm'
                    ? 'bg-[#F9F6F0] border-[#E8DFC2] text-[#28231D]'
                    : style === 'editorial-command'
                    ? 'bg-[#FAF7F0] border-[#DDD4C7] text-[#1C232B]'
                    : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                <div className="px-3 py-2 border-b border-dashed border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-black">{facultyProfile.name}</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium truncate">{facultyProfile.email}</p>
                  <span className="inline-block mt-1 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {facultyProfile.facultyId}
                  </span>
                </div>

                <button
                  onClick={() => {
                    if (onNavigate) onNavigate('profile');
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-xs font-bold text-left hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors text-indigo-500 dark:text-indigo-400"
                >
                  <User className="w-4 h-4" />
                  <span>My Faculty Profile</span>
                </button>

                <button
                  onClick={() => {
                    if (onNavigate) onNavigate('settings');
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-left hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                >
                  <SettingsIcon className="w-4 h-4 text-slate-400" />
                  <span>Settings & Themes</span>
                </button>

                <button
                  onClick={() => {
                    if (onSwitchRole) onSwitchRole();
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-black text-left text-rose-600 hover:bg-rose-50/50 dark:hover:bg-rose-950/20 transition-colors border-t border-slate-100 dark:border-slate-800"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>Switch Role</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile / Responsive Navigation Menu Panel */}
      {showMobileNav && (
        <div className="lg:hidden border-t border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md px-4 py-3 space-y-3 animate-in slide-in-from-top-2 duration-150 shadow-lg">
          {/* Quick Actions Shortcuts on Mobile */}
          <div className="p-2.5 rounded-2xl border border-amber-500/20 bg-amber-500/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-500 flex items-center gap-1">
                <Zap className="w-3 h-3 fill-current" />
                <span>Quick Teacher Actions</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-400 font-bold">
                {atRiskCount} at risk
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => {
                  setShowMobileNav(false);
                  if (onOpenMessageAtRisk) onOpenMessageAtRisk();
                }}
                className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 shadow-xs cursor-pointer"
              >
                <span>Message At-Risk</span>
              </button>
              <button
                onClick={() => {
                  setShowMobileNav(false);
                  if (onOpenAssignRemedial) onOpenAssignRemedial();
                }}
                className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 shadow-xs cursor-pointer"
              >
                <span>Assign Remedial</span>
              </button>
            </div>
          </div>

          <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-2">Navigation Menu</div>
          <div className="grid grid-cols-1 gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activePage === tab.page;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (onNavigate) onNavigate(tab.page);
                    setShowMobileNav(false);
                  }}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-white/20 text-current">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Dashboard Style Switcher for Mobile */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-2 mb-1.5">Dashboard Theme</div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => setStyle('editorial-command')}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  style === 'editorial-command' ? 'bg-[#246257] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Editorial</span>
              </button>
              <button
                onClick={() => setStyle('clean')}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  style === 'clean' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Clean</span>
              </button>
              <button
                onClick={() => setStyle('obsidian-dark')}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  style === 'obsidian-dark' || style === 'command-dark' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Obsidian Dark</span>
              </button>
              <button
                onClick={() => setStyle('academic-warm')}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  style === 'academic-warm' ? 'bg-[#8C4A2F] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Library className="w-3.5 h-3.5" />
                <span>Academic Warm</span>
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                if (onNavigate) onNavigate('profile');
                setShowMobileNav(false);
              }}
              className="py-2 px-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold text-center"
            >
              Profile
            </button>
            <button
              onClick={() => {
                if (onNavigate) onNavigate('settings');
                setShowMobileNav(false);
              }}
              className="py-2 px-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold text-center"
            >
              Settings
            </button>
            <button
              onClick={() => {
                if (onSwitchRole) onSwitchRole();
                setShowMobileNav(false);
              }}
              className="py-2 px-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 text-xs font-bold text-center"
            >
              Role
            </button>
          </div>
        </div>
      )}
    </header>

    {/* Quantix Live Learning Metric Ticker Ribbon */}
    {isDark && (
      <div className="w-full bg-[#08090E]/90 border-b border-white/[0.06] px-4 py-1.5 overflow-x-auto no-scrollbar flex items-center gap-6 text-[11px] font-mono whitespace-nowrap text-[#8E95A5] z-20 relative">
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[10px]">₿</span>
          <span className="text-white font-bold tracking-wider">MATH/CL7:</span>
          <span className="text-white font-semibold">88.5%</span>
          <span className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20 text-[10px]">↗ +1.09%</span>
        </div>
        <span className="text-white/10">|</span>
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-[10px]">⟠</span>
          <span className="text-white font-bold tracking-wider">REMEDIATION:</span>
          <span className="text-white font-semibold">74.2%</span>
          <span className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20 text-[10px]">↗ +3.92%</span>
        </div>
        <span className="text-white/10">|</span>
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[10px]">◎</span>
          <span className="text-white font-bold tracking-wider">ACTIVE GAPS:</span>
          <span className="text-white font-semibold">14 Flagged</span>
          <span className="text-rose-400 bg-rose-500/10 px-1.5 py-0.2 rounded border border-rose-500/20 text-[10px]">↘ -2.01%</span>
        </div>
        <span className="text-white/10">|</span>
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">⚡</span>
          <span className="text-white font-bold tracking-wider">AI TUTOR SYNC:</span>
          <span className="text-emerald-400 font-semibold">Live & Grounded</span>
        </div>
      </div>
    )}
  </>
  );
};
