"use client";
import React from "react";

const C = {
  bg: "#F5F5F0", surface: "#FFFFFF",
  navy: "#1B3A5C", teal: "#3D9B8F", tealLight: "#E8F5F3",
  muted: "#6B7A8D", subtle: "#9AAABB",
  border: "#E8EBF2", textBody: "#4A5568",
};

/* Add Family Member screen */
export function FamilyScreen() {
  return (
    <div style={{ width: 390, background: C.surface, fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', system-ui, sans-serif", overflow: "hidden" }}>
      {/* Status bar */}
      <div style={{ padding: "14px 20px 8px", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: C.navy }}>9:41</span>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
            {[1,2,3].map(i => <div key={i} style={{ width: 3, height: 5 + i * 3, background: C.navy, borderRadius: 1 }} />)}
          </div>
          <span style={{ fontSize: 11 }}>🔋</span>
        </div>
      </div>

      {/* Header */}
      <div style={{ padding: "8px 20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ width: 24 }} />
        <p style={{ fontSize: 16, fontWeight: 700, color: C.navy }}>Add Family Member</p>
        <span style={{ fontSize: 14, fontWeight: 600, color: C.teal }}>Cancel</span>
      </div>

      {/* Input */}
      <div style={{ padding: "0 20px 32px" }}>
        <p style={{ fontSize: 12, color: C.muted, marginBottom: 10 }}>Mobile number</p>
        <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#FAFAFA" }}>
          <span style={{ fontSize: 15, color: C.navy, fontWeight: 500 }}>98127 82927</span>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.tealLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 14, color: C.teal }}>👤</span>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div style={{ height: 120 }} />

      {/* iOS Keyboard */}
      <div style={{ background: "#D1D3D8" }}>
        {[
          ["1", "2\nABC", "3\nDEF"],
          ["4\nGHI", "5\nJKL", "6\nMNO"],
          ["7\nPQRS", "8\nTUV", "9\nWXYZ"],
          ["+*#", "0", "⌫"],
        ].map((row, ri) => (
          <div key={ri} style={{ display: "flex", gap: 1, marginBottom: 1 }}>
            {row.map((key, ki) => (
              <div key={ki} style={{
                flex: 1, background: key === "⌫" || key === "+*#" ? "#ADB1BA" : "#FFFFFF",
                borderRadius: 5, padding: "12px 0", textAlign: "center",
                boxShadow: "0 1px 0 rgba(0,0,0,0.3)",
              }}>
                <div>
                  {key.split("\n").map((line, li) => (
                    <div key={li} style={{
                      fontSize: li === 0 ? (key.length > 3 ? 13 : 20) : 9,
                      fontWeight: li === 0 ? 400 : 700,
                      color: C.navy,
                      lineHeight: 1.2,
                      letterSpacing: li === 0 ? "-0.01em" : "0.08em",
                    }}>{line}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
        {/* Globe + bottom bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 20px 28px", background: "#D1D3D8" }}>
          <span style={{ fontSize: 18 }}>🌐</span>
          <div style={{ width: 100, height: 4, borderRadius: 100, background: C.navy, opacity: 0.3 }} />
          <div style={{ width: 24 }} />
        </div>
      </div>
    </div>
  );
}
