// app/work/cognicure/prototype/screens/journey1/CreateProfile.tsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { C, RADIUS, TYPE, SHADOW, MOTION } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import { Button } from "../../components/Button";
import type { ScreenProps } from "../../types";

const BLOOD_GROUPS = ["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"];
const GENDERS = ["Male", "Female", "Other"];

export function CreateProfileScreen({ navigate, goBack }: ScreenProps) {
  const [gender, setGender] = useState("Male");
  const [blood, setBlood] = useState("O+");

  return (
    <div style={{ width: 390, height: 844, background: C.bg, display: "flex", flexDirection: "column", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", overflow: "hidden" }}>
      <StatusBar />

      {/* Header */}
      <div style={{ background: C.surface, padding: "8px 24px 16px" }}>
        <p style={{ fontSize: TYPE.h2, fontWeight: 800, color: C.navy, letterSpacing: "-0.03em",
          fontFamily: "var(--font-display), Georgia, serif" }}>Create your<br />health profile</p>
        <p style={{ fontSize: TYPE.small, color: C.muted, marginTop: 6 }}>Help your doctor know the most essential bit about you.</p>
      </div>

      {/* Form */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Profile image */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: C.tealLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, border: `2px dashed ${C.teal}` }}>
            👤
          </div>
          <span style={{ fontSize: TYPE.caption, color: C.teal, fontWeight: 600 }}>Add photo</span>
        </div>

        {/* Name */}
        <div>
          <p style={{ fontSize: TYPE.caption, color: C.muted, marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Full Name</p>
          <div style={{ background: C.surface, borderRadius: RADIUS.md, padding: "14px 16px", border: `1px solid ${C.border}`, boxShadow: SHADOW.card }}>
            <p style={{ fontSize: TYPE.body, color: C.navy, fontWeight: 500 }}>Chandrasekar Nair</p>
          </div>
        </div>

        {/* Gender */}
        <div>
          <p style={{ fontSize: TYPE.caption, color: C.muted, marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Gender</p>
          <div style={{ display: "flex", gap: 8 }}>
            {GENDERS.map(g => (
              <motion.button
                key={g}
                onClick={() => setGender(g)}
                animate={{ background: gender === g ? C.teal : C.surface, color: gender === g ? "#fff" : C.textBody, borderColor: gender === g ? C.teal : C.border }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                style={{ flex: 1, padding: "10px 0", borderRadius: RADIUS.md, border: `1px solid ${C.border}`, fontSize: TYPE.small, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
              >
                {g}
              </motion.button>
            ))}
          </div>
        </div>

        {/* DOB */}
        <div>
          <p style={{ fontSize: TYPE.caption, color: C.muted, marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Date of Birth</p>
          <div style={{ background: C.surface, borderRadius: RADIUS.md, padding: "14px 16px", border: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontSize: TYPE.body, color: C.navy }}>12 / 04 / 1961</p>
            <span style={{ fontSize: 16 }}>📅</span>
          </div>
        </div>

        {/* Blood Group */}
        <div>
          <p style={{ fontSize: TYPE.caption, color: C.muted, marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Blood Group</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {BLOOD_GROUPS.map(bg => (
              <motion.button
                key={bg}
                onClick={() => setBlood(bg)}
                animate={{ background: blood === bg ? C.mustard : C.surface, color: blood === bg ? "#fff" : C.textBody, borderColor: blood === bg ? C.mustard : C.border }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                style={{ padding: "8px 14px", borderRadius: RADIUS.sm, border: `1px solid ${C.border}`, fontSize: TYPE.small, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
              >
                {bg}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Height & Weight */}
        <div style={{ display: "flex", gap: 12 }}>
          {[{ label: "Height (cm)", value: "162" }, { label: "Weight (kg)", value: "79" }].map(f => (
            <div key={f.label} style={{ flex: 1 }}>
              <p style={{ fontSize: TYPE.caption, color: C.muted, marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{f.label}</p>
              <div style={{ background: C.surface, borderRadius: RADIUS.md, padding: "14px 16px", border: `1px solid ${C.border}` }}>
                <p style={{ fontSize: TYPE.body, color: C.navy, fontWeight: 600 }}>{f.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "16px 24px 32px", background: C.bg }}>
        <Button label="Continue" onPress={() => navigate("healthInfo")} variant="primary" fullWidth />
      </div>
    </div>
  );
}
