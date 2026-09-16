import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  Users,
  CheckCircle2,
  TrendingUp,
  Calendar,
  Copy,
  Check,
  MousePointerClick,
  Sparkles,
  ArrowUpRight,
  Info,
  DollarSign,
  X,
  Radio,
  ExternalLink,
} from 'lucide-react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { AdminStatCard } from '@/components/admin/AdminStatCard';
import { AdminEmptyState } from '@/components/admin/AdminEmptyState';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/useToast';
import supabase, { isSupabaseConfigured } from '@/lib/supabase';
import type { Campaign } from '@/types';

interface ExtendedCampaign extends Campaign {
  estimated_spend?: number;
}

const MOCK_CAMPAIGNS: ExtendedCampaign[] = [
  {
    id: 'camp-1',
    name: 'College WhatsApp Groups - Campus Ambassador',
    code: 'campus26',
    utm_source: 'whatsapp',
    utm_medium: 'community',
    utm_campaign: 'campus_ambassador_q1',
    description: 'Final & Pre-final year CSE / IT engineering students',
    total_visitors: 1420,
    total_registrations: 380,
    total_quiz_starts: 340,
    total_quiz_completions: 295,
    total_bootcamp_registrations: 112,
    total_hot_leads: 88,
    total_conversions: 112,
    active: true,
    estimated_spend: 12000,
    start_date: '2026-08-01',
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-09-01T00:00:00Z',
  },
  {
    id: 'camp-2',
    name: 'Instagram Reel: Python Zero to Hero Challenge',
    code: 'instaskill',
    utm_source: 'instagram',
    utm_medium: 'organic_reel',
    utm_campaign: 'python_challenge_aug',
    description: 'Engineering college students interested in Python & AI tracks',
    total_visitors: 3200,
    total_registrations: 890,
    total_quiz_starts: 780,
    total_quiz_completions: 640,
    total_bootcamp_registrations: 245,
    total_hot_leads: 190,
    total_conversions: 245,
    active: true,
    estimated_spend: 25000,
    start_date: '2026-08-10',
    created_at: '2026-08-10T00:00:00Z',
    updated_at: '2026-09-05T00:00:00Z',
  },
  {
    id: 'camp-3',
    name: 'LinkedIn Career Outreach - Placement Prep',
    code: 'licareer',
    utm_source: 'linkedin',
    utm_medium: 'cpc',
    utm_campaign: 'fsd_career_leadgen',
    description: 'Graduates looking for tech placements and skill diagnostics',
    total_visitors: 890,
    total_registrations: 210,
    total_quiz_starts: 195,
    total_quiz_completions: 175,
    total_bootcamp_registrations: 84,
    total_hot_leads: 62,
    total_conversions: 84,
    active: true,
    estimated_spend: 18500,
    start_date: '2026-08-15',
    created_at: '2026-08-15T00:00:00Z',
    updated_at: '2026-09-08T00:00:00Z',
  },
];

