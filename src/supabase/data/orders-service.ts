'use server';

import { createClient } from '@/supabase/server';
import { GetActionResult } from '@/types';
import {
  OrderCustomerInfoRow,
  OrderDetailsRow,
  OrderInsert,
  OrderRow,
  OrderStatus,
  OrderUpdate,
} from '@/types/tables';
import { revalidatePath } from 'next/cache';
import { createBuildTimeClient } from '../client';
import { getActiveCharges } from './charges-service';

//GET
export async function getOrders(): Promise<GetActionResult<OrderRow[]>> {
  try {
    const supabase = await createClient();
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
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

export async function getOrdersDate(): Promise<GetActionResult<string[]>> {
  try {
    const supabase = await createClient();
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('created_at');

    if (ordersError)
      return {
        success: false,
        error: ordersError.message,
      };

    return { success: true, data: orders.map((order) => order.created_at) };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function getOrderById(
  orderId: string,
): Promise<GetActionResult<OrderRow>> {
  try {
    const supabase = await createClient();
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (orderError)
      return {
        success: false,
        error: orderError.message,
      };

    return { success: true, data: order };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function getOrdersByDate(
  date: string,
): Promise<GetActionResult<OrderRow[]>> {
  try {
    const supabase = await createClient();

    const startOfDay = `${date}T00:00:00.000Z`;
    const endOfDay = `${date}T23:59:59.999Z`;

    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .gte('created_at', startOfDay)
      .lte('created_at', endOfDay)
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

export async function getAllOrdersId(): Promise<string[]> {
  try {
    const supabase = createBuildTimeClient();
    const { data: ordersId, error } = await supabase
      .from('orders')
      .select('id');

    if (error) {
      console.error('Error fetching menu item IDs:', error.message);
      return [];
    }

    return ordersId.map((item) => item.id);
  } catch (error) {
    console.error(
      'Unexpected error fetching menu item IDs:',
      error instanceof Error ? error.message : 'Unknown error',
    );
    return [];
  }
}

export async function getOrdersCountByDate(date: string): Promise<number> {
  try {
    const supabase = await createClient();

    const startOfDay = `${date}T00:00:00.000Z`;
    const endOfDay = `${date}T23:59:59.999Z`;

    const { count, error } = await supabase
      .from('orders')
      .select('', { count: 'exact', head: true })
      .gte('created_at', startOfDay)
      .lte('created_at', endOfDay)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders count:', error.message);
      return 0;
    }

    return count || 0;
  } catch (error) {
    console.error(
      'Unexpected error fetching orders count:',
      error instanceof Error ? error.message : 'Unknown error',
    );
    return 0;
  }
}

// Additional GET functions for order-service (add these to your existing functions)
export async function getOrderDetails(
  orderId: string,
): Promise<GetActionResult<OrderDetailsRow>> {
  try {
    const supabase = await createClient();
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select(
        'customer_name, customer_contact, total_price, status, is_togo, created_at',
      )
      .eq('id', orderId)
      .single();

    if (orderError)
      return {
        success: false,
        error: orderError.message,
      };

    return { success: true, data: order };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function getOrderItems(
  orderId: string,
): Promise<GetActionResult<OrderRow['items']>> {
  try {
    const supabase = await createClient();
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('items')
      .eq('id', orderId)
      .single();

    if (orderError)
      return {
        success: false,
        error: orderError.message,
      };

    return { success: true, data: order.items };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function getOrderNotes(
  orderId: string,
): Promise<GetActionResult<string | null>> {
  try {
    const supabase = await createClient();
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('notes')
      .eq('id', orderId)
      .single();

    if (orderError)
      return {
        success: false,
        error: orderError.message,
      };

    return { success: true, data: order.notes };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function getOrderStatus(
  orderId: string,
): Promise<GetActionResult<OrderStatus>> {
  try {
    const supabase = await createClient();
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('status')
      .eq('id', orderId)
      .single();

    if (orderError)
      return {
        success: false,
        error: orderError.message,
      };

    return { success: true, data: order.status };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function getOrderCustomerInfo(
  orderId: string,
): Promise<GetActionResult<OrderCustomerInfoRow>> {
  try {
    const supabase = await createClient();
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('customer_name, customer_contact')
      .eq('id', orderId)
      .single();

    if (orderError || !order)
      return {
        success: false,
        error: orderError.message,
      };

    return { success: true, data: order };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function getOrderTotalPrice(
  orderId: string,
): Promise<GetActionResult<number>> {
  try {
    const supabase = await createClient();
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('total_price')
      .eq('id', orderId)
      .single();

    if (orderError)
      return {
        success: false,
        error: orderError.message,
      };

    return { success: true, data: order.total_price };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function getOrderIsToGo(
  orderId: string,
): Promise<GetActionResult<boolean>> {
  try {
    const supabase = await createClient();
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('is_togo')
      .eq('id', orderId)
      .single();

    if (orderError)
      return {
        success: false,
        error: orderError.message,
      };

    return { success: true, data: order.is_togo };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function getOrderName(
  orderId: string,
): Promise<GetActionResult<string | null>> {
  try {
    const supabase = await createClient();
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('id, order_name')
      .eq('id', orderId)
      .single();

    if (orderError)
      return {
        success: false,
        error: orderError.message,
      };

    return { success: true, data: order.order_name || order.id };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

//CREATE
export async function createOrder(
  newOrder: OrderInsert,
  createdAt?: string | null,
): Promise<GetActionResult<OrderRow>> {
  try {
    const supabase = await createClient();

    const { data: activeCharges, error: chargesError } =
      await getActiveCharges();

    if (chargesError || !activeCharges)
      return { success: false, error: chargesError };

    const chargesPrice = activeCharges.reduce(
      (total, charge) => total + charge.amount,
      0,
    );
    const totalPrice =
      newOrder.items!.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      ) + chargesPrice;

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        ...newOrder,

        created_at: createdAt
          ? new Date(createdAt).toISOString()
          : new Date().toISOString(),

        total_price: totalPrice,
      })
      .select()
      .single();

    if (orderError || !order)
      return {
        success: false,
        error: orderError.message,
      };

    revalidatePath('/dashboard/orders');
    return { success: true, data: order };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

//UPDATE
export async function updateOrder(
  orderId: string,
  orderUpdate: OrderUpdate,
): Promise<GetActionResult<OrderRow>> {
  try {
    const supabase = await createClient();
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .update({
        ...orderUpdate,

        total_price:
          orderUpdate.items &&
          orderUpdate.items.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0,
          ),
      })
      .eq('id', orderId)
      .select()
      .single();

    if (orderError || !order)
      return {
        success: false,
        error: orderError.message,
      };

    revalidatePath('/dashboard/orders');
    return { success: true, data: order };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function updateOrderIsToGo(
  orderId: string,
  is_togo: boolean,
): Promise<GetActionResult<OrderRow>> {
  try {
    const supabase = await createClient();
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .update({ is_togo })
      .eq('id', orderId)
      .select()
      .single();

    if (orderError || !order)
      return {
        success: false,
        error: orderError.message,
      };

    revalidatePath('/dashboard/orders');
    return { success: true, data: order };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function updateOrderStatus(
  orderId: string,
  status: 'paid' | 'unpaid',
): Promise<GetActionResult<OrderRow>> {
  try {
    const supabase = await createClient();
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select()
      .single();

    if (orderError || !order)
      return {
        success: false,
        error: orderError.message,
      };

    revalidatePath('/dashboard/orders');
    return { success: true, data: order };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

//DELETE
export async function deleteOrder(orderId: string): Promise<GetActionResult> {
  try {
    const supabase = await createClient();
    const { error: deleteOrderError } = await supabase
      .from('orders')
      .delete()
      .eq('id', orderId)
      .select('')
      .single();

    if (deleteOrderError)
      return {
        success: false,
        error: deleteOrderError.message,
      };

    revalidatePath('/dashboard/orders');
    return { success: true, data: undefined };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}
