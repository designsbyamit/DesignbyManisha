// app/work/cognicure/prototype/screens/journey2/Dashboard.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import { C, RADIUS, TYPE, SHADOW } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import { BottomNav } from "../../components/BottomNav";
import { Card } from "../../components/Card";
import type { ScreenProps } from "../../types";

const CONSULTATIONS = [
  { doctor: "Dr. Nischhal Shetty", note: "Abdominal pain and feeling a discomfo...", date: "Thursday, 6 Mar 2023", badge: "Tomorrow", emoji: "👨‍⚕️" },
  { doctor: "Dr. Tanuja Chandra",  note: "Regular follow-up",                         date: "Thursday, 16 Mar 2023", badge: "",        emoji: "👩‍⚕️" },
];

export function PatientDashboard({ navigate }: ScreenProps) {
  return (
    <div style={{ width: 390, height: 844, background: C.bg, display: "flex", flexDirection: "column", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", position: "relative", overflow: "hidden" }}>
      <div style={{ background: C.surface }}>
        <StatusBar />

        {/* Top bar */}
        <div style={{ padding: "0 20px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[14, 10].map((w, i) => <div key={i} style={{ width: w, height: 2, background: C.teal, borderRadius: 2 }} />)}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div onClick={() => navigate("notifications")} style={{ position: "relative", cursor: "pointer" }}>
              <Bell size={20} color={C.navy} strokeWidth={1.8} />
              <div style={{ position: "absolute", top: -2, right: -2, width: 8, height: 8, borderRadius: "50%", background: C.mustard, border: "1.5px solid #fff" }} />
            </div>
            <div onClick={() => navigate("profile")} style={{ width: 36, height: 36, borderRadius: "50%", background: C.tealLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, position: "relative", cursor: "pointer" }}>
              👴
              <div style={{ position: "absolute", bottom: 0, right: 0, width: 10, height: 10, borderRadius: "50%", background: C.success, border: "1.5px solid #fff" }} />
            </div>
          </div>
        </div>

        {/* Greeting */}
        <div style={{ padding: "0 20px 20px" }}>
          <p style={{ fontSize: TYPE.h2, fontWeight: 800, color: C.navy, letterSpacing: "-0.03em",
            fontFamily: "var(--font-display), Georgia, serif" }}>Hi Chandrashekhar!</p>
          <p style={{ fontSize: TYPE.caption, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 12, marginBottom: 12 }}>MY CONSULTATIONS</p>

          {/* Horizontal consultation cards */}
          <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 4 }}>
            {CONSULTATIONS.map((c, i) => (
              <motion.div
                key={i}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("consultationDetails")}
                style={{ width: 200, flexShrink: 0, background: "#FAFAFA", borderRadius: RADIUS.lg, padding: 16, border: `1px solid ${C.border}`, cursor: "pointer", position: "relative", overflow: "hidden" }}
              >
                {c.badge && (
                  <div style={{ position: "absolute", top: 12, right: 12, background: C.tealLight, borderRadius: RADIUS.full, padding: "3px 10px" }}>
                    <span style={{ fontSize: 10, fontWeight: 600, color: C.teal }}>{c.badge}</span>
                  </div>
                )}
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: C.tealLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 10 }}>
                  {c.emoji}
                </div>
                <p style={{ fontSize: TYPE.small, fontWeight: 700, color: C.navy, marginBottom: 4 }}>{c.doctor}</p>
                <p style={{ fontSize: TYPE.caption, color: C.textBody, marginBottom: 8, lineHeight: 1.4 }}>{c.note}</p>
                <p style={{ fontSize: TYPE.caption, color: C.subtle }}>{c.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 100px" }}>
        {/* Energy Activity Chart */}
        <Card style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
            <p style={{ fontSize: TYPE.small, fontWeight: 700, color: C.navy }}>Average Energy Activity</p>
            <p style={{ fontSize: TYPE.caption, color: C.subtle }}>Sourced from Health App</p>
          </div>
          <p style={{ fontSize: 28, fontWeight: 800, color: C.navy, letterSpacing: "-0.04em", marginBottom: 2 }}>2,985 <span style={{ fontSize: TYPE.small, fontWeight: 500, color: C.muted }}>kcal</span></p>
          <p style={{ fontSize: TYPE.caption, color: C.muted, marginBottom: 16 }}>Avg. per day</p>
          {[
            { label: "Mar 23", active: 0.65, resting: 0.85 },
            { label: "Feb 23", active: 0.48, resting: 0.62 },
            { label: "Jan 23", active: 0.55, resting: 0.70 },
            { label: "Dec 22", active: 0.42, resting: 0.58 },
          ].map(row => (
            <div key={row.label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: TYPE.caption, color: C.muted, width: 36, textAlign: "right" }}>{row.label}</span>
              <div style={{ flex: 1, position: "relative", height: 10, borderRadius: 5, background: C.tealLight, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${row.resting * 100}%`, background: C.tealLight, borderRadius: 5 }} />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${row.active * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  style={{ position: "absolute", left: 0, top: 0, bottom: 0, background: C.teal, borderRadius: 5 }}
                />
              </div>
            </div>
          ))}
          <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
            {[{ color: C.teal, label: "Active Calories" }, { color: C.tealLight, label: "Resting Calories" }].map(l => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: l.color }} />
                <span style={{ fontSize: TYPE.caption, color: C.muted }}>{l.label}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Invites section */}
        <p style={{ fontSize: TYPE.caption, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>INVITES</p>
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#F0E0D0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>👩</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: TYPE.small, fontWeight: 700, color: C.navy }}>Pooja Suresh</p>
              <p style={{ fontSize: TYPE.caption, color: C.muted }}>Adithyapuram, Palakkad</p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#E8F8EE", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <span style={{ fontSize: 16, color: C.success }}>✓</span>
              </div>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#FFE8E8", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <span style={{ fontSize: 16, color: C.danger }}>✕</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* FAB */}
      <div style={{ position: "absolute", bottom: 80, right: 20 }}>
        <div onClick={() => navigate("aiCompanion")} style={{ width: 52, height: 52, borderRadius: "50%", background: C.teal, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: SHADOW.fab, cursor: "pointer" }}>
          <span style={{ fontSize: 26, lineHeight: 1 }}>🤖</span>
        </div>
      </div>

      {/* Bottom Nav */}
      <BottomNav active="dashboard" navigate={navigate} />
    </div>
  );
}
