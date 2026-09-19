import type { Student } from '@/types';
import { TECH_DOMAINS } from '@/data/techDomains';

/**
 * Returns an appropriate emoji icon for any domain or branch name.
 */
export function getDomainIcon(domainOrBranch?: string | null): string {
  if (!domainOrBranch) return '⚡';
  const s = domainOrBranch.toLowerCase();

  if (s.includes('civil') || s.includes('structural') || s.includes('construction')) return '🏗️';
  if (s.includes('mech') || s.includes('cad') || s.includes('thermodynamic') || s.includes('automobile') || s.includes('aerospace')) return '⚙️';
  if (s.includes('elect') || s.includes('eee') || s.includes('circuit') || s.includes('power')) return '⚡';
  if (s.includes('ece') || s.includes('vlsi') || s.includes('embedded') || s.includes('telecom')) return '📡';
  if (s.includes('python')) return '🐍';
  if (s.includes('web') || s.includes('react') || s.includes('full') || s.includes('front') || s.includes('node') || s.includes('next')) return '🌐';
  if (s.includes('data') || s.includes('analytics')) return '📊';
  if (s.includes('ai') || s.includes('intelligence') || s.includes('machine learning') || s.includes('ml')) return '🤖';
  if (s.includes('java')) return '☕';
  if (s.includes('cloud') || s.includes('devops') || s.includes('aws') || s.includes('azure') || s.includes('gcp')) return '☁️';
  if (s.includes('cyber') || s.includes('security') || s.includes('ethical') || s.includes('hack')) return '🔐';
  if (s.includes('ui') || s.includes('ux') || s.includes('design') || s.includes('figma') || s.includes('graphic')) return '🎨';
  if (s.includes('prompt') || s.includes('generative')) return '✨';
  if (s.includes('bio') || s.includes('biotech')) return '🧬';
  if (s.includes('chem')) return '🧪';
  if (s.includes('mba') || s.includes('business') || s.includes('management') || s.includes('bba')) return '📈';
  if (s.includes('finance') || s.includes('account') || s.includes('banking')) return '💳';
  if (s.includes('hr') || s.includes('talent') || s.includes('recruit')) return '👥';
  if (s.includes('market') || s.includes('seo')) return '🎯';
  if (s.includes('dsa') || s.includes('algo') || s.includes('data structure')) return '🧩';
  if (s.includes('c++') || s.includes('cpp')) return '➕';
  if (s.includes('c#') || s.includes('csharp') || s.includes('.net')) return '🎯';
  if (s.includes('go') || s.includes('golang')) return '🐹';
  if (s.includes('rust')) return '🦀';
  if (s.includes('php') || s.includes('laravel')) return '🐘';

  return '⚡';
}

/**
 * Returns formatted domain name and icon for a student.
 * Never outputs a generic 'General Assessment' when user specified a domain (like Civil, Mech, etc.)!
 */
export function getStudentDomainDisplay(student?: Partial<Student> & { campaign_code?: string; branch?: string } | null): { name: string; icon: string } {
  if (!student) {
    return { name: 'Technical Assessment', icon: '⚡' };
  }

  // 1. Explicit domain name attached to student
  const pName = student.preferred_domain?.name?.trim();
  if (pName && pName !== 'General Assessment' && pName !== 'General Tech' && pName !== 'General') {
    return {
      name: pName,
      icon: student.preferred_domain?.icon || getDomainIcon(pName),
    };
  }

  // 2. Extracted from campaign_code (which stores "domain:Civil Engineering" or "domain:Civil")
  if (student.campaign_code && student.campaign_code.startsWith('domain:')) {
    const rawCustom = student.campaign_code.replace('domain:', '').trim();
    if (rawCustom) {
      return {
        name: rawCustom,
        icon: getDomainIcon(rawCustom),
      };
    }
  }

  // 3. Extracted from preferred_domain_id / slug
  const pId = student.preferred_domain_id || student.preferred_domain?.id || student.preferred_domain?.slug;
  if (pId && pId !== 'custom') {
    const matched = TECH_DOMAINS.find(
      (d) => d.id === pId || d.slug === pId || pId.toLowerCase().includes(d.slug.toLowerCase())
    );
    if (matched) {
      return {
        name: matched.name,
        icon: matched.icon || getDomainIcon(matched.name),
      };
    }

    // Pretty format slug if unknown
    const formatted = pId
      .replace(/^d0000000-0000-0000-0000-000000000013$/, 'Civil Engineering')
      .replace(/^d0000000-0000-0000-0000-000000000014$/, 'Electrical Engineering')
      .replace(/^d0000000-0000-0000-0000-000000000015$/, 'Mechanical Engineering')
      .replace(/^d0000000-0000-0000-0000-000000000007$/, 'UI/UX Design')
      .replace(/^d0000000-0000-0000-0000-000000000008$/, 'Prompt Engineering')
      .replace(/^d0000000-0000-0000-0000-000000000009$/, 'Biotechnology')
      .replace(/^d0000000-0000-0000-0000-000000000010$/, 'Data Structures & Algorithms')
      .replace(/^d0000000-0000-0000-0000-000000000011$/, 'C / C++ Programming')
      .replace(/^d0000000-0000-0000-0000-000000000012$/, 'Business Management');

    if (!formatted.startsWith('d0000000') && !formatted.includes('-')) {
      return {
        name: formatted,
        icon: getDomainIcon(formatted),
      };
    }
  }

  // 4. Fallback to candidate's branch (e.g. "Civil Engineering", "Mechanical", "Computer Science")
  if (student.branch && student.branch.trim()) {
    const branchName = student.branch.trim();
    return {
      name: branchName,
      icon: getDomainIcon(branchName),
    };
  }

  return {
    name: 'Technical Assessment',
    icon: '⚡',
  };
}
