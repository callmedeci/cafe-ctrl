import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function DashboardLoading() {
  return (
    <>
      {/* Header Skeleton */}
      <header className='bg-sidebar/95 flex justify-between border-b px-4 py-[17.2px] backdrop-blur'>
        <div>
          <Skeleton className='mb-2 h-6 w-48 sm:w-56' />
          <Skeleton className='h-4 w-80 sm:w-96' />
        </div>
        <Skeleton className='h-7 w-7' />
      </header>

      <div className='flex flex-col gap-6 p-4'>
        {/* Stats Cards Row */}
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index}>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <Skeleton className='h-4 w-24 sm:w-32' />
                <Skeleton className='h-4 w-4 sm:w-4' />
              </CardHeader>
              <CardContent>
                <Skeleton className='mb-1 h-8 w-20 sm:w-24' />
                <Skeleton className='h-3 w-32 sm:w-40' />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
          {/* Chart Card */}
          <Card className='lg:col-span-2'>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <div>
                  <Skeleton className='mb-2 h-6 w-48 sm:w-56' />
                  <Skeleton className='h-4 w-72 sm:w-80' />
                </div>
                <Skeleton className='h-9 w-24 sm:w-32' />
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className='h-80 w-full' />
            </CardContent>
          </Card>

          {/* Recent Activity Card */}
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <Skeleton className='h-6 w-32 sm:w-40' />
                <Skeleton className='h-8 w-20 sm:w-24' />
              </div>
              <Skeleton className='h-4 w-56 sm:w-64' />
            </CardHeader>
            <CardContent className='space-y-4'>
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className='flex items-center space-x-4'>
                  <Skeleton className='h-10 w-10 rounded-full' />
                  <div className='flex-1 space-y-1'>
                    <Skeleton className='h-4 w-48 sm:w-56' />
                    <Skeleton className='h-3 w-32 sm:w-40' />
                  </div>
                  <Skeleton className='h-6 w-16 rounded-full sm:w-20' />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card>
            <CardHeader>
              <Skeleton className='h-6 w-28 sm:w-36' />
              <Skeleton className='h-4 w-44 sm:w-52' />
            </CardHeader>
            <CardContent className='grid grid-cols-2 gap-3'>
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className='flex flex-col items-center space-y-2 rounded-lg border p-4'
                >
                  <Skeleton className='h-8 w-8' />
                  <Skeleton className='h-4 w-20 sm:w-24' />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
          {/* Popular Items Card */}
          <Card>
            <CardHeader>
              <Skeleton className='h-6 w-32 sm:w-40' />
              <Skeleton className='h-4 w-40 sm:w-48' />
            </CardHeader>
            <CardContent className='space-y-3'>
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className='flex items-center justify-between'>
                  <div className='flex items-center space-x-3'>
                    <Skeleton className='h-8 w-8 rounded-full' />
                    <div>
                      <Skeleton className='h-4 w-24 sm:w-32' />
                      <Skeleton className='mt-1 h-3 w-16 sm:w-20' />
                    </div>
                  </div>
                  <Skeleton className='h-4 w-12 sm:w-16' />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Revenue Card */}
          <Card>
            <CardHeader>
              <Skeleton className='h-6 w-28 sm:w-36' />
              <Skeleton className='h-4 w-44 sm:w-52' />
            </CardHeader>
            <CardContent>
              <Skeleton className='mb-4 h-12 w-32 sm:w-40' />
              <div className='space-y-2'>
                <div className='flex justify-between'>
                  <Skeleton className='h-3 w-16 sm:w-20' />
                  <Skeleton className='h-3 w-12 sm:w-16' />
                </div>
                <Skeleton className='h-2 w-full rounded-full' />
                <div className='flex justify-between'>
                  <Skeleton className='h-3 w-20 sm:w-24' />
                  <Skeleton className='h-3 w-12 sm:w-16' />
                </div>
                <Skeleton className='h-2 w-full rounded-full' />
              </div>
            </CardContent>
          </Card>

          {/* Orders Summary Card */}
          <Card>
            <CardHeader>
              <Skeleton className='h-6 w-36 sm:w-44' />
              <Skeleton className='h-4 w-52 sm:w-60' />
            </CardHeader>
            <CardContent className='space-y-4'>
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className='flex items-center justify-between'>
                  <div className='flex items-center space-x-2'>
                    <Skeleton className='h-3 w-3 rounded-full' />
                    <Skeleton className='h-4 w-20 sm:w-24' />
                  </div>
                  <Skeleton className='h-4 w-8 sm:w-10' />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export default DashboardLoading;
