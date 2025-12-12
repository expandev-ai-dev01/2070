/**
 * @service CategoryService
 * @domain category
 * @type REST API
 */
import { authenticatedClient } from '@/core/lib/api';
import type {
  CategoryListParams,
  CategoryListResponse,
  CategoryBySlugParams,
  CategoryByIdParams,
  FeaturedCategoriesResponse,
} from '../types/api';
import type { Category } from '../types/models';

export const categoryService = {
  /**
   * List categories with optional filters
   */
  async list(params?: CategoryListParams): Promise<CategoryListResponse> {
    const { data } = await authenticatedClient.get<{
      success: boolean;
      data: CategoryListResponse;
    }>('/category', { params });
    return data.data;
  },

  /**
   * Get featured categories for homepage
   */
  async getFeatured(): Promise<FeaturedCategoriesResponse> {
    const { data } = await authenticatedClient.get<{
      success: boolean;
      data: FeaturedCategoriesResponse;
    }>('/category/featured');
    return data.data;
  },

  /**
   * Get category by slug
   */
  async getBySlug(params: CategoryBySlugParams): Promise<Category> {
    const { data } = await authenticatedClient.get<{ success: boolean; data: Category }>(
      `/category/slug/${params.slug}`
    );
    return data.data;
  },

  /**
   * Get category by ID
   */
  async getById(params: CategoryByIdParams): Promise<Category> {
    const { data } = await authenticatedClient.get<{ success: boolean; data: Category }>(
      `/category/${params.id}`
    );
    return data.data;
  },
};
