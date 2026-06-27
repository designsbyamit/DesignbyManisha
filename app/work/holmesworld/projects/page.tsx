import Link from "next/link";
import { TrendingUp, Clock, ShoppingCart, Package } from "lucide-react";
import { projects } from "../../../../lib/holmesworld/data/projects";
import { orders } from "../../../../lib/holmesworld/data/orders";
import { products } from "../../../../lib/holmesworld/data/products";

export const metadata = { title: "Project Workspace — HomesWorld" };

function ProgressRing({ percent }: { percent: number }) {
  const r = 36;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;
  return (
    <svg width="88" height="88" viewBox="0 0 88 88">
      <circle cx="44" cy="44" r={r} fill="none" stroke="var(--hw-surface-3)" strokeWidth="6" />
      <circle
        cx="44"
        cy="44"
        r={r}
        fill="none"
        stroke="var(--hw-gold)"
        strokeWidth="6"
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 44 44)"
      />
      <text x="44" y="48" textAnchor="middle" className="text-sm font-bold" fill="var(--hw-ink)" style={{ fontSize: "14px", fontWeight: 700 }}>
        {percent}%
      </text>
    </svg>
  );
}

export default function ProjectsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--hw-gold)" }}>Account</p>
        <h1 className="text-3xl font-semibold" style={{ color: "var(--hw-ink)" }}>Project Workspace</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--hw-ink-muted)" }}>{projects.length} active projects</p>
      </div>

      <div className="space-y-6">
        {projects.map((project) => {
          const projectOrders = orders.filter((o) => project.orders.includes(o.id));
          const pendingProducts = project.pendingItems
            .map((id) => products.find((p) => p.id === id))
            .filter(Boolean) as typeof products;
          const budgetPercent = Math.round((project.spent / project.budget) * 100);
          const remaining = project.budget - project.spent;

          return (
            <div key={project.id} className="rounded-2xl border overflow-hidden" style={{ background: "var(--hw-white)", borderColor: "var(--hw-surface-3)" }}>
              {/* Header */}
              <div className="flex items-center justify-between px-8 py-6 border-b" style={{ background: "var(--hw-surface-2)", borderColor: "var(--hw-surface-3)" }}>
                <div>
                  <h2 className="text-lg font-semibold" style={{ color: "var(--hw-ink)" }}>{project.name}</h2>
                  <p className="text-sm mt-0.5" style={{ color: "var(--hw-ink-muted)" }}>
                    📍 {project.location} · Last updated {new Date(project.lastUpdated).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </p>
                </div>
                <ProgressRing percent={project.completionPercent} />
              </div>

              {/* Budget */}
              <div className="px-8 py-6 border-b" style={{ borderColor: "var(--hw-surface-3)" }}>
                <div className="flex items-start justify-between mb-4">
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--hw-ink-muted)" }}>
                    <TrendingUp size={12} className="inline mr-1" />Budget
                  </p>
                  <p className="text-xs" style={{ color: "var(--hw-ink-muted)" }}>{budgetPercent}% spent</p>
                </div>
                <div className="grid grid-cols-3 gap-6 mb-4">
                  {[
                    { label: "Total Budget", value: project.budget },
                    { label: "Spent", value: project.spent },
                    { label: "Remaining", value: remaining },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-xs mb-0.5" style={{ color: "var(--hw-ink-muted)" }}>{label}</p>
                      <p className="text-base font-semibold" style={{ color: label === "Remaining" ? "var(--hw-green)" : "var(--hw-ink)" }}>
                        ₹{(value / 100000).toFixed(1)}L
                      </p>
                    </div>
                  ))}
                </div>
                {/* Budget progress bar */}
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--hw-surface-3)" }}>
                  <div
                    className="h-2 rounded-full"
                    style={{ width: `${Math.min(budgetPercent, 100)}%`, background: "var(--hw-gold)" }}
                  />
                </div>
              </div>

              {/* Orders */}
              {projectOrders.length > 0 && (
                <div className="px-8 py-5 border-b" style={{ borderColor: "var(--hw-surface-3)" }}>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--hw-ink-muted)" }}>
                    <Package size={12} className="inline mr-1" />Orders ({projectOrders.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {projectOrders.map((order) => (
                      <Link
                        key={order.id}
                        href={`/work/holmesworld/orders/${order.id}`}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors"
                        style={{ borderColor: "var(--hw-surface-3)", color: "var(--hw-ink)" }}
                      >
                        #{order.id}
                        <span
                          className="text-[10px] px-1.5 py-0.5 rounded-full"
                          style={{
                            background: order.status === "Delivered" ? "rgba(45,106,79,0.12)" : "rgba(59,130,246,0.12)",
                            color: order.status === "Delivered" ? "var(--hw-green)" : "rgb(37,99,235)",
                          }}
                        >
                          {order.status}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Pending items */}
              {pendingProducts.length > 0 && (
                <div className="px-8 py-5">
                  <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--hw-ink-muted)" }}>
                    <Clock size={12} className="inline mr-1" />Pending Purchases ({pendingProducts.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {pendingProducts.map((p) => (
                      <Link
                        key={p.id}
                        href={`/work/holmesworld/products/${p.slug}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium"
                        style={{ borderColor: "var(--hw-amber)", color: "var(--hw-amber)", background: "rgba(212,130,26,0.06)" }}
                      >
                        <ShoppingCart size={10} />
                        {p.name.split(" ").slice(0, 3).join(" ")}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
