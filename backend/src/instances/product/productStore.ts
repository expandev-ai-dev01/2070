/**
 * @summary
 * In-memory store instance for Product entity.
 * Provides singleton pattern for data storage without database.
 * Pre-populated with sample furniture products for Lozorio Móveis.
 *
 * @module instances/product/productStore
 */

import { PRODUCT_DEFAULTS } from '@/constants/product';

/**
 * Product record structure
 */
export interface ProductRecord {
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

/**
 * In-memory store for Product records
 */
class ProductStore {
  private records: Map<number, ProductRecord> = new Map();
  private currentId: number = 0;

  constructor() {
    this.seedInitialData();
  }

  /**
   * Seed initial sample data for demonstration
   */
  private seedInitialData(): void {
    const sampleProducts: Omit<ProductRecord, 'id'>[] = [
      {
        name: 'Sofá Moderno 3 Lugares',
        description:
          'Sofá confortável e elegante, perfeito para sala de estar moderna. Estrutura em madeira maciça com estofado em tecido de alta qualidade.',
        category: 'Sala de Estar',
        imageUrl: 'https://via.placeholder.com/400x300/4A5568/FFFFFF?text=Sofa+Moderno',
        additionalImages: [
          'https://via.placeholder.com/400x300/4A5568/FFFFFF?text=Sofa+Lateral',
          'https://via.placeholder.com/400x300/4A5568/FFFFFF?text=Sofa+Detalhe',
        ],
        specifications: {
          dimensions: '220cm x 90cm x 85cm',
          material: 'Madeira maciça, tecido premium',
        },
        dateCreated: new Date('2024-01-15').toISOString(),
        dateModified: new Date('2024-01-15').toISOString(),
      },
      {
        name: 'Mesa de Jantar Rústica',
        description:
          'Mesa de jantar em madeira maciça com acabamento rústico. Comporta até 8 pessoas confortavelmente.',
        category: 'Cozinha',
        imageUrl: 'https://via.placeholder.com/400x300/8B4513/FFFFFF?text=Mesa+Rustica',
        additionalImages: ['https://via.placeholder.com/400x300/8B4513/FFFFFF?text=Mesa+Detalhe'],
        specifications: {
          dimensions: '200cm x 100cm x 75cm',
          material: 'Madeira de demolição',
        },
        dateCreated: new Date('2024-01-20').toISOString(),
        dateModified: new Date('2024-01-20').toISOString(),
      },
      {
        name: 'Cama Box Queen Size',
        description:
          'Cama box confortável com colchão ortopédico incluído. Base reforçada e cabeceira estofada.',
        category: 'Quarto',
        imageUrl: 'https://via.placeholder.com/400x300/2C3E50/FFFFFF?text=Cama+Queen',
        additionalImages: [],
        specifications: {
          dimensions: '158cm x 198cm x 60cm',
          material: 'MDF, espuma D33',
        },
        dateCreated: new Date('2024-02-01').toISOString(),
        dateModified: new Date('2024-02-01').toISOString(),
      },
      {
        name: 'Escrivaninha Home Office',
        description:
          'Escrivaninha compacta ideal para home office. Design minimalista com gavetas organizadoras.',
        category: 'Escritório',
        imageUrl: 'https://via.placeholder.com/400x300/34495E/FFFFFF?text=Escrivaninha',
        additionalImages: ['https://via.placeholder.com/400x300/34495E/FFFFFF?text=Gavetas'],
        specifications: {
          dimensions: '120cm x 60cm x 75cm',
          material: 'MDP, pés em aço',
        },
        dateCreated: new Date('2024-02-10').toISOString(),
        dateModified: new Date('2024-02-10').toISOString(),
      },
      {
        name: 'Poltrona Decorativa',
        description:
          'Poltrona confortável com design contemporâneo. Ideal para compor ambientes aconchegantes.',
        category: 'Sala de Estar',
        imageUrl: 'https://via.placeholder.com/400x300/7F8C8D/FFFFFF?text=Poltrona',
        additionalImages: [],
        specifications: {
          dimensions: '80cm x 85cm x 90cm',
          material: 'Veludo, estrutura em madeira',
        },
        dateCreated: new Date('2024-02-15').toISOString(),
        dateModified: new Date('2024-02-15').toISOString(),
      },
      {
        name: 'Guarda-Roupa 6 Portas',
        description:
          'Guarda-roupa espaçoso com 6 portas e gavetas internas. Acabamento em laminado resistente.',
        category: 'Quarto',
        imageUrl: 'https://via.placeholder.com/400x300/95A5A6/FFFFFF?text=Guarda-Roupa',
        additionalImages: ['https://via.placeholder.com/400x300/95A5A6/FFFFFF?text=Interior'],
        specifications: {
          dimensions: '270cm x 220cm x 60cm',
          material: 'MDP laminado',
        },
        dateCreated: new Date('2024-02-20').toISOString(),
        dateModified: new Date('2024-02-20').toISOString(),
      },
      {
        name: 'Rack para TV',
        description:
          'Rack moderno para TV até 65 polegadas. Com nichos e gavetas para organização.',
        category: 'Sala de Estar',
        imageUrl: 'https://via.placeholder.com/400x300/5D6D7E/FFFFFF?text=Rack+TV',
        additionalImages: [],
        specifications: {
          dimensions: '180cm x 45cm x 50cm',
          material: 'MDF com pintura UV',
        },
        dateCreated: new Date('2024-03-01').toISOString(),
        dateModified: new Date('2024-03-01').toISOString(),
      },
      {
        name: 'Cadeira de Escritório Ergonômica',
        description:
          'Cadeira ergonômica com ajuste de altura e apoio lombar. Ideal para longas jornadas de trabalho.',
        category: 'Escritório',
        imageUrl: 'https://via.placeholder.com/400x300/566573/FFFFFF?text=Cadeira+Ergonomica',
        additionalImages: ['https://via.placeholder.com/400x300/566573/FFFFFF?text=Ajustes'],
        specifications: {
          dimensions: '60cm x 60cm x 110cm',
          material: 'Tela mesh, base giratória',
        },
        dateCreated: new Date('2024-03-05').toISOString(),
        dateModified: new Date('2024-03-05').toISOString(),
      },
      {
        name: 'Aparador Decorativo',
        description:
          'Aparador elegante para hall de entrada ou sala de jantar. Com espelho e gavetas.',
        category: 'Sala de Estar',
        imageUrl: 'https://via.placeholder.com/400x300/717D7E/FFFFFF?text=Aparador',
        additionalImages: [],
        specifications: {
          dimensions: '120cm x 40cm x 85cm',
          material: 'Madeira maciça',
        },
        dateCreated: new Date('2024-03-10').toISOString(),
        dateModified: new Date('2024-03-10').toISOString(),
      },
      {
        name: 'Conjunto de Cadeiras para Jantar',
        description:
          'Conjunto com 6 cadeiras estofadas para mesa de jantar. Design clássico e confortável.',
        category: 'Cozinha',
        imageUrl: 'https://via.placeholder.com/400x300/85929E/FFFFFF?text=Cadeiras+Jantar',
        additionalImages: [
          'https://via.placeholder.com/400x300/85929E/FFFFFF?text=Detalhe+Estofado',
        ],
        specifications: {
          dimensions: '45cm x 50cm x 95cm (cada)',
          material: 'Madeira, estofado em couro sintético',
        },
        dateCreated: new Date('2024-03-15').toISOString(),
        dateModified: new Date('2024-03-15').toISOString(),
      },
    ];

    sampleProducts.forEach((product) => {
      const id = this.getNextId();
      this.records.set(id, { id, ...product });
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
  getAll(): ProductRecord[] {
    return Array.from(this.records.values());
  }

  /**
   * Get record by ID
   */
  getById(id: number): ProductRecord | undefined {
    return this.records.get(id);
  }

  /**
   * Add new record
   */
  add(record: ProductRecord): ProductRecord {
    if (this.records.size >= PRODUCT_DEFAULTS.MAX_RECORDS) {
      throw new Error('Maximum records limit reached');
    }
    this.records.set(record.id, record);
    return record;
  }

  /**
   * Update existing record
   */
  update(id: number, data: Partial<ProductRecord>): ProductRecord | undefined {
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
 * Singleton instance of ProductStore
 */
export const productStore = new ProductStore();
