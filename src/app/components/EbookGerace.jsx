"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Book,
  Heart,
  Zap,
  Rocket,
  Ghost,
  Sparkles,
  Sword,
  Music,
} from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

const EbookGenres = () => {
  const genres = [
    { name: "Fiction", icon: Book, color: "from-blue-400 to-blue-600" },
    { name: "Mystery", icon: Ghost, color: "from-purple-400 to-purple-600" },
    { name: "Romance", icon: Heart, color: "from-pink-400 to-pink-600" },
    { name: "Sci-Fi", icon: Rocket, color: "from-cyan-400 to-cyan-600" },
    { name: "Fantasy", icon: Sparkles, color: "from-yellow-400 to-yellow-600" },
    { name: "Horror", icon: Zap, color: "from-red-400 to-red-600" },
    { name: "Adventure", icon: Sword, color: "from-green-400 to-green-600" },
    { name: "Poetry", icon: Music, color: "from-indigo-400 to-indigo-600" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  // Handle genre click
  const handleGenreClick = (genreName) => {
    toast.success(`Exploring ${genreName} genre`);
  };

  // Handle browse all genres click
  
  return (
    <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden bg-white">
      {/* Premium Background Pattern - from HeroBanner */}
      <div className="absolute inset-0">
        {/* Main Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-purple-100/60 to-pink-100/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-blue-100/40 to-cyan-100/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-50/30 via-pink-50/30 to-blue-50/30 rounded-full blur-3xl" />
        
        {/* Geometric Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(30deg, #8b5cf6 12%, transparent 12.5%, transparent 87%, #8b5cf6 87.5%, #8b5cf6),
              linear-gradient(150deg, #8b5cf6 12%, transparent 12.5%, transparent 87%, #8b5cf6 87.5%, #8b5cf6),
              linear-gradient(30deg, #8b5cf6 12%, transparent 12.5%, transparent 87%, #8b5cf6 87.5%, #8b5cf6),
              linear-gradient(150deg, #8b5cf6 12%, transparent 12.5%, transparent 87%, #8b5cf6 87.5%, #8b5cf6)
            `,
            backgroundSize: '80px 140px',
            backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px',
          }} />
        </div>

        {/* Dot Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #8b5cf6 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />

        {/* Animated Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-400 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                repeat: Infinity,
                duration: 10 + i * 2,
                delay: i * 1.5,
              }}
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + i * 10}%`,
              }}
            />
          ))}
        </div>
      </div>

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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-3">
            Explore Ebook Genres
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Find your next favorite read across a wide range of genres. From
            fiction to fantasy, there's something for everyone.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 max-w-5xl mx-auto"
        >
          {genres.map((genre) => (
            <motion.div
              key={genre.name}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full"
            >
              <Link
                href={`/browsersbooks?genre=${genre.name}`}
                className="block"
                 
              >
                <div
                  className={`bg-gradient-to-br ${genre.color} rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 text-white shadow-md hover:shadow-xl transition-all text-center backdrop-blur-sm border border-white/20`}
                >
                  <genre.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mx-auto mb-2 sm:mb-2.5 md:mb-3" />
                  <span className="font-semibold text-xs sm:text-sm md:text-base">{genre.name}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-8 sm:mt-10 md:mt-12"
        >
          <Link
            href="/browsersbooks"
            className="text-indigo-600 hover:text-indigo-800 font-semibold inline-flex items-center text-sm sm:text-base"
     
          >
            Browse All Genres
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2"
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
        </motion.div>
      </div>

      {/* Bottom Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />
    </section>
  );
};

export default EbookGenres;