'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    image: '/slide1.jpg',
    heading: 'A Full-Service Creative Agency',
    subheading: 'We are highly focused on your success as we develop your products and software.',
  },
  {
    id: 2,
    image: '/slide2.jpg',
    heading: 'Innovate. Create. Elevate.',
    subheading: 'Delivering software solutions that drive impact and scale.',
  },
];

export default function HeroSlider() {
  return (
    <div className="relative w-full h-[85vh] md:h-[75vh] lg:h-[85vh]">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        loop
        autoplay={{ delay: 2000 }}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        effect="fade"
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="w-[98%] mx-auto h-full bg-cover bg-center flex items-center justify-center rounded-2xl overflow-hidden"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="bg-black/60  bg-opacity-50 w-full h-full flex flex-col justify-center items-center text-center px-4">
                <motion.h1
                  className="text-white text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  {slide.heading}
                </motion.h1>
                <motion.p
                  className="text-white text-sm sm:text-base md:text-lg lg:text-xl mb-8 max-w-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  {slide.subheading}
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  <button className="bg-[#7572fd] text-white px-6 py-3 rounded-md hover:bg-orange-700 transition-all duration-300">
                    Request A Quote
                  </button>
                  <button className="border border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition">
                    Contact Us
                  </button>
                </motion.div>
                <div className="absolute top-1/2 left-4 z-50 transform -translate-y-1/2 cursor-pointer swiper-button-prev-custom">
                <Image
                    src="/icons/tap (1).png"
                    alt="Next"
                    width={44}
                    height={24}
                    className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce"
                  />
                </div>

                <div className="absolute top-1/2 right-4 z-50 transform -translate-y-1/2 cursor-pointer swiper-button-next-custom">
                  <Image
                    src="/icons/hand (1).png"
                    alt="Next"
                    width={44}
                    height={24}
                    className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
