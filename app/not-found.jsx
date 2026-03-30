"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Component, Hexagon } from "lucide-react";

export default function NotFound() {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (typeof window === "undefined") return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Normalize coordinates from -1 to 1 based on center of screen
    const x = (clientX / innerWidth) * 2 - 1;
    const y = (clientY / innerHeight) * 2 - 1;
    setMousePos({ x, y });
  };

  return (
    <main 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full bg-[#050b14] overflow-hidden flex items-center justify-center font-sans"
      style={{ perspective: "1000px" }}
    >
      {/* Background Gradients & Ambient Glows */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-[#c2a66b]/5 rounded-full blur-[120px] pointer-events-none transition-transform duration-500 ease-out"
        style={{ transform: `translate(calc(-50% + ${mousePos.x * 60}px), calc(-50% + ${mousePos.y * 60}px))` }}
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#1a4fb0]/10 rounded-full blur-[100px] pointer-events-none transition-transform duration-700 ease-out delay-75"
        style={{ transform: `translate(calc(-50% + ${mousePos.x * -40}px), calc(-50% + ${mousePos.y * -40}px))` }}
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        
        {/* Intentionally visible floating hex particles */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-10 text-[#c2a66b]/20 hidden md:block"
        >
          <Hexagon className="w-16 h-16" />
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 30, 0], rotate: [0, -15, 15, 0] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-20 right-10 text-[#c2a66b]/10 hidden md:block"
        >
          <Hexagon className="w-24 h-24" />
        </motion.div>

        {/* 3D Floating 404 Text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-2 md:-mb-8"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${mousePos.x * 12}deg) rotateX(${mousePos.y * -12}deg)`,
          }}
        >
          {/* Back Shadow / Giant Glow */}
          <div 
            className="absolute -inset-4 text-[10rem] sm:text-[14rem] md:text-[22rem] font-bold font-outfit text-[#c2a66b]/20 blur-2xl select-none flex items-center justify-center leading-none pointer-events-none" 
            style={{ transform: "translateZ(-80px)" }}
          >
            404
          </div>
          
          {/* Chromatic Aberration Layers */}
          <div 
            className="absolute -inset-4 text-[10rem] sm:text-[14rem] md:text-[22rem] font-bold font-outfit text-red-500/10 blur-sm select-none flex items-center justify-center leading-none mix-blend-screen pointer-events-none" 
            style={{ transform: "translateZ(-30px) translateX(-10px)" }}
          >
            404
          </div>

          <div 
            className="absolute -inset-4 text-[10rem] sm:text-[14rem] md:text-[22rem] font-bold font-outfit text-blue-500/10 blur-sm select-none flex items-center justify-center leading-none mix-blend-screen pointer-events-none" 
            style={{ transform: "translateZ(-30px) translateX(10px)" }}
          >
            404
          </div>
          
          {/* Front Main Layer */}
          <h1 
            className="text-[10rem] sm:text-[14rem] md:text-[22rem] font-bold font-outfit text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-700 leading-none select-none drop-shadow-[0_20px_50px_rgba(194,166,107,0.2)] relative pointer-events-none"
            style={{ transform: "translateZ(60px)" }}
          >
            404
          </h1>
          
          {/* Diagonal slash effect cutting through the 404 */}
          <div 
            className="absolute top-1/2 left-[-10%] right-[-10%] h-[3px] bg-gradient-to-r from-transparent via-[#c2a66b] to-transparent shadow-[0_0_20px_#c2a66b] pointer-events-none" 
            style={{ transform: "translateZ(30px) rotate(-15deg)" }} 
          />
        </motion.div>

        {/* Copywriting */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="max-w-2xl mx-auto relative z-20"
        >
          <div className="inline-flex items-center gap-2 mb-6 py-1.5 px-4 rounded-full border border-[#c2a66b]/20 bg-[#c2a66b]/10 backdrop-blur-md shadow-[0_0_20px_rgba(194,166,107,0.1)]">
            <Component className="w-4 h-4 text-[#c2a66b]" />
            <span className="text-[#c2a66b] text-[10px] md:text-xs font-semibold tracking-widest uppercase">System Override : Success</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold font-outfit text-white mb-6 leading-tight">
            You're Not Lost. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c2a66b] to-[#f4d083]">
              You're Exactly Where You Should Be.
            </span>
          </h2>
          
          <p className="text-gray-400 font-light text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            For most, a 404 is a dead end. For us, it's the foundation. 
            Welcome to <strong className="text-white font-medium">404 Services</strong>. 
            We build the architecture that others can only imagine.
          </p>

          <Link href="/">
            <button className="group relative inline-flex items-center justify-center px-8 py-4 bg-transparent overflow-hidden rounded-xl border border-white/10 hover:border-[#c2a66b]/50 transition-colors duration-500 shadow-xl">
              <span className="absolute inset-0 bg-gradient-to-r from-[#c2a66b]/10 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
              <span className="relative flex items-center gap-3 text-white font-bold tracking-widest text-sm uppercase">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300 text-[#c2a66b]" />
                Return to Architecture
              </span>
            </button>
          </Link>
        </motion.div>

      </div>
    </main>
  );
}
