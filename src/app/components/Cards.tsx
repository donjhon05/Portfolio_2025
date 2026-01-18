"use client";
import React, { useState, useEffect, useRef } from "react";
import { ExternalLink, Github, Calendar, CheckCircle2, Clock, XCircle, Code } from "lucide-react";
import BackgroundGraphics from "./BackgroundGraphics";

type ProjectItem = {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  features: string[];
  timeline: string;
  status: string;
  demoLink: string;
  githubLink: string;
  highlights: string;
};

const items: ProjectItem[] = [
  {
    title: "Certification",
    description: "A comprehensive portfolio website built with Next.js and modern web technologies.",
    image: "/Assets/Certificate.png",
    technologies: ["React", "Tailwind CSS", "Bootstrap", "HTML", "CSS", "JavaScript"],
    features: [
      "Responsive design across all devices",
      "Smooth animations and transitions",
      "Trained to handle reusable components",
      "Performance-focused development"
    ],
    timeline: "6 weeks",
    status: "Completed",
    demoLink: "https://portfolio-demo.com",
    githubLink: "https://github.com/user/portfolio",
    highlights: "freecodecamp certification in Front End Development"
  },
  {
    title: "Vet Med Appointment System",
    description: "Full-stack veterinary appointment management system with real-time scheduling.",
    image: "/Assets/Pet_Grooming_App.png",
    technologies: ["React", "Node.js", "MongoDB", "Auth", "Express"],
    features: [
      "Real-time Vet appointment booking",
      "Patient management system",
      "Automated email notifications",
      "Admin dashboard with analytics"
    ],
    timeline: "6 weeks",
    status: "In Development",
    demoLink: "https://vetmed-demo.com",
    githubLink: "https://github.com/donjhon05/Pauline_AppointmentSystem",
    highlights: "Veterinary Website with real-time appointment booking and management system"
  },
  {
    title: "Wordpress E-commerce Platform for Garuda Recruitment Agency",
    description: "Complete e-commerce solution with inventory management and payment integration.",
    image: "/Assets/garuda.jpg",
    technologies: ["Wordpress", "Builder", "Elementor", "WooCommerce", "PHP", "MySQL"],
    features: [
      "Product catalog with search",
      "Outsourcing WordPress Web Design with Elementor Pro and custom features",
      "Order tracking system",
      "Recruitment management"
    ],
    timeline: "8 weeks",
    status: "In Development",
    demoLink: "#",
    githubLink: "https://github.com/user/ecommerce",
    highlights: "Handles 1000+ concurrent users with optimized database queries"
  },
  {
    title: "UI/UX Design System",
    description: "Comprehensive design system and component library for consistent branding.",
    image: "/Assets/UIUX_DESIGN.png",
    technologies: ["React", "Storybook", "Figma", "SaSS", "MUI"],
    features: [
      "50+ reusable components",
      "Design tokens and theming",
      "Accessibility compliance",
      "Interactive documentation"
    ],
    timeline: "4 weeks",
    status: "Ongoing",
    demoLink: "#",
    githubLink: "https://github.com/user/design-system",
    highlights: "WCAG 2.1 AA compliant with automated testing"
  },
  {
    title: "WordPress SyntechNX Web Design",
    description: "Real-time analytics dashboard with advanced data visualization and reporting.",
    image: "/Assets/Syntech_Wireframe.png",
    technologies: ["Elementor Pro", "Paralax", "WPForms", "BackWPUp", "WordFence"],
    features: [
      "Real-time Design/Structure Wireframe",
      "Custom report generation",
      "Performance metrics tracking",
      "Live data updates"
    ],
    timeline: "162 hours",
    status: "Completed",
    demoLink: "https://www.canva.com/design/DAFKBqXWzJM/oSSb58eKN7cP1AOxEeS0Eg/edit?utm_content=DAFKBqXWzJM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
    githubLink: "https://github.com/user/analytics",
    highlights: "Outsourcing WordPress Web Design with Elementor Pro and custom features"
  },
  {
    title: "Performance Analytics Dashboard",
    description: "Real-time analytics dashboard with advanced data visualization and reporting.",
    image: "/Assets/SDLC_PIC.png",
    technologies: ["React", "D3.js", "Node.js", "PostgreSQL"],
    features: [
      "Real-time data visualization",
      "Custom report generation",
      "Performance metrics tracking",
      "Export functionality"
    ],
    timeline: "5 weeks",
    status: "Inactive",
    demoLink: "https://analytics-demo.com",
    githubLink: "https://github.com/user/analytics",
    highlights: "Processes 100GB+ daily data with sub-second query response"
  },
];

