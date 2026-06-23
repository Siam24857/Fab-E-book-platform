// ./src/app/Dashboard/writer/WriterClient.jsx
"use client";

import Link from "next/link";
import {
  BookOpen,
  Eye,
  TrendingUp,
  PlusCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

const WriterClient = ({ user, books, salesHistory }) => {
  const totalBooks = books?.length || 0;
  const publishedBooks =
    books?.filter((book) => book.status === "Available").length ||
    books?.length ||
    0;
  const totalSales = salesHistory?.length || 0;
  const revenue =
    salesHistory?.reduce((total, sale) => total + Number(sale.price || 0), 0) ||
    0;

  const stats = [
    {
      title: "Total Ebooks",
      value: totalBooks || 0,
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Published",
      value: publishedBooks || 0,
      icon: Eye,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Total Sales",
      value: totalSales || 0,
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Revenue",
      value: `$${revenue.toFixed(2)}`,
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#4ade80",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />

      <motion.div
        className="min-h-screen bg-[#f8f6f4] p-4 sm:p-6 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <motion.div
          className="mb-6 sm:mb-8 md:mb-10"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="uppercase tracking-[4px] text-xs sm:text-sm text-gray-500">
            Writer Dashboard
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mt-1 sm:mt-2">
            Welcome, {user?.name || "Writer"}!
          </h1>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8 md:mb-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  transition: { duration: 0.2 },
                }}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 flex items-center gap-3 sm:gap-4"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`w-12 h-12 sm:w-14 sm:h-14 border bg-gradient-to-br ${item.color} text-white flex items-center justify-center rounded-lg flex-shrink-0`}
                >
                  <Icon size={24} className="sm:w-7 sm:h-7" />
                </motion.div>

                <div className="min-w-0 flex-1">
                  <p className="text-gray-600 text-xs sm:text-sm truncate">
                    {item.title}
                  </p>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold truncate">
                    {item.value}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-wrap gap-3 sm:gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/writer/add-ebook"
              className="bg-black text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex items-center gap-2 sm:gap-3 text-sm sm:text-base w-full sm:w-auto justify-center"
            >
              <PlusCircle size={18} className="sm:w-5 sm:h-5" />
              Add Ebook
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/writer/manage-ebooks"
              className="border bg-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base w-full sm:w-auto text-center"
            >
              Manage Ebooks
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/writer/sales"
              className="border bg-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base w-full sm:w-auto text-center"
            >
              View Sales
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default WriterClient;