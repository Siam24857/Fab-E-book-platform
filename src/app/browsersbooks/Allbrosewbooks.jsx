"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";

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

export default function BookStore({ BOOKS, serchparams }) {
  const router = useRouter();
  const [search, setSearch] = useState(serchparams?.search || "");
  const [genre, setGenre] = useState(serchparams?.genre || "All Genres");
  const [sort, setSort] = useState(serchparams?.sort || "newest");
  const [minPrice, setMinPrice] = useState(serchparams?.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(serchparams?.maxPrice || "");
  const [applied, setApplied] = useState({
    min: serchparams?.minPrice || "",
    max: serchparams?.maxPrice || "",
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (genre !== "All Genres") params.set("genre", genre);
    if (sort !== "newest") params.set("sort", sort);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (search) params.set("search", search);

    router.push(`?${params.toString()}`);
  }, [genre, sort, minPrice, maxPrice, search]);

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

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: "100vh", background: "#fff", color: "#111" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
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
      `}</style>

      {/* Search Bar */}
      <div style={{ borderBottom: "1px solid #e5e5e5", padding: "12px 24px", display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", border: "1px solid #d1d1d1", borderRadius: 8, padding: "0 14px", height: 44, gap: 10 }}>
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

      {/* Body */}
      <div style={{ display: "flex", minHeight: "calc(100vh - 69px)" }}>

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
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", marginTop: 80, color: "#999" }}>
              <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>No books found</p>
              <p style={{ fontSize: 14 }}>Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 24 }}>
              {filtered.map((book) => (
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
          )}
        </main>
      </div>
    </div>
  );
}