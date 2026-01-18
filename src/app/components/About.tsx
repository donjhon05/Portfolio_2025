'use client';

import React, { useEffect, useRef, useState } from 'react';
import { GraduationCap, Code, Award, Briefcase, Target, Rocket, Users } from 'lucide-react';
import BackgroundGraphics from './BackgroundGraphics';

const About = () => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);

  const achievements = [
    {
      icon: GraduationCap,
      title: 'Computer Science Graduate',
      description: 'Class of 2024',
      highlight: 'Bachelor\'s Degree',
    },
    {
      icon: Code,
      title: 'Full Stack Developer',
      description: '5+ Projects Completed',
      highlight: 'Production Ready',
    },
    {
      icon: Award,
      title: 'Certified Developer',
      description: 'FreeCodeCamp Front End',
      highlight: 'Industry Certified',
    },
    {
      icon: Briefcase,
      title: 'Open to Opportunities',
      description: 'Available for Hire',
      highlight: 'Ready to Contribute',
    },
  ];

  const values = [
    {
      icon: Target,
      title: 'Quality First',
      description: 'Delivering high-quality, maintainable code that exceeds expectations and stands the test of time.',
    },
    {
      icon: Rocket,
      title: 'Innovation Driven',
      description: 'Embracing cutting-edge technologies and creative solutions to solve complex business challenges.',
    },
    {
      icon: Users,
      title: 'Collaborative',
      description: 'Thriving in team environments, communicating effectively, and contributing to shared success.',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const cards = sectionRef.current?.querySelectorAll('[data-index]');
    cards?.forEach((card) => observer.observe(card));

    return () => {
      cards?.forEach((card) => observer.unobserve(card));
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#111111] transition-colors duration-300 overflow-hidden">
      {/* Scattered 3D Background Graphics */}
      <div className="absolute inset-0 z-0">
        <BackgroundGraphics intensity={0.35} scope="section" />
      </div>

      {/* Animated background orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse dark:mix-blend-multiply z-1" style={{ animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl dark:mix-blend-multiply z-1" style={{ animation: 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite 2s' }} />
      <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-blue-300/10 dark:bg-blue-400/5 rounded-full blur-3xl dark:mix-blend-multiply z-1" style={{ animation: 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite 4s' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-full mb-4 sm:mb-6 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
            <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400">Professional Profile</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            About <span className="bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-black dark:text-white max-w-3xl mx-auto leading-relaxed px-4 font-semibold">
            A passionate developer dedicated to creating exceptional digital experiences and driving business growth through technology
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-12 sm:mb-16 lg:mb-20">
          {/* Left: Text Content */}
          <div className="space-y-4 sm:space-y-6">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg sm:text-xl text-black dark:text-white leading-relaxed font-semibold">
                I&apos;m a recent Computer Science graduate with a passion for building innovative web applications 
                and digital solutions that make a real impact.
              </p>
              <p className="text-base sm:text-lg text-black dark:text-white leading-relaxed font-semibold">
                My journey in software development has equipped me with expertise in modern technologies and best practices. 
                I specialize in full-stack development, creating seamless user experiences from frontend interfaces to 
                robust backend systems.
              </p>
              <p className="text-base sm:text-lg text-black dark:text-white leading-relaxed font-semibold">
                My approach combines clean code architecture, performance optimization, and user-centered design. 
                I&apos;m committed to writing maintainable, scalable solutions that solve real business problems.
              </p>
              <p className="text-base sm:text-lg text-black dark:text-white leading-relaxed font-semibold">
                When I&apos;m not coding, I enjoy exploring new technologies, contributing to open-source projects, 
                and continuously learning to stay at the forefront of web development.
              </p>
            </div>
          </div>

          {/* Right: Achievement Cards */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              const isVisible = visibleCards.has(index);
              return (
                <div
                  key={index}
                  data-index={index}
                  className={`group relative p-6 sm:p-8 bg-white dark:bg-[#0a0a0a]/90 rounded-2xl sm:rounded-3xl border-2 border-gray-200 dark:border-gray-700/60 hover:border-cyan-400 dark:hover:border-cyan-500 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/30 transform hover:-translate-y-3 hover:scale-105 backdrop-blur-sm ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <div className="text-xs font-bold text-black dark:text-white mb-1.5 sm:mb-2 uppercase tracking-wide">
                      {achievement.highlight}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold mb-1 text-black dark:text-white leading-tight">{achievement.title}</h3>
                    <p className="text-xs sm:text-sm text-black dark:text-white font-medium">{achievement.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20 pt-12 sm:pt-16 lg:pt-20 border-t-2 border-gray-200 dark:border-gray-800 relative">
          <h3 className="text-3xl sm:text-4xl font-bold text-center mb-3 sm:mb-4 text-black dark:text-white">What I Value</h3>
          <p className="text-center text-base sm:text-lg text-black dark:text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto px-4 font-semibold">
            The principles that guide my work and drive my commitment to excellence
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              const isVisible = visibleCards.has(index + 10);
              return (
                <div
                  key={index}
                  data-index={index + 10}
                  className={`group relative text-center p-6 sm:p-8 bg-white dark:bg-[#0a0a0a]/90 rounded-2xl sm:rounded-3xl border-2 border-gray-200 dark:border-gray-700/60 hover:border-cyan-400 dark:hover:border-cyan-500 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/30 transform hover:-translate-y-3 hover:scale-105 backdrop-blur-sm ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-black dark:text-white">{value.title}</h4>
                    <p className="text-sm sm:text-base text-black dark:text-white leading-relaxed font-medium">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
