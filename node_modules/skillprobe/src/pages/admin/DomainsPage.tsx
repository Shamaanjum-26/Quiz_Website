import { useState, useEffect } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Loader2,
  X,
  Check,
  Globe,
  Clock,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { adminGetDomains, adminCreateDomain, adminUpdateDomain, adminDeleteDomain } from '@/services/adminService';
import { isSupabaseConfigured } from '@/lib/supabase';
import { toast } from '@/hooks/useToast';
import { getDomainIconPath } from '@/lib/domainIcons';
import type { Domain } from '@/types';

const SAMPLE_DOMAINS: Partial<Domain>[] = [
  { id: '1', name: 'Python', slug: 'python', description: 'Variables, loops, OOP, algorithms, and data structures', icon: '🐍', color: '#059669', difficulty: 'beginner', question_count: 20, estimated_minutes: 20, active: true },
  { id: '2', name: 'Web Development', slug: 'web-development', description: 'HTML5, CSS3, Modern JavaScript, React & DOM mechanics', icon: '🌐', color: '#0284c7', difficulty: 'intermediate', question_count: 20, estimated_minutes: 20, active: true },
  { id: '3', name: 'AI / ML', slug: 'ai-ml', description: 'Machine learning fundamentals, regression, neural networks, PyTorch', icon: '🤖', color: '#8b5cf6', difficulty: 'advanced', question_count: 15, estimated_minutes: 25, active: true },
  { id: '4', name: 'Data Science', slug: 'data-science', description: 'Pandas, NumPy, statistical hypothesis testing, data visualization', icon: '📊', color: '#10b981', difficulty: 'intermediate', question_count: 18, estimated_minutes: 20, active: true },
  { id: '5', name: 'Cyber Security', slug: 'cyber-security', description: 'Network security, penetration testing, cryptography, OWASP top 10', icon: '🔐', color: '#f43f5e', difficulty: 'intermediate', question_count: 12, estimated_minutes: 20, active: false },
  { id: '6', name: 'Java Programming', slug: 'java', description: 'Core Java, Collections, Multithreading, JVM architecture', icon: '☕', color: '#d97706', difficulty: 'intermediate', question_count: 20, estimated_minutes: 20, active: true },
];

