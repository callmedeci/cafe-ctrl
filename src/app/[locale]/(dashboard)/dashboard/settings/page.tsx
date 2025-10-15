import LayoutHeader from '@/components/shared/LayoutHeader';
import { ChargeCard, LanguageCard, ThemeCard } from '@/features/settings';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('settings.metadata');

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'cafe settings',
      'dashboard configuration',
      'language settings',
      'theme settings',
      'account management',
      'preferences',
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

async function SettingsPage() {
  const t = await getTranslations('settings');

  return (
    <>
      <LayoutHeader
        title={t('page.title')}
        description={t('page.description')}
      />

      <div className='flex flex-col gap-4 p-4'>
        <div className='grid grid-cols-1 gap-y-4 xl:grid-cols-3 xl:gap-4'>
          <LanguageCard />
          <ThemeCard />
        </div>

        <ChargeCard />
      </div>
    </>
  );
}

export default SettingsPage;
