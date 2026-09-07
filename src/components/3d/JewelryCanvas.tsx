import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import { MaterialType } from '../../types';
import { RotateCw, ZoomIn, Sparkles, Eye } from 'lucide-react';

interface JewelryCanvasProps {
  material?: MaterialType;
  type?: 'ring' | 'gem' | 'pendant';
  fallbackImage?: string;
  autoRotateDefault?: boolean;
}

// Sparkle Particle Field
function SparkleField({ count = 40 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const [positions] = useState(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 8;
      pos[i + 1] = (Math.random() - 0.5) * 8;
      pos[i + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  });

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.04;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.02) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#F5E6BE"
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// 3D Procedural Ring Mesh
function LuxuryRingModel({ material = '18K Yellow Gold' }: { material: MaterialType }) {
  const groupRef = useRef<THREE.Group>(null);
  const diamondRef = useRef<THREE.Mesh>(null);

  // Material settings according to gold alloy
  const metalProps = React.useMemo(() => {
    switch (material) {
      case 'Platinum':
        return {
          color: new THREE.Color('#EAEAEA'),
          metalness: 0.98,
          roughness: 0.12,
          clearcoat: 0.8,
        };
      case '18K Rose Gold':
        return {
          color: new THREE.Color('#DF9C9D'),
          metalness: 0.94,
          roughness: 0.16,
          clearcoat: 0.6,
        };
      case '18K Yellow Gold':
      default:
        return {
          color: new THREE.Color('#D8B046'),
          metalness: 0.96,
          roughness: 0.14,
          clearcoat: 0.7,
        };
    }
  }, [material]);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle breathing idle movement
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.06;
    }
    if (diamondRef.current) {
      diamondRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group ref={groupRef} scale={[1.25, 1.25, 1.25]} rotation={[0.4, 0.6, 0]}>
      {/* Main Ring Band */}
      <mesh castShadow receiveShadow>
        <torusGeometry args={[1.5, 0.2, 32, 100]} />
        <meshStandardMaterial
          color={metalProps.color}
          metalness={metalProps.metalness}
          roughness={metalProps.roughness}
        />
      </mesh>

      {/* Shoulder Pavé Accent Strips */}
      <mesh position={[0.7, 1.2, 0.05]} rotation={[0, 0, -0.6]}>
        <cylinderGeometry args={[0.08, 0.08, 0.7, 16]} />
        <meshStandardMaterial color={metalProps.color} metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[-0.7, 1.2, 0.05]} rotation={[0, 0, 0.6]}>
        <cylinderGeometry args={[0.08, 0.08, 0.7, 16]} />
        <meshStandardMaterial color={metalProps.color} metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Cathedral Collet & 4 Prongs */}
      <group position={[0, 1.6, 0]}>
        {/* Base Bezel Ring */}
        <mesh position={[0, 0.05, 0]}>
          <torusGeometry args={[0.55, 0.08, 16, 32]} />
          <meshStandardMaterial color={metalProps.color} metalness={0.98} roughness={0.12} />
        </mesh>

        {/* 4 Prongs holding stone */}
        {[-0.38, 0.38].map((x, i) =>
          [-0.38, 0.38].map((z, j) => (
            <mesh key={`${i}-${j}`} position={[x, 0.35, z]} rotation={[z * 0.3, 0, -x * 0.3]}>
              <cylinderGeometry args={[0.05, 0.06, 0.7, 12]} />
              <meshStandardMaterial color={metalProps.color} metalness={0.98} roughness={0.1} />
            </mesh>
          ))
        )}

        {/* Center Diamond Gemstone */}
        <mesh ref={diamondRef} position={[0, 0.45, 0]} castShadow>
          <octahedronGeometry args={[0.68, 2]} />
          <meshPhysicalMaterial
            roughness={0.03}
            transmission={0.94}
            thickness={1.4}
            ior={2.417}
            color="#FFFFFF"
            attenuationColor="#FFF8ED"
            attenuationDistance={1.2}
            specularColor="#FFFFFF"
            specularIntensity={2.5}
            transparent
            opacity={0.96}
          />
        </mesh>

        {/* Internal Light Glint inside Diamond */}
        <pointLight position={[0, 0.45, 0]} color="#FFF0D0" intensity={1.5} distance={1.2} />
      </group>
    </group>
  );
}

// Fallback 360 viewer for smooth image scrubbing
function ImageFallback360({ image, name }: { image: string; name: string }) {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - startXRef.current;
    setRotation((prev) => prev + delta * 0.4);
    startXRef.current = e.clientX;
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div
      className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className="w-full h-full max-h-[480px] p-6 flex items-center justify-center transition-transform duration-75"
        style={{
          transform: `perspective(1000px) rotateY(${rotation}deg) scale(1.02)`,
        }}
      >
        <img
          src={image}
          alt={name}
          className="max-h-[380px] w-auto object-contain drop-shadow-[0_20px_35px_rgba(212,175,55,0.18)]"
          draggable={false}
        />
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full glass-panel border border-gold-500/20 text-xs text-gold-300 flex items-center gap-2">
        <RotateCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
        <span>Drag to rotate 360°</span>
      </div>
    </div>
  );
}

