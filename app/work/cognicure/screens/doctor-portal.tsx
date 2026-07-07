"use client";
import React from "react";

const C = {
  bg: "#F5F5F0", surface: "#FFFFFF",
  navy: "#1B3A5C", teal: "#3D9B8F", tealLight: "#E8F5F3",
  muted: "#6B7A8D", subtle: "#9AAABB",
  border: "#E8EBF2", textBody: "#4A5568",
};

/* My Circles screen */
export function DoctorPortalScreen() {
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

      {/* Back nav */}
      <div style={{ padding: "0 20px 4px" }}>
        <span style={{ fontSize: 16, color: C.teal }}>‹</span>
      </div>

      {/* Title */}
      <div style={{ padding: "8px 20px 20px" }}>
        <p style={{ fontSize: 24, fontWeight: 400, color: C.navy, letterSpacing: "0em", marginBottom: 8, fontFamily: "var(--font-display), var(--font-display), serif" }}>My Circles</p>
        <p style={{ fontSize: 13, color: C.textBody, lineHeight: 1.6, marginBottom: 0 }}>
          Bringing your network closer - family, friends and your doctors.
        </p>
      </div>

      {/* Circle categories */}
      {[
        {
          label: "My Family",
          desc: "Add your family members to avail the benefits of a complete healthcare...",
          emoji: "👨‍👩‍👧",
          bg: "#FFF5E4",
        },
        {
          label: "Doctors",
          desc: "Add the healthcare professionals who are always there...",
          emoji: "👨‍⚕️",
          bg: "#E8F5F3",
        },
        {
          label: "Friends",
          desc: "Add your buddies who support you in difficult times and counsel you with the most valuable advice.",
          emoji: "👫",
          bg: "#F0F0FF",
        },
      ].map((circle) => (
        <div key={circle.label} style={{
          margin: "0 20px 16px",
          background: C.bg,
          borderRadius: 16,
          padding: 16,
          display: "flex",
          gap: 16,
          alignItems: "center",
          border: `1px solid ${C.border}`,
        }}>
          {/* Illustration circle */}
          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            background: circle.bg, flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 32,
          }}>
            {circle.emoji}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: C.navy, marginBottom: 4 }}>{circle.label}</p>
            <p style={{ fontSize: 11, color: C.textBody, lineHeight: 1.55 }}>{circle.desc}</p>
          </div>
        </div>
      ))}

      {/* CTA button */}
      <div style={{ padding: "8px 20px 20px" }}>
        <div style={{
          background: C.teal, borderRadius: 100, padding: "15px 0",
          textAlign: "center", boxShadow: `0 6px 16px ${C.teal}40`,
        }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#fff", letterSpacing: "0.01em" }}>
            Let&apos;s complete circles
          </span>
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{ borderTop: `1px solid ${C.border}`, padding: "10px 0 20px", display: "flex", justifyContent: "space-around" }}>
        {[{ icon: "🏠", label: "Home", a: false }, { icon: "📅", label: "Consultations", a: false }, { icon: "+", fab: true }, { icon: "👥", label: "My Circle", a: true }, { icon: "❤️", label: "Health Wallet", a: false }].map((tab, i) =>
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
