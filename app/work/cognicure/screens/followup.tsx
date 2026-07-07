"use client";
import React from "react";

const C = {
  bg: "#F5F5F0", surface: "#FFFFFF",
  navy: "#1B3A5C", teal: "#3D9B8F", tealLight: "#E8F5F3",
  muted: "#6B7A8D", subtle: "#9AAABB",
  border: "#E8EBF2", textBody: "#4A5568",
};

/* Video consultation in progress */
export function FollowUpScreen() {
  return (
    <div style={{ width: 390, background: "#1A1A2E", fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', system-ui, sans-serif", overflow: "hidden", position: "relative" }}>
      {/* Status bar */}
      <div style={{ padding: "14px 20px 8px", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>9:41</span>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
            {[1,2,3].map(i => <div key={i} style={{ width: 3, height: 5 + i * 3, background: "#fff", borderRadius: 1 }} />)}
          </div>
          <span style={{ fontSize: 11 }}>🔋</span>
        </div>
      </div>

      {/* Main video area — doctor face (full screen bg) */}
      <div style={{ background: "linear-gradient(180deg, #2C4A70 0%, #1A2E4A 100%)", height: 460, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* Doctor avatar big */}
        <div style={{
          width: 200, height: 260, borderRadius: 24,
          background: "linear-gradient(135deg, #3D6B9C, #5B8DB8)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 80,
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
        }}>
          👨‍⚕️
        </div>

        {/* PiP — patient */}
        <div style={{
          position: "absolute", top: 16, right: 16,
          width: 80, height: 100, borderRadius: 14,
          background: "linear-gradient(135deg, #5B8DB8, #7EAED0)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 36,
          border: "2px solid rgba(255,255,255,0.3)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
        }}>
          👴
          {/* Minimise icon */}
          <div style={{ position: "absolute", bottom: 6, right: 6, width: 18, height: 18, borderRadius: "50%", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 10, color: "#fff" }}>⤡</span>
          </div>
        </div>

        {/* Call info overlay */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
          padding: "32px 24px 24px",
        }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 2 }}>Chandrasekhar Nair</p>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>12:04</p>
        </div>
      </div>

      {/* Call controls */}
      <div style={{
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(10px)",
        padding: "24px 0 32px",
        display: "flex", justifyContent: "center", alignItems: "center", gap: 28,
      }}>
        {/* Mic */}
        <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 20, color: "#fff" }}>🎤</span>
        </div>
        {/* End call */}
        <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#E53E3E", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 20px rgba(229,62,62,0.5)" }}>
          <span style={{ fontSize: 22, color: "#fff" }}>📞</span>
        </div>
        {/* Speaker */}
        <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 20, color: "#fff" }}>🔊</span>
        </div>
      </div>
    </div>
  );
}
