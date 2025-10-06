import { Skeleton } from '@/components/ui/skeleton';

function SalesChartSkeleton() {
  return (
    <div
      className='flex h-[300px] w-full items-end justify-between gap-2 px-4'
      role='status'
      aria-label='Loading sales chart'
    >
      <span className='sr-only'>Loading chart data...</span>
      {Array.from({ length: 12 }).map((_, index) => (
        <Skeleton
          key={index}
          className='w-full'
          style={{
            height: `${Math.random() * 60 + 40}%`,
          }}
          aria-hidden='true'
        />
      ))}
    </div>
  );
}

export default SalesChartSkeleton;
