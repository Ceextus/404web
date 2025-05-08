import Image from 'next/image'
import React from 'react'

const Prenav = () => {
  return (
    <div className="bg-white max-lg:hidden">
      <div className="w-[98%] mx-auto px-4 sm:px-8 lg:px-12 border-b border-gray-300 flex flex-col sm:flex-row justify-between items-center py-2 text-sm text-gray-700 font-montserrat font-semibold">
        {/* Left Side */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1">
            <Image src="/icons/email.png" alt="email" width={36} height={46} />
            <span>support@dexfliq.com</span>
          </div>
          <span className="hidden sm:block">|</span>
          <div className="flex items-center gap-1">
            <Image src="/icons/support.png" alt="support" width={36} height={26} />
            <span>Customer support</span>
          </div>
        </div>

        {/* Center: Social Media Icons */}
        <div className="flex items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
          <Image src="/icons/linkedin.png" alt="LinkedIn" width={16} height={46} />
          <Image src="/icons/facebook.png" alt="Facebook" width={16} height={46} />
          <Image src="/icons/twitter.png" alt="X" width={16} height={46} />
          <Image src="/icons/instagram.png" alt="Instagram" width={16} height={46} />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-1 mt-2 sm:mt-0">
          <Image src="/icons/pin.png" alt="location" width={16} height={46} />
          <span>Abuja, Nigeria</span>
        </div>
      </div>
    </div>
  )
}

export default Prenav
