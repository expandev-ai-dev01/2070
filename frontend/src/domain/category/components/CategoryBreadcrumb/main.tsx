import { useCategoryBySlug } from '../../hooks/useCategoryBySlug';
import { useCategoryList } from '../../hooks/useCategoryList';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/core/components/breadcrumb';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { cn } from '@/core/lib/utils';
import type { CategoryBreadcrumbProps } from './types';
import { useNavigation } from '@/core/hooks/useNavigation';
import type { CategoryListItem } from '../../types/models';

function CategoryBreadcrumb({ categorySlug, className }: CategoryBreadcrumbProps) {
  const { navigate } = useNavigation();
  const { category, isLoading: isCategoryLoading } = useCategoryBySlug({
    slug: categorySlug ?? '',
    enabled: !!categorySlug,
  });
  const { categories } = useCategoryList();

  if (!categorySlug) {
    return (
      <Breadcrumb className={cn(className)}>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => navigate('/')} className="cursor-pointer">
              Início
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Catálogo</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  if (isCategoryLoading) {
    return (
      <div className="flex items-center gap-2">
        <LoadingSpinner className="h-4 w-4" />
        <span className="text-muted-foreground text-sm">Carregando...</span>
      </div>
    );
  }

  if (!category) {
    return null;
  }

  const buildHierarchy = (): CategoryListItem[] => {
    const hierarchy: CategoryListItem[] = [];
    let current = categories.find((cat) => cat.id === category.id);

    while (current) {
      hierarchy.unshift(current);
      if (current.parentId) {
        current = categories.find((cat) => cat.id === current?.parentId);
      } else {
        current = undefined;
      }
    }

    return hierarchy;
  };

  const hierarchy = buildHierarchy();

  return (
    <Breadcrumb className={cn(className)}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink onClick={() => navigate('/')} className="cursor-pointer">
            Início
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink onClick={() => navigate('/catalog')} className="cursor-pointer">
            Catálogo
          </BreadcrumbLink>
        </BreadcrumbItem>
        {hierarchy.map((cat, index) => (
          <div key={cat.id} className="flex items-center">
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {index === hierarchy.length - 1 ? (
                <BreadcrumbPage>{cat.name}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  onClick={() => navigate(`/catalog?category=${cat.slug}`)}
                  className="cursor-pointer"
                >
                  {cat.name}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export { CategoryBreadcrumb };
