import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/card';
import { Separator } from '@/core/components/separator';
import { cn } from '@/core/lib/utils';
import type { ProductSpecificationsProps } from './types';

function ProductSpecifications({ product, className }: ProductSpecificationsProps) {
  const specs = [
    {
      label: 'Dimensões',
      value: product.specifications.dimensions,
    },
    {
      label: 'Material',
      value: product.specifications.material,
    },
    {
      label: 'Categoria',
      value: product.category,
    },
  ].filter((spec) => spec.value);

  if (specs.length === 0) {
    return null;
  }

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Especificações Técnicas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {specs.map((spec, index) => (
          <div key={spec.label}>
            {index > 0 && <Separator className="mb-4" />}
            <div className="flex justify-between">
              <span className="text-muted-foreground font-medium">{spec.label}</span>
              <span className="text-right font-semibold">{spec.value}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export { ProductSpecifications };
