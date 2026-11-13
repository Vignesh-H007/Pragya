import React, { createContext, useContext, useState, useEffect } from 'react';
import { DashboardStyle } from '../types';

export interface StyleMeta {
  id: DashboardStyle;
  name: string;
  subtitle: string;
  paletteLabel: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    bg: string;
    border: string;
  };
  cardBg: string;
  cardBorder: string;
  cardShadow: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  headerBg: string;
  sidebarBg: string;
  badgeActive: string;
  buttonPrimary: string;
}

export const STYLES_CONFIG: Record<DashboardStyle, StyleMeta> = {
  'editorial-command': {
    id: 'editorial-command',
    name: 'Editorial Command',
    subtitle: 'Warm Sandstone • Forest Spruce, Alabaster & Terracotta',
    paletteLabel: 'Sandstone Parchment, Forest Spruce & Butter Cream',
    colors: {
      primary: '#246257', // Forest Spruce Teal
      secondary: '#C85340', // Terracotta Red indicator
      accent: '#F8ECD0', // Pale Warm Butter Cream card
      bg: '#F4EFEA', // Sandstone canvas from the image
      border: '#DDD4C7', // Stone Border
    },
    cardBg: 'bg-white',
    cardBorder: 'border-[#DDD4C7]',
    cardShadow: 'shadow-[0_1px_3px_rgba(0,0,0,0.04)]',
    textPrimary: 'text-[#1C232B]',
    textSecondary: 'text-[#5C6670]',
    textMuted: 'text-[#8A8276]',
    headerBg: 'bg-[#F4EFEA]/95 border-b border-[#DDD4C7]',
    sidebarBg: 'bg-[#EFE8DE] border-r border-[#DDD4C7]',
    badgeActive: 'bg-[#246257] text-white shadow-xs',
    buttonPrimary: 'bg-[#246257] hover:bg-[#1C4E45] text-white',
  },
  clean: {
    id: 'clean',
    name: 'Modern Pedagogic',
    subtitle: 'Clinical Light • High-Contrast Blue & Slate',
    paletteLabel: 'Daylight Sky & Slate',
    colors: {
      primary: '#2563EB', // Blue 600
      secondary: '#0284C7', // Sky 600
      accent: '#E11D48', // Rose 600
      bg: '#F8FAFC',
      border: '#E2E8F0',
    },
    cardBg: 'bg-white',
    cardBorder: 'border-slate-200/90',
    cardShadow: 'shadow-xs',
    textPrimary: 'text-slate-900',
    textSecondary: 'text-slate-600',
    textMuted: 'text-slate-400',
    headerBg: 'bg-white/95 border-b border-slate-200/80',
    sidebarBg: 'bg-white border-r border-slate-200/80',
    badgeActive: 'bg-blue-600 text-white shadow-xs',
    buttonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white',
  },
  'obsidian-dark': {
    id: 'obsidian-dark',
    name: 'Obsidian Dark',
    subtitle: 'Quantix Void Obsidian • Cosmic Glow, Sleek Glass & Glowing Indicators',
    paletteLabel: 'Void Obsidian, Amber Glow & Emerald',
    colors: {
      primary: '#FFFFFF', // Pure crisp white
      secondary: '#6366F1', // Indigo / Ethereum
      accent: '#F59E0B', // Amber / Bitcoin gold
      bg: '#07080B', // Deepest obsidian void
      border: '#1A1D28', // Sleek 1px obsidian border
    },
    cardBg: 'bg-[#0D0F17]',
    cardBorder: 'border-white/[0.08]',
    cardShadow: 'shadow-2xl shadow-black/80',
    textPrimary: 'text-white',
    textSecondary: 'text-[#949DB2]',
    textMuted: 'text-[#5B6376]',
    headerBg: 'bg-[#07080B]/90 backdrop-blur-xl border-b border-white/[0.08]',
    sidebarBg: 'bg-[#08090E]/95 backdrop-blur-xl border-r border-white/[0.08]',
    badgeActive: 'bg-white/[0.12] text-white border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.06)]',
    buttonPrimary: 'bg-white text-slate-950 hover:bg-slate-200 font-bold shadow-md shadow-white/10',
  },
  'command-dark': {
    id: 'obsidian-dark',
    name: 'Obsidian Dark',
    subtitle: 'Quantix Void Obsidian • Cosmic Glow, Sleek Glass & Glowing Indicators',
    paletteLabel: 'Void Obsidian, Amber Glow & Emerald',
    colors: {
      primary: '#FFFFFF',
      secondary: '#6366F1',
      accent: '#F59E0B',
      bg: '#07080B',
      border: '#1A1D28',
    },
    cardBg: 'bg-[#0D0F17]',
    cardBorder: 'border-white/[0.08]',
    cardShadow: 'shadow-2xl shadow-black/80',
    textPrimary: 'text-white',
    textSecondary: 'text-[#949DB2]',
    textMuted: 'text-[#5B6376]',
    headerBg: 'bg-[#07080B]/90 backdrop-blur-xl border-b border-white/[0.08]',
    sidebarBg: 'bg-[#08090E]/95 backdrop-blur-xl border-r border-white/[0.08]',
    badgeActive: 'bg-white/[0.12] text-white border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.06)]',
    buttonPrimary: 'bg-white text-slate-950 hover:bg-slate-200 font-bold shadow-md shadow-white/10',
  },
  'academic-warm': {
    id: 'academic-warm',
    name: 'Academic Studio',
    subtitle: 'Warm Editorial • Terracotta, Sage & Parchment',
    paletteLabel: 'Parchment, Terracotta & Sage',
    colors: {
      primary: '#9A3412', // Terracotta/Rust
      secondary: '#15803D', // Forest Sage
      accent: '#B45309', // Amber Ochre
      bg: '#FAF7F2',
      border: '#E7E0D3',
    },
    cardBg: 'bg-[#FFFDFB]',
    cardBorder: 'border-[#E6DFD3]',
    cardShadow: 'shadow-xs',
    textPrimary: 'text-[#28231D]',
    textSecondary: 'text-[#5C5346]',
    textMuted: 'text-[#8A7F70]',
    headerBg: 'bg-[#F5F1E9]/95 border-b border-[#E2DBD0]',
    sidebarBg: 'bg-[#F5F1E9] border-r border-[#E2DBD0]',
    badgeActive: 'bg-[#8C4A2F] text-white shadow-xs',
    buttonPrimary: 'bg-[#8C4A2F] hover:bg-[#783E26] text-white',
  },
};

