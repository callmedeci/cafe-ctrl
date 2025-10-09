import ErrorState from '@/components/shared/ErrorState';
import { Card, CardContent } from '@/components/ui/card';
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { User } from '@supabase/supabase-js';
import { getTranslations } from 'next-intl/server';
import ChangePasswordForm from './ChangePasswordForm';
import ProfileForm from './ProfileForm';

async function ProfileContent({ user }: { user: User }) {
  const t = await getTranslations('profile');

  if (!user)
    return (
      <div className='flex flex-col gap-4'>
        <Card>
          <CardContent className='flex flex-col items-center justify-center py-12'>
            <ErrorState
              message={t('errors.userNotFound')}
              iconClassName='h-12 w-12'
            />
          </CardContent>
        </Card>
      </div>
    );

  return (
    <SheetContent side='left'>
      <SheetHeader>
        <SheetTitle>{t('personalInfo.title')}</SheetTitle>
        <SheetDescription>{t('personalInfo.description')}</SheetDescription>
      </SheetHeader>

      <div className='grid flex-1 auto-rows-min gap-6 px-4'>
        <ProfileForm user={user} />
        <ChangePasswordForm />
      </div>
    </SheetContent>
  );
}

export default ProfileContent;
