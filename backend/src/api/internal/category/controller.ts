/**
 * @summary
 * API controller for Category entity.
 * Handles category navigation and management operations.
 *
 * @module api/internal/category/controller
 */

import { Request, Response, NextFunction } from 'express';
import { successResponse, errorResponse, isServiceError } from '@/utils';
import {
  categoryList,
  categoryGet,
  categoryCreate,
  categoryUpdate,
  categoryDelete,
  categoryGetBySlug,
  categoryGetFeatured,
} from '@/services/category';

/**
 * @api {get} /api/internal/category List Categories
 * @apiName ListCategories
 * @apiGroup Category
 *
 * @apiQuery {Number} [parentId] Filter by parent category ID
 * @apiQuery {Boolean} [activeOnly] Show only active categories (default: true)
 * @apiQuery {Boolean} [featured] Show only featured categories
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Object[]} data.items List of categories
 * @apiSuccess {Number} data.items.id Unique identifier
 * @apiSuccess {String} data.items.name Category name
 * @apiSuccess {String} data.items.slug URL-friendly slug
 * @apiSuccess {Number|null} data.items.parentId Parent category ID
 * @apiSuccess {Number} data.items.level Hierarchy level (1-3)
 * @apiSuccess {String|null} data.items.description Category description
 * @apiSuccess {String|null} data.items.imageUrl Category image URL
 * @apiSuccess {Number} data.items.displayOrder Display order
 * @apiSuccess {Boolean} data.items.active Active status
 * @apiSuccess {Boolean} data.items.featured Featured status
 * @apiSuccess {Number} data.items.productCount Number of products in category
 * @apiSuccess {String} data.items.dateCreated ISO 8601 timestamp
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await categoryList(req.query);
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
 * @api {get} /api/internal/category/featured Get Featured Categories
 * @apiName GetFeaturedCategories
 * @apiGroup Category
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Object[]} data List of featured categories
 * @apiSuccess {Number} data.id Unique identifier
 * @apiSuccess {String} data.name Category name
 * @apiSuccess {String} data.slug URL-friendly slug
 * @apiSuccess {String|null} data.description Category description
 * @apiSuccess {String|null} data.imageUrl Category image URL
 * @apiSuccess {Number} data.productCount Number of products in category
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function getFeaturedHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await categoryGetFeatured();
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
 * @api {get} /api/internal/category/slug/:slug Get Category by Slug
 * @apiName GetCategoryBySlug
 * @apiGroup Category
 *
 * @apiParam {String} slug Category slug
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Number} data.id Unique identifier
 * @apiSuccess {String} data.name Category name
 * @apiSuccess {String} data.slug URL-friendly slug
 * @apiSuccess {Number|null} data.parentId Parent category ID
 * @apiSuccess {Number} data.level Hierarchy level (1-3)
 * @apiSuccess {String|null} data.description Category description
 * @apiSuccess {String|null} data.imageUrl Category image URL
 * @apiSuccess {Number} data.displayOrder Display order
 * @apiSuccess {Boolean} data.active Active status
 * @apiSuccess {Boolean} data.featured Featured status
 * @apiSuccess {String|null} data.metaTitle SEO title
 * @apiSuccess {String|null} data.metaDescription SEO description
 * @apiSuccess {Number} data.productCount Number of products in category
 * @apiSuccess {String} data.dateCreated ISO 8601 timestamp
 * @apiSuccess {String} data.dateModified ISO 8601 timestamp
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (NOT_FOUND | VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function getBySlugHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await categoryGetBySlug(req.params);
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
 * @api {get} /api/internal/category/:id Get Category
 * @apiName GetCategory
 * @apiGroup Category
 *
 * @apiParam {Number} id Category ID
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Number} data.id Unique identifier
 * @apiSuccess {String} data.name Category name
 * @apiSuccess {String} data.slug URL-friendly slug
 * @apiSuccess {Number|null} data.parentId Parent category ID
 * @apiSuccess {Number} data.level Hierarchy level (1-3)
 * @apiSuccess {String|null} data.description Category description
 * @apiSuccess {String|null} data.imageUrl Category image URL
 * @apiSuccess {Number} data.displayOrder Display order
 * @apiSuccess {Boolean} data.active Active status
 * @apiSuccess {Boolean} data.featured Featured status
 * @apiSuccess {String|null} data.metaTitle SEO title
 * @apiSuccess {String|null} data.metaDescription SEO description
 * @apiSuccess {Number} data.productCount Number of products in category
 * @apiSuccess {String} data.dateCreated ISO 8601 timestamp
 * @apiSuccess {String} data.dateModified ISO 8601 timestamp
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (NOT_FOUND | VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await categoryGet(req.params);
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
 * @api {post} /api/internal/category Create Category
 * @apiName CreateCategory
 * @apiGroup Category
 *
 * @apiBody {String} name Category name (2-50 chars)
 * @apiBody {Number|null} parentId Parent category ID (null for top-level)
 * @apiBody {String|null} description Category description (max 500 chars)
 * @apiBody {String|null} imageUrl Category image URL (max 500 chars)
 * @apiBody {Number} [displayOrder] Display order (default: 0)
 * @apiBody {Boolean} [active] Active status (default: true)
 * @apiBody {Boolean} [featured] Featured status (default: false)
 * @apiBody {String|null} metaTitle SEO title (max 70 chars)
 * @apiBody {String|null} metaDescription SEO description (max 160 chars)
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Number} data.id Unique identifier
 * @apiSuccess {String} data.name Category name
 * @apiSuccess {String} data.slug URL-friendly slug
 * @apiSuccess {Number|null} data.parentId Parent category ID
 * @apiSuccess {Number} data.level Hierarchy level (1-3)
 * @apiSuccess {String|null} data.description Category description
 * @apiSuccess {String|null} data.imageUrl Category image URL
 * @apiSuccess {Number} data.displayOrder Display order
 * @apiSuccess {Boolean} data.active Active status
 * @apiSuccess {Boolean} data.featured Featured status
 * @apiSuccess {String|null} data.metaTitle SEO title
 * @apiSuccess {String|null} data.metaDescription SEO description
 * @apiSuccess {Number} data.productCount Number of products in category
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
    const data = await categoryCreate(req.body);
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
 * @api {put} /api/internal/category/:id Update Category
 * @apiName UpdateCategory
 * @apiGroup Category
 *
 * @apiParam {Number} id Category ID
 *
 * @apiBody {String} name Category name (2-50 chars)
 * @apiBody {Number|null} parentId Parent category ID (null for top-level)
 * @apiBody {String|null} description Category description (max 500 chars)
 * @apiBody {String|null} imageUrl Category image URL (max 500 chars)
 * @apiBody {Number} displayOrder Display order
 * @apiBody {Boolean} active Active status
 * @apiBody {Boolean} featured Featured status
 * @apiBody {String|null} metaTitle SEO title (max 70 chars)
 * @apiBody {String|null} metaDescription SEO description (max 160 chars)
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Number} data.id Unique identifier
 * @apiSuccess {String} data.name Category name
 * @apiSuccess {String} data.slug URL-friendly slug
 * @apiSuccess {Number|null} data.parentId Parent category ID
 * @apiSuccess {Number} data.level Hierarchy level (1-3)
 * @apiSuccess {String|null} data.description Category description
 * @apiSuccess {String|null} data.imageUrl Category image URL
 * @apiSuccess {Number} data.displayOrder Display order
 * @apiSuccess {Boolean} data.active Active status
 * @apiSuccess {Boolean} data.featured Featured status
 * @apiSuccess {String|null} data.metaTitle SEO title
 * @apiSuccess {String|null} data.metaDescription SEO description
 * @apiSuccess {Number} data.productCount Number of products in category
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
    const data = await categoryUpdate(req.params, req.body);
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
 * @api {delete} /api/internal/category/:id Delete Category
 * @apiName DeleteCategory
 * @apiGroup Category
 *
 * @apiParam {Number} id Category ID
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
    const data = await categoryDelete(req.params);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}
