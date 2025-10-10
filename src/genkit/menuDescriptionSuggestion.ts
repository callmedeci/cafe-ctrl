'use server';

import { getMenuItemById } from '@/supabase/data/menu-service';
import { GetActionResult } from '@/types';
import { MenuRow } from '@/types/tables';
import { z } from 'genkit';
import { getLocale } from 'next-intl/server';
import { ai } from './model';
import {
  MenuDescriptionOutput,
  menuDescriptionOutputSchema,
  menuItemSchema,
} from './schema';

const menuDescriptionSuggestion = ai.defineFlow(
  {
    name: 'menuDescriptionSuggestion',
    inputSchema: menuItemSchema,
    outputSchema: menuDescriptionOutputSchema,
    streamSchema: z.string(),
  },
  async (menuItem, { sendChunk }) => {
    const { stream, response } = ai.generateStream({
      prompt: `You are a concise description generator. Read the "locale" field in the provided menuItem and produce exactly one creative description in the requested locale. Menu item: ${JSON.stringify(menuItem, null, 2)}`,
    });

    for await (const chunk of stream) sendChunk(chunk.text);

    const { text } = await response;
    return { description: text };
  },
);

export async function menuDescriptionGenerator(
  menuId: number,
  menuItemToUpdate?: MenuRow,
): Promise<GetActionResult<MenuDescriptionOutput>> {
  try {
    let menuItem;

    if (menuItemToUpdate) menuItem = menuItemToUpdate;
    else {
      const { data, error } = await getMenuItemById(menuId);
      if (error || !data) return { success: false, error };

      menuItem = data;
    }

    const {
      id,
      created_at,
      updated_at,
      image_url,
      menu_categories,
      ...menuToGenerate
    } = menuItem;

    const locale = await getLocale();

    const { description } = await menuDescriptionSuggestion({
      ...menuToGenerate,
      locale,
    });

    return { success: true, data: { description } };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to generate' };
  }
}
