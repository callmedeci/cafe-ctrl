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
import { deleteOrder } from '@/supabase/data/orders-service';
import { Trash2 } from 'lucide-react';
import { cloneElement, ReactElement, useState, useTransition } from 'react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

type DeleteOrderProps = {
  orderId: string;
  children: ReactElement<{ onClick: (e: MouseEvent) => void }>;
  orderName?: string;
  redirectBack?: boolean;
};

function DeleteOrderDialog({
  orderId,
  children,
  orderName = 'this order',
  redirectBack = false,
}: DeleteOrderProps) {
  const t = useTranslations('orders');
  const [isLoading, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  async function handleDelete() {
    startTransition(async () => {
      const { success, error } = await deleteOrder(orderId);

      if (success) {
        toast.success(t('messages.success.deleted'));
        if (redirectBack) router.push('/dashboard/orders');
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
            e.stopPropagation();
            e.preventDefault();
            setIsOpen(true);
          },
        })}
      </DialogTrigger>

      <DialogContent className='max-w-xs md:max-w-md'>
        <DialogHeader className='px-2 md:px-4'>
          <DialogTitle className='text-sm md:text-base'>
            {t('dialog.delete.title', { orderName })}
          </DialogTitle>
          <DialogDescription className='text-xs md:text-sm'>
            {t('dialog.delete.description')}
          </DialogDescription>
          <div className='flex items-center justify-center gap-2 px-2 md:px-0'>
            <Button
              disabled={isLoading}
              variant={'secondary'}
              className='flex-1 text-xs md:text-sm'
              onClick={() => setIsOpen(false)}
            >
              {t('dialog.delete.cancel')}
            </Button>
            <Button
              disabled={isLoading}
              onClick={handleDelete}
              variant={'destructive'}
              className='flex-1 text-xs md:text-sm'
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

export default DeleteOrderDialog;
