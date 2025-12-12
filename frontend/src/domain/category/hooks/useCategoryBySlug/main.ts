import { useQuery } from '@tanstack/react-query';
import { categoryService } from '../../services/categoryService';
import type { UseCategoryBySlugOptions } from './types';

export const useCategoryBySlug = (options: UseCategoryBySlugOptions) => {
  const queryKey = ['category', 'slug', options.slug];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => categoryService.getBySlug({ slug: options.slug }),
    enabled: options.enabled !== false && !!options.slug,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    category: data,
    isLoading,
    error,
    refetch,
  };
};
