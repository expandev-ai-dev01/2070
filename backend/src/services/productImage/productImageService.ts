/**
 * @summary
 * Business logic for Product Image entity.
 * Handles product image gallery operations using in-memory storage.
 * All validation and business logic is centralized here.
 *
 * @module services/productImage/productImageService
 */

import { PRODUCT_IMAGE_DEFAULTS } from '@/constants';
import { productImageStore, productStore } from '@/instances';
import { ServiceError } from '@/utils';
import { ProductImageEntity } from './productImageTypes';
import {
  createSchema,
  updateSchema,
  productImageParamsSchema,
  productIdParamsSchema,
  reorderSchema,
} from './productImageValidation';

/**
 * @summary
 * Lists all images for a specific product.
 *
 * @function productImageList
 * @module services/productImage
 *
 * @param {unknown} params - Raw request params containing productId
 * @returns {Promise<ProductImageEntity[]>} List of product images ordered by displayOrder
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When productId is invalid
 * @throws {ServiceError} NOT_FOUND (404) - When product does not exist
 *
 * @example
 * const images = await productImageList({ productId: '1' });
 * // Returns: [{ id: 1, productId: 1, imageUrl: '...', displayOrder: 1, ... }]
 */
export async function productImageList(params: unknown): Promise<ProductImageEntity[]> {
  const validation = productIdParamsSchema.safeParse(params);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid product ID', 400, validation.error.errors);
  }

  const { productId } = validation.data;

  // Verify product exists
  if (!productStore.exists(productId)) {
    throw new ServiceError('NOT_FOUND', 'Product not found', 404);
  }

  const images = productImageStore
    .getAll()
    .filter((img) => img.productId === productId)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return images;
}

/**
 * @summary
 * Retrieves a specific product image by its ID.
 *
 * @function productImageGet
 * @module services/productImage
 *
 * @param {unknown} params - Raw request params containing the image ID
 * @returns {Promise<ProductImageEntity>} The found product image entity
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When ID parameter is invalid
 * @throws {ServiceError} NOT_FOUND (404) - When image with given ID does not exist
 *
 * @example
 * const image = await productImageGet({ id: '1' });
 * // Returns: { id: 1, productId: 1, imageUrl: '...', ... }
 */
export async function productImageGet(params: unknown): Promise<ProductImageEntity> {
  const validation = productImageParamsSchema.safeParse(params);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, validation.error.errors);
  }

  const { id } = validation.data;
  const record = productImageStore.getById(id);

  if (!record) {
    throw new ServiceError('NOT_FOUND', 'Product image not found', 404);
  }

  return record as ProductImageEntity;
}

/**
 * @summary
 * Creates a new product image entity.
 *
 * @function productImageCreate
 * @module services/productImage
 *
 * @param {unknown} params - Raw request params containing productId
 * @param {unknown} body - Raw request body to validate
 * @returns {Promise<ProductImageEntity>} The newly created product image entity
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When params or body fail validation
 * @throws {ServiceError} NOT_FOUND (404) - When product does not exist
 * @throws {ServiceError} BUSINESS_RULE_ERROR (400) - When business rules are violated
 *
 * @example
 * const newImage = await productImageCreate(
 *   { productId: '1' },
 *   { imageUrl: 'https://...', viewAngle: 'frontal', altText: 'Front view' }
 * );
 */
export async function productImageCreate(
  params: unknown,
  body: unknown
): Promise<ProductImageEntity> {
  const paramsValidation = productIdParamsSchema.safeParse(params);

  if (!paramsValidation.success) {
    throw new ServiceError(
      'VALIDATION_ERROR',
      'Invalid product ID',
      400,
      paramsValidation.error.errors
    );
  }

  const bodyValidation = createSchema.safeParse(body);

  if (!bodyValidation.success) {
    throw new ServiceError(
      'VALIDATION_ERROR',
      'Validation failed',
      400,
      bodyValidation.error.errors
    );
  }

  const { productId } = paramsValidation.data;
  const imageData = bodyValidation.data;

  // Verify product exists
  if (!productStore.exists(productId)) {
    throw new ServiceError('NOT_FOUND', 'Product not found', 404);
  }

  // Check maximum images limit
  const existingImages = productImageStore.getAll().filter((img) => img.productId === productId);
  if (existingImages.length >= PRODUCT_IMAGE_DEFAULTS.MAX_IMAGES_PER_PRODUCT) {
    throw new ServiceError(
      'BUSINESS_RULE_ERROR',
      `Maximum of ${PRODUCT_IMAGE_DEFAULTS.MAX_IMAGES_PER_PRODUCT} images per product`,
      400
    );
  }

  // Auto-assign display order if not provided
  const displayOrder =
    imageData.displayOrder ??
    (existingImages.length > 0
      ? Math.max(...existingImages.map((img) => img.displayOrder)) + 1
      : 1);

  const now = new Date().toISOString();
  const id = productImageStore.getNextId();

  const newImage: ProductImageEntity = {
    id,
    productId,
    imageUrl: imageData.imageUrl,
    thumbnailUrl: imageData.thumbnailUrl,
    highResUrl: imageData.highResUrl,
    displayOrder,
    caption: imageData.caption,
    altText: imageData.altText,
    viewAngle: imageData.viewAngle,
    dateCreated: now,
    dateModified: now,
  };

  productImageStore.add(newImage);
  return newImage;
}

