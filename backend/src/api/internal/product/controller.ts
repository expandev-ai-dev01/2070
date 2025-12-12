/**
 * @summary
 * API controller for Product entity.
 * Handles catalog display operations.
 *
 * @module api/internal/product/controller
 */

import { Request, Response, NextFunction } from 'express';
import { successResponse, errorResponse, isServiceError } from '@/utils';
import { productList, productGet } from '@/services/product';

/**
 * @api {get} /api/internal/product List Products
 * @apiName ListProducts
 * @apiGroup Product
 *
 * @apiQuery {String} [search] Search term for product name/description
 * @apiQuery {String} [category] Filter by category
 * @apiQuery {String} [sortBy] Sort criteria (name_asc | name_desc | date_desc | date_asc)
 * @apiQuery {Number} [page] Page number (default: 1)
 * @apiQuery {Number} [pageSize] Items per page (default: 9, options: 9, 18, 27, 36)
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Object[]} data.items List of products
 * @apiSuccess {Number} data.items.id Unique identifier
 * @apiSuccess {String} data.items.name Product name
 * @apiSuccess {String} data.items.category Product category
 * @apiSuccess {String} data.items.imageUrl Main product image URL
 * @apiSuccess {String} data.items.dateCreated ISO 8601 timestamp
 * @apiSuccess {Number} data.total Total number of products
 * @apiSuccess {Number} data.page Current page number
 * @apiSuccess {Number} data.pageSize Items per page
 * @apiSuccess {Number} data.totalPages Total number of pages
 * @apiSuccess {Boolean} data.hasNext Has next page
 * @apiSuccess {Boolean} data.hasPrevious Has previous page
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await productList(req.query);
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
 * @api {get} /api/internal/product/:id Get Product
 * @apiName GetProduct
 * @apiGroup Product
 *
 * @apiParam {Number} id Product ID
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Number} data.id Unique identifier
 * @apiSuccess {String} data.name Product name
 * @apiSuccess {String|null} data.description Product description
 * @apiSuccess {String} data.category Product category
 * @apiSuccess {String} data.imageUrl Main product image URL
 * @apiSuccess {String[]} data.additionalImages Additional product images
 * @apiSuccess {Object} data.specifications Product specifications
 * @apiSuccess {String|null} data.specifications.dimensions Product dimensions
 * @apiSuccess {String|null} data.specifications.material Product material
 * @apiSuccess {String} data.dateCreated ISO 8601 timestamp
 * @apiSuccess {String} data.dateModified ISO 8601 timestamp
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (NOT_FOUND | VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await productGet(req.params);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}