const Cards: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [visibleProjects, setVisibleProjects] = useState<Set<number>>(new Set());
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [containerScales, setContainerScales] = useState<Record<number, number>>({});
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-project-index') || '0');
            setVisibleProjects((prev) => new Set([...prev, index]));
            setActiveIndex(index);
          }
        });
      },
      { threshold: 0.4, rootMargin: '0px 0px -100px 0px' }
    );

    const projects = sectionRef.current?.querySelectorAll('[data-project-index]');
    projects?.forEach((project) => observer.observe(project));

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const sectionTop = section.getBoundingClientRect().top;
      const sectionHeight = section.getBoundingClientRect().height;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress of the section
      const progress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight)));
      setScrollProgress(progress);

      // Calculate scale/pop effect for each item
      const scales: Record<number, number> = {};
      items.forEach((_, index) => {
        const element = itemRefs.current[index];
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        const distance = Math.abs(elementCenter - viewportCenter);
        const maxDistance = windowHeight;

        // Calculate scale: 1 when centered, 0.6 when far from center
        const scale = Math.max(0.6, 1 - (distance / maxDistance) * 0.4);
        scales[index] = scale;
      });

      setContainerScales(scales);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      projects?.forEach((project) => observer.unobserve(project));
    };
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle2 className="w-4 h-4" />;
      case "In Development":
        return <Clock className="w-4 h-4" />;
      default:
        return <XCircle className="w-4 h-4" />;
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800";
      case "In Development":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
      default:
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800";
    }
  };

  return (
    <section ref={sectionRef} id="projects" className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-[#0a0a0a] dark:to-[#111111] transition-colors duration-300 overflow-hidden">
      {/* Scattered 3D Background Graphics */}
      <div className="absolute inset-0 z-0">
        <BackgroundGraphics intensity={0.25} scope="section" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-full mb-4 sm:mb-6">
            <Code className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400">Portfolio Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Featured <span className="bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-black dark:text-white max-w-3xl mx-auto leading-relaxed px-4 font-semibold tracking-wide">
            A collection of projects showcasing my expertise in building scalable, production-ready applications
          </p>
        </div>

        {/* Projects Tree Timeline */}
        <div className="relative max-w-4xl mx-auto" ref={containerRef}>
          {/* Center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-blue-400 to-transparent dark:from-blue-400 dark:via-blue-500 dark:to-transparent opacity-30 pointer-events-none"></div>

          {/* Animated scroll-fill line */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 via-blue-600 to-blue-400 dark:from-blue-300 dark:via-blue-400 dark:to-blue-500 shadow-lg shadow-blue-500/50 dark:shadow-blue-400/30 pointer-events-none transition-all duration-200"
            style={{ 
              height: `${scrollProgress * 100}%`,
              boxShadow: `0 0 ${scrollProgress * 20}px ${scrollProgress * 2}px rgba(59, 130, 246, ${scrollProgress * 0.6}), inset 0 0 ${scrollProgress * 10}px rgba(255, 255, 255, ${scrollProgress * 0.3})`
            }}
          ></div>
          {items.map((item, index) => {
            const isVisible = visibleProjects.has(index);
            const isEvenIndex = index % 2 === 0;
            const scale = containerScales[index] ?? 0.6;
            
            return (
              <div
                key={index}
                data-project-index={index}
                ref={(el) => {
                  if (el) itemRefs.current[index] = el;
                }}
                className={`relative group ${isEvenIndex ? 'ml-0 mr-auto' : 'ml-auto mr-0'} w-full sm:w-1/2 px-4 sm:px-0 py-8 sm:py-12 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Scroll-triggered glow effect */}
                <div 
                  className="absolute inset-0 rounded-2xl blur-2xl opacity-0 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: activeIndex === index 
                      ? 'radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent)' 
                      : `radial-gradient(circle, rgba(59, 130, 246, ${scrollProgress * 0.15}), transparent)`,
                    opacity: activeIndex === index ? 1 : scrollProgress * 0.5,
                  }}
                ></div>

                {/* Branch connector line with animation */}
                <div 
                  className={`absolute top-16 ${isEvenIndex ? 'right-0 sm:right-auto sm:left-1/2' : 'left-0 sm:left-auto sm:right-1/2'} h-px bg-gradient-to-r ${isEvenIndex ? 'from-blue-500 to-transparent' : 'from-transparent to-blue-500'} dark:from-blue-400 dark:to-transparent opacity-40 transition-all duration-300`}
                  style={{
                    width: activeIndex === index ? (isEvenIndex ? '48px' : '48px') : (isEvenIndex ? '32px' : '32px'),
                    opacity: activeIndex === index ? 0.8 : 0.4 + scrollProgress * 0.2,
                    boxShadow: activeIndex === index 
                      ? `${isEvenIndex ? '-' : ''}10px 0 15px rgba(59, 130, 246, 0.5)` 
                      : `${isEvenIndex ? '-' : ''}5px 0 10px rgba(59, 130, 246, ${scrollProgress * 0.3})`,
                  }}
                ></div>

                {/* Card with pop in/out animation */}
                <div
                  className={`ml-auto mr-0 sm:ml-0 sm:mr-auto bg-white dark:bg-[#0a0a0a] rounded-2xl sm:rounded-3xl border-2 border-gray-200 dark:border-gray-800 overflow-hidden hover:border-blue-400 dark:hover:border-blue-600 cursor-pointer shadow-xl w-full relative transition-all duration-300 ease-out group hover:shadow-2xl hover:border-cyan-400 dark:hover:border-cyan-500`}
                  onClick={() => setSelectedProject(item)}
                  style={{
                    transform: `scale(${scale}) ${activeIndex === index ? 'translateY(-12px)' : 'translateY(0)'} rotateZ(${isEvenIndex ? scrollProgress * 0.5 : scrollProgress * -0.5}deg)`,
                    boxShadow: activeIndex === index 
                      ? '0 25px 50px rgba(59, 130, 246, 0.4), 0 0 80px rgba(59, 130, 246, 0.25)' 
                      : `0 ${10 * scale}px ${20 * scale}px rgba(0, 0, 0, ${0.15 * scale + scrollProgress * 0.05}), inset 0 0 ${scrollProgress * 5}px rgba(59, 130, 246, ${scrollProgress * 0.1})`,
                  }}
                >
                  {/* Project Image with parallax */}
                  <div className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 group">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-300"></div>
                    
                    {/* Scroll-triggered highlight effect */}
                    <div 
                      className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: activeIndex === index ? 'radial-gradient(circle at center, rgba(59, 130, 246, 0.2), transparent)' : 'transparent',
                        opacity: activeIndex === index ? 1 : 0,
                      }}
                    ></div>

                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold border ${getStatusStyles(item.status)} group-hover:scale-110 transition-transform`}>
                        {getStatusIcon(item.status)}
                        {item.status}
                      </span>
                    </div>
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1 drop-shadow-lg group-hover:translate-y-0 transition-transform">{item.title}</h3>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-4 sm:p-6">
                    <p className="text-black dark:text-white text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed font-medium tracking-wide">{item.description}</p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                      {item.technologies.slice(0, 4).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 sm:px-3 py-1 bg-gray-100 dark:bg-gray-800 text-black dark:text-white text-xs font-medium rounded-lg border border-gray-200 dark:border-gray-700 group-hover:border-blue-300 dark:group-hover:border-blue-700 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                      {item.technologies.length > 4 && (
                        <span className="px-2 sm:px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs font-medium rounded-lg border border-blue-200 dark:border-blue-800">
                          +{item.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex gap-2 pt-2 border-t border-gray-200 dark:border-gray-800">
                      {item.demoLink !== "#" && (
                        <a
                          href={item.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
                        >
                          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                          Demo
                        </a>
                      )}
                      <a
                        href={item.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-black dark:text-white text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 transform hover:scale-105 active:scale-95"
                      >
                        <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                        Code
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="bg-white dark:bg-[#0a0a0a] rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-gray-200 dark:border-gray-800 shadow-2xl animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 sm:p-8 md:p-12">
                {/* Header */}
                <div className="flex items-start justify-between mb-6 sm:mb-8">
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 mb-3 sm:mb-4 flex-wrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold border ${getStatusStyles(selectedProject.status)}`}>
                        {getStatusIcon(selectedProject.status)}
                        {selectedProject.status}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gray-100 dark:bg-gray-800 text-black dark:text-white text-xs font-medium rounded-lg">
                        <Calendar className="w-3 h-3" />
                        {selectedProject.timeline}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-black dark:text-white">{selectedProject.title}</h3>
                    <p className="text-base sm:text-lg text-black dark:text-white leading-relaxed font-semibold tracking-wide">{selectedProject.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="ml-4 p-2 rounded-lg text-black hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 active:scale-95"
                  >
                    <XCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>

                {/* Image */}
                <div className="mb-6 sm:mb-8 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-800 shadow-lg">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-64 sm:h-80 object-cover"
                  />
                </div>

                {/* Details */}
                <div className="space-y-6 sm:space-y-8">
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 flex items-center gap-2">
                      <Code className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs sm:text-sm font-semibold rounded-xl border border-blue-200 dark:border-blue-800 hover:scale-105 transition-transform cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-black dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                      Key Features
                    </h4>
                    <ul className="space-y-2 sm:space-y-3">
                      {selectedProject.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 sm:gap-3 text-black dark:text-gray-200 group/feature">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/feature:scale-110 transition-transform">
                            <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="text-sm sm:text-base leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-xl sm:rounded-2xl border-2 border-blue-100 dark:border-blue-800/50">
                    <h4 className="text-base sm:text-lg font-bold text-black dark:text-white mb-2">Project Highlights</h4>
                    <p className="text-sm sm:text-base text-black dark:text-white leading-relaxed">
                      {selectedProject.highlights}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                    {selectedProject.demoLink !== "#" && (
                      <a
                        href={selectedProject.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-105 active:scale-95"
                      >
                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                        View Live Demo
                      </a>
                    )}
                    <a
                      href={selectedProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-700 transform hover:scale-105 active:scale-95"
                    >
                      <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                      View Source Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cards;
