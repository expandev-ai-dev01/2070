/**
 * @summary
 * Type definitions for Category entity.
 *
 * @module services/category/categoryTypes
 */

/**
 * @interface CategoryEntity
 * @description Represents a category entity with full details
 */
export interface CategoryEntity {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  level: number;
  description: string | null;
  imageUrl: string | null;
  displayOrder: number;
  active: boolean;
  featured: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  productCount: number;
  dateCreated: string;
  dateModified: string;
}

/**
 * @interface CategoryListItem
 * @description Response structure for category list items
 */
export interface CategoryListItem {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  level: number;
  description: string | null;
  imageUrl: string | null;
  displayOrder: number;
  active: boolean;
  featured: boolean;
  productCount: number;
  dateCreated: string;
}

/**
 * @interface CategoryFeaturedItem
 * @description Response structure for featured categories
 */
export interface CategoryFeaturedItem {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  productCount: number;
}

/**
 * @interface CategoryCreateRequest
 * @description Request payload for creating a category
 */
export interface CategoryCreateRequest {
  name: string;
  parentId: number | null;
  description: string | null;
  imageUrl: string | null;
  displayOrder?: number;
  active?: boolean;
  featured?: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
}

/**
 * @interface CategoryUpdateRequest
 * @description Request payload for updating a category
 */
export interface CategoryUpdateRequest {
  name: string;
  parentId: number | null;
  description: string | null;
  imageUrl: string | null;
  displayOrder: number;
  active: boolean;
  featured: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
}

/**
 * @interface CategoryListQuery
 * @description Query parameters for category listing
 */
export interface CategoryListQuery {
  parentId?: number;
  activeOnly?: boolean;
  featured?: boolean;
}
