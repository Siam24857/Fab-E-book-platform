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

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Explore Ebook Genres
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find your next favorite read across a wide range of genres. From
            fiction to fantasy, there s something for everyone.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto"
        >
          {genres.map((genre) => (
            <motion.div
              key={genre.name}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={`/browse?genre=${genre.name.toLowerCase()}`}
                className="block"
              >
                <div
                  className={`bg-gradient-to-br ${genre.color} rounded-xl p-6 text-white shadow-md hover:shadow-xl transition-all text-center`}
                >
                  <genre.icon className="w-8 h-8 mx-auto mb-3" />
                  <span className="font-semibold text-sm">{genre.name}</span>
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
          className="text-center mt-10"
        >
          <Link
            href="/browse"
            className="text-indigo-600 hover:text-indigo-800 font-semibold inline-flex items-center"
          >
            Browse All Genres
            <svg
              className="w-4 h-4 ml-2"
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