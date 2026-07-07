/* ─────────────────────────────────────────────────────────────────────────────
   HexSolve Enterprise Design Tokens
───────────────────────────────────────────────────────────────────────────── */

export const T = {
  // Brand
  red: "#CC2929",
  redHover: "#B52323",
  redLight: "#FFF0F0",
  redSubtle: "#FDEAEA",

  // Neutrals
  ink: "#111827",
  ink70: "#374151",
  ink50: "#6B7280",
  ink30: "#9CA3AF",
  ink10: "#D1D5DB",

  // Surface
  bg: "#F8F9FA",
  surface: "#FFFFFF",
  surface2: "#F3F4F6",
  surface3: "#E5E7EB",

  // Semantic
  green: "#059669",
  greenBg: "#D1FAE5",
  amber: "#D97706",
  amberBg: "#FEF3C7",
  blue: "#2563EB",
  blueBg: "#DBEAFE",
  purple: "#7C3AED",
  purpleBg: "#EDE9FE",

  // Sidebar
  sidebar: "#1F2937",
  sidebarHover: "#374151",
  sidebarActive: "#CC2929",
  sidebarText: "#D1D5DB",
  sidebarTextActive: "#FFFFFF",

  // Typography — Plus Jakarta Sans loaded via CSS variable from layout.tsx
  fontSans: "var(--font-jakarta), 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",

  // Spacing
  radius: "8px",
  radiusMd: "10px",
  radiusLg: "12px",
  radiusXl: "16px",

  // Shadow
  shadowSm: "0 1px 2px rgba(0,0,0,0.05)",
  shadowMd: "0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -1px rgba(0,0,0,0.04)",
  shadowLg: "0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.04)",
} as const;

/* ── Status helpers ── */
export type Status = "active" | "review" | "approved" | "draft" | "closed" | "failed";
export function statusMeta(s: Status) {
  return {
    active:   { label: "Active",     bg: "#DBEAFE", text: "#1D4ED8", dot: "#3B82F6" },
    review:   { label: "In Review",  bg: T.amberBg, text: "#92400E", dot: T.amber },
    approved: { label: "Approved",   bg: T.greenBg, text: "#065F46", dot: T.green },
    draft:    { label: "Draft",      bg: T.surface2, text: T.ink50, dot: T.ink30 },
    closed:   { label: "Closed",     bg: T.surface2, text: T.ink50, dot: T.ink30 },
    failed:   { label: "Failed",     bg: T.redSubtle, text: T.red, dot: T.red },
  }[s];
}
