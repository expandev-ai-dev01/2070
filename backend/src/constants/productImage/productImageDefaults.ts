/**
 * @summary
 * Default values and constants for Product Image entity.
 * Provides centralized configuration for image gallery management.
 *
 * @module constants/productImage/productImageDefaults
 */

/**
 * @interface ProductImageDefaultsType
 * @description Default configuration values for product image management.
 *
 * @property {number} MAX_IMAGES_PER_PRODUCT - Maximum images allowed per product (10)
 * @property {number} MIN_IMAGES_PER_PRODUCT - Minimum images required per product (1)
 * @property {number} MIN_DIFFERENT_ANGLES - Minimum different view angles required (3)
 * @property {number} HIGH_RES_MIN_WIDTH - Minimum width for high-res images in pixels (1500)
 * @property {number} HIGH_RES_MIN_HEIGHT - Minimum height for high-res images in pixels (1500)
 */
export const PRODUCT_IMAGE_DEFAULTS = {
  /** Maximum images allowed per product */
  MAX_IMAGES_PER_PRODUCT: 10,
  /** Minimum images required per product */
  MIN_IMAGES_PER_PRODUCT: 1,
  /** Minimum different view angles required */
  MIN_DIFFERENT_ANGLES: 3,
  /** Minimum width for high-res images (for zoom) */
  HIGH_RES_MIN_WIDTH: 1500,
  /** Minimum height for high-res images (for zoom) */
  HIGH_RES_MIN_HEIGHT: 1500,
} as const;

/** Type representing the PRODUCT_IMAGE_DEFAULTS constant */
export type ProductImageDefaultsType = typeof PRODUCT_IMAGE_DEFAULTS;

/**
 * @interface ProductImageLimitsType
 * @description Validation constraints for Product Image entity fields.
 *
 * @property {number} IMAGE_URL_MAX_LENGTH - Maximum characters for image URLs (500)
 * @property {number} CAPTION_MAX_LENGTH - Maximum characters for caption (100)
 * @property {number} ALT_TEXT_MAX_LENGTH - Maximum characters for alt text (100)
 */
export const PRODUCT_IMAGE_LIMITS = {
  IMAGE_URL_MAX_LENGTH: 500,
  CAPTION_MAX_LENGTH: 100,
  ALT_TEXT_MAX_LENGTH: 100,
} as const;

/** Type representing the PRODUCT_IMAGE_LIMITS constant */
export type ProductImageLimitsType = typeof PRODUCT_IMAGE_LIMITS;
