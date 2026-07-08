"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { PortfolioNav } from "@/components/PortfolioNav";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Home,
  Users,
  HardHat,
  Building2,
  Package,
  Truck,
  Layers,
  Search,
  Upload,
  ShoppingCart,
  MapPin,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────
   PALETTE
───────────────────────────────────────────────────────────────────────── */
const P = {
  stone:     "#F5F3F0",
  stone2:    "#EDEBE7",
  stone3:    "#DDD9D4",
  charcoal:  "#1C1917",
  ink:       "#2C2420",
  muted:     "#6B6560",
  subtle:    "#9D9691",
  terracotta:"#C4613A",
  terracottaL:"#F5E8E2",
  cream:     "#FAF8F5",
  white:     "#FFFFFF",
  sand:      "#D4C5A9",
  moss:      "#4A5E4A",
} as const;

/* ─────────────────────────────────────────────────────────────────────────
   TYPOGRAPHY HELPERS
───────────────────────────────────────────────────────────────────────── */
const serif = { fontFamily: "var(--font-display), Georgia, serif" };
const hand  = { fontFamily: "var(--font-handwritten), cursive" };
const sans  = { fontFamily: "var(--font-jakarta), system-ui, sans-serif" };

/* ─────────────────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] } },
};
const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const slideLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};
const slideRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

/* ─────────────────────────────────────────────────────────────────────────
   SECTION WRAPPER — scroll-triggered
───────────────────────────────────────────────────────────────────────── */
function Section({
  children,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
      style={style}
    >
      {children}
    </motion.section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   LABEL — small overline label
───────────────────────────────────────────────────────────────────────── */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      variants={fadeUp}
      style={{
        ...sans,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: P.terracotta,
        marginBottom: 16,
      }}
    >
      {children}
    </motion.p>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   MOCK SCREENS — hero composition
───────────────────────────────────────────────────────────────────────── */
function CementJourneyDemo({ TP }: { TP: Record<string, string> }) {
  // Stages: 0=homepage idle, 1=typing, 2=plp, 3=added-to-cart
  const [stage, setStage] = useState(0);
  const [typed, setTyped] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [addedIndex, setAddedIndex] = useState<number | null>(null);
  const [cursorY, setCursorY] = useState(0);
  const fullWord = "cement";

  // Master timeline
  useEffect(() => {
    let timeouts: ReturnType<typeof setTimeout>[] = [];

    function schedule(fn: () => void, delay: number) {
      timeouts.push(setTimeout(fn, delay));
    }

    // Phase 1: type "cement" — one char every 120ms starting at 1s
    fullWord.split("").forEach((_, i) => {
      schedule(() => {
        setTyped(fullWord.slice(0, i + 1));
        setStage(1);
      }, 1000 + i * 120);
    });

    // Phase 2: pause, then transition to PLP
    schedule(() => setStage(2), 1000 + fullWord.length * 120 + 700);

    // Phase 3: cursor drifts down the list (simulated via cursorY)
    schedule(() => setCursorY(60),  1000 + fullWord.length * 120 + 1200);
    schedule(() => setCursorY(120), 1000 + fullWord.length * 120 + 1700);
    schedule(() => setCursorY(180), 1000 + fullWord.length * 120 + 2200);

    // Phase 4: click "Add to Cart" on first item
    schedule(() => setAddedIndex(0), 1000 + fullWord.length * 120 + 2800);
    schedule(() => { setCartCount(1); setStage(3); }, 1000 + fullWord.length * 120 + 3100);

    // Reset and loop
    const loopDelay = 1000 + fullWord.length * 120 + 5000;
    schedule(() => {
      setStage(0); setTyped(""); setCartCount(0); setAddedIndex(null); setCursorY(0);
    }, loopDelay);

    return () => timeouts.forEach(clearTimeout);
  }, [stage === 0 ? stage : -1]); // re-run on reset

  const cementProducts = [
    { brand: "UltraTech Cement", name: "OPC 53 Grade Cement", price: "₹410", unit: "bag", rating: 4.8, img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=80&q=80" },
    { brand: "JK Cement", name: "PPC Blended Cement", price: "₹390", unit: "bag", rating: 4.6, img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=80&q=80" },
    { brand: "ACC Cement", name: "Gold PPC Premium", price: "₹405", unit: "bag", rating: 4.7, img: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=80&q=80" },
    { brand: "Ambuja Cement", name: "Plus Composite Cement", price: "₹395", unit: "bag", rating: 4.5, img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=80&q=80" },
  ];

  const iPad = { width: 520, height: 680 };

  return (
    <div style={{ position: "relative" }}>
      {/* iPad frame */}
      <div style={{
        width: iPad.width,
        height: iPad.height + 60,
        background: "#1C1917",
        borderRadius: 28,
        padding: "20px 14px 16px",
        boxShadow: "0 40px 100px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.06)",
        position: "relative",
      }}>
        {/* Camera */}
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#2a2724", margin: "0 auto 10px", display: "block" }} />

        {/* Screen */}
        <div style={{
          width: "100%",
          height: iPad.height,
          borderRadius: 14,
          overflow: "hidden",
          background: TP.stone,
          position: "relative",
        }}>
          <AnimatePresence mode="wait">
            {(stage === 0 || stage === 1) ? (
              /* ── SCREEN 1: Homepage ── */
              <motion.div
                key="home"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35 }}
                style={{ height: "100%", display: "flex", flexDirection: "column" }}
              >
                {/* Mini nav */}
                <div style={{ padding: "10px 16px", borderBottom: `1px solid ${TP.stone3}`, display: "flex", alignItems: "center", justifyContent: "space-between", background: TP.stone }}>
                  <span style={{ ...serif, color: TP.ink, fontSize: 14 }}>Homes<span style={{ color: P.terracotta }}>World</span></span>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    {["Categories", "Projects"].map(n => <span key={n} style={{ ...sans, fontSize: 10, color: TP.muted }}>{n}</span>)}
                    {/* Cart with badge */}
                    <div style={{ position: "relative" }}>
                      <div style={{ width: 24, height: 24, borderRadius: "50%", background: TP.stone2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>🛒</div>
                      <AnimatePresence>
                        {cartCount > 0 && (
                          <motion.div
                            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                            style={{ position: "absolute", top: -4, right: -4, width: 14, height: 14, borderRadius: "50%", background: P.terracotta, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ ...sans, fontSize: 8, color: TP.white, fontWeight: 700 }}>{cartCount}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Hero area — real image bg with gradient overlay */}
                <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
                  {/* bg image */}
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=75"
                    alt=""
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "rgba(18,16,14,0.65)" }} />
                  {/* content */}
                  <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "0 32px" }}>
                  <p style={{ ...serif, color: TP.white, fontSize: 26, lineHeight: 1.2, textAlign: "center", marginBottom: 28, fontWeight: 300 }}>
                    Build Better.<br />Live Better.
                  </p>

                  {/* Animated search bar */}
                  <div style={{ width: "100%", position: "relative" }}>
                    <div style={{
                      background: TP.white,
                      borderRadius: 99,
                      padding: "10px 16px",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      boxShadow: stage === 1 ? `0 0 0 3px ${P.terracotta}40` : "0 6px 24px rgba(0,0,0,0.3)",
                      transition: "box-shadow 0.3s",
                    }}>
                      <span style={{ fontSize: 13, color: TP.muted }}>🔍</span>
                      <span style={{ ...sans, fontSize: 13, color: typed ? P.ink : TP.muted, flex: 1 }}>
                        {typed || "Search tiles, cement, fittings..."}
                        {/* Blinking cursor */}
                        {stage === 1 && (
                          <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            style={{ display: "inline-block", width: 1.5, height: 13, background: TP.ink, marginLeft: 1, verticalAlign: "middle" }}
                          />
                        )}
                      </span>
                      <motion.div
                        animate={stage === 1 && typed === fullWord ? { scale: [1, 0.95, 1] } : {}}
                        transition={{ duration: 0.2 }}
                        style={{ background: P.terracotta, borderRadius: 99, padding: "5px 14px", flexShrink: 0 }}
                      >
                        <span style={{ ...sans, fontSize: 11, color: TP.white, fontWeight: 600 }}>Search</span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Category chips */}
                  <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap", justifyContent: "center" }}>
                    {["Tiles & Flooring", "Bathroom Fittings", "Cement", "Steel TMT"].map((t) => (
                      <motion.span
                        key={t}
                        animate={t === "Cement" && stage === 1 ? { background: "rgba(196,97,58,0.25)", borderColor: P.terracotta } : {}}
                        style={{
                          ...sans, fontSize: 10,
                          color: "rgba(255,255,255,0.7)",
                          background: "rgba(255,255,255,0.1)",
                          border: "1px solid rgba(255,255,255,0.15)",
                          borderRadius: 99, padding: "4px 12px",
                          transition: "all 0.3s",
                        }}
                      >{t}</motion.span>
                    ))}
                  </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* ── SCREEN 2: Cement PLP ── */
              <motion.div
                key="plp"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                style={{ height: "100%", display: "flex", flexDirection: "column", background: TP.stone }}
              >
                {/* Nav */}
                <div style={{ padding: "10px 16px", borderBottom: `1px solid ${TP.stone3}`, display: "flex", alignItems: "center", justifyContent: "space-between", background: TP.cream }}>
                  <span style={{ ...serif, color: TP.ink, fontSize: 14 }}>Homes<span style={{ color: P.terracotta }}>World</span></span>
                  <div style={{ background: TP.stone2, borderRadius: 99, padding: "5px 12px", display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 11, color: TP.muted }}>🔍</span>
                    <span style={{ ...sans, fontSize: 11, color: TP.ink, fontWeight: 500 }}>cement</span>
                  </div>
                  {/* Cart */}
                  <div style={{ position: "relative" }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: TP.stone2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>🛒</div>
                    <AnimatePresence>
                      {cartCount > 0 && (
                        <motion.div
                          initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                          style={{ position: "absolute", top: -4, right: -4, width: 14, height: 14, borderRadius: "50%", background: P.terracotta, display: "flex", alignItems: "center", justifyContent: "center" }}
                        >
                          <span style={{ ...sans, fontSize: 8, color: TP.white, fontWeight: 700 }}>{cartCount}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* PLP header */}
                <div style={{ padding: "12px 16px 8px", background: TP.cream, borderBottom: `1px solid ${TP.stone3}` }}>
                  <p style={{ ...sans, fontSize: 11, color: TP.muted, marginBottom: 2 }}>Home / Categories /</p>
                  <p style={{ ...serif, fontSize: 18, color: TP.ink }}>Cement & Concrete</p>
                  <p style={{ ...sans, fontSize: 10, color: TP.subtle }}>4 products</p>
                </div>

                {/* Product list */}
                <div style={{ flex: 1, overflowY: "auto", padding: "10px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
                  {cementProducts.map((p, i) => {
                    const isHovered = cursorY > i * 60 && cursorY <= (i + 1) * 60;
                    const isAdded = addedIndex === i;
                    return (
                      <motion.div
                        key={p.name}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        style={{
                          background: isHovered ? P.terracottaL : TP.cream,
                          border: `1px solid ${isHovered ? P.terracotta : P.stone3}`,
                          borderRadius: 12,
                          padding: "10px 12px",
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          transition: "all 0.25s ease",
                        }}
                      >
                        {/* Product image */}
                        <div style={{ width: 44, height: 44, borderRadius: 8, background: TP.stone2, flexShrink: 0, overflow: "hidden" }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ ...sans, fontSize: 9, color: TP.muted, marginBottom: 1 }}>{p.brand}</p>
                          <p style={{ ...sans, fontSize: 12, fontWeight: 600, color: TP.ink, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</p>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <p style={{ ...sans, fontSize: 13, fontWeight: 700, color: TP.ink }}>{p.price}</p>
                            <span style={{ ...sans, fontSize: 9, color: TP.muted }}>/ {p.unit}</span>
                            <span style={{ ...sans, fontSize: 9, color: P.terracotta }}>★ {p.rating}</span>
                          </div>
                        </div>
                        {/* Add to Cart button */}
                        <motion.button
                          animate={isAdded ? { scale: [1, 0.88, 1.1, 1], background: [P.terracotta, "#2D6A4F"] } : isHovered ? { scale: 1.04 } : { scale: 1 }}
                          transition={{ duration: 0.35 }}
                          style={{
                            background: isAdded ? "#2D6A4F" : P.terracotta,
                            color: TP.white,
                            border: "none",
                            borderRadius: 8,
                            padding: "7px 12px",
                            ...sans,
                            fontSize: 10,
                            fontWeight: 600,
                            cursor: "pointer",
                            flexShrink: 0,
                            whiteSpace: "nowrap",
                            transition: "background 0.3s",
                          }}
                        >
                          {isAdded ? "✓ Added" : "+ Cart"}
                        </motion.button>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Animated cursor dot */}
          <AnimatePresence>
            {stage >= 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, y: cursorY }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ type: "spring", stiffness: 280, damping: 26 }}
                style={{
                  position: "absolute",
                  right: 32,
                  top: 130,
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: P.terracotta,
                  boxShadow: `0 0 0 4px ${P.terracottaL}`,
                  pointerEvents: "none",
                  zIndex: 20,
                }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Home indicator bar */}
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 10 }}>
          <div style={{ width: 80, height: 4, borderRadius: 99, background: "rgba(255,255,255,0.2)" }} />
        </div>
      </div>

      {/* Stage label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          style={{ textAlign: "center", marginTop: 16 }}
        >
          <span style={{
            ...sans, fontSize: 11, fontWeight: 600,
            color: P.terracotta,
            background: P.terracottaL,
            padding: "4px 14px",
            borderRadius: 99,
            letterSpacing: "0.06em",
          }}>
            {stage === 0 ? "Homepage" : stage === 1 ? `Typing "cement"…` : stage === 2 ? "Browsing results" : "Added to cart ✓"}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   ECOSYSTEM NODE
───────────────────────────────────────────────────────────────────────── */
function EcosystemNode({
  icon: Icon,
  label,
  desc,
  color,
  delay = 0,
}: {
  icon: React.ElementType;
  label: string;
  desc: string;
  color: string;
  delay?: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      transition={{ delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "default" }}
    >
      <motion.div
        animate={{ scale: hovered ? 1.1 : 1, boxShadow: hovered ? `0 12px 32px ${color}40` : "0 4px 12px rgba(0,0,0,0.06)" }}
        transition={{ duration: 0.25 }}
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: hovered ? color : P.cream,
          border: `2px solid ${hovered ? color : P.stone3}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 8,
        }}
      >
        <Icon size={22} color={hovered ? P.white : color} />
      </motion.div>
      <p style={{ ...sans, fontSize: 12, fontWeight: 600, color: P.ink, textAlign: "center", marginBottom: 2 }}>{label}</p>
      <AnimatePresence>
        {hovered && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{ ...sans, fontSize: 10, color: P.muted, textAlign: "center", maxWidth: 80 }}
          >
            {desc}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   OPPORTUNITY ROW
───────────────────────────────────────────────────────────────────────── */
function OpportunityRow({
  reality,
  pain,
  opportunity,
  delay = 0,
}: {
  reality: string;
  pain: string;
  opportunity: string;
  delay?: number;
}) {
  return (
    <motion.div variants={fadeUp} transition={{ delay }} style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr auto 1fr", gap: 0, alignItems: "center" }}>
      <div style={{ background: P.stone2, borderRadius: 10, padding: "16px 20px" }}>
        <p style={{ ...sans, fontSize: 13, color: P.muted, marginBottom: 4, fontWeight: 500 }}>{reality}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 16px" }}>
        <div style={{ width: 1, height: 32, background: P.stone3 }} />
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: P.terracotta }} />
        <div style={{ width: 1, height: 32, background: P.stone3 }} />
      </div>
      <div style={{ background: "#FEF3EC", borderRadius: 10, padding: "16px 20px", border: `1px solid #F5D5C0` }}>
        <p style={{ ...sans, fontSize: 13, color: "#8B3A1E", marginBottom: 4, fontWeight: 500 }}>{pain}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 16px" }}>
        <div style={{ width: 1, height: 32, background: P.stone3 }} />
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: P.moss }} />
        <div style={{ width: 1, height: 32, background: P.stone3 }} />
      </div>
      <div style={{ background: "#EEF4EE", borderRadius: 10, padding: "16px 20px", border: `1px solid #C4D9C4` }}>
        <p style={{ ...sans, fontSize: 13, color: "#2D5A2D", marginBottom: 4, fontWeight: 600 }}>{opportunity}</p>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   PERSONA CARD
───────────────────────────────────────────────────────────────────────── */
function PersonaCard({
  role,
  quote,
  motivation,
  frustration,
  color,
  bg,
  emoji,
}: {
  role: string;
  quote: string;
  motivation: string;
  frustration: string;
  color: string;
  bg: string;
  emoji: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6, boxShadow: `0 20px 48px ${color}20` }}
      transition={{ duration: 0.25 }}
      style={{
        background: P.cream,
        border: `1px solid ${P.stone3}`,
        borderRadius: 16,
        padding: "28px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div style={{ width: 48, height: 48, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
        {emoji}
      </div>
      <div>
        <p style={{ ...sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color, marginBottom: 6 }}>{role}</p>
        <p style={{ ...serif, fontSize: 15, color: P.ink, lineHeight: 1.5, fontStyle: "italic" }}>&ldquo;{quote}&rdquo;</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ background: bg, borderRadius: 8, padding: "10px 14px" }}>
          <p style={{ ...sans, fontSize: 10, fontWeight: 600, color, marginBottom: 3, letterSpacing: "0.06em", textTransform: "uppercase" }}>Motivated by</p>
          <p style={{ ...sans, fontSize: 12, color: P.ink }}>{motivation}</p>
        </div>
        <div style={{ background: "#FEF3EC", borderRadius: 8, padding: "10px 14px" }}>
          <p style={{ ...sans, fontSize: 10, fontWeight: 600, color: "#8B3A1E", marginBottom: 3, letterSpacing: "0.06em", textTransform: "uppercase" }}>Frustrated by</p>
          <p style={{ ...sans, fontSize: 12, color: P.ink }}>{frustration}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   JOURNEY STEP
───────────────────────────────────────────────────────────────────────── */
function JourneyStep({
  step,
  label,
  desc,
  active,
}: {
  step: number;
  label: string;
  desc: string;
  active: boolean;
}) {
  return (
    <motion.div
      animate={{ opacity: active ? 1 : 0.4, scale: active ? 1 : 0.95 }}
      transition={{ duration: 0.4 }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "0 0 auto", width: 120 }}
    >
      <div style={{
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: active ? P.terracotta : P.stone2,
        border: `2px solid ${active ? P.terracotta : P.stone3}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
        ...sans,
        fontSize: 14,
        fontWeight: 700,
        color: active ? P.white : P.muted,
      }}>
        {step}
      </div>
      <p style={{ ...sans, fontSize: 12, fontWeight: 600, color: active ? P.ink : P.muted, textAlign: "center", marginBottom: 4 }}>{label}</p>
      <p style={{ ...sans, fontSize: 10, color: P.subtle, textAlign: "center", lineHeight: 1.4 }}>{desc}</p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   DESIGN DECISION CARD
───────────────────────────────────────────────────────────────────────── */
function DecisionCard({
  number,
  title,
  rationale,
  preview,
}: {
  number: string;
  title: string;
  rationale: string;
  preview: React.ReactNode;
}) {
  return (
    <motion.div
      variants={fadeUp}
      style={{
        background: P.cream,
        border: `1px solid ${P.stone3}`,
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "32px 36px 28px" }}>
        <p style={{ ...hand, fontSize: 40, color: P.stone3, lineHeight: 1, marginBottom: 8 }}>{number}</p>
        <h3 style={{ ...serif, fontSize: 22, color: P.ink, marginBottom: 12, lineHeight: 1.3 }}>{title}</h3>
        <p style={{ ...sans, fontSize: 14, color: P.muted, lineHeight: 1.7 }}>{rationale}</p>
      </div>
      <div style={{ background: P.stone2, minHeight: 180, padding: "24px 36px" }}>
        {preview}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   IMPACT STAT
───────────────────────────────────────────────────────────────────────── */
function ImpactStat({
  label,
  arrow,
  outcome,
  color = P.terracotta,
}: {
  label: string;
  arrow: string;
  outcome: string;
  color?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 6,
        padding: "24px 28px",
        background: P.cream,
        border: `1px solid ${P.stone3}`,
        borderRadius: 14,
      }}
    >
      <p style={{ ...sans, fontSize: 13, color: P.muted }}>{label}</p>
      <p style={{ ...serif, fontSize: 28, color, lineHeight: 1 }}>{arrow}</p>
      <p style={{ ...sans, fontSize: 14, fontWeight: 600, color: P.ink }}>{outcome}</p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────────────────── */
export default function HomesWorldCaseStudy() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Dark mode overrides — swap stone palette to dark equivalents
  const theme = isDark ? {
    stone:      "#141210",
    stone2:     "#1c1917",
    stone3:     "#2a2520",
    charcoal:   "#f0ede8",
    ink:        "#f0ede8",
    muted:      "#a09a90",
    subtle:     "#6b6460",
    cream:      "#1c1917",
    white:      "#1c1917",
    sand:       "#2a2520",
  } : {
    stone:      P.stone,
    stone2:     P.stone2,
    stone3:     P.stone3,
    charcoal:   P.charcoal,
    ink:        P.ink,
    muted:      P.muted,
    subtle:     P.subtle,
    cream:      P.cream,
    white:      P.white,
    sand:       P.sand,
  };

  // Merge theme overrides into P for this render
  const TP = { ...P, ...theme };

  const [activeJourneyStep, setActiveJourneyStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActiveJourneyStep(s => (s + 1) % 9), 1800);
    return () => clearInterval(t);
  }, []);

  const journeySteps = [
    { label: "Dream Home",    desc: "Vision forms" },
    { label: "Find Architect", desc: "Trusted expert" },
    { label: "Design Plan",   desc: "Layouts & specs" },
    { label: "Bill of Materials", desc: "Material list" },
    { label: "Marketplace",   desc: "Discover & compare" },
    { label: "Purchase",      desc: "Add to project" },
    { label: "Delivery",      desc: "Track & receive" },
    { label: "Construction",  desc: "Build begins" },
    { label: "Completion",    desc: "Dream realised" },
  ];

  return (
    <div style={{ background: TP.stone, minHeight: "100vh", color: TP.ink, overflowX: "hidden" }}>

      {/* ── NAV ─────────────────────────────────────────────── */}
      <PortfolioNav />

      {/* ── HERO ────────────────────────────────────────────── */}
      <div ref={heroRef} style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "120px 48px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>

            {/* Left — text */}
            <div>
              <motion.div variants={fadeUp} style={{ marginBottom: 20 }}>
                <span style={{
                  ...sans,
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: P.terracotta,
                  background: P.terracottaL,
                  padding: "4px 12px",
                  borderRadius: 99,
                }}>
                  Consumer Marketplace · Service Design
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                style={{
                  ...serif,
                  fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
                  lineHeight: 1.1,
                  color: TP.ink,
                  marginBottom: 28,
                  }}
              >
                Designing the place where dream homes begin.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                style={{ ...sans, fontSize: 16, lineHeight: 1.75, color: TP.muted, marginBottom: 36, maxWidth: 480 }}
              >
                Building a house involves thousands of decisions — materials, budgets, timelines, contractors, suppliers. The process is fragmented across WhatsApp messages, spreadsheets, and trips to showrooms. HomesWorld was designed to unify all of it: one place where homeowners, architects, and contractors collaborate on every material choice from foundation to fittings.
              </motion.p>

              {/* Meta strip */}
              <motion.div
                variants={stagger}
                style={{ display: "flex", gap: 32, flexWrap: "wrap" }}
              >
                {[
                  { label: "Role", value: "UX Designer" },
                  { label: "Industry", value: "Construction Tech" },
                  { label: "Platform", value: "Responsive Web" },
                  { label: "Domain", value: "Marketplace" },
                ].map(({ label, value }) => (
                  <motion.div key={label} variants={fadeUp}>
                    <p style={{ ...sans, fontSize: 10, color: TP.subtle, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>{label}</p>
                    <p style={{ ...sans, fontSize: 14, color: TP.ink, fontWeight: 600 }}>{value}</p>
                  </motion.div>
                ))}
              </motion.div>

            </div>

            {/* Right — animated UI */}
            <motion.div variants={scaleIn} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <CementJourneyDemo TP={TP} />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── PROJECT CONTEXT ─────────────────────────────────── */}
      <div style={{ background: TP.stone }}>
        <Section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 48px" }}>
          <div style={{ maxWidth: 720 }}>
            <Label>Project Context</Label>
            <motion.h2
              variants={fadeUp}
              style={{ ...serif, fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: TP.ink, lineHeight: 1.25, marginBottom: 24 }}
            >
              A house is never just a purchase. It's a relationship between a dozen people making thousands of decisions over eighteen months.
            </motion.h2>
            <motion.p variants={fadeUp} style={{ ...sans, fontSize: 16, color: TP.muted, lineHeight: 1.8, marginBottom: 16 }}>
              I came onto this project at its earliest stage — a group of businessmen wanted to build an e-commerce platform for construction materials. On the surface it sounded like a catalogue problem. After two days of workshops on-site with homeowners, architects, and contractors, it became clear this was a coordination problem. The platform needed to serve as the connective tissue between all the people involved in building a home.
            </motion.p>
            <motion.p variants={fadeUp} style={{ ...sans, fontSize: 16, color: TP.muted, lineHeight: 1.8 }}>
              The design challenge was not just information architecture. It was service design — mapping an ecosystem of stakeholders with different mental models, different workflows, and different definitions of success, then creating a digital experience that felt natural to all of them.
            </motion.p>
          </div>
        </Section>
      </div>

      {/* ── ECOSYSTEM VISUALIZATION ─────────────────────────── */}
      <Section style={{ background: TP.cream, padding: "80px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <Label>Understanding the Ecosystem</Label>
            <motion.h2
              variants={fadeUp}
              style={{ ...serif, fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: TP.ink, lineHeight: 1.25, marginBottom: 16 }}
            >
              Six stakeholders.<br />One construction project.
            </motion.h2>
            <motion.p variants={fadeUp} style={{ ...sans, fontSize: 15, color: TP.muted, maxWidth: 560, margin: "0 auto" }}>
              Every node in this system has different needs, different technical comfort, and different reasons to use the platform. Hover to explore each role.
            </motion.p>
          </div>

          {/* Ecosystem diagram */}
          <motion.div
            variants={stagger}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, flexWrap: "wrap" }}
          >
            {[
              { icon: Home, label: "Home Owner", desc: "Needs guidance through overwhelming choices. Dreams come first.", color: P.terracotta },
              { icon: Building2, label: "Architect", desc: "Specifies materials. Needs precision, BOQ uploads, project workspace.", color: "#4A6FA5" },
              { icon: Layers, label: "Marketplace", desc: "The platform. Matches needs to products, coordinates across stakeholders.", color: P.moss },
              { icon: HardHat, label: "Contractor", desc: "Bulk purchases. Needs speed, availability, project-level ordering.", color: "#8B6914" },
              { icon: Package, label: "Supplier", desc: "Fulfils orders. Needs clear specifications and delivery windows.", color: "#5A4A8A" },
              { icon: Truck, label: "Logistics", desc: "Last-mile delivery to construction sites. Needs precise addresses, timings.", color: "#3A7A5A" },
            ].map((node, i) => (
              <React.Fragment key={node.label}>
                <EcosystemNode {...node} delay={i * 0.08} />
                {i < 5 && (
                  <motion.div variants={fadeIn} style={{ display: "flex", alignItems: "center", padding: "0 8px", marginBottom: 32 }}>
                    <div style={{ width: 24, height: 1, background: TP.stone3 }} />
                    <ChevronRight size={12} color={TP.stone3} />
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </motion.div>

          {/* Ecosystem insight */}
          <motion.div
            variants={fadeUp}
            style={{
              marginTop: 48,
              background: TP.charcoal,
              borderRadius: 16,
              padding: "28px 36px",
              display: "flex",
              gap: 24,
              alignItems: "flex-start",
            }}
          >
            <span style={{ fontSize: 32, flexShrink: 0 }}>💡</span>
            <div>
              <p style={{ ...sans, fontSize: 13, fontWeight: 600, color: P.terracotta, marginBottom: 6, letterSpacing: "0.06em", textTransform: "uppercase" }}>Key Insight from Ecosystem Mapping</p>
              <p style={{ ...sans, fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>
                The home owner only interacts with the marketplace at the very beginning and very end. The architect and contractor are the power users. Designing for homeowners without designing for professionals would have created a beautiful but incomplete system.
              </p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ── STAKEHOLDER WORKSHOP ────────────────────────────── */}
      <Section style={{ padding: "80px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Label>Stakeholder Workshop</Label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
            <div>
              <motion.h2
                variants={fadeUp}
                style={{ ...serif, fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: TP.ink, lineHeight: 1.25, marginBottom: 24 }}
              >
                This project started in a room with sticky notes, not in Figma.
              </motion.h2>
              <motion.p variants={fadeUp} style={{ ...sans, fontSize: 15, color: TP.muted, lineHeight: 1.8, marginBottom: 16 }}>
                I travelled to the client's location and ran a two-day workshop with business stakeholders, a homeowner, an architect, and two contractors. The goal was not to validate a solution — we didn't have one yet. The goal was to understand the real shape of the problem.
              </motion.p>
              <motion.p variants={fadeUp} style={{ ...sans, fontSize: 15, color: TP.muted, lineHeight: 1.8, marginBottom: 32 }}>
                Day one focused on mapping existing workflows and pain points across each stakeholder group. Day two focused on business model viability, distribution strategy, and what a useful digital platform would actually need to do.
              </motion.p>

              {/* Workshop goals */}
              <motion.div variants={stagger} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  "Understand how materials are currently sourced",
                  "Identify friction between stakeholder handoffs",
                  "Validate which stakeholder to design for first",
                  "Map the business opportunity clearly",
                ].map((goal, i) => (
                  <motion.div key={i} variants={fadeUp} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: P.terracotta, marginTop: 6, flexShrink: 0 }} />
                    <p style={{ ...sans, fontSize: 14, color: TP.ink }}>{goal}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Workshop artifacts wall */}
            <motion.div variants={slideRight}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { bg: "#FFF9C4", rot: -2, label: "Users don't know\nbrand names, only\ncategory names" },
                  { bg: "#C8E6C9", rot: 1.5, label: "Architects need\nproject-level\npurchase tracking" },
                  { bg: "#FFCCBC", rot: -1, label: "WhatsApp is the\ncurrent procurement\nplatform" },
                  { bg: "#B3E5FC", rot: 2.5, label: "BoM upload = the\nbiggest time-saver\nfor architects" },
                  { bg: "#E1BEE7", rot: -1.5, label: "Trust = the biggest\nbarrier to first\npurchase" },
                  { bg: "#FFF9C4", rot: 1, label: "Delivery to site\nis genuinely hard.\nNeeds scheduling." },
                ].map(({ bg, rot, label }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, rotate: rot * 2, scale: 0.9 }}
                    whileInView={{ opacity: 1, rotate: rot, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                    style={{
                      background: bg,
                      borderRadius: 4,
                      padding: "16px 14px",
                      boxShadow: "0 3px 12px rgba(0,0,0,0.12)",
                      cursor: "default",
                      position: "relative",
                    }}
                  >
                    <div style={{ width: 20, height: 20, background: "rgba(0,0,0,0.06)", borderRadius: "50%", marginBottom: 8 }} />
                    <p style={{ ...hand, fontSize: 13, color: TP.charcoal, lineHeight: 1.5, whiteSpace: "pre-line" }}>{label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ── OPPORTUNITY MAPPING ─────────────────────────────── */}
      <Section style={{ background: TP.cream, padding: "80px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <Label>Opportunity Mapping</Label>
            <motion.h2
              variants={fadeUp}
              style={{ ...serif, fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: TP.ink, lineHeight: 1.25 }}
            >
              Every pain point is a design opportunity waiting.
            </motion.h2>
          </div>

          {/* Column headers */}
          <motion.div variants={fadeIn} style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr auto 1fr", gap: 0, marginBottom: 20 }}>
            {["Current Reality", "", "Pain Point", "", "Design Opportunity"].map((h, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                {h && <p style={{ ...sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: i === 4 ? P.moss : i === 2 ? "#8B3A1E" : TP.muted }}>{h}</p>}
              </div>
            ))}
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <OpportunityRow reality="Finding trusted materials" pain="Too many disconnected vendors and showrooms" opportunity="Unified marketplace with verified brands" delay={0} />
            <OpportunityRow reality="Architect–client communication" pain="Phone calls, WhatsApp, missed messages" opportunity="Shared project workspace" delay={0.05} />
            <OpportunityRow reality="Material estimation" pain="Manual Excel calculations, errors" opportunity="BoM Upload → instant matching" delay={0.1} />
            <OpportunityRow reality="Order tracking" pain="No visibility after purchase" opportunity="Live delivery tracking per project" delay={0.15} />
            <OpportunityRow reality="Budget management" pain="Scattered invoices and guesses" opportunity="Project budget dashboard" delay={0.2} />
          </div>
        </div>
      </Section>

      {/* ── PERSONAS ────────────────────────────────────────── */}
      <Section style={{ padding: "80px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 48 }}>
            <Label>The People We Designed For</Label>
            <motion.h2
              variants={fadeUp}
              style={{ ...serif, fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: TP.ink, lineHeight: 1.25, marginBottom: 16 }}
            >
              Four stakeholders.<br />Completely different needs.
            </motion.h2>
            <motion.p variants={fadeUp} style={{ ...sans, fontSize: 15, color: TP.muted, maxWidth: 560 }}>
              Each persona shaped a distinct journey. Designing for one without the others would have broken the ecosystem.
            </motion.p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            <PersonaCard
              role="House Owner"
              quote="I just want someone to tell me what to buy and where to get it."
              motivation="A beautiful, well-built home that reflects their vision"
              frustration="Overwhelmed by product choices, mistrustful of vendors"
              color={P.terracotta}
              bg={P.terracottaL}
              emoji="🏠"
            />
            <PersonaCard
              role="Architect"
              quote="I spend 30% of my time chasing material approvals. That's time I should be designing."
              motivation="Precision, client alignment, and project delivery on schedule"
              frustration="Repetitive procurement work, no single source of truth"
              color="#4A6FA5"
              bg="#EBF0F8"
              emoji="📐"
            />
            <PersonaCard
              role="Contractor"
              quote="I need to order 500 bags of cement before Thursday. Just show me the price and confirm delivery."
              motivation="Efficiency, bulk pricing, reliable delivery to site"
              frustration="Minimum order complexity, unclear delivery timelines"
              color="#8B6914"
              bg="#FEF4DC"
              emoji="🔨"
            />
            <PersonaCard
              role="Business Owner"
              quote="We need a platform that grows with the ecosystem, not one that only works for one type of user."
              motivation="Scalable marketplace with high repeat purchase rate"
              frustration="Fragmented supply chain, low digital adoption in the industry"
              color={P.moss}
              bg="#EEF4EE"
              emoji="💼"
            />
          </div>
        </div>
      </Section>

      {/* ── JOURNEY MAP ─────────────────────────────────────── */}
      <Section style={{ background: TP.charcoal, padding: "80px 48px", overflow: "hidden" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Label>The Homeowner's Journey</Label>
          <motion.h2
            variants={fadeUp}
            style={{ ...serif, fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: TP.white, lineHeight: 1.25, marginBottom: 12 }}
          >
            From a dream to a delivered home.
          </motion.h2>
          <motion.p variants={fadeUp} style={{ ...sans, fontSize: 15, color: "rgba(255,255,255,0.5)", marginBottom: 52, maxWidth: 560 }}>
            HomesWorld touches eight of the nine stages below. Every design decision was anchored to this journey.
          </motion.p>

          {/* Journey stepper — horizontal scroll */}
          <div style={{ overflowX: "auto", paddingBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 0, minWidth: "max-content" }}>
              {journeySteps.map((step, i) => (
                <React.Fragment key={step.label}>
                  <JourneyStep
                    step={i + 1}
                    label={step.label}
                    desc={step.desc}
                    active={activeJourneyStep === i}
                  />
                  {i < journeySteps.length - 1 && (
                    <div style={{ display: "flex", alignItems: "center", paddingTop: 20, paddingBottom: 40, padding: "22px 0 0 0" }}>
                      <motion.div
                        animate={{ scaleX: activeJourneyStep > i ? 1 : 0.3, opacity: activeJourneyStep > i ? 1 : 0.2 }}
                        style={{ width: 32, height: 2, background: P.terracotta, transformOrigin: "left", transition: "all 0.4s ease" }}
                      />
                      <ChevronRight size={12} color={activeJourneyStep > i ? P.terracotta : "rgba(255,255,255,0.15)"} />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Active step detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeJourneyStep}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              style={{
                marginTop: 32,
                background: "rgba(255,255,255,0.06)",
                borderRadius: 14,
                padding: "24px 32px",
                display: "flex",
                gap: 20,
                alignItems: "center",
              }}
            >
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: P.terracotta, display: "flex", alignItems: "center", justifyContent: "center", ...sans, fontSize: 16, fontWeight: 700, color: TP.white, flexShrink: 0 }}>
                {activeJourneyStep + 1}
              </div>
              <div>
                <p style={{ ...serif, fontSize: 18, color: TP.white, marginBottom: 4 }}>{journeySteps[activeJourneyStep].label}</p>
                <p style={{ ...sans, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
                  {[
                    "The family has a vision. They've saved for years. Now they need to find the right people and products to make it real.",
                    "The architect becomes the guide — defining scope, budget, and the material language of the house.",
                    "Floor plans take shape. Every room gets its material specification. The BoM begins to form.",
                    "The architect exports the full Bill of Materials — hundreds of line items across every category.",
                    "HomesWorld maps the BoM to the catalogue. Every item matched, priced, and ready for review.",
                    "Items are approved and added to the project. The contractor receives a shared purchase list.",
                    "Orders are tracked in real time. The family can see exactly what's arriving and when.",
                    "Construction begins with materials arriving as scheduled. No delays from procurement.",
                    "The house is complete. The family moves in. The platform logs were the paper trail the whole way.",
                  ][activeJourneyStep]}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Section>

      {/* ── INFORMATION ARCHITECTURE ────────────────────────── */}
      <Section style={{ padding: "80px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Label>Information Architecture</Label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
            <div>
              <motion.h2
                variants={fadeUp}
                style={{ ...serif, fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: TP.ink, lineHeight: 1.25, marginBottom: 24 }}
              >
                One platform.<br />Two mental models.
              </motion.h2>
              <motion.p variants={fadeUp} style={{ ...sans, fontSize: 15, color: TP.muted, lineHeight: 1.8, marginBottom: 20 }}>
                The eStore and the Project Workspace are two distinct contexts. A homeowner browsing tiles has a completely different mental model to an architect uploading a 200-item BoM. The IA had to hold both without making either feel like they were in the wrong place.
              </motion.p>
              <motion.p variants={fadeUp} style={{ ...sans, fontSize: 15, color: TP.muted, lineHeight: 1.8 }}>
                The key structural decision was to use the user's role — detected on login — to surface the appropriate context. An architect who logs in lands in the Project Workspace. A homeowner lands in the eStore with guided discovery.
              </motion.p>
            </div>

            {/* IA tree */}
            <motion.div variants={slideRight}>
              <div style={{ background: TP.cream, borderRadius: 16, padding: "28px 28px", border: `1px solid ${TP.stone3}` }}>
                <p style={{ ...sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: TP.muted, marginBottom: 20 }}>Marketplace Architecture</p>
                {[
                  { label: "homesworld.in", level: 0, color: P.terracotta },
                  { label: "eStore", level: 1, color: TP.ink },
                  { label: "Categories → Products → PDP", level: 2, color: TP.muted },
                  { label: "Search + Filters + Compare", level: 2, color: TP.muted },
                  { label: "Cart → Checkout → Orders", level: 2, color: TP.muted },
                  { label: "BoM Upload → Recommendations", level: 2, color: TP.muted },
                  { label: "Project Workspace", level: 1, color: "#4A6FA5" },
                  { label: "Dashboard → Active Projects", level: 2, color: TP.muted },
                  { label: "BOQ Management", level: 2, color: TP.muted },
                  { label: "Clients + Contractors", level: 2, color: TP.muted },
                  { label: "Material Status", level: 2, color: TP.muted },
                ].map(({ label, level, color }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      paddingLeft: level * 20,
                      marginBottom: 8,
                    }}
                  >
                    {level > 0 && <div style={{ width: 12, height: 1, background: TP.stone3, flexShrink: 0 }} />}
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: color, flexShrink: 0 }} />
                    <p style={{ ...sans, fontSize: 13, color: level === 0 ? color : level === 1 ? color : TP.muted, fontWeight: level < 2 ? 600 : 400 }}>{label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ── THREE DESIGN DECISIONS ──────────────────────────── */}
      <Section style={{ background: TP.cream, padding: "80px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <Label>Designing the Marketplace</Label>
            <motion.h2
              variants={fadeUp}
              style={{ ...serif, fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: TP.ink, lineHeight: 1.25 }}
            >
              Three decisions that shaped the experience.
            </motion.h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <DecisionCard
              number="01"
              title="Shopping by Construction Stage, not Product Category"
              rationale="Users don't think in SKUs. A homeowner who needs to waterproof their foundation doesn't know they're looking for 'polymer-modified bitumen.' They know they're at the Foundation stage of building. Navigation that mirrors the construction journey — Foundation, Structure, Electrical, Flooring, Finishes — reduces the cognitive gap between where they are and what they need."
              preview={
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {["🏗️ Foundation", "🧱 Structure", "⚡ Electrical", "🚿 Plumbing", "🪵 Flooring", "🎨 Finishing"].map((stage, i) => (
                    <div key={i} style={{ background: i === 0 ? P.terracottaL : TP.stone, border: `1px solid ${i === 0 ? P.terracotta : TP.stone3}`, borderRadius: 10, padding: "10px 16px", display: "flex", alignItems: "center", gap: 8 }}>
                      <p style={{ ...sans, fontSize: 13, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? P.terracotta : TP.muted }}>{stage}</p>
                    </div>
                  ))}
                </div>
              }
            />

            <DecisionCard
              number="02"
              title="Bill of Materials Upload — the Flagship Feature"
              rationale="An architect who specifies 340 items across 22 categories should never have to search for each one manually. BoM Upload converts a spreadsheet or PDF into a fully matched, priced, ready-to-order cart in under a minute. This was the feature that justified the platform for professionals. Everything else was table stakes. This was the reason to switch."
              preview={
                <div style={{ display: "flex", gap: 0, flexDirection: "column" }}>
                  {[
                    { item: "Vitrified tiles 800×800 marble finish", status: "matched", product: "Kajaria White Marble — ₹185/sqft" },
                    { item: "TMT bars 12mm Fe-500D", status: "matched", product: "Tata Tiscon 12mm — ₹64/kg" },
                    { item: "OPC 53 Grade Cement", status: "matched", product: "UltraTech OPC 53 — ₹410/bag" },
                    { item: "Overhead shower chrome premium", status: "review", product: "Suggest alternative →" },
                  ].map(({ item, status, product }, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "10px 0", borderBottom: i < 3 ? `1px solid ${TP.stone3}` : "none" }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: status === "matched" ? P.moss : P.terracotta, flexShrink: 0 }} />
                      <p style={{ ...sans, fontSize: 12, color: TP.muted, flex: 1 }}>{item}</p>
                      <p style={{ ...sans, fontSize: 12, color: status === "matched" ? TP.ink : P.terracotta, fontWeight: status === "matched" ? 500 : 600 }}>{product}</p>
                    </div>
                  ))}
                </div>
              }
            />

            <DecisionCard
              number="03"
              title="Search as the Primary Entry Point"
              rationale="Category navigation works for browsers. Search works for buyers. HomesWorld has both, but search is hero — centred on the homepage, on the hero image, at full width. The search chip system (Tiles, Cement, Bathroom Fittings...) bridges the gap between inspiration and intent. Users who don't know exactly what they're looking for can start from a category chip. Users who do know go straight to the search bar."
              preview={
                <div style={{ background: TP.charcoal, borderRadius: 10, padding: "16px 20px" }}>
                  <div style={{ background: TP.white, borderRadius: 99, padding: "10px 16px", display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <Search size={14} color={TP.muted} />
                    <p style={{ ...sans, fontSize: 13, color: TP.muted }}>Search tiles, cement, fittings, steel...</p>
                    <div style={{ marginLeft: "auto", background: P.terracotta, borderRadius: 99, padding: "4px 14px" }}>
                      <p style={{ ...sans, fontSize: 11, color: TP.white, fontWeight: 600 }}>Search</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {["Tiles & Flooring", "Bathroom", "Cement", "Steel TMT", "Paint"].map(t => (
                      <div key={t} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 99, padding: "4px 12px" }}>
                        <p style={{ ...sans, fontSize: 11, color: "rgba(255,255,255,0.7)" }}>{t}</p>
                      </div>
                    ))}
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </Section>

      {/* ── VISUAL LANGUAGE ─────────────────────────────────── */}
      <Section style={{ padding: "80px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Label>Marketplace Design Language</Label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, marginBottom: 52 }}>
            <div>
              <motion.h2
                variants={fadeUp}
                style={{ ...serif, fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: TP.ink, lineHeight: 1.25, marginBottom: 20 }}
              >
                Warm. Premium. Architectural.
              </motion.h2>
              <motion.p variants={fadeUp} style={{ ...sans, fontSize: 15, color: TP.muted, lineHeight: 1.8 }}>
                Construction materials are inherently tactile and beautiful — marble, steel, timber, brass. The visual language had to honour that. Warm stone neutrals, terracotta accents, Playfair Display for editorial moments, Plus Jakarta Sans for functional clarity. The design system took cues from Jaquar's product photography — single products on clean backgrounds, dramatic but not theatrical.
              </motion.p>
            </div>
            <motion.p variants={fadeUp} style={{ ...sans, fontSize: 15, color: TP.muted, lineHeight: 1.8, paddingTop: 48 }}>
              The system uses two typographic registers: serif for storytelling (headlines, section titles), sans-serif for utility (labels, prices, specifications). This duality mirrors the product itself — a marketplace that's both aspirational and functional.
            </motion.p>
          </div>

          {/* Design language tokens */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {/* Colour */}
            <motion.div variants={fadeUp} style={{ background: TP.cream, borderRadius: 16, padding: "24px", border: `1px solid ${TP.stone3}` }}>
              <p style={{ ...sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: TP.muted, marginBottom: 16 }}>Colour</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[
                  { name: "Terracotta", hex: P.terracotta },
                  { name: "Charcoal", hex: TP.charcoal },
                  { name: "Stone", hex: TP.stone },
                  { name: "Cream", hex: TP.cream },
                  { name: "Sand", hex: TP.sand },
                  { name: "Moss", hex: P.moss },
                ].map(({ name, hex }) => (
                  <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 8, background: hex, border: `1px solid ${TP.stone3}` }} />
                    <p style={{ ...sans, fontSize: 9, color: TP.muted, textAlign: "center" }}>{name}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Typography */}
            <motion.div variants={fadeUp} style={{ background: TP.cream, borderRadius: 16, padding: "24px", border: `1px solid ${TP.stone3}` }}>
              <p style={{ ...sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: TP.muted, marginBottom: 16 }}>Typography</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <p style={{ ...serif, fontSize: 22, color: TP.ink, lineHeight: 1 }}>Playfair Display</p>
                  <p style={{ ...sans, fontSize: 10, color: TP.subtle }}>Headlines · Moments · Story</p>
                </div>
                <div>
                  <p style={{ ...sans, fontSize: 16, color: TP.ink, fontWeight: 600 }}>Plus Jakarta Sans</p>
                  <p style={{ ...sans, fontSize: 10, color: TP.subtle }}>UI · Labels · Utility</p>
                </div>
                <div>
                  <p style={{ ...hand, fontSize: 18, color: P.terracotta }}>Sue Ellen Francisco</p>
                  <p style={{ ...sans, fontSize: 10, color: TP.subtle }}>Annotations · Workshop</p>
                </div>
              </div>
            </motion.div>

            {/* Components */}
            <motion.div variants={fadeUp} style={{ background: TP.cream, borderRadius: 16, padding: "24px", border: `1px solid ${TP.stone3}` }}>
              <p style={{ ...sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: TP.muted, marginBottom: 16 }}>Components</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ background: P.terracotta, borderRadius: 8, padding: "10px 16px", textAlign: "center" }}>
                  <p style={{ ...sans, fontSize: 12, fontWeight: 600, color: TP.white }}>Primary Button</p>
                </div>
                <div style={{ border: `1px solid ${P.terracotta}`, borderRadius: 8, padding: "10px 16px", textAlign: "center" }}>
                  <p style={{ ...sans, fontSize: 12, fontWeight: 600, color: P.terracotta }}>Ghost Button</p>
                </div>
                <div style={{ background: TP.cream, border: `1px solid ${TP.stone3}`, borderRadius: 10, padding: "12px 14px", boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}>
                  <p style={{ ...sans, fontSize: 10, color: TP.muted }}>Kajaria</p>
                  <p style={{ ...sans, fontSize: 12, fontWeight: 600, color: TP.ink }}>White Marble Tile 800×800</p>
                  <p style={{ ...sans, fontSize: 14, fontWeight: 700, color: P.terracotta }}>₹185 <span style={{ fontSize: 10, fontWeight: 400, color: TP.muted }}>/sqft</span></p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ── PROTOTYPE EMBED ─────────────────────────────────── */}
      <Section style={{ background: TP.charcoal, padding: "80px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <Label>Final Experience</Label>
            <motion.h2
              variants={fadeUp}
              style={{ ...serif, fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: TP.white, lineHeight: 1.25, marginBottom: 16 }}
            >
              The working prototype.
            </motion.h2>
            <motion.p variants={fadeUp} style={{ ...sans, fontSize: 15, color: "rgba(255,255,255,0.5)", maxWidth: 480, margin: "0 auto 36px" }}>
              All 10 routes are interactive. Click through the full purchase journey — from browsing categories to uploading a BoM to tracking an order.
            </motion.p>
          </div>

          {/* Journey route cards */}
          <motion.div
            variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginTop: 48 }}
          >
            {[
              { icon: Home, label: "Homepage", sub: "Hero + Search + Discovery" },
              { icon: Layers, label: "Categories", sub: "PLP + Filter + Sort" },
              { icon: Package, label: "Product Detail", sub: "Gallery + Bulk Pricing" },
              { icon: Upload, label: "BoM Upload", sub: "Intelligent Matching" },
              { icon: ShoppingCart, label: "Cart", sub: "BoM + Browse items" },
              { icon: MapPin, label: "Checkout", sub: "Address + UPI + EMI" },
              { icon: Truck, label: "Orders", sub: "Track + Timeline" },
              { icon: Building2, label: "Projects", sub: "Workspace + Budget" },
            ].map(({ icon: Icon, label, sub }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                whileHover={{ y: -4, background: "rgba(255,255,255,0.08)" }}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  padding: "16px",
                  cursor: "default",
                  transition: "all 0.2s ease",
                }}
              >
                <Icon size={18} color={P.terracotta} style={{ marginBottom: 8 }} />
                <p style={{ ...sans, fontSize: 13, fontWeight: 600, color: TP.white, marginBottom: 3 }}>{label}</p>
                <p style={{ ...sans, fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── BUSINESS IMPACT ─────────────────────────────────── */}
      <Section style={{ padding: "80px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Label>Impact</Label>
          <motion.h2
            variants={fadeUp}
            style={{ ...serif, fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: TP.ink, lineHeight: 1.25, marginBottom: 48 }}
          >
            What the platform enables.
          </motion.h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            <ImpactStat label="BoM Upload" arrow="→" outcome="Procurement from days to minutes for architects" color={P.terracotta} />
            <ImpactStat label="Unified Marketplace" arrow="→" outcome="Single platform replacing 12+ vendor relationships" color="#4A6FA5" />
            <ImpactStat label="Project Workspace" arrow="→" outcome="Architect–client collaboration without WhatsApp" color={P.moss} />
            <ImpactStat label="Stage Navigation" arrow="→" outcome="Lower bounce rate from confused homeowners" color="#8B6914" />
          </div>

          <motion.div
            variants={fadeUp}
            style={{
              marginTop: 28,
              background: P.terracottaL,
              border: `1px solid ${P.terracotta}`,
              borderRadius: 16,
              padding: "28px 36px",
              display: "flex",
              gap: 24,
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 28, flexShrink: 0 }}>🏗️</span>
            <p style={{ ...sans, fontSize: 15, color: TP.ink, lineHeight: 1.7 }}>
              The platform was designed to serve as the <strong>digital operating model</strong> for home construction — not just a place to buy materials, but a coordination layer that makes the entire process less fragmented for everyone involved.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* ── REFLECTIONS ─────────────────────────────────────── */}
      <Section style={{ background: TP.cream, padding: "80px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Label>Reflections</Label>
          <motion.h2
            variants={fadeUp}
            style={{ ...serif, fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: TP.ink, lineHeight: 1.25, marginBottom: 48 }}
          >
            What I took away.
          </motion.h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              {
                num: "01",
                insight: "Marketplace design is less about products and more about the relationships between the people buying them.",
                detail: "The hardest design work wasn't the catalogue or the cart. It was understanding that an architect and a homeowner need fundamentally different experiences of the same platform — and building both without the seams showing.",
              },
              {
                num: "02",
                insight: "Good information architecture reduces emotional overwhelm, not just cognitive load.",
                detail: "Buying materials for a home is an emotional act. When the IA is confusing, people don't just get lost — they feel anxious. Every simplification in the navigation had an emotional payoff for the user. That became my compass.",
              },
              {
                num: "03",
                insight: "Service design always starts before the interface does.",
                detail: "The two workshop days shaped every subsequent decision. The ecosystem map, the personas, the BoM insight — none of that came from sitting at a desk. It came from listening to the right people in the right room. I'd do more of that, earlier, on every project.",
              },
            ].map(({ num, insight, detail }) => (
              <motion.div
                key={num}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                style={{
                  background: TP.stone,
                  border: `1px solid ${TP.stone3}`,
                  borderRadius: 16,
                  padding: "32px 28px",
                }}
              >
                <p style={{ ...hand, fontSize: 36, color: TP.stone3, lineHeight: 1, marginBottom: 16 }}>{num}</p>
                <p style={{ ...serif, fontSize: 17, color: TP.ink, lineHeight: 1.5, marginBottom: 16 }}>{insight}</p>
                <p style={{ ...sans, fontSize: 13, color: TP.muted, lineHeight: 1.75 }}>{detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── NEXT PROJECT ────────────────────────────────────── */}
      <section style={{ minHeight: 320, display: "flex", alignItems: "center", background: `linear-gradient(135deg, ${TP.charcoal} 0%, #1a2535 100%)` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <div>
            <p style={{ ...sans, fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 12 }}>Next Case Study</p>
            <h2 style={{ ...serif, fontSize: "clamp(1.8rem, 3vw, 3rem)", color: TP.white, lineHeight: 1.2, marginBottom: 12 }}>CogniCure</h2>
            <p style={{ ...sans, fontSize: 15, color: "rgba(255,255,255,0.5)", maxWidth: 420 }}>
              Designing a clinical decision support tool for neurologists — where the stakes are higher than any UX mistake I've made before.
            </p>
          </div>
          <Link
            href="/"
            style={{
              ...sans,
              fontSize: 14,
              fontWeight: 600,
              color: TP.white,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              padding: "16px 32px",
              borderRadius: 99,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 8,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            View Case Study <ArrowRight size={16} />
          </Link>
        </div>
      </section>

    </div>
  );
}

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } },
};
