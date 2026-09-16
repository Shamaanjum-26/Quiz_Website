import { getScoreGaugeColor } from '@/lib/scoring';
import type { SkillLevel } from '@/types';

interface ScoreGaugeProps {
  percentage: number;
  skillLevel: SkillLevel;
  size?: 'sm' | 'md' | 'lg';
}

export function ScoreGauge({ percentage, skillLevel, size = 'lg' }: ScoreGaugeProps) {
  const sizes = {
    sm: { r: 40, stroke: 6, fontSize: 'text-xl', svgSize: 100 },
    md: { r: 55, stroke: 8, fontSize: 'text-2xl', svgSize: 130 },
    lg: { r: 70, stroke: 10, fontSize: 'text-4xl', svgSize: 170 },
  };

  const { r, stroke, fontSize, svgSize } = sizes[size];
  const color = getScoreGaugeColor(percentage);
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (percentage / 100) * circumference;
  const cx = svgSize / 2;
  const cy = svgSize / 2;

  return (
    <div className="relative inline-flex flex-col items-center">
      <div className="relative">
        <svg
          width={svgSize}
          height={svgSize}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          className="rotate-[-90deg]"
          role="img"
          aria-label={`Score: ${percentage}%`}
        >
          {/* Background track */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={stroke}
          />
          {/* Progress arc */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: 'stroke-dashoffset 1.5s ease-out',
              filter: `drop-shadow(0 0 6px ${color}60)`,
            }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`font-display font-bold text-gray-900 ${fontSize}`}>
            {Math.round(percentage)}%
          </span>
          {size === 'lg' && (
            <span className="text-xs text-gray-500 font-medium mt-0.5">Score</span>
          )}
        </div>
      </div>

      {/* Skill level badge */}
      <div
        className="mt-3 px-4 py-1.5 rounded-full text-sm font-bold border"
        style={{
          color,
          backgroundColor: `${color}15`,
          borderColor: `${color}40`,
        }}
      >
        {skillLevel}
      </div>
    </div>
  );
}
