import { CardContent, CardDescription } from '@/components/ui/card';
import { getMenuItemCount } from '@/supabase/data/menu-service';
import { getTranslations } from 'next-intl/server';

async function TotalMenuItemsQuickStatsContent() {
  const totalMenuItems = await getMenuItemCount();
  const t = await getTranslations('analytics');

  return (
    <CardContent>
      <div className='text-2xl font-bold'>{totalMenuItems}</div>
      <CardDescription className='flex items-center gap-1'>
        {t('stats.menuItems.description')}
      </CardDescription>
    </CardContent>
  );
}

export default TotalMenuItemsQuickStatsContent;
