import { Table, TableFooter } from '@/components/ui/table';
import { Suspense } from 'react';

import OrdersTableLoadingSkeleton from '../skeletons/OrdersTableLoadingSkeleton';
import OrdersTableBody from './OrdersTableBody';
import OrdersTableFooterContent from './OrdersTableFooterContent';
import OrdersTableHeader from './OrdersTableHeader';
import OrdersTableFooterSkeleton from '../skeletons/OrdersTableFooterSkeleton';
import { searchParamsCache } from '@/lib/utils';

function OrdersTable() {
  const { selected_date } = searchParamsCache.all();

  return (
    <div className='rounded-md border'>
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
    </div>
  );
}

export default OrdersTable;
