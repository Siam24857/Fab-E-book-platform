"use client";

import { TrendingUp, Star } from "lucide-react";
import { motion } from "framer-motion";
import toast, { Toaster } from 'react-hot-toast';

const writers = [
  {
    name: "Marcus Bell",
    initial: "M",
    sales: 118,
    books: 12,
    rating: 4.8,
  },
  {
    name: "Priya Sharma",
    initial: "P",
    sales: 80,
    books: 8,
    rating: 4.9,
  },
  {
    name: "Eleanor Voss",
    initial: "E",
    sales: 76,
    books: 10,
    rating: 4.7,
  },
];

export default function TopWriters() {
  // Handle writer card click
  const handleWriterClick = (writerName) => {
    toast.success(`Exploring ${writerName}'s profile`);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1,
      },
    },
  };

  const iconVariants = {
    hover: {
      rotate: [0, -10, 10, -5, 5, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="bg-[#f7f5f3] py-12 sm:py-16 md:py-20">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 md:mb-14"
        >
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            viewport={{ once: true }}
            className="uppercase tracking-[3px] sm:tracking-[4px] text-xs sm:text-sm text-[#9b7b63] mb-2 sm:mb-3"
          >
            Most Popular
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111827]"
          >
            Top Writers
          </motion.h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-7"
        >
          {writers.map((writer, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              whileTap="tap"
              initial="initial"
              animate="animate"
              className="cursor-pointer"
              onClick={() => handleWriterClick(writer.name)}
            >
              <motion.div
                variants={cardHoverVariants}
                className="border border-gray-200 sm:border-gray-300 bg-white p-5 sm:p-6 md:p-7 hover:border-indigo-200 transition-colors rounded-lg shadow-sm hover:shadow-xl"
              >
                {/* Top */}
                <div className="flex items-center gap-4 sm:gap-5">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center text-xl sm:text-2xl font-semibold shadow-md"
                  >
                    {writer.initial}
                  </motion.div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-black truncate">
                      {writer.name}
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg text-[#8b6d56] truncate">
                      Published Author
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="border-t border-gray-200 sm:border-gray-300 my-5 sm:my-6 md:my-7"
                />

                {/* Footer */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 text-[#6b7280]">
                  <motion.div 
                    variants={iconVariants}
                    className="flex items-center gap-1.5 sm:gap-2 bg-indigo-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full"
                  >
                    <TrendingUp size={16} className="sm:w-[18px] sm:h-[18px] text-indigo-600" />
                    <span className="text-sm sm:text-base font-medium text-indigo-700">
                      {writer.sales} sales
                    </span>
                  </motion.div>

                  <motion.div 
                    variants={iconVariants}
                    className="flex items-center gap-1.5 sm:gap-2 bg-yellow-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full"
                  >
                    <Star size={16} className="sm:w-[18px] sm:h-[18px] text-yellow-500" />
                    <span className="text-sm sm:text-base font-medium text-yellow-700">
                      {writer.rating} ★
                    </span>
                  </motion.div>
                </div>

                {/* Additional Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                  className="mt-4 sm:mt-5 flex items-center justify-between text-xs sm:text-sm text-gray-500"
                >
                  <span>{writer.books} books published</span>
                  <span className="text-indigo-600 font-medium">View Profile →</span>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Writers Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-10 sm:mt-12 md:mt-14"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toast.success('Loading all writers...')}
            className="px-6 sm:px-8 py-2.5 sm:py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors text-sm sm:text-base shadow-md hover:shadow-lg"
          >
            View All Writers
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}