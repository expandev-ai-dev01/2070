import { useQuery } from '@tanstack/react-query';
import { categoryService } from '../../services/categoryService';
import type { UseCategoryListOptions } from './types';

export const useCategoryList = (options?: UseCategoryListOptions) => {
  const queryKey = ['categories', options?.filters];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => categoryService.list(options?.filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    categories: data?.items ?? [],
    isLoading,
    error,
    refetch,
  };
};
