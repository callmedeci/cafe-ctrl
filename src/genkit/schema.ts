import { MenuRow } from '@/types/tables';
import { z } from 'genkit';
import { toZod } from 'tozod';

export const menuItemSchema: toZod<MenuRow & { locale: string }> = z.object({
  name: z.string(),
  price: z.number(),
  category: z.string().optional(),
  description: z.string().optional(),
  ingredients: z
    .array(z.object({ name: z.string(), quantity: z.string().optional() }))
    .optional(),
  locale: z.string(),
});

export const menuDescriptionOutputSchema = z.object({
  description: z.string(),
});

export type MenuDescriptionOutput = z.infer<typeof menuDescriptionOutputSchema>;
