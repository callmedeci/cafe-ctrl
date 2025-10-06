import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function DashboardLoading() {
  return (
    <div role='status' aria-busy='true' className='flex flex-col'>
      <span className='sr-only'>Loading analytics dashboard...</span>

      {/* Header */}
      <header className='bg-sidebar/95 flex flex-col gap-2 border-b px-4 py-[17.2px] backdrop-blur sm:flex-row sm:items-center sm:justify-between'>
        <div className='space-y-2'>
          <Skeleton className='h-7 w-56' aria-hidden='true' />
          <Skeleton className='h-4 w-80' aria-hidden='true' />
        </div>
        <Skeleton className='h-9 w-32' aria-hidden='true' />
      </header>

      <div className='flex flex-col gap-4 p-4'>
        {/* Quick Stats Cards */}
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index}>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <Skeleton className='h-4 w-24' aria-hidden='true' />
                <Skeleton className='h-4 w-4' aria-hidden='true' />
              </CardHeader>
              <CardContent>
                <Skeleton className='mb-2 h-8 w-20' aria-hidden='true' />
                <Skeleton className='h-4 w-32' aria-hidden='true' />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Grid */}
        <div className='grid grid-cols-1 gap-4 xl:h-[600px] xl:grid-cols-4'>
          {/* Sales Chart */}
          <Card className='xl:col-span-3'>
            <CardHeader>
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <Skeleton className='h-5 w-5' aria-hidden='true' />
                  <Skeleton className='h-6 w-48' aria-hidden='true' />
                </div>
                <Skeleton className='h-4 w-64' aria-hidden='true' />
              </div>
            </CardHeader>
            <CardContent>
              <div className='flex h-[300px] items-end justify-between gap-2'>
                {Array.from({ length: 12 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className='w-full'
                    style={{
                      height: `${Math.random() * 60 + 40}%`,
                    }}
                    aria-hidden='true'
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Sales Card */}
          <Card className='flex h-64 flex-col xl:h-full'>
            <CardHeader>
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <Skeleton className='h-5 w-5' aria-hidden='true' />
                  <Skeleton className='h-6 w-40' aria-hidden='true' />
                </div>
                <Skeleton className='h-4 w-48' aria-hidden='true' />
              </div>
            </CardHeader>
            <CardContent className='space-y-3'>
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className='flex items-center gap-3'>
                  <Skeleton
                    className='h-10 w-10 rounded-md'
                    aria-hidden='true'
                  />
                  <div className='flex-1 space-y-1'>
                    <Skeleton className='h-4 w-24' aria-hidden='true' />
                    <Skeleton className='h-3 w-16' aria-hidden='true' />
                  </div>
                  <Skeleton className='h-4 w-12' aria-hidden='true' />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Total Orders Chart */}
          <Card className='xl:col-span-3'>
            <CardHeader>
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <Skeleton className='h-5 w-5' aria-hidden='true' />
                  <Skeleton className='h-6 w-32' aria-hidden='true' />
                </div>
                <Skeleton className='h-4 w-56' aria-hidden='true' />
              </div>
            </CardHeader>
            <CardContent>
              <div className='flex h-[300px] items-end justify-between gap-2'>
                {Array.from({ length: 12 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className='w-full'
                    style={{
                      height: `${Math.random() * 60 + 40}%`,
                    }}
                    aria-hidden='true'
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders Card */}
          <Card className='flex h-64 flex-col xl:h-full'>
            <CardHeader>
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <Skeleton className='h-5 w-5' aria-hidden='true' />
                  <Skeleton className='h-6 w-36' aria-hidden='true' />
                </div>
                <Skeleton className='h-4 w-48' aria-hidden='true' />
              </div>
              <Skeleton className='h-8 w-20' aria-hidden='true' />
            </CardHeader>
            <CardContent className='space-y-3'>
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className='space-y-2 rounded-lg border p-3'>
                  <div className='flex items-center justify-between'>
                    <Skeleton className='h-4 w-20' aria-hidden='true' />
                    <Skeleton
                      className='h-5 w-16 rounded-full'
                      aria-hidden='true'
                    />
                  </div>
                  <Skeleton className='h-3 w-32' aria-hidden='true' />
                  <div className='flex items-center justify-between'>
                    <Skeleton className='h-3 w-24' aria-hidden='true' />
                    <Skeleton className='h-4 w-16' aria-hidden='true' />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DashboardLoading;
