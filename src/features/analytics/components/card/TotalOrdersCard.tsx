import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { searchParamsCache } from '@/lib/utils';
import { TrendingUp } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import TotalOrdersContent from '../content/TotalOrdersContent';

async function TotalOrdersCard() {
  const t = await getTranslations('analytics');
  const { period } = searchParamsCache.all();

  return (
    <Card className='lg:col-span-2'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='flex items-center gap-2'>
              <TrendingUp className='h-5 w-5' />
              {/* ---> MUST CHANGE <--- */}
              Total Orders
            </CardTitle>
            <CardDescription>
              {/* ---> MUST CHANGE <--- */}
              {t('charts.monthlySales.description', { period })}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* ---> MUST CHANGE <--- */}
        <Suspense fallback={null}>
          <TotalOrdersContent />
        </Suspense>
      </CardContent>
    </Card>
  );
}

export default TotalOrdersCard;
