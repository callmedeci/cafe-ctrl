import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Table, TableFooter } from '@/components/ui/table';
import { Suspense } from 'react';

import MenuTableFooterSkeleton from '../skeletons/MenuTableFooterSkeleton';
import MenuTableLoadingSkeleton from '../skeletons/MenuTableLoadingSkeleton';
import MenuTableBody from './MenuTableBody';
import MenuTableFooterContent from './MenuTableFooterContent';
import MenuTableHeader from './MenuTableHeader';

function MenuTable() {
  return (
    <div className='flex rounded-md border'>
      <ScrollArea className='w-1 flex-1'>
        <Table>
          <MenuTableHeader />

          <Suspense fallback={<MenuTableLoadingSkeleton />}>
            <MenuTableBody />
          </Suspense>

          <TableFooter>
            <Suspense fallback={<MenuTableFooterSkeleton />}>
              <MenuTableFooterContent />
            </Suspense>
          </TableFooter>
        </Table>
        <ScrollBar orientation='horizontal' className='w-full' />
      </ScrollArea>
    </div>
  );
}

export default MenuTable;
