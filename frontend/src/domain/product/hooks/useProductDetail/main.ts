import { useQuery } from '@tanstack/react-query';
import { productService } from '../../services/productService';
import type { UseProductDetailOptions } from './types';

export const useProductDetail = (options: UseProductDetailOptions) => {
  const queryKey = ['product', options.id];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => productService.getById(options.id),
    enabled: options.enabled !== false && !!options.id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    product: data,
    isLoading,
    error,
    refetch,
  };
};
