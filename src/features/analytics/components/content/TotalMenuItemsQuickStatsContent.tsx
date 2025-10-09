import { CardContent } from '@/components/ui/card';
import { getMenuItemCount } from '@/supabase/data/menu-service';

async function TotalMenuItemsQuickStatsContent() {
  const totalMenuItems = await getMenuItemCount();
  return (
    <CardContent>
      <div className='text-2xl font-bold'>{totalMenuItems}</div>
    </CardContent>
  );
}

export default TotalMenuItemsQuickStatsContent;
