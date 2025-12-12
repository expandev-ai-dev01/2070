import { useState } from 'react';
import { useProductList } from '@/domain/product/hooks/useProductList';
import { ProductCard } from '@/domain/product/components/ProductCard';
import { Button } from '@/core/components/button';
import { Input } from '@/core/components/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/select';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from '@/core/components/empty';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/core/components/pagination';
import { SearchIcon, GridIcon, ListIcon } from 'lucide-react';
import { cn } from '@/core/lib/utils';
import type { ProductListParams } from '@/domain/product/types/api';

function CatalogPage() {
  const [filters, setFilters] = useState<ProductListParams>({
    sortBy: 'date_desc',
    page: 1,
    pageSize: 9,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { products, total, page, totalPages, hasNext, hasPrevious, isLoading, error } =
    useProductList({ filters });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.length >= 3 || searchTerm.length === 0) {
      setFilters((prev) => ({ ...prev, search: searchTerm || undefined, page: 1 }));
    }
  };

  const handleSortChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: value as ProductListParams['sortBy'],
      page: 1,
    }));
  };

  const handlePageSizeChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      pageSize: parseInt(value) as ProductListParams['pageSize'],
      page: 1,
    }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisible = 5;
    let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
    const endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
      items.push(
        <PaginationItem key="1">
          <PaginationLink onClick={() => handlePageChange(1)} isActive={page === 1}>
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        items.push(<PaginationEllipsis key="ellipsis-start" />);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink onClick={() => handlePageChange(i)} isActive={page === i}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(<PaginationEllipsis key="ellipsis-end" />);
      }
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => handlePageChange(totalPages)}
            isActive={page === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Empty>
          <EmptyHeader>
            <EmptyTitle>Erro ao carregar produtos</EmptyTitle>
            <EmptyDescription>
              Ocorreu um erro ao carregar os produtos. Por favor, tente novamente.
            </EmptyDescription>
          </EmptyHeader>
          <Button onClick={() => window.location.reload()}>Tentar novamente</Button>
        </Empty>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Catálogo de Produtos</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              {total} {total === 1 ? 'produto disponível' : 'produtos disponíveis'}
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('grid')}
              aria-label="Visualização em grade"
            >
              <GridIcon />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('list')}
              aria-label="Visualização em lista"
            >
              <ListIcon />
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-4 md:flex-row">
          <form onSubmit={handleSearch} className="flex flex-1 gap-2">
            <Input
              type="search"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button
              type="submit"
              size="icon"
              disabled={searchTerm.length > 0 && searchTerm.length < 3}
            >
              <SearchIcon />
            </Button>
          </form>

          <div className="flex gap-2">
            <Select value={filters.sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date_desc">Mais recentes</SelectItem>
                <SelectItem value="date_asc">Mais antigos</SelectItem>
                <SelectItem value="name_asc">Nome (A-Z)</SelectItem>
                <SelectItem value="name_desc">Nome (Z-A)</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.pageSize?.toString()} onValueChange={handlePageSizeChange}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Por página" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="9">9 itens</SelectItem>
                <SelectItem value="18">18 itens</SelectItem>
                <SelectItem value="27">27 itens</SelectItem>
                <SelectItem value="36">36 itens</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <LoadingSpinner className="h-8 w-8" />
            <p className="text-muted-foreground text-sm">Carregando produtos...</p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && products.length === 0 && (
        <Empty className="min-h-[400px]">
          <EmptyHeader>
            <EmptyTitle>Nenhum produto encontrado</EmptyTitle>
            <EmptyDescription>
              {filters.search
                ? 'Tente ajustar sua busca ou remover filtros para ver mais resultados.'
                : 'Não há produtos disponíveis no momento.'}
            </EmptyDescription>
          </EmptyHeader>
          {filters.search && (
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setFilters((prev) => ({ ...prev, search: undefined, page: 1 }));
              }}
            >
              Limpar busca
            </Button>
          )}
        </Empty>
      )}

      {/* Products Grid/List */}
      {!isLoading && products.length > 0 && (
        <div
          className={cn(
            'gap-6',
            viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'flex flex-col'
          )}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              className={cn(viewMode === 'list' && 'flex-row')}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && products.length > 0 && totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => hasPrevious && handlePageChange(page - 1)}
                className={cn(!hasPrevious && 'pointer-events-none opacity-50')}
              />
            </PaginationItem>
            {renderPaginationItems()}
            <PaginationItem>
              <PaginationNext
                onClick={() => hasNext && handlePageChange(page + 1)}
                className={cn(!hasNext && 'pointer-events-none opacity-50')}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

export { CatalogPage };
