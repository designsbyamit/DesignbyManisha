"use client";
import React from "react";

interface PhoneFrameProps { children: React.ReactNode; }

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div style={{
      width: 390,
      height: 844,
      borderRadius: 48,
      background: "#F5F5F0",
      boxShadow: "0 0 0 10px #1A1A1A, 0 0 0 12px #2D2D2D, 0 40px 80px rgba(0,0,0,0.6)",
      position: "relative",
      overflow: "hidden",
      flexShrink: 0,
    }}>
      {/* Notch */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: 120, height: 34, background: "#1A1A1A", borderRadius: "0 0 20px 20px",
        zIndex: 100,
      }} />
      {/* Side buttons (decorative) */}
      <div style={{ position: "absolute", left: -12, top: 120, width: 4, height: 32, background: "#2D2D2D", borderRadius: "4px 0 0 4px" }} />
      <div style={{ position: "absolute", left: -12, top: 164, width: 4, height: 56, background: "#2D2D2D", borderRadius: "4px 0 0 4px" }} />
      <div style={{ position: "absolute", left: -12, top: 232, width: 4, height: 56, background: "#2D2D2D", borderRadius: "4px 0 0 4px" }} />
      <div style={{ position: "absolute", right: -12, top: 160, width: 4, height: 72, background: "#2D2D2D", borderRadius: "0 4px 4px 0" }} />
      {/* Screen content */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: 48 }}>
        {children}
      </div>
    </div>
  );
}
