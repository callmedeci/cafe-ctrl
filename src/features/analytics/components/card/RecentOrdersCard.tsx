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
import { ScrollArea } from '@/components/ui/scroll-area';

async function RecentOrdersCard() {
  const t = await getTranslations('analytics');

  const { period } = searchParamsCache.all();

  return (
    <Card className='h-max'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <ShoppingBag className='h-5 w-5' />
          {t('cards.recentOrders.title')}
        </CardTitle>
        <CardDescription>
          {t('cards.recentOrders.description', { period })}
        </CardDescription>

        <CardAction>
          <Button variant='outline' size='sm' asChild>
            <Link href='/dashboard/orders'>
              {t('cards.recentOrders.viewAll')}
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ScrollArea className='[&>[data-radix-scroll-area-viewport]]:max-h-[calc(100vh-43rem)] xl:[&>[data-radix-scroll-area-viewport]]:max-h-[calc(100vh-27rem)]'>
          {/* ---> MUST CHANGE <--- */}
          <Suspense fallback={null}>
            <RecentOrdersContent />
          </Suspense>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default RecentOrdersCard;
