// app/work/cognicure/prototype/screens/journey4/MedicalReports.tsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { C, RADIUS, TYPE, SHADOW } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import { Header } from "../../components/Header";
import type { ScreenProps } from "../../types";

const TABS = ["Lab Reports", "X-Rays", "Scans"];

const REPORTS = [
  { name: "Complete Blood Count",       date: "6 Mar 2023",  lab: "Metropolis Labs",  status: "Normal",    emoji: "🔬" },
  { name: "Thyroid Profile (T3/T4/TSH)", date: "12 Jan 2023", lab: "SRL Diagnostics", status: "Attention", emoji: "🧬" },
  { name: "Lipid Profile",              date: "5 Nov 2022",  lab: "Metropolis Labs",  status: "Normal",    emoji: "🔬" },
];

export function MedicalReportsScreen({ navigate, goBack }: ScreenProps) {
  const [tab, setTab] = useState(0);

  return (
    <div style={{
      width: 390, height: 844, background: C.bg,
      display: "flex", flexDirection: "column",
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", overflow: "hidden",
    }}>
      <div style={{ background: C.surface }}>
        <StatusBar />
        <Header
          title="Medical Reports"
          onBack={goBack}
          rightLabel="+ Upload"
          onRight={() => navigate("documentScanner")}
        />
        {/* Tab bar */}
        <div style={{ display: "flex", padding: "0 20px 0", borderBottom: `1px solid ${C.border}` }}>
          {TABS.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              style={{
                flex: 1, padding: "10px 0",
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "inherit",
                fontSize: TYPE.small,
                fontWeight: tab === i ? 700 : 400,
                color: tab === i ? C.teal : C.muted,
                borderBottom: tab === i ? `2px solid ${C.teal}` : "2px solid transparent",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
        {tab === 0 && REPORTS.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.3, ease: "easeOut" }}
            style={{
              background: C.surface, borderRadius: RADIUS.lg,
              padding: 16, boxShadow: SHADOW.card,
              display: "flex", gap: 14, alignItems: "center",
            }}
          >
            <div style={{
              width: 48, height: 48, borderRadius: RADIUS.md,
              background: C.tealLight,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 24,
            }}>
              {r.emoji}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: TYPE.small, fontWeight: 700, color: C.navy, marginBottom: 2 }}>{r.name}</p>
              <p style={{ fontSize: TYPE.caption, color: C.muted }}>{r.lab} · {r.date}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
              <div style={{
                background: r.status === "Normal" ? "#E8F8EE" : C.mustardLight,
                borderRadius: RADIUS.full, padding: "3px 10px",
              }}>
                <span style={{
                  fontSize: 9, fontWeight: 700,
                  color: r.status === "Normal" ? C.success : C.mustard,
                }}>
                  {r.status}
                </span>
              </div>
              <Download size={14} color={C.teal} />
            </div>
          </motion.div>
        ))}
        {tab !== 0 && (
          <div style={{
            flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: "60px 32px", gap: 16, textAlign: "center",
          }}>
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              background: C.bg,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 36,
            }}>
              📁
            </div>
            <p style={{ fontSize: TYPE.h4, fontWeight: 700, color: C.navy }}>No {TABS[tab]} yet</p>
            <p style={{ fontSize: TYPE.small, color: C.muted, lineHeight: 1.5 }}>
              Upload or scan documents to see them here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
