import LayoutHeaderSkeleton from '@/components/shared/LayoutHeaderSkeleton';
import Spinner from '@/components/shared/Spinner';
import { useTranslations } from 'next-intl';

function OrderPreviewLoading({ hasHeader = true }: { hasHeader?: boolean }) {
  const t = useTranslations('orders.dialog.preview.loading');

  return (
    <div role='status' aria-busy='true' className='flex flex-col'>
      {hasHeader && <LayoutHeaderSkeleton />}

      <div className='flex h-dvh w-full items-center justify-center'>
        <div className='flex flex-col items-center gap-3'>
          <Spinner />
          <p className='text-muted-foreground text-sm'>{t('title')}</p>
          <span className='sr-only'>{t('description')}</span>
        </div>
      </div>
    </div>
  );
}

export default OrderPreviewLoading;
