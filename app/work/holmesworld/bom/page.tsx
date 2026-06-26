"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Upload, FileText, CheckCircle, AlertCircle, RefreshCw, ShoppingCart, X } from "lucide-react";
import { products, getProductBySlug } from "../../../../lib/holmesworld/data/products";
import { useStore } from "../../../../lib/holmesworld/store";
import type { BomResult } from "../../../../lib/holmesworld/types";

// Simulated BoM data — what the "uploaded file" contains
const SAMPLE_BOM_LINES = [
  { lineItem: "Vitrified tiles — 800×800, white marble finish", quantity: 250, unit: "sq ft" },
  { lineItem: "TMT bars 12mm Fe-500D", quantity: 500, unit: "kg" },
  { lineItem: "OPC 53 Grade Cement", quantity: 30, unit: "bag" },
  { lineItem: "Bathroom overhead shower (premium chrome)", quantity: 3, unit: "piece" },
  { lineItem: "Interior emulsion paint — white base", quantity: 15, unit: "litre" },
  { lineItem: "LED recessed panel light 18W", quantity: 12, unit: "piece" },
  { lineItem: "CPVC pipe 15mm hot/cold water line", quantity: 20, unit: "piece" },
  { lineItem: "Floor tiles anti-skid bathroom", quantity: 80, unit: "sq ft" },
];

// Maps each BoM line to a matched product
const MOCK_MATCHES: Record<number, string | null> = {
  0: "p-001",  // vitrified white marble
  1: "p-021",  // TMT 12mm
  2: "p-017",  // OPC 53 cement
  3: "p-009",  // Jaquar overhead shower
  4: "p-025",  // Asian Paints Royale
  5: "p-039",  // Philips LED panel
  6: "p-035",  // Astral CPVC pipe
  7: "p-002",  // Somany anti-skid
};

const ALTERNATIVES: Record<number, string[]> = {
  0: ["p-005", "p-007"],
  1: ["p-022", "p-023"],
  2: ["p-018"],
  3: ["p-015"],
  4: ["p-026", "p-030"],
  5: ["p-041"],
  6: ["p-037"],
  7: ["p-003"],
};

type Step = "upload" | "processing" | "results" | "added";

