import { useParams } from 'react-router-dom';
import { useProductDetail } from '@/domain/product/hooks/useProductDetail';
import { useProductImages } from '@/domain/product/hooks/useProductImages';
import { ProductImageGallery } from '@/domain/product/components/ProductImageGallery';
import { ProductSpecifications } from '@/domain/product/components/ProductSpecifications';
import { Button } from '@/core/components/button';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from '@/core/components/empty';
import { useNavigation } from '@/core/hooks/useNavigation';
import { ArrowLeftIcon, ShareIcon } from 'lucide-react';
import { toast } from 'sonner';

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { navigate, goBack } = useNavigation();
  const productId = id ? parseInt(id, 10) : 0;

  const {
    product,
    isLoading: isProductLoading,
    error: productError,
  } = useProductDetail({
    id: productId,
    enabled: !!productId,
  });

  const { images, isLoading: isImagesLoading } = useProductImages({
    productId,
    enabled: !!productId,
  });

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name,
          text: product?.description ?? undefined,
          url,
        });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Error sharing:', error);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        toast.success('Link copiado para a área de transferência');
      } catch (error) {
        console.error('Error copying to clipboard:', error);
        toast.error('Não foi possível copiar o link');
      }
    }
  };

  if (!productId) {
    return (
      <Empty className="min-h-[400px]">
        <EmptyHeader>
          <EmptyTitle>Produto não encontrado</EmptyTitle>
          <EmptyDescription>O ID do produto é inválido.</EmptyDescription>
        </EmptyHeader>
        <Button onClick={() => navigate('/catalog')}>Voltar ao Catálogo</Button>
      </Empty>
    );
  }

  if (productError) {
    return (
      <Empty className="min-h-[400px]">
        <EmptyHeader>
          <EmptyTitle>Erro ao carregar produto</EmptyTitle>
          <EmptyDescription>
            Não foi possível carregar as informações do produto. Por favor, tente novamente.
          </EmptyDescription>
        </EmptyHeader>
        <div className="flex gap-2">
          <Button variant="outline" onClick={goBack}>
            Voltar
          </Button>
          <Button onClick={() => window.location.reload()}>Tentar novamente</Button>
        </div>
      </Empty>
    );
  }

  if (isProductLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner className="h-8 w-8" />
          <p className="text-muted-foreground text-sm">Carregando produto...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <Empty className="min-h-[400px]">
        <EmptyHeader>
          <EmptyTitle>Produto não encontrado</EmptyTitle>
          <EmptyDescription>
            O produto solicitado não existe ou não está mais disponível.
          </EmptyDescription>
        </EmptyHeader>
        <Button onClick={() => navigate('/catalog')}>Voltar ao Catálogo</Button>
      </Empty>
    );
  }

  return (
    <div className="space-y-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={goBack} className="gap-2">
          <ArrowLeftIcon className="h-4 w-4" />
          Voltar
        </Button>
        <Button variant="outline" onClick={handleShare} className="gap-2">
          <ShareIcon className="h-4 w-4" />
          Compartilhar
        </Button>
      </div>

      {/* Product Content */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image Gallery */}
        <div>
          {isImagesLoading ? (
            <div className="bg-muted flex aspect-square w-full items-center justify-center rounded-lg">
              <LoadingSpinner className="h-8 w-8" />
            </div>
          ) : (
            <ProductImageGallery images={images} productName={product.name} />
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
            <p className="text-muted-foreground text-sm">{product.category}</p>
          </div>

          {product.description && (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Descrição</h2>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>
          )}

          <ProductSpecifications product={product} />

          <div className="flex gap-4">
            <Button size="lg" className="flex-1">
              Solicitar Orçamento
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ProductDetailPage };
