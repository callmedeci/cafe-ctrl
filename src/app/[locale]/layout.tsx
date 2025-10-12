import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import '../globals.css';
import { getLocale, getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations('metadata');

  return {
    title: {
      default: t('title.default'),
      template: t('title.template'),
    },
    description: t('description'),
    keywords: t('keywords').split(','),
    authors: [{ name: 'Yunes Maghsoudie' }],
    creator: 'Cafe-Ctrl',
    publisher: 'Cafe-Ctrl',
    metadataBase: new URL('https://cafe-ctrl.vercel.app'),
    applicationName: 'Cafe-Ctrl',
    referrer: 'origin-when-cross-origin',
    robots: { index: true, follow: false, nocache: true },
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-icon.png',
      other: [
        { rel: 'icon', url: '/icon0.svg' },
        { rel: 'icon', url: '/icon1.png' },
      ],
    },
    manifest: '/manifest.json',
    openGraph: {
      type: 'website',
      locale: locale === 'fa' ? 'fa_IR' : 'en_US',
      alternateLocale: locale === 'fa' ? 'en_US' : 'fa_IR',
      url: 'https://cafe-ctrl.vercel.app',
      siteName: 'Cafe-Ctrl',
      title: t('og.title'),
      description: t('og.description'),
      images: [
        {
          url: '/og-image.png', //TODO UPDATE
          width: 1200,
          height: 630,
          alt: t('og.imageAlt'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('twitter.title'),
      description: t('twitter.description'),
      // images: ['/twitter-image.png'], //TODO UPDATE
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: 'Cafe-Ctrl',
    },
    formatDetection: {
      telephone: false,
    },
  };
}

const vazirmatnFD = localFont({
  src: [
    {
      path: '../../../public/fonts/Vazirmatn-FD-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Vazirmatn-FD-SemiBold.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-vazirmatn-fd',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<'/[locale]'>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const isFa = locale === 'fa';

  return (
    <html lang={locale} dir={isFa ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <head>
        <meta name='apple-mobile-web-app-title' content='CafeCtrl' />
      </head>
      <body
        className={cn(
          'min-h-dvh w-full antialiased',
          isFa && vazirmatnFD.className,
        )}
      >
        <ThemeProvider
          themes={[
            'light',
            'dark',
            'pastel-dream',
            'lavender-mist',
            'peach-grove',
            'sage-whisper',
            'midnight-slate',
            'mocha-dream',
          ]}
          attribute={'class'}
          defaultTheme='system'
          enableSystem
        >
          <main>
            <NextIntlClientProvider>
              <NuqsAdapter>{children}</NuqsAdapter>
            </NextIntlClientProvider>
          </main>
          <Toaster position='bottom-right' />
        </ThemeProvider>
      </body>
    </html>
  );
}
