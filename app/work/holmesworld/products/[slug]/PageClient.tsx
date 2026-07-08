"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Plus, Minus, MapPin, RotateCcw, Bookmark } from "lucide-react";
import { getProductBySlug, getTrendingProducts } from "../../../../../lib/holmesworld/data/products";
import { useStore } from "../../../../../lib/holmesworld/store";

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-sm" style={{ color: "var(--hw-gold)" }}>
      {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
    </span>
  );
}

const tabs = ["Technical Specs", "Dimensions", "FAQs"] as const;


export default function PDPPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);
  const { dispatch, state } = useStore();

  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("Technical Specs");
  const [pincode, setPincode] = useState("");
  const [pincodeMsg, setPincodeMsg] = useState("");
  const [added, setAdded] = useState(false);
  const [savedToProject, setSavedToProject] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold mb-4" style={{ color: "var(--hw-ink)" }}>Product not found</h1>
        <Link href="/work/holmesworld/categories" className="text-sm" style={{ color: "var(--hw-gold)" }}>← Browse categories</Link>
      </div>
    );
  }

  const relatedProducts = getTrendingProducts().filter((p) => p.id !== product.id).slice(0, 4);
  const recentlyViewedProducts = state.recentlyViewed
    .filter((id) => id !== product.id)
    .slice(0, 4)
    .map((id) => getTrendingProducts().find((p) => p.id === id))
    .filter(Boolean) as typeof relatedProducts;

  function addToCart() {
    dispatch({ type: "ADD_TO_CART", payload: { productId: product!.id, quantity: qty, source: "browse" } });
    dispatch({ type: "ADD_TO_RECENTLY_VIEWED", payload: { productId: product!.id } });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function addToProject() {
    dispatch({ type: "ADD_TO_CART", payload: { productId: product!.id, quantity: qty, source: "browse" } });
    setSavedToProject(true);
    setTimeout(() => setSavedToProject(false), 2000);
  }

  function checkPincode() {
    if (pincode.length === 6) {
      const metros = ["110", "400", "560", "600", "500", "700"];
      const isMetro = metros.some((p) => pincode.startsWith(p));
      setPincodeMsg(isMetro
        ? `Delivery in ${product!.deliveryDays}–${product!.deliveryDays + 1} days`
        : `Delivery in ${product!.deliveryDays + 4}–${product!.deliveryDays + 6} days`);
    } else {
      setPincodeMsg("Enter a valid 6-digit PIN code");
    }
  }

  const applicableBulk = product.bulkPricing
    .filter((b) => qty >= b.minQty)
    .sort((a, b) => b.minQty - a.minQty)[0];
  const effectivePrice = applicableBulk ? applicableBulk.price : product.price;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs mb-8" style={{ color: "var(--hw-ink-muted)" }}>
        <Link href="/work/holmesworld">Home</Link>
        <ChevronRight size={12} />
        <Link href="/work/holmesworld/categories">Categories</Link>
        <ChevronRight size={12} />
        <Link href={`/work/holmesworld/categories/${product.category}`}>{product.category}</Link>
        <ChevronRight size={12} />
        <span style={{ color: "var(--hw-ink)" }}>{product.name}</span>
      </nav>

      {/* Main product section */}
      <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 mb-20">
        {/* LEFT: Images */}
        <div>
          <div className="relative aspect-square rounded-xl overflow-hidden mb-4" style={{ background: "var(--hw-surface-2)" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0"
              >
                <Image
                  src={product.images[activeImage] ?? product.images[0]}
                  alt={`${product.name} — view ${activeImage + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className="relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors"
                  style={{ borderColor: i === activeImage ? "var(--hw-gold)" : "var(--hw-surface-3)" }}
                >
                  <Image src={img} alt={`Thumbnail ${i + 1}`} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Details */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--hw-ink-muted)" }}>{product.brand}</p>
          <h1 className="text-2xl mb-3 leading-snug" style={{ color: "var(--hw-ink)", fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 400 }}>{product.name}</h1>

          <div className="flex items-center gap-3 mb-4">
            <StarRating rating={product.rating} />
            <span className="text-sm" style={{ color: "var(--hw-ink-muted)" }}>
              {product.rating.toFixed(1)} ({product.reviewCount.toLocaleString("en-IN")} reviews)
            </span>
          </div>

          <p className="text-xs mb-6" style={{ color: "var(--hw-ink-muted)" }}>SKU: {product.id.toUpperCase()}</p>

          {/* Price */}
          <div className="mb-6 p-4 rounded-lg" style={{ background: "var(--hw-surface-2)" }}>
            <p className="text-3xl font-semibold mb-1" style={{ color: "var(--hw-gold)" }}>
              ₹{effectivePrice.toLocaleString("en-IN")}
              <span className="text-base font-normal ml-1" style={{ color: "var(--hw-ink-muted)" }}>/{product.unit}</span>
            </p>
            {applicableBulk && (
              <p className="text-xs" style={{ color: "var(--hw-green)" }}>
                Bulk price applied (₹{product.price - applicableBulk.price} savings per {product.unit})
              </p>
            )}
            {product.bulkPricing.length > 0 && (
              <div className="mt-3 border-t pt-3" style={{ borderColor: "var(--hw-surface-3)" }}>
                <p className="text-xs font-semibold mb-2" style={{ color: "var(--hw-ink-muted)" }}>BULK PRICING</p>
                <table className="w-full text-xs">
                  <thead>
                    <tr>
                      <th className="text-left py-1.5 px-2 font-semibold" style={{ color: "var(--hw-ink-muted)", background: "var(--hw-surface-3)" }}>Quantity</th>
                      <th className="text-left py-1.5 px-2 font-semibold" style={{ color: "var(--hw-ink-muted)", background: "var(--hw-surface-3)" }}>Price per unit</th>
                      <th className="text-left py-1.5 px-2 font-semibold" style={{ color: "var(--hw-ink-muted)", background: "var(--hw-surface-3)" }}>You save</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.bulkPricing.map((b, i) => (
                      <tr key={b.minQty} style={{ background: i % 2 === 0 ? "var(--hw-surface)" : "var(--hw-surface-2)" }}>
                        <td className="py-1.5 px-2" style={{ color: "var(--hw-ink)" }}>{b.minQty}+ {product.unit}</td>
                        <td className="py-1.5 px-2 font-semibold" style={{ color: "var(--hw-ink)" }}>₹{b.price}</td>
                        <td className="py-1.5 px-2" style={{ color: "var(--hw-green)" }}>₹{product.price - b.price}/{product.unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <p className="text-sm font-medium" style={{ color: "var(--hw-ink)" }}>Quantity</p>
            <div className="flex items-center border rounded-md overflow-hidden" style={{ borderColor: "var(--hw-surface-3)" }}>
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-8 h-8 flex items-center justify-center"
                style={{ color: "var(--hw-ink)" }}
              >
                <Minus size={14} />
              </button>
              <span className="w-12 text-center text-sm font-medium" style={{ color: "var(--hw-ink)" }}>{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-8 h-8 flex items-center justify-center"
                style={{ color: "var(--hw-ink)" }}
              >
                <Plus size={14} />
              </button>
            </div>
            <span className="text-sm" style={{ color: "var(--hw-ink-muted)" }}>
              Total: ₹{(effectivePrice * qty).toLocaleString("en-IN")}
            </span>
          </div>

          {/* PIN check */}
          <div className="mb-6">
            <p className="text-sm font-medium mb-2" style={{ color: "var(--hw-ink)" }}>
              <MapPin size={14} className="inline mr-1" />Check delivery
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="Enter PIN code"
                className="flex-1 px-3 py-2 text-sm border rounded-md outline-none"
                style={{
                  borderColor: "var(--hw-surface-3)",
                  background: "var(--hw-white)",
                  color: "var(--hw-ink)",
                }}
              />
              <button
                onClick={checkPincode}
                className="px-4 py-2 text-sm font-medium rounded-md"
                style={{ background: "var(--hw-ink)", color: "var(--hw-white)" }}
              >
                Check
              </button>
            </div>
            {pincodeMsg && (
              <p className="text-xs mt-2" style={{ color: pincodeMsg.includes("valid") ? "var(--hw-amber)" : "var(--hw-green)" }}>
                {pincodeMsg}
              </p>
            )}
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3 mb-6">
            <button
              onClick={addToCart}
              className="w-full py-3 text-sm font-semibold rounded-md transition-all duration-200"
              style={{
                background: added ? "var(--hw-green)" : "var(--hw-ink)",
                color: "var(--hw-white)",
              }}
            >
              {added ? "✓ Added to Cart" : "Add to Cart"}
            </button>
            <button
              onClick={addToProject}
              className="w-full py-3 text-sm font-medium rounded-md border transition-all duration-200"
              style={{
                borderColor: savedToProject ? "var(--hw-green)" : "var(--hw-ink)",
                color: savedToProject ? "var(--hw-green)" : "var(--hw-ink)",
                background: "transparent",
              }}
            >
              <Bookmark size={14} className="inline mr-1" />
              {savedToProject ? "✓ Saved to Project" : "Add to Project"}
            </button>
          </div>

          {/* Returns */}
          <div className="flex items-start gap-2 text-xs" style={{ color: "var(--hw-ink-muted)" }}>
            <RotateCcw size={12} className="mt-0.5 shrink-0" />
            <span>7-day returns for unused items in original packaging. Shipping charges may apply.</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-20">
        <div className="flex border-b mb-6" style={{ borderColor: "var(--hw-surface-3)" }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-6 py-3 text-sm font-medium border-b-2 transition-colors -mb-px"
              style={{
                borderBottomColor: activeTab === tab ? "var(--hw-gold)" : "transparent",
                color: activeTab === tab ? "var(--hw-ink)" : "var(--hw-ink-muted)",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            {activeTab === "Technical Specs" && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div
                    key={key}
                    className="p-4 rounded-lg border-l-4"
                    style={{
                      background: "var(--hw-surface-2)",
                      borderLeftColor: "var(--hw-gold)",
                    }}
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--hw-ink-muted)" }}>{key}</p>
                    <p className="text-sm font-medium" style={{ color: "var(--hw-ink)" }}>{value}</p>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "Dimensions" && (
              <div className="p-6 rounded-lg" style={{ background: "var(--hw-surface-2)" }}>
                <p className="text-sm" style={{ color: "var(--hw-ink-muted)" }}>
                  Please refer to Technical Specs for dimension information. Installation drawings available on request.
                </p>
              </div>
            )}
            {activeTab === "FAQs" && (
              <div className="space-y-4">
                {[
                  { q: `What is the minimum order quantity for ${product.name}?`, a: `Minimum order is 1 ${product.unit}. Bulk pricing applies from ${product.bulkPricing[0]?.minQty ?? "higher quantities"}.` },
                  { q: "Is professional installation available?", a: "Yes, we partner with certified installers in metro cities. Add installation during checkout." },
                  { q: "What is the return policy?", a: "Unused items in original packaging can be returned within 7 days. Raise a request via Orders." },
                ].map(({ q, a }) => (
                  <div key={q} className="p-5 rounded-lg border" style={{ background: "var(--hw-white)", borderColor: "var(--hw-surface-3)" }}>
                    <p className="text-sm font-semibold mb-2" style={{ color: "var(--hw-ink)" }}>{q}</p>
                    <p className="text-sm" style={{ color: "var(--hw-ink-muted)" }}>{a}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Related products */}
      <div className="mb-20">
        <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--hw-ink)" }}>Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {relatedProducts.map((p) => (
            <Link key={p.id} href={`/work/holmesworld/products/${p.slug}`}>
              <div className="group rounded-lg overflow-hidden border" style={{ background: "var(--hw-white)", borderColor: "var(--hw-surface-3)" }}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={p.images[0]} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="25vw" />
                </div>
                <div className="p-3">
                  <p className="text-xs mb-0.5" style={{ color: "var(--hw-ink-muted)" }}>{p.brand}</p>
                  <p className="text-xs font-semibold line-clamp-2 mb-1" style={{ color: "var(--hw-ink)" }}>{p.name}</p>
                  <p className="text-sm font-semibold" style={{ color: "var(--hw-gold)" }}>₹{p.price.toLocaleString("en-IN")}/{p.unit}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recently viewed */}
      {recentlyViewedProducts.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--hw-ink)" }}>Recently Viewed</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {recentlyViewedProducts.map((p) => (
              <Link key={p.id} href={`/work/holmesworld/products/${p.slug}`}>
                <div className="group rounded-lg overflow-hidden border" style={{ background: "var(--hw-white)", borderColor: "var(--hw-surface-3)" }}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={p.images[0]} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="25vw" />
                  </div>
                  <div className="p-3">
                    <p className="text-xs mb-0.5" style={{ color: "var(--hw-ink-muted)" }}>{p.brand}</p>
                    <p className="text-xs font-semibold line-clamp-2" style={{ color: "var(--hw-ink)" }}>{p.name}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
