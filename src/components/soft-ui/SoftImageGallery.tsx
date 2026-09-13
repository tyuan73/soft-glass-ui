import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X, Play, Pause, Grid, Sparkles } from 'lucide-react';
import { SoftButton } from './SoftButton';

export interface GalleryImage {
  id: string | number;
  src: string;
  thumbnail?: string;
  title: string;
  description?: string;
  category?: string;
}

export interface SoftImageGalleryProps {
  images: GalleryImage[];
  initialIndex?: number;
  showThumbnails?: boolean;
  autoplayInterval?: number; // ms, 0 = disabled
  enableFullscreen?: boolean;
  aspectRatio?: '16:9' | '4:3' | '1:1' | '21:9';
  className?: string;
}

export const SoftImageGallery: React.FC<SoftImageGalleryProps> = ({
  images,
  initialIndex = 0,
  showThumbnails = true,
  autoplayInterval = 0,
  enableFullscreen = true,
  aspectRatio = '16:9',
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(autoplayInterval > 0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState<'featured' | 'grid'>('featured');

  const currentImage = images[currentIndex] || images[0];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Autoplay timer
  useEffect(() => {
    if (!isPlaying || images.length <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, autoplayInterval || 4000);
    return () => clearInterval(timer);
  }, [isPlaying, autoplayInterval, images.length, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape' && isFullscreen) setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, isFullscreen]);

  const getAspectClass = () => {
    switch (aspectRatio) {
      case '16:9':
        return 'aspect-video';
      case '4:3':
        return 'aspect-[4/3]';
      case '1:1':
        return 'aspect-square';
      case '21:9':
        return 'aspect-[21/9]';
      default:
        return 'aspect-video';
    }
  };

  if (!images || images.length === 0) {
    return (
      <div className="p-8 text-center text-xs text-[var(--soft-text-muted)] soft-surface soft-pressed-xs rounded-2xl">
        No images in gallery.
      </div>
    );
  }

  return (
    <div className={`space-y-4 select-none ${className}`}>
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft-primary)] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Gallery
          </span>
          <span className="text-xs text-[var(--soft-text-muted)] font-mono">
            ({currentIndex + 1} / {images.length})
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Switcher */}
          <div className="flex items-center p-1 rounded-xl soft-surface soft-pressed-xs gap-1">
            <button
              type="button"
              onClick={() => setViewMode('featured')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'featured'
                  ? 'soft-surface soft-raised-xs text-[var(--soft-primary)]'
                  : 'text-[var(--soft-text-muted)] hover:text-[var(--soft-text)]'
              }`}
            >
              Slideshow
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'soft-surface soft-raised-xs text-[var(--soft-primary)]'
                  : 'text-[var(--soft-text-muted)] hover:text-[var(--soft-text)]'
              }`}
            >
              <Grid className="w-3 h-3" />
              Grid
            </button>
          </div>

          {/* Autoplay Play/Pause */}
          <SoftButton
            size="sm"
            variant={isPlaying ? 'pressed' : 'raised'}
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pause autoplay' : 'Start autoplay'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </SoftButton>

          {/* Fullscreen Trigger */}
          {enableFullscreen && (
            <SoftButton
              size="sm"
              variant="raised"
              onClick={() => setIsFullscreen(true)}
              title="Fullscreen view"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </SoftButton>
          )}
        </div>
      </div>

      {/* View 1: Featured Carousel Mode */}
      {viewMode === 'featured' && (
        <div className="space-y-4">
          {/* Main Stage Frame */}
          <div className="relative rounded-3xl p-3.5 sm:p-4 soft-surface soft-raised-md overflow-hidden">
            {/* Sunken Image Well */}
            <div
              className={`relative w-full ${getAspectClass()} overflow-hidden rounded-2xl soft-pressed-xs bg-[var(--soft-surface)] flex items-center justify-center`}
            >
              <img
                key={currentImage.id}
                src={currentImage.src}
                alt={currentImage.title}
                className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-300"
              />

              {/* Prev / Next Floating Soft Controls */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Image"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full soft-surface soft-raised-sm hover:soft-raised-md active:soft-pressed-xs flex items-center justify-center text-[var(--soft-text)] cursor-pointer transition-all duration-200 z-10"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Image"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full soft-surface soft-raised-sm hover:soft-raised-md active:soft-pressed-xs flex items-center justify-center text-[var(--soft-text)] cursor-pointer transition-all duration-200 z-10"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>

              {/* Overlay Caption Banner */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 sm:p-6 text-white pt-12">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    {currentImage.category && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm inline-block mb-1">
                        {currentImage.category}
                      </span>
                    )}
                    <h4 className="text-base sm:text-lg font-bold drop-shadow-sm">
                      {currentImage.title}
                    </h4>
                    {currentImage.description && (
                      <p className="text-xs sm:text-sm text-white/80 line-clamp-1 sm:line-clamp-2 mt-0.5">
                        {currentImage.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnails Rail */}
          {showThumbnails && images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto p-2 rounded-2xl soft-surface soft-pressed-xs scrollbar-none">
              {images.map((img, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => {
                      setCurrentIndex(idx);
                      setIsPlaying(false);
                    }}
                    className={`
                      relative shrink-0 w-20 h-14 rounded-xl overflow-hidden cursor-pointer transition-all duration-200
                      ${
                        isActive
                          ? 'ring-2 ring-[var(--soft-primary)] soft-raised-xs scale-105 opacity-100'
                          : 'opacity-60 hover:opacity-100 hover:scale-102'
                      }
                    `}
                    title={img.title}
                  >
                    <img
                      src={img.thumbnail || img.src}
                      alt={img.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* View 2: Masonry / Grid Mode */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in duration-300">
          {images.map((img, idx) => (
            <div
              key={img.id}
              onClick={() => {
                setCurrentIndex(idx);
                setViewMode('featured');
              }}
              className="p-3 rounded-2xl soft-surface soft-raised-sm hover:soft-raised-md active:soft-pressed-xs cursor-pointer transition-all duration-200 space-y-2 group"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden soft-pressed-xs">
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="px-1">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold text-[var(--soft-text)] truncate">
                    {img.title}
                  </h5>
                  {img.category && (
                    <span className="text-[10px] font-semibold text-[var(--soft-primary)]">
                      {img.category}
                    </span>
                  )}
                </div>
                {img.description && (
                  <p className="text-[11px] text-[var(--soft-text-muted)] line-clamp-1 mt-0.5">
                    {img.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setIsFullscreen(false)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Close & Controls */}
            <div className="w-full flex items-center justify-between text-white mb-3 px-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">{currentImage.title}</span>
                <span className="text-xs text-white/60 font-mono">
                  ({currentIndex + 1} / {images.length})
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
                title="Close fullscreen"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

            {/* Image Stage */}
            <div className="relative w-full flex items-center justify-center max-h-[75vh] overflow-hidden rounded-2xl">
              <img
                src={currentImage.src}
                alt={currentImage.title}
                className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
              />

              {/* Prev / Next Navigation in Modal */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white cursor-pointer transition-colors"
              >
                <ChevronRight className="w-6 h-6 stroke-[2.5]" />
              </button>
            </div>

            {/* Bottom Caption */}
            {currentImage.description && (
              <p className="mt-3 text-center text-xs text-white/70 max-w-2xl px-4">
                {currentImage.description}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SoftImageGallery;
