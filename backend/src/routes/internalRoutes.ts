/**
 * @summary
 * Internal API routes configuration.
 * Handles authenticated endpoints for business operations.
 *
 * @module routes/internalRoutes
 */

import { Router } from 'express';
import * as initExampleController from '@/api/internal/init-example/controller';
import * as productController from '@/api/internal/product/controller';
import * as categoryController from '@/api/internal/category/controller';
import * as productImageController from '@/api/internal/product-image/controller';

const router = Router();

/**
 * @rule {be-route-configuration}
 * Init-Example routes - /api/internal/init-example
 */
router.get('/init-example', initExampleController.listHandler);
router.post('/init-example', initExampleController.createHandler);
router.get('/init-example/:id', initExampleController.getHandler);
router.put('/init-example/:id', initExampleController.updateHandler);
router.delete('/init-example/:id', initExampleController.deleteHandler);

/**
 * @rule {be-route-configuration}
 * Product routes - /api/internal/product
 */
router.get('/product', productController.listHandler);
router.get('/product/:id', productController.getHandler);

/**
 * @rule {be-route-configuration}
 * Category routes - /api/internal/category
 */
router.get('/category', categoryController.listHandler);
router.get('/category/featured', categoryController.getFeaturedHandler);
router.get('/category/slug/:slug', categoryController.getBySlugHandler);
router.get('/category/:id', categoryController.getHandler);
router.post('/category', categoryController.createHandler);
router.put('/category/:id', categoryController.updateHandler);
router.delete('/category/:id', categoryController.deleteHandler);

/**
 * @rule {be-route-configuration}
 * Product Image routes - /api/internal/product/:productId/image
 */
router.get('/product/:productId/image', productImageController.listHandler);
router.post('/product/:productId/image', productImageController.createHandler);
router.put('/product/:productId/image/reorder', productImageController.reorderHandler);
router.get('/product-image/:id', productImageController.getHandler);
router.put('/product-image/:id', productImageController.updateHandler);
router.delete('/product-image/:id', productImageController.deleteHandler);

export default router;
