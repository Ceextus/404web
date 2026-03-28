"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const processSteps = [
  {
    number: "01",
    title: "Discovery & Brainstorming",
    description: "We begin by deeply understanding your vision, exploring possibilities, and formulating architectural strategies that align perfectly with your business goals.",
  },
  {
    number: "02",
    title: "Strategic Research",
    description: "Our engineers analyze market conditions, technical constraints, and optimal tech stacks to ensure we approach the build with precision and foresight.",
  },
  {
    number: "03",
    title: "Architecture & Adjusting",
    description: "We map out the database schemas, API routes, and user flows. Based on research, we fine-tune the blueprints before a single line of code is written.",
  },
  {
    number: "04",
    title: "Engine Implementation",
    description: "The build phase. Our developers write clean, modular, and scalable code, executing the Next.js and React Native architectures with velocity.",
  },
  {
    number: "05",
    title: "Rigorous Testing",
    description: "Security audits, performance profiling, and QA. We ensure the application runs flawlessly, handles high concurrency, and meets our LCP < 1.2s standard.",
  },
  {
    number: "06",
    title: "Global Deployment",
    description: "The product goes live. We deploy to edge networks, monitor initial performance metrics, and ensure a seamless, zero-downtime launch for your users.",
  },
];

export default function WorkingProcess() {
  const [[page, direction], setPage] = useState([0, 0]);
  const stepsPerPage = 3;
  const totalPages = Math.ceil(processSteps.length / stepsPerPage);

  const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 500 : -500,
        opacity: 0,
      };
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => {
      return {
        x: direction < 0 ? 500 : -500,
        opacity: 0,
      };
    },
  };

  const paginate = (newDirection) => {
    const newPage = page + newDirection;
    if (newPage >= 0 && newPage < totalPages) {
      setPage([newPage, newDirection]);
    }
  };

  const visibleStartIndex = page * stepsPerPage;
  const visibleSteps = processSteps.slice(visibleStartIndex, visibleStartIndex + stepsPerPage);

  return (
    <section className="relative z-50 py-24 lg:py-32 px-6 bg-slate-50 font-montserrat shadow-[0_-20px_40px_rgba(0,0,0,0.1)] rounded-t-[3rem]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-8 h-[1px] bg-[#c2a66b]"></span>
              <span className="text-[#c2a66b] text-sm font-semibold tracking-widest uppercase">
                Our Methodology
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-outfit text-[#050b14] leading-[1.1]">
              A Precision-Engineered <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c2a66b] to-[#b39556]">
                Development Process.
              </span>
            </h2>
          </div>
          
          <div className="flex flex-col items-start lg:items-end gap-6">
            <p className="text-gray-600 font-light max-w-sm lg:text-right">
              From the initial concept to global deployment, our systematic approach guarantees zero technical debt and absolute scalability.
            </p>
            <button className="bg-[#050b14] text-white px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-[#c2a66b] hover:text-[#050b14] transition-colors duration-300 rounded-full shadow-lg">
              Start Your Project
            </button>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="relative w-full h-1 bg-gray-200 rounded-full mb-16 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-[#c2a66b]"
            initial={{ width: 0 }}
            animate={{ width: `${((page + 1) / totalPages) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>

        {/* Animated Slider Container (Fixed Height to prevent layout jumping) */}
        <div className="relative w-full overflow-hidden" style={{ minHeight: "450px" }}>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {visibleSteps.map((step) => (
                <div 
                  key={step.number} 
                  className="group relative bg-white rounded-3xl p-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_20px_60px_rgba(194,166,107,0.15)] hover:border-[#c2a66b]/30 transition-all duration-500 overflow-hidden flex flex-col justify-between"
                  style={{ minHeight: "350px" }}
                >
                  <div className="absolute -top-6 -right-4 text-[120px] font-bold text-gray-50/80 group-hover:text-[#c2a66b]/5 transition-colors duration-500 z-0 pointer-events-none font-outfit select-none">
                    {step.number}
                  </div>
                  
                  <div className="relative z-10 flex-grow">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-8 border border-gray-100 group-hover:bg-[#050b14] group-hover:border-[#050b14] transition-colors duration-500 shadow-sm">
                      <span className="text-xl font-bold text-[#c2a66b]">
                        {step.number}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-[#050b14] mb-4 group-hover:text-[#c2a66b] transition-colors duration-300">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-500 font-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#c2a66b] group-hover:w-full transition-all duration-500 ease-out" />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center mt-12 gap-6 relative z-10">
          <button
            onClick={() => paginate(-1)}
            disabled={page === 0}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
              page === 0
                ? "bg-white text-gray-300 shadow-sm cursor-not-allowed border border-gray-100"
                : "bg-white text-[#050b14] shadow-md hover:shadow-lg hover:text-[#c2a66b] hover:border-[#c2a66b] border border-transparent cursor-pointer"
            }`}
            aria-label="Previous steps"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <div 
                key={idx} 
                className={`h-2 rounded-full transition-all duration-500 ${
                  page === idx ? "w-8 bg-[#c2a66b]" : "w-2 bg-gray-200"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => paginate(1)}
            disabled={page === totalPages - 1}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
              page === totalPages - 1
                ? "bg-white text-gray-300 shadow-sm cursor-not-allowed border border-gray-100"
                : "bg-[#050b14] text-[#c2a66b] shadow-md hover:shadow-lg hover:bg-[#c2a66b] hover:text-[#050b14] cursor-pointer"
            }`}
            aria-label="Next steps"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

      </div>
    </section>
  );
}
