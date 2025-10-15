import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Table2 } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import ReportDataTableContent from '../content/ReportDataTableContent';

async function ReportDataTableCard() {
  const t = await getTranslations('reports');

  return (
    <Card className='col-span-1 md:col-span-2'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Table2 className='h-5 w-5' />
          {t('cards.table.title')}
        </CardTitle>
        <CardDescription>{t('cards.table.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Skeleton className='h-64 w-full' />}>
          <ReportDataTableContent />
        </Suspense>
      </CardContent>
    </Card>
  );
}

export default ReportDataTableCard;