interface ThemeContextType {
  style: DashboardStyle;
  setStyle: (style: DashboardStyle) => void;
  styleMeta: StyleMeta;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [style, setStyle] = useState<DashboardStyle>(() => {
    try {
      const version = localStorage.getItem('learnbuddy_theme_preset_v2');
      const saved = localStorage.getItem('learnbuddy_dashboard_style') as DashboardStyle;
      if (version === 'editorial-command-preset' && saved && STYLES_CONFIG[saved]) {
        return saved;
      }
    } catch {
      // Ignore storage errors
    }
    try {
      localStorage.setItem('learnbuddy_dashboard_style', 'editorial-command');
      localStorage.setItem('learnbuddy_theme_preset_v2', 'editorial-command-preset');
    } catch {
      // Ignore
    }
    return 'editorial-command';
  });

  // Load from local storage or default to 'clean'
  useEffect(() => {
    try {
      const saved = localStorage.getItem('learnbuddy_dashboard_style') as DashboardStyle;
      if (saved && STYLES_CONFIG[saved]) {
        setStyle(saved);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleSetStyle = (newStyle: DashboardStyle) => {
    setStyle(newStyle);
    try {
      localStorage.setItem('learnbuddy_dashboard_style', newStyle);
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        style,
        setStyle: handleSetStyle,
        styleMeta: STYLES_CONFIG[style],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useDashboardTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useDashboardTheme must be used within a ThemeProvider');
  }
  return context;
};
