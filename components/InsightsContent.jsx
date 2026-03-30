"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowUpRight } from "lucide-react";

export default function InsightsContent({ posts }) {
  const handleScrollDown = () => {
    window.scrollBy({ top: window.innerHeight * 0.7, behavior: "smooth" });
  };

  return (
    <main className="bg-[#050b14] min-h-screen font-sans selection:bg-[#c2a66b]/30 selection:text-white pb-32">
      
      {/* Cinematic Hero Header */}
      <section className="relative w-full min-h-[50vh] md:min-h-[55vh] flex flex-col items-center justify-center overflow-hidden pt-32 pb-16">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-[#1a4fb0]/15 blur-[120px] rounded-full pointer-events-none z-0" />
        <div className="absolute top-20 -right-32 w-[500px] h-[500px] bg-[#c2a66b]/10 blur-[100px] rounded-full pointer-events-none z-0" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-outfit text-white tracking-tight leading-[1.1] mb-6">
              Engineering <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c2a66b] to-[#f4d083] relative inline-block">
                 Thought Leadership.
              </span>
            </h1>
            
            <p className="text-gray-400 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed mb-10">
              Explore critical insights, industry forecasts, and deep technical strategies from the bleeding edge of the global tech stack.
            </p>

            <div 
              onClick={handleScrollDown}
              className="mx-auto w-8 h-12 border border-white/20 rounded-full flex justify-center py-2 hover:border-[#c2a66b]/50 transition-colors bg-white/5 backdrop-blur-sm cursor-pointer group"
            >
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="w-1 h-2 bg-[#c2a66b] rounded-full"
              />
            </div>

          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="relative z-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-600">
            <p className="text-lg font-outfit font-semibold text-gray-500">No insights published yet.</p>
            <p className="text-sm text-gray-600 mt-2">Check back soon for thought leadership articles.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
            {posts.map((post, idx) => {
              const isLarge = idx === 0;
              const gridSpan = isLarge ? "lg:col-span-12 md:col-span-2" : "lg:col-span-6";
              const imageHeight = isLarge ? "h-[350px] md:h-[450px]" : "h-[300px]";
              const publishDate = new Date(post.published_at || post.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

              return (
                <Link href={`/insights/${post.slug}`} key={post.id} className={gridSpan}>
                  <motion.article 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    className="group cursor-pointer bg-[#0a1628] rounded-3xl overflow-hidden border border-white/5 hover:border-[#c2a66b]/30 transition-all duration-500 shadow-2xl flex flex-col h-full"
                  >
                  {/* Image */}
                  <div className={`relative w-full overflow-hidden ${imageHeight}`}>
                    <div className="absolute inset-0 bg-[#0a1628]" />
                    {post.image_url ? (
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-all duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] to-[#050b14]" />
                    )}
                    <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10 pointer-events-none">
                      <div className="py-1.5 px-4 rounded-full border border-white/10 bg-black/40 backdrop-blur-md">
                        <span className="text-[#c2a66b] text-[10px] md:text-xs font-semibold tracking-widest uppercase">{post.category}</span>
                      </div>
                      {post.read_time && (
                        <div className="py-1.5 px-3 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center gap-2">
                          <Clock className="w-3 h-3 text-gray-300" />
                          <span className="text-gray-300 text-[10px] md:text-xs font-semibold tracking-widest uppercase">{post.read_time}</span>
                        </div>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] to-transparent opacity-100 h-1/2 mt-auto" />
                  </div>

                  {/* Content */}
                  <div className="relative p-6 md:p-10 flex flex-col flex-grow bg-[#0a1628] z-20 border-t border-white/5 -mt-6">
                    <div className="flex justify-between items-start gap-6 mb-4">
                      <h2 className={`font-bold font-outfit text-white leading-tight transition-colors duration-300 group-hover:text-[#c2a66b] ${isLarge ? 'text-3xl md:text-5xl lg:text-5xl max-w-4xl' : 'text-2xl md:text-3xl'}`}>
                        {post.title}
                      </h2>
                      <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-md transition-all duration-500 ease-out group-hover:bg-[#c2a66b] group-hover:text-[#050b14] group-hover:border-[#c2a66b] group-hover:rotate-45">
                        <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-[#050b14]" />
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed line-clamp-3 mb-8 max-w-3xl">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto flex items-center gap-3 w-full border-t border-white/5 pt-6">
                       <span className="w-6 h-[1px] bg-gray-600 group-hover:bg-[#c2a66b] transition-colors"></span>
                       <span className="text-gray-500 text-[10px] md:text-xs font-semibold tracking-widest uppercase group-hover:text-gray-300 transition-colors">
                         Published: {publishDate}
                       </span>
                    </div>
                  </div>
                  </motion.article>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
