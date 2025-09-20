'use client';

import { useEffect, useRef, useState } from 'react';

const imageUrl = 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80';

export function EdgeDetectionDemo() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mode, setMode] = useState<'original' | 'edges'>('edges');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageUrl;
    img.onload = () => {
      const width = 480;
      const height = 320;
      canvas.width = width;
      canvas.height = height;
      context.drawImage(img, 0, 0, width, height);
      if (mode === 'edges') {
        applySobel(context, width, height);
      }
    };
  }, [mode]);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/80">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-xl text-white">Edge detection shader</h3>
          <p className="text-sm text-white/70">
            Sobel filter inspired by medical imaging pipelines. Switch between raw image and detected contours.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setMode('original')}
            className={`rounded-full px-4 py-2 text-sm ${mode === 'original' ? 'bg-white text-ink-900' : 'border border-white/20 text-white/70'}`}
          >
            Original
          </button>
          <button
            type="button"
            onClick={() => setMode('edges')}
            className={`rounded-full px-4 py-2 text-sm ${mode === 'edges' ? 'bg-white text-ink-900' : 'border border-white/20 text-white/70'}`}
          >
            Edges
          </button>
        </div>
      </div>
      <canvas ref={canvasRef} className="mt-6 w-full rounded-2xl border border-white/10" />
    </div>
  );
}

function applySobel(context: CanvasRenderingContext2D, width: number, height: number) {
  const imageData = context.getImageData(0, 0, width, height);
  const data = imageData.data;
  const grayscale = new Uint8ClampedArray(width * height);

  for (let i = 0; i < data.length; i += 4) {
    const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
    grayscale[i / 4] = gray;
  }

  const sobelData = new Uint8ClampedArray(width * height);
  const kernelX = [
    -1, 0, 1,
    -2, 0, 2,
    -1, 0, 1
  ];
  const kernelY = [
    -1, -2, -1,
    0, 0, 0,
    1, 2, 1
  ];

  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      let pixelX = 0;
      let pixelY = 0;
      let index = 0;
      for (let ky = -1; ky <= 1; ky += 1) {
        for (let kx = -1; kx <= 1; kx += 1) {
          const pixel = grayscale[(y + ky) * width + (x + kx)];
          pixelX += pixel * kernelX[index];
          pixelY += pixel * kernelY[index];
          index += 1;
        }
      }
      const magnitude = Math.sqrt(pixelX * pixelX + pixelY * pixelY);
      sobelData[y * width + x] = magnitude > 128 ? 255 : magnitude;
    }
  }

  for (let i = 0; i < data.length; i += 4) {
    const value = sobelData[i / 4];
    data[i] = value;
    data[i + 1] = value;
    data[i + 2] = value;
    data[i + 3] = 255;
  }

  context.putImageData(imageData, 0, 0);
}
