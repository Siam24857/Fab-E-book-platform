"use client";

import Link from "next/link";
import Image from "next/image";
import { PenLine, Eye, Trash2, PlusCircle } from "lucide-react";
import { BookDelete } from "@/app/Action/Deletebook";
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';

const Mybooks = ({ token, writerbook = [] }) => {
  // ✅ Fixed: Extract data from wrapped response
  const extractBooksData = (data) => {
    // If it's already an array, return it
    if (Array.isArray(data)) {
      return data;
    }
    // If it's the wrapped response object with data property
    if (data && typeof data === 'object') {
      // Check for success/data structure
      if (data.success && Array.isArray(data.data)) {
        return data.data;
      }
      // Check for just data property
      if (data.data && Array.isArray(data.data)) {
        return data.data;
      }
      // Check if the object itself is the data array wrapped in an object with numeric keys
      const values = Object.values(data);
      if (values.length > 0 && Array.isArray(values[0])) {
        return values[0];
      }
    }
    return [];
  };

  // ✅ Fixed: Ensure writerbook is always an array
  const books = extractBooksData(writerbook);
  
  console.log("writerbook =", books);
  console.log("isArray =", Array.isArray(books));

  const handleDelete = async (id) => {
    const toastId = toast.loading('Deleting book...');
    try {
      const result = await BookDelete(token, id);

      if (result.success) {
        toast.success('Book deleted successfully', { id: toastId });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error('Failed to delete book', { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred while deleting', { id: toastId });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <motion.div 
        className="min-h-screen bg-[#f8f6f4] p-4 sm:p-6 md:p-8 lg:p-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <motion.div 
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 md:mb-10 gap-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <p className="uppercase tracking-[4px] text-xs sm:text-sm text-gray-500">
              Writer
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mt-1 sm:mt-2">
              My Ebooks
            </h1>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/Dashboard/writer/Createbook"
              className="bg-black text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex items-center gap-2 sm:gap-3 text-sm sm:text-base w-full sm:w-auto justify-center"
            >
              <PlusCircle size={18} className="sm:w-5 sm:h-5" />
              Add Ebook
            </Link>
          </motion.div>
        </motion.div>

        {/* Table - Mobile/Tablet/Desktop Responsive */}
        <motion.div 
          className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl border shadow-sm overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Desktop/Tablet Header - Hidden on mobile */}
          <div className="hidden md:grid grid-cols-6 gap-4 px-4 sm:px-6 py-4 sm:py-5 bg-[#f3f0ec] border-b font-semibold text-gray-600 uppercase text-xs sm:text-sm">
            <div>Cover</div>
            <div>Title</div>
            <div>Price</div>
            <div>Genre</div>
            <div>Status</div>
            <div>Actions</div>
          </div>

          {/* ✅ Check if books array has items */}
          {books?.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {books.map((book, index) => {
                // ✅ Safe key generation
                const bookId = book?._id || `book-${index}`;
                
                return (
                  <motion.div
                    key={bookId}
                    variants={itemVariants}
                    whileHover={{ 
                      backgroundColor: "#fafafa",
                      transition: { duration: 0.2 }
                    }}
                    className="block md:grid md:grid-cols-6 md:gap-4 px-4 sm:px-6 py-4 sm:py-5 border-b hover:bg-gray-50 transition-colors"
                  >
                    {/* Mobile View */}
                    <div className="md:hidden space-y-3">
                      <div className="flex items-start gap-4">
                        <Image
                          src={book?.cover || "/default-cover.jpg"}
                          alt={book?.title || "Book cover"}
                          width={60}
                          height={80}
                          className="object-cover border w-[60px] h-[80px] rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base truncate">
                            {book?.title || "Untitled"}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className="font-bold text-sm">
                              ${book?.price?.toFixed?.(2) || book?.price || "0.00"}
                            </span>
                            <span className="bg-gray-100 px-3 py-1 font-medium text-xs rounded">
                              {book?.genre || "N/A"}
                            </span>
                          </div>
                          <div className="mt-2">
                            <span
                              className={`px-3 py-1 text-xs font-medium rounded inline-block ${
                                book?.status === "Available"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {book?.status || "Unknown"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 pl-[76px]">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Link
                            href={`/writer/Edit/${book?._id || '#'}`}
                            className="text-gray-700 hover:text-black"
                          >
                            <PenLine size={18} />
                          </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Link
                            href={`/bookdeattailspage/${book?._id || '#'}`}
                            className="text-gray-700 hover:text-black"
                          >
                            <Eye size={18} />
                          </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <button
                            onClick={() => handleDelete(book?._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={18} />
                          </button>
                        </motion.div>
                      </div>
                    </div>

                    {/* Desktop/Tablet View */}
                    <div className="hidden md:contents">
                      <div>
                        <Image
                          src={book?.cover || "/default-cover.jpg"}
                          alt={book?.title || "Book cover"}
                          width={60}
                          height={80}
                          className="object-cover border w-[60px] h-[80px]"
                        />
                      </div>
                      <div className="font-semibold text-base lg:text-lg truncate">
                        {book?.title || "Untitled"}
                      </div>
                      <div className="font-semibold">
                        ${book?.price?.toFixed?.(2) || book?.price || "0.00"}
                      </div>
                      <div>
                        <span className="bg-gray-100 px-3 sm:px-4 py-1 sm:py-2 font-medium text-xs sm:text-sm rounded">
                          {book?.genre || "N/A"}
                        </span>
                      </div>
                      <div>
                        <span
                          className={`px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium rounded ${
                            book?.status === "Available"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {book?.status || "Unknown"}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-5">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Link
                            href={`/writer/Edit/${book?._id || '#'}`}
                            className="text-gray-700 hover:text-black"
                          >
                            <PenLine size={18} className="sm:w-5 sm:h-5" />
                          </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Link
                            href={`/bookdeattailspage/${book?._id || '#'}`}
                            className="text-gray-700 hover:text-black"
                          >
                            <Eye size={18} className="sm:w-5 sm:h-5" />
                          </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <button
                            onClick={() => handleDelete(book?._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={18} className="sm:w-5 sm:h-5" />
                          </button>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div 
              className="p-8 sm:p-10 text-center text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-6xl mb-4">📚</div>
              <p className="text-lg font-medium text-gray-700">No ebooks found</p>
              <p className="text-sm text-gray-500 mt-2">Start creating your first ebook today!</p>
              <div className="mt-6">
                <Link
                  href="/Dashboard/writer/Createbook"
                  className="inline-block bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  Create Your First Ebook
                </Link>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </>
  );
};

export default Mybooks;