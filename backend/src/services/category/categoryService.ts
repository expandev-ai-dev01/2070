/**
 * @summary
 * Business logic for Category entity.
 * Handles category navigation and management operations using in-memory storage.
 * All validation and business logic is centralized here.
 *
 * @module services/category/categoryService
 */

import { CATEGORY_DEFAULTS } from '@/constants';
import { categoryStore } from '@/instances';
import { ServiceError } from '@/utils';
import { CategoryEntity, CategoryListItem, CategoryFeaturedItem } from './categoryTypes';
import {
  createSchema,
  updateSchema,
  listQuerySchema,
  categoryParamsSchema,
  categorySlugParamsSchema,
} from './categoryValidation';

/**
 * @summary
 * Generates URL-friendly slug from category name.
 *
 * @function generateSlug
 * @param {string} name - Category name
 * @returns {string} URL-friendly slug
 */
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * @summary
 * Calculates category level based on parent hierarchy.
 *
 * @function calculateLevel
 * @param {number | null} parentId - Parent category ID
 * @returns {number} Category level (1-3)
 */
function calculateLevel(parentId: number | null): number {
  if (parentId === null) {
    return 1;
  }

  const parent = categoryStore.getById(parentId);
  if (!parent) {
    throw new ServiceError('VALIDATION_ERROR', 'Parent category does not exist', 400);
  }

  const newLevel = parent.level + 1;
  if (newLevel > CATEGORY_DEFAULTS.MAX_HIERARCHY_LEVEL) {
    throw new ServiceError(
      'BUSINESS_RULE_ERROR',
      `Cannot create more than ${CATEGORY_DEFAULTS.MAX_HIERARCHY_LEVEL} levels of categories`,
      400
    );
  }

  return newLevel;
}

/**
 * @summary
 * Validates that category name is unique at the same hierarchy level.
 *
 * @function validateUniqueNameAtLevel
 * @param {string} name - Category name
 * @param {number | null} parentId - Parent category ID
 * @param {number} [excludeId] - Category ID to exclude from check (for updates)
 * @throws {ServiceError} When name already exists at the same level
 */
function validateUniqueNameAtLevel(
  name: string,
  parentId: number | null,
  excludeId?: number
): void {
  const categories = categoryStore.getAll();
  const duplicate = categories.find(
    (c) =>
      c.name.toLowerCase() === name.toLowerCase() && c.parentId === parentId && c.id !== excludeId
  );

  if (duplicate) {
    throw new ServiceError(
      'BUSINESS_RULE_ERROR',
      'A category with this name already exists at this level',
      400
    );
  }
}

/**
 * @summary
 * Validates that slug is unique across all categories.
 *
 * @function validateUniqueSlug
 * @param {string} slug - Category slug
 * @param {number} [excludeId] - Category ID to exclude from check (for updates)
 * @throws {ServiceError} When slug already exists
 */
function validateUniqueSlug(slug: string, excludeId?: number): void {
  const categories = categoryStore.getAll();
  const duplicate = categories.find((c) => c.slug === slug && c.id !== excludeId);

  if (duplicate) {
    throw new ServiceError('BUSINESS_RULE_ERROR', 'A category with this slug already exists', 400);
  }
}

/**
 * @summary
 * Validates that a category is not being set as its own parent (prevents cycles).
 *
 * @function validateNoCycle
 * @param {number} categoryId - Category ID
 * @param {number | null} parentId - Parent category ID
 * @throws {ServiceError} When cycle is detected
 */
function validateNoCycle(categoryId: number, parentId: number | null): void {
  if (parentId === null) {
    return;
  }

  if (parentId === categoryId) {
    throw new ServiceError('BUSINESS_RULE_ERROR', 'A category cannot be its own parent', 400);
  }

  // Check if parentId is a descendant of categoryId
  let currentParentId: number | null = parentId;
  const visited = new Set<number>();

  while (currentParentId !== null) {
    if (visited.has(currentParentId)) {
      throw new ServiceError('BUSINESS_RULE_ERROR', 'Circular reference detected', 400);
    }
    visited.add(currentParentId);

    if (currentParentId === categoryId) {
      throw new ServiceError(
        'BUSINESS_RULE_ERROR',
        'Cannot create circular category hierarchy',
        400
      );
    }

    const parent = categoryStore.getById(currentParentId);
    if (!parent) {
      break;
    }
    currentParentId = parent.parentId;
  }
}

/**
 * @summary
 * Updates product count for a category and its ancestors.
 *
 * @function updateProductCount
 * @param {number} categoryId - Category ID
 * @param {number} delta - Change in product count (+1 or -1)
 */
function updateProductCount(categoryId: number, delta: number): void {
  const category = categoryStore.getById(categoryId);
  if (!category) {
    return;
  }

  categoryStore.update(categoryId, {
    productCount: Math.max(0, category.productCount + delta),
  });

  // Update parent categories recursively
  if (category.parentId !== null) {
    updateProductCount(category.parentId, delta);
  }
}

