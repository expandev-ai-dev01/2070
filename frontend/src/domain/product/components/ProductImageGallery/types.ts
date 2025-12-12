import type { ProductImage } from '../../types/models';

export interface ProductImageGalleryProps {
  images: ProductImage[];
  productName: string;
  className?: string;
}
