import Link from "next/link";
import Image from "next/image";
import { categories } from "../../../../lib/holmesworld/data/categories";

export const metadata = {
  title: "All Categories — HomesWorld",
};

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--hw-gold)" }}>
          Browse
        </p>
        <h1 className="text-4xl font-semibold" style={{ color: "var(--hw-ink)" }}>
          All Categories
        </h1>
        <p className="mt-3 text-base" style={{ color: "var(--hw-ink-muted)" }}>
          {categories.length} categories · {categories.reduce((s, c) => s + c.productCount, 0)} products
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link key={cat.id} href={`/work/holmesworld/categories/${cat.slug}`}>
            <div
              className="group rounded-lg overflow-hidden border transition-shadow hover:shadow-lg"
              style={{
                background: "var(--hw-white)",
                borderColor: "var(--hw-surface-3)",
              }}
            >
              <div className="relative aspect-[16/7] overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-5">
                <h2 className="text-base font-semibold mb-1" style={{ color: "var(--hw-ink)" }}>
                  {cat.name}
                </h2>
                <p className="text-xs mb-3" style={{ color: "var(--hw-ink-muted)" }}>
                  {cat.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {cat.subcategories.slice(0, 3).map((sub) => (
                      <span
                        key={sub}
                        className="text-[11px] px-2 py-0.5 rounded-full"
                        style={{
                          background: "var(--hw-gold-light)",
                          color: "var(--hw-ink-muted)",
                        }}
                      >
                        {sub}
                      </span>
                    ))}
                    {cat.subcategories.length > 3 && (
                      <span
                        className="text-[11px] px-2 py-0.5 rounded-full"
                        style={{
                          background: "var(--hw-surface-2)",
                          color: "var(--hw-ink-muted)",
                        }}
                      >
                        +{cat.subcategories.length - 3}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-medium" style={{ color: "var(--hw-gold)" }}>
                    {cat.productCount} products →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
