"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import { ChevronRight, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { getCategoryBySlug } from "../../../../../lib/holmesworld/data/categories";
import { getProductsByCategory } from "../../../../../lib/holmesworld/data/products";
import { useStore } from "../../../../../lib/holmesworld/store";
import type { Product } from "../../../../../lib/holmesworld/types";

const PAGE_SIZE = 12;

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};


export default function PLPPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const category = getCategoryBySlug(slug);
  const allProducts = getProductsByCategory(slug);
  const { dispatch } = useStore();

  const [sort, setSort] = useState("popularity");
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(999999);

  const brands = useMemo(() => {
    const b = [...new Set(allProducts.map((p) => p.brand))];
    return b.slice(0, 5);
  }, [allProducts]);

  const filtered = useMemo(() => {
    let result = [...allProducts];
    if (inStockOnly) result = result.filter((p) => p.inStock);
    if (minRating > 0) result = result.filter((p) => p.rating >= minRating);
    if (selectedBrands.length > 0) result = result.filter((p) => selectedBrands.includes(p.brand));
    result = result.filter((p) => p.price >= minPrice && p.price <= maxPrice);
    switch (sort) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      default: result.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return result;
  }, [allProducts, sort, minRating, inStockOnly, selectedBrands, minPrice, maxPrice]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function toggleBrand(brand: string) {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
    setPage(1);
  }

  function clearFilters() {
    setMinRating(0);
    setInStockOnly(false);
    setSelectedBrands([]);
    setMinPrice(0);
    setMaxPrice(999999);
    setPage(1);
  }

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold mb-4" style={{ color: "var(--hw-ink)" }}>Category not found</h1>
        <Link href="/work/holmesworld/categories" className="text-sm" style={{ color: "var(--hw-accent)" }}>← Back to categories</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs mb-8" style={{ color: "var(--hw-ink-muted)" }}>
        <Link href="/work/holmesworld" style={{ color: "var(--hw-ink-muted)" }}>Home</Link>
        <ChevronRight size={12} />
        <Link href="/work/holmesworld/categories" style={{ color: "var(--hw-ink-muted)" }}>Categories</Link>
        <ChevronRight size={12} />
        <span style={{ color: "var(--hw-ink)" }}>{category.name}</span>
      </nav>

      {/* Category header */}
      <div className="relative rounded-xl overflow-hidden h-40 mb-10">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 flex items-center px-10" style={{ background: "rgba(26,24,20,0.6)" }}>
          <div>
            <h1 className="text-3xl font-semibold mb-1" style={{ color: "var(--hw-white)" }}>{category.name}</h1>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>{filtered.length} products</p>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar filters */}
        <aside className="w-56 shrink-0">
          <div className="sticky top-24 space-y-6"
               style={{
                 background: "var(--hw-surface-card)",
                 border: "1px solid var(--hw-surface-3)",
                 borderRadius: 12,
                 padding: 20,
               }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--hw-ink)" }}>
                <SlidersHorizontal size={12} className="inline mr-1" />Filters
              </span>
              {(selectedBrands.length > 0 || minRating > 0 || inStockOnly || minPrice > 0 || maxPrice < 999999) && (
                <button onClick={clearFilters} className="text-xs" style={{ color: "var(--hw-accent)" }}>Clear all</button>
              )}
            </div>

            {/* In stock */}
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => { setInStockOnly(e.target.checked); setPage(1); }}
                  className="rounded"
                />
                <span className="text-sm" style={{ color: "var(--hw-ink)" }}>In Stock Only</span>
              </label>
            </div>

            {/* Price range filter */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--hw-ink-muted)" }}>Price Range</p>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <label className="text-[10px] mb-1 block" style={{ color: "var(--hw-ink-muted)" }}>Min ₹</label>
                  <input
                    type="number"
                    value={minPrice === 0 ? "" : minPrice}
                    placeholder="0"
                    min={0}
                    onChange={(e) => {
                      const v = parseInt(e.target.value, 10);
                      setMinPrice(isNaN(v) ? 0 : v);
                      setPage(1);
                    }}
                    className="w-full px-2 py-1.5 text-xs border rounded-md outline-none"
                    style={{
                      borderColor: "var(--hw-surface-3)",
                      background: "var(--hw-white)",
                      color: "var(--hw-ink)",
                    }}
                  />
                </div>
                <span className="text-xs mt-4" style={{ color: "var(--hw-ink-muted)" }}>–</span>
                <div className="flex-1">
                  <label className="text-[10px] mb-1 block" style={{ color: "var(--hw-ink-muted)" }}>Max ₹</label>
                  <input
                    type="number"
                    value={maxPrice === 999999 ? "" : maxPrice}
                    placeholder="Any"
                    min={0}
                    onChange={(e) => {
                      const v = parseInt(e.target.value, 10);
                      setMaxPrice(isNaN(v) ? 999999 : v);
                      setPage(1);
                    }}
                    className="w-full px-2 py-1.5 text-xs border rounded-md outline-none"
                    style={{
                      borderColor: "var(--hw-surface-3)",
                      background: "var(--hw-white)",
                      color: "var(--hw-ink)",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Rating filter */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--hw-ink-muted)" }}>Rating</p>
              {[4, 3, 0].map((r) => (
                <label key={r} className="flex items-center gap-2 mb-2 cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    checked={minRating === r}
                    onChange={() => { setMinRating(r); setPage(1); }}
                  />
                  <span className="text-sm" style={{ color: "var(--hw-ink)" }}>
                    {r === 0 ? "All ratings" : `${r}★ & above`}
                  </span>
                </label>
              ))}
            </div>

            {/* Brand filter */}
            {brands.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--hw-ink-muted)" }}>Brand</p>
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="rounded"
                    />
                    <span className="text-sm" style={{ color: "var(--hw-ink)" }}>{brand}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Sort bar */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b" style={{ borderColor: "var(--hw-surface-3)" }}>
            <p className="text-sm" style={{ color: "var(--hw-ink-muted)" }}>
              Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} products
            </p>
            <select
              value={sort}
              onChange={(e) => { setSort(e.target.value); setPage(1); }}
              className="text-sm px-3 py-1.5 rounded-md border outline-none"
              style={{
                background: "var(--hw-white)",
                borderColor: "var(--hw-surface-3)",
                color: "var(--hw-ink)",
              }}
            >
              <option value="popularity">Popularity</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          {/* Product grid */}
          {paginated.length === 0 ? (
            <div className="py-24 text-center">
              <p style={{ color: "var(--hw-ink-muted)" }}>No products match your filters.</p>
              <button onClick={clearFilters} className="mt-4 text-sm" style={{ color: "var(--hw-accent)" }}>Clear filters</button>
            </div>
          ) : (
            <motion.div
              key={`${slug}-${page}-${sort}`}
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-8"
            >
              {paginated.map((p) => (
                <motion.div
                  key={p.id}
                  variants={fadeUp}
                  className="group cursor-pointer"
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                >
                  <Link href={`/work/holmesworld/products/${p.slug}`}>
                    {/* Image area — light gray bg, product centred */}
                    <div
                      className="relative rounded-xl overflow-hidden mb-3"
                      style={{
                        background: "#F0EDE8",
                        aspectRatio: "1/1"
                      }}
                    >
                      <Image
                        src={p.images[0]}
                        alt={`${p.name} by ${p.brand}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      {/* Quick view overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                           style={{ background: "rgba(28,25,23,0.45)" }}>
                        <span className="px-4 py-2 rounded-full text-xs font-semibold"
                              style={{ background: "var(--hw-white)", color: "var(--hw-ink)" }}>
                          Quick View
                        </span>
                      </div>
                    </div>
                    {/* Info below image */}
                    <div>
                      <p className="text-xs mb-0.5" style={{ color: "var(--hw-ink-subtle)" }}>
                        {p.brand} · {p.subcategory}
                      </p>
                      <p className="text-sm font-medium mb-1 line-clamp-1" style={{ color: "var(--hw-ink)" }}>
                        {p.name}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold" style={{ color: "var(--hw-ink)" }}>
                          ₹{p.price.toLocaleString("en-IN")}
                          <span className="text-xs font-normal ml-1" style={{ color: "var(--hw-ink-subtle)" }}>/{p.unit}</span>
                        </p>
                        <p className="text-xs" style={{ color: "var(--hw-ink-subtle)" }}>
                          {"★".repeat(Math.floor(p.rating))} {p.rating}
                        </p>
                      </div>
                    </div>
                  </Link>
                  {/* Add to cart — appears on hover */}
                  <button
                    className="w-full mt-2 py-2 text-xs font-semibold rounded-lg border transition-all opacity-0 group-hover:opacity-100"
                    style={{
                      borderColor: "var(--hw-accent)",
                      color: "var(--hw-accent)",
                      background: "transparent"
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch({ type: "ADD_TO_CART", payload: { productId: p.id, quantity: 1, source: "browse" } });
                    }}
                  >
                    Add to Cart
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 text-sm rounded-md border transition-colors disabled:opacity-40"
                style={{ borderColor: "var(--hw-surface-3)", color: "var(--hw-ink)" }}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className="w-8 h-8 text-sm rounded-md border transition-colors"
                  style={{
                    background: p === page ? "var(--hw-ink)" : "transparent",
                    borderColor: p === page ? "var(--hw-ink)" : "var(--hw-surface-3)",
                    color: p === page ? "var(--hw-white)" : "var(--hw-ink)",
                  }}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 text-sm rounded-md border transition-colors disabled:opacity-40"
                style={{ borderColor: "var(--hw-surface-3)", color: "var(--hw-ink)" }}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
