import { motion, AnimatePresence } from 'motion/react';
import SlideDeck from './SlideDeck';

interface ProjectDetailProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    subtitle: string;
    slides: string[];
  } | null;
}

export default function ProjectDetail({ isOpen, onClose, project }: ProjectDetailProps) {
  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Dimming Overlay with Blur */}
          <div 
            className="absolute inset-0 bg-[#111111]/40 backdrop-blur-[8px]"
            onClick={onClose}
          />
          
          {/* Modal Content container */}
          <motion.div 
            className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="fixed top-8 right-8 font-mono text-[#fefefe] text-sm font-bold border border-[#fefefe] px-4 py-2 rounded-[4px] bg-[#111111] hover:bg-[#fefefe] hover:text-[#111111] transition-colors pointer-events-auto z-[9999]"
            >
              CLOSE [X]
            </button>
            
            {/* Slide Deck Container */}
            <div className="w-full h-full max-h-screen pt-24 pb-12 pointer-events-auto flex items-center justify-center">
              <SlideDeck slides={project.slides} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
