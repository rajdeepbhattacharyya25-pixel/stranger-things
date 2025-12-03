import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    title: "The Crawl",
    desc: "Chapter One begins where we left off. The darkness has spread across Hawkins, turning the once quiet town into a battlefield for the soul of the world.",
    stat: "Episode 1"
  },
  {
    title: "Vecna's Return",
    desc: "He is hurt, he is broken, but he is not dead. The clock chimes louder than ever as the connection between the Upside Down and our reality shatters.",
    stat: "Antagonist"
  },
  {
    title: "Max's Fate",
    desc: "Trapped in a coma, her mind is a fortress. Or a prison? Eleven must navigate the void to find the spark of life that remains within her friend.",
    stat: "Status: Unknown"
  }
];

export const InfoSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Background Parallax
      gsap.to(".vine-bg", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Cards Animation
      cardRefs.current.forEach((card, index) => {
        gsap.fromTo(card,
          { 
            y: 100, 
            opacity: 0,
            rotateX: 45 
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 60%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="info-section" ref={sectionRef} className="relative min-h-screen bg-st-dark-blue overflow-hidden py-24 px-6 md:px-12">
      
      {/* Atmospheric Background Elements */}
      <div className="vine-bg absolute inset-0 opacity-20 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-st-red/20 via-transparent to-transparent" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-10" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="font-headline text-5xl md:text-7xl text-white mb-4 tracking-wider">
            The Beginning of the <span className="text-st-red text-glow-red">End</span>
          </h2>
          <div className="h-1 w-24 bg-st-red mx-auto rounded-full shadow-[0_0_15px_#D41B2B]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <div 
              key={idx}
              ref={el => cardRefs.current[idx] = el}
              className="group relative bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-lg overflow-hidden hover:border-st-red/50 transition-colors duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-st-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <span className="font-headline text-st-red text-xl tracking-widest block mb-2 opacity-80">
                {card.stat}
              </span>
              <h3 className="font-headline text-4xl text-white mb-4 group-hover:translate-x-2 transition-transform duration-300">
                {card.title}
              </h3>
              <p className="font-body text-gray-400 leading-relaxed relative z-10">
                {card.desc}
              </p>
              
              {/* Corner accent */}
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-st-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </div>
  );
};