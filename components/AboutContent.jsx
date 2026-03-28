"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutContent({ about = {} }) {
  const whoWeAre = about.who_we_are || { title: "Defining the Standard for Global Tech.", body: "" };
  const vision = about.vision || { title: "Vision", body: "" };
  const mission = about.mission || { title: "Mission", body: "" };

  // Split Who We Are body into paragraphs
  const whoWeAreParagraphs = whoWeAre.body
    ? whoWeAre.body.split("\n").filter(p => p.trim() !== "")
    : [];

  return (
    <main className="bg-[#050b14] min-h-screen font-sans selection:bg-[#c2a66b]/30 selection:text-white">
      
      {/* Cinematic Hero Header */}
      <section className="relative w-full min-h-[50vh] flex flex-col items-center justify-center overflow-hidden pt-32 pb-16">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-[#1a4fb0]/15 blur-[120px] rounded-full pointer-events-none z-0" />
        <div className="absolute top-20 -right-32 w-[500px] h-[500px] bg-[#c2a66b]/10 blur-[100px] rounded-full pointer-events-none z-0" />
        
        {/* <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-20 mb-8"
        >
          <nav className="flex items-center space-x-3 text-xs md:text-sm tracking-widest uppercase">
            <Link href="/" className="text-gray-400 hover:text-[#c2a66b] transition-colors duration-300">
              Home
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-[#c2a66b] font-semibold">About Us</span>
          </nav>
        </motion.div> */}

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          >
           
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-outfit text-white tracking-tight leading-[1.1] mb-6">
              Engineering <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c2a66b] to-[#f4d083] relative inline-block">
                 The Impossible.
              </span>
            </h1>
            
            <p className="text-gray-400 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed">
              We are an elite squad of architects, designers, and systems engineers building the digital foundation of tomorrow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="relative z-20 px-6 lg:px-8 py-20 bg-[#050b14] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-start">
            
            {/* Left: Who We Are */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="md:sticky md:top-32"
            >
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-8 h-[1px] bg-[#c2a66b]"></span>
                <span className="text-[#c2a66b] text-sm font-semibold tracking-widest uppercase">
                  Who We Are
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold font-outfit text-white leading-tight mb-8">
                {whoWeAre.title}
              </h2>
              
              <div className="space-y-6 text-gray-400 font-light leading-relaxed text-lg">
                {whoWeAreParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </motion.div>

            {/* Right: Vision & Mission */}
            <div className="flex flex-col gap-8">
              
              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-[#0a1628] rounded-3xl p-10 md:p-12 border border-[#c2a66b]/10 hover:border-[#c2a66b]/30 transition-colors duration-500 shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#1a4fb0]/10 rounded-full blur-[80px] group-hover:bg-[#1a4fb0]/20 transition-colors duration-700 pointer-events-none" />
                <h3 className="text-2xl font-bold font-outfit text-white mb-6 flex items-center gap-4 relative z-10">
                  <span className="w-12 h-[1px] bg-[#c2a66b] inline-block"></span> 
                  {vision.title}
                </h3>
                <p className="text-gray-400 font-light leading-relaxed text-lg relative z-10">
                  {vision.body}
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-[#0a1628] rounded-3xl p-10 md:p-12 border border-[#c2a66b]/10 hover:border-[#c2a66b]/30 transition-colors duration-500 shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#c2a66b]/10 rounded-full blur-[80px] group-hover:bg-[#c2a66b]/20 transition-colors duration-700 pointer-events-none" />
                <h3 className="text-2xl font-bold font-outfit text-white mb-6 flex items-center gap-4 relative z-10">
                  <span className="w-12 h-[1px] bg-[#c2a66b] inline-block"></span> 
                  {mission.title}
                </h3>
                <p className="text-gray-400 font-light leading-relaxed text-lg relative z-10">
                  {mission.body}
                </p>
              </motion.div>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