/**
 * @summary
 * Lists categories with optional filtering.
 *
 * @function categoryList
 * @module services/category
 *
 * @param {unknown} query - Raw query parameters to validate
 * @returns {Promise<{ items: CategoryListItem[] }>} List of categories
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When query parameters fail validation
 *
 * @example
 * const result = await categoryList({ parentId: 1, activeOnly: true });
 * // Returns: { items: [{ id: 2, name: 'Subcategory', ... }] }
 */
export async function categoryList(query: unknown): Promise<{ items: CategoryListItem[] }> {
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
  let categories = categoryStore.getAll();

  // Apply filters
  if (params.parentId !== undefined) {
    categories = categories.filter((c) => c.parentId === params.parentId);
  }

  if (params.activeOnly !== false) {
    categories = categories.filter((c) => c.active);
  }

  if (params.featured === true) {
    categories = categories.filter((c) => c.featured);
  }

  // Sort by display order, then by name
  categories.sort((a, b) => {
    if (a.displayOrder !== b.displayOrder) {
      return a.displayOrder - b.displayOrder;
    }
    return a.name.localeCompare(b.name);
  });

  const items: CategoryListItem[] = categories.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    parentId: c.parentId,
    level: c.level,
    description: c.description,
    imageUrl: c.imageUrl,
    displayOrder: c.displayOrder,
    active: c.active,
    featured: c.featured,
    productCount: c.productCount,
    dateCreated: c.dateCreated,
  }));

  return { items };
}

/**
 * @summary
 * Gets featured categories for homepage display.
 *
 * @function categoryGetFeatured
 * @module services/category
 *
 * @returns {Promise<CategoryFeaturedItem[]>} List of featured categories
 *
 * @example
 * const featured = await categoryGetFeatured();
 * // Returns: [{ id: 1, name: 'Featured Category', ... }]
 */
export async function categoryGetFeatured(): Promise<CategoryFeaturedItem[]> {
  const categories = categoryStore
    .getAll()
    .filter((c) => c.active && c.featured)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return categories.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description,
    imageUrl: c.imageUrl,
    productCount: c.productCount,
  }));
}

/**
 * @summary
 * Retrieves a specific category by its slug.
 *
 * @function categoryGetBySlug
 * @module services/category
 *
 * @param {unknown} params - Raw request params containing the slug to validate
 * @returns {Promise<CategoryEntity>} The found category entity
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When slug parameter is invalid
 * @throws {ServiceError} NOT_FOUND (404) - When category with given slug does not exist
 *
 * @example
 * const category = await categoryGetBySlug({ slug: 'sala-de-estar' });
 * // Returns: { id: 1, name: 'Sala de Estar', slug: 'sala-de-estar', ... }
 */
export async function categoryGetBySlug(params: unknown): Promise<CategoryEntity> {
  const validation = categorySlugParamsSchema.safeParse(params);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid slug', 400, validation.error.errors);
  }

  const { slug } = validation.data;
  const record = categoryStore.getBySlug(slug);

  if (!record) {
    throw new ServiceError('NOT_FOUND', 'Category not found', 404);
  }

  return record as CategoryEntity;
}

/**
 * @summary
 * Retrieves a specific category by its unique identifier.
 *
 * @function categoryGet
 * @module services/category
 *
 * @param {unknown} params - Raw request params containing the ID to validate
 * @returns {Promise<CategoryEntity>} The found category entity
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When ID parameter is invalid
 * @throws {ServiceError} NOT_FOUND (404) - When category with given ID does not exist
 *
 * @example
 * const category = await categoryGet({ id: '1' });
 * // Returns: { id: 1, name: 'Sala de Estar', ... }
 */
export async function categoryGet(params: unknown): Promise<CategoryEntity> {
  const validation = categoryParamsSchema.safeParse(params);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, validation.error.errors);
  }

  const { id } = validation.data;
  const record = categoryStore.getById(id);

  if (!record) {
    throw new ServiceError('NOT_FOUND', 'Category not found', 404);
  }

  return record as CategoryEntity;
}

/**
 * @summary
 * Creates a new category entity with validated data.
 *
 * @function categoryCreate
 * @module services/category
 *
 * @param {unknown} body - Raw request body to validate against createSchema
 * @returns {Promise<CategoryEntity>} The newly created category entity
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When body fails schema validation
 * @throws {ServiceError} BUSINESS_RULE_ERROR (400) - When business rules are violated
 *
 * @example
 * const newCategory = await categoryCreate({ name: 'Sala de Estar', parentId: null });
 * // Returns: { id: 1, name: 'Sala de Estar', slug: 'sala-de-estar', ... }
 */
export async function categoryCreate(body: unknown): Promise<CategoryEntity> {
  const validation = createSchema.safeParse(body);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Validation failed', 400, validation.error.errors);
  }

  const params = validation.data;

  // Validate business rules
  validateUniqueNameAtLevel(params.name, params.parentId);
  const slug = generateSlug(params.name);
  validateUniqueSlug(slug);
  const level = calculateLevel(params.parentId);

  const now = new Date().toISOString();
  const id = categoryStore.getNextId();

  const newCategory: CategoryEntity = {
    id,
    name: params.name,
    slug,
    parentId: params.parentId,
    level,
    description: params.description,
    imageUrl: params.imageUrl,
    displayOrder: params.displayOrder ?? CATEGORY_DEFAULTS.DISPLAY_ORDER,
    active: params.active ?? CATEGORY_DEFAULTS.ACTIVE,
    featured: params.featured ?? CATEGORY_DEFAULTS.FEATURED,
    metaTitle: params.metaTitle,
    metaDescription: params.metaDescription,
    productCount: 0,
    dateCreated: now,
    dateModified: now,
  };

  categoryStore.add(newCategory);
  return newCategory;
}

