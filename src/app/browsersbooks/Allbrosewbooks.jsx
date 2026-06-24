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

  // Track previous filter values to detect actual changes
  const [prevFilters, setPrevFilters] = useState({
    search: searchParams?.get("search") || "",
    genre: searchParams?.get("genre") || "All Genres",
    sort: searchParams?.get("sort") || "newest",
    applied: {
      min: searchParams?.get("minPrice") || "",
      max: searchParams?.get("maxPrice") || "",
    }
  });

  // Filter books - EXCLUDE DRAFT BOOKS
  const filtered = useMemo(() => {
    // Start with BOOKS and filter out drafts
    let list = [...BOOKS];
    
    // 🔥 EXCLUDE DRAFT BOOKS
    list = list.filter((b) => {
      // Check if book has a status field and it's not "draft"
      // Case insensitive check
      const status = b?.status?.toLowerCase() || b?.bookStatus?.toLowerCase() || "";
      const isDraft = status === "draft" || status === "drafted";
      
      // Also check if book has a publishedAt or isPublished flag
      const isPublished = b?.isPublished === true || b?.published === true;
      
      // Show book if it's not a draft AND (it's published OR there's no status field)
      // This ensures backward compatibility with books that don't have status field
      if (!b?.status && !b?.bookStatus) {
        // If no status field, assume it's published (for backward compatibility)
        return true;
      }
      
      // If it has status field, only show if not draft
      // Or if it has isPublished flag, only show if true
      if (b?.isPublished !== undefined) {
        return isPublished && !isDraft;
      }
      
      return !isDraft;
    });

    // Apply search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (b) =>
          (b.title?.toLowerCase() || "").includes(q) ||
          (b.writer?.toLowerCase() || "").includes(q) ||
          (b.author?.toLowerCase() || "").includes(q)
      );
    }

    // Apply genre filter
    if (genre !== "All Genres") {
      list = list.filter((b) => {
        const bookGenre = b.genre || b.category || "";
        return bookGenre === genre;
      });
    }

    // Apply price filters
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

    // Apply sorting
    if (sort === "price_asc") {
      list.sort((a, b) => ((a.price || a.amount || 0) - (b.price || b.amount || 0)));
    } else if (sort === "price_desc") {
      list.sort((a, b) => ((b.price || b.amount || 0) - (a.price || a.amount || 0)));
    } else if (sort === "title_asc") {
      list.sort((a, b) => ((a.title || "").localeCompare(b.title || "")));
    } else if (sort === "newest") {
      // Sort by createdAt or publishedAt
      list.sort((a, b) => {
        const dateA = new Date(a.createdAt || a.publishedAt || a.date || 0);
        const dateB = new Date(b.createdAt || b.publishedAt || b.date || 0);
        return dateB - dateA;
      });
    }

    return list;
  }, [search, genre, sort, applied, BOOKS]);

  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  }, [filtered.length]);

  // Get current page books
  const paginatedBooks = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filtered.slice(start, end);
  }, [filtered, page]);

  // Reset to page 1 only when filters ACTUALLY change
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

  // Ensure page is within valid range
  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    }
  }, [totalPages]);

  // Update URL when page or filters change
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

  // Sync page from URL only on initial load and browser back/forward
  useEffect(() => {
    const pageParam = searchParams?.get("page");
    if (pageParam) {
      const pageFromUrl = parseInt(pageParam);
      if (!isNaN(pageFromUrl) && pageFromUrl !== page && pageFromUrl >= 1 && pageFromUrl <= totalPages) {
        setPage(pageFromUrl);
      }
    }
  }, [searchParams?.get("page")]);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Handle apply price filter
  const handleApplyPriceFilter = () => {
    setApplied({ min: minPrice, max: maxPrice });
    toast.success('Price filter applied');
  };

  // Debug - log how many books are being shown vs total
  console.log(`Total books: ${BOOKS.length}, Published: ${filtered.length}`);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
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

      {/* Search Bar - Fixed Design */}
      <div className="border-b border-gray-200 bg-white p-4 sm:p-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex-1 relative">
            <svg 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              width="18" 
              height="18" 
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
              placeholder="Search by title or author..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm sm:text-base"
            />
          </div>
          <div className="sm:w-64">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white text-sm sm:text-base appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23555' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
                paddingRight: '36px'
              }}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 gap-6 lg:gap-8">
        {/* Sidebar */}
        <aside className="lg:w-64 lg:flex-shrink-0">
          <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
            <p className="text-xs font-bold tracking-wider text-gray-500 uppercase mb-3">
              Genre
            </p>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {GENRES.map((g) => (
                <button
                  key={g}
                  onClick={() => setGenre(g)}
                  className={`px-3 py-1.5 text-xs sm:text-sm rounded-lg transition whitespace-nowrap ${
                    genre === g 
                      ? 'bg-gray-900 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>

            <div className="h-px bg-gray-200 mb-6" />

            {/* Price Range */}
            <div>
              <p className="text-xs font-bold tracking-wider text-gray-500 uppercase mb-3">
                Price Range
              </p>
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                />
                <span className="text-gray-400">–</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                />
              </div>
              <button
                onClick={handleApplyPriceFilter}
                className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-semibold transition"
              >
                Apply
              </button>
              
              {/* Show count of available books */}
              <div className="mt-3 text-xs text-gray-500 text-center">
                {filtered.length} book{filtered.length !== 1 ? 's' : ''} available
              </div>
            </div>
          </div>
        </aside>

        {/* Book Grid */}
        <main className="flex-1 min-w-0">
          {paginatedBooks.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-xl font-semibold text-gray-600 mb-2">No books found</p>
              <p className="text-gray-500">
                {filtered.length === 0 && BOOKS.length > 0 
                  ? "All books are currently in draft mode. Check back later!"
                  : "Try adjusting your search or filters."}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                {paginatedBooks.map((book) => {
                  const bookId = book._id || book.id || book.slug || book.title;
                  const coverSrc = getSafeImageSrc(book.cover);
                  const title = getSafeBookTitle(book);
                  const author = getSafeBookAuthor(book);
                  const price = getSafeBookPrice(book);

                  return (
                    <Link key={bookId} href={`/bookdeattailspage/${bookId}`}>
                      <div className="group cursor-pointer transition hover:shadow-lg rounded-lg overflow-hidden">
                        <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
                          <img
                            src={coverSrc}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => {
                              e.target.src = '/placeholder-book-cover.jpg'; // Add a placeholder image
                            }}
                          />
                        </div>
                        <div className="p-2 sm:p-3">
                          <p className="text-xs text-gray-500 truncate">{author}</p>
                          <p className="text-sm font-semibold text-gray-900 truncate mt-0.5">{title}</p>
                          <div className="flex items-center justify-between mt-1.5">
                            <span className="text-sm font-bold">${price.toFixed(2)}</span>
                            <span className="text-[10px] font-medium px-2 py-0.5 bg-gray-100 border border-gray-200 rounded text-gray-600 truncate max-w-[60px]">
                              {book.genre || book.category || "General"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8 pb-4">
                  <div className="flex gap-1.5 flex-wrap justify-center">
                    <button
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page === 1}
                      className={`px-3 py-1.5 border rounded-lg text-sm transition ${
                        page === 1 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                      }`}
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => handlePageChange(p)}
                        className={`px-3 py-1.5 border rounded-lg text-sm transition min-w-[36px] ${
                          p === page 
                            ? 'bg-gray-900 text-white border-gray-900' 
                            : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page === totalPages}
                      className={`px-3 py-1.5 border rounded-lg text-sm transition ${
                        page === totalPages 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}