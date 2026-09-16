import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Users,
  Target,
  TrendingUp,
  Calendar,
  CheckCircle2,
  ArrowUpRight,
  RefreshCw,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Cell,
} from 'recharts';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { AdminStatCard } from '@/components/admin/AdminStatCard';
import { getDashboardStats, getLeadsByDay, getDomainPopularity } from '@/services/adminService';
import { getLocalStudents } from '@/services/studentService';
import { getLocalLeads } from '@/services/leadService';
import supabase, { isSupabaseConfigured } from '@/lib/supabase';
import type { DashboardStats } from '@/types';

const INITIAL_STATS: DashboardStats = {
  total_students: 0,
  new_leads_today: 0,
  quiz_attempts: 0,
  completed_quizzes: 0,
  bootcamp_registrations: 0,
  hot_leads: 0,
  warm_leads: 0,
  nurture_leads: 0,
  conversion_rate: 0,
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 text-white backdrop-blur-md px-3 py-2 rounded-xl text-xs shadow-xl border border-slate-800">
        <p className="font-semibold text-slate-300 mb-1">{label || payload[0]?.name}</p>
        {payload.map((p: any, idx: number) => (
          <p key={idx} className="text-xs flex items-center justify-between gap-3">
            <span style={{ color: p.color || '#10b981' }}>{p.name}:</span>
            <span className="font-bold font-mono">{p.value?.toLocaleString()}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>(INITIAL_STATS);
  const [leadsByDay, setLeadsByDay] = useState<{ date: string; count: number }[]>([]);
  const [domainPop, setDomainPop] = useState<{ name: string; count: number }[]>([]);
  const [isLiveSyncing, setIsLiveSyncing] = useState(false);
  const navigate = useNavigate();

  const loadData = useCallback(async () => {
    if (!isSupabaseConfigured) {
      try {
        const localStudents = getLocalStudents();
        const localLeads = getLocalLeads();

        const totalStudents = localStudents.length;
        const hotLeads = localLeads.filter((l: any) => l.lead_status === 'HOT').length;
        const warmLeads = localLeads.filter((l: any) => l.lead_status === 'WARM').length;
        const nurtureLeads = localLeads.filter((l: any) => l.lead_status === 'NURTURE').length;
        const bootcampCount = localLeads.filter((l: any) => l.has_registered_bootcamp).length;

        const todayStr = new Date().toISOString().slice(0, 10);
        const newToday = localStudents.filter((s: any) => s.created_at?.startsWith(todayStr)).length;
        const attempts = localLeads.filter((l: any) => l.has_completed_quiz || (l.session_count && l.session_count > 0)).length;
        const completed = localLeads.filter((l: any) => l.has_completed_quiz).length;

        setStats({
          total_students: totalStudents,
          new_leads_today: newToday,
          quiz_attempts: attempts,
          completed_quizzes: completed,
          bootcamp_registrations: bootcampCount,
          hot_leads: hotLeads,
          warm_leads: warmLeads,
          nurture_leads: nurtureLeads,
          conversion_rate: totalStudents > 0 ? parseFloat(((bootcampCount / totalStudents) * 100).toFixed(1)) : 0,
        });

        // Dynamic domain popularity
        const domainCounts: Record<string, number> = {};
        localStudents.forEach((s) => {
          const dName = s.preferred_domain?.name || 'General';
          domainCounts[dName] = (domainCounts[dName] || 0) + 1;
        });

        const popArray = Object.entries(domainCounts).map(([name, count]) => ({ name, count }));
        if (popArray.length > 0) {
          setDomainPop(popArray);
        } else {
          setDomainPop([]);
        }

        // Dynamic past 7 days velocity
        const daysMap: Record<string, number> = {};
        for (let i = 6; i >= 0; i--) {
          const d = new Date(Date.now() - i * 86400000);
          const isoKey = d.toISOString().slice(0, 10);
          daysMap[isoKey] = 0;
        }

        localStudents.forEach((s) => {
          if (s.created_at) {
            const key = s.created_at.slice(0, 10);
            if (daysMap[key] !== undefined) {
              daysMap[key]++;
            }
          }
        });

        const chartData = Object.entries(daysMap).map(([isoKey, count]) => {
          const d = new Date(isoKey);
          return {
            date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            count,
          };
        });
        setLeadsByDay(chartData);
      } catch {}
      return;
    }
    try {
      setIsLiveSyncing(true);
      const [dashStats, dayData, domData] = await Promise.all([
        getDashboardStats(),
        getLeadsByDay(10),
        getDomainPopularity(),
      ]);
      if (dashStats) setStats(dashStats);
      if (dayData) setLeadsByDay(dayData);
      if (domData) setDomainPop(domData);
    } catch (err) {
      console.error('Dashboard live data fetch error:', err);
    } finally {
      setIsLiveSyncing(false);
    }
  }, []);

  useEffect(() => {
    loadData();

    // Supabase Real-Time subscription for instant dashboard updates
    const channel = supabase
      .channel('admin-dashboard-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'students' }, () => {
        loadData();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, () => {
        loadData();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'quiz_attempts' }, () => {
        loadData();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'quiz_results' }, () => {
        loadData();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bootcamp_registrations' }, () => {
        loadData();
      })
      .subscribe();

    // Polling heartbeat every 6 seconds
    const interval = setInterval(loadData, 6000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, [loadData]);

  const handleDomainBarClick = (entry: any) => {
    if (entry && entry.name) {
      navigate(`/admin/leads?domain=${encodeURIComponent(entry.name)}`);
    }
  };

  return (
    <AdminLayout
      title="Executive Dashboard"
      subtitle="Overview of candidate performance, technical domain assessments, and enrollment conversions"
      actions={
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => loadData()}
            className="p-1.5 rounded-xl border border-slate-200/80 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            title="Refresh live metrics"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLiveSyncing ? 'animate-spin text-emerald-600' : ''}`} />
          </button>
          <Button
            size="sm"
            onClick={() => navigate('/admin/students')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2 h-9 text-xs font-semibold shadow-xs"
          >
            <Users className="w-3.5 h-3.5" />
            View Registered Students
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
          </Button>
        </div>
      }
    >
      {/* Key Executive KPI Cards (100% Live Database Counts) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <AdminStatCard
          title="Total Candidates"
          value={stats.total_students}
          icon={Users}
          subtitle="Registered test-takers"
          accent="slate"
        />
        <AdminStatCard
          title="New Candidates Today"
          value={stats.new_leads_today}
          icon={Calendar}
          subtitle="Captured today"
          accent="emerald"
        />
        <AdminStatCard
          title="High Intent Candidates"
          value={stats.hot_leads}
          icon={Target}
          badge="Priority"
          subtitle="Scored ≥60 pts"
          accent="emerald"
        />
        <AdminStatCard
          title="Engaged Candidates"
          value={stats.warm_leads}
          icon={TrendingUp}
          subtitle="Scored 35 – 59 pts"
          accent="amber"
        />
        <AdminStatCard
          title="Bootcamp Conversion"
          value={`${stats.conversion_rate}%`}
          icon={CheckCircle2}
          subtitle="Assessment to Bootcamp"
          accent="emerald"
        />
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* 1. Clickable Domain Assessment Demand */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm tracking-tight flex items-center gap-1.5">
                <span>Domain Assessment Demand</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                  Click Bar to Filter
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Candidate volume distributed across technical domains
              </p>
            </div>
          </div>

          {domainPop.length === 0 ? (
            <div className="h-[290px] flex items-center justify-center text-xs text-slate-400">
              No technical domain assessments completed yet. Live metrics will populate as candidates test.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={290}>
              <BarChart
                data={domainPop}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 15, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis
                  type="number"
                  allowDecimals={false}
                  tick={{ fontSize: 11, fill: '#94a3b8' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={110}
                  tick={{ fontSize: 11, fill: '#334155' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="count"
                  name="Candidates"
                  fill="#10b981"
                  radius={[0, 6, 6, 0]}
                  onClick={(entry) => handleDomainBarClick(entry)}
                  className="cursor-pointer"
                >
                  {domainPop.map((_, index) => (
                    <Cell
                      key={index}
                      fill={
                        index === 0
                          ? '#059669'
                          : index === 1
                          ? '#10b981'
                          : index === 2
                          ? '#34d399'
                          : '#64748b'
                      }
                      className="hover:opacity-80 transition-opacity cursor-pointer"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* 2. Daily Candidate Inflow Velocity Trend */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm tracking-tight">
                Daily Candidate Inflow (Last 10 Days)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Number of prospective candidates registered per day
              </p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={290}>
            <AreaChart data={leadsByDay} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="leadInflowGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="count"
                name="New Candidates"
                stroke="#059669"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#leadInflowGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AdminLayout>
  );
}
