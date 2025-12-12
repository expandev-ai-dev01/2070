/**
 * @summary
 * Default values and constants for Product entity.
 * Provides centralized configuration for catalog display, pagination,
 * and validation limits.
 *
 * @module constants/product/productDefaults
 */

/**
 * @interface ProductDefaultsType
 * @description Default configuration values for product catalog display.
 *
 * @property {number} PAGE - Default page number for pagination (1)
 * @property {number} PAGE_SIZE - Default items per page (9)
 * @property {string} SORT_BY - Default sort order ('date_desc')
 * @property {number} MAX_RECORDS - Maximum number of products allowed in memory storage (10000)
 */
export const PRODUCT_DEFAULTS = {
  /** Default page number */
  PAGE: 1,
  /** Default items per page */
  PAGE_SIZE: 9,
  /** Default sort order (most recent first) */
  SORT_BY: 'date_desc' as const,
  /** Maximum allowed products in memory */
  MAX_RECORDS: 10000,
} as const;

/** Type representing the PRODUCT_DEFAULTS constant */
export type ProductDefaultsType = typeof PRODUCT_DEFAULTS;

/**
 * @interface ProductLimitsType
 * @description Validation constraints for Product entity fields.
 *
 * @property {number} NAME_MIN_LENGTH - Minimum characters for name field (1)
 * @property {number} NAME_MAX_LENGTH - Maximum characters for name field (200)
 * @property {number} DESCRIPTION_MAX_LENGTH - Maximum characters for description field (5000)
 * @property {number} CATEGORY_MAX_LENGTH - Maximum characters for category field (100)
 * @property {number} IMAGE_URL_MAX_LENGTH - Maximum characters for image URL (500)
 * @property {number} SEARCH_MAX_LENGTH - Maximum characters for search query (200)
 * @property {number} DIMENSIONS_MAX_LENGTH - Maximum characters for dimensions (200)
 * @property {number} MATERIAL_MAX_LENGTH - Maximum characters for material (200)
 */
export const PRODUCT_LIMITS = {
  NAME_MIN_LENGTH: 1,
  NAME_MAX_LENGTH: 200,
  DESCRIPTION_MAX_LENGTH: 5000,
  CATEGORY_MAX_LENGTH: 100,
  IMAGE_URL_MAX_LENGTH: 500,
  SEARCH_MAX_LENGTH: 200,
  DIMENSIONS_MAX_LENGTH: 200,
  MATERIAL_MAX_LENGTH: 200,
} as const;

/** Type representing the PRODUCT_LIMITS constant */
export type ProductLimitsType = typeof PRODUCT_LIMITS;
