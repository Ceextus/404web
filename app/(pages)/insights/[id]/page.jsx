"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Clock, ArrowLeft, Calendar, User, Share2 } from "lucide-react";

// Mock data based on the previously defined articles
const getArticleData = (id) => {
  const articles = {
    "1": {
      title: "Mastering Dark UI Aesthetics in 2026.",
      category: "Cinematic UI/UX",
      readTime: "4 min read",
      image: "/project3.jpg",
      date: "March 20, 2026",
      author: "Godson Ogundare",
      authorRole: "Chief Executive Officer",
      content: [
        { type: "h2", text: "The Death of Pure Black" },
        { type: "p", text: "For years, dark mode was treated as a simple inversion of light interfaces. Designers threw #000000 on the background, #FFFFFF on the text, and called it a day. In 2026, pure black is dead. It causes eye strain, destroys depth perception, and completely flattens digital products." },
        { type: "p", text: "Instead, we leverage deep, rich spatial navies like #050b14. This provides a canvas that absorbs light rather than reflecting it, allowing primary accent colors—like our signature #c2a66b gold—to truly emit a perceived 'glow' rather than just sitting on the screen." },
        { type: "h2", text: "Orchestrating Glassmorphism & Depth" },
        { type: "p", text: "Modern interfaces require physical spatial awareness. By meticulously applying background-blur properties and low-opacity border strokes (border-white/5), we construct floating planes of glass. When combined with radial mesh gradients injected deep into the Z-axis (z-0), the interface stops feeling like a webpage and starts feeling like a cinematic heads-up display." },
        { type: "p", text: "We call this 'Cinematic Tech'. At 404 Services, it's not just an aesthetic—it's a retention strategy. Users linger on beautiful products. Visual retention directly translates to increased session duration and conversion." }
      ]
    },
    "2": {
      title: "The Future of Cross-Platform Development.",
      category: "Mobile Solutions",
      readTime: "6 min read",
      image: "/project4.jpg",
      date: "March 22, 2026",
      author: "Chukwunonso Timothy Obi",
      authorRole: "Chief Technology Officer",
      content: [
        { type: "h2", text: "Eradicating Native Overhead" },
        { type: "p", text: "Historically, deploying an app to both iOS and Android meant maintaining two entirely separate codebases. This meant double the engineers, double the QA cycles, and double the bugs. Today, frameworks like React Native and Expo have evolved to execute at near-native velocity." },
        { type: "p", text: "By unifying the codebase, we drastically cut down Time-to-Market (TTM). When a feature is shipped, it deploys simultaneously across the entire ecosystem. This isn't just a technical win; it's a massive financial advantage for startups and enterprises alike." },
        { type: "h2", text: "Silky 60FPS Performance" },
        { type: "p", text: "The old argument against cross-platform was performance. 'It feels clunky,' they said. By leveraging modern JavaScript engines (Hermes) and hardware-accelerated animations (Reanimated), we now achieve flawlessly smooth 60fps/120fps interfaces that are indistinguishable from Swift or Kotlin builds." }
      ]
    },
    "3": {
      title: "Why Your Startup Needs an MVP Before a Full Launch.",
      category: "Product Strategy",
      readTime: "5 min read",
      image: "/project1.jpg",
      date: "March 25, 2026",
      author: "Ifeanyi Emmanuel Opara",
      authorRole: "Product Manager",
      content: [
        { type: "h2", text: "The Trap of Over-Engineering" },
        { type: "p", text: "The single biggest killer of early-stage startups is over-engineering. Founders spend 12 months building a monolithic platform packed with 50 'essential' features, only to launch and discover the market only ever wanted two of them." },
        { type: "p", text: "A Minimum Viable Product (MVP) is not a 'bad' version of your idea. It is the absolute leanest, most surgical extraction of your core value proposition. It allows you to test your basic assumptions against real-world users instantly." },
        { type: "h2", text: "Velocity as a Weapon" },
        { type: "p", text: "At 404 Services, we specialize in high-velocity deployments. By architecting scalable but lightweight Next.js and Firebase backends, we can take a product from concept to production in weeks, not years. This allows founders to capture immediate feedback, pivot rapidly, and secure funding backed by genuine traction rather than hypothetical forecasts." }
      ]
    }
  };
  return articles[id] || null;
};

