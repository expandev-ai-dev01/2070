/**
 * @summary
 * Validation schemas for Category entity.
 * Centralizes all Zod validation logic for the service.
 *
 * @module services/category/categoryValidation
 */

import { z } from 'zod';
import { CATEGORY_LIMITS } from '@/constants';

/**
 * Schema for category create request validation
 */
export const createSchema = z.object({
  name: z.string().min(CATEGORY_LIMITS.NAME_MIN_LENGTH).max(CATEGORY_LIMITS.NAME_MAX_LENGTH),
  parentId: z.number().int().positive().nullable(),
  description: z.string().max(CATEGORY_LIMITS.DESCRIPTION_MAX_LENGTH).nullable(),
  imageUrl: z.string().max(CATEGORY_LIMITS.IMAGE_URL_MAX_LENGTH).nullable(),
  displayOrder: z.number().int().min(0).optional(),
  active: z.boolean().optional(),
  featured: z.boolean().optional(),
  metaTitle: z.string().max(CATEGORY_LIMITS.META_TITLE_MAX_LENGTH).nullable(),
  metaDescription: z.string().max(CATEGORY_LIMITS.META_DESCRIPTION_MAX_LENGTH).nullable(),
});

/**
 * Schema for category update request validation
 */
export const updateSchema = z.object({
  name: z.string().min(CATEGORY_LIMITS.NAME_MIN_LENGTH).max(CATEGORY_LIMITS.NAME_MAX_LENGTH),
  parentId: z.number().int().positive().nullable(),
  description: z.string().max(CATEGORY_LIMITS.DESCRIPTION_MAX_LENGTH).nullable(),
  imageUrl: z.string().max(CATEGORY_LIMITS.IMAGE_URL_MAX_LENGTH).nullable(),
  displayOrder: z.number().int().min(0),
  active: z.boolean(),
  featured: z.boolean(),
  metaTitle: z.string().max(CATEGORY_LIMITS.META_TITLE_MAX_LENGTH).nullable(),
  metaDescription: z.string().max(CATEGORY_LIMITS.META_DESCRIPTION_MAX_LENGTH).nullable(),
});

/**
 * Schema for category list query validation
 */
export const listQuerySchema = z.object({
  parentId: z.coerce.number().int().positive().optional(),
  activeOnly: z
    .string()
    .transform((val) => val === 'true')
    .optional(),
  featured: z
    .string()
    .transform((val) => val === 'true')
    .optional(),
});

/**
 * Schema for ID parameter validation
 */
export const categoryParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

/**
 * Schema for slug parameter validation
 */
export const categorySlugParamsSchema = z.object({
  slug: z.string().min(1).max(CATEGORY_LIMITS.SLUG_MAX_LENGTH),
});

/**
 * Inferred types from schemas
 */
export type CreateInput = z.infer<typeof createSchema>;
export type UpdateInput = z.infer<typeof updateSchema>;
export type ListQueryInput = z.infer<typeof listQuerySchema>;
export type CategoryParamsInput = z.infer<typeof categoryParamsSchema>;
export type CategorySlugParamsInput = z.infer<typeof categorySlugParamsSchema>;
