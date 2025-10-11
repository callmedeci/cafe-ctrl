import LayoutHeader from '@/components/shared/LayoutHeader';
import { H3 } from '@/components/typography/H3';
import { Card, CardContent } from '@/components/ui/card';
import { searchParamsCache } from '@/lib/utils';
import { Blocks } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('reports.metadata');

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'reports',
      'business reports',
      'sales reports',
      'analytics reports',
      'data export',
      'performance reports',
      'cafe reports',
      'restaurant reports',
    ],
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
    },
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
  };
}

async function ReportsPage({
  searchParams,
}: PageProps<'/[locale]/dashboard/reports'>) {
  const t = await getTranslations('reports');
  const params = await searchParams;
  searchParamsCache.parse(params);

  return (
    <>
      <LayoutHeader
        title={t('page.title')}
        description={t('page.description')}
      />

      <div className='grid h-[calc(100vh-theme(spacing.20))] w-full p-4'>
        <Card className='flex !h-full items-center justify-center'>
          <CardContent className='flex h-full w-full flex-col items-center justify-center space-y-4 text-center'>
            <div className='text-6xl' aria-hidden='true'>
              <Blocks />
            </div>
            <H3>{t('page.maintenance.title')}</H3>
            <p className='text-muted-foreground max-w-[500px]'>
              {t('page.maintenance.description')}
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default ReportsPage;