/**
 * @summary
 * Updates an existing product image entity.
 *
 * @function productImageUpdate
 * @module services/productImage
 *
 * @param {unknown} params - Raw request params containing the image ID
 * @param {unknown} body - Raw request body with update data
 * @returns {Promise<ProductImageEntity>} The updated product image entity
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When ID or body fails validation
 * @throws {ServiceError} NOT_FOUND (404) - When image does not exist
 *
 * @example
 * const updated = await productImageUpdate(
 *   { id: '1' },
 *   { caption: 'Updated caption', displayOrder: 2 }
 * );
 */
export async function productImageUpdate(
  params: unknown,
  body: unknown
): Promise<ProductImageEntity> {
  const paramsValidation = productImageParamsSchema.safeParse(params);

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
  const existing = productImageStore.getById(id);

  if (!existing) {
    throw new ServiceError('NOT_FOUND', 'Product image not found', 404);
  }

  const updateData = bodyValidation.data;

  const updated = productImageStore.update(id, {
    imageUrl: updateData.imageUrl,
    thumbnailUrl: updateData.thumbnailUrl,
    highResUrl: updateData.highResUrl,
    displayOrder: updateData.displayOrder,
    caption: updateData.caption,
    altText: updateData.altText,
    viewAngle: updateData.viewAngle,
    dateModified: new Date().toISOString(),
  });

  return updated as ProductImageEntity;
}

/**
 * @summary
 * Deletes a product image by its ID.
 *
 * @function productImageDelete
 * @module services/productImage
 *
 * @param {unknown} params - Raw request params containing the image ID
 * @returns {Promise<{ message: string }>} Success confirmation message
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When ID parameter is invalid
 * @throws {ServiceError} NOT_FOUND (404) - When image does not exist
 * @throws {ServiceError} BUSINESS_RULE_ERROR (400) - When trying to delete the last image
 *
 * @example
 * const result = await productImageDelete({ id: '1' });
 * // Returns: { message: 'Product image deleted successfully' }
 */
export async function productImageDelete(params: unknown): Promise<{ message: string }> {
  const validation = productImageParamsSchema.safeParse(params);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, validation.error.errors);
  }

  const { id } = validation.data;
  const existing = productImageStore.getById(id);

  if (!existing) {
    throw new ServiceError('NOT_FOUND', 'Product image not found', 404);
  }

  // Check if this is the last image for the product
  const productImages = productImageStore
    .getAll()
    .filter((img) => img.productId === existing.productId);

  if (productImages.length === 1) {
    throw new ServiceError('BUSINESS_RULE_ERROR', 'Cannot delete the last image of a product', 400);
  }

  productImageStore.delete(id);
  return { message: 'Product image deleted successfully' };
}

/**
 * @summary
 * Reorders product images by updating their display order.
 *
 * @function productImageReorder
 * @module services/productImage
 *
 * @param {unknown} params - Raw request params containing productId
 * @param {unknown} body - Raw request body with new order
 * @returns {Promise<{ message: string }>} Success confirmation message
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When params or body fail validation
 * @throws {ServiceError} NOT_FOUND (404) - When product does not exist
 * @throws {ServiceError} BUSINESS_RULE_ERROR (400) - When image IDs don't match product
 *
 * @example
 * const result = await productImageReorder(
 *   { productId: '1' },
 *   { imageOrder: [{ id: 2, displayOrder: 1 }, { id: 1, displayOrder: 2 }] }
 * );
 */
export async function productImageReorder(
  params: unknown,
  body: unknown
): Promise<{ message: string }> {
  const paramsValidation = productIdParamsSchema.safeParse(params);

  if (!paramsValidation.success) {
    throw new ServiceError(
      'VALIDATION_ERROR',
      'Invalid product ID',
      400,
      paramsValidation.error.errors
    );
  }

  const bodyValidation = reorderSchema.safeParse(body);

  if (!bodyValidation.success) {
    throw new ServiceError(
      'VALIDATION_ERROR',
      'Validation failed',
      400,
      bodyValidation.error.errors
    );
  }

  const { productId } = paramsValidation.data;
  const { imageOrder } = bodyValidation.data;

  // Verify product exists
  if (!productStore.exists(productId)) {
    throw new ServiceError('NOT_FOUND', 'Product not found', 404);
  }

  // Verify all images belong to the product
  for (const item of imageOrder) {
    const image = productImageStore.getById(item.id);
    if (!image || image.productId !== productId) {
      throw new ServiceError(
        'BUSINESS_RULE_ERROR',
        `Image ${item.id} does not belong to product ${productId}`,
        400
      );
    }
  }

  // Update display orders
  for (const item of imageOrder) {
    productImageStore.update(item.id, {
      displayOrder: item.displayOrder,
      dateModified: new Date().toISOString(),
    });
  }

  return { message: 'Product images reordered successfully' };
}
