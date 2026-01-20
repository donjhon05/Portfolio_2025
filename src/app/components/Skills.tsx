'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Code, Database, Zap, GitBranch, Globe, Smartphone, CheckCircle2 } from 'lucide-react';
import BackgroundGraphics from './BackgroundGraphics';

type SkillCategory = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  skills: {
    name: string;
    level: number;
    years?: string;
  }[];
  description: string;
};

const Skills = () => {
  const [visibleSkills, setVisibleSkills] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);

  const skillCategories: SkillCategory[] = [
    {
      title: 'Frontend Development',
      icon: Code,
      description: 'Building responsive and interactive user interfaces',
      skills: [
        { name: 'React', level: 95, years: '3+ years' },
        { name: 'Next.js', level: 90, years: '2+ years' },
        { name: 'TypeScript', level: 88, years: '2+ years' },
        { name: 'Tailwind CSS', level: 92, years: '2+ years' },
        { name: 'HTML/CSS', level: 95, years: '4+ years' },
      ],
    },
    {
      title: 'Backend Development',
      icon: Database,
      description: 'Creating robust server-side solutions and APIs',
      skills: [
        { name: 'Node.js', level: 90, years: '2+ years' },
        { name: 'Express.js', level: 85, years: '2+ years' },
        { name: 'MongoDB', level: 80, years: '1+ years' },
        { name: 'REST APIs', level: 88, years: '2+ years' },
        { name: 'Authentication', level: 82, years: '1+ years' },
      ],
    },
    {
      title: 'Tools & Platforms',
      icon: Zap,
      description: 'Expertise in development tools and content management',
      skills: [
        { name: 'Git & GitHub', level: 90, years: '3+ years' },
        { name: 'WordPress', level: 85, years: '2+ years' },
        { name: 'UI/UX Design', level: 75, years: '1+ years' },
        { name: 'Figma', level: 78, years: '1+ years' },
        { name: 'Elementor', level: 88, years: '2+ years' },
      ],
    },
  ];

  const certifications = [
    { name: 'FreeCodeCamp Front End Development', icon: CheckCircle2 },
    { name: 'Computer Science Degree (2024)', icon: CheckCircle2 },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-skill-index') || '0');
            setVisibleSkills((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    );

    const skillBars = sectionRef.current?.querySelectorAll('[data-skill-index]');
    skillBars?.forEach((bar) => observer.observe(bar));

    return () => {
      skillBars?.forEach((bar) => observer.unobserve(bar));
    };
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="relative py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#0a0a0a] transition-colors duration-300 overflow-hidden">
      {/* Scattered 3D Background Graphics */}
      <div className="absolute inset-0 z-0">
        <BackgroundGraphics intensity={0.3} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-full mb-4 sm:mb-6">
            <Code className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400">Technical Expertise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Skills & <span className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">Expertise</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-black dark:text-white max-w-3xl mx-auto leading-relaxed px-4 font-semibold tracking-wide">
            A comprehensive toolkit of modern technologies and frameworks to deliver exceptional digital solutions
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 lg:mb-20">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <div
                key={categoryIndex}
                className="group p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-white dark:from-[#111111] dark:to-[#0a0a0a] rounded-xl sm:rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-500 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105"
              >
                {/* Category Header */}
                <div className="mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 dark:from-cyan-400 dark:to-purple-500 flex items-center justify-center mb-3 sm:mb-4 shadow-lg shadow-cyan-500/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 text-black dark:text-white">{category.title}</h3>
                  <p className="text-xs sm:text-sm text-black dark:text-white">{category.description}</p>
                </div>

                {/* Skills List */}
                <div className="space-y-4 sm:space-y-5">
                  {category.skills.map((skill, skillIndex) => {
                    const globalIndex = categoryIndex * 10 + skillIndex;
                    const isVisible = visibleSkills.has(globalIndex);
                    return (
                      <div 
                        key={skillIndex} 
                        className="group/skill"
                        data-skill-index={globalIndex}
                      >
                        <div className="flex justify-between items-center mb-2 sm:mb-3">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-black dark:text-white text-sm sm:text-base group-hover/skill:text-cyan-600 dark:group-hover/skill:text-cyan-400 transition-colors">
                              {skill.name}
                            </span>
                            {skill.years && (
                              <span className="text-xs text-black dark:text-white bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded group-hover/skill:bg-cyan-100 dark:group-hover/skill:bg-cyan-900/30 transition-colors">
                                {skill.years}
                              </span>
                            )}
                          </div>
                          <span className="text-xs sm:text-sm font-bold bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 bg-clip-text text-transparent group-hover/skill:scale-110 transition-transform">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-2.5 sm:h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner">
                          <div
                            className={`h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-cyan-500/40 group-hover/skill:shadow-cyan-500/60`}
                            style={{
                              width: isVisible ? `${skill.level}%` : '0%',
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Certifications & Achievements */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border-2 border-blue-100 dark:border-blue-800/50 hover:border-blue-200 dark:hover:border-blue-700/50 transition-all duration-300">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-black dark:text-white">
            Certifications & Education
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {certifications.map((cert, idx) => {
              const CertIcon = cert.icon;
              return (
                <div
                  key={idx}
                  className="group flex items-center gap-4 p-4 sm:p-6 bg-white dark:bg-[#0a0a0a] rounded-xl border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <CertIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base text-black dark:text-white">{cert.name}</h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Additional Expertise */}
        <div className="mt-12 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="text-center p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-white dark:from-[#111111] dark:to-[#0a0a0a] rounded-xl sm:rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-2 hover:scale-105">
            <GitBranch className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-blue-600 dark:text-blue-400 hover:scale-110 hover:rotate-6 transition-transform duration-300" />
            <h4 className="text-lg sm:text-xl font-bold mb-2 text-black dark:text-white">Version Control</h4>
            <p className="text-sm sm:text-base text-black dark:text-white">
              Proficient with Git workflows, branching strategies, and collaborative development
            </p>
          </div>
          <div className="text-center p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-white dark:from-[#111111] dark:to-[#0a0a0a] rounded-xl sm:rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-2 hover:scale-105">
            <Globe className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-blue-600 dark:text-blue-400 hover:scale-110 hover:rotate-6 transition-transform duration-300" />
            <h4 className="text-lg sm:text-xl font-bold mb-2 text-black dark:text-white">Web Standards</h4>
            <p className="text-sm sm:text-base text-black dark:text-white">
              Following industry best practices, accessibility standards, and modern web protocols
            </p>
          </div>
          <div className="text-center p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-white dark:from-[#111111] dark:to-[#0a0a0a] rounded-xl sm:rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-2 hover:scale-105 sm:col-span-2 lg:col-span-1">
            <Smartphone className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-blue-600 dark:text-blue-400 hover:scale-110 hover:rotate-6 transition-transform duration-300" />
            <h4 className="text-lg sm:text-xl font-bold mb-2 text-black dark:text-white">Responsive Design</h4>
            <p className="text-sm sm:text-base text-black dark:text-white">
              Creating mobile-first, cross-platform applications with optimal user experience
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
