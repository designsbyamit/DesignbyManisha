"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { orders } from "../../../../lib/holmesworld/data/orders";

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  Processing: { bg: "var(--hw-surface-3)", color: "var(--hw-ink-muted)" },
  Confirmed: { bg: "var(--hw-gold-light)", color: "var(--hw-gold)" },
  Dispatched: { bg: "rgba(59,130,246,0.12)", color: "rgb(37,99,235)" },
  "Out for Delivery": { bg: "rgba(59,130,246,0.12)", color: "rgb(37,99,235)" },
  Delivered: { bg: "rgba(45,106,79,0.12)", color: "var(--hw-green)" },
};

type Tab = "All" | "Processing" | "In Transit" | "Delivered";

const TABS: Tab[] = ["All", "Processing", "In Transit", "Delivered"];

function matchesTab(status: string, tab: Tab): boolean {
  if (tab === "All") return true;
  if (tab === "Processing") return status === "Processing" || status === "Confirmed";
  if (tab === "In Transit") return status === "Dispatched" || status === "Out for Delivery";
  if (tab === "Delivered") return status === "Delivered";
  return false;
}

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<Tab>("All");

  const filteredOrders = orders.filter((o) => matchesTab(o.status, activeTab));

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--hw-gold)" }}>Account</p>
        <h1 className="text-3xl font-semibold" style={{ color: "var(--hw-ink)" }}>My Orders</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--hw-ink-muted)" }}>{orders.length} orders</p>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 mb-8 flex-wrap">
        {TABS.map((tab) => {
          const count = orders.filter((o) => matchesTab(o.status, tab)).length;
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-sm font-medium transition-colors"
              style={{
                background: isActive ? "var(--hw-ink)" : "transparent",
                borderColor: isActive ? "var(--hw-ink)" : "var(--hw-surface-3)",
                color: isActive ? "var(--hw-white)" : "var(--hw-ink-muted)",
              }}
            >
              {tab}
              <span
                className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none"
                style={{
                  background: isActive ? "rgba(255,255,255,0.2)" : "var(--hw-surface-3)",
                  color: isActive ? "var(--hw-white)" : "var(--hw-ink-muted)",
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        {filteredOrders.length === 0 && (
          <p className="text-sm py-8 text-center" style={{ color: "var(--hw-ink-muted)" }}>No orders in this category.</p>
        )}
        {filteredOrders.map((order) => {
          const style = STATUS_STYLES[order.status] ?? STATUS_STYLES.Processing;
          const previewItems = order.items.slice(0, 3);
          const extraCount = order.items.length - 3;

          return (
            <div key={order.id} className="rounded-xl border p-6" style={{ background: "var(--hw-white)", borderColor: "var(--hw-surface-3)" }}>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--hw-ink-muted)" }}>Order #{order.id}</p>
                  <p className="text-xs" style={{ color: "var(--hw-ink-muted)" }}>Placed on {new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full shrink-0" style={{ background: style.bg, color: style.color }}>{order.status}</span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                {previewItems.map(({ product }) => (
                  <div key={product.id} className="relative w-14 h-14 rounded-lg overflow-hidden border" style={{ borderColor: "var(--hw-surface-3)" }}>
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="56px" />
                  </div>
                ))}
                {extraCount > 0 && (
                  <div className="w-14 h-14 rounded-lg flex items-center justify-center text-sm font-semibold" style={{ background: "var(--hw-surface-2)", color: "var(--hw-ink-muted)" }}>+{extraCount}</div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <p className="text-sm"><span style={{ color: "var(--hw-ink-muted)" }}>Total: </span><span className="font-semibold" style={{ color: "var(--hw-ink)" }}>₹{order.total.toLocaleString("en-IN")}</span></p>
                  <p className="text-xs" style={{ color: "var(--hw-ink-muted)" }}>{order.paymentMethod}</p>
                </div>
                <Link href={`/work/holmesworld/orders/${order.id}`} className="flex items-center gap-1 text-sm font-medium" style={{ color: "var(--hw-gold)" }}>View Order <ChevronRight size={14} /></Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