const processingMessages = [
  "Reading your document…",
  "Identifying materials…",
  "Matching products…",
  "Finding best prices…",
  "Finalising your list…",
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function SwapModal({
  lineIndex,
  current,
  alternatives,
  onSelect,
  onClose,
}: {
  lineIndex: number;
  current: string | null;
  alternatives: string[];
  onSelect: (productId: string) => void;
  onClose: () => void;
}) {
  const alts = alternatives
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as typeof products;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-lg rounded-xl p-6 shadow-2xl"
        style={{ background: "var(--hw-white)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold" style={{ color: "var(--hw-ink)" }}>
            Select Alternative Product
          </h3>
          <button onClick={onClose} style={{ color: "var(--hw-ink-muted)" }}>
            <X size={18} />
          </button>
        </div>

        <div className="space-y-3 mb-4">
          {alts.map((alt) => (
            <button
              key={alt.id}
              onClick={() => { onSelect(alt.id); onClose(); }}
              className="w-full flex items-center gap-4 p-3 rounded-lg border text-left transition-colors"
              style={{
                borderColor: alt.id === current ? "var(--hw-gold)" : "var(--hw-surface-3)",
                background: alt.id === current ? "var(--hw-gold-light)" : "var(--hw-white)",
              }}
            >
              <div className="relative w-14 h-14 rounded-md overflow-hidden shrink-0">
                <Image src={alt.images[0]} alt={alt.name} fill className="object-cover" sizes="56px" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium mb-0.5" style={{ color: "var(--hw-ink-muted)" }}>{alt.brand}</p>
                <p className="text-sm font-semibold line-clamp-1" style={{ color: "var(--hw-ink)" }}>{alt.name}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--hw-gold)" }}>
                  ₹{alt.price.toLocaleString("en-IN")}/{alt.unit}
                </p>
              </div>
              <span className="text-xs px-2 py-1 rounded shrink-0" style={{ background: "var(--hw-gold)", color: "var(--hw-white)" }}>
                Select
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 text-sm border rounded-md"
          style={{ borderColor: "var(--hw-surface-3)", color: "var(--hw-ink-muted)" }}
        >
          Skip this item
        </button>
      </motion.div>
    </div>
  );
}

export default function BomPage() {
  const { dispatch } = useStore();
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<Step>("upload");
  const [fileName, setFileName] = useState<string | null>(null);
  const [processingIndex, setProcessingIndex] = useState(0);
  const [revealedLines, setRevealedLines] = useState<number[]>([]);
  const [bomResults, setBomResults] = useState<(BomResult & { selected: boolean; matchedId: string | null })[]>([]);
  const [swapOpen, setSwapOpen] = useState<number | null>(null);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);

  function handleFileSelect(file: File) {
    setFileName(file.name);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }

  async function handleProcess() {
    setStep("processing");
    setRevealedLines([]);

    // Cycle through processing messages
    for (let i = 0; i < processingMessages.length; i++) {
      setProcessingIndex(i);
      await new Promise((r) => setTimeout(r, 500));
    }

    // Reveal line items one by one with 300ms delay each
    for (let i = 0; i < SAMPLE_BOM_LINES.length; i++) {
      setRevealedLines((prev) => [...prev, i]);
      await new Promise((r) => setTimeout(r, 300));
    }

    await new Promise((r) => setTimeout(r, 400));

    // Build results
    const results = SAMPLE_BOM_LINES.map((line, i) => ({
      lineItem: line.lineItem,
      matchedProductId: MOCK_MATCHES[i] ?? null,
      quantity: line.quantity,
      alternatives: ALTERNATIVES[i] ?? [],
      selected: true,
      matchedId: MOCK_MATCHES[i] ?? null,
    }));
    setBomResults(results);
    setCheckedItems(results.map(() => true));
    setStep("results");
  }

  function handleSwap(lineIndex: number, newProductId: string) {
    setBomResults((prev) =>
      prev.map((r, i) => (i === lineIndex ? { ...r, matchedId: newProductId, matchedProductId: newProductId } : r))
    );
  }

  function addToCart() {
    const toAdd = bomResults.filter((_, i) => checkedItems[i] && bomResults[i].matchedId);
    toAdd.forEach((result) => {
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          productId: result.matchedId!,
          quantity: result.quantity,
          source: "bom",
          bomLineItem: result.lineItem,
        },
      });
    });
    router.push("/work/holmesworld/cart");
  }

  const matchedCount = bomResults.filter((r) => r.matchedId !== null).length;
  const unmatchedCount = bomResults.filter((r) => r.matchedId === null).length;
  const selectedCount = bomResults.filter((_, i) => checkedItems[i]).length;

  const estimatedTotal = bomResults.reduce((sum, result, i) => {
    if (!checkedItems[i] || !result.matchedId) return sum;
    const product = products.find((p) => p.id === result.matchedId);
    return sum + (product ? product.price * result.quantity : 0);
  }, 0);

  return (
    <div className="min-h-screen" style={{ background: "var(--hw-surface)" }}>
      {/* Swap modal */}
      <AnimatePresence>
        {swapOpen !== null && (
          <SwapModal
            lineIndex={swapOpen}
            current={bomResults[swapOpen]?.matchedId ?? null}
            alternatives={bomResults[swapOpen]?.alternatives ?? []}
            onSelect={(id) => handleSwap(swapOpen, id)}
            onClose={() => setSwapOpen(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {/* STEP 1: UPLOAD */}
        {step === "upload" && (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-2xl mx-auto px-6 py-20"
          >
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--hw-accent)" }}>
                Smart Procurement
              </motion.p>
              <motion.h1 variants={fadeUp} className="text-4xl mb-4 leading-snug" style={{ color: "var(--hw-ink)", fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 300 }}>
                Your architect gave you a list.<br />We'll find everything on it.
              </motion.h1>
              <motion.p variants={fadeUp} className="text-base mb-10" style={{ color: "var(--hw-ink-muted)" }}>
                Upload your Bill of Materials as PDF, Excel, or CSV and we'll match every item to our catalogue in seconds.
              </motion.p>

              {/* Drop zone */}
              <motion.div
                variants={fadeUp}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileRef.current?.click()}
                className="border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors mb-6"
                style={{
                  borderColor: fileName ? "var(--hw-gold)" : "var(--hw-surface-3)",
                  background: fileName ? "var(--hw-gold-light)" : "var(--hw-white)",
                }}
                whileHover={{ borderColor: "var(--hw-gold)" }}
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.xlsx,.csv"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                />
                {fileName ? (
                  <>
                    <FileText size={32} className="mx-auto mb-3" style={{ color: "var(--hw-gold)" }} />
                    <p className="text-sm font-semibold mb-1" style={{ color: "var(--hw-ink)" }}>{fileName}</p>
                    <p className="text-xs" style={{ color: "var(--hw-ink-muted)" }}>Click to change file</p>
                  </>
                ) : (
                  <>
                    <Upload size={32} className="mx-auto mb-3" style={{ color: "var(--hw-ink-muted)" }} />
                    <p className="text-sm font-semibold mb-1" style={{ color: "var(--hw-ink)" }}>Drop your BoM here or click to browse</p>
                    <p className="text-xs" style={{ color: "var(--hw-ink-muted)" }}>Accepts PDF, Excel (.xlsx), CSV</p>
                  </>
                )}
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-col gap-3">
                <button
                  onClick={handleProcess}
                  disabled={!fileName}
                  className="w-full py-3 text-sm font-semibold rounded-md transition-all disabled:opacity-40"
                  style={{
                    background: "var(--hw-ink)",
                    color: "var(--hw-white)",
                    cursor: fileName ? "pointer" : "not-allowed",
                  }}
                >
                  Process BoM
                </button>
                <button
                  onClick={() => {
                    setFileName("sample-bom-3bhk-koramangala.csv");
                    // Trigger processing immediately after state updates on next tick
                    setTimeout(() => handleProcess(), 0);
                  }}
                  className="w-full py-3 text-sm font-medium rounded-md border transition-colors"
                  style={{ borderColor: "var(--hw-surface-3)", color: "var(--hw-ink-muted)" }}
                >
                  Use sample BoM file
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* STEP 2: PROCESSING */}
        {step === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-2xl mx-auto px-6 py-20"
          >
            <div className="text-center mb-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-6"
                style={{ color: "var(--hw-gold)" }}
              >
                <RefreshCw size={36} />
              </motion.div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={processingIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="text-xl font-light"
                  style={{ color: "var(--hw-ink)" }}
                >
                  {processingMessages[processingIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Staggered line reveal with monospace typewriter style */}
            <div
              className="rounded-xl p-4 space-y-1"
              style={{ background: "var(--hw-surface-dark)", fontFamily: "monospace" }}
            >
              <p className="text-xs mb-3 select-none" style={{ color: "var(--hw-ink-muted)" }}>
                // Reading BoM items…
              </p>
              {SAMPLE_BOM_LINES.map((line, i) => (
                <AnimatePresence key={i}>
                  {revealedLines.includes(i) && (
                    <motion.div
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                      className="flex items-baseline gap-3 py-1"
                    >
                      <span className="text-xs shrink-0 select-none" style={{ color: "var(--hw-gold)", opacity: 0.7 }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="text-sm leading-relaxed"
                        style={{
                          color: "var(--hw-ink)",
                          animation: "bom-scan 0.4s ease-out",
                        }}
                      >
                        {line.lineItem}
                      </span>
                      <span className="ml-auto text-xs shrink-0" style={{ color: "var(--hw-gold)", opacity: 0.6 }}>
                        ×{line.quantity} {line.unit}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}
            </div>

            <style>{`
              @keyframes bom-scan {
                from { opacity: 0; letter-spacing: 0.05em; }
                to   { opacity: 1; letter-spacing: 0; }
              }
            `}</style>
          </motion.div>
        )}

        {/* STEP 3: RESULTS */}
        {step === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-4xl mx-auto px-6 py-12"
          >
            {/* Summary header */}
            <div className="mb-8">
              <h1 className="text-2xl font-semibold mb-2" style={{ color: "var(--hw-ink)" }}>
                We found {matchedCount} of {SAMPLE_BOM_LINES.length} items
              </h1>
              <p className="text-sm" style={{ color: "var(--hw-ink-muted)" }}>
                {unmatchedCount > 0 ? `${unmatchedCount} items need manual review` : "All items matched!"}
              </p>
            </div>

            {/* Results table */}
            <div className="space-y-3 mb-8">
              {bomResults.map((result, i) => {
                const matchedProduct = result.matchedId ? products.find((p) => p.id === result.matchedId) : null;
                const isUnmatched = !result.matchedId;

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="rounded-xl border p-4"
                    style={{
                      background: "var(--hw-white)",
                      borderColor: isUnmatched ? "var(--hw-amber)" : "var(--hw-surface-3)",
                      borderLeftWidth: isUnmatched ? "4px" : "1px",
                    }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={checkedItems[i]}
                        onChange={(e) => {
                          const next = [...checkedItems];
                          next[i] = e.target.checked;
                          setCheckedItems(next);
                        }}
                        className="mt-1 rounded"
                      />

                      {/* BoM line item */}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium mb-1" style={{ color: "var(--hw-ink-muted)" }}>BoM item</p>
                        <p className="text-sm" style={{ color: "var(--hw-ink)" }}>{result.lineItem}</p>
                        <p className="text-xs mt-0.5" style={{ color: "var(--hw-ink-muted)" }}>
                          Qty: {result.quantity} {SAMPLE_BOM_LINES[i]?.unit}
                        </p>
                      </div>

                      {/* Match / status */}
                      {matchedProduct ? (
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                            <Image
                              src={matchedProduct.images[0]}
                              alt={matchedProduct.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                          <div className="max-w-[160px]">
                            <p className="text-xs font-semibold line-clamp-2 mb-0.5" style={{ color: "var(--hw-ink)" }}>
                              {matchedProduct.name}
                            </p>
                            <p className="text-xs" style={{ color: "var(--hw-gold)" }}>
                              ₹{(matchedProduct.price * result.quantity).toLocaleString("en-IN")}
                            </p>
                          </div>
                          <CheckCircle size={16} style={{ color: "var(--hw-green)" }} />
                          <button
                            onClick={() => setSwapOpen(i)}
                            className="text-xs px-2 py-1 rounded border"
                            style={{ borderColor: "var(--hw-surface-3)", color: "var(--hw-ink-muted)" }}
                          >
                            Swap
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 shrink-0">
                          <AlertCircle size={16} style={{ color: "var(--hw-amber)" }} />
                          <p className="text-xs font-medium" style={{ color: "var(--hw-amber)" }}>Not matched</p>
                          {result.alternatives.length > 0 && (
                            <button
                              onClick={() => setSwapOpen(i)}
                              className="text-xs px-2 py-1 rounded"
                              style={{ background: "var(--hw-amber)", color: "var(--hw-white)" }}
                            >
                              Suggest
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Summary bar + CTA */}
            <div
              className="sticky bottom-0 rounded-xl p-5 border shadow-lg flex items-center justify-between gap-4"
              style={{
                background: "var(--hw-white)",
                borderColor: "var(--hw-surface-3)",
              }}
            >
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--hw-ink)" }}>
                  {selectedCount} item{selectedCount !== 1 ? "s" : ""} selected
                </p>
                <p className="text-xs" style={{ color: "var(--hw-ink-muted)" }}>
                  Estimated total: <span style={{ color: "var(--hw-gold)", fontWeight: 600 }}>₹{estimatedTotal.toLocaleString("en-IN")}</span>
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  className="px-4 py-2 text-sm rounded-md border"
                  style={{ borderColor: "var(--hw-surface-3)", color: "var(--hw-ink-muted)" }}
                >
                  Save as Project BoM
                </button>
                <button
                  onClick={addToCart}
                  disabled={selectedCount === 0}
                  className="flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-md disabled:opacity-40"
                  style={{ background: "var(--hw-ink)", color: "var(--hw-white)" }}
                >
                  <ShoppingCart size={15} />
                  Add {selectedCount} items to Cart
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 4: ADDED — kept as fallback but addToCart now navigates directly */}
        {step === "added" && (
          <motion.div
            key="added"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="max-w-xl mx-auto px-6 py-28 text-center"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: "var(--hw-green)" }}
            >
              <CheckCircle size={32} style={{ color: "var(--hw-white)" }} />
            </div>
            <h1 className="text-2xl font-semibold mb-3" style={{ color: "var(--hw-ink)" }}>
              Items added to cart
            </h1>
            <p className="text-base mb-8" style={{ color: "var(--hw-ink-muted)" }}>
              {selectedCount} BoM items have been added to your cart.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/work/holmesworld/cart"
                className="w-full py-3 text-sm font-semibold rounded-md flex items-center justify-center gap-2"
                style={{ background: "var(--hw-ink)", color: "var(--hw-white)" }}
              >
                <ShoppingCart size={16} /> View Cart
              </Link>
              <button
                onClick={() => { setStep("upload"); setFileName(null); setBomResults([]); setCheckedItems([]); }}
                className="w-full py-3 text-sm font-medium rounded-md border"
                style={{ borderColor: "var(--hw-surface-3)", color: "var(--hw-ink-muted)" }}
              >
                Upload Another BoM
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
