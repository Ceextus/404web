"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Code, Smartphone, Cloud, Layers, CheckCircle } from "lucide-react";
import { useParams } from "next/navigation";

// Data for the different service pages
const servicesData = {
  "web": {
    title: "Web Architecture",
    subtitle: "High-Performance Digital Infrastructure",
    description: "We engineer scalable, resilient, and flawlessly fast web applications. Moving beyond simple websites, we build robust digital architectures designed to handle millions of requests while maintaining pristine 60fps performance on the frontend.",
    icon: Code,
    features: [
      "Next.js & React Ecosystems",
      "Server-Side Rendering (SSR) & Static Site Generation (SSG)",
      "High-Availability API Architecture",
      "Micro-Frontends & Modular Scalability",
    ],
    image: "/project4.jpg"
  },
  "mobile": {
    title: "Mobile Solutions",
    subtitle: "Native Velocity, Cross-Platform Efficiency",
    description: "Our mobile solutions bridge the gap between native performance and cross-platform development speed. We craft fluid, intuitive, and highly accessible mobile applications that dominate both the App Store and Google Play.",
    icon: Smartphone,
    features: [
      "React Native & Expo Frameworks",
      "Silky 120fps Animations (Reanimated)",
      "Offline-First Architecture",
      "Seamless Native Module Integration",
    ],
    image: "/project3.jpg"
  },
  "cloud": {
    title: "SaaS & Cloud Engines",
    subtitle: "Scalable Backends for Global Products",
    description: "The hidden engine of every great product is its backend. We architect serverless, highly-available cloud infrastructures that auto-scale invisibly, ensuring your startup or enterprise never drops a request during hyper-growth.",
    icon: Cloud,
    features: [
      "Supabase & Firebase Architectures",
      "Edge Computing & CDN Global Routing",
      "Real-Time Data Sync & WebSockets",
      "Zero-Downtime Database Migrations",
    ],
    image: "/project2.jpg"
  },
  "ui-ux": {
    title: "Cinematic UI/UX",
    subtitle: "Interfaces That Command Attention",
    description: "Design is not just how it looks; it's how it converts. We specialize in deep, cinematic interfaces using rich spatial navies, glassmorphism, and micro-interactions that elevate your product into a premium retention magnet.",
    icon: Layers,
    features: [
      "Dark-Mode First Aesthetics",
      "Framer Motion Micro-Interactions",
      "Glassmorphic & Spatial Depth Design",
      "Conversion-Optimized User Flows",
    ],
    image: "/project1.jpg"
  }
};

export default function ServiceDetail() {
  const params = useParams();
  const serviceKey = params.slug;
  const service = servicesData[serviceKey];

  if (!service) {
    return (
      <div className="min-h-screen bg-[#050b14] flex flex-col items-center justify-center text-white font-outfit gap-6">
        <h1 className="text-5xl font-bold">Service Not Found.</h1>
        <Link href="/services" className="text-[#c2a66b] text-sm uppercase tracking-widest font-semibold hover:text-white transition-colors">
          Return to Services
        </Link>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <main className="bg-[#050b14] min-h-screen font-sans selection:bg-[#c2a66b]/30 selection:text-white pb-32">
      
      {/* Cinematic Hero */}
      <section className="relative w-full min-h-[60vh] flex flex-col items-center justify-center overflow-hidden pt-32 pb-16 border-b border-white/5">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#1a4fb0]/10 blur-[150px] rounded-full pointer-events-none z-0" />
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-[#c2a66b]/10 blur-[120px] rounded-full pointer-events-none z-0" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 w-full flex flex-col items-center text-center leading-tight">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-16 h-16 rounded-2xl bg-[#0a1628] border border-[#c2a66b]/30 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(194,166,107,0.15)]"
          >
            <Icon className="w-8 h-8 text-[#c2a66b]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="w-full flex flex-col items-center text-center"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-outfit text-white tracking-tight leading-[1.1] mb-6">
              {service.title}
            </h1>
            
            <p className="text-[#c2a66b] text-lg md:text-xl font-light tracking-widest uppercase mb-10 max-w-2xl">
              {service.subtitle}
            </p>

            <Link href="/contact" className="group relative overflow-hidden rounded-full flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-[#c2a66b] to-[#f4d083] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              <button className="relative bg-white/5 backdrop-blur-md text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest border border-white/10 group-hover:border-[#c2a66b] group-hover:text-[#050b14] transition-all duration-300 flex items-center gap-3">
                Start a Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-[1200px] mx-auto px-6 pt-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8"
          >
            <div className="flex items-center gap-4 mb-2">
               <span className="w-12 h-[2px] bg-[#c2a66b]"></span>
               <span className="text-gray-400 text-xs tracking-widest uppercase font-bold">The Approach</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold font-outfit text-white leading-tight">
              We don't just write code. <br/>
              We engineer <span className="text-[#c2a66b]">ecosystems</span>.
            </h2>
            
            <p className="text-gray-400 text-lg font-light leading-relaxed">
              {service.description}
            </p>

            <div className="mt-6 flex flex-col gap-4">
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-[#0a1628] border border-white/5 rounded-xl p-4 transition-colors hover:border-[#c2a66b]/30">
                  <CheckCircle className="w-5 h-5 text-[#c2a66b] flex-shrink-0" />
                  <span className="text-gray-300 text-sm font-semibold tracking-wide">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Visual Element */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square md:aspect-[4/5] w-full relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 group">
              <div className="absolute inset-0 bg-[#0a1628]" />
              <img 
                src={service.image} 
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-40 transition-all duration-700 ease-[0.16,1,0.3,1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050b14]/90 via-transparent to-transparent opacity-100" />
              
              <div className="absolute bottom-10 left-10">
                <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full border border-white/10 bg-black/40 backdrop-blur-md mb-4">
                   <span className="w-2 h-2 rounded-full bg-[#c2a66b] animate-pulse"></span>
                   <span className="text-white text-[10px] uppercase tracking-widest font-bold">Systems Online</span>
                </div>
              </div>
            </div>
            
            {/* Decorative Outline */}
            <div className="absolute -inset-4 border border-[#c2a66b]/20 rounded-3xl -z-10 translate-x-4 translate-y-4"></div>
          </motion.div>

        </div>
      </section>

      {/* Back button */}
      <div className="max-w-[1200px] mx-auto px-6 mt-24">
        <Link href="/services" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#c2a66b] text-xs tracking-widest uppercase font-bold transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to all Services
        </Link>
      </div>

    </main>
  );
}
