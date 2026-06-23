"use client";

import { useState, useEffect } from "react";
import { userdata, userhistory } from "@/app/lib/Action/Userinfo";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { 
  BookOpen, 
  Trash2, 
  Download, 
  Share2, 
  MoreVertical 
} from "lucide-react";

// Mock CRUD operations (replace with actual API calls)
const deleteBook = async (sessionId: string) => {
  // Your delete API call
  return { success: true };
};

const downloadBook = async (productId: string) => {
  // Your download API call
  return { success: true };
};

const shareBook = async (productId: string) => {
  // Your share API call
  return { success: true };
};

export default function PurchasedBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showMenu, setShowMenu] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const user = await userdata();
      const token = await userseissondata();
      const data = await userhistory(token, user.id);
      setBooks(data || []);
      
      // Show welcome toast
      if (data?.length > 0) {
        toast.success(`Welcome back! You have ${data.length} books in your library`);
      }
    } catch (error) {
      toast.error("Failed to load your books. Please try again.");
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (sessionId: string, bookTitle: string) => {
    const loadingToast = toast.loading(`Removing "${bookTitle}"...`);
    
    try {
      await deleteBook(sessionId);
      setBooks(books.filter((book) => book.sessionId !== sessionId));
      toast.success(`"${bookTitle}" removed from your library`, {
        id: loadingToast,
        duration: 3000,
      });
      
      // Optional: Show undo toast
      toast((t) => (
        <div className="flex items-center gap-3">
          <span>Book removed</span>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              // Undo logic here
              toast.success("Book restored!");
            }}
            className="px-3 py-1 bg-[#8b6f5a] text-white rounded-md hover:bg-[#6b5544] transition"
          >
            Undo
          </button>
        </div>
      ), {
        duration: 4000,
      });
    } catch (error) {
      toast.error(`Failed to remove "${bookTitle}"`, {
        id: loadingToast,
      });
    }
  };

  const handleDownload = async (productId: string, bookTitle: string) => {
    toast.loading(`Preparing "${bookTitle}" for download...`);
    
    try {
      await downloadBook(productId);
      toast.success(`"${bookTitle}" downloaded successfully!`, {
        duration: 3000,
      });
    } catch (error) {
      toast.error(`Failed to download "${bookTitle}"`);
    }
  };

  const handleShare = async (productId: string, bookTitle: string) => {
    toast.loading(`Sharing "${bookTitle}"...`);
    
    try {
      await shareBook(productId);
      toast.success(`"${bookTitle}" shared successfully!`, {
        duration: 3000,
      });
    } catch (error) {
      toast.error(`Failed to share "${bookTitle}"`);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  if (loading) {
    return (
      <div className="px-4 sm:px-6 md:px-8 py-8 sm:py-10 min-h-screen bg-gradient-to-b from-[#faf8f6] to-white">
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#1f2430',
              color: '#fff',
              borderRadius: '12px',
              padding: '16px',
            },
            success: {
              iconTheme: {
                primary: '#8b6f5a',
                secondary: '#fff',
              },
            },
          }}
        />
        <div className="max-w-7xl mx-auto">
          {/* Loading Skeleton */}
          <div className="mb-10">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-12 w-64 bg-gray-200 rounded mt-2 animate-pulse" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-[2/3] bg-gray-200 rounded-lg animate-pulse" />
                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 md:px-8 py-8 sm:py-10 min-h-screen bg-gradient-to-b from-[#faf8f6] to-white">
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1f2430',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          },
          success: {
            iconTheme: {
              primary: '#8b6f5a',
              secondary: '#fff',
            },
            duration: 3000,
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
            duration: 4000,
          },
        }}
      />

      <motion.div 
        className="max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div 
          className="mb-8 sm:mb-10"
          variants={itemVariants}
        >
          <motion.p 
            className="text-xs sm:text-sm uppercase tracking-[4px] text-[#8b6f5a] font-medium"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            My Library
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1f2430]">
              Purchased Ebooks
            </h1>
            
            <motion.div 
              className="flex items-center gap-3 text-sm text-[#8b6f5a]"
              whileHover={{ scale: 1.02 }}
            >
              <BookOpen className="w-4 h-4" />
              <span className="font-medium">{books?.length || 0} books</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Books Grid */}
        <AnimatePresence mode="popLayout">
          {books?.length > 0 ? (
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {books.map((book) => (
                <motion.div
                  key={book.sessionId}
                  layout
                  variants={itemVariants}
                  whileHover={{ 
                    y: -8,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  className="group relative"
                >
                  {/* Book Card */}
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
                    <Link
                      href={`/reader/${book.productId}`}
                      className="block"
                    >
                      <div className="relative overflow-hidden bg-[#f5f1ed]">
                        <Image
                          src={book.coverimg}
                          alt={book.booktitle}
                          width={240}
                          height={350}
                          className="w-full aspect-[2/3] object-cover transition duration-500 group-hover:scale-110"
                          priority={false}
                        />
                        
                        {/* Hover Overlay */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-t from-[#1f2430]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={false}
                          whileHover={{ opacity: 1 }}
                        >
                          <div className="absolute bottom-4 left-0 right-0 px-4">
                            <motion.div 
                              className="flex items-center justify-center gap-3"
                              initial={{ y: 20, opacity: 0 }}
                              whileHover={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.1 }}
                            >
                              <span className="px-4 py-2 bg-white/90 text-[#1f2430] rounded-lg text-sm font-medium backdrop-blur-sm">
                                Read Now
                              </span>
                            </motion.div>
                          </div>
                        </motion.div>

                        {/* Action Button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedBook(selectedBook === book.sessionId ? null : book.sessionId);
                          }}
                          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 shadow-lg"
                        >
                          <MoreVertical className="w-4 h-4 text-[#1f2430]" />
                        </button>
                      </div>
                    </Link>

                    {/* Book Info */}
                    <div className="p-4">
                      <h3 className="text-base sm:text-lg font-serif text-[#1f2430] line-clamp-2 mb-1">
                        {book.booktitle}
                      </h3>
                      <p className="text-xs text-[#8b6f5a] line-clamp-1">
                        {book.author || "Unknown Author"}
                      </p>
                    </div>

                    {/* Action Menu */}
                    <AnimatePresence>
                      {selectedBook === book.sessionId && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: -10 }}
                          className="absolute top-16 right-3 bg-white rounded-xl shadow-2xl p-2 min-w-[160px] z-50 border border-gray-100"
                        >
                          <button
                            onClick={() => handleDownload(book.productId, book.booktitle)}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[#1f2430] hover:bg-[#f5f1ed] rounded-lg transition"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                          <button
                            onClick={() => handleShare(book.productId, book.booktitle)}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[#1f2430] hover:bg-[#f5f1ed] rounded-lg transition"
                          >
                            <Share2 className="w-4 h-4" />
                            Share
                          </button>
                          <button
                            onClick={() => handleDelete(book.sessionId, book.booktitle)}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
                          >
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="mt-10 text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="inline-block p-6 bg-[#f5f1ed] rounded-full mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <BookOpen className="w-12 h-12 text-[#8b6f5a]" />
              </motion.div>
              <h3 className="text-2xl font-serif text-[#1f2430] mb-2">
                Your library is empty
              </h3>
              <p className="text-gray-500">
                You have not purchased any books yet. 
                <br className="hidden sm:block" />
                Browse our collection to get started!
              </p>
              <motion.div
                className="mt-6"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/books"
                  className="inline-block px-8 py-3 bg-[#8b6f5a] text-white rounded-lg hover:bg-[#6b5544] transition shadow-lg hover:shadow-xl"
                >
                  Explore Books
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}