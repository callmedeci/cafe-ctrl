import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function OrderQuickActionsCardSkeleton() {
  return (
    <Card className='flex-1'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base font-semibold'>
          <Skeleton className='h-4 w-4 rounded' aria-hidden='true' />
          <Skeleton className='h-4 w-24 rounded sm:w-32' aria-hidden='true' />
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-2'>
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className='flex h-9 w-full items-center gap-2 rounded-md px-3'
          >
            <Skeleton className='h-4 w-4 shrink-0 rounded' aria-hidden='true' />
            <Skeleton className='h-4 w-20 rounded sm:w-28' aria-hidden='true' />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default OrderQuickActionsCardSkeleton;
