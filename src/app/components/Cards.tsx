"use client";
import React, { useState } from "react";
import clsx from "clsx";

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
    githubLink: "https://github.com/user/vetmed",
    highlights: "Veterinary Website with real-time appointment booking and management system"
  },
  {
    title: "Fullstack E-commerce Platform for Garuda Recruitment Agency",
    description: "Complete e-commerce solution with inventory management and payment integration.",
    image: "/Assets/E-Commerce_OutSourcing.jpg",
    technologies: ["Wordpress", "Builder", "Elementor", "WooCommerce", "PHP", "MySQL"],
    features: [
      "Product catalog with search",
      "Shopping cart and checkout",
      "Order tracking system",
      "Inventory management"
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
    demoLink: "https://designsystem-demo.com",
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

const ExpandedCard: React.FC = () => {
  const [activeId, setActiveId] = useState<number>(0);
  const [hoveredItem, setHoveredItem] = useState<ProjectItem | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [previewPosition, setPreviewPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const handleMouseEnter = (item: ProjectItem, index: number, event: React.MouseEvent<HTMLDivElement>): void => {
    setActiveId(index);
    const card = event.currentTarget;
    const cardRect = card.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const previewWidth = window.innerWidth < 768 ? viewportWidth - 32 : 600;
    const previewHeight = 500;

    let left = cardRect.right + 20;
    let top = cardRect.top;
    if (left + previewWidth > viewportWidth - 20) {
      left = cardRect.left - previewWidth - 20;
    }
    if (left < 20) left = 20;
    if (top + previewHeight > viewportHeight - 20) {
      top = viewportHeight - previewHeight - 20;
    }
    if (top < 20) top = 20;
    setPreviewPosition({ top, left });

    if (hoverTimeout) clearTimeout(hoverTimeout);
    const timeout = setTimeout(() => setHoveredItem(item), 200);
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = (): void => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setTimeout(() => {
      setHoveredItem(null);
    }, 100);
  };

  return (
    <div className="w-full px-4 py-20 bg-gradient-to-br from-slate-900 to-blue-900 min-h-screen text-white relative">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-2">Featured Skills and Projects</h1>
        <p className="text-gray-300 max-w-xl mx-auto">
          See more details of my projects below, Including technologies, features, and development insights.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 max-w-7xl mx-auto relative" onMouseLeave={handleMouseLeave}>
        {items.map((item, index) => {
          const isActive = index === activeId;
          const isHovered = hoveredItem === item;
          return (
            <div
              key={index}
              onMouseEnter={(e) => handleMouseEnter(item, index, e)}
              className={clsx(
                "relative min-h-[300px] rounded-xl overflow-hidden bg-white/5 backdrop-blur-md cursor-pointer transition-all duration-500 ease-out group",
                isActive ? "flex-[3]" : "flex-[1.2]",
                isHovered && "transform scale-[1.02] z-20 shadow-2xl"
              )}
            >
              <div className="relative w-full h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />  
              <div className={clsx(
                "absolute inset-0 p-6 flex flex-col justify-center transition-all duration-300",
                isActive ? "opacity-100" : "opacity-0 group-hover:opacity-90"
              )}>
                <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                <p className="text-sm text-gray-200">{item.description}</p>
              </div>
            </div>
          );
        })}

        {hoveredItem && (
          <div
            className="fixed z-50"
            style={{ top: `${previewPosition.top}px`, left: `${previewPosition.left}px` }}
          >
            <div className="bg-gray-900/95 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl animate-fadeIn transition-all duration-200 w-[calc(100vw-2rem)] max-w-lg md:max-w-xl lg:max-w-2xl p-4 md:p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6 mb-4 md:mb-6">
                <div className="relative w-full sm:w-24 md:w-32 h-16 md:h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={hoveredItem.image} 
                    alt={hoveredItem.title} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white truncate">{hoveredItem.title}</h3>
                    <span className={clsx(
                      "px-2 md:px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 self-start",
                      hoveredItem.status === "Completed" ? "bg-green-600 text-white" :
                      hoveredItem.status === "In Development" ? "bg-yellow-600 text-white" :
                      "bg-blue-600 text-white"
                    )}>{hoveredItem.status}</span>
                  </div>
                  <p className="text-gray-300 text-xs md:text-sm mb-2 md:mb-3 line-clamp-2">{hoveredItem.description}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs md:text-sm text-gray-400">
                    <span>📅 {hoveredItem.timeline}</span>
                    <span>🔗 Demo Available</span>
                  </div>
                </div>
              </div>
              <div className="mb-4 md:mb-6">
                <h4 className="text-xs md:text-sm font-semibold text-gray-400 mb-2 md:mb-3 uppercase tracking-wide">Tech Stack</h4>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {hoveredItem.technologies.map((tech, idx) => (
                    <span key={idx} className="bg-blue-600/20 text-blue-300 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium border border-blue-500/30">{tech}</span>
                  ))}
                </div>
              </div>
              <div className="mb-4 md:mb-6">
                <h4 className="text-xs md:text-sm font-semibold text-gray-400 mb-2 md:mb-3 uppercase tracking-wide">Key Features</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 md:gap-2">
                  {hoveredItem.features.slice(0, 4).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0 mt-1.5"></div>
                      <span className="text-gray-300 text-xs md:text-sm leading-tight">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-4 md:mb-6">
                <h4 className="text-xs md:text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wide">Project Highlights</h4>
                <p className="text-gray-300 text-xs md:text-sm bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-2 md:p-3 rounded-lg border border-purple-500/20 leading-relaxed">
                  💡 {hoveredItem.highlights}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                <a href={hoveredItem.demoLink} target="_blank" rel="noopener noreferrer" className="bg-white text-black px-3 md:px-6 py-2 md:py-2.5 rounded-lg font-semibold text-xs md:text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                  🚀 <span className="hidden sm:inline">Live Demo</span><span className="sm:hidden">Demo</span>
                </a>
                <a href={hoveredItem.githubLink} target="_blank" rel="noopener noreferrer" className="bg-gray-700 text-white px-3 md:px-6 py-2 md:py-2.5 rounded-lg font-semibold text-xs md:text-sm hover:bg-gray-600 transition-colors flex items-center justify-center gap-2">
                  📁 <span className="hidden sm:inline">View Code</span><span className="sm:hidden">Code</span>
                </a>
                <a href={hoveredItem.demoLink} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 md:px-6 py-2 md:py-2.5 rounded-lg font-semibold text-xs md:text-sm hover:from-purple-700 hover:to-pink-700 transition-colors flex items-center justify-center gap-2">
                  📖 <span className="hidden sm:inline">Case Study</span><span className="sm:hidden">Study</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ExpandedCard;