'use client';

import Spinner from '@/components/shared/Spinner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { removeItemFromStorage } from '@/supabase/data/global-service';
import { deleteMenuItem } from '@/supabase/data/menu-service';
import { Trash2 } from 'lucide-react';
import { cloneElement, ReactElement, useState, useTransition } from 'react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

type DeleteMenuItemProps = {
  menuItemId: number;
  children: ReactElement<{ onClick: (e: MouseEvent) => void }>;
  itemName?: string;
  redirectBack?: boolean;
};

function DeleteMenuItemDialog({
  menuItemId,
  children,
  itemName = 'this item',
  redirectBack = false,
}: DeleteMenuItemProps) {
  const t = useTranslations('menu');
  const [isLoading, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  async function handleDelete() {
    startTransition(async () => {
      const { data, success, error } = await deleteMenuItem(menuItemId);

      if (success) {
        if (data.image_url) {
          const imagePath = data.image_url.split('/').at(-1);
          const { error: removeError } = await removeItemFromStorage(
            imagePath!,
            'menu_items_pictures',
          );

          if (removeError)
            toast.warning(t('messages.warning.imageRemoveError'));
        }

        toast.success(t('messages.success.deleted'));
        if (redirectBack) router.push('/dashboard/menu');
      }
      if (!success) toast.error(error);

      setIsOpen(false);
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {cloneElement(children, {
          onClick: (e) => {
            e.preventDefault();
            setIsOpen(true);
          },
        })}
      </DialogTrigger>

      <DialogContent className='max-w-xs md:max-w-md'>
        <DialogHeader className='px-2 md:px-4'>
          <DialogTitle className='text-sm md:text-base'>
            {t('dialog.delete.title', { name: itemName })}
          </DialogTitle>
          <DialogDescription className='text-xs md:text-sm'>
            {t('dialog.delete.description')}
          </DialogDescription>
          <div className='flex items-center justify-center gap-2 px-2 md:px-0'>
            <Button
              disabled={isLoading}
              variant={'secondary'}
              className='flex-1'
              onClick={() => setIsOpen(false)}
            >
              {t('dialog.delete.cancel')}
            </Button>
            <Button
              disabled={isLoading}
              onClick={handleDelete}
              variant={'destructive'}
              className='flex-1'
            >
              {isLoading ? <Spinner /> : <Trash2 />}
              {isLoading
                ? t('dialog.delete.deleting')
                : t('dialog.delete.confirm')}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteMenuItemDialog;
