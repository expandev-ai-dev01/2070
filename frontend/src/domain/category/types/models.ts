export interface Category {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  level: number;
  description: string | null;
  imageUrl: string | null;
  displayOrder: number;
  active: boolean;
  featured: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  productCount: number;
  dateCreated: string;
  dateModified: string;
}

export interface CategoryListItem {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  level: number;
  description: string | null;
  imageUrl: string | null;
  displayOrder: number;
  active: boolean;
  featured: boolean;
  productCount: number;
  dateCreated: string;
}

export interface FeaturedCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  productCount: number;
}
