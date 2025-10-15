import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Download } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import ExportActionsContent from '../content/ExportActionsContent';

async function ExportActionsCard() {
  const t = await getTranslations('reports');

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Download className='h-5 w-5' />
          {t('cards.export.title')}
        </CardTitle>
        <CardDescription>{t('cards.export.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <ExportActionsContent />
      </CardContent>
    </Card>
  );
}

export default ExportActionsCard;
