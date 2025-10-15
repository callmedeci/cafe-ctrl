'use client';

import { Button } from '@/components/ui/button';
import { FileText, FileSpreadsheet, FileDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

function ExportButtons() {
  const t = useTranslations('reports');

  const handleExport = (format: string) => {
    toast.info(t('export.placeholder', { format: format.toUpperCase() }));
  };

  return (
    <div className='flex flex-col gap-2'>
      <Button
        variant='outline'
        className='justify-start'
        onClick={() => handleExport('pdf')}
      >
        <FileText className='mr-2 h-4 w-4' />
        {t('export.pdf')}
      </Button>
      <Button
        variant='outline'
        className='justify-start'
        onClick={() => handleExport('csv')}
      >
        <FileSpreadsheet className='mr-2 h-4 w-4' />
        {t('export.csv')}
      </Button>
      <Button
        variant='outline'
        className='justify-start'
        onClick={() => handleExport('xlsx')}
      >
        <FileDown className='mr-2 h-4 w-4' />
        {t('export.xlsx')}
      </Button>
    </div>
  );
}

export default ExportButtons;
