'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Github, Linkedin, Mail, Download, ArrowRight, Code, Sparkles } from 'lucide-react';

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);

const FloatingDots = () => {
  type Dot = {
    left: string;
    top: string;
    animationDelay: string;
    animationDuration: string;
  };

  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    const generated: Dot[] = [...Array(15)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 4}s`,
      animationDuration: `${3 + Math.random() * 2}s`
    }));
    setDots(generated);
  }, []);

  return (
    <>
      {dots.map((style, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-blue-300/30 rounded-full animate-pulse"
          style={style}
        />
      ))}
    </>
  );
};


  const roles = useMemo(() => ["Web Developer", "Software Engineer","UI/UX Designer","Gamer"], []);


  const skills = [
  { name: "React", level: 95, color: "from-[#61DAFB] to-[#21A1F1]" }, // React blue
  { name: "Node.js", level: 90, color: "from-[#3C873A] to-[#2E7031]" }, // Node green
  { name: "MongoDB", level: 76, color: "from-[#4DB33D] to-[#2F7B1C]" }, // MongoDB green
  { name: "TypeScript", level: 88, color: "from-[#3178C6] to-[#235A97]" }, // TS blue
  { name: "Next.js", level: 90, color: "from-[#000000] to-[#333333]" }, // Next.js black
  { name: "Express", level: 72, color: "from-[#787878] to-[#555555]" }, // Express gray
];

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

  // Mouse tracking for interactive effects
 useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const container = containerRef.current;
  if (container) {
    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }
}, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-blue-900 text-white relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-96 h-96 bg-blue-500/8 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transition: 'all 0.3s ease-out'
          }}
        />
        <div className="absolute top-20 right-20 w-64 h-64 bg-slate-400/8 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-600/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Professional grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Subtle floating elements */}
       
        <FloatingDots />
       
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-blue-300 font-medium">
                <Sparkles className="w-5 h-5" />
                <span>Welcome to my portfolio</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight select-none">
                Hi, I&apos;m{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-slate-300 to-cyan-500 bg-clip-text text-transparent select-none">
                  DJ
                </span>
              </h1>
              
              <div className="text-2xl lg:text-3xl text-gray-200 h-12">
                <span className="text-blue-300">{'<'}</span>
                {displayText}
                <span className="animate-pulse text-blue-300">|</span>
                <span className="text-blue-300">{' />'}</span>
              </div>
            </div>

            <p className="text-xl text-gray-200 leading-relaxed max-w-lg select-none">
              Building exceptional digital solutions through innovative full-stack development. 
              Committed to delivering high-quality applications with modern technologies 
              and best practices.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
 <a
  href="#cards"
  aria-label="View My Work"
  className="group w-full sm:w-auto bg-gradient-to-r from-blue-500 to-slate-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2"
>
  <span>View My Work</span>
  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
</a>


  <a
  href="/Assets/CV_Magarro.pdf"
  download
  aria-label="Download Resume"
  className="group w-full sm:w-auto bg-slate-100/10 backdrop-blur-sm border border-slate-300/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-100/20 transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2"
>
  <Download className="w-5 h-5" />
  <span>Download Resume</span>
</a>

</div>


            {/* Social Links */}
            <div className="flex space-x-6 pt-4">
              {[
                { icon: Github, href: 'https://github.com/donjhon05', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/donjhon-magarro-31a073291/', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:donjhon_magarro05@gmail.com', label: 'Email' },
                { icon: Code, href: 'https://github.com/donjhon05/Portfolio_2025', label: 'Portfolio' }
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="group w-12 h-12 bg-slate-100/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-slate-100/20 transform hover:scale-110 transition-all duration-300 border border-slate-300/20"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 group-hover:text-blue-300 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Content - Profile Image & Skills */}
          <div className="flex flex-col items-center space-y-8">
            {/* Profile Image Section */}
            <div className="relative group">
              {/* Animated Border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-slate-300 to-blue-500 rounded-full blur-sm group-hover:blur-md transition-all duration-300 animate-pulse"></div>
              
              {/* Main Image Container */}
              <div className="relative bg-slate-800 rounded-full p-2">
                <div className="w-80 h-80 rounded-full overflow-hidden bg-gradient-to-br from-slate-700 to-blue-800 flex items-center justify-center border-4 border-slate-200/20 group-hover:border-blue-300/30 transition-all duration-300">
                  {/* Graduation photo with fallback */}
                  <img
                    src="/graduation_pic1.jpg"
                    alt="DJ - Full Stack Developer & Graduate"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    style={{ filter: 'contrast(1.1) brightness(1.05)' }}
                    onError={(e) => {
                      console.log('Image failed to load, showing fallback');
                      (e.target as HTMLImageElement).style.display = 'none';
                      const fallback = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  
                  {/* Professional Avatar Fallback */}
                  <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex flex-col items-center justify-center text-white relative overflow-hidden" style={{ display: 'none' }}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-4 left-4 w-16 h-16 border-2 border-white/30 rounded-full"></div>
                      <div className="absolute bottom-6 right-6 w-12 h-12 border-2 border-white/20 rounded-full"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/10 rounded-full"></div>
                    </div>
                    
                    {/* Avatar Content */}
                    <div className="relative z-10 text-center">
                      <div className="text-7xl font-bold mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                        DJ
                      </div>
                      <div className="text-lg font-medium text-blue-100">
                        Full Stack Developer
                      </div>
                      <div className="text-sm text-blue-200 mt-1">
                        Class of 2024
                      </div>
                    </div>
                    
                    {/* Subtle animation */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              </div>
              
              {/* Professional Status Badge */}
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-500 to-slate-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 shadow-lg">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span>Open to Work</span>
              </div>
            </div>

            {/* Skills Visualization */}
            <div className="w-full max-w-md space-y-4">
              <h3 className="text-xl font-bold text-center text-white mb-6">Core Technologies</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={skill.name} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-white text-sm">{skill.name}</span>
                      <span className="text-xs text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out group-hover:scale-105`}
                        style={{
                          width: `${skill.level}%`,
                          animationDelay: `${index * 200}ms`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Professional Achievement Cards */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              <div className="bg-slate-100/10 backdrop-blur-sm border border-slate-300/20 rounded-xl p-4 text-center hover:scale-105 transition-all duration-300 hover:bg-slate-100/15">
                <div className="text-2xl font-bold text-blue-300">5+</div>
                <div className="text-sm text-gray-200">Projects</div>
              </div>
              <div className="bg-slate-100/10 backdrop-blur-sm border border-slate-300/20 rounded-xl p-4 text-center hover:scale-105 transition-all duration-300 hover:bg-slate-100/15">
                <div className="text-2xl font-bold text-slate-300">2024</div>
                <div className="text-sm text-gray-200">Graduate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Hero;