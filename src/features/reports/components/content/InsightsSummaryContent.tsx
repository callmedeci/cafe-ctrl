import { searchParamsCache } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';
import { subDays, formatISO } from 'date-fns';
import { getComparativeMetrics } from '../../service/reports-service';
import InsightsList from '../layout/InsightsList';
import type { ReportType, InsightData } from '../../lib/types';

async function InsightsSummaryContent() {
  const params = searchParamsCache.all();
  const reportType = (params.type || 'sales') as ReportType;

  const fromDate =
    params.from || formatISO(subDays(new Date(), 30)).split('T')[0];
  const toDate = params.to || formatISO(new Date()).split('T')[0];

  const { data } = await getComparativeMetrics(reportType, fromDate, toDate);

  const t = await getTranslations('reports');

  // Generate insights based on metrics
  const insights: InsightData[] = [];

  if (data && data.length > 0) {
    const mainMetric = data[0];
    if (mainMetric.changePercent > 10) {
      insights.push({
        title: t('insights.strongGrowth.title'),
        description: t('insights.strongGrowth.description', {
          metric: mainMetric.label,
          percent: Math.abs(mainMetric.changePercent).toFixed(1),
        }),
        trend: 'up',
        value: `+${Math.abs(mainMetric.changePercent).toFixed(1)}%`,
      });
    } else if (mainMetric.changePercent < -10) {
      insights.push({
        title: t('insights.decline.title'),
        description: t('insights.decline.description', {
          metric: mainMetric.label,
          percent: Math.abs(mainMetric.changePercent).toFixed(1),
        }),
        trend: 'down',
        value: `-${Math.abs(mainMetric.changePercent).toFixed(1)}%`,
      });
    } else {
      insights.push({
        title: t('insights.stable.title'),
        description: t('insights.stable.description', {
          metric: mainMetric.label,
        }),
        trend: 'neutral',
        value: `${mainMetric.changePercent >= 0 ? '+' : ''}${mainMetric.changePercent.toFixed(1)}%`,
      });
    }

    // Add second insight if available
    if (data.length > 1) {
      const secondMetric = data[1];
      if (Math.abs(secondMetric.changePercent) > 5) {
        insights.push({
          title:
            secondMetric.changePercent > 0
              ? t('insights.improvement.title')
              : t('insights.attention.title'),
          description: t('insights.metricChange.description', {
            metric: secondMetric.label,
            percent: Math.abs(secondMetric.changePercent).toFixed(1),
            direction:
              secondMetric.changePercent > 0
                ? t('insights.increased')
                : t('insights.decreased'),
          }),
          trend: secondMetric.changePercent > 0 ? 'up' : 'down',
          value: `${secondMetric.changePercent >= 0 ? '+' : ''}${secondMetric.changePercent.toFixed(1)}%`,
        });
      }
    }
  }

  if (insights.length === 0) {
    insights.push({
      title: t('insights.noData.title'),
      description: t('insights.noData.description'),
      trend: 'neutral',
      value: '-',
    });
  }

  return <InsightsList insights={insights} />;
}

export default InsightsSummaryContent;
