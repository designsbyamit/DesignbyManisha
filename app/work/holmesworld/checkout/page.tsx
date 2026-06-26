"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { CheckCircle, ChevronRight } from "lucide-react";
import { useStore } from "../../../../lib/holmesworld/store";
import { products } from "../../../../lib/holmesworld/data/products";

type CheckoutStep = "delivery" | "payment" | "confirm";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh",
];

const DELIVERY_DATES = [
  { label: "Standard", sublabel: "3–5 business days", date: "Dec 27–29" },
  { label: "Express", sublabel: "Next business day", date: "Dec 24", extra: "+₹299" },
  { label: "Scheduled", sublabel: "Choose a date", date: "Dec 30" },
];

const BANKS = ["HDFC Bank", "ICICI Bank", "SBI", "Axis Bank", "Kotak Bank", "Yes Bank", "PNB", "Canara Bank"];

const stepFade: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] } },
};

function StepIndicator({ current }: { current: CheckoutStep }) {
  const steps: { key: CheckoutStep; label: string }[] = [
    { key: "delivery", label: "Delivery" },
    { key: "payment", label: "Payment" },
    { key: "confirm", label: "Confirm" },
  ];
  const currentIndex = steps.findIndex((s) => s.key === current);

  return (
    <div className="flex items-center gap-2 mb-10">
      {steps.map((step, i) => (
        <div key={step.key} className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold"
            style={{
              background: i <= currentIndex ? "var(--hw-ink)" : "var(--hw-surface-3)",
              color: i <= currentIndex ? "var(--hw-white)" : "var(--hw-ink-muted)",
            }}
          >
            {i < currentIndex ? "✓" : i + 1}
          </div>
          <span
            className="text-sm font-medium"
            style={{ color: i <= currentIndex ? "var(--hw-ink)" : "var(--hw-ink-muted)" }}
          >
            {step.label}
          </span>
          {i < steps.length - 1 && (
            <ChevronRight size={14} style={{ color: "var(--hw-surface-3)" }} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function CheckoutPage() {
  const { state, dispatch } = useStore();
  const { cartItems } = state;

  const [step, setStep] = useState<CheckoutStep>("delivery");
  const [orderId] = useState(() => `HW-2024-0${Math.floor(1000 + Math.random() * 9000)}`);

  // Delivery form
  const [address, setAddress] = useState({
    flatNo: "", building: "", locality: "", city: "Bengaluru", state: "Karnataka", pincode: "",
  });
  const [selectedDate, setSelectedDate] = useState(0);
  const [installation, setInstallation] = useState(false);

  // Payment form
  const [payMethod, setPayMethod] = useState<"upi" | "netbanking" | "emi" | "card">("upi");
  const [upiId, setUpiId] = useState("");
  const [upiTab, setUpiTab] = useState<"id" | "qr">("id");
  const [bank, setBank] = useState(BANKS[0]);
  const [emiTenure, setEmiTenure] = useState(6);
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "" });

  const subtotal = cartItems.reduce((sum, item) => {
    const p = products.find((pr) => pr.id === item.productId);
    return sum + (p ? p.price * item.quantity : 0);
  }, 0);
  const gst = Math.round(subtotal * 0.12);
  const delivery = subtotal >= 2000 ? 0 : 299;
  const total = subtotal + gst + delivery + (installation ? 1200 : 0);

  function placeOrder() {
    dispatch({ type: "CLEAR_CART" });
    setStep("confirm");
  }

  const deliveryValid =
    address.flatNo.trim() &&
    address.locality.trim() &&
    address.city.trim() &&
    address.pincode.length === 6;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {step !== "confirm" && <StepIndicator current={step} />}

      <AnimatePresence mode="wait">
        {/* DELIVERY */}
        {step === "delivery" && (
          <motion.div
            key="delivery"
            variants={stepFade}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-[1fr_320px] gap-8"
          >
            <div>
              <h2 className="text-xl mb-6" style={{ color: "var(--hw-ink)", fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 400 }}>Delivery Address</h2>
              <div className="space-y-4 mb-8">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium mb-1 block" style={{ color: "var(--hw-ink-muted)" }}>Flat / House No. *</label>
                    <input
                      value={address.flatNo}
                      onChange={(e) => setAddress({ ...address, flatNo: e.target.value })}
                      className="w-full px-3 py-2 text-sm border rounded-md outline-none"
                      style={{ borderColor: "var(--hw-surface-3)", color: "var(--hw-ink)", background: "var(--hw-white)" }}
                      placeholder="Flat 402"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1 block" style={{ color: "var(--hw-ink-muted)" }}>Building / Society</label>
                    <input
                      value={address.building}
                      onChange={(e) => setAddress({ ...address, building: e.target.value })}
                      className="w-full px-3 py-2 text-sm border rounded-md outline-none"
                      style={{ borderColor: "var(--hw-surface-3)", color: "var(--hw-ink)", background: "var(--hw-white)" }}
                      placeholder="Prestige Lakeside"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium mb-1 block" style={{ color: "var(--hw-ink-muted)" }}>Locality / Area *</label>
                  <input
                    value={address.locality}
                    onChange={(e) => setAddress({ ...address, locality: e.target.value })}
                    className="w-full px-3 py-2 text-sm border rounded-md outline-none"
                    style={{ borderColor: "var(--hw-surface-3)", color: "var(--hw-ink)", background: "var(--hw-white)" }}
                    placeholder="Whitefield, Koramangala..."
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-medium mb-1 block" style={{ color: "var(--hw-ink-muted)" }}>City *</label>
                    <input
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="w-full px-3 py-2 text-sm border rounded-md outline-none"
                      style={{ borderColor: "var(--hw-surface-3)", color: "var(--hw-ink)", background: "var(--hw-white)" }}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1 block" style={{ color: "var(--hw-ink-muted)" }}>State *</label>
                    <select
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      className="w-full px-3 py-2 text-sm border rounded-md outline-none"
                      style={{ borderColor: "var(--hw-surface-3)", color: "var(--hw-ink)", background: "var(--hw-white)" }}
                    >
                      {INDIAN_STATES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1 block" style={{ color: "var(--hw-ink-muted)" }}>PIN Code *</label>
                    <input
                      value={address.pincode}
                      onChange={(e) => setAddress({ ...address, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) })}
                      className="w-full px-3 py-2 text-sm border rounded-md outline-none"
                      style={{ borderColor: "var(--hw-surface-3)", color: "var(--hw-ink)", background: "var(--hw-white)" }}
                      placeholder="560001"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery date */}
              <h3 className="text-base font-semibold mb-4" style={{ color: "var(--hw-ink)" }}>Delivery Date</h3>
              <div className="grid grid-cols-3 gap-3 mb-8">
                {DELIVERY_DATES.map((d, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(i)}
                    className="p-4 rounded-lg border text-left transition-colors"
                    style={{
                      borderColor: selectedDate === i ? "var(--hw-gold)" : "var(--hw-surface-3)",
                      background: selectedDate === i ? "var(--hw-gold-light)" : "var(--hw-white)",
                    }}
                  >
                    <p className="text-xs font-semibold mb-0.5" style={{ color: "var(--hw-ink)" }}>{d.label}</p>
                    <p className="text-xs" style={{ color: "var(--hw-ink-muted)" }}>{d.sublabel}</p>
                    <p className="text-xs font-medium mt-1" style={{ color: "var(--hw-gold)" }}>{d.date}</p>
                    {d.extra && <p className="text-[10px]" style={{ color: "var(--hw-ink-muted)" }}>{d.extra}</p>}
                  </button>
                ))}
              </div>

              {/* Installation toggle */}
              <label className="flex items-center gap-3 cursor-pointer mb-8">
                <input
                  type="checkbox"
                  checked={installation}
                  onChange={(e) => setInstallation(e.target.checked)}
                  className="rounded"
                />
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--hw-ink)" }}>Add professional installation (+₹1,200)</p>
                  <p className="text-xs" style={{ color: "var(--hw-ink-muted)" }}>Certified installer will contact you within 24 hours</p>
                </div>
              </label>

              <button
                onClick={() => setStep("payment")}
                disabled={!deliveryValid}
                className="px-8 py-3 text-sm font-semibold rounded-md disabled:opacity-40"
                style={{ background: "var(--hw-ink)", color: "var(--hw-white)" }}
              >
                Continue to Payment
              </button>
            </div>

            {/* Summary sidebar */}
            <OrderSummary subtotal={subtotal} gst={gst} delivery={delivery} installation={installation} total={total} />
          </motion.div>
        )}

        {/* PAYMENT */}
        {step === "payment" && (
          <motion.div
            key="payment"
            variants={stepFade}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-[1fr_320px] gap-8"
          >
            <div>
              <h2 className="text-xl mb-6" style={{ color: "var(--hw-ink)", fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 400 }}>Payment Method</h2>
              <div className="space-y-3 mb-8">
                {/* UPI */}
                <div
                  className="rounded-lg border p-4 cursor-pointer"
                  style={{
                    borderColor: payMethod === "upi" ? "var(--hw-gold)" : "var(--hw-surface-3)",
                    background: payMethod === "upi" ? "var(--hw-gold-light)" : "var(--hw-white)",
                  }}
                  onClick={() => setPayMethod("upi")}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <input type="radio" checked={payMethod === "upi"} onChange={() => setPayMethod("upi")} />
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "var(--hw-ink)" }}>UPI</p>
                      <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold" style={{ background: "var(--hw-green)", color: "var(--hw-white)" }}>Recommended</span>
                    </div>
                  </div>
                  {payMethod === "upi" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                      {/* Tab toggle */}
                      <div className="flex gap-1 p-1 rounded-lg mb-3 mt-2" style={{ background: "var(--hw-surface-3)" }}>
                        {(["id", "qr"] as const).map((tab) => (
                          <button
                            key={tab}
                            onClick={(e) => { e.stopPropagation(); setUpiTab(tab); }}
                            className="flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors"
                            style={{
                              background: upiTab === tab ? "var(--hw-white)" : "transparent",
                              color: upiTab === tab ? "var(--hw-ink)" : "var(--hw-ink-muted)",
                            }}
                          >
                            {tab === "id" ? "UPI ID" : "QR Code"}
                          </button>
                        ))}
                      </div>
                      {upiTab === "id" ? (
                        <input
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="yourname@upi"
                          className="w-full px-3 py-2 text-sm border rounded-md outline-none"
                          style={{ borderColor: "var(--hw-surface-3)", color: "var(--hw-ink)", background: "var(--hw-white)" }}
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <div
                            className="w-[120px] h-[120px] rounded-lg flex items-center justify-center"
                            style={{ background: "var(--hw-surface-3)" }}
                          >
                            <span className="text-xs font-medium text-center" style={{ color: "var(--hw-ink-muted)" }}>Scan to pay</span>
                          </div>
                          <p className="text-xs" style={{ color: "var(--hw-ink-muted)" }}>Open any UPI app and scan</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>

                {/* Net Banking */}
                <div
                  className="rounded-lg border p-4 cursor-pointer"
                  style={{
                    borderColor: payMethod === "netbanking" ? "var(--hw-gold)" : "var(--hw-surface-3)",
                    background: payMethod === "netbanking" ? "var(--hw-gold-light)" : "var(--hw-white)",
                  }}
                  onClick={() => setPayMethod("netbanking")}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <input type="radio" checked={payMethod === "netbanking"} onChange={() => setPayMethod("netbanking")} />
                    <p className="text-sm font-semibold" style={{ color: "var(--hw-ink)" }}>Net Banking</p>
                  </div>
                  {payMethod === "netbanking" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <select
                        value={bank}
                        onChange={(e) => setBank(e.target.value)}
                        className="w-full px-3 py-2 text-sm border rounded-md outline-none mt-1"
                        style={{ borderColor: "var(--hw-surface-3)", color: "var(--hw-ink)", background: "var(--hw-white)" }}
                      >
                        {BANKS.map((b) => <option key={b}>{b}</option>)}
                      </select>
                    </motion.div>
                  )}
                </div>

                {/* No Cost EMI */}
                <div
                  className="rounded-lg border p-4 cursor-pointer"
                  style={{
                    borderColor: payMethod === "emi" ? "var(--hw-gold)" : "var(--hw-surface-3)",
                    background: payMethod === "emi" ? "var(--hw-gold-light)" : "var(--hw-white)",
                  }}
                  onClick={() => setPayMethod("emi")}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <input type="radio" checked={payMethod === "emi"} onChange={() => setPayMethod("emi")} />
                    <p className="text-sm font-semibold" style={{ color: "var(--hw-ink)" }}>No Cost EMI</p>
                  </div>
                  {payMethod === "emi" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 mt-2">
                      {[3, 6, 9, 12].map((months) => (
                        <button
                          key={months}
                          onClick={(e) => { e.stopPropagation(); setEmiTenure(months); }}
                          className="px-3 py-1.5 text-xs font-medium rounded-md border"
                          style={{
                            borderColor: emiTenure === months ? "var(--hw-gold)" : "var(--hw-surface-3)",
                            background: emiTenure === months ? "var(--hw-gold)" : "transparent",
                            color: emiTenure === months ? "var(--hw-white)" : "var(--hw-ink)",
                          }}
                        >
                          {months}m
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* Card */}
                <div
                  className="rounded-lg border p-4 cursor-pointer"
                  style={{
                    borderColor: payMethod === "card" ? "var(--hw-gold)" : "var(--hw-surface-3)",
                    background: payMethod === "card" ? "var(--hw-gold-light)" : "var(--hw-white)",
                  }}
                  onClick={() => setPayMethod("card")}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <input type="radio" checked={payMethod === "card"} onChange={() => setPayMethod("card")} />
                    <p className="text-sm font-semibold" style={{ color: "var(--hw-ink)" }}>Debit / Credit Card</p>
                  </div>
                  {payMethod === "card" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2 mt-2">
                      <input
                        value={card.number}
                        onChange={(e) => setCard({ ...card, number: e.target.value.replace(/\D/g, "").slice(0, 16) })}
                        placeholder="Card number"
                        className="w-full px-3 py-2 text-sm border rounded-md outline-none"
                        style={{ borderColor: "var(--hw-surface-3)", color: "var(--hw-ink)", background: "var(--hw-white)" }}
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          value={card.expiry}
                          onChange={(e) => setCard({ ...card, expiry: e.target.value.slice(0, 5) })}
                          placeholder="MM/YY"
                          className="px-3 py-2 text-sm border rounded-md outline-none"
                          style={{ borderColor: "var(--hw-surface-3)", color: "var(--hw-ink)", background: "var(--hw-white)" }}
                        />
                        <input
                          value={card.cvv}
                          onChange={(e) => setCard({ ...card, cvv: e.target.value.replace(/\D/g, "").slice(0, 3) })}
                          placeholder="CVV"
                          type="password"
                          className="px-3 py-2 text-sm border rounded-md outline-none"
                          style={{ borderColor: "var(--hw-surface-3)", color: "var(--hw-ink)", background: "var(--hw-white)" }}
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep("delivery")}
                  className="px-6 py-3 text-sm font-medium rounded-md border"
                  style={{ borderColor: "var(--hw-surface-3)", color: "var(--hw-ink-muted)" }}
                >
                  Back
                </button>
                <button
                  onClick={placeOrder}
                  className="px-8 py-3 text-sm font-semibold rounded-md"
                  style={{ background: "var(--hw-ink)", color: "var(--hw-white)" }}
                >
                  Place Order — ₹{total.toLocaleString("en-IN")}
                </button>
              </div>
            </div>

            <OrderSummary subtotal={subtotal} gst={gst} delivery={delivery} installation={installation} total={total} />
          </motion.div>
        )}

        {/* CONFIRMATION */}
        {step === "confirm" && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="max-w-lg mx-auto py-16 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: "var(--hw-green)" }}
            >
              <CheckCircle size={40} style={{ color: "var(--hw-white)" }} />
            </motion.div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--hw-gold)" }}>
              Order Confirmed
            </p>
            <h1 className="text-3xl mb-3" style={{ color: "var(--hw-ink)", fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 400 }}>
              Your order has been placed!
            </h1>
            <p className="text-2xl font-bold mb-2" style={{ color: "var(--hw-gold)" }}>
              #{orderId}
            </p>
            <p className="text-sm mb-2" style={{ color: "var(--hw-ink-muted)" }}>
              Estimated delivery: {DELIVERY_DATES[selectedDate].date}
            </p>
            <p className="text-sm mb-10" style={{ color: "var(--hw-ink-muted)" }}>
              A confirmation has been sent to your registered mobile number.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/work/holmesworld/orders/hw-2024-00847"
                className="w-full py-3 text-sm font-semibold rounded-md text-center"
                style={{ background: "var(--hw-ink)", color: "var(--hw-white)" }}
              >
                Track Order
              </Link>
              <Link
                href="/work/holmesworld"
                className="w-full py-3 text-sm font-medium rounded-md border text-center"
                style={{ borderColor: "var(--hw-surface-3)", color: "var(--hw-ink-muted)" }}
              >
                Continue Shopping
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function OrderSummary({
  subtotal, gst, delivery, installation, total,
}: {
  subtotal: number; gst: number; delivery: number; installation: boolean; total: number;
}) {
  return (
    <div className="rounded-xl border p-5 sticky top-24" style={{ background: "var(--hw-white)", borderColor: "var(--hw-surface-3)" }}>
      <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--hw-ink)" }}>Order Summary</h3>
      <div className="space-y-2.5 text-sm mb-4">
        <div className="flex justify-between">
          <span style={{ color: "var(--hw-ink-muted)" }}>Subtotal</span>
          <span style={{ color: "var(--hw-ink)" }}>₹{subtotal.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: "var(--hw-ink-muted)" }}>GST (12%)</span>
          <span style={{ color: "var(--hw-ink)" }}>₹{gst.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: "var(--hw-ink-muted)" }}>Delivery</span>
          {delivery === 0
            ? <span style={{ color: "var(--hw-green)", fontWeight: 600 }}>FREE</span>
            : <span style={{ color: "var(--hw-ink)" }}>₹{delivery}</span>}
        </div>
        {installation && (
          <div className="flex justify-between">
            <span style={{ color: "var(--hw-ink-muted)" }}>Installation</span>
            <span style={{ color: "var(--hw-ink)" }}>₹1,200</span>
          </div>
        )}
      </div>
      <div className="flex justify-between pt-3 border-t font-semibold" style={{ borderColor: "var(--hw-surface-3)", color: "var(--hw-ink)" }}>
        <span>Total</span>
        <span style={{ color: "var(--hw-gold)" }}>₹{total.toLocaleString("en-IN")}</span>
      </div>
    </div>
  );
}
