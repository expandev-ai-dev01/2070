/**
 * @summary
 * Validation schemas for Product Image entity.
 * Centralizes all Zod validation logic for the service.
 *
 * @module services/productImage/productImageValidation
 */

import { z } from 'zod';
import { PRODUCT_IMAGE_LIMITS } from '@/constants';

/**
 * Valid view angles enum
 */
const viewAngleEnum = z.enum([
  'frontal',
  'lateral_esquerda',
  'lateral_direita',
  'superior',
  'inferior',
  'traseira',
  'detalhe',
  'ambiente',
]);

/**
 * Schema for product image create request validation
 */
export const createSchema = z.object({
  imageUrl: z.string().min(1).max(PRODUCT_IMAGE_LIMITS.IMAGE_URL_MAX_LENGTH),
  thumbnailUrl: z.string().min(1).max(PRODUCT_IMAGE_LIMITS.IMAGE_URL_MAX_LENGTH),
  highResUrl: z.string().min(1).max(PRODUCT_IMAGE_LIMITS.IMAGE_URL_MAX_LENGTH),
  displayOrder: z.number().int().positive().optional(),
  caption: z.string().max(PRODUCT_IMAGE_LIMITS.CAPTION_MAX_LENGTH).nullable(),
  altText: z.string().min(1).max(PRODUCT_IMAGE_LIMITS.ALT_TEXT_MAX_LENGTH),
  viewAngle: viewAngleEnum,
});

/**
 * Schema for product image update request validation
 */
export const updateSchema = z.object({
  imageUrl: z.string().min(1).max(PRODUCT_IMAGE_LIMITS.IMAGE_URL_MAX_LENGTH),
  thumbnailUrl: z.string().min(1).max(PRODUCT_IMAGE_LIMITS.IMAGE_URL_MAX_LENGTH),
  highResUrl: z.string().min(1).max(PRODUCT_IMAGE_LIMITS.IMAGE_URL_MAX_LENGTH),
  displayOrder: z.number().int().positive(),
  caption: z.string().max(PRODUCT_IMAGE_LIMITS.CAPTION_MAX_LENGTH).nullable(),
  altText: z.string().min(1).max(PRODUCT_IMAGE_LIMITS.ALT_TEXT_MAX_LENGTH),
  viewAngle: viewAngleEnum,
});

/**
 * Schema for reorder request validation
 */
export const reorderSchema = z.object({
  imageOrder: z.array(
    z.object({
      id: z.number().int().positive(),
      displayOrder: z.number().int().positive(),
    })
  ),
});

/**
 * Schema for image ID parameter validation
 */
export const productImageParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

/**
 * Schema for product ID parameter validation
 */
export const productIdParamsSchema = z.object({
  productId: z.coerce.number().int().positive(),
});

/**
 * Inferred types from schemas
 */
export type CreateInput = z.infer<typeof createSchema>;
export type UpdateInput = z.infer<typeof updateSchema>;
export type ReorderInput = z.infer<typeof reorderSchema>;
export type ProductImageParamsInput = z.infer<typeof productImageParamsSchema>;
export type ProductIdParamsInput = z.infer<typeof productIdParamsSchema>;
