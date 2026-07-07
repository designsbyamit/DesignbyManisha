// app/work/cognicure/prototype/screens/journey4/HistoricalComplaints.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { C, RADIUS, TYPE, SHADOW, MOTION } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import { Header } from "../../components/Header";
import type { ScreenProps } from "../../types";

// Figma correction: simple list, NO vertical timeline line.
// Each row: colored bullet dot (teal or mustard) + complaint name + type+duration right side
// Layout: display:flex, justifyContent:space-between

const COMPLAINTS = [
  { condition: "Bronchial Asthma",     type: "Disease",  start: "Oct 2021", end: "Ongoing",   dotColor: C.teal },
  { condition: "Fractured Left Ankle", type: "Accident", start: "Jul 2019", end: "Nov 2019",   dotColor: C.mustard },
  { condition: "Appendectomy",         type: "Surgery",  start: "Mar 2015", end: "Mar 2015",   dotColor: C.teal },
  { condition: "Chicken Pox",          type: "Disease",  start: "Jan 2005", end: "Feb 2005",   dotColor: C.mustard },
];

export function HistoricalComplaintsScreen({ navigate, goBack }: ScreenProps) {
  return (
    <div style={{
      width: 390, height: 844, background: C.bg,
      display: "flex", flexDirection: "column",
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ background: C.surface }}>
        <StatusBar />
        <Header title="Past Complaints" onBack={goBack} />
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 80px", background: C.surface }}>
        {COMPLAINTS.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08, duration: 0.35, ease: "easeOut" }}
            style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "14px 0",
              borderBottom: i < COMPLAINTS.length - 1 ? `1px solid ${C.border}` : "none",
            }}
          >
            {/* Left: bullet + name */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {/* Colored bullet dot */}
              <div style={{
                width: 10, height: 10, borderRadius: "50%",
                background: c.dotColor, flexShrink: 0,
              }} />
              <p style={{ fontSize: TYPE.small, fontWeight: 600, color: C.navy }}>{c.condition}</p>
            </div>

            {/* Right: type + duration */}
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: TYPE.caption, fontWeight: 700, color: C.muted }}>{c.type}</p>
              <p style={{ fontSize: TYPE.caption, color: C.subtle }}>{c.start} – {c.end}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FAB */}
      <div style={{ position: "absolute", bottom: 28, right: 20 }}>
        <motion.button
          whileTap={{ scale: 0.9 }}
          transition={MOTION.spring}
          onClick={() => navigate("addComplaint")}
          style={{
            width: 52, height: 52, borderRadius: "50%",
            background: C.teal, border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: SHADOW.fab,
          }}
        >
          <span style={{ fontSize: 26, color: "#fff", fontWeight: 300 }}>+</span>
        </motion.button>
      </div>
    </div>
  );
}
