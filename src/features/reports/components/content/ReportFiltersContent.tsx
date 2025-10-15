import DateRangeSelector from '../layout/DateRangeSelector';
import ReportTypeSelector from '../layout/ReportTypeSelector';

function ReportFiltersContent() {
  return (
    <div className='flex flex-col gap-4'>
      <ReportTypeSelector />
      <DateRangeSelector />
    </div>
  );
}

export default ReportFiltersContent;
