import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const scrambleText = (original: string, iteration: number) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  return original
    .split("")
    .map((letter, index) => {
      if (index < iteration) {
        return original[index];
      }
      return letters[Math.floor(Math.random() * 26)];
    })
    .join("");
};

export default function Footer() {
  const [text, setText] = useState("EXECUTE");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval: number;
    if (isHovered) {
      let iteration = 0;
      interval = setInterval(() => {
        setText(scrambleText("EXECUTE", iteration));
        if (iteration >= "EXECUTE".length) {
          clearInterval(interval);
        }
        iteration += 1 / 3;
      }, 30);
    } else {
      setText("EXECUTE");
    }
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <footer className="w-full h-[74px] border-t border-[#fefefe] flex items-center px-4 md:px-8 justify-between bg-[#111111] shrink-0 mt-auto">
      <div 
        className="text-2xl md:text-4xl font-bold tracking-tighter cursor-pointer flex items-baseline select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span>{text}</span>
        <motion.span 
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          _
        </motion.span>
      </div>

      <div className="font-mono text-[11px] opacity-70 flex flex-wrap md:flex-nowrap gap-4 md:gap-6 items-center justify-end text-right md:text-left">
        <span className="hidden md:inline">LOC: DHAKA, BD</span>
        <span className="hidden md:inline">DIR: 01872392010</span>
        <span className="hidden md:inline">GH: GITHUB.COM/SABABBRO</span>
        
        <a href="#contact" className="inline-block bg-[#fefefe] text-[#111111] rounded-[4px] border border-transparent px-4 py-1.5 font-bold tracking-widest uppercase hover:bg-gray-300 transition-colors pointer-events-auto shadow-none text-xs">
          Send Brief
        </a>
      </div>
    </footer>
  );
}
