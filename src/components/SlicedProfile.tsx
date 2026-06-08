import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface SlicedProfileProps {
  imageSrc: string;
  title: string;
  direction?: 'vertical' | 'horizontal';
  offset?: number;
  reverseLayout?: boolean;
}

export default function SlicedProfile({ imageSrc, title, direction = 'vertical', offset = 150 }: SlicedProfileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const slices = 6;
  const sliceElements = Array.from({ length: slices });

  return (
    <section ref={containerRef} className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden py-24 border-b border-[#fefefe] bg-transparent">
      
      {/* Full Background Sliced Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#111111]/80 mix-blend-multiply z-10" />
        {sliceElements.map((_, i) => {
          const isEven = i % 2 === 0;
          // Slices move in opposite directions and align perfectly at center scroll (0.5)
          const yOffset = useTransform(
            scrollYProgress, 
            [0, 0.45, 0.55, 1], 
            [isEven ? offset : -offset, 0, 0, isEven ? -offset : offset]
          );
          const xOffset = useTransform(
            scrollYProgress, 
            [0, 0.45, 0.55, 1], 
            [isEven ? offset : -offset, 0, 0, isEven ? -offset : offset]
          );

          // Clip path segments
          const clipPath = direction === 'vertical' 
            ? `polygon(${(i * 100) / slices}% 0, ${((i + 1) * 100) / slices}% 0, ${((i + 1) * 100) / slices}% 100%, ${(i * 100) / slices}% 100%)`
            : `polygon(0 ${(i * 100) / slices}%, 100% ${(i * 100) / slices}%, 100% ${((i + 1) * 100) / slices}%, 0 ${((i + 1) * 100) / slices}%)`;

          return (
            <motion.div
              key={i}
              className="absolute inset-0 bg-cover bg-center grayscale contrast-125 opacity-40 transition-all duration-500"
              style={{
                backgroundImage: `url('${imageSrc}')`,
                clipPath,
                y: direction === 'vertical' ? yOffset : 0,
                x: direction === 'horizontal' ? xOffset : 0,
              }}
            />
          );
        })}
      </div>

      <div className={`relative z-10 w-full max-w-5xl px-8 flex flex-col items-center text-center gap-12 md:gap-24`}>
        
        <div className="w-full flex flex-col items-center gap-6">
          <h2 className="text-4xl md:text-8xl font-bold tracking-tighter uppercase drop-shadow-lg">{title}</h2>
          <div className="h-[1px] w-full max-w-sm bg-[#fefefe] opacity-50" />
          <p className="font-mono text-xs opacity-80 uppercase tracking-widest leading-relaxed max-w-2xl bg-[#111111]/60 px-4 py-2 border border-[#fefefe]/20 backdrop-blur-sm">
            [ SYSTEM DIAGNOSTIC RUNNING ] <br/>
            Analyzing core components. Structural integrity verified. Dismantling and rejoining modules to optimize data flow.
          </p>
        </div>

      </div>
    </section>
  );
}
