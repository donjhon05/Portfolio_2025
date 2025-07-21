'use client';
import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-10 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
        {/* Left: Logo or Name */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold tracking-wide">© {new Date().getFullYear()} DJ Portfolio</h2>
          <p className="text-sm text-slate-400 mt-1">Built with Next.js, TailwindCSS, React.js and Love</p>
        </div>

        {/* Right: Social Links */}
        <div className="flex space-x-6">
          <a href="https://github.com/donjhon05" target="_blank" aria-label="GitHub" className="hover:text-blue-400 transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/donjhon-magarro-31a073291/" target="_blank" aria-label="LinkedIn" className="hover:text-blue-400 transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="mailto:donjhon_magarro05@gmail.com" aria-label="Email" className="hover:text-blue-400 transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
