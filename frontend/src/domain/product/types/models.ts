export interface Product {
  id: number;
  name: string;
  description: string | null;
  category: string;
  imageUrl: string;
  additionalImages: string[];
  specifications: {
    dimensions: string | null;
    material: string | null;
  };
  dateCreated: string;
  dateModified: string;
}

export interface ProductListItem {
  id: number;
  name: string;
  category: string;
  imageUrl: string;
  dateCreated: string;
}

export interface ProductImage {
  id: number;
  productId: number;
  imageUrl: string;
  thumbnailUrl: string;
  highResUrl: string;
  displayOrder: number;
  caption: string | null;
  altText: string;
  viewAngle:
    | 'frontal'
    | 'lateral_esquerda'
    | 'lateral_direita'
    | 'superior'
    | 'inferior'
    | 'traseira'
    | 'detalhe'
    | 'ambiente';
  dateCreated: string;
}

export interface ProductImageListParams {
  productId: number;
}
