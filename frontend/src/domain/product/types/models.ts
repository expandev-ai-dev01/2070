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
