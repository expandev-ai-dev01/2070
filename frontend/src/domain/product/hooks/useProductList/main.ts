import { useQuery } from '@tanstack/react-query';
import { productService } from '../../services/productService';
import type { UseProductListOptions } from './types';

export const useProductList = (options: UseProductListOptions) => {
  const queryKey = ['products', options.filters];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => productService.list(options.filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    products: data?.items ?? [],
    total: data?.total ?? 0,
    page: data?.page ?? 1,
    pageSize: data?.pageSize ?? 9,
    totalPages: data?.totalPages ?? 1,
    hasNext: data?.hasNext ?? false,
    hasPrevious: data?.hasPrevious ?? false,
    isLoading,
    error,
    refetch,
  };
};
