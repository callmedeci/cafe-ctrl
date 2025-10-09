import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type H4Props = { children: ReactNode; className?: string };

export function H4({ children, className }: H4Props) {
  return (
    <h4
      className={cn(
        'scroll-m-20 text-lg leading-snug font-medium tracking-tight md:text-xl',
        className,
      )}
    >
      {children}
    </h4>
  );
}
