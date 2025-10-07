import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function ProfilePageLoading() {
  return (
    <div role='status' aria-busy='true' className='flex flex-col'>
      <span className='sr-only'>Loading profile...</span>

      <div className='flex flex-col justify-center gap-4 p-4'>
        {/* Personal Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className='h-6 w-48' aria-hidden='true' />
            </CardTitle>
            <CardDescription>
              <Skeleton className='h-4 w-full max-w-lg' aria-hidden='true' />
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            {/* Avatar Upload Section */}
            <div className='flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left'>
              <Skeleton
                className='h-20 w-20 shrink-0 rounded-full'
                aria-hidden='true'
              />
              <div className='flex flex-1 flex-col gap-2'>
                <div className='flex flex-col gap-1'>
                  <Skeleton className='h-6 w-40' aria-hidden='true' />
                  <div className='flex items-center justify-center gap-1 sm:justify-start'>
                    <Skeleton className='h-4 w-4' aria-hidden='true' />
                    <Skeleton className='h-4 w-48' aria-hidden='true' />
                  </div>
                </div>
                <div className='flex flex-wrap justify-center gap-2 sm:justify-start'>
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

            {/* Name Fields */}
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-20' aria-hidden='true' />
                <Skeleton className='h-10 w-full' aria-hidden='true' />
              </div>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-20' aria-hidden='true' />
                <Skeleton className='h-10 w-full' aria-hidden='true' />
              </div>
            </div>

            {/* Phone Field and Submit Button */}
            <div className='flex w-full flex-col gap-2 md:flex-row md:items-end'>
              <div className='flex-1 space-y-2'>
                <Skeleton className='h-4 w-32' aria-hidden='true' />
                <Skeleton className='h-10 w-full' aria-hidden='true' />
              </div>
              <Skeleton className='h-10 w-full md:w-32' aria-hidden='true' />
            </div>
          </CardContent>
        </Card>

        {/* Change Password Card */}
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className='h-6 w-48' aria-hidden='true' />
            </CardTitle>
            <CardDescription>
              <Skeleton className='h-4 w-full max-w-lg' aria-hidden='true' />
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            {/* Password Fields */}
            <div className='space-y-2'>
              <Skeleton className='h-4 w-32' aria-hidden='true' />
              <Skeleton className='h-10 w-full' aria-hidden='true' />
            </div>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-40' aria-hidden='true' />
              <Skeleton className='h-10 w-full' aria-hidden='true' />
            </div>

            {/* Submit Button */}
            <div className='flex justify-end'>
              <Skeleton className='h-10 w-40' aria-hidden='true' />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ProfilePageLoading;
