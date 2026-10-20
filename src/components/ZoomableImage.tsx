import { useState, useEffect } from 'react';
import { Maximize2 } from 'lucide-react';
import ImageZoomModal from './ImageZoomModal';

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
}

export default function ZoomableImage({ 
  src, 
  alt, 
  className = "w-full h-full object-cover object-center", 
  containerClassName = "w-full h-full relative",
  priority = false,
  loading = "eager",
}: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // If the image is already in browser cache, mark as loaded immediately
    const img = new Image();
    img.src = src;
    if (img.complete) {
      setIsLoaded(true);
    }
  }, [src]);

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className={`group relative cursor-zoom-in overflow-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-lg ${containerClassName}`}
        role="button"
        tabIndex={0}
        aria-label={`Enlarge image: ${alt}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
      >
        <img 
          src={src} 
          alt=""
          aria-hidden="true" 
          loading={loading}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          onLoad={() => setIsLoaded(true)}
          className={`${className} group-hover:scale-[1.015] transition-all duration-300 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-90'
          }`}
        />
        
        {/* Hover overlay with modern design and glassmorphic button */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-300 flex items-center justify-center pointer-events-none" aria-hidden="true">
          <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 backdrop-blur-sm shadow-xl hover:scale-105 active:scale-95">
            <Maximize2 className="w-4 h-4" aria-hidden="true" />
          </div>
        </div>
      </div>

      <ImageZoomModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        src={src} 
        alt={alt} 
      />
    </>
  );
}
