"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from 'react-hot-toast';
import { getSafeBookAuthor, getSafeBookPrice, getSafeBookTitle, getSafeImageSrc } from "@/app/lib/image-utils";

const GENRES = [
  "All Genres", "Fiction", "Mystery", "Romance",
  "Sci-Fi", "Fantasy", "Horror", "Biography", "Self-Help", "History", "Poetry",
];

const SORT_OPTIONS = [
  { label: "Newest First", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Title A–Z", value: "title_asc" },
];

const ITEMS_PER_PAGE = 12;

export default function BookStore({ BOOKS }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [search, setSearch] = useState(searchParams?.get("search") || "");
  const [genre, setGenre] = useState(searchParams?.get("genre") || "All Genres");
  const [sort, setSort] = useState(searchParams?.get("sort") || "newest");
  const [minPrice, setMinPrice] = useState(searchParams?.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams?.get("maxPrice") || "");
  const [page, setPage] = useState(() => {
    const pageParam = searchParams?.get("page");
    return pageParam ? parseInt(pageParam) : 1;
  });
  
  const [applied, setApplied] = useState({
    min: searchParams?.get("minPrice") || "", 
    max: searchParams?.get("maxPrice") || "",
  });

  const [prevFilters, setPrevFilters] = useState({
    search: searchParams?.get("search") || "",
    genre: searchParams?.get("genre") || "All Genres",
    sort: searchParams?.get("sort") || "newest",
    applied: {
      min: searchParams?.get("minPrice") || "",
      max: searchParams?.get("maxPrice") || "",
    }
  });

  const filtered = useMemo(() => {
    let list = [...BOOKS];
    
    list = list.filter((b) => {
      const status = b?.status?.toLowerCase() || b?.bookStatus?.toLowerCase() || "";
      const isDraft = status === "draft" || status === "drafted";
      const isPublished = b?.isPublished === true || b?.published === true;
      
      if (!b?.status && !b?.bookStatus) return true;
      if (b?.isPublished !== undefined) return isPublished && !isDraft;
      return !isDraft;
    });

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (b) =>
          (b.title?.toLowerCase() || "").includes(q) ||
          (b.writer?.toLowerCase() || "").includes(q) ||
          (b.author?.toLowerCase() || "").includes(q)
      );
    }

    if (genre !== "All Genres") {
      list = list.filter((b) => {
        const bookGenre = b.genre || b.category || "";
        return bookGenre === genre;
      });
    }

    if (applied.min !== "") {
      list = list.filter((b) => {
        const price = b.price || b.amount || 0;
        return price >= parseFloat(applied.min);
      });
    }
    if (applied.max !== "") {
      list = list.filter((b) => {
        const price = b.price || b.amount || 0;
        return price <= parseFloat(applied.max);
      });
    }

    if (sort === "price_asc") {
      list.sort((a, b) => ((a.price || a.amount || 0) - (b.price || b.amount || 0)));
    } else if (sort === "price_desc") {
      list.sort((a, b) => ((b.price || b.amount || 0) - (a.price || a.amount || 0)));
    } else if (sort === "title_asc") {
      list.sort((a, b) => ((a.title || "").localeCompare(b.title || "")));
    } else if (sort === "newest") {
      list.sort((a, b) => {
        const dateA = new Date(a.createdAt || a.publishedAt || a.date || 0);
        const dateB = new Date(b.createdAt || b.publishedAt || b.date || 0);
        return dateB - dateA;
      });
    }

    return list;
  }, [search, genre, sort, applied, BOOKS]);

  const totalPages = useMemo(() => {
    return Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  }, [filtered.length]);

  const paginatedBooks = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filtered.slice(start, end);
  }, [filtered, page]);

  useEffect(() => {
    const filtersChanged = 
      search !== prevFilters.search ||
      genre !== prevFilters.genre ||
      sort !== prevFilters.sort ||
      applied.min !== prevFilters.applied.min ||
      applied.max !== prevFilters.applied.max;

    if (filtersChanged) {
      setPage(1);
      setPrevFilters({
        search,
        genre,
        sort,
        applied: { ...applied }
      });
    }
  }, [search, genre, sort, applied]);

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    }
  }, [totalPages]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (genre !== "All Genres") params.set("genre", genre);
    if (sort !== "newest") params.set("sort", sort);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (search) params.set("search", search);
    if (page > 1) params.set("page", page.toString());

    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : window.location.pathname;
    
    router.replace(newUrl);
  }, [genre, sort, minPrice, maxPrice, search, page, router]);

  useEffect(() => {
    const pageParam = searchParams?.get("page");
    if (pageParam) {
      const pageFromUrl = parseInt(pageParam);
      if (!isNaN(pageFromUrl) && pageFromUrl !== page && pageFromUrl >= 1 && pageFromUrl <= totalPages) {
        setPage(pageFromUrl);
      }
    }
  }, [searchParams?.get("page")]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleApplyPriceFilter = () => {
    setApplied({ min: minPrice, max: maxPrice });
    toast.success('Price filter applied');
  };

  const handleClearFilters = () => {
    setSearch("");
    setGenre("All Genres");
    setSort("newest");
    setMinPrice("");
    setMaxPrice("");
    setApplied({ min: "", max: "" });
    setPage(1);
    toast.success('All filters cleared');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#0f172a',
            color: '#f8fafc',
            borderRadius: '16px',
            padding: '16px 20px',
            boxShadow: '0 20px 60px -10px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.1)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#f8fafc',
            },
          },
        }}
      />

      {/* Premium Header with Gradient */}
      <header className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent" />
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  Premium Bookstore
                </h1>
                <p className="text-sm text-indigo-200/80 font-light">
                  {filtered.length} exceptional titles available
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleClearFilters}
                className="px-5 py-2.5 text-sm font-medium text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl border border-white/10 transition-all duration-300"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Search Bar with Glass Effect */}
      <div className="sticky top-0 z-20 -mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/5 border border-white/50 p-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <svg 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400" 
                  width="20" 
                  height="20" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                </svg>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by title, author, or genre..."
                  className="w-full pl-12 pr-4 py-3 bg-slate-50/80 border-0 rounded-xl focus:ring-2 focus:ring-indigo-500/50 outline-none transition text-sm placeholder:text-slate-400"
                />
              </div>
              <div className="sm:w-56">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50/80 border-0 rounded-xl focus:ring-2 focus:ring-indigo-500/50 outline-none transition text-sm appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236366f1' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 14px center',
                    paddingRight: '40px'
                  }}
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Premium Sidebar */}
          <aside className="lg:w-72 lg:flex-shrink-0">
            <div className="sticky top-28 space-y-6">
              {/* Genre Filter - Glass Card */}
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/5 border border-white/50 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full" />
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Browse Genres
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {GENRES.map((g) => (
                    <button
                      key={g}
                      onClick={() => setGenre(g)}
                      className={`px-3.5 py-1.5 text-xs rounded-xl transition-all duration-300 whitespace-nowrap ${
                        genre === g 
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 scale-105' 
                          : 'bg-white/50 text-slate-600 hover:bg-white/80 hover:shadow-md border border-slate-200/50'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range - Glass Card */}
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/5 border border-white/50 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full" />
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Price Range
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <label className="text-xs text-slate-400 font-medium block mb-1.5">Min</label>
                      <input
                        type="number"
                        placeholder="$0"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white/60 border border-slate-200/50 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent outline-none text-sm transition"
                      />
                    </div>
                    <span className="text-slate-300 text-sm font-light mt-5">–</span>
                    <div className="flex-1">
                      <label className="text-xs text-slate-400 font-medium block mb-1.5">Max</label>
                      <input
                        type="number"
                        placeholder="$1000"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white/60 border border-slate-200/50 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent outline-none text-sm transition"
                      />
                    </div>
                  </div>
                  
                  <button
                    onClick={handleApplyPriceFilter}
                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl text-sm font-medium transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
                  >
                    Apply Filter
                  </button>
                </div>
              </div>

              {/* Stats Card */}
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl shadow-indigo-500/20">
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-100/80 mb-2">
                  Available Books
                </p>
                <p className="text-3xl font-bold">{filtered.length}</p>
                <p className="text-sm text-indigo-100/70 mt-1">
                  {paginatedBooks.length} showing on this page
                </p>
              </div>
            </div>
          </aside>

          {/* Book Grid */}
          <main className="flex-1 min-w-0">
            {paginatedBooks.length === 0 ? (
              <div className="text-center py-20 bg-white/60 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl shadow-black/5">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-slate-700 mb-2">No books found</h3>
                <p className="text-sm text-slate-400">
                  {filtered.length === 0 && BOOKS.length > 0 
                    ? "All books are currently in draft mode. Check back later!"
                    : "Try adjusting your search or filters."}
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-5 md:gap-6">
                  {paginatedBooks.map((book, index) => {
                    const bookId = book._id || book.id || book.slug || book.title;
                    const coverSrc = getSafeImageSrc(book.cover);
                    const title = getSafeBookTitle(book);
                    const author = getSafeBookAuthor(book);
                    const price = getSafeBookPrice(book);

                    return (
                      <Link key={bookId} href={`/bookdeattailspage/${bookId}`}>
                        <div 
                          className="group relative bg-white rounded-2xl overflow-hidden shadow-lg shadow-black/5 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 animate-fade-in-up"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <div className="aspect-[3/4] bg-gradient-to-br from-slate-50 to-indigo-50/50 overflow-hidden relative">
                            <img
                              src={coverSrc}
                              alt={title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              onError={(e) => {
                                e.target.src = '/placeholder-book-cover.jpg';
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            {/* Quick View Badge */}
                            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                              <span className="inline-block px-4 py-2 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-medium rounded-xl shadow-lg">
                                View Details →
                              </span>
                            </div>
                          </div>
                          
                          <div className="p-4">
                            <p className="text-xs text-slate-400 font-medium truncate">{author}</p>
                            <p className="text-sm font-semibold text-slate-800 truncate mt-0.5">{title}</p>
                            <div className="flex items-center justify-between mt-3">
                              <span className="text-sm font-bold text-indigo-600">
                                ${price.toFixed(2)}
                              </span>
                              <span className="text-[10px] font-medium px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-full truncate max-w-[60px] border border-indigo-100/50">
                                {book.genre || book.category || "General"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* Premium Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-12">
                    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/5 border border-white/50 p-2">
                      <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className={`px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${
                          page === 1 
                            ? 'text-slate-300 cursor-not-allowed' 
                            : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'
                        }`}
                      >
                        <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      
                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 7) {
                            pageNum = i + 1;
                          } else if (page <= 4) {
                            pageNum = i + 1;
                          } else if (page >= totalPages - 3) {
                            pageNum = totalPages - 6 + i;
                          } else {
                            pageNum = page - 3 + i;
                          }
                          
                          if (pageNum > 0 && pageNum <= totalPages) {
                            return (
                              <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={`w-10 h-10 text-sm font-medium rounded-xl transition-all duration-300 ${
                                  pageNum === page 
                                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25' 
                                    : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          }
                          return null;
                        })}
                      </div>

                      <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                        className={`px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${
                          page === totalPages 
                            ? 'text-slate-300 cursor-not-allowed' 
                            : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'
                        }`}
                      >
                        <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Premium Footer */}
      <footer className="relative mt-16 border-t border-white/20 bg-white/30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="text-sm font-medium text-slate-700">Premium Bookstore</span>
            </div>
            <p className="text-xs text-slate-400">
              © 2026 Premium Bookstore. Crafted with precision.
            </p>
          </div>
        </div>
      </footer>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}