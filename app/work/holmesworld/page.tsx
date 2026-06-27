"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Search, ChevronRight, CheckCircle2, ArrowRight } from "lucide-react";
import { categories } from "@/lib/holmesworld/data/categories";
import { getTrendingProducts, getFeaturedProducts } from "@/lib/holmesworld/data/products";
import { useStore } from "@/lib/holmesworld/store";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ── verified construction-relevant Unsplash IDs ── */
const CATEGORY_IMAGES: Record<string, string> = {
  "tiles":          "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=600&q=80",
  "bathroom":       "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&q=80",
  "steel":          "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=600&q=80",
  "electrical":     "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&q=80",
  "paint":          "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&q=80",
  "cement":         "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
};

/* ── editorial images for "Curated" section — distinct from categories ── */
const CURATED_IMAGES = [
  "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=900&q=85",  // premium shower tile wall
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=85",     // kitchen tile floor
  "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&q=85",  // wood-look living room floor
];

const constructionStages = [
  { label: "Foundation",      icon: "🏗️", desc: "Cement, TMT Steel, Aggregates, Waterproofing" },
  { label: "Structural Work", icon: "🧱", desc: "Bricks, Blocks, Columns, Beams" },
  { label: "Masonry",         icon: "🪨", desc: "Mortar, Plaster, Dry-wall, Cladding" },
  { label: "Electrical",      icon: "⚡", desc: "Wires, Switches, Panels, MCBs" },
  { label: "Plumbing",        icon: "🚿", desc: "CPVC Pipes, Faucets, Tanks, Valves" },
  { label: "Flooring",        icon: "🪵", desc: "Tiles, Marble, Wood, Vinyl, Epoxy" },
  { label: "Finishing",       icon: "🎨", desc: "Paints, Putty, Primers, Texture" },
  { label: "Interiors",       icon: "🛋️", desc: "Doors, Windows, False Ceiling, Lighting" },
];

