import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  life: number;
  color: string;
}

export const CursorParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const lastMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Track mouse
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      
      // Calculate distance to determine how many particles to spawn
      const dist = Math.hypot(mouse.current.x - lastMouse.current.x, mouse.current.y - lastMouse.current.y);
      // Spawn fewer particles to keep it subtle
      const count = Math.min(3, Math.ceil(dist / 10)); 
      
      for(let i = 0; i < count; i++) {
        // Interpolate position for smoother trails
        const t = Math.random();
        const spawnX = lastMouse.current.x + (mouse.current.x - lastMouse.current.x) * t;
        const spawnY = lastMouse.current.y + (mouse.current.y - lastMouse.current.y) * t;
        createParticle(spawnX, spawnY);
      }
      
      lastMouse.current = { ...mouse.current };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const colors = [
      'rgba(212, 27, 43, 0.6)',   // ST Red (lower opacity)
      'rgba(255, 69, 0, 0.6)',    // Orange Red
      'rgba(255, 140, 0, 0.5)',   // Dark Orange
      'rgba(255, 255, 255, 0.4)'  // White hot center
    ];

    const createParticle = (x: number, y: number) => {
      particles.current.push({
        x: x + (Math.random() - 0.5) * 4,
        y: y + (Math.random() - 0.5) * 4,
        size: Math.random() * 1.5 + 0.5, // Smaller particles
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: -Math.random() * 1.5 - 0.5, // Float up
        life: 1.0,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Reduced shadow blur for performance and clarity
      ctx.shadowBlur = 2;
      ctx.shadowColor = "#D41B2B";

      for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i];
        
        // Faster fade out
        p.life -= 0.04 + Math.random() * 0.03; 
        p.x += p.speedX;
        p.y += p.speedY;
        p.size *= 0.92; // Shrink faster
        
        // Draw
        if (p.life > 0 && p.size > 0.1) {
          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          particles.current.splice(i, 1);
          i--;
        }
      }
      
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[100] mix-blend-screen" 
    />
  );
};