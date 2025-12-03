import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subTitleRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    // Initial entrance animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Fade in video
      tl.fromTo(videoRef.current, 
        { opacity: 0 }, 
        { opacity: 0.6, duration: 2, ease: "power2.inOut" }
      );

      // Staggered text reveal with 3D drop-in effect
      const letters = titleRef.current?.querySelectorAll('.letter');
      if (letters) {
        tl.fromTo(letters, 
          { opacity: 0, y: 100, z: -200, rotateX: 60, filter: 'blur(10px)' }, 
          { 
            opacity: 1, 
            y: 0, 
            z: 0,
            rotateX: 0,
            filter: 'blur(0px)',
            duration: 1.8, 
            stagger: 0.05, 
            ease: "expo.out" 
          }, 
          "-=1.5"
        );
      }

      // Subtitle & Button
      tl.fromTo([subTitleRef.current, btnRef.current],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out" },
        "-=1"
      );

      // Scroll Exit Animation (Text shrinks to top-left)
      gsap.to(contentRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom 50%",
          scrub: 1,
        },
        opacity: 0,
        scale: 0.7,
        x: -150, // Move towards left
        y: -100, // Move towards top
        transformOrigin: "center center",
        ease: "power1.in"
      });

      // Background Video Scroll Effect (Darken)
      gsap.to(videoRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        filter: "brightness(0.2) blur(10px)",
        y: 100 // Parallax the video down slightly
      });

    }, containerRef);

    // Mouse Move Parallax Logic
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate normalized mouse position (-1 to 1)
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;

      // Stronger parallax for the title (Foreground)
      // Rotates towards mouse position to simulate looking at a 3D object
      gsap.to(titleRef.current, {
        x: x * 60, 
        y: y * 40,
        rotationY: x * 12, 
        rotationX: -y * 12,
        duration: 1.2,
        ease: "power3.out",
        transformPerspective: 1000,
        transformOrigin: "center center"
      });

      // Medium parallax for subtitle and button (Mid-ground)
      gsap.to([subTitleRef.current, btnRef.current], {
        x: x * 40, 
        y: y * 30,
        rotationY: x * 8,
        rotationX: -y * 8,
        duration: 1.2,
        ease: "power3.out"
      });

      // Inverse parallax for the background video (Background)
      // Moves opposite to mouse to create depth perception
      gsap.to(videoRef.current, {
        scale: 1.15, // Scale up to avoid edges showing during movement
        x: -x * 35,
        y: -y * 35,
        rotationY: -x * 4,
        rotationX: y * 4,
        duration: 1.5,
        ease: "power3.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ctx.revert();
    };
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const scrollToContent = () => {
    const infoSection = document.getElementById('info-section');
    infoSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const titleText = "STRANGER THINGS";

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-black"
      style={{ perspective: '1200px' }} // CSS Perspective for 3D environment
    >
      
      {/* Sound Toggle Button */}
      <button 
        onClick={toggleSound}
        className="absolute top-8 right-8 z-50 p-3 rounded-full border border-white/10 bg-black/30 backdrop-blur-sm text-white/70 hover:text-st-red hover:border-st-red transition-all duration-300 group"
        aria-label="Toggle sound"
      >
        {isMuted ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        )}
      </button>

      {/* Background Video Layer */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10 opacity-80" />
        <div className="absolute inset-0 bg-st-red mix-blend-overlay opacity-20 z-10" />
        <video 
          ref={videoRef}
          className="w-full h-full object-cover transform scale-110 will-change-transform"
          autoPlay 
          loop 
          muted={isMuted}
          playsInline
          poster="https://picsum.photos/1920/1080?grayscale&blur=2"
        >
          <source src="https://mqnsosiiynwydyadjnao.supabase.co/storage/v1/object/public/stranger%20things/Animate_a_subtle_202512031129.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content Layer with 3D Transform preservation */}
      <div 
        ref={contentRef}
        className="relative z-20 text-center px-4" 
        style={{ transformStyle: 'preserve-3d' }}
      >
        
        {/* Main Title with Letter Splitting */}
        <h1 
          ref={titleRef} 
          className="font-headline text-6xl md:text-8xl lg:text-9xl text-transparent tracking-widest mb-4 select-none will-change-transform"
          style={{ 
            WebkitTextStroke: '2px #D41B2B', 
            color: 'rgba(0,0,0,0.3)',
            textShadow: '0 0 30px rgba(212, 27, 43, 0.5)',
            transformStyle: 'preserve-3d' 
          }}
        >
          {titleText.split('').map((char, index) => (
            <span key={index} className="letter inline-block hover:text-st-red transition-colors duration-300">
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        <p 
          ref={subTitleRef}
          className="font-body text-gray-400 text-sm md:text-xl tracking-[0.5em] uppercase mb-12 text-glow-chromatic will-change-transform"
        >
          Season 5 — The Other Side Returns
        </p>

        <button 
          ref={btnRef}
          onClick={scrollToContent}
          className="group relative px-8 py-3 bg-transparent overflow-hidden border border-st-red/50 hover:border-st-red transition-all duration-300 rounded-sm will-change-transform"
        >
          <div className="absolute inset-0 w-0 bg-st-red transition-all duration-[250ms] ease-out group-hover:w-full opacity-20" />
          <span className="relative font-headline text-xl text-st-red group-hover:text-white tracking-widest transition-colors">
            Enter The Gate
          </span>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-st-red to-transparent opacity-50 group-hover:opacity-100 group-hover:shadow-[0_0_10px_#D41B2B]" />
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-20 opacity-50 pointer-events-none">
        <svg className="w-6 h-6 text-st-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};