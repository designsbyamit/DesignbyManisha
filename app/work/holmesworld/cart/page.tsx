"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useStore } from "../../../../lib/holmesworld/store";
import { products } from "../../../../lib/holmesworld/data/products";

const DELIVERY_THRESHOLD = 2000;
const DELIVERY_FEE = 299;
const GST_RATE = 0.12;

function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export default function CartPage() {
  const { state, dispatch } = useStore();
  const { cartItems } = state;

  const browseItems = cartItems.filter((i) => i.source === "browse");
  const bomItems = cartItems.filter((i) => i.source === "bom");

  const subtotal = cartItems.reduce((sum, item) => {
    const p = getProduct(item.productId);
    return sum + (p ? p.price * item.quantity : 0);
  }, 0);

  const gst = Math.round(subtotal * GST_RATE);
  const delivery = subtotal >= DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + gst + delivery;

  function updateQty(productId: string, qty: number) {
    if (qty < 1) {
      dispatch({ type: "REMOVE_FROM_CART", payload: { productId } });
    } else {
      dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity: qty } });
    }
  }

  function removeItem(productId: string) {
    dispatch({ type: "REMOVE_FROM_CART", payload: { productId } });
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
        <ShoppingBag size={48} className="mx-auto mb-6" style={{ color: "var(--hw-surface-3)" }} />
        <h1 className="text-2xl font-semibold mb-3" style={{ color: "var(--hw-ink)" }}>Your cart is empty</h1>
        <p className="text-sm mb-8" style={{ color: "var(--hw-ink-muted)" }}>Browse our catalogue or upload a Bill of Materials to get started.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/work/holmesworld/categories" className="px-6 py-3 text-sm font-semibold rounded-md" style={{ background: "var(--hw-ink)", color: "var(--hw-white)" }}>
            Browse Materials
          </Link>
          <Link href="/work/holmesworld/bom" className="px-6 py-3 text-sm font-medium rounded-md border" style={{ borderColor: "var(--hw-surface-3)", color: "var(--hw-ink-muted)" }}>
            Upload BoM
          </Link>
        </div>
      </div>
    );
  }

  function ItemRow({ item, isBom }: { item: typeof cartItems[0]; isBom?: boolean }) {
    const product = getProduct(item.productId);
    if (!product) return null;
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className={isBom ? "flex items-start gap-4 py-5 border-b border-l-4" : "flex items-start gap-4 py-5 border-b"}
        style={
          isBom
            ? { borderColor: "var(--hw-surface-3)", borderLeftColor: "var(--hw-amber)" }
            : { borderColor: "var(--hw-surface-3)" }
        }
      >
        <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
          <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="80px" />
        </div>
        <div className="flex-1 min-w-0">
          {isBom && (
            <span
              className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-sm mb-1"
              style={{ background: "rgba(212,130,26,0.12)", color: "var(--hw-amber)" }}
            >
              From your BoM
            </span>
          )}
          <p className="text-xs font-medium mb-0.5" style={{ color: "var(--hw-ink-muted)" }}>{product.brand}</p>
          <p className="text-sm font-semibold mb-1 line-clamp-2" style={{ color: "var(--hw-ink)" }}>{product.name}</p>
          {item.bomLineItem && (
            <p className="text-xs mb-1 italic" style={{ color: "var(--hw-amber)" }}>
              BoM: &quot;{item.bomLineItem}&quot;
            </p>
          )}
          <p className="text-xs" style={{ color: "var(--hw-ink-muted)" }}>
            ₹{product.price.toLocaleString("en-IN")}/{product.unit}
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center border rounded-md overflow-hidden" style={{ borderColor: "var(--hw-surface-3)" }}>
            <button
              onClick={() => updateQty(item.productId, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center"
              style={{ color: "var(--hw-ink)" }}
            >
              <Minus size={12} />
            </button>
            <span className="w-10 text-center text-sm font-medium" style={{ color: "var(--hw-ink)" }}>{item.quantity}</span>
            <button
              onClick={() => updateQty(item.productId, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center"
              style={{ color: "var(--hw-ink)" }}
            >
              <Plus size={12} />
            </button>
          </div>
          <div className="w-24 text-right">
            <p className="text-sm font-semibold" style={{ color: "var(--hw-ink)" }}>
              ₹{(product.price * item.quantity).toLocaleString("en-IN")}
            </p>
          </div>
          <button
            onClick={() => removeItem(item.productId)}
            className="p-1.5"
            style={{ color: "var(--hw-ink-muted)" }}
            aria-label="Remove item"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl mb-8" style={{ color: "var(--hw-ink)", fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 300 }}>
        Your Cart ({cartItems.length} item{cartItems.length !== 1 ? "s" : ""})
      </h1>

      <div className="flex gap-8 items-start">
        {/* Items */}
        <div className="flex-1 min-w-0">
          {browseItems.length > 0 && (
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--hw-ink-muted)" }}>
                Browsed Items ({browseItems.length})
              </p>
              <AnimatePresence>
                {browseItems.map((item) => (
                  <ItemRow key={item.productId} item={item} isBom={false} />
                ))}
              </AnimatePresence>
            </div>
          )}

          {bomItems.length > 0 && (
            <div>
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-t-lg mb-0"
                style={{ background: "rgba(212,130,26,0.08)", border: "1px solid var(--hw-amber)", borderBottom: "none" }}
              >
                <div className="w-1 h-4 rounded-full" style={{ background: "var(--hw-amber)" }} />
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--hw-amber)" }}>
                  From your Bill of Materials ({bomItems.length})
                </p>
              </div>
              <div
                className="rounded-b-lg px-4"
                style={{ border: "1px solid var(--hw-amber)", borderTop: "none" }}
              >
                <AnimatePresence>
                  {bomItems.map((item) => (
                    <ItemRow key={item.productId} item={item} isBom={true} />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>

        {/* Order summary */}
        <div className="w-80 shrink-0 sticky top-24">
          <div className="rounded-xl border p-6" style={{ background: "var(--hw-white)", borderColor: "var(--hw-surface-3)" }}>
            <h2 className="text-base font-semibold mb-5" style={{ color: "var(--hw-ink)" }}>Order Summary</h2>

            <div className="space-y-3 mb-5 text-sm">
              <div className="flex justify-between">
                <span style={{ color: "var(--hw-ink-muted)" }}>Subtotal</span>
                <span style={{ color: "var(--hw-ink)" }}>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "var(--hw-ink-muted)" }}>GST (12%) — Const. materials</span>
                <span style={{ color: "var(--hw-ink)" }}>₹{gst.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "var(--hw-ink-muted)" }}>Delivery</span>
                {delivery === 0 ? (
                  <span style={{ color: "var(--hw-green)", fontWeight: 600 }}>FREE</span>
                ) : (
                  <div className="text-right">
                    <span style={{ color: "var(--hw-ink)" }}>₹{delivery}</span>
                    <p className="text-[10px]" style={{ color: "var(--hw-ink-muted)" }}>Free above ₹{DELIVERY_THRESHOLD.toLocaleString("en-IN")}</p>
                  </div>
                )}
              </div>
            </div>

            <div
              className="flex justify-between pt-4 border-t mb-6 text-base font-semibold"
              style={{ borderColor: "var(--hw-surface-3)", color: "var(--hw-ink)" }}
            >
              <span>Total</span>
              <span style={{ color: "var(--hw-gold)" }}>₹{total.toLocaleString("en-IN")}</span>
            </div>

            <Link
              href="/work/holmesworld/checkout"
              className="w-full py-3 text-sm font-semibold rounded-md flex items-center justify-center gap-2"
              style={{ background: "var(--hw-ink)", color: "var(--hw-white)" }}
            >
              Proceed to Checkout <ArrowRight size={15} />
            </Link>

            {/* Payment badges */}
            <div className="mt-4 flex items-center justify-center gap-2">
              {["UPI", "Visa", "MC", "RuPay"].map((badge) => (
                <span
                  key={badge}
                  className="text-[10px] font-semibold px-2 py-1 rounded border"
                  style={{ borderColor: "var(--hw-surface-3)", color: "var(--hw-ink-muted)" }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recommended with your order */}
      <div className="mt-10">
        <h2 className="text-base font-semibold mb-4" style={{ color: "var(--hw-ink)" }}>Recommended with your order</h2>
        <div className="grid grid-cols-2 gap-4">
          {[products[0], products[1]].map((rec) => (
            <div key={rec.id} className="flex items-center gap-3 p-3 rounded-xl border" style={{ background: "var(--hw-white)", borderColor: "var(--hw-surface-3)" }}>
              <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                <Image src={rec.images[0]} alt={rec.name} fill className="object-cover" sizes="48px" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold line-clamp-1" style={{ color: "var(--hw-ink)" }}>{rec.name}</p>
                <p className="text-xs" style={{ color: "var(--hw-gold)" }}>₹{rec.price.toLocaleString("en-IN")}/{rec.unit}</p>
              </div>
              <button
                onClick={() => dispatch({ type: "ADD_TO_CART", payload: { productId: rec.id, quantity: 1, source: "browse" as const } })}
                className="shrink-0 px-3 py-1.5 text-xs font-semibold rounded-md"
                style={{ background: "var(--hw-ink)", color: "var(--hw-white)" }}
              >
                + Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
