import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Clock, HelpCircle, ArrowRight, AlertCircle, Loader2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getDomains } from '@/services/quizService';
import { getDomainIconPath } from '@/lib/domainIcons';
import { getPersistedStudentId } from '@/lib/analytics';
import { isSupabaseConfigured } from '@/lib/supabase';
import type { Domain } from '@/types';

// Fallback static domains for when Supabase is not configured
const STATIC_DOMAINS: Omit<Domain, 'created_at' | 'updated_at'>[] = [
  { id: '1', name: 'Python', slug: 'python', description: 'Variables, loops, functions, OOP, data structures', icon: '🐍', color: '#3776AB', difficulty: 'beginner', question_count: 20, estimated_minutes: 25, active: true, display_order: 1 },
  { id: '2', name: 'Web Development', slug: 'web-development', description: 'HTML, CSS, JavaScript, React, responsive design', icon: '🌐', color: '#e34c26', difficulty: 'intermediate', question_count: 20, estimated_minutes: 25, active: true, display_order: 2 },
  { id: '3', name: 'AI / Machine Learning', slug: 'ai-ml', description: 'ML algorithms, neural networks, model evaluation', icon: '🤖', color: '#ff6f00', difficulty: 'advanced', question_count: 20, estimated_minutes: 30, active: true, display_order: 3 },
  { id: '4', name: 'Data Science', slug: 'data-science', description: 'Pandas, statistics, visualization, analysis', icon: '📊', color: '#1565c0', difficulty: 'intermediate', question_count: 20, estimated_minutes: 25, active: true, display_order: 4 },
  { id: '5', name: 'Cyber Security', slug: 'cyber-security', description: 'Network security, ethical hacking, cryptography', icon: '🔐', color: '#c62828', difficulty: 'intermediate', question_count: 20, estimated_minutes: 30, active: true, display_order: 5 },
  { id: '6', name: 'Java', slug: 'java', description: 'OOP, collections, Spring basics, JVM', icon: '☕', color: '#5382a1', difficulty: 'intermediate', question_count: 20, estimated_minutes: 25, active: true, display_order: 6 },
  { id: '7', name: 'Cloud Computing', slug: 'cloud-computing', description: 'AWS, Azure, GCP, serverless, DevOps basics', icon: '☁️', color: '#7b1fa2', difficulty: 'intermediate', question_count: 20, estimated_minutes: 25, active: true, display_order: 7 },
  { id: '8', name: 'DSA', slug: 'dsa', description: 'Arrays, linked lists, trees, graphs, dynamic programming', icon: '🧩', color: '#00796b', difficulty: 'advanced', question_count: 20, estimated_minutes: 35, active: true, display_order: 8 },
];

const difficultyColors = {
  beginner: 'text-green-600 bg-green-50',
  intermediate: 'text-blue-600 bg-blue-50',
  advanced: 'text-purple-600 bg-purple-50',
};

export default function DomainsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [domains, setDomains] = useState<Domain[]>([]);
  const [filtered, setFiltered] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const studentId = (location.state as { studentId?: string })?.studentId || getPersistedStudentId();

  useEffect(() => {
    const load = async () => {
      try {
        if (isSupabaseConfigured) {
          const data = await getDomains();
          setDomains(data.length > 0 ? data : STATIC_DOMAINS as Domain[]);
        } else {
          setDomains(STATIC_DOMAINS as Domain[]);
        }
      } catch {
        setDomains(STATIC_DOMAINS as Domain[]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    let result = domains;
    if (search) {
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(search.toLowerCase()) ||
          d.description?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (selectedDifficulty !== 'all') {
      result = result.filter((d) => d.difficulty === selectedDifficulty);
    }
    setFiltered(result);
  }, [domains, search, selectedDifficulty]);

  const handleSelectDomain = (domain: Domain) => {
    if (!studentId) {
      navigate('/register');
      return;
    }
    navigate(`/quiz/${domain.slug}`, { state: { studentId, domainId: domain.id } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="page-hero py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mb-3">
            Choose Your Quiz Domain
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto mb-6">
            Select the technology domain you want to assess. Each quiz has 20 questions and takes 20–30 minutes.
          </p>

          {!studentId && (
            <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-300/30 text-amber-100 text-sm font-medium px-4 py-2 rounded-full">
              <AlertCircle className="w-4 h-4" />
              Register first to start the quiz
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search domains..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'beginner', 'intermediate', 'advanced'].map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDifficulty(d)}
                className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors ${
                  selectedDifficulty === d
                    ? 'bg-brand-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-brand-200 hover:text-brand-600'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Domains grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-56 rounded-2xl shimmer" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No domains found matching your search.</p>
            <button
              onClick={() => { setSearch(''); setSelectedDifficulty('all'); }}
              className="mt-3 text-brand-600 hover:text-brand-700 font-medium text-sm"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((domain) => (
              <div
                key={domain.id}
                className="domain-card"
                onClick={() => handleSelectDomain(domain)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleSelectDomain(domain)}
                aria-label={`Start ${domain.name} quiz`}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 overflow-hidden shadow-2xs">
                  <img
                    src={getDomainIconPath(domain.slug, domain.icon)}
                    alt={domain.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/domains/default.svg';
                    }}
                  />
                </div>

                {/* Info */}
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-gray-900 text-lg">{domain.name}</h3>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${difficultyColors[domain.difficulty]}`}>
                    {domain.difficulty}
                  </span>
                </div>

                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {domain.description}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5" />
                    {domain.question_count} questions
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    ~{domain.estimated_minutes} min
                  </span>
                </div>

                {/* CTA */}
                <Button
                  size="sm"
                  className="w-full gap-1.5"
                  onClick={(e) => { e.stopPropagation(); handleSelectDomain(domain); }}
                >
                  Start Quiz
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA for non-registered */}
        {!studentId && (
          <div className="mt-12 text-center">
            <div className="inline-flex flex-col items-center gap-3 bg-white rounded-2xl border border-brand-100 p-6 shadow-sm max-w-md">
              <p className="text-gray-700 font-medium">Ready to take the quiz?</p>
              <Button onClick={() => navigate('/register')} className="gap-2">
                Register Free
                <ArrowRight className="w-4 h-4" />
              </Button>
              <p className="text-xs text-gray-400">No payment required. 100% free.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
