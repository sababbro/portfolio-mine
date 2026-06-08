import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';

export default function Hero() {
  const [dropdown1, setDropdown1] = useState('Cloud Infrastructure');
  const [dropdown2, setDropdown2] = useState('Autonomous AI Apps');
  const [lang, setLang] = useState('EN');
  
  const bgRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const saved = localStorage.getItem('lang');
    if (saved) setLang(saved);

    if (bgRef.current) {
      gsap.to(bgRef.current, {
        yPercent: 40,
        ease: 'none',
        scrollTrigger: {
          trigger: bgRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  }, []);

  const toggleLang = () => {
    const newLang = lang === 'EN' ? 'AR' : 'EN';
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  return (
    <section aria-label="Hero" className="relative w-full h-screen overflow-hidden flex flex-col pt-6 md:pt-12 items-center px-4 md:px-8 border-b border-[#fefefe]">
      {/* Background Image with Parallax & Continuous Motion */}
      <motion.div 
        ref={bgRef}
        className="absolute inset-[-20%] w-[140%] h-[140%] z-[-2] pointer-events-none opacity-20 bg-cover bg-center mix-blend-luminosity grayscale"
        style={{ 
          backgroundImage: "url('/assets/hero-network.jpg')"
        }}
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 1.5, -1.5, 0]
        }}
        transition={{
          duration: 20,
          ease: "easeInOut",
          repeat: Infinity
        }}
      />

      {/* Nav */}
      <nav className="fixed w-full h-[64px] border-b border-[#fefefe] flex justify-between items-center z-[99] top-0 left-0 px-4 md:px-8 bg-[#111111] font-bold tracking-tighter text-sm mb-auto">
        <div className="flex items-center gap-3">
          <motion.svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#fefefe" 
            strokeWidth="1.5"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, ease: "linear", repeat: Infinity }}
            className="hidden md:block"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </motion.svg>
          <span>SHABAB // CLOUD_&_AI</span>
        </div>
        <div className="flex items-center gap-4 font-mono opacity-80 text-[13px]">
          <button onClick={toggleLang} className="hover:text-white transition-colors border border-[#fefefe] px-2 py-0.5 rounded-[2px] leading-none">
            {lang === 'EN' ? 'EN / AR' : 'AR / EN'}
          </button>
          <span className="hidden md:inline">[ <span className="system-dot animate-pulse"></span> SYSTEM: ONLINE & DEPLOYING ]</span>
          <span className="md:hidden">[ <span className="system-dot animate-pulse"></span> ONLINE ]</span>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="z-10 mt-auto mb-auto w-full max-w-7xl flex flex-col gap-8 md:px-12">
        <h1 className="text-[10vw] md:text-[6vw] font-bold leading-[1.1] tracking-tighter -ml-1">
          <div className="flex flex-wrap lg:flex-nowrap items-baseline gap-2 md:gap-4 w-full">
            <AnimatePresence mode="popLayout">
               <motion.span 
                 key={`engineer-${dropdown1}`}
                 initial={{ filter: "blur(8px)", opacity: 0 }}
                 animate={{ filter: "blur(0px)", opacity: 1 }}
                 exit={{ filter: "blur(8px)", opacity: 0 }}
                 transition={{ duration: 0.4 }}
               >
                 I engineer
               </motion.span>
            </AnimatePresence>
            <div className="relative inline-block border-b border-[#fefefe] group">
              <select 
                value={dropdown1}
                onChange={(e) => setDropdown1(e.target.value)}
                className="appearance-none bg-transparent outline-none cursor-pointer text-[#fefefe] pr-8 pl-1 w-max font-bold"
              >
                <option value="Cloud Infrastructure" className="bg-[#111111] text-[#fefefe]">Cloud Infrastructure</option>
                <option value="Scalable Backends" className="bg-[#111111] text-[#fefefe]">Scalable Backends</option>
              </select>
              <div className="absolute right-1 top-[50%] -translate-y-1/2 pointer-events-none">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L6 6L11 1" stroke="#fefefe" strokeWidth="2"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap lg:flex-nowrap items-baseline gap-2 md:gap-4 w-full mt-2">
            <AnimatePresence mode="popLayout">
               <motion.span 
                 key={`deploy-${dropdown2}`}
                 initial={{ filter: "blur(8px)", opacity: 0 }}
                 animate={{ filter: "blur(0px)", opacity: 1 }}
                 exit={{ filter: "blur(8px)", opacity: 0 }}
                 transition={{ duration: 0.4 }}
               >
                 and deploy
               </motion.span>
            </AnimatePresence>
            <div className="relative inline-block border-b border-[#fefefe] group">
              <select 
                value={dropdown2}
                onChange={(e) => setDropdown2(e.target.value)}
                className="appearance-none bg-transparent outline-none cursor-pointer text-[#fefefe] pr-8 pl-1 w-max font-bold"
              >
                <option value="Autonomous AI Apps" className="bg-[#111111] text-[#fefefe]">Autonomous AI Apps</option>
                <option value="Async Workflows" className="bg-[#111111] text-[#fefefe]">Async Workflows</option>
              </select>
              <div className="absolute right-1 top-[50%] -translate-y-1/2 pointer-events-none">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L6 6L11 1" stroke="#fefefe" strokeWidth="2"/>
                </svg>
              </div>
            </div>
          </div>
        </h1>
        
        <div className="mt-8 flex gap-4">
          <a href="#contact" className="inline-block bg-[#fefefe] text-[#111111] rounded-[4px] border border-transparent px-4 py-2 font-bold tracking-widest uppercase hover:bg-gray-300 transition-colors pointer-events-auto shadow-none text-xs">
            Book a Call
          </a>
        </div>
      </div>
      
    </section>
  );
}
