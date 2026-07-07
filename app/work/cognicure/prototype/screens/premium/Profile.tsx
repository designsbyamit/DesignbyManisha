"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Bell, Shield, Smartphone, Heart, Globe, Moon } from "lucide-react";
import { C, RADIUS, TYPE, SHADOW } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import type { ScreenProps, ScreenId } from "../../types";

interface SettingRow {
  icon: React.ReactNode;
  label: string;
  value?: string;
  toggle?: boolean;
  to?: ScreenId;
  danger?: boolean;
}

const SECTIONS: { title: string; rows: SettingRow[] }[] = [
  {
    title: "Account",
    rows: [
      { icon: "👴", label: "Chandrashekhar Nair", value: "+91 98127 82927" },
      { icon: <Bell size={18} />, label: "Notifications", toggle: true },
      { icon: <Globe size={18} />, label: "Language", value: "English" },
    ],
  },
  {
    title: "Health & Safety",
    rows: [
      { icon: "🆘", label: "Emergency Mode", to: "emergencyMode" as ScreenId },
      { icon: "🤖", label: "AI Health Companion", to: "aiCompanion" as ScreenId },
      { icon: <Heart size={18} />, label: "Apple Health Sync", toggle: true },
    ],
  },
  {
    title: "Privacy",
    rows: [
      { icon: <Shield size={18} />, label: "Privacy Settings" },
      { icon: <Smartphone size={18} />, label: "Connected Devices" },
      { icon: <Moon size={18} />, label: "Biometric Lock", toggle: true },
    ],
  },
];

export function ProfileScreen({ navigate, goBack }: ScreenProps) {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    "Notifications": true,
    "Apple Health Sync": true,
    "Biometric Lock": true,
  });

  return (
    <div style={{ width: 390, height: 844, background: C.bg, display: "flex", flexDirection: "column", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", overflow: "hidden" }}>
      <div style={{ background: C.surface }}>
        <StatusBar />
        <div style={{ padding: "4px 24px 20px" }}>
          <button onClick={goBack} style={{ background: "none", border: "none", color: C.teal, fontSize: 22, cursor: "pointer", padding: 0, marginBottom: 16, display: "block" }}>‹</button>
          {/* Avatar */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: C.tealLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30 }}>👴</div>
            <div>
              <p style={{ fontSize: TYPE.h3, fontWeight: 800, color: C.navy, letterSpacing: "-0.02em", fontFamily: "var(--font-display), Georgia, serif" }}>Chandrashekhar Nair</p>
              <p style={{ fontSize: TYPE.small, color: C.muted }}>63 years · O+ · Retired Govt. Employee</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "12px 20px 40px", display: "flex", flexDirection: "column", gap: 8 }}>
        {SECTIONS.map(section => (
          <div key={section.title}>
            <p style={{ fontSize: TYPE.caption, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", margin: "14px 0 8px" }}>{section.title}</p>
            <div style={{ background: C.surface, borderRadius: RADIUS.lg, overflow: "hidden", boxShadow: SHADOW.card }}>
              {section.rows.map((row, i) => (
                <motion.div
                  key={row.label}
                  whileTap={row.to ? { backgroundColor: C.bg } : {}}
                  onClick={row.to ? () => navigate(row.to!) : undefined}
                  style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 14, borderBottom: i < section.rows.length - 1 ? `1px solid ${C.border}` : "none", cursor: row.to ? "pointer" : "default" }}
                >
                  <div style={{ width: 36, height: 36, borderRadius: RADIUS.sm, background: C.tealLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: typeof row.icon === "string" ? 20 : undefined, color: C.teal, flexShrink: 0 }}>
                    {row.icon}
                  </div>
                  <p style={{ flex: 1, fontSize: TYPE.small, fontWeight: 500, color: row.danger ? C.danger : C.navy }}>{row.label}</p>
                  {row.value && <p style={{ fontSize: TYPE.caption, color: C.muted }}>{row.value}</p>}
                  {row.toggle && (
                    <motion.button
                      onClick={(e) => { e.stopPropagation(); setToggles(t => ({ ...t, [row.label]: !t[row.label] })); }}
                      animate={{ backgroundColor: toggles[row.label] ? C.teal : C.border }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      style={{ width: 44, height: 24, borderRadius: 12, border: "none", cursor: "pointer", position: "relative", flexShrink: 0 }}
                    >
                      <motion.div
                        animate={{ left: toggles[row.label] ? 22 : 2 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        style={{ position: "absolute", top: 2, width: 20, height: 20, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}
                      />
                    </motion.button>
                  )}
                  {row.to && <ChevronRight size={14} color={C.subtle} />}
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {/* Sign out */}
        <div style={{ marginTop: 8, background: C.surface, borderRadius: RADIUS.lg, overflow: "hidden" }}>
          <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <p style={{ fontSize: TYPE.small, fontWeight: 600, color: C.danger }}>Sign out</p>
          </div>
        </div>
      </div>
    </div>
  );
}
