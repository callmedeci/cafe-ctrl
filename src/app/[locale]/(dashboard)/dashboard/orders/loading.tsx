import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function OrdersLoading() {
  return (
    <div role='status' aria-busy='true' className='flex flex-col'>
      <span className='sr-only'>Loading orders...</span>

      {/* Header */}
      <header className='bg-sidebar/95 flex flex-col gap-2 border-b px-4 py-[17.2px] backdrop-blur sm:flex-row sm:items-center sm:justify-between'>
        <div className='space-y-2'>
          <Skeleton className='h-6 w-44' aria-hidden='true' />
          <Skeleton className='h-4 w-96' aria-hidden='true' />
        </div>
        <Skeleton className='h-7 w-7 sm:self-start' aria-hidden='true' />
      </header>

      <div className='flex flex-col gap-4 p-4'>
        <Card>
          <CardHeader>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Skeleton className='h-7 w-48' aria-hidden='true' />
                <Skeleton className='h-4 w-80' aria-hidden='true' />
              </div>

              {/* Actions Row */}
              <div className='flex flex-col-reverse gap-2 xl:flex-row'>
                <div className='flex flex-wrap items-center gap-2'>
                  <Skeleton className='h-9 w-24' aria-hidden='true' />
                  <Skeleton className='h-9 w-24' aria-hidden='true' />
                  <Skeleton className='h-9 w-20' aria-hidden='true' />
                </div>

                <div className='flex w-full items-center gap-2'>
                  <Skeleton className='h-9 flex-1' aria-hidden='true' />
                  <Skeleton className='h-9 w-28 sm:w-32' aria-hidden='true' />
                  <Skeleton className='h-9 w-32 sm:w-36' aria-hidden='true' />
                </div>
              </div>

              {/* Filters */}
              <div className='flex flex-wrap gap-2'>
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className='h-6 w-20 rounded-full'
                    aria-hidden='true'
                  />
                ))}
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {/* Table */}
            <div className='rounded-md border'>
              {/* Table Header */}
              <div className='border-b'>
                <div className='grid grid-cols-4 gap-4 p-2 md:grid-cols-8 md:px-4'>
                  <Skeleton className='h-4 w-16' aria-hidden='true' />
                  <Skeleton className='h-4 w-20' aria-hidden='true' />
                  <Skeleton
                    className='hidden h-4 w-18 md:block'
                    aria-hidden='true'
                  />
                  <Skeleton
                    className='hidden h-4 w-16 md:block'
                    aria-hidden='true'
                  />
                  <Skeleton
                    className='hidden h-4 w-14 md:block'
                    aria-hidden='true'
                  />
                  <Skeleton
                    className='hidden h-4 w-16 md:block'
                    aria-hidden='true'
                  />
                  <Skeleton className='h-4 w-14' aria-hidden='true' />
                  <Skeleton className='h-4 w-12' aria-hidden='true' />
                </div>
              </div>

              {/* Table Rows */}
              <div>
                {Array.from({ length: 10 }).map((_, index) => (
                  <div
                    key={index}
                    className='hover:bg-muted/50 border-b transition-colors last:border-b-0'
                  >
                    <div className='grid grid-cols-4 gap-4 p-2 md:grid-cols-8 md:px-4'>
                      <Skeleton
                        className='h-8 w-16 rounded-md'
                        aria-hidden='true'
                      />
                      <div className='space-y-1'>
                        <Skeleton
                          className='h-4 w-20 sm:w-24'
                          aria-hidden='true'
                        />
                        <Skeleton
                          className='h-3 w-16 sm:w-20'
                          aria-hidden='true'
                        />
                      </div>
                      <Skeleton
                        className='hidden h-6 w-16 rounded-full md:block'
                        aria-hidden='true'
                      />
                      <Skeleton
                        className='hidden h-6 w-16 rounded-full md:block'
                        aria-hidden='true'
                      />
                      <Skeleton
                        className='hidden h-4 w-8 md:block'
                        aria-hidden='true'
                      />
                      <Skeleton
                        className='hidden h-6 w-16 rounded-full md:block'
                        aria-hidden='true'
                      />
                      <Skeleton
                        className='h-4 w-12 sm:w-16'
                        aria-hidden='true'
                      />
                      <Skeleton
                        className='h-4 w-16 sm:w-20'
                        aria-hidden='true'
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination */}
            <div className='mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
              <Skeleton className='h-4 w-48' aria-hidden='true' />
              <div className='flex gap-2 self-end'>
                <Skeleton className='h-8 w-20' aria-hidden='true' />
                <Skeleton className='h-8 w-16' aria-hidden='true' />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default OrdersLoading;
