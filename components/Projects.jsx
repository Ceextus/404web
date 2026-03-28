"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Bento span patterns for featured projects
const SPAN_PATTERNS = [
  "col-span-1 md:col-span-2 lg:col-span-2 row-span-2",
  "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
  "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
  "col-span-1 md:col-span-2 lg:col-span-3 row-span-1",
];

const DEFAULT_PROJECTS = [
  { id: 1, title: "FinTech Mobile Application", category: "App Development", client: "Global Bank Inc.", image_url: "/project1.jpg" },
  { id: 2, title: "SaaS Dashboard Architecture", category: "Web Development", client: "TechFlow Analytics", image_url: "/project2.jpg" },
  { id: 3, title: "E-Commerce Experience", category: "UI/UX Design", client: "Aura Premium", image_url: "/project3.jpg" },
  { id: 4, title: "Global Tech Rebrand", category: "Digital Identity", client: "Nexus Systems", image_url: "/project4.jpg" },
];

const TiltCard = ({ project, span }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -12;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 12;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    setIsHovered(false);
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
      }}
      className={`${span} relative group rounded-3xl overflow-hidden cursor-pointer bg-[#070f1c] border border-white/5 shadow-2xl`}
      style={{ minHeight: "350px", transformStyle: "preserve-3d", transition: "transform 0.1s ease-out" }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden rounded-3xl z-0">
        <div className="w-full h-full bg-slate-800 transition-transform duration-700 ease-out" style={{ transform: isHovered ? "scale(1.08)" : "scale(1)" }}>
          <img
            src={project.image_url || project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-[#050b14]/50 to-transparent z-10" />
      <div className={`absolute inset-0 bg-[#c2a66b]/20 mix-blend-overlay transition-opacity duration-500 z-10 ${isHovered ? "opacity-100" : "opacity-0"}`} />

      <div className="relative z-20 w-full h-full flex flex-col justify-between p-8 md:p-10 pointer-events-none" style={{ transform: "translateZ(50px)" }}>
        <div className="flex justify-between items-start">
          <div className="inline-flex py-1.5 px-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-md">
            <span className="text-white text-xs font-semibold tracking-wider uppercase">{project.category}</span>
          </div>
          <div className={`w-12 h-12 rounded-full border border-[#c2a66b]/30 flex items-center justify-center bg-[#c2a66b]/10 backdrop-blur-md transition-all duration-300 ${isHovered ? "bg-[#c2a66b] text-[#050b14] scale-110" : "text-[#c2a66b]"}`}>
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-auto">
          <p className="text-[#c2a66b] text-sm font-medium tracking-wide mb-2 uppercase">Client: {project.client}</p>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold font-outfit text-white leading-tight">{project.title}</h3>
        </div>
      </div>
    </motion.div>
  );
};

export default function PortfolioShowcase({ projects: propProjects }) {
  const displayProjects = propProjects?.length > 0 ? propProjects : DEFAULT_PROJECTS;

  return (
    <section className="bg-[#050b14] py-24 lg:py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-8 h-[1px] bg-[#c2a66b]"></span>
              <span className="text-[#c2a66b] text-sm font-semibold tracking-widest uppercase">Portfolio Showcase</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-outfit text-white leading-[1.1]">
              Engineered <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c2a66b] to-[#b39556]">Success</span>
            </h2>
          </div>
          <a href="/portfolio" className="group inline-flex items-center gap-2 text-[#c2a66b] font-semibold tracking-widest uppercase text-sm border-b border-transparent hover:border-[#c2a66b] pb-1 transition-all duration-300">
            View All Work
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[350px]"
          initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } }}
        >
          {displayProjects.map((project, idx) => (
            <TiltCard key={project.id || idx} project={project} span={SPAN_PATTERNS[idx % SPAN_PATTERNS.length]} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
