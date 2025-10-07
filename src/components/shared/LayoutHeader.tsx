'use client';

import { H4 } from '@/components/typography/H4';
import { P } from '@/components/typography/P';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { useLocale } from 'next-intl';
import { ReactNode } from 'react';

type LayoutHeaderProps = {
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
};

function LayoutHeader({
  title,
  description,
  className,
  children,
}: LayoutHeaderProps) {
  const locale = useLocale();
  const isFa = locale === 'fa';

  return (
    <header
      className={cn(
        'bg-sidebar/95 flex justify-between border-b px-4 py-4 backdrop-blur',
        isFa && 'flex-row-reverse',
      )}
    >
      <div
        className={'flex flex-col'}
        style={{ direction: isFa ? 'rtl' : 'ltr' }}
      >
        <H4>{title}</H4>
        <P>{description}</P>
      </div>

      <div
        className={cn(
          'flex items-center',
          className,
          isFa && 'flex-row-reverse',
        )}
      >
        {children}

        <SidebarTrigger className='flex md:hidden' />
      </div>
    </header>
  );
}

export default LayoutHeader;
