import LayoutHeaderSkeleton from '@/components/shared/LayoutHeaderSkeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function MenuItemViewLoading() {
  return (
    <div role='status' aria-busy='true' className='flex flex-col'>
      <span className='sr-only'>Loading menu item details...</span>

      <LayoutHeaderSkeleton backButton={true} />

      <div className='flex flex-col gap-4 p-4'>
        <Card>
          <CardHeader>
            <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
              <Skeleton className='h-6 w-48' aria-hidden='true' />
              <Skeleton className='h-9 w-28' aria-hidden='true' />
            </div>
            <Skeleton className='h-4 w-80' aria-hidden='true' />
          </CardHeader>

          <CardContent>
            <div className='grid h-full w-full grid-cols-1 gap-4 lg:grid-cols-2'>
              {/* Image Card */}
              <div className='w-full'>
                <Card className='h-full overflow-hidden p-0'>
                  <CardContent className='h-full p-0'>
                    <Skeleton
                      className='aspect-[4/3] w-full sm:h-96'
                      aria-hidden='true'
                    />
                  </CardContent>
                </Card>
              </div>

              <div className='flex w-full flex-col space-y-4'>
                {/* Details Card */}
                <Card>
                  <CardHeader>
                    <div className='flex items-center gap-2'>
                      <Skeleton className='h-4 w-4' aria-hidden='true' />
                      <Skeleton className='h-5 w-24' aria-hidden='true' />
                    </div>
                  </CardHeader>
                  <CardContent className='space-y-3'>
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div key={index} className='space-y-2'>
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center gap-1'>
                            <Skeleton className='h-4 w-4' aria-hidden='true' />
                            <Skeleton className='h-4 w-16' aria-hidden='true' />
                          </div>
                          <Skeleton className='h-4 w-20' aria-hidden='true' />
                        </div>
                        {index < 3 && <div className='bg-border h-px' />}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Ingredients Card */}
                <Card>
                  <CardHeader>
                    <div className='flex items-center gap-2'>
                      <Skeleton className='h-4 w-4' aria-hidden='true' />
                      <Skeleton className='h-5 w-24' aria-hidden='true' />
                    </div>
                    <Skeleton className='h-4 w-64' aria-hidden='true' />
                  </CardHeader>
                  <CardContent>
                    <div className='flex flex-wrap gap-2'>
                      {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton
                          key={index}
                          className='h-6 w-20 rounded-full'
                          aria-hidden='true'
                        />
                      ))}
                    </div>
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
                      {Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton
                          key={index}
                          className='h-8 w-full'
                          aria-hidden='true'
                        />
                      ))}
                    </CardContent>
                  </Card>

                  {/* Description Card */}
                  <Card className='flex-1'>
                    <CardHeader>
                      <div className='flex items-center gap-2'>
                        <Skeleton className='h-4 w-4' aria-hidden='true' />
                        <Skeleton className='h-5 w-24' aria-hidden='true' />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className='space-y-2'>
                        <Skeleton className='h-4 w-full' aria-hidden='true' />
                        <Skeleton className='h-4 w-4/5' aria-hidden='true' />
                        <Skeleton className='h-4 w-3/4' aria-hidden='true' />
                      </div>
                      <Skeleton className='mt-4 h-8 w-32' aria-hidden='true' />
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

export default MenuItemViewLoading;
