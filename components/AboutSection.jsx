"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Layers, ShieldCheck, MonitorPlay, Globe, Code, Cpu, Rocket, Target, Award } from "lucide-react";

// Icon mapping from string names to components
const ICON_MAP = {
  Zap: Zap, Layers: Layers, ShieldCheck: ShieldCheck, MonitorPlay: MonitorPlay,
  Globe: Globe, Code: Code, Cpu: Cpu, Rocket: Rocket, Target: Target, Award: Award,
};

// Fallback pillars data
const DEFAULT_PILLARS = [
  { title: "Velocity", subtitle: "Beyond Just Speed", description: "Next.js + Expo, SSR, edge-caching. We build for near-instantaneous load times.", icon_name: "Zap" },
  { title: "Hyper-Scalability", subtitle: "Elastic Architecture", description: "Modular architecture, decoupled microservices, and serverless functions.", icon_name: "Layers" },
  { title: "Fortified Security", subtitle: "Privacy by Design", description: "AES-256 encryption, OAuth 2.0, OWASP standards. Security is the foundation.", icon_name: "ShieldCheck" },
  { title: "Cinematic Aesthetic", subtitle: "UX Excellence", description: "High-contrast interfaces, glassmorphism, 60fps animations.", icon_name: "MonitorPlay" },
];

// Simple body text renderer: splits by blank lines into paragraphs, handles > quotes and **bold**
function renderBody(body) {
  if (!body) return null;
  const paragraphs = body.split("\n").filter((p) => p.trim() !== "");

  return paragraphs.map((p, i) => {
    // Quote line (starts with >)
    if (p.trim().startsWith(">")) {
      const text = p.trim().replace(/^>\s*/, "");
      return (
        <p key={i} className="text-xl text-[#c2a66b] font-medium italic border-l-2 border-[#c2a66b] pl-6 py-2 my-2 bg-[#c2a66b]/5">
          {text}
        </p>
      );
    }

    // Process **bold** markers
    const parts = p.split(/\*\*(.*?)\*\*/g);
    return (
      <p key={i}>
        {parts.map((part, j) =>
          j % 2 === 1 ? (
            <strong key={j} className="text-white font-medium">{part}</strong>
          ) : (
            <React.Fragment key={j}>{part}</React.Fragment>
          )
        )}
      </p>
    );
  });
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function AboutSection({ brandStory, pillars: propPillars }) {
  const heading1 = brandStory?.heading_line1 || "Solving the";
  const headingGlow = brandStory?.heading_glow || '"Unsolvable"';
  const bodyText = brandStory?.body || "";
  const ctaText = brandStory?.cta_text || "Discover Our Method";
  const pillars = propPillars?.length > 0 ? propPillars : DEFAULT_PILLARS;

  return (
    <section className="relative w-full bg-[#050b14] py-24 lg:py-32 overflow-hidden font-montserrat text-gray-200">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#c2a66b]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1a4fb0]/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">
        
        {/* Left: Brand Story */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col gap-8 justify-center"
        >
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-[1px] bg-[#c2a66b]"></span>
              <span className="text-[#c2a66b] text-sm font-semibold tracking-widest uppercase">Our Identity</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-outfit text-white leading-tight">
              {heading1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c2a66b] to-[#f4d083]">
                {headingGlow}
              </span>
            </h2>
          </div>

          <div className="space-y-6 text-gray-400 font-light leading-relaxed text-lg">
            {renderBody(bodyText)}
          </div>

          <div className="pt-4">
            <button className="flex items-center gap-2 group text-[#c2a66b] font-medium tracking-wide hover:text-white transition-colors duration-300">
              <span className="border-b border-[#c2a66b] pb-1 group-hover:border-white transition-colors duration-300">
                {ctaText}
              </span>
              <span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
            </button>
          </div>
        </motion.div>

        {/* Right: Four Pillars */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {pillars.map((pillar, index) => {
            const IconComp = ICON_MAP[pillar.icon_name] || Zap;
            return (
              <motion.div
                key={pillar.id || index}
                variants={itemVariants}
                className="group relative bg-white/[0.02] border border-white/[0.05] hover:border-[#c2a66b]/40 backdrop-blur-sm rounded-2xl p-8 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#c2a66b]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-[#c2a66b]/10 flex items-center justify-center mb-6 border border-[#c2a66b]/20 group-hover:scale-110 transition-transform duration-500">
                    <IconComp className="w-6 h-6 text-[#c2a66b]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#c2a66b] transition-colors duration-300">{pillar.title}</h3>
                  <p className="text-[#c2a66b] text-xs font-semibold uppercase tracking-wider mb-4">{pillar.subtitle}</p>
                  <p className="text-gray-400 text-sm leading-relaxed font-light">{pillar.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}