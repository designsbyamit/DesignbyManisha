"use client";
import React from "react";

const C = {
  bg: "#F5F5F0", surface: "#FFFFFF",
  navy: "#1B3A5C", teal: "#3D9B8F", tealLight: "#E8F5F3",
  muted: "#6B7A8D", subtle: "#9AAABB",
  border: "#E8EBF2", textBody: "#4A5568",
};

export function MedicalRecordsScreen() {
  return (
    <div style={{ width: 390, background: C.bg, fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', system-ui, sans-serif", overflow: "hidden" }}>
      {/* Status bar */}
      <div style={{ background: C.surface, padding: "14px 20px 8px", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: C.navy }}>9:41</span>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
            {[1,2,3].map(i => <div key={i} style={{ width: 3, height: 5 + i * 3, background: C.navy, borderRadius: 1 }} />)}
          </div>
          <span style={{ fontSize: 11 }}>🔋</span>
        </div>
      </div>

      <div style={{ background: C.surface, padding: "4px 20px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 16, color: C.teal }}>‹</span>
        <p style={{ fontSize: 17, fontWeight: 400, color: C.navy, fontFamily: "var(--font-display), var(--font-display), serif" }}>Prescriptions</p>
        <div style={{ width: 24 }} />
      </div>

      {/* Subtitle */}
      <div style={{ background: C.surface, padding: "0 20px 16px", borderBottom: `1px solid ${C.border}` }}>
        <p style={{ fontSize: 12, color: C.textBody }}>All your health data at one place.</p>
      </div>

      {/* Prescriptions list */}
      <div style={{ background: C.surface, padding: "0 20px" }}>
        {[
          { name: "Dr. Nischhal Shetty", spec: "General Physician", reason: "Abdominal pain and discomfort...", date: "Mon, 6 Mar, 2023", img: "👨‍⚕️" },
          { name: "Dr. Tanuja Chandra", spec: "General Physician", reason: "Follow-up", date: "Thu, 2 Mar, 2023", img: "👩‍⚕️" },
          { name: "Dr. Mahima Gupta", spec: "Physiotherapist", reason: "Muscle pain", date: "Fri, 24 Feb, 2023", img: "🧑‍⚕️" },
          { name: "Dr. Nischhal Shetty", spec: "General Physician", reason: "Fever, body pain, difficulty in breathing and...", date: "Thu, 26 Jan, 2023", img: "👨‍⚕️" },
        ].map((rx, i) => (
          <div key={i} style={{ paddingTop: 14, paddingBottom: 14, borderBottom: `1px solid ${C.border}`, display: "flex", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#D4E8E5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 20 }}>
              {rx.img}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: C.navy }}>{rx.name}</p>
                <p style={{ fontSize: 10, color: C.muted }}>{rx.date}</p>
              </div>
              <p style={{ fontSize: 11, color: C.muted, marginBottom: 2 }}>{rx.spec}</p>
              <p style={{ fontSize: 11, color: C.textBody }}>{rx.reason}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom sheet pull — Health menu */}
      <div style={{ background: C.surface, borderRadius: "20px 20px 0 0", boxShadow: "0 -4px 20px rgba(0,0,0,0.1)", padding: "12px 20px 0", marginTop: 8 }}>
        <div style={{ width: 32, height: 3, background: C.border, borderRadius: 100, margin: "0 auto 16px" }} />

        <p style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 12 }}>My Health</p>

        {[
          { label: "Prescriptions" },
          { label: "Lab Reports", arrow: true },
          { label: "Discharge Summary", arrow: true },
        ].map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 12, marginBottom: 12, borderBottom: `1px solid ${C.border}` }}>
            <span style={{ fontSize: 13, color: C.textBody }}>{item.label}</span>
            {item.arrow && <span style={{ fontSize: 14, color: C.muted }}>›</span>}
          </div>
        ))}

        <p style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 12 }}>My Lifestyle</p>
        {["Body Vitals", "Lifestyle preferences", "Food habit"].map((item) => (
          <div key={item} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 10, marginBottom: 10, borderBottom: `1px solid ${C.border}` }}>
            <span style={{ fontSize: 13, color: C.textBody }}>{item}</span>
            <span style={{ fontSize: 14, color: C.muted }}>›</span>
          </div>
        ))}
      </div>

      {/* FAB */}
      <div style={{ background: C.surface, display: "flex", justifyContent: "flex-end", padding: "0 20px 20px" }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: C.teal, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 6px 16px ${C.teal}50` }}>
          <span style={{ fontSize: 24, color: "#fff", fontWeight: 300 }}>+</span>
        </div>
      </div>
    </div>
  );
}
