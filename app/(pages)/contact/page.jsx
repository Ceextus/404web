"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Send, MapPin, Mail, Globe, ArrowUpRight } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Front-end mock submission
    alert("Operation Initiated. The 404Services strike team will contact you shortly.");
    setFormData({ name: "", email: "", company: "", budget: "", message: "" });
  };

  return (
    <main className="bg-[#050b14] min-h-screen font-sans selection:bg-[#c2a66b]/30 selection:text-white pb-24 md:pb-32">
      
      {/* Cinematic Hero Header */}
      <section className="relative w-full min-h-[45vh] md:min-h-[50vh] flex flex-col items-center justify-center overflow-hidden pt-32 pb-12">
        {/* Background Effects */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-[#1a4fb0]/15 blur-[120px] rounded-full pointer-events-none z-0" />
        <div className="absolute top-20 -right-32 w-[500px] h-[500px] bg-[#c2a66b]/10 blur-[100px] rounded-full pointer-events-none z-0" />
        
        {/* Breadcrumb Navigation */}
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
            <span className="text-[#c2a66b] font-semibold">Contact</span>
          </nav>
        </motion.div> */}

        {/* Main Title */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          >
            
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-outfit text-white tracking-tight leading-[1.1] mb-6">
              Initiate <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c2a66b] to-[#f4d083] relative inline-block">
                 Deployment.
              </span>
            </h1>
            
            <p className="text-gray-400 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed mb-6">
              Bypass the endless discovery calls. Share your technical blueprint below and our architects will design exactly what you need built.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Split Contact Container */}
      <section className="relative z-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Form Section */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 xl:col-span-8 bg-[#0a1628] rounded-3xl p-8 md:p-12 border border-[#c2a66b]/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#c2a66b]/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="mb-10 relative z-10">
              <h2 className="text-3xl font-bold font-outfit text-white mb-3">Project Blueprint</h2>
              <p className="text-gray-400 text-sm font-light">All submissions are strictly confidential and protected by standard NDA policies.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10 flex flex-col">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-gray-300 text-xs font-semibold tracking-widest uppercase ml-1">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#050b14] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#c2a66b]/50 focus:ring-1 focus:ring-[#c2a66b]/50 transition-all duration-300"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-gray-300 text-xs font-semibold tracking-widest uppercase ml-1">Enterprise Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#050b14] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#c2a66b]/50 focus:ring-1 focus:ring-[#c2a66b]/50 transition-all duration-300"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="company" className="text-gray-300 text-xs font-semibold tracking-widest uppercase ml-1">Company / Organization</label>
                  <input 
                    type="text" 
                    id="company" 
                    name="company" 
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-[#050b14] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#c2a66b]/50 focus:ring-1 focus:ring-[#c2a66b]/50 transition-all duration-300"
                    placeholder="Acme Corp"
                  />
                </div>

                {/* Budget */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="budget" className="text-gray-300 text-xs font-semibold tracking-widest uppercase ml-1">Capital Allocation</label>
                  <div className="relative">
                    <select 
                      id="budget" 
                      name="budget" 
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full appearance-none bg-[#050b14] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#c2a66b]/50 focus:ring-1 focus:ring-[#c2a66b]/50 transition-all duration-300 cursor-pointer"
                    >
                      <option value="" disabled className="text-gray-600">Select Project Budget...</option>
                      <option value="10k-25k">$10k - $25k USD</option>
                      <option value="25k-50k">$25k - $50k USD</option>
                      <option value="50k-100k">$50k - $100k USD</option>
                      <option value="100k+">$100k+ USD</option>
                    </select>
                    <div className="absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-gray-300 text-xs font-semibold tracking-widest uppercase ml-1">Project Scope & Objectives</label>
                <textarea 
                  id="message" 
                  name="message" 
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-[#050b14] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#c2a66b]/50 focus:ring-1 focus:ring-[#c2a66b]/50 transition-all duration-300 resize-none"
                  placeholder="Detail the architecture you need us to build..."
                ></textarea>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 flex justify-end">
                <div className="relative group inline-block w-full sm:w-auto">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#c2a66b] to-[#f4d083] rounded-full blur opacity-40 group-hover:opacity-100 transition duration-500"></div>
                  <button 
                    type="submit"
                    className="relative w-full sm:w-auto bg-[#050b14] border border-[#c2a66b]/50 text-[#c2a66b] group-hover:text-[#050b14] overflow-hidden transition-all duration-500 px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-widest flex items-center justify-center gap-3"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#c2a66b] to-[#f4d083] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
                    <span className="relative z-10 flex items-center gap-2">
                      Initialize Request <Send className="w-4 h-4" />
                    </span>
                  </button>
                </div>
              </div>

            </form>
          </motion.div>

          {/* Right Column: Information Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 xl:col-span-4 flex flex-col gap-8"
          >
            {/* Global Authority Card */}
            <div className="bg-[#0a1628] rounded-3xl p-8 border border-white/5 shadow-2xl relative overflow-hidden group">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#1a4fb0]/20 rounded-tl-full blur-[40px] pointer-events-none" />
              
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 mb-6 text-[#c2a66b]">
                 <Globe className="w-6 h-6" />
              </div>
              
              <h3 className="text-2xl font-bold font-outfit text-white mb-3">Global Standard</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Based in high-energy tech hubs, serving an elite global clientele with absolute remote-first efficiency. We deploy scalable systems anywhere on earth.
              </p>
              
              <div className="flex items-center gap-3 text-sm font-medium tracking-wide">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c2a66b] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#c2a66b]"></span>
                </span>
                <span className="text-gray-300 uppercase tracking-widest text-[10px]">Available for remote projects</span>
              </div>
            </div>

            {/* Direct Comm Card */}
            <div className="bg-[#0a1628] rounded-3xl p-8 border border-white/5 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#c2a66b]/10 rounded-bl-full blur-[40px] pointer-events-none" />
              
              <h3 className="text-xl font-bold font-outfit text-white mb-8 border-b border-white/5 pb-4">Direct Comm.</h3>
              
              <div className="space-y-6">
                <a href="mailto:hello@404services.com" className="flex items-start gap-4 hover:translate-x-2 transition-transform duration-300">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 flex-shrink-0 text-gray-400 group-hover:text-[#c2a66b]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[#c2a66b] text-[10px] font-semibold tracking-widest uppercase mb-1">Architecture Desk</p>
                    <p className="text-white text-sm font-medium">hello@404services.com</p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 flex-shrink-0 text-gray-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[#c2a66b] text-[10px] font-semibold tracking-widest uppercase mb-1">Command Center</p>
                    <p className="text-gray-300 text-sm font-light leading-relaxed">
                      Silicon Valley & Global Remotes
                    </p>
                  </div>
                </div>
              </div>

              {/* Social CTA */}
              <Link href="/portfolio" className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between group/link">
                 <span className="text-sm text-gray-400 font-semibold tracking-widest uppercase group-hover/link:text-white transition-colors">View Past Missions</span>
                 <ArrowUpRight className="w-5 h-5 text-[#c2a66b] group-hover/link:-translate-y-1 group-hover/link:translate-x-1 transition-transform" />
              </Link>

            </div>

          </motion.div>

        </div>
      </section>
      
    </main>
  );
}
