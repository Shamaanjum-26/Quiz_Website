/**
 * Helper to get clean, professional domain icon graphics for each domain.
 * Maps domain slugs, names, and icon keys to high-quality domain-specific vector emblems.
 */
export function getDomainIconPath(slug?: string, icon?: string, name?: string): string {
  const combined = `${slug || ''} ${name || ''} ${icon || ''}`.toLowerCase();

  if (combined.includes('python') || combined.includes('py')) {
    return '/domains/python.svg';
  }
  if ((combined.includes('java') && !combined.includes('javascript')) || combined.includes('spring') || combined.includes('coffee')) {
    return '/domains/java.svg';
  }
  if (
    combined.includes('data-science') ||
    combined.includes('data science') ||
    combined.includes('machine learning') ||
    combined.includes('ai') ||
    combined.includes('data') ||
    combined.includes('brain')
  ) {
    return '/domains/data-science.svg';
  }
  if (
    combined.includes('web') ||
    combined.includes('react') ||
    combined.includes('javascript') ||
    combined.includes('full-stack') ||
    combined.includes('frontend') ||
    combined.includes('globe')
  ) {
    return '/domains/web-dev.svg';
  }
  if (
    combined.includes('cloud') ||
    combined.includes('devops') ||
    combined.includes('aws') ||
    combined.includes('azure') ||
    combined.includes('docker')
  ) {
    return '/domains/cloud.svg';
  }
  if (
    combined.includes('cyber') ||
    combined.includes('security') ||
    combined.includes('shield') ||
    combined.includes('hacking')
  ) {
    return '/domains/cybersecurity.svg';
  }
  if (combined.includes('ui') || combined.includes('ux') || combined.includes('design') || combined.includes('figma')) {
    return '/domains/ui-ux.svg';
  }
  return '/domains/default.svg';
}
