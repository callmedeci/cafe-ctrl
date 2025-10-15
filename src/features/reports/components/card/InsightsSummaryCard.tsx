import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import InsightsSummaryContent from '../content/InsightsSummaryContent';
import { Skeleton } from '@/components/ui/skeleton';

async function InsightsSummaryCard() {
  const t = await getTranslations('reports');

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Lightbulb className='h-5 w-5' />
          {t('cards.insights.title')}
        </CardTitle>
        <CardDescription>{t('cards.insights.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Skeleton className='h-32 w-full' />}>
          <InsightsSummaryContent />
        </Suspense>
      </CardContent>
    </Card>
  );
}

export default InsightsSummaryCard;
