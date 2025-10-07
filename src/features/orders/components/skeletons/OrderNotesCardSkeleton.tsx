import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function OrderNotesCardSkeleton() {
  return (
    <Card className='flex-1'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base font-semibold'>
          <Skeleton className='h-4 w-4 rounded' aria-hidden='true' />
          <Skeleton className='h-4 w-16 rounded sm:w-20' aria-hidden='true' />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-full rounded' aria-hidden='true' />
          <Skeleton className='h-4 w-11/12 rounded' aria-hidden='true' />
          <Skeleton className='h-4 w-4/5 rounded' aria-hidden='true' />
        </div>
      </CardContent>
    </Card>
  );
}

export default OrderNotesCardSkeleton;
