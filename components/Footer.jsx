import { MapPin, Mail, Linkedin, Twitter, Github, Instagram, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer({ settings = {} }) {
  const currentYear = new Date().getFullYear(); // 2026
  
  return (
    <footer className="w-full bg-[#03060a] text-white font-sans pt-24 lg:pt-32 relative overflow-hidden border-t border-white/5">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#1a4fb0]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#c2a66b]/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Massive CTA Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end pb-20 border-b border-white/10 gap-10">
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black font-outfit tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 leading-[1.1]">
              Have a Vision? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c2a66b] to-[#f4d083]">
                Let's Build It.
              </span>
            </h2>
          </div>
          
          <Link href="/contact" className="group relative overflow-hidden rounded-full flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#c2a66b] to-[#f4d083] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
            <button className="relative bg-[#c2a66b] text-[#050b14] px-10 py-5 text-sm md:text-base font-bold uppercase tracking-widest border border-transparent group-hover:border-[#c2a66b] group-hover:text-[#050b14] transition-colors duration-300 flex items-center gap-3 w-full sm:w-auto">
              Start Your Project
              <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
            </button>
          </Link>
        </div>
        
        {/* Fat Footer 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 py-20 pb-24">
          
          {/* Column 1: Identity */}
          <div className="flex flex-col">
            <Link href="/" className="mb-6 inline-block">
              <img
                src={settings.logo_url || "/404 slogo.png"}
                alt="404Services Logo"
                className={`object-contain w-40 max-h-12 ${
                  (settings.logo_url || "/404 slogo.png").startsWith("/") ? "brightness-0 invert" : ""
                }`}
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              We specialize in engineering the impossible. From high-performance mobile apps to scalable web architectures, we turn complex problems into seamless digital ecosystems.
            </p>
          </div>
          
          {/* Column 2: Quick Links */}
          <div className="flex flex-col md:pl-10">
            <h4 className="text-white font-bold font-outfit tracking-widest uppercase mb-6 text-sm">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/services" className="text-gray-400 hover:text-[#c2a66b] transition-colors text-sm uppercase tracking-wide">Services</Link></li>
              <li><Link href="/portfolio" className="text-gray-400 hover:text-[#c2a66b] transition-colors text-sm uppercase tracking-wide">Portfolio</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-[#c2a66b] transition-colors text-sm uppercase tracking-wide">Careers</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-[#c2a66b] transition-colors text-sm uppercase tracking-wide">Contact</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Contact */}
          <div className="flex flex-col">
            <h4 className="text-white font-bold font-outfit tracking-widest uppercase mb-6 text-sm">Command Center</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-[#c2a66b] shrink-0 w-5 h-5 mt-0.5" />
                <div>
                  <p className="text-gray-400 text-sm leading-relaxed font-semibold uppercase tracking-widest text-[10px] mb-1">
                    Location
                  </p>
                  <p className="text-gray-300 text-sm">High-Energy Tech Hubs</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Mail className="text-[#c2a66b] shrink-0 w-5 h-5 mt-0.5" />
                <div className="flex flex-col">
                  <p className="text-gray-400 text-sm leading-relaxed font-semibold uppercase tracking-widest text-[10px] mb-1">
                    General Inquiry
                  </p>
                  <a href="mailto:hello@404services.com" className="text-gray-300 hover:text-white transition-colors text-sm">
                    hello@404services.com
                  </a>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c2a66b] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#c2a66b]"></span>
                </span>
                <span className="text-gray-300 uppercase tracking-widest text-[10px]">Available for global remote projects</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Bottom Bar Extravaganza */}
      <div className="border-t border-white/5 bg-[#010306]">
        <div className="max-w-[1400px] mx-auto px-6 py-8 flex flex-col lg:flex-row justify-between items-center gap-6">
          
          {/* Copyright */}
          <p className="text-gray-500 text-xs tracking-wider uppercase order-3 lg:order-1">
            &copy; {currentYear} {(settings.company_name || "404SERVICES").toUpperCase()}. ALL RIGHTS RESERVED.
          </p>
          
          {/* Legal Links */}
          <div className="flex gap-6 order-2">
            <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors text-[10px] md:text-xs tracking-widest uppercase">Privacy Policy</Link>
            <span className="text-gray-700">|</span>
            <Link href="/terms" className="text-gray-500 hover:text-white transition-colors text-[10px] md:text-xs tracking-widest uppercase">Terms of Service</Link>
          </div>

          {/* Social Links Mapping (Requested: Twitter, LinkedIn, GitHub, Instagram) */}
          <div className="flex gap-4 order-1 lg:order-3">
            <a href="#" aria-label="Twitter (X)" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#050b14] hover:bg-[#c2a66b] hover:border-[#c2a66b] transition-all duration-300">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#050b14] hover:bg-[#c2a66b] hover:border-[#c2a66b] transition-all duration-300">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" aria-label="GitHub" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#050b14] hover:bg-[#c2a66b] hover:border-[#c2a66b] transition-all duration-300">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#050b14] hover:bg-[#c2a66b] hover:border-[#c2a66b] transition-all duration-300">
              <Instagram className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
      
    </footer>
  );
}