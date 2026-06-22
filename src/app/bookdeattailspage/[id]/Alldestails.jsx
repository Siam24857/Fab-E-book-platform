"use client";

import { Bookmarkbooks } from "@/app/lib/Action/Bookmarkfuctionalyti";
import { Calendar, Tag, User, Bookmark, Lock } from "lucide-react";
import { useState, useEffect } from "react";

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
                console.log('Bookmark saved to localStorage:', newBookmark);
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
            console.log('Bookmark removed from localStorage for book:', bookId);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    };

    // Toggle bookmark function
    const toggleBookmark = async () => {
        if (!userId) {
            alert('Please login to bookmark books');
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
                    console.log('Bookmark removed successfully');
                } else {
                    console.error('Failed to remove bookmark from localStorage');
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
                    console.log('Bookmark saved to localStorage');
                    
                    // Also try to save to database (optional)
                    try {
                        const dbResult = await Bookmarkbooks(bookmarkData);
                        console.log('Database save result:', dbResult);
                    } catch (dbError) {
                        console.warn('Failed to save to database, but localStorage saved:', dbError);
                    }
                } else {
                    console.error('Failed to save bookmark to localStorage');
                    alert('Failed to bookmark. Please try again.');
                }
            }
        } catch (error) {
            console.error('Error toggling bookmark:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-stone-100">
            <div className="mx-auto max-w-7xl px-8 py-12">
                <div className="grid gap-12 lg:grid-cols-[320px_1fr]">
                    {/* Cover */}
                    <div>
                        <img
                            src={book.cover}
                            alt={book.title}
                            className="w-full rounded-sm object-cover shadow-sm"
                        />
                    </div>

                    {/* Details */}
                    <div>
                        <span className="inline-block bg-stone-200 px-4 py-1 text-sm font-medium">
                            {book.genre}
                        </span>

                        <h1 className="mt-5 text-6xl font-bold text-stone-900">
                            {book.title}
                        </h1>

                        <div className="mt-6 flex flex-wrap items-center gap-8 text-stone-600">
                            <div className="flex items-center gap-2">
                                <User size={18} />
                                <span>{book.author}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Calendar size={18} />
                                <span>{book.publishedAt}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Tag size={18} />
                                <span>{book.status}</span>
                            </div>
                        </div>

                        <hr className="my-8 border-stone-300" />

                        <h2 className="mb-4 text-3xl font-semibold">
                            Description
                        </h2>

                        <p className="max-w-4xl text-lg leading-9 text-stone-700">
                            {book.description}
                        </p>

                        <div className="mt-10 flex items-center gap-5">
                            <span className="text-5xl font-bold text-stone-900">
                                ${book.price}
                            </span>

                            {paymented === book._id ? (
                                <button className="bg-red-700 px-10 py-4 text-lg font-semibold text-white transition">
                                    Already Available for you 
                                </button>
                            ) : (
                                <form action="/api/checkout_sessions" method="POST">
                                    <input type="hidden" name="price" defaultValue={book.price} />
                                    <input type="hidden" name="productid" defaultValue={book._id} />
                                    <input type="hidden" name="image" defaultValue={book.cover} />
                                    <input type="hidden" name="title" defaultValue={book.title} />
                                    <input type="hidden" name="writerid" defaultValue={book?.writerId} />
                                    <section>
                                        <button type="submit" role="link" className="bg-red-700 px-10 py-4 text-lg font-semibold text-white transition hover:bg-red-800">
                                            Buy Now
                                        </button>
                                    </section>
                                </form>
                            )}

                            {/* Bookmark Toggle Button */}
                            <button
                                onClick={toggleBookmark}
                                disabled={loading}
                                className={`border border-stone-300 p-4 transition hover:bg-stone-200 ${
                                    isBookmarked 
                                        ? 'bg-stone-800 text-white hover:bg-stone-700' 
                                        : 'bg-transparent text-stone-700'
                                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                aria-label={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
                            >
                                <Bookmark 
                                    size={22} 
                                    fill={isBookmarked ? 'currentColor' : 'none'}
                                />
                            </button>
                        </div>

                        <hr className="my-10 border-stone-300" />

                        <div className="flex items-center gap-4 border border-stone-300 bg-stone-50 p-6 text-stone-700">
                            <Lock size={24} />
                            {paymented === book._id ? (
                                <p className="text-lg">
                                    {book.content}
                                </p>
                            ) : (
                                <p className="text-lg">
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