import { getActiveCharges } from '@/supabase/data/charges-service';
import { useSuspenseQuery } from '@tanstack/react-query';

export function useGetActiveCharges() {
  const { data, isPending } = useSuspenseQuery({
    queryKey: ['active_charges'],
    queryFn: getActiveCharges,
  });

  return { activeCharges: data?.data, error: data?.error, isPending };
}
