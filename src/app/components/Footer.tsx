'use client';

import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#110e13] dark:bg-[#110e13] border-t-2 border-gray-700 dark:border-gray-700 py-8 sm:py-12 transition-colors duration-300 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
          {/* Left: Copyright */}
          <div className="text-center md:text-left">
            <p className="text-sm sm:text-base text-gray-200 dark:text-gray-200 font-semibold tracking-wide">
              © {new Date().getFullYear()} DJ Magarro. All rights reserved.
            </p>
            <p className="text-xs sm:text-sm text-gray-300 dark:text-gray-300 mt-2 flex items-center justify-center md:justify-start gap-1 font-medium">
              Built with <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 animate-pulse" /> using Next.js, TailwindCSS & React
            </p>
          </div>

          {/* Right: Social Links */}
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-xs sm:text-sm text-gray-300 dark:text-gray-300 mr-1 sm:mr-2 hidden md:inline">Connect:</span>
            <a
              href="https://github.com/donjhon05"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl bg-[#1a1720] dark:bg-[#1a1720] border-2 border-gray-600 dark:border-gray-600 text-gray-300 dark:text-gray-300 hover:bg-blue-900/30 dark:hover:bg-blue-900/30 hover:text-blue-400 dark:hover:text-blue-400 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 transform hover:scale-110 hover:rotate-3 active:scale-95 shadow-md hover:shadow-lg"
            >
              <Github className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/donjhon-magarro-31a073291/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl bg-[#1a1720] dark:bg-[#1a1720] border-2 border-gray-600 dark:border-gray-600 text-gray-300 dark:text-gray-300 hover:bg-blue-900/30 dark:hover:bg-blue-900/30 hover:text-blue-400 dark:hover:text-blue-400 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 transform hover:scale-110 hover:rotate-3 active:scale-95 shadow-md hover:shadow-lg"
            >
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href="mailto:donjhon_magarro05@gmail.com"
              aria-label="Email"
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl bg-[#1a1720] dark:bg-[#1a1720] border-2 border-gray-600 dark:border-gray-600 text-gray-300 dark:text-gray-300 hover:bg-blue-900/30 dark:hover:bg-blue-900/30 hover:text-blue-400 dark:hover:text-blue-400 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 transform hover:scale-110 hover:rotate-3 active:scale-95 shadow-md hover:shadow-lg"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;