import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ZoomIn, ZoomOut, RotateCcw, X, Move } from 'lucide-react';

interface ImageZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
}

export default function ImageZoomModal({ isOpen, onClose, src, alt }: ImageZoomModalProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0 });

  // Reset state on open/close
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === '=' || e.key === '+') {
        e.preventDefault();
        handleZoomIn();
      } else if (e.key === '-') {
        e.preventDefault();
        handleZoomOut();
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, scale, onClose]);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.3, 4));
  };

  const handleZoomOut = () => {
    setScale((prev) => {
      const next = Math.max(prev - 0.3, 0.8);
      if (next <= 1.05) {
        setPosition({ x: 0, y: 0 }); // reset pan if zooming back out to 1
      }
      return next;
    });
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Mouse drag handlers for panning
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (scale <= 1) return; // Only pan when zoomed in
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStartRef.current.x;
    const newY = e.clientY - dragStartRef.current.y;
    
    // Simple boundary checking based on container size
    const limitX = (scale - 1) * 350;
    const limitY = (scale - 1) * 200;
    
    setPosition({
      x: Math.max(-limitX, Math.min(limitX, newX)),
      y: Math.max(-limitY, Math.min(limitY, newY)),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch drag handlers for mobile panning
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (scale <= 1 || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setIsDragging(true);
    dragStartRef.current = { x: touch.clientX - position.x, y: touch.clientY - position.y };
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const newX = touch.clientX - dragStartRef.current.x;
    const newY = touch.clientY - dragStartRef.current.y;
    
    const limitX = (scale - 1) * 300;
    const limitY = (scale - 1) * 200;
    
    setPosition({
      x: Math.max(-limitX, Math.min(limitX, newX)),
      y: Math.max(-limitY, Math.min(limitY, newY)),
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label={`Enlarged image inspector: ${alt}`}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8 select-none"
          ref={containerRef}
          onClick={onClose}
        >
          {/* Top Bar / Header */}
          <div 
            className="absolute top-0 inset-x-0 h-16 flex items-center justify-between px-6 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-10"
          >
            <div className="flex flex-col text-left pointer-events-auto">
              <span className="text-zinc-400 font-mono text-xs tracking-widest uppercase">Inspection Mode</span>
              <span className="text-white font-sans text-sm max-w-xs md:max-w-md truncate font-medium">{alt}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="pointer-events-auto w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer border border-white/5 shadow-lg"
              title="Close (Esc)"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Interactive Stage */}
          <div
            className="relative w-full h-[calc(100vh-140px)] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              animate={{
                scale: scale,
                x: position.x,
                y: position.y,
              }}
              transition={isDragging ? { type: 'just' } : { type: 'spring', stiffness: 300, damping: 30 }}
              className="max-w-full max-h-full flex items-center justify-center"
            >
              <img
                src={src}
                alt={alt}
                className="max-w-[92vw] max-h-[75vh] md:max-h-[80vh] object-contain rounded-sm shadow-2xl border border-white/10 pointer-events-none select-none"
              />
            </motion.div>

            {/* Hint message when zoomed in */}
            {scale > 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-6 bg-black/70 border border-white/15 text-zinc-200 font-mono text-xs tracking-wider uppercase py-2 px-4 rounded-full flex items-center gap-2 backdrop-blur-md"
              >
                <Move className="w-3.5 h-3.5 animate-pulse text-accent" />
                Drag / swipe to explore image details
              </motion.div>
            )}
          </div>

          {/* Bottom Floating Control Bar */}
          <div 
            className="absolute bottom-8 bg-black/60 border border-white/15 rounded-full px-4 py-2 flex items-center gap-2 backdrop-blur-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="toolbar"
            aria-label="Image zoom controls"
          >
            <button
              onClick={handleZoomOut}
              disabled={scale <= 0.8}
              className="w-9 h-9 rounded-full hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white flex items-center justify-center text-white/80 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
              title="Zoom Out (-)"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-4 h-4" aria-hidden="true" />
            </button>
            
            <div className="h-4 w-[1px] bg-white/20"></div>
            
            <span className="font-mono text-xs text-white min-w-[50px] text-center font-medium" aria-live="polite">
              {Math.round(scale * 100)}%
            </span>
            
            <div className="h-4 w-[1px] bg-white/20"></div>

            <button
              onClick={handleZoomIn}
              disabled={scale >= 4}
              className="w-9 h-9 rounded-full hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white flex items-center justify-center text-white/80 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
              title="Zoom In (+)"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-4 h-4" aria-hidden="true" />
            </button>

            {(scale !== 1 || position.x !== 0 || position.y !== 0) && (
              <>
                <div className="h-4 w-[1px] bg-white/20"></div>
                <button
                  onClick={handleReset}
                  className="w-9 h-9 rounded-full hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white flex items-center justify-center text-accent hover:text-white transition-all cursor-pointer"
                  title="Reset Zoom (R)"
                  aria-label="Reset zoom"
                >
                  <RotateCcw className="w-4 h-4" aria-hidden="true" />
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
