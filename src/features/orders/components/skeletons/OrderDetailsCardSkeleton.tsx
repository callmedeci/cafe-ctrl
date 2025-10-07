import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

function OrderDetailsCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base font-semibold'>
          <Skeleton className='h-4 w-4 rounded' aria-hidden='true' />
          <Skeleton className='h-4 w-24 rounded sm:w-32' aria-hidden='true' />
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-2'>
        {/* Customer */}
        <div className='flex items-center justify-between gap-2'>
          <div className='flex items-center gap-1'>
            <Skeleton className='h-4 w-4 shrink-0 rounded' aria-hidden='true' />
            <Skeleton className='h-4 w-16 rounded sm:w-20' aria-hidden='true' />
          </div>
          <Skeleton className='h-4 w-20 rounded sm:w-32' aria-hidden='true' />
        </div>

        <Separator />

        {/* Contact */}
        <div className='flex items-center justify-between gap-2'>
          <div className='flex items-center gap-1'>
            <Skeleton className='h-4 w-4 shrink-0 rounded' aria-hidden='true' />
            <Skeleton className='h-4 w-14 rounded sm:w-18' aria-hidden='true' />
          </div>
          <Skeleton className='h-4 w-24 rounded sm:w-32' aria-hidden='true' />
        </div>

        <Separator />

        {/* Type */}
        <div className='flex items-center justify-between gap-2'>
          <div className='flex items-center gap-1'>
            <Skeleton className='h-4 w-4 shrink-0 rounded' aria-hidden='true' />
            <Skeleton className='h-4 w-10 rounded sm:w-14' aria-hidden='true' />
          </div>
          <div className='flex items-center gap-1 rounded-full border px-2 py-1'>
            <Skeleton className='h-3 w-3 rounded' aria-hidden='true' />
            <Skeleton className='h-3 w-12 rounded sm:w-16' aria-hidden='true' />
          </div>
        </div>

        <Separator />

        {/* Status */}
        <div className='flex items-center justify-between gap-2'>
          <div className='flex items-center gap-1'>
            <Skeleton className='h-4 w-4 shrink-0 rounded' aria-hidden='true' />
            <Skeleton className='h-4 w-12 rounded sm:w-16' aria-hidden='true' />
          </div>
          <div className='flex items-center gap-1 rounded-full border px-2 py-1'>
            <Skeleton className='h-3 w-3 rounded' aria-hidden='true' />
            <Skeleton className='h-3 w-8 rounded sm:w-12' aria-hidden='true' />
          </div>
        </div>

        <Separator />

        {/* Total */}
        <div className='flex items-center justify-between gap-2'>
          <div className='flex items-center gap-1'>
            <Skeleton className='h-4 w-4 shrink-0 rounded' aria-hidden='true' />
            <Skeleton className='h-4 w-10 rounded sm:w-14' aria-hidden='true' />
          </div>
          <Skeleton className='h-4 w-16 rounded sm:w-20' aria-hidden='true' />
        </div>

        <Separator />

        {/* Created */}
        <div className='flex items-center justify-between gap-2'>
          <div className='flex items-center gap-1'>
            <Skeleton className='h-4 w-4 shrink-0 rounded' aria-hidden='true' />
            <Skeleton className='h-4 w-14 rounded sm:w-18' aria-hidden='true' />
          </div>
          <Skeleton className='h-4 w-28 rounded sm:w-36' aria-hidden='true' />
        </div>
      </CardContent>
    </Card>
  );
}

export default OrderDetailsCardSkeleton;
