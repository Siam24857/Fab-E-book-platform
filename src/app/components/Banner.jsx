"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, Users, Award, Star } from "lucide-react";
import Image from "next/image";
import toast, { Toaster } from 'react-hot-toast';

const HeroBanner = () => {
  const stats = [
    { icon: BookOpen, label: "Ebooks Available", value: "34+" },
    { icon: Users, label: "Active Readers", value: "19+" },
    { icon: Award, label: "Top Writers", value: "16+" },
  ];



  // Book image URLs - Replace with your actual images
  const bookImages = {
    story: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    adventure: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    featured: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop",
  };
 
  const handleBrowseClick = (e) => {
    if (!e.target.closest('a')) {
      toast.success('Loading books...');
    }
  };

 
  const handleStartReading = (e) => {
    if (!e.target.closest('a')) {
      toast('Please login to start reading', {
        icon: '📚',
      });
    }
  };

  return (
    <section
      className="relative overflow-hidden min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex items-center bg-white"
      style={{
        backgroundImage: `
          radial-gradient(circle at 15% 20%, rgba(99,102,241,0.18), transparent 45%),
          radial-gradient(circle at 85% 15%, rgba(236,72,153,0.16), transparent 45%),
          radial-gradient(circle at 50% 90%, rgba(168,85,247,0.14), transparent 50%),
          url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1600&q=80')
        `,
        backgroundSize: "cover, cover, cover, cover",
        backgroundPosition: "center, center, center, center",
        backgroundBlendMode: "normal, normal, normal, luminosity",
      }}
    >
      {/* Frosted glass overlay so content stays readable on white/bg-img */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-md" />

      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff',
            },
          },
        }}
      />

      {/* Animated Background Shapes - Responsive */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-40 sm:w-56 md:w-72 h-40 sm:h-56 md:h-72 bg-indigo-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-pink-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 sm:w-48 md:w-64 h-40 sm:h-48 md:h-64 bg-purple-300 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6"
            >
              <span className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 bg-clip-text text-transparent drop-shadow-sm">
                Discover & Read
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent">
                Original Ebooks
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 md:mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Join thousands of readers and writers on Fable. Explore original
              ebooks, support emerging authors, and dive into captivating stories.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/browsersbooks"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white rounded-lg font-semibold hover:opacity-90 transition-all transform hover:scale-105 shadow-lg shadow-purple-300/50 text-sm sm:text-base"
                onClick={handleBrowseClick}
              >
                Browse Ebooks
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <Link
                href="/Login"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white/60 backdrop-blur-sm border-2 border-indigo-300 text-indigo-700 rounded-lg font-semibold hover:bg-white/90 transition-all text-sm sm:text-base shadow-sm"
                onClick={handleStartReading}
              >
                Start Reading
              </Link>
            </motion.div>

            {/* Stats - Responsive Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-8 md:mt-10"
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center bg-white/50 backdrop-blur-md border border-white/60 rounded-xl py-3 shadow-sm"
                >
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2 text-pink-500" />
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Book Showcase - Hidden on mobile, visible on larger screens */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex flex-col items-center"
          >
            {/* Main Book Picture with Floating Cards */}
            <div className="relative">
              {/* Floating Book Cards (Decorative Background) */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute -top-10 -left-20 bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-white/60 transform rotate-[-10deg] hidden xl:block"
              >
                <div className="relative w-24 h-36 sm:w-32 sm:h-48 rounded-lg overflow-hidden">
                  <Image
                    src={bookImages.story}
                    alt="The Story"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-xs sm:text-sm font-semibold mt-2 text-center text-gray-800">The Story</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 5, delay: 1 }}
                className="absolute -bottom-10 -right-20 bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-white/60 transform rotate-[10deg] hidden xl:block"
              >
                <div className="relative w-24 h-36 sm:w-32 sm:h-48 rounded-lg overflow-hidden">
                  <Image
                    src={bookImages.adventure}
                    alt="Adventure"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-xs sm:text-sm font-semibold mt-2 text-center text-gray-800">Adventure</p>
              </motion.div>

              {/* Main Book */}
              <div className="bg-white/85 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl border border-white/60 transform rotate-2">
                <div className="relative w-36 h-48 sm:w-44 sm:h-56 md:w-48 md:h-64 rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src={bookImages.featured}
                    alt="Featured Book"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mt-3 sm:mt-4 text-center">
                  <p className="font-bold text-gray-800 text-sm sm:text-base">Featured Book</p>
                  <p className="text-xs sm:text-sm text-gray-600">By Jane Doe</p>
                  <div className="flex justify-center items-center mt-1 sm:mt-2 space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xs sm:text-sm">★</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;