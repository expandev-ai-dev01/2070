import { useQuery } from '@tanstack/react-query';
import { productImageService } from '../../services/productImageService';
import type { UseProductImagesOptions } from './types';

export const useProductImages = (options: UseProductImagesOptions) => {
  const queryKey = ['product-images', options.productId];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => productImageService.list({ productId: options.productId }),
    enabled: options.enabled !== false && !!options.productId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    images: data ?? [],
    isLoading,
    error,
    refetch,
  };
};
