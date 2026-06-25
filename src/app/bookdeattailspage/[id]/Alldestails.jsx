"use client";

import { Bookmarkbooks } from "@/app/Action/Bookmarkfuctionalyti";
import { Calendar, Tag, User, Bookmark, Lock, Shield, PenLine, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

export default function BookDetailsPage({ book, paymented, userId, userRole }) {
    console.log(paymented, userRole);
    
    // ✅ Extract book data from wrapped response
    const extractBookData = (data) => {
        if (data && typeof data === 'object') {
            if (data.success && data.data && typeof data.data === 'object') {
                return data.data;
            }
            if (data.data && typeof data.data === 'object') {
                return data.data;
            }
            if (data._id || data.id || data.title) {
                return data;
            }
        }
        return data || {};
    };

    const rawBook = extractBookData(book);

    // ✅ Safe book data extraction with fallbacks
    const safeBook = {
        _id: rawBook?._id || rawBook?.productId || rawBook?.id || '',
        title: rawBook?.title || rawBook?.booktitle || 'Untitled Book',
        cover: rawBook?.cover || rawBook?.coverimg || rawBook?.image || '/default-cover.jpg',
        author: rawBook?.author || rawBook?.writer || rawBook?.writerName || 'Unknown Author',
        genre: rawBook?.genre || rawBook?.category || 'General',
        price: rawBook?.price || rawBook?.amount || 0,
        description: rawBook?.description || rawBook?.desc || 'No description available.',
        status: rawBook?.status || rawBook?.availability || 'Available',
        publishedAt: rawBook?.publishedAt || rawBook?.createdAt || rawBook?.date || new Date().toISOString(),
        content: rawBook?.content || rawBook?.bookContent || 'Content not available.',
        writerId: rawBook?.writerId || rawBook?.writer || rawBook?.authorId || ''
    };

    // ✅ FIXED: Check if user has actually purchased (not just truthy object)
    const hasPurchased = (() => {
        // If paymented is a boolean, use it directly
        if (typeof paymented === 'boolean') {
            return paymented;
        }
        // If paymented is an object with success/data structure
        if (paymented && typeof paymented === 'object') {
            // Check if it's a successful response with data
            if (paymented.success && paymented.data) {
                // If data is an array, check if it has items
                if (Array.isArray(paymented.data)) {
                    return paymented.data.length > 0;
                }
                // If data is an object, it means there's a purchase
                if (typeof paymented.data === 'object' && paymented.data !== null) {
                    return true;
                }
                return false;
            }
            // If it has count property, check if count > 0
            if (paymented.count !== undefined) {
                return paymented.count > 0;
            }
            // Check if it's an array
            if (Array.isArray(paymented)) {
                return paymented.length > 0;
            }
            // If it's an object with _id or id, it's a purchase
            if (paymented._id || paymented.id) {
                return true;
            }
            return false;
        }
        // If paymented is null, undefined, or false
        return false;
    })();

    // ✅ Check if user is writer or admin
    const isWriterOrAdmin = userRole === 'writer' || userRole === 'admin';
    const isAdmin = userRole === 'admin';
    const isWriter = userRole === 'writer';
    const isReader = userRole === 'reader' || !userRole;
    
    // ✅ Determine if user can view content (only if purchased OR writer/admin)
    const canViewContent = isWriterOrAdmin || hasPurchased;

    console.log('hasPurchased:', hasPurchased);
    console.log('canViewContent:', canViewContent);
    console.log('isWriterOrAdmin:', isWriterOrAdmin);

    // State for bookmark
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [bookmarkId, setBookmarkId] = useState(null);

    // Load bookmark status from localStorage on mount
    useEffect(() => {
        const checkBookmarkStatus = () => {
            try {
                const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
                const isBookmarkedInStorage = savedBookmarks.some(b => b.bookId === safeBook._id);
                
                if (isBookmarkedInStorage) {
                    setIsBookmarked(true);
                    const bookmark = savedBookmarks.find(b => b.bookId === safeBook._id);
                    if (bookmark) {
                        setBookmarkId(bookmark._id || 'local');
                    }
                } else {
                    setIsBookmarked(false);
                    setBookmarkId(null);
                }
            } catch (error) {
                console.error('Error checking bookmark status:', error);
                setIsBookmarked(false);
                setBookmarkId(null);
            }
        };

        if (safeBook._id) {
            checkBookmarkStatus();
        }
    }, [safeBook._id]);

    // Save to localStorage function
    const saveBookmarkToLocalStorage = (bookData) => {
        try {
            const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
            const exists = savedBookmarks.some(b => b.bookId === bookData.bookId);
            
            if (!exists) {
                const newBookmark = {
                    _id: Date.now().toString(),
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

    // ✅ COMPLETELY FIXED: Toggle bookmark function with better error handling
    const toggleBookmark = async () => {
        if (!userId) {
            toast.error('Please login to bookmark books');
            return;
        }

        if (!safeBook._id) {
            toast.error('Invalid book data');
            return;
        }

        setLoading(true);

        try {
            if (isBookmarked) {
                // Remove from localStorage first
                const removed = removeBookmarkFromLocalStorage(safeBook._id);
                if (removed) {
                    setIsBookmarked(false);
                    setBookmarkId(null);
                    toast.success('Bookmark removed successfully');
                    
                    // Try to remove from database (non-blocking)
                    try {
                        const dbResult = await Bookmarkbooks({ 
                            userId: userId,
                            bookId: safeBook._id, 
                            action: 'remove' 
                        });
                        console.log('Database remove result:', dbResult);
                    } catch (dbError) {
                        // Silent fail - localStorage already updated
                        console.warn('Failed to remove from database:', dbError);
                    }
                } else {
                    toast.error('Failed to remove bookmark');
                }
            } else {
                // Prepare bookmark data
                const bookmarkData = {
                    userId: userId,
                    bookId: safeBook._id,
                    title: safeBook.title,
                    image: safeBook.cover,
                    price: safeBook.price,
                    bookmarkedAt: new Date().toISOString()
                };

                // Save to localStorage first (offline-first approach)
                const localBookmark = saveBookmarkToLocalStorage(bookmarkData);
                
                if (localBookmark) {
                    setIsBookmarked(true);
                    setBookmarkId(localBookmark._id);
                    toast.success('Bookmark added successfully');
                    
                    // Then try to save to database (non-blocking)
                    try {
                        const dbResult = await Bookmarkbooks(bookmarkData);
                        if (dbResult && dbResult.success === false) {
                            console.warn('Database save failed:', dbResult.message);
                            // User already has local bookmark, so we don't show error
                        } else {
                            console.log('Database save success:', dbResult);
                        }
                    } catch (dbError) {
                        // Silent fail - localStorage already has the bookmark
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

    // Format date for display
    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return 'N/A';
            }
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (error) {
            return 'N/A';
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
                            src={safeBook.cover}
                            alt={safeBook.title}
                            className="w-full rounded-sm object-cover shadow-sm"
                            onError={(e) => {
                                e.target.src = '/default-cover.jpg';
                            }}
                        />
                    </div>

                    {/* Details - Responsive */}
                    <div>
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-block bg-stone-200 px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium">
                                {safeBook.genre}
                            </span>
                            
                            {/* ✅ Role Badge - Show if user is writer or admin */}
                            {isWriterOrAdmin && (
                                <span className={`inline-flex items-center gap-1 px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium ${
                                    isAdmin 
                                        ? 'bg-purple-100 text-purple-800' 
                                        : 'bg-amber-100 text-amber-800'
                                }`}>
                                    {isAdmin ? <Shield size={14} /> : <PenLine size={14} />}
                                    {isAdmin ? 'Admin' : 'Writer'}
                                </span>
                            )}
                            {isReader && hasPurchased && (
                                <span className="inline-flex items-center gap-1 px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium bg-green-100 text-green-800">
                                    ✅ Purchased
                                </span>
                            )}
                        </div>

                        <h1 className="mt-4 sm:mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 leading-tight">
                            {safeBook.title}
                        </h1>

                        <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 text-sm sm:text-base text-stone-600">
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <User size={16} className="sm:w-[18px] sm:h-[18px]" />
                                <span>{safeBook.author}</span>
                            </div>

                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <Calendar size={16} className="sm:w-[18px] sm:h-[18px]" />
                                <span>{formatDate(safeBook.publishedAt)}</span>
                            </div>

                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <Tag size={16} className="sm:w-[18px] sm:h-[18px]" />
                                <span>{safeBook.status}</span>
                            </div>
                        </div>

                        <hr className="my-6 sm:my-8 border-stone-300" />

                        <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl font-semibold">
                            Description
                        </h2>

                        <p className="max-w-4xl text-base sm:text-lg leading-7 sm:leading-9 text-stone-700">
                            {safeBook.description}
                        </p>

                        {/* Actions - Responsive */}
                        <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-5">
                            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900">
                                ${Number(safeBook.price).toFixed(2)}
                            </span>

                            {/* ✅ Show Buy button ONLY for readers who haven't purchased */}
                            {isReader && !hasPurchased ? (
                                <form action="/api/checkout_sessions" method="POST" className="w-full sm:w-auto">
                                    <input type="hidden" name="price" defaultValue={safeBook.price} />
                                    <input type="hidden" name="productid" defaultValue={safeBook._id} />
                                    <input type="hidden" name="image" defaultValue={safeBook.cover} />
                                    <input type="hidden" name="title" defaultValue={safeBook.title} />
                                    <input type="hidden" name="writerid" defaultValue={safeBook.writerId} />
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
                            ) : isReader && hasPurchased ? (
                                // ✅ Reader who purchased
                                <button className="bg-green-700 px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white transition hover:bg-green-800 w-full sm:w-auto cursor-default">
                                    ✅ Already Purchased
                                </button>
                            ) : (
                                // ✅ Writer or Admin - No Buy button
                                <div className="flex flex-col items-start gap-1 w-full sm:w-auto">
                                    <div className="bg-gray-200 px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold text-gray-600 w-full sm:w-auto cursor-not-allowed opacity-70">
                                        <span className="flex items-center gap-2">
                                            <Eye size={20} />
                                            {isAdmin ? '🔒 Admin Access Only' : '✏️ Writer Access Only'}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 italic">
                                        {isAdmin 
                                            ? 'Admins can view content but cannot purchase' 
                                            : 'Writers can view content but cannot purchase'}
                                    </p>
                                </div>
                            )}

                            {/* Bookmark Toggle Button - Available for all roles */}
                            <button
                                onClick={toggleBookmark}
                                disabled={loading || !safeBook._id}
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

                        {/* ✅ Content Section */}
                        <div className={`flex flex-col items-start gap-3 sm:gap-4 border p-4 sm:p-6 ${
                            canViewContent 
                                ? 'border-green-300 bg-green-50' 
                                : 'border-stone-300 bg-stone-50'
                        }`}>
                            <div className="flex items-center gap-3">
                                <Lock size={20} className="sm:w-[24px] sm:h-[24px] flex-shrink-0" />
                                <span className="font-semibold text-sm sm:text-base">
                                    {canViewContent ? '📖 Full Content' : '🔒 Content Locked'}
                                </span>
                            </div>
                            
                            {canViewContent ? (
                                <div className="w-full">
                                    {/* ✅ Show preview notice for writers/admins */}
                                    {isWriterOrAdmin && !hasPurchased && (
                                        <div className="mb-3 p-2 bg-amber-50 border border-amber-200 rounded text-amber-700 text-sm">
                                            <span className="font-semibold">👁️ Preview Mode:</span> You can view the full content as {isAdmin ? 'an Admin' : 'a Writer'}.
                                        </div>
                                    )}
                                    <div className="text-base sm:text-lg leading-7 text-stone-700 whitespace-pre-wrap">
                                        {safeBook.content}
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full text-center py-6">
                                    <p className="text-base sm:text-lg text-gray-500">
                                        Purchase this ebook to read the full content.
                                    </p>
                                    <p className="text-sm text-gray-400 mt-2">
                                        Click the Buy Now button above to unlock.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}