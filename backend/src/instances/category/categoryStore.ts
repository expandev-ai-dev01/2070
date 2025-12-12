/**
 * @summary
 * In-memory store instance for Category entity.
 * Provides singleton pattern for data storage without database.
 * Pre-populated with sample furniture categories for Lozorio Móveis.
 *
 * @module instances/category/categoryStore
 */

import { CATEGORY_DEFAULTS } from '@/constants/category';

/**
 * Category record structure
 */
export interface CategoryRecord {
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

/**
 * In-memory store for Category records
 */
class CategoryStore {
  private records: Map<number, CategoryRecord> = new Map();
  private slugIndex: Map<string, number> = new Map();
  private currentId: number = 0;

  constructor() {
    this.seedInitialData();
  }

  /**
   * Seed initial sample data for demonstration
   */
  private seedInitialData(): void {
    const sampleCategories: Omit<CategoryRecord, 'id'>[] = [
      {
        name: 'Sala de Estar',
        slug: 'sala-de-estar',
        parentId: null,
        level: 1,
        description: 'Móveis elegantes e confortáveis para sua sala de estar',
        imageUrl: 'https://via.placeholder.com/300x300/4A5568/FFFFFF?text=Sala+de+Estar',
        displayOrder: 1,
        active: true,
        featured: true,
        metaTitle: 'Móveis para Sala de Estar | Lozorio Móveis',
        metaDescription: 'Encontre sofás, poltronas, racks e aparadores para sua sala de estar',
        productCount: 4,
        dateCreated: new Date('2024-01-01').toISOString(),
        dateModified: new Date('2024-01-01').toISOString(),
      },
      {
        name: 'Quarto',
        slug: 'quarto',
        parentId: null,
        level: 1,
        description: 'Móveis para criar o quarto dos seus sonhos',
        imageUrl: 'https://via.placeholder.com/300x300/2C3E50/FFFFFF?text=Quarto',
        displayOrder: 2,
        active: true,
        featured: true,
        metaTitle: 'Móveis para Quarto | Lozorio Móveis',
        metaDescription: 'Camas, guarda-roupas e cômodas para seu quarto',
        productCount: 2,
        dateCreated: new Date('2024-01-01').toISOString(),
        dateModified: new Date('2024-01-01').toISOString(),
      },
      {
        name: 'Cozinha',
        slug: 'cozinha',
        parentId: null,
        level: 1,
        description: 'Móveis funcionais e modernos para sua cozinha',
        imageUrl: 'https://via.placeholder.com/300x300/8B4513/FFFFFF?text=Cozinha',
        displayOrder: 3,
        active: true,
        featured: true,
        metaTitle: 'Móveis para Cozinha | Lozorio Móveis',
        metaDescription: 'Mesas, cadeiras e armários para sua cozinha',
        productCount: 2,
        dateCreated: new Date('2024-01-01').toISOString(),
        dateModified: new Date('2024-01-01').toISOString(),
      },
      {
        name: 'Escritório',
        slug: 'escritorio',
        parentId: null,
        level: 1,
        description: 'Móveis ergonômicos para seu home office',
        imageUrl: 'https://via.placeholder.com/300x300/34495E/FFFFFF?text=Escritorio',
        displayOrder: 4,
        active: true,
        featured: true,
        metaTitle: 'Móveis para Escritório | Lozorio Móveis',
        metaDescription: 'Escrivaninhas e cadeiras ergonômicas para trabalhar em casa',
        productCount: 2,
        dateCreated: new Date('2024-01-01').toISOString(),
        dateModified: new Date('2024-01-01').toISOString(),
      },
    ];

    sampleCategories.forEach((category) => {
      const id = this.getNextId();
      const record = { id, ...category };
      this.records.set(id, record);
      this.slugIndex.set(record.slug, id);
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
  getAll(): CategoryRecord[] {
    return Array.from(this.records.values());
  }

  /**
   * Get record by ID
   */
  getById(id: number): CategoryRecord | undefined {
    return this.records.get(id);
  }

  /**
   * Get record by slug
   */
  getBySlug(slug: string): CategoryRecord | undefined {
    const id = this.slugIndex.get(slug);
    return id !== undefined ? this.records.get(id) : undefined;
  }

  /**
   * Add new record
   */
  add(record: CategoryRecord): CategoryRecord {
    if (this.records.size >= CATEGORY_DEFAULTS.MAX_RECORDS) {
      throw new Error('Maximum records limit reached');
    }
    this.records.set(record.id, record);
    this.slugIndex.set(record.slug, record.id);
    return record;
  }

  /**
   * Update existing record
   */
  update(id: number, data: Partial<CategoryRecord>): CategoryRecord | undefined {
    const existing = this.records.get(id);
    if (!existing) {
      return undefined;
    }

    // Update slug index if slug changed
    if (data.slug && data.slug !== existing.slug) {
      this.slugIndex.delete(existing.slug);
      this.slugIndex.set(data.slug, id);
    }

    const updated = { ...existing, ...data };
    this.records.set(id, updated);
    return updated;
  }

  /**
   * Delete record by ID
   */
  delete(id: number): boolean {
    const existing = this.records.get(id);
    if (existing) {
      this.slugIndex.delete(existing.slug);
    }
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
    this.slugIndex.clear();
    this.currentId = 0;
  }
}

/**
 * Singleton instance of CategoryStore
 */
export const categoryStore = new CategoryStore();
