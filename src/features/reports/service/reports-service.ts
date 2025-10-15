'use server';

import { createClient } from '@/supabase/server';
import type { GetActionResult } from '@/types';
import {
  subDays,
  differenceInDays,
  parseISO,
  eachDayOfInterval,
  formatISO,
} from 'date-fns';
import type {
  ComparativeMetric,
  ReportChartData,
  ReportTableRow,
  ReportType,
} from '../lib/types';

export async function getComparativeMetrics(
  reportType: ReportType,
  startDate: string,
  endDate: string,
): Promise<GetActionResult<ComparativeMetric[]>> {
  try {
    const supabase = await createClient();

    const start = parseISO(startDate);
    const end = parseISO(endDate);
    const daysDiff = differenceInDays(end, start);
    const prevStart = subDays(start, daysDiff);
    const prevEnd = subDays(end, daysDiff);
    const prevStartDate = prevStart.toISOString();
    const prevEndDate = prevEnd.toISOString();

    if (reportType === 'sales') {
      // Current period sales
      const { data: currentSales } = await supabase
        .from('orders')
        .select('total_price')
        .eq('status', 'paid')
        .gte('created_at', startDate)
        .lte('created_at', endDate);

      // Previous period sales
      const { data: previousSales } = await supabase
        .from('orders')
        .select('total_price')
        .eq('status', 'paid')
        .gte('created_at', prevStartDate)
        .lte('created_at', prevEndDate);

      const currentTotal =
        currentSales?.reduce(
          (sum, order) => sum + (order.total_price || 0),
          0,
        ) || 0;
      const previousTotal =
        previousSales?.reduce(
          (sum, order) => sum + (order.total_price || 0),
          0,
        ) || 0;
      const change = currentTotal - previousTotal;
      const changePercent =
        previousTotal > 0 ? (change / previousTotal) * 100 : 0;

      // Average order value
      const currentAvg = currentSales?.length
        ? currentTotal / currentSales.length
        : 0;
      const previousAvg = previousSales?.length
        ? previousTotal / previousSales.length
        : 0;
      const avgChange = currentAvg - previousAvg;
      const avgChangePercent =
        previousAvg > 0 ? (avgChange / previousAvg) * 100 : 0;

      return {
        success: true,
        data: [
          {
            label: 'Total Revenue',
            current: currentTotal,
            previous: previousTotal,
            change,
            changePercent,
          },
          {
            label: 'Average Order Value',
            current: currentAvg,
            previous: previousAvg,
            change: avgChange,
            changePercent: avgChangePercent,
          },
          {
            label: 'Total Orders',
            current: currentSales?.length || 0,
            previous: previousSales?.length || 0,
            change: (currentSales?.length || 0) - (previousSales?.length || 0),
            changePercent: previousSales?.length
              ? (((currentSales?.length || 0) - previousSales.length) /
                  previousSales.length) *
                100
              : 0,
          },
        ],
      };
    } else if (reportType === 'orders') {
      // Current period orders
      const { data: currentOrders } = await supabase
        .from('orders')
        .select('id, status, is_togo')
        .gte('created_at', startDate)
        .lte('created_at', endDate);

      // Previous period orders
      const { data: previousOrders } = await supabase
        .from('orders')
        .select('id, status, is_togo')
        .gte('created_at', prevStartDate)
        .lte('created_at', prevEndDate);

      const currentPaid =
        currentOrders?.filter((o) => o.status === 'paid').length || 0;
      const previousPaid =
        previousOrders?.filter((o) => o.status === 'paid').length || 0;
      const paidChange = currentPaid - previousPaid;
      const paidChangePercent =
        previousPaid > 0 ? (paidChange / previousPaid) * 100 : 0;

      const currentTogo = currentOrders?.filter((o) => o.is_togo).length || 0;
      const previousTogo = previousOrders?.filter((o) => o.is_togo).length || 0;
      const togoChange = currentTogo - previousTogo;
      const togoChangePercent =
        previousTogo > 0 ? (togoChange / previousTogo) * 100 : 0;

      return {
        success: true,
        data: [
          {
            label: 'Total Orders',
            current: currentOrders?.length || 0,
            previous: previousOrders?.length || 0,
            change:
              (currentOrders?.length || 0) - (previousOrders?.length || 0),
            changePercent: previousOrders?.length
              ? (((currentOrders?.length || 0) - previousOrders.length) /
                  previousOrders.length) *
                100
              : 0,
          },
          {
            label: 'Paid Orders',
            current: currentPaid,
            previous: previousPaid,
            change: paidChange,
            changePercent: paidChangePercent,
          },
          {
            label: 'To-Go Orders',
            current: currentTogo,
            previous: previousTogo,
            change: togoChange,
            changePercent: togoChangePercent,
          },
        ],
      };
    } else {
      // Menu performance
      const { data: currentItems } = await supabase
        .from('order_items')
        .select('menu_item_id, quantity, price_at_time')
        .gte('created_at', startDate)
        .lte('created_at', endDate);

      const { data: previousItems } = await supabase
        .from('order_items')
        .select('menu_item_id, quantity, price_at_time')
        .gte('created_at', prevStartDate)
        .lte('created_at', prevEndDate);

      const currentTotal =
        currentItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;
      const previousTotal =
        previousItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;
      const change = currentTotal - previousTotal;
      const changePercent =
        previousTotal > 0 ? (change / previousTotal) * 100 : 0;

      const currentRevenue =
        currentItems?.reduce(
          (sum, item) => sum + item.quantity * item.price_at_time,
          0,
        ) || 0;
      const previousRevenue =
        previousItems?.reduce(
          (sum, item) => sum + item.quantity * item.price_at_time,
          0,
        ) || 0;
      const revenueChange = currentRevenue - previousRevenue;
      const revenueChangePercent =
        previousRevenue > 0 ? (revenueChange / previousRevenue) * 100 : 0;

      return {
        success: true,
        data: [
          {
            label: 'Items Sold',
            current: currentTotal,
            previous: previousTotal,
            change,
            changePercent,
          },
          {
            label: 'Menu Revenue',
            current: currentRevenue,
            previous: previousRevenue,
            change: revenueChange,
            changePercent: revenueChangePercent,
          },
          {
            label: 'Unique Items',
            current: new Set(currentItems?.map((i) => i.menu_item_id)).size,
            previous: new Set(previousItems?.map((i) => i.menu_item_id)).size,
            change:
              new Set(currentItems?.map((i) => i.menu_item_id)).size -
              new Set(previousItems?.map((i) => i.menu_item_id)).size,
            changePercent: 0,
          },
        ],
      };
    }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function getReportChartData(
  reportType: ReportType,
  startDate: string,
  endDate: string,
): Promise<GetActionResult<ReportChartData[]>> {
  try {
    const supabase = await createClient();

    const start = parseISO(startDate);
    const end = parseISO(endDate);
    const daysDiff = differenceInDays(end, start);
    const prevStart = subDays(start, daysDiff);
    const prevEnd = subDays(end, daysDiff);
    const prevStartDate = prevStart.toISOString();
    const prevEndDate = prevEnd.toISOString();

    if (reportType === 'sales') {
      const { data: currentOrders } = await supabase
        .from('orders')
        .select('created_at, total_price')
        .eq('status', 'paid')
        .gte('created_at', startDate)
        .lte('created_at', endDate)
        .order('created_at', { ascending: true });

      const { data: previousOrders } = await supabase
        .from('orders')
        .select('created_at, total_price')
        .eq('status', 'paid')
        .gte('created_at', prevStartDate)
        .lte('created_at', prevEndDate)
        .order('created_at', { ascending: true });

      // Group by date
      const currentByDate = new Map<string, number>();
      currentOrders?.forEach((order) => {
        const date = order.created_at.split('T')[0];
        currentByDate.set(
          date,
          (currentByDate.get(date) || 0) + (order.total_price || 0),
        );
      });

      const previousByDate = new Map<string, number>();
      previousOrders?.forEach((order) => {
        const date = order.created_at.split('T')[0];
        previousByDate.set(
          date,
          (previousByDate.get(date) || 0) + (order.total_price || 0),
        );
      });

      const allDates = eachDayOfInterval({ start, end });
      const chartData: ReportChartData[] = allDates.map((date) => {
        const dateStr = formatISO(date).split('T')[0];
        const prevDate = subDays(date, daysDiff);
        const prevDateStr = formatISO(prevDate).split('T')[0];

        return {
          date: dateStr,
          current: currentByDate.get(dateStr) || 0,
          previous: previousByDate.get(prevDateStr) || 0,
        };
      });

      return { success: true, data: chartData };
    } else if (reportType === 'orders') {
      const { data: currentOrders } = await supabase
        .from('orders')
        .select('created_at')
        .gte('created_at', startDate)
        .lte('created_at', endDate)
        .order('created_at', { ascending: true });

      const { data: previousOrders } = await supabase
        .from('orders')
        .select('created_at')
        .gte('created_at', prevStartDate)
        .lte('created_at', prevEndDate)
        .order('created_at', { ascending: true });

      const currentByDate = new Map<string, number>();
      currentOrders?.forEach((order) => {
        const date = order.created_at.split('T')[0];
        currentByDate.set(date, (currentByDate.get(date) || 0) + 1);
      });

      const previousByDate = new Map<string, number>();
      previousOrders?.forEach((order) => {
        const date = order.created_at.split('T')[0];
        previousByDate.set(date, (previousByDate.get(date) || 0) + 1);
      });

      const allDates = eachDayOfInterval({ start, end });
      const chartData: ReportChartData[] = allDates.map((date) => {
        const dateStr = formatISO(date).split('T')[0];
        const prevDate = subDays(date, daysDiff);
        const prevDateStr = formatISO(prevDate).split('T')[0];

        return {
          date: dateStr,
          current: currentByDate.get(dateStr) || 0,
          previous: previousByDate.get(prevDateStr) || 0,
        };
      });

      return { success: true, data: chartData };
    } else {
      // Menu performance - items sold over time
      const { data: currentItems } = await supabase
        .from('order_items')
        .select('created_at, quantity')
        .gte('created_at', startDate)
        .lte('created_at', endDate)
        .order('created_at', { ascending: true });

      const { data: previousItems } = await supabase
        .from('order_items')
        .select('created_at, quantity')
        .gte('created_at', prevStartDate)
        .lte('created_at', prevEndDate)
        .order('created_at', { ascending: true });

      const currentByDate = new Map<string, number>();
      currentItems?.forEach((item) => {
        const date = item.created_at.split('T')[0];
        currentByDate.set(date, (currentByDate.get(date) || 0) + item.quantity);
      });

      const previousByDate = new Map<string, number>();
      previousItems?.forEach((item) => {
        const date = item.created_at.split('T')[0];
        previousByDate.set(
          date,
          (previousByDate.get(date) || 0) + item.quantity,
        );
      });

      const allDates = eachDayOfInterval({ start, end });
      const chartData: ReportChartData[] = allDates.map((date) => {
        const dateStr = formatISO(date).split('T')[0];
        const prevDate = subDays(date, daysDiff);
        const prevDateStr = formatISO(prevDate).split('T')[0];

        return {
          date: dateStr,
          current: currentByDate.get(dateStr) || 0,
          previous: previousByDate.get(prevDateStr) || 0,
        };
      });

      return { success: true, data: chartData };
    }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function getReportTableData(
  reportType: ReportType,
  startDate: string,
  endDate: string,
): Promise<GetActionResult<ReportTableRow[]>> {
  try {
    const supabase = await createClient();

    const start = parseISO(startDate);
    const end = parseISO(endDate);
    const daysDiff = differenceInDays(end, start);
    const prevStart = subDays(start, daysDiff);
    const prevEnd = subDays(end, daysDiff);
    const prevStartDate = prevStart.toISOString();
    const prevEndDate = prevEnd.toISOString();

    if (reportType === 'menu-performance') {
      const { data: currentItems } = await supabase
        .from('order_items')
        .select('menu_item_id(id, name), quantity, price_at_time')
        .gte('created_at', startDate)
        .lte('created_at', endDate);

      const { data: previousItems } = await supabase
        .from('order_items')
        .select('menu_item_id(id, name), quantity, price_at_time')
        .gte('created_at', prevStartDate)
        .lte('created_at', prevEndDate);

      const currentMap = new Map<
        string,
        { name: string; quantity: number; revenue: number }
      >();
      currentItems?.forEach((item) => {
        if (item.menu_item_id && typeof item.menu_item_id === 'object') {
          const id = String(item.menu_item_id.id);
          const name = item.menu_item_id.name;
          const existing = currentMap.get(id) || {
            name,
            quantity: 0,
            revenue: 0,
          };
          currentMap.set(id, {
            name,
            quantity: existing.quantity + item.quantity,
            revenue: existing.revenue + item.quantity * item.price_at_time,
          });
        }
      });

      const previousMap = new Map<
        string,
        { quantity: number; revenue: number }
      >();
      previousItems?.forEach((item) => {
        if (item.menu_item_id && typeof item.menu_item_id === 'object') {
          const id = String(item.menu_item_id.id);
          const existing = previousMap.get(id) || { quantity: 0, revenue: 0 };
          previousMap.set(id, {
            quantity: existing.quantity + item.quantity,
            revenue: existing.revenue + item.quantity * item.price_at_time,
          });
        }
      });

      const tableData: ReportTableRow[] = [];
      currentMap.forEach((current, id) => {
        const previous = previousMap.get(id) || { quantity: 0, revenue: 0 };
        const change = current.revenue - previous.revenue;
        const changePercent =
          previous.revenue > 0 ? (change / previous.revenue) * 100 : 0;

        tableData.push({
          id,
          name: current.name,
          current: current.revenue,
          previous: previous.revenue,
          change,
          changePercent,
        });
      });

      return {
        success: true,
        data: tableData.sort((a, b) => b.current - a.current).slice(0, 10),
      };
    }

    return { success: true, data: [] };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}
