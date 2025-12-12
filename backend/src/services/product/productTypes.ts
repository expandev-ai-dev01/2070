/**
 * @summary
 * Type definitions for Product entity.
 *
 * @module services/product/productTypes
 */

/**
 * @interface ProductSpecifications
 * @description Product technical specifications
 */
export interface ProductSpecifications {
  dimensions: string | null;
  material: string | null;
}

/**
 * @interface ProductEntity
 * @description Represents a product entity
 */
export interface ProductEntity {
  id: number;
  name: string;
  description: string | null;
  category: string;
  imageUrl: string;
  additionalImages: string[];
  specifications: ProductSpecifications;
  dateCreated: string;
  dateModified: string;
}

/**
 * @interface ProductListItem
 * @description Response structure for product list items
 */
export interface ProductListItem {
  id: number;
  name: string;
  category: string;
  imageUrl: string;
  dateCreated: string;
}

/**
 * @interface ProductListResponse
 * @description Response structure for product listing with pagination
 */
export interface ProductListResponse {
  items: ProductListItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * @interface ProductListQuery
 * @description Query parameters for product listing
 */
export interface ProductListQuery {
  search?: string;
  category?: string;
  sortBy?: 'name_asc' | 'name_desc' | 'date_desc' | 'date_asc';
  page?: number;
  pageSize?: number;
}
