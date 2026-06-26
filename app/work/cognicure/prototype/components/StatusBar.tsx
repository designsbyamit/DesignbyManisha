// app/work/cognicure/prototype/components/StatusBar.tsx
"use client";
import React from "react";
import { C, TYPE } from "../tokens";

interface StatusBarProps { dark?: boolean; }

export function StatusBar({ dark = false }: StatusBarProps) {
  const fg = dark ? "#FFFFFF" : C.navy;
  return (
    <div style={{ padding: "14px 24px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontSize: TYPE.small, fontWeight: 700, color: fg, fontVariantNumeric: "tabular-nums" }}>9:41</span>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        {/* Signal bars */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
          {[4, 7, 10, 13].map((h, i) => (
            <div key={i} style={{ width: 3, height: h, background: i < 3 ? fg : `${fg}40`, borderRadius: 1 }} />
          ))}
        </div>
        {/* WiFi icon */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 10.5a1 1 0 100 2 1 1 0 000-2z" fill={fg}/>
          <path d="M4.93 7.93a4.5 4.5 0 016.14 0" stroke={fg} strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M2.34 5.34a8 8 0 0111.32 0" stroke={fg} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5"/>
        </svg>
        {/* Battery */}
        <div style={{ width: 24, height: 12, border: `1.5px solid ${fg}`, borderRadius: 3, position: "relative", display: "flex", alignItems: "center", padding: "1.5px 2px" }}>
          <div style={{ flex: 1, height: "100%", background: fg, borderRadius: 1.5 }} />
          <div style={{ position: "absolute", right: -4, top: "50%", transform: "translateY(-50%)", width: 2.5, height: 6, background: `${fg}80`, borderRadius: 1 }} />
        </div>
      </div>
    </div>
  );
}
