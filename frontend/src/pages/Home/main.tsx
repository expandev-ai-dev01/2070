import { Button } from '@/core/components/button';
import { useNavigation } from '@/core/hooks/useNavigation';
import { useFeaturedCategories } from '@/domain/category/hooks/useFeaturedCategories';
import { CategoryCard } from '@/domain/category/components/CategoryCard';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from '@/core/components/empty';

function HomePage() {
  const { navigate } = useNavigation();
  const { featuredCategories, isLoading } = useFeaturedCategories();

  return (
    <div className="space-y-12 py-12">
      {/* Hero Section */}
      <div className="flex min-h-[40vh] flex-col items-center justify-center space-y-6 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Lozorio Móveis
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg sm:text-xl">
            Descubra nossa coleção exclusiva de móveis de alta qualidade para transformar seu espaço
          </p>
        </div>
        <Button size="lg" onClick={() => navigate('/catalog')} className="mt-4">
          Ver Catálogo Completo
        </Button>
      </div>

      {/* Featured Categories Section */}
      {isLoading && (
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <LoadingSpinner className="h-8 w-8" />
            <p className="text-muted-foreground text-sm">Carregando categorias...</p>
          </div>
        </div>
      )}

      {!isLoading && featuredCategories.length > 0 && (
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Categorias em Destaque</h2>
            <p className="text-muted-foreground">Explore nossas principais categorias de móveis</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>
      )}

      {!isLoading && featuredCategories.length === 0 && (
        <Empty className="min-h-[300px]">
          <EmptyHeader>
            <EmptyTitle>Nenhuma categoria em destaque</EmptyTitle>
            <EmptyDescription>
              Explore nosso catálogo completo para ver todos os produtos disponíveis.
            </EmptyDescription>
          </EmptyHeader>
          <Button variant="outline" onClick={() => navigate('/catalog')}>
            Ver Catálogo
          </Button>
        </Empty>
      )}
    </div>
  );
}

export { HomePage };
