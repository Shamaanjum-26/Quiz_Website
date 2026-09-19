import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Lock, Unlock, Star, CheckCircle2, AlertTriangle, ArrowRight,
  Loader2, AlertCircle, BookOpen, Target, Briefcase,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScoreGauge } from '@/components/quiz/ScoreGauge';
import { getSkillReport } from '@/services/quizService';
import { trackLeadActivity } from '@/services/leadService';
import { getPersistedStudentId } from '@/lib/analytics';
import { isSupabaseConfigured } from '@/lib/supabase';
import { getDomainIconPath } from '@/lib/domainIcons';
import type { SkillLevel } from '@/types';

export default function SkillReportPage() {
  const { resultId } = useParams<{ resultId: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [unlockRequested, setUnlockRequested] = useState(false);
  const studentId = getPersistedStudentId();

  useEffect(() => {
    const load = async () => {
      if (!isSupabaseConfigured || !resultId) {
        // Dev mode skeleton report
        setReport({
          id: 'dev-report',
          result: {
            percentage: 72,
            skill_level: 'Intermediate',
            correct_answers: 14,
            incorrect_answers: 4,
            unanswered: 2,
            total_questions: 20,
            domain: { name: 'Python', icon: '🐍' },
          },
          preview_strengths: ['Strong understanding of Python basics', 'Good grasp of list operations'],
          preview_weak_areas: ['Object-oriented programming concepts need improvement'],
          preview_recommendations: ['Practice OOP with real projects', 'Complete Python OOP module', 'Work on Python decorators and generators'],
          is_premium_unlocked: false,
        });
        setLoading(false);
        return;
      }

      try {
        const data = await getSkillReport(resultId);
        setReport(data as Record<string, unknown>);
        if (studentId) {
          await trackLeadActivity(studentId, 'result_viewed', 5, { result_id: resultId });
        }
      } catch {
        setReport(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [resultId]);

  const handleUnlockClick = async () => {
    if (studentId) {
      await trackLeadActivity(studentId, 'premium_report_clicked', 15, { result_id: resultId });
    }
    setUnlockRequested(true);
    // TODO: Integrate Razorpay or Stripe here
    // For now, show payment coming soon state
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-brand-600 animate-spin" />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="font-bold text-gray-900 text-xl mb-2">Report Not Available</h2>
          <Button onClick={() => navigate('/')}>Take an Assessment</Button>
        </div>
      </div>
    );
  }

  const result = report.result as Record<string, unknown>;
  const domain = result.domain as { name: string; icon: string } | undefined;
  const percentage = result.percentage as number;
  const skillLevel = result.skill_level as SkillLevel;
  const isPremium = report.is_premium_unlocked as boolean;
  const strengths = report.preview_strengths as string[] || [];
  const weakAreas = report.preview_weak_areas as string[] || [];
  const recommendations = report.preview_recommendations as string[] || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="page-hero py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-3.5 sm:px-6 text-center">
          <div className="flex justify-center mb-3 sm:mb-4">
            <img
              src={getDomainIconPath((domain as any)?.slug || domain?.name, domain?.icon)}
              alt={domain?.name || 'Skill'}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl object-contain shadow-lg bg-white/10 p-2 backdrop-blur-xs"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/domains/default.png';
              }}
            />
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-4xl text-white mb-2 tracking-tight">
            Your {domain?.name || 'Skill'} Report
          </h1>
          <p className="text-white/70 text-xs sm:text-base">Personalized insights based on your assessment results</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-3.5 sm:px-6 py-6 sm:py-10">
        {/* Score overview */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-8 mb-6 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
          <ScoreGauge percentage={percentage} skillLevel={skillLevel} size="md" />
          <div className="flex-1 text-center sm:text-left">
            <h2 className="font-display font-bold text-xl sm:text-2xl text-gray-900 mb-1">
              {skillLevel} Level
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mb-4">
              You answered{' '}
              <strong className="text-gray-800">{result.correct_answers as number} out of {result.total_questions as number}</strong>{' '}
              questions correctly.
            </p>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <span className="px-2.5 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs sm:text-sm font-medium">
                ✓ {result.correct_answers as number} Correct
              </span>
              <span className="px-2.5 py-1 bg-red-50 text-red-700 border border-red-200 rounded-full text-xs sm:text-sm font-medium">
                ✗ {result.incorrect_answers as number} Incorrect
              </span>
              <span className="px-2.5 py-1 bg-gray-50 text-gray-700 border border-gray-200 rounded-full text-xs sm:text-sm font-medium">
                — {result.unanswered as number} Unanswered
              </span>
            </div>
          </div>
        </div>

        {/* Free preview sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Strengths */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Your Strengths
            </h3>
            <ul className="space-y-3">
              {strengths.slice(0, 2).map((s, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-xs font-bold">✓</span>
                  </div>
                  <span className="text-gray-700">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weak areas */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              Areas to Improve
            </h3>
            <ul className="space-y-3">
              {weakAreas.slice(0, 1).map((w, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-amber-600 text-xs font-bold">!</span>
                  </div>
                  <span className="text-gray-700">{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Basic recommendations */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-brand-600" />
            Quick Recommendations
          </h3>
          <ul className="space-y-3">
            {recommendations.slice(0, 3).map((r, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs flex-shrink-0">{i + 1}</span>
                <span className="text-gray-700">{r}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Premium report section */}
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 mb-6 overflow-hidden">
          {/* Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />

          {!isPremium ? (
            <>
              {/* Locked premium content preview */}
              <div className="filter blur-sm select-none mb-6 space-y-3">
                {[
                  '📊 Topic-wise performance analysis',
                  '🗺️ Complete 30-day learning roadmap',
                  '💼 Career path recommendations for your level',
                  '🚀 5 recommended hands-on projects',
                  '📚 Curated resources for each weak area',
                  '🏆 Difficulty breakdown (Easy/Medium/Hard performance)',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-400 text-sm">
                    <div className="w-2 h-2 rounded-full bg-gray-600" />
                    {item}
                  </div>
                ))}
              </div>

              {/* Lock overlay */}
              <div className="text-center relative">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display font-bold text-2xl text-white mb-2">
                  Unlock Your Full Skill Report
                </h3>
                <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
                  Get detailed topic analysis, 30-day roadmap, career guidance, project recommendations and more.
                </p>

                {unlockRequested ? (
                  <div className="bg-amber-500/20 border border-amber-500/30 rounded-xl p-4 text-amber-200 text-sm max-w-sm mx-auto">
                    🚧 Payment integration coming soon! Your full diagnostic summary is active above.
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      onClick={handleUnlockClick}
                      className="bg-brand-500 hover:bg-brand-600 gap-2"
                      id="unlock-premium-report-btn"
                    >
                      <Unlock className="w-4 h-4" />
                      Unlock Full Report & Certificate — ₹199
                    </Button>
                  </div>
                )}
              </div>
            </>
          ) : (
            // Premium unlocked content
            <div className="text-white">
              <div className="flex items-center gap-2 text-green-400 mb-6">
                <Unlock className="w-5 h-5" />
                <span className="font-semibold">Premium Report Unlocked</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4 text-brand-400" />
                    Topic Performance
                  </h4>
                  <p className="text-gray-400 text-sm">Detailed breakdown available in the full premium view.</p>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-brand-400" />
                    Career Recommendations
                  </h4>
                  <p className="text-gray-400 text-sm">Career path guidance based on your performance level.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/" className="flex-1">
            <Button size="lg" className="w-full gap-2">
              <Star className="w-4 h-4" />
              Assess Another Tech Domain
            </Button>
          </Link>
          <Link to="/" className="flex-1">
            <Button variant="outline" size="lg" className="w-full gap-2">
              Back to Home
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
