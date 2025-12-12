/**
 * @summary
 * Default values and constants for Category entity.
 * Provides centralized configuration for category management,
 * hierarchy rules, and validation limits.
 *
 * @module constants/category/categoryDefaults
 */

/**
 * @interface CategoryDefaultsType
 * @description Default configuration values for category management.
 *
 * @property {boolean} ACTIVE - Default active status for new categories (true)
 * @property {boolean} FEATURED - Default featured status for new categories (false)
 * @property {number} DISPLAY_ORDER - Default display order for new categories (0)
 * @property {number} MAX_HIERARCHY_LEVEL - Maximum hierarchy depth allowed (3)
 * @property {number} MAX_RECORDS - Maximum number of categories allowed in memory storage (1000)
 */
export const CATEGORY_DEFAULTS = {
  /** Default active status for new categories */
  ACTIVE: true,
  /** Default featured status for new categories */
  FEATURED: false,
  /** Default display order for new categories */
  DISPLAY_ORDER: 0,
  /** Maximum hierarchy depth (1 = top-level, 2 = subcategory, 3 = sub-subcategory) */
  MAX_HIERARCHY_LEVEL: 3,
  /** Maximum allowed categories in memory */
  MAX_RECORDS: 1000,
} as const;

/** Type representing the CATEGORY_DEFAULTS constant */
export type CategoryDefaultsType = typeof CATEGORY_DEFAULTS;

/**
 * @interface CategoryLimitsType
 * @description Validation constraints for Category entity fields.
 *
 * @property {number} NAME_MIN_LENGTH - Minimum characters for name field (2)
 * @property {number} NAME_MAX_LENGTH - Maximum characters for name field (50)
 * @property {number} SLUG_MAX_LENGTH - Maximum characters for slug field (60)
 * @property {number} DESCRIPTION_MAX_LENGTH - Maximum characters for description field (500)
 * @property {number} IMAGE_URL_MAX_LENGTH - Maximum characters for image URL (500)
 * @property {number} META_TITLE_MAX_LENGTH - Maximum characters for SEO title (70)
 * @property {number} META_DESCRIPTION_MAX_LENGTH - Maximum characters for SEO description (160)
 */
export const CATEGORY_LIMITS = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  SLUG_MAX_LENGTH: 60,
  DESCRIPTION_MAX_LENGTH: 500,
  IMAGE_URL_MAX_LENGTH: 500,
  META_TITLE_MAX_LENGTH: 70,
  META_DESCRIPTION_MAX_LENGTH: 160,
} as const;

/** Type representing the CATEGORY_LIMITS constant */
export type CategoryLimitsType = typeof CATEGORY_LIMITS;
