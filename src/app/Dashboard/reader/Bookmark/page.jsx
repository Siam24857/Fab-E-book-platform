"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, Trash2 } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function BookmarkPage() {
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBookmarks();
    }, []);

    const loadBookmarks = () => {
        try {
            const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
            setBookmarks(savedBookmarks);
            setLoading(false);
        } catch (error) {
            console.error('Error loading bookmarks:', error);
            setLoading(false);
            toast.error('Failed to load bookmarks');
        }
    };

    const removeBookmark = (bookId, bookTitle) => {
        try {
            const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
            const updatedBookmarks = savedBookmarks.filter(b => b.bookId !== bookId);
            localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
            setBookmarks(updatedBookmarks);
            toast.success(`"${bookTitle}" removed from bookmarks`);
        } catch (error) {
            console.error('Error removing bookmark:', error);
            toast.error('Failed to remove bookmark');
        }
    };

    // Animation variants
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
        hidden: { 
            opacity: 0,
            y: 20,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 24
            }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            transition: {
                duration: 0.3
            }
        }
    };

    const buttonVariants = {
        hover: {
            scale: 1.02,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        },
        tap: {
            scale: 0.95
        }
    };

    const cardVariants = {
        hover: {
            y: -8,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        }
    };

    const titleVariants = {
        hidden: { 
            opacity: 0,
            x: -50
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        }
    };

    if (loading) {
        return (
            <motion.div 
                className="min-h-screen flex items-center justify-center bg-stone-100 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div 
                    className="text-xl text-stone-600"
                    animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    Loading bookmarks...
                </motion.div>
            </motion.div>
        );
    }

    return (
        <motion.div 
            className="min-h-screen bg-stone-100 py-8 sm:py-12 px-4 sm:px-6 lg:px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
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
                className="max-w-7xl mx-auto"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.h1 
                    className="text-3xl sm:text-4xl font-bold text-stone-900 mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3"
                    variants={titleVariants}
                >
                    <motion.div
                        animate={{ 
                            rotate: [0, -10, 10, -5, 5, 0],
                        }}
                        transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3
                        }}
                    >
                        <Bookmark className="w-6 h-6 sm:w-8 sm:h-8" />
                    </motion.div>
                    My Bookmarks
                    <motion.span 
                        className="text-base sm:text-lg font-normal text-stone-500 ml-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                            type: "spring",
                            stiffness: 500,
                            damping: 15,
                            delay: 0.3
                        }}
                    >
                        ({bookmarks.length})
                    </motion.span>
                </motion.h1>

                {bookmarks.length === 0 ? (
                    <motion.div 
                        className="bg-white rounded-2xl p-8 sm:p-12 text-center shadow-sm"
                        initial={{ 
                            opacity: 0,
                            y: 20,
                            scale: 0.9
                        }}
                        animate={{ 
                            opacity: 1,
                            y: 0,
                            scale: 1
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20
                        }}
                    >
                        <motion.div
                            animate={{ 
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{ 
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <Bookmark className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-stone-300 mb-4" />
                        </motion.div>
                        <motion.h2 
                            className="text-xl sm:text-2xl font-semibold text-stone-600 mb-2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            No Bookmarks Yet
                        </motion.h2>
                        <motion.p 
                            className="text-stone-500 text-sm sm:text-base"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            Start bookmarking your favorite books!
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link 
                                href="/browsersbooks"
                                className="inline-block mt-4 bg-red-700 text-white px-5 sm:px-6 py-2 rounded-lg hover:bg-red-800 transition text-sm sm:text-base"
                            >
                                Browse Books
                            </Link>
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <AnimatePresence>
                            {bookmarks.map((bookmark) => (
                                <motion.div 
                                    key={bookmark._id} 
                                    className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col"
                                    variants={itemVariants}
                                    whileHover="hover"
                                    layout
                                    exit="exit"
                                >
                                    <Link href={`/bookdeattailspage/${bookmark.bookId}`} className="flex-1">
                                        <motion.div 
                                            className="relative overflow-hidden"
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <img 
                                                src={bookmark.image} 
                                                alt={bookmark.title}
                                                className="w-full h-48 sm:h-56 object-cover"
                                                loading="lazy"
                                            />
                                            <motion.div 
                                                className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ 
                                                    type: "spring",
                                                    stiffness: 500,
                                                    damping: 15,
                                                    delay: 0.2 
                                                }}
                                            >
                                                ${bookmark.price}
                                            </motion.div>
                                        </motion.div>
                                        <motion.div 
                                            className="p-3 sm:p-4"
                                            whileHover={{ x: 5 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <h3 className="font-semibold text-stone-800 truncate text-sm sm:text-base">
                                                {bookmark.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-stone-500 mt-1">
                                                Bookmarked: {new Date(bookmark.bookmarkedAt).toLocaleDateString()}
                                            </p>
                                        </motion.div>
                                    </Link>
                                    <motion.div 
                                        className="px-3 sm:px-4 pb-3 sm:pb-4"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <motion.button
                                            onClick={() => removeBookmark(bookmark.bookId, bookmark.title)}
                                            className="w-full flex items-center justify-center gap-2 border border-red-300 text-red-600 py-2 rounded-lg hover:bg-red-50 transition text-sm sm:text-base"
                                            variants={buttonVariants}
                                            whileHover="hover"
                                            whileTap="tap"
                                        >
                                            <motion.div
                                                whileHover={{ rotate: 90 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </motion.div>
                                            Remove Bookmark
                                        </motion.button>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
}