'use client';

import DynamicIcon from '@/components/shared/DynamicIcon';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Trash2 } from 'lucide-react';
import { useGetMenuCategories } from '../../../../hooks/useGetMenuCategories';
import DeleteCategoryDialog from '../dialog/DeleteCategoryDialog';
import CategoriesListSkeleton from '../skeletons/CategoriesListSkeleton';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

function CategoriesListError() {
  const t = useTranslations('menu');

  return (
    <div className='flex flex-col items-center justify-center py-12'>
      <AlertTriangle className='text-destructive mb-4 h-12 w-12' />
      <h3 className='text-foreground mb-2 text-lg font-semibold'>
        {t('messages.error.failedToLoadCategories')}
      </h3>
      <p className='text-muted-foreground mb-4 text-center text-sm'>
        There was a problem loading the categories. Please try again.
      </p>
      <Button
        variant='outline'
        onClick={() => window.location.reload()}
        className='flex items-center gap-2'
      >
        <RefreshCw className='h-4 w-4' />
        {t('table.empty.error.tryAgain')}
      </Button>
    </div>
  );
}

function CategoriesListContent() {
  const t = useTranslations('menu');
  const { categories, error, isPending } = useGetMenuCategories();

  if (isPending) return <CategoriesListSkeleton />;
  if (error || !categories) return <CategoriesListError />;

  return (
    <Command>
      <CommandInput placeholder={t('categories.search')} />
      <CommandEmpty>{t('categories.noCategoriesAvailable')}</CommandEmpty>
      <CommandList>
        <CommandGroup>
          {categories.map((category, i, array) => {
            return (
              <CommandItem
                key={category.id}
                className={`justify-between py-1 text-xs md:py-2 md:text-sm ${i < array.length - 1 ? 'border-b' : ''} `}
              >
                <span className='flex gap-1'>
                  <DynamicIcon iconName={category.icon_name || ''} />
                  {category.name}
                </span>
                <DeleteCategoryDialog category={category}>
                  <button>
                    <Trash2 className='text-destructive' />
                  </button>
                </DeleteCategoryDialog>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export default CategoriesListContent;
