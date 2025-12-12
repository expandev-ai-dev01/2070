/**
 * @summary
 * Type definitions for Product Image entity.
 *
 * @module services/productImage/productImageTypes
 */

/**
 * @type ViewAngle
 * @description Valid view angles for product images
 */
export type ViewAngle =
  | 'frontal'
  | 'lateral_esquerda'
  | 'lateral_direita'
  | 'superior'
  | 'inferior'
  | 'traseira'
  | 'detalhe'
  | 'ambiente';

/**
 * @interface ProductImageEntity
 * @description Represents a product image entity with full details
 */
export interface ProductImageEntity {
  id: number;
  productId: number;
  imageUrl: string;
  thumbnailUrl: string;
  highResUrl: string;
  displayOrder: number;
  caption: string | null;
  altText: string;
  viewAngle: ViewAngle;
  dateCreated: string;
  dateModified: string;
}

/**
 * @interface ProductImageCreateRequest
 * @description Request payload for creating a product image
 */
export interface ProductImageCreateRequest {
  imageUrl: string;
  thumbnailUrl: string;
  highResUrl: string;
  displayOrder?: number;
  caption: string | null;
  altText: string;
  viewAngle: ViewAngle;
}

/**
 * @interface ProductImageUpdateRequest
 * @description Request payload for updating a product image
 */
export interface ProductImageUpdateRequest {
  imageUrl: string;
  thumbnailUrl: string;
  highResUrl: string;
  displayOrder: number;
  caption: string | null;
  altText: string;
  viewAngle: ViewAngle;
}

/**
 * @interface ImageReorderItem
 * @description Item in reorder request
 */
export interface ImageReorderItem {
  id: number;
  displayOrder: number;
}

/**
 * @interface ProductImageReorderRequest
 * @description Request payload for reordering product images
 */
export interface ProductImageReorderRequest {
  imageOrder: ImageReorderItem[];
}
