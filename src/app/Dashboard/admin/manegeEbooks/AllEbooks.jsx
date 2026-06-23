"use client"

import React, { useState } from "react";
import { Eye, EyeOff, Trash2 } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Bookuipdate } from "@/app/lib/Action/Adminacitons";
import { BookDelete } from "@/app/lib/Action/Deletebook";

const AllEbooks = ({ token, allbookdatas }) => {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState(null);

  // Function to update book status (Publish/Draft)
  const handleUpdateStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Published" ? "Draft" : "Published";
    
    if (!confirm(`Are you sure you want to change status to "${newStatus}"?`)) {
      return;
    }

    setLoadingId(id);
    
    try {
      const bookupdate = await Bookuipdate(token, id, newStatus);

      if (bookupdate) {
        toast.success(`Book status updated to "${newStatus}" successfully!`, {
          duration: 3000,
          position: 'top-right',
          style: {
            background: '#10B981',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
          },
          icon: '✅',
        });
        redirect("/Dashboard/admin/manegeEbooks");
      } else {
        toast.error(bookupdate.message || "Failed to update book status", {
          duration: 4000,
          position: 'top-right',
          style: {
            background: '#EF4444',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
          },
          icon: '❌',
        });
      }
    } catch (error) {
      console.error("Error updating book status:", error);
      toast.error("Failed to update book status. Please try again.", {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#EF4444',
          color: '#fff',
          padding: '16px',
          borderRadius: '8px',
        },
      });
    } finally {
      setLoadingId(null);
    }
  };

  // Function to delete book
  const handleDeleteBook = async (id) => {
    if (!confirm("Are you sure you want to delete this book? This action cannot be undone!")) {
      return;
    }

    setLoadingId(id);
    
    try {
      const data = await BookDelete(token, id);

      if (data) {
        toast.success("Book deleted successfully!", {
          duration: 3000,
          position: 'top-right',
          style: {
            background: '#10B981',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
          },
          icon: '🗑️',
        });
        redirect("/Dashboard/admin/manegeEbooks");
      } else {
        toast.error(data.message || "Failed to delete book", {
          duration: 4000,
          position: 'top-right',
          style: {
            background: '#EF4444',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
          },
          icon: '❌',
        });
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Failed to delete book. Please try again.", {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#EF4444',
          color: '#fff',
          padding: '16px',
          borderRadius: '8px',
        },
      });
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 sm:p-6 md:p-8 bg-[#f8f6f3] min-h-screen"
    >
      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-6 md:mb-8"
      >
        <p className="uppercase tracking-[4px] text-xs sm:text-sm text-gray-500">
          Administration
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1b1430] mt-2">
          All Ebooks
        </h1>
      </motion.div>

      {/* Table Container - Responsive */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white border rounded-xl overflow-hidden shadow-sm"
      >
        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[768px] md:min-w-full">
            <thead className="bg-[#f4f1ed] border-b">
              <tr className="text-left text-xs sm:text-sm uppercase tracking-wider text-gray-600">
                <th className="px-3 sm:px-5 py-3 sm:py-4">Cover</th>
                <th className="px-3 sm:px-5 py-3 sm:py-4">Title</th>
                <th className="px-3 sm:px-5 py-3 sm:py-4">Writer</th>
                <th className="px-3 sm:px-5 py-3 sm:py-4">Price</th>
                <th className="px-3 sm:px-5 py-3 sm:py-4">Genre</th>
                <th className="px-3 sm:px-5 py-3 sm:py-4">Status</th>
                <th className="px-3 sm:px-5 py-3 sm:py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              <AnimatePresence mode="wait">
                {allbookdatas?.map((book, index) => (
                  <motion.tr
                    key={book._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    {/* Cover */}
                    <td className="px-3 sm:px-5 py-3 sm:py-4">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-10 h-14 sm:w-12 sm:h-16 object-cover border rounded"
                      />
                    </td>

                    {/* Title */}
                    <td className="px-3 sm:px-5 py-3 sm:py-4 font-semibold text-base sm:text-lg">
                      <span className="line-clamp-1">{book.title}</span>
                    </td>

                    {/* Writer */}
                    <td className="px-3 sm:px-5 py-3 sm:py-4 text-gray-600 text-sm sm:text-base">
                      {book.writer}
                    </td>

                    {/* Price */}
                    <td className="px-3 sm:px-5 py-3 sm:py-4 font-bold text-sm sm:text-base">
                      ${book.price}
                    </td>

                    {/* Genre */}
                    <td className="px-3 sm:px-5 py-3 sm:py-4">
                      <span className="px-2 sm:px-3 py-1 bg-gray-100 rounded text-xs sm:text-sm">
                        {book.genre}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-3 sm:px-5 py-3 sm:py-4">
                      <span
                        className={`px-2 sm:px-4 py-1 rounded font-medium text-xs sm:text-sm ${
                          book.status === "Published"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {book.status || "Draft"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-3 sm:px-5 py-3 sm:py-4">
                      <div className="flex items-center gap-2 sm:gap-4">
                        {/* Status Toggle Button */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleUpdateStatus(book._id, book.status)}
                          disabled={loadingId === book._id}
                          className="disabled:opacity-50 disabled:cursor-not-allowed p-1"
                        >
                          {book.status === "Published" ? (
                            <EyeOff
                              size={18}
                              className="text-gray-600 hover:text-black transition-colors"
                            />
                          ) : (
                            <Eye
                              size={18}
                              className="text-gray-600 hover:text-black transition-colors"
                            />
                          )}
                        </motion.button>

                        {/* Delete Button */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteBook(book._id)}
                          disabled={loadingId === book._id}
                          className="disabled:opacity-50 disabled:cursor-not-allowed p-1"
                        >
                          <Trash2
                            size={18}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          />
                        </motion.button>

                        {/* Loading indicator */}
                        {loadingId === book._id && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs text-gray-400"
                          >
                            Processing...
                          </motion.span>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>

              {allbookdatas?.length === 0 && (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <td
                    colSpan={7}
                    className="text-center py-10 text-gray-500"
                  >
                    No Books Found
                  </td>
                </motion.tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AllEbooks;