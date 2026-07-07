// app/work/cognicure/prototype/screens/journey4/Lifestyle.tsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { C, RADIUS, TYPE } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import { Header } from "../../components/Header";
import { Card } from "../../components/Card";
import type { ScreenProps } from "../../types";

const DIET_OPTIONS = ["Vegetarian", "Non-Vegetarian", "Vegan", "Jain"];
const SLEEP_HOURS = [5, 6, 7, 8, 9];

export function LifestyleScreen({ goBack }: ScreenProps) {
  const [diet, setDiet] = useState("Vegetarian");
  const [sleep, setSleep] = useState(7);
  const [smoker, setSmoker] = useState(false);
  const [alcohol, setAlcohol] = useState(false);
  const [water, setWater] = useState(6);

  const Toggle = ({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) => (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "12px 0", borderBottom: `1px solid ${C.border}`,
    }}>
      <p style={{ fontSize: TYPE.small, color: C.textBody }}>{label}</p>
      <motion.button
        onClick={() => onChange(!value)}
        animate={{ background: value ? C.teal : C.border }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{ width: 44, height: 24, borderRadius: 12, border: "none", cursor: "pointer", position: "relative" }}
      >
        <motion.div
          animate={{ left: value ? 22 : 2 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{
            position: "absolute", top: 2,
            width: 20, height: 20, borderRadius: "50%",
            background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          }}
        />
      </motion.button>
    </div>
  );

  return (
    <div style={{
      width: 390, height: 844, background: C.bg,
      display: "flex", flexDirection: "column",
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", overflow: "hidden",
    }}>
      <div style={{ background: C.surface }}>
        <StatusBar />
        <Header title="Lifestyle" onBack={goBack} rightLabel="Save" onRight={goBack} />
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 14 }}>

        {/* Diet Preference */}
        <Card>
          <p style={{ fontSize: TYPE.small, fontWeight: 700, color: C.navy, marginBottom: 12 }}>Diet Preference</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {DIET_OPTIONS.map(d => (
              <motion.button
                key={d}
                onClick={() => setDiet(d)}
                animate={{
                  background: diet === d ? C.teal : C.bg,
                  color: diet === d ? "#fff" : C.textBody,
                  borderColor: diet === d ? C.teal : C.border,
                }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                style={{
                  padding: "8px 16px", borderRadius: RADIUS.full,
                  border: `1px solid ${C.border}`,
                  fontSize: TYPE.small, fontWeight: 500,
                  cursor: "pointer", fontFamily: "inherit",
                }}
              >
                {d}
              </motion.button>
            ))}
          </div>
        </Card>

        {/* Sleep */}
        <Card>
          <p style={{ fontSize: TYPE.small, fontWeight: 700, color: C.navy, marginBottom: 12 }}>Sleep (hours/night)</p>
          <div style={{ display: "flex", gap: 10 }}>
            {SLEEP_HOURS.map(h => (
              <motion.button
                key={h}
                onClick={() => setSleep(h)}
                animate={{
                  background: sleep === h ? C.teal : C.bg,
                  color: sleep === h ? "#fff" : C.textBody,
                }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                style={{
                  flex: 1, padding: "10px 0",
                  borderRadius: RADIUS.md,
                  border: `1px solid ${sleep === h ? C.teal : C.border}`,
                  fontSize: TYPE.body, fontWeight: 700,
                  cursor: "pointer", fontFamily: "inherit",
                }}
              >
                {h}
              </motion.button>
            ))}
          </div>
        </Card>

        {/* Water intake slider */}
        <Card>
          <p style={{ fontSize: TYPE.small, fontWeight: 700, color: C.navy, marginBottom: 4 }}>Daily Water Intake</p>
          <p style={{ fontSize: 28, fontWeight: 800, color: C.teal, marginBottom: 12 }}>
            {water} <span style={{ fontSize: 14, color: C.muted, fontWeight: 500 }}>glasses</span>
          </p>
          <input
            type="range" min={2} max={12} value={water}
            onChange={e => setWater(Number(e.target.value))}
            style={{ width: "100%", accentColor: C.teal }}
          />
        </Card>

        {/* Toggles + Exercise */}
        <Card>
          <Toggle label="Smoker"  value={smoker}  onChange={setSmoker} />
          <Toggle label="Alcohol" value={alcohol} onChange={setAlcohol} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0" }}>
            <p style={{ fontSize: TYPE.small, color: C.textBody }}>Exercise frequency</p>
            <span style={{ fontSize: TYPE.small, fontWeight: 600, color: C.teal }}>4× / week</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
