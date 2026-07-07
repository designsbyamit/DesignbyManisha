// app/work/cognicure/prototype/screens/journey4/AddComplaint.tsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { C, RADIUS, TYPE } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import type { ScreenProps } from "../../types";

const ISSUE_TYPES = [
  { label: "Disease",  emoji: "🫁" },
  { label: "Surgery",  emoji: "🏥" },
  { label: "Accident", emoji: "🚑" },
  { label: "Injury",   emoji: "🦴" },
];

const HEALTH_ISSUES = [
  { label: "Bronchital\nAsthma", emoji: "🫁" },
  { label: "Chicken Pox",        emoji: "😷" },
  { label: "Jaundice\nType A",   emoji: "🟡" },
  { label: "Hepatitis B",        emoji: "🧬" },
];

const MEDICINE_TYPES = [
  { label: "Modern",     emoji: "🧪" },
  { label: "Homeopathy", emoji: "🫙" },
  { label: "Ayurveda",   emoji: "🌿" },
];

export function AddComplaintScreen({ navigate, goBack }: ScreenProps) {
  const [issueType, setIssueType] = useState(0);
  const [healthIssue, setHealthIssue] = useState(0);
  const [medType, setMedType] = useState(0);

  return (
    <div style={{
      width: 390, height: 844, background: C.surface,
      display: "flex", flexDirection: "column",
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", overflow: "hidden",
    }}>
      <StatusBar />

      {/* Navigation row */}
      <div style={{ padding: "4px 20px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          style={{ fontSize: TYPE.small, fontWeight: 600, color: C.teal, cursor: "pointer" }}
          onClick={goBack}
        >
          Cancel
        </span>
        <p style={{ fontSize: TYPE.h4, fontWeight: 700, color: C.navy }}>Add Past Complaint</p>
        <span
          style={{ fontSize: TYPE.small, fontWeight: 600, color: C.teal, cursor: "pointer" }}
          onClick={() => navigate("historicalComplaints")}
        >
          Done
        </span>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "8px 20px 40px", display: "flex", flexDirection: "column", gap: 20 }}>

        {/* Issue Type */}
        <div>
          <p style={{ fontSize: TYPE.caption, color: C.muted, marginBottom: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Issue Type
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            {ISSUE_TYPES.map((t, i) => (
              <motion.div
                key={t.label}
                onClick={() => setIssueType(i)}
                style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer" }}
              >
                <motion.div
                  animate={{ background: issueType === i ? C.mustard : C.bg }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  style={{
                    width: 52, height: 52, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 24,
                    border: `2px solid ${issueType === i ? C.mustard : C.border}`,
                  }}
                >
                  {t.emoji}
                </motion.div>
                <span style={{ fontSize: TYPE.caption, fontWeight: 600, color: issueType === i ? C.navy : C.muted }}>
                  {t.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Health Issue chips */}
        <div style={{ background: C.bg, borderRadius: RADIUS.lg, padding: "14px 16px" }}>
          <p style={{ fontSize: TYPE.caption, color: C.muted, marginBottom: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Health Issue
          </p>
          <div style={{ display: "flex", gap: 10, overflowX: "auto" }}>
            {HEALTH_ISSUES.map((h, i) => (
              <motion.div
                key={i}
                onClick={() => setHealthIssue(i)}
                style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer" }}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: healthIssue === i ? C.mustard : C.surface,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24,
                  border: `2px solid ${healthIssue === i ? C.mustard : C.border}`,
                }}>
                  {h.emoji}
                </div>
                <span style={{
                  fontSize: 9, fontWeight: 600,
                  color: healthIssue === i ? C.navy : C.muted,
                  textAlign: "center", lineHeight: 1.3,
                  whiteSpace: "pre-line",
                }}>
                  {h.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Date range pickers */}
        <div style={{ display: "flex", gap: 12 }}>
          {[
            { label: "Onset Date/Year", val: "10/10/2021",         showCal: true },
            { label: "Lasted until",    val: "Present (Ongoing)",  showCal: false },
          ].map(f => (
            <div key={f.label} style={{ flex: 1 }}>
              <p style={{ fontSize: TYPE.caption, color: C.muted, marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {f.label}
              </p>
              <div style={{
                background: C.surface, border: `1px solid ${C.border}`,
                borderRadius: RADIUS.md, padding: "12px 14px",
                display: "flex", justifyContent: "space-between",
              }}>
                <span style={{ fontSize: TYPE.small, color: C.navy }}>{f.val}</span>
                {f.showCal && <span style={{ fontSize: 14 }}>📅</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Treatment Details */}
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
          <p style={{ fontSize: TYPE.caption, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>
            TREATMENT DETAILS
          </p>
          <p style={{ fontSize: TYPE.caption, color: C.muted, marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Medicine Type
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            {MEDICINE_TYPES.map((m, i) => (
              <motion.div
                key={m.label}
                onClick={() => setMedType(i)}
                style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer" }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: "50%",
                  background: medType === i ? C.mustard : C.bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22,
                  border: `2px solid ${medType === i ? C.mustard : C.border}`,
                }}>
                  {m.emoji}
                </div>
                <span style={{ fontSize: TYPE.caption, fontWeight: 600, color: medType === i ? C.navy : C.muted }}>
                  {m.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Treatment history textarea */}
        <div>
          <p style={{ fontSize: TYPE.caption, color: C.muted, marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Treatment History
          </p>
          <div style={{
            background: C.bg, borderRadius: RADIUS.md,
            padding: "14px 16px", border: `1px solid ${C.border}`,
            minHeight: 80,
          }}>
            <p style={{ fontSize: TYPE.small, color: C.subtle }}>Explain the detailed treatment advised.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
