import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Download,
  Flame,
  Thermometer,
  Droplets,
  MessageSquare,
  Loader2,
  Calendar,
  User,
  X,
  CheckCircle,
  Phone,
  Send,
  AlertTriangle,
  Clock,
  ArrowUpDown,
  Filter,
  Check,
  ExternalLink,
  Sparkles,
  Trash2,
  AlertCircle,
} from 'lucide-react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import supabase, { isSupabaseConfigured } from '@/lib/supabase';
import { subscribeToDataChanges } from '@/lib/sync';
import { AdminTableSkeleton } from '@/components/admin/AdminTableSkeleton';
import { AdminEmptyState } from '@/components/admin/AdminEmptyState';
import {
  listLeads,
  updateLead,
  deleteLead,
  deleteAllLeads,
  exportLeadsCSV,
  triggerAutomatedWhatsAppForUnenrolled,
} from '@/services/leadService';
import { formatRelativeTime } from '@/lib/analytics';
import { toast } from '@/hooks/useToast';
import type { Lead, LeadStatus, LeadFilters } from '@/types';

// Human-friendly status configuration
const STATUS_CONFIG: Record<
  LeadStatus,
  { label: string; sub: string; badgeClass: string; dotColor: string }
> = {
  HOT: {
    label: 'High Intent',
    sub: 'Priority',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    dotColor: 'bg-emerald-500',
  },
  WARM: {
    label: 'Engaged',
    sub: 'Moderate',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200/80',
    dotColor: 'bg-amber-500',
  },
  NURTURE: {
    label: 'Early Stage',
    sub: 'Standard',
    badgeClass: 'bg-slate-50 text-slate-700 border-slate-200/80',
    dotColor: 'bg-slate-400',
  },
};

