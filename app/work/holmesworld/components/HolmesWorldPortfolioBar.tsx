"use client";

import Link from "next/link";

export function HolmesWorldPortfolioBar() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 500,
        height: 40,
        background: "#0e0e0e",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 clamp(1rem, 3vw, 2.5rem)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Left — context label */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          Portfolio Case Study
        </span>
        <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 11 }}>·</span>
        <span
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.55)",
            fontWeight: 600,
          }}
        >
          HomesWorld
        </span>
      </div>

      {/* Right — nav */}
      <div style={{ display: "flex", alignItems: "center", gap: "clamp(0.75rem, 2vw, 1.5rem)" }}>
        <Link
          href="/work"
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.5)",
            textDecoration: "none",
            fontWeight: 500,
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#c8a96e")}
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)")
          }
        >
          ← All Work
        </Link>
        <Link
          href="/"
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.35)",
            textDecoration: "none",
            fontWeight: 500,
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)")}
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)")
          }
        >
          M.
        </Link>
      </div>
    </div>
  );
}
