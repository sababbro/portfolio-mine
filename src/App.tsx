/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import SmoothScrollProvider from './components/SmoothScrollProvider';
import Loader from './components/Loader';
import Hero from './components/Hero';
import ServicesGrid from './components/ServicesGrid';
import ProjectVault from './components/ProjectVault';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import FloatingActions from './components/FloatingActions';
import SlicedProfile from './components/SlicedProfile';

export default function App() {
  const [loaderComplete, setLoaderComplete] = useState(false);

  useEffect(() => {
    if (loaderComplete) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
      // Reset scroll position
      window.scrollTo(0, 0);
    }
  }, [loaderComplete]);

  return (
    <>
      <Loader onComplete={() => setLoaderComplete(true)} />
      
      {/* Global 3D Spinning Shape */}
      <motion.div 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[60vw] aspect-square z-[-1] pointer-events-none mix-blend-screen opacity-15 grayscale"
        style={{ 
          backgroundImage: "url('/assets/3dcomponentspins.jpg')",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      {loaderComplete && (
        <SmoothScrollProvider>
          <CustomCursor />
          <FloatingActions />
          <main className="w-full min-h-screen bg-transparent text-[#fefefe] flex flex-col items-center">
            <Hero />
             
            <div className="w-full">
               <SlicedProfile imageSrc="/assets/dismantle and rejoin.jpg" title="Systems Arch" direction="horizontal" />
            </div>

            <div className="w-full">
               <ServicesGrid />
            </div>
             
            <div className="w-full">
              <ProjectVault />
            </div>
             
            <div className="w-full">
              <Contact />
            </div>
             
            <Footer />
          </main>
        </SmoothScrollProvider>
      )}
    </>
  );
}
