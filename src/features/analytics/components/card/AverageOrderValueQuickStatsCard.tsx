import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Percent } from 'lucide-react';
import { Suspense } from 'react';
import AverageOrderValueQuickStatsContent from '../content/AverageOrderValueQuickStatsContent';

async function AverageOrderValueQuickStatsCard() {
  // const t = await getTranslations();

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>
          Average Order Value
        </CardTitle>
        <Percent className='text-muted-foreground h-4 w-4' />
      </CardHeader>
      {/* ---> MUST CHABGE <--- */}
      <Suspense fallback={null}>
        <AverageOrderValueQuickStatsContent />
      </Suspense>
    </Card>
  );
}

export default AverageOrderValueQuickStatsCard;