export default function AdminDomainsPage() {
  const [domains, setDomains] = useState<any[]>(SAMPLE_DOMAINS);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDomain, setEditingDomain] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);

  // Form State
  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    icon: '💻',
    color: '#059669',
    difficulty: 'intermediate',
    question_count: 20,
    estimated_minutes: 20,
    active: true,
  });

  const load = async () => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    try {
      const data = await adminGetDomains();
      if (data && data.length) setDomains(data);
    } catch {
      // use sample
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreateModal = () => {
    setEditingDomain(null);
    setForm({
      name: '',
      slug: '',
      description: '',
      icon: '🚀',
      color: '#059669',
      difficulty: 'intermediate',
      question_count: 20,
      estimated_minutes: 20,
      active: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (d: any) => {
    setEditingDomain(d);
    setForm({
      name: d.name || '',
      slug: d.slug || '',
      description: d.description || '',
      icon: d.icon || '💻',
      color: d.color || '#059669',
      difficulty: d.difficulty || 'intermediate',
      question_count: d.question_count || 20,
      estimated_minutes: d.estimated_minutes || 20,
      active: d.active !== false,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.slug) {
      toast({
        title: 'Missing required fields',
        description: 'Please provide both a domain name and URL slug.',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    try {
      if (editingDomain) {
        if (isSupabaseConfigured) {
          await adminUpdateDomain(editingDomain.id, form);
        }
        setDomains((prev) =>
          prev.map((d) => (d.id === editingDomain.id ? { ...d, ...form } : d))
        );
        toast({
          title: 'Domain Updated',
          description: `${form.name} updated successfully.`,
          variant: 'success',
        });
      } else {
        let newRecord = { ...form, id: 'dom-' + Date.now() };
        if (isSupabaseConfigured) {
          const created = await adminCreateDomain(form);
          if (created) newRecord = created;
        }
        setDomains((prev) => [...prev, newRecord]);
        toast({
          title: 'Domain Created',
          description: `${form.name} added to curriculum tracks.`,
          variant: 'success',
        });
      }
      setIsModalOpen(false);
      load();
    } catch (err: any) {
      toast({
        title: 'Error Saving Domain',
        description: err.message || 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (id: string, active: boolean) => {
    setDomains((prev) =>
      prev.map((d) => (d.id === id ? { ...d, active: !active } : d))
    );
    if (isSupabaseConfigured) {
      await adminUpdateDomain(id, { active: !active });
    }
    toast({
      title: 'Status Updated',
      description: `Domain is now ${!active ? 'active and visible to students' : 'hidden from public view'}.`,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this domain? This will also remove questions associated with this track.'))
      return;
    setDomains((prev) => prev.filter((d) => d.id !== id));
    if (isSupabaseConfigured) {
      await adminDeleteDomain(id);
    }
    toast({
      title: 'Domain Removed',
      description: 'Domain track was deleted.',
    });
  };

  return (
    <AdminLayout
      title="Domain Management"
      actions={
        <Button
          size="sm"
          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2 h-9 text-xs font-semibold shadow-2xs"
          onClick={openCreateModal}
        >
          <Plus className="w-3.5 h-3.5" />
          Add Tech Domain
        </Button>
      }
    >
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs text-slate-500 font-medium">
          Showing <strong className="text-slate-800">{domains.length}</strong> technology tracks configured
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {domains.map((domain) => (
            <div
              key={domain.id}
              className={`bg-white rounded-2xl border transition-all duration-200 p-5 flex flex-col justify-between ${
                domain.active
                  ? 'border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] hover:border-slate-300 hover:shadow-[0_4px_12px_0_rgba(0,0,0,0.03)]'
                  : 'border-slate-200/50 bg-slate-50/60 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center p-2 bg-slate-50 border border-slate-100 shadow-2xs overflow-hidden shrink-0"
                    style={{ backgroundColor: `${domain.color || '#059669'}10` }}
                  >
                    <img
                      src={getDomainIconPath(domain.slug, domain.icon)}
                      alt={domain.name || 'Domain'}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/domains/default.svg';
                      }}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                        domain.difficulty === 'beginner'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                          : domain.difficulty === 'advanced'
                          ? 'bg-rose-50 text-rose-700 border-rose-200/60'
                          : 'bg-amber-50 text-amber-700 border-amber-200/60'
                      }`}
                    >
                      {domain.difficulty}
                    </span>

                    <button
                      onClick={() => handleToggle(domain.id, domain.active)}
                      className={`transition-colors p-0.5 rounded-lg ${
                        domain.active ? 'text-emerald-600' : 'text-slate-400'
                      }`}
                      title={domain.active ? 'Disable domain' : 'Enable domain'}
                    >
                      {domain.active ? (
                        <ToggleRight className="w-6 h-6" />
                      ) : (
                        <ToggleLeft className="w-6 h-6" />
                      )}
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
                  <span>{domain.name}</span>
                  <span className="text-[11px] font-normal text-slate-400 font-mono">
                    ({domain.slug})
                  </span>
                </h3>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                  {domain.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                <div className="flex items-center gap-3 text-[11px]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {domain.estimated_minutes || 20} mins
                  </span>
                  <span className="flex items-center gap-1">
                    <HelpCircle className="w-3 h-3 text-slate-400" />
                    {domain.question_count || 20} Qs
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(domain)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-emerald-700 transition-colors"
                    title="Edit domain configuration"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(domain.id)}
                    className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Delete domain"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modern Domain Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <h3 className="font-bold text-slate-900 text-base">
                {editingDomain ? 'Edit Domain Configuration' : 'Add New Tech Track'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-slate-700 text-xs font-semibold mb-1 block">Domain Title</Label>
                  <Input
                    placeholder="e.g. Next.js & React"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="rounded-xl border-slate-200 text-xs h-9"
                    required
                  />
                </div>
                <div>
                  <Label className="text-slate-700 text-xs font-semibold mb-1 block">URL Slug</Label>
                  <Input
                    placeholder="e.g. nextjs-react"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="rounded-xl border-slate-200 text-xs h-9 font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <Label className="text-slate-700 text-xs font-semibold mb-1 block">Description & Scope</Label>
                <textarea
                  rows={3}
                  placeholder="Key topics tested: Server components, SSR, state management..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none text-slate-800"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label className="text-slate-700 text-xs font-semibold mb-1 block">Difficulty</Label>
                  <select
                    value={form.difficulty}
                    onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-2.5 h-9 text-xs bg-white text-slate-700 focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <Label className="text-slate-700 text-xs font-semibold mb-1 block">Duration (Mins)</Label>
                  <Input
                    type="number"
                    value={form.estimated_minutes}
                    onChange={(e) => setForm({ ...form, estimated_minutes: Number(e.target.value) })}
                    className="rounded-xl border-slate-200 text-xs h-9"
                  />
                </div>

                <div>
                  <Label className="text-slate-700 text-xs font-semibold mb-1 block">Question Count</Label>
                  <Input
                    type="number"
                    value={form.question_count}
                    onChange={(e) => setForm({ ...form, question_count: Number(e.target.value) })}
                    className="rounded-xl border-slate-200 text-xs h-9"
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-2">
                <Button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs h-9 font-semibold"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : editingDomain ? 'Save Changes' : 'Create Domain'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 rounded-xl text-xs h-9"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
