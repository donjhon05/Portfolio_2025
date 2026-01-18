'use client';

import React, { useEffect, useRef } from 'react';

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const FONT_SIZE = 32;
    // Mix of characters, numbers, and symbols for code effect
    const CHARS = 'ｦｧｨｩｪｫｬｭｮｯﾀﾁﾂﾃﾄﾅﾆﾇﾈﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;:,.<>?/\\~`';

    interface Drop {
      x: number;
      y: number;
      speed: number;
      trail: string[];
      trailOpacity: number;
    }

    const drops: Drop[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drops.length = 0;
      
      const columnCount = Math.ceil(canvas.width / FONT_SIZE);
      for (let i = 0; i < columnCount; i++) {
        drops.push({
          x: i * FONT_SIZE,
          y: Math.random() * canvas.height,
          speed: Math.random() * 2 + 1,
          trail: Array.from({ length: 8 }, () => 
            CHARS.charAt(Math.floor(Math.random() * CHARS.length))
          ),
          trailOpacity: Math.random() * 0.3 + 0.15,
        });
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      // Very subtle fade - keeps it clean
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${FONT_SIZE}px 'Courier New', monospace`;
      ctx.textBaseline = 'top';
      ctx.textAlign = 'left';

      drops.forEach((drop) => {
        drop.y += drop.speed;

        if (drop.y > canvas.height) {
          drop.y = -FONT_SIZE * 8;
          drop.trail = Array.from({ length: 8 }, () => 
            CHARS.charAt(Math.floor(Math.random() * CHARS.length))
          );
          drop.trailOpacity = Math.random() * 0.3 + 0.15;
        }

        // Draw the trail with fading effect
        drop.trail.forEach((char, i) => {
          const trailY = drop.y - i * FONT_SIZE;
          
          if (trailY < -FONT_SIZE || trailY > canvas.height) return;

          const fadeOpacity = (1 - i / drop.trail.length) * drop.trailOpacity;
          const isHead = i === 0;

          // Randomly corrupt/glitch characters
          let displayChar = char;
          if (Math.random() > 0.85) {
            displayChar = CHARS.charAt(Math.floor(Math.random() * CHARS.length));
          }

          if (isHead) {
            // Bright head with occasional corruption
            ctx.fillStyle = `rgba(100, 255, 150, ${Math.min(fadeOpacity * 2.5, 0.8)})`;
            
            // Add scanline glitch effect
            if (Math.random() > 0.92) {
              ctx.globalAlpha = 0.6;
              ctx.fillStyle = `rgba(255, 0, 100, 0.3)`;
            }
          } else if (i < 3) {
            // Bright mid-trail
            ctx.fillStyle = `rgba(100, 255, 150, ${fadeOpacity * 1.2})`;
          } else {
            // Faded tail
            ctx.fillStyle = `rgba(0, 180, 100, ${fadeOpacity})`;
          }

          ctx.fillText(displayChar, drop.x, trailY);
          ctx.globalAlpha = 1;
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ backgroundColor: '#000000' }}
    />
  );
};

export default MatrixBackground;