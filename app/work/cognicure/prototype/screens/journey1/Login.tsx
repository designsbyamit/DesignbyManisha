// app/work/cognicure/prototype/screens/journey1/Login.tsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { C, RADIUS, TYPE, SHADOW } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import { Button } from "../../components/Button";
import type { ScreenProps } from "../../types";

export function LoginScreen({ navigate }: ScreenProps) {
  const [phone, setPhone] = useState("");

  return (
    <div style={{
      width: 390, height: 844,
      background: `radial-gradient(ellipse 300px 300px at 85% 8%, ${C.tealGlow} 0%, transparent 70%),
                   radial-gradient(ellipse 260px 260px at 5% 92%, rgba(232,168,56,0.12) 0%, transparent 70%),
                   ${C.bg}`,
      display: "flex", flexDirection: "column",
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", overflow: "hidden",
    }}>
      <StatusBar />

      {/* Header with floating medical icons */}
      <div style={{ position: "relative", padding: "16px 32px 0", textAlign: "center" }}>
        {/* decorative floating icons */}
        {[
          { icon: "💊", top: 20, left: 30, size: 18, opacity: 0.18 },
          { icon: "🩺", top: 8,  right: 40, size: 20, opacity: 0.15 },
          { icon: "🔬", top: 50, left: 60, size: 16, opacity: 0.12 },
          { icon: "+",  top: 35, right: 70, size: 18, opacity: 0.14, color: C.teal },
        ].map((d, i) => (
          <div key={i} style={{ position: "absolute", top: d.top, left: (d as any).left, right: (d as any).right, fontSize: d.size, opacity: d.opacity }}>
            {d.icon}
          </div>
        ))}

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, paddingTop: 16 }}>
          <svg width="44" height="44" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="38" stroke={C.teal} strokeWidth="4" strokeLinecap="round" strokeDasharray="180 60" strokeDashoffset="30" />
            <circle cx="40" cy="40" r="26" stroke={C.teal} strokeWidth="3.5" strokeLinecap="round" strokeDasharray="120 50" strokeDashoffset="20" />
            <circle cx="40" cy="40" r="7" fill={C.mustard} />
          </svg>
          <p style={{ fontSize: 11, fontWeight: 800, color: C.teal, letterSpacing: "0.12em", textTransform: "uppercase" }}>COGNICUYR</p>
        </div>
      </div>

      {/* Hero illustrations */}
      <div style={{ flex: 1, display: "flex", alignItems: "flex-end", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: -20, left: -20, width: 130, height: 160, background: C.tealLight, borderRadius: "50% 50% 40% 60%", opacity: 0.5 }} />
        <div style={{ position: "absolute", bottom: -10, right: -20, width: 120, height: 150, background: C.mustardLight, borderRadius: "40% 60% 50% 50%", opacity: 0.6 }} />

        <div style={{ position: "relative", textAlign: "center", paddingBottom: 32, zIndex: 1 }}>
          <p style={{ fontSize: 26, fontWeight: 700, color: C.navy, letterSpacing: "-0.03em", lineHeight: 1.2,
            fontFamily: "var(--font-display), Georgia, serif", marginBottom: 6 }}>
            Holistic health<br />for the whole family!
          </p>
          <p style={{ fontSize: 12, color: C.muted }}>
            Hasslefree &nbsp;•&nbsp; Trusted &nbsp;•&nbsp; Connected
          </p>
        </div>
      </div>

      {/* Input */}
      <div style={{ padding: "0 24px 32px", background: C.bg }}>
        <div style={{
          display: "flex", alignItems: "center",
          border: `1.5px solid ${C.border}`, borderRadius: RADIUS.xl,
          background: C.surface, overflow: "hidden",
          boxShadow: SHADOW.card, marginBottom: 16,
        }}>
          {/* Country code */}
          <div style={{ padding: "16px 12px 16px 18px", display: "flex", alignItems: "center", gap: 6, borderRight: `1px solid ${C.border}` }}>
            <span style={{ fontSize: 18 }}>🇮🇳</span>
            <span style={{ fontSize: TYPE.body, color: C.navy, fontWeight: 600 }}>+91</span>
            <span style={{ fontSize: 10, color: C.muted }}>▾</span>
          </div>
          {/* Phone input (simulated) */}
          <div style={{ flex: 1, padding: "16px 18px", fontSize: TYPE.body, color: phone ? C.navy : C.subtle, fontWeight: 500 }}>
            {phone || "Enter mobile number"}
          </div>
        </div>

        {/* Simulated number pad buttons for interaction */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
          {["9", "8", "8", "8", "8", "8", "8", "8", "8", "8"].map((d, i) => (
            <button
              key={i}
              onClick={() => setPhone(p => p.length < 10 ? p + d : p)}
              style={{ width: 34, height: 34, borderRadius: 8, background: C.tealLight, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, color: C.teal }}
            >
              {d}
            </button>
          ))}
          <button onClick={() => setPhone(p => p.slice(0,-1))} style={{ width: 34, height: 34, borderRadius: 8, background: "#FFE8E8", border: "none", cursor: "pointer", fontSize: 12, color: C.danger }}>⌫</button>
        </div>

        <Button label="Continue" onPress={() => navigate("otp")} variant="primary" fullWidth />

        <p style={{ textAlign: "center", fontSize: TYPE.caption, color: C.muted, marginTop: 14, lineHeight: 1.6 }}>
          By continuing, you agree to our{" "}
          <span style={{ color: C.teal, fontWeight: 600 }}>Terms of Service</span>
          {" "}and{" "}
          <span style={{ color: C.teal, fontWeight: 600 }}>Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}
