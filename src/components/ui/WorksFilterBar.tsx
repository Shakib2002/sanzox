import React from 'react';
import { cn } from '@/lib/utils';

interface WorksFilterBarProps {
  industries: string[];
  active: string;
  onChange: (industry: string) => void;
}

export function WorksFilterBar({ industries, active, onChange }: WorksFilterBarProps) {
  return (
    <div className="flex overflow-x-auto scrollbar-hide whitespace-nowrap gap-2 pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:pb-0">
      {industries.map((industry) => (
        <button
          key={industry}
          onClick={() => onChange(industry)}
          className={cn(
            'relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shrink-0',
            active === industry
              ? 'bg-gradient-primary text-primary-foreground shadow-glow border border-primary/30'
              : 'bg-secondary/30 text-muted-foreground border border-border/20'
          )}
        >
          {industry}
        </button>
      ))}
    </div>
  );
}
