'use client';

import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';
import { ReactNode } from 'react';
import { useLocale } from 'next-intl';

type LayoutHeaderSkeleton = {
  className?: string;
  children?: ReactNode;
  backButton?: boolean;
};

function LayoutHeaderSkeleton({
  className,
  backButton = false,
  children,
}: LayoutHeaderSkeleton) {
  const locale = useLocale();
  const isFa = locale === 'fa';

  return (
    <header
      className={cn(
        'bg-sidebar/95 flex flex-col gap-2 border-b px-4 py-[15px] backdrop-blur sm:items-center sm:justify-between',
        isFa ? 'sm:flex-row-reverse' : 'sm:flex-row',
        className,
      )}
    >
      <div
        className={cn(
          'flex flex-col space-y-2',
          isFa ? 'items-end' : 'items-start',
        )}
      >
        {/* title */}
        <Skeleton className='h-7 w-32' aria-hidden='true' />

        {/* description */}
        <Skeleton className='h-4 w-80' aria-hidden='true' />
      </div>
      <div className='flex items-center gap-2'>
        {backButton && (
          // Back button
          <Skeleton className='h-8 w-16 sm:w-20' aria-hidden='true' />
        )}
        {/* Sidebar toggle */}
        <Skeleton className='flex h-7 w-7 md:hidden' aria-hidden='true' />

        {children}
      </div>
    </header>
  );
}

export default LayoutHeaderSkeleton;
