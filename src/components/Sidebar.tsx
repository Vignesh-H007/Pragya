import React from 'react';
import {
  LayoutGrid,
  Flame,
  Table2,
  Compass,
  Settings,
  Sprout,
  User,
} from 'lucide-react';
import { useDashboardTheme } from '../context/ThemeContext';
import { PageId } from '../types';

interface SidebarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  activeGapsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  onNavigate,
  activeGapsCount,
}) => {
  const { style } = useDashboardTheme();

  const menuItems: {
    id: PageId;
    label: string;
    icon: React.ElementType;
    badge?: string;
    badgeColor?: string;
  }[] = [
    {
      id: 'overview',
      label: 'Faculty Overview',
      icon: LayoutGrid,
    },
    {
      id: 'roadblocks',
      label: 'Roadblocks & AI Prescriptions',
      icon: Flame,
      badge: 'Critical',
      badgeColor: 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800',
    },
    {
      id: 'matrix',
      label: 'Student Mastery Matrix',
      icon: Table2,
      badge: `${activeGapsCount} Gaps`,
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800',
    },
    {
      id: 'curricula',
      label: 'Curricula & Batch Journey',
      icon: Compass,
    },
    {
      id: 'profile',
      label: 'My Faculty Profile',
      icon: User,
      badge: 'Verified',
      badgeColor: 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800',
    },
    {
      id: 'settings',
      label: 'Settings & Theme',
      icon: Settings,
    },
  ];

  const isDark = style === 'obsidian-dark' || style === 'command-dark';

  return (
    <aside
      aria-label="Desktop Sidebar Navigation"
      className={`w-64 shrink-0 p-4 flex flex-col justify-between hidden md:flex min-h-[calc(100vh-61px)] border-r transition-colors duration-200 z-10 ${
        isDark
          ? 'bg-[#08090E]/95 backdrop-blur-xl border-white/[0.08] text-slate-200'
          : style === 'academic-warm'
          ? 'bg-[#F6F2EC] border-[#E3DBD0] text-[#28231D]'
          : style === 'editorial-command'
          ? 'bg-[#EFE8DE] border-[#DDD4C7] text-[#1C232B]'
          : 'bg-white border-slate-200/80 text-slate-900'
      }`}
    >
      {/* Navigation Header / Group */}
      <div className="space-y-2">
        {/* Quantix Welcome Profile Card for Obsidian Dark */}
        {isDark && (
          <div className="mb-3.5 p-3 rounded-2xl bg-[#0D0F17] border border-white/[0.08] shadow-lg shadow-black/40">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#8E95A5]">Workspace</span>
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Sync
              </span>
            </div>
            <div className="mt-1.5 text-xs font-bold text-white tracking-tight">Welcome Back, Jason</div>
            <div className="text-[10px] text-[#636C82] mt-0.5">Last login: 15 Jun 2025</div>
          </div>
        )}

        <div
          className={`px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider ${
            isDark
              ? 'text-[#5B6376] font-mono text-[10px] tracking-widest'
              : style === 'editorial-command'
              ? 'text-[#7C7267] font-mono text-[10px] tracking-widest'
              : 'text-slate-400 dark:text-slate-500'
          }`}
        >
          {isDark ? 'Overview' : style === 'editorial-command' ? 'Academic Dispatcher' : 'Faculty Command Menu'}
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              id={`sidebar-item-${item.id}`}
              onClick={() => onNavigate(item.id)}
              className={`relative w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                isActive
                  ? isDark
                    ? 'bg-gradient-to-b from-white/[0.14] to-white/[0.04] text-white font-bold border border-white/15 shadow-[0_0_20px_rgba(255,255,255,0.05)]'
                    : style === 'academic-warm'
                    ? 'bg-[#EADDCF] text-[#8C4A2F] font-bold border border-[#DCBFA8] shadow-xs'
                    : style === 'editorial-command'
                    ? 'bg-white text-[#246257] font-bold border border-[#DDD4C7] shadow-2xs'
                    : 'bg-blue-50 text-blue-700 font-bold border border-blue-200/70 shadow-xs'
                  : isDark
                  ? 'text-[#8E95A5] hover:text-white hover:bg-white/[0.04]'
                  : style === 'academic-warm'
                  ? 'text-[#645A4C] hover:text-[#28231D] hover:bg-[#EFE9E0]'
                  : style === 'editorial-command'
                  ? 'text-[#5C6670] hover:text-[#1C232B] hover:bg-[#E7DFD4]/70'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive
                      ? isDark
                        ? 'text-white stroke-[2.3]'
                        : style === 'academic-warm'
                        ? 'text-[#8C4A2F] stroke-[2.3]'
                        : style === 'editorial-command'
                        ? 'text-[#246257] stroke-[2.3]'
                        : 'text-blue-600 stroke-[2.3]'
                      : isDark
                      ? 'text-[#6E768E]'
                      : style === 'academic-warm'
                      ? 'text-[#8E8474]'
                      : style === 'editorial-command'
                      ? 'text-[#7C7267]'
                      : 'text-slate-400'
                  }`}
                />
                <span className="truncate text-[12px]">{item.label}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                      isDark
                        ? 'bg-white/[0.08] text-white border-white/10'
                        : style === 'editorial-command' && item.id === 'roadblocks'
                        ? 'bg-[#FBE8E5] text-[#C85340] border-[#F2C3BC]'
                        : style === 'editorial-command' && item.id === 'matrix'
                        ? 'bg-[#F8ECD0] text-[#783E26] border-[#E9D9B8]'
                        : item.badgeColor || 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {/* Quantix Vertical White Capsule Indicator for active nav in dark mode */}
                {isActive && isDark && (
                  <span className="w-1 h-3.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.7)] shrink-0" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom Inspiration Card & Status */}
      <div className="pt-4 space-y-3">
        <div
          id="sidebar-sprout-card"
          className={`rounded-2xl p-3.5 text-center relative overflow-hidden border transition-colors ${
            isDark
              ? 'bg-[#0D0F17] border-white/[0.08] shadow-lg shadow-black/40'
              : style === 'academic-warm'
              ? 'bg-[#EFE9E0] border-[#DDD3C5]'
              : style === 'editorial-command'
              ? 'bg-white border-[#DDD4C7] shadow-2xs'
              : 'bg-gradient-to-b from-blue-50/70 to-emerald-50/50 border-blue-100/80'
          }`}
        >
          <div
            className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 shadow-xs ${
              isDark
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : style === 'academic-warm'
                ? 'bg-[#DFD4C5] text-[#2D6A4F]'
                : style === 'editorial-command'
                ? 'bg-[#E5F2EE] text-[#246257] border border-[#BFDFD6]'
                : 'bg-emerald-100 text-emerald-600'
            }`}
          >
            <Sprout className="w-4 h-4 stroke-[2.5]" />
          </div>
          <p
            className={`text-[11px] font-semibold leading-snug italic ${
              isDark
                ? 'text-slate-200'
                : style === 'academic-warm'
                ? 'text-[#3D352B]'
                : style === 'editorial-command'
                ? 'text-[#1C232B] font-serif text-xs not-italic'
                : 'text-slate-700'
            }`}
          >
            &ldquo;Targeting learning gaps unlocks student potential.&rdquo;
          </p>
          <div
            className={`mt-1 text-[10px] font-medium ${
              isDark
                ? 'text-[#636C82]'
                : style === 'academic-warm'
                ? 'text-[#8E8474]'
                : style === 'editorial-command'
                ? 'text-[#5C6670] font-mono text-[9px] uppercase tracking-wider'
                : 'text-slate-400'
            }`}
          >
            CBSE & NCERT Aligned
          </div>
        </div>

        <div className="flex items-center justify-between px-2 text-[11px] text-slate-400">
          <span className="inline-flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-[#246257] animate-pulse" />
            <span className={style === 'editorial-command' ? 'text-[#1C232B] font-mono text-[10px]' : ''}>
              Live Sync Active
            </span>
          </span>
          <span className={`text-[10px] opacity-70 ${style === 'editorial-command' ? 'font-mono text-[#5C6670]' : ''}`}>
            v2.4
          </span>
        </div>
      </div>
    </aside>
  );
};
