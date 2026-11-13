import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, X, Sparkles, Send, BookOpenCheck } from 'lucide-react';
import { useDashboardTheme } from '../../context/ThemeContext';

export interface ToastData {
  id: string;
  type?: 'success' | 'info' | 'warning';
  title: string;
  description: string;
}

interface ToastNotificationProps {
  toast: ToastData | null;
  onDismiss: () => void;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({ toast, onDismiss }) => {
  const { style } = useDashboardTheme();
  const isDark = style === 'obsidian-dark' || style === 'command-dark';

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  return (
    <div className="fixed top-16 right-4 z-50 max-w-sm w-full animate-slideInRight duration-200">
      <div
        className={`p-3.5 rounded-2xl border shadow-2xl flex items-start gap-3 backdrop-blur-xl transition-all ${
          isDark
            ? 'bg-[#0D0F17]/95 border-amber-500/30 text-white shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : style === 'academic-warm'
            ? 'bg-[#FFFDFB] border-[#DDD3C5] text-[#28231D]'
            : 'bg-white border-slate-200 text-slate-900 shadow-xl'
        }`}
      >
        <div
          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
            toast.type === 'warning'
              ? 'bg-amber-500/20 text-amber-400'
              : 'bg-emerald-500/20 text-emerald-400'
          }`}
        >
          {toast.type === 'warning' ? (
            <AlertTriangle className="w-4 h-4" />
          ) : (
            <CheckCircle2 className="w-4 h-4" />
          )}
        </div>

        <div className="flex-1 min-w-0 pr-1">
          <h4 className="text-xs font-bold leading-tight flex items-center gap-1.5">
            <span>{toast.title}</span>
            <Sparkles className="w-3 h-3 text-amber-400" />
          </h4>
          <p className={`text-[11px] mt-0.5 leading-snug ${isDark ? 'text-[#8E95A5]' : 'text-slate-600'}`}>
            {toast.description}
          </p>
        </div>

        <button
          onClick={onDismiss}
          className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
