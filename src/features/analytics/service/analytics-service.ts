'use server';

import { createClient } from '@/supabase/server';
import { GetActionResult } from '@/types';
import { OrderRow } from '@/types/tables';

export async function getOrdersDateByRange(
  startDate: string,
  endDate: string,
): Promise<
  GetActionResult<
    {
      created_at: OrderRow['created_at'];
    }[]
  >
> {
  try {
    const supabase = await createClient();
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('created_at')
      .gte('created_at', startDate)
      .lte('created_at', endDate)
      .order('created_at', { ascending: false });

    if (ordersError)
      return {
        success: false,
        error: ordersError.message,
      };

    return { success: true, data: orders };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function getOrdersTotalPriceByRange(
  startDate: string,
  endDate: string,
): Promise<
  GetActionResult<
    {
      created_at: OrderRow['created_at'];
      total_price: OrderRow['total_price'];
    }[]
  >
> {
  try {
    const supabase = await createClient();
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('created_at, total_price')
      .eq('status', 'paid')
      .gte('created_at', startDate)
      .lte('created_at', endDate)
      .order('created_at', { ascending: false });

    if (ordersError)
      return {
        success: false,
        error: ordersError.message,
      };

    return { success: true, data: orders };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function getOrdersCountByRange(
  startDate: string,
  endDate: string,
): Promise<number> {
  try {
    const supabase = await createClient();
    const { count, error: ordersError } = await supabase
      .from('orders')
      .select('', { head: true, count: 'exact' })
      .gte('created_at', startDate)
      .lte('created_at', endDate)
      .order('created_at', { ascending: false });

    if (ordersError || !count) return 0;

    return count;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

export async function getTopSalesByDateRange(
  startDate: string,
  endDate: string,
) {
  try {
    const supabase = await createClient();
    const { data: orders, error: ordersError } = await supabase
      .from('order_items')
      .select(
        'menu_item_id(name, category(name, icon_name)), quantity, price_at_time',
      )
      .gte('created_at', startDate)
      .lte('created_at', endDate)
      .order('created_at', { ascending: false });

    if (ordersError)
      return {
        success: false,
        error: ordersError.message,
      };

    return { success: true, data: orders };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function getRecentOrdersByDateRange(
  startDate: string,
  endDate: string,
) {
  try {
    const supabase = await createClient();
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select(
        'id, created_at, order_name, status, is_togo, customer_name, total_price',
      )
      .gte('created_at', startDate)
      .lte('created_at', endDate)
      .order('created_at', { ascending: false })
      .limit(7);

    if (ordersError)
      return {
        success: false,
        error: ordersError.message,
      };

    return { success: true, data: orders };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}
