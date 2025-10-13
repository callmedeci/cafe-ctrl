import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Palette } from 'lucide-react';
import ThemeContent from '../content/ThemeContent';
import { getTranslations } from 'next-intl/server';

async function ThemeCard() {
  const t = await getTranslations('settings');

  return (
    <Card className='col-span-2'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Palette className='h-5 w-5' />
          {t('theme.title')}
        </CardTitle>
        <CardDescription>{t('theme.description')}</CardDescription>
      </CardHeader>

      <ThemeContent />
    </Card>
  );
}

export default ThemeCard;
