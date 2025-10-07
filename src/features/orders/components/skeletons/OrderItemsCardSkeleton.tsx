import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

function OrderItemsCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base font-semibold'>
          <Skeleton className='h-4 w-4 rounded' aria-hidden='true' />
          <Skeleton className='h-4 w-28 rounded sm:w-36' aria-hidden='true' />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-3'>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index}>
              <div className='flex items-center justify-between gap-2'>
                <div className='flex items-center gap-2'>
                  <Skeleton
                    className='h-6 w-10 shrink-0 rounded-md sm:w-12'
                    aria-hidden='true'
                  />
                  <Skeleton
                    className='h-4 w-24 rounded sm:w-32 md:w-40'
                    aria-hidden='true'
                  />
                </div>
                <div className='flex flex-col items-end gap-1'>
                  <Skeleton
                    className='h-4 w-14 rounded sm:w-18'
                    aria-hidden='true'
                  />
                  <div className='flex items-center gap-1'>
                    <Skeleton
                      className='h-3 w-3 shrink-0 rounded'
                      aria-hidden='true'
                    />
                    <Skeleton
                      className='h-3 w-10 rounded sm:w-14'
                      aria-hidden='true'
                    />
                  </div>
                </div>
              </div>
              {index < 2 && <Separator className='mt-3' />}
            </div>
          ))}

          <Separator className='my-4' />

          {/* Total Price Skeleton */}
          <div className='flex items-center justify-between'>
            <Skeleton className='h-4 w-12 rounded sm:w-16' aria-hidden='true' />
            <Skeleton className='h-5 w-16 rounded sm:w-20' aria-hidden='true' />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default OrderItemsCardSkeleton;
