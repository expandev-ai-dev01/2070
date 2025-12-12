/**
 * @service ProductService
 * @domain product
 * @type REST API
 */
import { authenticatedClient } from '@/core/lib/api';
import type { ProductListParams, ProductListResponse } from '../types/api';
import type { Product } from '../types/models';

export const productService = {
  /**
   * List products with pagination, search, and sorting
   */
  async list(params?: ProductListParams): Promise<ProductListResponse> {
    const { data } = await authenticatedClient.get<{ success: boolean; data: ProductListResponse }>(
      '/product',
      { params }
    );
    return data.data;
  },

  /**
   * Get product details by ID
   */
  async getById(id: number): Promise<Product> {
    const { data } = await authenticatedClient.get<{ success: boolean; data: Product }>(
      `/product/${id}`
    );
    return data.data;
  },
};