/**
 * @summary
 * Updates an existing category entity with new data.
 *
 * @function categoryUpdate
 * @module services/category
 *
 * @param {unknown} params - Raw request params containing the ID to validate
 * @param {unknown} body - Raw request body with update data to validate
 * @returns {Promise<CategoryEntity>} The updated category entity
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When ID or body fails validation
 * @throws {ServiceError} NOT_FOUND (404) - When category with given ID does not exist
 * @throws {ServiceError} BUSINESS_RULE_ERROR (400) - When business rules are violated
 *
 * @example
 * const updated = await categoryUpdate({ id: '1' }, { name: 'Updated Name', active: false });
 * // Returns: { id: 1, name: 'Updated Name', active: false, ... }
 */
export async function categoryUpdate(params: unknown, body: unknown): Promise<CategoryEntity> {
  const paramsValidation = categoryParamsSchema.safeParse(params);

  if (!paramsValidation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, paramsValidation.error.errors);
  }

  const bodyValidation = updateSchema.safeParse(body);

  if (!bodyValidation.success) {
    throw new ServiceError(
      'VALIDATION_ERROR',
      'Validation failed',
      400,
      bodyValidation.error.errors
    );
  }

  const { id } = paramsValidation.data;
  const existing = categoryStore.getById(id);

  if (!existing) {
    throw new ServiceError('NOT_FOUND', 'Category not found', 404);
  }

  const updateData = bodyValidation.data;

  // Validate business rules
  validateUniqueNameAtLevel(updateData.name, updateData.parentId, id);
  validateNoCycle(id, updateData.parentId);

  const slug = generateSlug(updateData.name);
  validateUniqueSlug(slug, id);

  const level = calculateLevel(updateData.parentId);

  const updated = categoryStore.update(id, {
    name: updateData.name,
    slug,
    parentId: updateData.parentId,
    level,
    description: updateData.description,
    imageUrl: updateData.imageUrl,
    displayOrder: updateData.displayOrder,
    active: updateData.active,
    featured: updateData.featured,
    metaTitle: updateData.metaTitle,
    metaDescription: updateData.metaDescription,
    dateModified: new Date().toISOString(),
  });

  return updated as CategoryEntity;
}

/**
 * @summary
 * Permanently deletes a category entity by its ID.
 *
 * @function categoryDelete
 * @module services/category
 *
 * @param {unknown} params - Raw request params containing the ID to validate
 * @returns {Promise<{ message: string }>} Success confirmation message
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When ID parameter is invalid
 * @throws {ServiceError} NOT_FOUND (404) - When category with given ID does not exist
 * @throws {ServiceError} BUSINESS_RULE_ERROR (400) - When category has subcategories
 *
 * @example
 * const result = await categoryDelete({ id: '1' });
 * // Returns: { message: 'Category deleted successfully' }
 */
export async function categoryDelete(params: unknown): Promise<{ message: string }> {
  const validation = categoryParamsSchema.safeParse(params);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, validation.error.errors);
  }

  const { id } = validation.data;

  if (!categoryStore.exists(id)) {
    throw new ServiceError('NOT_FOUND', 'Category not found', 404);
  }

  // Check if category has subcategories
  const subcategories = categoryStore.getAll().filter((c) => c.parentId === id);
  if (subcategories.length > 0) {
    throw new ServiceError('BUSINESS_RULE_ERROR', 'Cannot delete category with subcategories', 400);
  }

  categoryStore.delete(id);
  return { message: 'Category deleted successfully' };
}

/**
 * @summary
 * Associates a product with a category and updates product count.
 * Called by product service when products are created/updated.
 *
 * @function categoryAddProduct
 * @module services/category
 *
 * @param {number} categoryId - Category ID
 *
 * @throws {ServiceError} NOT_FOUND (404) - When category does not exist
 */
export async function categoryAddProduct(categoryId: number): Promise<void> {
  if (!categoryStore.exists(categoryId)) {
    throw new ServiceError('NOT_FOUND', 'Category not found', 404);
  }

  updateProductCount(categoryId, 1);
}

/**
 * @summary
 * Removes a product from a category and updates product count.
 * Called by product service when products are deleted/updated.
 *
 * @function categoryRemoveProduct
 * @module services/category
 *
 * @param {number} categoryId - Category ID
 *
 * @throws {ServiceError} NOT_FOUND (404) - When category does not exist
 */
export async function categoryRemoveProduct(categoryId: number): Promise<void> {
  if (!categoryStore.exists(categoryId)) {
    throw new ServiceError('NOT_FOUND', 'Category not found', 404);
  }

  updateProductCount(categoryId, -1);
}
