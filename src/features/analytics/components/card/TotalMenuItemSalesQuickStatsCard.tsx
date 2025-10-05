import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';
import { Suspense } from 'react';
import TotalSalesContent from '../content/TotalMenuItemSalesQuickStatsContent';

async function TotalMenuItemSalesQuickStatsCard() {
  // const t = await getTranslations('analytics');

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>Total sales</CardTitle>
        <DollarSign className='text-muted-foreground h-4 w-4' />
      </CardHeader>
      {/* ---> MUST CHABGE <--- */}
      <Suspense fallback={null}>
        <TotalSalesContent />
      </Suspense>
    </Card>
  );
}

export default TotalMenuItemSalesQuickStatsCard;
