import { Table, TableFooter } from '@/components/ui/table';
import { Suspense } from 'react';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { searchParamsCache } from '@/lib/utils';
import OrdersTableFooterSkeleton from '../skeletons/OrdersTableFooterSkeleton';
import OrdersTableLoadingSkeleton from '../skeletons/OrdersTableLoadingSkeleton';
import OrdersTableBody from './OrdersTableBody';
import OrdersTableFooterContent from './OrdersTableFooterContent';
import OrdersTableHeader from './OrdersTableHeader';

async function OrdersTable() {
  const { selected_date } = searchParamsCache.all();

  return (
    <div className='flex rounded-md border'>
      <ScrollArea className='w-1 flex-1'>
        <Table>
          <OrdersTableHeader />
          <Suspense
            fallback={<OrdersTableLoadingSkeleton />}
            key={`selectedDate=${selected_date}`}
          >
            <OrdersTableBody />
          </Suspense>

          <TableFooter>
            <Suspense fallback={<OrdersTableFooterSkeleton />}>
              <OrdersTableFooterContent />
            </Suspense>
          </TableFooter>
        </Table>

        <ScrollBar orientation='horizontal' className='w-full' />
      </ScrollArea>
    </div>
  );
}

export default OrdersTable;
