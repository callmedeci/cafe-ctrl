'use client';

import SubmitButton from '@/components/shared/SubmitButton';
import UploadImage from '@/components/shared/UploadImage';
import { H4 } from '@/components/typography/H4';
import { P } from '@/components/typography/P';
import { Badge } from '@/components/ui/badge';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { getDateLibPromise } from '@/lib/utils';
import { updateProfile } from '@/supabase/data/user-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@supabase/supabase-js';
import {
  Calendar,
  Mail,
  ShieldCheck,
  ShieldX,
  User as UserIcon,
} from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { use } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { updateProfileSchema, UpdateProfileSchema } from '../schema';

type ProfileFormProps = {
  user: User;
};

function ProfileForm({ user }: ProfileFormProps) {
  const t = useTranslations('profile');
  const [firstName, ...lastName] = user.user_metadata?.full_name?.split(' ');
  const form = useForm<UpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      first_name: firstName || '',
      last_name: lastName?.join(' ') || '',
      phone: user.user_metadata?.phone || '',
      avatar: undefined,
    },
  });

  const locale = useLocale();

  const dateForamt = use(getDateLibPromise(locale));
  const avatarFallBack = user.user_metadata?.full_name
    ? user.user_metadata.full_name
        .split(' ')
        .map((n: string) => n[0])
        .join(' ')
    : user?.email?.slice(0, 2);

  async function onSubmit(values: UpdateProfileSchema) {
    const { success, error } = await updateProfile(values);

    if (success) {
      toast.success(t('form.success'));
      form.reset({
        first_name: values.first_name,
        last_name: values.last_name,
        phone: values.phone,
        avatar: undefined,
      });
    }

    if (!success) toast.error(error);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        {/* Avatar Upload */}
        <FormField
          name='avatar'
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormControl>
                <div className='flex flex-col items-center justify-center gap-1'>
                  <UploadImage
                    avatarFallback={avatarFallBack}
                    isAvatar={true}
                    error={error}
                    {...field}
                    defaultImageURL={user.user_metadata?.picture}
                  />

                  <H4 className='capitalize'>{user.user_metadata.full_name}</H4>
                  <div className='flex items-center gap-1'>
                    <Mail className='text-muted-foreground h-4 w-4' />
                    <P>{user.email}</P>
                  </div>

                  <div className='flex flex-wrap gap-2'>
                    <Badge variant='secondary'>
                      {user.user_metadata.email_verified ? (
                        <ShieldCheck />
                      ) : (
                        <ShieldX />
                      )}

                      {user.email_confirmed_at
                        ? t('status.verified')
                        : t('status.unverified')}
                    </Badge>

                    <Badge variant='outline'>
                      <Calendar />
                      {t('status.joined', {
                        date: dateForamt.format(
                          new Date(user.created_at),
                          'MMMM yyyy',
                        ),
                      })}
                    </Badge>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Name Fields */}
        <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
          <FormField
            name='first_name'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.firstName')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('form.firstNamePlaceholder')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='last_name'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.lastName')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('form.lastNamePlaceholder')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex w-full flex-col gap-2'>
          {/* Phone Field */}
          <FormField
            name='phone'
            control={form.control}
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>{t('form.phone')}</FormLabel>
                <FormControl>
                  <Input
                    className={`${locale === 'fa' ? 'placeholder:text-end' : ''} `}
                    placeholder={t('form.phonePlaceholder')}
                    type='tel'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SubmitButton
            icon={<UserIcon />}
            className='w-min self-end'
            label={t('form.submit')}
            loadinglabel={t('form.submitting')}
            isLoading={form.formState.isSubmitting}
          />
        </div>
      </form>
    </Form>
  );
}

export default ProfileForm;
