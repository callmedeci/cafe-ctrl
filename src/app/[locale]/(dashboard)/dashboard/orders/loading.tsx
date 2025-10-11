import LayoutHeaderSkeleton from '@/components/shared/LayoutHeaderSkeleton';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

function OrdersLoading() {
  return (
    <div role='status' aria-busy='true' className='flex flex-col'>
      <span className='sr-only'>Loading orders...</span>

      <LayoutHeaderSkeleton />

      <div className='flex gap-4 p-4'>
        <ScrollArea type='always' className='w-1 flex-1'>
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className='h-6 w-32' aria-hidden='true' />
              </CardTitle>
              <CardDescription>
                <Skeleton className='h-4 w-96' aria-hidden='true' />
              </CardDescription>

              {/* OrdersActions skeleton */}
              <div className='my-1 flex flex-col-reverse gap-2 md:my-2 xl:flex-row'>
                {/* Filter buttons group */}
                <div className='flex items-center gap-1 md:gap-2'>
                  <Skeleton
                    className='h-9 w-24 rounded-md'
                    aria-hidden='true'
                  />
                  <Skeleton
                    className='h-9 w-20 rounded-md'
                    aria-hidden='true'
                  />
                  <Skeleton
                    className='h-9 w-24 rounded-md'
                    aria-hidden='true'
                  />
                </div>

                {/* Search, date picker, and create button */}
                <div className='flex w-full items-center gap-2'>
                  <Skeleton className='h-9 flex-1' aria-hidden='true' />
                  <Skeleton className='h-9 w-32' aria-hidden='true' />
                  <Skeleton className='h-9 w-9 rounded-md' aria-hidden='true' />
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
              </div>
            </CardHeader>

            <CardContent>
              <div className='rounded-md border'>
                <div className='relative w-full overflow-auto'>
                  <table className='w-full caption-bottom text-sm'>
                    {/* Table Header */}
                    <thead className='[&_tr]:border-b'>
                      <tr className='hover:bg-muted/50 border-b transition-colors'>
                        <th className='text-muted-foreground h-10 px-2 text-left align-middle font-medium md:px-4'>
                          <Skeleton
                            className='h-4 w-12 sm:w-16'
                            aria-hidden='true'
                          />
                        </th>
                        <th className='text-muted-foreground h-10 px-2 text-left align-middle font-medium md:px-4'>
                          <Skeleton
                            className='h-4 w-16 sm:w-20'
                            aria-hidden='true'
                          />
                        </th>
                        <th className='text-muted-foreground h-10 px-2 text-left align-middle font-medium md:px-4'>
                          <Skeleton
                            className='h-4 w-20 sm:w-24'
                            aria-hidden='true'
                          />
                        </th>
                        <th className='text-muted-foreground h-10 px-2 text-left align-middle font-medium md:px-4'>
                          <Skeleton
                            className='h-4 w-16 sm:w-20'
                            aria-hidden='true'
                          />
                        </th>
                        <th className='text-muted-foreground h-10 px-2 text-left align-middle font-medium md:px-4'>
                          <Skeleton
                            className='h-4 w-12 sm:w-14'
                            aria-hidden='true'
                          />
                        </th>
                        <th className='text-muted-foreground h-10 px-2 text-left align-middle font-medium md:px-4'>
                          <Skeleton
                            className='h-4 w-12 sm:w-16'
                            aria-hidden='true'
                          />
                        </th>
                        <th className='text-muted-foreground h-10 px-2 text-left align-middle font-medium md:px-4'>
                          <Skeleton
                            className='h-4 w-10 sm:w-12'
                            aria-hidden='true'
                          />
                        </th>
                        <th className='text-muted-foreground h-10 px-2 text-left align-middle font-medium md:px-4'>
                          <Skeleton
                            className='h-4 w-16 sm:w-20'
                            aria-hidden='true'
                          />
                        </th>
                        <th className='text-muted-foreground h-10 px-2 text-end align-middle font-medium md:px-4'>
                          <Skeleton
                            className='ml-auto h-4 w-4'
                            aria-hidden='true'
                          />
                        </th>
                      </tr>
                    </thead>

                    {/* Table Body - 10 rows matching actual table */}
                    <tbody className='[&_tr:last-child]:border-0'>
                      {Array.from({ length: 10 }).map((_, index) => (
                        <tr
                          key={index}
                          className='hover:bg-muted/50 border-b transition-colors'
                        >
                          <td className='p-2 align-middle md:px-4'>
                            <Skeleton
                              className='h-9 w-16 rounded-md sm:w-20'
                              aria-hidden='true'
                            />
                          </td>
                          <td className='p-2 align-middle md:px-4'>
                            <Skeleton
                              className='h-4 w-20 sm:w-28 md:w-32'
                              aria-hidden='true'
                            />
                          </td>
                          <td className='p-2 align-middle md:px-4'>
                            <Skeleton
                              className='h-3 w-24 sm:w-32'
                              aria-hidden='true'
                            />
                          </td>
                          <td className='p-2 align-middle md:px-4'>
                            <div className='flex items-center gap-1 rounded-md border px-2 py-1'>
                              <Skeleton
                                className='h-3 w-3 rounded'
                                aria-hidden='true'
                              />
                              <Skeleton
                                className='h-3 w-12 sm:w-16'
                                aria-hidden='true'
                              />
                            </div>
                          </td>
                          <td className='p-2 align-middle md:px-4'>
                            <Skeleton
                              className='h-3 w-12 sm:w-16'
                              aria-hidden='true'
                            />
                          </td>
                          <td className='p-2 align-middle md:px-4'>
                            <div className='flex items-center gap-1 rounded-md border px-2 py-1'>
                              <Skeleton
                                className='h-3 w-3 rounded'
                                aria-hidden='true'
                              />
                              <Skeleton
                                className='h-3 w-10 sm:w-14'
                                aria-hidden='true'
                              />
                            </div>
                          </td>
                          <td className='p-2 align-middle md:px-4'>
                            <Skeleton
                              className='h-4 w-14 sm:w-18 md:w-20'
                              aria-hidden='true'
                            />
                          </td>
                          <td className='p-2 align-middle md:px-4'>
                            <Skeleton
                              className='h-3 w-20 sm:w-24'
                              aria-hidden='true'
                            />
                          </td>
                          <td className='p-2 text-end align-middle md:px-4'>
                            <Skeleton
                              className='ml-auto h-8 w-8 rounded'
                              aria-hidden='true'
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>

                    {/* Table Footer - pagination */}
                    <tfoot>
                      <tr>
                        <td colSpan={9} className='p-4'>
                          <div className='flex flex-col items-center justify-between gap-2 sm:flex-row sm:items-center sm:justify-between'>
                            <Skeleton
                              className='h-4 w-48 sm:w-56'
                              aria-hidden='true'
                            />
                            <div className='flex items-center gap-2'>
                              <Skeleton
                                className='h-9 w-20'
                                aria-hidden='true'
                              />
                              <Skeleton
                                className='h-9 w-16'
                                aria-hidden='true'
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
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

export default OrdersLoading;
