import React, { useState } from 'react';
import { ZoomIn, ImageOff, X } from 'lucide-react';

export interface SoftImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  aspectRatio?: '1:1' | '16:9' | '4:3' | '21:9' | 'auto';
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'pill';
  elevation?: 'xs' | 'sm' | 'md' | 'lg';
  caption?: string;
  enableLightbox?: boolean;
  className?: string;
}

export const SoftImage: React.FC<SoftImageProps> = ({
  src,
  alt = 'Image',
  aspectRatio = '16:9',
  rounded = '2xl',
  elevation = 'md',
  caption,
  enableLightbox = true,
  className = '',
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const getAspectClass = () => {
    switch (aspectRatio) {
      case '1:1':
        return 'aspect-square';
      case '16:9':
        return 'aspect-video';
      case '4:3':
        return 'aspect-[4/3]';
      case '21:9':
        return 'aspect-[21/9]';
      default:
        return 'aspect-auto';
    }
  };

  const getRadiusClasses = () => {
    switch (rounded) {
      case 'sm':
        return { frame: 'rounded-2xl p-3', well: 'rounded-xl', img: 'rounded-xl' };
      case 'md':
        return { frame: 'rounded-3xl p-3.5', well: 'rounded-2xl', img: 'rounded-2xl' };
      case 'lg':
      case 'xl':
      case '2xl':
      case '3xl':
        return { frame: 'rounded-[32px] p-4', well: 'rounded-[22px]', img: 'rounded-[22px]' };
      default:
        return { frame: 'rounded-3xl p-3.5', well: 'rounded-2xl', img: 'rounded-2xl' };
    }
  };

  const getElevationShadow = () => {
    switch (elevation) {
      case 'xs':
        return 'soft-raised-xs';
      case 'sm':
        return 'soft-raised-sm';
      case 'lg':
        return 'soft-raised-lg';
      default:
        return 'soft-raised-md';
    }
  };

  const radius = getRadiusClasses();

  return (
    <figure className={`inline-block w-full select-none ${className}`}>
      {/* Outer Neumorphic Frame */}
      <div
        className={`
          relative overflow-hidden soft-surface
          ${getElevationShadow()}
          ${radius.frame}
          transition-all duration-300
        `}
      >
        {/* Inner Sunken Image Well with breathing space */}
        <div
          className={`
            relative w-full overflow-hidden soft-pressed-xs
            ${radius.well}
            ${getAspectClass()} flex items-center justify-center bg-[var(--soft-surface)]
          `}
        >
          {/* Loading Shimmer Skeleton */}
          {!loaded && !error && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse flex items-center justify-center">
              <span className="text-xs font-semibold text-[var(--soft-text-subtle)]">
                Loading...
              </span>
            </div>
          )}

          {/* Broken Image Fallback */}
          {error ? (
            <div className="flex flex-col items-center justify-center p-6 text-center text-[var(--soft-text-muted)] gap-2">
              <ImageOff className="w-8 h-8 stroke-[1.5]" />
              <span className="text-xs font-medium">Failed to load image</span>
            </div>
          ) : (
            <img
              src={src}
              alt={alt}
              onLoad={() => setLoaded(true)}
              onError={() => setError(true)}
              className={`
                w-full h-full object-cover transition-opacity duration-500 ${radius.img}
                ${loaded ? 'opacity-100' : 'opacity-0'}
                ${enableLightbox ? 'cursor-pointer hover:scale-105 transition-transform duration-300' : ''}
              `}
              onClick={() => enableLightbox && setLightboxOpen(true)}
              {...props}
            />
          )}

          {/* Lightbox Zoom Icon Overlay */}
          {loaded && enableLightbox && !error && (
            <button
              onClick={() => setLightboxOpen(true)}
              className="absolute bottom-2.5 right-2.5 p-2 rounded-xl soft-surface soft-raised-sm text-[var(--soft-text)] opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity cursor-pointer"
              title="Expand image"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {caption && (
        <figcaption className="mt-2.5 text-center text-xs font-medium text-[var(--soft-text-muted)]">
          {caption}
        </figcaption>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] p-3 rounded-3xl soft-surface border border-white/20 dark:border-white/10 shadow-none"
            style={{ boxShadow: 'none' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-5 right-5 z-10 p-2.5 rounded-full soft-surface border border-white/20 text-[var(--soft-text)] hover:opacity-80 transition-opacity cursor-pointer shadow-none"
              style={{ boxShadow: 'none' }}
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl"
            />
            {caption && (
              <p className="mt-3 text-center text-sm font-semibold text-[var(--soft-text)]">
                {caption}
              </p>
            )}
          </div>
        </div>
      )}
    </figure>
  );
};
