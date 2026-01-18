'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Github, Linkedin, Mail, Download, ArrowRight, Sparkles } from 'lucide-react';
import BackgroundGraphics from './BackgroundGraphics';

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const roles = useMemo(() => ['Full Stack Developer', 'Software Engineer', 'UI/UX Designer'], []);

  // Intersection Observer for fade-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Typing animation effect
  useEffect(() => {
    const currentText = roles[currentRole];
    const typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === currentText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setCurrentRole((prev) => (prev + 1) % roles.length);
      } else {
        setDisplayText(
          isDeleting
            ? currentText.substring(0, displayText.length - 1)
            : currentText.substring(0, displayText.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole, roles]);

  const stats = [
    { value: '5+', label: 'Projects Delivered' },
    { value: '2024', label: 'Computer Science Graduate' },
    { value: '100%', label: 'Client Satisfaction' },
  ];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0a] transition-all duration-300 pt-16 relative overflow-hidden"
    >
      {/* Scattered 3D Background Graphics */}
      <div className="absolute inset-0 z-0">
        <BackgroundGraphics intensity={0.4} scope="section" />
      </div>

      {/* Animated gradient blur effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-cyan-50 to-purple-100 dark:from-cyan-900/30 dark:to-purple-800/30 border border-cyan-200 dark:border-cyan-700/50 rounded-full animate-fade-in hover:shadow-lg transition-all duration-300">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-600 dark:text-cyan-400 animate-pulse" />
                <span className="text-xs sm:text-sm font-semibold text-cyan-700 dark:text-cyan-300">✨ Available for Opportunities</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl font-black leading-[1.0] tracking-tighter">
                <span className="block text-black dark:text-white animate-slide-up drop-shadow-md">Hi, I'm</span>
                <span className="block bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent animate-slide-up delay-100 hover:scale-110 transition-transform duration-500 drop-shadow-lg">
                  DJ Magarro
                </span>
              </h1>
              
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-black dark:text-white h-10 sm:h-12 md:h-14 font-semibold">
                <span className="text-cyan-600 dark:text-cyan-400 font-mono">{'<'}</span>
                <span className="mx-1 sm:mx-2 bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 bg-clip-text text-transparent">{displayText}</span>
                <span className="animate-pulse text-cyan-600 dark:text-cyan-400 font-mono">|</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-mono">{' />'}</span>
              </div>
            </div>

            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-black dark:text-white leading-relaxed max-w-2xl mx-auto lg:mx-0 drop-shadow-md">
              Transforming ideas into scalable digital solutions. Specialized in building high-performance web applications 
              with modern technologies and best practices.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 py-4 sm:py-6 border-y border-gray-200 dark:border-gray-800">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center lg:text-left group cursor-default"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-black dark:text-gray-200 font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
              <a
                href="#projects"
                className="group relative inline-flex items-center justify-center gap-2 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)',
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-pulse"></span>
                <span className="relative">View My Work</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </a>

              <a
                href="/Assets/CV_Magarro.pdf"
                download
                className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-white via-gray-50 to-white dark:from-[#111111] dark:via-[#1a1a1a] dark:to-[#111111] border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95 shadow-lg hover:shadow-2xl hover:border-blue-400 dark:hover:border-blue-500 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-5 transition-opacity"></span>
                <Download className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="relative">Download Resume</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-400 mr-1 sm:mr-2">Connect:</span>
              {[
                { icon: Github, href: 'https://github.com/donjhon05', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/donjhon-magarro-31a073291/', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:donjhon_magarro05@gmail.com', label: 'Email' },
              ].map(({ icon: Icon, href, label }, index) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl bg-white dark:bg-[#111111] border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 transform hover:scale-110 hover:rotate-3 active:scale-95 shadow-sm hover:shadow-lg"
                  aria-label={label}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="relative group">
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-400 rounded-2xl sm:rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 animate-pulse-slow"></div>
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-2xl sm:rounded-3xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl group-hover:shadow-blue-500/20 transition-all duration-500">
                <img
                  src="/graduation_pic1.jpg"
                  alt="DJ Magarro - Full Stack Developer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              {/* Status Badge */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-400 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-1.5 sm:gap-2 shadow-2xl border-2 border-white dark:border-gray-800 hover:scale-105 transition-transform duration-300 cursor-pointer">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                <span>Open to Work</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
