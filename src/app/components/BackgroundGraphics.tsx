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

    const FONT_SIZE = 26;
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
        // Random character
        const char = CHARS.charAt(Math.floor(Math.random() * CHARS.length));
        
        drop.y += drop.speed;

        if (drop.y > canvas.height) {
          drop.y = -FONT_SIZE;
        }

        // Subtle green color with higher opacity for visibility
        ctx.fillStyle = 'rgba(0, 180, 100, 0.35)';
        ctx.fillText(char, drop.x, drop.y);

        // Occasional brighter characters for visual interest
        if (Math.random() > 0.92) {
          ctx.fillStyle = 'rgba(100, 255, 150, 0.55)';
          ctx.fillText(char, drop.x, drop.y);
        }
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