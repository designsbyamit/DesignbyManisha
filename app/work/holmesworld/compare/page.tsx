import Link from "next/link";
import Image from "next/image";
import { CheckCircle, XCircle } from "lucide-react";
import { products } from "../../../../lib/holmesworld/data/products";

export const metadata = { title: "Compare Products — HolmesWorld" };

// Pre-select 3 premium bathroom shower products for comparison
const COMPARE_IDS = ["p-009", "p-015", "p-016"];

const COMPARE_ROWS = [
  { label: "Price" },
  { label: "Brand" },
  { label: "Material" },
  { label: "Finish" },
  { label: "Rating" },
  { label: "In Stock" },
  { label: "Delivery" },
];

function getCellValue(product: (typeof products)[0], label: string): string {
  switch (label) {
    case "Price": return `₹${product.price.toLocaleString("en-IN")}/${product.unit}`;
    case "Brand": return product.brand;
    case "Material": return product.specs["Material"] ?? "—";
    case "Finish": return product.specs["Finish"] ?? product.specs["material"] ?? "—";
    case "Rating": return `${product.rating.toFixed(1)} ★ (${product.reviewCount.toLocaleString("en-IN")})`;
    case "In Stock": return product.inStock ? "Yes" : "No";
    case "Delivery": return `${product.deliveryDays} days (metro)`;
    default: return "—";
  }
}

function getBestIndex(compareProducts: typeof products, rowLabel: string): number {
  if (rowLabel === "Price") {
    const prices = compareProducts.map((p) => p.price);
    const minPrice = Math.min(...prices);
    return prices.indexOf(minPrice);
  }
  if (rowLabel === "Rating") {
    const ratings = compareProducts.map((p) => p.rating);
    const maxRating = Math.max(...ratings);
    return ratings.indexOf(maxRating);
  }
  if (rowLabel === "Delivery") {
    const days = compareProducts.map((p) => p.deliveryDays);
    const minDays = Math.min(...days);
    return days.indexOf(minDays);
  }
  return -1; // no best for non-numeric rows
}

export default function ComparePage() {
  const compareProducts = COMPARE_IDS
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as typeof products;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--hw-gold)" }}>
          Compare
        </p>
        <h1 className="text-3xl font-semibold" style={{ color: "var(--hw-ink)" }}>Product Comparison</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--hw-ink-muted)" }}>Side-by-side comparison — Premium bathroom fittings</p>
      </div>

      <div className="rounded-2xl border" style={{ borderColor: "var(--hw-surface-3)" }}>
        {/* Product header row — sticky */}
        <div
          className="grid border-b"
          style={{
            gridTemplateColumns: `200px repeat(${compareProducts.length}, 1fr)`,
            borderColor: "var(--hw-surface-3)",
            background: "var(--hw-surface-2)",
            position: "sticky",
            top: 0,
            zIndex: 40,
            borderRadius: "1rem 1rem 0 0",
          }}
        >
          <div className="p-5 border-r" style={{ borderColor: "var(--hw-surface-3)" }}>
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--hw-ink-muted)" }}>Spec</p>
          </div>
          {compareProducts.map((p) => (
            <div key={p.id} className="p-5 border-r last:border-r-0" style={{ borderColor: "var(--hw-surface-3)" }}>
              <div className="relative aspect-square rounded-lg overflow-hidden mb-3" style={{ background: "var(--hw-white)" }}>
                <Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="200px" />
              </div>
              <p className="text-xs mb-0.5" style={{ color: "var(--hw-ink-muted)" }}>{p.brand}</p>
              <p className="text-sm font-semibold mb-2 line-clamp-2" style={{ color: "var(--hw-ink)" }}>{p.name}</p>
              <p className="text-base font-semibold mb-3" style={{ color: "var(--hw-gold)" }}>
                ₹{p.price.toLocaleString("en-IN")}
                <span className="text-xs font-normal ml-1" style={{ color: "var(--hw-ink-muted)" }}>/{p.unit}</span>
              </p>
              <Link
                href={`/work/holmesworld/products/${p.slug}`}
                className="block text-center py-2 text-xs font-semibold rounded-md"
                style={{ background: "var(--hw-ink)", color: "var(--hw-white)" }}
              >
                Add to Cart
              </Link>
            </div>
          ))}
        </div>

        {/* Comparison rows */}
        <div style={{ overflow: "hidden", borderRadius: "0 0 1rem 1rem" }}>
          {COMPARE_ROWS.map((row, rowIdx) => {
            const bestIndex = getBestIndex(compareProducts, row.label);

            return (
              <div
                key={row.label}
                className="grid border-b last:border-b-0"
                style={{
                  gridTemplateColumns: `200px repeat(${compareProducts.length}, 1fr)`,
                  borderColor: "var(--hw-surface-3)",
                  background: rowIdx % 2 === 0 ? "var(--hw-white)" : "var(--hw-surface)",
                }}
              >
                <div className="p-4 border-r flex items-center" style={{ borderColor: "var(--hw-surface-3)" }}>
                  <p className="text-xs font-semibold" style={{ color: "var(--hw-ink-muted)" }}>{row.label}</p>
                </div>
                {compareProducts.map((p, productIndex) => {
                  const value = getCellValue(p, row.label);
                  const isBest = bestIndex === productIndex;

                  return (
                    <div
                      key={p.id}
                      className="p-4 border-r last:border-r-0 flex flex-col justify-center gap-1"
                      style={{
                        borderColor: "var(--hw-surface-3)",
                        background: isBest ? "var(--hw-gold-light)" : undefined,
                      }}
                    >
                      {isBest && (
                        <span
                          className="inline-block text-[9px] font-bold px-1.5 py-0.5 rounded mb-1 self-start"
                          style={{ background: "var(--hw-gold)", color: "var(--hw-white)" }}
                        >
                          Best
                        </span>
                      )}
                      {row.label === "In Stock" ? (
                        <div className="flex items-center gap-2">
                          {value === "Yes"
                            ? <CheckCircle size={16} style={{ color: "var(--hw-green)" }} />
                            : <XCircle size={16} style={{ color: "var(--hw-ink-muted)" }} />
                          }
                        </div>
                      ) : (
                        <p
                          className="text-sm"
                          style={{
                            color: isBest ? "var(--hw-ink)" : "var(--hw-ink-muted)",
                            fontWeight: isBest ? 600 : 400,
                          }}
                        >
                          {value}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
