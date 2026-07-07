"use client";
import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { C, RADIUS, TYPE, SHADOW } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import { Header } from "../../components/Header";
import { Card } from "../../components/Card";
import type { ScreenProps } from "../../types";

const DOCTORS = [
  { name: "Dr. Nischhal Shetty", spec: "General Physician", available: true,  emoji: "👨‍⚕️" },
  { name: "Dr. Tanuja Chandra",  spec: "General Physician", available: false, emoji: "👩‍⚕️" },
  { name: "Dr. Mahima Gupta",    spec: "Physiotherapist",   available: true,  emoji: "🧑‍⚕️" },
];

export function DoctorsNetworkScreen({ navigate, goBack }: ScreenProps) {
  return (
    <div style={{ width: 390, height: 844, background: C.bg, display: "flex", flexDirection: "column", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", overflow: "hidden" }}>
      <div style={{ background: C.surface }}>
        <StatusBar />
        <Header title="Doctors" onBack={goBack} rightLabel="+ Add" onRight={() => {}} />
        <div style={{ padding: "0 20px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: C.bg, borderRadius: RADIUS.full, padding: "10px 16px", border: `1px solid ${C.border}` }}>
            <Search size={14} color={C.muted} />
            <span style={{ fontSize: TYPE.small, color: C.subtle }}>Search doctors...</span>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
        <p style={{ fontSize: TYPE.caption, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em" }}>CONNECTED ({DOCTORS.length})</p>
        {DOCTORS.map((d, i) => (
          <Card key={d.name} style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ position: "relative" }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: C.tealLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{d.emoji}</div>
              <div style={{ position: "absolute", bottom: 0, right: 0, width: 12, height: 12, borderRadius: "50%", background: d.available ? C.success : C.subtle, border: "2px solid #fff" }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: TYPE.small, fontWeight: 700, color: C.navy }}>{d.name}</p>
              <p style={{ fontSize: TYPE.caption, color: C.muted }}>{d.spec}</p>
              <p style={{ fontSize: TYPE.caption, color: d.available ? C.success : C.subtle, fontWeight: 600 }}>{d.available ? "Available now" : "Unavailable"}</p>
            </div>
            {d.available && (
              <div style={{ background: C.tealLight, borderRadius: RADIUS.full, padding: "6px 12px" }}>
                <span style={{ fontSize: TYPE.caption, fontWeight: 700, color: C.teal }}>Consult</span>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
