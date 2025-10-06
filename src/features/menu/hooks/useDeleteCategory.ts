import { deleteCategoryItem as deleteCategoryItemApi } from '@/supabase/data/categories-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  const {
    error,
    mutateAsync: deleteCategoryItem,
    isPending,
  } = useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) =>
      deleteCategoryItemApi(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu_categories'] });
      queryClient.invalidateQueries({ queryKey: ['selected_menu_categories'] });
    },
  });

  return { deleteCategoryItem, error, isPending };
}
