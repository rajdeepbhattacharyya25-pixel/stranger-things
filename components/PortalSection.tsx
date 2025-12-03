import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const PortalSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const fogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Portal expansion on scroll
      gsap.fromTo(portalRef.current,
        { scale: 0.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "center center",
            scrub: 1.5
          }
        }
      );

      // Rotating fog
      gsap.to(fogRef.current, {
        rotation: 360,
        duration: 120,
        repeat: -1,
        ease: "linear"
      });

      // ENHANCED EMBER PARTICLES (GSAP)
      const embers = gsap.utils.toArray('.ember-particle');
      embers.forEach((ember: any) => {
        // Randomize loop properties
        const duration = 2 + Math.random() * 4; // 2 to 6 seconds
        const delay = Math.random() * 5; // Start at different times
        
        const tl = gsap.timeline({ repeat: -1, delay: delay });
        
        tl.set(ember, { 
            x: 0, 
            y: 0, 
            scale: Math.random() * 0.5 + 0.5, 
            opacity: 1 
        })
        .to(ember, {
            duration: duration,
            x: (Math.random() - 0.5) * 600, // Wide horizontal spread
            y: -Math.random() * 400 - 200,  // Drift upwards
            opacity: 0,
            scale: 0,
            ease: "power1.out"
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Fog Texture */}
      <div ref={fogRef} className="absolute inset-0 bg-fog-pattern bg-cover opacity-30 mix-blend-screen scale-150" />

      {/* The Gate Container */}
      <div className="relative z-10 w-[600px] h-[600px] flex items-center justify-center">
        
        {/* Core Glow */}
        <div ref={portalRef} className="relative w-full h-full">
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border-[1px] border-st-red/30 shadow-[0_0_50px_#D41B2B] animate-pulse" />
          
          {/* Inner Vortex (SVG) */}
          <svg className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite] opacity-80" viewBox="0 0 100 100">
            <defs>
              <radialGradient id="portalGrad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
                <stop offset="40%" stopColor="#D41B2B" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#000" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="45" fill="url(#portalGrad)" filter="blur(8px)" />
          </svg>

          {/* Cracks */}
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-[80%] h-[2px] bg-st-red shadow-[0_0_20px_#fff] rotate-45" />
             <div className="w-[80%] h-[2px] bg-st-red shadow-[0_0_20px_#fff] -rotate-45" />
          </div>
        </div>

        {/* Floating Embers (GSAP Targets) */}
        {/* Centered container for particles */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {[...Array(50)].map((_, i) => (
            <div 
              key={i}
              className="ember-particle absolute bg-st-red rounded-full shadow-[0_0_8px_#D41B2B] mix-blend-screen opacity-0"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-20 mt-12 text-center max-w-lg px-6">
        <h3 className="font-headline text-4xl text-white mb-2">Hawkins Is Falling</h3>
      </div>
    </div>
  );
};