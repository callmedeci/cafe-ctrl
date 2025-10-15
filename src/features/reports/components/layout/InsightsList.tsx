'use client';

import { TrendingDown, TrendingUp, Minus } from 'lucide-react';
import type { InsightData } from '../../lib/types';

type InsightsListProps = {
  insights: InsightData[];
};

function InsightsList({ insights }: InsightsListProps) {
  return (
    <div className='flex flex-col gap-3'>
      {insights.map((insight, index) => {
        const Icon =
          insight.trend === 'up'
            ? TrendingUp
            : insight.trend === 'down'
              ? TrendingDown
              : Minus;

        const colorClass =
          insight.trend === 'up'
            ? 'text-green-600'
            : insight.trend === 'down'
              ? 'text-red-600'
              : 'text-muted-foreground';

        return (
          <div
            key={index}
            className='flex items-start gap-3 rounded-lg border p-3'
          >
            <div className={`mt-0.5 ${colorClass}`}>
              <Icon className='h-5 w-5' />
            </div>
            <div className='flex-1'>
              <div className='font-medium'>{insight.title}</div>
              <div className='text-muted-foreground text-sm'>
                {insight.description}
              </div>
            </div>
            <div className={`text-sm font-medium ${colorClass}`}>
              {insight.value}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default InsightsList;
