import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

const variants = {
  success: 'bg-green-100 text-green-800',
  warning: 'bg-amber-100 text-amber-800',
  danger: 'bg-red-100 text-red-800',
  neutral: 'bg-slate-100 text-slate-700',
};

interface StatusBadgeProps {
  children: ReactNode;
  tone?: keyof typeof variants;
}

export function StatusBadge({ children, tone = 'neutral' }: StatusBadgeProps) {
  return (
    <span className={cn('inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize', variants[tone])}>
      {children}
    </span>
  );
}
