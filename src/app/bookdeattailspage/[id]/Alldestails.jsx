"use client";

import { Bookmarkbooks } from "@/app/lib/Action/Bookmarkfuctionalyti";
import { Calendar, Tag, User, Bookmark, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

export default function BookDetailsPage({ book, paymented, userId }) {
    // State for bookmark
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [bookmarkId, setBookmarkId] = useState(null);

    // Load bookmark status from localStorage on mount
    useEffect(() => {
        const checkBookmarkStatus = () => {
            // Check localStorage for bookmarks
            const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
            const isBookmarkedInStorage = savedBookmarks.some(b => b.bookId === book._id);
            
            if (isBookmarkedInStorage) {
                setIsBookmarked(true);
                // Find the bookmark to get its ID
                const bookmark = savedBookmarks.find(b => b.bookId === book._id);
                if (bookmark) {
                    setBookmarkId(bookmark._id || 'local');
                }
            } else {
                setIsBookmarked(false);
                setBookmarkId(null);
            }
        };

        checkBookmarkStatus();
    }, [book._id]);

    // Save to localStorage function
    const saveBookmarkToLocalStorage = (bookData) => {
        try {
            const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
            
            // Check if already exists
            const exists = savedBookmarks.some(b => b.bookId === bookData.bookId);
            
            if (!exists) {
                // Add new bookmark
                const newBookmark = {
                    _id: Date.now().toString(), // Temporary ID
                    bookId: bookData.bookId,
                    userId: bookData.userId,
                    title: bookData.title,
                    image: bookData.image,
                    price: bookData.price,
                    bookmarkedAt: new Date().toISOString()
                };
                savedBookmarks.push(newBookmark);
                localStorage.setItem('bookmarks', JSON.stringify(savedBookmarks));
                return newBookmark;
            }
            return null;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return null;
        }
    };

    // Remove from localStorage function
    const removeBookmarkFromLocalStorage = (bookId) => {
        try {
            const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
            const updatedBookmarks = savedBookmarks.filter(b => b.bookId !== bookId);
            localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    };

    // Toggle bookmark function
    const toggleBookmark = async () => {
        if (!userId) {
            toast.error('Please login to bookmark books');
            return;
        }

        setLoading(true);

        try {
            if (isBookmarked) {
                // Remove bookmark from localStorage
                const removed = removeBookmarkFromLocalStorage(book._id);
                
                if (removed) {
                    setIsBookmarked(false);
                    setBookmarkId(null);
                    toast.success('Bookmark removed successfully');
                } else {
                    toast.error('Failed to remove bookmark');
                }
            } else {
                // Add bookmark to localStorage first
                const bookmarkData = {
                    userId: userId,
                    bookId: book._id,
                    title: book.title,
                    image: book.cover,
                    price: book.price,
                    bookmarkedAt: new Date().toISOString()
                };

                // Save to localStorage
                const localBookmark = saveBookmarkToLocalStorage(bookmarkData);
                
                if (localBookmark) {
                    setIsBookmarked(true);
                    setBookmarkId(localBookmark._id);
                    toast.success('Bookmark added successfully');
                    
                    // Also try to save to database (optional)
                    try {
                        const dbResult = await Bookmarkbooks(bookmarkData);
                        console.log('Database save result:', dbResult);
                    } catch (dbError) {
                        console.warn('Failed to save to database, but localStorage saved:', dbError);
                    }
                } else {
                    toast.error('Failed to bookmark. Please try again.');
                }
            }
        } catch (error) {
            console.error('Error toggling bookmark:', error);
            toast.error('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-stone-100">
            {/* Toaster Component */}
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
                    error: {
                        duration: 4000,
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: '#fff',
                        },
                    },
                }}
            />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="grid gap-8 md:gap-12 lg:grid-cols-[320px_1fr]">
                    {/* Cover - Responsive */}
                    <div className="max-w-[280px] sm:max-w-[320px] mx-auto lg:mx-0 w-full">
                        <img
                            src={book.cover}
                            alt={book.title}
                            className="w-full rounded-sm object-cover shadow-sm"
                        />
                    </div>

                    {/* Details - Responsive */}
                    <div>
                        <span className="inline-block bg-stone-200 px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium">
                            {book.genre}
                        </span>

                        <h1 className="mt-4 sm:mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 leading-tight">
                            {book.title}
                        </h1>

                        <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 text-sm sm:text-base text-stone-600">
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <User size={16} className="sm:w-[18px] sm:h-[18px]" />
                                <span>{book.author}</span>
                            </div>

                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <Calendar size={16} className="sm:w-[18px] sm:h-[18px]" />
                                <span>{book.publishedAt}</span>
                            </div>

                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <Tag size={16} className="sm:w-[18px] sm:h-[18px]" />
                                <span>{book.status}</span>
                            </div>
                        </div>

                        <hr className="my-6 sm:my-8 border-stone-300" />

                        <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl font-semibold">
                            Description
                        </h2>

                        <p className="max-w-4xl text-base sm:text-lg leading-7 sm:leading-9 text-stone-700">
                            {book.description}
                        </p>

                        {/* Actions - Responsive */}
                        <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-5">
                            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900">
                                ${book.price}
                            </span>

                            {paymented === book._id ? (
                                <button className="bg-red-700 px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white transition hover:bg-red-800 w-full sm:w-auto">
                                    Already Available for you 
                                </button>
                            ) : (
                                <form action="/api/checkout_sessions" method="POST" className="w-full sm:w-auto">
                                    <input type="hidden" name="price" defaultValue={book.price} />
                                    <input type="hidden" name="productid" defaultValue={book._id} />
                                    <input type="hidden" name="image" defaultValue={book.cover} />
                                    <input type="hidden" name="title" defaultValue={book.title} />
                                    <input type="hidden" name="writerid" defaultValue={book?.writerId} />
                                    <section>
                                        <button 
                                            type="submit" 
                                            role="link" 
                                            className="bg-red-700 px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white transition hover:bg-red-800 w-full sm:w-auto"
                                        >
                                            Buy Now
                                        </button>
                                    </section>
                                </form>
                            )}

                            {/* Bookmark Toggle Button */}
                            <button
                                onClick={toggleBookmark}
                                disabled={loading}
                                className={`border border-stone-300 p-3 sm:p-4 transition hover:bg-stone-200 ${
                                    isBookmarked 
                                        ? 'bg-stone-800 text-white hover:bg-stone-700' 
                                        : 'bg-transparent text-stone-700'
                                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                aria-label={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
                            >
                                <Bookmark 
                                    size={18} 
                                    className="sm:w-[22px] sm:h-[22px]"
                                    fill={isBookmarked ? 'currentColor' : 'none'}
                                />
                            </button>
                        </div>

                        <hr className="my-8 sm:my-10 border-stone-300" />

                        {/* Content Section - Responsive */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 border border-stone-300 bg-stone-50 p-4 sm:p-6 text-stone-700">
                            <Lock size={20} className="sm:w-[24px] sm:h-[24px]" />
                            {paymented === book._id ? (
                                <p className="text-base sm:text-lg break-words">
                                    {book.content}
                                </p>
                            ) : (
                                <p className="text-base sm:text-lg">
                                    Purchase this ebook to read the full content.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}