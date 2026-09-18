import { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  value: number | string;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export function AnimatedCounter({
  value,
  duration = 400,
  className = '',
  prefix = '',
  suffix = '',
}: AnimatedCounterProps) {
  // If string (e.g. contains % or non-digits), check if it can be parsed
  const numericValue = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^0-9.-]+/g, ''));
  const isNumeric = !isNaN(numericValue);

  const [displayValue, setDisplayValue] = useState<number>(() => isNumeric ? numericValue : 0);
  const prevRef = useRef<number>(isNumeric ? numericValue : 0);
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (!isNumeric) return;

    if (isFirstMount.current) {
      isFirstMount.current = false;
      setDisplayValue(numericValue);
      prevRef.current = numericValue;
      return;
    }

    const start = prevRef.current;
    const end = numericValue;
    if (start === end) {
      setDisplayValue(end);
      return;
    }

    const startTime = performance.now();

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (end - start) * easeProgress);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setDisplayValue(end);
        prevRef.current = end;
      }
    };

    const frameId = requestAnimationFrame(updateCount);
    return () => {
      cancelAnimationFrame(frameId);
      prevRef.current = end;
    };
  }, [numericValue, duration, isNumeric]);

  if (!isNumeric) {
    return <span className={className}>{prefix}{value}{suffix}</span>;
  }

  return (
    <span className={className}>
      {prefix}
      {Number.isInteger(numericValue) ? displayValue.toLocaleString() : displayValue.toFixed(1)}
      {suffix}
    </span>
  );
}
