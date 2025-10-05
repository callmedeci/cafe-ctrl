import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export function P({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        'text-muted-foreground text-xs leading-relaxed text-pretty md:text-sm',
        className,
      )}
    >
      {children}
    </p>
  );
}
