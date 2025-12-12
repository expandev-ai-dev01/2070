import type { CategoryListItem, Category, FeaturedCategory } from './models';

export interface CategoryListParams {
  parentId?: number;
  activeOnly?: boolean;
  featured?: boolean;
}

export interface CategoryListResponse {
  items: CategoryListItem[];
}

export interface CategoryBySlugParams {
  slug: string;
}

export interface CategoryByIdParams {
  id: number;
}

export interface CategoryResponse {
  data: Category;
}

export interface FeaturedCategoriesResponse {
  data: FeaturedCategory[];
}