export default function ArticleDetail() {
  const params = useParams();
  const article = useMemo(() => getArticleData(params.id), [params.id]);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#050b14] flex flex-col items-center justify-center text-white font-outfit gap-6">
        <h1 className="text-5xl font-bold">Insight Not Found.</h1>
        <Link href="/insights" className="text-[#c2a66b] text-sm uppercase tracking-widest font-semibold hover:text-white transition-colors">
          Return to Hub
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-[#050b14] min-h-screen font-sans selection:bg-[#c2a66b]/30 selection:text-white pb-32">
      
      {/* Cinematic Article Hero */}
      <section className="relative w-full pt-40 pb-16 flex flex-col items-center overflow-hidden border-b border-white/5">
        {/* Ambient Glow */}
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
                <span className="text-[#c2a66b] text-[10px] md:text-xs font-semibold tracking-widest uppercase">
                  {article.category}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-xs font-semibold tracking-widest uppercase">
                 <Clock className="w-3.5 h-3.5 text-[#c2a66b]" />
                 {article.readTime}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-outfit text-white tracking-tight leading-[1.1] mb-10 max-w-3xl">
              {article.title}
            </h1>

            <div className="flex flex-col sm:flex-row items-center justify-center border-t border-white/10 pt-8 mt-4 gap-6 sm:gap-12 w-full max-w-2xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0a1628] flex items-center justify-center text-gray-400 overflow-hidden border border-[#c2a66b]/30">
                  <User className="w-5 h-5 text-[#c2a66b]" />
                </div>
                <div className="text-left">
                  <p className="text-white text-sm font-bold tracking-wide">{article.author}</p>
                  <p className="text-gray-500 text-[10px] md:text-xs font-semibold tracking-widest uppercase">{article.authorRole}</p>
                </div>
              </div>
              
              <div className="hidden sm:block w-[1px] h-10 bg-white/10"></div>

              <div className="flex items-center gap-2 text-gray-400 text-[10px] md:text-xs tracking-widest uppercase font-semibold">
                 <Calendar className="w-3.5 h-3.5 text-[#c2a66b]" />
                 {article.date}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-5xl mx-auto px-6 mb-20 relative z-20 -mt-10"
      >
        <div className="relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
           <div className="absolute inset-0 bg-[#0a1628]" />
           <Image 
             src={article.image}
             alt={article.title}
             fill
             className="object-cover opacity-60"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#050b14]/50 via-transparent to-transparent opacity-100" />
        </div>
      </motion.section>

      {/* Article Content Area */}
      <section className="max-w-[750px] mx-auto px-6 relative z-20">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="prose prose-invert prose-lg max-w-none 
          prose-headings:font-outfit prose-headings:font-bold prose-headings:text-white
          prose-p:text-gray-400 prose-p:font-light prose-p:leading-relaxed prose-p:text-[17px] md:prose-p:text-lg"
        >
          {article.content.map((block, i) => {
            if (block.type === 'h2') {
              return (
                <h2 key={i} className="text-3xl mt-16 mb-8 flex items-center gap-4">
                  <span className="w-8 h-[2px] bg-[#c2a66b] inline-block"></span>
                  {block.text}
                </h2>
              );
            }
            if (block.type === 'p') {
              return (
                <p key={i} className="mb-6">
                  {block.text}
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
           <button className="flex items-center gap-3 px-8 py-4 rounded-full bg-[#0a1628] border border-[#c2a66b]/30 hover:border-[#c2a66b] hover:bg-[#c2a66b] hover:text-[#050b14] transition-all duration-300 text-white text-xs font-bold tracking-widest uppercase group shadow-lg">
             <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
             Share Article
           </button>
        </div>
      </section>

    </main>
  );
}
