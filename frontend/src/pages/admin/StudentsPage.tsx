import { useState, useEffect, useCallback } from 'react';
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
import {
  listStudents,
  exportStudentsCSV,
  deleteStudent,
  deleteAllStudents,
} from '@/services/studentService';
import { isSupabaseConfigured } from '@/lib/supabase';
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
    branch: 'Information Technology (IT)',
    academic_year: '2nd Year',
    state: 'Tamil Nadu',
    consent: true,
    is_verified: true,
    whatsapp_opt_in: true,
    preferred_domain: { id: 'd2', name: 'Full-Stack Web Dev', slug: 'web-development', icon: '🌐', color: '#10b981', difficulty: 'intermediate', question_count: 30, estimated_minutes: 30, active: true, display_order: 2, created_at: '', updated_at: '' },
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
  const [students, setStudents] = useState<Student[]>(SAMPLE_STUDENTS);
  const [total, setTotal] = useState(SAMPLE_STUDENTS.length);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [deleteStudentConfirm, setDeleteStudentConfirm] = useState<Student | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteAllModal, setConfirmDeleteAllModal] = useState(false);
  const [deletingAll, setDeletingAll] = useState(false);
  const [exporting, setExporting] = useState(false);
  const pageSize = 20;

  const load = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const filters: StudentFilters = {
      search: search || undefined,
    };
    try {
      const result = await listStudents(filters, page, pageSize);
      if (result && result.data) {
        setStudents(result.data as Student[]);
        setTotal(result.total);
      }
    } catch {
      setStudents(SAMPLE_STUDENTS);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    load();
  }, [load]);

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
      if (isSupabaseConfigured) {
        await deleteStudent(studentId);
      }
      setStudents((prev) => prev.filter((s) => s.id !== studentId));
      setTotal((prev) => Math.max(0, prev - 1));
      if (selectedStudent?.id === studentId) setSelectedStudent(null);
      setDeleteStudentConfirm(null);
      toast({
        title: 'Student Record Deleted',
        description: 'Candidate has been removed from registered students.',
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
      if (isSupabaseConfigured) {
        const ids = students.map((s) => s.id);
        await deleteAllStudents(ids);
      }
      setStudents([]);
      setTotal(0);
      setConfirmDeleteAllModal(false);
      setSelectedStudent(null);
      toast({
        title: 'All Students Deleted',
        description: 'All registered student records have been removed.',
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
      {/* Search Bar & Counter Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Search candidate, email, mobile, college..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-9 bg-white border-slate-200/80 rounded-xl text-xs h-9 shadow-xs focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs">
          <span>Registered Candidates:</span>
          <strong className="text-slate-900 font-bold bg-slate-100 px-2 py-0.5 rounded-md">
            {total}
          </strong>
        </div>
      </div>

      {/* Main Students Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-semibold text-slate-500 uppercase tracking-wider sticky top-0 z-10 backdrop-blur-md">
                <th className="px-5 py-3.5">Candidate Name & Email</th>
                <th className="px-4 py-3.5">Contact (Mobile)</th>
                <th className="px-4 py-3.5">College / University</th>
                <th className="px-4 py-3.5">Branch / Course</th>
                <th className="px-4 py-3.5">Academic Year</th>
                <th className="px-4 py-3.5">State</th>
                <th className="px-4 py-3.5">Registered Domain</th>
                <th className="px-4 py-3.5">Registered Date</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {loading ? (
                <tr>
                  <td colSpan={9} className="p-0">
                    <AdminTableSkeleton rows={5} columns={9} />
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12">
                    <AdminEmptyState
                      title="No registered students found"
                      description="No candidates match your current search query or filter criteria."
                      actionLabel="Clear Search"
                      onAction={() => setSearch('')}
                    />
                  </td>
                </tr>
              ) : (
                students.map((student) => {
                  return (
                    <tr
                      key={student.id}
                      className="hover:bg-slate-50/60 transition-colors duration-150 group"
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
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1 text-slate-600 text-[11px]">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate max-w-[120px]">{student.state || '—'}</span>
                        </div>
                      </td>

                      {/* 7. Registered Domain */}
                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-[11px] font-semibold">
                          <BookOpen className="w-3 h-3 text-emerald-600" />
                          {student.preferred_domain?.name || 'General Tech'}
                        </span>
                      </td>

                      {/* 8. Registration Timestamp */}
                      <td className="px-4 py-3.5 whitespace-nowrap text-slate-500 text-[11px]">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1 text-slate-700 font-medium">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            <span>{formatDate(student.created_at)}</span>
                          </div>
                          <p className="text-[10px] text-slate-400">
                            {formatRelativeTime(student.created_at)}
                          </p>
                        </div>
                      </td>

                      {/* 9. Actions */}
                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedStudent(student)}
                            className="p-1.5 rounded-xl border border-slate-200/60 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors shadow-2xs"
                            title="View Full Registration Dossier"
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

        {/* Pagination Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100 text-xs text-slate-500 bg-slate-50/30">
          <div>
            Showing <strong className="font-semibold text-slate-700">{students.length}</strong> of{' '}
            <strong className="font-semibold text-slate-700">{total}</strong> registered students
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-xl border-slate-200/80 hover:bg-white text-xs gap-1 h-8"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Previous
            </Button>
            <span className="px-2 font-medium text-slate-600">Page {page}</span>
            <Button
              variant="outline"
              size="sm"
              disabled={page * pageSize >= total}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-xl border-slate-200/80 hover:bg-white text-xs gap-1 h-8"
            >
              Next <ChevronRight className="w-3.5 h-3.5" />
            </Button>
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
                  <span className="font-semibold text-slate-800 truncate block">
                    {selectedStudent.preferred_domain?.name || 'General Tech'}
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
