'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const slides = [
  {
    id: 1,
    image: '/images/hero_slide_1.png',
    heading: 'Rewriting the Digital Standard.',
    subheading: 'At 404services, we don’t just build software; we architect scalable digital ecosystems. From high-performance React Native apps to Next.js web architectures, we turn complex problems into seamless user experiences.',
    primaryCta: 'Request A Quote',
    secondaryCta: 'View our Stack',
  },
  {
    id: 2,
    image: '/images/hero_slide_2.png',
    heading: 'Beyond the Error: Precision-Engineered Solutions.',
    subheading: 'We specialize in solving the "unsolvable". Where other agencies say a feature is impossible, or a system is too complex — that is where our work begins.',
    primaryCta: 'Start a Project',
    secondaryCta: 'Our Portfolio',
  },
];

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative w-full h-[100vh] bg-[#050b14]">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        loop
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        effect="fade"
        speed={1500}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div
              className={`w-full h-full bg-cover bg-center transition-transform duration-[10000ms] ease-linear ${
                activeIndex === index ? 'scale-105' : 'scale-100'
              }`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Cinematic Navy Blue Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/60 via-[#050b14]/70 to-[#050b14] flex flex-col justify-center items-center text-center px-4">
                
                <div className="max-w-4xl pt-20">
                  <AnimatePresence mode="wait">
                    {activeIndex === index && (
                      <>
                        <motion.h1
                          key={`h1-${slide.id}`}
                          className="text-white text-5xl sm:text-6xl md:text-7xl font-bold mb-6 font-outfit tracking-tight leading-tight"
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -30 }}
                          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                        >
                          {slide.heading}
                        </motion.h1>
                        
                        <motion.p
                          key={`p-${slide.id}`}
                          className="text-gray-300 text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-light tracking-wide leading-relaxed"
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -30 }}
                          transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
                        >
                          {slide.subheading}
                        </motion.p>
                        
                        <motion.div
                          key={`btn-${slide.id}`}
                          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 1, ease: 'easeOut', delay: 0.6 }}
                        >
                          {/* Primary CTA: Gold Glow */}
                          <Link href="/contact" className="relative group inline-block">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#c2a66b] to-[#f4d083] rounded-sm blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
                            <button className="relative bg-[#c2a66b] text-[#050b14] px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-[#e6ca8a] transition-colors duration-300">
                              {slide.primaryCta}
                            </button>
                          </Link>
                          
                          {/* Secondary CTA: Outline */}
                          <button className="border border-[#c2a66b]/50 text-[#c2a66b] px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-[#c2a66b]/10 transition-colors duration-300">
                            {slide.secondaryCta}
                          </button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>

                {/* Custom Navigation Arrows */}
                <div className="hidden md:flex absolute top-1/2 left-8 z-50 transform -translate-y-1/2 cursor-pointer swiper-button-prev-custom w-12 h-12 rounded-full border border-white/20 items-center justify-center text-white/50 hover:text-white hover:border-white transition-all backdrop-blur-sm group">
                  <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
                </div>

                <div className="hidden md:flex absolute top-1/2 right-8 z-50 transform -translate-y-1/2 cursor-pointer swiper-button-next-custom w-12 h-12 rounded-full border border-white/20 items-center justify-center text-white/50 hover:text-white hover:border-white transition-all backdrop-blur-sm group">
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </div>
                
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Subtle bottom gradient to blend into next section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050b14] to-transparent z-40"></div>
    </div>
  );
}
