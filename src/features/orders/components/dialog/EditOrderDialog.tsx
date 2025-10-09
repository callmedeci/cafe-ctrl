'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { OrderRow } from '@/types/tables';
import { cloneElement, ReactElement, useState } from 'react';
import EditOrderForm from '../form/EditOrderForm';
import { useTranslations } from 'next-intl';
import { useMenuItemSearch } from '../../hooks/useMenuItemSearch';

type EditOrderProps = {
  order: OrderRow;
  children: ReactElement<{ onClick: (e: MouseEvent) => void }>;
};

function EditOrderDialog({ order, children }: EditOrderProps) {
  const t = useTranslations('orders');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { setFilterBy, setQuery } = useMenuItemSearch();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(false);

        setTimeout(() => {
          setFilterBy([]);
          setQuery('');
        }, 10);
      }}
    >
      <DialogTrigger asChild>
        {cloneElement(children, {
          onClick: (e) => {
            e.preventDefault();
            setIsOpen(true);
          },
        })}
      </DialogTrigger>

      <DialogContent className='max-h-[90vh] !w-full overflow-y-auto md:min-w-3xl'>
        <DialogHeader>
          <DialogTitle>{t('form.edit.title')}</DialogTitle>
          <DialogDescription>{t('form.edit.description')}</DialogDescription>

          <EditOrderForm orderToEdit={order} onClose={() => setIsOpen(false)} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default EditOrderDialog;
