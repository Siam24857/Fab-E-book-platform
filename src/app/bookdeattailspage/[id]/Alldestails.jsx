"use client";

import { Bookmarkbooks } from "@/app/Action/Bookmarkfuctionalyti";
import { Calendar, Tag, User, Bookmark, Lock, Shield, PenLine, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function BookDetailsPage({ book, paymented, userId, userRole }) {
    const router = useRouter();
    
    // ✅ EARLY RETURN - Check authentication FIRST before any other code
    const isAuthenticated = userId && userRole;
    
    // ✅ Redirect to login if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            localStorage.setItem('redirectAfterLogin', window.location.pathname);
            router.push('/Login');
        }
    }, [isAuthenticated, router]);

    // ✅ EARLY RETURN - Show loading state if not authenticated
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-stone-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-900 mx-auto"></div>
                    <p className="mt-4 text-stone-600">Redirecting to login...</p>
                </div>
            </div>
        );
    }

    console.log('User ID:', userId);
    console.log('User Role:', userRole);
    console.log('Payment status:', paymented);
    
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

    // ✅ Check if user has actually purchased
    const hasPurchased = (() => {
        if (typeof paymented === 'boolean') {
            return paymented;
        }
        if (paymented && typeof paymented === 'object') {
            if (paymented.success && paymented.data) {
                if (Array.isArray(paymented.data)) {
                    return paymented.data.length > 0;
                }
                if (typeof paymented.data === 'object' && paymented.data !== null) {
                    return true;
                }
                return false;
            }
            if (paymented.count !== undefined) {
                return paymented.count > 0;
            }
            if (Array.isArray(paymented)) {
                return paymented.length > 0;
            }
            if (paymented._id || paymented.id) {
                return true;
            }
            return false;
        }
        return false;
    })();

    // ✅ Check if user is writer or admin
    const isWriterOrAdmin = userRole === 'writer' || userRole === 'admin';
    const isAdmin = userRole === 'admin';
    const isWriter = userRole === 'writer';
    const isReader = userRole === 'reader';
    
    // ✅ ONLY READERS WHO PURCHASED CAN VIEW CONTENT
    // Writers and Admins CANNOT view content (they can't purchase)
    const canViewContent = isReader && hasPurchased;
    
    // ✅ Only readers who haven't purchased can buy
    const canPurchase = isReader && !hasPurchased;

    console.log('hasPurchased:', hasPurchased);
    console.log('canViewContent:', canViewContent);
    console.log('canPurchase:', canPurchase);
    console.log('isReader:', isReader);
    console.log('isWriter:', isWriter);
    console.log('isAdmin:', isAdmin);

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

    // Toggle bookmark function
    const toggleBookmark = async () => {
        if (!userId) {
            toast.error('Please login to bookmark books');
            router.push('/Login');
            return;
        }

        if (!safeBook._id) {
            toast.error('Invalid book data');
            return;
        }

        setLoading(true);

        try {
            if (isBookmarked) {
                const removed = removeBookmarkFromLocalStorage(safeBook._id);
                if (removed) {
                    setIsBookmarked(false);
                    setBookmarkId(null);
                    toast.success('Bookmark removed successfully');
                    
                    try {
                        const dbResult = await Bookmarkbooks({ 
                            userId: userId,
                            bookId: safeBook._id, 
                            action: 'remove' 
                        });
                        console.log('Database remove result:', dbResult);
                    } catch (dbError) {
                        console.warn('Failed to remove from database:', dbError);
                    }
                } else {
                    toast.error('Failed to remove bookmark');
                }
            } else {
                const bookmarkData = {
                    userId: userId,
                    bookId: safeBook._id,
                    title: safeBook.title,
                    image: safeBook.cover,
                    price: safeBook.price,
                    bookmarkedAt: new Date().toISOString()
                };

                const localBookmark = saveBookmarkToLocalStorage(bookmarkData);
                
                if (localBookmark) {
                    setIsBookmarked(true);
                    setBookmarkId(localBookmark._id);
                    toast.success('Bookmark added successfully');
                    
                    try {
                        const dbResult = await Bookmarkbooks(bookmarkData);
                        if (dbResult && dbResult.success === false) {
                            console.warn('Database save failed:', dbResult.message);
                        } else {
                            console.log('Database save success:', dbResult);
                        }
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
                    {/* Cover */}
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

                    {/* Details */}
                    <div>
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-block bg-stone-200 px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium">
                                {safeBook.genre}
                            </span>
                            
                            {isWriter && (
                                <span className="inline-flex items-center gap-1 px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium bg-amber-100 text-amber-800">
                                    <PenLine size={14} />
                                    Writer
                                </span>
                            )}
                            {isAdmin && (
                                <span className="inline-flex items-center gap-1 px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium bg-purple-100 text-purple-800">
                                    <Shield size={14} />
                                    Admin
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

                        {/* Actions */}
                        <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-5">
                            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900">
                                ${Number(safeBook.price).toFixed(2)}
                            </span>

                            {/* Only readers who haven't purchased can buy */}
                            {canPurchase ? (
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
                                // Reader who already purchased
                                <button className="bg-green-700 px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white w-full sm:w-auto cursor-default">
                                    ✅ Already Purchased
                                </button>
                            ) : isWriter ? (
                                // Writer - cannot purchase
                                <div className="flex flex-col items-start gap-1 w-full sm:w-auto">
                                    <div className="bg-gray-200 px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold text-gray-500 w-full sm:w-auto cursor-not-allowed">
                                        <span className="flex items-center gap-2">
                                            <PenLine size={20} />
                                            ❌ Writers Cannot Purchase
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 italic">
                                        Writers can only create content, not purchase
                                    </p>
                                </div>
                            ) : isAdmin ? (
                                // Admin - cannot purchase
                                <div className="flex flex-col items-start gap-1 w-full sm:w-auto">
                                    <div className="bg-gray-200 px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold text-gray-500 w-full sm:w-auto cursor-not-allowed">
                                        <span className="flex items-center gap-2">
                                            <Shield size={20} />
                                            ❌ Admins Cannot Purchase
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 italic">
                                        Admins manage content, not purchase
                                    </p>
                                </div>
                            ) : null}

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

                        {/* Content Section - ONLY READERS WHO PURCHASED CAN VIEW */}
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
                                // ✅ ONLY READERS WHO PURCHASED can see content
                                <div className="w-full">
                                    <div className="prose prose-stone max-w-none">
                                        <div className="whitespace-pre-wrap text-base sm:text-lg leading-7 sm:leading-9 text-stone-700">
                                            {safeBook.content}
                                        </div>
                                    </div>
                                    <div className="mt-3 p-3 bg-green-100 border border-green-300 rounded">
                                        <p className="text-sm text-green-700 flex items-center gap-2">
                                            ✅ Purchased Access - Thank you for your purchase!
                                        </p>
                                    </div>
                                </div>
                            ) : isWriter || isAdmin ? (
                                // ❌ Writers and Admins see this message
                                <div className="w-full text-center py-6">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="bg-gray-100 p-4 rounded-full">
                                            {isWriter ? <PenLine size={48} className="text-gray-400" /> : <Shield size={48} className="text-gray-400" />}
                                        </div>
                                        <p className="text-lg font-semibold text-gray-600">
                                            {isWriter ? '✏️ Writers Cannot Access Content' : '👑 Admins Cannot Access Content'}
                                        </p>
                                        <p className="text-sm text-gray-500 max-w-md">
                                            {isWriter 
                                                ? 'Writers can create and manage books but cannot read purchased content. Please switch to a reader account to purchase and read books.'
                                                : 'Admins manage the platform but cannot read purchased content. Please switch to a reader account to purchase and read books.'
                                            }
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                // ❌ Readers who haven't purchased see this message
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