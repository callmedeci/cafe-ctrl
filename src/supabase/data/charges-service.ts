'use server';

import { GetActionResult } from '@/types';
import { createClient } from '../server';
import {
  AdditionalChargesInsert,
  AdditionalChargesRow,
  AdditionalChargesUpdate,
} from '@/types/tables';
import { revalidatePath } from 'next/cache';

// GET CHARGES
export async function getCharges(): Promise<
  GetActionResult<AdditionalChargesRow[]>
> {
  try {
    const supabase = await createClient();
    const { data: charges, error: chargesError } = await supabase
      .from('additional_charges')
      .select('*')
      .order('is_active', { ascending: false });

    if (chargesError)
      return {
        success: false,
        error: chargesError.message,
      };

    return { success: true, data: charges };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function getActiveCharges(): Promise<
  GetActionResult<{ amount: AdditionalChargesRow['amount'] }[]>
> {
  try {
    const supabase = await createClient();
    const { data: charges, error: chargesError } = await supabase
      .from('additional_charges')
      .select('amount')
      .eq('is_active', true);

    if (chargesError)
      return {
        success: false,
        error: chargesError.message,
      };

    return { success: true, data: charges };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

// CREATE
export async function createCharge(
  newCharge: AdditionalChargesInsert,
): Promise<GetActionResult<AdditionalChargesRow>> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('additional_charges')
      .insert(newCharge)
      .select('*')
      .single();

    if (error)
      return {
        success: false,
        error: error.message,
      };

    revalidatePath('dashboard/settings');
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

// UPDATE
export async function updateCharge(
  id: number,
  chargeTpUpdate: AdditionalChargesUpdate,
): Promise<GetActionResult<AdditionalChargesRow>> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('additional_charges')
      .update(chargeTpUpdate)
      .eq('id', id)
      .select('*')
      .single();

    if (error)
      return {
        success: false,
        error: error.message,
      };

    revalidatePath('dashboard/settings');
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function updateChargePrice(
  id: number,
  amount: number,
): Promise<GetActionResult<AdditionalChargesRow>> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('additional_charges')
      .update({ amount })
      .eq('id', id)
      .select('*')
      .single();

    if (error)
      return {
        success: false,
        error: error.message,
      };

    revalidatePath('dashboard/settings');
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function toggleChargeIsActive(
  id: number,
  is_active: boolean,
): Promise<GetActionResult> {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from('additional_charges')
      .update({ is_active })
      .eq('id', id)
      .select('')
      .single();

    if (error)
      return {
        success: false,
        error: error.message,
      };

    revalidatePath('dashboard/settings');
    return { success: true, data: undefined };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

// DELETE CHARGES
export async function deleteCharge(id: number): Promise<GetActionResult> {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from('additional_charges')
      .delete()
      .eq('id', id)
      .select('*')
      .single();

    if (error)
      return {
        success: false,
        error: error.message,
      };

    revalidatePath('dashboard/settings');
    return { success: true, data: undefined };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}
