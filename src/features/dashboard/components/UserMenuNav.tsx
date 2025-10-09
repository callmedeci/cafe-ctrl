'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { SheetTrigger } from '@/components/ui/sheet';
import { useSidebar } from '@/components/ui/sidebar';
import { Link } from '@/i18n/navigation';
import { Settings, User as User2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

function UserMenuNav() {
  const t = useTranslations('dashboard');
  const { setOpenMobile } = useSidebar();

  return (
    <>
      <SheetTrigger asChild onClick={() => setOpenMobile(false)}>
        <DropdownMenuItem>
          <User2 />
          {t('userMenu.profile')}
        </DropdownMenuItem>
      </SheetTrigger>

      <Link href={'/dashboard/settings'} onClick={() => setOpenMobile(false)}>
        <DropdownMenuItem>
          <Settings />
          {t('userMenu.settings')}
        </DropdownMenuItem>
      </Link>
    </>
  );
}

export default UserMenuNav;
