"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Award, BookOpen, TrendingUp } from "lucide-react";

const TopWriters = () => {
  const writers = [
    {
      id: "1",
      name: "Sarah Johnson",
      avatar: "/api/placeholder/100/100",
      genre: "Mystery & Thriller",
      sales: 320,
      rating: 4.9,
      books: 5,
      verified: true,
    },
    {
      id: "2",
      name: "Michael Chen",
      avatar: "/api/placeholder/100/100",
      genre: "Science Fiction",
      sales: 285,
      rating: 4.8,
      books: 7,
      verified: true,
    },
    {
      id: "3",
      name: "Emma Thompson",
      avatar: "/api/placeholder/100/100",
      genre: "Romance & Drama",
      sales: 250,
      rating: 4.7,
      books: 4,
      verified: true,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full mb-4">
            <Award className="w-5 h-5" />
            <span className="font-semibold">Top Writers</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Meet Our Bestselling Authors
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These talented writers have captivated readers with their exceptional
            storytelling and unique voices.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {writers.map((writer, index) => (
            <motion.div
              key={writer.id}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-gradient-to-b from-gray-50 to-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-all border border-gray-100"
            >
              <div className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 mx-auto flex items-center justify-center text-white text-3xl font-bold">
                    {writer.name.charAt(0)}
                  </div>
                  {writer.verified && (
                    <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1 border-2 border-white">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {writer.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{writer.genre}</p>

                <div className="flex justify-center items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${
                        i < Math.floor(writer.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-sm font-semibold ml-1">
                    {writer.rating}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-center space-x-1 text-gray-600">
                      <BookOpen className="w-4 h-4" />
                      <span className="text-sm">{writer.books} Books</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-center space-x-1 text-gray-600">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm">{writer.sales} Sales</span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/writers/${writer.id}`}
                  className="inline-flex items-center justify-center w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                >
                  View Profile
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TopWriters;