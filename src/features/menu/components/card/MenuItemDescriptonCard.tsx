import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import MenuItemDetailsDescription from '../content/MenuItemDetailsDescription';
import GenerateDescriptionButton from '../layout/GenerateDescriptionButton';
import MenuItemDetailsDescriptionSkeleton from '../skeletons/MenuItemDetailsDescriptionSkeleton';
import { searchParamsCache } from '@/lib/utils';

async function MenuItemDescriptonCard() {
  const t = await getTranslations('menu');
  const { menuId } = searchParamsCache.all();

  return (
    <Card className='flex-1'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base font-semibold'>
          <FileText className='h-4 w-4' />
          {t('cards.description.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className='flex h-full flex-col justify-between gap-2'>
        <Suspense fallback={<MenuItemDetailsDescriptionSkeleton />}>
          <MenuItemDetailsDescription />
        </Suspense>

        <GenerateDescriptionButton menuId={menuId} />
      </CardContent>
    </Card>
  );
}

export default MenuItemDescriptonCard;