function ProductCard({ product }: { product: ReturnType<typeof getTrendingProducts>[0] }) {
  const { dispatch } = useStore();
  return (
    <motion.div
      variants={fadeUp}
      className="group rounded-xl overflow-hidden"
      style={{ background: "var(--hw-surface-card)", border: "1px solid var(--hw-surface-3)" }}
      whileHover={{ boxShadow: "0 8px 32px rgba(0,0,0,0.09)", y: -3 }}
      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
    >
      <Link href={`/work/holmesworld/products/${product.slug}`}>
        <div className="relative aspect-[4/3] overflow-hidden" style={{ background: "#F0EDE8" }}>
          <Image
            src={product.images[0]}
            alt={`${product.name} by ${product.brand}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
        <div className="p-4">
          <p className="text-xs mb-1" style={{ color: "var(--hw-ink-subtle)" }}>{product.brand}</p>
          {/* Single line — truncated with ellipsis */}
          <p className="text-sm font-semibold mb-2 truncate" style={{ color: "var(--hw-ink)" }}>{product.name}</p>
          <div className="flex items-center gap-1 mb-3">
            <span className="text-xs" style={{ color: "var(--hw-gold)" }}>{"★".repeat(Math.floor(product.rating))}</span>
            <span className="text-xs" style={{ color: "var(--hw-ink-subtle)" }}>({product.reviewCount.toLocaleString("en-IN")})</span>
          </div>
          <p className="text-base font-semibold" style={{ color: "var(--hw-ink)" }}>
            ₹{product.price.toLocaleString("en-IN")}
            <span className="text-xs font-normal ml-1" style={{ color: "var(--hw-ink-subtle)" }}>/{product.unit}</span>
          </p>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <motion.button
          className="w-full py-2 text-xs font-semibold rounded-lg border transition-all opacity-0 group-hover:opacity-100"
          style={{ borderColor: "var(--hw-accent)", color: "var(--hw-accent)", background: "transparent" }}
          whileHover={{ background: "var(--hw-accent)", color: "var(--hw-white)" } as never}
          whileTap={{ scale: 0.98 }}
          onClick={() => dispatch({ type: "ADD_TO_CART", payload: { productId: product.id, quantity: 1, source: "browse" } })}
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function HolmesWorldHome() {
  const featured = getFeaturedProducts().slice(0, 3);
  const trending = getTrendingProducts();
  const [activeStage, setActiveStage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      {/* ── HERO ── full-bleed, fixed height, categories straddle bottom edge */}
      <section className="relative" style={{ height: "88vh", minHeight: "600px" }}>
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=85"
            alt="Premium home interiors"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(18,16,14,0.70) 0%, rgba(18,16,14,0.50) 50%, rgba(18,16,14,0.75) 100%)" }} />
        </div>

        {/* Hero text + search — centred */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="w-full max-w-2xl flex flex-col items-center text-center"
          >
            <motion.h1
              variants={fadeUp}
              className="mb-8 tracking-tight leading-none"
              style={{
                color: "var(--hw-white)",
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontWeight: 300,
                fontSize: "clamp(2.6rem, 6vw, 4.5rem)",
              }}
            >
              Build Better.<br />Live Better.
            </motion.h1>

            <motion.div variants={fadeUp} className="relative w-full">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none">
                <Search size={18} style={{ color: "var(--hw-ink-muted)" }} />
              </span>
              <input
                type="text"
                placeholder="Search tiles, cement, fittings, steel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-32 py-5 rounded-full outline-none transition-all"
                style={{
                  background: "var(--hw-white)",
                  color: "var(--hw-ink)",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
                  fontSize: "15px",
                }}
              />
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 rounded-full text-sm font-semibold"
                style={{ background: "var(--hw-accent)", color: "var(--hw-white)" }}
              >
                Search
              </button>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2 mt-5">
              {["Tiles & Flooring", "Bathroom Fittings", "Cement", "Steel TMT", "Paint", "Electrical"].map(tag => (
                <Link
                  key={tag}
                  href="/work/holmesworld/categories"
                  className="px-4 py-1.5 rounded-full text-xs font-medium transition-all"
                  style={{
                    background: "rgba(255,255,255,0.13)",
                    color: "rgba(255,255,255,0.85)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  {tag}
                </Link>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CATEGORY CARDS ── straddle hero/content boundary */}
      <section style={{ background: "var(--hw-surface)", paddingTop: "0", paddingBottom: "4rem", marginTop: "-120px", position: "relative", zIndex: 20 }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <div className="flex items-baseline justify-between mb-4 px-1">
              <p style={{ color: "rgba(255,255,255,0.8)", letterSpacing: "0.08em", textTransform: "uppercase", fontSize: "11px", fontWeight: 600 }}>
                Shop by Category
              </p>
              <Link href="/work/holmesworld/categories" className="text-xs font-medium flex items-center gap-1" style={{ color: "rgba(255,255,255,0.7)" }}>
                All <ChevronRight size={12} />
              </Link>
            </div>
            <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(6, 1fr)" }}>
              {categories.slice(0, 6).map((cat, i) => {
                const overrideImg = Object.entries(CATEGORY_IMAGES).find(([k]) => cat.slug.includes(k))?.[1];
                return (
                  <motion.div key={cat.id} variants={fadeUp}>
                    <Link href={`/work/holmesworld/categories/${cat.slug}`}>
                      <motion.div
                        className="rounded-xl overflow-hidden cursor-pointer"
                        style={{
                          background: "var(--hw-surface-card)",
                          border: "1px solid var(--hw-surface-3)",
                          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                        }}
                        whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(0,0,0,0.22)" }}
                        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                      >
                        {/* Image — square */}
                        <div className="relative overflow-hidden" style={{ aspectRatio: "1/1" }}>
                          <Image
                            src={overrideImg ?? cat.image}
                            alt={cat.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="16vw"
                          />
                        </div>
                        {/* Label */}
                        <div className="px-3 py-3">
                          <p className="text-xs font-semibold truncate" style={{ color: "var(--hw-ink)" }}>{cat.name}</p>
                          <p className="text-xs mt-0.5" style={{ color: "var(--hw-ink-subtle)" }}>{cat.productCount} products</p>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CURATED FOR YOUR HOME ── editorial, distinct imagery */}
      <section style={{ background: "var(--hw-surface-2)" }}>
        <div className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp} className="text-2xl mb-10" style={{ color: "var(--hw-ink)", fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 300 }}>
              Curated for Your Home
            </motion.h2>
            <div className="grid grid-cols-3 gap-4" style={{ gridTemplateRows: "340px" }}>
              {/* Large editorial card */}
              <motion.div variants={fadeUp} className="col-span-2 rounded-xl overflow-hidden relative group cursor-pointer">
                <Image
                  src={CURATED_IMAGES[0]}
                  alt="Premium bathroom tile wall"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="60vw"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-8" style={{ background: "linear-gradient(to top, rgba(18,16,14,0.8) 0%, transparent 55%)" }}>
                  <p className="text-xs mb-1 font-semibold uppercase tracking-widest" style={{ color: "var(--hw-gold)" }}>Bathroom</p>
                  <p className="text-xl mb-3" style={{ color: "var(--hw-white)", fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 300 }}>Premium Shower Tile Systems</p>
                  <Link href="/work/holmesworld/categories/bathroom-fittings" className="self-start text-xs font-semibold px-5 py-2.5 rounded-md" style={{ background: "var(--hw-accent)", color: "var(--hw-white)" }}>
                    Explore
                  </Link>
                </div>
              </motion.div>
              {/* Two stacked cards */}
              <div className="flex flex-col gap-4">
                {CURATED_IMAGES.slice(1).map((img, i) => (
                  <motion.div key={i} variants={fadeUp} className="rounded-xl overflow-hidden relative flex-1 group cursor-pointer">
                    <Image
                      src={img}
                      alt={i === 0 ? "Kitchen tile flooring" : "Living room wood-look floor"}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="30vw"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-4" style={{ background: "linear-gradient(to top, rgba(18,16,14,0.75) 0%, transparent 55%)" }}>
                      <p className="text-xs font-semibold mb-1" style={{ color: "var(--hw-white)" }}>{i === 0 ? "Kitchen Tile Floors" : "Wood-Look Flooring"}</p>
                      <Link href="/work/holmesworld/categories/tiles" className="text-xs" style={{ color: "var(--hw-gold)" }}>View →</Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SHOP BY STAGE ── full-width immersive cards */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.h2 variants={fadeUp} className="text-2xl mb-10 text-center" style={{ color: "var(--hw-ink)", fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 300 }}>
            Shop by Stage
          </motion.h2>
          <div className="grid grid-cols-3 gap-3">
            {constructionStages.map((stage, i) => (
              <motion.div key={stage.label} variants={fadeUp}>
                <button
                  onClick={() => setActiveStage(i)}
                  className="w-full text-left px-5 py-5 rounded-xl border transition-all"
                  style={{
                    background: activeStage === i ? "var(--hw-accent-light)" : "var(--hw-surface-card)",
                    borderColor: activeStage === i ? "var(--hw-accent)" : "var(--hw-surface-3)",
                    display: "grid",
                    gridTemplateColumns: "2rem 1fr auto",
                    alignItems: "center",
                    gap: "0.875rem",
                  }}
                >
                  <span className="text-lg">{stage.icon}</span>
                  <span>
                    <p className="text-sm font-semibold" style={{ color: activeStage === i ? "var(--hw-accent)" : "var(--hw-ink)" }}>{stage.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--hw-ink-subtle)" }}>{stage.desc}</p>
                  </span>
                  <ChevronRight size={16} style={{ color: activeStage === i ? "var(--hw-accent)" : "var(--hw-surface-3)", transition: "transform 0.2s", transform: activeStage === i ? "translateX(4px)" : "none" }} />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── TRENDING PRODUCTS ── */}
      <section style={{ background: "var(--hw-surface-2)" }}>
        <div className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="flex items-baseline justify-between mb-10">
              <h2 className="text-2xl" style={{ color: "var(--hw-ink)", fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 300 }}>Trending Products</h2>
              <Link href="/work/holmesworld/categories" className="text-sm font-medium flex items-center gap-1" style={{ color: "var(--hw-accent)" }}>
                View all <ChevronRight size={14} />
              </Link>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {trending.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PROMO BANNER ── */}
      <section style={{ background: "var(--hw-surface-dark)" }}>
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--hw-accent)" }}>
              Limited Time
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl mb-4" style={{ color: "var(--hw-white)", fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 300 }}>
              No Cost EMI on orders above ₹50,000
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
              Available on HDFC, ICICI, SBI, and Axis cards. Tenures of 3, 6, 9, and 12 months.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                href="/work/holmesworld/categories"
                className="inline-flex items-center gap-2 px-8 py-3 text-sm font-medium rounded-md"
                style={{ background: "var(--hw-accent)", color: "var(--hw-white)" }}
              >
                Shop Now <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── BOM CTA ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="rounded-2xl p-12 flex flex-col md:flex-row items-center justify-between gap-8 border"
          style={{ background: "var(--hw-accent-light)", borderColor: "var(--hw-accent)" }}
        >
          <div className="max-w-lg">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--hw-accent)" }}>
              Smart Procurement
            </p>
            <h2 className="text-3xl mb-4" style={{ color: "var(--hw-ink)", fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 400 }}>
              Have a Bill of Materials?
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: "var(--hw-ink-muted)" }}>
              Upload your architect&apos;s list and we&apos;ll find everything in minutes. Matched, priced, and ready to order.
            </p>
            <ul className="flex flex-col gap-2">
              {[
                "Matches 95%+ of standard BoM items",
                "Instant price estimates",
                "One-click add all to cart",
              ].map((feat) => (
                <li key={feat} className="flex items-center gap-2">
                  <CheckCircle2 size={15} style={{ color: "var(--hw-accent)", flexShrink: 0 }} />
                  <span className="text-sm" style={{ color: "var(--hw-ink-muted)" }}>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="shrink-0">
            <Link
              href="/work/holmesworld/bom"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold rounded-md"
              style={{ background: "var(--hw-ink)", color: "var(--hw-white)" }}
            >
              Upload BoM
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── NEXT PROJECT ─────────────────────────────────────────────────── */}
      <NextProject />
    </div>
  );
}

function NextProject() {
  const [hovered, setHovered] = useState(false);
  return (
    <section style={{ background: "var(--hw-surface-dark)", padding: "100px 0 60px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1.5rem,5vw,48px)" }}>
        <p style={{ textAlign: "center", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", marginBottom: 40 }}>
          Next Case Study
        </p>

        <Link href="/work/cognicure" style={{ textDecoration: "none", display: "block" }}>
          <motion.div
            onMouseEnter={() => hovered || setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            animate={{ y: hovered ? -4 : 0, boxShadow: hovered ? "0 40px 80px rgba(0,0,0,0.4)" : "0 20px 40px rgba(0,0,0,0.2)" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              background: "#1a1a22",
              borderRadius: 28,
              border: `1px solid ${hovered ? "rgba(27,58,92,0.6)" : "rgba(255,255,255,0.06)"}`,
              padding: "56px 64px",
              display: "grid",
              gridTemplateColumns: "1fr 300px",
              gap: 64,
              alignItems: "center",
              cursor: "pointer",
              transition: "border-color 0.25s ease",
            }}
          >
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#4F9CF9", marginBottom: 16 }}>
                Healthcare · Mobile App
              </p>
              <h3 style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.03em", color: "#ffffff", lineHeight: 1.2, marginBottom: 28 }}>
                Designing healthcare continuity<br />for patients navigating<br />complex journeys
              </h3>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#4F9CF9", fontSize: 14, fontWeight: 600 }}>
                View case study <ChevronRight size={14} />
              </div>
            </div>
            <div style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16, height: 200,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{ width: 60, height: 60, borderRadius: 14, background: "rgba(27,58,92,0.3)", border: "1px solid rgba(79,156,249,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 22 }}>🏥</span>
              </div>
            </div>
          </motion.div>
        </Link>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 80, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.35)", fontSize: 13, fontWeight: 500, textDecoration: "none" }}>
            ← Back to all work
          </Link>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.18)", margin: 0 }}>© 2025 Manisha. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
}
