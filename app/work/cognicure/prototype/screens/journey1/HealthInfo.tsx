// app/work/cognicure/prototype/screens/journey1/HealthInfo.tsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { C, RADIUS, TYPE, SHADOW } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import { Button } from "../../components/Button";
import type { ScreenProps } from "../../types";

const CONDITIONS = ["Diabetes", "Hypertension", "Asthma", "Thyroid", "PCOD", "Heart Disease", "Arthritis", "None"];
const ALLERGIES = ["Pollen", "Dust", "Penicillin", "Shellfish", "Peanuts", "Latex", "None"];
const LIFESTYLE = ["Sedentary", "Lightly active", "Active", "Very active"];

export function HealthInfoScreen({ navigate, goBack }: ScreenProps) {
  const [conditions, setConditions] = useState<string[]>(["Asthma"]);
  const [allergies, setAllergies] = useState<string[]>(["Dust"]);
  const [lifestyle, setLifestyle] = useState("Active");

  const toggle = (arr: string[], setArr: (v: string[]) => void, val: string) => {
    setArr(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);
  };

  const ChipSection = ({ label, items, selected, setSelected }: { label: string; items: string[]; selected: string[]; setSelected: (v: string[]) => void }) => (
    <div>
      <p style={{ fontSize: TYPE.caption, color: C.muted, marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {items.map(item => {
          const active = selected.includes(item);
          return (
            <motion.button
              key={item}
              onClick={() => toggle(selected, setSelected, item)}
              animate={{ background: active ? C.teal : C.surface, color: active ? "#fff" : C.textBody, borderColor: active ? C.teal : C.border }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              style={{ padding: "8px 14px", borderRadius: RADIUS.full, border: `1px solid ${C.border}`, fontSize: TYPE.small, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}
            >
              {item}
            </motion.button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div style={{ width: 390, height: 844, background: C.bg, display: "flex", flexDirection: "column", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", overflow: "hidden" }}>
      <StatusBar />
      <div style={{ background: C.surface, padding: "8px 24px 16px" }}>
        <p style={{ fontSize: TYPE.h2, fontWeight: 800, color: C.navy, letterSpacing: "-0.03em",
          fontFamily: "var(--font-display), Georgia, serif" }}>Your health<br />background</p>
        <p style={{ fontSize: TYPE.small, color: C.muted, marginTop: 6 }}>This helps doctors give you better advice. You can always edit later.</p>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 24 }}>
        <ChipSection label="Existing Conditions" items={CONDITIONS} selected={conditions} setSelected={setConditions} />
        <ChipSection label="Allergies" items={ALLERGIES} selected={allergies} setSelected={setAllergies} />

        <div>
          <p style={{ fontSize: TYPE.caption, color: C.muted, marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Lifestyle</p>
          <div style={{ display: "flex", gap: 8 }}>
            {LIFESTYLE.map(l => (
              <motion.button
                key={l}
                onClick={() => setLifestyle(l)}
                animate={{ background: lifestyle === l ? C.mustard : C.surface, color: lifestyle === l ? "#fff" : C.textBody, borderColor: lifestyle === l ? C.mustard : C.border }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                style={{ flex: 1, padding: "10px 4px", borderRadius: RADIUS.sm, border: `1px solid ${C.border}`, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", textAlign: "center" }}
              >
                {l}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Current medications */}
        <div>
          <p style={{ fontSize: TYPE.caption, color: C.muted, marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Current Medications</p>
          <div style={{ background: C.surface, borderRadius: RADIUS.md, padding: "14px 16px", border: `1px solid ${C.border}` }}>
            <p style={{ fontSize: TYPE.small, color: C.subtle }}>+ Add medications...</p>
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 24px 32px", background: C.bg }}>
        <Button label="Continue" onPress={() => navigate("circles")} variant="primary" fullWidth />
      </div>
    </div>
  );
}
