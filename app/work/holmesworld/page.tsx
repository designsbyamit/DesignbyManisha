"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Search, Upload, ChevronRight, CheckCircle2, ArrowRight } from "lucide-react";
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

function ProductCard({ product }: { product: ReturnType<typeof getTrendingProducts>[0] }) {
  const { dispatch } = useStore();
  return (
    <motion.div
      variants={fadeUp}
      className="group rounded-lg overflow-hidden border"
      style={{
        background: "var(--hw-white)",
        borderColor: "var(--hw-surface-3)",
      }}
      whileHover={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
    >
      <Link href={`/work/holmesworld/products/${product.slug}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <Image
            src={product.images[0]}
            alt={`${product.name} by ${product.brand}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        </div>
        <div className="p-4">
          <p className="text-xs font-medium mb-1" style={{ color: "var(--hw-ink-muted)" }}>{product.brand}</p>
          <p className="text-sm font-semibold mb-2 line-clamp-2" style={{ color: "var(--hw-ink)" }}>{product.name}</p>
          <div className="flex items-center gap-1 mb-3">
            <span className="text-xs" style={{ color: "var(--hw-gold)" }}>{"★".repeat(Math.floor(product.rating))}</span>
            <span className="text-xs" style={{ color: "var(--hw-ink-muted)" }}>({product.reviewCount.toLocaleString("en-IN")})</span>
          </div>
          <p className="text-base font-semibold" style={{ color: "var(--hw-gold)" }}>
            ₹{product.price.toLocaleString("en-IN")}
            <span className="text-xs font-normal ml-1" style={{ color: "var(--hw-ink-muted)" }}>/{product.unit}</span>
          </p>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <motion.button
          className="w-full py-2 text-sm font-medium rounded-md transition-colors"
          style={{ background: "var(--hw-ink)", color: "var(--hw-white)" }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => dispatch({ type: "ADD_TO_CART", payload: { productId: product.id, quantity: 1, source: "browse" } })}
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}

const constructionStages = [
  { label: "Foundation", icon: "🏗️", desc: "Cement, Steel, Aggregates" },
  { label: "Structure", icon: "🧱", desc: "Bricks, Blocks, Formwork" },
  { label: "Electrical & Plumbing", icon: "⚡", desc: "Wires, Pipes, Valves" },
  { label: "Interiors", icon: "🪟", desc: "Doors, Windows, False Ceiling" },
  { label: "Finishes", icon: "✨", desc: "Tiles, Paint, Fittings" },
];

export default function HolmesWorldHome() {
  const featured = getFeaturedProducts().slice(0, 3);
  const trending = getTrendingProducts();
  const [activeStage, setActiveStage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      {/* HERO — full-bleed image with mode toggle + search centred */}
      <section className="relative h-[92vh] min-h-[600px] flex items-center justify-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=85"
            alt="Premium home interiors"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: "rgba(18,16,14,0.68)" }} />
        </div>

        {/* Centred content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 w-full max-w-2xl mx-auto px-6 flex flex-col items-center text-center"
        >
          {/* Mode toggle — My Workspace | eStore */}
          <motion.div
            variants={fadeUp}
            className="flex items-center rounded-full p-1 mb-10"
            style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)" }}
          >
            <Link
              href="/work/holmesworld/projects"
              className="px-5 py-2 rounded-full text-sm font-medium transition-all"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              My Workspace
            </Link>
            <span
              className="px-5 py-2 rounded-full text-sm font-semibold"
              style={{ background: "var(--hw-accent)", color: "var(--hw-white)" }}
            >
              eStore
            </span>
          </motion.div>

          {/* Search bar */}
          <motion.div variants={fadeUp} className="relative w-full">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none">
              <Search size={18} style={{ color: "var(--hw-ink-muted)" }} />
            </span>
            <input
              type="text"
              placeholder="Search tiles, cement, fittings, steel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-32 py-5 text-base rounded-full outline-none transition-all"
              style={{
                background: "var(--hw-white)",
                color: "var(--hw-ink)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
                fontSize: "15px",
              }}
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 rounded-full text-sm font-semibold transition-colors"
              style={{ background: "var(--hw-accent)", color: "var(--hw-white)" }}
            >
              Search
            </button>
          </motion.div>

          {/* Category chips */}
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2 mt-5">
            {["Tiles & Flooring", "Bathroom Fittings", "Cement", "Steel TMT", "Paint", "Electrical"].map(tag => (
              <Link
                key={tag}
                href="/work/holmesworld/categories"
                className="px-4 py-1.5 rounded-full text-xs font-medium transition-all"
                style={{
                  background: "rgba(255,255,255,0.14)",
                  color: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                {tag}
              </Link>
            ))}
            <Link
              href="/work/holmesworld/bom"
              className="px-4 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all"
              style={{
                background: "rgba(196,97,58,0.3)",
                color: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(196,97,58,0.5)",
              }}
            >
              <Upload size={11} /> Upload BoM
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-px h-8 mx-auto" style={{ background: "rgba(255,255,255,0.3)" }} />
        </motion.div>
      </section>

      {/* CATEGORIES STRIP */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="border-t mb-10" style={{ borderColor: "var(--hw-surface-3)" }} />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="flex items-baseline justify-between mb-10">
            <h2 className="text-2xl" style={{ color: "var(--hw-ink)", fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 300 }}>Shop by Category</h2>
            <Link href="/work/holmesworld/categories" className="text-sm font-medium flex items-center gap-1" style={{ color: "var(--hw-gold)" }}>
              All categories <ChevronRight size={14} />
            </Link>
          </motion.div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {categories.slice(0, 6).map((cat) => (
              <motion.div key={cat.id} variants={fadeUp}>
                <Link href={`/work/holmesworld/categories/${cat.slug}`}>
                  <motion.div
                    className="rounded-xl overflow-hidden border cursor-pointer"
                    style={{
                      background: "var(--hw-surface-card)",
                      borderColor: "var(--hw-surface-3)"
                    }}
                    whileHover={{ boxShadow: "0 8px 32px rgba(0,0,0,0.10)", y: -2 }}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 33vw, 16vw"
                      />
                    </div>
                    <div className="px-3 py-3">
                      <p className="text-xs font-semibold" style={{ color: "var(--hw-ink)" }}>{cat.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--hw-ink-subtle)" }}>{cat.productCount} products</p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FEATURED COLLECTION */}
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
            <div className="grid grid-cols-3 gap-4">
              {/* Large card */}
              <motion.div variants={fadeUp} className="col-span-2 rounded-lg overflow-hidden relative aspect-[4/3] group">
                <Image
                  src={featured[0]?.images[0] ?? "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"}
                  alt={featured[0]?.name ?? "Featured product"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="60vw"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-8" style={{ background: "linear-gradient(to top, rgba(26,24,20,0.8) 0%, transparent 50%)" }}>
                  <p className="text-xs mb-1" style={{ color: "var(--hw-gold)", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>{featured[0]?.brand}</p>
                  <p className="text-xl font-semibold mb-2" style={{ color: "var(--hw-white)", textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}>{featured[0]?.name}</p>
                  <p className="text-base font-medium mb-4" style={{ color: "var(--hw-gold)", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>₹{featured[0]?.price.toLocaleString("en-IN")}/{featured[0]?.unit}</p>
                  <Link href={`/work/holmesworld/products/${featured[0]?.slug}`} className="self-start text-xs font-semibold px-5 py-2.5 rounded-md" style={{ background: "var(--hw-gold)", color: "var(--hw-white)" }}>
                    View Product
                  </Link>
                </div>
              </motion.div>
              {/* 2 stacked cards */}
              <div className="flex flex-col gap-4">
                {featured.slice(1, 3).map((p) => (
                  <motion.div key={p.id} variants={fadeUp} className="rounded-lg overflow-hidden relative flex-1 group" style={{ minHeight: 0 }}>
                    <div className="relative h-full min-h-[160px]">
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="30vw"
                      />
                      <div className="absolute inset-0 flex flex-col justify-end p-4" style={{ background: "linear-gradient(to top, rgba(26,24,20,0.8) 0%, transparent 50%)" }}>
                        <p className="text-xs font-semibold mb-1" style={{ color: "var(--hw-white)" }}>{p.name}</p>
                        <Link href={`/work/holmesworld/products/${p.slug}`} className="text-xs" style={{ color: "var(--hw-gold)" }}>View →</Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONSTRUCTION STAGES */}
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
          <div className="flex gap-2 overflow-x-auto pb-2">
            {constructionStages.map((stage, i) => (
              <motion.div key={stage.label} variants={fadeUp} className="flex-shrink-0">
                <button
                  onClick={() => setActiveStage(i)}
                  className="px-5 py-4 rounded-lg border text-center min-w-[140px] transition-all cursor-pointer"
                  style={{
                    background: activeStage === i ? "var(--hw-gold-light)" : "var(--hw-white)",
                    borderColor: activeStage === i ? "var(--hw-gold)" : "var(--hw-surface-3)",
                  }}
                >
                  <div className="text-2xl mb-2">{stage.icon}</div>
                  <p className="text-xs font-semibold mb-1" style={{ color: "var(--hw-ink)" }}>{stage.label}</p>
                  <p className="text-xs" style={{ color: "var(--hw-ink-muted)" }}>{stage.desc}</p>
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* TRENDING PRODUCTS */}
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
              <Link href="/work/holmesworld/categories" className="text-sm font-medium flex items-center gap-1" style={{ color: "var(--hw-gold)" }}>
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

      {/* PROMO BANNER */}
      <section style={{ background: "var(--hw-surface-dark)" }}>
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--hw-gold)" }}>
              Limited Time
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl mb-4" style={{ color: "var(--hw-white)", fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 300 }}>
              No Cost EMI on orders above ₹50,000
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>
              Available on HDFC, ICICI, SBI, and Axis cards. Tenures of 3, 6, 9, and 12 months.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                href="/work/holmesworld/categories"
                className="inline-flex items-center gap-2 px-8 py-3 text-sm font-medium rounded-md"
                style={{ background: "var(--hw-gold)", color: "var(--hw-white)" }}
              >
                Shop Now <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* BOM CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="rounded-2xl p-12 flex flex-col md:flex-row items-center justify-between gap-8 border"
          style={{
            background: "var(--hw-gold-light)",
            borderColor: "var(--hw-gold)",
          }}
        >
          <div className="max-w-lg">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--hw-gold)" }}>
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
                  <CheckCircle2 size={15} style={{ color: "var(--hw-gold)", flexShrink: 0 }} />
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
              <Upload size={18} /> Upload BoM
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
