"use client";
import React from "react";

/* Real CogniCure palette: warm off-white bg, dark navy headings, teal accent */
const C = {
  bg: "#F5F5F0",
  surface: "#FFFFFF",
  navy: "#1B3A5C",
  teal: "#3D9B8F",
  tealLight: "#E8F5F3",
  muted: "#6B7A8D",
  subtle: "#9AAABB",
  border: "#E8EBF2",
  textBody: "#4A5568",
};

export function PatientDashboard() {
  return (
    <div style={{ width: 390, background: C.bg, fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', system-ui, sans-serif", overflow: "hidden" }}>
      {/* iOS status bar */}
      <div style={{ background: C.surface, padding: "14px 20px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: C.navy }}>9:41</span>
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
            {[1,2,3].map(i => <div key={i} style={{ width: 3, height: 5 + i * 3, background: C.navy, borderRadius: 1, opacity: i === 3 ? 1 : 0.6 }} />)}
          </div>
          <span style={{ fontSize: 11 }}>📶</span>
          <div style={{ width: 22, height: 11, border: `1.5px solid ${C.navy}`, borderRadius: 3, position: "relative", marginLeft: 2 }}>
            <div style={{ position: "absolute", left: 2, top: 1.5, bottom: 1.5, width: "80%", background: C.navy, borderRadius: 1 }} />
            <div style={{ position: "absolute", right: -4, top: "50%", transform: "translateY(-50%)", width: 2, height: 5, background: C.navy, borderRadius: 1 }} />
          </div>
        </div>
      </div>

      {/* Top bar with hamburger + avatar */}
      <div style={{ background: C.surface, padding: "0 20px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {[14, 10].map((w, i) => <div key={i} style={{ width: w, height: 2, background: C.teal, borderRadius: 2 }} />)}
        </div>
        <div style={{ position: "relative" }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#D4E8E5", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 18 }}>👨‍⚕️</span>
          </div>
          <div style={{ position: "absolute", bottom: 0, right: 0, width: 12, height: 12, borderRadius: "50%", background: C.teal, border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontSize: 7, fontWeight: 700 }}>!</span>
          </div>
        </div>
      </div>

      {/* Greeting */}
      <div style={{ background: C.surface, padding: "0 20px 20px" }}>
        <p style={{ fontSize: 22, fontWeight: 400, color: C.navy, letterSpacing: "-0.01em", marginBottom: 2, fontFamily: "var(--font-display), var(--font-display), serif" }}>Hi Chandrashekhar!</p>
        <p style={{ fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>MY CONSULTATIONS</p>

        {/* Consultation cards horizontal scroll */}
        <div style={{ display: "flex", gap: 12, overflowX: "hidden", marginBottom: 0 }}>
          {[
            { doctor: "Dr. Nischhal Shetty", note: "Abdominal pain and feeling a discomfo...", date: "Thursday, 6 Mar 2023", badge: "Tomorrow", emoji: "👨‍⚕️" },
            { doctor: "Dr. Tanuja Chandra", note: "Regular follow-up", date: "Thursday, 16 Mar 2023", badge: "", emoji: "👩‍⚕️" },
          ].map((c, i) => (
            <div key={i} style={{ background: C.bg, borderRadius: 14, padding: "14px", minWidth: 150, flexShrink: 0, position: "relative" }}>
              {c.badge && (
                <div style={{ position: "absolute", top: 10, right: 10, background: "transparent" }}>
                  <span style={{ fontSize: 10, fontWeight: 600, color: C.teal }}>{c.badge}</span>
                </div>
              )}
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#D4E8E5", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8, fontSize: 20 }}>
                {c.emoji}
              </div>
              <p style={{ fontSize: 12, fontWeight: 700, color: C.navy, marginBottom: 4 }}>{c.doctor}</p>
              <p style={{ fontSize: 10, color: C.textBody, lineHeight: 1.4, marginBottom: 4 }}>{c.note}</p>
              <p style={{ fontSize: 9, color: C.muted }}>{c.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 8, background: C.bg }} />

      {/* Energy activity */}
      <div style={{ background: C.surface, padding: "18px 20px" }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: C.navy, marginBottom: 2 }}>Average Energy Activity</p>
        <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 2 }}>
          <span style={{ fontSize: 20, fontWeight: 900, color: C.navy }}>2,985</span>
          <span style={{ fontSize: 9, color: C.muted }}>kcal</span>
        </div>
        <p style={{ fontSize: 9, color: C.muted, marginBottom: 12 }}>Avg. per day</p>
        {[
          { label: "Mar 23", active: 72, resting: 20 },
          { label: "Feb 23", active: 58, resting: 28 },
          { label: "Jan 23", active: 45, resting: 32 },
          { label: "Dec 22", active: 36, resting: 40 },
        ].map((row) => (
          <div key={row.label} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
            <span style={{ fontSize: 8, color: C.muted, width: 28, flexShrink: 0 }}>{row.label}</span>
            <div style={{ flex: 1, display: "flex", gap: 2, height: 10 }}>
              <div style={{ width: `${row.active}%`, background: C.teal, borderRadius: 2, opacity: 0.9 }} />
              <div style={{ width: `${row.resting}%`, background: "#BFD8D5", borderRadius: 2 }} />
            </div>
          </div>
        ))}
        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 8, height: 8, background: C.teal, borderRadius: 1 }} />
            <span style={{ fontSize: 8, color: C.muted }}>Active Calories</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 8, height: 8, background: "#BFD8D5", borderRadius: 1 }} />
            <span style={{ fontSize: 8, color: C.muted }}>Resting Calories</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 8, background: C.bg }} />

      {/* Invites */}
      <div style={{ background: C.surface, padding: "16px 20px" }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>INVITES</p>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#E8D5CC", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
            👩
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: C.navy }}>Pooja Suresh</p>
            <p style={{ fontSize: 10, color: C.muted }}>Adithyapuram, Palakkad</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.teal, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: 14 }}>✓</span>
            </div>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#E53E3E", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: 14 }}>✕</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{ background: C.surface, borderTop: `1px solid ${C.border}`, padding: "10px 0 20px", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
        {[
          { icon: "🏠", label: "Home", active: true },
          { icon: "📅", label: "Consultations", active: false },
          { icon: "+", label: "", fab: true },
          { icon: "👥", label: "My Circle", active: false },
          { icon: "❤️", label: "Health Wallet", active: false },
        ].map((tab, i) =>
          tab.fab ? (
            <div key={i} style={{ width: 44, height: 44, borderRadius: "50%", background: C.teal, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 14px ${C.teal}50` }}>
              <span style={{ fontSize: 22, color: "#fff", fontWeight: 300, lineHeight: 1 }}>+</span>
            </div>
          ) : (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <span style={{ fontSize: 18 }}>{tab.icon}</span>
              <span style={{ fontSize: 8, fontWeight: tab.active ? 700 : 400, color: tab.active ? C.teal : C.subtle, textAlign: "center", lineHeight: 1.2 }}>{tab.label}</span>
              {tab.active && <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.teal }} />}
            </div>
          )
        )}
      </div>
    </div>
  );
}