export const JewelryCanvas: React.FC<JewelryCanvasProps> = ({
  material = '18K Yellow Gold',
  fallbackImage,
  autoRotateDefault = true,
}) => {
  const [autoRotate, setAutoRotate] = useState(autoRotateDefault);
  const [use3D, setUse3D] = useState(true);
  const [hasWebGlError, setHasWebGlError] = useState(false);
  const controlsRef = useRef<any>(null);

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  if (hasWebGlError || !use3D) {
    return (
      <div className="relative w-full h-full min-h-[400px] bg-charcoal-950 rounded-2xl overflow-hidden border border-charcoal-800">
        <ImageFallback360
          image={
            fallbackImage ||
            'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1000'
          }
          name="AURA Fine Jewelry"
        />
        <button
          onClick={() => setUse3D(true)}
          className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs glass-panel text-stone-300 hover:text-gold-400 border border-white/10 transition-colors flex items-center gap-1.5"
        >
          <Eye className="w-3.5 h-3.5" />
          Switch to 3D View
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[420px] bg-gradient-to-b from-charcoal-900/60 to-obsidian rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl group">
      {/* Background Subtle Luxury Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(212,175,55,0.09)_0%,transparent_70%)] pointer-events-none" />

      <Canvas
        shadows
        camera={{ position: [0, 1.8, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.15;
        }}
        onError={() => setHasWebGlError(true)}
      >
        <Suspense fallback={null}>
          {/* Studio Lighting Rig */}
          <ambientLight intensity={0.8} />
          
          {/* Main Key Light */}
          <directionalLight
            position={[5, 8, 5]}
            intensity={2.2}
            color="#FFF5E0"
            castShadow
            shadow-mapSize={[1024, 1024]}
          />

          {/* Cool Fill Light */}
          <directionalLight
            position={[-5, 3, -2]}
            intensity={1.1}
            color="#D8E4F8"
          />

          {/* Warm Champagne Rim Light */}
          <spotLight
            position={[0, 6, -5]}
            intensity={3.5}
            color="#D4AF37"
            angle={0.6}
            penumbra={0.8}
          />

          {/* Floating Luxury Mesh */}
          <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
            <LuxuryRingModel material={material} />
          </Float>

          {/* Ambient Particles */}
          <SparkleField count={45} />

          {/* Orbit Controls with Damping */}
          <OrbitControls
            ref={controlsRef}
            enablePan={false}
            enableZoom={true}
            minDistance={2.5}
            maxDistance={7}
            autoRotate={autoRotate}
            autoRotateSpeed={1.2}
            dampingFactor={0.06}
            maxPolarAngle={Math.PI / 1.7}
            minPolarAngle={Math.PI / 5}
          />
        </Suspense>
      </Canvas>

      {/* Floating Interactive Controls HUD */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md border transition-all flex items-center gap-1.5 ${
              autoRotate
                ? 'bg-gold-500/20 text-gold-300 border-gold-500/40 shadow-gold-sm'
                : 'bg-charcoal-900/80 text-stone-400 border-white/10 hover:text-stone-200'
            }`}
            title="Toggle 360° Auto-Rotation"
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
            <span>{autoRotate ? 'Rotating' : 'Rotate'}</span>
          </button>

          <button
            onClick={handleResetCamera}
            className="px-3 py-1.5 rounded-full text-xs bg-charcoal-900/80 text-stone-400 border border-white/10 hover:text-stone-200 hover:border-gold-500/30 transition-all flex items-center gap-1.5"
            title="Reset Camera Angle"
          >
            <ZoomIn className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          {fallbackImage && (
            <button
              onClick={() => setUse3D(false)}
              className="px-3 py-1.5 rounded-full text-xs bg-charcoal-900/80 text-stone-400 border border-white/10 hover:text-stone-200 transition-all"
            >
              Photo View
            </button>
          )}

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-obsidian/80 border border-gold-500/20 text-[11px] text-gold-400 font-mono tracking-wider">
            <Sparkles className="w-3 h-3 text-gold-400" />
            <span>3D ATELIER</span>
          </div>
        </div>
      </div>

      {/* Top Left Material Indicator */}
      <div className="absolute top-4 left-4 pointer-events-none">
        <span className="text-[11px] uppercase tracking-widest text-stone-400 font-mono px-3 py-1 rounded-full glass-panel border border-white/10">
          Finish: <span className="text-gold-300 font-semibold">{material}</span>
        </span>
      </div>
    </div>
  );
};
