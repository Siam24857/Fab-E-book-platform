"use client"

import React, { useState } from "react";
import { Eye, EyeOff, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Bookuipdate } from "@/app/Action/Adminacitons";
import { BookDelete } from "@/app/Action/Deletebook";

const AllEbooks = ({ token, allbookdatas }) => {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState(null);
  const [books, setBooks] = useState(Array.isArray(allbookdatas) ? allbookdatas : []);

  // Function to update book status (Publish/Draft)
  const handleUpdateStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Published" ? "Draft" : "Published";
    
    if (!confirm(`Are you sure you want to change status to "${newStatus}"?`)) {
      return;
    }

    setLoadingId(id);
    
    try {
      const bookupdate = await Bookuipdate(token, id, newStatus);

      if (bookupdate?.success || bookupdate?.status === 200) {
        // Update local state immediately
        setBooks(prevBooks => 
          prevBooks.map(book => 
            book._id === id 
              ? { ...book, status: newStatus }
              : book
          )
        );
        
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
        
        // Refresh the page to get fresh data from server
        router.push("/Dashboard/admin/manegeEbooks");
      } else {
        toast.error(bookupdate?.message || "Failed to update book status", {
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
      toast.error(error?.message || "Failed to update book status. Please try again.", {
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

      if (data?.success || data?.deletedCount > 0 || data?.status === 200) {
        // Update local state immediately
        setBooks(prevBooks => prevBooks.filter(book => book._id !== id));
        
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
        
        // Refresh the page to get fresh data from server
        router.push("/Dashboard/admin/manegeEbooks");
      } else {
        toast.error(data?.message || "Failed to delete book", {
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
      toast.error(error?.message || "Failed to delete book. Please try again.", {
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

  // Get safe book data with fallbacks
  const getSafeBookData = (book) => ({
    id: book?._id || book?.id || '',
    title: book?.title || 'Untitled',
    writer: book?.writer || book?.author || 'Unknown Author',
    cover: book?.cover || '/placeholder-book-cover.jpg',
    price: typeof book?.price === 'number' ? book.price : 0,
    genre: book?.genre || 'Uncategorized',
    status: book?.status || 'Draft'
  });

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

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1b1430]">
            All Ebooks
          </h1>
          <p className="text-sm text-gray-500">
            Total: <span className="font-semibold text-gray-700">{books.length}</span> books
          </p>
        </div>
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
                {books.length > 0 ? (
                  books.map((book, index) => {
                    const safeBook = getSafeBookData(book);
                    const isLoading = loadingId === safeBook.id;
                    
                    return (
                      <motion.tr
                        key={safeBook.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="border-b hover:bg-gray-50 transition"
                      >
                        {/* Cover */}
                        <td className="px-3 sm:px-5 py-3 sm:py-4">
                          <img
                            src={safeBook.cover}
                            alt={safeBook.title}
                            className="w-10 h-14 sm:w-12 sm:h-16 object-cover border rounded"
                            onError={(e) => {
                              e.target.src = '/placeholder-book-cover.jpg';
                            }}
                          />
                        </td>

                        {/* Title */}
                        <td className="px-3 sm:px-5 py-3 sm:py-4 font-semibold text-base sm:text-lg">
                          <span className="line-clamp-1">{safeBook.title}</span>
                        </td>

                        {/* Writer */}
                        <td className="px-3 sm:px-5 py-3 sm:py-4 text-gray-600 text-sm sm:text-base">
                          {safeBook.writer}
                        </td>

                        {/* Price */}
                        <td className="px-3 sm:px-5 py-3 sm:py-4 font-bold text-sm sm:text-base">
                          ${safeBook.price.toFixed(2)}
                        </td>

                        {/* Genre */}
                        <td className="px-3 sm:px-5 py-3 sm:py-4">
                          <span className="px-2 sm:px-3 py-1 bg-gray-100 rounded text-xs sm:text-sm">
                            {safeBook.genre}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-3 sm:px-5 py-3 sm:py-4">
                          <span
                            className={`px-2 sm:px-4 py-1 rounded font-medium text-xs sm:text-sm ${
                              safeBook.status === "Published"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {safeBook.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-3 sm:px-5 py-3 sm:py-4">
                          <div className="flex items-center gap-2 sm:gap-4">
                            {/* Status Toggle Button */}
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleUpdateStatus(safeBook.id, safeBook.status)}
                              disabled={isLoading}
                              className="disabled:opacity-50 disabled:cursor-not-allowed p-1"
                              title={safeBook.status === "Published" ? "Unpublish" : "Publish"}
                            >
                              {safeBook.status === "Published" ? (
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
                              onClick={() => handleDeleteBook(safeBook.id)}
                              disabled={isLoading}
                              className="disabled:opacity-50 disabled:cursor-not-allowed p-1"
                              title="Delete book"
                            >
                              <Trash2
                                size={18}
                                className="text-red-500 hover:text-red-700 transition-colors"
                              />
                            </motion.button>

                            {/* Loading indicator */}
                            {isLoading && (
                              <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-xs text-gray-400"
                              >
                                <span className="inline-block animate-spin mr-1">⟳</span>
                                Processing...
                              </motion.span>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })
                ) : (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <td
                      colSpan={7}
                      className="text-center py-16 text-gray-500"
                    >
                      <div className="text-6xl mb-4">📚</div>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        No Books Found
                      </h3>
                      <p className="text-gray-400">
                        {allbookdatas === null || allbookdatas === undefined
                          ? "Unable to load books. Please try again."
                          : "There are no books in the system yet."}
                      </p>
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AllEbooks;