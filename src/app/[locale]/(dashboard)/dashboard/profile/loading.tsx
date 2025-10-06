import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function ProfilePageLoading() {
  return (
    <div role='status' aria-busy='true' className='flex flex-col'>
      <span className='sr-only'>Loading profile...</span>

      {/* Header */}
      <header className='bg-sidebar/95 flex flex-col gap-2 border-b px-4 py-[17.2px] backdrop-blur sm:flex-row sm:items-center sm:justify-between'>
        <div className='space-y-2'>
          <Skeleton className='h-6 w-48 sm:w-56' aria-hidden='true' />
          <Skeleton className='h-4 w-64 sm:w-80' aria-hidden='true' />
        </div>
        <Skeleton className='h-7 w-7 sm:self-start' aria-hidden='true' />
      </header>

      <div className='flex flex-col justify-center gap-4 p-4'>
        {/* Profile Header Card */}
        <Card>
          <CardContent className='pt-6'>
            <div className='flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left'>
              <Skeleton className='h-20 w-20 rounded-full' aria-hidden='true' />
              <div className='flex-1 space-y-2'>
                <Skeleton className='h-6 w-48' aria-hidden='true' />
                <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4'>
                  <div className='flex items-center gap-1'>
                    <Skeleton className='h-4 w-4' aria-hidden='true' />
                    <Skeleton className='h-4 w-32' aria-hidden='true' />
                  </div>
                  <div className='flex items-center gap-1'>
                    <Skeleton className='h-4 w-4' aria-hidden='true' />
                    <Skeleton className='h-4 w-24' aria-hidden='true' />
                  </div>
                </div>
                <div className='flex flex-wrap gap-2'>
                  <Skeleton
                    className='h-6 w-20 rounded-full'
                    aria-hidden='true'
                  />
                  <Skeleton
                    className='h-6 w-24 rounded-full'
                    aria-hidden='true'
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Cards */}
        <div className='space-y-6'>
          {/* Personal Info Card */}
          <Card>
            <CardHeader>
              <Skeleton className='h-6 w-32 sm:w-48' aria-hidden='true' />
              <Skeleton className='h-4 w-64 sm:w-80' aria-hidden='true' />
            </CardHeader>
            <CardContent className='space-y-6'>
              {/* Avatar Upload */}
              <div className='space-y-2'>
                <Skeleton className='h-4 w-24' aria-hidden='true' />
                <div className='max-w-sm'>
                  <Skeleton
                    className='aspect-[3/2] w-full rounded-xl'
                    aria-hidden='true'
                  />
                </div>
              </div>

              {/* Name Fields */}
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-20' aria-hidden='true' />
                  <Skeleton className='h-9 w-full' aria-hidden='true' />
                </div>
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-20' aria-hidden='true' />
                  <Skeleton className='h-9 w-full' aria-hidden='true' />
                </div>
              </div>

              {/* Phone Field */}
              <div className='space-y-2'>
                <Skeleton className='h-6 w-32 sm:w-40' aria-hidden='true' />
                <div className='flex w-full items-end gap-2'>
                  <Skeleton className='h-9 flex-1' aria-hidden='true' />
                  <Skeleton className='h-9 w-32' aria-hidden='true' />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Change Password Card */}
          <Card>
            <CardHeader>
              <Skeleton className='h-6 w-32 sm:w-48' aria-hidden='true' />
              <Skeleton className='h-4 w-64 sm:w-80' aria-hidden='true' />
            </CardHeader>
            <CardContent className='space-y-6'>
              {/* Password Fields */}
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-24' aria-hidden='true' />
                  <Skeleton className='h-9 w-full' aria-hidden='true' />
                </div>
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-32' aria-hidden='true' />
                  <Skeleton className='h-9 w-full' aria-hidden='true' />
                </div>
              </div>

              {/* Submit Button */}
              <div className='flex justify-end'>
                <Skeleton className='h-9 w-32' aria-hidden='true' />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ProfilePageLoading;
