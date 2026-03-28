"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import * as THREE from "three";

const X_COUNT = 60;
const Y_COUNT = 40;
const TOTAL = X_COUNT * Y_COUNT;

// The highly interactive wave grid
function InteractiveGrid() {
  const meshRef = useRef();
  const { viewport, mouse, camera } = useThree();
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const mousePos = useRef(new THREE.Vector3());

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // 1. Raycast to find exact mouse 3D position
    const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
    vector.unproject(camera);
    const dir = vector.sub(camera.position).normalize();
    const distance = -camera.position.z / dir.z;
    const pos = camera.position.clone().add(dir.multiplyScalar(distance));
    
    // Smoothly interpolate the mouse position for a fluid trailing effect
    mousePos.current.lerp(pos, 0.1);

    let i = 0;
    const spacing = 0.4;
    
    for (let x = 0; x < X_COUNT; x++) {
      for (let y = 0; y < Y_COUNT; y++) {
        const px = (x - X_COUNT / 2) * spacing;
        const py = (y - Y_COUNT / 2) * spacing;
        
        const dist = Math.sqrt(
          Math.pow(px - mousePos.current.x, 2) + 
          Math.pow(py - mousePos.current.y, 2)
        );
        
        let pz = Math.sin(px * 0.5 + time * 0.8) * Math.cos(py * 0.5 + time * 0.8) * 0.8;
        let scale = 1;
        let rotSpeed = time * 0.2;

        const effectRadius = 4;
        if (dist < effectRadius) {
           const influence = (effectRadius - dist) / effectRadius;
           pz += Math.sin(influence * Math.PI) * 2;
           scale = 1 + influence * 2.5;             
           rotSpeed += influence * 4;               
        }
        
        dummy.position.set(px, py, pz - 6);  
        dummy.rotation.x = rotSpeed + px * 0.1;
        dummy.rotation.y = rotSpeed + py * 0.1;
        dummy.scale.set(scale, scale, scale);
        dummy.updateMatrix();
        
        meshRef.current.setMatrixAt(i++, dummy.matrix);
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, TOTAL]}>
      <octahedronGeometry args={[0.06, 0]} />
      <meshStandardMaterial 
        color="#c2a66b" 
        emissive="#5a4722" 
        emissiveIntensity={0.5} 
        roughness={0.2} 
        metalness={0.9} 
      />
    </instancedMesh>
  );
}

// Fallback content if Supabase returns empty
const DEFAULT_SLIDES = [
  {
    pill: "Digital Excellence",
    h1Main: "Rewriting the ",
    h1Glow: "Digital Standard.",
    p: "At 404services, we don’t just build software; we architect scalable digital ecosystems. From high-performance React Native apps to Next.js web architectures.",
  },
  {
    pill: "Beyond The Error",
    h1Main: "Precision-Engineered ",
    h1Glow: "Solutions.",
    p: "We specialize in solving the 'unsolvable'. Where other agencies say a feature is impossible, or a system is too complex — that is where our work begins.",
  },
  {
    pill: "Hyper-Scalability",
    h1Main: "Architecting the ",
    h1Glow: "Future System.",
    p: "Build for today, but architect for a million users tomorrow. We eliminate the need for costly total rewrites as your business scales and traffic spikes.",
  }
];

export default function HeroScene({ slides: propSlides = [] }) {
  const HERO_CONTENT = propSlides.length > 0 ? propSlides : DEFAULT_SLIDES;
  const [contentIndex, setContentIndex] = useState(0);

  // Automatically cycle through text every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setContentIndex((prev) => (prev + 1) % HERO_CONTENT.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [HERO_CONTENT.length]);

  const currentContent = HERO_CONTENT[contentIndex];

  return (
    <section className="relative w-full h-screen bg-[#050b14] overflow-hidden flex items-center">
      
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 2]}>
          <ambientLight intensity={0.2} color="#ffffff" />
          <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
          
          <pointLight position={[-10, 0, -5]} intensity={2} color="#1a4fb0" distance={20} />
          <pointLight position={[10, -5, -5]} intensity={2} color="#c2a66b" distance={20} />

          <InteractiveGrid />
          
          <Environment preset="city" />
        </Canvas>
      </div>

      {/* Cinematic Gradient Overlay (Ensures text readability) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050b14]/90 via-[#050b14]/50 to-transparent pointer-events-none z-10" />

      {/* Hero Content (HTML) overlay */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 h-full flex flex-col justify-center pointer-events-none">
        
        {/* Enable pointer events only for the text/buttons wrapper so they can be clicked */}
        <div className="max-w-2xl pointer-events-auto mt-20 md:mt-0 min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={contentIndex}
              initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: 30, filter: "blur(5px)" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <div className="inline-flex border border-[#c2a66b]/30 bg-[#c2a66b]/10 backdrop-blur-md rounded-full px-5 py-2 mb-8 items-center gap-2 shadow-[0_0_15px_rgba(194,166,107,0.15)]">
                <span className="w-2 h-2 rounded-full bg-[#c2a66b] animate-pulse"></span>
                <span className="text-[#c2a66b] text-xs font-semibold tracking-widest uppercase">
                  {currentContent.pill}
                </span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.1] mb-6 font-outfit tracking-tight">
                {currentContent.h1_main || currentContent.h1Main} <br />
                <span className="relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c2a66b] to-[#f4d083] relative z-10">
                    {currentContent.h1_glow || currentContent.h1Glow}
                  </span>
                  {/* Text glow effect */}
                  <span className="absolute inset-0 bg-[#c2a66b] blur-2xl opacity-20 z-0"></span>
                </span>
              </h1>
              
              <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-xl">
                {currentContent.description || currentContent.p}
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="flex flex-col sm:flex-row items-start gap-5 sm:gap-6"
          >
            {/* Primary CTA */}
            <Link href="/contact" className="relative group overflow-hidden rounded-full">
              <div className="absolute inset-0 bg-gradient-to-r from-[#c2a66b] to-[#f4d083] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              <button className="relative bg-[#c2a66b] text-[#050b14] px-8 py-4 text-sm font-semibold uppercase tracking-widest border border-transparent group-hover:border-[#c2a66b] group-hover:text-[#050b14] transition-colors duration-300 w-full sm:w-auto">
                Book us
              </button>
            </Link>

            {/* Secondary CTA */}
            <Link href="/portfolio" className="relative group rounded-full w-full sm:w-auto">
              <button className="w-full bg-transparent border border-[#c2a66b]/50 text-[#c2a66b] px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-[#c2a66b]/10 transition-colors duration-300 rounded-full backdrop-blur-sm group-hover:border-[#c2a66b]">
                View our Stack
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
      
    </section>
  );
}
