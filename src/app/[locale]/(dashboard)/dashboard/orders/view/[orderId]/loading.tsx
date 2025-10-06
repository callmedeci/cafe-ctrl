import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function OrderViewLoading() {
  return (
    <div role='status' aria-busy='true' className='flex flex-col'>
      <span className='sr-only'>Loading order details...</span>

      {/* Header */}
      <header className='bg-sidebar/95 flex flex-col gap-2 border-b px-4 py-[17.2px] backdrop-blur sm:flex-row sm:items-center sm:justify-between'>
        <div className='space-y-2'>
          <Skeleton className='h-6 w-48 sm:w-56' aria-hidden='true' />
          <Skeleton className='h-4 w-64 sm:w-80' aria-hidden='true' />
        </div>

        <div className='flex items-center gap-2'>
          <Skeleton className='h-8 w-16 sm:w-20' aria-hidden='true' />
          <Skeleton className='h-7 w-7' aria-hidden='true' />
        </div>
      </header>

      <div className='flex flex-col gap-4 p-4'>
        <Card>
          <CardHeader>
            <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
              <Skeleton className='h-6 w-48' aria-hidden='true' />
              <Skeleton className='h-9 w-28' aria-hidden='true' />
            </div>
            <Skeleton className='h-4 w-64 sm:w-80' aria-hidden='true' />
          </CardHeader>

          <CardContent>
            <div className='grid h-full w-full grid-cols-1 gap-4 lg:grid-cols-2'>
              {/* Order Items Card */}
              <div className='w-full'>
                <Card>
                  <CardHeader>
                    <div className='flex items-center gap-2'>
                      <Skeleton className='h-4 w-4' aria-hidden='true' />
                      <Skeleton className='h-5 w-32' aria-hidden='true' />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-3'>
                      {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className='space-y-2'>
                          <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                              <div className='bg-secondary rounded-full px-2 py-1'>
                                <Skeleton
                                  className='h-3 w-4'
                                  aria-hidden='true'
                                />
                              </div>
                              <Skeleton
                                className='h-4 w-24'
                                aria-hidden='true'
                              />
                            </div>
                            <div className='flex flex-col items-end gap-1'>
                              <Skeleton
                                className='h-4 w-16'
                                aria-hidden='true'
                              />
                              <Skeleton
                                className='h-3 w-12'
                                aria-hidden='true'
                              />
                            </div>
                          </div>
                          {index < 2 && <div className='bg-border h-px' />}
                        </div>
                      ))}

                      <div className='bg-border my-4 h-px' />

                      <div className='flex items-center justify-between'>
                        <span className='text-base font-semibold'>Total</span>
                        <Skeleton className='h-5 w-20' aria-hidden='true' />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className='flex w-full flex-col space-y-4'>
                {/* Order Details Card */}
                <Card>
                  <CardHeader>
                    <div className='flex items-center gap-2'>
                      <Skeleton className='h-4 w-4' aria-hidden='true' />
                      <Skeleton className='h-5 w-28' aria-hidden='true' />
                    </div>
                  </CardHeader>
                  <CardContent className='space-y-3'>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div key={index} className='space-y-2'>
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center gap-1'>
                            <Skeleton className='h-4 w-4' aria-hidden='true' />
                            <Skeleton className='h-4 w-16' aria-hidden='true' />
                          </div>
                          <Skeleton className='h-4 w-20' aria-hidden='true' />
                        </div>
                        {index < 5 && <div className='bg-border h-px' />}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <div className='flex w-full flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row'>
                  {/* Quick Actions Card */}
                  <Card className='flex-1'>
                    <CardHeader>
                      <div className='flex items-center gap-2'>
                        <Skeleton className='h-4 w-4' aria-hidden='true' />
                        <Skeleton className='h-5 w-28' aria-hidden='true' />
                      </div>
                    </CardHeader>
                    <CardContent className='space-y-2'>
                      {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton
                          key={index}
                          className='h-8 w-full'
                          aria-hidden='true'
                        />
                      ))}
                    </CardContent>
                  </Card>

                  {/* Notes Card */}
                  <Card className='flex-1'>
                    <CardHeader>
                      <div className='flex items-center gap-2'>
                        <Skeleton className='h-4 w-4' aria-hidden='true' />
                        <Skeleton className='h-5 w-16' aria-hidden='true' />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className='space-y-2'>
                        <Skeleton className='h-4 w-full' aria-hidden='true' />
                        <Skeleton className='h-4 w-4/5' aria-hidden='true' />
                        <Skeleton className='h-4 w-3/4' aria-hidden='true' />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default OrderViewLoading;
