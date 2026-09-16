import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

export interface AdminStatCardProps {
  title: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
  subtitle?: string;
  badge?: string;
  accent?: 'emerald' | 'slate' | 'amber' | 'rose' | 'sky';
}

export function AdminStatCard({
  title,
  value,
  icon: Icon,
  change,
  changeType = 'up',
  subtitle,
  badge,
  accent = 'emerald',
}: AdminStatCardProps) {
  const accentStyles = {
    emerald: {
      iconBg: 'bg-emerald-50 text-emerald-700 border-emerald-100/80',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
    },
    slate: {
      iconBg: 'bg-slate-100 text-slate-700 border-slate-200/80',
      badgeBg: 'bg-slate-100 text-slate-700 border-slate-200/60',
    },
    amber: {
      iconBg: 'bg-amber-50 text-amber-700 border-amber-100/80',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200/60',
    },
    rose: {
      iconBg: 'bg-rose-50 text-rose-700 border-rose-100/80',
      badgeBg: 'bg-rose-50 text-rose-700 border-rose-200/60',
    },
    sky: {
      iconBg: 'bg-sky-50 text-sky-700 border-sky-100/80',
      badgeBg: 'bg-sky-50 text-sky-700 border-sky-200/60',
    },
  }[accent];

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] hover:border-slate-300 hover:shadow-[0_10px_25px_-5px_rgba(15,23,42,0.06),0_8px_10px_-6px_rgba(15,23,42,0.04)] hover:-translate-y-1 transition-all duration-300 ease-out group">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors ${accentStyles.iconBg}`}>
          <Icon className="w-5 h-5" />
        </div>

        <div className="flex items-center gap-1.5">
          {badge && (
            <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${accentStyles.badgeBg}`}>
              {badge}
            </span>
          )}

          {change && (
            <span
              className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${
                changeType === 'up'
                  ? 'bg-emerald-50 text-emerald-700'
                  : changeType === 'down'
                  ? 'bg-rose-50 text-rose-700'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {changeType === 'up' && <ArrowUpRight className="w-3 h-3" />}
              {changeType === 'down' && <ArrowDownRight className="w-3 h-3" />}
              {change}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-0.5">
        <div className="text-2xl font-bold tracking-tight text-slate-900 font-sans">
          {typeof value === 'number' ? <AnimatedCounter value={value} /> : value}
        </div>
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{title}</p>
        {subtitle && <p className="text-[11px] text-slate-400 pt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}
