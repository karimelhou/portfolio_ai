'use client';

import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      const canvas = canvasRef.current;
      if (canvas) {
        const context = canvas.getContext('2d');
        if (context) {
          const width = 480;
          const height = 320;
          canvas.width = width;
          canvas.height = height;
          context.fillStyle = '#0f172a';
          context.fillRect(0, 0, width, height);
          context.fillStyle = '#38bdf8';
          context.fillText('AI STREAM PAUSED', 40, height / 2);
        }
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const width = 480;
    const height = 320;
    canvas.width = width;
    canvas.height = height;

    const columns = Math.floor(width / 16);
    const drops = new Array(columns).fill(0);
    const characters = 'アカサタナハマヤラワ0123456789AI⚙︎';

    let animationFrame: number;

    const draw = () => {
      context.fillStyle = 'rgba(4, 10, 25, 0.2)';
      context.fillRect(0, 0, width, height);
      context.fillStyle = '#38bdf8';
      context.font = '16px monospace';

      for (let i = 0; i < drops.length; i += 1) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        context.fillText(text, i * 16, drops[i] * 16);
        if (drops[i] * 16 > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 1;
      }
      animationFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationFrame);
  }, [reducedMotion]);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/80">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-xl text-white">Matrix rain</h3>
          <p className="text-sm text-white/70">Ambient data stream to evoke AI pipelines and signal flows.</p>
        </div>
      </div>
      <canvas ref={canvasRef} className="mt-6 w-full rounded-2xl border border-white/10" />
    </div>
  );
}
