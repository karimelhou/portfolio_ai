'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PointMaterial, Points } from '@react-three/drei';
import { useTheme } from 'next-themes';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

const PARTICLE_COUNT = 3000;

function generatePositions() {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i += 1) {
    const phi = Math.acos(THREE.MathUtils.randFloatSpread(2));
    const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
    const radius = THREE.MathUtils.randFloat(2.5, 4.5);
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }
  return positions;
}

function ParticleField({ theme, animated }: { theme: string; animated: boolean }) {
  const points = useMemo(() => generatePositions(), []);
  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    const current = ref.current;
    if (!animated || !current) return;
    const elapsed = state.clock.getElapsedTime();
    const rotation = Math.sin(elapsed / 6) * 0.4;
    current.rotation.x = rotation / 3;
    current.rotation.y = rotation;
  });

  return (
    <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors={false}
        color={theme === 'light' ? '#0f172a' : '#38bdf8'}
        size={0.035}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

function NeuralLinks({ theme, animated }: { theme: string; animated: boolean }) {
  const material = useMemo(() => new THREE.LineBasicMaterial({ color: theme === 'light' ? '#fbbf24' : '#38bdf8' }), [theme]);
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const vertices: number[] = [];
    for (let i = 0; i < 180; i += 1) {
      const angle = (i / 180) * Math.PI * 2;
      const radius = 2.6 + Math.sin(i * 0.1) * 0.3;
      vertices.push(Math.cos(angle) * radius, Math.sin(angle) * 0.5, Math.sin(angle) * radius);
    }
    g.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    return g;
  }, []);
  const line = useMemo(() => new THREE.Line(geometry, material), [geometry, material]);

  useFrame((state) => {
    if (!animated) return;
    line.rotation.y += 0.0015;
    line.rotation.x = Math.sin(state.clock.getElapsedTime() / 8) * 0.2;
  });

  return <primitive object={line} />;
}

function SceneContent({ theme, animated }: { theme: string; animated: boolean }) {
  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 4, 4]} intensity={1.2} color={theme === 'light' ? '#fbbf24' : '#38bdf8'} />
      <ParticleField theme={theme} animated={animated} />
      <NeuralLinks theme={theme} animated={animated} />
    </group>
  );
}

export function HeroCanvas() {
  const { resolvedTheme = 'dark' } = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [supportsWebGL, setSupportsWebGL] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setSupportsWebGL(!!gl);
    } catch (error) {
      setSupportsWebGL(false);
    } finally {
      setChecked(true);
    }
  }, []);

  if (!checked || !supportsWebGL) {
    return (
      <div className="hero-fallback h-full w-full">
        {Array.from({ length: 20 }).map((_, index) => (
          <span key={index} className="dot" style={{ left: `${(index * 5) % 100}%`, top: `${(index * 7) % 100}%`, ['--delay' as string]: `${index * 120}ms` }} />
        ))}
      </div>
    );
  }

  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <SceneContent theme={resolvedTheme} animated={!prefersReducedMotion} />
      </Suspense>
      {!prefersReducedMotion ? <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} /> : null}
    </Canvas>
  );
}
