'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SquarePen } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import Spinner from '@/components/shared/Spinner';
import UploadImage from '@/components/shared/UploadImage';
import { Small } from '@/components/typography/Small';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { updateMenuItem } from '@/supabase/data/menu-service';
import { MenuRow } from '@/types/tables';
import {
  updateMenuItemSchema,
  UpdateMenuItemSchema,
} from '../../schema/schema';
import GenerateDescriptionButton from '../layout/GenerateDescriptionButton';
import CategorySelect from '../selects/CategorySelect';
import IngredientsList from '../selects/IngredientsList';
import CreateIngredientsForm from './CreateIngredientsForm';

type MenuItemUpdateFormProps = {
  onClose: () => void;
  menuToUpdate: MenuRow;
};

function UpdateMenuItemForm({
  menuToUpdate,
  onClose,
}: MenuItemUpdateFormProps) {
  const t = useTranslations('menu');

  const form = useForm<UpdateMenuItemSchema>({
    resolver: zodResolver(updateMenuItemSchema),
    defaultValues: {
      name: menuToUpdate?.name || '',
      price: menuToUpdate?.price || 0,
      image: undefined,
      ingredients: menuToUpdate?.ingredients || [],
      description: menuToUpdate?.description || '',
      category: menuToUpdate?.menu_categories
        ? {
            name: menuToUpdate.menu_categories.name,
            icon_name: menuToUpdate.menu_categories.icon_name,
          }
        : {
            icon_name: undefined,
            name: undefined,
          },
    },
  });

  const isLoading = form.formState.isSubmitting;
  const [charLength, setCharLength] = useState<number>(
    menuToUpdate?.description?.length || 0,
  );

  async function onSubmit(values: UpdateMenuItemSchema) {
    const { success, error } = await updateMenuItem(
      {
        ...values,
        image_url: menuToUpdate.image_url,
        category: values?.category?.name,
      },
      menuToUpdate.id,
    );

    onClose();

    if (success) toast.success(t('messages.success.updated'));
    if (!success) toast.error(error);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4 md:space-y-6'
      >
        <FormField
          name='name'
          control={form.control}
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel className='text-xs md:text-sm'>
                {t('form.fields.name')}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t('form.fields.namePlaceholder')}
                  className='text-xs md:text-sm'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex items-start justify-between gap-1 md:gap-2'>
          <FormField
            name='price'
            control={form.control}
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel className='text-xs md:text-sm'>
                  {t('form.fields.price')}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('form.fields.pricePlaceholder')}
                    inputMode='numeric'
                    type='number'
                    step={0.01}
                    min={0}
                    max={10_000_000}
                    className='text-xs md:text-sm'
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseFloat(e.target.value) || 0)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='category'
            control={form.control}
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel className='text-xs md:text-sm'>
                  {t('form.fields.categoryOptional')}
                </FormLabel>
                <FormControl>
                  <CategorySelect {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Accordion
          type='single'
          collapsible
          defaultValue='item-1'
          className='!my-1 w-full md:!my-2'
        >
          <AccordionItem value='item-1'>
            <AccordionTrigger className='text-xs md:text-sm'>
              {t('form.additionalDetails')}
            </AccordionTrigger>
            <AccordionContent className='mx-0 my-0 space-y-4 md:mx-1 md:my-1 md:space-y-6'>
              <FormField
                name='ingredients'
                control={form.control}
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel className='text-xs md:text-sm'>
                      {t('form.fields.ingredients')}
                    </FormLabel>
                    <FormControl>
                      <div className='flex flex-col gap-2'>
                        <CreateIngredientsForm
                          onCreate={(value) => {
                            const ingExists = field.value?.find(
                              (ing) => ing.name === value.name,
                            );
                            if (!ingExists)
                              return field.onChange([
                                ...(field.value ?? []),
                                value,
                              ]);
                            else
                              toast.warning(
                                t('messages.warning.ingredientExists'),
                              );
                          }}
                        />

                        <IngredientsList {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name='description'
                control={form.control}
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel className='flex justify-between text-xs md:text-sm'>
                      {t('form.fields.description')}
                      <Small>{charLength}/280</Small>
                    </FormLabel>
                    <FormControl>
                      <div className='relative h-24 max-h-28'>
                        <Textarea
                          maxLength={280}
                          className='h-full text-xs md:text-sm'
                          autoComplete='on'
                          placeholder={t('form.fields.descriptionPlaceholder')}
                          {...field}
                          onChange={(e) => {
                            setCharLength(e.target.value.length);
                            field.onChange(e.target.value);
                          }}
                        />
                        <GenerateDescriptionButton
                          menuId={menuToUpdate.id}
                          menuItem={menuToUpdate}
                          className='absolute right-2 bottom-2 z-50'
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <FormField
          name='image'
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormControl>
                <UploadImage
                  error={error}
                  {...field}
                  defaultImageURL={menuToUpdate?.image_url}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex items-center justify-center gap-1 md:gap-2'>
          <Button
            type='button'
            disabled={isLoading}
            variant={'secondary'}
            onClick={onClose}
          >
            {t('form.update.cancel')}
          </Button>
          <Button
            variant={'default'}
            disabled={isLoading}
            className='!bg-info/15 !text-info [&_svg]:!text-info hover:!bg-info/10 flex-1'
          >
            {isLoading ? <Spinner /> : <SquarePen />}
            {isLoading ? t('form.update.submitting') : t('form.update.submit')}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default UpdateMenuItemForm;
