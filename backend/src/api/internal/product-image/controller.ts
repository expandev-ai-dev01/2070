/**
 * @summary
 * API controller for Product Image entity.
 * Handles product image gallery operations.
 *
 * @module api/internal/product-image/controller
 */

import { Request, Response, NextFunction } from 'express';
import { successResponse, errorResponse, isServiceError } from '@/utils';
import {
  productImageList,
  productImageGet,
  productImageCreate,
  productImageUpdate,
  productImageDelete,
  productImageReorder,
} from '@/services/productImage';

/**
 * @api {get} /api/internal/product/:productId/image List Product Images
 * @apiName ListProductImages
 * @apiGroup ProductImage
 *
 * @apiParam {Number} productId Product ID
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Object[]} data List of product images
 * @apiSuccess {Number} data.id Unique identifier
 * @apiSuccess {Number} data.productId Product ID
 * @apiSuccess {String} data.imageUrl Full size image URL
 * @apiSuccess {String} data.thumbnailUrl Thumbnail image URL
 * @apiSuccess {String} data.highResUrl High resolution image URL for zoom
 * @apiSuccess {Number} data.displayOrder Display order
 * @apiSuccess {String|null} data.caption Image caption
 * @apiSuccess {String} data.altText Alt text for accessibility
 * @apiSuccess {String} data.viewAngle View angle (frontal | lateral_esquerda | lateral_direita | superior | inferior | traseira | detalhe | ambiente)
 * @apiSuccess {String} data.dateCreated ISO 8601 timestamp
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (NOT_FOUND | VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await productImageList(req.params);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {get} /api/internal/product-image/:id Get Product Image
 * @apiName GetProductImage
 * @apiGroup ProductImage
 *
 * @apiParam {Number} id Image ID
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Number} data.id Unique identifier
 * @apiSuccess {Number} data.productId Product ID
 * @apiSuccess {String} data.imageUrl Full size image URL
 * @apiSuccess {String} data.thumbnailUrl Thumbnail image URL
 * @apiSuccess {String} data.highResUrl High resolution image URL for zoom
 * @apiSuccess {Number} data.displayOrder Display order
 * @apiSuccess {String|null} data.caption Image caption
 * @apiSuccess {String} data.altText Alt text for accessibility
 * @apiSuccess {String} data.viewAngle View angle
 * @apiSuccess {String} data.dateCreated ISO 8601 timestamp
 * @apiSuccess {String} data.dateModified ISO 8601 timestamp
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (NOT_FOUND | VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await productImageGet(req.params);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {post} /api/internal/product/:productId/image Create Product Image
 * @apiName CreateProductImage
 * @apiGroup ProductImage
 *
 * @apiParam {Number} productId Product ID
 *
 * @apiBody {String} imageUrl Full size image URL (max 500 chars)
 * @apiBody {String} thumbnailUrl Thumbnail image URL (max 500 chars)
 * @apiBody {String} highResUrl High resolution image URL (max 500 chars)
 * @apiBody {Number} [displayOrder] Display order (default: auto-assigned)
 * @apiBody {String|null} caption Image caption (max 100 chars)
 * @apiBody {String} altText Alt text for accessibility (max 100 chars)
 * @apiBody {String} viewAngle View angle (frontal | lateral_esquerda | lateral_direita | superior | inferior | traseira | detalhe | ambiente)
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Number} data.id Unique identifier
 * @apiSuccess {Number} data.productId Product ID
 * @apiSuccess {String} data.imageUrl Full size image URL
 * @apiSuccess {String} data.thumbnailUrl Thumbnail image URL
 * @apiSuccess {String} data.highResUrl High resolution image URL
 * @apiSuccess {Number} data.displayOrder Display order
 * @apiSuccess {String|null} data.caption Image caption
 * @apiSuccess {String} data.altText Alt text
 * @apiSuccess {String} data.viewAngle View angle
 * @apiSuccess {String} data.dateCreated ISO 8601 timestamp
 * @apiSuccess {String} data.dateModified ISO 8601 timestamp
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (VALIDATION_ERROR | BUSINESS_RULE_ERROR)
 * @apiError {String} error.message Error message
 */
export async function createHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await productImageCreate(req.params, req.body);
    res.status(201).json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {put} /api/internal/product-image/:id Update Product Image
 * @apiName UpdateProductImage
 * @apiGroup ProductImage
 *
 * @apiParam {Number} id Image ID
 *
 * @apiBody {String} imageUrl Full size image URL (max 500 chars)
 * @apiBody {String} thumbnailUrl Thumbnail image URL (max 500 chars)
 * @apiBody {String} highResUrl High resolution image URL (max 500 chars)
 * @apiBody {Number} displayOrder Display order
 * @apiBody {String|null} caption Image caption (max 100 chars)
 * @apiBody {String} altText Alt text for accessibility (max 100 chars)
 * @apiBody {String} viewAngle View angle
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Number} data.id Unique identifier
 * @apiSuccess {Number} data.productId Product ID
 * @apiSuccess {String} data.imageUrl Full size image URL
 * @apiSuccess {String} data.thumbnailUrl Thumbnail image URL
 * @apiSuccess {String} data.highResUrl High resolution image URL
 * @apiSuccess {Number} data.displayOrder Display order
 * @apiSuccess {String|null} data.caption Image caption
 * @apiSuccess {String} data.altText Alt text
 * @apiSuccess {String} data.viewAngle View angle
 * @apiSuccess {String} data.dateCreated ISO 8601 timestamp
 * @apiSuccess {String} data.dateModified ISO 8601 timestamp
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (NOT_FOUND | VALIDATION_ERROR | BUSINESS_RULE_ERROR)
 * @apiError {String} error.message Error message
 */
export async function updateHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await productImageUpdate(req.params, req.body);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {delete} /api/internal/product-image/:id Delete Product Image
 * @apiName DeleteProductImage
 * @apiGroup ProductImage
 *
 * @apiParam {Number} id Image ID
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {String} data.message Confirmation message
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (NOT_FOUND | VALIDATION_ERROR | BUSINESS_RULE_ERROR)
 * @apiError {String} error.message Error message
 */
export async function deleteHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await productImageDelete(req.params);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {put} /api/internal/product/:productId/image/reorder Reorder Product Images
 * @apiName ReorderProductImages
 * @apiGroup ProductImage
 *
 * @apiParam {Number} productId Product ID
 *
 * @apiBody {Object[]} imageOrder Array of image IDs in desired order
 * @apiBody {Number} imageOrder.id Image ID
 * @apiBody {Number} imageOrder.displayOrder New display order
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {String} data.message Confirmation message
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (VALIDATION_ERROR | BUSINESS_RULE_ERROR)
 * @apiError {String} error.message Error message
 */
export async function reorderHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await productImageReorder(req.params, req.body);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}
