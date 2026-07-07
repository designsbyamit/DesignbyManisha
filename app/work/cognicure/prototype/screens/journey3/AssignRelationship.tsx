"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { C, RADIUS, TYPE, SHADOW } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import type { ScreenProps } from "../../types";

const RELATIONSHIPS = [
  { label: "Spouse",   emoji: "🤝" },
  { label: "Daughter", emoji: "👧" },
  { label: "Son",      emoji: "👦" },
  { label: "Parent",   emoji: "👴" },
  { label: "Sibling",  emoji: "👫" },
  { label: "Other",    emoji: "🙂" },
];

export function AssignRelationshipScreen({ navigate, goBack }: ScreenProps) {
  const [selected, setSelected] = useState("Daughter");
  const [dependent, setDependent] = useState(false);

  return (
    <div style={{ width: 390, height: 844, background: C.surface, display: "flex", flexDirection: "column", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      <StatusBar />
      <Header title="Add Family Member" onBack={goBack} rightLabel="Cancel" onRight={goBack} />

      <div style={{ flex: 1, padding: "24px 24px 0", display: "flex", flexDirection: "column", gap: 28 }}>
        {/* User card */}
        <div style={{ background: C.bg, borderRadius: RADIUS.xl, padding: "16px 20px", display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: C.tealLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>👩</div>
          <div>
            <p style={{ fontSize: TYPE.small, fontWeight: 700, color: C.navy }}>Preethi Nair</p>
            <p style={{ fontSize: TYPE.caption, color: C.muted }}>32 years · Entrepreneur</p>
          </div>
        </div>

        {/* Relationship selector */}
        <div>
          <p style={{ fontSize: TYPE.caption, color: C.muted, marginBottom: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Select Relationship</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {RELATIONSHIPS.map(r => (
              <motion.button
                key={r.label}
                onClick={() => setSelected(r.label)}
                animate={{ background: selected === r.label ? C.mustard : C.bg, borderColor: selected === r.label ? C.mustard : C.border }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "12px 16px", borderRadius: RADIUS.full, border: `1px solid ${C.border}`, cursor: "pointer", fontFamily: "inherit", minWidth: 72 }}
              >
                <span style={{ fontSize: 24 }}>{r.emoji}</span>
                <span style={{ fontSize: TYPE.caption, fontWeight: 600, color: selected === r.label ? "#fff" : C.textBody }}>{r.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Dependent toggle */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ fontSize: TYPE.body, color: C.textBody }}>Dependent</p>
          <motion.button
            onClick={() => setDependent(v => !v)}
            animate={{ background: dependent ? C.mustard : C.border }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ width: 48, height: 26, borderRadius: 13, border: "none", cursor: "pointer", position: "relative" }}
          >
            <motion.div
              animate={{ left: dependent ? 24 : 2 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ position: "absolute", top: 2, width: 22, height: 22, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}
            />
          </motion.button>
        </div>
      </div>

      <div style={{ padding: "24px 24px 40px" }}>
        <Button label="Done" onPress={() => navigate("memberPermissions")} variant="primary" fullWidth />
      </div>
    </div>
  );
}
