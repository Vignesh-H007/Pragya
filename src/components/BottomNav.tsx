import React from 'react';
import {
  LayoutGrid,
  Flame,
  Table2,
  Compass,
  Settings,
  User,
} from 'lucide-react';
import { PageId } from '../types';
import { useDashboardTheme } from '../context/ThemeContext';

interface BottomNavProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  activeGapsCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activePage,
  onNavigate,
  activeGapsCount,
}) => {
  const { style } = useDashboardTheme();

  const mainItems: { id: PageId; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'roadblocks', label: 'Roadblocks', icon: Flame, badge: 'Top #1' },
    { id: 'matrix', label: 'Students', icon: Table2, badge: `${activeGapsCount}` },
    { id: 'curricula', label: 'Curricula', icon: Compass },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const isDark = style === 'obsidian-dark' || style === 'command-dark';

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className={`fixed bottom-0 inset-x-0 z-40 md:hidden border-t px-2 py-1.5 backdrop-blur-lg transition-colors duration-200 ${
        isDark
          ? 'bg-[#0E0E14]/95 border-[#23232C] text-slate-300'
          : style === 'academic-warm'
          ? 'bg-[#FAF7F2]/95 border-[#E6DFD3] text-[#28231D]'
          : 'bg-white/95 border-slate-200 text-slate-800'
      }`}
      style={{ paddingBottom: 'max(0.375rem, env(safe-area-inset-bottom))' }}
    >
      <div className="flex items-center justify-around">
        {mainItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              id={`mobile-nav-${item.id}`}
              onClick={() => onNavigate(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-2.5 min-w-[58px] min-h-[44px] rounded-xl transition-all cursor-pointer ${
                isActive
                  ? isDark
                    ? 'text-indigo-400 font-bold'
                    : style === 'academic-warm'
                    ? 'text-[#8C4A2F] font-bold'
                    : 'text-blue-600 font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
                {item.badge && (
                  <span
                    className={`absolute -top-1 -right-3 text-[9px] font-black px-1.5 py-0.2 rounded-full border leading-tight ${
                      item.id === 'roadblocks'
                        ? 'bg-rose-500 text-white border-rose-600'
                        : 'bg-blue-600 text-white border-blue-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight leading-none">{item.label}</span>
              {isActive && (
                <span
                  className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
                    isDark
                      ? 'bg-indigo-400'
                      : style === 'academic-warm'
                      ? 'bg-[#8C4A2F]'
                      : 'bg-blue-600'
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
