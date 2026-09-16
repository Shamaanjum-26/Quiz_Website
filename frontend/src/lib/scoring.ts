import type { SkillLevel } from '@/types';

// ── Skill Level Thresholds ────────────────────────────────────
export const SKILL_THRESHOLDS = {
  Expert: 90,
  Advanced: 75,
  Intermediate: 50,
  Beginner: 25,
  Foundation: 0,
} as const;

export function getSkillLevel(percentage: number): SkillLevel {
  if (percentage >= SKILL_THRESHOLDS.Expert) return 'Expert';
  if (percentage >= SKILL_THRESHOLDS.Advanced) return 'Advanced';
  if (percentage >= SKILL_THRESHOLDS.Intermediate) return 'Intermediate';
  if (percentage >= SKILL_THRESHOLDS.Beginner) return 'Beginner';
  return 'Foundation';
}

export function getSkillLevelColor(level: SkillLevel): string {
  const colors: Record<SkillLevel, string> = {
    Expert: '#7c3aed',
    Advanced: '#2563eb',
    Intermediate: '#16a34a',
    Beginner: '#ca8a04',
    Foundation: '#6b7280',
  };
  return colors[level];
}

export function getSkillLevelBgColor(level: SkillLevel): string {
  const colors: Record<SkillLevel, string> = {
    Expert: '#f5f3ff',
    Advanced: '#eff6ff',
    Intermediate: '#f0fdf4',
    Beginner: '#fefce8',
    Foundation: '#f9fafb',
  };
  return colors[level];
}

export function getSkillLevelMessage(level: SkillLevel, domain: string): string {
  const messages: Record<SkillLevel, string> = {
    Expert: `Outstanding! You have mastered ${domain}. You're ready to take on advanced projects and mentorship roles.`,
    Advanced: `Great job! You have a strong foundation in ${domain}. Focus on advanced problem-solving and real-world projects.`,
    Intermediate: `Good progress! You have a solid understanding of ${domain} fundamentals. Keep building your skills with hands-on practice.`,
    Beginner: `You've started your ${domain} journey! With focused learning and practice, you'll level up quickly.`,
    Foundation: `Every expert was once a beginner! Our FREE ${domain} Bootcamp is designed exactly for you. Start your journey today.`,
  };
  return messages[level];
}

export function getScoreGaugeColor(percentage: number): string {
  if (percentage >= 90) return '#7c3aed';
  if (percentage >= 75) return '#2563eb';
  if (percentage >= 50) return '#16a34a';
  if (percentage >= 25) return '#ca8a04';
  return '#ef4444';
}

export function formatTimeTaken(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}s`;
  if (secs === 0) return `${mins}m`;
  return `${mins}m ${secs}s`;
}

export function calculatePercentage(obtained: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((obtained / total) * 100 * 100) / 100;
}
