/**
 * @service ProductImageService
 * @domain product
 * @type REST API
 */
import { authenticatedClient } from '@/core/lib/api';
import type { ProductImage, ProductImageListParams } from '../types/models';

export const productImageService = {
  /**
   * List product images
   */
  async list(params: ProductImageListParams): Promise<ProductImage[]> {
    const { data } = await authenticatedClient.get<{ success: boolean; data: ProductImage[] }>(
      `/product/${params.productId}/image`
    );
    return data.data;
  },
};
