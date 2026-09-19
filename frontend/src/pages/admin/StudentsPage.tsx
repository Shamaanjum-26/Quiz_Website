import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  Search,
  Download,
  Trash2,
  AlertCircle,
  Eye,
  Building,
  GraduationCap,
  MapPin,
  Calendar,
  User,
  Mail,
  Phone,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
} from 'lucide-react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AdminTableSkeleton } from '@/components/admin/AdminTableSkeleton';
import { AdminEmptyState } from '@/components/admin/AdminEmptyState';
import { getStudentDomainDisplay } from '@/lib/domainHelper';
import {
  listStudents,
  exportStudentsCSV,
  deleteStudent,
  deleteAllStudents,
  getLocalStudents,
  LOCAL_STUDENTS_KEY,
} from '@/services/studentService';
import supabase, { isSupabaseConfigured } from '@/lib/supabase';
import { formatDate, formatRelativeTime } from '@/lib/analytics';
import { toast } from '@/hooks/useToast';
import type { Student, StudentFilters } from '@/types';

// Sample fallback data for demonstration when offline
const SAMPLE_STUDENTS: Student[] = [
  {
    id: '1',
    full_name: 'Priya Sharma',
    email: 'priya@example.com',
    mobile: '9876543210',
    college: 'VIT Vellore',
    branch: 'Computer Science (CSE)',
    academic_year: '3rd Year',
    state: 'Tamil Nadu',
    consent: true,
    is_verified: true,
    whatsapp_opt_in: true,
    preferred_domain: { id: 'd1', name: 'Python Development', slug: 'python', icon: '🐍', color: '#059669', difficulty: 'intermediate', question_count: 30, estimated_minutes: 30, active: true, display_order: 1, created_at: '', updated_at: '' },
    created_at: new Date(Date.now() - 3600000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    full_name: 'Rahul Mehta',
    email: 'rahul@example.com',
    mobile: '9765432109',
    college: 'SRM University',
    branch: 'Information Technology',
    academic_year: '2nd Year',
    state: 'Karnataka',
    consent: true,
    is_verified: true,
    whatsapp_opt_in: false,
    preferred_domain: { id: 'd2', name: 'Full-Stack Web Dev', slug: 'web-dev', icon: '💻', color: '#4f46e5', difficulty: 'intermediate', question_count: 30, estimated_minutes: 30, active: true, display_order: 2, created_at: '', updated_at: '' },
    created_at: new Date(Date.now() - 7200000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    full_name: 'Ananya Reddy',
    email: 'ananya@example.com',
    mobile: '9654321098',
    college: 'Osmania University',
    branch: 'Data Science & AI',
    academic_year: 'Final Year',
    state: 'Telangana',
    consent: true,
    is_verified: true,
    whatsapp_opt_in: true,
    preferred_domain: { id: 'd3', name: 'Data Science & AI', slug: 'data-science', icon: '📊', color: '#0284c7', difficulty: 'intermediate', question_count: 30, estimated_minutes: 30, active: true, display_order: 3, created_at: '', updated_at: '' },
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [quickDate, setQuickDate] = useState<'all' | 'today' | 'yesterday' | '7days'>('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [deleteStudentConfirm, setDeleteStudentConfirm] = useState<Student | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteAllModal, setConfirmDeleteAllModal] = useState(false);
  const [deletingAll, setDeletingAll] = useState(false);
  const [exporting, setExporting] = useState(false);

  const initialLoadedRef = useRef(false);

  const load = useCallback(async (isSilent = false) => {
    if (!isSilent && !initialLoadedRef.current) {
      setLoading(true);
    }
    try {
      if (!isSupabaseConfigured) {
        const local = getLocalStudents();
        setStudents(local);
        setTotal(local.length);
        return;
      }
      const result = await listStudents({}, 1, 200);
      if (result && result.data) {
        setStudents(result.data as Student[]);
        setTotal(result.total);
      }
    } catch {
      const local = getLocalStudents();
      setStudents(local);
      setTotal(local.length);
    } finally {
      initialLoadedRef.current = true;
      if (!isSilent) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    load(false);
  }, [load]);

  // Filter students based on search and selected calendar date
  const filteredStudents = useMemo(() => {
    let list = [...students];

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) =>
          s.full_name?.toLowerCase().includes(q) ||
          s.email?.toLowerCase().includes(q) ||
          s.college?.toLowerCase().includes(q) ||
          s.branch?.toLowerCase().includes(q) ||
          s.mobile?.includes(q) ||
          getStudentDomainDisplay(s).name.toLowerCase().includes(q)
      );
    }

    // Calendar & Quick Date filter
    const todayYMD = new Date().toISOString().slice(0, 10);
    const yesterdayYMD = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

    if (selectedDate) {
      list = list.filter((s) => {
        if (!s.created_at) return false;
        try {
          return new Date(s.created_at).toISOString().slice(0, 10) === selectedDate;
        } catch {
          return false;
        }
      });
    } else if (quickDate === 'today') {
      list = list.filter((s) => {
        if (!s.created_at) return false;
        try {
          return new Date(s.created_at).toISOString().slice(0, 10) === todayYMD;
        } catch {
          return false;
        }
      });
    } else if (quickDate === 'yesterday') {
      list = list.filter((s) => {
        if (!s.created_at) return false;
        try {
          return new Date(s.created_at).toISOString().slice(0, 10) === yesterdayYMD;
        } catch {
          return false;
        }
      });
    } else if (quickDate === '7days') {
      list = list.filter((s) => {
        if (!s.created_at) return false;
        try {
          const diff = Date.now() - new Date(s.created_at).getTime();
          return diff >= 0 && diff <= 7 * 86400000;
        } catch {
          return false;
        }
      });
    }

    // Sort newest first
    return list.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
  }, [students, search, selectedDate, quickDate]);

  const handleExport = async () => {
    setExporting(true);
    try {
      const csv = await exportStudentsCSV({ search: search || undefined });
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `hadescore_registered_students_${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
    } catch {
      // ignore
    } finally {
      setExporting(false);
    }
  };

  const handleDeleteStudent = async (studentId: string) => {
    setDeletingId(studentId);
    try {
      await deleteStudent(studentId);
      setStudents((prev) => prev.filter((s) => s.id !== studentId));
      setTotal((prev) => Math.max(0, prev - 1));
      if (selectedStudent?.id === studentId) setSelectedStudent(null);
      setDeleteStudentConfirm(null);
      toast({
        title: 'Student Record Deleted',
        description: 'Candidate has been removed from registered students permanently.',
        variant: 'success',
      });
    } catch (err: any) {
      toast({
        title: 'Delete Failed',
        description: err.message || 'Could not delete student record.',
        variant: 'destructive',
      });
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteAll = async () => {
    setDeletingAll(true);
    try {
      const ids = students.map((s) => s.id);
      await deleteAllStudents(ids);
      setStudents([]);
      setTotal(0);
      setConfirmDeleteAllModal(false);
      setSelectedStudent(null);
      toast({
        title: 'All Students Deleted',
        description: 'All registered student records have been deleted permanently.',
        variant: 'success',
      });
    } catch (err: any) {
      toast({
        title: 'Delete All Failed',
        description: err.message || 'Could not delete all students.',
        variant: 'destructive',
      });
    } finally {
      setDeletingAll(false);
    }
  };

  return (
    <AdminLayout
      title="Quiz Registered Students"
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

          {students.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setConfirmDeleteAllModal(true)}
              className="rounded-xl border-rose-200 hover:bg-rose-50 hover:border-rose-300 text-rose-600 gap-1.5 h-9 text-xs font-semibold shadow-xs transition-colors"
              title="Delete all registered students"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-500" />
              Delete All
            </Button>
          )}
        </div>
      }
    >
      {/* Search Bar, Calendar Date Picker & Quick Date Filters Header */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs mb-5 space-y-3">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              type="text"
              placeholder="Search candidate, email, mobile, college, domain..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-slate-50/70 border-slate-200/80 rounded-xl text-xs h-9 shadow-xs focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Calendar Picker & Quick Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {/* Native Calendar Input */}
            <div className="flex items-center gap-1.5 bg-slate-50/80 px-2.5 py-1 rounded-xl border border-slate-200 text-xs">
              <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setQuickDate('all');
                }}
                className="bg-transparent text-xs text-slate-700 font-semibold focus:outline-none cursor-pointer"
                title="Filter by specific date"
              />
              {selectedDate && (
                <button
                  onClick={() => setSelectedDate('')}
                  className="p-0.5 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-700 transition-colors"
                  title="Clear date"
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

            {/* Total Count Badge */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-3 py-1.5 rounded-xl font-bold ml-auto lg:ml-0">
              <span>Candidates:</span>
              <strong className="text-emerald-950 font-black">{filteredStudents.length}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Main Students Table (Scrollable View, No Page Cutoff) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto max-h-[620px] overflow-y-auto scrollbar-thin">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200/90 bg-slate-50 text-[11px] font-bold text-slate-600 uppercase tracking-wider sticky top-0 z-20 shadow-xs">
                <th className="px-5 py-3.5 bg-slate-50">Candidate Name & Email</th>
                <th className="px-4 py-3.5 bg-slate-50">Contact (Mobile)</th>
                <th className="px-4 py-3.5 bg-slate-50">College / University</th>
                <th className="px-4 py-3.5 bg-slate-50">Branch / Course</th>
                <th className="px-4 py-3.5 bg-slate-50">Academic Year</th>
                <th className="px-4 py-3.5 bg-slate-50">State</th>
                <th className="px-4 py-3.5 bg-slate-50">Registered Domain</th>
                <th className="px-4 py-3.5 bg-slate-50">Registered Date</th>
                <th className="px-4 py-3.5 text-right bg-slate-50">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {loading ? (
                <tr>
                  <td colSpan={9} className="p-0">
                    <AdminTableSkeleton rows={5} columns={9} />
                  </td>
                </tr>
              ) : filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12">
                    <AdminEmptyState
                      title="No registered students found"
                      description={
                        selectedDate
                          ? `No candidates registered on ${selectedDate}.`
                          : 'No candidates match your current search query or date filter.'
                      }
                      actionLabel="Reset Filters"
                      onAction={() => {
                        setSearch('');
                        setSelectedDate('');
                        setQuickDate('all');
                      }}
                    />
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => {
                  return (
                    <tr
                      key={student.id}
                      className="hover:bg-slate-50/80 transition-colors duration-150 group"
                    >
                      {/* 1. Candidate Name & Email */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-800 border border-slate-200/60 flex items-center justify-center font-bold text-xs shrink-0">
                            {student.full_name?.charAt(0) || 'S'}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-slate-900 truncate">
                              {student.full_name}
                            </p>
                            <p className="text-[11px] text-slate-400 truncate">
                              {student.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* 2. Contact (Mobile) */}
                      <td className="px-4 py-3.5">
                        <p className="font-mono text-slate-700 font-medium text-[11px]">
                          {student.mobile ? `+91 ${student.mobile}` : '—'}
                        </p>
                      </td>

                      {/* 3. College / University */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5 max-w-[180px]">
                          <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="text-slate-700 font-medium truncate" title={student.college}>
                            {student.college || '—'}
                          </span>
                        </div>
                      </td>

                      {/* 4. Branch / Course */}
                      <td className="px-4 py-3.5">
                        <span
                          className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium text-[11px] border border-slate-200/60 max-w-[150px] truncate"
                          title={student.branch}
                        >
                          {student.branch || '—'}
                        </span>
                      </td>

                      {/* 5. Academic Year */}
                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                          <GraduationCap className="w-3 h-3 text-indigo-500" />
                          {student.academic_year || '—'}
                        </span>
                      </td>

                      {/* 6. State */}
                      <td className="px-4 py-3.5 text-slate-600">
                        <div className="flex items-center gap-1 max-w-[120px] truncate">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">{student.state || '—'}</span>
                        </div>
                      </td>

                      {/* 7. Registered Domain */}
                      <td className="px-4 py-3.5">
                        {(() => {
                          const domainInfo = getStudentDomainDisplay(student);
                          return (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200/80 shadow-2xs">
                              <span>{domainInfo.icon}</span>
                              <span>{domainInfo.name}</span>
                            </span>
                          );
                        })()}
                      </td>

                      {/* 8. Registered Date */}
                      <td className="px-4 py-3.5">
                        <div className="text-[11px]">
                          <p className="font-semibold text-slate-700">
                            {formatDate(student.created_at)}
                          </p>
                          <p className="text-slate-400 text-[10px]">
                            {formatRelativeTime(student.created_at)}
                          </p>
                        </div>
                      </td>

                      {/* 9. Actions */}
                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedStudent(student)}
                            className="p-1.5 rounded-xl border border-slate-200/60 hover:border-slate-300 hover:bg-slate-50 text-slate-600 transition-colors shadow-2xs"
                            title="View Full Profile"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => setDeleteStudentConfirm(student)}
                            className="p-1.5 rounded-xl border border-slate-200/60 hover:border-rose-200 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors shadow-2xs"
                            title="Delete Student Record"
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
              Showing <strong>{filteredStudents.length}</strong> of <strong>{students.length}</strong> candidates
            </span>
            {selectedDate && (
              <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                Date: {selectedDate}
              </span>
            )}
          </div>
          <div className="text-[11px] text-slate-400 font-medium">
            ↕ Scroll inside table to view all candidate records
          </div>
        </div>
      </div>

      {/* Full Registration Dossier Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200/80 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-slate-100 text-slate-800 border border-slate-200/80 flex items-center justify-center font-bold text-base">
                  {selectedStudent.full_name?.charAt(0) || 'S'}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{selectedStudent.full_name}</h3>
                  <p className="text-xs text-slate-400">{selectedStudent.email}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block mb-1 text-[11px] font-medium">Mobile Number</span>
                  <div>
                    <span className="font-semibold text-slate-800 font-mono text-xs block">
                      {selectedStudent.mobile ? `+91 ${selectedStudent.mobile}` : '—'}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block mb-1 text-[11px] font-medium">Registered Domain</span>
                  <span className="font-semibold text-slate-800 truncate flex items-center gap-1.5">
                    <span>{getStudentDomainDisplay(selectedStudent).icon}</span>
                    <span>{getStudentDomainDisplay(selectedStudent).name}</span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block mb-1 text-[11px] font-medium">College / University</span>
                  <span className="font-semibold text-slate-800 block truncate" title={selectedStudent.college}>
                    {selectedStudent.college || '—'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block mb-1 text-[11px] font-medium">Branch / Course</span>
                  <span className="font-semibold text-slate-800 block truncate" title={selectedStudent.branch}>
                    {selectedStudent.branch || '—'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block mb-1 text-[11px] font-medium">Academic Year</span>
                  <span className="font-semibold text-slate-800 block">
                    {selectedStudent.academic_year || '—'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block mb-1 text-[11px] font-medium">State / Region</span>
                  <span className="font-semibold text-slate-800 block">
                    {selectedStudent.state || '—'}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Registered On:</span>
                  <span className="font-semibold text-slate-800">
                    {formatDate(selectedStudent.created_at)}
                  </span>
                </div>
                {selectedStudent.utm_source && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Acquisition Source:</span>
                    <span className="font-semibold text-slate-800 capitalize">
                      {selectedStudent.utm_source} {selectedStudent.utm_campaign ? `(${selectedStudent.utm_campaign})` : ''}
                    </span>
                  </div>
                )}
                {selectedStudent.referral_code && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Referral Code:</span>
                    <span className="font-mono font-semibold text-slate-800">
                      {selectedStudent.referral_code}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-between gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDeleteStudentConfirm(selectedStudent)}
                className="rounded-xl border-rose-200 text-rose-600 hover:bg-rose-50"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1 text-rose-500" />
                Delete Record
              </Button>

              <Button
                size="sm"
                onClick={() => setSelectedStudent(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-5"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Single Student Confirmation Modal */}
      {deleteStudentConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Delete Student Record</h3>
                <p className="text-xs text-slate-500">Remove from registered directory</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 mb-5 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              Are you sure you want to delete <strong className="text-slate-900">{deleteStudentConfirm.full_name}</strong>? All registered information will be removed.
            </p>
            <div className="flex gap-2.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDeleteStudentConfirm(null)}
                className="flex-1 rounded-xl text-xs h-9 font-medium"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => handleDeleteStudent(deleteStudentConfirm.id)}
                disabled={deletingId === deleteStudentConfirm.id}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs h-9 font-semibold"
              >
                {deletingId === deleteStudentConfirm.id ? 'Deleting...' : 'Delete Student'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete All Students Confirmation Modal */}
      {confirmDeleteAllModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Delete All Students</h3>
                <p className="text-xs text-rose-600 font-semibold">Irreversible action</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 mb-5 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              Are you sure you want to permanently delete all <strong className="text-slate-900">{students.length}</strong> registered students from the platform?
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
