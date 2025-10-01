import { clsx, type ClassValue } from 'clsx';
import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
} from 'nuqs/server';
import { twMerge } from 'tailwind-merge';
import type * as DateFns from 'date-fns';
import type * as DateFnsJalali from 'date-fns-jalali';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//GET THE CORRECT URL
export function getURL() {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ??
    process?.env?.NEXT_PUBLIC_VERCEL_URL ??
    'http://localhost:3000/';

  url = url.startsWith('http') ? url : `https://${url}`;
  url = url.endsWith('/') ? url : `${url}/`;

  return url;
}

// NUMBER FORMAT
export function formatNumber({
  locale,
  options = {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  },
  number,
}: {
  locale: Intl.LocalesArgument;
  options?: Intl.NumberFormatOptions;
  number: number;
}) {
  return Intl.NumberFormat(locale, options).format(number);
}

// FORMAT CURRENCY BASED ON THE LOCALE
export function getCurrencyFormatOptions(
  isFarsi: boolean,
  maximumFractionDigits: number = 2,
): Intl.NumberFormatOptions {
  if (isFarsi) {
    return {
      maximumFractionDigits,
      minimumFractionDigits: 0,
    };
  }

  return {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits,
    minimumFractionDigits: 2,
  };
}

//NUQS SEARCH PARAMS
export const searchParamsCache = createSearchParamsCache({
  selected_date: parseAsString.withDefault(
    new Date().toISOString().split('T')[0],
  ),
  period: parseAsString.withDefault('30d'),

  orderId: parseAsString,
  menuId: parseAsInteger,
});

//GET THE CURRECT DATE-FNS LIB BASED ON THE LOCALE
const dateLibPromises = new Map();

type DateLibModule = typeof DateFns | typeof DateFnsJalali;
export function getDateLibPromise(locale: string): Promise<DateLibModule> {
  if (dateLibPromises.has(locale)) {
    return dateLibPromises.get(locale);
  }

  const promise =
    locale === 'fa'
      ? import(/* webpackChunkName: "date-fns-jalali" */ 'date-fns-jalali')
      : import(/* webpackChunkName: "date-fns" */ 'date-fns');

  dateLibPromises.set(locale, promise);
  return promise;
}

//MENU ITEM FILTER OPTIONS
export function menuFilterOptions(
  categories: { name: string; icon_name: string | null }[],
) {
  return categories.map((cat) => ({
    label: cat.name,
    value: cat.name,
    iconName: cat?.icon_name || '',
  }));
}
