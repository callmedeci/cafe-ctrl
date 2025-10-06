import { CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function QuickStatsCardSkeleton() {
  return (
    <CardContent>
      <Skeleton className='mb-2 h-8 w-24' aria-hidden='true' />
      <Skeleton className='h-4 w-32' aria-hidden='true' />
    </CardContent>
  );
}

export default QuickStatsCardSkeleton;
