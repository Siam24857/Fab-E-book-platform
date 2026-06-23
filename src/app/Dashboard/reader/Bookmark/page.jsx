"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, Trash2 } from "lucide-react";

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
        }
    };

    const removeBookmark = (bookId) => {
        try {
            const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
            const updatedBookmarks = savedBookmarks.filter(b => b.bookId !== bookId);
            localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
            setBookmarks(updatedBookmarks);
        } catch (error) {
            console.error('Error removing bookmark:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading bookmarks...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-100 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-stone-900 mb-8 flex items-center gap-3">
                    <Bookmark className="w-8 h-8" />
                    My Bookmarks
                </h1>

                {bookmarks.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
                        <Bookmark className="w-16 h-16 mx-auto text-stone-300 mb-4" />
                        <h2 className="text-2xl font-semibold text-stone-600 mb-2">No Bookmarks Yet</h2>
                        <p className="text-stone-500">Start bookmarking your favorite books!</p>
                        <Link 
                            href="/browsersbooks"
                            className="inline-block mt-4 bg-red-700 text-white px-6 py-2 rounded-lg hover:bg-red-800 transition"
                        >
                            Browse Books
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {bookmarks.map((bookmark) => (
                            <div 
                                key={bookmark._id} 
                                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
                            >
                                <Link href={`/bookdetailspage/${bookmark.bookId}`}>
                                    <div className="relative">
                                        <img 
                                            src={bookmark.image} 
                                            alt={bookmark.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                                            ${bookmark.price}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-stone-800 truncate">
                                            {bookmark.title}
                                        </h3>
                                        <p className="text-sm text-stone-500 mt-1">
                                            Bookmarked: {new Date(bookmark.bookmarkedAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </Link>
                                <div className="px-4 pb-4">
                                    <button
                                        onClick={() => removeBookmark(bookmark.bookId)}
                                        className="w-full flex items-center justify-center gap-2 border border-red-300 text-red-600 py-2 rounded-lg hover:bg-red-50 transition"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Remove Bookmark
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}