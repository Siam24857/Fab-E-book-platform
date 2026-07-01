"use client";

import { Bookmarkbooks } from "@/app/Action/Bookmarkfuctionalyti";
import { Calendar, Tag, User, Bookmark, Lock, Shield, PenLine, Eye, Heart, Share2, Download, Star, BookOpen, CheckCircle, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function BookDetailsPage({ book, paymented, userId, userRole }) {
    const router = useRouter();
    
    const isAuthenticated = userId && userRole;
    
    useEffect(() => {
        if (!isAuthenticated) {
            localStorage.setItem('redirectAfterLogin', window.location.pathname);
            router.push('/Login');
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-stone-900 mx-auto"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <BookOpen size={20} className="text-stone-900" />
                        </div>
                    </div>
                    <p className="mt-6 text-stone-600 font-medium">Redirecting to login...</p>
                </div>
            </div>
        );
    }

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

    const isWriterOrAdmin = userRole === 'writer' || userRole === 'admin';
    const isAdmin = userRole === 'admin';
    const isWriter = userRole === 'writer';
    const isReader = userRole === 'reader';
    
    const canViewContent = isReader && hasPurchased;
    const canPurchase = isReader && !hasPurchased;

    const [isBookmarked, setIsBookmarked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [bookmarkId, setBookmarkId] = useState(null);

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

    // Generate star rating (sample)
    const rating = 4.5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-50">
            <Toaster 
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#1c1c1e',
                        color: '#fff',
                        borderRadius: '12px',
                        padding: '16px',
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

            {/* Breadcrumb */}
            <div className="border-b border-stone-200/80 bg-white/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="flex items-center gap-2 text-sm">
                        <a href="/" className="text-stone-500 hover:text-stone-900 transition-colors">Home</a>
                        <span className="text-stone-300">/</span>
                        <a href="/books" className="text-stone-500 hover:text-stone-900 transition-colors">Books</a>
                        <span className="text-stone-300">/</span>
                        <span className="text-stone-900 font-medium truncate">{safeBook.title}</span>
                    </nav>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                <div className="grid gap-10 lg:gap-14 lg:grid-cols-[340px_1fr]">
                    {/* Cover Section */}
                    <div className="relative">
                        <div className="sticky top-8">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-stone-200 to-stone-300 rounded-lg blur-xl opacity-50 group-hover:opacity-75 transition duration-500"></div>
                                <div className="relative rounded-lg overflow-hidden shadow-2xl">
                                    <img
                                        src={safeBook.cover}
                                        alt={safeBook.title}
                                        className="w-full aspect-[3/4] object-cover transition duration-500 group-hover:scale-105"
                                        onError={(e) => {
                                            e.target.src = '/default-cover.jpg';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="mt-6 grid grid-cols-3 gap-3">
                                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center border border-stone-200/50">
                                    <p className="text-2xl font-bold text-stone-900">4.5</p>
                                    <p className="text-xs text-stone-500">Rating</p>
                                </div>
                                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center border border-stone-200/50">
                                    <p className="text-2xl font-bold text-stone-900">1.2K</p>
                                    <p className="text-xs text-stone-500">Readers</p>
                                </div>
                                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center border border-stone-200/50">
                                    <p className="text-2xl font-bold text-stone-900">85%</p>
                                    <p className="text-xs text-stone-500">Likes</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div>
                        {/* Tags & Badges */}
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium bg-stone-900 text-white rounded-full">
                                <Tag size={12} />
                                {safeBook.genre}
                            </span>
                            
                            {isWriter && (
                                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium bg-amber-100 text-amber-800 rounded-full">
                                    <PenLine size={12} />
                                    Writer
                                </span>
                            )}
                            {isAdmin && (
                                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                                    <Shield size={12} />
                                    Admin
                                </span>
                            )}
                            {isReader && hasPurchased && (
                                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">
                                    <CheckCircle size={12} />
                                    Purchased
                                </span>
                            )}
                            {safeBook.status === 'Available' ? (
                                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                    Available
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                                    <AlertCircle size={12} />
                                    Unavailable
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 leading-[1.1] tracking-tight">
                            {safeBook.title}
                        </h1>

                        {/* Author & Meta */}
                        <div className="mt-5 flex flex-wrap items-center gap-6 text-sm text-stone-600">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center">
                                    <User size={16} className="text-stone-600" />
                                </div>
                                <span className="font-medium text-stone-900">{safeBook.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-stone-400" />
                                <span>{formatDate(safeBook.publishedAt)}</span>
                            </div>
                        </div>

                        {/* Rating Stars */}
                        <div className="mt-4 flex items-center gap-3">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} className={`${
                                        i < fullStars ? 'text-yellow-400 fill-yellow-400' :
                                        i === fullStars && hasHalfStar ? 'text-yellow-400 fill-yellow-400' :
                                        'text-stone-300'
                                    }`} />
                                ))}
                            </div>
                            <span className="text-sm font-medium text-stone-900">4.5</span>
                            <span className="text-sm text-stone-400">(1,234 reviews)</span>
                        </div>

                        <hr className="my-8 border-stone-200" />

                        {/* Description */}
                        <div>
                            <h2 className="text-xl font-semibold text-stone-900 mb-3">About This Book</h2>
                            <p className="text-base leading-relaxed text-stone-600 max-w-3xl">
                                {safeBook.description}
                            </p>
                        </div>

                        {/* Price & Actions */}
                        <div className="mt-8 p-6 bg-white rounded-2xl border border-stone-200 shadow-sm">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm text-stone-500">Price</p>
                                    <p className="text-4xl font-bold text-stone-900">
                                        ${Number(safeBook.price).toFixed(2)}
                                    </p>
                                </div>

                                <div className="flex flex-wrap items-center gap-3">
                                    {canPurchase ? (
                                        <form action="/api/checkout_sessions" method="POST">
                                            <input type="hidden" name="price" defaultValue={safeBook.price} />
                                            <input type="hidden" name="productid" defaultValue={safeBook._id} />
                                            <input type="hidden" name="image" defaultValue={safeBook.cover} />
                                            <input type="hidden" name="title" defaultValue={safeBook.title} />
                                            <input type="hidden" name="writerid" defaultValue={safeBook.writerId} />
                                            <button 
                                                type="submit" 
                                                className="group relative px-8 py-3.5 bg-gradient-to-r from-stone-900 to-stone-800 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105"
                                            >
                                                <span className="relative z-10 flex items-center gap-2">
                                                    Buy Now
                                                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </span>
                                                <div className="absolute inset-0 bg-gradient-to-r from-stone-800 to-stone-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </button>
                                        </form>
                                    ) : isReader && hasPurchased ? (
                                        <div className="flex items-center gap-3 px-8 py-3.5 bg-emerald-50 border-2 border-emerald-200 rounded-full">
                                            <CheckCircle size={20} className="text-emerald-600" />
                                            <span className="font-semibold text-emerald-700">Already Purchased</span>
                                        </div>
                                    ) : isWriter ? (
                                        <div className="flex items-center gap-3 px-6 py-3.5 bg-amber-50 border-2 border-amber-200 rounded-full">
                                            <PenLine size={18} className="text-amber-600" />
                                            <span className="font-semibold text-amber-700">Writer Account</span>
                                        </div>
                                    ) : isAdmin ? (
                                        <div className="flex items-center gap-3 px-6 py-3.5 bg-purple-50 border-2 border-purple-200 rounded-full">
                                            <Shield size={18} className="text-purple-600" />
                                            <span className="font-semibold text-purple-700">Admin Account</span>
                                        </div>
                                    ) : null}

                                    <button
                                        onClick={toggleBookmark}
                                        disabled={loading || !safeBook._id}
                                        className={`group relative p-3.5 rounded-full transition-all duration-300 ${
                                            isBookmarked 
                                                ? 'bg-stone-900 text-white hover:bg-stone-800' 
                                                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                                        } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        aria-label={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
                                    >
                                        <Heart 
                                            size={20} 
                                            className="transition-transform group-hover:scale-110"
                                            fill={isBookmarked ? 'currentColor' : 'none'}
                                        />
                                    </button>

                                    <button className="p-3.5 bg-stone-100 text-stone-600 rounded-full hover:bg-stone-200 transition-colors duration-300">
                                        <Share2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="mt-8">
                            <div className={`rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                                canViewContent 
                                    ? 'border-emerald-200 bg-gradient-to-br from-emerald-50/50 to-white' 
                                    : 'border-stone-200 bg-white'
                            }`}>
                                <div className={`px-6 py-4 border-b ${
                                    canViewContent ? 'border-emerald-200 bg-emerald-50/50' : 'border-stone-200 bg-stone-50/50'
                                }`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            {canViewContent ? (
                                                <Eye size={20} className="text-emerald-600" />
                                            ) : (
                                                <Lock size={20} className="text-stone-400" />
                                            )}
                                            <span className={`font-semibold ${
                                                canViewContent ? 'text-emerald-700' : 'text-stone-600'
                                            }`}>
                                                {canViewContent ? '📖 Full Content Access' : '🔒 Content Locked'}
                                            </span>
                                        </div>
                                        {canViewContent && (
                                            <span className="text-xs font-medium text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
                                                Purchased
                                            </span>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="p-6">
                                    {canViewContent ? (
                                        <div className="prose prose-stone max-w-none">
                                            <div className="whitespace-pre-wrap text-base leading-8 text-stone-700">
                                                {safeBook.content}
                                            </div>
                                            <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                                                <p className="text-sm text-emerald-700 flex items-center gap-2">
                                                    <CheckCircle size={16} className="text-emerald-600" />
                                                    Thank you for purchasing this book. Enjoy your reading!
                                                </p>
                                            </div>
                                        </div>
                                    ) : isWriter || isAdmin ? (
                                        <div className="text-center py-8">
                                            <div className="inline-flex p-4 bg-stone-100 rounded-full mb-4">
                                                {isWriter ? <PenLine size={40} className="text-stone-400" /> : <Shield size={40} className="text-stone-400" />}
                                            </div>
                                            <h3 className="text-lg font-semibold text-stone-700 mb-2">
                                                {isWriter ? '✏️ Writers Cannot Access Content' : '👑 Admins Cannot Access Content'}
                                            </h3>
                                            <p className="text-sm text-stone-500 max-w-md mx-auto">
                                                {isWriter 
                                                    ? 'Writers can create and manage books but cannot read purchased content.'
                                                    : 'Admins manage the platform but cannot read purchased content.'
                                                }
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <div className="inline-flex p-4 bg-stone-100 rounded-full mb-4">
                                                <Lock size={40} className="text-stone-400" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-stone-700 mb-2">Purchase to Read</h3>
                                            <p className="text-sm text-stone-500 max-w-md mx-auto">
                                                Buy this ebook to unlock the full content and start reading.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}