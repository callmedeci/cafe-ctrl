import { searchParamsCache } from '@/lib/utils';
import { subDays } from 'date-fns';
import { getTopSalesByDateRange } from '../../service/analytics-service';
import TopSalesList from '../layout/TopSalesList';
import { TopOrders } from '../../lib/types';

async function TopSalesContent() {
  const { period } = searchParamsCache.all();
  const selectedPeriod = period.split('d')[0];

  const startDate = subDays(new Date(), +selectedPeriod).toISOString();
  const endDate = new Date().toISOString();

  const { data, error } = await getTopSalesByDateRange(startDate, endDate);

  if (!data || error) return null;

  const topSalesItem = data
    .reduce((newOrder, order) => {
      const name = order.menu_item_id?.name || '';
      const index = newOrder.findIndex((od) => od.name === name);

      if (index === -1)
        newOrder.push({
          ...order.menu_item_id,
          quantity: order.quantity,
          price: order.price_at_time,
          name,
        });
      else newOrder[index]['quantity'] += order.quantity;

      return newOrder;
    }, [] as TopOrders)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 7);

  return <TopSalesList sales={topSalesItem} />;
}

export default TopSalesContent;
