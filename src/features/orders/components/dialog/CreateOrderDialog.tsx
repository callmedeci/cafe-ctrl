'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useMenuItemSearch } from '../../hooks/useMenuItemSearch';
import CreateOrderForm from '../form/CreateOrderForm';

function CreateOrderDialog() {
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
      <Button
        onClick={() => setIsOpen(true)}
        className='[&_span]:hidden sm:[&_span]:inline-block'
      >
        <Plus />
        <span>{t('actions.newOrder')}</span>
      </Button>

      <DialogContent className='max-h-[90vh] !w-full overflow-y-auto md:min-w-3xl'>
        <DialogHeader>
          <DialogTitle>{t('form.create.title')}</DialogTitle>
          <DialogDescription>{t('form.create.description')}</DialogDescription>

          <CreateOrderForm onClose={() => setIsOpen(false)} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CreateOrderDialog;
