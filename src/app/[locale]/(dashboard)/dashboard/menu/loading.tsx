import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

function MenuLoading() {
  return (
    <div role='status' aria-busy='true' className='flex flex-col'>
      <span className='sr-only'>Loading menu...</span>

      <header className='bg-sidebar/95 flex flex-col gap-2 border-b px-4 py-[17.2px] backdrop-blur sm:flex-row sm:items-center sm:justify-between'>
        <div className='space-y-2'>
          <Skeleton className='h-7 w-32' aria-hidden='true' />
          <Skeleton className='h-4 w-80' aria-hidden='true' />
        </div>
        <Skeleton className='h-7 w-7 sm:self-start' aria-hidden='true' />
      </header>

      <div className='flex gap-4 p-4'>
        <ScrollArea className='w-1 flex-1 rounded-md border'>
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className='h-6 w-32' aria-hidden='true' />
              </CardTitle>
              <CardDescription>
                <Skeleton className='h-4 w-64' aria-hidden='true' />
              </CardDescription>

              {/* MenuActions skeleton */}
              <div className='my-2 flex flex-col-reverse gap-2 xl:flex-row'>
                {/* Left side filters */}
                <div className='flex items-center gap-1 md:gap-2'>
                  <Skeleton className='h-10 w-28' aria-hidden='true' />
                  <Skeleton className='h-10 w-24' aria-hidden='true' />
                  <Skeleton className='h-10 w-10' aria-hidden='true' />
                </div>

                {/* Right side actions */}
                <div className='flex w-full items-center gap-1 md:gap-2'>
                  <Skeleton className='h-10 flex-1' aria-hidden='true' />
                  <Skeleton className='h-10 w-32 sm:w-40' aria-hidden='true' />
                  <Skeleton className='h-10 w-32 sm:w-36' aria-hidden='true' />
                </div>
              </div>

              {/* FiltersList skeleton */}
              <div className='flex flex-wrap items-center gap-1'>
                <Skeleton
                  className='h-6 w-20 rounded-full'
                  aria-hidden='true'
                />
                <Skeleton
                  className='h-6 w-24 rounded-full'
                  aria-hidden='true'
                />
                <Skeleton
                  className='h-6 w-16 rounded-full'
                  aria-hidden='true'
                />
              </div>
            </CardHeader>

            <CardContent>
              {/* Table */}
              <div className='rounded-md border'>
                <table className='w-full'>
                  {/* Table Header */}
                  <thead className='border-b'>
                    <tr>
                      <th className='h-12 px-2 text-left md:px-4'>
                        <Skeleton className='h-4 w-4' aria-hidden='true' />
                      </th>
                      <th className='h-12 px-2 text-left md:px-4'>
                        <Skeleton className='h-4 w-16' aria-hidden='true' />
                      </th>
                      <th className='h-12 px-2 text-left md:px-4'>
                        <Skeleton className='h-4 w-20' aria-hidden='true' />
                      </th>
                      <th className='h-12 px-2 text-left md:px-4'>
                        <Skeleton className='h-4 w-24' aria-hidden='true' />
                      </th>
                      <th className='h-12 px-2 text-left md:px-4'>
                        <Skeleton className='h-4 w-16' aria-hidden='true' />
                      </th>
                      <th className='h-12 px-2 text-left md:px-4'>
                        <Skeleton className='h-4 w-4' aria-hidden='true' />
                      </th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody>
                    {Array.from({ length: 8 }).map((_, index) => (
                      <tr
                        key={index}
                        className='hover:bg-muted/50 border-b transition-colors last:border-b-0'
                      >
                        <td className='h-16 px-2 md:px-4'>
                          <Skeleton className='h-4 w-4' aria-hidden='true' />
                        </td>
                        <td className='h-16 px-2 md:px-4'>
                          <Skeleton
                            className='h-10 w-10 rounded-full'
                            aria-hidden='true'
                          />
                        </td>
                        <td className='h-16 px-2 md:px-4'>
                          <Skeleton
                            className='h-4 w-24 sm:w-32'
                            aria-hidden='true'
                          />
                        </td>
                        <td className='h-16 px-2 md:px-4'>
                          <div className='flex items-center gap-1'>
                            <Skeleton className='h-4 w-4' aria-hidden='true' />
                            <Skeleton
                              className='h-4 w-16 sm:w-20'
                              aria-hidden='true'
                            />
                          </div>
                        </td>
                        <td className='h-16 px-2 md:px-4'>
                          <div className='hidden gap-1 sm:flex'>
                            <Skeleton
                              className='h-6 w-16 rounded-full'
                              aria-hidden='true'
                            />
                            <Skeleton
                              className='h-6 w-20 rounded-full'
                              aria-hidden='true'
                            />
                          </div>
                        </td>
                        <td className='h-16 px-2 md:px-4'>
                          <Skeleton
                            className='ml-auto h-8 w-8'
                            aria-hidden='true'
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Footer */}
              <div className='mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                <Skeleton className='h-4 w-48' aria-hidden='true' />
                <div className='flex items-center gap-2 self-end'>
                  <Skeleton className='h-9 w-24' aria-hidden='true' />
                  <Skeleton className='h-9 w-20' aria-hidden='true' />
                </div>
              </div>
            </CardContent>
          </Card>

          <ScrollBar orientation='horizontal' className='w-full' />
        </ScrollArea>
      </div>
    </div>
  );
}

export default MenuLoading;
