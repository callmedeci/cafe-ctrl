'use client';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useExcludedColumnsQuery } from '@/hooks/useExcludedColumnsQuery';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useOptimistic, useState, useTransition } from 'react';
import { Button } from '../ui/button';

type TableColumnFilterProps = {
  options: {
    value: string;
    label: string;
    defaultVisible?: boolean;
  }[];
};

function TableColumnFilter({ options }: TableColumnFilterProps) {
  const t = useTranslations('components');
  const locale = useLocale();
  const { excludedColumns, setExcludedColumns } = useExcludedColumnsQuery();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [optimisticExcludedColumns, setOptimisticExcludedColumns] =
    useOptimistic(
      excludedColumns,
      (currentState: string[], optimisticValue: string[]) => optimisticValue,
    );

  const handleColumnToggle = (columnValue: string, event: Event) => {
    event.preventDefault();

    const currentExcluded = optimisticExcludedColumns;
    const isCurrentlyChecked =
      currentExcluded.length === 0
        ? options.find((opt) => opt.value === columnValue)?.defaultVisible !==
          false
        : !currentExcluded.includes(columnValue);

    let newExcludedColumns: string[];

    if (isCurrentlyChecked)
      newExcludedColumns = currentExcluded.includes(columnValue)
        ? currentExcluded
        : [...currentExcluded, columnValue];
    else
      newExcludedColumns = currentExcluded.filter((col) => col !== columnValue);

    startTransition(() => {
      setExcludedColumns(newExcludedColumns);
      setOptimisticExcludedColumns(newExcludedColumns);
    });

    startTransition(() => {
      setIsOpen(false);
    });
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='secondary'
          className={cn(
            'ml-auto transition-opacity duration-200',
            isPending && 'opacity-70',
          )}
          disabled={isPending}
        >
          <span>{t('tableColumnFilter.columns')}</span>
          <ChevronDown
            className={cn(
              'transition-transform duration-200',
              isPending && 'animate-pulse',
            )}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='center'
        className={cn(
          'transition-all duration-200 ease-out',
          !isOpen && isPending && 'scale-95 opacity-0',
        )}
      >
        {options.map((option, i, array) => {
          const isChecked =
            optimisticExcludedColumns.length === 0
              ? option.defaultVisible !== false
              : !optimisticExcludedColumns.includes(option.value);

          return (
            <div key={option.value}>
              <DropdownMenuCheckboxItem
                className={cn(
                  'justify-between py-1 text-xs md:py-2 md:text-sm',
                  isPending && 'pointer-events-none opacity-60',
                  locale === 'fa' ? 'flex-row-reverse' : '',
                )}
                checked={isChecked}
                onSelect={(event) => handleColumnToggle(option.value, event)}
              >
                {option.label}
              </DropdownMenuCheckboxItem>
              {i < array.length - 1 && <DropdownMenuSeparator />}
            </div>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default TableColumnFilter;
