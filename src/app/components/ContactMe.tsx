'use client';

import React, { useEffect, useState } from "react";
import { Mail, MapPin } from "lucide-react";

// Define the type for coordinates
type Coords = {
  lat: number;
  lon: number;
} | null;

export default function ContactMe() {
  const [coords, setCoords] = useState<Coords>(null);

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

  const openGoogleMapsRoute = () => {
    if (coords) {
      // Replace with your destination address
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
    <section className="w-full py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2 tracking-wide">
            Contact <span className="text-indigo-400">Me</span>
          </h2>
          <p className="text-gray-400 text-lg">Let’s connect and collaborate!</p>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Location Card */}
          <button
            onClick={openGoogleMapsRoute}
            className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-300 w-full text-left"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-500 rounded-full">
                <MapPin size={28} className="text-white" />
              </div>
              <div>
                <h4 className="text-xl font-semibold">Location</h4>
                <p className="text-gray-300">
                  {coords
                    ? "Click to get directions to my location"
                    : "Detecting your location..."}
                </p>
              </div>
            </div>
          </button>

          {/* Email Card */}
          <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-500 rounded-full">
                <Mail size={28} className="text-white" />
              </div>
              <div>
                <h4 className="text-xl font-semibold">Email</h4>
                <p className="text-gray-300">donjhonmagarro05@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
