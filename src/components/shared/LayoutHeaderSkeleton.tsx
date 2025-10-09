import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';
import { ReactNode } from 'react';

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
  return (
    <header
      className={cn(
        'bg-sidebar/95 flex flex-col gap-2 border-b px-4 py-[15px] backdrop-blur sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
    >
      <div className='space-y-2'>
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
