import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';

interface SlideDeckProps {
  slides: string[];
}

export default function SlideDeck({ slides }: SlideDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = offset.x;
    const swipeThreshold = 100;

    if (swipe < -swipeThreshold && currentIndex < slides.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (swipe > swipeThreshold && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      // Snap back to current if not dragged enough
      animate(x, 0, { type: 'spring', stiffness: 300, damping: 30 });
    }
  };

  useEffect(() => {
    animate(x, -currentIndex * (containerRef.current?.offsetWidth || window.innerWidth), {
      type: 'spring',
      stiffness: 300,
      damping: 30
    });
  }, [currentIndex, x]);

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-transparent" ref={containerRef}>
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        style={{ x }}
        className="flex w-full h-full touch-none cursor-grab active:cursor-grabbing"
      >
        {slides.map((slide, idx) => (
          <div key={idx} className="w-full h-full shrink-0 flex items-center justify-center p-4 md:p-12">
            <div className="relative w-full max-w-6xl aspect-[16/9] border border-[#fefefe] bg-[#111111] overflow-hidden">
              <img 
                src={slide} 
                alt={`Slide ${idx + 1}`} 
                className="w-full h-full object-contain grayscale mix-blend-luminosity" 
              />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Navigation Overlay */}
      <div className="absolute bottom-12 right-12 font-mono text-[#fefefe] text-xl font-bold tracking-tighter border border-[#fefefe] px-4 py-2 bg-[#111111]/80 backdrop-blur-sm pointer-events-none z-10">
        {String(currentIndex + 1).padStart(2, '0')}/{String(slides.length).padStart(2, '0')}
      </div>
    </div>
  );
}
