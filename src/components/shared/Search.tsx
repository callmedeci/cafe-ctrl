'use client';

import { cn } from '@/lib/utils';
import { Search as SearchIcon, X } from 'lucide-react';
import { parseAsString, useQueryState } from 'nuqs';
import { ComponentProps, FormEvent, useRef } from 'react';
import { Input } from '../ui/input';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';

function Search({
  placeholder,
  name = 'query',
  className,
  ...props
}: ComponentProps<'input'>) {
  const t = useTranslations('components');
  const ref = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useQueryState(name, parseAsString.withDefault(''));
  const locale = useLocale();
  const isFa = locale === 'fa';

  const searchPlaceholder = placeholder || t('search.placeholder');

  function handleSearch(e: FormEvent<HTMLInputElement>) {
    e.preventDefault();
    const data = e.currentTarget.value;

    if (!data) return;
    setQuery(data);
  }

  return (
    <div className={cn('relative flex flex-1 items-center gap-1', className)}>
      <div className='relative flex-1'>
        <SearchIcon
          className={cn(
            'absolute top-3 size-3 md:top-2 md:size-4',
            isFa ? 'right-2 md:right-3' : 'left-2 md:left-3',
          )}
        />
        <Input
          ref={ref}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
          className={cn(
            'text-xs md:h-8 md:text-sm',
            isFa ? 'pr-6 md:pr-9' : 'pl-6 md:pl-9',
          )}
          defaultValue={query}
          name={name}
          placeholder={searchPlaceholder}
          {...props}
        />
      </div>

      {query && (
        <X
          onClick={() => {
            if (ref.current) ref.current.value = '';
            setQuery(null);
          }}
          className={cn(
            'hover:text-destructive absolute size-4 transition-colors duration-200 hover:cursor-pointer',
            isFa ? 'left-2' : 'right-2',
          )}
        />
      )}
    </div>
  );
}

export default Search;
