import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { motion } from 'motion/react';
import ProjectDetail from './ProjectDetail';

const slideAssets = [
  '/assets/image_7d455c.jpg',
  '/assets/image_7d4bff.jpg',
  '/assets/image_7d4c9c.jpg',
  '/assets/image_7d48dd.png'
];

export interface ProjectData {
  title: string;
  subtitle: string;
  bgUrl: string;
  videoUrl?: string;
  has3dShape?: boolean;
  slides: string[];
  details: string[];
}

const projects: ProjectData[] = [
  {
    title: "AUTOMATED COMMERCE",
    subtitle: "Custom Web Builds & AI Voice Order Confirmation",
    bgUrl: "/assets/image_7d455c.jpg",
    videoUrl: "/assets/video.mp4",
    slides: slideAssets,
    details: ["Architecture Pipeline", "Voice AI Integration", "WebSockets"]
  },
  {
    title: "PDF GENIE",
    subtitle: "AI Document Platform / Multi-LLM · GCP · Redis",
    bgUrl: "/assets/image_7d4bff.jpg",
    videoUrl: "/assets/video.mp4",
    slides: slideAssets,
    details: ["Multi-LLM Routing", "GCP Deployment", "Redis Caching"]
  },
  {
    title: "SANKALPO OS",
    subtitle: "Autonomous Security AI / Python · Linux",
    bgUrl: "/assets/image_7d4c9c.jpg",
    videoUrl: "/assets/video.mp4",
    slides: slideAssets,
    details: ["Autonomous Agents", "Python Core", "Linux Subsystems"]
  },
  {
    title: "MAYA AI",
    subtitle: "Generative UGC & Content Engine / Automated Media Pipeline",
    bgUrl: "/assets/image_7d48dd.png",
    videoUrl: "/assets/video.mp4",
    has3dShape: true,
    slides: slideAssets,
    details: ["Content Generation", "Media Pipeline", "Framer Motion 3D"]
  }
];

export default function ProjectVault() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only apply horizontal scroll on md screens and up
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      if (scrollWrapperRef.current && containerRef.current) {
        const totalScroll = scrollWrapperRef.current.offsetWidth - window.innerWidth;

        gsap.to(scrollWrapperRef.current, {
          x: -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${totalScroll}`
          }
        });
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section aria-label="Selected Works" ref={containerRef} className="w-full relative bg-[#111111] overflow-hidden">
      {/* Section Header — stays fixed during horizontal scroll */}
      <div className="absolute top-4 left-4 md:top-6 md:left-8 z-30 pointer-events-none flex items-center gap-4">
        <span className="font-mono text-[11px] uppercase tracking-widest opacity-70">// Most_Popular_Services</span>
        <div className="hidden md:block w-24 h-px bg-[#fefefe]/30" />
      </div>

      {/* Desktop/Tablet Horizontal Layout */}
      <div
        ref={scrollWrapperRef}
        className="flex flex-col md:flex-row w-full md:w-[400vw]"
      >
        <div className="w-full md:w-screen h-auto md:h-screen flex items-center justify-center p-4 md:p-12 shrink-0 border-b md:border-b-0 md:border-r border-[#fefefe]">
          <ProjectCard project={projects[0]} />
        </div>
        <div className="w-full md:w-screen h-auto md:h-screen flex items-center justify-center p-4 md:p-12 shrink-0 border-b md:border-b-0 md:border-r border-[#fefefe]">
          <ProjectCard project={projects[1]} />
        </div>
        <div className="w-full md:w-screen h-auto md:h-screen flex items-center justify-center p-4 md:p-12 shrink-0 border-b md:border-b-0 md:border-r border-[#fefefe]">
          <ProjectCard project={projects[2]} />
        </div>
        <div className="w-full md:w-screen h-auto md:h-screen flex items-center justify-center p-4 md:p-12 shrink-0 border-b border-[#fefefe]">
          <ProjectCard project={projects[3]} />
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: ProjectData }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full max-w-4xl aspect-[4/3] md:aspect-video border border-[#fefefe] overflow-hidden cursor-crosshair group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Wireframe Base Layer */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-[#222] grayscale mix-blend-luminosity"
        style={{ backgroundImage: `url('${project.bgUrl}')` }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: isHovered ? 0 : 0.4
        }}
        transition={{
          scale: { duration: 20, repeat: Infinity, ease: "linear" },
          opacity: { duration: 0.5 }
        }}
      />

      {/* Structural Elements Over Base */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end pointer-events-none z-20">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase mb-2">{project.title}</h2>
        <div className="flex flex-wrap items-center gap-2">
          {project.subtitle.split('·').map((tag, idx) => (
            <span key={idx} className="font-mono text-[10px] uppercase px-2 py-0.5 border border-[#fefefe] rounded-none bg-transparent text-[#fefefe]">
              {tag.trim().replace(' / ', '')}
            </span>
          ))}
        </div>
      </div>

      {/* X-Ray Reveal Layer */}
      <motion.div
        className="absolute inset-0 z-10 overflow-hidden bg-[#111111]"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: isHovered ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      >
        {project.videoUrl ? (
          <video
            src={project.videoUrl}
            muted
            autoPlay
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-80 grayscale mix-blend-luminosity"
          />
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-80"
            style={{ backgroundImage: `url('${project.bgUrl}')`, filter: 'contrast(120%)' }}
          />
        )}

        {project.has3dShape && (
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-60 mix-blend-screen pointer-events-none"
            animate={{ rotateY: 360, rotateZ: 180 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            <img src="/assets/image_7d48dd.png" alt="3D core structure" className="w-full h-full object-contain filter invert" />
          </motion.div>
        )}

        {/* Detail Overlay */}
        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end bg-gradient-to-t from-[#111111]/90 to-transparent pointer-events-none">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase mb-2">{project.title}</h2>
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              {project.subtitle.split('·').map((tag, idx) => (
                <span key={`sub-${idx}`} className="font-mono text-[10px] px-2 py-0.5 border border-[#fefefe] text-[#fefefe] bg-[#111111]/80 backdrop-blur-sm">
                  {tag.trim().replace(' / ', '')}
                </span>
              ))}
            </div>

            {/* Chipped Details */}
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {project.details.map((detail, idx) => (
                <span key={`detail-${idx}`} className="font-mono text-[9px] px-2 py-0.5 bg-[#fefefe] text-[#111111] uppercase font-bold tracking-widest">
                  {detail}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
