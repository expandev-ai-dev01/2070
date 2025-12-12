import { Button } from '@/core/components/button';
import { useNavigation } from '@/core/hooks/useNavigation';

function HomePage() {
  const { navigate } = useNavigation();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-6 py-12 text-center">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Lozorio Móveis
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg sm:text-xl">
          Descubra nossa coleção exclusiva de móveis de alta qualidade para transformar seu espaço
        </p>
      </div>
      <Button size="lg" onClick={() => navigate('/catalog')} className="mt-4">
        Ver Catálogo
      </Button>
    </div>
  );
}

export { HomePage };
