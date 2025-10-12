'use client';

import { formatNumber, getCurrencyFormatOptions } from '@/lib/utils';
import { useLocale } from 'next-intl';
import TomanIcon from '../typography/TomanIcon';

type CurrencyDisplayProps = {
  amount: number;
  className?: string;
};

function CurrencyDisplay({ amount, className }: CurrencyDisplayProps) {
  const locale = useLocale();
  const isFa = locale === 'fa';

  const formatted = formatNumber({
    locale: isFa ? 'fa-IR' : 'en-US',
    number: amount,
    options: getCurrencyFormatOptions(isFa, isFa ? 0 : undefined),
  });

  if (isFa) {
    return (
      <span className='flex items-center gap-1 md:gap-2'>
        {formatted}
        <TomanIcon className={className} />
      </span>
    );
  }

  return <span>{formatted}</span>;
}

export default CurrencyDisplay;
