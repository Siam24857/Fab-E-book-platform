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
  const handleBrowseAll = () => {
    toast.success('Loading all genres');
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
                onClick={() => handleGenreClick(genre.name)}
              >
                <div
                  className={`bg-gradient-to-br ${genre.color} rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 text-white shadow-md hover:shadow-xl transition-all text-center`}
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
            onClick={handleBrowseAll}
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
    </section>
  );
};

export default EbookGenres;