/**
 * @summary
 * Centralized service exports.
 * Provides single import point for all business logic services.
 *
 * @module services
 */

export {
  initExampleCreate,
  initExampleList,
  initExampleGet,
  initExampleUpdate,
  initExampleDelete,
} from './initExample';

export type {
  InitExampleEntity,
  InitExampleListResponse,
  InitExampleMetadata,
  InitExampleCreateRequest,
  InitExampleUpdateRequest,
  CreateInput as InitExampleCreateInput,
  UpdateInput as InitExampleUpdateInput,
  MetadataInput,
  InitExampleParamsInput,
} from './initExample';

export { productList, productGet } from './product';

export type {
  ProductEntity,
  ProductListResponse,
  ProductListItem,
  ProductSpecifications,
  ProductListQuery,
  ListQueryInput as ProductListQueryInput,
  ProductParamsInput,
} from './product';

export {
  categoryList,
  categoryGet,
  categoryCreate,
  categoryUpdate,
  categoryDelete,
  categoryGetBySlug,
  categoryGetFeatured,
  categoryAddProduct,
  categoryRemoveProduct,
} from './category';

export type {
  CategoryEntity,
  CategoryListItem,
  CategoryFeaturedItem,
  CategoryCreateRequest,
  CategoryUpdateRequest,
  CategoryListQuery,
  CreateInput as CategoryCreateInput,
  UpdateInput as CategoryUpdateInput,
  ListQueryInput as CategoryListQueryInput,
  CategoryParamsInput,
  CategorySlugParamsInput,
} from './category';

export {
  productImageList,
  productImageGet,
  productImageCreate,
  productImageUpdate,
  productImageDelete,
  productImageReorder,
} from './productImage';

export type {
  ProductImageEntity,
  ProductImageCreateRequest,
  ProductImageUpdateRequest,
  ProductImageReorderRequest,
  ImageReorderItem,
  ViewAngle,
  CreateInput as ProductImageCreateInput,
  UpdateInput as ProductImageUpdateInput,
  ReorderInput as ProductImageReorderInput,
  ProductImageParamsInput,
  ProductIdParamsInput,
} from './productImage';
