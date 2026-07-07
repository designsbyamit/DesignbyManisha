// app/work/cognicure/prototype/screens/journey4/BodyVitals.tsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { C, RADIUS, TYPE, SHADOW } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import { Card } from "../../components/Card";
import type { ScreenProps } from "../../types";

// Figma corrections:
// - BMI silhouettes: 5 divs with 🧍, mustard highlight on selected (index 2 = OVERWEIGHT)
// - Heart rate bars: BLUE-GREY rounded bars gradient(to top, #4A9CC5, #7EC8E3) — NOT teal
// - "Avg. 58" badge: mustard/yellow pill (C.mustard)
// - Sync Data toggle: mustard/yellow when ON

const BMI_CATEGORIES = [
  { label: "UNDERWEIGHT", range: "<18.5" },
  { label: "NORMAL",      range: "18.5–24.9" },
  { label: "OVERWEIGHT",  range: "25–29.9" },
  { label: "OBESE",       range: "30–34.9" },
  { label: "EXT. OBESE",  range: ">35" },
];

const HEART_BARS = [
  { day: "Mon", h: 0.75 }, { day: "Tue", h: 0.85 },
  { day: "Wed", h: 0.55 }, { day: "Thu", h: 0.60 },
  { day: "Fri", h: 0.65 }, { day: "Sat", h: 0.72 },
  { day: "Sun", h: 0.68 },
];

export function BodyVitalsScreen({ goBack }: ScreenProps) {
  const [bmi, setBmi] = useState(2); // index 2 = OVERWEIGHT
  const [syncOn, setSyncOn] = useState(true);

  return (
    <div style={{
      width: 390, height: 844, background: C.bg,
      display: "flex", flexDirection: "column",
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", overflow: "hidden",
    }}>
      <div style={{ background: C.surface }}>
        <StatusBar />

        {/* Header row */}
        <div style={{ padding: "4px 24px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button
            onClick={goBack}
            style={{ background: "none", border: "none", color: C.teal, fontSize: 22, cursor: "pointer", padding: 0 }}
          >
            ‹
          </button>
          <p style={{ fontSize: TYPE.h4, fontWeight: 700, color: C.navy }}>Body Vitals</p>
          <span style={{ fontSize: TYPE.small, fontWeight: 600, color: C.teal }}>Edit</span>
        </div>

        {/* Sync Data toggle */}
        <div style={{ padding: "0 24px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ fontSize: TYPE.small, color: C.textBody }}>Sync Data</p>
          <motion.button
            onClick={() => setSyncOn(v => !v)}
            animate={{ background: syncOn ? C.mustard : C.border }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              width: 44, height: 24, borderRadius: 12,
              border: "none", cursor: "pointer", position: "relative",
            }}
          >
            <motion.div
              animate={{ left: syncOn ? 22 : 2 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{
                position: "absolute", top: 2,
                width: 20, height: 20, borderRadius: "50%",
                background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }}
            />
          </motion.button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 40px", display: "flex", flexDirection: "column", gap: 16 }}>

        {/* BMI card */}
        <Card>
          <p style={{ fontSize: TYPE.small, fontWeight: 700, color: C.navy, marginBottom: 14 }}>
            Body Mass Index (BMI)
          </p>

          {/* 5 silhouette selectors */}
          <div style={{ display: "flex", gap: 6 }}>
            {BMI_CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.label}
                onClick={() => setBmi(i)}
                animate={{
                  background: bmi === i ? C.mustardLight : C.bg,
                  borderColor: bmi === i ? C.mustard : C.border,
                }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                style={{
                  flex: 1,
                  border: `1.5px solid ${C.border}`,
                  borderRadius: RADIUS.md,
                  padding: "10px 4px",
                  textAlign: "center",
                  cursor: "pointer",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                }}
              >
                <span style={{
                  fontSize: 20,
                  filter: bmi === i ? "none" : "grayscale(1)",
                  opacity: bmi === i ? 1 : 0.4,
                }}>
                  🧍
                </span>
                <span style={{
                  fontSize: 7.5, fontWeight: 700,
                  color: bmi === i ? C.navy : C.muted,
                  textAlign: "center", lineHeight: 1.3,
                }}>
                  {cat.label}
                </span>
                <span style={{ fontSize: 7, color: C.muted }}>{cat.range}</span>
              </motion.div>
            ))}
          </div>

          {/* Stats row */}
          <div style={{
            display: "flex", gap: 0,
            marginTop: 16, borderTop: `1px solid ${C.border}`, paddingTop: 14,
          }}>
            {[
              { label: "Height (cm)",    value: "162" },
              { label: "Weight (Kg)",    value: "79" },
              { label: "Pulse (per min)",value: "92" },
              { label: "BP (mm of Hg.)",  value: "80/120" },
            ].map((s, i) => (
              <div key={s.label} style={{
                flex: 1, textAlign: "center",
                borderRight: i < 3 ? `1px solid ${C.border}` : "none",
                padding: "0 4px",
              }}>
                <p style={{ fontSize: 16, fontWeight: 800, color: C.navy }}>{s.value}</p>
                <p style={{ fontSize: 8, color: C.muted, lineHeight: 1.3 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Heart Rate card */}
        <Card>
          <p style={{ fontSize: TYPE.small, fontWeight: 700, color: C.navy, marginBottom: 14 }}>
            Heart Rate
          </p>
          <p style={{ fontSize: 26, fontWeight: 800, color: C.navy, letterSpacing: "-0.04em" }}>
            40–189 <span style={{ fontSize: 12, fontWeight: 500, color: C.muted }}>bpm</span>
          </p>
          <p style={{ fontSize: TYPE.caption, color: C.muted, marginBottom: 14 }}>13–19 Mar 2021</p>

          {/* Bar chart with avg line */}
          <div style={{ position: "relative", height: 88 }}>
            {/* Avg badge at top */}
            <div style={{
              position: "absolute", left: 0, right: 0, bottom: 46,
              display: "flex", alignItems: "center", gap: 8,
              pointerEvents: "none",
            }}>
              <div style={{
                background: C.mustard, borderRadius: RADIUS.full,
                padding: "2px 8px", flexShrink: 0,
              }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: "#fff" }}>Avg. 58</span>
              </div>
              <div style={{ flex: 1, height: 1, borderTop: `1px dashed ${C.mustard}`, opacity: 0.6 }} />
            </div>

            {/* Bars */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: "100%", paddingTop: 18 }}>
              {HEART_BARS.map((b, i) => (
                <div key={b.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, height: "100%" }}>
                  <div style={{ flex: 1, display: "flex", alignItems: "flex-end", width: "100%" }}>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: b.h * 56 }}
                      transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.06 }}
                      style={{
                        width: "100%",
                        background: "linear-gradient(to top, #4A9CC5, #7EC8E3)",
                        borderRadius: "4px 4px 0 0",
                      }}
                    />
                  </div>
                  <span style={{ fontSize: 8, color: C.muted }}>{b.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent readings */}
          <div style={{
            marginTop: 14, borderTop: `1px solid ${C.border}`, paddingTop: 12,
            display: "flex", flexDirection: "column", gap: 8,
          }}>
            {[
              { date: "19/Mar 16:00", value: "125" },
              { date: "18/Mar 15:00", value: "110" },
            ].map(r => (
              <div key={r.date} style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: TYPE.caption, color: C.muted }}>{r.date}</span>
                <span style={{ fontSize: TYPE.small, fontWeight: 700, color: C.navy }}>{r.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
