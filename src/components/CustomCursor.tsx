import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    if (!cursor || !follower) return;

    document.body.classList.add('custom-cursor-active');

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    const xToCursor = gsap.quickTo(cursor, "x", { duration: 0, ease: "none" });
    const yToCursor = gsap.quickTo(cursor, "y", { duration: 0, ease: "none" });
    
    const xToFollower = gsap.quickTo(follower, "x", { duration: 0.15, ease: "power3.out" });
    const yToFollower = gsap.quickTo(follower, "y", { duration: 0.15, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToFollower(e.clientX);
      yToFollower(e.clientY);
    };

    window.addEventListener('mousemove', onMouseMove);

    const handleMouseEnter = () => {
      gsap.to(cursor, { scale: 0, duration: 0.2 });
      gsap.to(follower, { 
        scale: 1.5,
        backgroundColor: "rgba(254, 254, 254, 0.1)",
        borderColor: "#fefefe",
        duration: 0.2 
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
      gsap.to(follower, { 
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "rgba(254, 254, 254, 0.5)",
        duration: 0.2 
      });
    };

    const addHoverListeners = () => {
      document.querySelectorAll('a, button, select, .cursor-hover').forEach(el => {
        // Prevent stacking listeners
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
        
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    // Rebind if DOM changes (e.g., dynamically adding elements)
    const observer = new MutationObserver(() => addHoverListeners());
    observer.observe(document.body, { childList: true, subtree: true });
    
    addHoverListeners();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.classList.remove('custom-cursor-active');
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#fefefe] rounded-full pointer-events-none z-[9999] hidden md:block mix-blend-difference" 
      />
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-8 h-8 border border-[#fefefe]/50 rounded-full pointer-events-none z-[9998] hidden md:block mix-blend-difference" 
      />
    </>
  );
}
