import Link from "next/link";
import Image from "next/image";
import { ChevronRight, CheckCircle, Circle, MapPin } from "lucide-react";
import { orders } from "../../../../../lib/holmesworld/data/orders";

export const metadata = { title: "Order Detail — HolmesWorld" };

const TRACKING_STEPS = [
  "Order Placed",
  "Confirmed",
  "Dispatched",
  "Out for Delivery",
  "Delivered",
];

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold mb-4" style={{ color: "var(--hw-ink)" }}>Order not found</h1>
        <Link href="/work/holmesworld/orders" className="text-sm" style={{ color: "var(--hw-gold)" }}>← Back to Orders</Link>
      </div>
    );
  }

  const completedStatuses = new Set(order.trackingEvents.map((e) => e.status));
  const currentStepIndex = TRACKING_STEPS.findIndex((s) => s === order.status);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs mb-8" style={{ color: "var(--hw-ink-muted)" }}>
        <Link href="/work/holmesworld">Home</Link>
        <ChevronRight size={12} />
        <Link href="/work/holmesworld/orders">Orders</Link>
        <ChevronRight size={12} />
        <span style={{ color: "var(--hw-ink)" }}>#{order.id}</span>
      </nav>

      {/* Order header */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-10 p-6 rounded-xl border" style={{ background: "var(--hw-white)", borderColor: "var(--hw-surface-3)" }}>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--hw-ink-muted)" }}>Order</p>
          <h1 className="text-2xl font-semibold" style={{ color: "var(--hw-ink)" }}>#{order.id}</h1>
          <p className="text-sm mt-1" style={{ color: "var(--hw-ink-muted)" }}>
            Placed on {new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs" style={{ color: "var(--hw-ink-muted)" }}>Total</p>
          <p className="text-2xl font-semibold" style={{ color: "var(--hw-gold)" }}>₹{order.total.toLocaleString("en-IN")}</p>
          <p className="text-xs" style={{ color: "var(--hw-ink-muted)" }}>{order.paymentMethod}</p>
        </div>
      </div>

      {/* Tracking timeline */}
      <div className="mb-12 p-6 rounded-xl border" style={{ background: "var(--hw-white)", borderColor: "var(--hw-surface-3)" }}>
        <h2 className="text-base font-semibold mb-6" style={{ color: "var(--hw-ink)" }}>Tracking</h2>

        {/* Vertical tracking timeline */}
        <div className="space-y-0">
          {TRACKING_STEPS.map((stepLabel, i) => {
            const isCompleted = completedStatuses.has(stepLabel) || i <= currentStepIndex;
            const isCurrent = stepLabel === order.status;
            const event = order.trackingEvents.find((e) => e.status === stepLabel);
            const isLast = i === TRACKING_STEPS.length - 1;

            return (
              <div key={stepLabel} className="flex gap-4">
                {/* Left: circle + connector line */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center border-2 shrink-0 relative z-10"
                    style={{
                      background: isCompleted ? "var(--hw-gold)" : "var(--hw-white)",
                      borderColor: isCompleted ? "var(--hw-gold)" : "var(--hw-surface-3)",
                      ...(isCurrent ? { boxShadow: "0 0 0 4px rgba(212,163,26,0.2)" } : {}),
                    }}
                  >
                    {isCompleted ? (
                      <CheckCircle size={14} style={{ color: "var(--hw-white)" }} />
                    ) : (
                      <Circle size={10} style={{ color: "var(--hw-surface-3)" }} />
                    )}
                  </div>
                  {!isLast && (
                    <div
                      className="w-0.5 flex-1 min-h-[32px]"
                      style={{ background: i < currentStepIndex ? "var(--hw-gold)" : "var(--hw-surface-3)" }}
                    />
                  )}
                </div>
                {/* Right: content */}
                <div className={`pb-6${isLast ? " pb-0" : ""}`}>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: isCurrent ? "var(--hw-ink)" : isCompleted ? "var(--hw-ink)" : "var(--hw-ink-muted)" }}
                  >
                    {stepLabel}
                    {isCurrent && (
                      <span className="ml-2 text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ background: "var(--hw-gold-light)", color: "var(--hw-gold)" }}>
                        Current
                      </span>
                    )}
                  </p>
                  {event ? (
                    <>
                      <p className="text-xs mt-0.5" style={{ color: "var(--hw-ink-muted)" }}>{event.description}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--hw-ink-muted)" }}>{event.date}</p>
                    </>
                  ) : (
                    <p className="text-xs mt-0.5" style={{ color: "var(--hw-ink-muted)" }}>Pending</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Line items */}
      <div className="mb-10 rounded-xl border overflow-hidden" style={{ borderColor: "var(--hw-surface-3)" }}>
        <div className="px-6 py-4 border-b" style={{ background: "var(--hw-surface-2)", borderColor: "var(--hw-surface-3)" }}>
          <h2 className="text-base font-semibold" style={{ color: "var(--hw-ink)" }}>Items ({order.items.length})</h2>
        </div>
        <div style={{ background: "var(--hw-white)" }}>
          {order.items.map(({ product, quantity }) => (
            <div key={product.id} className="flex items-center gap-4 px-6 py-4 border-b last:border-b-0" style={{ borderColor: "var(--hw-surface-3)" }}>
              <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
                <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="56px" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs mb-0.5" style={{ color: "var(--hw-ink-muted)" }}>{product.brand}</p>
                <p className="text-sm font-semibold line-clamp-1" style={{ color: "var(--hw-ink)" }}>{product.name}</p>
                <p className="text-xs" style={{ color: "var(--hw-ink-muted)" }}>Qty: {quantity} {product.unit}</p>
              </div>
              <p className="text-sm font-semibold shrink-0" style={{ color: "var(--hw-gold)" }}>
                ₹{(product.price * quantity).toLocaleString("en-IN")}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery address */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="p-5 rounded-xl border" style={{ background: "var(--hw-white)", borderColor: "var(--hw-surface-3)" }}>
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={14} style={{ color: "var(--hw-gold)" }} />
            <p className="text-sm font-semibold" style={{ color: "var(--hw-ink)" }}>Delivery Address</p>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--hw-ink-muted)" }}>
            {order.address.flatNo}, {order.address.building}<br />
            {order.address.locality}<br />
            {order.address.city}, {order.address.state} — {order.address.pincode}
          </p>
        </div>
        <div className="p-5 rounded-xl border" style={{ background: "var(--hw-white)", borderColor: "var(--hw-surface-3)" }}>
          <p className="text-sm font-semibold mb-3" style={{ color: "var(--hw-ink)" }}>Bill Summary</p>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between"><span style={{ color: "var(--hw-ink-muted)" }}>Subtotal</span><span>₹{order.subtotal.toLocaleString("en-IN")}</span></div>
            <div className="flex justify-between"><span style={{ color: "var(--hw-ink-muted)" }}>GST</span><span>₹{order.gst.toLocaleString("en-IN")}</span></div>
            <div className="flex justify-between"><span style={{ color: "var(--hw-ink-muted)" }}>Delivery</span><span>{order.delivery === 0 ? "FREE" : `₹${order.delivery}`}</span></div>
            <div className="flex justify-between font-semibold border-t pt-1.5 mt-1.5" style={{ borderColor: "var(--hw-surface-3)", color: "var(--hw-ink)" }}>
              <span>Total</span><span style={{ color: "var(--hw-gold)" }}>₹{order.total.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-sm" style={{ color: "var(--hw-ink-muted)" }}>
        Need help with this order?{" "}
        <Link href="/work/holmesworld" className="font-medium" style={{ color: "var(--hw-gold)" }}>
          Contact Support
        </Link>
      </p>
    </div>
  );
}
