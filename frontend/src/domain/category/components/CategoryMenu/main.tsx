import { useCategoryList } from '../../hooks/useCategoryList';
import { Button } from '@/core/components/button';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { cn } from '@/core/lib/utils';
import type { CategoryMenuProps } from './types';
import { ChevronDownIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/core/components/dropdown-menu';
import { Badge } from '@/core/components/badge';

function CategoryMenu({ className, onCategorySelect }: CategoryMenuProps) {
  const { categories, isLoading } = useCategoryList({
    filters: { activeOnly: true },
  });

  const topLevelCategories = categories.filter((cat) => cat.level === 1);

  const getSubcategories = (parentId: number) => {
    return categories.filter((cat) => cat.parentId === parentId);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <nav className={cn('flex flex-wrap items-center gap-2', className)}>
      {topLevelCategories.map((category) => {
        const subcategories = getSubcategories(category.id);
        const hasSubcategories = subcategories.length > 0;

        if (hasSubcategories) {
          return (
            <DropdownMenu key={category.id}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-1">
                  {category.name}
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {category.productCount}
                  </Badge>
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem
                  onClick={() => onCategorySelect?.(category.slug)}
                  className="cursor-pointer"
                >
                  <span className="font-medium">Todos em {category.name}</span>
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {category.productCount}
                  </Badge>
                </DropdownMenuItem>
                {subcategories.map((subcat) => (
                  <DropdownMenuItem
                    key={subcat.id}
                    onClick={() => onCategorySelect?.(subcat.slug)}
                    className="cursor-pointer"
                  >
                    {subcat.name}
                    <Badge variant="secondary" className="ml-auto text-xs">
                      {subcat.productCount}
                    </Badge>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        }

        return (
          <Button
            key={category.id}
            variant="ghost"
            onClick={() => onCategorySelect?.(category.slug)}
          >
            {category.name}
            <Badge variant="secondary" className="ml-1 text-xs">
              {category.productCount}
            </Badge>
          </Button>
        );
      })}
    </nav>
  );
}

export { CategoryMenu };
