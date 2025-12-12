import { useQuery } from '@tanstack/react-query';
import { categoryService } from '../../services/categoryService';

export const useFeaturedCategories = () => {
  const queryKey = ['categories', 'featured'];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => categoryService.getFeatured(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  return {
    featuredCategories: data?.data ?? [],
    isLoading,
    error,
    refetch,
  };
};
