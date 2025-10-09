'use client';

import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { useFiltersQuery } from '../../hooks/useFiltersQuery';

type FiltersListProps = {
  filterName?: string;
  value?: string[];
  onChange?: (updatedFilters: string[]) => void;
};

function FiltersList({ filterName, value, onChange }: FiltersListProps) {
  const { filters: urlFilters, setFilter } = useFiltersQuery(filterName);

  const filters = value ?? urlFilters;
  const isControlled = value !== undefined;

  if (!(filters.length > 0)) return null;

  function handleRemoveFilter(filterValue: string) {
    const updatedFilters = filters.filter((f) => f !== filterValue);

    if (isControlled && onChange) onChange(updatedFilters);
    else setFilter(updatedFilters);
  }

  return (
    <div className='flex flex-wrap items-center gap-1'>
      {filters.map((filter, i) => (
        <Badge key={i} variant={'outline'} className='capitalize'>
          {filter}
          <span
            onClick={() => handleRemoveFilter(filter)}
            tabIndex={0}
            role='button'
            className='hover:text-destructive transition-colors duration-200 hover:cursor-pointer'
          >
            <X className='size-3' />
          </span>
        </Badge>
      ))}
    </div>
  );
}

export default FiltersList;
