'use client';

import React, { useEffect, useState, useRef } from "react";
import { Mail, MapPin, Send, MessageCircle } from "lucide-react";
import BackgroundGraphics from "./BackgroundGraphics";

type Coords = {
  lat: number;
  lon: number;
} | null;

export default function ContactMe() {
  const [coords, setCoords] = useState<Coords>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        () => {
          setCoords(null);
        }
      );
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-contact-index') || '0');
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = sectionRef.current?.querySelectorAll('[data-contact-index]');
    cards?.forEach((card) => observer.observe(card));

    return () => {
      cards?.forEach((card) => observer.unobserve(card));
    };
  }, []);

  const openGoogleMapsRoute = () => {
    if (coords) {
      const destination = encodeURIComponent("Antipolo, Rizal, Philippines");
      window.open(
        `https://www.google.com/maps/dir/?api=1&origin=${coords.lat},${coords.lon}&destination=${destination}`,
        "_blank"
      );
    } else {
      alert("Location not available. Please allow location access.");
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="relative py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#111111] transition-colors duration-300 overflow-hidden">
      {/* Scattered 3D Background Graphics */}
      <div className="absolute inset-0 z-0">
        <BackgroundGraphics intensity={0.3} scope="section" />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
        <div className="absolute top-20 right-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border border-blue-200 dark:border-blue-700/50 rounded-full mb-4 sm:mb-6 hover:shadow-lg transition-all duration-300">
            <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400 animate-bounce" />
            <span className="text-xs sm:text-sm font-semibold text-blue-700 dark:text-blue-300">💬 Let's Connect</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Get In <span className="bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-black dark:text-white max-w-2xl mx-auto leading-relaxed px-4 font-semibold tracking-wide">
            I'm always excited to discuss new opportunities, innovative projects, or fascinating technology conversations.
          </p>
        </div>

        {/* Contact Info */}
        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
          {/* Location Card */}
          <button
            data-contact-index={0}
            onClick={openGoogleMapsRoute}
            className={`group relative p-6 sm:p-8 bg-white dark:bg-[#0a0a0a] rounded-xl sm:rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-500 text-left shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 active:scale-95 overflow-hidden ${
              visibleCards.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 flex items-center justify-center mb-4 sm:mb-6 shadow-lg shadow-blue-500/30 group-hover:shadow-xl group-hover:shadow-blue-500/50 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative">
              <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <h4 className="text-xl sm:text-2xl font-bold mb-2 text-black dark:text-white relative">Location</h4>
            <p className="text-black dark:text-white text-base sm:text-lg mb-2 relative">
              {coords
                ? "Click to get directions"
                : "Antipolo, Rizal, Philippines"}
            </p>
            <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-2 transition-transform inline-flex items-center gap-1 relative">
              Get Directions <span className="text-lg group-hover:rotate-12 transition-transform">→</span>
            </p>
          </button>

          {/* Email Card */}
          <a
            data-contact-index={1}
            href="mailto:donjhonmagarro05@gmail.com"
            className={`group relative p-6 sm:p-8 bg-white dark:bg-[#0a0a0a] rounded-xl sm:rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-blue-500/30 transform hover:-translate-y-2 hover:scale-105 active:scale-95 overflow-hidden ${
              visibleCards.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 flex items-center justify-center mb-4 sm:mb-6 shadow-lg shadow-blue-500/30 group-hover:shadow-xl group-hover:shadow-blue-500/50 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative">
              <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <h4 className="text-xl sm:text-2xl font-bold mb-2 text-black dark:text-white relative">Email</h4>
            <p className="text-black dark:text-white text-base sm:text-lg mb-2 relative">donjhonmagarro05@gmail.com</p>
            <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-2 transition-transform inline-flex items-center gap-1 relative">
              Send Email <span className="text-lg group-hover:rotate-12 transition-transform">→</span>
            </p>
          </a>
        </div>

        {/* CTA Section */}
        <div className="mt-12 sm:mt-16 relative p-6 sm:p-8 bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-indigo-900/10 rounded-2xl sm:rounded-3xl border-2 border-blue-100 dark:border-blue-800/50 hover:border-blue-300 dark:hover:border-blue-700/50 transition-all duration-300 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-black dark:text-white relative">✨ Ready to Work Together?</h3>
          <p className="text-sm sm:text-base text-black dark:text-white mb-4 sm:mb-6 max-w-2xl mx-auto relative">
            Let's discuss how I can help bring your next project to life with clean code, modern design, and exceptional user experience.
          </p>
          <a
            href="mailto:donjhonmagarro05@gmail.com"
            className="relative inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white font-semibold text-base sm:text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5 hover:scale-105 active:scale-95 overflow-hidden group/btn"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover/btn:opacity-100 animate-pulse"></span>
            <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform" />
            <span className="relative">Start a Conversation</span>
          </a>
        </div>
      </div>
    </section>
  );
}
