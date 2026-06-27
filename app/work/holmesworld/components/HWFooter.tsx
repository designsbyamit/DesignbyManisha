import Link from "next/link";

export default function HWFooter() {
  return (
    <footer
      className="border-t mt-24"
      style={{
        background: "var(--hw-surface-dark)",
        borderColor: "var(--hw-surface-3)",
        color: "var(--hw-white)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          {/* About */}
          <div>
            <div className="flex items-center gap-1 mb-4">
              <span className="text-lg" style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 400 }}>Homes</span>
              <span className="text-lg" style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 400, color: "var(--hw-accent)" }}>World</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
              Premium construction materials for Indian homes. Delivered fast, priced right.
            </p>
          </div>

          {/* Categories */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--hw-accent)" }}>
              Categories
            </p>
            <ul className="space-y-2">
              {["Tiles & Flooring", "Bathroom Fittings", "Cement & Concrete", "Steel & TMT", "Paints"].map((item) => (
                <li key={item}>
                  <Link
                    href="/work/holmesworld/categories"
                    className="text-sm transition-colors hover:text-[var(--hw-accent)]"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--hw-accent)" }}>
              Support
            </p>
            <ul className="space-y-2">
              {["Track Order", "Returns Policy", "Bulk Orders", "Installation Help", "Contact Us"].map((item) => (
                <li key={item}>
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--hw-accent)" }}>
              Connect
            </p>
            <ul className="space-y-2">
              {["Instagram", "YouTube", "LinkedIn", "WhatsApp Business"].map((item) => (
                <li key={item}>
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            © HomesWorld 2025. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            Made in India 🇮🇳 · GST: 29AABCH1234M1Z5
          </p>
        </div>
      </div>
    </footer>
  );
}
