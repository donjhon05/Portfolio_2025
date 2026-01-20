'use client';

import React, { useEffect, useRef } from 'react';

interface TechIcon {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  label: string;
  color: string;
  opacity: number;
}

const PortfolioGraphics = ({
  intensity = 0.4,
  as: AsComponent = React.Fragment,
}: {
  intensity?: number;
  as?: React.ElementType;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const iconsRef = useRef<TechIcon[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const techStack = [
      { label: 'React', color: '#61dafb' },
      { label: 'Next.js', color: '#ffffff' },
      { label: 'TypeScript', color: '#3178c6' },
      { label: 'Tailwind', color: '#06b6d4' },
      { label: 'Node.js', color: '#68a063' },
      { label: 'MongoDB', color: '#13aa52' },
      { label: 'PostgreSQL', color: '#336791' },
      { label: 'JavaScript', color: '#f7df1e' },
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      iconsRef.current = [];

      const count = Math.floor(intensity * 15);
      for (let i = 0; i < count; i++) {
        const tech = techStack[i % techStack.length];
        iconsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 30 + 40,
          label: tech.label,
          color: tech.color,
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      iconsRef.current.forEach((icon, index) => {
        // Update position
        icon.x += icon.vx;
        icon.y += icon.vy;

        // Bounce off edges with damping
        if (icon.x < 0 || icon.x > canvas.width) icon.vx *= -0.95;
        if (icon.y < 0 || icon.y > canvas.height) icon.vy *= -0.95;

        // Keep in bounds
        icon.x = Math.max(icon.size / 2, Math.min(canvas.width - icon.size / 2, icon.x));
        icon.y = Math.max(icon.size / 2, Math.min(canvas.height - icon.size / 2, icon.y));

        // Draw glowing circle
        const gradient = ctx.createRadialGradient(icon.x, icon.y, 0, icon.x, icon.y, icon.size);
        gradient.addColorStop(0, `${icon.color}${Math.round(icon.opacity * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${icon.color}00`);

        ctx.fillStyle = gradient;
        ctx.fillRect(icon.x - icon.size, icon.y - icon.size, icon.size * 2, icon.size * 2);

        // Draw border circle
        ctx.strokeStyle = `${icon.color}${Math.round(icon.opacity * 150).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(icon.x, icon.y, icon.size / 3, 0, Math.PI * 2);
        ctx.stroke();

        // Connect nearby icons with lines
        for (let i = index + 1; i < iconsRef.current.length; i++) {
          const other = iconsRef.current[i];
          const distance = Math.hypot(other.x - icon.x, other.y - icon.y);
          if (distance < 200) {
            ctx.strokeStyle = `${icon.color}${Math.round((0.2 - distance / 1000) * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(icon.x, icon.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [intensity]);

  const wrapper = (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 bg-transparent"
    />
  );

  return AsComponent === React.Fragment ? wrapper : <AsComponent>{wrapper}</AsComponent>;
};

export default PortfolioGraphics;