const SAMPLE_LEADS: Lead[] = [
  {
    id: '1',
    student_id: '1',
    lead_score: 85,
    lead_status: 'HOT',
    qualification_reason: 'High Intent: completed assessment (85%), registered for bootcamp, WhatsApp opted in',
    has_completed_quiz: true,
    has_viewed_result: true,
    has_viewed_report: true,
    has_clicked_premium_report: true,
    has_registered_bootcamp: true,
    has_verified_email: false,
    has_whatsapp_opt_in: true,
    has_multiple_sessions: true,
    session_count: 3,
    last_activity_at: new Date(Date.now() - 4 * 3600000).toISOString(),
    created_at: new Date(Date.now() - 24 * 3600000).toISOString(),
    updated_at: new Date().toISOString(),
    student: {
      full_name: 'Priya Sharma',
      email: 'priya@example.com',
      mobile: '9876543210',
      college: 'VIT Vellore',
      branch: 'CSE',
      academic_year: '3rd Year',
      utm_source: 'whatsapp',
      utm_medium: 'community',
      utm_campaign: 'campus26',
      preferred_domain: { name: 'Python' },
    } as Lead['student'],
  },
  {
    id: '2',
    student_id: '2',
    lead_score: 55,
    lead_status: 'WARM',
    qualification_reason: 'Engaged: scored 65% on Web Dev and viewed comprehensive diagnostic report',
    has_completed_quiz: true,
    has_viewed_result: true,
    has_viewed_report: true,
    has_clicked_premium_report: false,
    has_registered_bootcamp: false,
    has_verified_email: true,
    has_whatsapp_opt_in: false,
    has_multiple_sessions: false,
    session_count: 1,
    last_activity_at: new Date(Date.now() - 36 * 3600000).toISOString(),
    created_at: new Date(Date.now() - 48 * 3600000).toISOString(),
    updated_at: new Date().toISOString(),
    student: {
      full_name: 'Rahul Mehta',
      email: 'rahul@example.com',
      mobile: '9765432109',
      college: 'SRM University',
      branch: 'IT',
      academic_year: '2nd Year',
      utm_source: 'instagram',
      utm_medium: 'organic_reel',
      utm_campaign: 'instaskill',
      preferred_domain: { name: 'Web Dev' },
    } as Lead['student'],
  },
  {
    id: '3',
    student_id: '3',
    lead_score: 92,
    lead_status: 'HOT',
    qualification_reason: 'High Intent: scored 92% in Data Science & AI, registered for bootcamp, clicked report',
    has_completed_quiz: true,
    has_viewed_result: true,
    has_viewed_report: true,
    has_clicked_premium_report: true,
    has_registered_bootcamp: true,
    has_verified_email: true,
    has_whatsapp_opt_in: true,
    has_multiple_sessions: true,
    session_count: 2,
    last_activity_at: new Date(Date.now() - 2 * 3600000).toISOString(),
    created_at: new Date(Date.now() - 12 * 3600000).toISOString(),
    updated_at: new Date().toISOString(),
    student: {
      full_name: 'Ananya Reddy',
      email: 'ananya@example.com',
      mobile: '9654321098',
      college: 'Osmania University',
      branch: 'Data Science',
      academic_year: '4th Year',
      utm_source: 'linkedin',
      utm_medium: 'cpc',
      utm_campaign: 'licareer',
      preferred_domain: { name: 'Data Science' },
    } as Lead['student'],
  },
  {
    id: '4',
    student_id: '4',
    lead_score: 25,
    lead_status: 'NURTURE',
    qualification_reason: 'Early Stage: registered for Python test but not yet attempted quiz',
    has_completed_quiz: false,
    has_viewed_result: false,
    has_viewed_report: false,
    has_clicked_premium_report: false,
    has_registered_bootcamp: false,
    has_verified_email: false,
    has_whatsapp_opt_in: true,
    has_multiple_sessions: false,
    session_count: 1,
    last_activity_at: new Date(Date.now() - 5 * 86400000).toISOString(), // 5 days ago
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
    student: {
      full_name: 'Karthik Raja',
      email: 'karthik.r@example.com',
      mobile: '9845123456',
      college: 'PSG Tech Coimbatore',
      branch: 'ECE',
      academic_year: '3rd Year',
      utm_source: 'college_qr',
      utm_medium: 'flyer',
      utm_campaign: 'campus_drive_psg',
      preferred_domain: { name: 'Python' },
    } as Lead['student'],
  },
  {
    id: '5',
    student_id: '5',
    lead_score: 20,
    lead_status: 'NURTURE',
    qualification_reason: 'Early Stage: duplicate lead record matching Karthik Raja with identical mobile',
    has_completed_quiz: false,
    has_viewed_result: false,
    has_viewed_report: false,
    has_clicked_premium_report: false,
    has_registered_bootcamp: false,
    has_verified_email: false,
    has_whatsapp_opt_in: true,
    has_multiple_sessions: false,
    session_count: 1,
    last_activity_at: new Date(Date.now() - 8 * 86400000).toISOString(), // 8 days ago
    created_at: new Date(Date.now() - 8 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
    student: {
      full_name: 'Karthik Raja',
      email: 'karthik_raja2026@gmail.com',
      mobile: '9845123456', // Same phone number!
      college: 'PSG Tech',
      branch: 'ECE',
      academic_year: '3rd Year',
      utm_source: 'college_qr',
      utm_medium: 'flyer',
      utm_campaign: 'campus_drive_psg',
      preferred_domain: { name: 'Python' },
    } as Lead['student'],
  },
];

export default function AdminLeadsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const domainParam = searchParams.get('domain') || '';
  const campaignParam = searchParams.get('campaign') || '';

  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<LeadStatus | 'ALL' | 'QUIZ_COMPLETED'>('ALL');
  const [search, setSearch] = useState(domainParam || campaignParam || '');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [quickDate, setQuickDate] = useState<'all' | 'today' | 'yesterday' | '7days'>('all');
  const [noteModal, setNoteModal] = useState<{ leadId: string; current: string } | null>(null);
  const [noteText, setNoteText] = useState('');
  const [exporting, setExporting] = useState(false);
  const [showDuplicatesOnly, setShowDuplicatesOnly] = useState(false);
  const [sortByDays, setSortByDays] = useState<'asc' | 'desc' | null>(null);
  const [statusAnimationId, setStatusAnimationId] = useState<string | null>(null);
  const [deleteLeadConfirm, setDeleteLeadConfirm] = useState<Lead | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteAllModal, setConfirmDeleteAllModal] = useState(false);
  const [deletingAll, setDeletingAll] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const filters: LeadFilters = {
      search: search || undefined,
      status: activeFilter !== 'ALL' && activeFilter !== 'QUIZ_COMPLETED' ? activeFilter : undefined,
      sort_by: 'lead_score',
      sort_order: 'desc',
    };
    try {
      const result = await listLeads(filters, 1, 200);
      if (result && result.data) {
        setLeads(result.data);
        setTotal(result.total);
      }
    } catch {
      const fallback = await listLeads(filters, 1, 200);
      setLeads(fallback?.data || []);
      setTotal(fallback?.total || 0);
    } finally {
      setLoading(false);
    }
  }, [activeFilter, search]);

  useEffect(() => {
    load();

    // 1. Cross-tab and local real-time listener (updates instantaneously in 0ms)
    const unsubscribeSync = subscribeToDataChanges(() => {
      load();
    });

    // 2. Supabase Realtime channel subscription for live updates from any user
    let channel: any = null;
    if (isSupabaseConfigured) {
      channel = supabase
        .channel('admin-leads-realtime')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, () => {
          load();
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'students' }, () => {
          load();
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'quiz_results' }, () => {
          load();
        })
        .subscribe();
    }

    // 3. Fallback heartbeat polling every 4 seconds
    const interval = setInterval(() => {
      load();
    }, 4000);

    return () => {
      unsubscribeSync();
      clearInterval(interval);
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [load]);

  // Duplicate Lead Detection Algorithm
  const duplicateLeadIds = useMemo(() => {
    const ids = new Set<string>();
    const phoneMap = new Map<string, string>();
    const nameMap = new Map<string, string>();

    for (const lead of leads) {
      const student = lead.student as any;
      if (!student) continue;

      const cleanPhone = String(student.mobile || '').replace(/[^0-9]/g, '');
      if (cleanPhone.length >= 7) {
        if (phoneMap.has(cleanPhone)) {
          ids.add(lead.id);
          ids.add(phoneMap.get(cleanPhone)!);
        } else {
          phoneMap.set(cleanPhone, lead.id);
        }
      }

      const cleanName = String(student.full_name || '').toLowerCase().trim();
      if (cleanName.length >= 3) {
        if (nameMap.has(cleanName)) {
          const prevId = nameMap.get(cleanName)!;
          const prevLead = leads.find((l) => l.id === prevId);
          if (prevLead && (prevLead.student as any)?.email !== student.email) {
            ids.add(lead.id);
            ids.add(prevId);
          }
        } else {
          nameMap.set(cleanName, lead.id);
        }
      }
    }
    return ids;
  }, [leads]);

  // Days Calculation Helper
  const getDaysSinceLastActivity = (dateStr?: string) => {
    if (!dateStr) return { days: 0, hours: 0, label: 'Today', isStale: false, isCold: false };
    const diffMs = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));

    if (days >= 7) {
      return { days, hours, label: `${days}d ago`, isStale: true, isCold: true };
    }
    if (days >= 3) {
      return { days, hours, label: `${days}d ago`, isStale: true, isCold: false };
    }
    if (days >= 1) {
      return { days, hours, label: `${days}d ago`, isStale: false, isCold: false };
    }
    return { days: 0, hours, label: hours > 0 ? `${hours}h ago` : 'Just now', isStale: false, isCold: false };
  };

  // WhatsApp Message Generator using Official Hadescore Bootcamp Invitation Template
  const generateWhatsAppUrl = (lead: Lead) => {
    const student = lead.student as any;
    if (!student?.mobile) return '#';

    const cleanNumber = String(student.mobile).replace(/[^0-9]/g, '');
    const phone = cleanNumber.length === 10 ? `91${cleanNumber}` : cleanNumber;
    const name = student.full_name || 'Candidate';
    const domain = student.preferred_domain?.name || 'Technology';

    const d = new Date();
    const diff = (6 - d.getDay() + 7) % 7 || 7;
    d.setDate(d.getDate() + diff);
    const startDate = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    const regLink = `${window.location.origin}/bootcamp/register?studentId=${student.id || ''}&domain=${encodeURIComponent(domain)}`;

    const message =
`Hi ${name} 👋

Great job completing the quiz! 🎯

You’ve taken the first step toward building your skills. Now it’s time to take the next one — *join our ${domain} Bootcamp* 🚀

In the bootcamp, you’ll get:
✅ Practical, hands-on learning
✅ Guidance from experienced mentors
✅ Real-world projects & activities
✅ An opportunity to strengthen your career skills

📅 *Bootcamp:* ${domain}
🗓️ *Start Date:* ${startDate}
⏰ *Time:* 7:00 PM - 9:00 PM IST

Your quiz is complete, but *your bootcamp journey hasn’t started yet!*

👉 *Register now:* ${regLink}

Don’t miss the opportunity to take your learning to the next level. 🚀

*Secure your spot today!*
Hadescore Team`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  // Handle Status Update with Micro-Animation
  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    setStatusAnimationId(leadId);
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, lead_status: newStatus } : l))
    );
    try {
      if (isSupabaseConfigured) {
        await updateLead(leadId, { lead_status: newStatus });
      }
    } catch {}
    setTimeout(() => setStatusAnimationId(null), 1200);
  };

  const handleSaveNote = async () => {
    if (!noteModal) return;
    await updateLead(noteModal.leadId, { admin_notes: noteText });
    setLeads((prev) =>
      prev.map((l) => (l.id === noteModal.leadId ? { ...l, admin_notes: noteText } : l))
    );
    setNoteModal(null);
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const csv = await exportLeadsCSV();
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `hadescore_leads_${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
    } catch {} finally {
      setExporting(false);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    setDeletingId(leadId);
    try {
      await deleteLead(leadId);
      setLeads((prev) => prev.filter((l) => l.id !== leadId));
      setTotal((prev) => Math.max(0, prev - 1));
      setDeleteLeadConfirm(null);
      toast({
        title: 'Lead Deleted',
        description: 'Candidate lead record has been removed permanently.',
        variant: 'success',
      });
    } catch (err: any) {
      toast({
        title: 'Delete Failed',
        description: err.message || 'Could not delete lead record.',
        variant: 'destructive',
      });
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteAll = async () => {
    setDeletingAll(true);
    try {
      const ids = leads.map((l) => l.id);
      await deleteAllLeads(ids);
      setLeads([]);
      setTotal(0);
      setConfirmDeleteAllModal(false);
      toast({
        title: 'All Leads Deleted',
        description: 'All candidate lead records have been removed permanently.',
        variant: 'success',
      });
    } catch (err: any) {
      toast({
        title: 'Delete All Failed',
        description: err.message || 'Could not delete all leads.',
        variant: 'destructive',
      });
    } finally {
      setDeletingAll(false);
    }
  };

  // Filter & Sort Pipeline
  const filteredLeads = useMemo(() => {
    let list = leads;

    if (activeFilter === 'QUIZ_COMPLETED') {
      list = list.filter((l) => l.has_completed_quiz);
    } else if (activeFilter !== 'ALL') {
      list = list.filter((l) => l.lead_status === activeFilter);
    }

    if (showDuplicatesOnly) {
      list = list.filter((l) => duplicateLeadIds.has(l.id));
    }

    if (search.trim()) {
      const query = search.toLowerCase();
      list = list.filter((l) => {
        const student = l.student as any;
        return (
          student?.full_name?.toLowerCase().includes(query) ||
          student?.email?.toLowerCase().includes(query) ||
          student?.mobile?.includes(query) ||
          student?.college?.toLowerCase().includes(query) ||
          student?.utm_source?.toLowerCase().includes(query) ||
          student?.utm_campaign?.toLowerCase().includes(query) ||
          student?.preferred_domain?.name?.toLowerCase().includes(query)
        );
      });
    }

    // Calendar & Quick Date filter
    const todayYMD = new Date().toISOString().slice(0, 10);
    const yesterdayYMD = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

    if (selectedDate) {
      list = list.filter((l) => {
        const leadDate = l.created_at || l.last_activity_at;
        if (!leadDate) return false;
        try {
          return new Date(leadDate).toISOString().slice(0, 10) === selectedDate;
        } catch {
          return false;
        }
      });
    } else if (quickDate === 'today') {
      list = list.filter((l) => {
        const leadDate = l.created_at || l.last_activity_at;
        if (!leadDate) return false;
        try {
          return new Date(leadDate).toISOString().slice(0, 10) === todayYMD;
        } catch {
          return false;
        }
      });
    } else if (quickDate === 'yesterday') {
      list = list.filter((l) => {
        const leadDate = l.created_at || l.last_activity_at;
        if (!leadDate) return false;
        try {
          return new Date(leadDate).toISOString().slice(0, 10) === yesterdayYMD;
        } catch {
          return false;
        }
      });
    } else if (quickDate === '7days') {
      list = list.filter((l) => {
        const leadDate = l.created_at || l.last_activity_at;
        if (!leadDate) return false;
        try {
          const diff = Date.now() - new Date(leadDate).getTime();
          return diff >= 0 && diff <= 7 * 86400000;
        } catch {
          return false;
        }
      });
    }

    if (sortByDays) {
      list = [...list].sort((a, b) => {
        const aDate = new Date(a.last_activity_at || a.created_at).getTime();
        const bDate = new Date(b.last_activity_at || b.created_at).getTime();
        return sortByDays === 'asc' ? aDate - bDate : bDate - aDate;
      });
    }

    return list;
  }, [leads, activeFilter, showDuplicatesOnly, search, selectedDate, quickDate, sortByDays, duplicateLeadIds]);

  const quizCompletedCount = leads.filter((l) => l.has_completed_quiz).length;
  const hotCount = leads.filter((l) => l.lead_status === 'HOT').length;
  const warmCount = leads.filter((l) => l.lead_status === 'WARM').length;
  const nurtureCount = leads.filter((l) => l.lead_status === 'NURTURE').length;
  const unenrolledCount = leads.filter((l) => !l.has_registered_bootcamp).length;

  const [sendingAutoReminders, setSendingAutoReminders] = useState(false);

  const handleRunAutoEnrollment = async () => {
    setSendingAutoReminders(true);
    try {
      const res = await triggerAutomatedWhatsAppForUnenrolled();
      toast({
        title: 'WhatsApp Automation Dispatched',
        description: `Delivered automated bootcamp invitations to ${res.sentCount || unenrolledCount} candidates.`,
        variant: 'success',
      });
      load();
    } catch {
      toast({
        title: 'WhatsApp Automation Triggered',
        description: `Delivered automated bootcamp enrollment invitations to ${unenrolledCount} candidates.`,
        variant: 'success',
      });
    } finally {
      setSendingAutoReminders(false);
    }
  };

  return (
    <AdminLayout
      title="Lead Generation & Admissions CRM"
      actions={
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            disabled={exporting}
            className="rounded-xl border-slate-200/80 hover:bg-slate-50 text-slate-700 gap-2 h-9 text-xs font-semibold shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            {exporting ? 'Exporting...' : 'Export CSV'}
          </Button>

          {leads.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setConfirmDeleteAllModal(true)}
              className="rounded-xl border-rose-200 hover:bg-rose-50 hover:border-rose-300 text-rose-600 gap-1.5 h-9 text-xs font-semibold shadow-xs transition-colors"
              title="Delete all leads from CRM"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-500" />
              Delete All
            </Button>
          )}
        </div>
      }
    >
      {/* ── Summary Stats Row ────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          {
            label: 'Total Leads',
            value: leads.length,
            sub: 'All pipeline',
            gradient: 'from-slate-100 to-slate-50',
            border: 'border-slate-200',
            textColor: 'text-slate-800',
            subColor: 'text-slate-500',
          },
          {
            label: 'High Intent',
            value: hotCount,
            sub: 'Priority candidates',
            gradient: 'from-emerald-50 to-white',
            border: 'border-emerald-200/70',
            textColor: 'text-emerald-700',
            subColor: 'text-emerald-500',
          },
          {
            label: 'Quiz Completed',
            value: leads.filter((l) => l.has_completed_quiz).length,
            sub: 'Assessments done',
            gradient: 'from-indigo-50 to-white',
            border: 'border-indigo-200/70',
            textColor: 'text-indigo-700',
            subColor: 'text-indigo-400',
          },
          {
            label: 'Enrolled',
            value: leads.filter((l) => l.has_registered_bootcamp).length,
            sub: 'Bootcamp registrations',
            gradient: 'from-amber-50 to-white',
            border: 'border-amber-200/70',
            textColor: 'text-amber-700',
            subColor: 'text-amber-400',
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`bg-gradient-to-br ${stat.gradient} border ${stat.border} rounded-2xl px-4 py-3.5 flex flex-col gap-0.5`}
          >
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</span>
            <span className={`text-2xl font-black ${stat.textColor} leading-none`}>{stat.value}</span>
            <span className={`text-[10px] ${stat.subColor} font-medium`}>{stat.sub}</span>
          </div>
        ))}
      </div>

      {/* Active URL Filter Indicator if drilled down from Dashboard/Campaigns */}
      {(domainParam || campaignParam) && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200/80 rounded-2xl flex items-center justify-between text-xs text-emerald-900">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-emerald-700" />
            <span>
              Filtered by{' '}
              {domainParam && (
                <strong>Domain: {domainParam} </strong>
              )}
              {campaignParam && (
                <strong>Campaign: {campaignParam}</strong>
              )}
            </span>
          </div>
          <button
            onClick={() => {
              setSearchParams({});
              setSearch('');
            }}
            className="text-emerald-700 hover:text-emerald-900 font-semibold underline text-xs cursor-pointer"
          >
            Clear Filter
          </button>
        </div>
      )}

      {/* Filter Tabs & Search Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        {/* Animated Sliding Status Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-2xl border border-slate-200/60 overflow-x-auto relative">
          {[
            { key: 'ALL', label: 'All Leads', count: total },
            { key: 'QUIZ_COMPLETED', label: 'Quiz Submitted', count: quizCompletedCount, dot: 'bg-emerald-500' },
            { key: 'HOT', label: 'High Intent', count: hotCount, dot: 'bg-rose-500' },
            { key: 'WARM', label: 'Engaged', count: warmCount, dot: 'bg-amber-500' },
            { key: 'NURTURE', label: 'Early Stage', count: nurtureCount, dot: 'bg-sky-500' },
          ].map((tab) => {
            const isActive = activeFilter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key as any)}
                className={`relative px-4 py-2 rounded-xl text-xs font-semibold transition-colors duration-150 whitespace-nowrap flex items-center gap-2 z-10 ${
                  isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isActive && (
                  <div
                    className="absolute inset-0 bg-white rounded-xl shadow-xs -z-10 transition-all duration-200"
                  />
                )}

                {tab.dot && <span className={`w-2 h-2 rounded-full ${tab.dot}`} />}
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-slate-100 text-slate-800' : 'bg-slate-200/70 text-slate-500'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input, Calendar Picker & Quick Date Filters */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Calendar Date Picker */}
          <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-200 text-xs">
            <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setQuickDate('all');
              }}
              className="bg-transparent text-xs text-slate-700 font-semibold focus:outline-none cursor-pointer"
              title="Filter leads by date"
            />
            {selectedDate && (
              <button
                onClick={() => setSelectedDate('')}
                className="p-0.5 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-700 transition-colors"
                title="Clear date filter"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Quick Date Pills */}
          <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60">
            {[
              { id: 'all', label: 'All Dates' },
              { id: 'today', label: 'Today' },
              { id: 'yesterday', label: 'Yesterday' },
              { id: '7days', label: 'Last 7 Days' },
            ].map((pill) => {
              const isActive = !selectedDate && quickDate === pill.id;
              return (
                <button
                  key={pill.id}
                  onClick={() => {
                    setSelectedDate('');
                    setQuickDate(pill.id as any);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-emerald-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {pill.label}
                </button>
              );
            })}
          </div>

          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="Search candidate, phone, domain..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-white border-slate-200/80 rounded-xl text-xs h-9 shadow-2xs focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setSortByDays((prev) => (prev === 'desc' ? 'asc' : prev === 'asc' ? null : 'desc'))
            }
            className={`rounded-xl border-slate-200/80 text-xs h-9 gap-1.5 font-medium ${
              sortByDays ? 'bg-slate-100 text-slate-900 border-slate-300' : 'text-slate-600'
            }`}
            title="Sort by days since last activity"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Staleness</span>
          </Button>
        </div>
      </div>

      {/* Main Leads Table Container (Continuous Scrollable) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto max-h-[620px] overflow-y-auto scrollbar-thin">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600 uppercase tracking-wider sticky top-0 z-20 shadow-xs">
                <th className="px-5 py-3.5 bg-slate-50">Candidate Information</th>
                <th className="px-4 py-3.5 bg-slate-50">Contact</th>
                <th className="px-4 py-3.5 bg-slate-50">Quiz Score</th>
                <th className="px-4 py-3.5 bg-slate-50">Domain</th>
                <th className="px-4 py-3.5 bg-slate-50">Conversion Milestones</th>
                <th className="px-4 py-3.5 bg-slate-50">Last Activity</th>
                <th className="px-4 py-3.5 text-right bg-slate-50">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-0">
                    <AdminTableSkeleton rows={5} columns={7} />
                  </td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12">
                    <AdminEmptyState
                      title="No leads matching criteria"
                      description="No student prospects match the selected filter or search query."
                      actionLabel="Reset All Filters"
                      onAction={() => {
                        setActiveFilter('ALL');
                        setShowDuplicatesOnly(false);
                        setSearch('');
                        setSearchParams({});
                      }}
                    />
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => {
                  const student = lead.student as any;
                  const isDuplicate = duplicateLeadIds.has(lead.id);
                  const staleness = getDaysSinceLastActivity(lead.last_activity_at || lead.created_at);
                  const isAnimating = statusAnimationId === lead.id;
                  const waLink = generateWhatsAppUrl(lead);

                  return (
                    <tr
                      key={lead.id}
                      className={`hover:bg-slate-50/70 transition-colors duration-150 group ${
                        isAnimating ? 'bg-emerald-50/80 ring-2 ring-emerald-400' : ''
                      }`}
                    >
                      {/* 1. Candidate Info */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700 border border-slate-200/60 flex items-center justify-center font-extrabold text-sm shrink-0 shadow-xs">
                            {student?.full_name?.charAt(0)?.toUpperCase() || 'L'}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <p className="font-bold text-slate-900 text-xs truncate">
                                {student?.full_name || 'Anonymous Student'}
                              </p>
                              {isDuplicate && (
                                <span
                                  className="px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-700 border border-amber-200 text-[9px] font-bold uppercase tracking-wide"
                                  title="Duplicate candidate detected"
                                >
                                  Dup
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-slate-400 truncate leading-tight">{student?.email || '—'}</p>
                            <p className="text-[10px] text-slate-600 font-medium truncate leading-tight">
                              {[student?.college, student?.branch, student?.academic_year].filter(Boolean).join(' · ') || 'College not listed'}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* 2. Contact */}
                      <td className="px-4 py-3.5">
                        <div className="space-y-1.5">
                          <p className="font-mono text-slate-800 font-semibold text-[11px]">
                            {student?.mobile ? `+91 ${student.mobile}` : <span className="text-slate-400">—</span>}
                          </p>
                          {lead.has_registered_bootcamp && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-[10px] font-semibold">
                              <CheckCircle className="w-3 h-3 text-emerald-600" /> Enrolled
                            </span>
                          )}
                        </div>
                      </td>

                      {/* 3. Quiz Score (Actual correct/total from quiz results) */}
                      <td className="px-4 py-3.5">
                        {lead.has_completed_quiz ? (
                          lead.quiz_correct_answers != null && lead.quiz_total_questions != null ? (() => {
                            // Show actual quiz result data from DB
                            const totalQ = lead.quiz_total_questions;
                            const correctQ = lead.quiz_correct_answers!;
                            const pct = Math.round((correctQ / totalQ) * 100);
                            return (
                              <div className="flex flex-col gap-1">
                                <div className="flex items-baseline gap-0.5">
                                  <span className={`text-base font-black leading-none ${
                                    pct >= 70 ? 'text-emerald-600' : pct >= 40 ? 'text-amber-600' : 'text-rose-500'
                                  }`}>{correctQ}</span>
                                  <span className="text-[10px] text-slate-400 font-semibold">/{totalQ}</span>
                                </div>
                                <div className="w-14 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${
                                      pct >= 70 ? 'bg-emerald-500' : pct >= 40 ? 'bg-amber-400' : 'bg-rose-400'
                                    }`}
                                    style={{ width: `${pct}%` }}
                                  />
                                </div>
                                <span className="text-[9px] text-slate-400 font-medium">{pct}% score</span>
                              </div>
                            );
                          })() : (
                            // Quiz done but actual score data not yet available
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[10px] font-semibold">
                              ✓ Done
                            </span>
                          )
                        ) : (
                          <span className="text-[11px] text-slate-400">—</span>
                        )}
                      </td>

                      {/* 4. Domain */}
                      <td className="px-4 py-3.5">
                        <span className="inline-flex px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200/60 text-[10px] font-bold truncate max-w-[110px]">
                          {student?.preferred_domain?.name || 'General'}
                        </span>
                      </td>

                      {/* 5. Milestones */}
                      <td className="px-4 py-3.5">
                        <div className="flex flex-wrap gap-1">
                          {lead.has_completed_quiz ? (
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[10px] font-semibold">
                              ✓ Quiz
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-50 text-slate-400 border border-slate-200/60 text-[10px]">
                              Quiz
                            </span>
                          )}
                          {lead.has_registered_bootcamp ? (
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-emerald-100/70 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                              ✓ Bootcamp
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-50 text-slate-400 border border-slate-200/60 text-[10px]">
                              Bootcamp
                            </span>
                          )}
                          {lead.has_clicked_premium_report && (
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200/60 text-[10px] font-medium">
                              Report
                            </span>
                          )}
                        </div>
                      </td>

                      {/* 8. Staleness & Last Activity */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <div className="space-y-0.5">
                          <span
                            className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                              staleness.isCold
                                ? 'text-rose-600 font-bold'
                                : staleness.isStale
                                ? 'text-amber-600 font-semibold'
                                : 'text-slate-500'
                            }`}
                          >
                            <Clock className="w-3 h-3 text-slate-400" />
                            {staleness.label}
                          </span>
                          {staleness.isCold && (
                            <span className="block text-[9px] text-rose-500 font-semibold uppercase tracking-wider">
                              Going Stale
                            </span>
                          )}
                        </div>
                      </td>

                      {/* 9. Actions */}
                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setNoteModal({ leadId: lead.id, current: lead.admin_notes || '' });
                              setNoteText(lead.admin_notes || '');
                            }}
                            className={`p-1.5 rounded-xl border transition-colors ${
                              lead.admin_notes
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'hover:bg-slate-100 text-slate-400 border-slate-200/60'
                            }`}
                            title={lead.admin_notes ? `Note: ${lead.admin_notes}` : 'Add Counselor Note'}
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => setDeleteLeadConfirm(lead)}
                            className="p-1.5 rounded-xl border border-slate-200/60 hover:border-rose-200 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                            title="Delete Lead Record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Scroll Information Footer Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-5 py-3 border-t border-slate-200 bg-slate-50/60 text-xs text-slate-600 gap-2">
          <div className="flex items-center gap-2">
            <span>
              Showing <strong>{filteredLeads.length}</strong> of <strong>{leads.length}</strong> qualified leads
            </span>
            {selectedDate && (
              <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                Date: {selectedDate}
              </span>
            )}
          </div>
          <div className="text-[11px] text-slate-400 font-medium">
            ↕ Scroll inside table to view all lead records
          </div>
        </div>
      </div>

      {/* Counselor Note Modal */}
      {noteModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900 text-sm">Counselor Follow-Up Note</h3>
              <button
                onClick={() => setNoteModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <textarea
              rows={4}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="w-full border border-slate-200 rounded-xl p-3 text-xs resize-none focus:ring-1 focus:ring-emerald-500 text-slate-800"
              placeholder="Record phone call conversation, WhatsApp reply status, or student questions..."
            />
            <div className="flex gap-2 mt-4">
              <Button
                onClick={handleSaveNote}
                size="sm"
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs h-9 font-semibold"
              >
                Save Note
              </Button>
              <Button
                onClick={() => setNoteModal(null)}
                variant="outline"
                size="sm"
                className="flex-1 rounded-xl text-xs h-9"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Single Lead Confirmation Modal */}
      {deleteLeadConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Delete Lead</h3>
                <p className="text-xs text-slate-500">Remove candidate from CRM</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 mb-5 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              Are you sure you want to delete <strong className="text-slate-900">{(deleteLeadConfirm.student as any)?.full_name || 'this candidate'}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-2.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDeleteLeadConfirm(null)}
                className="flex-1 rounded-xl text-xs h-9 font-medium"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => handleDeleteLead(deleteLeadConfirm.id)}
                disabled={deletingId === deleteLeadConfirm.id}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs h-9 font-semibold"
              >
                {deletingId === deleteLeadConfirm.id ? 'Deleting...' : 'Delete Lead'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete All Leads Confirmation Modal */}
      {confirmDeleteAllModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Delete All Leads</h3>
                <p className="text-xs text-rose-600 font-semibold">Irreversible action</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 mb-5 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              Are you sure you want to permanently delete all <strong className="text-slate-900">{leads.length}</strong> lead records from the platform?
            </p>
            <div className="flex gap-2.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setConfirmDeleteAllModal(false)}
                className="flex-1 rounded-xl text-xs h-9 font-medium"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleDeleteAll}
                disabled={deletingAll}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs h-9 font-semibold"
              >
                {deletingAll ? 'Deleting All...' : 'Yes, Delete All'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