export default function AdminCampaignsPage() {
  const [campaigns, setCampaigns] = useState<ExtendedCampaign[]>(MOCK_CAMPAIGNS);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [showQualifiedTooltip, setShowQualifiedTooltip] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    code: '',
    utm_source: '',
    utm_medium: 'social',
    utm_campaign: '',
    description: '',
    estimated_spend: '',
  });

  useEffect(() => {
    async function loadCampaigns() {
      if (!isSupabaseConfigured) {
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from('campaigns')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          setCampaigns(data);
        }
      } catch {
        // use mock
      } finally {
        setLoading(false);
      }
    }
    loadCampaigns();
  }, []);

  const copyCampaignUrl = (c: ExtendedCampaign) => {
    const origin = window.location.origin;
    const source = c.utm_source || 'direct';
    const medium = c.utm_medium || 'campaign';
    const campaignName = c.utm_campaign || c.code || 'general';
    const url = `${origin}/register?utm_source=${encodeURIComponent(source)}&utm_medium=${encodeURIComponent(medium)}&utm_campaign=${encodeURIComponent(campaignName)}`;
    navigator.clipboard.writeText(url);
    setCopiedId(c.id);
    toast({
      title: 'Campaign URL Copied',
      description: 'UTM tracked registration URL was copied to your clipboard.',
      variant: 'success',
    });
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaign.name || !newCampaign.utm_source) {
      toast({
        title: 'Missing Information',
        description: 'Please provide at least a campaign name and UTM source.',
        variant: 'destructive',
      });
      return;
    }

    const record: ExtendedCampaign = {
      id: 'camp-' + Date.now(),
      name: newCampaign.name,
      code: newCampaign.code || newCampaign.name.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      utm_source: newCampaign.utm_source,
      utm_medium: newCampaign.utm_medium,
      utm_campaign: newCampaign.utm_campaign || newCampaign.name.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      description: newCampaign.description,
      estimated_spend: Number(newCampaign.estimated_spend) || 0,
      total_visitors: 0,
      total_registrations: 0,
      total_quiz_starts: 0,
      total_quiz_completions: 0,
      total_bootcamp_registrations: 0,
      total_hot_leads: 0,
      total_conversions: 0,
      active: true,
      start_date: new Date().toISOString().slice(0, 10),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setCampaigns((prev) => [record, ...prev]);
    setIsCreateModalOpen(false);
    setNewCampaign({
      name: '',
      code: '',
      utm_source: '',
      utm_medium: 'social',
      utm_campaign: '',
      description: '',
      estimated_spend: '',
    });
    toast({
      title: 'Campaign Created',
      description: 'New marketing campaign registered with tracking link ready.',
      variant: 'success',
    });
  };

  const filtered = campaigns.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.utm_source && c.utm_source.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (c.utm_campaign && c.utm_campaign.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (c.code && c.code.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalClicks = campaigns.reduce((acc, c) => acc + (c.total_visitors || 0), 0);
  const totalRegs = campaigns.reduce((acc, c) => acc + (c.total_registrations || 0), 0);
  const totalQuizzes = campaigns.reduce((acc, c) => acc + (c.total_quiz_completions || 0), 0);
  const totalBootcamp = campaigns.reduce((acc, c) => acc + (c.total_bootcamp_registrations || 0), 0);
  const totalSpend = campaigns.reduce((acc, c) => acc + (c.estimated_spend || 0), 0);
  const avgCPL = totalRegs > 0 ? (totalSpend / totalRegs).toFixed(1) : '0';

  return (
    <AdminLayout
      title="Campaign Attribution & UTM Tracking"
      subtitle="Track lead generation velocity, cost-per-lead, and channel conversion across all marketing channels"
      actions={
        <Button
          size="sm"
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2 h-9 text-xs font-semibold shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          Register Campaign
        </Button>
      }
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-7">
        <AdminStatCard
          title="Campaign Impressions"
          value={totalClicks}
          icon={MousePointerClick}
          subtitle="Unique tracked clicks"
          accent="slate"
        />
        <AdminStatCard
          title="Total Leads"
          value={totalRegs}
          icon={Users}
          change={totalClicks > 0 ? `${((totalRegs / totalClicks) * 100).toFixed(1)}%` : '0%'}
          changeType="up"
          subtitle="Click-to-Lead conversion"
          accent="emerald"
        />
        <AdminStatCard
          title="Quiz Completions"
          value={totalQuizzes}
          icon={CheckCircle2}
          change={totalRegs > 0 ? `${((totalQuizzes / totalRegs) * 100).toFixed(1)}%` : '0%'}
          changeType="up"
          subtitle="Skill assessment rate"
          accent="slate"
        />
        <AdminStatCard
          title="Bootcamp Enrolled"
          value={totalBootcamp}
          icon={TrendingUp}
          change={totalQuizzes > 0 ? `${((totalBootcamp / totalQuizzes) * 100).toFixed(1)}%` : '0%'}
          changeType="up"
          subtitle="Final conversions"
          accent="emerald"
        />
        <AdminStatCard
          title="Avg. Cost Per Lead"
          value={`₹${avgCPL}`}
          icon={DollarSign}
          subtitle="Spend / Total Registrations"
          accent="slate"
        />
      </div>

      {/* Filter / Search Bar with Info Callout */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search by campaign name, code, or UTM..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-white border-slate-200/80 rounded-xl text-xs h-9 shadow-xs focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-medium border border-emerald-200/60">
            <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
            Click any Lead count to drill down into candidate contacts
          </span>
          <span className="text-slate-400">|</span>
          <span className="font-medium">
            <strong className="text-slate-800">{filtered.length}</strong> active campaigns
          </span>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="px-5 py-3.5">Campaign Name</th>
                <th className="px-4 py-3.5">UTM Tracking Tags</th>
                <th className="px-4 py-3.5 text-center">Visitors</th>
                <th className="px-4 py-3.5 text-center">
                  <div className="inline-flex items-center justify-center gap-1">
                    <span>Leads</span>
                    <ArrowUpRight className="w-3 h-3 text-emerald-600" />
                  </div>
                </th>
                <th className="px-4 py-3.5 text-center">Quizzes</th>
                <th className="px-4 py-3.5 text-center relative">
                  <div className="inline-flex items-center justify-center gap-1">
                    <span>Qualified Leads</span>
                    <button
                      type="button"
                      onMouseEnter={() => setShowQualifiedTooltip(true)}
                      onMouseLeave={() => setShowQualifiedTooltip(false)}
                      onClick={() => setShowQualifiedTooltip(!showQualifiedTooltip)}
                      className="text-slate-400 hover:text-slate-600 focus:outline-hidden"
                      title="What is a Qualified Lead?"
                    >
                      <Info className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  </div>
                  {showQualifiedTooltip && (
                    <div className="absolute z-30 top-10 left-1/2 -translate-x-1/2 w-64 p-2.5 bg-slate-900 text-white rounded-xl shadow-xl text-[11px] normal-case leading-snug text-left border border-slate-700">
                      <p className="font-semibold text-emerald-400 mb-1">Qualified Lead Definition:</p>
                      Students who scored High Intent or Engaged on their technical assessment, making them prime targets for enrollment counseling.
                    </div>
                  )}
                </th>
                <th className="px-4 py-3.5 text-center">Est. CPL</th>
                <th className="px-4 py-3.5 text-center">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12">
                    <AdminEmptyState
                      title="No campaigns found"
                      description="No marketing campaigns match your current filter or search criteria."
                      actionLabel="Reset Search"
                      onAction={() => setSearchTerm('')}
                    />
                  </td>
                </tr>
              ) : (
                filtered.map((c) => {
                  const campaignTag = c.utm_campaign || c.code || '';
                  const cpl = c.estimated_spend && c.total_registrations > 0
                    ? `₹${(c.estimated_spend / c.total_registrations).toFixed(0)}`
                    : '—';
                  const qualifiedCount = (c.total_hot_leads || 0) + Math.round((c.total_bootcamp_registrations || 0) * 0.5);

                  return (
                    <tr
                      key={c.id}
                      className="hover:bg-slate-50/60 transition-colors duration-150 group"
                    >
                      {/* Campaign Info */}
                      <td className="px-5 py-3.5">
                        <div className="font-semibold text-slate-900">{c.name}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <Calendar className="w-3 h-3 text-slate-400" /> Started: {c.start_date || 'Active'}
                          {c.code && (
                            <span className="font-mono text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded border border-slate-200/50">
                              code: {c.code}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* UTM Tags */}
                      <td className="px-4 py-3.5">
                        <div className="flex flex-wrap gap-1.5">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200/60">
                            src: {c.utm_source || 'n/a'}
                          </span>
                          {c.utm_medium && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 text-[11px] font-medium border border-slate-200/40">
                              med: {c.utm_medium}
                            </span>
                          )}
                          {c.utm_campaign && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-medium border border-emerald-200/60">
                              cmp: {c.utm_campaign}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Visitors */}
                      <td className="px-4 py-3.5 text-center font-medium text-slate-700">
                        {(c.total_visitors || 0).toLocaleString()}
                      </td>

                      {/* Leads Count (CLICKABLE DRILL DOWN) */}
                      <td className="px-4 py-3.5 text-center">
                        <Link
                          to={`/admin/leads?campaign=${encodeURIComponent(campaignTag)}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50/80 hover:bg-emerald-100 text-emerald-800 hover:text-emerald-900 font-bold border border-emerald-200/60 transition-colors group-hover:shadow-2xs"
                          title={`View all ${(c.total_registrations || 0)} leads from this campaign`}
                        >
                          {(c.total_registrations || 0).toLocaleString()}
                          <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                        </Link>
                      </td>

                      {/* Quizzes */}
                      <td className="px-4 py-3.5 text-center font-medium text-slate-700">
                        {(c.total_quiz_completions || 0).toLocaleString()}
                      </td>

                      {/* Qualified Leads */}
                      <td className="px-4 py-3.5 text-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md font-semibold text-rose-700 bg-rose-50 border border-rose-200/50">
                          {qualifiedCount.toLocaleString()}
                        </span>
                      </td>

                      {/* Cost Per Lead */}
                      <td className="px-4 py-3.5 text-center font-semibold text-slate-700">
                        {cpl}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3.5 text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                            c.active
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                              : 'bg-slate-100 text-slate-600 border-slate-200/60'
                          }`}
                        >
                          {c.active ? 'Active' : 'Paused'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyCampaignUrl(c)}
                            className="rounded-xl border-slate-200 hover:bg-slate-50 text-slate-700 gap-1.5 h-8 text-[11px] font-semibold"
                          >
                            {copiedId === c.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" /> Copied
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3 text-slate-400" /> Copy Link
                              </>
                            )}
                          </Button>
                          <Link
                            to={`/admin/leads?campaign=${encodeURIComponent(campaignTag)}`}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                            title="Filter Leads"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Campaign Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900 text-base">Register Marketing Campaign</h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="space-y-4 text-xs">
              <div>
                <Label className="text-slate-700 text-xs font-semibold mb-1 block">Campaign Title</Label>
                <Input
                  placeholder="e.g. Campus Ambassador Q1 Drive"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                  className="rounded-xl border-slate-200 text-xs h-9"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-slate-700 text-xs font-semibold mb-1 block">UTM Source</Label>
                  <Input
                    placeholder="e.g. whatsapp, instagram"
                    value={newCampaign.utm_source}
                    onChange={(e) => setNewCampaign({ ...newCampaign, utm_source: e.target.value })}
                    className="rounded-xl border-slate-200 text-xs h-9"
                    required
                  />
                </div>
                <div>
                  <Label className="text-slate-700 text-xs font-semibold mb-1 block">UTM Medium</Label>
                  <Input
                    placeholder="e.g. reel, community, cpc"
                    value={newCampaign.utm_medium}
                    onChange={(e) => setNewCampaign({ ...newCampaign, utm_medium: e.target.value })}
                    className="rounded-xl border-slate-200 text-xs h-9"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-slate-700 text-xs font-semibold mb-1 block">UTM Campaign Tag</Label>
                  <Input
                    placeholder="e.g. python_challenge_aug"
                    value={newCampaign.utm_campaign}
                    onChange={(e) => setNewCampaign({ ...newCampaign, utm_campaign: e.target.value })}
                    className="rounded-xl border-slate-200 text-xs h-9"
                  />
                </div>
                <div>
                  <Label className="text-slate-700 text-xs font-semibold mb-1 block">Estimated Spend (₹)</Label>
                  <Input
                    type="number"
                    placeholder="e.g. 15000"
                    value={newCampaign.estimated_spend}
                    onChange={(e) => setNewCampaign({ ...newCampaign, estimated_spend: e.target.value })}
                    className="rounded-xl border-slate-200 text-xs h-9"
                  />
                </div>
              </div>

              <div>
                <Label className="text-slate-700 text-xs font-semibold mb-1 block">Campaign Description</Label>
                <Input
                  placeholder="Target audience details or channel notes"
                  value={newCampaign.description}
                  onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                  className="rounded-xl border-slate-200 text-xs h-9"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="rounded-xl border-slate-200 text-slate-700 h-9 text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-9 text-xs font-semibold px-4"
                >
                  Save Campaign
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
