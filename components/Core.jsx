"use client";

import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Twitter } from "lucide-react";

const DEFAULT_MEMBERS = [
  { name: "Godson Ogundare", role: "Chief Executive Officer", bio: "Visionary leader driving the strategic direction.", image_url: "/godson.jpg" },
  { name: "Chukwunonso Timothy Obi", role: "Chief Technology Officer", bio: "Head of engineering, architecting next-generation platforms.", image_url: "/nonso.jpg" },
  { name: "Sixtus Joseph", role: "Chief Operations Officer", bio: "Lead engineer orchestrating frontend development.", image_url: "/sixtus.jpeg" },
];

const DEFAULT_VALUES = [
  { title: "Absolute Integrity", description: "We write code with accountability. Zero technical debt, complete transparency." },
  { title: "Surgical Precision", description: "Every pixel, every API route, and every database query is optimized for velocity." },
  { title: "Confidentiality", description: "Enterprise-grade security and strict NDA compliance for all proprietary systems." },
];

export default function CoreTeamSection({ members: propMembers, coreValues: propValues }) {
  const teamMembers = propMembers?.length > 0 ? propMembers : DEFAULT_MEMBERS;
  const values = propValues?.length > 0 ? propValues : DEFAULT_VALUES;

  return (
    <section className="bg-[#050b14] py-24 md:py-32 px-6 overflow-hidden font-montserrat relative border-t border-white/5">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 md:gap-12 mb-20 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-8 h-[1px] bg-[#c2a66b]"></span>
              <span className="text-[#c2a66b] text-sm font-semibold tracking-widest uppercase">
                Executive Body
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-outfit text-white leading-[1.1]">
              Meet The <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">
                Architects.
              </span>
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-md"
          >
            <p className="text-gray-400 font-light leading-relaxed">
              404 Services is led by a specialized strike-team of engineers, analysts, and designers. We don&apos;t just write code; we architect elite digital ecosystems that redefine world-class industry standards.
            </p>
          </motion.div>
        </div>

        {/* Dynamic Partner Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-32 max-w-7xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
              className="group relative overflow-hidden bg-transparent"
            >
              <div className="relative w-full aspect-[4/5] bg-[#070f1c] rounded-2xl overflow-hidden mb-6 shadow-xl border border-white/5">
                <img 
                  src={member.image_url || member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-[#050b14]/10 to-transparent opacity-90 group-hover:opacity-30 transition-opacity duration-700" />
                <div className="absolute top-0 right-6 w-[2px] h-0 bg-[#c2a66b] group-hover:h-24 transition-all duration-700 ease-out delay-100 z-10" />
                
                {/* Social Links */}
                <div className="absolute bottom-6 right-6 flex flex-col gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-200 z-10">
                  {member.linkedin_url && (
                    <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#c2a66b] hover:border-[#c2a66b] hover:text-[#050b14] transition-all">
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.twitter_url && (
                    <a href={member.twitter_url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#c2a66b] hover:border-[#c2a66b] hover:text-[#050b14] transition-all">
                      <Twitter className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              <div className="relative z-10 pl-3 border-l-[1px] border-white/10 group-hover:border-[#c2a66b] transition-colors duration-500">
                <h3 className="text-xl md:text-2xl font-bold font-outfit text-white mb-1.5 transition-colors duration-300 group-hover:text-[#c2a66b]">
                  {member.name}
                </h3>
                <p className="text-[#c2a66b] text-[10px] md:text-xs font-semibold tracking-wider uppercase mb-3 text-opacity-80">
                  {member.role}
                </p>
                <p className="text-gray-400 font-light text-xs md:text-sm leading-relaxed line-clamp-4">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Core Values Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 pt-16 border-t border-white/5 max-w-6xl mx-auto">
          {values.map((val, idx) => (
            <motion.div 
              key={val.id || idx}
              initial={{ opacity: 0, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
            >
              <h4 className="text-xl font-bold font-outfit text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#c2a66b]" />
                {val.title}
              </h4>
              <p className="text-gray-500 font-light text-sm leading-relaxed">
                {val.description || val.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}