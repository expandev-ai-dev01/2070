import { Card, CardContent } from '@/core/components/card';
import { Badge } from '@/core/components/badge';
import { cn } from '@/core/lib/utils';
import type { CategoryCardProps } from './types';
import { useNavigation } from '@/core/hooks/useNavigation';

function CategoryCard({ category, className }: CategoryCardProps) {
  const { navigate } = useNavigation();

  const handleClick = () => {
    navigate(`/catalog?category=${category.slug}`);
  };

  return (
    <Card
      className={cn(
        'group cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-lg',
        className
      )}
      onClick={handleClick}
    >
      {category.imageUrl && (
        <div className="bg-muted relative aspect-video w-full overflow-hidden">
          <img
            src={category.imageUrl}
            alt={category.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <CardContent className="space-y-2 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold leading-tight">{category.name}</h3>
          <Badge variant="secondary" className="text-xs">
            {category.productCount}
          </Badge>
        </div>
        {category.description && (
          <p className="text-muted-foreground line-clamp-2 text-sm">{category.description}</p>
        )}
      </CardContent>
    </Card>
  );
}

export { CategoryCard };
