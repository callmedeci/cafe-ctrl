'use client';

import { CardContent } from '@/components/ui/card';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';

function ThemeContent() {
  const t = useTranslations('settings');
  const { theme: selectedTheme, setTheme, themes } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <CardContent className='grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5'>
      {themes.map((theme) => {
        const isSelected = selectedTheme === theme;

        return (
          <button
            key={theme}
            className={`group hover:border-primary/50 relative flex items-center justify-center rounded-md border px-3 py-2 text-sm transition-all ${
              isSelected
                ? 'border-primary bg-primary/5 font-medium'
                : 'border-border hover:bg-accent/50'
            }`}
            onClick={() => setTheme(theme)}
          >
            <span className='line-clamp-1 text-center capitalize'>
              {t(`theme.${theme}.name`)}
            </span>

            {isSelected && (
              <div className='bg-primary absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full'>
                <Check className='text-primary-foreground h-3 w-3' />
              </div>
            )}
          </button>
        );
      })}
    </CardContent>
  );
}

export default ThemeContent;
