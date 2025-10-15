import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Filter } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import ReportFiltersContent from '../content/ReportFiltersContent';

async function ReportFiltersCard() {
  const t = await getTranslations('reports');

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Filter className='h-5 w-5' />
          {t('cards.filters.title')}
        </CardTitle>
        <CardDescription>{t('cards.filters.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <ReportFiltersContent />
      </CardContent>
    </Card>
  );
}

export default ReportFiltersCard;
