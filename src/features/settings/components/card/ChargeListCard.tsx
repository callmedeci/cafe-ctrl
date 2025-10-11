'use client';

import DynamicIcon from '@/components/shared/DynamicIcon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { DollarSign, SquarePen, Trash2 } from 'lucide-react';
import ChargeToggleSwitch from '../layout/ChargeToggleSwitch';
import DeleteChargeDialog from '../dialog/DeleteChargeDialog';
import EditAdditionalChargeDialog from '../dialog/EditChargeDialog';
import { AdditionalChargesRow } from '@/types/tables';
import { useTranslations } from 'next-intl';

type ChargeListCardProps = {
  charges: AdditionalChargesRow[];
};

function ChargeListCard({ charges }: ChargeListCardProps) {
  const t = useTranslations('settings');

  return (
    <CardContent className='space-y-4'>
      <div className='space-y-2'>
        {charges.map((charge) => (
          <div
            key={charge.id}
            className={`group flex flex-col gap-2 rounded-xl border p-2 transition-colors sm:flex-row sm:items-center sm:justify-between ${
              charge.is_active
                ? 'border-primary/20 bg-primary/5 hover:bg-primary/10'
                : 'border-border bg-card hover:bg-accent/50'
            }`}
          >
            <div className='flex items-center gap-2'>
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-xl transition-colors ${
                  charge.is_active
                    ? 'bg-primary/10 text-primary group-hover:bg-primary/20'
                    : 'bg-muted text-muted-foreground group-hover:bg-muted/80'
                }`}
              >
                <DynamicIcon
                  iconName={charge.icon_name || ''}
                  fallBackIcon={DollarSign}
                  className='h-4 w-4'
                />
              </div>
              <div>
                <span className='text-sm font-medium'>{charge.name}</span>
                <p className='text-muted-foreground text-sm'>
                  {charge.description?.slice(0, 55)}...
                </p>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              {charge.is_active && (
                <Badge variant='secondary' className='text-xs'>
                  {t('charges.active')}
                </Badge>
              )}
              <ChargeToggleSwitch charge={charge} />

              <div className='flex items-center'>
                <EditAdditionalChargeDialog charge={charge}>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='text-muted-foreground hover:text-info'
                  >
                    <SquarePen />
                  </Button>
                </EditAdditionalChargeDialog>
                <DeleteChargeDialog
                  chargeId={charge.id}
                  chargeName={charge.name}
                >
                  <Button
                    variant='ghost'
                    size='icon'
                    className='text-muted-foreground hover:text-destructive'
                  >
                    <Trash2 />
                  </Button>
                </DeleteChargeDialog>
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  );
}

export default ChargeListCard;
