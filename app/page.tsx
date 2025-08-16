"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Homepage: React.FC = () => {
  const heroLogoRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const navbarLogoRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial hidden state for navbar
    gsap.set(navbarRef.current, { scale: 0.85, opacity: 0 });
    gsap.set(navbarLogoRef.current, { scale: 0.6, opacity: 0 });

    // Scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "200vh top", // 👈 extended to slow down disappearance
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          // Hero logo shrink & fade
          gsap.to(heroLogoRef.current, {
            scale: Math.max(0.4, 1 - progress * 0.6), // slower shrink
            y: -progress * 150, // less upward movement
            opacity: Math.max(0, 1 - progress * 1.0), // slower fade-out
            duration: 0.1,
            ease: "power2.out",
          });

          // Navbar + logo fade in
          if (progress > 0.3) {
            const navProgress = (progress - 0.3) / 0.7;
            gsap.to(navbarRef.current, {
              scale: 0.85 + navProgress * 0.15,
              opacity: navProgress,
              duration: 0.2,
              ease: "power2.out",
            });
            gsap.to(navbarLogoRef.current, {
              scale: 0.6 + navProgress * 0.4,
              opacity: navProgress,
              duration: 0.2,
              ease: "power2.out",
            });
          } else {
            gsap.to(navbarRef.current, {
              scale: 0.85,
              opacity: 0,
              duration: 0.2,
            });
            gsap.to(navbarLogoRef.current, {
              scale: 0.6,
              opacity: 0,
              duration: 0.2,
            });
          }
        },
      },
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/videos/sheep.mp4" type="video/mp4" />
        <source src="/videos/sheep.webm" type="video/webm" />
      </video>

      {/* Navbar */}
      <nav
        ref={navbarRef}
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg"
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div ref={navbarLogoRef} className="flex items-center">
            <Link href="/" className="block">
              <Image
                src="/images/parcs.png"
                alt="Parcs Logo"
                width={150}
                height={50}
                className="h-10 w-auto"
                priority
              />
            </Link>
          </div>

          <div className="hidden md:flex space-x-8">
            <Link
              href="/about"
              className="text-gray-800 hover:text-blue-600 transition-colors duration-300 font-medium"
            >
              About
            </Link>
            <Link
              href="/services"
              className="text-gray-800 hover:text-blue-600 transition-colors duration-300 font-medium"
            >
              Services
            </Link>
            <Link
              href="/projects"
              className="text-gray-800 hover:text-blue-600 transition-colors duration-300 font-medium"
            >
              Projects
            </Link>
            <Link
              href="/contact"
              className="text-gray-800 hover:text-blue-600 transition-colors duration-300 font-medium"
            >
              Contact
            </Link>
          </div>

          <button className="md:hidden p-2 text-gray-800">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Logo */}
      <section className="relative h-screen flex items-center justify-center">
        <div ref={heroLogoRef} className="relative z-10">
          <Image
            src="/images/parcs.png"
            alt="Parcs"
            width={800}
            height={300}
            className="w-auto h-40 md:h-60 lg:h-72 max-w-[90vw]"
            priority
          />
        </div>
      </section>

      <section className="relative z-10 min-h-screen py-20">
        {/* Semi-transparent warm brown overlay for readability */}
        {/* <div className="absolute inset-0 bg-[#5c3d2e]/60 -z-5"></div> */}

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
              Welcome to Parcs Bakery
            </h2>
            <p className="text-xl text-white/90 text-center mb-16 leading-relaxed">
              Where every loaf, cake, and pastry is crafted with care,
              tradition, and a touch of love.
            </p>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              {/* Vision */}
              <div className="space-y-6 bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h3 className="text-2xl font-semibold text-white">
                  Our Vision
                </h3>
                <p className="text-white/90 leading-relaxed">
                  At Parcs, baking is more than a craft — it’s our heritage. We
                  strive to bring warmth to every home with fresh, wholesome,
                  and delicious baked goods that bring people together.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center text-[#d4a373] hover:text-[#e6b98a] font-medium transition-colors duration-300"
                >
                  Learn More
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>

              {/* What We Offer */}
              <div className="space-y-6 bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h3 className="text-2xl font-semibold text-white">
                  What We Offer
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#d4a373] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-white/90">Freshly Baked Breads</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#d4a373] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-white/90">
                      Artisan Cakes & Pastries
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#d4a373] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-white/90">Handcrafted Cookies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#d4a373] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-white/90">
                      Seasonal & Custom Orders
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/order"
                  className="bg-[#8c5e3c] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#6f4830] transition-colors duration-300 shadow-lg backdrop-blur-sm"
                >
                  Order Now
                </Link>
                <Link
                  href="/contact"
                  className="border-2 border-white/50 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                >
                  Visit Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
