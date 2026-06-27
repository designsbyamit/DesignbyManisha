"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ShoppingCart, Search, Bell, X, ChevronDown, Upload } from "lucide-react";
import { useCartCount } from "@/lib/holmesworld/store";
import { categories } from "@/lib/holmesworld/data/categories";
import { motion, AnimatePresence } from "framer-motion";

export default function HWHeader() {
  const cartCount = useCartCount();
  const pathname = usePathname();
  const isWorkspace = pathname?.includes("/projects");
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setSearchOpen(false);
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      {/* Overlay for mega menu */}
      {megaOpen && (
        <div
          className="fixed inset-0 z-30"
          style={{ background: "rgba(0,0,0,0.2)" }}
          onClick={() => setMegaOpen(false)}
        />
      )}

      <header
        className="sticky top-0 z-40 border-b"
        style={{
          background: "var(--hw-surface)",
          borderColor: "var(--hw-surface-3)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-6">
          {/* Logo */}
          <Link href="/work/holmesworld" className="flex items-center gap-1 shrink-0">
            <span
              className="text-xl tracking-tight"
              style={{ color: "var(--hw-ink)", fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 400 }}
            >
              Homes
            </span>
            <span
              className="text-xl tracking-tight"
              style={{ color: "var(--hw-accent)", fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 400 }}
            >
              World
            </span>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Categories trigger */}
            <div
              className="relative"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
              ref={megaRef}
            >
              <button
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors"
                style={{ color: megaOpen ? "var(--hw-ink)" : "var(--hw-ink-muted)" }}
                aria-expanded={megaOpen}
                aria-haspopup="true"
              >
                Categories <ChevronDown size={14} className={`transition-transform ${megaOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {megaOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute top-full left-0 w-[640px] shadow-xl rounded-lg overflow-hidden border z-50"
                    style={{
                      background: "var(--hw-white)",
                      borderColor: "var(--hw-surface-3)",
                    }}
                  >
                    <div className="flex">
                      {/* Category list */}
                      <div
                        className="w-48 py-2 border-r overflow-y-auto"
                        style={{
                          borderColor: "var(--hw-surface-3)",
                          maxHeight: "400px",
                        }}
                      >
                        {categories.map((cat) => (
                          <button
                            key={cat.id}
                            className="w-full text-left px-4 py-2 text-sm transition-colors"
                            style={{
                              background:
                                activeCategory.id === cat.id
                                  ? "var(--hw-gold-light)"
                                  : "transparent",
                              color:
                                activeCategory.id === cat.id
                                  ? "var(--hw-ink)"
                                  : "var(--hw-ink-muted)",
                            }}
                            onMouseEnter={() => setActiveCategory(cat)}
                            onClick={() => setMegaOpen(false)}
                          >
                            {cat.name}
                          </button>
                        ))}
                      </div>

                      {/* Featured panel */}
                      <div className="flex-1 p-6">
                        <p
                          className="text-xs font-semibold uppercase tracking-widest mb-4"
                          style={{ color: "var(--hw-ink-muted)" }}
                        >
                          {activeCategory.name}
                        </p>
                        <p
                          className="text-sm mb-4"
                          style={{ color: "var(--hw-ink-muted)" }}
                        >
                          {activeCategory.description}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {activeCategory.subcategories.slice(0, 4).map((sub) => (
                            <Link
                              key={sub}
                              href={`/work/holmesworld/categories/${activeCategory.slug}`}
                              className="text-sm px-3 py-2 rounded-md transition-colors"
                              style={{
                                background: "var(--hw-surface)",
                                color: "var(--hw-ink)",
                              }}
                              onClick={() => setMegaOpen(false)}
                            >
                              {sub}
                            </Link>
                          ))}
                        </div>
                        <Link
                          href={`/work/holmesworld/categories/${activeCategory.slug}`}
                          className="inline-flex items-center gap-1 mt-4 text-sm font-medium"
                          style={{ color: "var(--hw-accent)" }}
                          onClick={() => setMegaOpen(false)}
                        >
                          View all {activeCategory.name} →
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/work/holmesworld/projects"
              className="px-3 py-2 text-sm font-medium rounded-md transition-colors"
              style={{ color: isWorkspace ? "var(--hw-ink)" : "var(--hw-ink-muted)" }}
            >
              Projects
            </Link>
            {isWorkspace ? (
              <Link
                href="/work/holmesworld"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1.5"
                style={{
                  color: "var(--hw-accent)",
                  border: "1px solid var(--hw-accent-light)",
                  background: "var(--hw-accent-light)",
                }}
              >
                eStore ↗
              </Link>
            ) : (
              <span
                className="px-3 py-2 text-sm font-medium rounded-md cursor-not-allowed"
                style={{ color: "var(--hw-ink-muted)" }}
                title="Coming soon"
              >
                Experience Centre
              </span>
            )}
          </nav>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Search */}
          <div className="relative">
            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 280, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-8 top-1/2 -translate-y-1/2 overflow-hidden"
                >
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search materials, brands..."
                    className="w-full px-4 py-2 text-sm rounded-l-md border outline-none"
                    style={{
                      background: "var(--hw-surface)",
                      borderColor: "var(--hw-accent)",
                      color: "var(--hw-ink)",
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={() => setSearchOpen((v) => !v)}
              aria-label={searchOpen ? "Close search" : "Open search"}
              className="p-2 rounded-md transition-colors"
              style={{ color: "var(--hw-ink-muted)" }}
            >
              {searchOpen ? <X size={18} /> : <Search size={18} />}
            </button>
          </div>

          {/* Upload BoM — utility CTA in nav */}
          <Link
            href="/work/holmesworld/bom"
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-colors"
            style={{
              background: "var(--hw-accent-light)",
              color: "var(--hw-accent)",
              border: "1px solid var(--hw-accent)",
            }}
          >
            <Upload size={12} /> Upload BoM
          </Link>

          {/* Bell */}
          <button
            aria-label="Notifications"
            className="p-2 rounded-md transition-colors hidden md:block"
            style={{ color: "var(--hw-ink-muted)" }}
          >
            <Bell size={18} />
          </button>

          {/* Cart */}
          <Link
            href="/work/holmesworld/cart"
            aria-label={`Cart — ${cartCount} items`}
            className="relative p-2 rounded-md transition-colors"
            style={{ color: "var(--hw-ink)" }}
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center"
                style={{
                  background: "var(--hw-accent)",
                  color: "var(--hw-white)",
                }}
              >
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </Link>
        </div>
      </header>
    </>
  );
}
