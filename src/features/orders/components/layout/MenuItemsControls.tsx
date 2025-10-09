'use client';

import { useTranslations } from 'next-intl';
import { ChangeEvent } from 'react';
import { useMenuItemSearch } from '../../hooks/useMenuItemSearch';
import Search from '@/components/shared/Search';
import MenuItemsFilter from '@/components/shared/MenuItemsFilter';
import FiltersList from '@/components/shared/FiltersList';

function MenuItemsControls() {
  const t = useTranslations('orders');
  const { query, setQuery, filterBy, setFilterBy } = useMenuItemSearch();

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }
  function handleResetSearch() {
    setQuery('');
  }

  return (
    <>
      <div className='flex w-full gap-2'>
        <MenuItemsFilter value={filterBy} onChange={setFilterBy} />

        <Search
          className='flex-1'
          value={query}
          defaultValue={undefined}
          placeholder={t('menuSelector.searchPlaceholder')}
          onClear={handleResetSearch}
          onChange={(e) => handleSearch(e)}
          onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
        />
      </div>

      <FiltersList value={filterBy} onChange={setFilterBy} />
    </>
  );
}

export default MenuItemsControls;
