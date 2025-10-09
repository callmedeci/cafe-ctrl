'use client';

import MenuItemsFilter from '@/components/shared/MenuItemsFilter';
import Search from '@/components/shared/Search';
import SortBy from '@/components/shared/SortBy';
import TableColumnFilter from '@/components/shared/TableColumnFilter';
import { useTranslations } from 'next-intl';
import {
  useMenuExcludedColumnsOptions,
  useMenuSortByOptions,
} from '../../lib/constant';
import CreateMenuItemDialog from '../dialog/CreateMenuItemDialog';
import ManageCategoriesDialog from '../dialog/ManageCategoriesDialog';

function MenuActions() {
  const t = useTranslations('menu');
  const sortBy = useMenuSortByOptions();
  const excludedColumns = useMenuExcludedColumnsOptions();

  return (
    <div className='my-2 flex flex-col-reverse gap-2 xl:flex-row'>
      <div className='flex items-center gap-1 md:gap-2'>
        <MenuItemsFilter />
        <SortBy options={sortBy} />

        <TableColumnFilter options={excludedColumns} />
      </div>

      <div className='flex w-full items-center gap-1 md:gap-2'>
        <Search placeholder={t('ctaActions.search')} className='col-span-2' />
        <ManageCategoriesDialog />
        <CreateMenuItemDialog />
      </div>
    </div>
  );
}

export default MenuActions;
