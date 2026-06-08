import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';

const logs = [
  "> Booting Linux...",
  "> Initializing Docker...",
  "> Conecting GCP...",
  "> Mounting volumes...",
  "> Ready."
];

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const counterRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Counter animation
      const counterObj = { value: 0 };
      gsap.to(counterObj, {
        value: 100,
        duration: 2.5,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            // Mechanical feel by rounding
            counterRef.current.innerText = Math.round(counterObj.value).toString().padStart(2, '0');
          }
        },
        onComplete: () => {
          setTimeout(() => {
            setIsVisible(false);
          }, 400); // short pause at 100
        }
      });
    });
    
    return () => ctx.revert();
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-[#111111] flex flex-col justify-between p-8"
        >
          {/* Top minimal header maybe */}
          <div className="flex justify-between w-full text-xs opacity-50 font-mono hidden md:flex">
            <span>SYS_INIT</span>
            <span>SHABAB // CLOUD_&_AI</span>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div 
              ref={counterRef} 
              className="text-[15vw] font-bold leading-none tracking-tighter"
            >
              00
            </div>
          </div>

          <div className="flex flex-col gap-1 w-full max-w-sm mt-auto pb-8 relative h-[80px]">
            {logs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{
                  delay: i * 0.5,
                  duration: 0.2
                }}
                className="font-mono text-[13px] absolute"
                style={{ top: i * 20 }}
              >
                {log}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
