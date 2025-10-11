import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ControllerRenderProps } from 'react-hook-form';
import MenuItemsControls from '../layout/MenuItemsControls';
import OrderItemList from '../layout/OrderItemList';
import OrderSummary from '../layout/OrderSummary';
import { Suspense } from 'react';

function MenuItemsSelector(field: ControllerRenderProps) {
  return (
    <div className='space-y-4'>
      <Card className='flex flex-col gap-2 bg-transparent !p-2'>
        <CardHeader className='flex flex-col gap-2 p-1'>
          <MenuItemsControls />
        </CardHeader>

        <CardContent className='!p-1'>
          <OrderItemList field={field} />
          {/* ---> TODO: MUST CHANGE <--- */}
          <Suspense fallback={null}>
            <OrderSummary field={field} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

export default MenuItemsSelector;
