/**
 * @summary
 * Validation schemas for Product entity.
 * Centralizes all Zod validation logic for the service.
 *
 * @module services/product/productValidation
 */

import { z } from 'zod';
import { PRODUCT_LIMITS } from '@/constants';

/**
 * Schema for product list query validation
 */
export const listQuerySchema = z.object({
  search: z.string().max(PRODUCT_LIMITS.SEARCH_MAX_LENGTH).optional(),
  category: z.string().max(PRODUCT_LIMITS.CATEGORY_MAX_LENGTH).optional(),
  sortBy: z.enum(['name_asc', 'name_desc', 'date_desc', 'date_asc']).optional(),
  page: z.coerce.number().int().positive().optional(),
  pageSize: z.coerce
    .number()
    .int()
    .positive()
    .refine((val) => [9, 18, 27, 36].includes(val), {
      message: 'Page size must be 9, 18, 27, or 36',
    })
    .optional(),
});

/**
 * Schema for ID parameter validation
 */
export const productParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

/**
 * Inferred types from schemas
 */
export type ListQueryInput = z.infer<typeof listQuerySchema>;
export type ProductParamsInput = z.infer<typeof productParamsSchema>;
