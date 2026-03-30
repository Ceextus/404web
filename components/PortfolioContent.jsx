"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Search } from "lucide-react";

const PortfolioCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="block">
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative group rounded-3xl overflow-hidden cursor-pointer bg-[#0a1628] border border-white/5 shadow-2xl h-[360px] md:h-[380px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="w-full h-full transition-transform duration-700 ease-[0.16,1,0.3,1]" style={{ transform: isHovered ? "scale(1.08)" : "scale(1)" }}>
          <img
            src={project.image_url || project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-30 transition-opacity duration-700"
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-[#050b14]/70 to-transparent z-10" />
      <div className={`absolute inset-0 bg-[#c2a66b]/20 mix-blend-overlay transition-opacity duration-700 z-10 ${isHovered ? "opacity-100" : "opacity-0"}`} />
      <div className={`absolute inset-0 border-2 border-[#c2a66b]/30 rounded-3xl z-20 transition-all duration-700 pointer-events-none ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]"}`} />

      <div className="relative z-30 w-full h-full flex flex-col justify-between p-6 md:p-8 pointer-events-none">
        <div className="flex justify-between items-start">
          <div className="py-1.5 px-3 md:px-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <span className="text-gray-200 text-[10px] md:text-xs font-semibold tracking-widest uppercase">{project.category}</span>
          </div>
          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center backdrop-blur-md transition-all duration-500 ease-out ${isHovered ? "bg-[#c2a66b] text-[#050b14] border-[#c2a66b] scale-100 rotate-0" : "bg-white/5 border-white/10 text-white scale-90 -rotate-45"}`}>
            <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
          </div>
        </div>

        <div className="mt-auto transform transition-transform duration-500">
          <p className="text-[#c2a66b] text-[10px] md:text-xs font-medium tracking-widest mb-2 uppercase flex items-center gap-2">
            <span className="w-4 h-[1px] bg-[#c2a66b] opacity-60"></span> {project.client}
          </p>
          <h3 className="text-2xl md:text-3xl font-bold font-outfit text-white leading-tight mb-3 transition-colors duration-500">{project.title}</h3>
          <div className={`grid transition-all duration-500 ease-[0.16,1,0.3,1] ${isHovered ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"}`}>
            <div className="overflow-hidden">
              <p className="text-gray-400 text-sm leading-relaxed pb-1 line-clamp-3">{project.description}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
    </a>
  );
};

export default function PortfolioContent({ projects, categories }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <main className="bg-[#050b14] min-h-screen font-sans">
      <section className="relative w-full min-h-[50vh] md:min-h-[55vh] flex flex-col items-center justify-center overflow-hidden pt-24 pb-12">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-[#1a4fb0]/15 blur-[120px] rounded-full pointer-events-none z-0" />
        <div className="absolute top-20 -right-32 w-[500px] h-[500px] bg-[#c2a66b]/10 blur-[100px] rounded-full pointer-events-none z-0" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-outfit text-white tracking-tight leading-[1.1] mb-6">
              Our Crafted <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c2a66b] to-[#f4d083] relative inline-block">Masterpieces.</span>
            </h1>
            <p className="text-gray-400 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed">
              Explore a curated selection of highly engineered digital solutions, scalable architectures, and cinematic user experiences.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative z-20 bg-[#050b14] px-4 sm:px-6 lg:px-8 pb-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="border-b border-white/5 pb-6 mb-12 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-4 sm:gap-6 min-w-max">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs md:text-sm font-semibold tracking-widest uppercase transition-all duration-300 pb-2 relative group flex-shrink-0
                    ${activeCategory === cat ? "text-[#c2a66b]" : "text-gray-500 hover:text-gray-300"}
                  `}
                >
                  {cat}
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-[#c2a66b] transition-all duration-300 rounded-t-sm
                    ${activeCategory === cat ? "w-full" : "w-0 group-hover:w-full bg-gray-600"}
                  `}></span>
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-10">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <PortfolioCard key={project.id} project={project} />
              ))}
            </AnimatePresence>

            {filteredProjects.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-20 text-center text-gray-400 flex flex-col items-center gap-4">
                <Search className="w-12 h-12 text-gray-600" />
                <p className="text-lg">No projects found in this category.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
