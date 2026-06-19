"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, Users, Award } from "lucide-react";

const HeroBanner = () => {
  const stats = [
    { icon: BookOpen, label: "Ebooks Available", value: "10,000+" },
    { icon: Users, label: "Active Readers", value: "50,000+" },
    { icon: Award, label: "Top Writers", value: "500+" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 min-h-[600px] flex items-center">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-300 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Discover & Read
              <br />
              <span className="text-yellow-300">Original Ebooks</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl text-white/90 mb-8 max-w-lg"
            >
              Join thousands of readers and writers on Fable. Explore original
              ebooks, support emerging authors, and dive into captivating stories.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/browse"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-all transform hover:scale-105 shadow-lg"
              >
                Browse Ebooks
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all"
              >
                Start Reading
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="grid grid-cols-3 gap-4 mt-10"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-yellow-300" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Book Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative">
              {/* Floating Book Cards */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute -top-10 -left-20 bg-white p-4 rounded-xl shadow-2xl transform rotate-[-10deg]"
              >
                <div className="w-32 h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg"></div>
                <p className="text-sm font-semibold mt-2 text-center">The Story</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 5, delay: 1 }}
                className="absolute -bottom-10 -right-20 bg-white p-4 rounded-xl shadow-2xl transform rotate-[10deg]"
              >
                <div className="w-32 h-48 bg-gradient-to-br from-pink-400 to-orange-500 rounded-lg"></div>
                <p className="text-sm font-semibold mt-2 text-center">Adventure</p>
              </motion.div>

              <div className="bg-white p-8 rounded-2xl shadow-2xl transform rotate-2">
                <div className="w-48 h-64 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-lg shadow-xl"></div>
                <div className="mt-4 text-center">
                  <p className="font-bold text-gray-800">Featured Book</p>
                  <p className="text-sm text-gray-600">By Jane Doe</p>
                  <div className="flex justify-center items-center mt-2 space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
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