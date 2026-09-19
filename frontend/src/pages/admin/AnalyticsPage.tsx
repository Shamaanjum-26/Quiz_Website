import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Users,
  Award,
  BookOpen,
  Rocket,
  RefreshCw,
  Calendar,
  CalendarDays,
  TrendingUp,
} from 'lucide-react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { AdminStatCard } from '@/components/admin/AdminStatCard';
import {
  getDailyAnalyticsData,
  getMonthlyAnalyticsData,
  type AnalyticsMilestones,
  type BreakdownRow,
} from '@/services/adminService';
import supabase, { isSupabaseConfigured } from '@/lib/supabase';
import { getStudentDomainDisplay } from '@/lib/domainHelper';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

interface AdminAnalyticsPageProps {
  defaultPeriod?: 'daily' | 'monthly';
}

export default function AdminAnalyticsPage({ defaultPeriod }: AdminAnalyticsPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const periodParam = searchParams.get('period') || searchParams.get('view');
  
  const [period, setPeriod] = useState<'daily' | 'monthly'>(
    (periodParam === 'monthly' || defaultPeriod === 'monthly') ? 'monthly' : 'daily'
  );

  const [milestones, setMilestones] = useState<AnalyticsMilestones>({
    total_students: 0,
    quiz_attempts: 0,
    reports_generated: 0,
    bootcamp_enrolled: 0,
    activation_rate: '0.0%',
    completion_rate: '0.0%',
    conversion_rate: '0.0%',
  });

  const [chartData, setChartData] = useState<{ date: string; count: number; attempts: number; bootcamp: number }[]>([]);
  const [domainStats, setDomainStats] = useState<{ name: string; count: number }[]>([]);
  const [breakdown, setBreakdown] = useState<BreakdownRow[]>([]);
  const [isLiveSyncing, setIsLiveSyncing] = useState(false);

  // Sync state if URL query param changes
  useEffect(() => {
    if (periodParam === 'daily' || periodParam === 'monthly') {
      setPeriod(periodParam);
    }
  }, [periodParam]);

  const handlePeriodChange = (newPeriod: 'daily' | 'monthly') => {
    setPeriod(newPeriod);
    setSearchParams({ period: newPeriod });
  };

  const loadAnalytics = useCallback(async (isSilent = false) => {
    if (!isSupabaseConfigured) {
      try {
        const rawStudents = localStorage.getItem('hadescore_local_students');
        const students = rawStudents ? JSON.parse(rawStudents) : [];
        const rawLeads = localStorage.getItem('hadescore_local_leads');
        const leads = rawLeads ? JSON.parse(rawLeads) : [];

        const totalStudents = students.length;
        const attempts = leads.filter((l: any) => l.has_completed_quiz || (l.session_count && l.session_count > 0)).length;
        const reports = leads.filter((l: any) => l.has_completed_quiz).length;
        const bootcamp = leads.filter((l: any) => l.has_registered_bootcamp).length;

        setMilestones({
          total_students: totalStudents,
          quiz_attempts: attempts,
          reports_generated: reports,
          bootcamp_enrolled: bootcamp,
          activation_rate: totalStudents > 0 ? ((attempts / totalStudents) * 100).toFixed(1) + '%' : '0.0%',
          completion_rate: attempts > 0 ? ((reports / attempts) * 100).toFixed(1) + '%' : '0.0%',
          conversion_rate: totalStudents > 0 ? ((bootcamp / totalStudents) * 100).toFixed(1) + '%' : '0.0%',
        });

        // 7 days chart
        const daysMap: Record<string, { count: number; attempts: number; bootcamp: number }> = {};
        for (let i = 6; i >= 0; i--) {
          const d = new Date(Date.now() - i * 86400000);
          const iso = d.toISOString().slice(0, 10);
          daysMap[iso] = { count: 0, attempts: 0, bootcamp: 0 };
        }

        students.forEach((s: any) => {
          if (s.created_at) {
            const iso = s.created_at.slice(0, 10);
            if (daysMap[iso]) daysMap[iso].count++;
          }
        });

        leads.forEach((l: any) => {
          const dateStr = l.last_activity_at || l.created_at;
          if (dateStr) {
            const iso = dateStr.slice(0, 10);
            if (daysMap[iso]) {
              if (l.has_completed_quiz || l.session_count > 0) daysMap[iso].attempts++;
              if (l.has_registered_bootcamp) daysMap[iso].bootcamp++;
            }
          }
        });

        const cData = Object.entries(daysMap).map(([iso, v]) => ({
          date: new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          count: v.count,
          attempts: v.attempts,
          bootcamp: v.bootcamp,
        }));
        setChartData(cData);

        // Domain stats
        const dCounts: Record<string, number> = {};
        students.forEach((s: any) => {
          const name = getStudentDomainDisplay(s).name;
          dCounts[name] = (dCounts[name] || 0) + 1;
        });
        setDomainStats(Object.entries(dCounts).map(([name, count]) => ({ name, count })));
      } catch {}
      return;
    }
    try {
      if (!isSilent) setIsLiveSyncing(true);
      const data = period === 'daily' 
        ? await getDailyAnalyticsData(7)
        : await getMonthlyAnalyticsData(6);

      if (data) {
        if (data.milestones.total_students === 0) {
          try {
            const rawStudents = localStorage.getItem('hadescore_local_students');
            const localStudents = rawStudents ? JSON.parse(rawStudents) : [];
            const rawLeads = localStorage.getItem('hadescore_local_leads');
            const localLeads = rawLeads ? JSON.parse(rawLeads) : [];
            if (localStudents.length > 0 || localLeads.length > 0) {
              const totalSt = localStudents.length;
              const att = localLeads.filter((l: any) => l.has_completed_quiz || (l.session_count && l.session_count > 0)).length;
              const rep = localLeads.filter((l: any) => l.has_completed_quiz).length;
              const bc = localLeads.filter((l: any) => l.has_registered_bootcamp).length;
              data.milestones = {
                total_students: totalSt,
                quiz_attempts: att,
                reports_generated: rep,
                bootcamp_enrolled: bc,
                activation_rate: totalSt > 0 ? ((att / totalSt) * 100).toFixed(1) + '%' : '0.0%',
                completion_rate: att > 0 ? ((rep / att) * 100).toFixed(1) + '%' : '0.0%',
                conversion_rate: totalSt > 0 ? ((bc / totalSt) * 100).toFixed(1) + '%' : '0.0%',
              };
            }
          } catch {}
        }
        setMilestones(data.milestones);
        setChartData(data.chartData);
        setDomainStats(data.domainStats);
        setBreakdown(data.breakdown);
      }
    } catch (err) {
      console.error('Failed to load live analytics:', err);
    } finally {
      if (!isSilent) setIsLiveSyncing(false);
    }
  }, [period]);

  useEffect(() => {
    loadAnalytics(false);

    // Supabase Real-Time subscription for instant updates on all tables (silent)
    const channel = supabase
      .channel('admin-analytics-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'students' }, () => {
        loadAnalytics(true);
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'quiz_attempts' }, () => {
        loadAnalytics(true);
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'quiz_results' }, () => {
        loadAnalytics(true);
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bootcamp_registrations' }, () => {
        loadAnalytics(true);
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, () => {
        loadAnalytics(true);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadAnalytics]);

  const maxDomainCount = Math.max(...domainStats.map((d) => d.count), 1);

  return (
    <AdminLayout
      title={period === 'daily' ? 'Daily Analytics' : 'Monthly Analytics'}
      actions={
        <div className="flex items-center gap-3">
          {/* Period Toggle Switcher: Daily vs Monthly */}
          <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200/80 shadow-2xs">
            <button
              onClick={() => handlePeriodChange('daily')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                period === 'daily'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              Daily Analytics
            </button>
            <button
              onClick={() => handlePeriodChange('monthly')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                period === 'monthly'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5 text-emerald-600" />
              Monthly Analytics
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-semibold text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Sync
            </span>
            <button
              onClick={() => loadAnalytics()}
              className="flex items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-xl hover:bg-slate-100 border border-slate-200/60"
              title="Refresh live metrics"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLiveSyncing ? 'animate-spin text-emerald-600' : ''}`} />
            </button>
          </div>
        </div>
      }
    >
      {/* 4 Conversion Milestone Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <AdminStatCard
          title={period === 'daily' ? "1. Today's Registrations" : "1. Monthly Registrations"}
          value={milestones.total_students}
          icon={Users}
          subtitle={period === 'daily' ? "Candidates today" : "Current month"}
          accent="slate"
        />
        <AdminStatCard
          title={period === 'daily' ? "2. Today's Quiz Attempts" : "2. Monthly Quiz Attempts"}
          value={milestones.quiz_attempts}
          icon={BookOpen}
          change={milestones.activation_rate}
          changeType={parseFloat(milestones.activation_rate) > 0 ? 'up' : 'neutral'}
          subtitle="Activation Rate"
          accent="emerald"
        />
        <AdminStatCard
          title={period === 'daily' ? "3. Today's Reports" : "3. Monthly Reports"}
          value={milestones.reports_generated}
          icon={Award}
          change={milestones.completion_rate}
          changeType={parseFloat(milestones.completion_rate) > 0 ? 'up' : 'neutral'}
          subtitle="Completion Rate"
          accent="slate"
        />
        <AdminStatCard
          title={period === 'daily' ? "4. Bootcamp Enrolled" : "4. Monthly Bootcamp Enrolled"}
          value={milestones.bootcamp_enrolled}
          icon={Rocket}
          change={milestones.conversion_rate}
          changeType={parseFloat(milestones.conversion_rate) > 0 ? 'up' : 'neutral'}
          subtitle="Lead Conversion Rate"
          accent="emerald"
        />
      </div>

      {/* Analytics Visualization Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Technology Domain Demand */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                {period === 'daily' ? 'Recent Technology Domain Demand' : 'Monthly Technology Domain Demand'}
              </h3>
              <p className="text-xs text-slate-400">
                {period === 'daily' ? 'Candidate volume across domains over past 7 days' : 'Candidate volume across domains for active months'}
              </p>
            </div>
          </div>

          {domainStats.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              No domain assessment activity recorded yet.
            </div>
          ) : (
            <div className="space-y-4">
              {domainStats.map((item, index) => {
                const pct = ((item.count / maxDomainCount) * 100).toFixed(0);
                return (
                  <div key={item.name} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-800">{item.name}</span>
                      <span className="text-slate-500 font-medium">
                        {item.count} candidate{item.count === 1 ? '' : 's'} ({pct}%)
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          index === 0
                            ? 'bg-emerald-600'
                            : index === 1
                            ? 'bg-emerald-500'
                            : index === 2
                            ? 'bg-emerald-400'
                            : 'bg-slate-400'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Acquisition Velocity AreaChart */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                {period === 'daily' ? 'Daily Acquisition Velocity (Past 7 Days)' : 'Monthly Acquisition Velocity (Past 6 Months)'}
              </h3>
              <p className="text-xs text-slate-400">
                {period === 'daily' ? 'New candidates registered per calendar day' : 'New candidates registered per month'}
              </p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="analyticsVelocityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderRadius: '12px',
                  border: 'none',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="count"
                name="Candidates"
                stroke="#059669"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#analyticsVelocityGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Historical Breakdown Audit Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              {period === 'daily' ? 'Day-by-Day Conversion Audit' : 'Month-by-Month Conversion Audit'}
            </h3>
            <p className="text-xs text-slate-400">
              {period === 'daily' ? 'Granular daily funnel numbers for past reporting dates' : 'Aggregated monthly performance across all conversion milestones'}
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-200/60 px-3 py-1 rounded-xl">
            {breakdown.length} {period === 'daily' ? 'Days Analyzed' : 'Months Analyzed'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200/70 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <th className="px-6 py-3.5">{period === 'daily' ? 'Date' : 'Month'}</th>
                <th className="px-6 py-3.5">New Registrations</th>
                <th className="px-6 py-3.5">Quiz Attempts</th>
                <th className="px-6 py-3.5">Reports Completed</th>
                <th className="px-6 py-3.5">Bootcamp Enrolled</th>
                <th className="px-6 py-3.5 text-right">Conversion Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {breakdown.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                    No historical logs recorded for this period yet.
                  </td>
                </tr>
              ) : (
                breakdown.map((row) => (
                  <tr key={row.isoKey} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-3.5 font-bold text-slate-800">
                      {row.periodLabel}
                    </td>
                    <td className="px-6 py-3.5 font-mono text-slate-700">
                      {row.students}
                    </td>
                    <td className="px-6 py-3.5 font-mono text-slate-700">
                      {row.attempts}
                    </td>
                    <td className="px-6 py-3.5 font-mono text-slate-700">
                      {row.reports}
                    </td>
                    <td className="px-6 py-3.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md font-semibold text-[11px] ${
                        row.bootcamp > 0
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                          : 'text-slate-500'
                      }`}>
                        {row.bootcamp}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <span className={`font-semibold font-mono text-xs ${
                        parseFloat(row.conversionRate) > 0 ? 'text-emerald-700' : 'text-slate-400'
                      }`}>
                        {row.conversionRate}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
