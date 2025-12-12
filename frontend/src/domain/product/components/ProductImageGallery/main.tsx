import { useState, useEffect } from 'react';
import { cn } from '@/core/lib/utils';
import { Button } from '@/core/components/button';
import { ChevronLeftIcon, ChevronRightIcon, ZoomInIcon } from 'lucide-react';
import { Dialog, DialogContent } from '@/core/components/dialog';
import type { ProductImageGalleryProps } from './types';

function ProductImageGallery({ images, className }: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!images || images.length === 0) {
    return (
      <div className="bg-muted flex aspect-square w-full items-center justify-center rounded-lg">
        <p className="text-muted-foreground text-sm">Nenhuma imagem disponível</p>
      </div>
    );
  }

  const currentImage = images[selectedIndex];

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Main Image */}
      <div className="group relative aspect-square w-full overflow-hidden rounded-lg border">
        <img
          src={currentImage.imageUrl}
          alt={currentImage.altText}
          className="h-full w-full object-cover transition-transform duration-300"
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={handlePrevious}
              aria-label="Imagem anterior"
            >
              <ChevronLeftIcon />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={handleNext}
              aria-label="Próxima imagem"
            >
              <ChevronRightIcon />
            </Button>
          </>
        )}

        {/* Zoom Button */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={() => setIsZoomOpen(true)}
          aria-label="Ampliar imagem"
        >
          <ZoomInIcon />
        </Button>

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="bg-background/80 absolute bottom-2 right-2 rounded-md px-2 py-1 text-xs font-medium">
            {selectedIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div
          className={cn(
            'flex gap-2',
            isMobile ? 'overflow-x-auto pb-2' : 'flex-wrap justify-center'
          )}
        >
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => handleThumbnailClick(index)}
              className={cn(
                'border-input hover:border-primary relative aspect-square w-20 shrink-0 overflow-hidden rounded-md border-2 transition-all',
                selectedIndex === index && 'border-primary ring-primary ring-2 ring-offset-2'
              )}
              aria-label={`Ver imagem ${index + 1}`}
            >
              <img
                src={image.thumbnailUrl}
                alt={image.altText}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Zoom Dialog */}
      <Dialog open={isZoomOpen} onOpenChange={setIsZoomOpen}>
        <DialogContent className="max-w-[95vw] p-0 sm:max-w-4xl">
          <div className="relative aspect-square w-full overflow-hidden">
            <img
              src={currentImage.highResUrl}
              alt={currentImage.altText}
              className="h-full w-full object-contain"
            />
            {currentImage.caption && (
              <div className="bg-background/90 absolute bottom-0 left-0 right-0 p-4 text-center text-sm">
                {currentImage.caption}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { ProductImageGallery };
