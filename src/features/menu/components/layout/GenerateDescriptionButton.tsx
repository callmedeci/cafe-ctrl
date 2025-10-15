'use client';

import Spinner from '@/components/shared/Spinner';
import { Button } from '@/components/ui/button';
import { menuDescriptionGenerator } from '@/genkit/menuDescriptionSuggestion';
import { cn } from '@/lib/utils';
import { updateMenuItem } from '@/supabase/data/menu-service';
import { MenuRow } from '@/types/tables';
import { Brain } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Dispatch, MouseEvent, SetStateAction, useTransition } from 'react';
import { toast } from 'sonner';

type GenerateDescriptionButtonProps = {
  menuId: number | null;
  menuItem?: MenuRow;
  className?: string;
  setter?: Dispatch<SetStateAction<string>>;
};

function GenerateDescriptionButton({
  menuId,
  menuItem,
  className,
  setter,
}: GenerateDescriptionButtonProps) {
  const t = useTranslations('menu');
  const [isPending, startTransition] = useTransition();

  async function handleGenerateDescription(e: MouseEvent) {
    e.preventDefault();

    startTransition(async () => {
      const { data, error } = await menuDescriptionGenerator(menuId!, menuItem);

      if (error || !data) toast.error(t('cards.description.generateError'));
      else {
        const { error: updateError } = await updateMenuItem(
          { description: data.description },
          menuId!,
        );

        if (updateError) toast.error(t('cards.description.generateError'));
        if (!updateError) {
          if (setter) setter(data.description);
          toast.success(t('cards.description.generateSuccess'));
        }
      }
    });
  }

  return (
    <Button
      size='sm'
      variant='outline'
      className={cn('justify-start', className)}
      onClick={handleGenerateDescription}
      disabled={isPending}
      type='button'
    >
      {isPending ? <Spinner /> : <Brain />}
      {isPending
        ? t('cards.description.generating')
        : t('cards.description.generateAI')}
    </Button>
  );
}

export default GenerateDescriptionButton;
