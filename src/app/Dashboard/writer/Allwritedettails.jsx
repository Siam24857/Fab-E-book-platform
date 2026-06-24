// ./src/app/Dashboard/writer/Allwritedettails.jsx
"use client";

import Link from "next/link";
import { BookOpen, Eye, TrendingUp, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

const WriterClient = ({ user, books, salesHistory }) => {
  const normalizedBooks = Array.isArray(books)
    ? books
    : Array.isArray(books?.books)
      ? books.books
      : [];

  const normalizedSalesHistory = Array.isArray(salesHistory)
    ? salesHistory
    : Array.isArray(salesHistory?.sales)
      ? salesHistory.sales
      : [];

  const totalBooks = normalizedBooks.length;
  const publishedBooks = normalizedBooks.filter((book) => book?.status === "Available").length || totalBooks;
  const totalSales = normalizedSalesHistory.length;
  const revenue = normalizedSalesHistory.reduce((total, sale) => total + Number(sale?.price || 0), 0);

  const stats = [
    { title: "Total Ebooks", value: totalBooks, icon: BookOpen, color: "from-blue-500 to-blue-600" },
    { title: "Published", value: publishedBooks, icon: Eye, color: "from-green-500 to-green-600" },
    { title: "Total Sales", value: totalSales, icon: TrendingUp, color: "from-purple-500 to-purple-600" },
    { title: "Revenue", value: `$${revenue.toFixed(2)}`, icon: TrendingUp, color: "from-orange-500 to-orange-600" },
  ];

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
        <div className="mb-6 sm:mb-8 md:mb-10">
          <p className="uppercase tracking-[4px] text-xs sm:text-sm text-gray-500">
            Writer Dashboard
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mt-1 sm:mt-2">
            Welcome, {user?.name || "Writer"}!
          </h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8 md:mb-10">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 flex items-center gap-3 sm:gap-4 hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${item.color} text-white flex items-center justify-center rounded-lg flex-shrink-0`}>
                  <Icon size={24} className="sm:w-7 sm:h-7" />
                </div>
                <div>
                  <p className="text-gray-600 text-xs sm:text-sm">{item.title}</p>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold">{item.value}</h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <Link
            href="/Dashboard/writer/Createbook"
            className="bg-black text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex items-center gap-2 sm:gap-3 text-sm sm:text-base w-full sm:w-auto justify-center hover:bg-gray-800 transition"
          >
            <PlusCircle size={18} className="sm:w-5 sm:h-5" />
            Add Ebook
          </Link>
          <Link
            href="/Dashboard/writer/my-book"
            className="border bg-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base w-full sm:w-auto text-center hover:bg-gray-50 transition"
          >
            Manage Ebooks
          </Link>
          <Link
            href="/Dashboard/writer/sales-history"
            className="border bg-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base w-full sm:w-auto text-center hover:bg-gray-50 transition"
          >
            View Sales
          </Link>
        </div>
      </motion.div>
    </>
  );
};

export default WriterClient;