"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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

  // Filter books
  const filtered = useMemo(() => {
    let list = [...BOOKS];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (b) =>
          (b.title?.toLowerCase() || "").includes(q) ||
          (b.writer?.toLowerCase() || "").includes(q)
      );
    }

    if (genre !== "All Genres") list = list.filter((b) => b.genre === genre);

    if (applied.min !== "") list = list.filter((b) => b.price >= parseFloat(applied.min));
    if (applied.max !== "") list = list.filter((b) => b.price <= parseFloat(applied.max));

    if (sort === "price_asc") list.sort((a, b) => (a.price || 0) - (b.price || 0));
    if (sort === "price_desc") list.sort((a, b) => (b.price || 0) - (a.price || 0));
    if (sort === "title_asc") list.sort((a, b) => (a.title || "").localeCompare(b.title || ""));

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

  return (
    // FIX: Remove all minHeight and let it flow naturally
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#fff", color: "#111", flex: 1 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        input, select { font-family: inherit; }
        .book-card:hover .book-img { transform: scale(1.04); }
        .book-card:hover { box-shadow: 0 4px 24px rgba(0,0,0,0.10); }
        .genre-item:hover { background: #f3f3f3; }
        select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23555' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          padding-right: 36px;
        }
        /* Fix for flex layout */
        .bookstore-container {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .bookstore-body {
          display: flex;
          flex: 1;
        }
      `}</style>

      {/* Search Bar */}
      <div style={{ borderBottom: "1px solid #e5e5e5", padding: "12px 24px", display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", border: "1px solid #d1d1d1", borderRadius: 8, padding: "0 14px", height: 44, gap: 10, minWidth: "200px" }}>
          <svg width="16" height="16" fill="none" stroke="#999" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or author..."
            style={{ border: "none", outline: "none", width: "100%", fontSize: 14, color: "#111", background: "transparent" }}
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{ border: "1px solid #d1d1d1", borderRadius: 8, height: 44, padding: "0 12px", fontSize: 14, color: "#111", background: "#fff", cursor: "pointer", minWidth: 180 }}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Body - FIX: Remove minHeight, use flex */}
      <div className="bookstore-body">
        {/* Sidebar */}
        <aside style={{ width: 220, borderRight: "1px solid #e5e5e5", padding: "24px 0", flexShrink: 0 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#888", textTransform: "uppercase", padding: "0 20px", marginBottom: 10 }}>
            Genre
          </p>
          {GENRES.map((g) => (
            <div
              key={g}
              className="genre-item"
              onClick={() => setGenre(g)}
              style={{
                padding: "9px 20px",
                fontSize: 14,
                cursor: "pointer",
                fontWeight: genre === g ? 600 : 400,
                background: genre === g ? "#111" : "transparent",
                color: genre === g ? "#fff" : "#222",
                transition: "background 0.15s",
              }}
            >
              {g}
            </div>
          ))}

          <div style={{ height: 1, background: "#e5e5e5", margin: "20px 20px" }} />

          {/* Price Range */}
          <div style={{ padding: "0 20px" }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#888", textTransform: "uppercase", marginBottom: 14 }}>
              Price Range
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                style={{ width: "100%", border: "1px solid #d1d1d1", borderRadius: 6, padding: "8px 10px", fontSize: 13, outline: "none" }}
              />
              <span style={{ color: "#aaa", fontSize: 14 }}>–</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                style={{ width: "100%", border: "1px solid #d1d1d1", borderRadius: 6, padding: "8px 10px", fontSize: 13, outline: "none" }}
              />
            </div>
            <button
              onClick={() => setApplied({ min: minPrice, max: maxPrice })}
              style={{ width: "100%", padding: "9px 0", background: "#111", color: "#fff", border: "none", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer" }}
            >
              Apply
            </button>
          </div>
        </aside>

        {/* Book Grid */}
        <main style={{ flex: 1, padding: "28px" }}>
          {paginatedBooks.length === 0 ? (
            <div style={{ textAlign: "center", marginTop: 80, color: "#999" }}>
              <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>No books found</p>
              <p style={{ fontSize: 14 }}>Try adjusting your search or filters.</p>
            </div>
          ) : (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 24 }}>
                {paginatedBooks.map((book) => (
                  <div
                    key={book._id || book.id}
                    className="book-card"
                    style={{ cursor: "pointer", borderRadius: 4, overflow: "hidden", transition: "box-shadow 0.2s" }}
                  >
                    <div style={{ overflow: "hidden", aspectRatio: "3/4", background: "#f0f0f0" }}>
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="book-img"
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.3s ease" }}
                      />
                    </div>
                    <div style={{ paddingTop: 10 }}>
                      <p style={{ fontSize: 11, color: "#999", marginBottom: 2 }}>{book.writer}</p>
                      <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, lineHeight: 1.3 }}>{book.title}</p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 14, fontWeight: 700 }}>${book.price.toFixed(2)}</span>
                        <span style={{ fontSize: 11, fontWeight: 500, background: "#f3f3f3", border: "1px solid #e0e0e0", borderRadius: 4, padding: "2px 8px", color: "#444" }}>
                          {book.genre}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div style={{ display: "flex", justifyContent: "center", marginTop: 32, paddingBottom: 20 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                    <button
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page === 1}
                      style={{
                        padding: "8px 16px",
                        border: "1px solid #d1d1d1",
                        borderRadius: 6,
                        background: page === 1 ? "#f5f5f5" : "#fff",
                        color: page === 1 ? "#999" : "#111",
                        cursor: page === 1 ? "not-allowed" : "pointer",
                        fontSize: 14,
                        transition: "all 0.2s"
                      }}
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => handlePageChange(p)}
                        style={{
                          padding: "8px 16px",
                          border: "1px solid #d1d1d1",
                          borderRadius: 6,
                          background: p === page ? "#111" : "#fff",
                          color: p === page ? "#fff" : "#111",
                          cursor: "pointer",
                          fontSize: 14,
                          fontWeight: p === page ? 600 : 400,
                          transition: "all 0.2s",
                          minWidth: 40
                        }}
                      >
                        {p}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page === totalPages}
                      style={{
                        padding: "8px 16px",
                        border: "1px solid #d1d1d1",
                        borderRadius: 6,
                        background: page === totalPages ? "#f5f5f5" : "#fff",
                        color: page === totalPages ? "#999" : "#111",
                        cursor: page === totalPages ? "not-allowed" : "pointer",
                        fontSize: 14,
                        transition: "all 0.2s"
                      }}
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