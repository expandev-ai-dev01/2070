/**
 * @summary
 * In-memory store instance for Product Image entity.
 * Provides singleton pattern for data storage without database.
 * Pre-populated with sample product images for demonstration.
 *
 * @module instances/productImage/productImageStore
 */

import { PRODUCT_IMAGE_DEFAULTS } from '@/constants/productImage';

/**
 * Product Image record structure
 */
export interface ProductImageRecord {
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
  dateModified: string;
}

/**
 * In-memory store for Product Image records
 */
class ProductImageStore {
  private records: Map<number, ProductImageRecord> = new Map();
  private currentId: number = 0;

  constructor() {
    this.seedInitialData();
  }

  /**
   * Seed initial sample data for demonstration
   */
  private seedInitialData(): void {
    const sampleImages: Omit<ProductImageRecord, 'id'>[] = [
      // Product 1 - Sofá Moderno (3 images)
      {
        productId: 1,
        imageUrl: 'https://via.placeholder.com/800x600/4A5568/FFFFFF?text=Sofa+Frontal',
        thumbnailUrl: 'https://via.placeholder.com/200x150/4A5568/FFFFFF?text=Sofa+Frontal',
        highResUrl: 'https://via.placeholder.com/1600x1200/4A5568/FFFFFF?text=Sofa+Frontal+HD',
        displayOrder: 1,
        caption: 'Vista frontal do sofá',
        altText: 'Sofá moderno 3 lugares - vista frontal',
        viewAngle: 'frontal',
        dateCreated: new Date('2024-01-15').toISOString(),
        dateModified: new Date('2024-01-15').toISOString(),
      },
      {
        productId: 1,
        imageUrl: 'https://via.placeholder.com/800x600/4A5568/FFFFFF?text=Sofa+Lateral',
        thumbnailUrl: 'https://via.placeholder.com/200x150/4A5568/FFFFFF?text=Sofa+Lateral',
        highResUrl: 'https://via.placeholder.com/1600x1200/4A5568/FFFFFF?text=Sofa+Lateral+HD',
        displayOrder: 2,
        caption: 'Vista lateral do sofá',
        altText: 'Sofá moderno 3 lugares - vista lateral',
        viewAngle: 'lateral_esquerda',
        dateCreated: new Date('2024-01-15').toISOString(),
        dateModified: new Date('2024-01-15').toISOString(),
      },
      {
        productId: 1,
        imageUrl: 'https://via.placeholder.com/800x600/4A5568/FFFFFF?text=Sofa+Detalhe',
        thumbnailUrl: 'https://via.placeholder.com/200x150/4A5568/FFFFFF?text=Sofa+Detalhe',
        highResUrl: 'https://via.placeholder.com/1600x1200/4A5568/FFFFFF?text=Sofa+Detalhe+HD',
        displayOrder: 3,
        caption: 'Detalhe do estofado',
        altText: 'Sofá moderno 3 lugares - detalhe do estofado',
        viewAngle: 'detalhe',
        dateCreated: new Date('2024-01-15').toISOString(),
        dateModified: new Date('2024-01-15').toISOString(),
      },
      // Product 2 - Mesa de Jantar (4 images)
      {
        productId: 2,
        imageUrl: 'https://via.placeholder.com/800x600/8B4513/FFFFFF?text=Mesa+Frontal',
        thumbnailUrl: 'https://via.placeholder.com/200x150/8B4513/FFFFFF?text=Mesa+Frontal',
        highResUrl: 'https://via.placeholder.com/1600x1200/8B4513/FFFFFF?text=Mesa+Frontal+HD',
        displayOrder: 1,
        caption: null,
        altText: 'Mesa de jantar rústica - vista frontal',
        viewAngle: 'frontal',
        dateCreated: new Date('2024-01-20').toISOString(),
        dateModified: new Date('2024-01-20').toISOString(),
      },
      {
        productId: 2,
        imageUrl: 'https://via.placeholder.com/800x600/8B4513/FFFFFF?text=Mesa+Superior',
        thumbnailUrl: 'https://via.placeholder.com/200x150/8B4513/FFFFFF?text=Mesa+Superior',
        highResUrl: 'https://via.placeholder.com/1600x1200/8B4513/FFFFFF?text=Mesa+Superior+HD',
        displayOrder: 2,
        caption: 'Vista superior da mesa',
        altText: 'Mesa de jantar rústica - vista superior',
        viewAngle: 'superior',
        dateCreated: new Date('2024-01-20').toISOString(),
        dateModified: new Date('2024-01-20').toISOString(),
      },
      {
        productId: 2,
        imageUrl: 'https://via.placeholder.com/800x600/8B4513/FFFFFF?text=Mesa+Detalhe',
        thumbnailUrl: 'https://via.placeholder.com/200x150/8B4513/FFFFFF?text=Mesa+Detalhe',
        highResUrl: 'https://via.placeholder.com/1600x1200/8B4513/FFFFFF?text=Mesa+Detalhe+HD',
        displayOrder: 3,
        caption: 'Detalhe da madeira',
        altText: 'Mesa de jantar rústica - detalhe da madeira',
        viewAngle: 'detalhe',
        dateCreated: new Date('2024-01-20').toISOString(),
        dateModified: new Date('2024-01-20').toISOString(),
      },
      {
        productId: 2,
        imageUrl: 'https://via.placeholder.com/800x600/8B4513/FFFFFF?text=Mesa+Ambiente',
        thumbnailUrl: 'https://via.placeholder.com/200x150/8B4513/FFFFFF?text=Mesa+Ambiente',
        highResUrl: 'https://via.placeholder.com/1600x1200/8B4513/FFFFFF?text=Mesa+Ambiente+HD',
        displayOrder: 4,
        caption: 'Mesa em ambiente decorado',
        altText: 'Mesa de jantar rústica - em ambiente',
        viewAngle: 'ambiente',
        dateCreated: new Date('2024-01-20').toISOString(),
        dateModified: new Date('2024-01-20').toISOString(),
      },
    ];

    sampleImages.forEach((image) => {
      const id = this.getNextId();
      this.records.set(id, { id, ...image });
    });
  }

  /**
   * Get next available ID
   */
  getNextId(): number {
    this.currentId += 1;
    return this.currentId;
  }

  /**
   * Get all records
   */
  getAll(): ProductImageRecord[] {
    return Array.from(this.records.values());
  }

  /**
   * Get record by ID
   */
  getById(id: number): ProductImageRecord | undefined {
    return this.records.get(id);
  }

  /**
   * Add new record
   */
  add(record: ProductImageRecord): ProductImageRecord {
    this.records.set(record.id, record);
    return record;
  }

  /**
   * Update existing record
   */
  update(id: number, data: Partial<ProductImageRecord>): ProductImageRecord | undefined {
    const existing = this.records.get(id);
    if (!existing) {
      return undefined;
    }
    const updated = { ...existing, ...data };
    this.records.set(id, updated);
    return updated;
  }

  /**
   * Delete record by ID
   */
  delete(id: number): boolean {
    return this.records.delete(id);
  }

  /**
   * Check if record exists
   */
  exists(id: number): boolean {
    return this.records.has(id);
  }

  /**
   * Get total count of records
   */
  count(): number {
    return this.records.size;
  }

  /**
   * Clear all records (useful for testing)
   */
  clear(): void {
    this.records.clear();
    this.currentId = 0;
  }
}

/**
 * Singleton instance of ProductImageStore
 */
export const productImageStore = new ProductImageStore();
