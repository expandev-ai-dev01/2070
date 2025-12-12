import { Card, CardContent } from '@/core/components/card';
import { Badge } from '@/core/components/badge';
import { cn } from '@/core/lib/utils';
import type { ProductCardProps } from './types';
import { useNavigation } from '@/core/hooks/useNavigation';

function ProductCard({ product, className }: ProductCardProps) {
  const { navigate } = useNavigation();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card
      className={cn(
        'group cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-lg',
        className
      )}
      onClick={handleClick}
    >
      <div className="bg-muted relative aspect-square w-full overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardContent className="space-y-2 p-4">
        <Badge variant="secondary" className="text-xs">
          {product.category}
        </Badge>
        <h3 className="line-clamp-2 text-base font-semibold leading-tight">{product.name}</h3>
      </CardContent>
    </Card>
  );
}

export { ProductCard };
