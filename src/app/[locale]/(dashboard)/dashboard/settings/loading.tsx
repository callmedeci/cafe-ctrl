import LayoutHeaderSkeleton from '@/components/shared/LayoutHeaderSkeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function SettingsLoading() {
  return (
    <div role='status' aria-busy='true' className='flex flex-col'>
      <span className='sr-only'>Loading settings...</span>

      <LayoutHeaderSkeleton />

      <div className='flex flex-col gap-4 p-4'>
        {/* Language & Theme Cards */}
        <div className='grid grid-cols-1 gap-4 xl:grid-cols-3'>
          {/* Language Card */}
          <Card>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <Skeleton className='h-5 w-5' aria-hidden='true' />
                <Skeleton className='h-6 w-32' aria-hidden='true' />
              </div>
              <Skeleton className='h-4 w-64' aria-hidden='true' />
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                {Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index}
                    className='group ring-border relative rounded-lg border p-4 ring-2'
                  >
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-3'>
                        <Skeleton className='h-8 w-8' aria-hidden='true' />
                        <div className='space-y-1'>
                          <Skeleton className='h-4 w-16' aria-hidden='true' />
                          <Skeleton className='h-3 w-8' aria-hidden='true' />
                        </div>
                      </div>
                      <Skeleton className='h-7 w-7' aria-hidden='true' />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Theme Card */}
          <Card className='col-span-2'>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <Skeleton className='h-5 w-5' aria-hidden='true' />
                <Skeleton className='h-6 w-24' aria-hidden='true' />
              </div>
              <Skeleton className='h-4 w-56' aria-hidden='true' />
            </CardHeader>
            <CardContent className='grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5'>
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className='group ring-border relative rounded-lg border p-4 ring-2'
                >
                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <Skeleton className='h-5 w-5' aria-hidden='true' />
                    </div>

                    <Skeleton
                      className='h-16 w-full rounded-md'
                      aria-hidden='true'
                    />

                    <div className='space-y-1'>
                      <Skeleton className='h-4 w-16' aria-hidden='true' />
                      <Skeleton className='h-3 w-24' aria-hidden='true' />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Additional Charges Card */}
        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <Skeleton className='h-5 w-5' aria-hidden='true' />
                  <Skeleton className='h-6 w-40' aria-hidden='true' />
                </div>
                <Skeleton className='h-4 w-80' aria-hidden='true' />
              </div>
              <Skeleton className='h-9 w-32' aria-hidden='true' />
            </div>
          </CardHeader>

          <CardContent className='space-y-4'>
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className='group flex flex-col gap-2 rounded-xl border p-2 sm:flex-row sm:items-center sm:justify-between'
              >
                <div className='flex items-center gap-2'>
                  <Skeleton className='h-8 w-8 rounded-xl' aria-hidden='true' />
                  <div className='flex-1 space-y-1'>
                    <div className='flex items-center gap-2'>
                      <Skeleton className='h-4 w-24' aria-hidden='true' />
                      <Skeleton
                        className='h-6 w-16 rounded-full'
                        aria-hidden='true'
                      />
                    </div>
                    <Skeleton className='h-3 w-32' aria-hidden='true' />
                  </div>
                </div>

                <div className='flex items-center gap-2'>
                  <Skeleton
                    className='h-5 w-10 rounded-full'
                    aria-hidden='true'
                  />
                  <div className='flex items-center'>
                    <Skeleton className='h-8 w-8' aria-hidden='true' />
                    <Skeleton className='h-8 w-8' aria-hidden='true' />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default SettingsLoading;
