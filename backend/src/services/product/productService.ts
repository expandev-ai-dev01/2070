/**
 * @summary
 * Business logic for Product entity.
 * Handles catalog display operations using in-memory storage.
 * All validation and business logic is centralized here.
 *
 * @module services/product/productService
 */

import { PRODUCT_DEFAULTS } from '@/constants';
import { productStore } from '@/instances';
import { ServiceError } from '@/utils';
import { ProductEntity, ProductListResponse, ProductListItem } from './productTypes';
import { listQuerySchema, productParamsSchema } from './productValidation';

/**
 * @summary
 * Lists products with filtering, sorting, and pagination.
 *
 * @function productList
 * @module services/product
 *
 * @param {unknown} query - Raw query parameters to validate
 * @returns {Promise<ProductListResponse>} Paginated list of products
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When query parameters fail validation
 *
 * @example
 * const result = await productList({ page: 1, pageSize: 9, sortBy: 'date_desc' });
 * // Returns: { items: [...], total: 50, page: 1, pageSize: 9, totalPages: 6, hasNext: true, hasPrevious: false }
 */
export async function productList(query: unknown): Promise<ProductListResponse> {
  const validation = listQuerySchema.safeParse(query);

  if (!validation.success) {
    throw new ServiceError(
      'VALIDATION_ERROR',
      'Invalid query parameters',
      400,
      validation.error.errors
    );
  }

  const params = validation.data;
  const page = params.page ?? PRODUCT_DEFAULTS.PAGE;
  const pageSize = params.pageSize ?? PRODUCT_DEFAULTS.PAGE_SIZE;
  const sortBy = params.sortBy ?? PRODUCT_DEFAULTS.SORT_BY;

  let products = productStore.getAll();

  // Apply search filter
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(searchLower) ||
        (p.description && p.description.toLowerCase().includes(searchLower))
    );
  }

  // Apply category filter
  if (params.category) {
    products = products.filter((p) => p.category === params.category);
  }

  // Apply sorting
  products.sort((a, b) => {
    switch (sortBy) {
      case 'name_asc':
        return a.name.localeCompare(b.name);
      case 'name_desc':
        return b.name.localeCompare(a.name);
      case 'date_asc':
        return new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime();
      case 'date_desc':
      default:
        return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
    }
  });

  // Calculate pagination
  const total = products.length;
  const totalPages = Math.ceil(total / pageSize);
  const offset = (page - 1) * pageSize;
  const paginatedProducts = products.slice(offset, offset + pageSize);

  // Map to list items
  const items: ProductListItem[] = paginatedProducts.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    imageUrl: p.imageUrl,
    dateCreated: p.dateCreated,
  }));

  return {
    items,
    total,
    page,
    pageSize,
    totalPages,
    hasNext: page < totalPages,
    hasPrevious: page > 1,
  };
}

/**
 * @summary
 * Retrieves a specific product by its unique identifier.
 *
 * @function productGet
 * @module services/product
 *
 * @param {unknown} params - Raw request params containing the ID to validate
 * @returns {Promise<ProductEntity>} The found product entity
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When ID parameter is invalid
 * @throws {ServiceError} NOT_FOUND (404) - When product with given ID does not exist
 *
 * @example
 * const product = await productGet({ id: '1' });
 * // Returns: { id: 1, name: 'Sofá Moderno', category: 'Sala de Estar', ... }
 */
export async function productGet(params: unknown): Promise<ProductEntity> {
  const validation = productParamsSchema.safeParse(params);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, validation.error.errors);
  }

  const { id } = validation.data;
  const record = productStore.getById(id);

  if (!record) {
    throw new ServiceError('NOT_FOUND', 'Product not found', 404);
  }

  return record as ProductEntity;
}
