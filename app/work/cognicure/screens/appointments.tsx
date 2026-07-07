"use client";
import React from "react";

const C = {
  bg: "#F5F5F0", surface: "#FFFFFF",
  navy: "#1B3A5C", teal: "#3D9B8F", tealLight: "#E8F5F3",
  muted: "#6B7A8D", subtle: "#9AAABB",
  border: "#E8EBF2", textBody: "#4A5568",
};

export function AppointmentsScreen() {
  return (
    <div style={{ width: 390, background: C.bg, fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', system-ui, sans-serif", overflow: "hidden" }}>
      {/* Status bar */}
      <div style={{ background: C.surface, padding: "14px 20px 8px", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: C.navy }}>9:41</span>
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
            {[1,2,3].map(i => <div key={i} style={{ width: 3, height: 5 + i * 3, background: C.navy, borderRadius: 1 }} />)}
          </div>
          <span style={{ fontSize: 11 }}>🔋</span>
        </div>
      </div>

      <div style={{ background: C.surface, padding: "4px 20px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 16, color: C.teal }}>‹</span>
        <p style={{ fontSize: 17, fontWeight: 400, color: C.navy, letterSpacing: "0em", fontFamily: "var(--font-display), var(--font-display), serif" }}>My Consultations</p>
        <span style={{ fontSize: 13, fontWeight: 600, color: C.teal }}>+ New Booking</span>
      </div>

      {/* Upcoming */}
      <div style={{ background: C.surface, padding: "0 20px 16px" }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>UPCOMING (2)</p>

        <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
          {[
            { name: "Dr. Tanuja Chandra", badge: "In 2 days", emoji: "👩‍⚕️" },
            { name: "Physiotherapist", badge: "", emoji: "🧑‍⚕️" },
          ].map((appt, i) => (
            <div key={i} style={{ flex: 1, background: "#FAFAFA", borderRadius: 12, padding: 14, border: `1px solid ${C.border}`, position: "relative", overflow: "hidden" }}>
              {appt.badge && <p style={{ fontSize: 10, fontWeight: 600, color: C.teal, marginBottom: 8 }}>{appt.badge}</p>}
              {!appt.badge && <div style={{ height: 18, marginBottom: 8 }} />}
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#D4E8E5", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8, fontSize: 20 }}>
                {appt.emoji}
              </div>
              <p style={{ fontSize: 12, fontWeight: 700, color: C.navy }}>{appt.name}</p>
            </div>
          ))}
        </div>

        {/* Past bookings */}
        <div style={{ height: 1, background: C.border, marginBottom: 16 }} />
        <p style={{ fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>PAST BOOKINGS</p>

        {[
          { name: "Dr. Tanuja Chandra", spec: "General Physician", reason: "Follow-up", date: "Thu, 2 Mar, 2023" },
          { name: "Dr. Mahima Gupta", spec: "Physiotherapist", reason: "Muscle pain", date: "Fri, 24 Feb, 2023" },
          { name: "Dr. Nischhal Shetty", spec: "General Physician", reason: "Fever, body pain, difficulty in breathing and...", date: "Thu, 26 Jan, 2023" },
          { name: "Dr. Nischhal Shetty", spec: "General Physician", reason: "Having pain in lower back for last ten days a...", date: "Mon, 21 Dec, 2022" },
        ].map((past, i) => (
          <div key={i} style={{ paddingBottom: 14, marginBottom: 14, borderBottom: i < 3 ? `1px solid ${C.border}` : "none", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 2 }}>{past.name}</p>
              <p style={{ fontSize: 11, color: C.muted, marginBottom: 2 }}>{past.spec}</p>
              <p style={{ fontSize: 11, color: C.textBody }}>{past.reason}</p>
            </div>
            <p style={{ fontSize: 10, color: C.muted, flexShrink: 0, marginLeft: 8, marginTop: 2 }}>{past.date}</p>
          </div>
        ))}
      </div>

      {/* FAB */}
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "0 20px 20px" }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: C.teal, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 6px 16px ${C.teal}50` }}>
          <span style={{ fontSize: 24, color: "#fff", fontWeight: 300 }}>+</span>
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{ background: C.surface, borderTop: `1px solid ${C.border}`, padding: "10px 0 20px", display: "flex", justifyContent: "space-around" }}>
        {[{ icon: "🏠", label: "Home", a: false }, { icon: "📅", label: "Consultations", a: true }, { icon: "+", fab: true }, { icon: "👥", label: "My Circle", a: false }, { icon: "❤️", label: "Health Wallet", a: false }].map((tab, i) =>
          (tab as { fab?: boolean }).fab ? (
            <div key={i} style={{ width: 40, height: 40, borderRadius: "50%", background: C.teal, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 20, color: "#fff" }}>+</span>
            </div>
          ) : (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <span style={{ fontSize: 16 }}>{tab.icon}</span>
              <span style={{ fontSize: 8, fontWeight: (tab as {a?:boolean}).a ? 700 : 400, color: (tab as {a?:boolean}).a ? C.teal : C.subtle, textAlign: "center" }}>{tab.label}</span>
              {(tab as {a?:boolean}).a && <div style={{ width: 3, height: 3, borderRadius: "50%", background: C.teal }} />}
            </div>
          )
        )}
      </div>
    </div>
  );
}
