import { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

export function AnimatedCounter({ value, className = '' }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    // Reset state when value changes
    hasAnimatedRef.current = false;
    setDisplayValue(value);
  }, [value]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          startAnimation();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = elementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [value]);

  const startAnimation = () => {
    // Respect user's motion preference (WCAG 2.3.3)
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(value);
      return;
    }

    const match = value.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1];
    const targetNumber = parseFloat(match[2]);
    const suffix = match[3];

    const start = 0;
    const duration = 1200; // 1.2s smooth animation
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing: easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentNumber = start + easeProgress * (targetNumber - start);
      
      const decimalMatch = match[2].match(/\.([0-9]+)/);
      const decimalPlaces = decimalMatch ? decimalMatch[1].length : 0;
      const formattedNumber = currentNumber.toFixed(decimalPlaces);

      setDisplayValue(`${prefix}${formattedNumber}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <span ref={elementRef} className={`tabular-nums inline-block ${className}`} aria-label={value}>
      <span aria-hidden="true">{displayValue}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
