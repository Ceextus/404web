"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { 
  LayoutDashboard, Settings, Type, Users, Briefcase, FileText, 
  HelpCircle, Menu, X, Bell, Search, LogOut, Code, ChevronLeft, ChevronRight, User as UserIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminShell({ children }) {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = "/admin";
        return;
      }
      setUser(user);
    };
    init();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin";
  };

  const navGroups = [
    {
      label: "MAIN MENU",
      items: [
        { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Identity", href: "/admin/dashboard/identity", icon: Settings },
      ],
    },
    {
      label: "SECTIONS",
      items: [
        { name: "Hero Content", href: "/admin/dashboard/hero", icon: Type },
        {
          name: "About Details",
          href: "/admin/dashboard/about",
          icon: FileText,
        },
        { name: "Core Team", href: "/admin/dashboard/team", icon: Users },
        {
          name: "Portfolio",
          href: "/admin/dashboard/portfolio",
          icon: Briefcase,
        },
        { name: "Insights / Blog", href: "/admin/dashboard/blog", icon: Code },
        {
          name: "homepage-about",
          href: "/admin/dashboard/homepage-about",
          icon: Code,
        },
      ],
    },
    {
      label: "OTHER",
      items: [
        {
          name: "Documentation",
          href: "/admin/dashboard/docs",
          icon: HelpCircle,
        },
      ],
    },
  ];

  // Derive current page name for breadcrumb
  let currentPageName = "Dashboard";
  navGroups.forEach(g => {
    g.items.forEach(i => {
      if (i.href === pathname) currentPageName = i.name;
    });
  });

  return (
    <div className="flex h-screen bg-[#020509] text-white font-sans overflow-hidden">
      
      {/* -------------------- SIDEBAR (DESKTOP) -------------------- */}
      <aside className="hidden md:flex flex-col w-64 bg-[#050B14] border-r border-white/5 h-full relative z-20 transition-all duration-300">
        
        {/* Sidebar Header (Logo) */}
        <div className="p-6 flex items-center justify-between">
          <Link href="/admin/dashboard" className="block w-32 relative h-8">
            <Image 
              src="/404 slogo.png" 
              alt="404 Services" 
              fill 
              className="object-contain brightness-0 invert object-left" 
            />
          </Link>
        </div>

        {/* Global Search Bar (Sidebar style) */}
        <div className="px-5 mb-6">
          <div className="relative flex items-center bg-[#0A1628] rounded-full px-3 py-2 border border-white/5">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent text-xs text-white placeholder-gray-500 focus:outline-none w-full"
            />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-4 space-y-8 scrollbar-hide pb-20">
          {navGroups.map((group, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase ml-3 mb-1">
                {group.label}
              </span>
              {group.items.map((item) => {
                // Ensure active state matches exactly or sub-routes
                const isActive = pathname === item.href;
                return (
                  <Link 
                    key={item.name} 
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium relative group overflow-hidden ${
                      isActive 
                        ? "text-white bg-[#0A1628] border border-white/5" 
                        : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-[#c2a66b] rounded-r-full" />
                    )}
                    <item.icon className={`w-4 h-4 transition-colors ${isActive ? "text-[#c2a66b]" : "text-gray-500 group-hover:text-gray-300"}`} />
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom User Area */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#050B14] border-t border-white/5">
          <div className="flex items-center justify-between px-2 cursor-pointer group hover:bg-white/5 rounded-xl p-2 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#c2a66b] to-[#f4d083] p-[2px]">
                <div className="w-full h-full bg-[#050B14] rounded-full flex items-center justify-center">
                  <UserIcon className="w-4 h-4 text-[#c2a66b]" />
                </div>
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-bold text-white truncate max-w-[120px]">Admin User</span>
                <span className="text-[10px] text-gray-500 truncate max-w-[120px]">{user?.email || "loading..."}</span>
              </div>
            </div>
            <button onClick={handleLogout} className="text-gray-500 hover:text-red-400 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </aside>

      {/* -------------------- MOBILE OVERLAY SIDEBAR -------------------- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.aside 
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 left-0 w-64 bg-[#050B14] border-r border-[#c2a66b]/20 z-50 md:hidden flex flex-col shadow-2xl"
            >
              {/* Similar contents as desktop sidebar */}
              <div className="p-6 flex items-center justify-between border-b border-white/5">
                <div className="w-28 relative h-6">
                  <Image src="/404 slogo.png" alt="404 Services" fill className="object-contain brightness-0 invert object-left" />
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8">
                {navGroups.map((group, idx) => (
                  <div key={idx} className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase ml-3 mb-1">
                      {group.label}
                    </span>
                    {group.items.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link 
                          key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium relative group overflow-hidden ${
                            isActive ? "text-white bg-[#0A1628] border border-[#c2a66b]/20" : "text-gray-400 hover:text-white"
                          }`}
                        >
                          <item.icon className={`w-4 h-4 ${isActive ? "text-[#c2a66b]" : "text-gray-500"}`} />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-white/5 bg-[#050B14]">
                <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-red-500/10 text-red-400 text-xs font-bold tracking-widest uppercase hover:bg-red-500/20 transition-colors">
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* -------------------- MAIN CONTENT AREA -------------------- */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#020509]">
        
        {/* Top Navbar matching the image structural layout */}
        <header className="h-16 md:h-20 bg-[#050B14] border-b border-white/5 flex items-center justify-between px-4 md:px-8 z-10 shrink-0">
          
          {/* Left: Mobile Toggle & Breadcrumbs */}
          <div className="flex items-center gap-4">
            <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>

            <div className="hidden sm:flex items-center gap-3 text-sm font-medium text-gray-400">
              <div className="flex items-center gap-1 text-gray-600">
                <ChevronLeft className="w-4 h-4" />
                <ChevronRight className="w-4 h-4 -ml-2" />
              </div>
              <span className="text-gray-500">404 CMS</span>
              <span className="text-gray-600">/</span>
              <span className="text-white">{currentPageName}</span>
            </div>
            
            <h1 className="sm:hidden text-base font-bold text-white">{currentPageName}</h1>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 md:gap-6">
            
            {/* Context Search (Tablet/Desktop) */}
            <div className="hidden lg:flex items-center bg-[#0A1628] rounded-full px-4 py-2 border border-white/5 w-64">
              <Search className="w-4 h-4 text-gray-500 mr-2" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent text-xs text-white placeholder-gray-500 focus:outline-none w-full"
              />
            </div>

            <Link 
              href="/" 
              target="_blank"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#c2a66b]/10 text-[#c2a66b] border border-[#c2a66b]/30 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#c2a66b] hover:text-[#050b14] transition-all duration-300"
            >
              Public Site
            </Link>

            <div className="flex items-center gap-3">
              <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-[#0A1628] hover:bg-white/5 transition-colors relative">
                <Bell className="w-4 h-4 text-gray-400" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-[#050B14]" />
              </button>
              
              <div className="hidden sm:block w-[1px] h-6 bg-white/10 mx-1"></div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#0A1628] border border-white/10 flex items-center justify-center overflow-hidden">
                   <UserIcon className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="p-4 md:p-8 max-w-[1600px] mx-auto min-h-full">
            {children}
          </div>
        </div>

      </div>

    </div>
  );
}
