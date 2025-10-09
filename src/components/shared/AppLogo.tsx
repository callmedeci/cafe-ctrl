import Logo from '@/app/icon1.png';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { H4 } from '../typography/H4';
import { Muted } from '../typography/Muted';
import { Avatar } from '../ui/avatar';

function AppLogo() {
  const t = useTranslations('components');

  return (
    <Link className='flex items-center gap-2' href={'/dashboard'}>
      <Avatar className='relative size-12'>
        <Image
          fill
          src={Logo}
          alt='ctrl cafe logo'
          placeholder='blur'
          priority={false}
          loading='lazy'
        />
      </Avatar>

      <div className='flex flex-col'>
        <H4>{t('appLogo.title')}</H4>
        <Muted>{t('appLogo.subtitle')}</Muted>
      </div>
    </Link>
  );
}

export default AppLogo;
