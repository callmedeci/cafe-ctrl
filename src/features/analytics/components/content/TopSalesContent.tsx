import { searchParamsCache } from '@/lib/utils';
import { subDays } from 'date-fns';
import { TopSales } from '../../lib/types';
import { getTopSalesByDateRange } from '../../service/analytics-service';
import TopSalesList from '../layout/TopSalesList';

async function TopSalesContent() {
  const { period } = searchParamsCache.all();
  const selectedPeriod = parseInt(period.replace('d', ''), 10);

  const startDate = subDays(new Date(), selectedPeriod).toISOString();
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
          image_url: order.menu_item_id?.image_url || null,
          quantity: order.quantity,
          price: order.price_at_time,
          name,
        });
      else newOrder[index]['quantity'] += order.quantity;

      return newOrder;
    }, [] as TopSales[])
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 7);

  return <TopSalesList sales={topSalesItem} />;
}

export default TopSalesContent;
