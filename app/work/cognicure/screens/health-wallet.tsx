"use client";
import React from "react";

const C = {
  bg: "#F5F5F0", surface: "#FFFFFF",
  navy: "#1B3A5C", teal: "#3D9B8F", tealLight: "#E8F5F3",
  muted: "#6B7A8D", subtle: "#9AAABB",
  border: "#E8EBF2", textBody: "#4A5568",
};

export function HealthWalletScreen() {
  return (
    <div style={{ width: 390, background: C.bg, fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', system-ui, sans-serif", overflow: "hidden" }}>
      {/* Status bar */}
      <div style={{ background: C.surface, padding: "14px 20px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: C.navy }}>9:41</span>
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
            {[1,2,3].map(i => <div key={i} style={{ width: 3, height: 5 + i * 3, background: C.navy, borderRadius: 1 }} />)}
          </div>
          <span style={{ fontSize: 11 }}>🔋</span>
        </div>
      </div>

      {/* Header */}
      <div style={{ background: C.surface, padding: "4px 20px 18px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 11, color: C.subtle, marginBottom: 2 }}>Your health wallet</p>
            <p style={{ fontSize: 20, fontWeight: 400, color: C.navy, letterSpacing: "0em", fontFamily: "var(--font-display), var(--font-display), serif" }}>Health Wallet</p>
          </div>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: C.tealLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 18 }}>❤️</span>
          </div>
        </div>
      </div>

      {/* Summary card */}
      <div style={{ padding: "16px 20px 0" }}>
        <div style={{ background: C.navy, borderRadius: 18, padding: "20px 22px", marginBottom: 20, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(61,155,143,0.2)" }} />
          <div style={{ position: "absolute", bottom: -20, left: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
          <p style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Health Score</p>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 12 }}>
            <span style={{ fontSize: 40, fontWeight: 400, color: "#fff", letterSpacing: "0em", fontFamily: "var(--font-display), var(--font-display), serif" }}>82</span>
            <span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>/100</span>
            <div style={{ marginLeft: 4, background: C.teal, borderRadius: 100, padding: "3px 8px" }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#fff" }}>↑ Good</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            {[
              { label: "Heart", value: "72 bpm", ok: true },
              { label: "BP", value: "118/76", ok: true },
              { label: "BMI", value: "23.4", ok: true },
            ].map((item) => (
              <div key={item.label}>
                <p style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>{item.label}</p>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          {[
            { icon: "📋", label: "Prescriptions", count: "3 active", color: C.teal, bg: C.tealLight },
            { icon: "🧪", label: "Lab Reports", count: "New result", color: "#4F6EF7", bg: "#EEF1FF" },
            { icon: "🩺", label: "Body Vitals", count: "Log today", color: C.navy, bg: "#E8EEF5" },
            { icon: "📊", label: "History", count: "12 entries", color: "#D97706", bg: "#FEF3C7" },
          ].map((item) => (
            <div key={item.label} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10, fontSize: 17 }}>
                {item.icon}
              </div>
              <p style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 2 }}>{item.label}</p>
              <p style={{ fontSize: 11, color: item.color, fontWeight: 600 }}>{item.count}</p>
            </div>
          ))}
        </div>

        {/* Recent activity */}
        <p style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 12 }}>Recent</p>
        {[
          { icon: "🧪", label: "CBC Panel ready", sub: "Today · Dr. Chen", dot: C.teal },
          { icon: "💊", label: "Lisinopril refill due", sub: "Dec 28 · Reminder", dot: "#D97706" },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, paddingBottom: 14, marginBottom: 14, borderBottom: i === 0 ? `1px solid ${C.border}` : "none" }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: C.tealLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 17 }}>{item.icon}</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: C.navy, marginBottom: 2 }}>{item.label}</p>
              <p style={{ fontSize: 11, color: C.subtle }}>{item.sub}</p>
            </div>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: item.dot, flexShrink: 0 }} />
          </div>
        ))}
      </div>

      {/* Bottom nav */}
      <div style={{ background: C.surface, borderTop: `1px solid ${C.border}`, padding: "10px 0 20px", display: "flex", justifyContent: "space-around" }}>
        {[
          { icon: "🏠", label: "Home", a: false },
          { icon: "📅", label: "Consultations", a: false },
          { icon: "+", fab: true },
          { icon: "👥", label: "My Circle", a: false },
          { icon: "❤️", label: "Health Wallet", a: true },
        ].map((tab, i) =>
          (tab as { fab?: boolean }).fab ? (
            <div key={i} style={{ width: 40, height: 40, borderRadius: "50%", background: C.teal, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 20, color: "#fff" }}>+</span>
            </div>
          ) : (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <span style={{ fontSize: 18 }}>{tab.icon}</span>
              <span style={{ fontSize: 8, fontWeight: (tab as {a?:boolean}).a ? 700 : 400, color: (tab as {a?:boolean}).a ? C.teal : C.subtle, textAlign: "center" }}>{tab.label}</span>
              {(tab as {a?:boolean}).a && <div style={{ width: 3, height: 3, borderRadius: "50%", background: C.teal }} />}
            </div>
          )
        )}
      </div>
    </div>
  );
}
