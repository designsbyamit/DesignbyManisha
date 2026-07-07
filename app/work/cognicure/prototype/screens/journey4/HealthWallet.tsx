// app/work/cognicure/prototype/screens/journey4/HealthWallet.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { C, RADIUS, TYPE, SHADOW } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import { BottomNav } from "../../components/BottomNav";
import type { ScreenProps, ScreenId } from "../../types";

// Figma correction: NO AI summary banner, NO quick-action row.
// 3 category cards, each: left side = colored photo thumbnail, right side = title + chevron list items.

interface Category {
  emoji: string;
  title: string;
  subtitle: string;
  items: { label: string; to: ScreenId }[];
  photoBg: string;
}

const CATEGORIES: Category[] = [
  {
    emoji: "📊",
    title: "My Health",
    subtitle: "Medical records & history",
    photoBg: "linear-gradient(135deg, #E8F4F8, #B8D8E8)",
    items: [
      { label: "Prescriptions",     to: "prescriptionsList" },
      { label: "Lab Reports",       to: "medicalReports" },
      { label: "Discharge Summary", to: "medicalReports" },
    ],
  },
  {
    emoji: "🥗",
    title: "My Lifestyle",
    subtitle: "Vitals & habits",
    photoBg: "linear-gradient(135deg, #F8F0E8, #E8D0B8)",
    items: [
      { label: "Body Vitals",            to: "bodyVitals" },
      { label: "Lifestyle preferences",  to: "lifestyle" },
      { label: "Food habit",             to: "lifestyle" },
    ],
  },
  {
    emoji: "💉",
    title: "Historical Health Data",
    subtitle: "Past conditions & bills",
    photoBg: "linear-gradient(135deg, #F0F0F0, #D8D8D8)",
    items: [
      { label: "Prescriptions & Reports", to: "prescriptionsList" },
      { label: "Past Complaints",         to: "historicalComplaints" },
      { label: "Invoices & Bills",        to: "medicalReports" },
    ],
  },
];

export function HealthWalletScreen({ navigate }: ScreenProps) {
  return (
    <div style={{
      width: 390, height: 844, background: C.bg,
      display: "flex", flexDirection: "column",
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ background: C.surface }}>
        <StatusBar />
        <div style={{ padding: "4px 24px 16px" }}>
          <p style={{
            fontSize: TYPE.h2, fontWeight: 800, color: C.navy,
            letterSpacing: "-0.03em",
            fontFamily: "var(--font-display), Georgia, serif",
          }}>
            Health Wallet
          </p>
          <p style={{ fontSize: TYPE.small, color: C.muted, marginTop: 4 }}>
            All your health data at one place.
          </p>
        </div>
      </div>

      <div style={{
        flex: 1, overflowY: "auto",
        padding: "16px 20px 100px",
        display: "flex", flexDirection: "column", gap: 14,
      }}>
        {CATEGORIES.map((cat, ci) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ci * 0.1, duration: 0.35, ease: "easeOut" }}
            style={{
              background: C.surface, borderRadius: RADIUS.lg,
              overflow: "hidden", boxShadow: SHADOW.card,
            }}
          >
            {/* Card header row: photo thumbnail on left, title on right */}
            <div style={{ display: "flex", gap: 0, alignItems: "stretch" }}>
              {/* Photo thumbnail */}
              <div style={{
                width: 90, minHeight: 90,
                background: cat.photoBg,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 36, flexShrink: 0,
              }}>
                {cat.emoji}
              </div>
              {/* Title block */}
              <div style={{ flex: 1, padding: "16px 16px 14px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <p style={{ fontSize: TYPE.small, fontWeight: 700, color: C.navy }}>{cat.title}</p>
                <p style={{ fontSize: TYPE.caption, color: C.muted, marginTop: 2 }}>{cat.subtitle}</p>
              </div>
            </div>

            {/* Items list */}
            <div style={{ borderTop: `1px solid ${C.border}` }}>
              {cat.items.map((item, ii) => (
                <motion.div
                  key={item.label}
                  onClick={() => navigate(item.to)}
                  whileTap={{ background: C.bg }}
                  style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "13px 16px",
                    borderBottom: ii < cat.items.length - 1 ? `1px solid ${C.border}` : "none",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ fontSize: TYPE.small, color: C.textBody }}>{item.label}</span>
                  <ChevronRight size={14} color={C.subtle} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <BottomNav active="healthWallet" navigate={navigate} />
    </div>
  );
}
