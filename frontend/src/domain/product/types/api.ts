import type { ProductListItem } from './models';

export interface ProductListParams {
  search?: string;
  category?: string;
  sortBy?: 'name_asc' | 'name_desc' | 'date_desc' | 'date_asc';
  page?: number;
  pageSize?: 9 | 18 | 27 | 36;
}

export interface ProductListResponse {
  items: ProductListItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
