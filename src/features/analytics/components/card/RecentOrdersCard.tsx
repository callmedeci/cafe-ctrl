import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link } from '@/i18n/navigation';
import { searchParamsCache } from '@/lib/utils';
import { ShoppingBag } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import RecentOrdersContent from '../content/RecentOrdersContent';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

async function RecentOrdersCard() {
  const t = await getTranslations('analytics');
  const { period } = searchParamsCache.all();
  const periodText = t(`periods.${period}`);

  return (
    <Card className='flex h-64 flex-col overflow-hidden 2xl:h-full'>
      <CardHeader className='flex-shrink-0'>
        <CardTitle className='flex items-center gap-2'>
          <ShoppingBag className='h-5 w-5' />
          {t('cards.recentOrders.title')}
        </CardTitle>
        <CardDescription>
          {t('cards.recentOrders.description', { period: periodText })}
        </CardDescription>

        <CardAction>
          <Button variant='outline' size='sm' asChild>
            <Link href='/dashboard/orders'>
              {t('cards.recentOrders.viewAll')}
            </Link>
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className='min-h-0 flex-col overflow-hidden'>
        <Suspense fallback={null}>
          <ScrollArea className='h-full'>
            <RecentOrdersContent />
            <ScrollBar orientation='vertical' />
          </ScrollArea>
        </Suspense>
      </CardContent>
    </Card>
  );
}

export default RecentOrdersCard;
