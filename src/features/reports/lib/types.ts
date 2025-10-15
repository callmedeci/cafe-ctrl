export const reportType = ['sales', 'orders', 'menu-performance'] as const;
export type ReportType = (typeof reportType)[number];

export type DateRange = {
  from: string;
  to: string;
};

export type ComparativeMetric = {
  label: string;
  current: number;
  previous: number;
  change: number;
  changePercent: number;
};

export type ReportChartData = {
  date: string;
  current: number;
  previous: number;
};

export type ReportTableRow = {
  id: string;
  name: string;
  current: number;
  previous: number;
  change: number;
  changePercent: number;
};

export type InsightData = {
  title: string;
  description: string;
  trend: 'up' | 'down' | 'neutral';
  value: string;
};
