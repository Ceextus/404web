import { Phone, MapPin, Mail, Linkedin, Facebook, Twitter, Instagram } from "lucide-react";

export default function DexFliQFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-purple-800 text-white font-montserrat mt-24 ">
      {/* Top section with white background */}
      <div className="bg-white text-gray-800 p-6 rounded-b-4xl w-[80%] mx-auto">
        <div className="container w-[80%] mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Logo and Description */}
          <div className="md:w-1/3">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-purple-600 rounded-md flex items-center justify-center mr-2">
                <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
              </div>
              <h2 className="text-xl font-bold">DexFliQ</h2>
            </div>
            <p className="text-sm leading-relaxed ">
              DexfliQ is an IT development and training institute. Equipped with software experts, we produce innovative technology that facilitates human activities in academic, business or social sector. We also service the "tech eco-system" by Educating, Inspiring and incubating the next generation of tech experts.
            </p>
          </div>
          
          {/* Contact Info */}
          <div className="md:w-1/4">
            <p className="text-sm mb-2">Talk to our growth expert</p>
            <div className="mb-1">
              <a href="tel:+2348100311203" className="text-sm font-medium hover:text-purple-600">+2348100311203</a>
            </div>
            <div className="mb-4">
              <a href="tel:+2349068262592" className="text-sm font-medium hover:text-purple-600">+2349068262592</a>
            </div>
            <div className="text-sm font-medium text-orange-500 mb-2">Or</div>
            <div className="mb-3">
              <a href="#" className="text-sm underline hover:text-purple-600">Talk To Social Media</a>
            </div>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-600 hover:text-purple-600">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600">
                <Instagram size={18} />
              </a>
            </div>
          </div>
          
          {/* Newsletter */}
          <div className="md:w-1/4">
            <h3 className="font-bold mb-3">Don't Missed Subscribe</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="px-3 py-2 border border-gray-300 rounded-l-md text-sm flex-grow focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              <button className="bg-purple-600 p-2 rounded-r-md flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 border-t-2 border-r-2 border-purple-600 transform rotate-45"></div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Middle section with services */}
      <div className="container mx-auto py-8 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Services Column */}
          <div>
            <h3 className="text-lg font-medium mb-4 pb-2 border-b border-purple-400">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:underline">Web Development</a></li>
              <li><a href="#" className="text-sm hover:underline">Software Development</a></li>
              <li><a href="#" className="text-sm hover:underline">Digital Marketing</a></li>
              <li><a href="#" className="text-sm hover:underline">Performance Testing Services</a></li>
              <li><a href="#" className="text-sm hover:underline">IT Consulting</a></li>
              <li><a href="#" className="text-sm hover:underline">Cybersecurity Services</a></li>
              <li><a href="#" className="text-sm hover:underline">Mobile Development</a></li>
              <li><a href="#" className="text-sm hover:underline">UI / UX Design</a></li>
            </ul>
          </div>
          
          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-medium mb-4 pb-2 border-b border-purple-400">Quick Link</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:underline">About us</a></li>
              <li><a href="#" className="text-sm hover:underline">Services</a></li>
              <li><a href="#" className="text-sm hover:underline">Portfolio</a></li>
            </ul>
          </div>
          
          {/* Support Column */}
          <div>
            <h3 className="text-lg font-medium mb-4 pb-2 border-b border-purple-400">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:underline">Contact Us</a></li>
              <li><a href="#" className="text-sm hover:underline">Request A Quote</a></li>
              <li><a href="#" className="text-sm hover:underline">FAQs</a></li>
              <li><a href="#" className="text-sm hover:underline">Careers</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Contact Info Section */}
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center">
            <div className="mr-4">
              <Phone size={20} />
            </div>
            <div>
              <p className="text-xs text-purple-200">Chat Or Call Any Time</p>
              <p className="text-sm">+2348100311203</p>
              <p className="text-sm">+2349068262592</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="mr-4">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-xs text-purple-200">Address</p>
              <p className="text-sm">Abuja, Nigeria</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="mr-4">
              <Mail size={20} />
            </div>
            <div>
              <p className="text-xs text-purple-200">Say Hello</p>
              <p className="text-sm">support@dexfliq.com</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright Section */}
      <div className="border-t border-purple-500 rounded-t-full w-[100%] mx-auto  bg-white text-black py-2">
        <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">Copyright © 2023 - {currentYear} DexfliQ. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-3 md:mt-0">
            <a href="#" className="text-sm hover:underline">Support</a>
            <a href="#" className="text-sm hover:underline">Terms & Conditions</a>
            <a href="#" className="text-sm hover:underline">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}