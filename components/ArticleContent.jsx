"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowLeft, Calendar, User, Share2 } from "lucide-react";

// Simple markdown-like parser for ## headings and paragraphs
function parseContent(content) {
  if (!content) return [];
  const lines = content.split("\n");
  const blocks = [];
  let currentParagraph = [];

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join("\n").trim();
      if (text) blocks.push({ type: "p", text });
      currentParagraph = [];
    }
  };

  for (const line of lines) {
    if (line.startsWith("## ")) {
      flushParagraph();
      blocks.push({ type: "h2", text: line.replace(/^## /, "") });
    } else if (line.startsWith("### ")) {
      flushParagraph();
      blocks.push({ type: "h3", text: line.replace(/^### /, "") });
    } else if (line.trim() === "") {
      flushParagraph();
    } else {
      currentParagraph.push(line);
    }
  }
  flushParagraph();
  return blocks;
}

// Simple inline formatting: **bold** and *italic*
function formatInline(text) {
  const parts = [];
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[2]) {
      parts.push(<strong key={match.index} className="font-bold text-white">{match[2]}</strong>);
    } else if (match[3]) {
      parts.push(<em key={match.index} className="italic">{match[3]}</em>);
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export default function ArticleContent({ post }) {
  const publishDate = new Date(post.published_at || post.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const contentBlocks = parseContent(post.content);

  return (
    <main className="bg-[#050b14] min-h-screen font-sans selection:bg-[#c2a66b]/30 selection:text-white pb-32">
      
      {/* Cinematic Article Hero */}
      <section className="relative w-full pt-40 pb-16 flex flex-col items-center overflow-hidden border-b border-white/5">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#1a4fb0]/10 blur-[150px] rounded-full pointer-events-none z-0" />
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-[#c2a66b]/10 blur-[120px] rounded-full pointer-events-none z-0" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 w-full flex flex-col items-center text-center leading-tight">
          
          <Link href="/insights" className="group flex items-center gap-2 text-gray-400 hover:text-[#c2a66b] transition-colors mb-12 text-xs md:text-sm tracking-widest uppercase font-semibold border border-white/5 rounded-full px-4 py-2 bg-white/5 backdrop-blur-md">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Insights
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full flex flex-col items-center text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="py-1 px-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                <span className="text-[#c2a66b] text-[10px] md:text-xs font-semibold tracking-widest uppercase">{post.category}</span>
              </div>
              {post.read_time && (
                <div className="flex items-center gap-2 text-gray-400 text-xs font-semibold tracking-widest uppercase">
                  <Clock className="w-3.5 h-3.5 text-[#c2a66b]" />
                  {post.read_time}
                </div>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-outfit text-white tracking-tight leading-[1.1] mb-10 max-w-3xl">
              {post.title}
            </h1>

            <div className="flex flex-col sm:flex-row items-center justify-center border-t border-white/10 pt-8 mt-4 gap-6 sm:gap-12 w-full max-w-2xl">
              {post.author_name && (
                <>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#0a1628] flex items-center justify-center text-gray-400 overflow-hidden border border-[#c2a66b]/30">
                      <User className="w-5 h-5 text-[#c2a66b]" />
                    </div>
                    <div className="text-left">
                      <p className="text-white text-sm font-bold tracking-wide">{post.author_name}</p>
                      {post.author_role && <p className="text-gray-500 text-[10px] md:text-xs font-semibold tracking-widest uppercase">{post.author_role}</p>}
                    </div>
                  </div>
                  <div className="hidden sm:block w-[1px] h-10 bg-white/10"></div>
                </>
              )}

              <div className="flex items-center gap-2 text-gray-400 text-[10px] md:text-xs tracking-widest uppercase font-semibold">
                 <Calendar className="w-3.5 h-3.5 text-[#c2a66b]" />
                 {publishDate}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      {post.image_url && (
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto px-6 mb-20 relative z-20 -mt-10"
        >
          <div className="relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
             <div className="absolute inset-0 bg-[#0a1628]" />
             <img
               src={post.image_url}
               alt={post.title}
               className="absolute inset-0 w-full h-full object-cover opacity-60"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#050b14]/50 via-transparent to-transparent opacity-100" />
          </div>
        </motion.section>
      )}

      {/* Article Content */}
      <section className="max-w-[750px] mx-auto px-6 relative z-20">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="prose prose-invert prose-lg max-w-none 
          prose-headings:font-outfit prose-headings:font-bold prose-headings:text-white
          prose-p:text-gray-400 prose-p:font-light prose-p:leading-relaxed prose-p:text-[17px] md:prose-p:text-lg"
        >
          {contentBlocks.map((block, i) => {
            if (block.type === 'h2') {
              return (
                <h2 key={i} className="text-3xl mt-16 mb-8 flex items-center gap-4">
                  <span className="w-8 h-[2px] bg-[#c2a66b] inline-block"></span>
                  {block.text}
                </h2>
              );
            }
            if (block.type === 'h3') {
              return (
                <h3 key={i} className="text-xl mt-10 mb-4 text-white">
                  {block.text}
                </h3>
              );
            }
            if (block.type === 'p') {
              return (
                <p key={i} className="mb-6">
                  {formatInline(block.text)}
                </p>
              );
            }
            return null;
          })}
        </motion.div>

        {/* Share & Footer Actions */}
        <div className="mt-24 pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
           <div>
             <p className="text-white text-lg font-bold font-outfit mb-1">Enjoyed this masterclass?</p>
             <p className="text-gray-500 text-xs tracking-widest uppercase font-semibold">Share it with your network.</p>
           </div>
           <button 
             onClick={() => { if (navigator.share) navigator.share({ title: post.title, url: window.location.href }); else navigator.clipboard.writeText(window.location.href).then(() => alert("Link copied!")); }}
             className="flex items-center gap-3 px-8 py-4 rounded-full bg-[#0a1628] border border-[#c2a66b]/30 hover:border-[#c2a66b] hover:bg-[#c2a66b] hover:text-[#050b14] transition-all duration-300 text-white text-xs font-bold tracking-widest uppercase group shadow-lg"
           >
             <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
             Share Article
           </button>
        </div>
      </section>

    </main>
  );
}
