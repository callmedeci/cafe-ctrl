import LayoutHeader from '@/components/shared/LayoutHeader';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  MenuItemDescriptonCard,
  MenuItemDetailsCard,
  MenuItemImageCard,
  MenuItemIngredientsCard,
  MenuItemQuickActionsCard,
  UpdateMenuItemAction,
} from '@/features/menu';
import { Link } from '@/i18n/navigation';
import { searchParamsCache } from '@/lib/utils';
import {
  checkMenuItemExists,
  getAllMenuItemIds,
  getMenuItemById,
} from '@/supabase/data/menu-service';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/dashboard/menu/view/[menuId]'>): Promise<Metadata> {
  // const t = await getTranslations();

  const { menuId } = await params;
  const { data, error } = await getMenuItemById(+menuId);

  if (!data || error) notFound();

  return {
    title: data.name,
  };
}

export async function generateStaticParams() {
  const ids = await getAllMenuItemIds();
  return ids.map((id) => ({ menuId: id.toString() }));
}

async function MenuItemPageView({
  params,
}: PageProps<'/[locale]/dashboard/menu/view/[menuId]'>) {
  const { menuId } = await params;
  const { exists, error } = await checkMenuItemExists(+menuId);

  if (!exists || error) notFound();

  const t = await getTranslations('menu');
  const locale = await getLocale();
  const isFa = locale === 'fa';
  searchParamsCache.parse(params);

  return (
    <>
      <LayoutHeader title={t('view.title')} description={t('view.description')}>
        <Button variant='link' size='sm' asChild>
          <Link
            href={'/dashboard/menu'}
            className={`flex ${isFa ? 'flex-row-reverse' : ''} items-center`}
          >
            {!isFa && <ArrowLeft />}
            <span className='hidden sm:block'>{t('view.goBack')}</span>
            {isFa && <ArrowLeft />}
          </Link>
        </Button>
      </LayoutHeader>

      <div className='flex flex-col gap-4 p-4'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center justify-between'>
              <span>{t('view.details.title')}</span>
              <UpdateMenuItemAction
                variant={'default'}
                className='[&_span]:hidden sm:[&_span]:inline-block'
              />
            </CardTitle>
            <CardDescription>{t('view.details.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid h-full w-full grid-cols-1 gap-4 lg:grid-cols-2'>
              <div className='max-h-160 w-full'>
                <MenuItemImageCard />
              </div>

              <div className='flex w-full flex-col space-y-4'>
                <MenuItemDetailsCard />

                <MenuItemIngredientsCard />

                <div className='flex w-full flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row'>
                  <MenuItemQuickActionsCard />

                  <MenuItemDescriptonCard />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default MenuItemPageView;
